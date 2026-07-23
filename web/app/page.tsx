import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductsSection from '@/components/ProductsSection'
import ScrollReveal from '@/components/ScrollReveal'
import { igAt, igDm, igProfile } from '@/lib/site'
import './page.css'

const whyCards = [
  {
    n: '01',
    title: 'Made for one person only',
    body: "Built around your photo and your moment. It literally can't exist for anyone else.",
  },
  {
    n: '02',
    title: 'Never fades',
    body: 'Real flowers die in two days. Ours are shaped to keep — a bloom that stays for years.',
  },
  {
    n: '03',
    title: 'Actually handmade',
    body: 'Shaped by hand from craft wire, one order at a time. Slow on purpose — never mass-made.',
  },
]

const howSteps = [
  { n: 1, title: 'DM us', body: `Message ${igAt} and tell us who it's for and the occasion.` },
  { n: 2, title: 'Send your photo', body: "Share the picture you'd like framed. We'll suggest colours to match." },
  {
    n: 3,
    title: 'Pay to confirm',
    body: 'Since each piece is custom-made, we take payment upfront (UPI / GPay) over DM to begin.',
  },
  { n: 4, title: 'We make & ship it', body: 'Handmade with care, packed sturdily, and couriered pan-India via Delhivery.' },
]

const careItems = [
  {
    title: 'Packed to survive the trip',
    body: 'Sturdy protective packaging so it arrives exactly as it left our hands.',
    icon: (
      <>
        <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
        <path d="M3 8l9 5 9-5" />
        <path d="M12 13v8" />
      </>
    ),
  },
  {
    title: 'Ships pan-India',
    body: 'Couriered anywhere in India through Delhivery, with tracking.',
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  },
  {
    title: 'Your photo stays yours',
    body: 'Used only for your order — never posted anywhere without asking you first.',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </>
    ),
  },
]

