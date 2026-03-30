import { cn } from "@/lib/utils";
import { type LucideIcon, FileText, ArrowRight } from "lucide-react";

export interface SummaryBoxProps {
  title?: string;
  icon?: LucideIcon;
  variant?: "default" | "highlight" | "dark";
  children: React.ReactNode;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

/**
 * SummaryBox - Summary/highlight section with accent border
 *
 * @example
 * <SummaryBox
 *   title="Summary for Practitioners"
 *   variant="highlight"
 *   action={{ label: "Read Next", href: "/article/next" }}
 * >
 *   Key points content here...
 * </SummaryBox>
 */
export function SummaryBox({
  title,
  icon: IconComponent = FileText,
  variant = "default",
  children,
  action,
  className,
}: SummaryBoxProps) {
  const variants = {
    default: {
      container: "bg-surface-container border-l-4 border-outline-variant",
      title: "text-on-surface",
      content: "text-on-surface/90",
    },
    highlight: {
      container: "bg-primary/5 border-l-4 border-primary",
      title: "text-primary",
      content: "text-on-surface/90",
    },
    dark: {
      container: "bg-on-surface text-surface border-l-4 border-primary",
      title: "text-surface",
      content: "text-surface/80",
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={cn(
        "my-8 p-6 md:p-8 rounded-r-lg",
        styles.container,
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <IconComponent
            className={cn(
              "w-5 h-5",
              variant === "dark" ? "text-primary-container" : "text-primary"
            )}
          />
          <h4 className={cn("font-bold text-lg uppercase tracking-wide", styles.title)}>
            {title}
          </h4>
        </div>
      )}

      <div className={cn("leading-relaxed", styles.content)}>{children}</div>

      {action && (
        <div className="mt-6 pt-4 border-t border-current/10">
          {action.href ? (
            <a
              href={action.href}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors",
                variant === "dark"
                  ? "text-primary-container hover:text-surface"
                  : "text-primary hover:text-primary-container"
              )}
            >
              {action.label}
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors",
                variant === "dark"
                  ? "text-primary-container hover:text-surface"
                  : "text-primary hover:text-primary-container"
              )}
            >
              {action.label}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
