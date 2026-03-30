import { TrendingUp, MessageSquare, Clock, Star } from 'lucide-react';
import type { DirectoryListing } from '@/lib/data/practices';

interface PracticeAssessmentProps {
  practice: DirectoryListing;
}

export function PracticeAssessment({ practice }: PracticeAssessmentProps) {
  const metrics = [
    {
      icon: Star,
      label: 'Profile Score',
      value: practice.profile_strength_score?.toFixed(1) || 'N/A',
      max: '/ 10',
      color: getScoreColor(practice.profile_strength_score),
    },
    {
      icon: TrendingUp,
      label: 'Review Velocity',
      value: practice.monthly_review_velocity?.toFixed(1) || '0',
      max: '/ month',
      color: 'text-primary',
    },
    {
      icon: MessageSquare,
      label: 'Response Rate',
      value: practice.response_rate ? `${Math.round(practice.response_rate)}%` : 'N/A',
      max: '',
      color: getResponseColor(practice.response_rate),
    },
    {
      icon: Clock,
      label: 'Total Reviews',
      value: practice.total_reviews?.toString() || '0',
      max: '',
      color: 'text-on-surface',
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-outline-variant/10 shadow-card p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4">FetchRated Assessment</h2>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 bg-surface-container rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-on-surface-variant" />
                <span className="text-sm text-on-surface-variant">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </span>
                {metric.max && (
                  <span className="text-sm text-on-surface-variant">{metric.max}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {practice.badge_tier && (
        <div className="mt-4 p-4 bg-primary-container rounded-lg">
          <p className="text-sm text-on-primary-container">
            This practice has achieved <strong>{practice.badge_tier}</strong> status
            based on their overall performance and client satisfaction.
          </p>
        </div>
      )}
    </div>
  );
}

function getScoreColor(score: number | null): string {
  if (!score) return 'text-on-surface-variant';
  if (score >= 9) return 'text-amber-500';
  if (score >= 7.5) return 'text-primary';
  if (score >= 5) return 'text-on-surface';
  return 'text-error';
}

function getResponseColor(rate: number | null): string {
  if (!rate) return 'text-on-surface-variant';
  if (rate >= 80) return 'text-primary';
  if (rate >= 50) return 'text-amber-500';
  return 'text-error';
}
