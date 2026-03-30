import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SummaryBoxSectionProps {
  title?: string;
  content: string;
  variant?: 'default' | 'highlight' | 'dark';
  action?: { label: string; href: string };
}

export function SummaryBoxSection({ title, content, variant = 'default', action }: SummaryBoxSectionProps) {
  const styles = {
    default: {
      container: 'bg-surface-container border border-outline-variant',
      title: 'text-on-surface',
      content: 'text-on-surface-variant',
      button: 'bg-primary text-on-primary hover:bg-primary/90',
    },
    highlight: {
      container: 'bg-primary-container border border-primary/20',
      title: 'text-on-primary-container',
      content: 'text-on-primary-container/80',
      button: 'bg-primary text-on-primary hover:bg-primary/90',
    },
    dark: {
      container: 'bg-inverse-surface',
      title: 'text-inverse-on-surface',
      content: 'text-inverse-on-surface/80',
      button: 'bg-inverse-primary text-inverse-on-primary hover:bg-inverse-primary/90',
    },
  };

  const s = styles[variant];

  return (
    <div className={`${s.container} rounded-xl p-6`}>
      {title && (
        <h3 className={`${s.title} text-lg font-semibold mb-3`}>{title}</h3>
      )}

      <div className={`${s.content} prose prose-sm max-w-none`}>
        <ReactMarkdown>{content}</ReactMarkdown>
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
