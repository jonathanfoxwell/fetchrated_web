import type { ArticleSection } from './supabase.js';

export interface ValidationError {
  code: string;
  message: string;
  suggestion?: string;
}

const CONSUMER_CATEGORIES = ['veterinary', 'grooming', 'training', 'health', 'reviews', 'finance'];
const PRACTICE_CATEGORIES = ['marketing', 'compliance', 'operations', 'growth', 'technology', 'client-experience'];

const SECTION_TYPES = [
  'markdown', 'callout', 'checklist', 'pro-tip', 'faq', 'key-metrics',
  'status-bar', 'data-table', 'pull-quote', 'image', 'code-block',
  'summary-box', 'numbered-section', 'practice-card', 'practice-grid'
];

export function validateSlug(slug: string): ValidationError | null {
  if (!slug) {
    return { code: 'MISSING_REQUIRED', message: 'Slug is required' };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      code: 'INVALID_SLUG',
      message: 'Slug must be lowercase alphanumeric with hyphens only, no leading/trailing hyphens',
      suggestion: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    };
  }
  return null;
}

export function validateArticle(article: {
  slug?: string;
  title?: string;
  excerpt?: string;
  audience?: string;
  category?: string;
  sections?: unknown[];
}): ValidationError | null {
  // Required fields
  if (!article.slug) {
    return { code: 'MISSING_REQUIRED', message: 'Slug is required' };
  }
  if (!article.title) {
    return { code: 'MISSING_REQUIRED', message: 'Title is required' };
  }
  if (!article.excerpt) {
    return { code: 'MISSING_REQUIRED', message: 'Excerpt is required' };
  }
  if (!article.audience) {
    return { code: 'MISSING_REQUIRED', message: 'Audience is required' };
  }
  if (!article.category) {
    return { code: 'MISSING_REQUIRED', message: 'Category is required' };
  }
  if (!article.sections || !Array.isArray(article.sections) || article.sections.length === 0) {
    return { code: 'MISSING_REQUIRED', message: 'Sections array is required and must not be empty' };
  }

  // Slug validation
  const slugError = validateSlug(article.slug);
  if (slugError) return slugError;

  // Audience validation
  if (article.audience !== 'consumer' && article.audience !== 'practice') {
    return {
      code: 'INVALID_AUDIENCE',
      message: 'Audience must be "consumer" or "practice"',
      suggestion: 'Use "consumer" for pet owner content, "practice" for veterinary business content'
    };
  }

  // Category validation
  const validCategories = article.audience === 'consumer' ? CONSUMER_CATEGORIES : PRACTICE_CATEGORIES;
  if (!validCategories.includes(article.category)) {
    return {
      code: 'INVALID_CATEGORY',
      message: `Invalid category "${article.category}" for ${article.audience} audience`,
      suggestion: `Valid categories: ${validCategories.join(', ')}`
    };
  }

  // Excerpt length
  if (article.excerpt.length < 50) {
    return {
      code: 'INVALID_EXCERPT',
      message: 'Excerpt must be at least 50 characters',
      suggestion: 'Add more detail to the excerpt for better SEO'
    };
  }
  if (article.excerpt.length > 300) {
    return {
      code: 'INVALID_EXCERPT',
      message: 'Excerpt must be 300 characters or less',
      suggestion: 'Shorten the excerpt to fit on cards and meta descriptions'
    };
  }

  // Sections validation
  for (let i = 0; i < article.sections.length; i++) {
    const section = article.sections[i] as Record<string, unknown>;
    const sectionError = validateSection(section, i);
    if (sectionError) return sectionError;
  }

  return null;
}

