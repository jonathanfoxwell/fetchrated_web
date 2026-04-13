-- Enable directory listings and generate unique slugs in one pass

DO $$
DECLARE
  enabled_count INT;
  rec RECORD;
  base_slug TEXT;
  final_slug TEXT;
  suffix INT;
  slug_count INT := 0;
BEGIN
  -- Step 1: Enable show_in_directory for qualifying UK vet practices
  UPDATE locations
  SET show_in_directory = true, directory_published_at = NOW()
  WHERE data_quality_flag = 'national_discovery'
    AND business_status = 'OPERATIONAL'
    AND city IS NOT NULL
    AND formatted_address LIKE '%UK'
    AND primary_type = 'veterinary_care';

  GET DIAGNOSTICS enabled_count = ROW_COUNT;
  RAISE NOTICE 'Step 1: Enabled % records for directory', enabled_count;

  -- Step 2: Generate unique slugs one at a time
  FOR rec IN
    SELECT id, name, city
    FROM locations
    WHERE show_in_directory = true AND directory_slug IS NULL
    ORDER BY google_review_count DESC NULLS LAST
  LOOP
    base_slug := LOWER(REGEXP_REPLACE(
      REGEXP_REPLACE(
        TRIM(rec.name || '-' || rec.city),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '\s+', '-', 'g'
    ));

    final_slug := base_slug;
    suffix := 1;
    WHILE EXISTS (SELECT 1 FROM locations WHERE directory_slug = final_slug AND id != rec.id) LOOP
      suffix := suffix + 1;
      final_slug := base_slug || '-' || suffix;
    END LOOP;

    UPDATE locations SET directory_slug = final_slug WHERE id = rec.id;
    slug_count := slug_count + 1;
  END LOOP;

  RAISE NOTICE 'Step 2: Generated % unique slugs', slug_count;
  RAISE NOTICE 'Done. Enabled: %, Slugs: %', enabled_count, slug_count;
END $$;
