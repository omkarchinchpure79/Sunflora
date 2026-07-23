'use client'

import { useState } from 'react'
import ProductDetail from '@/components/ProductDetail'
import { bouquetVariants, products, type BouquetVariant } from '@/lib/site'

export default function BouquetDetail() {
  const [variant, setVariant] = useState<BouquetVariant>('burgundy')
  const product = products.bouquets
  const images = [...bouquetVariants[variant].images]

  const picker = (
    <div className="variant-picker">
      {(Object.keys(bouquetVariants) as BouquetVariant[]).map((key) => (
        <button
          key={key}
          onClick={() => setVariant(key)}
          className="variant-btn"
          data-active={variant === key}
          aria-pressed={variant === key}
        >
          {bouquetVariants[key].label}
        </button>
      ))}
      <style jsx>{`
        .variant-picker {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .variant-btn {
          padding: 10px 18px;
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
      `}</style>
    </div>
  )

  return (
    <ProductDetail product={{ ...product, images }} variantPicker={picker} galleryKey={variant} />
  )
}
