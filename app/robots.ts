import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Hides admin panel from Google
    },
    sitemap: 'https://motherteresamemorialschool.com/sitemap.xml',
  };
}
