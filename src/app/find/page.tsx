import {
  Navigation,
  Footer,
  SearchBar,
  CategoryCardGrid,
  SectionHeader,
  Badge,
  Card,
} from "@/components";
import { LocationCardGrid } from "@/components/location";
import { Pagination } from "@/components/pagination";
import { NearMeCard } from "@/components/near-me-card";
import { serviceCategories } from "@/lib/data";
import { getDirectoryListings, getNearbyListings } from "@/lib/data/locations";
import { Shield } from "lucide-react";

const ITEMS_PER_PAGE = 24;

interface FindPageProps {
  searchParams: Promise<{ q?: string; location?: string; lat?: string; lng?: string; page?: string }>;
}

export const metadata = {
  title: "Find Verified Pet Care Services | FetchRated",
  description: "Search our directory of verified veterinary practices, groomers, trainers, and boarding facilities across the UK.",
};

export default async function FindPage({ searchParams }: FindPageProps) {
  const { q, location, lat, lng, page } = await searchParams;
  const hasCoords = !!(lat && lng);
  const isSearching = !!(q || location || hasCoords);
  const currentPage = Math.max(1, Number(page) || 1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let locations;
  let totalCount: number;

  if (hasCoords) {
    // Near me search — distance-sorted
    const result = await getNearbyListings({
      lat: Number(lat),
      lng: Number(lng),
      search: q || undefined,
      limit: ITEMS_PER_PAGE,
      offset,
    });
    locations = result.data;
    totalCount = result.totalCount;
  } else {
    // Standard search or browse
    const result = await getDirectoryListings({
      search: q || undefined,
      location: location || undefined,
      limit: isSearching ? ITEMS_PER_PAGE : 12,
      offset: isSearching ? offset : 0,
    });
    locations = result.data;
    totalCount = result.totalCount;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/find" />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-6">
              Find <span className="serif-italic">verified</span> pet care
            </h1>
            <p className="text-xl text-on-surface-variant">
              Search our directory of independently assessed practices across the UK
            </p>
          </div>

          <SearchBar
            className="max-w-4xl mx-auto"
            defaultQuery={q}
            defaultLocation={hasCoords ? "Near me" : location}
            defaultLat={lat}
            defaultLng={lng}
          />
        </section>

        {isSearching ? (
          /* Search / Near Me Results */
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <SectionHeader
              title={
                <>
                  {totalCount.toLocaleString()} result{totalCount !== 1 ? "s" : ""}
                  {hasCoords ? " near you" : null}
                  {q && !hasCoords ? <> for <span className="serif-italic">&ldquo;{q}&rdquo;</span></> : null}
                  {location && !hasCoords ? <> in <span className="serif-italic">{location}</span></> : null}
                </>
              }
              subtitle={hasCoords ? "Sorted by distance from your location" : undefined}
            />
            {locations.length > 0 ? (
              <>
                <LocationCardGrid locations={locations} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath="/find"
                  searchParams={{
                    ...(q ? { q } : {}),
                    ...(location ? { location } : {}),
                    ...(lat ? { lat } : {}),
                    ...(lng ? { lng } : {}),
                  }}
                />
              </>
            ) : (
              <Card className="p-12 text-center">
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-on-surface-variant mb-6">
                  {hasCoords
                    ? "No verified practices found within 50 miles of your location. Try searching by area name instead."
                    : "Try adjusting your search terms or browsing by category below."}
                </p>
              </Card>
            )}
          </section>
        ) : (
          <>
            {/* Near Me + Service Categories */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <NearMeCard />
              <SectionHeader
                title="Browse by service"
                subtitle="Find the right type of care for your pet"
              />
              <CategoryCardGrid categories={serviceCategories} />
            </section>

            {/* Badge Explainer */}
            <section className="bg-surface-container-low py-16">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <Badge className="bg-secondary text-white mb-2">Verified</Badge>
                      <p className="text-sm text-on-surface-variant">
                        Practice has completed our assessment process and meets baseline quality standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-tertiary" />
                    </div>
                    <div>
                      <Badge className="bg-tertiary text-white mb-2">Excellent</Badge>
                      <p className="text-sm text-on-surface-variant">
                        Exceeds standards with outstanding patient care and facility quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Badge className="bg-primary text-white mb-2">Outstanding</Badge>
                      <p className="text-sm text-on-surface-variant">
                        Top-tier recognition for exceptional clinical excellence and ethics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Practices */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
              <SectionHeader
                title={<>Featured <span className="serif-italic">practices</span></>}
                subtitle="Recently verified practices in our directory"
              />
              <LocationCardGrid locations={locations} />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
