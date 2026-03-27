import {
  Navigation,
  Footer,
  PracticeCardGrid,
  Breadcrumbs,
  SearchBar,
  Card,
} from "@/components";
import { samplePractices } from "@/lib/data";
import { MapPin } from "lucide-react";

// Location data for UK areas
const locationData: Record<string, { name: string; region: string; description: string }> = {
  london: {
    name: "London",
    region: "Greater London",
    description: "Find verified veterinary practices across London, from Central London to the outer boroughs.",
  },
  manchester: {
    name: "Manchester",
    region: "Greater Manchester",
    description: "Discover trusted vets in Manchester and the surrounding Greater Manchester area.",
  },
  birmingham: {
    name: "Birmingham",
    region: "West Midlands",
    description: "Find quality veterinary care in Birmingham and across the West Midlands.",
  },
  bristol: {
    name: "Bristol",
    region: "South West England",
    description: "Explore verified veterinary practices in Bristol and the South West.",
  },
  edinburgh: {
    name: "Edinburgh",
    region: "Scotland",
    description: "Find trusted vets in Edinburgh and across Scotland's capital region.",
  },
  glasgow: {
    name: "Glasgow",
    region: "Scotland",
    description: "Discover quality veterinary care in Glasgow and the surrounding area.",
  },
  leeds: {
    name: "Leeds",
    region: "West Yorkshire",
    description: "Find verified vets in Leeds and across West Yorkshire.",
  },
  liverpool: {
    name: "Liverpool",
    region: "Merseyside",
    description: "Explore trusted veterinary practices in Liverpool and Merseyside.",
  },
  newcastle: {
    name: "Newcastle",
    region: "North East England",
    description: "Find quality vets in Newcastle upon Tyne and the North East.",
  },
  sheffield: {
    name: "Sheffield",
    region: "South Yorkshire",
    description: "Discover verified veterinary practices in Sheffield and South Yorkshire.",
  },
  nottingham: {
    name: "Nottingham",
    region: "East Midlands",
    description: "Find trusted vets in Nottingham and across the East Midlands.",
  },
  cardiff: {
    name: "Cardiff",
    region: "Wales",
    description: "Explore quality veterinary care in Cardiff and South Wales.",
  },
  cambridge: {
    name: "Cambridge",
    region: "East of England",
    description: "Find verified vets in Cambridge and the surrounding Cambridgeshire area.",
  },
  oxford: {
    name: "Oxford",
    region: "South East England",
    description: "Discover trusted veterinary practices in Oxford and Oxfordshire.",
  },
  brighton: {
    name: "Brighton",
    region: "South East England",
    description: "Find quality vets in Brighton and along the Sussex coast.",
  },
  bath: {
    name: "Bath",
    region: "South West England",
    description: "Explore verified veterinary practices in Bath and North Somerset.",
  },
  york: {
    name: "York",
    region: "North Yorkshire",
    description: "Find trusted vets in York and across North Yorkshire.",
  },
  southampton: {
    name: "Southampton",
    region: "Hampshire",
    description: "Discover quality veterinary care in Southampton and Hampshire.",
  },
  reading: {
    name: "Reading",
    region: "Berkshire",
    description: "Find verified vets in Reading and the Thames Valley area.",
  },
  cotswolds: {
    name: "Cotswolds",
    region: "South West England",
    description: "Explore trusted veterinary practices across the Cotswolds region.",
  },
};

export async function generateStaticParams() {
  return Object.keys(locationData).map((location) => ({
    location,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const locationInfo = locationData[location.toLowerCase()];
  const locationName = locationInfo?.name ?? location.charAt(0).toUpperCase() + location.slice(1);

  return {
    title: `Vets in ${locationName} | FetchRated Verified Practices`,
    description: locationInfo?.description ?? `Find verified veterinary practices in ${locationName}. Read independent reviews and compare quality ratings.`,
  };
}

export default async function LocalVetsPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const locationInfo = locationData[location.toLowerCase()];
  const locationName = locationInfo?.name ?? location.charAt(0).toUpperCase() + location.slice(1);

  // Filter practices by location (case-insensitive match)
  const localPractices = samplePractices.filter(
    (p) =>
      p.category === "vets" &&
      p.location.toLowerCase().includes(location.toLowerCase())
  );

  // Get nearby practices if not enough local ones
  const nearbyPractices =
    localPractices.length < 6
      ? samplePractices
          .filter((p) => p.category === "vets" && !localPractices.includes(p))
          .slice(0, 6 - localPractices.length)
      : [];

  const allPractices = [...localPractices, ...nearbyPractices];

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
                {locationInfo?.region ?? "United Kingdom"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">
              Vets in <span className="serif-italic">{locationName}</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl">
              {locationInfo?.description ??
                `Find verified veterinary practices in ${locationName}. All practices listed have been independently assessed against FetchRated standards.`}
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
              {allPractices.length} Verified Vets
            </h2>
            <span className="text-sm text-on-surface-variant">
              Sorted by Excellence Rank
            </span>
          </div>
          {allPractices.length > 0 ? (
            <PracticeCardGrid practices={allPractices} />
          ) : (
            <Card className="p-12 text-center">
              <h3 className="text-xl font-bold mb-2">No practices found</h3>
              <p className="text-on-surface-variant mb-6">
                We don't have verified practices in this area yet. Check back soon or search another location.
              </p>
              <a
                href="/find"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white font-semibold text-sm rounded-lg"
              >
                Browse All Practices
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
