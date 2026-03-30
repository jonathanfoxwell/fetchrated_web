import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export interface PullQuoteProps {
  quote: string;
  author?: string;
  source?: string;
  variant?: "default" | "featured" | "sidebar";
  className?: string;
}

/**
 * PullQuote - Highlighted quote for emphasis
 *
 * @example
 * <PullQuote
 *   quote="Clinical transparency is the cornerstone of trust."
 *   author="Dr. Sarah Mitchell"
 *   source="Veterinary Standards Review, 2024"
 * />
 */
export function PullQuote({
  quote,
  author,
  source,
  variant = "default",
  className,
}: PullQuoteProps) {
  if (variant === "featured") {
    return (
      <figure
        className={cn(
          "my-12 py-8 px-8 md:px-12 bg-primary/5 border-l-4 border-primary relative",
          className
        )}
      >
        <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
        <blockquote className="font-headline text-2xl md:text-3xl italic text-on-surface leading-relaxed pl-8">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(author || source) && (
          <figcaption className="mt-6 pl-8">
            {author && (
              <cite className="not-italic font-bold text-on-surface">
                {author}
              </cite>
            )}
            {source && (
              <span className="text-on-surface-variant text-sm block mt-1">
                {source}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    );
  }

  if (variant === "sidebar") {
    return (
      <aside
        className={cn(
          "my-8 p-6 bg-surface-container border border-outline-variant/20 rounded-lg",
          className
        )}
      >
        <Quote className="w-6 h-6 text-primary/40 mb-3" />
        <blockquote className="font-headline text-lg italic text-on-surface-variant leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(author || source) && (
          <figcaption className="mt-4 pt-4 border-t border-outline-variant/20">
            {author && (
              <cite className="not-italic text-sm font-bold text-on-surface">
                {author}
              </cite>
            )}
            {source && (
              <span className="text-on-surface-variant text-xs block mt-0.5">
                {source}
              </span>
            )}
          </figcaption>
        )}
      </aside>
    );
  }

  // Default variant
  return (
    <blockquote
      className={cn(
        "my-8 pl-6 border-l-4 border-primary/30",
        className
      )}
    >
      <p className="font-headline text-xl italic text-on-surface-variant leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      {(author || source) && (
        <footer className="mt-3">
          {author && (
            <cite className="not-italic text-sm font-medium text-on-surface">
              — {author}
            </cite>
          )}
          {source && (
            <span className="text-on-surface-variant text-sm">
              {author ? ", " : "— "}
              {source}
            </span>
          )}
        </footer>
      )}
    </blockquote>
  );
}
