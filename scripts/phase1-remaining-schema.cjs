const fs = require('fs');
const path = require('path');

// Load environment
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    process.env[match[1].trim()] = match[2].trim();
  }
}

const { Client } = require('pg');

const sql = `
-- ============================================
-- 1. CREATE VERIFIED_REVIEWS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS verified_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),

  -- Reviewer
  reviewer_name TEXT,
  reviewer_email TEXT,  -- For verification, not displayed

  -- Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  visit_date DATE,

  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verification_method TEXT,  -- 'email' | 'sms' | 'conversation'
  verified_at TIMESTAMPTZ,
  conversation_id UUID,  -- Reference to conversations if exists

  -- Status
  status TEXT DEFAULT 'pending',  -- 'pending' | 'approved' | 'rejected'
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for verified_reviews
CREATE INDEX IF NOT EXISTS idx_verified_reviews_practice ON verified_reviews(practice_id);
CREATE INDEX IF NOT EXISTS idx_verified_reviews_status ON verified_reviews(status);
CREATE INDEX IF NOT EXISTS idx_verified_reviews_published ON verified_reviews(status, published_at DESC);

-- RLS for verified_reviews
ALTER TABLE verified_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published reviews are viewable by everyone" ON verified_reviews;
CREATE POLICY "Published reviews are viewable by everyone"
  ON verified_reviews FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "Service role has full access to reviews" ON verified_reviews;
CREATE POLICY "Service role has full access to reviews"
  ON verified_reviews FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 2. ADD WEBSITE FIELDS TO PRACTICES TABLE
-- ============================================

-- Add columns if they don't exist (using DO block for conditional adds)
DO $$
BEGIN
  -- URL-friendly identifier
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'directory_slug') THEN
    ALTER TABLE practices ADD COLUMN directory_slug TEXT UNIQUE;
  END IF;

  -- Short tagline
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'headline') THEN
    ALTER TABLE practices ADD COLUMN headline TEXT;
  END IF;

  -- Full description (markdown)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'description') THEN
    ALTER TABLE practices ADD COLUMN description TEXT;
  END IF;

  -- Logo URL
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'logo_url') THEN
    ALTER TABLE practices ADD COLUMN logo_url TEXT;
  END IF;

  -- Cover image URL
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'cover_image_url') THEN
    ALTER TABLE practices ADD COLUMN cover_image_url TEXT;
  END IF;

  -- Gallery URLs
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'gallery_urls') THEN
    ALTER TABLE practices ADD COLUMN gallery_urls TEXT[];
  END IF;

  -- Services JSON
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'services') THEN
    ALTER TABLE practices ADD COLUMN services JSONB;
  END IF;

  -- Opening hours JSON
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'opening_hours') THEN
    ALTER TABLE practices ADD COLUMN opening_hours JSONB;
  END IF;

  -- Directory visibility
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'show_in_directory') THEN
    ALTER TABLE practices ADD COLUMN show_in_directory BOOLEAN DEFAULT FALSE;
  END IF;

  -- Directory published timestamp
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practices' AND column_name = 'directory_published_at') THEN
    ALTER TABLE practices ADD COLUMN directory_published_at TIMESTAMPTZ;
  END IF;
END $$;

-- Index for directory queries
CREATE INDEX IF NOT EXISTS idx_practices_directory ON practices(show_in_directory) WHERE show_in_directory = TRUE;
CREATE INDEX IF NOT EXISTS idx_practices_directory_slug ON practices(directory_slug);

-- ============================================
-- 3. CREATE DIRECTORY_LISTINGS VIEW
-- ============================================

-- Drop existing view if it exists
DROP VIEW IF EXISTS directory_listings;

CREATE VIEW directory_listings AS
SELECT
  p.id,
  p.google_place_id,
  p.name,

  -- Use directory_slug if set, otherwise generate from name + city
  COALESCE(
    p.directory_slug,
    LOWER(REGEXP_REPLACE(p.name || '-' || COALESCE(p.city, ''), '[^a-zA-Z0-9]+', '-', 'g'))
  ) as slug,

  -- Location
  p.formatted_address,
  p.street_address,
  p.city,
  p.postcode,
  p.latitude,
  p.longitude,

  -- Contact
  p.phone,
  p.website,
  p.email,

  -- Website content
  p.headline,
  p.description,
  p.logo_url,
  p.cover_image_url,
  p.gallery_urls,
  p.services,
  p.opening_hours,

  -- Scores
  p.google_rating,
  p.google_review_count,
  p.profile_strength_score,

  -- Membership
  p.is_fetchrated_member,
  p.membership_tier,

  -- Review aggregates (if table exists)
  COALESCE(ra.average_rating, p.google_rating) as average_rating,
  COALESCE(ra.total_reviews, p.google_review_count) as total_reviews,
  ra.monthly_review_velocity,
  ra.response_rate,
  ra.most_recent_review_date,

  -- Computed badge
  CASE
    WHEN p.profile_strength_score >= 9.0 THEN 'outstanding'
    WHEN p.profile_strength_score >= 7.5 THEN 'excellent'
    WHEN p.is_fetchrated_member THEN 'verified'
    ELSE NULL
  END as badge_tier,

  -- Timestamps
  p.directory_published_at,
  p.last_updated_at

FROM practices p
LEFT JOIN review_aggregates ra ON ra.practice_id = p.id
WHERE p.show_in_directory = TRUE
  AND p.business_status = 'OPERATIONAL';
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase...');
    await client.connect();
    console.log('Connected. Running Phase 1 remaining schema...\n');

    await client.query(sql);

    console.log('✓ verified_reviews table created');
    console.log('✓ Website fields added to practices table');
    console.log('✓ directory_listings view created');

    // Verify verified_reviews table
    const reviewCols = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'verified_reviews'
      ORDER BY ordinal_position
    `);

    console.log('\nverified_reviews columns:');
    for (const row of reviewCols.rows) {
      console.log('  - ' + row.column_name + ': ' + row.data_type);
    }

    // Verify new practice columns
    const practiceCols = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'practices'
        AND column_name IN ('directory_slug', 'headline', 'description', 'logo_url', 'cover_image_url', 'gallery_urls', 'services', 'opening_hours', 'show_in_directory', 'directory_published_at')
      ORDER BY ordinal_position
    `);

    console.log('\nNew practices columns:');
    for (const row of practiceCols.rows) {
      console.log('  - ' + row.column_name + ': ' + row.data_type);
    }

    // Verify directory_listings view
    const viewCols = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'directory_listings'
      ORDER BY ordinal_position
    `);

    console.log('\ndirectory_listings view columns:');
    for (const row of viewCols.rows) {
      console.log('  - ' + row.column_name + ': ' + row.data_type);
    }

  } catch (err) {
    console.error('Migration failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