export default function HomePage() {
  return (
    <div className="hp-page">
      <Header />

      {/* ===== HERO ===== */}
      <section id="top" className="hp-hero">
        <div className="hp-hero-grid">
          <div className="hp-hero-copy">
            <div className="hp-hero-eyebrow">preserve your memories with flowers that bloom forever</div>
            <h1 className="hp-hero-title">Looking for the Perfect Gift?</h1>
            <p className="hp-hero-body">
              Not sure what to gift someone on their special day? We&apos;ve got you covered. Handcrafted forever
              flowers for Birthdays, Anniversaries, Weddings, Baby Showers, Housewarmings, Valentine&apos;s Day,
              Mother&apos;s Day, Diwali Décor, Ganpati Décor, Festive Decorations, Home Décor, Personalized Gifts, and
              every special occasion.
            </p>
            <div className="hp-hero-ctas">
              <a href={igDm} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Design yours — DM us
              </a>
              <a href="#products" className="btn-outline">
                See the frames ↓
              </a>
            </div>
            <div className="hp-hero-note hp-desktop-only">
              <span className="hp-hero-note-line" />
              Made one at a time — by one pair of hands.
            </div>
          </div>

          <div className="hp-hero-photo">
            <div className="hp-hero-photo-card">
              <div
                className="hp-hero-photo-img"
                style={{ backgroundImage: "url('/assets/handcrafted-with-love.jpeg')" }}
              />
            </div>
            <div className="hp-hero-photo-caption">our everlasting bouquet ✿</div>
            <div className="hp-hero-petal hp-hero-petal-1" aria-hidden>
              <img src="/assets/petal-daisy.png" alt="" width={54} height={55} />
            </div>
            <div className="hp-hero-petal hp-hero-petal-2 hp-desktop-only" aria-hidden>
              <img src="/assets/petal-lily.png" alt="" width={36} height={35} />
            </div>
          </div>
        </div>
      </section>

      <ProductsSection />

      {/* ===== WHY SUNFLORA ===== */}
      <section className="hp-why">
        <div className="floating-petal hp-desktop-only" aria-hidden style={{ top: '6%', right: '5%', animation: 'floatY 3.25s ease-in-out infinite' }}>
          <img src="/assets/petal-lily.png" alt="" width={34} height={33} style={{ opacity: 0.6 }} />
        </div>
        <div className="hp-why-heading">
          <div className="hp-section-eyebrow">Why Sunflora</div>
          <h2 className="hp-why-title">
            A gift shop sells you a frame.<br />We make you <em>your</em> memory.
          </h2>
        </div>
        <div className="hp-why-grid">
          {whyCards.map((c) => (
            <div key={c.n} className="hp-why-card" data-reveal>
              <div className="hp-why-n">{c.n}</div>
              <div className="hp-why-copy">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section id="story" className="hp-story">
        <div className="floating-petal hp-desktop-only" aria-hidden style={{ top: '4%', right: '4%', animation: 'sway 2.75s ease-in-out infinite' }}>
          <img src="/assets/petal-daisy.png" alt="" width={30} height={31} style={{ opacity: 0.65 }} />
        </div>
        <div className="hp-story-grid">
          <div className="hp-story-photo" data-reveal>
            <div className="hp-story-img" style={{ backgroundImage: "url('/assets/wa-2.jpeg')" }} />
            <div className="hp-story-badge">made with two hands ✿</div>
          </div>
          <div className="hp-story-copy" data-reveal>
            <div className="hp-section-eyebrow-script">a little note from me</div>
            <h2 className="hp-story-title">Sunflora started because a memory deserves more than a shelf.</h2>
            <p className="hp-story-body">
              I make each piece myself, at my own table — no factory, no shortcuts. Every flower is shaped by hand
              from craft wire, one pipe-cleaner petal at a time, until it feels right for the person you&apos;re
              giving it to.
            </p>
            <p className="hp-story-body hp-desktop-only">
              We&apos;re new, and I like it that way — a few founding orders, made slowly and carefully. When you DM
              us, you&apos;re talking to me, not a bot.
            </p>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="hp-story-cta">
              Tell me who it&apos;s for →
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="hp-how">
        <div className="floating-petal hp-desktop-only" aria-hidden style={{ bottom: '8%', left: '4%', animation: 'floatY 3.5s ease-in-out infinite .5s' }}>
          <img src="/assets/petal-lily.png" alt="" width={32} height={31} style={{ opacity: 0.5 }} />
        </div>
        <div className="hp-how-heading">
          <div className="hp-section-eyebrow-script hp-light">how ordering works</div>
          <p className="hp-how-sub">
            <span className="hp-desktop-only">
              Simple and personal, all over Instagram DM. No cart, no checkout — just a chat with the maker.
            </span>
            <span className="hp-mobile-only">All over Instagram DM — no cart, no checkout.</span>
          </p>
        </div>

        {/* Desktop: 4-card grid */}
        <div className="hp-how-grid hp-desktop-only">
          {howSteps.map((s) => (
            <div key={s.n} className="hp-how-card" data-reveal>
              <div className="hp-how-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="hp-how-timeline hp-mobile-only">
          {howSteps.map((s, i) => (
            <div key={s.n} className="hp-timeline-row" data-reveal>
              <div className="hp-timeline-rail">
                <div className="hp-timeline-dot">{s.n}</div>
                {i < howSteps.length - 1 && <div className="hp-timeline-line" />}
              </div>
              <div className="hp-timeline-copy">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hp-how-cta">
          <a href={igDm} target="_blank" rel="noopener noreferrer" className="btn-light">
            Start with a DM
          </a>
        </div>
      </section>

      {/* ===== CARE & TRUST ===== */}
      <section className="hp-care">
        <div className="floating-petal hp-desktop-only" aria-hidden style={{ top: '2%', right: '6%', animation: 'sway 3s ease-in-out infinite' }}>
          <img src="/assets/petal-daisy.png" alt="" width={28} height={29} style={{ opacity: 0.6 }} />
        </div>
        <div className="hp-care-grid">
          {careItems.map((c) => (
            <div key={c.title} className="hp-care-item" data-reveal>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6B2E8F" strokeWidth="1.4" aria-hidden>
                {c.icon}
              </svg>
              <div>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="hp-final-cta">
        <div className="hp-final-petal hp-final-petal-1 hp-desktop-only" aria-hidden>
          <img src="/assets/petal-lily.png" alt="" width={40} height={39} style={{ opacity: 0.55 }} />
        </div>
        <div className="hp-final-petal hp-final-petal-2 hp-desktop-only" aria-hidden>
          <img src="/assets/petal-daisy.png" alt="" width={32} height={33} style={{ opacity: 0.55 }} />
        </div>
        <div className="hp-section-eyebrow-script">have someone in mind?</div>
        <h2 className="hp-final-title">Tell us who it&apos;s for — we&apos;ll make them something that lasts.</h2>
        <div className="hp-final-ctas">
          <a href={igDm} target="_blank" rel="noopener noreferrer" className="btn-primary">
            DM us on Instagram
          </a>
          <Link href={igProfile} target="_blank" className="btn-outline">
            See more on Instagram
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollReveal />
    </div>
  )
}
