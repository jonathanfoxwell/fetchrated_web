import ReactMarkdown from 'react-markdown';
import { processDynamicTokens } from '../dynamic-text';

interface MarkdownSectionProps {
  content: string;
}

/**
 * Renders article body markdown.
 *
 * Heading sizes are explicit so that ## section breaks visibly outrank
 * adjacent component blocks (numbered-section titles, callout titles,
 * etc.) and establish a clean reading hierarchy across long articles.
 */
export function MarkdownSection({ content }: MarkdownSectionProps) {
  return (
    <div
      className={[
        'prose prose-slate max-w-none',
        'prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-on-surface',
        'prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-5',
        'prose-h3:text-xl md:prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3',
        'prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2',
        'prose-p:text-on-surface-variant prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-on-surface',
        'prose-li:text-on-surface-variant',
      ].join(' ')}
    >
      <ReactMarkdown>{processDynamicTokens(content)}</ReactMarkdown>
    </div>
  );
}
