interface KeyMetricsSectionProps {
  metrics: { value: string; unit?: string; label: string }[];
}

export function KeyMetricsSection({ metrics }: KeyMetricsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-card rounded-xl p-6 text-center border border-outline-variant/10 shadow-card"
        >
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl md:text-4xl font-bold text-primary">
              {metric.value}
            </span>
            {metric.unit && (
              <span className="text-lg text-primary">{metric.unit}</span>
            )}
          </div>
          <p className="mt-2 text-sm text-on-surface-variant font-medium">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
