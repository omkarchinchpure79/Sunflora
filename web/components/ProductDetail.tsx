import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'
import ScrollReveal from '@/components/ScrollReveal'
import { igDm, products, type Product } from '@/lib/site'
import './ProductDetail.css'

export default function ProductDetail({
  product,
  variantPicker,
  galleryKey,
}: {
  product: Product
  /** Optional slot for the Bouquet page's colourway toggle, rendered above the price. */
  variantPicker?: React.ReactNode
  /** Remounts the gallery (resetting its selected index) when this changes, e.g. on variant switch. */
  galleryKey?: string
}) {
  const crossSell = product.crossSell.map((slug) => products[slug]).filter(Boolean)
  const isLatkanTint = product.specsBg === '#e7ecd8'

  return (
    <div>
      {/* ===== PRODUCT HERO ===== */}
      <section className="pd-hero">
        <div className="pd-hero-grid">
          <div>
            <ProductGallery key={galleryKey ?? product.slug} images={product.images} alt={product.alt} />
          </div>
          <div>
            <div className="pd-eyebrow">{product.eyebrow}</div>
            <h1 className="pd-title">{product.title}</h1>
            <p className="pd-summary">{product.summary}</p>
            {variantPicker}
            <div className="pd-price">{product.price}</div>
            {product.tags.length > 0 && (
              <div className="pd-tags">
                {product.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="pd-cta">
              {product.ctaLabel}
            </a>
            {product.ctaNote && <div className="pd-cta-note">{product.ctaNote}</div>}

            {/* Filled into the hero's right column (rather than its own section
                below) so it uses the leftover height next to the taller gallery
                instead of leaving it blank. */}
            <div className="pd-hero-features">
              <h2>What makes it special</h2>
              <div className="pd-hero-features-grid">
                {product.features.map((f) => (
                  <div key={f.title} className="pd-feature-card" data-reveal>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DETAILS STRIP ===== */}
      <section
        className="pd-specs"
        style={{ background: product.specsBg ?? '#E3C9F5' }}
        data-tint={isLatkanTint}
      >
        <div className="pd-specs-grid" style={{ gridTemplateColumns: `repeat(${product.specs.length},1fr)` }}>
          {product.specs.map((s) => (
            <div key={s.label}>
              <div className="pd-spec-label">{s.label}</div>
              <div className="pd-spec-value">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW ORDERING WORKS ===== */}
      <section className="pd-order">
        <h2>How ordering works</h2>
        <div className="pd-order-grid">
          {product.orderSteps.map((s, i) => (
            <div key={s.title} className="pd-order-step">
              <div className="pd-order-num">{i + 1}</div>
              <div className="pd-order-title">{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CROSS-SELL ===== */}
      <section className="pd-cross-sell">
        <h2>You might also love</h2>
        <div className="pd-cross-grid">
          {crossSell.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="pd-cross-card" data-reveal>
              <div className="pd-cross-img">
                <img className="img-cover" src={p.images[0]} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="pd-cross-name">{p.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="pd-final">
        <h2>{product.finalCtaTitle}</h2>
        <a href={igDm} target="_blank" rel="noopener noreferrer" className="pd-cta">
          DM us on Instagram
        </a>
      </section>

      <ScrollReveal />
    </div>
  )
}
