import { InlineMarkdown } from '../InlineMarkdown';

interface NumberedSectionSectionProps {
  number: number;
  title: string;
  content: string;
}

/**
 * A numbered checklist item inside a long-form article.
 * Visual weight is deliberately subordinate to the parent ## heading:
 * the marker is an outlined circle (not a solid red disc) so a run of
 * 10+ numbered sections does not dominate the page, and the title
 * lands at h3 weight rather than competing with the section's h2.
 */
export function NumberedSectionSection({ number, title, content }: NumberedSectionSectionProps) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 bg-surface flex items-center justify-center">
          <span className="text-base font-semibold text-primary tabular-nums">
            {number.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex-1 pt-1">
        <h3 className="text-base font-semibold text-on-surface mb-2 leading-snug">
          <InlineMarkdown>{title}</InlineMarkdown>
        </h3>
        <p className="text-on-surface-variant leading-relaxed">
          <InlineMarkdown>{content}</InlineMarkdown>
        </p>
      </div>
    </div>
  );
}
