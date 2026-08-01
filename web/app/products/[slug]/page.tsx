import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from '@/components/ProductDetail'
import { productJsonLd, products } from '@/lib/site'

// Products whose page needs client-side variant state get their own route and
// are excluded from this generic template:
//   bouquets    → app/products/bouquets/page.tsx    (colourway toggle)
//   flower-mala → app/products/flower-mala/page.tsx (style toggle, price varies)
const CUSTOM_ROUTES = new Set(['bouquets', 'flower-mala'])
const slugs = Object.keys(products).filter((s) => !CUSTOM_ROUTES.has(s))

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = products[slug]
  if (!product || CUSTOM_ROUTES.has(slug)) return {}
  const title = product.metaTitle ?? product.title
  const description = product.metaDescription ?? product.summary
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} · Sunflora`,
      description,
      images: [{ url: product.images[0] }],
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = products[slug]
  if (!product || CUSTOM_ROUTES.has(slug)) notFound()

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
