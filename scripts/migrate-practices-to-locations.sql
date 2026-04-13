-- Migration: Rename practices to locations (remaining columns)
-- Run this in Supabase SQL Editor after deploying the code changes
-- ============================================================
--
-- Current DB state (verified 2026-04-12):
--   locations table       : EXISTS (9,415 rows) -- already renamed from practices  ✓
--   companies table       : EXISTS (344 rows)   -- already has locations.company_id ✓
--   review_aggregates     : already uses location_id                                ✓
--   directory_listings    : view works (PG tracks renames by OID)                   ✓
--   verified_reviews      : STILL has practice_id (needs rename)                    ✗
--   articles              : STILL has featured_practice_ids (needs rename)           ✗
--   No articles use practice-card/practice-grid sections or find-practice CTA
--

-- 1. Rename column on articles table
ALTER TABLE articles RENAME COLUMN featured_practice_ids TO featured_location_ids;

-- 2. Rename column on verified_reviews table
ALTER TABLE verified_reviews RENAME COLUMN practice_id TO location_id;

-- 3. Safe no-ops: update any articles that may have been created with old values
--    (no matching rows exist today, but guards against race condition)
UPDATE articles
SET cta_type = 'find-location'
WHERE cta_type = 'find-practice';

UPDATE articles
SET sections = (
  SELECT jsonb_agg(
    CASE
      WHEN elem->>'type' = 'practice-card'
        THEN (elem - 'practiceId' - 'type')
              || jsonb_build_object('type', 'location-card', 'locationId', elem->>'practiceId')
      WHEN elem->>'type' = 'practice-grid'
        THEN (elem - 'practiceIds' - 'type')
              || jsonb_build_object('type', 'location-grid', 'locationIds', elem->'practiceIds')
      ELSE elem
    END
  )
  FROM jsonb_array_elements(sections::jsonb) AS elem
)
WHERE sections::text LIKE '%practice-card%'
   OR sections::text LIKE '%practice-grid%';
