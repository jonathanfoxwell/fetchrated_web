import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: {
    slug?: string;
    audience?: string;
    directory_slug?: string;
    [key: string]: unknown;
  };
  old_record?: {
    slug?: string;
    [key: string]: unknown;
  };
}

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload: WebhookPayload = await request.json();
    const { table, record, old_record } = payload;

    const revalidated: string[] = [];

    if (table === 'articles') {
      // Revalidate article cache tag
      revalidateTag('articles');
      revalidated.push('tag:articles');

      // Revalidate specific article path
      const slug = record.slug || old_record?.slug;
      if (slug) {
        const basePath = record.audience === 'practice'
          ? '/for-practices/resources'
          : '/learn';

        revalidatePath(`${basePath}/${slug}`);
        revalidated.push(`path:${basePath}/${slug}`);
      }

      // Revalidate hub pages
      revalidatePath('/learn');
      revalidatePath('/for-practices/resources');
      revalidated.push('path:/learn', 'path:/for-practices/resources');
    }

    if (table === 'practices') {
      // Revalidate directory cache tag
      revalidateTag('directory');
      revalidated.push('tag:directory');

      // Revalidate specific practice path
      const slug = record.directory_slug || old_record?.directory_slug;
      if (slug) {
        revalidatePath(`/find/practice/${slug}`);
        revalidated.push(`path:/find/practice/${slug}`);
      }

      // Revalidate directory listing
      revalidatePath('/find');
      revalidated.push('path:/find');
    }

    if (table === 'verified_reviews') {
      // Revalidate directory since reviews affect practice display
      revalidateTag('directory');
      revalidated.push('tag:directory');
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidated,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: 'revalidate' });
}
