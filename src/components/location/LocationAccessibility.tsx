import { Accessibility, ParkingCircle } from 'lucide-react';
import type { AccessibilityFlags, ParkingFlags } from '@/lib/data/locations';

interface LocationAccessibilityProps {
  accessibility: AccessibilityFlags | null;
  parking: ParkingFlags | null;
}

const A11Y_LABELS: Record<keyof AccessibilityFlags, string> = {
  wheelchairAccessibleParking: 'Wheelchair-accessible parking',
  wheelchairAccessibleEntrance: 'Wheelchair-accessible entrance',
  wheelchairAccessibleRestroom: 'Wheelchair-accessible toilet',
  wheelchairAccessibleSeating: 'Wheelchair-accessible seating',
};

const PARKING_LABELS: Record<keyof ParkingFlags, string> = {
  freeParkingLot: 'Free parking on site',
  paidParkingLot: 'Paid parking on site',
  freeStreetParking: 'Free street parking',
  paidStreetParking: 'Paid street parking',
  valetParking: 'Valet parking',
  freeGarageParking: 'Free garage parking',
  paidGarageParking: 'Paid garage parking',
};

export function LocationAccessibility({ accessibility, parking }: LocationAccessibilityProps) {
  const a11yItems = collectTrueFlags(accessibility, A11Y_LABELS);
  const parkingItems = collectTrueFlags(parking, PARKING_LABELS);

  if (!a11yItems.length && !parkingItems.length) return null;

  return (
    <section
      aria-label="Accessibility and parking"
      className="bg-card rounded-xl border border-outline-variant/10 shadow-card p-6 md:p-8"
    >
      <h2 className="text-xl font-bold text-on-surface mb-5">Accessibility &amp; parking</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {a11yItems.map((label) => (
          <FlagChip key={`a11y-${label}`} label={label} icon="a11y" />
        ))}
        {parkingItems.map((label) => (
          <FlagChip key={`park-${label}`} label={label} icon="parking" />
        ))}
      </div>
    </section>
  );
}

function FlagChip({ label, icon }: { label: string; icon: 'a11y' | 'parking' }) {
  const Icon = icon === 'a11y' ? Accessibility : ParkingCircle;
  return (
    <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg">
      <Icon className="h-5 w-5 text-tertiary flex-shrink-0" aria-hidden="true" />
      <span className="text-sm text-on-surface">{label}</span>
    </div>
  );
}

function collectTrueFlags<T extends object>(
  flags: T | null,
  labels: Record<keyof T, string>,
): string[] {
  if (!flags) return [];
  const out: string[] = [];
  for (const key of Object.keys(labels) as Array<keyof T>) {
    if ((flags as Record<keyof T, boolean | undefined>)[key] === true) out.push(labels[key]);
  }
  return out;
}
