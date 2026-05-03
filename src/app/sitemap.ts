import { MetadataRoute } from 'next';
import { getAllPublishedSlugs } from '@/lib/data/articles';
import { getAllLocationSlugs } from '@/lib/data/locations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fetchrated.com';

  // Static pages — keep this in sync with the actual routes under src/app/.
  // /methodology was a stale reference; the route is /how-we-assess.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/learn`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/find`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/for-practices`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/for-practices/resources`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/how-we-assess`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: 'monthly' },
  ];

  // Articles from database. Only consumer-audience articles have a public route
  // (`/learn/<slug>`); the `/for-practices/resources/<slug>` route doesn't exist
  // yet, so practice-audience articles are excluded to avoid advertising 404s.
  const articles = await getAllPublishedSlugs();
  const articlePages: MetadataRoute.Sitemap = articles
    .filter((article) => article.audience !== 'practice')
    .map((article) => ({
      url: `${baseUrl}/learn/${article.slug}`,
      lastModified: new Date(article.updated_at),
      priority: article.is_pillar ? 0.8 : 0.6,
      changeFrequency: 'monthly' as const,
    }));

  // Locations from database
  const locations = await getAllLocationSlugs();
  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/find/location/${location.slug}`,
    lastModified: new Date(location.last_updated_at),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  return [...staticPages, ...articlePages, ...locationPages];
}
