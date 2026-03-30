import { getSupabase } from '../supabase.js';

export const deleteArticleSchema = {
  name: 'delete_article',
  description: 'Permanently delete an article. This cannot be undone.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: 'Slug of the article to delete'
      },
      confirm: {
        type: 'boolean',
        description: 'Must be true to confirm deletion'
      }
    },
    required: ['slug', 'confirm']
  }
};

export async function deleteArticle(params: Record<string, unknown>): Promise<{ content: { type: 'text'; text: string }[] }> {
  const { slug, confirm } = params;

  if (!slug) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: { code: 'MISSING_REQUIRED', message: 'Slug is required' }
        }, null, 2)
      }]
    };
  }

  if (confirm !== true) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: {
            code: 'CONFIRMATION_REQUIRED',
            message: 'Set confirm: true to delete this article permanently'
          }
        }, null, 2)
      }]
    };
  }

  const supabase = getSupabase();

  // Get article info before deletion
  const { data: existing } = await supabase
    .from('articles')
    .select('slug, title, status')
    .eq('slug', slug)
    .single();

  if (!existing) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: {
            code: 'NOT_FOUND',
            message: `Article with slug "${slug}" not found`
          }
        }, null, 2)
      }]
    };
  }

  // Warn if deleting published article
  if (existing.status === 'published') {
    // Still delete, but include warning in response
  }

  const { error: dbError } = await supabase
    .from('articles')
    .delete()
    .eq('slug', slug);

  if (dbError) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: { code: 'DATABASE_ERROR', message: dbError.message }
        }, null, 2)
      }]
    };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        success: true,
        deleted: {
          slug: existing.slug,
          title: existing.title,
          was_published: existing.status === 'published'
        },
        message: `Article "${existing.title}" has been permanently deleted`
      }, null, 2)
    }]
  };
}

export const archiveArticleSchema = {
  name: 'archive_article',
  description: 'Archive an article. Removes from public view but keeps in database.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: 'Slug of the article to archive'
      }
    },
    required: ['slug']
  }
};

export async function archiveArticle(params: Record<string, unknown>): Promise<{ content: { type: 'text'; text: string }[] }> {
  const { slug } = params;

  if (!slug) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: { code: 'MISSING_REQUIRED', message: 'Slug is required' }
        }, null, 2)
      }]
    };
  }

  const supabase = getSupabase();

  const { data, error: dbError } = await supabase
    .from('articles')
    .update({ status: 'archived' })
    .eq('slug', slug)
    .select()
    .single();

  if (dbError || !data) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: {
            code: 'NOT_FOUND',
            message: `Article with slug "${slug}" not found`
          }
        }, null, 2)
      }]
    };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        success: true,
        article: {
          slug: data.slug,
          title: data.title,
          status: data.status
        },
        message: `Article "${data.title}" has been archived`
      }, null, 2)
    }]
  };
}
