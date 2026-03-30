/**
 * Article utilities for fetching and rendering content from Supabase
 *
 * This module provides the interface for fetching article content
 * stored in Supabase and rendering it with the ArticleContent component.
 *
 * Database Schema (expected):
 * ```sql
 * CREATE TABLE articles (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   slug TEXT UNIQUE NOT NULL,
 *   title TEXT NOT NULL,
 *   excerpt TEXT,
 *   content_body TEXT NOT NULL,  -- Markdown content
 *   category TEXT,
 *   author_name TEXT,
 *   author_role TEXT,
 *   published_at TIMESTAMPTZ,
 *   updated_at TIMESTAMPTZ DEFAULT NOW(),
 *   read_time INTEGER,  -- Estimated reading time in minutes
 *   is_pillar BOOLEAN DEFAULT FALSE,
 *   featured_image_url TEXT,
 *   meta_title TEXT,
 *   meta_description TEXT,
 *   status TEXT DEFAULT 'draft'  -- draft, published, archived
 * );
 *
 * -- Add full-text search
 * CREATE INDEX articles_fts_idx ON articles
 *   USING gin(to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || content_body));
 * ```
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_body: string;
  category: string | null;
  author_name: string | null;
  author_role: string | null;
  published_at: string | null;
  updated_at: string;
  read_time: number | null;
  is_pillar: boolean;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: "draft" | "published" | "archived";
}

export interface ArticleListItem {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  read_time: number | null;
  is_pillar: boolean;
  featured_image_url: string | null;
  published_at: string | null;
}

/**
 * Example: Fetch a single article by slug
 *
 * ```typescript
 * import { createClient } from '@supabase/supabase-js';
 *
 * const supabase = createClient(
 *   process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 * );
 *
 * export async function getArticleBySlug(slug: string): Promise<Article | null> {
 *   const { data, error } = await supabase
 *     .from('articles')
 *     .select('*')
 *     .eq('slug', slug)
 *     .eq('status', 'published')
 *     .single();
 *
 *   if (error || !data) return null;
 *   return data as Article;
 * }
 * ```
 */

/**
 * Example: Fetch article listing
 *
 * ```typescript
 * export async function getArticles(options?: {
 *   category?: string;
 *   limit?: number;
 *   isPillar?: boolean;
 * }): Promise<ArticleListItem[]> {
 *   let query = supabase
 *     .from('articles')
 *     .select('slug, title, excerpt, category, read_time, is_pillar, featured_image_url, published_at')
 *     .eq('status', 'published')
 *     .order('published_at', { ascending: false });
 *
 *   if (options?.category) {
 *     query = query.eq('category', options.category);
 *   }
 *   if (options?.isPillar !== undefined) {
 *     query = query.eq('is_pillar', options.isPillar);
 *   }
 *   if (options?.limit) {
 *     query = query.limit(options.limit);
 *   }
 *
 *   const { data, error } = await query;
 *   if (error) return [];
 *   return data as ArticleListItem[];
 * }
 * ```
 */

/**
 * Example: Search articles
 *
 * ```typescript
 * export async function searchArticles(query: string): Promise<ArticleListItem[]> {
 *   const { data, error } = await supabase
 *     .from('articles')
 *     .select('slug, title, excerpt, category, read_time, is_pillar, featured_image_url, published_at')
 *     .eq('status', 'published')
 *     .textSearch('title', query, { type: 'websearch' })
 *     .limit(10);
 *
 *   if (error) return [];
 *   return data as ArticleListItem[];
 * }
 * ```
 */

/**
 * Calculate estimated reading time from markdown content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadTime(content: string): number {
  // Remove markdown syntax for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]+`/g, "") // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove link syntax
    .replace(/[#*_~>`]/g, "") // Remove markdown formatting
    .replace(/\n+/g, " "); // Replace newlines with spaces

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Extract headings from markdown for table of contents
 */
export function extractHeadings(
  content: string
): { id: string; title: string; level: number }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { id: string; title: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    headings.push({ id, title, level });
  }

  return headings;
}

/**
 * Convert Guide type to Article format for backward compatibility
 */
export function guideToArticle(guide: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime?: number;
  imageUrl?: string;
  isPillar?: boolean;
}): Partial<Article> {
  return {
    slug: guide.slug,
    title: guide.title,
    excerpt: guide.excerpt,
    category: guide.category,
    read_time: guide.readTime || null,
    featured_image_url: guide.imageUrl || null,
    is_pillar: guide.isPillar || false,
    status: "published",
  };
}
