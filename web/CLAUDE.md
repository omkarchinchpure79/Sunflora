# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `web/` (the Next.js app lives here, not the repo root).

```
npm run dev      # start dev server (Next.js App Router, Turbopack off by default)
npm run build    # production build — also the fastest way to typecheck (tsc has no standalone script)
npm run start    # serve the production build locally
npm run lint     # next lint
```

There is no test suite in this repo. There is no `tsc --noEmit` script — use `npm run build` to catch type errors.

### Deploying

Deploys go to the Vercel project `edupath/sunflora` (production alias: `sunflora-iota.vercel.app` — avoid the `sunflora-edupath*.vercel.app` aliases, they expose the account/team name in the URL). Deploy straight from disk with the Vercel CLI so binary assets never have to pass through a model's context window:

```
npx vercel link --yes --project sunflora --scope edupath   # one-time per checkout
npx vercel --prod --yes
```

## Repo layout

This `web/` directory is the only codebase — the parent folder (`c:\Sunflora`) is not a git repo and holds planning/reference material only, not code:

- `../Sunflora_Founding_Document.md` — brand founding doc (positioning, story, offer).
- `../Market_Research.md` — market/competitor research.
- `../Website_Build_Prompt.md` — the original brief the site was built from; useful for *why* a page/section exists, but `lib/site.ts` (below) is the current source of truth for content, not this file.
- `../brand-assets/` — raw source photos staged before being cropped/optimized into `public/assets/`. Dropping a file here does nothing for the live site — it must be manually optimized, renamed, and wired into `lib/site.ts`. Currently holds 18 unprocessed WhatsApp-export photos (future product material, not yet assigned) plus `sunflora-logo-new.png` — a higher-res logo pulled from a design-handoff export that is **not yet wired into `lib/site.ts` or `app/layout.tsx`**; the site still uses the older `sunflora-logo.jpg`/`logo-2.jpeg` in `public/assets/`. Swap it in only after the founder confirms it's the intended replacement.

Removed as of 2026-07-23 (superseded/duplicate, safe to recreate from git history if ever needed): `index_2.html` (an old standalone static-HTML prototype, fully superseded by this Next.js app), `Four hero design directions for florist.zip` (a design-handoff archive whose contents duplicated files already in `public/assets/`, except for `sunflora-logo-new.png` which was extracted into `brand-assets/` first), and ~8 `brand-assets/` files that were exact-name or malformed-extension duplicates of files already in `public/assets/`.

## Architecture

This is a single Next.js 15 (App Router) + React 19 codebase serving **one responsive site**, not separate desktop/mobile builds. Every component renders both layouts and switches between them purely via CSS media queries (breakpoint: `768px` in most components, `640px`/`1000px` in a couple of grid-specific spots) — there is no device-detection branching in JS. When asked to change "the mobile version" or "the desktop version" of something, edit the same component's `@media` block, not a separate file.

### Data layer: `lib/site.ts`

Single source of truth for the whole site — brand copy, design tokens (`C`), Instagram DM helpers (`igDm`, `igProfile`, `igAt`), and the `products` record (keyed by slug: `signature-frame`, `mini-frame`, `bouquets`, `lotus-latkan`). Product detail pages, the landing-page grid, the footer, and JSON-LD metadata all read from this one file — adding/editing a product means editing `products` here, not hunting through components.

Two things in this file are intentionally unusual and must not be "corrected":
- `IG_HANDLE = 'sunflora_offical'` — the misspelling is confirmed by the founder, not a typo.
- Prices reading `'DM for price'` with a `// TODO(founder)` comment — leave as-is until a real price is supplied; don't invent one.

### Routing

- `app/page.tsx` — the landing page (hero, products grid, why-Sunflora, how-it-works). "Menu" in nav scrolls to `/#products` on this page rather than routing elsewhere.
- `app/products/[slug]/page.tsx` — generic product detail template, driven entirely by `lib/site.ts`. Explicitly excludes the `bouquets` slug (see `slugs.filter`) because bouquets need client-side variant state.
- `app/products/bouquets/page.tsx` — dedicated route rendering `<BouquetDetail />`, which wraps `<ProductDetail>` with colourway toggle state (`bouquetVariants.burgundy` / `.purple` from `lib/site.ts`).
- `app/contact/page.tsx` — single dedicated Contact page with one DM CTA.
- Dynamic route `params` is a `Promise` (Next.js 15) — always `await params` in both the page and `generateMetadata`.

### Styling

Two approaches coexist by necessity, not preference:
- `styled-jsx` (`<style jsx>{...}`) inline in most components — requires the component (or an ancestor) to be a Client Component (`'use client'`). Cannot be used in a file that also exports `generateMetadata` (a Server Component export) — that's why `page.css`, `ProductDetail.css`, and `contact.css` exist as plain imported stylesheets instead.
- Plain `.css` files imported normally, used specifically where `generateMetadata` lives alongside the page.

Layout width is capped via `.site-shell`/`.hp-page { max-width: 1440px; margin: 0 auto }` in `globals.css`/`page.css` — this was deliberately widened from an earlier 1180px value that looked fine on a design mockup but produced excessive side margins on ordinary monitors.

`position: sticky` (used by `Header.tsx`'s `.site-header`) requires its containing block to be full page height. `Header` therefore returns a React Fragment (`<>...</>`), **not** a wrapping `<div>` — a wrapper div only as tall as the header breaks sticky positioning almost immediately on scroll. Don't reintroduce a wrapper element around the header's sticky part.

### Animation: `components/ScrollReveal.tsx`

Mounted once per page. Uses GSAP + `@gsap/react`'s `useGSAP` hook + `ScrollTrigger.batch()` to fade/slide in every `[data-reveal]` element as it scrolls into view (staggered per batch), plus a fixed scroll-progress bar. The reveal tween **must** keep `clearProps: 'transform'` in its `onEnter` callback — GSAP's inline `transform` style otherwise permanently overrides any CSS `:hover` rule on the same element (inline style beats stylesheet regardless of specificity), silently killing hover animations like the product-card lift-on-hover effect.

### Product cards (`components/ProductsSection.tsx`, `components/ProductDetail.tsx`)

Whole-card click-through to the product page is implemented via `useRouter().push()` on the card's `onClick`, with nested interactive elements (the "DM to order" link) calling `e.stopPropagation()` so they don't also trigger the card navigation. When adding a new clickable nested element inside a `.pcard`/`.ccard`, remember to stop propagation on it.

The desktop products grid uses a fixed `grid-template-columns: repeat(3, minmax(220px, 1fr))` (not `auto-fit`) — this is intentional so cards wrap in rows of 3 (currently 6 cards → 3+3), not evenly spread across all available columns.

### Images

All product photography lives in `public/assets/` and is referenced by path in `lib/site.ts`. Filenames don't describe content (`frame-1.jpeg` through `frame-6.jpeg`, `wa-1.jpeg` through `wa-4.jpeg`) — they're carried over from the original WhatsApp export naming. `wa-1.jpeg` exists on disk but is intentionally unreferenced anywhere in code (it's a promotional poster with baked-in sale text, not a clean product photo) — don't wire it into a product's `images` array without checking with the founder first.
