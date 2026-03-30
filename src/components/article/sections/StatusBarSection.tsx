import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface StatusBarSectionProps {
  status: 'active' | 'pending' | 'warning';
  title: string;
  subtitle?: string;
  metrics?: { value: string; label: string }[];
}

const statusStyles = {
  active: {
    bg: 'bg-gradient-to-r from-primary to-primary/90',
    icon: CheckCircle2,
    text: 'text-on-primary',
  },
  pending: {
    bg: 'bg-gradient-to-r from-secondary to-secondary/90',
    icon: Clock,
    text: 'text-on-secondary',
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-500 to-amber-600',
    icon: AlertTriangle,
    text: 'text-white',
  },
};

export function StatusBarSection({ status, title, subtitle, metrics }: StatusBarSectionProps) {
  const styles = statusStyles[status];
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} rounded-xl p-4 ${styles.text}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6" />
          <div>
            <p className="font-semibold">{title}</p>
            {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
          </div>
        </div>

        {metrics && metrics.length > 0 && (
          <div className="flex gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-xl font-bold">{metric.value}</p>
                <p className="text-xs opacity-80">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
