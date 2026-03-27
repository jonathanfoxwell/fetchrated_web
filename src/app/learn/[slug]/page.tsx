import { notFound } from "next/navigation";
import {
  Navigation,
  Footer,
  Breadcrumbs,
  Badge,
  Card,
  GuideCardGrid,
  ArticleSchema,
  BreadcrumbSchema,
} from "@/components";
import { pillarGuides, supportingArticles } from "@/lib/data";
import { Clock, Share2, Bookmark } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

const allGuides = [...pillarGuides, ...supportingArticles];

export async function generateStaticParams() {
  return allGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = allGuides.find((g) => g.slug === slug);

  if (!guide) {
    return { title: "Guide Not Found | FetchRated" };
  }

  return {
    title: `${guide.title} | FetchRated`,
    description: guide.excerpt,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = allGuides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  // Get related guides (same category, excluding current)
  const relatedGuides = allGuides
    .filter((g) => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 3);

  const articleUrl = `https://fetchrated.com/learn/${guide.slug}`;

  return (
    <div className="min-h-screen bg-surface">
      <ArticleSchema guide={guide} url={articleUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fetchrated.com" },
          { name: "Guides", url: "https://fetchrated.com/learn" },
          { name: guide.title, url: articleUrl },
        ]}
      />
      <Navigation currentPath="/learn" />

      <main className="pt-24">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Guides", href: "/learn" },
              { label: guide.category, href: `/learn/topic/${guide.category.toLowerCase()}` },
              { label: guide.title },
            ]}
          />
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {guide.isPillar && (
              <Badge className="bg-primary/10 text-primary">Pillar Guide</Badge>
            )}
            <Badge variant="outline">{guide.category}</Badge>
            {guide.readTime && (
              <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                <Clock className="w-4 h-4" />
                {guide.readTime} min read
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold tracking-tight text-on-surface mb-6">
            {guide.title}
          </h1>

          <p className="text-xl text-on-surface-variant leading-relaxed mb-8">
            {guide.excerpt}
          </p>

          <div className="flex items-center gap-4 pb-8 border-b border-outline-variant/20">
            <span className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </span>
            <span className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
              <Bookmark className="w-4 h-4" />
              Save
            </span>
          </div>
        </header>

        {/* Article Content (placeholder) */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <p className="lead">
              This is a placeholder for the full article content. In a production
              environment, this would be populated from a CMS like Sanity, Contentful,
              or a headless WordPress installation.
            </p>

            <h2>Introduction</h2>
            <p>
              When it comes to your pet's health and wellbeing, choosing the right
              care provider is one of the most important decisions you'll make.
              Whether you're a first-time pet owner or looking to switch providers,
              this guide will help you understand what to look for and how to make
              an informed choice.
            </p>

            <h2>What to Look For</h2>
            <p>
              Quality pet care providers share certain characteristics that set them
              apart. Look for clear communication, transparent pricing, modern
              facilities, and staff who genuinely care about animal welfare.
            </p>

            <h3>Credentials and Accreditation</h3>
            <p>
              Always verify that a practice holds the appropriate professional
              registrations. For veterinary practices in the UK, this means RCVS
              registration. Don't be afraid to ask about staff qualifications
              and continuing professional development.
            </p>

            <h3>Reviews and Reputation</h3>
            <p>
              Online reviews can be helpful, but approach them critically. Look for
              patterns rather than individual reviews, and be wary of businesses
              with only perfect scores or suspicious review patterns. FetchRated's
              verified reviews give you confidence that feedback is genuine.
            </p>

            <h2>Questions to Ask</h2>
            <ul>
              <li>What are your opening hours and emergency protocols?</li>
              <li>Can you provide a breakdown of typical costs?</li>
              <li>What qualifications do your staff hold?</li>
              <li>How do you handle complex cases or referrals?</li>
              <li>What is your approach to preventive care?</li>
            </ul>

            <h2>Red Flags to Watch For</h2>
            <p>
              Be cautious of providers who pressure you into immediate decisions,
              refuse to discuss pricing, or dismiss your questions. A good provider
              will always take time to explain options and respect your involvement
              in your pet's care.
            </p>

            <h2>Conclusion</h2>
            <p>
              Finding the right care provider takes time, but it's worth the effort.
              Use the FetchRated directory to find verified practices in your area,
              and don't hesitate to visit multiple providers before making your choice.
              Your pet deserves the best care possible.
            </p>
          </div>
        </article>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related guides</h2>
              <GuideCardGrid guides={relatedGuides} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <Card className="p-8 md:p-12 text-center bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">
              Ready to find verified pet care?
            </h2>
            <p className="text-on-surface-variant mb-6 max-w-xl mx-auto">
              Search our directory of independently assessed practices and find
              quality care for your pet.
            </p>
            <a
              href="/find"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors"
            >
              Find a Practice
            </a>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
