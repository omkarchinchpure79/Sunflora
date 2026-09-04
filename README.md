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

The live catalogue is defined in [`web/lib/site.ts`](web/lib/site.ts). It currently contains 26 catalogued items across Ganpati malas, everlasting bouquets, single flowers, festive latkans, keepsake frames, and lotus asaans. Pricing, photography, page copy, structured data, related products, and category filtering all come from that file.

Five collection pages have a client-side colour or style selector and therefore use dedicated routes: bouquets, flower malas, Ganpati special malas, 5 ft door latkans, and 2 ft multipurpose latkans. All other products use the generic `/products/[slug]` template.

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
    │   ├── ProductCatalogGrid.tsx — filterable, sortable catalogue used on the home and products pages
    │   ├── ProductDetail.tsx      — shared product detail layout (+ ProductDetail.css)
    │   ├── ProductGallery.tsx     — image gallery/carousel on product pages
    │   ├── *Detail.tsx            — five small wrappers that add variant-selection state to ProductDetail
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
- **Content model:** `web/lib/site.ts` is the source of truth for product copy, design tokens, the free-shipping threshold, Instagram DM helper links, and product data. Product pages, the sitemap, SEO/JSON-LD metadata, and the filterable catalogue all derive from it. Add a new product to both `products` and `catalogProducts` in that file.
- **Styling:** a mix of `styled-jsx` (inline `<style jsx>`, requires a Client Component) and plain imported `.css` files (used specifically on pages that also export `generateMetadata`, since that's a Server Component export and can't coexist with `styled-jsx`).
- **Animation:** GSAP + `@gsap/react`'s `useGSAP` hook drives scroll-triggered reveal animations, mounted once via `ScrollReveal.tsx`.
- **No cart/checkout:** ordering happens entirely through Instagram DM — every "DM to order" button links to `igDm` from `lib/site.ts`.

For the full architectural detail, styling gotchas, and things that look like bugs but aren't (why `Header` returns a Fragment, why the reveal animation needs `clearProps: 'transform'`, why prices reading "DM for price" must not be invented), see **[web/CLAUDE.md](web/CLAUDE.md)**.

## Adding a product

1. **`web/lib/site.ts`** — add the product record to `products`, then add it to `catalogProducts` in the appropriate category. This gives it a product page, sitemap entry, JSON-LD, cross-sell eligibility, and a card in both the homepage and `/products` catalogue.
2. **Use a dedicated route only when needed.** Products with a colour/style picker use a small client component that passes the selected variation into `ProductDetail`. Otherwise, the generic `/products/[slug]` page is enough.

Then `cd web && npm run build` to typecheck and verify the production build.

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
