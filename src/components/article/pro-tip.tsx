import { cn } from "@/lib/utils";
import { Lightbulb, type LucideIcon } from "lucide-react";

export interface ProTipProps {
  title?: string;
  quote: string;
  author?: string;
  authorRole?: string;
  icon?: LucideIcon;
  className?: string;
}

/**
 * ProTip - Styled tip/advice box with optional author attribution
 *
 * @example
 * <ProTip
 *   title="Pro Tip: The Tour Test"
 *   quote="Always request a brief tour of the boarding areas."
 *   author="Dr. Julian Thorne"
 *   authorRole="Chief Auditor"
 * />
 */
export function ProTip({
  title = "Pro Tip",
  quote,
  author,
  authorRole,
  icon: IconComponent = Lightbulb,
  className,
}: ProTipProps) {
  return (
    <div
      className={cn(
        "my-8 p-8 md:p-10 bg-tertiary-container/10 border border-tertiary-container/20 rounded-lg",
        className
      )}
    >
      <IconComponent className="w-10 h-10 text-tertiary mb-4" />

      {title && (
        <h3 className="font-headline text-xl md:text-2xl text-tertiary mb-4 italic">
          {title}
        </h3>
      )}

      <p className="text-on-surface-variant leading-relaxed mb-6 text-lg">
        &ldquo;{quote}&rdquo;
      </p>

      {(author || authorRole) && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center">
            <span className="text-tertiary font-bold text-sm">
              {author?.charAt(0) || "?"}
            </span>
          </div>
          <div>
            {author && (
              <p className="text-xs font-bold tracking-widest text-tertiary uppercase">
                {author}
              </p>
            )}
            {authorRole && (
              <p className="text-xs text-on-surface-variant">{authorRole}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
