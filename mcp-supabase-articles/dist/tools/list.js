import { getSupabase } from '../supabase.js';
export const listArticlesSchema = {
    name: 'list_articles',
    description: 'List articles with optional filters. Returns summary info (not full content).',
    inputSchema: {
        type: 'object',
        properties: {
            audience: {
                type: 'string',
                enum: ['consumer', 'practice'],
                description: 'Filter by target audience'
            },
            category: {
                type: 'string',
                description: 'Filter by category'
            },
            status: {
                type: 'string',
                enum: ['draft', 'published', 'archived'],
                description: 'Filter by status'
            },
            is_pillar: {
                type: 'boolean',
                description: 'Filter to only pillar articles'
            },
            pillar_slug: {
                type: 'string',
                description: 'Filter to articles belonging to a specific pillar'
            },
            limit: {
                type: 'number',
                description: 'Maximum number of results (default: 20, max: 100)'
            }
        }
    }
};
export async function listArticles(params) {
    const supabase = getSupabase();
    let query = supabase
        .from('articles')
        .select('slug, title, excerpt, audience, category, status, is_pillar, pillar_slug, word_count, read_time, published_at, updated_at, created_at')
        .order('updated_at', { ascending: false });
    if (params.audience) {
        query = query.eq('audience', params.audience);
    }
    if (params.category) {
        query = query.eq('category', params.category);
    }
    if (params.status) {
        query = query.eq('status', params.status);
    }
    if (params.is_pillar !== undefined) {
        query = query.eq('is_pillar', params.is_pillar);
    }
    if (params.pillar_slug) {
        query = query.eq('pillar_slug', params.pillar_slug);
    }
    const limit = Math.min(Math.max(1, params.limit || 20), 100);
    query = query.limit(limit);
    const { data, error: dbError } = await query;
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
    const summary = {
        total: data?.length || 0,
        by_status: {},
        by_audience: {}
    };
    for (const article of data || []) {
        summary.by_status[article.status] = (summary.by_status[article.status] || 0) + 1;
        summary.by_audience[article.audience] = (summary.by_audience[article.audience] || 0) + 1;
    }
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    articles: data,
                    summary
                }, null, 2)
            }]
    };
}
