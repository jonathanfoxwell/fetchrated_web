import { notFound } from "next/navigation";
import {
  Navigation,
  Footer,
  SearchBar,
  Breadcrumbs,
  SectionHeader,
  PracticeCardGrid,
} from "@/components";
import { serviceCategories, samplePractices } from "@/lib/data";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
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
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = serviceCategories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const Icon = categoryData.icon;

  // Filter practices by category
  const practices = samplePractices.filter(
    (p) => p.category === category || !p.category
  );

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
                {practices.length} verified practices
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
            subtitle={`${practices.length} practices found`}
          />
          <PracticeCardGrid practices={practices} />
        </section>

        {/* Local Areas (placeholder for SEO pages) */}
        <section className="bg-surface-container-low py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              title="Browse by location"
              subtitle={`Find ${categoryData.name.toLowerCase()} near you`}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Cambridge", "Edinburgh", "Glasgow", "Cardiff", "Liverpool", "Sheffield", "Newcastle"].map((city) => (
                <a
                  key={city}
                  href={`/find/${category}/${city.toLowerCase()}`}
                  className="px-4 py-3 bg-card border border-outline-variant/10 rounded-lg text-center hover:border-primary/20 hover:text-primary transition-colors"
                >
                  {city}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
