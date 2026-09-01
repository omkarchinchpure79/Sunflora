import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MultipurposeLatkanDetail from '@/components/MultipurposeLatkanDetail'
import { productJsonLd, products } from '@/lib/site'

const product = products['multipurpose-2ft-latkan']

const metaTitle = product.metaTitle ?? product.title
const metaDescription = product.metaDescription ?? product.summary

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: '/products/multipurpose-2ft-latkan' },
  openGraph: {
    title: `${metaTitle} · Sunflora`,
    description: metaDescription,
    images: [{ url: product.images[0] }],
  },
}

export default function MultipurposeLatkanPage() {
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Header />
      <MultipurposeLatkanDetail />
      <Footer />
    </div>
  )
}
