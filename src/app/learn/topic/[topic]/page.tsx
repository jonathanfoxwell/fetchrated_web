import { notFound } from "next/navigation";
import {
  Navigation,
  Footer,
  Breadcrumbs,
  SectionHeader,
  GuideCardGrid,
} from "@/components";
import type { Guide } from "@/components";
import {
  getArticlesByAudience,
  type ArticleSummary,
} from "@/lib/data/articles";

interface TopicPageProps {
  params: Promise<{ topic: string }>;
}

// The fixed consumer category set defined in the article schema.
const CONSUMER_CATEGORIES = [
  "veterinary",
  "grooming",
  "training",
  "health",
  "reviews",
  "finance",
] as const;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toGuide(a: ArticleSummary): Guide {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: capitalize(a.category),
    readTime: a.read_time ?? undefined,
    imageUrl: a.featured_image_url ?? undefined,
    isPillar: a.is_pillar,
  };
}

export async function generateStaticParams() {
  // Pre-build a topic page only for categories that have at least one
  // published consumer article. Empty categories return notFound() at runtime.
  const all = await getArticlesByAudience("consumer");
  const populated = new Set<string>(all.map((a) => a.category));
  return Array.from(populated).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { topic } = await params;
  const label = capitalize(topic);
  return {
    title: `${label} guides | FetchRated`,
    description: `Practical UK pet care guides on ${label.toLowerCase()} — independently written and grounded in current UK guidance.`,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const lower = topic.toLowerCase();

  if (!CONSUMER_CATEGORIES.includes(lower as (typeof CONSUMER_CATEGORIES)[number])) {
    notFound();
  }

  const articles = await getArticlesByAudience("consumer", lower);
  if (articles.length === 0) {
    notFound();
  }

  // Pillar articles in this category lead the page.
  const pillars = articles.filter((a) => a.is_pillar).map(toGuide);
  const supporting = articles.filter((a) => !a.is_pillar).map(toGuide);
  const label = capitalize(lower);

  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/learn" />

      <main className="pt-24">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Guides", href: "/learn" },
              { label },
            ]}
          />
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-6">
              <span className="serif-italic">{label}</span> guides
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              {articles.length} {articles.length === 1 ? "guide" : "guides"} on {label.toLowerCase()}{" "}
              for UK pet owners — practical, current, and cross-linked so you can dig deeper where it matters.
            </p>
          </div>
        </section>

        {pillars.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <SectionHeader
              title={
                <>
                  Pillar <span className="serif-italic">guides</span>
                </>
              }
              subtitle="Comprehensive guides covering the major decisions in this area."
            />
            <GuideCardGrid guides={pillars} />
          </section>
        )}

        {supporting.length > 0 && (
          <section className="bg-surface-container-low py-16 mt-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <SectionHeader
                title={pillars.length > 0 ? "More on this topic" : "Articles"}
                subtitle="Focused reads on specific aspects."
              />
              <GuideCardGrid guides={supporting} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
