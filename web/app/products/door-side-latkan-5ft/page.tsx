import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DoorLatkan5ftDetail from '@/components/DoorLatkan5ftDetail'
import { productJsonLd, products } from '@/lib/site'

const product = products['door-side-latkan-5ft']

const metaTitle = product.metaTitle ?? product.title
const metaDescription = product.metaDescription ?? product.summary

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: '/products/door-side-latkan-5ft' },
  openGraph: {
    title: `${metaTitle} · Sunflora`,
    description: metaDescription,
    images: [{ url: product.images[0] }],
  },
}

export default function DoorLatkan5ftPage() {
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Header />
      <DoorLatkan5ftDetail />
      <Footer />
    </div>
  )
}
