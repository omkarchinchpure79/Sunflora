import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MalaDetail from '@/components/MalaDetail'
import { productJsonLd, products } from '@/lib/site'

const product = products['flower-mala']

const metaTitle = product.metaTitle ?? product.title
const metaDescription = product.metaDescription ?? product.summary

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: '/products/flower-mala' },
  openGraph: {
    title: `${metaTitle} · Sunflora`,
    description: metaDescription,
    images: [{ url: product.images[0] }],
  },
}

export default function FlowerMalaPage() {
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Header />
      <MalaDetail />
      <Footer />
    </div>
  )
}
