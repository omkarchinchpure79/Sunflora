import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from '@/components/ProductDetail'
import { productJsonLd, products } from '@/lib/site'

// The bouquet page has its own route (app/products/bouquets/page.tsx) for the
// colourway toggle, so it's excluded from this generic template.
const slugs = Object.keys(products).filter((s) => s !== 'bouquets')

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = products[slug]
  if (!product || slug === 'bouquets') return {}
  return {
    title: product.title,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} · Sunflora`,
      description: product.summary,
      images: [{ url: product.images[0] }],
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = products[slug]
  if (!product || slug === 'bouquets') notFound()

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  )
}
