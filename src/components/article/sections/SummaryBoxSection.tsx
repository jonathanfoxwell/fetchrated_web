import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { processDynamicTokens } from '../dynamic-text';

interface SummaryBoxSectionProps {
  title?: string;
  content: string;
  variant?: 'default' | 'highlight' | 'dark';
  action?: { label: string; href: string };
}

/**
 * In-article summary card with optional CTA.
 *
 * "highlight" used to render on a saturated red background which made
 * any article with two or three summary boxes feel like a wall of red.
 * It now uses a tinted surface with a primary accent rule, keeping
 * brand presence without competing with the article body for attention.
 */
export function SummaryBoxSection({ title, content, variant = 'default', action }: SummaryBoxSectionProps) {
  const styles = {
    default: {
      container: 'bg-surface-container border border-outline-variant',
      title: 'text-on-surface',
      content: 'text-on-surface-variant',
      button: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    highlight: {
      container: 'bg-primary/5 border border-primary/30',
      title: 'text-on-surface',
      content: 'text-on-surface-variant',
      button: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    dark: {
      container: 'bg-inverse-surface',
      title: 'text-inverse-on-surface',
      content: 'text-inverse-on-surface/80',
      button: 'bg-inverse-primary text-primary-foreground hover:bg-inverse-primary/90',
    },
  };

  const s = styles[variant];

  return (
    <div className={`${s.container} rounded-xl p-6 md:p-7`}>
      {title && (
        <h3 className={`${s.title} text-lg font-semibold mb-3`}>{title}</h3>
      )}

      <div className={`${s.content} prose prose-sm max-w-none`}>
        <ReactMarkdown>{processDynamicTokens(content)}</ReactMarkdown>
      </div>

      {action && (
        <Link
          href={action.href}
          className={`${s.button} inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full font-medium transition-colors`}
        >
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
