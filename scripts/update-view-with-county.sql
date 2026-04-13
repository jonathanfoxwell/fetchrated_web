CREATE VIEW directory_listings AS
SELECT
  p.id,
  p.name,
  COALESCE(p.directory_slug, LOWER(REGEXP_REPLACE(
    p.name::text || '-' || COALESCE(p.city, '')::text,
    '[^a-zA-Z0-9]+', '-', 'g'
  ))) AS slug,
  p.formatted_address,
  p.city,
  p.county,
  p.postcode,
  p.latitude,
  p.longitude,
  p.phone,
  p.website,
  p.email,
  p.headline,
  p.description,
  p.logo_url,
  p.cover_image_url,
  p.gallery_urls,
  p.services,
  p.opening_hours,
  p.profile_strength_score,
  p.is_fetchrated_member,
  p.membership_tier,
  COALESCE(ra.average_rating, p.google_rating) AS average_rating,
  COALESCE(ra.total_reviews, p.google_review_count) AS total_reviews,
  ra.monthly_review_velocity,
  ra.response_rate,
  CASE
    WHEN p.profile_strength_score >= 9.0 THEN 'outstanding'
    WHEN p.profile_strength_score >= 7.5 THEN 'excellent'
    WHEN p.is_fetchrated_member THEN 'verified'
    ELSE NULL
  END AS badge_tier,
  p.last_updated_at
FROM locations p
LEFT JOIN review_aggregates ra ON ra.location_id = p.id
WHERE p.show_in_directory = true
  AND p.business_status = 'OPERATIONAL'
