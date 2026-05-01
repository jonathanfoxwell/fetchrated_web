import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LocationCard as LocationCardType } from '@/lib/data/locations';
import { fallbackProfileImage } from '@/lib/fallback-images';

interface LocationCardProps {
  location: LocationCardType;
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

export function LocationCard({ location, className }: LocationCardProps) {
  const badge = location.badge_tier ? badgeConfig[location.badge_tier] : null;
  const initials = getInitials(location.name);
  const fallback = location.logo_url ? null : fallbackProfileImage(location.slug);
  const logoSrc = location.logo_url ?? fallback?.src ?? null;

  return (
    <Link href={`/find/location/${location.slug}`} className="block">
      <Card
        className={`group bg-card border-outline-variant/10 hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 ${className ?? ''}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            {/* Logo */}
            <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-surface shadow-md bg-gradient-to-br ${badge?.gradient ?? 'from-surface-container-high to-surface-container'}`}>
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={location.name}
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
            {location.name}
          </CardTitle>

          {location.headline && (
            <CardDescription className="line-clamp-2">
              {location.headline}
            </CardDescription>
          )}

          <div className="flex items-center gap-1.5 text-tertiary font-medium text-sm mt-2">
            <MapPin className="w-3.5 h-3.5" />
            {location.city || location.postcode || 'Location TBC'}
            {location.distance_miles != null && (
              <span className="text-on-surface-variant font-normal">
                &middot; {location.distance_miles < 1
                  ? `${(location.distance_miles * 1760).toFixed(0)} yards`
                  : `${location.distance_miles.toFixed(1)} mi`}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
            {/* Rating */}
            {location.average_rating && (
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold text-on-surface">
                  {location.average_rating.toFixed(1)}
                </span>
                {location.total_reviews && (
                  <span className="text-xs text-on-surface-variant">
                    ({location.total_reviews})
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

interface LocationCardGridProps {
  locations: LocationCardType[];
  className?: string;
}

export function LocationCardGrid({ locations, className }: LocationCardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className ?? ''}`}>
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
