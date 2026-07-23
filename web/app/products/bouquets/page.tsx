import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BouquetDetail from '@/components/BouquetDetail'
import { productJsonLd, products } from '@/lib/site'

const product = products.bouquets

export const metadata: Metadata = {
  title: product.title,
  description: product.summary,
  alternates: { canonical: '/products/bouquets' },
  openGraph: {
    title: `${product.title} · Sunflora`,
    description: product.summary,
    images: [{ url: product.images[0] }],
  },
}

export default function BouquetsPage() {
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Header />
      <BouquetDetail />
      <Footer />
    </div>
  )
}
