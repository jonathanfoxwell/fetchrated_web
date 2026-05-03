import {
  Navigation,
  Footer,
  Breadcrumbs,
  BreadcrumbSchema,
  SearchBar,
  Card,
} from "@/components";
import { LocationCardGrid } from "@/components/location";
import { Pagination } from "@/components/pagination";
import { getDirectoryListings, getDirectoryCities } from "@/lib/data/locations";
import { MapPin } from "lucide-react";

const ITEMS_PER_PAGE = 24;

// Render at request time. Without this, generateStaticParams pre-builds these
// pages at deploy time and Vercel's data cache pins the supabase result
// across deploys. We want fresh data on every request — getDirectoryListings
// is already cheap, and getFeaturedListings / others that should be cached
// are wrapped in unstable_cache with explicit tags.
export const dynamic = 'force-dynamic';

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
    title: `Vets in ${locationName} | FetchRated`,
    description: `Browse veterinary practices in ${locationName} from our UK directory, drawn from public information.`,
    alternates: {
      canonical: `https://fetchrated.com/find/vets/${location}`,
    },
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
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fetchrated.com" },
          { name: "Find", url: "https://fetchrated.com/find" },
          { name: "Vets", url: "https://fetchrated.com/find/vets" },
          { name: locationName, url: `https://fetchrated.com/find/vets/${location}` },
        ]}
      />
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
              Browse veterinary practices in {locationName} from our UK directory — contact details, opening hours, reviews, and (where available) summaries built from public information.
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
              {totalCount} {totalCount === 1 ? "practice" : "practices"} listed
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
                We don't have any practices listed in {locationName} yet. Try searching another location or browsing the full directory.
              </p>
              <a
                href="/find"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-on-primary font-semibold text-sm rounded-lg"
              >
                Browse the directory
              </a>
            </Card>
          )}
        </section>

        {/* About this directory */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-surface-container-low border-outline-variant/10">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
              About this listing
            </h2>
            <div className="prose prose-lg text-on-surface-variant max-w-none">
              <p>
                FetchRated's UK directory combines public information — contact details, opening hours, Google reviews, and AI-generated summaries — with our independent assessment of each practice. As practices complete the FetchRated assessment, their results appear alongside the public data.
              </p>
              <p>
                Combine what you read here with your own visit and the questions in our <a href="/learn/questions-to-ask-your-vet">choosing-a-vet guide</a> to make an informed decision.
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
