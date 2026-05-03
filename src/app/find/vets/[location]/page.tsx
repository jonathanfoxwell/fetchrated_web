import Link from "next/link";
import {
  Navigation,
  Footer,
  Breadcrumbs,
  BreadcrumbSchema,
  FAQSchema,
  SearchBar,
  Card,
} from "@/components";
import { LocationCardGrid } from "@/components/location";
import { Pagination } from "@/components/pagination";
import { getDirectoryListings, getDirectoryCities } from "@/lib/data/locations";
import { MapPin, Star } from "lucide-react";

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

  // Pull the count so the description varies per city (uniqueness signal).
  // Cheap query — limit:1 returns the totalCount in the same response shape.
  const { totalCount } = await getDirectoryListings({
    city: locationName,
    limit: 1,
  });

  const countPhrase = totalCount > 0
    ? `${totalCount} verified veterinary ${totalCount === 1 ? 'practice' : 'practices'}`
    : 'Verified veterinary practices';

  return {
    title: `Vets in ${locationName} | ${totalCount > 0 ? `${totalCount} Verified Practices` : 'FetchRated'}`,
    description: `${countPhrase} in ${locationName}, sorted by rating. Independent UK directory with reviews, opening hours, and contact details for every listing.`,
    alternates: {
      canonical: `https://fetchrated.com/find/vets/${location}`,
    },
  };
}

// City-specific FAQs become FAQPage JSON-LD on every city page. Each is a real
// question pet owners actually search for, with the city name embedded so the
// schema is unique per page.
function getCityFaqs(locationName: string, totalCount: number) {
  return [
    {
      question: `How many veterinary practices are listed in ${locationName}?`,
      answer: `FetchRated currently lists ${totalCount} veterinary ${totalCount === 1 ? 'practice' : 'practices'} in ${locationName}, sorted by rating and total review count. The directory is updated as new practices are added and as their public information changes.`,
    },
    {
      question: `Are the vets in ${locationName} RCVS-registered?`,
      answer: `All veterinary surgeons practising in the UK must be registered with the Royal College of Veterinary Surgeons (RCVS) under the Veterinary Surgeons Act 1966. You can verify any individual vet or practice on the RCVS register at rcvs.org.uk.`,
    },
    {
      question: `How does FetchRated rank veterinary practices in ${locationName}?`,
      answer: `Listings are ordered by average rating and total verified review count. Where a practice has completed the FetchRated independent assessment, that result appears alongside the public data — the assessment also considers online visibility, review authenticity, and local competitive position.`,
    },
    {
      question: `Are reviews on FetchRated verified?`,
      answer: `FetchRated combines publicly available reviews (primarily Google) with our own independent verification process. Practices that complete the FetchRated assessment carry a verified status alongside their public data; practices listed from public information only are clearly marked as such.`,
    },
    {
      question: `Where can I find an emergency or out-of-hours vet in ${locationName}?`,
      answer: `Many practices listed in ${locationName} either provide their own out-of-hours service or refer to a dedicated emergency veterinary centre. Each practice listing shows their out-of-hours arrangement where available. For a practical overview of when to call, see our guide on when to go to an emergency vet.`,
    },
  ];
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

  // Top-rated highlights — only shown on page 1, only when we have enough
  // entries to make a "top 3" meaningful. Listings are already sorted by
  // rating then review count, so the first three are the best evidence.
  const topRated = currentPage === 1 && locations.length >= 4 ? locations.slice(0, 3) : [];

  // City-specific FAQs are emitted as FAQPage JSON-LD on every city page.
  const cityFaqs = totalCount > 0 ? getCityFaqs(locationName, totalCount) : [];

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
      {cityFaqs.length > 0 && <FAQSchema faqs={cityFaqs} />}
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
              {totalCount > 0 ? (
                <>
                  {totalCount} verified veterinary {totalCount === 1 ? 'practice' : 'practices'} in {locationName}, sorted by rating. Each listing carries contact details, opening hours, public reviews, and — where the practice has completed our assessment — an independent FetchRated verification.
                </>
              ) : (
                <>Browse veterinary practices in {locationName} from our UK directory — contact details, opening hours, reviews, and (where available) summaries built from public information.</>
              )}
            </p>
          </div>
        </section>

        {/* Top-rated highlights — page-1 only, gives the page unique editorial
            content beyond the listings grid (variation per city = real SEO
            depth, vs near-duplicate boilerplate across 957 city pages). */}
        {topRated.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
            <Card className="p-6 md:p-8 bg-surface-container-low border-outline-variant/10">
              <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" fill="currentColor" />
                Top-rated vets in {locationName}
              </h2>
              <p className="text-on-surface-variant mb-4">
                The highest-rated practices currently listed in {locationName}, ordered by rating and verified review depth:
              </p>
              <ol className="space-y-2 list-decimal list-inside marker:font-semibold marker:text-primary">
                {topRated.map((p) => (
                  <li key={p.slug} className="text-on-surface">
                    <Link
                      href={`/find/location/${p.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {p.name}
                    </Link>
                    {p.average_rating && p.total_reviews ? (
                      <span className="text-on-surface-variant text-sm">
                        {' '}— {p.average_rating.toFixed(1)}/5 from {p.total_reviews.toLocaleString()} reviews
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </Card>
          </section>
        )}

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
