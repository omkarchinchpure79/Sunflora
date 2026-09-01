import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCatalogGrid from '@/components/ProductCatalogGrid'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'All Products & Handmade Collections · Sunflora',
  description:
    'Explore our full catalog of handcrafted forever flowers, Ganpati malas, lotus latkans, everlasting bouquets, and personalized photo frames. Ships pan-India.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return (
    <div className="site-shell">
      <Header />
      <main style={{ minHeight: '80vh', paddingTop: '10px' }}>
        <ProductCatalogGrid
          title="All Handmade Products"
          subtitle="Explore our full collection of forever flowers, sacred Ganpati garlands, festive latkans, and personalized keepsake frames."
        />
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  )
}
