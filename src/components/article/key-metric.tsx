import { cn } from "@/lib/utils";

export interface KeyMetricProps {
  value: string | number;
  label: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

/**
 * KeyMetric - Large statistic display
 *
 * @example
 * <KeyMetric value="94.2" unit="%" label="Key Metrics" />
 */
export function KeyMetric({
  value,
  label,
  unit,
  trend,
  className,
}: KeyMetricProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-2">
        {value}
        {unit && (
          <span className="text-2xl md:text-3xl text-on-surface-variant ml-1">
            {unit}
          </span>
        )}
        {trend && (
          <span
            className={cn(
              "text-lg ml-2",
              trend === "up" && "text-tertiary",
              trend === "down" && "text-secondary",
              trend === "neutral" && "text-on-surface-variant"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"}
          </span>
        )}
      </div>
      <p className="text-sm text-on-surface-variant uppercase tracking-widest font-medium">
        {label}
      </p>
    </div>
  );
}

interface KeyMetricGroupProps {
  metrics: KeyMetricProps[];
  className?: string;
}

/**
 * KeyMetricGroup - Row of key metrics
 *
 * @example
 * <KeyMetricGroup
 *   metrics={[
 *     { value: "94.2", unit: "%", label: "Compliance Rate" },
 *     { value: "88.5", unit: "%", label: "Satisfaction" },
 *   ]}
 * />
 */
export function KeyMetricGroup({ metrics, className }: KeyMetricGroupProps) {
  return (
    <div
      className={cn(
        "my-8 py-8 grid gap-8 border-y border-outline-variant/30",
        metrics.length === 2 && "grid-cols-2",
        metrics.length === 3 && "grid-cols-3",
        metrics.length === 4 && "grid-cols-2 md:grid-cols-4",
        className
      )}
    >
      {metrics.map((metric, index) => (
        <KeyMetric key={index} {...metric} />
      ))}
    </div>
  );
}
