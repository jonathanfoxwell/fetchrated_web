export declare const listArticlesSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            audience: {
                type: string;
                enum: string[];
                description: string;
            };
            category: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
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
            limit: {
                type: string;
                description: string;
            };
        };
    };
};
export declare function listArticles(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
