'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { catalogProducts, CATALOG_CATEGORIES, type Product, FREE_SHIPPING_OVER } from '@/lib/site'
import { useInstagramLink } from './IgLink'

export default function ProductCatalogGrid({
  title = 'Our Handcrafted Creations',
  subtitle = 'Every piece shaped by hand, petal by petal. Choose your favorite or DM us to customize.',
  initialCategory = 'All Products',
}: {
  title?: string
  subtitle?: string
  initialCategory?: string
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured')
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const toggleWishlist = (slug: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  const filteredProducts = useMemo(() => {
    let list = [...catalogProducts]

    if (selectedCategory !== 'All Products') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceValue - b.priceValue)
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceValue - a.priceValue)
    } else if (sortBy === 'discount') {
      list.sort((a, b) => {
        const discA = a.mrpValue ? ((a.mrpValue - a.priceValue) / a.mrpValue) : 0
        const discB = b.mrpValue ? ((b.mrpValue - b.priceValue) / b.mrpValue) : 0
        return discB - discA
      })
    }

    return list
  }, [selectedCategory, sortBy])

  return (
    <section className="cg-section" id="products">
      <div className="cg-header">
        <div className="cg-header-text">
          <div className="cg-eyebrow">✿ HANDMADE FOREVER BLOOMS ✿</div>
          <h2 className="cg-title">{title}</h2>
          <p className="cg-subtitle">{subtitle}</p>
        </div>

        {/* Categories Bar */}
        <div className="cg-categories" role="tablist" aria-label="Product Categories">
          {CATALOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`cg-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter / Sort Control Bar */}
        <div className="cg-control-bar">
          <div className="cg-count">
            Showing <strong>1–{filteredProducts.length}</strong> of <strong>{catalogProducts.length}</strong> products
          </div>

          <div className="cg-controls-right">
            <div className="cg-sort-wrapper">
              <label htmlFor="cg-sort" className="cg-sort-label">Sort by:</label>
              <select
                id="cg-sort"
                className="cg-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Savings</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Modern E-Commerce Products Grid */}
      <div className="cg-grid">
        {filteredProducts.map((product) => {
          const isWishlisted = !!wishlist[product.slug]
          const discountPct = product.mrpValue
            ? Math.round(((product.mrpValue - product.priceValue) / product.mrpValue) * 100)
            : null

          return (
            <div key={product.slug} className="cg-card-wrap">
              <Link href={`/products/${product.slug}`} className="cg-card">
                {/* Image Container */}
                <div className="cg-img-box">
                  <img
                    src={product.images[0]}
                    alt={product.alt || product.name}
                    className="cg-img"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Wishlist Heart Icon */}
                  <button
                    type="button"
                    className={`cg-wishlist-btn ${isWishlisted ? 'liked' : ''}`}
                    onClick={(e) => toggleWishlist(product.slug, e)}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={isWishlisted ? '#E8437D' : 'none'}
                      stroke={isWishlisted ? '#E8437D' : '#3A2647'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cg-heart-icon"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <div className="cg-badge">{product.badge}</div>
                  )}
                </div>

                {/* Card Details */}
                <div className="cg-details">
                  <div className="cg-item-category">{product.category}</div>
                  <h3 className="cg-item-name">{product.name}</h3>

                  {/* Dual Price Row */}
                  <div className="cg-price-row">
                    <span className="cg-actual-price">{product.price}</span>
                    {product.mrp && <del className="cg-mrp">{product.mrp}</del>}
                    {discountPct && discountPct > 0 && (
                      <span className="cg-discount-tag">{discountPct}% OFF</span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="cg-card-action">
                    <span>View details & order →</span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .cg-section {
          padding: 48px 24px 72px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .cg-header {
          margin-bottom: 36px;
        }

        .cg-header-text {
          text-align: center;
          margin-bottom: 28px;
        }

        .cg-eyebrow {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #8A9A5B;
          margin-bottom: 8px;
        }

        .cg-title {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 600;
          color: #3A2647;
          margin: 0 0 10px;
          line-height: 1.15;
        }

        .cg-subtitle {
          font-size: clamp(15px, 2vw, 17px);
          color: #6d5a82;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.55;
        }

        /* Category Filter Pills */
        .cg-categories {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 auto 28px;
          padding: 4px 0;
        }

        .cg-cat-pill {
          background: #FDFBFF;
          border: 1px solid #d9bdee;
          color: #4F2169;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .cg-cat-pill:hover {
          border-color: #6B2E8F;
          background: #f7f0fd;
          transform: translateY(-1px);
        }

        .cg-cat-pill.active {
          background: #6B2E8F;
          color: #ffffff;
          border-color: #6B2E8F;
          box-shadow: 0 4px 14px -4px rgba(107, 46, 143, 0.45);
        }

        /* Control Bar */
        .cg-control-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #faf6fd;
          border-radius: 12px;
          border: 1px solid #eedef8;
          font-size: 14px;
          color: #5f4a70;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cg-count strong {
          color: #3A2647;
        }

        .cg-controls-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cg-sort-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cg-sort-label {
          font-size: 13px;
          font-weight: 600;
          color: #5f4a70;
        }

        .cg-sort-select {
          background: #ffffff;
          border: 1px solid #d9bdee;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 13px;
          color: #3A2647;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .cg-sort-select:focus {
          border-color: #6B2E8F;
        }

        /* Product Cards Grid */
        .cg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1100px) {
          .cg-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .cg-section {
            padding: 36px 16px 56px;
          }
          .cg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .cg-categories {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 8px;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
          }
          .cg-categories::-webkit-scrollbar {
            display: none;
          }
          .cg-cat-pill {
            font-size: 13px;
            padding: 7px 14px;
          }
        }

        @media (max-width: 480px) {
          .cg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        /* Product Card */
        .cg-card-wrap {
          display: flex;
        }

        .cg-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #f0e6f7;
          overflow: hidden;
          text-decoration: none;
          width: 100%;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s;
          box-shadow: 0 4px 16px -6px rgba(58, 38, 71, 0.06);
        }

        .cg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -10px rgba(58, 38, 71, 0.16);
          border-color: #d9bdee;
        }

        /* Image Box */
        .cg-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.08;
          background: #fbf8fe;
          overflow: hidden;
        }

        .cg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cg-card:hover .cg-img {
          transform: scale(1.05);
        }

        /* Wishlist Heart Button */
        .cg-wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(217, 189, 238, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 2;
        }

        .cg-wishlist-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .cg-heart-icon {
          width: 18px;
          height: 18px;
          transition: transform 0.2s;
        }

        .cg-wishlist-btn.liked .cg-heart-icon {
          transform: scale(1.15);
        }

        /* Badge */
        .cg-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #6B2E8F;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border-radius: 12px;
          box-shadow: 0 4px 10px -2px rgba(107, 46, 143, 0.4);
          z-index: 2;
        }

        /* Details */
        .cg-details {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (max-width: 480px) {
          .cg-details {
            padding: 12px 10px 14px;
          }
        }

        .cg-item-category {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #8A9A5B;
          margin-bottom: 4px;
        }

        .cg-item-name {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(16px, 1.8vw, 19px);
          font-weight: 600;
          color: #3A2647;
          margin: 0 0 10px;
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.5em;
        }

        /* Pricing Row */
        .cg-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: auto;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .cg-actual-price {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(18px, 2.2vw, 22px);
          font-weight: 700;
          color: #6B2E8F;
        }

        .cg-mrp {
          font-size: 13px;
          color: #8c769b;
          text-decoration: line-through;
        }

        .cg-discount-tag {
          font-size: 11px;
          font-weight: 700;
          color: #276738;
          background: #e4f5e7;
          border: 1px solid #c8eccd;
          padding: 2px 7px;
          border-radius: 8px;
        }

        /* Action Link */
        .cg-card-action {
          font-size: 13px;
          font-weight: 600;
          color: #6B2E8F;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s;
          padding-top: 8px;
          border-top: 1px solid #f3eaf8;
        }

        .cg-card:hover .cg-card-action {
          gap: 8px;
          color: #4F2169;
        }

        @media (max-width: 480px) {
          .cg-card-action {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  )
}
