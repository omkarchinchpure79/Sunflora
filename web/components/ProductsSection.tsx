'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useInstagramLink } from './IgLink'

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
    price: '₹999',
    tag: 'MOST LOVED',
    tagBg: '#6B2E8F',
    img: '/assets/frame-4.jpeg',
    href: '/products/signature-frame',
    blurb: 'Your photo, framed inside hand-shaped flowers.',
  },
  {
    id: 'mini',
    name: 'Mini Frame',
    price: '₹399',
    tag: 'TRY ME',
    tagBg: '#8A9A5B',
    img: '/assets/frame-5.jpeg',
    href: '/products/mini-frame',
    blurb: 'A little square keepsake with a handmade bloom.',
  },
  {
    id: 'pink-tulips-lilies',
    name: 'Bouquet — Pink Tulips & Lilies',
    price: '₹999',
    tag: 'BESTSELLER',
    tagBg: '#C25975',
    img: '/assets/bouquet-pink-tulips-lilies.jpeg',
    href: '/products/bouquet-pink-tulips-lilies',
    blurb: 'Hand-shaped pink tulips & lilies in champagne wrapping.',
  },
  {
    id: 'purple',
    name: 'Bouquet — Lavender & Purple Lilies',
    price: '₹999',
    tag: '17% OFF',
    tagBg: '#3F1B57',
    img: '/assets/bouquet-purple.jpeg',
    href: '/products/bouquet-purple',
    blurb: 'Royal purple lilies and lavender stalks in lilac paper.',
  },
  {
    id: 'blush',
    name: 'Bouquet — Blush Lily & Daisy',
    price: '₹999',
    tag: '17% OFF',
    tagBg: '#B34A6E',
    img: '/assets/bouquet-blush-lily-daisy.jpeg',
    href: '/products/bouquet-blush-lily-daisy',
    blurb: 'Vibrant center lily with white daisies and fern greenery.',
  },
  {
    id: 'lotus',
    name: 'Lotus Latkan — Set of 2',
    price: '₹849',
    tag: 'FESTIVE',
    tagBg: '#8A9A5B',
    img: '/assets/wa-3.jpeg',
    href: '/products/lotus-latkan',
    blurb: 'Hand-strung lotus latkans on pearls (5 ft).',
  },
  {
    id: 'purple-lotus',
    name: 'Purple Lotus Latkan — Set of 2',
    price: '₹699',
    tag: 'FESTIVE',
    tagBg: '#6B4FA0',
    img: '/assets/purple-lotus-latkan-1.jpeg',
    href: '/products/purple-lotus-latkan',
    blurb: 'Hand-strung purple lotus latkans on pearls (3 ft).',
  },
  {
    id: 'door-latkan-5ft',
    name: 'Door Side Latkans Decor (5 Ft)',
    price: '₹799',
    tag: '4 COLOURS',
    tagBg: '#6B4FA0',
    img: '/assets/door-latkan-5ft-lavender.jpeg',
    href: '/products/door-side-latkan-5ft',
    blurb: 'Full 5 ft doorway latkans with pearl cascades in 4 colors.',
  },
  {
    id: 'door-latkan-4ft',
    name: 'Door Side Latkans (4 Ft)',
    price: '₹649',
    tag: 'FESTIVE',
    tagBg: '#8A9A5B',
    img: '/assets/door-side-latkan-4ft-maroon.jpeg',
    href: '/products/door-side-latkan-4ft',
    blurb: 'Deep maroon velvet blooms on pearl strands.',
  },
  {
    id: 'multipurpose-2ft',
    name: 'Multipurpose 2 Ft Latkan',
    price: '₹499',
    tag: '2 COLOURS',
    tagBg: '#8A9A5B',
    img: '/assets/multipurpose-latkan-2ft-pink.jpeg',
    href: '/products/multipurpose-2ft-latkan',
    blurb: 'Versatile 2 ft latkan in Pink and Golden Yellow.',
  },
  {
    id: 'lotus-decorative-latkan',
    name: 'Lotus Decorative Latkan — Set of 2',
    price: '₹449',
    tag: 'FESTIVE',
    tagBg: '#8A9A5B',
    img: '/assets/lotus-decorative-latkan-1.jpeg',
    href: '/products/lotus-decorative-latkan',
    blurb: 'Velvet roses on triple strands of pearls.',
  },
  {
    id: 'lotus-asaan',
    name: 'Lotus Asaan — Small',
    price: '₹349',
    tag: 'FOR YOUR BAPPA',
    tagBg: '#8A9A5B',
    img: '/assets/lotus-asaan-small-1.jpeg',
    href: '/products/lotus-asaan',
    blurb: 'A hand-shaped lotus seat for your idol.',
  },
  {
    id: 'lotus-asaan-medium',
    name: 'Lotus Asaan — Medium',
    price: '₹449',
    tag: 'FOR YOUR BAPPA',
    tagBg: '#6B4FA0',
    img: '/assets/lotus-asaan-medium-1.jpeg',
    href: '/products/lotus-asaan-medium',
    blurb: 'Grand multi-layered lotus throne for Ganpati.',
  },
  {
    id: 'pink-lotus-asaan-medium',
    name: 'Pink Lotus Asaan — Medium',
    price: '₹549',
    tag: 'FOR YOUR BAPPA',
    tagBg: '#A569BD',
    img: '/assets/pink-lotus-asaan-medium-1.jpeg',
    href: '/products/pink-lotus-asaan-medium',
    blurb: 'Vibrant pink lotus seat with detailed stamens.',
  },
  {
    id: 'ganpati-special-mala',
    name: 'Ganpati Special Mala',
    price: '₹249',
    tag: '4 STYLES',
    tagBg: '#6B4FA0',
    img: '/assets/ganpati-mala-mogra-pink.jpeg',
    href: '/products/ganpati-special-mala',
    blurb: 'Velvet flower malas in 4 sacred styles for idols & murtis.',
  },
  {
    id: 'flower-mala',
    name: 'Artificial Flower Mala',
    price: '₹149',
    tag: 'TWO STYLES',
    tagBg: '#6B4FA0',
    img: '/assets/flower-mala-braided-1.jpeg',
    href: '/products/flower-mala',
    blurb: 'Velvet flower malas strung on pearls.',
  },
]

