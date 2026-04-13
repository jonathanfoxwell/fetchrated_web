-- Add county column and populate from address_components_json
-- Then update the directory_listings view to expose it

DO $$
DECLARE
  col_exists BOOLEAN;
  updated_count INT;
BEGIN
  -- Step 1: Add county column if it doesn't exist
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'locations' AND column_name = 'county'
  ) INTO col_exists;

  IF NOT col_exists THEN
    ALTER TABLE locations ADD COLUMN county VARCHAR(255);
    RAISE NOTICE 'Added county column';
  ELSE
    RAISE NOTICE 'county column already exists';
  END IF;

  -- Step 2: Populate county from address_components_json (administrative_area_level_2)
  UPDATE locations
  SET county = (
    SELECT elem->>'longText'
    FROM jsonb_array_elements(address_components_json::jsonb) AS elem
    WHERE elem->'types' ? 'administrative_area_level_2'
    LIMIT 1
  )
  WHERE address_components_json IS NOT NULL
    AND county IS NULL;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Populated county for % records', updated_count;
END $$;
