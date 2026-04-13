import { getLocationById } from '@/lib/data/locations';
import { LocationCard } from '@/components/location';

interface LocationCardSectionProps {
  locationId: string;
}

export async function LocationCardSection({ locationId }: LocationCardSectionProps) {
  const location = await getLocationById(locationId);

  if (!location) {
    return (
      <div className="p-4 border border-dashed border-outline-variant rounded-lg text-on-surface-variant text-sm text-center">
        Location not found
      </div>
    );
  }

  return (
    <div className="max-w-sm">
      <LocationCard location={location} />
    </div>
  );
}
