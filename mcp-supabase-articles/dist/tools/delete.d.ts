export declare const deleteArticleSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            slug: {
                type: string;
                description: string;
            };
            confirm: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function deleteArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
export declare const archiveArticleSchema: {
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
export declare function archiveArticle(params: Record<string, unknown>): Promise<{
    content: {
        type: 'text';
        text: string;
    }[];
}>;
