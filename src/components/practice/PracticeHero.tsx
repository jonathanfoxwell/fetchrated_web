import Image from 'next/image';
import { Star, MapPin, Phone, Globe, Mail } from 'lucide-react';
import { PracticeBadge } from './PracticeBadge';
import type { DirectoryListing } from '@/lib/data/practices';

interface PracticeHeroProps {
  practice: DirectoryListing;
}

export function PracticeHero({ practice }: PracticeHeroProps) {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-gradient-to-br from-primary to-secondary relative">
        {practice.cover_image_url && (
          <Image
            src={practice.cover_image_url}
            alt={`${practice.name} cover`}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row gap-6">
          {/* Logo */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-surface rounded-xl border-4 border-surface shadow-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {practice.logo_url ? (
              <Image
                src={practice.logo_url}
                alt={`${practice.name} logo`}
                width={160}
                height={160}
                className="object-contain p-2"
              />
            ) : (
              <span className="text-5xl font-bold text-primary/30">
                {practice.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-8">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              {practice.badge_tier && (
                <PracticeBadge tier={practice.badge_tier} size="md" />
              )}
              {practice.membership_tier && (
                <span className="text-sm text-on-surface-variant">
                  {practice.membership_tier} Member
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-on-surface">
              {practice.name}
            </h1>

            {practice.headline && (
              <p className="text-lg text-on-surface-variant mt-2">
                {practice.headline}
              </p>
            )}

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              {practice.average_rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-lg">{practice.average_rating.toFixed(1)}</span>
                  {practice.total_reviews && (
                    <span className="text-on-surface-variant">
                      ({practice.total_reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {practice.city && (
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <MapPin className="h-5 w-5" />
                  <span>{practice.city}</span>
                </div>
              )}
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {practice.phone && (
                <a
                  href={`tel:${practice.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              )}
              {practice.website && (
                <a
                  href={practice.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-medium hover:bg-surface-container-high transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
              {practice.email && (
                <a
                  href={`mailto:${practice.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-medium hover:bg-surface-container-high transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
