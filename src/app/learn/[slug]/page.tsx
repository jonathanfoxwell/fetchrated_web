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
import { SectionRenderer } from "@/components/article/SectionRenderer";
import {
  getArticleBySlug,
  getRelatedArticles,
  getAllPublishedSlugs,
  type Article,
} from "@/lib/data/articles";
import { Clock, Share2, Bookmark } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  // Only consumer-audience articles render at /learn/<slug>; practice articles
  // live at /for-practices/resources/<slug>.
  return slugs
    .filter((s) => s.audience === "consumer")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Guide Not Found | FetchRated" };
  }

  return {
    title: article.meta_title || `${article.title} | FetchRated`,
    description: article.meta_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featured_image_url ? [article.featured_image_url] : undefined,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <DatabaseArticle article={article} />;
}

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
        datePublished={article.published_at}
        dateModified={article.updated_at}
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
          <div className="py-4">
            <Breadcrumbs
              items={[
                { label: "Guides", href: "/learn" },
                {
                  label: article.category,
                  href: `/learn/topic/${article.category.toLowerCase()}`,
                },
                { label: article.title },
              ]}
            />
          </div>

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

          <div className="py-12">
            <article className="article-content">
              <SectionRenderer sections={article.sections} />
            </article>
          </div>
        </div>

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
                  imageUrl: a.featured_image_url ?? undefined,
                }))}
              />
            </div>
          </section>
        )}

        {article.cta_type && (
          <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
            <Card className="p-8 md:p-12 text-center bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">{getCTATitle(article.cta_type)}</h2>
              <p className="text-on-surface-variant mb-6 max-w-xl mx-auto">
                {getCTADescription(article.cta_type)}
              </p>
              <a
                href={article.cta_href || getCTAHref(article.cta_type)}
                className="inline-flex items-center justify-center h-12 px-8 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container transition-colors"
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

function getCTATitle(type: string): string {
  switch (type) {
    case "find-location":
      return "Ready to find verified pet care?";
    case "join-pilot":
      return "Join the FetchRated Pilot";
    case "get-verified":
      return "Get Your Practice Verified";
    default:
      return "Take the Next Step";
  }
}

function getCTADescription(type: string): string {
  switch (type) {
    case "find-location":
      return "Search our directory of UK vet practices and find quality care for your pet.";
    case "join-pilot":
      return "Be among the first practices to benefit from verified reviews and increased visibility.";
    case "get-verified":
      return "Stand out from competitors with FetchRated verification and attract quality-conscious clients.";
    default:
      return "";
  }
}

function getCTAHref(type: string): string {
  switch (type) {
    case "find-location":
      return "/find";
    case "join-pilot":
      return "/for-practices";
    case "get-verified":
      return "/for-practices";
    default:
      return "/";
  }
}

function getCTALabel(type: string): string {
  switch (type) {
    case "find-location":
      return "Find a Practice";
    case "join-pilot":
      return "Join the Pilot";
    case "get-verified":
      return "Get Verified";
    default:
      return "Learn More";
  }
}
