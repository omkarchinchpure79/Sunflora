'use client'

import { useRef, useState } from 'react'

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [selected, setSelected] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  const selectIndex = (i: number) => {
    setSelected(i)
    // On mobile the "main" area is a scroll-snap carousel; on desktop this scrollTo is a no-op.
    const el = mainRef.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const el = mainRef.current
    if (!el || !el.clientWidth) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== selected && idx >= 0 && idx < images.length) setSelected(idx)
  }

  return (
    <div className="gallery">
      <div className="gallery-main" ref={mainRef} onScroll={handleScroll}>
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={i === 0 ? alt : `${alt} — view ${i + 1}`}
            className="gallery-img"
            data-selected={i === selected}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div
        className="gallery-thumbs"
        style={{ gridTemplateColumns: `repeat(${images.length},1fr)` }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => selectIndex(i)}
            className="gallery-thumb"
            data-selected={i === selected}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-pressed={i === selected}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      <style jsx>{`
        .gallery-main {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          box-shadow: 0 22px 44px -24px rgba(58, 38, 71, 0.45);
        }
        .gallery-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: none;
        }
        .gallery-img[data-selected='true'] {
          display: block;
        }
        .gallery-thumbs {
          display: grid;
          gap: 8px;
          margin-top: 8px;
        }
        .gallery-thumb {
          border: 2px solid transparent;
          border-radius: 10px;
          overflow: hidden;
          padding: 0;
          cursor: pointer;
          aspect-ratio: 1;
          background: none;
          min-width: 44px;
          min-height: 44px;
        }
        .gallery-thumb[data-selected='true'] {
          border-color: #6B2E8F;
        }
        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ===== Mobile: swipeable scroll-snap carousel ===== */
        @media (max-width: 768px) {
          .gallery-main {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            aspect-ratio: unset;
            box-shadow: 0 20px 40px -22px rgba(58, 38, 71, 0.45);
          }
          .gallery-img {
            position: static;
            flex: 0 0 100%;
            scroll-snap-align: center;
            aspect-ratio: 4 / 5;
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
