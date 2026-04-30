-- Surface candidate vet practices to set is_featured = true.
--
-- Run AFTER the 0031_is_featured migration has been applied. This script does
-- not change any data; it just lists candidates for editorial review.
--
-- Criteria: vet-type, in the directory, ordered by review depth + badge tier
-- + average rating. Excludes obvious corporate-group practices where the
-- name pattern is recognisable. The exclusion list is best-effort, not
-- authoritative — review the output before flagging anything.
--
-- Usage:
--   USE_PROD_DB=1 psql ... -f surface-is-featured-candidates.sql
-- Or paste into Supabase SQL editor.

-- =============================================================================
-- 1. Candidate list — top vet practices by review depth and quality
-- =============================================================================
SELECT
  l.id,
  l.name,
  l.city,
  l.county,
  l.postcode,
  l.is_fetchrated_member,
  CASE
    WHEN l.profile_strength_score >= 9.0 THEN 'outstanding'
    WHEN l.profile_strength_score >= 7.5 THEN 'excellent'
    WHEN l.is_fetchrated_member THEN 'verified'
    ELSE NULL
  END AS badge_tier,
  COALESCE(ra.average_rating, l.google_rating) AS average_rating,
  COALESCE(ra.total_reviews, l.google_review_count) AS total_reviews,
  l.website
FROM locations l
LEFT JOIN review_aggregates ra ON ra.location_id = l.id
WHERE l.show_in_directory = true
  AND l.business_status = 'OPERATIONAL'
  AND l.vertical_type = 'vet'
  AND COALESCE(ra.total_reviews, l.google_review_count) >= 30
  AND CASE
        WHEN l.profile_strength_score >= 9.0 THEN 'outstanding'
        WHEN l.profile_strength_score >= 7.5 THEN 'excellent'
        WHEN l.is_fetchrated_member THEN 'verified'
        ELSE NULL
      END IN ('outstanding', 'excellent', 'verified')
  -- Best-effort exclusion of obvious corporate groups (refine as needed):
  AND l.name NOT ILIKE '%Vets4Pets%'
  AND l.name NOT ILIKE '%CVS %'
  AND l.name NOT ILIKE '%IVC %'
  AND l.name NOT ILIKE '%Medivet%'
  AND l.name NOT ILIKE '%VetPartners%'
  AND l.name NOT ILIKE '%Pets at Home%'
  AND l.name NOT ILIKE '%White Cross%'
  AND l.name NOT ILIKE '%Linnaeus%'
ORDER BY
  COALESCE(ra.total_reviews, l.google_review_count) DESC NULLS LAST,
  l.profile_strength_score DESC NULLS LAST,
  COALESCE(ra.average_rating, l.google_rating) DESC NULLS LAST
LIMIT 25;

-- =============================================================================
-- 2. After picking your final set, run an UPDATE like this (3-6 IDs is typical)
-- =============================================================================
-- UPDATE locations
-- SET is_featured = true
-- WHERE id IN (
--   '00000000-0000-0000-0000-000000000001',  -- replace with picked IDs
--   '00000000-0000-0000-0000-000000000002',
--   '00000000-0000-0000-0000-000000000003'
-- );

-- =============================================================================
-- 3. Verify the homepage / /find Featured rail will pick them up
-- =============================================================================
-- SELECT id, name, city, total_reviews, badge_tier
-- FROM directory_listings
-- WHERE is_featured = true
-- ORDER BY total_reviews DESC NULLS LAST;

-- =============================================================================
-- 4. To unfeature a practice later
-- =============================================================================
-- UPDATE locations SET is_featured = false WHERE id = '...';
