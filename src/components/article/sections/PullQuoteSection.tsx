interface PullQuoteSectionProps {
  quote: string;
  author?: string;
  source?: string;
  variant?: 'default' | 'featured' | 'sidebar';
}

export function PullQuoteSection({ quote, author, source, variant = 'default' }: PullQuoteSectionProps) {
  const styles = {
    default: 'border-l-4 border-primary pl-6 py-2',
    featured: 'bg-primary-container rounded-xl p-8 text-center',
    sidebar: 'bg-surface-container rounded-lg p-4 border border-outline-variant',
  };

  return (
    <blockquote className={styles[variant]}>
      <p
        className={`font-medium leading-relaxed ${
          variant === 'featured'
            ? 'text-xl md:text-2xl text-on-primary-container'
            : 'text-lg text-on-surface'
        }`}
      >
        "{quote}"
      </p>

      {(author || source) && (
        <footer className={`mt-4 ${variant === 'featured' ? 'text-on-primary-container/70' : 'text-on-surface-variant'}`}>
          {author && <cite className="font-semibold not-italic">{author}</cite>}
          {author && source && <span className="mx-2">•</span>}
          {source && <span className="text-sm">{source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
