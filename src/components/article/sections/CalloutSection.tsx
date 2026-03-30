import { Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';

interface CalloutSectionProps {
  variant: 'info' | 'tip' | 'warning' | 'important';
  title?: string;
  content: string;
}

const variantStyles = {
  info: {
    container: 'bg-secondary-container border-secondary',
    icon: Info,
    iconColor: 'text-secondary',
    title: 'text-on-secondary-container',
    content: 'text-on-secondary-container/80',
  },
  tip: {
    container: 'bg-tertiary-container border-tertiary',
    icon: Lightbulb,
    iconColor: 'text-tertiary',
    title: 'text-on-tertiary-container',
    content: 'text-on-tertiary-container/80',
  },
  warning: {
    container: 'bg-amber-50 border-amber-500',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    title: 'text-amber-900',
    content: 'text-amber-800',
  },
  important: {
    container: 'bg-error-container border-error',
    icon: AlertCircle,
    iconColor: 'text-error',
    title: 'text-on-error-container',
    content: 'text-on-error-container/80',
  },
};

export function CalloutSection({ variant, title, content }: CalloutSectionProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <div className={`${styles.container} border-l-4 rounded-r-lg p-4`}>
      <div className="flex gap-3">
        <Icon className={`${styles.iconColor} h-5 w-5 flex-shrink-0 mt-0.5`} />
        <div className="space-y-1">
          {title && (
            <p className={`${styles.title} font-semibold`}>{title}</p>
          )}
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}
