export declare const publishArticleSchema: {
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
export declare function publishArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
export declare const unpublishArticleSchema: {
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
export declare function unpublishArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
