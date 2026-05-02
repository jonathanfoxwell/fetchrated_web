import { unstable_cache } from 'next/cache';
import { createServerClient } from '../supabase';

/**
 * DirectoryListing represents a location in the public directory view.
 * This interface matches the `directory_listings` Supabase view which
 * exposes only the fields needed by the website (sensitive data stays
 * in the underlying `locations` table).
 */
export interface DirectoryListing {
  // Identity
  id: string;
  name: string;
  slug: string;

  // Location
  formatted_address: string | null;
  city: string | null;
  postcode: string | null;
  latitude: number | null;
  longitude: number | null;

  // Contact
  phone: string | null;
  website: string | null;
  email: string | null;

  // Content
  headline: string | null;
  description: string | null;
  ai_description: string | null;
  ai_description_generated_at: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  services: Service[] | null;
  opening_hours: OpeningHours | null;
  current_opening_hours_json: CurrentOpeningHours | null;

  // Practice attributes (Google Places)
  opening_date: string | null;
  accessibility_json: AccessibilityFlags | null;
  parking_json: ParkingFlags | null;
  google_featured_reviews_json: GoogleFeaturedReview[] | null;

  // Scores
  profile_strength_score: number | null;

  // Membership
  is_fetchrated_member: boolean;
  membership_tier: string | null;

  // Editorial flag (homepage + /find Featured rail)
  is_featured: boolean;

  // Service vertical — used to constrain the public directory to vet-type entries
  // until non-vet data has real underlying records.
  vertical_type: string;

  // Review aggregates
  average_rating: number | null;
  total_reviews: number | null;
  monthly_review_velocity: number | null;
  response_rate: number | null;

  // Computed
  badge_tier: 'outstanding' | 'excellent' | 'verified' | null;

  // Consolidator ownership (sourced from website-scrape group detection,
  // mapped to the six CMA-named UK veterinary consolidators via the
  // consolidator_groups reference table). Null = not detected as belonging
  // to one of those six. Sub-brands (Vets Now, Independent Vetcare, etc.)
  // resolve to their parent here.
  consolidator_group_name: string | null;
  consolidator_group_slug: string | null;
  consolidator_ownership_type: 'wholly_owned' | 'jv' | null;

  // Timestamps
  last_updated_at: string;
}

export interface Service {
  name: string;
  description?: string;
  price_from?: string;
}

export interface OpeningHours {
  monday?: { open: string; close: string };
  tuesday?: { open: string; close: string };
  wednesday?: { open: string; close: string };
  thursday?: { open: string; close: string };
  friday?: { open: string; close: string };
  saturday?: { open: string; close: string };
  sunday?: { open: string; close: string };
}

/**
 * Google Places API v1 currentOpeningHours shape (stored verbatim).
 * `periods` is the structured weekly schedule; `weekdayDescriptions` is a
 * pre-formatted array of strings for each day.
 */
export interface CurrentOpeningHours {
  openNow?: boolean; // stale at fetch time — never trust without recomputing
  periods?: Array<{
    open: { day: number; hour: number; minute: number };
    close?: { day: number; hour: number; minute: number };
  }>;
  weekdayDescriptions?: string[];
  nextOpenTime?: string;
  nextCloseTime?: string;
}

/**
 * Google Places accessibilityOptions — boolean flags. Always render only
 * `true` flags; absent/false values often mean "Google doesn't know" rather
 * than a definitive No, and showing them creates false negatives.
 */
export interface AccessibilityFlags {
  wheelchairAccessibleParking?: boolean;
  wheelchairAccessibleEntrance?: boolean;
  wheelchairAccessibleRestroom?: boolean;
  wheelchairAccessibleSeating?: boolean;
}

/**
 * Google Places parkingOptions — boolean flags. Same caveat as accessibility:
 * render only `true` values.
 */
export interface ParkingFlags {
  freeParkingLot?: boolean;
  paidParkingLot?: boolean;
  freeStreetParking?: boolean;
  paidStreetParking?: boolean;
  valetParking?: boolean;
  freeGarageParking?: boolean;
  paidGarageParking?: boolean;
}

/**
 * Google Places API v1 review object (stored as JSONB array).
 * `text` and `originalText` are nested objects; `authorAttribution` carries
 * the display name and (optionally) photo URI.
 */
export interface GoogleFeaturedReview {
  name?: string; // Google's review resource ID
  rating?: number;
  text?: { text: string; languageCode?: string };
  originalText?: { text: string; languageCode?: string };
  authorAttribution?: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
  relativePublishTimeDescription?: string;
  flagContentUri?: string;
  googleMapsUri?: string;
}

export type LocationCard = Pick<
  DirectoryListing,
  'id' | 'name' | 'slug' | 'city' | 'postcode' | 'logo_url' | 'headline' |
  'average_rating' | 'total_reviews' | 'badge_tier' | 'is_fetchrated_member' |
  'consolidator_group_name' | 'consolidator_group_slug'
> & {
  distance_miles?: number;
};

/**
 * Get a single location by slug from the directory view.
 */
