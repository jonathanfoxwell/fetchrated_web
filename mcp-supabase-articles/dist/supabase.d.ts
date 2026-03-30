import { SupabaseClient } from '@supabase/supabase-js';
export declare function getSupabase(): SupabaseClient;
export interface Article {
    id?: string;
    slug: string;
    audience: 'consumer' | 'practice';
    category: string;
    tags?: string[];
    title: string;
    excerpt: string;
    sections: ArticleSection[];
    word_count?: number;
    read_time?: number;
    meta_title?: string;
    meta_description?: string;
    featured_image_url?: string;
    related_slugs?: string[];
    pillar_slug?: string;
    is_pillar?: boolean;
    featured_practice_ids?: string[];
    cta_type?: 'find-practice' | 'join-pilot' | 'get-verified' | 'custom';
    cta_href?: string;
    cta_label?: string;
    status?: 'draft' | 'published' | 'archived';
    published_at?: string;
    updated_at?: string;
    created_at?: string;
}
export type ArticleSection = {
    type: 'markdown';
    content: string;
} | {
    type: 'callout';
    variant: 'info' | 'tip' | 'warning' | 'important';
    title?: string;
    content: string;
} | {
    type: 'checklist';
    title?: string;
    icon?: string;
    items: {
        title: string;
        description?: string;
    }[];
} | {
    type: 'pro-tip';
    title?: string;
    quote: string;
    author?: string;
    authorRole?: string;
} | {
    type: 'faq';
    title?: string;
    items: {
        question: string;
        answer: string;
    }[];
} | {
    type: 'key-metrics';
    metrics: {
        value: string;
        unit?: string;
        label: string;
    }[];
} | {
    type: 'status-bar';
    status: 'active' | 'pending' | 'warning';
    title: string;
    subtitle?: string;
    metrics?: {
        value: string;
        label: string;
    }[];
} | {
    type: 'data-table';
    title?: string;
    columns: {
        key: string;
        header: string;
        align?: string;
    }[];
    data: Record<string, string>[];
} | {
    type: 'pull-quote';
    quote: string;
    author?: string;
    source?: string;
    variant?: 'default' | 'featured' | 'sidebar';
} | {
    type: 'image';
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
} | {
    type: 'code-block';
    code: string;
    language?: string;
    filename?: string;
} | {
    type: 'summary-box';
    title?: string;
    content: string;
    variant?: 'default' | 'highlight' | 'dark';
    action?: {
        label: string;
        href: string;
    };
} | {
    type: 'numbered-section';
    number: number;
    title: string;
    content: string;
} | {
    type: 'practice-card';
    practiceId: string;
} | {
    type: 'practice-grid';
    practiceIds: string[];
    title?: string;
};
