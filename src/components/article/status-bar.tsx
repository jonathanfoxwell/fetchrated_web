import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, type LucideIcon } from "lucide-react";

export interface StatusBarProps {
  status: "active" | "pending" | "warning" | "inactive";
  title: string;
  subtitle?: string;
  metrics?: {
    value: string | number;
    label: string;
  }[];
  icon?: LucideIcon;
  className?: string;
}

const statusStyles = {
  active: {
    bg: "bg-primary",
    text: "text-white",
    icon: CheckCircle,
  },
  pending: {
    bg: "bg-tertiary",
    text: "text-white",
    icon: Clock,
  },
  warning: {
    bg: "bg-secondary",
    text: "text-white",
    icon: AlertCircle,
  },
  inactive: {
    bg: "bg-surface-container-highest",
    text: "text-on-surface-variant",
    icon: AlertCircle,
  },
};

/**
 * StatusBar - Registry/status indicator bar
 *
 * @example
 * <StatusBar
 *   status="active"
 *   title="Active Registry Status"
 *   subtitle="Last verified: March 2024"
 *   metrics={[
 *     { value: 412, label: "Registered" },
 *     { value: "99.8%", label: "Compliance" },
 *   ]}
 * />
 */
export function StatusBar({
  status,
  title,
  subtitle,
  metrics,
  icon,
  className,
}: StatusBarProps) {
  const styles = statusStyles[status];
  const IconComponent = icon || styles.icon;

  return (
    <div
      className={cn(
        "my-8 rounded-lg overflow-hidden shadow-card",
        styles.bg,
        className
      )}
    >
      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <IconComponent className={cn("w-6 h-6", styles.text)} />
          <div>
            <h4 className={cn("font-bold text-lg", styles.text)}>{title}</h4>
            {subtitle && (
              <p className={cn("text-sm opacity-80", styles.text)}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {metrics && metrics.length > 0 && (
          <div className="flex items-center gap-6 md:gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-right">
                <p className={cn("text-2xl font-bold", styles.text)}>
                  {metric.value}
                </p>
                <p className={cn("text-xs uppercase tracking-wider opacity-70", styles.text)}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
