import { unstable_cache } from 'next/cache';
import { createServerClient } from '../supabase';

/**
 * DirectoryListing represents a practice in the public directory view.
 * This interface matches the `directory_listings` Supabase view which
 * exposes only the fields needed by the website (sensitive data stays
 * in the underlying `practices` table).
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

export type PracticeCard = Pick<
  DirectoryListing,
  'id' | 'name' | 'slug' | 'city' | 'postcode' | 'logo_url' | 'headline' |
  'average_rating' | 'total_reviews' | 'badge_tier' | 'is_fetchrated_member'
>;

/**
 * Get a single practice by slug from the directory view.
 */
export const getPracticeBySlug = unstable_cache(
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
  ['practice'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get a practice by ID.
 */
export const getPracticeById = unstable_cache(
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
  ['practice-by-id'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get all directory listings with optional filters.
 */
export const getDirectoryListings = unstable_cache(
  async (options?: {
    city?: string;
    limit?: number;
    offset?: number;
  }): Promise<PracticeCard[]> => {
    const supabase = createServerClient();

    let query = supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member')
      .order('profile_strength_score', { ascending: false });

    if (options?.city) {
      query = query.ilike('city', `%${options.city}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching directory listings:', error);
      return [];
    }

    return (data ?? []) as PracticeCard[];
  },
  ['directory-listings'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get featured/top practices.
 */
export const getFeaturedPractices = unstable_cache(
  async (limit = 6): Promise<PracticeCard[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member')
      .in('badge_tier', ['outstanding', 'excellent'])
      .order('profile_strength_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured practices:', error);
      return [];
    }

    return (data ?? []) as PracticeCard[];
  },
  ['featured-practices'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get practices by IDs (for article embeds).
 */
export const getPracticesByIds = unstable_cache(
  async (ids: string[]): Promise<PracticeCard[]> => {
    if (!ids.length) return [];

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('directory_listings')
      .select('id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member')
      .in('id', ids);

    if (error) {
      console.error('Error fetching practices by IDs:', error);
      return [];
    }

    return (data ?? []) as PracticeCard[];
  },
  ['practices-by-ids'],
  { tags: ['directory'], revalidate: 3600 }
);

/**
 * Get all practice slugs for sitemap.
 */
export async function getAllPracticeSlugs(): Promise<{ slug: string; last_updated_at: string }[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('directory_listings')
    .select('slug, last_updated_at');

  if (error) {
    console.error('Error fetching practice slugs:', error);
    return [];
  }

  return data ?? [];
}
