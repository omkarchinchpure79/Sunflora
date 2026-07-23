import type { MetadataRoute } from 'next'
import { SITE_URL, products } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = Object.values(products).map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    ...productRoutes,
  ]
}
