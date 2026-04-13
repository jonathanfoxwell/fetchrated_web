-- Enable directory listings for high-quality UK veterinary practices
-- Run in Supabase SQL Editor
-- Backup taken: 2026-04-12 (backups/supabase_data_2026-04-12.sql)

-- Step 1: Preview what will be enabled (dry run)
-- Uncomment the SELECT below to preview before running the UPDATE

-- SELECT
--   count(*) AS total,
--   count(*) FILTER (WHERE city IS NOT NULL) AS has_city,
--   count(*) FILTER (WHERE phone IS NOT NULL) AS has_phone,
--   count(*) FILTER (WHERE google_rating IS NOT NULL) AS has_rating
-- FROM locations
-- WHERE data_quality_flag = 'national_discovery'
--   AND business_status = 'OPERATIONAL'
--   AND city IS NOT NULL
--   AND formatted_address LIKE '%UK'
--   AND (primary_type = 'veterinary_care' OR primary_type IS NULL);

-- Step 2: Set show_in_directory = true for qualifying records
-- Criteria:
--   - national_discovery pipeline (high-quality Google Places data)
--   - business_status = OPERATIONAL
--   - has a city value
--   - UK address (excludes French/Irish records that leaked in)
--   - primary_type is veterinary_care (confirmed vets)
UPDATE locations
SET
  show_in_directory = true,
  directory_published_at = NOW()
WHERE data_quality_flag = 'national_discovery'
  AND business_status = 'OPERATIONAL'
  AND city IS NOT NULL
  AND formatted_address LIKE '%UK'
  AND primary_type = 'veterinary_care';

-- Step 3: Generate directory_slug for any records that don't have one
-- The view auto-generates slugs, but stored slugs are better for stability
UPDATE locations
SET directory_slug = LOWER(REGEXP_REPLACE(
  REGEXP_REPLACE(
    TRIM(name || '-' || city),
    '[^a-zA-Z0-9\s-]', '', 'g'
  ),
  '\s+', '-', 'g'
))
WHERE show_in_directory = true
  AND directory_slug IS NULL;

-- Step 4: Fix duplicate slugs by appending a numeric suffix
WITH dupes AS (
  SELECT id, directory_slug,
    ROW_NUMBER() OVER (
      PARTITION BY directory_slug
      ORDER BY google_review_count DESC NULLS LAST
    ) AS rn
  FROM locations
  WHERE show_in_directory = true
    AND directory_slug IS NOT NULL
)
UPDATE locations
SET directory_slug = dupes.directory_slug || '-' || dupes.rn
FROM dupes
WHERE locations.id = dupes.id
  AND dupes.rn > 1;

-- Step 5: Verify results
SELECT
  count(*) AS total_enabled,
  count(DISTINCT city) AS unique_cities,
  count(*) FILTER (WHERE directory_slug IS NOT NULL) AS has_slug,
  count(*) FILTER (WHERE phone IS NOT NULL) AS has_phone,
  count(*) FILTER (WHERE website IS NOT NULL) AS has_website,
  count(*) FILTER (WHERE google_rating IS NOT NULL) AS has_rating,
  count(*) FILTER (WHERE opening_hours IS NOT NULL OR opening_hours_json IS NOT NULL) AS has_hours
FROM locations
WHERE show_in_directory = true;

-- Step 6: Verify the directory_listings view now returns data
SELECT count(*) AS directory_view_count FROM directory_listings;
