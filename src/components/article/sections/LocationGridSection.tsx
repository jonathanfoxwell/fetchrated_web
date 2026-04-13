import { getLocationsByIds } from '@/lib/data/locations';
import { LocationCard } from '@/components/location';

interface LocationGridSectionProps {
  locationIds: string[];
  title?: string;
}

export async function LocationGridSection({ locationIds, title }: LocationGridSectionProps) {
  const locations = await getLocationsByIds(locationIds);

  if (!locations.length) {
    return (
      <div className="p-4 border border-dashed border-outline-variant rounded-lg text-on-surface-variant text-sm text-center">
        No locations found
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="text-xl font-semibold text-on-surface mb-4">{title}</h3>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
