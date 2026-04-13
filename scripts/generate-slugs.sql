-- Generate directory slugs with duplicate handling
-- Run via: npx supabase db query --db-url "..." -f scripts/generate-slugs.sql

DO $$
DECLARE
  rec RECORD;
  base_slug TEXT;
  final_slug TEXT;
  suffix INT;
BEGIN
  FOR rec IN
    SELECT id, name, city, google_review_count
    FROM locations
    WHERE show_in_directory = true AND directory_slug IS NULL
    ORDER BY google_review_count DESC NULLS LAST
  LOOP
    base_slug := LOWER(REGEXP_REPLACE(
      REGEXP_REPLACE(TRIM(rec.name || '-' || rec.city), '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ));

    -- Check for existing slug and append suffix if needed
    final_slug := base_slug;
    suffix := 1;
    WHILE EXISTS (SELECT 1 FROM locations WHERE directory_slug = final_slug AND id != rec.id) LOOP
      suffix := suffix + 1;
      final_slug := base_slug || '-' || suffix;
    END LOOP;

    UPDATE locations SET directory_slug = final_slug WHERE id = rec.id;
  END LOOP;

  RAISE NOTICE 'Slugs generated for all show_in_directory records';
END $$;
