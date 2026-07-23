import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './not-found.css'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="site-shell">
      <Header />

      <section className="nf-hero">
        <div className="nf-eyebrow">oops</div>
        <h1 className="nf-title">This page seems to have wilted 🥀</h1>
        <p className="nf-body">But the flowers are still here — every one of them, handmade and waiting.</p>
        <Link href="/#products" className="nf-cta">
          See the flowers
        </Link>
      </section>

      <Footer />
    </div>
  )
}
