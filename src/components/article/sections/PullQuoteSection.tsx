interface PullQuoteSectionProps {
  quote: string;
  author?: string;
  source?: string;
  variant?: 'default' | 'featured' | 'sidebar';
}

/**
 * Featured / default / sidebar pull-quotes.
 *
 * "featured" used to render on a saturated red background — visually
 * heavy when several pull-quotes plus other primary-tinted boxes share
 * the same page. It now sits on a neutral surface with a thick primary
 * accent rule on the left, which carries the brand colour without
 * dominating the column.
 */
export function PullQuoteSection({ quote, author, source, variant = 'default' }: PullQuoteSectionProps) {
  const styles = {
    default: 'border-l-4 border-primary pl-6 py-2',
    featured:
      'border-l-[6px] border-primary bg-surface-container-low rounded-r-xl px-8 py-7 shadow-sm',
    sidebar: 'bg-surface-container rounded-lg p-4 border border-outline-variant',
  };

  const isFeatured = variant === 'featured';

  return (
    <blockquote className={styles[variant]}>
      <p
        className={`font-headline italic leading-relaxed text-on-surface ${
          isFeatured ? 'text-2xl md:text-[1.65rem]' : 'text-lg'
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {(author || source) && (
        <footer className="mt-4 text-sm text-on-surface-variant not-italic">
          {author && <cite className="font-semibold not-italic">{author}</cite>}
          {author && source && <span className="mx-2">&middot;</span>}
          {source && <span>{source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
