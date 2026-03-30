import { MetadataRoute } from 'next';
import { getAllPublishedSlugs } from '@/lib/data/articles';
import { getAllPracticeSlugs } from '@/lib/data/practices';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fetchrated.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/learn`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/find`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/for-practices`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/for-practices/resources`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/methodology`, priority: 0.7, changeFrequency: 'monthly' },
  ];

  // Articles from database
  const articles = await getAllPublishedSlugs();
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => {
    const basePath = article.audience === 'practice'
      ? '/for-practices/resources'
      : '/learn';
    return {
      url: `${baseUrl}${basePath}/${article.slug}`,
      lastModified: new Date(article.updated_at),
      priority: article.is_pillar ? 0.8 : 0.6,
      changeFrequency: 'monthly' as const,
    };
  });

  // Practices from database
  const practices = await getAllPracticeSlugs();
  const practicePages: MetadataRoute.Sitemap = practices.map((practice) => ({
    url: `${baseUrl}/find/practice/${practice.slug}`,
    lastModified: new Date(practice.last_updated_at),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  return [...staticPages, ...articlePages, ...practicePages];
}