export const getLocationBySlug = unstable_cache(
  async (slug: string): Promise<DirectoryListing | null> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as DirectoryListing;
  },
  ['location'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get a location by ID.
 */
export const getLocationById = unstable_cache(
  async (id: string): Promise<DirectoryListing | null> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as DirectoryListing;
  },
  ['location-by-id'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get all directory listings with optional filters.
 * Returns both the data and total count for pagination.
 *
 * verticalType defaults to 'vet' because non-vet categories (groomers, trainers,
 * boarding) do not yet have real underlying data. Pass null to query all verticals.
 */
export async function getDirectoryListings(options?: {
  search?: string;
  location?: string;
  city?: string;
  limit?: number;
  offset?: number;
  verticalType?: string | null;
}): Promise<{ data: LocationCard[]; totalCount: number }> {
  const supabase = createServerClient();

  let query = supabase
    .from('directory_listings')
    .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member, consolidator_group_name, consolidator_group_slug', { count: 'exact' })
    .order('average_rating', { ascending: false, nullsFirst: false });

  const verticalType = options?.verticalType === undefined ? 'vet' : options.verticalType;
  if (verticalType !== null) {
    query = query.eq('vertical_type', verticalType);
  }

  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`);
  }

  // location: search across city OR county (e.g., "Kent", "London", "Hampshire")
  if (options?.location) {
    query = query.or(`city.ilike.%${options.location}%,county.ilike.%${options.location}%`);
  }

  // city: exact city filter (used by location pages)
  if (options?.city) {
    query = query.ilike('city', `%${options.city}%`);
  }

  const limit = options?.limit ?? 24;
  const offset = options?.offset ?? 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching directory listings:', error);
    return { data: [], totalCount: 0 };
  }

  return {
    data: (data ?? []) as LocationCard[],
    totalCount: count ?? 0,
  };
}

/**
 * Get nearby directory listings sorted by distance.
 * Uses the PostGIS-powered RPC function.
 */
export async function getNearbyListings(options: {
  lat: number;
  lng: number;
  search?: string;
  maxMiles?: number;
  limit?: number;
  offset?: number;
  verticalType?: string | null;
}): Promise<{ data: LocationCard[]; totalCount: number }> {
  const supabase = createServerClient();

  const verticalType = options.verticalType === undefined ? 'vet' : options.verticalType;

  const { data, error } = await supabase.rpc('nearby_directory_listings', {
    user_lat: options.lat,
    user_lng: options.lng,
    max_distance_miles: options.maxMiles ?? 50,
    result_limit: options.limit ?? 24,
    result_offset: options.offset ?? 0,
    search_term: options.search || null,
    vertical_filter: verticalType,
  });

  if (error) {
    console.error('Error fetching nearby listings:', error);
    return { data: [], totalCount: 0 };
  }

  // The nearby_directory_listings RPC has not yet been refreshed to include
  // consolidator_group_name/slug (its body uses the earthdistance `<@>`
  // operator which isn't available on every dev DB; refresh deferred to a
  // follow-up migration). For now, "near me" results don't carry the
  // consolidator label — falling back to null. Regular directory listings
  // (via the view) do show the label.
  const rows = data as Array<LocationCard & { distance_miles: number; total_count: number }>;
  return {
    data: rows.map(r => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      city: r.city,
      postcode: r.postcode,
      logo_url: r.logo_url,
      headline: r.headline,
      average_rating: r.average_rating,
      total_reviews: r.total_reviews,
      badge_tier: r.badge_tier,
      is_fetchrated_member: r.is_fetchrated_member,
      consolidator_group_name: null,
      consolidator_group_slug: null,
      distance_miles: r.distance_miles,
    })),
    totalCount: rows[0]?.total_count ?? 0,
  };
}

/**
 * Get editorially featured locations (homepage + /find Featured rail).
 * Filters on the is_featured flag, ordered by total_reviews descending so the
 * strongest social proof leads. Constrained to vet-type entries until non-vet
 * data has real underlying records.
 */
export const getFeaturedListings = unstable_cache(
  async (limit = 3): Promise<LocationCard[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member, consolidator_group_name, consolidator_group_slug')
      .eq('is_featured', true)
      .eq('vertical_type', 'vet')
      .order('total_reviews', { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured listings:', error);
      return [];
    }

    return (data ?? []) as LocationCard[];
  },
  ['featured-listings'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Legacy featured-locations query — kept for backwards compatibility.
 * Falls back to badge_tier-based selection if no editorial featured rows exist.
 */
export const getFeaturedLocations = unstable_cache(
  async (limit = 6): Promise<LocationCard[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member, consolidator_group_name, consolidator_group_slug')
      .in('badge_tier', ['outstanding', 'excellent'])
      .order('profile_strength_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured locations:', error);
      return [];
    }

    return (data ?? []) as LocationCard[];
  },
  ['featured-locations'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get locations by IDs (for article embeds).
 */
export const getLocationsByIds = unstable_cache(
  async (ids: string[]): Promise<LocationCard[]> => {
    if (!ids.length) return [];

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member, consolidator_group_name, consolidator_group_slug')
      .in('id', ids);

    if (error) {
      console.error('Error fetching locations by IDs:', error);
      return [];
    }

    return (data ?? []) as LocationCard[];
  },
  ['locations-by-ids'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get all location slugs for sitemap.
 */
export async function getAllLocationSlugs(): Promise<{ slug: string; last_updated_at: string }[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('directory_listings')
    .select('slug, last_updated_at');

  if (error) {
    console.error('Error fetching location slugs:', error);
    return [];
  }

  return data ?? [];
}

/**
 * Get distinct cities with location counts for directory navigation.
 */
export const getDirectoryCities = unstable_cache(
  async (): Promise<{ city: string; count: number }[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('city');

    if (error) {
      console.error('Error fetching directory cities:', error);
      return [];
    }

    // Aggregate in JS since Supabase doesn't support GROUP BY via REST
    const counts: Record<string, number> = {};
    (data ?? []).forEach((row: { city: string | null }) => {
      if (row.city) {
        counts[row.city] = (counts[row.city] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count);
  },
  ['directory-cities'],
  { tags: ['directory'], revalidate: 3600 }
);
