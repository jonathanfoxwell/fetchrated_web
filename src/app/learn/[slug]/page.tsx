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
import { SectionRenderer } from "@/components/article/SectionRenderer";
import { getArticleBySlug, getRelatedArticles, type Article } from "@/lib/data/articles";
import { pillarGuides, supportingArticles } from "@/lib/data";
import { Clock, Share2, Bookmark } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

// Static guides for backward compatibility
const staticGuides = [...pillarGuides, ...supportingArticles];

export async function generateStaticParams() {
  // Include both static and dynamic slugs
  return staticGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;

  // Try database first
  const dbArticle = await getArticleBySlug(slug);
  if (dbArticle) {
    return {
      title: dbArticle.meta_title || `${dbArticle.title} | FetchRated`,
      description: dbArticle.meta_description || dbArticle.excerpt,
      openGraph: {
        title: dbArticle.title,
        description: dbArticle.excerpt,
        images: dbArticle.featured_image_url ? [dbArticle.featured_image_url] : undefined,
      },
    };
  }

  // Fallback to static guide
  const guide = staticGuides.find((g) => g.slug === slug);
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

  // Try database first
  const dbArticle = await getArticleBySlug(slug);

  if (dbArticle) {
    return <DatabaseArticle article={dbArticle} />;
  }

  // Fallback to static guide
  const guide = staticGuides.find((g) => g.slug === slug);
  if (!guide) {
    notFound();
  }

  return <StaticGuide guide={guide} />;
}

// Database-driven article component
async function DatabaseArticle({ article }: { article: Article }) {
  const relatedArticles = await getRelatedArticles(article.slug);
  const articleUrl = `https://fetchrated.com/learn/${article.slug}`;

  return (
    <div className="min-h-screen bg-surface-container-low">
      <ArticleSchema
        guide={{
          title: article.title,
          excerpt: article.excerpt,
          slug: article.slug,
          category: article.category,
          isPillar: article.is_pillar,
          readTime: article.read_time || undefined,
        }}
        url={articleUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fetchrated.com" },
          { name: "Guides", url: "https://fetchrated.com/learn" },
          { name: article.title, url: articleUrl },
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
                { label: article.category, href: `/learn/topic/${article.category.toLowerCase()}` },
                { label: article.title },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="py-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {article.is_pillar && (
                <Badge className="bg-primary/10 text-primary">Pillar Guide</Badge>
              )}
              <Badge variant="outline">{article.category}</Badge>
              {article.read_time && (
                <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                  <Clock className="w-4 h-4" />
                  {article.read_time} min read
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold tracking-tight text-on-surface mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
              {article.excerpt}
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
          <div className="py-12">
            <article className="article-content">
              <SectionRenderer sections={article.sections} />
            </article>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-surface-container py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related guides</h2>
              <GuideCardGrid
                guides={relatedArticles.map((a) => ({
                  title: a.title,
                  excerpt: a.excerpt,
                  slug: a.slug,
                  category: a.category,
                  isPillar: a.is_pillar,
                  readTime: a.read_time || undefined,
                }))}
              />
            </div>
          </section>
        )}

        {/* CTA */}
        {article.cta_type && (
          <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
            <Card className="p-8 md:p-12 text-center bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">
                {getCTATitle(article.cta_type)}
              </h2>
              <p className="text-on-surface-variant mb-6 max-w-xl mx-auto">
                {getCTADescription(article.cta_type)}
              </p>
              <a
                href={article.cta_href || getCTAHref(article.cta_type)}
                className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors"
              >
                {article.cta_label || getCTALabel(article.cta_type)}
              </a>
            </Card>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Static guide component (backward compatibility)
function StaticGuide({ guide }: { guide: (typeof staticGuides)[0] }) {
  const relatedGuides = staticGuides
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
          <div className="py-4">
            <Breadcrumbs
              items={[
                { label: "Guides", href: "/learn" },
                { label: guide.category, href: `/learn/topic/${guide.category.toLowerCase()}` },
                { label: guide.title },
              ]}
            />
          </div>

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

          <div className="py-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <article>
              <ArticleContent content={getStaticContent(guide.slug)} />
            </article>

            <aside className="hidden lg:block">
              <TableOfContents
                auto
                containerSelector=".article-content"
                title="In this guide"
              />
            </aside>
          </div>
        </div>

        {relatedGuides.length > 0 && (
          <section className="bg-surface-container py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related guides</h2>
              <GuideCardGrid guides={relatedGuides} />
            </div>
          </section>
        )}

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

// CTA helpers
function getCTATitle(type: string): string {
  switch (type) {
    case 'find-practice': return 'Ready to find verified pet care?';
    case 'join-pilot': return 'Join the FetchRated Pilot';
    case 'get-verified': return 'Get Your Practice Verified';
    default: return 'Take the Next Step';
  }
}

function getCTADescription(type: string): string {
  switch (type) {
    case 'find-practice': return 'Search our directory of independently assessed practices and find quality care for your pet.';
    case 'join-pilot': return 'Be among the first practices to benefit from verified reviews and increased visibility.';
    case 'get-verified': return 'Stand out from competitors with FetchRated verification and attract quality-conscious clients.';
    default: return '';
  }
}

function getCTAHref(type: string): string {
  switch (type) {
    case 'find-practice': return '/find';
    case 'join-pilot': return '/for-practices';
    case 'get-verified': return '/for-practices';
    default: return '/';
  }
}

function getCTALabel(type: string): string {
  switch (type) {
    case 'find-practice': return 'Find a Practice';
    case 'join-pilot': return 'Join the Pilot';
    case 'get-verified': return 'Get Verified';
    default: return 'Learn More';
  }
}

// Static content (for backward compatibility)
function getStaticContent(slug: string): string {
  return `
[lead]When it comes to your pet's health and wellbeing, choosing the right care provider is one of the most important decisions you'll make.

## Introduction

The relationship between you, your pet, and their healthcare provider is built on trust. Finding a practice that aligns with your values and meets your pet's needs requires careful consideration.

> [!TIP]
> Always request a brief tour of the facility before committing.

## What to Look For

Quality pet care providers share certain characteristics. Look for **clear communication**, transparent pricing, modern facilities, and staff who genuinely care.

### Credentials and Accreditation

Always verify that a practice holds appropriate professional registrations. For veterinary practices in the UK, this means **RCVS registration**.

## Conclusion

Finding the right care provider takes time, but it's worth the effort. Use the FetchRated directory to find verified practices in your area.
`;
}
