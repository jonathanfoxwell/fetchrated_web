import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getDirectoryListings } from '@/lib/data/locations';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Call A: through the imported function the page uses
  const viaFn = await getDirectoryListings({ city: 'Grimsby', limit: 24, offset: 0 });

  // Call B: identical query inline
  const supabase = createServerClient();
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
  const { data: inlineData, count: inlineCount, error: inlineError } = await query;

  return NextResponse.json({
    viaFn: {
      totalCount: viaFn.totalCount,
      rowCount: viaFn.data.length,
      firstRow: viaFn.data[0]?.name ?? null,
    },
    inline: {
      totalCount: inlineCount,
      rowCount: inlineData?.length ?? 0,
      firstRow: inlineData?.[0]?.name ?? null,
      error: inlineError?.message ?? null,
    },
  });
}
