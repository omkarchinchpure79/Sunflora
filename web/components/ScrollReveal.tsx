'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Mount once per page. Two jobs:
 *  1. Fades/slides in every `[data-reveal]` element as it scrolls into view,
 *     staggering elements that arrive in the same batch (e.g. a row of cards).
 *  2. Renders a thin progress bar under the header that fills as the page
 *     scrolls, so scrolling reads as movement rather than a static page.
 */
export default function ScrollReveal() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    if (items.length) {
      if (reduceMotion) {
        gsap.set(items, { opacity: 1, y: 0 })
      } else {
        gsap.set(items, { opacity: 0, y: 32 })
        ScrollTrigger.batch(items, {
          start: 'top 87%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.12,
              overwrite: true,
              // Strip GSAP's inline transform once the reveal finishes so CSS
              // :hover rules (e.g. the card lift-on-hover) regain control of
              // `transform` — an inline style always beats a stylesheet rule,
              // hover or not, so leaving it set permanently kills all hover motion.
              clearProps: 'transform',
            }),
        })
      }
    }

    if (barRef.current) {
      gsap.set(barRef.current, { scaleX: 0 })
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }

    // Elements already in view at mount (e.g. above-the-fold content on a
    // short page) need one manual refresh so ScrollTrigger evaluates them.
    ScrollTrigger.refresh()
  }, [])

  return (
    <div className="scroll-progress-track" aria-hidden>
      <div ref={barRef} className="scroll-progress-bar" />
      <style jsx>{`
        .scroll-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 100;
          pointer-events: none;
        }
        .scroll-progress-bar {
          height: 100%;
          width: 100%;
          background: #6B2E8F;
          transform-origin: left;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  )
}
