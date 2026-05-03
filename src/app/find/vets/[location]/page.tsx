import Link from "next/link";
import {
  Navigation,
  Footer,
  Breadcrumbs,
  BreadcrumbSchema,
  FAQSchema,
  SearchBar,
  Card,
  GuideCardGrid,
} from "@/components";
import { LocationCardGrid } from "@/components/location";
import { Pagination } from "@/components/pagination";
import { getDirectoryListings, getDirectoryCities } from "@/lib/data/locations";
import { getArticlesByAudience } from "@/lib/data/articles";
import { MapPin, Star, ChevronDown, BarChart3 } from "lucide-react";

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

  // City-wide stats panel — page 1 only. Pulls all city practices in one
  // shot (cap 1000, comfortably above any UK city) and aggregates locally.
  // City profile is the same regardless of which paginated page you're on,
  // so showing it on page 1 keeps the page useful without duplicating across
  // pagination.
  const allInCity = currentPage === 1 && totalCount > 0
    ? (await getDirectoryListings({ city: locationName, limit: 1000 })).data
    : [];

  const cityStats = (() => {
    if (allInCity.length === 0) return null;
    let ratingSum = 0;
    let ratingCount = 0;
    let highRated = 0;
    let totalReviews = 0;
    let withReviews = 0;
    for (const p of allInCity) {
      if (p.average_rating != null) {
        ratingSum += p.average_rating;
        ratingCount += 1;
        if (p.average_rating >= 4.5) highRated += 1;
      }
      if (p.total_reviews) {
        totalReviews += p.total_reviews;
        withReviews += 1;
      }
    }
    return {
      avgRating: ratingCount > 0 ? ratingSum / ratingCount : 0,
      highRated,
      totalReviews,
      withReviews,
    };
  })();

  // City-specific FAQs are emitted as FAQPage JSON-LD on every city page,
  // and also rendered as a visible accordion at the bottom (Google rewards
  // schema-content alignment, plus it's genuinely useful for visitors).
  const cityFaqs = totalCount > 0 ? getCityFaqs(locationName, totalCount) : [];

  // Related guides — pulls 3 veterinary-category articles, pillars first.
  // Mirrors the practice-detail-page block: directory pages route users to
  // editorial content as a natural next step (and improves topical authority).
  const vetArticles = await getArticlesByAudience("consumer", "veterinary");
  const relatedGuides = [...vetArticles]
    .sort((a, b) => Number(b.is_pillar) - Number(a.is_pillar))
    .slice(0, 3);

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

        {/* City stats panel — aggregated across all practices in the city.
            Page 1 only; gives the page a city-profile feel and contributes
            unique-per-city numbers (avg rating, high-rated count, review
            volume). Pure data render, no editorial cost. */}
        {cityStats && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
            <Card className="p-6 md:p-8 bg-surface-container-low border-outline-variant/10">
              <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                {locationName} at a glance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-headline font-bold text-on-surface">
                    {totalCount}
                  </div>
                  <div className="text-sm text-on-surface-variant mt-1">
                    Verified {totalCount === 1 ? 'practice' : 'practices'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-bold text-on-surface">
                    {cityStats.avgRating > 0 ? cityStats.avgRating.toFixed(1) : '—'}
                    {cityStats.avgRating > 0 && (
                      <span className="text-base text-on-surface-variant font-normal">/5</span>
                    )}
                  </div>
                  <div className="text-sm text-on-surface-variant mt-1">
                    Average rating
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-bold text-on-surface">
                    {cityStats.highRated}
                  </div>
                  <div className="text-sm text-on-surface-variant mt-1">
                    Rated 4.5★ or above
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-bold text-on-surface">
                    {cityStats.totalReviews.toLocaleString()}
                  </div>
                  <div className="text-sm text-on-surface-variant mt-1">
                    Customer reviews
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

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

        {/* Pet care guides — same data we serve from the FAQPage JSON-LD,
            now also rendered as visible text. Schema-content alignment is
            a positive ranking signal, and the questions are useful to a
            visitor on this page. */}
        {relatedGuides.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
                Pet care <span className="serif-italic">guides</span>
              </h2>
              <Link
                href="/learn"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Browse all guides →
              </Link>
            </div>
            <GuideCardGrid
              guides={relatedGuides.map((a) => ({
                title: a.title,
                excerpt: a.excerpt,
                slug: a.slug,
                category: a.category,
                isPillar: a.is_pillar,
                readTime: a.read_time || undefined,
                imageUrl: a.featured_image_url ?? undefined,
              }))}
            />
          </section>
        )}

        {/* Common questions — visible accordion mirroring the FAQPage JSON-LD
            above. Same questions, embedded city name, gives the page real
            visible-content depth (vs invisible schema-only content). */}
        {cityFaqs.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-6">
              Common questions about vets in <span className="serif-italic">{locationName}</span>
            </h2>
            <div className="space-y-3">
              {cityFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden"
                >
                  <summary className="flex items-start justify-between gap-4 p-5 md:p-6 cursor-pointer list-none">
                    <h3 className="text-base md:text-lg font-semibold text-on-surface pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-on-surface-variant flex-shrink-0 mt-1 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-on-surface-variant leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

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
