import { MetadataRoute } from 'next';
import { getAllPublishedSlugs } from '@/lib/data/articles';
import { getAllLocationSlugs, getDirectoryCities } from '@/lib/data/locations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fetchrated.com';

  // Static pages — keep this in sync with the actual routes under src/app/.
  // /find/vets is the only category index that's indexable; coming-soon
  // categories (groomers, trainers, boarding) carry noindex and stay out.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/learn`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/find`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/find/vets`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/for-practices`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/for-practices/resources`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/how-we-assess`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: 'monthly' },
  ];

  // Articles from database. Only consumer-audience articles have a public route
  // (`/learn/<slug>`); the `/for-practices/resources/<slug>` route doesn't exist
  // yet, so practice-audience articles are excluded to avoid advertising 404s.
  const articles = await getAllPublishedSlugs();
  const consumerArticles = articles.filter((a) => a.audience !== 'practice');

  const articlePages: MetadataRoute.Sitemap = consumerArticles.map((article) => ({
    url: `${baseUrl}/learn/${article.slug}`,
    lastModified: new Date(article.updated_at),
    priority: article.is_pillar ? 0.8 : 0.6,
    changeFrequency: 'monthly' as const,
  }));

  // Topic index pages — match what generateStaticParams emits at
  // /learn/topic/[topic] (only categories with at least one published article).
  const topics = Array.from(new Set(consumerArticles.map((a) => a.category)));
  const topicPages: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${baseUrl}/learn/topic/${topic}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }));

  // Practice detail pages
  const locations = await getAllLocationSlugs();
  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/find/location/${location.slug}`,
    lastModified: new Date(location.last_updated_at),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  // City directory pages — high-intent SEO targets ("vets in {city}"). Slug
  // generation must match /find/vets/[location]/page.tsx generateStaticParams.
  const cities = await getDirectoryCities();
  const cityPages: MetadataRoute.Sitemap = cities.map(({ city }) => ({
    url: `${baseUrl}/find/vets/${city.toLowerCase().replace(/\s+/g, '-')}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  return [...staticPages, ...articlePages, ...topicPages, ...locationPages, ...cityPages];
}
