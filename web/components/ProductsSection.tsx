'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { igDm } from '@/lib/site'

/** Stops the DM button's click from also triggering the card's own navigation. */
const stopBubble = (e: React.MouseEvent) => e.stopPropagation()

/** 1×1 transparent GIF. */
const BLANK_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * An image that appears only in the desktop card grid. The grid is hidden on
 * mobile with display:none, but Chromium still downloads images inside hidden
 * subtrees (even with loading="lazy" — a zero-size rect at the viewport origin
 * counts as intersecting). The <picture> media switch makes mobile resolve the
 * source to an inline 1-px pixel instead, so the hidden grid costs mobile
 * visitors zero bytes. Verified at runtime with a headless-browser sweep.
 */
function DesktopOnlyImg({ src }: { src: string }) {
  return (
    <picture>
      <source media="(max-width: 768px)" srcSet={BLANK_PIXEL} />
      <img className="img-cover" src={src} alt="" loading="lazy" decoding="async" />
    </picture>
  )
}

const mobileCards = [
  {
    id: 'sig',
    name: 'Signature Frame',
    price: '₹900–1,200',
    tag: 'MOST LOVED',
    tagBg: '#6B2E8F',
    img: '/assets/frame-4.jpeg',
    href: '/products/signature-frame',
    blurb: 'Your photo, framed inside hand-shaped flowers.',
  },
  {
    id: 'mini',
    name: 'Mini Frame',
    price: '₹400–500',
    tag: 'TRY ME',
    tagBg: '#8A9A5B',
    img: '/assets/frame-5.jpeg',
    href: '/products/mini-frame',
    blurb: 'A little square keepsake with a handmade bloom.',
  },
  {
    id: 'purple',
    name: 'Bouquet — Purple',
    price: 'DM for price',
    tag: 'EVERLASTING',
    tagBg: '#3F1B57',
    img: '/assets/bouquet-purple-styled.jpg',
    href: '/products/bouquets',
    blurb: 'Deep violet blooms, hand-shaped from craft wire.',
  },
  {
    id: 'burgundy',
    name: 'Bouquet — Burgundy & White',
    price: 'DM for price',
    tag: 'EVERLASTING',
    tagBg: '#3F1B57',
    img: '/assets/bouquet-burgundy-white-styled.jpg',
    href: '/products/bouquets',
    blurb: 'Velvety lilies wrapped in blush tulle.',
  },
  {
    id: 'lotus',
    name: 'Lotus Latkan — Set of 2',
    price: 'DM for price',
    tag: 'FESTIVE',
    tagBg: '#8A9A5B',
    img: '/assets/wa-3.jpeg',
    href: '/products/lotus-latkan',
    blurb: 'Hand-strung lotus latkans on pearls.',
  },
  {
    id: 'purple-lotus',
    name: 'Purple Lotus Latkan — Set of 2',
    price: '₹800 / pair',
    tag: 'FESTIVE',
    tagBg: '#6B4FA0',
    img: '/assets/purple-lotus-latkan-1.jpeg',
    href: '/products/purple-lotus-latkan',
    blurb: 'Hand-strung purple lotus latkans on pearls.',
  },
]

