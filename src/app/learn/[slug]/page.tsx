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
  ArticleContent,
  TableOfContents,
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
    <div className="min-h-screen bg-surface-container-low">
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
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="py-4">
            <Breadcrumbs
              items={[
                { label: "Guides", href: "/learn" },
                { label: guide.category, href: `/learn/topic/${guide.category.toLowerCase()}` },
                { label: guide.title },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="py-8">
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

            <p className="text-xl text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
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

          {/* Article Content */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article>
              <ArticleContent content={getArticleContent(guide.slug)} />
            </article>

            {/* Sidebar with Table of Contents */}
            <aside className="hidden lg:block">
              <TableOfContents
                auto
                containerSelector=".article-content"
                title="In this guide"
              />
            </aside>
          </div>
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="bg-surface-container py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related guides</h2>
              <GuideCardGrid guides={relatedGuides} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
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

/**
 * Placeholder function to get article content.
 * In production, this would fetch from Supabase:
 *
 * ```typescript
 * const { data } = await supabase
 *   .from('articles')
 *   .select('content_body')
 *   .eq('slug', slug)
 *   .single();
 * return data?.content_body || '';
 * ```
 */
function getArticleContent(slug: string): string {
  // Sample markdown content demonstrating all available styling
  return `
[lead]When it comes to your pet's health and wellbeing, choosing the right care provider is one of the most important decisions you'll make. Whether you're a first-time pet owner or looking to switch providers, this guide will help you understand what to look for.

## Introduction

The relationship between you, your pet, and their healthcare provider is built on trust. Finding a practice that aligns with your values and meets your pet's needs requires careful consideration. This comprehensive guide walks you through the key factors to evaluate.

> [!TIP]
> Always request a brief tour of the facility before committing. A practice that welcomes transparency is one that maintains institutional pride in its hygiene and organisation.

## What to Look For

Quality pet care providers share certain characteristics that set them apart. Look for **clear communication**, transparent pricing, modern facilities, and staff who genuinely care about animal welfare.

### Credentials and Accreditation

Always verify that a practice holds the appropriate professional registrations. For veterinary practices in the UK, this means **RCVS registration**. Don't be afraid to ask about staff qualifications and continuing professional development.

The Royal College of Veterinary Surgeons (RCVS) maintains a [register of accredited practices](https://www.rcvs.org.uk) that meet their Practice Standards Scheme requirements.

### Reviews and Reputation

Online reviews can be helpful, but approach them critically. Look for patterns rather than individual reviews, and be wary of businesses with only perfect scores or suspicious review patterns.

> "In veterinary medicine, consistency of care matters more than occasional excellence. A practice with steady 4-star reviews often outperforms one with volatile ratings."

FetchRated's verified reviews give you confidence that feedback is genuine and comes from actual clients.

## Questions to Ask

When evaluating a potential care provider, consider asking these key questions:

- What are your opening hours and emergency protocols?
- Can you provide a breakdown of typical costs?
- What qualifications do your staff hold?
- How do you handle complex cases or referrals?
- What is your approach to preventive care?

> [!IMPORTANT]
> Never choose a provider based solely on price. The cheapest option may end up costing more in the long run if it means compromised care or missed diagnoses.

## Red Flags to Watch For

Be cautious of providers who:

1. Pressure you into immediate decisions without explanation
2. Refuse to discuss pricing or provide estimates
3. Dismiss your questions or concerns
4. Have consistently poor reviews mentioning similar issues
5. Cannot provide proof of professional registration

---

## Making Your Decision

| Factor | Weight | What to Evaluate |
|--------|--------|------------------|
| Credentials | High | RCVS registration, staff qualifications |
| Communication | High | Responsiveness, clarity, patience |
| Facilities | Medium | Cleanliness, modern equipment |
| Location | Medium | Travel time, parking availability |
| Reviews | Medium | Patterns, verified feedback |
| Price | Lower | Value for money, not just cost |

## Conclusion

Finding the right care provider takes time, but it's worth the effort. Use the FetchRated directory to find verified practices in your area, and don't hesitate to visit multiple providers before making your choice.

Your pet deserves the best care possible. By following this guide and trusting your instincts, you'll find a practice that becomes a trusted partner in your pet's lifelong health journey.

> [!NOTE]
> This guide is regularly updated to reflect the latest standards and best practices in veterinary care. Last updated: March 2024.
`;
}
