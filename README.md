# Sunflora

**Craftilicious forever flowers.** Handmade, made-to-order photo keepsake frames, everlasting bouquets, and festive pooja décor — every piece shaped by hand from craft wire, one order at a time, ordered entirely over Instagram DM.

This repository holds the Sunflora marketing/e-commerce-style website (a Next.js app) along with the brand's founding documents, market research, and raw photo assets.

- **Live site:** [www.sunflora.shop](https://www.sunflora.shop)
- **Instagram:** [@sunflora.craftilicious.ful](https://instagram.com/sunflora.craftilicious.ful)

---

## Table of contents

- [What's in this repo](#whats-in-this-repo)
- [The catalogue](#the-catalogue)
- [Repository structure](#repository-structure)
- [Getting started](#getting-started)
- [How the site is built](#how-the-site-is-built)
- [Adding a product](#adding-a-product)
- [Deployment](#deployment)
- [Known issues](#known-issues)
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

## The catalogue

Eight products, all defined in [`web/lib/site.ts`](web/lib/site.ts). Prices reading **DM for price** are awaiting a figure from the founder — they are deliberately not guessed, and they emit no `offers` block in the page's JSON-LD rather than advertising a price that doesn't exist.

| Product | Price | Route |
|---|---|---|
| Signature Frame | ₹900–1,200 | `/products/signature-frame` |
| Mini Frame | ₹400–500 | `/products/mini-frame` |
| Everlasting Bouquet | *DM for price* | `/products/bouquets` |
| Lotus Latkan — Set of 2 | *DM for price* | `/products/lotus-latkan` |
| Purple Lotus Latkan — Set of 2 | ₹800 / pair | `/products/purple-lotus-latkan` |
| Lotus Asaan | ₹350 | `/products/lotus-asaan` |
| Lotus Decorative Latkan — Set of 2 | ₹500 / pair | `/products/lotus-decorative-latkan` |
| Artificial Flower Mala | ₹200 or ₹150 | `/products/flower-mala` |

Two products have **variants** and therefore their own routes instead of the generic `[slug]` template, because a toggle needs client-side state:

- **Everlasting Bouquet** — two colourways (burgundy & white, purple) that share one price.
- **Artificial Flower Mala** — two styles (Braided Rose ₹200, Mixed Bloom ₹150) at **different** prices. The style toggle swaps the price along with the photos; the product's own entry keeps a spanning ₹150–200 so the JSON-LD `AggregateOffer` and the homepage card stay honest across both.

> The Lotus Asaan's photos show a Ganpati idol sitting in the lotus. The idol is **not** part of the product, which is why "Idol not included" appears in the specs strip and on the homepage card.

## Repository structure

```
Sunflora/
├── README.md                      — you are here
├── Sunflora_Founding_Document.md  — brand strategy & origin story
├── Market_Research.md             — competitor/market research
├── Website_Build_Prompt.md        — original build brief (historical reference)
├── brand-assets/                  — unprocessed source photos, staged before use
│   ├── WhatsApp Image *.jpeg      — 26 raw photos; the 2026-08-01 batch is now wired in,
│   │                                the older 18 are still unassigned
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
    │       ├── bouquets/          — dedicated route: Bouquets (client colourway state)
    │       └── flower-mala/       — dedicated route: Flower Mala (client style + price state)
    ├── components/                — shared React components
    │   ├── Header.tsx / Footer.tsx
    │   ├── ProductsSection.tsx    — landing-page products grid + mobile carousel
    │   ├── ProductDetail.tsx      — shared product detail layout (+ ProductDetail.css)
    │   ├── ProductGallery.tsx     — image gallery/carousel on product pages
    │   ├── BouquetDetail.tsx      — wraps ProductDetail with colourway toggle state
    │   ├── MalaDetail.tsx         — wraps ProductDetail with style toggle (also swaps price)
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
- **Content model:** `web/lib/site.ts` is the single source of truth for the entire site — brand copy, design tokens, the free-shipping threshold, Instagram DM helper links, and every product (keyed by slug). Product pages, the sitemap, and SEO/JSON-LD metadata all read from this one file. The landing-page cards are the one deliberate exception — see [Adding a product](#adding-a-product).
- **Styling:** a mix of `styled-jsx` (inline `<style jsx>`, requires a Client Component) and plain imported `.css` files (used specifically on pages that also export `generateMetadata`, since that's a Server Component export and can't coexist with `styled-jsx`).
- **Animation:** GSAP + `@gsap/react`'s `useGSAP` hook drives scroll-triggered reveal animations, mounted once via `ScrollReveal.tsx`.
- **No cart/checkout:** ordering happens entirely through Instagram DM — every "DM to order" button links to `igDm` from `lib/site.ts`.

For the full architectural detail, styling gotchas, and things that look like bugs but aren't (why `Header` returns a Fragment, why the reveal animation needs `clearProps: 'transform'`, why prices reading "DM for price" must not be invented), see **[web/CLAUDE.md](web/CLAUDE.md)**.

## Adding a product

Two files, always both:

1. **`web/lib/site.ts`** — add an entry to `products`. This alone gives you a working detail page at `/products/<slug>`, a sitemap entry, JSON-LD, and cross-sell eligibility.
2. **`web/components/ProductsSection.tsx`** — add a desktop grid card *and* a `mobileCards` entry. The landing page is hand-written per card (each has its own rotation, badge colour and thumbnail strip), so it does **not** derive from `products`. A product added only to `site.ts` will never appear on the homepage.

Then `cd web && npm run build` — that is also the only typecheck, as there's no standalone `tsc` script.

Notes that have already caught people out:

- The desktop grid is a fixed 3-column track, so cards look best added in **threes**. A 10th card would sit alone on its own row.
- Cards beyond the first six sit behind a **"Show more"** toggle on desktop; the mobile carousel always lists everything.
- Those hidden cards are **conditionally rendered, not CSS-hidden**. `ScrollReveal` runs `gsap.set(opacity: 0)` over every `[data-reveal]` element once at mount, and a `display: none` card never scrolls into view to be faded back in — it would stay invisible permanently after being revealed.

## Deployment

Deploys go to the Vercel project `edupath/sunflora`, serving [www.sunflora.shop](https://www.sunflora.shop).

**Pushing to `main` deploys to production.** The Vercel Git integration builds the repo automatically; the project's Root Directory is set to `web`, so it finds the Next.js app.

To deploy manually instead — useful for deploying uncommitted work, and it avoids sending binary assets through a chat context window:

```bash
npx vercel link --yes --project sunflora --scope edupath   # one-time per checkout
npx vercel --prod --yes
```

Run this from the **repo root**, not from `web/`. Vercel applies the `web` root directory itself, so running the CLI inside `web/` makes it look for `web/web/`.

## Known issues

**`npm run lint` is not set up.** There is no ESLint config, so `next lint` just prompts you to create one interactively (and `next lint` is itself deprecated as of Next.js 16). Typechecking happens via `npm run build`.

### Resolved

- **Git pushes used to fail to deploy** (every Git-triggered build errored from 2026-07-22 to 2026-08-01, though the live site was always fine because CLI deploys ran from `web/`). Cause: the project's **Root Directory** was unset, so Git builds ran from the repo root and died with `Couldn't find any 'pages' or 'app' directory`. Fixed by setting **Project Settings → Build and Deployment → Root Directory** to `web`. Note this cannot be set from the CLI — `vercel project update` has no such flag.

## Project documents

- **[Sunflora_Founding_Document.md](Sunflora_Founding_Document.md)** — why Sunflora exists, who it's for, what's a proven fact vs. an unproven hypothesis, and the pricing/positioning logic behind it.
- **[Market_Research.md](Market_Research.md)** — competitor landscape and market context.
- **[Website_Build_Prompt.md](Website_Build_Prompt.md)** — the original brief the site's first version was built from. Kept for historical context; `web/lib/site.ts` overrides it wherever the two disagree.