export default function ProductsSection() {
  // Spread onto each card CTA. `stopBubble` is composed in, not layered on
  // top, so the DM link keeps both the app hand-off and the card suppression.
  const ig = useInstagramLink('dm', stopBubble)
  const router = useRouter()
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
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
              <span className="pcard-price">₹999</span>
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
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
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
              <span className="pcard-price">₹399</span>
            </div>
            <p className="pcard-desc">
              A little square keepsake frame with a handmade bloom and a short message — small, affordable, and just
              as handmade.
            </p>
            <Link href="/products/mini-frame" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Bouquet — Pink Tulips & Lilies */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/bouquet-pink-tulips-lilies')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/bouquet-pink-tulips-lilies.jpeg" alt="Handcrafted Bouquet — Pink Tulips & Lilies" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#C25975' }}>BESTSELLER</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ backgroundColor: '#FBE8EF', aspectRatio: '2 / 1' }}>
              <DesktopOnlyImg src="/assets/bouquet-pink-tulips-lilies.webp" />
            </div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Bouquet — Pink Tulips &amp; Lilies</h3>
              <span className="pcard-price pcard-price-sm">₹999</span>
            </div>
            <p className="pcard-desc">
              Velvet pink tulips, blooming lilies, and floret accents wrapped in pleated champagne paper with a satin bow.
            </p>
            <Link href="/products/bouquet-pink-tulips-lilies" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Bouquet — Lavender & Purple Lilies */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/bouquet-purple')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/bouquet-purple.jpeg" alt="Handcrafted Bouquet — Lavender & Purple Lilies" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#3F1B57' }}>17% OFF</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ backgroundColor: '#E3C9F5', aspectRatio: '2 / 1' }}>
              <DesktopOnlyImg src="/assets/bouquet-purple.webp" />
            </div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Bouquet — Lavender &amp; Purple Lilies</h3>
              <span className="pcard-price pcard-price-sm">₹999</span>
            </div>
            <p className="pcard-desc">
              Deep purple lilies and lavender stems crafted from velvet wire, wrapped in lilac paper with satin ribbon.
            </p>
            <Link href="/products/bouquet-purple" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Bouquet — Blush Lily & Daisy */}
        <div
          className="pcard"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/bouquet-blush-lily-daisy')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/bouquet-blush-lily-daisy.jpeg" alt="Handcrafted Bouquet — Blush Lily & Daisy" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#B34A6E' }}>17% OFF</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ backgroundColor: '#FBE8EF', aspectRatio: '2 / 1' }}>
              <DesktopOnlyImg src="/assets/bouquet-blush-lily-daisy.webp" />
            </div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Bouquet — Blush Lily &amp; Daisy</h3>
              <span className="pcard-price pcard-price-sm">₹999</span>
            </div>
            <p className="pcard-desc">
              Center pink lily, white daisy florets, and fern foliage wrapped in layered pastel blush with a net lace bow.
            </p>
            <Link href="/products/bouquet-blush-lily-daisy" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
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
              <span className="pcard-price pcard-price-sm">₹849</span>
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
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
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
              <span className="pcard-price pcard-price-sm">₹699</span>
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
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>

        {/* ── Behind "Show more" (desktop only; the mobile carousel lists everything). ── */}
        {showAll && (
          <>
        {/* Door Side Latkans Decor 5 Ft */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/door-side-latkan-5ft')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/door-latkan-5ft-lavender.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#6B4FA0' }}>4 COLOURWAYS</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/door-latkan-5ft-violet-pink.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/door-latkan-5ft-red.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/door-latkan-5ft-orange-1.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Door Side Latkans Decor</h3>
              <span className="pcard-price pcard-price-sm">₹799</span>
            </div>
            <div className="pcard-eyebrow">5 ft each · 4 colourways 🪷</div>
            <p className="pcard-desc">
              Full 5-foot festive door latkans with layered blooms, pearl beads, and cascading bud drops — in Lavender,
              Violet &amp; Pink, Red, or Orange.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Doorway décor'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/door-side-latkan-5ft" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>

        {/* Door Side Latkans 4 Ft */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/door-side-latkan-4ft')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/door-side-latkan-4ft-maroon.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#8A9A5B' }}>FESTIVE HANGING</span>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Door Side Latkans — 4 Ft</h3>
              <span className="pcard-price pcard-price-sm">₹649</span>
            </div>
            <div className="pcard-eyebrow">4 ft doorway length · deep maroon velvet 🪷</div>
            <p className="pcard-desc">
              Deep maroon velvet flower clusters strung along pearl strands with bud accents — designed to frame doorways
              and pooja entrances with royal elegance.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Doorway décor'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/door-side-latkan-4ft" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>

        {/* Multipurpose Latkan 2 Ft */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/multipurpose-2ft-latkan')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/multipurpose-latkan-2ft-pink.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#8A9A5B' }}>TWO COLOURS</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/multipurpose-latkan-2ft-yellow-1.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/multipurpose-latkan-2ft-yellow-2.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Multipurpose 2 Ft Latkan</h3>
              <span className="pcard-price pcard-price-sm">₹499</span>
            </div>
            <div className="pcard-eyebrow">2 ft · Pink &amp; Golden Yellow 🪷</div>
            <p className="pcard-desc">
              A versatile 2-foot handmade latkan with a statement bloom, pearl chain, and dangling bud drops — perfect
              for doors, mandirs, or curtain accents.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Wall & door hanging'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/multipurpose-2ft-latkan" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>

        {/* Lotus Asaan (Small) */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/lotus-asaan')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/lotus-asaan-small-1.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#8A9A5B' }}>FOR YOUR BAPPA</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/lotus-asaan-1.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/lotus-asaan-2.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/lotus-asaan-3.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Lotus Asaan (Small)</h3>
              <span className="pcard-price pcard-price-sm">₹349</span>
            </div>
            <div className="pcard-eyebrow">compact idol seat · pearl-tipped 🪷</div>
            <p className="pcard-desc">
              A lotus seat for your Bappa — soft pink and white petals tipped with pearls, resting on a ring of green leaves.
              Handmade, and it comes back out every year.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Mandir & pooja thali'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/lotus-asaan" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Lotus Asaan (Medium) */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/lotus-asaan-medium')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/lotus-asaan-medium-1.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#6B4FA0' }}>FOR YOUR BAPPA</span>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Lotus Asaan (Medium)</h3>
              <span className="pcard-price pcard-price-sm">₹449</span>
            </div>
            <div className="pcard-eyebrow">grand multi-layer lotus · idol not included 🪷</div>
            <p className="pcard-desc">
              A grand multi-layered lotus seat for your Bappa — layered pink and white craft-wire petals with a yellow
              textured core and deep green base leaves.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Mandir & pooja thali'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/lotus-asaan-medium" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Pink Lotus Asaan (Medium) */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/pink-lotus-asaan-medium')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/pink-lotus-asaan-medium-1.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#A569BD' }}>FOR YOUR BAPPA</span>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Pink Lotus Asaan (Medium)</h3>
              <span className="pcard-price pcard-price-sm">₹549</span>
            </div>
            <div className="pcard-eyebrow">vibrant magenta-pink · detailed stamens 🪷</div>
            <p className="pcard-desc">
              Vibrant magenta-pink lotus asaan with intricate stamens and a rich golden center — a radiant base for your
              Ganpati or pooja altar.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Mandir & pooja thali'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/pink-lotus-asaan-medium" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Ganpati Special Mala */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/ganpati-special-mala')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/ganpati-mala-mogra-pink.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#6B4FA0' }}>4 STYLES</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div><DesktopOnlyImg src="/assets/ganpati-mala-braided-rose.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/ganpati-mala-tricolor.jpeg" /></div>
            <div><DesktopOnlyImg src="/assets/ganpati-mala-murti-pink.jpeg" /></div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Ganpati Special Mala</h3>
              <span className="pcard-price pcard-price-sm">₹249</span>
            </div>
            <div className="pcard-eyebrow">4 sacred styles · Mogra, Rose, Tricolor, Murti</div>
            <p className="pcard-desc">
              Handcrafted velvet flower malas strung on pearls — specially designed for Ganpati Bappa idols, home temples,
              pooja thalis, and car dashboards.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Pooja garland', 'Murti mala'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/ganpati-special-mala" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>

        {/* Lotus Decorative Latkan */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '1deg' } as React.CSSProperties}
          onClick={goTo('/products/lotus-decorative-latkan')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/lotus-decorative-latkan-1.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#8A9A5B' }}>FESTIVE HANGING</span>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Lotus Decorative Latkan</h3>
              <span className="pcard-price pcard-price-sm">₹449</span>
            </div>
            <div className="pcard-eyebrow">set of 2 · triple pearl strands 🪷</div>
            <p className="pcard-desc">
              Deep red velvet blooms gathered on three rows of pearls, finished with a rose and a soft bud drop —
              ready to hang the moment it lands.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Diwali', 'Temple & entrance décor'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/lotus-decorative-latkan" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order — limited stock</a>
          </div>
        </div>

        {/* Artificial Flower Mala */}
        <div
          className="pcard pcard-new"
          data-reveal
          style={{ '--rot': '-1deg' } as React.CSSProperties}
          onClick={goTo('/products/flower-mala')}
        >
          <div className="pcard-hero" style={{ borderRadius: 12 }}>
            <img className="img-cover" src="/assets/flower-mala-braided-1.jpeg" alt="" loading="lazy" decoding="async" />
            <span className="pcard-badge" style={{ background: '#6B4FA0' }}>TWO STYLES</span>
          </div>
          <div className="pcard-strip" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ backgroundColor: '#E3C9F5', aspectRatio: '2 / 1' }}>
              <DesktopOnlyImg src="/assets/flower-mala-cluster-1.jpeg" />
            </div>
          </div>
          <div className="pcard-body">
            <div className="pcard-row">
              <h3>Artificial Flower Mala</h3>
              <span className="pcard-price pcard-price-sm">₹149</span>
            </div>
            <div className="pcard-eyebrow">Braided Rose ₹200 · Mixed Bloom ₹150</div>
            <p className="pcard-desc">
              A velvet-flower mala strung on pearls, knotted by hand — for your idol, your mandir, or to welcome
              someone home. Pick your style on the page.
            </p>
            <div className="pcard-tags pcard-tags-latkan">
              {['Ganpati', 'Weddings', 'Pooja & mandir'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href="/products/flower-mala" className="pcard-details" onClick={stopBubble}>See details →</Link>
            <a {...ig} className="pcard-dm" onClick={stopBubble}>DM to order</a>
          </div>
        </div>
          </>
        )}
      </div>

      {/* Desktop only — the mobile carousel already swipes through every product. */}
      <div className="products-more desktop-only">
        <button
          type="button"
          className="products-more-btn"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
        >
          {showAll ? 'Show less' : 'Show more'}
          <span className="products-more-chev" aria-hidden>
            {showAll ? '↑' : '↓'}
          </span>
        </button>
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
          /* Each card sizes to its own content. Without this, grid's default
             align-items:stretch forces every card to the tallest height in its
             row, and a card with less content (e.g. one with no thumbnail
             strip) renders a blank void below its DM button.
             NB: no backticks in this block — it lives inside a styled-jsx
             template literal, where a backtick ends the string. */
          align-items: start;
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
        /* Cards revealed by "Show more" never pass through ScrollReveal (they
           don't exist at its mount), so they fade themselves in. Opacity only —
           animating transform here would fight .pcard's rotate/hover lift. */
        .pcard-new {
          animation: pcardIn 0.45s ease-out both;
        }
        @keyframes pcardIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcard-new {
            animation: none;
          }
        }

        .products-more {
          text-align: center;
          margin-top: clamp(20px, 3vw, 30px);
        }
        .products-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 30px;
          border-radius: 28px;
          border: 1.5px solid #d9bdee;
          background: #FDFBFF;
          color: #6B2E8F;
          font-family: var(--font-work-sans), sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          min-height: 44px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .products-more-btn:hover {
          background: #E3C9F5;
          border-color: #6B2E8F;
          transform: translateY(-2px);
        }
        .products-more-chev {
          font-size: 15px;
          line-height: 1;
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
