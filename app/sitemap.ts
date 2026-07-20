import { MetadataRoute } from 'next';

/**
 * Generate sitemap.xml for MacRank
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://macrank.app';
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Future pages (if expanded)
    // {
    //   url: `${baseUrl}/compare`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ];
}