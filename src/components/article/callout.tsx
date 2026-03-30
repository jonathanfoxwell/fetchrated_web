import { cn } from "@/lib/utils";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Bookmark,
  type LucideIcon,
} from "lucide-react";

export interface CalloutProps {
  type?: "info" | "tip" | "warning" | "important" | "success" | "note";
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const calloutStyles = {
  info: {
    container: "bg-tertiary/5 border-tertiary",
    icon: Info,
    iconColor: "text-tertiary",
    titleColor: "text-tertiary",
  },
  tip: {
    container: "bg-tertiary/10 border-tertiary",
    icon: Lightbulb,
    iconColor: "text-tertiary",
    titleColor: "text-tertiary",
  },
  warning: {
    container: "bg-secondary/5 border-secondary",
    icon: AlertTriangle,
    iconColor: "text-secondary",
    titleColor: "text-secondary",
  },
  important: {
    container: "bg-primary/5 border-primary",
    icon: AlertCircle,
    iconColor: "text-primary",
    titleColor: "text-primary",
  },
  success: {
    container: "bg-tertiary/10 border-tertiary",
    icon: CheckCircle,
    iconColor: "text-tertiary",
    titleColor: "text-tertiary",
  },
  note: {
    container: "bg-surface-container border-outline-variant/50",
    icon: Bookmark,
    iconColor: "text-on-surface-variant",
    titleColor: "text-on-surface",
  },
};

/**
 * Callout - Styled callout box for highlighting important information
 *
 * @example
 * <Callout type="tip" title="Pro Tip">
 *   Always request a tour of the facility before committing.
 * </Callout>
 */
export function Callout({
  type = "info",
  title,
  icon,
  children,
  className,
}: CalloutProps) {
  const styles = calloutStyles[type];
  const IconComponent = icon || styles.icon;

  return (
    <div
      className={cn(
        "my-6 p-6 border-l-4 rounded-r-lg",
        styles.container,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <IconComponent
          className={cn("w-5 h-5 flex-shrink-0 mt-0.5", styles.iconColor)}
        />
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className={cn("font-bold mb-2", styles.titleColor)}>{title}</h5>
          )}
          <div className="text-on-surface/90 leading-relaxed [&>p]:mb-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
