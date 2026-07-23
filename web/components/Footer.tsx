'use client'

import Link from 'next/link'
import { BRAND, igAt, igDm, igProfile } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="floating-petal footer-petal" aria-hidden style={{ top: '6%', right: '8%', animation: 'floatY 3.25s ease-in-out infinite' }}>
        <img src="/assets/petal-lily.png" alt="" loading="lazy" width={26} height={25} style={{ opacity: 0.4 }} />
      </div>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <svg width="26" height="26" viewBox="0 0 40 40" aria-hidden>
              <g fill="#A569BD">
                {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
                  <ellipse key={deg} cx="20" cy="7" rx="3.2" ry="8" transform={`rotate(${deg} 20 20)`} />
                ))}
              </g>
              <circle cx="20" cy="20" r="6.5" fill="#E8A93A" />
            </svg>
            <span className="footer-word">{BRAND.name}</span>
          </div>
          <p className="footer-tagline">{BRAND.tagline}</p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/#products">Menu</Link>
          <Link href="/contact">Contact us</Link>
        </div>
        <div className="footer-links footer-links-contact">
          <a href={igDm} target="_blank" rel="noopener noreferrer" className="footer-dm">
            DM to order
          </a>
          <a href={igProfile} target="_blank" rel="noopener noreferrer">
            {igAt}
          </a>
          <span className="footer-muted">Ships pan-India · Delhivery</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Sunflora · {BRAND.tagline}</span>
      </div>

      {/* Desktop: floating round DM button, bottom-right */}
      <a
        href={igDm}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-dm"
        aria-label="DM us on Instagram to order"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" />
        </svg>
        DM us
      </a>

      {/* Mobile: full-width sticky bottom bar */}
      <div className="sticky-bar">
        <a href={igDm} target="_blank" rel="noopener noreferrer" className="sticky-bar-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" />
          </svg>
          DM to order
        </a>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          background: #3F1B57;
          color: #F1E4FA;
          padding: clamp(30px, 5vw, 48px) clamp(18px, 5vw, 40px);
          font-family: var(--font-work-sans), sans-serif;
          /* Room so the floating desktop DM button never overlaps footer text. */
          padding-bottom: clamp(70px, 12vw, 90px);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          align-items: start;
          max-width: 1440px;
          margin: 0 auto;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-word {
          font-family: var(--font-caveat), cursive;
          font-size: 34px;
          font-weight: 700;
          color: #A569BD;
          line-height: 1;
        }
        .footer-tagline {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: 17px;
          margin: 8px 0 0;
          color: #cbb0dd;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-links :global(a) {
          color: #F1E4FA;
          font-size: 14px;
          text-decoration: none;
        }
        .footer-links :global(a):hover {
          color: #fff;
        }
        .footer-dm {
          color: #A569BD !important;
          font-weight: 600;
        }
        .footer-muted {
          color: #cbb0dd;
          font-size: 13px;
        }
        .footer-bottom {
          margin-top: 26px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          justify-content: space-between;
          font-size: 12px;
          color: #a98cc0;
          max-width: 1440px;
          margin-left: auto;
          margin-right: auto;
        }
        .floating-dm {
          position: fixed;
          right: 16px;
          bottom: calc(16px + env(safe-area-inset-bottom));
          z-index: 60;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #6B2E8F;
          color: #fff;
          padding: 14px 20px;
          border-radius: 34px;
          font-weight: 600;
          font-size: 15px;
          box-shadow: 0 12px 26px -8px rgba(107, 46, 143, 0.7);
          text-decoration: none;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .floating-dm:hover {
          color: #fff;
          background: #4F2169;
          transform: translateY(-3px);
        }
        .sticky-bar {
          display: none;
        }

        /* ===== Mobile (<= 768px): mirrors the "Mobile Footer" handoff ===== */
        @media (max-width: 768px) {
          .footer {
            padding: 26px 18px;
          }
          .footer-petal {
            display: none;
          }
          .footer-tagline {
            font-size: 14px;
            margin-bottom: 18px;
          }
          .footer-links-contact {
            display: none;
          }
          .footer-bottom {
            flex-direction: column;
            font-size: 11.5px;
          }
          .floating-dm {
            display: none;
          }
          .sticky-bar {
            display: block;
            position: sticky;
            bottom: 0;
            z-index: 30;
            background: #6B2E8F;
            padding: 12px 18px calc(env(safe-area-inset-bottom) + 14px);
            box-shadow: 0 -8px 20px -10px rgba(0, 0, 0, 0.3);
          }
          .sticky-bar-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #fff;
            font-weight: 600;
            font-size: 15px;
            min-height: 44px;
            text-decoration: none;
          }
          .sticky-bar-link:hover {
            color: #fff;
          }
        }
      `}</style>
    </footer>
  )
}
