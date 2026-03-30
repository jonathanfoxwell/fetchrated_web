import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PracticeCard as PracticeCardType } from '@/lib/data/practices';

interface PracticeCardProps {
  practice: PracticeCardType;
  className?: string;
}

const badgeConfig = {
  outstanding: {
    label: 'Outstanding',
    className: 'bg-primary text-white shadow-badge',
    gradient: 'from-primary/20 via-primary/10 to-surface-container',
  },
  excellent: {
    label: 'Excellent',
    className: 'bg-tertiary text-white shadow-badge',
    gradient: 'from-tertiary/20 via-tertiary/10 to-surface-container',
  },
  verified: {
    label: 'Verified',
    className: 'bg-secondary text-white shadow-badge',
    gradient: 'from-secondary/20 via-secondary/10 to-surface-container',
  },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function PracticeCard({ practice, className }: PracticeCardProps) {
  const badge = practice.badge_tier ? badgeConfig[practice.badge_tier] : null;
  const initials = getInitials(practice.name);

  return (
    <Link href={`/find/practice/${practice.slug}`} className="block">
      <Card
        className={`group bg-card border-outline-variant/10 hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 ${className ?? ''}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            {/* Practice Logo */}
            <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-surface shadow-md bg-gradient-to-br ${badge?.gradient ?? 'from-surface-container-high to-surface-container'}`}>
              {practice.logo_url ? (
                <Image
                  src={practice.logo_url}
                  alt={practice.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xl font-bold text-on-surface-variant/60 group-hover:text-primary/60 transition-colors">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Badge */}
            {badge && (
              <Badge className={`uppercase text-[10px] font-bold tracking-widest ${badge.className}`}>
                {badge.label}
              </Badge>
            )}
          </div>

          <CardTitle className="text-lg mt-4 group-hover:text-primary transition-colors duration-200">
            {practice.name}
          </CardTitle>

          {practice.headline && (
            <CardDescription className="line-clamp-2">
              {practice.headline}
            </CardDescription>
          )}

          <div className="flex items-center gap-1.5 text-tertiary font-medium text-sm mt-2">
            <MapPin className="w-3.5 h-3.5" />
            {practice.city || practice.postcode || 'Location TBC'}
          </div>
        </CardHeader>

        <CardContent>
          <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
            {/* Rating */}
            {practice.average_rating && (
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold text-on-surface">
                  {practice.average_rating.toFixed(1)}
                </span>
                {practice.total_reviews && (
                  <span className="text-xs text-on-surface-variant">
                    ({practice.total_reviews})
                  </span>
                )}
              </div>
            )}

            <span className="text-primary font-semibold text-sm group-hover:gap-2.5 transition-all duration-200 flex items-center gap-1.5 ml-auto">
              View Profile
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface PracticeCardGridProps {
  practices: PracticeCardType[];
  className?: string;
}

export function PracticeCardGrid({ practices, className }: PracticeCardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className ?? ''}`}>
      {practices.map((practice) => (
        <PracticeCard key={practice.id} practice={practice} />
      ))}
    </div>
  );
}
