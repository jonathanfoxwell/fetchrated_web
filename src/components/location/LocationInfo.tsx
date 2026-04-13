import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import type { DirectoryListing, OpeningHours } from '@/lib/data/locations';

interface LocationInfoProps {
  location: DirectoryListing;
}

export function LocationInfo({ location }: LocationInfoProps) {
  return (
    <div className="bg-card rounded-xl border border-outline-variant/10 shadow-card p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4">Contact & Location</h2>

      <div className="space-y-4">
        {/* Address */}
        {location.formatted_address && (
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-on-surface-variant flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-on-surface">{location.formatted_address}</p>
              {location.postcode && (
                <p className="text-sm text-on-surface-variant">{location.postcode}</p>
              )}
            </div>
          </div>
        )}

        {/* Phone */}
        {location.phone && (
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            <a
              href={`tel:${location.phone}`}
              className="text-primary hover:underline"
            >
              {location.phone}
            </a>
          </div>
        )}

        {/* Email */}
        {location.email && (
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            <a
              href={`mailto:${location.email}`}
              className="text-primary hover:underline"
            >
              {location.email}
            </a>
          </div>
        )}

        {/* Website */}
        {location.website && (
          <div className="flex gap-3">
            <Globe className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            <a
              href={location.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline truncate"
            >
              {location.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {/* Opening Hours */}
        {location.opening_hours && (
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-on-surface-variant flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <OpeningHoursDisplay hours={location.opening_hours} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OpeningHoursDisplay({ hours }: { hours: OpeningHours }) {
  const days = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' },
  ] as const;

  return (
    <div className="space-y-1 text-sm">
      {days.map(({ key, label }) => {
        const dayHours = hours[key];
        return (
          <div key={key} className="flex justify-between">
            <span className="text-on-surface-variant">{label}</span>
            <span className="text-on-surface">
              {dayHours ? `${dayHours.open} - ${dayHours.close}` : 'Closed'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
