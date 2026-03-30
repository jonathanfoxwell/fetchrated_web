import { Quote } from 'lucide-react';

interface ProTipSectionProps {
  title?: string;
  quote: string;
  author?: string;
  authorRole?: string;
}

export function ProTipSection({ title, quote, author, authorRole }: ProTipSectionProps) {
  return (
    <div className="bg-gradient-to-br from-primary-container to-secondary-container rounded-xl p-6 relative overflow-hidden">
      <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/20" />

      {title && (
        <p className="text-sm font-semibold text-primary mb-2">{title}</p>
      )}

      <blockquote className="text-lg text-on-primary-container font-medium leading-relaxed mb-4 relative z-10">
        "{quote}"
      </blockquote>

      {(author || authorRole) && (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {author?.charAt(0) || '?'}
            </span>
          </div>
          <div>
            {author && (
              <p className="text-sm font-semibold text-on-primary-container">
                {author}
              </p>
            )}
            {authorRole && (
              <p className="text-xs text-on-primary-container/70">{authorRole}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