export function validateSection(section: Record<string, unknown>, index: number): ValidationError | null {
  if (!section || typeof section !== 'object') {
    return {
      code: 'INVALID_SECTION',
      message: `Section at index ${index} is not a valid object`
    };
  }

  const type = section.type as string;
  if (!type || !SECTION_TYPES.includes(type)) {
    return {
      code: 'INVALID_SECTION',
      message: `Section at index ${index} has invalid type "${type}"`,
      suggestion: `Valid types: ${SECTION_TYPES.join(', ')}`
    };
  }

  // Type-specific validation
  switch (type) {
    case 'markdown':
      if (typeof section.content !== 'string' || !section.content) {
        return { code: 'INVALID_SECTION', message: `Markdown section at index ${index} requires "content" string` };
      }
      break;

    case 'callout':
      if (!['info', 'tip', 'warning', 'important'].includes(section.variant as string)) {
        return { code: 'INVALID_SECTION', message: `Callout at index ${index} requires valid "variant" (info, tip, warning, important)` };
      }
      if (typeof section.content !== 'string' || !section.content) {
        return { code: 'INVALID_SECTION', message: `Callout at index ${index} requires "content" string` };
      }
      break;

    case 'checklist':
      if (!Array.isArray(section.items) || section.items.length === 0) {
        return { code: 'INVALID_SECTION', message: `Checklist at index ${index} requires non-empty "items" array` };
      }
      for (const item of section.items as Record<string, unknown>[]) {
        if (!item.title) {
          return { code: 'INVALID_SECTION', message: `Checklist item at index ${index} requires "title"` };
        }
      }
      break;

    case 'pro-tip':
      if (typeof section.quote !== 'string' || !section.quote) {
        return { code: 'INVALID_SECTION', message: `Pro-tip at index ${index} requires "quote" string` };
      }
      break;

    case 'faq':
      if (!Array.isArray(section.items) || section.items.length === 0) {
        return { code: 'INVALID_SECTION', message: `FAQ at index ${index} requires non-empty "items" array` };
      }
      for (const item of section.items as Record<string, unknown>[]) {
        if (!item.question || !item.answer) {
          return { code: 'INVALID_SECTION', message: `FAQ item at index ${index} requires "question" and "answer"` };
        }
      }
      break;

    case 'key-metrics':
      if (!Array.isArray(section.metrics) || section.metrics.length === 0) {
        return { code: 'INVALID_SECTION', message: `Key-metrics at index ${index} requires non-empty "metrics" array` };
      }
      for (const metric of section.metrics as Record<string, unknown>[]) {
        if (!metric.value || !metric.label) {
          return { code: 'INVALID_SECTION', message: `Key-metric at index ${index} requires "value" and "label"` };
        }
      }
      break;

    case 'status-bar':
      if (!['active', 'pending', 'warning'].includes(section.status as string)) {
        return { code: 'INVALID_SECTION', message: `Status-bar at index ${index} requires valid "status" (active, pending, warning)` };
      }
      if (!section.title) {
        return { code: 'INVALID_SECTION', message: `Status-bar at index ${index} requires "title"` };
      }
      break;

    case 'data-table':
      if (!Array.isArray(section.columns) || section.columns.length === 0) {
        return { code: 'INVALID_SECTION', message: `Data-table at index ${index} requires non-empty "columns" array` };
      }
      if (!Array.isArray(section.data)) {
        return { code: 'INVALID_SECTION', message: `Data-table at index ${index} requires "data" array` };
      }
      break;

    case 'pull-quote':
      if (typeof section.quote !== 'string' || !section.quote) {
        return { code: 'INVALID_SECTION', message: `Pull-quote at index ${index} requires "quote" string` };
      }
      break;

    case 'image':
      if (!section.src || !section.alt) {
        return { code: 'INVALID_SECTION', message: `Image at index ${index} requires "src" and "alt"` };
      }
      break;

    case 'code-block':
      if (typeof section.code !== 'string') {
        return { code: 'INVALID_SECTION', message: `Code-block at index ${index} requires "code" string` };
      }
      break;

    case 'summary-box':
      if (typeof section.content !== 'string' || !section.content) {
        return { code: 'INVALID_SECTION', message: `Summary-box at index ${index} requires "content" string` };
      }
      break;

    case 'numbered-section':
      if (typeof section.number !== 'number') {
        return { code: 'INVALID_SECTION', message: `Numbered-section at index ${index} requires "number"` };
      }
      if (!section.title || !section.content) {
        return { code: 'INVALID_SECTION', message: `Numbered-section at index ${index} requires "title" and "content"` };
      }
      break;

    case 'practice-card':
      if (!section.practiceId) {
        return { code: 'INVALID_SECTION', message: `Practice-card at index ${index} requires "practiceId"` };
      }
      break;

    case 'practice-grid':
      if (!Array.isArray(section.practiceIds) || section.practiceIds.length === 0) {
        return { code: 'INVALID_SECTION', message: `Practice-grid at index ${index} requires non-empty "practiceIds" array` };
      }
      break;
  }

  return null;
}
