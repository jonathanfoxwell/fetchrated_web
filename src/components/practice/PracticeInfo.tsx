import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import type { DirectoryListing, OpeningHours } from '@/lib/data/practices';

interface PracticeInfoProps {
  practice: DirectoryListing;
}

export function PracticeInfo({ practice }: PracticeInfoProps) {
  return (
    <div className="bg-surface rounded-xl border border-outline-variant p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4">Contact & Location</h2>

      <div className="space-y-4">
        {/* Address */}
        {practice.formatted_address && (
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-on-surface-variant flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-on-surface">{practice.formatted_address}</p>
              {practice.postcode && (
                <p className="text-sm text-on-surface-variant">{practice.postcode}</p>
              )}
            </div>
          </div>
        )}

        {/* Phone */}
        {practice.phone && (
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            <a
              href={`tel:${practice.phone}`}
              className="text-primary hover:underline"
            >
              {practice.phone}
            </a>
          </div>
        )}

        {/* Email */}
        {practice.email && (
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            <a
              href={`mailto:${practice.email}`}
              className="text-primary hover:underline"
            >
              {practice.email}
            </a>
          </div>
        )}

        {/* Website */}
        {practice.website && (
          <div className="flex gap-3">
            <Globe className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            <a
              href={practice.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline truncate"
            >
              {practice.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {/* Opening Hours */}
        {practice.opening_hours && (
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-on-surface-variant flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <OpeningHoursDisplay hours={practice.opening_hours} />
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
