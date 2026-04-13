-- Enable extensions and create distance-sorted directory query function

DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS cube;
  CREATE EXTENSION IF NOT EXISTS earthdistance;
  RAISE NOTICE 'Extensions enabled';
END $$;
