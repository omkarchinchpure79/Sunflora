import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GanpatiMalaDetail from '@/components/GanpatiMalaDetail'
import { productJsonLd, products } from '@/lib/site'

const product = products['ganpati-special-mala']

const metaTitle = product.metaTitle ?? product.title
const metaDescription = product.metaDescription ?? product.summary

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: '/products/ganpati-special-mala' },
  openGraph: {
    title: `${metaTitle} · Sunflora`,
    description: metaDescription,
    images: [{ url: product.images[0] }],
  },
}

export default function GanpatiSpecialMalaPage() {
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Header />
      <GanpatiMalaDetail />
      <Footer />
    </div>
  )
}
