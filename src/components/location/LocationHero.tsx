import Image from 'next/image';
import { Star, MapPin, Phone, Globe, Mail, Clock, Calendar } from 'lucide-react';
import type { DirectoryListing } from '@/lib/data/locations';
import { fallbackProfileImage, fallbackBannerImage } from '@/lib/fallback-images';

interface LocationHeroProps {
  location: DirectoryListing;
  isOpenNow?: boolean;
  todayHours?: { open: string; close: string } | null;
  yearsOperating?: number | null;
}

export function LocationHero({
  location,
  isOpenNow,
  todayHours,
  yearsOperating,
}: LocationHeroProps) {
  const logoSrc = location.logo_url ?? fallbackProfileImage(location.slug);
  const coverSrc = location.cover_image_url ?? fallbackBannerImage(location.slug);

  return (
    <div className="relative">
      {/* Cover Image — blurred so it acts as ambient backdrop rather than competing
          for attention with the listing content overlaid below. scale-110 hides
          the soft edges that the blur introduces at the container border. */}
      <div className="h-48 md:h-64 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        {coverSrc && (
          <Image
            src={coverSrc}
            alt={`${location.name} cover`}
            fill
            className="object-cover blur-md scale-110"
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
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={`${location.name} logo`}
                width={160}
                height={160}
                className={location.logo_url ? 'object-contain p-2' : 'object-cover w-full h-full'}
              />
            ) : (
              <span className="text-5xl font-bold text-primary/30">
                {location.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-8">
            {location.membership_tier && (
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-sm text-on-surface-variant">
                  {location.membership_tier} Member
                </span>
              </div>
            )}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-on-surface">
              {location.name}
            </h1>

            {location.headline && (
              <p className="text-lg text-on-surface-variant mt-2">
                {location.headline}
              </p>
            )}

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              {location.average_rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-lg">{location.average_rating.toFixed(1)}</span>
                  {location.total_reviews && (
                    <span className="text-on-surface-variant">
                      ({location.total_reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {location.city && (
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <MapPin className="h-5 w-5" />
                  <span>{location.city}</span>
                </div>
              )}
            </div>

            {/* Status chips */}
            {(todayHours || (yearsOperating && yearsOperating >= 3)) && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {todayHours && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      isOpenNow
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {isOpenNow
                      ? `Open · today ${todayHours.open}–${todayHours.close}`
                      : `Closed · today ${todayHours.open}–${todayHours.close}`}
                  </span>
                )}
                {yearsOperating && yearsOperating >= 3 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-surface-container text-on-surface-variant">
                    <Calendar className="h-4 w-4" />
                    {yearsOperating}+ years operating
                  </span>
                )}
              </div>
            )}

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {location.phone && (
                <a
                  href={`tel:${location.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              )}
              {location.website && (
                <a
                  href={location.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-medium hover:bg-surface-container-high transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
              {location.email && (
                <a
                  href={`mailto:${location.email}`}
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
