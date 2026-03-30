import { getSupabase } from '../supabase.js';
import { validateArticle } from '../validation.js';
export const createArticleSchema = {
    name: 'create_article',
    description: 'Create a new article draft. Returns the created article with preview URL.',
    inputSchema: {
        type: 'object',
        properties: {
            slug: {
                type: 'string',
                description: 'URL-friendly identifier (e.g., "choosing-a-vet")'
            },
            title: {
                type: 'string',
                description: 'Article title'
            },
            excerpt: {
                type: 'string',
                description: '1-2 sentence summary for cards and SEO (50-300 characters)'
            },
            audience: {
                type: 'string',
                enum: ['consumer', 'practice'],
                description: 'Target audience'
            },
            category: {
                type: 'string',
                description: 'Consumer: veterinary|grooming|training|health|reviews|finance. Practice: marketing|compliance|operations|growth|technology|client-experience'
            },
            sections: {
                type: 'array',
                description: 'Array of section objects. See article-sections-reference.md for types.'
            },
            tags: {
                type: 'array',
                items: { type: 'string' },
                description: 'Tags for related article matching'
            },
            is_pillar: {
                type: 'boolean',
                description: 'True for comprehensive pillar guides'
            },
            pillar_slug: {
                type: 'string',
                description: 'Parent pillar article slug (for supporting articles)'
            },
            related_slugs: {
                type: 'array',
                items: { type: 'string' },
                description: 'Manually curated related article slugs'
            },
            meta_title: {
                type: 'string',
                description: 'SEO title (defaults to title if not set)'
            },
            meta_description: {
                type: 'string',
                description: 'SEO description (defaults to excerpt if not set)'
            },
            featured_image_url: {
                type: 'string',
                description: 'Hero/OG image URL'
            },
            cta_type: {
                type: 'string',
                enum: ['find-practice', 'join-pilot', 'get-verified', 'custom'],
                description: 'CTA button type at end of article'
            },
            cta_href: {
                type: 'string',
                description: 'Custom CTA URL (if cta_type is custom)'
            },
            cta_label: {
                type: 'string',
                description: 'Custom CTA button text'
            }
        },
        required: ['slug', 'title', 'excerpt', 'audience', 'category', 'sections']
    }
};
export async function createArticle(params) {
    // Validate
    const error = validateArticle(params);
    if (error) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({ error }, null, 2)
                }]
        };
    }
    const supabase = getSupabase();
    // Check for duplicate slug
    const { data: existing } = await supabase
        .from('articles')
        .select('slug')
        .eq('slug', params.slug)
        .single();
    if (existing) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        error: {
                            code: 'DUPLICATE_SLUG',
                            message: `An article with slug "${params.slug}" already exists`,
                            suggestion: `Try "${params.slug}-${new Date().getFullYear()}" or update the existing article`
                        }
                    }, null, 2)
                }]
        };
    }
    // Insert article
    const article = {
        slug: params.slug,
        title: params.title,
        excerpt: params.excerpt,
        audience: params.audience,
        category: params.category,
        sections: params.sections,
        tags: params.tags,
        is_pillar: params.is_pillar,
        pillar_slug: params.pillar_slug,
        related_slugs: params.related_slugs,
        meta_title: params.meta_title,
        meta_description: params.meta_description,
        featured_image_url: params.featured_image_url,
        cta_type: params.cta_type,
        cta_href: params.cta_href,
        cta_label: params.cta_label,
        status: 'draft'
    };
    const { data, error: dbError } = await supabase
        .from('articles')
        .insert(article)
        .select()
        .single();
    if (dbError) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        error: {
                            code: 'DATABASE_ERROR',
                            message: dbError.message
                        }
                    }, null, 2)
                }]
        };
    }
    const previewUrl = params.audience === 'consumer'
        ? `https://fetchrated.com/learn/preview/${params.slug}`
        : `https://fetchrated.com/for-practices/resources/preview/${params.slug}`;
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
                        created_at: data.created_at
                    },
                    preview_url: previewUrl,
                    message: `Draft article "${data.title}" created. Preview at ${previewUrl}`
                }, null, 2)
            }]
    };
}
