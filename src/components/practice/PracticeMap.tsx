'use client';

import { MapPin } from 'lucide-react';

interface PracticeMapProps {
  latitude: number | null;
  longitude: number | null;
  name: string;
  address?: string | null;
}

export function PracticeMap({ latitude, longitude, name, address }: PracticeMapProps) {
  if (!latitude || !longitude) {
    return (
      <div className="bg-card rounded-xl border border-outline-variant/10 shadow-card p-6">
        <h2 className="text-lg font-semibold text-on-surface mb-4">Location</h2>
        <div className="aspect-video bg-surface-container rounded-lg flex items-center justify-center">
          <div className="text-center text-on-surface-variant">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Location not available</p>
          </div>
        </div>
      </div>
    );
  }

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${latitude},${longitude}&zoom=15`;

  // Fallback to static map if no API key
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7C${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}`;

  // OpenStreetMap fallback (no API key needed)
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="bg-surface rounded-xl border border-outline-variant p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4">Location</h2>

      <div className="aspect-video rounded-lg overflow-hidden bg-surface-container">
        <iframe
          src={osmUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${name}`}
        />
      </div>

      {address && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
        >
          <MapPin className="h-4 w-4" />
          Get directions
        </a>
      )}
    </div>
  );
}
