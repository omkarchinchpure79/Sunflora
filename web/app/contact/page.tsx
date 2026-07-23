import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { igAt, igDm } from '@/lib/site'
import './contact.css'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'DM Sunflora on Instagram to start your order — no forms, no cart, just a chat with the maker.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="site-shell">
      <Header />

      <section className="contact-hero">
        <div className="contact-petal contact-petal-1" aria-hidden>
          <img src="/assets/petal-daisy.png" alt="" loading="lazy" width={40} height={41} style={{ opacity: 0.55 }} />
        </div>
        <div className="contact-petal contact-petal-2" aria-hidden>
          <img src="/assets/petal-lily.png" alt="" loading="lazy" width={32} height={31} style={{ opacity: 0.55 }} />
        </div>

        <div className="contact-eyebrow" data-reveal>say hello</div>
        <h1 className="contact-title" data-reveal>Let&apos;s talk about your order.</h1>
        <p className="contact-body" data-reveal>
          No forms, no cart — just DM us on Instagram and tell us who it&apos;s for. We&apos;ll take it from there.
        </p>
        <a href={igDm} target="_blank" rel="noopener noreferrer" className="contact-cta" data-reveal>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" />
          </svg>
          DM us on Instagram
        </a>
        <div className="contact-handle" data-reveal>{igAt}</div>
      </section>

      <Footer />
      <ScrollReveal />
    </div>
  )
}
