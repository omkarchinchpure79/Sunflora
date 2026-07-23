'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BRAND, igDm } from '@/lib/site'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Menu' },
  { href: '/contact', label: 'Contact us' },
]

/** Sunflower mark shared by header + footer, 12-petal per the latest handoff. */
function Sunflower({ size, petal, center }: { size: number; petal: string; center: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <g fill={petal}>
        {petals.map((deg) => (
          <ellipse key={deg} cx="20" cy="7" rx="3.2" ry="8" transform={`rotate(${deg} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="6.5" fill={center} />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll behind the mobile drawer overlay.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  return (
    <>
      <div className="announcement">
        <span className="announcement-full">{BRAND.announcement}</span>
        <span className="announcement-short">Free Shipping Above ₹1000 • DM to Customize ✿</span>
      </div>
      <header className="site-header">
        <div className="site-header-row">
          <Link href="/" className="logo" aria-label="Sunflora home">
            <span className="logo-word">
              Sunfl
              <Sunflower size={28} petal="#F4B23A" center="#6B4322" />
              ra
            </span>
            <span className="logo-tagline">{BRAND.tagline}</span>
          </Link>

          {/* Desktop: always-visible inline nav — only 3 destinations, no dropdown needed */}
          <nav className="desktop-links" aria-label="Primary">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="site-header-actions">
            <a href={igDm} target="_blank" rel="noopener noreferrer" className="dm-pill">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
              DM to order
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="menu-toggle"
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span className="menu-toggle-short" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer + scrim (only 3 links now: Home / Menu / Contact us) */}
      {menuOpen && (
        <>
          <button className="drawer-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div className="drawer" id="mobile-menu">
            <button className="drawer-close" aria-label="Close" onClick={() => setMenuOpen(false)}>
              ×
            </button>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .announcement {
          background: #3F1B57;
          color: #F1E4FA;
          text-align: center;
          padding: 8px 16px;
          font-family: var(--font-caveat), cursive;
          font-size: clamp(15px, 3.6vw, 19px);
          letter-spacing: 0.01em;
        }
        .announcement-short {
          display: none;
        }
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(247, 243, 251, 0.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e3cff3;
        }
        .site-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px clamp(18px, 5vw, 40px);
          gap: 16px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
        }
        .logo-word {
          font-family: var(--font-cormorant), serif;
          font-weight: 700;
          font-size: clamp(23px, 6vw, 36px);
          color: #6B2E8F;
          display: flex;
          align-items: center;
        }
        .logo-word :global(svg) {
          width: 0.9em;
          height: 0.9em;
          margin: 0 1px;
        }
        .logo-tagline {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: clamp(10px, 2.4vw, 12px);
          color: #8a6b9e;
          margin-top: 2px;
        }
        .desktop-links {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 36px);
          font-family: var(--font-cormorant), serif;
          font-weight: 600;
          font-size: 17px;
        }
        .desktop-links :global(a) {
          position: relative;
          color: #3A2647;
          text-decoration: none;
          padding: 6px 0;
        }
        .desktop-links :global(a::after) {
          content: '';
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 0;
          height: 2px;
          background: #6B2E8F;
          transition: right 0.25s ease;
        }
        .desktop-links :global(a:hover) {
          color: #6B2E8F;
        }
        .desktop-links :global(a:hover::after) {
          right: 0;
        }
        .site-header-actions {
          display: flex;
          align-items: center;
          gap: clamp(10px, 3vw, 22px);
        }
        .dm-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #6B2E8F;
          color: #fff;
          padding: 11px 18px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          min-height: 44px;
          box-shadow: 0 8px 18px -8px rgba(107, 46, 143, 0.6);
          text-decoration: none;
          font-family: var(--font-work-sans), sans-serif;
          white-space: nowrap;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .dm-pill:hover {
          color: #fff;
          background: #4F2169;
          transform: translateY(-2px);
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-direction: column;
          gap: 5px;
          min-width: 44px;
          min-height: 44px;
        }
        .menu-toggle span {
          width: 24px;
          height: 2.5px;
          background: #3A2647;
          border-radius: 2px;
        }
        .menu-toggle-short {
          width: 18px !important;
        }
        .drawer-scrim {
          display: none;
        }
        .drawer {
          display: none;
        }

        /* ===== Mobile (<= 768px): mirrors the "Mobile Header" handoff ===== */
        @media (max-width: 768px) {
          .announcement-full {
            display: none;
          }
          .announcement-short {
            display: inline;
          }
          .announcement {
            padding: 6px 16px;
            font-size: 14px;
          }
          .site-header-row {
            padding: 12px 18px;
          }
          .logo-tagline {
            font-size: 10px;
          }
          .desktop-links {
            display: none;
          }
          /* The header DM pill is replaced on mobile by the footer's sticky bottom bar. */
          .dm-pill {
            display: none;
          }
          .menu-toggle {
            display: flex;
          }
          .menu-toggle span {
            width: 22px;
            height: 2px;
          }
          .menu-toggle-short {
            width: 16px !important;
          }

          .drawer-scrim {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(58, 38, 71, 0.55);
            z-index: 70;
            border: none;
            padding: 0;
            cursor: pointer;
          }
          .drawer {
            display: flex;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 78%;
            max-width: 320px;
            background: #FDFBFF;
            z-index: 71;
            padding: 24px;
            flex-direction: column;
            gap: 2px;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
            overflow-y: auto;
          }
          .drawer-close {
            align-self: flex-end;
            background: none;
            border: none;
            font-size: 26px;
            line-height: 1;
            color: #3A2647;
            margin-bottom: 14px;
            padding: 4px;
          }
          .drawer :global(a) {
            font-family: var(--font-cormorant), serif;
            font-size: 22px;
            font-weight: 600;
            color: #3A2647;
            padding: 14px 0;
            text-decoration: none;
          }
        }
      `}</style>
    </>
  )
}
