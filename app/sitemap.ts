import { MetadataRoute } from 'next';
import { getAllProductSlugs, getAllCategorySlugs } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://honestpickhq.com'; // as defined in AGENTS.md

  const productSlugs = await getAllProductSlugs();
  const products = productSlugs.map((slug) => ({
    url: `${baseUrl}/en/review/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categorySlugs = await getAllCategorySlugs();
  const categories = categorySlugs.map((slug) => ({
    url: `${baseUrl}/en/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categories,
    ...products,
  ];
}
