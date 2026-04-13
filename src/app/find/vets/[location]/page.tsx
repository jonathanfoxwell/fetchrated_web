import {
  Navigation,
  Footer,
  Breadcrumbs,
  SearchBar,
  Card,
} from "@/components";
import { LocationCardGrid } from "@/components/location";
import { Pagination } from "@/components/pagination";
import { getDirectoryListings, getDirectoryCities } from "@/lib/data/locations";
import { MapPin } from "lucide-react";

const ITEMS_PER_PAGE = 24;

interface LocalVetsPageProps {
  params: Promise<{ location: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const cities = await getDirectoryCities();
  return cities.slice(0, 50).map(({ city }) => ({
    location: city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: LocalVetsPageProps) {
  const { location } = await params;
  const locationName = location
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `Vets in ${locationName} | FetchRated Verified Practices`,
    description: `Find verified veterinary practices in ${locationName}. Read independent reviews and compare quality ratings.`,
  };
}

export default async function LocalVetsPage({ params, searchParams }: LocalVetsPageProps) {
  const { location } = await params;
  const { page } = await searchParams;

  // Convert slug back to city name for DB query
  const locationName = location
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const currentPage = Math.max(1, Number(page) || 1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data: locations, totalCount } = await getDirectoryListings({
    city: locationName,
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-surface">
      <Navigation currentPath="/find" />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <Breadcrumbs
            items={[
              { label: "Find", href: "/find" },
              { label: "Vets", href: "/find/vets" },
              { label: locationName },
            ]}
          />
          <div className="mt-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                United Kingdom
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">
              Vets in <span className="serif-italic">{locationName}</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl">
              Find verified veterinary practices in {locationName}. All practices listed have been independently assessed against FetchRated standards.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <SearchBar placeholder={`Search vets in ${locationName}...`} />
        </section>

        {/* Results */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-on-surface">
              {totalCount} Verified Vets
            </h2>
            <span className="text-sm text-on-surface-variant">
              Sorted by rating
            </span>
          </div>
          {locations.length > 0 ? (
            <>
              <LocationCardGrid locations={locations} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/find/vets/${location}`}
              />
            </>
          ) : (
            <Card className="p-12 text-center">
              <h3 className="text-xl font-bold mb-2">No practices found</h3>
              <p className="text-on-surface-variant mb-6">
                We don't have verified practices in {locationName} yet. Check back soon or search another location.
              </p>
              <a
                href="/find/vets"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white font-semibold text-sm rounded-lg"
              >
                Browse All Vets
              </a>
            </Card>
          )}
        </section>

        {/* About Local Vets */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-surface-container-low border-outline-variant/10">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
              About Vets in {locationName}
            </h2>
            <div className="prose prose-lg text-on-surface-variant max-w-none">
              <p>
                All veterinary practices listed on FetchRated have been independently
                assessed against our national standards. We evaluate practices across
                four key dimensions: online visibility, review quality, review authenticity,
                and competitive position.
              </p>
              <p>
                Each practice in {locationName} has earned a FetchRated trust mark—either
                Verified, Excellent, or Outstanding—based on their assessed performance.
                This helps you make an informed choice about your pet's healthcare.
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
