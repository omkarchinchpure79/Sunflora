# Sunflora

**Craftilicious forever flowers.** Handmade, made-to-order photo keepsake frames, everlasting bouquets, and festive Lotus Latkan hangings — every piece shaped by hand from craft wire, one order at a time, ordered entirely over Instagram DM.

This repository holds the Sunflora marketing/e-commerce-style website (a Next.js app) along with the brand's founding documents, market research, and raw photo assets.

- **Live site:** [sunflora-iota.vercel.app](https://sunflora-iota.vercel.app)
- **Instagram:** [@sunflora_offical](https://instagram.com/sunflora_offical) *(spelling is intentional — confirmed by the founder)*

---

## Table of contents

- [What's in this repo](#whats-in-this-repo)
- [Repository structure](#repository-structure)
- [Getting started](#getting-started)
- [How the site is built](#how-the-site-is-built)
- [Deployment](#deployment)
- [Project documents](#project-documents)

---

## What's in this repo

This is **not a single-purpose code repo** — it's the whole project folder for the Sunflora brand. Only `web/` is buildable code; everything else is reference material that informed it:

| Path | What it is |
|---|---|
| `web/` | The live Next.js 15 (App Router) + React 19 website — the only code in this repo |
| `Sunflora_Founding_Document.md` | The brand's founding doc — origin, target customer, pricing logic, what's proven vs. still a hypothesis |
| `Market_Research.md` | Competitor and market research that shaped positioning |
| `Website_Build_Prompt.md` | The original brief the site was built from (historical — `web/lib/site.ts` is the current source of truth for on-site copy, not this file) |
| `brand-assets/` | Raw, unprocessed source photos staged for future use on the site |

## Repository structure

```
Sunflora/
├── README.md                      — you are here
├── Sunflora_Founding_Document.md  — brand strategy & origin story
├── Market_Research.md             — competitor/market research
├── Website_Build_Prompt.md        — original build brief (historical reference)
├── brand-assets/                  — unprocessed source photos, not yet wired into the site
│   ├── WhatsApp Image *.jpeg      — 18 raw product/lifestyle photos awaiting use
│   └── sunflora-logo-new.png      — higher-res logo, NOT yet integrated into the live site
└── web/                           — the Next.js application (see web/CLAUDE.md for deep detail)
    ├── app/                       — Next.js App Router routes
    │   ├── page.tsx               — landing page (hero, products grid, why-Sunflora, how-it-works)
    │   ├── layout.tsx             — root layout: fonts, global <head> metadata, JSON-LD
    │   ├── globals.css            — global styles + design tokens as CSS
    │   ├── robots.ts / sitemap.ts — generated SEO files
    │   ├── contact/               — dedicated Contact page (contact.css + page.tsx)
    │   └── products/
    │       ├── [slug]/            — generic product detail template, data-driven from lib/site.ts
    │       └── bouquets/          — dedicated route for the Bouquets product (needs client colourway state)
    ├── components/                — shared React components
    │   ├── Header.tsx / Footer.tsx
    │   ├── ProductsSection.tsx    — landing-page products grid
    │   ├── ProductDetail.tsx      — shared product detail layout (+ ProductDetail.css)
    │   ├── ProductGallery.tsx     — image gallery/carousel on product pages
    │   ├── BouquetDetail.tsx      — wraps ProductDetail with colourway toggle state
    │   └── ScrollReveal.tsx       — GSAP scroll-triggered fade/slide-in animations
    ├── lib/
    │   └── site.ts                — single source of truth: brand copy, design tokens, all product data
    ├── public/assets/             — optimized images actually served by the live site
    ├── package.json               — dependencies & npm scripts
    ├── next.config.mjs / tsconfig.json
    └── CLAUDE.md                  — detailed engineering notes (architecture, styling rules, gotchas)
```

## Getting started

All commands run from `web/` — that's where the Next.js app lives, not the repo root.

```bash
cd web
npm install
npm run dev      # start the dev server
```

Other scripts:

```bash
npm run build    # production build — also the only way to typecheck (no standalone tsc script)
npm run start    # serve the production build locally
npm run lint     # next lint
```

There is no test suite in this repo.

## How the site is built

- **Framework:** Next.js 15 (App Router) + React 19, one responsive codebase — every component renders both desktop and mobile layouts and switches purely via CSS media queries. There's no separate mobile build and no device-detection branching in JS.
- **Content model:** `web/lib/site.ts` is the single source of truth for the entire site — brand copy, design tokens, Instagram DM helper links, and every product (keyed by slug). Product pages, the landing grid, the footer, and SEO/JSON-LD metadata all read from this one file.
- **Styling:** a mix of `styled-jsx` (inline `<style jsx>`, requires a Client Component) and plain imported `.css` files (used specifically on pages that also export `generateMetadata`, since that's a Server Component export and can't coexist with `styled-jsx`).
- **Animation:** GSAP + `@gsap/react`'s `useGSAP` hook drives scroll-triggered reveal animations, mounted once via `ScrollReveal.tsx`.
- **No cart/checkout:** ordering happens entirely through Instagram DM — every "DM to order" button links to `igDm` from `lib/site.ts`.

For the full architectural detail, styling gotchas, and things that look like bugs but aren't (e.g. the intentionally misspelled `IG_HANDLE`, why `Header` returns a Fragment, why the reveal animation needs `clearProps: 'transform'`), see **[web/CLAUDE.md](web/CLAUDE.md)**.

## Deployment

Deploys go to the Vercel project `edupath/sunflora`, aliased at `sunflora-iota.vercel.app`. Deploy straight from disk with the Vercel CLI (avoids sending binary assets through a chat context window):

```bash
npx vercel link --yes --project sunflora --scope edupath   # one-time per checkout
npx vercel --prod --yes
```

## Project documents

- **[Sunflora_Founding_Document.md](Sunflora_Founding_Document.md)** — why Sunflora exists, who it's for, what's a proven fact vs. an unproven hypothesis, and the pricing/positioning logic behind it.
- **[Market_Research.md](Market_Research.md)** — competitor landscape and market context.
- **[Website_Build_Prompt.md](Website_Build_Prompt.md)** — the original brief the site's first version was built from. Kept for historical context; `web/lib/site.ts` overrides it wherever the two disagree.
