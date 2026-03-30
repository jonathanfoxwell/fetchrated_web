export interface ValidationError {
    code: string;
    message: string;
    suggestion?: string;
}
export declare function validateSlug(slug: string): ValidationError | null;
export declare function validateArticle(article: {
    slug?: string;
    title?: string;
    excerpt?: string;
    audience?: string;
    category?: string;
    sections?: unknown[];
}): ValidationError | null;
export declare function validateSection(section: Record<string, unknown>, index: number): ValidationError | null;
