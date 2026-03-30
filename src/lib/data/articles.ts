import { unstable_cache } from 'next/cache';
import { createServerClient } from '../supabase';

export interface Article {
  id: string;
  slug: string;
  audience: 'consumer' | 'practice';
  category: string;
  tags: string[] | null;
  title: string;
  excerpt: string;
  sections: ArticleSection[];
  word_count: number | null;
  read_time: number | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  related_slugs: string[] | null;
  pillar_slug: string | null;
  is_pillar: boolean;
  featured_practice_ids: string[] | null;
  cta_type: 'find-practice' | 'join-pilot' | 'get-verified' | 'custom' | null;
  cta_href: string | null;
  cta_label: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  updated_at: string;
  created_at: string;
}

export type ArticleSection =
  | { type: 'markdown'; content: string }
  | { type: 'callout'; variant: 'info' | 'tip' | 'warning' | 'important'; title?: string; content: string }
  | { type: 'checklist'; title?: string; icon?: string; items: { title: string; description?: string }[] }
  | { type: 'pro-tip'; title?: string; quote: string; author?: string; authorRole?: string }
  | { type: 'faq'; title?: string; items: { question: string; answer: string }[] }
  | { type: 'key-metrics'; metrics: { value: string; unit?: string; label: string }[] }
  | { type: 'status-bar'; status: 'active' | 'pending' | 'warning'; title: string; subtitle?: string; metrics?: { value: string; label: string }[] }
  | { type: 'data-table'; title?: string; columns: { key: string; header: string; align?: string }[]; data: Record<string, string>[] }
  | { type: 'pull-quote'; quote: string; author?: string; source?: string; variant?: 'default' | 'featured' | 'sidebar' }
  | { type: 'image'; src: string; alt: string; caption?: string; credit?: string }
  | { type: 'code-block'; code: string; language?: string; filename?: string }
  | { type: 'summary-box'; title?: string; content: string; variant?: 'default' | 'highlight' | 'dark'; action?: { label: string; href: string } }
  | { type: 'numbered-section'; number: number; title: string; content: string }
  | { type: 'practice-card'; practiceId: string }
  | { type: 'practice-grid'; practiceIds: string[]; title?: string };

export type ArticleSummary = Pick<
  Article,
  'slug' | 'title' | 'excerpt' | 'category' | 'read_time' | 'is_pillar' | 'published_at' | 'featured_image_url'
>;

/**
 * Get a single article by slug.
 * Cached for 1 hour, revalidated via webhook.
 */
export const getArticleBySlug = unstable_cache(
  async (slug: string, options?: { includeDrafts?: boolean }): Promise<Article | null> => {
    const supabase = createServerClient();

    let query = supabase
      .from('articles')
      .select('*')
      .eq('slug', slug);

    if (!options?.includeDrafts) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return null;
    }

    return data as Article;
  },
  ['article'],
  { tags: ['articles'], revalidate: 3600 }
);

/**
 * Get articles by audience with optional category filter.
 * Returns summary info only (not full content).
 */
export const getArticlesByAudience = unstable_cache(
  async (audience: 'consumer' | 'practice', category?: string): Promise<ArticleSummary[]> => {
    const supabase = createServerClient();

    let query = supabase
      .from('articles')
      .select('slug, title, excerpt, category, read_time, is_pillar, published_at, featured_image_url')
      .eq('audience', audience)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }

    return (data ?? []) as ArticleSummary[];
  },
  ['articles-list'],
  { tags: ['articles'], revalidate: 3600 }
);

/**
 * Get pillar articles for a given audience.
 */
export const getPillarArticles = unstable_cache(
  async (audience: 'consumer' | 'practice'): Promise<ArticleSummary[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('articles')
      .select('slug, title, excerpt, category, read_time, is_pillar, published_at, featured_image_url')
      .eq('audience', audience)
      .eq('status', 'published')
      .eq('is_pillar', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching pillar articles:', error);
      return [];
    }

    return (data ?? []) as ArticleSummary[];
  },
  ['pillar-articles'],
  { tags: ['articles'], revalidate: 3600 }
);

/**
 * Get supporting articles for a pillar.
 */
export const getSupportingArticles = unstable_cache(
  async (pillarSlug: string): Promise<ArticleSummary[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('articles')
      .select('slug, title, excerpt, category, read_time, is_pillar, published_at, featured_image_url')
      .eq('pillar_slug', pillarSlug)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching supporting articles:', error);
      return [];
    }

    return (data ?? []) as ArticleSummary[];
  },
  ['supporting-articles'],
  { tags: ['articles'], revalidate: 3600 }
);

/**
 * Get related articles by slug.
 */
export const getRelatedArticles = unstable_cache(
  async (slug: string, limit = 3): Promise<ArticleSummary[]> => {
    const supabase = createServerClient();

    // First get the article to find its related_slugs and category
    const { data: article } = await supabase
      .from('articles')
      .select('related_slugs, category, audience, tags')
      .eq('slug', slug)
      .single();

    if (!article) return [];

    // If manual related_slugs exist, use those
    if (article.related_slugs?.length) {
      const { data } = await supabase
        .from('articles')
        .select('slug, title, excerpt, category, read_time, is_pillar, published_at, featured_image_url')
        .in('slug', article.related_slugs)
        .eq('status', 'published')
        .limit(limit);

      return (data ?? []) as ArticleSummary[];
    }

    // Otherwise, find by same category
    const { data } = await supabase
      .from('articles')
      .select('slug, title, excerpt, category, read_time, is_pillar, published_at, featured_image_url')
      .eq('category', article.category)
      .eq('audience', article.audience)
      .eq('status', 'published')
      .neq('slug', slug)
      .limit(limit);

    return (data ?? []) as ArticleSummary[];
  },
  ['related-articles'],
  { tags: ['articles'], revalidate: 3600 }
);

/**
 * Get all published article slugs for sitemap generation.
 */
export async function getAllPublishedSlugs(): Promise<{ slug: string; updated_at: string; is_pillar: boolean; audience: string }[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('articles')
    .select('slug, updated_at, is_pillar, audience')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  return data ?? [];
}
