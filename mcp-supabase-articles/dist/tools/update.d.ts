export declare const updateArticleSchema: {
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
            };
            excerpt: {
                type: string;
            };
            category: {
                type: string;
            };
            sections: {
                type: string;
            };
            tags: {
                type: string;
                items: {
                    type: string;
                };
            };
            is_pillar: {
                type: string;
            };
            pillar_slug: {
                type: string;
            };
            related_slugs: {
                type: string;
                items: {
                    type: string;
                };
            };
            meta_title: {
                type: string;
            };
            meta_description: {
                type: string;
            };
            featured_image_url: {
                type: string;
            };
            cta_type: {
                type: string;
                enum: string[];
            };
            cta_href: {
                type: string;
            };
            cta_label: {
                type: string;
            };
        };
        required: string[];
    };
};
export declare function updateArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
export declare const getArticleSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            slug: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function getArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
