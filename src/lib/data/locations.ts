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
  logo_url: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  services: Service[] | null;
  opening_hours: OpeningHours | null;

  // Scores
  profile_strength_score: number | null;

  // Membership
  is_fetchrated_member: boolean;
  membership_tier: string | null;

  // Review aggregates
  average_rating: number | null;
  total_reviews: number | null;
  monthly_review_velocity: number | null;
  response_rate: number | null;

  // Computed
  badge_tier: 'outstanding' | 'excellent' | 'verified' | null;

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

export type LocationCard = Pick<
  DirectoryListing,
  'id' | 'name' | 'slug' | 'city' | 'postcode' | 'logo_url' | 'headline' |
  'average_rating' | 'total_reviews' | 'badge_tier' | 'is_fetchrated_member'
>;

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
 */
export async function getDirectoryListings(options?: {
  search?: string;
  city?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: LocationCard[]; totalCount: number }> {
  const supabase = createServerClient();

  let query = supabase
    .from('directory_listings')
    .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member', { count: 'exact' })
    .order('average_rating', { ascending: false, nullsFirst: false });

  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`);
  }

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
 * Get featured/top locations.
 */
export const getFeaturedLocations = unstable_cache(
  async (limit = 6): Promise<LocationCard[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member')
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
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member')
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
