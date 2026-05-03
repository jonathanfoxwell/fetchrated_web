import { notFound } from "next/navigation";
import {
  Navigation,
  Footer,
  SearchBar,
  Breadcrumbs,
  SectionHeader,
  Card,
} from "@/components";
import { LocationCardGrid } from "@/components/location";
import { Pagination } from "@/components/pagination";
import { serviceCategories } from "@/lib/data";
import { getDirectoryListings, getDirectoryCities } from "@/lib/data/locations";

const ITEMS_PER_PAGE = 24;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return serviceCategories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = serviceCategories.find((c) => c.slug === category);

  if (!categoryData) {
    return { title: "Category Not Found | FetchRated" };
  }

  return {
    title: `${categoryData.name} | Find Verified ${categoryData.name} | FetchRated`,
    description: `Find verified ${categoryData.name.toLowerCase()} in your area. ${categoryData.description}`,
    alternates: { canonical: `https://fetchrated.com/find/${category}` },
    // Coming-soon categories carry placeholder content only — keep them out of the
    // index until real practice data lands, but let crawlers walk links out.
    ...(categoryData.comingSoon && { robots: { index: false, follow: true } }),
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { page } = await searchParams;
  const categoryData = serviceCategories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const Icon = categoryData.icon;

  // Only vets have data currently
  const isVets = category === "vets";
  const currentPage = Math.max(1, Number(page) || 1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data: locations, totalCount } = isVets
    ? await getDirectoryListings({ limit: ITEMS_PER_PAGE, offset })
    : { data: [], totalCount: 0 };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/find" />

      <main className="pt-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              { label: categoryData.name },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
                {categoryData.name}
              </h1>
              <p className="text-on-surface-variant">
                {totalCount.toLocaleString()} verified locations
              </p>
            </div>
          </div>

          <SearchBar
            placeholder={`Search ${categoryData.name.toLowerCase()}...`}
            className="max-w-4xl"
          />
        </section>

        {/* Results */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <SectionHeader
            title={<>All <span className="serif-italic">{categoryData.name}</span></>}
            subtitle={`${totalCount.toLocaleString()} locations found`}
          />
          {locations.length > 0 ? (
            <>
              <LocationCardGrid locations={locations} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/find/${category}`}
              />
            </>
          ) : (
            <Card className="p-12 text-center">
              <h3 className="text-xl font-bold mb-2">Coming soon</h3>
              <p className="text-on-surface-variant mb-6">
                We're working on adding verified {categoryData.name.toLowerCase()} to our directory. Check back soon.
              </p>
              <a
                href="/find/vets"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white font-semibold text-sm rounded-lg"
              >
                Browse Veterinary Practices
              </a>
            </Card>
          )}
        </section>

        {/* Browse by location */}
        {isVets && (
          <LocationLinksSection category={category} categoryName={categoryData.name} />
        )}
      </main>

      <Footer />
    </div>
  );
}

async function LocationLinksSection({ category, categoryName }: { category: string; categoryName: string }) {
  const cities = await getDirectoryCities();
  const topCities = cities.slice(0, 24);

  if (topCities.length === 0) return null;

  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          title="Browse by location"
          subtitle={`Find ${categoryName.toLowerCase()} near you`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topCities.map(({ city, count }) => (
            <a
              key={city}
              href={`/find/vets/${city.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-3 bg-card border border-outline-variant/10 rounded-lg text-center hover:border-primary/20 hover:text-primary transition-colors"
            >
              <span className="block font-medium">{city}</span>
              <span className="text-xs text-on-surface-variant">{count} practices</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
