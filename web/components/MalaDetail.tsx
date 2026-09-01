'use client'

import { useState } from 'react'
import ProductDetail from '@/components/ProductDetail'
import { malaVariants, products, type MalaVariant } from '@/lib/site'

/**
 * Wraps <ProductDetail> with the style toggle for the Artificial Flower Mala.
 *
 * Differs from <BouquetDetail> in one way that matters: the two bouquet
 * colourways share a price, but the two mala styles don't (₹200 vs ₹150), so
 * this swaps `price`/`priceRange` alongside the photos. ProductDetail renders
 * whatever `product.price` it's handed, so no change was needed there.
 */
export default function MalaDetail() {
  const [variant, setVariant] = useState<MalaVariant>('braided')
  const product = products['flower-mala']
  const { label, price, mrp, priceRange, images } = malaVariants[variant]

  const picker = (
    <div className="variant-picker">
      {(Object.keys(malaVariants) as MalaVariant[]).map((key) => (
        <button
          key={key}
          onClick={() => setVariant(key)}
          className="variant-btn"
          data-active={variant === key}
          aria-pressed={variant === key}
        >
          {malaVariants[key].label}
          <span className="variant-price">{malaVariants[key].price}</span>
        </button>
      ))}
      <style jsx>{`
        .variant-picker {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .variant-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          padding: 9px 18px;
          border-radius: 24px;
          border: 1.5px solid #d9bdee;
          background: #FDFBFF;
          color: #3A2647;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          min-height: 44px;
          font-family: var(--font-work-sans), sans-serif;
        }
        .variant-btn[data-active='true'] {
          border-color: #6B2E8F;
          background: #E3C9F5;
        }
        .variant-price {
          font-weight: 600;
          font-size: 12px;
          color: #6B2E8F;
        }
      `}</style>
    </div>
  )

  return (
    <ProductDetail
      product={{
        ...product,
        price,
        mrp,
        priceRange: { ...priceRange },
        images: [...images],
        alt: `${product.name} — ${label}`,
      }}
      variantPicker={picker}
      galleryKey={variant}
    />
  )
}
