-- Create function to find nearby directory listings sorted by distance
-- Returns card-level data plus distance in miles

CREATE OR REPLACE FUNCTION nearby_directory_listings(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  max_distance_miles DOUBLE PRECISION DEFAULT 50,
  result_limit INTEGER DEFAULT 24,
  result_offset INTEGER DEFAULT 0,
  search_term TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  city TEXT,
  postcode TEXT,
  logo_url TEXT,
  headline TEXT,
  average_rating DOUBLE PRECISION,
  total_reviews BIGINT,
  badge_tier TEXT,
  is_fetchrated_member BOOLEAN,
  distance_miles DOUBLE PRECISION,
  total_count BIGINT
)
LANGUAGE sql
STABLE
AS $$
  WITH filtered AS (
    SELECT
      dl.id,
      dl.name::text,
      dl.slug::text,
      dl.city::text,
      dl.postcode::text,
      dl.logo_url::text,
      dl.headline::text,
      dl.average_rating::float8,
      dl.total_reviews::bigint,
      dl.badge_tier::text,
      dl.is_fetchrated_member,
      (point(dl.longitude::float8, dl.latitude::float8) <@> point(user_lng, user_lat)) AS dist
    FROM directory_listings dl
    WHERE dl.latitude IS NOT NULL
      AND dl.longitude IS NOT NULL
      AND (search_term IS NULL OR dl.name ILIKE '%' || search_term || '%')
      AND (point(dl.longitude::float8, dl.latitude::float8) <@> point(user_lng, user_lat)) <= max_distance_miles
  )
  SELECT
    f.id, f.name, f.slug, f.city, f.postcode, f.logo_url, f.headline,
    f.average_rating, f.total_reviews, f.badge_tier, f.is_fetchrated_member,
    f.dist AS distance_miles,
    (SELECT count(*) FROM filtered)::bigint AS total_count
  FROM filtered f
  ORDER BY f.dist ASC
  LIMIT result_limit
  OFFSET result_offset;
$$;
