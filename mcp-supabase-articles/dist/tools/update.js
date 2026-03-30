import { getSupabase } from '../supabase.js';
import { validateSection } from '../validation.js';
export const updateArticleSchema = {
    name: 'update_article',
    description: 'Update an existing article. Only provided fields will be updated.',
    inputSchema: {
        type: 'object',
        properties: {
            slug: {
                type: 'string',
                description: 'Slug of the article to update'
            },
            title: { type: 'string' },
            excerpt: { type: 'string' },
            category: { type: 'string' },
            sections: { type: 'array' },
            tags: { type: 'array', items: { type: 'string' } },
            is_pillar: { type: 'boolean' },
            pillar_slug: { type: 'string' },
            related_slugs: { type: 'array', items: { type: 'string' } },
            meta_title: { type: 'string' },
            meta_description: { type: 'string' },
            featured_image_url: { type: 'string' },
            cta_type: { type: 'string', enum: ['find-practice', 'join-pilot', 'get-verified', 'custom'] },
            cta_href: { type: 'string' },
            cta_label: { type: 'string' }
        },
        required: ['slug']
    }
};
export async function updateArticle(params) {
    const { slug, ...updates } = params;
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
        .select('*')
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
    // Validate sections if provided
    if (updates.sections && Array.isArray(updates.sections)) {
        for (let i = 0; i < updates.sections.length; i++) {
            const error = validateSection(updates.sections[i], i);
            if (error) {
                return {
                    content: [{
                            type: 'text',
                            text: JSON.stringify({ error }, null, 2)
                        }]
                };
            }
        }
    }
    // Validate excerpt length if provided
    if (updates.excerpt) {
        const excerpt = updates.excerpt;
        if (excerpt.length < 50 || excerpt.length > 300) {
            return {
                content: [{
                        type: 'text',
                        text: JSON.stringify({
                            error: {
                                code: 'INVALID_EXCERPT',
                                message: 'Excerpt must be between 50 and 300 characters'
                            }
                        }, null, 2)
                    }]
            };
        }
    }
    // Build update object with only defined fields
    const updateData = {};
    const allowedFields = [
        'title', 'excerpt', 'category', 'sections', 'tags', 'is_pillar',
        'pillar_slug', 'related_slugs', 'meta_title', 'meta_description',
        'featured_image_url', 'cta_type', 'cta_href', 'cta_label'
    ];
    for (const field of allowedFields) {
        if (updates[field] !== undefined) {
            updateData[field] = updates[field];
        }
    }
    if (Object.keys(updateData).length === 0) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        error: { code: 'NO_UPDATES', message: 'No valid fields to update' }
                    }, null, 2)
                }]
        };
    }
    const { data, error: dbError } = await supabase
        .from('articles')
        .update(updateData)
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
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    article: {
                        id: data.id,
                        slug: data.slug,
                        title: data.title,
                        status: data.status,
                        word_count: data.word_count,
                        read_time: data.read_time,
                        updated_at: data.updated_at
                    },
                    updated_fields: Object.keys(updateData),
                    message: `Article "${data.title}" updated`
                }, null, 2)
            }]
    };
}
export const getArticleSchema = {
    name: 'get_article',
    description: 'Get a single article by slug, including all content.',
    inputSchema: {
        type: 'object',
        properties: {
            slug: {
                type: 'string',
                description: 'Article slug'
            }
        },
        required: ['slug']
    }
};
export async function getArticle(params) {
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
        .select('*')
        .eq('slug', slug)
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
                text: JSON.stringify({ article: data }, null, 2)
            }]
    };
}
