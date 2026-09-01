'use client'

import { useState } from 'react'
import ProductDetail from '@/components/ProductDetail'
import {
  multipurposeLatkanVariants,
  products,
  type MultipurposeLatkanVariant,
} from '@/lib/site'

export default function MultipurposeLatkanDetail() {
  const [variant, setVariant] = useState<MultipurposeLatkanVariant>('pink')
  const product = products['multipurpose-2ft-latkan']
  const images = [...multipurposeLatkanVariants[variant].images]

  const picker = (
    <div className="variant-picker">
      {(
        Object.keys(
          multipurposeLatkanVariants
        ) as MultipurposeLatkanVariant[]
      ).map((key) => (
        <button
          key={key}
          onClick={() => setVariant(key)}
          className="variant-btn"
          data-active={variant === key}
          aria-pressed={variant === key}
        >
          {multipurposeLatkanVariants[key].label}
        </button>
      ))}
      <style jsx>{`
        .variant-picker {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }
        .variant-btn {
          padding: 10px 18px;
          border-radius: 24px;
          border: 1.5px solid #d9bdee;
          background: #fdfbff;
          color: #3a2647;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          min-height: 44px;
          font-family: var(--font-work-sans), sans-serif;
          transition: all 0.15s ease;
        }
        .variant-btn[data-active='true'] {
          border-color: #6b2e8f;
          background: #e3c9f5;
        }
      `}</style>
    </div>
  )

  return (
    <ProductDetail
      product={{ ...product, images }}
      variantPicker={picker}
      galleryKey={variant}
    />
  )
}
