import type { MetadataRoute } from 'next'
import { SITE_URL, products } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static site: content only changes when it's rebuilt, so build time is
  // an honest lastModified for every route.
  const lastModified = new Date()

  const productRoutes = Object.values(products).map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    ...productRoutes,
  ]
}