export default function ProductsSection() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const goTo = (href: string) => () => router.push(href)

  const handleScroll = () => {
    const el = carouselRef.current
    if (!el) return
    const cardW = el.scrollWidth / mobileCards.length
    if (!cardW) return
    const idx = Math.round(el.scrollLeft / cardW)
    const clamped = Math.max(0, Math.min(mobileCards.length - 1, idx))
    if (clamped !== active) setActive(clamped)
  }

  return (
    <section id="products" className="products-section">
      <div className="floating-petal desktop-only" aria-hidden style={{ top: '0%', left: '3%', animation: 'floatY 3s ease-in-out infinite' }}>
        <img src="/assets/petal-lily.png" alt="" loading="lazy" width={30} height={29} style={{ opacity: 0.6 }} />
      </div>
      <div className="floating-petal desktop-only" aria-hidden style={{ top: '2%', right: '4%', animation: 'sway 2.5s ease-in-out infinite' }}>
        <img src="/assets/petal-daisy.png" alt="" loading="lazy" width={26} height={27} style={{ opacity: 0.6 }} />
      </div>
      <div className="products-heading">
        {/* h2 for document outline (the page otherwise jumps h1 → card h3s);
            margin: 0 in .products-eyebrow keeps rendering identical to the old div. */}
        <h2 className="products-eyebrow">gifts made by hand</h2>
        <p className="products-sub desktop-only">
          Each one made to order. Choose a starting point and we&apos;ll design the rest with you over DM.
        </p>
        <p className="products-sub mobile-only">Swipe to see them all →</p>
      </div>

      {/* ===== Desktop: bespoke card grid ===== */}
      <div className="products-grid desktop-only">
        {/* Signature Frame */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/signature-frame')}
        >
          <div className="pcard-hero">
            <img className="img-cover" src="/assets/frame-4.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#6B2E8F' }}>MOST LOVED TO GIVE</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/frame-1.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/frame-2.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/frame-3.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Signature Frame</h3>
              <span className="pcard-price">₹900–1,200</span>
            </div>
            <div className="pcard-eyebrow">Personalized 3D Photo Frame with Handmade Flowers</div>
            <p className="pcard-desc">
              Your favourite photo, framed inside a bouquet of hand-shaped flowers — a one-of-one keepsake made just
              for the two of you. Order now, send your photos after, and we&apos;ll take it from there. 💛
            </p>
            <div className="pcard-tags">
              {['Birthdays', 'Anniversaries', 'Weddings', 'Housewarming'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/signature-frame" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Mini Frame */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/mini-frame')}
        >
          <div className="pcard-hero">
            <img className="img-cover" src="/assets/frame-5.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#8A9A5B' }}>TRY ME</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/frame-6.jpeg" /></div>
            <div className="pcard-more">more styles on request</div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Mini Frame</h3>
              <span className="pcard-price">₹400–500</span>
            </div>
            <p className="pcard-desc">
              A little square keepsake frame with a handmade bloom and a short message — small, affordable, and just
              as handmade.
            </p>
            <Link href="/products/mini-frame" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Bouquet — Purple */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/bouquets')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/bouquet-purple-styled.jpg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#3F1B57' }}>EVERLASTING</span>
          </div>
          {/* bouquet-purple-2.jpeg is a byte-identical copy of this card's hero
              image, so the strip shows only the one genuinely different photo. */}
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr' }}>
            {/* aspectRatio 2/1 keeps the strip the same height as the two square
                cells this replaced, so the card's overall layout is unchanged. */}
            <div style={{ backgroundColor: '#E3C9F5', aspectRatio: '2 / 1' }}>
              <DesktopOnlyImg src="/assets/bouquet-purple.webp" />
            </div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Bouquet — Purple</h3>
              <span className="pcard-price pcard-price-sm">DM for price</span>
            </div>
            <p className="pcard-desc">
              Deep violet blooms, hand-shaped from craft wire, wrapped with a lilac ribbon. Real flowers wilt in two
              days — this one doesn&apos;t.
            </p>
            <Link href="/products/bouquets" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Bouquet — Burgundy & White */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/bouquets')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/bouquet-burgundy-white-styled.jpg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#3F1B57' }}>EVERLASTING</span>
          </div>
          {/* bouquet-red-white.jpeg is a byte-identical copy of this card's hero
              image, so the strip shows only the one genuinely different photo. */}
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr' }}>
            {/* aspectRatio 2/1 keeps the strip the same height as the two square
                cells this replaced, so the card's overall layout is unchanged. */}
            <div style={{ backgroundColor: '#E3C9F5', aspectRatio: '2 / 1' }}>
              <DesktopOnlyImg src="/assets/bouquet-burgundy-white.webp" />
            </div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Bouquet — Burgundy &amp; White</h3>
              <span className="pcard-price pcard-price-sm">DM for price</span>
            </div>
            <p className="pcard-desc">
              Velvety lilies in burgundy and white, wrapped in blush tulle with a pearl trim. Gift-ready, made to
              order.
            </p>
            <Link href="/products/bouquets" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Lotus Latkan */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/lotus-latkan')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/wa-3.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#8A9A5B' }}>FESTIVE HANGING</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/wa-2.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/wa-4.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Lotus Latkan — Set of 2</h3>
              <span className="pcard-price pcard-price-sm">DM for price</span>
            </div>
            <div className="pcard-eyebrow">5 ft each · hand-strung with pearls 🪷</div>
            <p className="pcard-desc">
              A little touch of festive elegance for your door or mandir — every lotus shaped by hand, strung on
              pearls, gift-boxed and ready to hang.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Temple & entrance décor'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/lotus-latkan" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>

        {/* Purple Lotus Latkan */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/purple-lotus-latkan')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/purple-lotus-latkan-1.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#6B4FA0' }}>FESTIVE HANGING</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/purple-lotus-latkan-thumb-violet.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/purple-lotus-latkan-thumb-magenta.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Purple Lotus Latkan</h3>
              <span className="pcard-price pcard-price-sm">₹800 / pair</span>
            </div>
            <div className="pcard-eyebrow">3 ft each · hand-strung with pearls 🪷</div>
            <p className="pcard-desc">
              A little touch of festive elegance for your door or mandir — every purple lotus shaped by hand, strung
              on pearls, ready to hang.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Temple & entrance décor'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/purple-lotus-latkan" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>
      </div>

      {/* ===== Mobile: swipeable carousel ===== */}
      <div className="mobile-only">
        <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
          {mobileCards.map((p) => (
            <div key={p.id} className="ccard" onClick={goTo(p.href)}>
              <div className="ccard-img">
                <img className="img-cover" src={p.img} alt="" loading="lazy" decoding="async" />
                <span className="ccard-tag" style={{ background: p.tagBg }}>{p.tag}</span>
              </div>
              <div className="ccard-body">
                <div className="ccard-row">
                  <h3>{p.name}</h3>
                  <span>{p.price}</span>
                </div>
                <p>{p.blurb}</p>
                <Link href={p.href} className="ccard-cta" onClick={stopBubble}>See details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="dots">
          {mobileCards.map((p, i) => (
            <span key={p.id} className="dot" data-active={i === active} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .products-section {
          position: relative;
          padding: clamp(30px, 6vw, 64px) clamp(18px, 5vw, 40px);
        }
        .products-heading {
          text-align: center;
          margin-bottom: clamp(24px, 4vw, 40px);
        }
        .products-eyebrow {
          font-family: var(--font-caveat), cursive;
          font-size: clamp(24px, 6vw, 34px);
          color: #6B2E8F;
          font-weight: 400;
          margin: 0;
        }
        .products-sub {
          font-size: 15px;
          color: #7c608e;
          margin: 6px auto 0;
          max-width: 460px;
        }
        .desktop-only {
          display: block;
        }
        .mobile-only {
          display: none;
        }

        .products-grid {
          display: grid;
          /* Fixed 3-column track (not auto-fit) so cards wrap in rows of 3
             instead of an even auto-fit spread. */
          grid-template-columns: repeat(3, minmax(220px, 1fr));
          gap: clamp(16px, 3vw, 26px);
        }
        @media (max-width: 1000px) and (min-width: 769px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .pcard {
          background: #FDFBFF;
          border-radius: 22px;
          padding: 16px;
          box-shadow: 0 18px 34px -22px rgba(58, 38, 71, 0.4);
          transform: rotate(var(--rot, 0deg)) translateY(0) scale(1);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
          will-change: transform;
          cursor: pointer;
        }
        .pcard:hover {
          transform: rotate(0deg) translateY(-16px) scale(1.035);
          box-shadow: 0 32px 54px -16px rgba(58, 38, 71, 0.5);
          z-index: 2;
        }
        .pcard-hero {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 10px;
          overflow: hidden;
        }
        .pcard-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          color: #fff;
          font-family: var(--font-work-sans), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 5px 11px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .pcard-strip {
          display: grid;
          gap: 6px;
          margin-top: 6px;
        }
        .pcard-strip > div {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
        }
        .pcard-more {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6px;
          background: #E3C9F5;
          font-family: var(--font-caveat), cursive;
          font-size: 16px;
          /* darker than the usual muted: this sits on the lavender tint (4.7:1) */
          color: #675076;
        }
        .pcard-body {
          padding: 16px 8px 6px;
        }
        .pcard-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }
        .pcard-row h3 {
          font-family: var(--font-cormorant), serif;
          font-weight: 700;
          font-size: 24px;
          margin: 0;
        }
        .pcard-price {
          font-family: var(--font-cormorant), serif;
          font-weight: 700;
          font-size: 18px;
          color: #6B2E8F;
          white-space: nowrap;
        }
        .pcard-price-sm {
          font-size: 15px;
        }
        .pcard-eyebrow {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: 13px;
          color: #4F2169;
          margin: 6px 0 0;
        }
        .pcard-desc {
          font-size: 14px;
          line-height: 1.55;
          color: #7c608e;
          margin: 8px 0 12px;
        }
        .pcard-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .pcard-tags span {
          font-size: 11px;
          color: #4F2169;
          background: #E3C9F5;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .pcard-tags-latkan span {
          color: #5c6a3f;
          background: #e7ecd8;
        }
        /* :global() because these classes sit on <Link> components — styled-jsx
           only auto-scopes plain DOM elements, so a scoped rule never matches
           the <a> that Link renders (same reason Header/Footer use :global). */
        .pcard :global(.pcard-details) {
          display: block;
          text-align: center;
          font-size: 13px;
          color: #6B2E8F;
          font-weight: 600;
          margin: 0 0 14px;
        }
        .pcard-dm {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #6B2E8F;
          color: #fff;
          padding: 13px;
          border-radius: 26px;
          font-weight: 600;
          font-size: 15px;
          min-height: 44px;
        }
        .pcard-dm:hover {
          color: #fff;
          background: #4F2169;
        }

        .carousel {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 0 10px;
        }
        .ccard {
          flex: 0 0 78%;
          scroll-snap-align: center;
          background: #FDFBFF;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 14px 28px -20px rgba(58, 38, 71, 0.4);
          cursor: pointer;
        }
        .ccard-img {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 10px;
          overflow: hidden;
        }
        .ccard-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .ccard-body {
          padding: 12px 4px 2px;
        }
        .ccard-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }
        .ccard-row h3 {
          font-family: var(--font-cormorant), serif;
          font-weight: 700;
          font-size: 19px;
          margin: 0;
        }
        .ccard-row span {
          font-family: var(--font-cormorant), serif;
          font-weight: 700;
          font-size: 14px;
          color: #6B2E8F;
          white-space: nowrap;
        }
        .ccard-body p {
          font-size: 13px;
          line-height: 1.5;
          color: #7c608e;
          margin: 6px 0 12px;
        }
        .ccard :global(.ccard-cta) {
          display: block;
          text-align: center;
          background: #6B2E8F;
          color: #fff;
          padding: 12px;
          border-radius: 24px;
          font-weight: 600;
          font-size: 14px;
          min-height: 44px;
        }
        .ccard :global(.ccard-cta:hover) {
          color: #fff;
        }
        .dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 2px;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e3cff3;
        }
        .dot[data-active='true'] {
          background: #6B2E8F;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          .mobile-only {
            display: block;
          }
          .products-section {
            padding: 8px 0 4px;
          }
          .products-heading {
            margin-bottom: 14px;
            padding: 0 18px;
          }
          .carousel {
            padding: 0 18px 10px;
          }
        }
      `}</style>
    </section>
  )
}
