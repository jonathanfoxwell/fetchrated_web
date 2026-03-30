export declare const createArticleSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            slug: {
                type: string;
                description: string;
            };
            title: {
                type: string;
                description: string;
            };
            excerpt: {
                type: string;
                description: string;
            };
            audience: {
                type: string;
                enum: string[];
                description: string;
            };
            category: {
                type: string;
                description: string;
            };
            sections: {
                type: string;
                description: string;
            };
            tags: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            is_pillar: {
                type: string;
                description: string;
            };
            pillar_slug: {
                type: string;
                description: string;
            };
            related_slugs: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            meta_title: {
                type: string;
                description: string;
            };
            meta_description: {
                type: string;
                description: string;
            };
            featured_image_url: {
                type: string;
                description: string;
            };
            cta_type: {
                type: string;
                enum: string[];
                description: string;
            };
            cta_href: {
                type: string;
                description: string;
            };
            cta_label: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function createArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
