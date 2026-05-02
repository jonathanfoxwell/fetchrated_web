import {
  Navigation,
  Footer,
  SectionHeader,
  GuideCard,
  GuideCardGrid,
} from "@/components";
import type { Guide } from "@/components";
import { getPillarArticles, getArticlesByAudience, type ArticleSummary } from "@/lib/data/articles";

export const metadata = {
  title: "Pet Care Guides | FetchRated",
  description:
    "Expert guides on choosing a UK vet, verifying RCVS registration, reading reviews, and getting the most from your vet visits.",
};

// ArticleSummary (DB shape) → Guide (card-component shape)
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

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function LearnPage() {
  const [pillars, allConsumer] = await Promise.all([
    getPillarArticles("consumer"),
    getArticlesByAudience("consumer"),
  ]);

  // Supporting = everything published that isn't a pillar
  const supporting = allConsumer.filter((a) => !a.is_pillar).map(toGuide);
  const pillarGuides = pillars.map(toGuide);

  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/learn" />

      <main className="pt-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-6">
              Pet care <span className="serif-italic">guides</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Practical, UK-focused advice for pet owners — choosing a vet, verifying
              credentials, reading reviews, and making the most of every appointment.
            </p>
          </div>
        </section>

        {/* Pillar Guides */}
        {pillarGuides.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <SectionHeader
              title={
                <>
                  Essential <span className="serif-italic">guides</span>
                </>
              }
              subtitle="Comprehensive guides covering the most important decisions in pet care"
            />
            <div className="space-y-6">
              {pillarGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* Supporting Articles */}
        {supporting.length > 0 && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <SectionHeader
                title="More articles"
                subtitle="Quick reads on specific topics in pet health and care"
              />
              <GuideCardGrid guides={supporting} />
            </div>
          </section>
        )}

        {/* Empty state — pre-pilot, the supporting set may still be small */}
        {pillarGuides.length === 0 && supporting.length === 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
            <p className="text-on-surface-variant">
              New guides are being added. Check back soon.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
