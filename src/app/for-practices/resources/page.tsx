import { Navigation, Footer, SectionHeader, GuideCardGrid } from "@/components";
import { getArticlesByAudience, getPillarArticles } from "@/lib/data/articles";
import { BookOpen, TrendingUp, Shield, Users } from "lucide-react";

export const metadata = {
  title: "Resources for Veterinary Practices | FetchRated",
  description: "Guides, templates, and resources to help your veterinary practice grow, improve client experience, and build trust.",
};

const categoryInfo = {
  marketing: {
    icon: TrendingUp,
    label: "Marketing",
    description: "Grow your practice with effective marketing strategies",
  },
  compliance: {
    icon: Shield,
    label: "Compliance",
    description: "Stay compliant with regulations and best practices",
  },
  operations: {
    icon: BookOpen,
    label: "Operations",
    description: "Streamline your practice operations",
  },
  "client-experience": {
    icon: Users,
    label: "Client Experience",
    description: "Improve client satisfaction and retention",
  },
  growth: {
    icon: TrendingUp,
    label: "Growth",
    description: "Scale your practice sustainably",
  },
  technology: {
    icon: BookOpen,
    label: "Technology",
    description: "Leverage technology for better care",
  },
};

export default async function ResourcesPage() {
  const [articles, pillars] = await Promise.all([
    getArticlesByAudience("practice"),
    getPillarArticles("practice"),
  ]);

  // Group articles by category
  const articlesByCategory = articles.reduce((acc, article) => {
    const cat = article.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {} as Record<string, typeof articles>);

  const categories = Object.keys(articlesByCategory);

  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/for-practices" />

      <main className="pt-24">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-6">
              Resources for <span className="serif-italic">practices</span>
            </h1>
            <p className="text-xl text-on-surface-variant">
              Expert guides and templates to help your practice thrive
            </p>
          </div>
        </section>

        {/* Pillar Guides */}
        {pillars.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
            <SectionHeader
              title="Comprehensive guides"
              subtitle="In-depth resources covering key topics for practice success"
            />
            <GuideCardGrid
              guides={pillars.map((p) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt,
                category: p.category,
                readTime: p.read_time || undefined,
                isPillar: true,
              }))}
            />
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 ? (
          categories.map((category) => {
            const info = categoryInfo[category as keyof typeof categoryInfo];
            const categoryArticles = articlesByCategory[category];

            if (!categoryArticles?.length) return null;

            return (
              <section key={category} className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                <SectionHeader
                  title={info?.label || category}
                  subtitle={info?.description}
                />
                <GuideCardGrid
                  guides={categoryArticles.slice(0, 6).map((a) => ({
                    slug: a.slug,
                    title: a.title,
                    excerpt: a.excerpt,
                    category: a.category,
                    readTime: a.read_time || undefined,
                    isPillar: a.is_pillar,
                  }))}
                />
              </section>
            );
          })
        ) : (
          <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center bg-surface-container rounded-xl p-12">
              <BookOpen className="w-12 h-12 text-on-surface-variant/50 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-on-surface mb-2">
                Resources coming soon
              </h2>
              <p className="text-on-surface-variant max-w-md mx-auto">
                We're working on comprehensive guides and resources for veterinary practices.
                Check back soon or join our pilot to get early access.
              </p>
              <a
                href="/for-practices"
                className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-container transition-colors"
              >
                Join the Pilot
              </a>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-surface-container py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-4">
              Ready to grow your practice?
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
              Join the FetchRated pilot and get verified reviews, increased visibility,
              and access to exclusive practice resources.
            </p>
            <a
              href="/for-practices"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors"
            >
              Learn About the Pilot
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
