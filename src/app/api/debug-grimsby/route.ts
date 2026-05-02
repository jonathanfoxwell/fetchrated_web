import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createServerClient();

  // The exact same query getDirectoryListings constructs for /find/vets/grimsby
  let query = supabase
    .from('directory_listings')
    .select(
      'id, name, slug, city, postcode, logo_url, headline, average_rating, total_reviews, badge_tier, is_fetchrated_member',
      { count: 'exact' },
    )
    .order('average_rating', { ascending: false, nullsFirst: false });
  query = query.eq('vertical_type', 'vet');
  query = query.ilike('city', '%Grimsby%');
  query = query.range(0, 23);

  const { data, error, count } = await query;

  // Also test variations to narrow down
  const simple = await supabase
    .from('directory_listings')
    .select('city', { count: 'exact', head: true })
    .ilike('city', '%Grimsby%');

  const noOrder = await supabase
    .from('directory_listings')
    .select('id, name, city', { count: 'exact' })
    .eq('vertical_type', 'vet')
    .ilike('city', '%Grimsby%')
    .range(0, 23);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'unset';

  return NextResponse.json({
    fullQuery: { count, error: error?.message ?? null, rowCount: data?.length ?? 0, firstRow: data?.[0]?.name ?? null },
    simpleQueryCount: { count: simple.count, error: simple.error?.message ?? null },
    noOrderQuery: { count: noOrder.count, error: noOrder.error?.message ?? null, rowCount: noOrder.data?.length ?? 0 },
    supabaseUrlHost: supabaseUrl.replace(/^https?:\/\//, '').replace(/\..*$/, ''),
  });
}
