'use client'

import { useRef, useState } from 'react'

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  // Deduplicate and filter any falsy paths so identical images are never duplicated
  const uniqueImages = Array.from(new Set(images.filter(Boolean)))
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
    if (idx !== selected && idx >= 0 && idx < uniqueImages.length) setSelected(idx)
  }

  const hasMultiple = uniqueImages.length > 1

  return (
    <div className="gallery">
      <div className="gallery-main" ref={mainRef} onScroll={handleScroll}>
        {uniqueImages.map((src, i) => (
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

      {/* Only show thumbnail picker if there are multiple distinct photos */}
      {hasMultiple && (
        <div className="gallery-thumbs">
          {uniqueImages.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => selectIndex(i)}
              className="gallery-thumb"
              data-selected={i === selected}
              aria-label={`Show image ${i + 1} of ${uniqueImages.length}`}
              aria-pressed={i === selected}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .gallery {
          width: 100%;
        }
        .gallery-main {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          box-shadow: 0 22px 44px -24px rgba(58, 38, 71, 0.45);
          background: #fbf8fe;
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
          display: flex;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }
        .gallery-thumb {
          width: 68px;
          height: 68px;
          flex: 0 0 68px;
          border: 2px solid transparent;
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          cursor: pointer;
          aspect-ratio: 1;
          background: #FDFBFF;
          box-shadow: 0 2px 8px rgba(58, 38, 71, 0.08);
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gallery-thumb:hover {
          transform: translateY(-2px);
        }
        .gallery-thumb[data-selected='true'] {
          border-color: #6B2E8F;
          box-shadow: 0 4px 14px rgba(107, 46, 143, 0.28);
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
          .gallery-thumbs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .gallery-thumb {
            width: 60px;
            height: 60px;
            flex: 0 0 60px;
          }
        }
      `}</style>
    </div>
  )
}
