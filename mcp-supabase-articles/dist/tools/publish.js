import { getSupabase } from '../supabase.js';
export const publishArticleSchema = {
    name: 'publish_article',
    description: 'Publish a draft article. Sets status to published and published_at timestamp.',
    inputSchema: {
        type: 'object',
        properties: {
            slug: {
                type: 'string',
                description: 'Slug of the article to publish'
            }
        },
        required: ['slug']
    }
};
export async function publishArticle(params) {
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
    // Check article exists
    const { data: existing } = await supabase
        .from('articles')
        .select('slug, status, audience')
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
    if (existing.status === 'published') {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        error: {
                            code: 'ALREADY_PUBLISHED',
                            message: `Article "${slug}" is already published`
                        }
                    }, null, 2)
                }]
        };
    }
    const { data, error: dbError } = await supabase
        .from('articles')
        .update({
        status: 'published',
        published_at: new Date().toISOString()
    })
        .eq('slug', slug)
        .select()
        .single();
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
    const liveUrl = existing.audience === 'consumer'
        ? `https://fetchrated.com/learn/${slug}`
        : `https://fetchrated.com/for-practices/resources/${slug}`;
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    article: {
                        slug: data.slug,
                        title: data.title,
                        status: data.status,
                        published_at: data.published_at
                    },
                    live_url: liveUrl,
                    message: `Article "${data.title}" is now live at ${liveUrl}`
                }, null, 2)
            }]
    };
}
export const unpublishArticleSchema = {
    name: 'unpublish_article',
    description: 'Unpublish an article. Sets status back to draft.',
    inputSchema: {
        type: 'object',
        properties: {
            slug: {
                type: 'string',
                description: 'Slug of the article to unpublish'
            }
        },
        required: ['slug']
    }
};
export async function unpublishArticle(params) {
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
        .update({ status: 'draft' })
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
                    message: `Article "${data.title}" reverted to draft`
                }, null, 2)
            }]
    };
}
