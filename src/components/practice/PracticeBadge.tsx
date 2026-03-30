import { Award, CheckCircle, Star } from 'lucide-react';

interface PracticeBadgeProps {
  tier: 'outstanding' | 'excellent' | 'verified' | null;
  size?: 'sm' | 'md' | 'lg';
}

const badgeConfig = {
  outstanding: {
    label: 'Outstanding',
    icon: Award,
    bg: 'bg-amber-500',
    text: 'text-white',
  },
  excellent: {
    label: 'Excellent',
    icon: Star,
    bg: 'bg-primary',
    text: 'text-on-primary',
  },
  verified: {
    label: 'Verified',
    icon: CheckCircle,
    bg: 'bg-secondary',
    text: 'text-on-secondary',
  },
};

const sizeConfig = {
  sm: { badge: 'px-2 py-0.5 text-xs', icon: 'h-3 w-3' },
  md: { badge: 'px-3 py-1 text-sm', icon: 'h-4 w-4' },
  lg: { badge: 'px-4 py-1.5 text-base', icon: 'h-5 w-5' },
};

export function PracticeBadge({ tier, size = 'md' }: PracticeBadgeProps) {
  if (!tier) return null;

  const config = badgeConfig[tier];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${config.bg} ${config.text} ${sizeStyles.badge}`}>
      <Icon className={sizeStyles.icon} />
      {config.label}
    </span>
  );
}
