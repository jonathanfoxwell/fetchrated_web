import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { PracticeBadge } from './PracticeBadge';
import type { PracticeCard as PracticeCardType } from '@/lib/data/practices';

interface PracticeCardProps {
  practice: PracticeCardType;
}

export function PracticeCard({ practice }: PracticeCardProps) {
  return (
    <Link
      href={`/find/practice/${practice.slug}`}
      className="group block bg-surface rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
    >
      {/* Logo/Header */}
      <div className="relative h-32 bg-surface-container flex items-center justify-center">
        {practice.logo_url ? (
          <Image
            src={practice.logo_url}
            alt={`${practice.name} logo`}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="text-4xl font-bold text-primary/30">
            {practice.name.charAt(0)}
          </div>
        )}

        {/* Badge */}
        {practice.badge_tier && (
          <div className="absolute top-3 right-3">
            <PracticeBadge tier={practice.badge_tier} size="sm" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
          {practice.name}
        </h3>

        {practice.headline && (
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
            {practice.headline}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 mt-3 text-sm text-on-surface-variant">
          <MapPin className="h-4 w-4" />
          <span>{practice.city || practice.postcode || 'Location TBC'}</span>
        </div>

        {/* Rating */}
        {practice.average_rating && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-on-surface">
                {practice.average_rating.toFixed(1)}
              </span>
            </div>
            {practice.total_reviews && (
              <span className="text-sm text-on-surface-variant">
                ({practice.total_reviews} reviews)
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
