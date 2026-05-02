import { NextResponse } from 'next/server';
import { getDirectoryListings } from '@/lib/data/locations';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Call the exact function the page calls, with the exact args
  const result = await getDirectoryListings({
    city: 'Grimsby',
    limit: 24,
    offset: 0,
  });

  return NextResponse.json({
    rowCount: result.data.length,
    totalCount: result.totalCount,
    firstRow: result.data[0]?.name ?? null,
    sample: result.data.slice(0, 3).map((r) => ({ name: r.name, city: r.city })),
  });
}
