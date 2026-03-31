/**
 * Migration: Update directory_listings view to expose only required fields
 *
 * This removes sensitive/internal fields from the public view:
 * - google_place_id (internal identifier)
 * - google_rating/google_review_count (raw scores, used only as fallback)
 * - street_address (redundant with formatted_address)
 * - directory_published_at (not used in UI)
 * - most_recent_review_date (not used in UI)
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

const sql = `
-- ============================================
-- UPDATE DIRECTORY_LISTINGS VIEW
-- Only expose fields needed by fetchrated_website
-- ============================================

-- Drop existing view
DROP VIEW IF EXISTS directory_listings;

-- Create minimal view with only required fields
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
  p.logo_url,
  p.cover_image_url,
  p.gallery_urls,
  p.services,
  p.opening_hours,

  -- Scores (public-facing only)
  p.profile_strength_score,

  -- Membership
  p.is_fetchrated_member,
  p.membership_tier,

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

FROM practices p
LEFT JOIN review_aggregates ra ON ra.practice_id = p.id
WHERE p.show_in_directory = TRUE
  AND p.business_status = 'OPERATIONAL';

-- Add comment documenting the view purpose
COMMENT ON VIEW directory_listings IS
'Public directory view for fetchrated_website. Exposes only fields needed for practice cards and detail pages. Sensitive data remains in practices table.';
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
    await client.query(sql);
    console.log('✓ View updated successfully\n');

    // Verify the new view structure
    const result = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'directory_listings'
      ORDER BY ordinal_position
    `);

    console.log('New view columns (' + result.rows.length + ' fields):');
    console.log('─'.repeat(50));
    for (const row of result.rows) {
      console.log(`  ${row.column_name.padEnd(25)} ${row.data_type}`);
    }

    // List removed fields
    console.log('\n✓ Removed fields (no longer exposed):');
    console.log('  - google_place_id');
    console.log('  - google_rating');
    console.log('  - google_review_count');
    console.log('  - street_address');
    console.log('  - directory_published_at');
    console.log('  - most_recent_review_date');

    // Test query
    const testResult = await client.query(`
      SELECT COUNT(*) as count FROM directory_listings
    `);
    console.log('\n✓ View test: ' + testResult.rows[0].count + ' practices visible');

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
