-- Fix the "Veterinary Surgey Freshwater" typo in the locations table.
--
-- Pre-flight: confirm the correct name BEFORE running this. The likely correction
-- is "Veterinary Surgery Freshwater" but verify against:
--   1. Google Maps / Google Business Profile
--   2. Companies House (if you have the company number)
--   3. The practice's website (if any)
--
-- Replace CORRECTED_NAME below with whatever you confirm.
--
-- Then run on PROD:
--   USE_PROD_DB=1 psql ... -f fix-veterinary-surgey-typo.sql
-- Or via the Supabase SQL editor.

-- 1. Sanity check — confirm exactly one row matches
SELECT id, name, city, postcode, formatted_address
FROM locations
WHERE name ILIKE '%Veterinary Surgey%';

-- 2. The fix (replace CORRECTED_NAME, then uncomment to run)
-- UPDATE locations
-- SET name = 'CORRECTED_NAME',
--     last_updated_at = NOW()
-- WHERE name ILIKE '%Veterinary Surgey%';

-- 3. Verify
-- SELECT id, name FROM locations WHERE name ILIKE '%Veterinary Surge%';

-- 4. Trigger website cache flush (the directory_listings query has revalidate: 3600).
--    Either wait an hour, or call revalidateTag('directory') from the website app
--    via an admin endpoint, or run the website's existing revalidation script if any.
