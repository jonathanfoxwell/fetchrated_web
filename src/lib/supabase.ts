import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side client for use in Server Components and API routes.
 *
 * Passes `cache: 'no-store'` to the underlying fetch so Next.js's data cache
 * doesn't persist Supabase query results across deploys. Functions that want
 * explicit caching (homepage, sitemap, articles, locations) wrap themselves
 * in `unstable_cache` with named tags — see `src/lib/data/locations.ts` and
 * `src/lib/data/articles.ts`. That gives us per-query control instead of
 * Next.js's default "cache the world" behaviour.
 */
export function createServerClient() {
  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options) =>
          fetch(url, { ...options, cache: 'no-store' }),
      },
    },
  );
}
