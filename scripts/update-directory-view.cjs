/**
 * Migration: Update directory_listings view to expose only required fields
 *
 * Removes sensitive/internal fields from the public view:
 * - google_place_id (internal identifier)
 * - google_rating/google_review_count (raw scores, used only as fallback)
 * - street_address (redundant with formatted_address)
 * - directory_published_at (not used in UI)
 * - most_recent_review_date (not used in UI)
 *
 * Adds (for the practice detail page redesign):
 * - ai_description, ai_description_generated_at (FetchRated AI summary)
 * - current_opening_hours_json (Google's live hours incl. holidays)
 * - opening_date (Google "operating since" date)
 * - accessibility_json, parking_json (Google practice attributes)
 * - google_featured_reviews_json (Google's featured review excerpts)
 *
 * Run: node scripts/update-directory-view.cjs
 */

const fs = require('fs');
const path = require('path');

// Load environment
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const { Client } = require('pg');

const viewSql = `
-- ============================================
-- DIRECTORY_LISTINGS VIEW
-- Public directory view consumed by fetchrated_website
-- ============================================

-- Ensure prerequisite columns exist on the underlying table.
-- county was historically applied to PROD only via add-county-column.sql.
-- Adding it here makes this script idempotent across environments.
ALTER TABLE locations ADD COLUMN IF NOT EXISTS county VARCHAR(255);

DROP VIEW IF EXISTS directory_listings CASCADE;

CREATE VIEW directory_listings AS
SELECT
  -- Identity
  p.id,
  p.name,
  COALESCE(
    p.directory_slug,
    LOWER(REGEXP_REPLACE(p.name || '-' || COALESCE(p.city, ''), '[^a-zA-Z0-9]+', '-', 'g'))
  ) as slug,

  -- Location (public)
  p.formatted_address,
  p.city,
  p.county,
  p.postcode,
  p.latitude,
  p.longitude,

  -- Contact (public)
  p.phone,
  p.website,
  p.email,

  -- Content
  p.headline,
  p.description,
  p.ai_description,
  p.ai_description_generated_at,
  p.logo_url,
  p.cover_image_url,
  p.gallery_urls,
  p.services,
  p.opening_hours,
  p.current_opening_hours_json,

  -- Practice attributes (public Google Places data)
  p.opening_date,
  p.accessibility_json,
  p.parking_json,
  p.google_featured_reviews_json,

  -- Scores (public-facing only)
  p.profile_strength_score,

  -- Membership
  p.is_fetchrated_member,
  p.membership_tier,

  -- Editorial flag (homepage + /find Featured rail)
  p.is_featured,

  -- Vertical (vet, groomer, trainer, boarding) — used to constrain directory
  -- to entries with real underlying data
  p.vertical_type,

  -- Review aggregates (computed/aggregated, not raw)
  COALESCE(ra.average_rating, p.google_rating) as average_rating,
  COALESCE(ra.total_reviews, p.google_review_count) as total_reviews,
  ra.monthly_review_velocity,
  ra.response_rate,

  -- Computed badge tier
  CASE
    WHEN p.profile_strength_score >= 9.0 THEN 'outstanding'
    WHEN p.profile_strength_score >= 7.5 THEN 'excellent'
    WHEN p.is_fetchrated_member THEN 'verified'
    ELSE NULL
  END as badge_tier,

  -- Timestamps (for sitemap/caching)
  p.last_updated_at

FROM locations p
LEFT JOIN review_aggregates ra ON ra.location_id = p.id
WHERE p.show_in_directory = TRUE
  AND p.business_status = 'OPERATIONAL';

COMMENT ON VIEW directory_listings IS
'Public directory view for fetchrated_website. Exposes only fields needed for location cards and detail pages. Sensitive data remains in locations table.';
`;

// nearby_directory_listings is a LANGUAGE sql STABLE function that depends on
// the view, so DROP VIEW ... CASCADE drops it. We always recreate it from this
// canonical definition (captured from PROD on 2026-05-01) so DEV and PROD stay
// in lockstep regardless of starting state.
const fnSql = `
CREATE OR REPLACE FUNCTION public.nearby_directory_listings(
  user_lat double precision,
  user_lng double precision,
  max_distance_miles double precision DEFAULT 50,
  result_limit integer DEFAULT 24,
  result_offset integer DEFAULT 0,
  search_term text DEFAULT NULL::text,
  vertical_filter text DEFAULT NULL::text
)
 RETURNS TABLE(
   id uuid, name text, slug text, city text, postcode text, logo_url text,
   headline text, average_rating double precision, total_reviews bigint,
   badge_tier text, is_fetchrated_member boolean, distance_miles double precision,
   total_count bigint
 )
 LANGUAGE sql
 STABLE
AS $function$
  WITH filtered AS (
    SELECT
      dl.id,
      dl.name::text,
      dl.slug::text,
      dl.city::text,
      dl.postcode::text,
      dl.logo_url::text,
      dl.headline::text,
      dl.average_rating::float8,
      dl.total_reviews::bigint,
      dl.badge_tier::text,
      dl.is_fetchrated_member,
      (point(dl.longitude::float8, dl.latitude::float8) <@> point(user_lng, user_lat)) AS dist
    FROM directory_listings dl
    WHERE dl.latitude IS NOT NULL
      AND dl.longitude IS NOT NULL
      AND (search_term IS NULL OR dl.name ILIKE '%' || search_term || '%')
      AND (vertical_filter IS NULL OR dl.vertical_type = vertical_filter)
      AND (point(dl.longitude::float8, dl.latitude::float8) <@> point(user_lng, user_lat)) <= max_distance_miles
  )
  SELECT
    f.id, f.name, f.slug, f.city, f.postcode, f.logo_url, f.headline,
    f.average_rating, f.total_reviews, f.badge_tier, f.is_fetchrated_member,
    f.dist AS distance_miles,
    (SELECT count(*) FROM filtered)::bigint AS total_count
  FROM filtered f
  ORDER BY f.dist ASC
  LIMIT result_limit
  OFFSET result_offset;
$function$;
`;

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('ERROR: DATABASE_URL environment variable not set');
    console.error('Make sure .env.local contains DATABASE_URL');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase...');
    await client.connect();
    console.log('Connected.\n');

    console.log('Updating directory_listings view...');
    await client.query(viewSql);
    console.log('✓ View updated successfully\n');

    console.log('Recreating nearby_directory_listings function...');
    try {
      await client.query(fnSql);
      console.log('✓ Function ready\n');
    } catch (e) {
      // The function depends on the earthdistance extension and the view.
      // If earthdistance isn't installed (e.g. DEV without nearby search set up),
      // the function CREATE will fail. Don't block the view migration on this —
      // PROD has the extension, so the function will be created there.
      console.warn(`⚠  Function not created: ${e.message}`);
      console.warn('   (View migration succeeded; function recreate is independent.)\n');
    }

    // Verify the new view structure
    const result = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'directory_listings'
      ORDER BY ordinal_position
    `);

    console.log('View columns (' + result.rows.length + ' fields):');
    console.log('─'.repeat(50));
    for (const row of result.rows) {
      console.log(`  ${row.column_name.padEnd(32)} ${row.data_type}`);
    }

    // Test query
    const testResult = await client.query(`
      SELECT COUNT(*) as count FROM directory_listings
    `);
    console.log('\n✓ View test: ' + testResult.rows[0].count + ' locations visible');

  } catch (err) {
    console.error('\nMigration failed:', err.message);
    if (err.hint) console.error('Hint:', err.hint);
    if (err.detail) console.error('Detail:', err.detail);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
