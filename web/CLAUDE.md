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

**Only ever run one `next` process against this folder at a time.** `next dev` and `next build` both own `.next` exclusively, and a second process of either kind corrupts the first. Two `next dev` instances (e.g. two editor windows or two Claude Code sessions in the same repo, the second silently falling back to port 3001) delete each other's manifests — the symptom is `ENOENT: .next\server\app-paths-manifest.json`, a 500, then the server exiting, and the still-open browser tab renders as raw unstyled HTML. Before starting a dev server, check nothing is already serving: `Get-NetTCPConnection -State Listen -LocalPort 3000,3001,3002`. If something is, use it rather than starting another.

**Never run `npm run build` while `npm run dev` is running.** Both write `.next`. The build overwrites the dev server's chunks underneath it, and the already-open page then requests CSS/JS URLs that no longer exist — the site renders as raw unstyled HTML and looks catastrophically broken while every source file is fine. Recovery: stop every Node process (on Windows `pkill` from Git Bash often misses them — use `Get-NetTCPConnection -LocalPort 3000 | Stop-Process -Id $_.OwningProcess -Force`, and check the dev server didn't silently fall back to port 3001/3002), `rm -rf .next`, restart. To test a production build, stop the dev server first.

**The CSP in `next.config.mjs` needs `'unsafe-eval'` in development.** Next's dev bundler wraps modules in `eval()` for HMR, so a policy without it blocks *all* client JavaScript on `next dev`: styled-jsx never injects its `<style>` tags and GSAP never runs. The page then renders unstyled, and — because `.img-cover` is `position:absolute; inset:0` — any thumbnail whose `position:relative` parent came from styled-jsx escapes and stretches over the whole page. This was silently true from the CSP's introduction until 2026-08-27; production was always fine (no `eval`), which is why nobody noticed. `scriptSrc` in `next.config.mjs` is now branched on `NODE_ENV`; keep the production policy strict.

### Deploying

Deploys go to the Vercel project `edupath/sunflora`. The canonical production URL is **www.sunflora.shop** — prefer it over the `*.vercel.app` aliases in anything user-facing, and never use the `sunflora-edupath*.vercel.app` ones, which expose the account/team name.

**Pushing to `main` deploys to production**; pushing any other branch produces a preview deploy. The project's Root Directory is set to `web`, which is what lets the Git integration find this app. (Before 2026-08-01 that setting was unset and *every* Git-triggered build failed with `Couldn't find any 'pages' or 'app' directory` — if Git deploys ever start failing that way again, check this setting first. It can only be changed in the dashboard; `vercel project update` has no flag for it.)

To deploy manually — useful for uncommitted work, and it keeps binary assets out of a model's context window:

```
npx vercel link --yes --project sunflora --scope edupath   # one-time per checkout
npx vercel --prod --yes
```

Run those from the **repo root**, not from `web/`. Vercel applies the `web` root directory itself, so invoking the CLI inside `web/` makes it look for `web/web/`.

## Repo layout

This `web/` directory is the only codebase — the parent folder (`c:\Sunflora`) is not a git repo and holds planning/reference material only, not code:

- `../Sunflora_Founding_Document.md` — brand founding doc (positioning, story, offer).
- `../Market_Research.md` — market/competitor research.
- `../Website_Build_Prompt.md` — the original brief the site was built from; useful for *why* a page/section exists, but `lib/site.ts` (below) is the current source of truth for content, not this file.
- `../brand-assets/` — raw source photos staged before being cropped/optimized into `public/assets/`. Dropping a file here does nothing for the live site — it must be manually optimized, renamed, and wired into `lib/site.ts`. Currently holds 18 older unprocessed WhatsApp-export photos (future product material, not yet assigned), 8 photos from the 2026-08-01 drop (7 of which are now wired in as `lotus-asaan-*`, `lotus-decorative-latkan-1`, `flower-mala-*`, `lotus-latkan-flatlay`), plus `sunflora-logo-new.png` — a higher-res logo pulled from a design-handoff export that is **not yet wired into `lib/site.ts` or `app/layout.tsx`**; the site still uses the older `sunflora-logo.jpg`/`logo-2.jpeg` in `public/assets/`. Swap it in only after the founder confirms it's the intended replacement.

Removed as of 2026-07-23 (superseded/duplicate, safe to recreate from git history if ever needed): `index_2.html` (an old standalone static-HTML prototype, fully superseded by this Next.js app), `Four hero design directions for florist.zip` (a design-handoff archive whose contents duplicated files already in `public/assets/`, except for `sunflora-logo-new.png` which was extracted into `brand-assets/` first), and ~8 `brand-assets/` files that were exact-name or malformed-extension duplicates of files already in `public/assets/`.

## Architecture

This is a single Next.js 15 (App Router) + React 19 codebase serving **one responsive site**, not separate desktop/mobile builds. Every component renders both layouts and switches between them purely via CSS media queries (breakpoint: `768px` in most components, `640px`/`1000px` in a couple of grid-specific spots) — there is no device-detection branching in JS. When asked to change "the mobile version" or "the desktop version" of something, edit the same component's `@media` block, not a separate file.

### Data layer: `lib/site.ts`

Single source of truth for product content — brand copy, design tokens (`C`), Instagram DM helpers (`igDm`, `igProfile`, `igAt`), the `products` record, and the `catalogProducts` list. Product pages, the sitemap, JSON-LD metadata, and the current catalogue all read from this file.

Adding a product means adding its record to `products` and adding that record to `catalogProducts` in the right category. A product added only to `products` has a working detail page and sitemap entry but does not appear in the visible catalogue. `components/ProductsSection.tsx` is a legacy, currently unused component; do not use it as the source of homepage behaviour.

`navProducts` at the bottom of the file is currently **dead code** — nothing imports it. Header and Footer link only Home / Menu / Contact us. Keep it in sync anyway or delete it deliberately; don't assume editing it changes the nav.

Two things in this file are intentionally unusual and must not be "corrected":
- `IG_HANDLE = 'sunflora.craftilicious.ful'` — updated to the new Instagram handle (changed from the old `sunflora_offical`).
- Prices reading `'DM for price'` with a `// TODO(founder)` comment — leave as-is until a real price is supplied; don't invent one.

### Instagram links: `components/IgLink.tsx`

Every "DM us" / "@sunflora…" link goes through `IgLink` (or `useInstagramLink`, for a component that renders its own `<a>` — `HeroScene`'s hotspots). Do not hand-roll `<a href={igDm} target="_blank">` again; that is what was broken.

The whole point is getting a phone to open the **app**. Instagram's web serves a login wall to logged-out visitors for both the profile and the DM composer, so a link that reaches the browser has already failed. Three separate things were stopping the hand-off:

- **`target="_blank"`.** iOS matches a Universal Link on a top-level, user-initiated navigation; opened into a new tab it frequently just loads in Safari. So on a touch device `IgLink` navigates the page itself. Desktop keeps the new tab — there is no app to hand off to there, and losing the shop's own tab is worse than a login wall.
- **In-app browsers.** Most traffic here arrives from the link in the Instagram bio, which opens in Instagram's own webview — and **a webview never fires a Universal Link or an Android App Link**, whatever the URL is. The only thing that escapes is the app's own `instagram://` scheme, so that is what is used there, with a 1.2s fallback to the web URL that is cancelled on `visibilitychange`/`pagehide` (i.e. when the app actually took over, so a returning visitor isn't dragged to a login page).
- **Redirects.** The OS matches the URL that was *tapped*; once the browser is following a redirect chain the app never gets a look. `instagram.com/<handle>` 301s, so `igProfile` is the canonical `www.instagram.com/<handle>/`. **`igDm` deliberately stays `ig.me/m/<handle>` even though it also redirects** — ig.me is Meta's own documented messaging deep link and the app claims it on both platforms, so the redirect is only ever followed when there is no app to hand off to.

`IgLink` composes a caller's `onClick` rather than replacing it — the product cards pass `stopPropagation` to suppress the whole-card navigation, and spreading props over the link would silently drop the deep-link behaviour.

None of this helps a phone with no Instagram app, or a signed-out desktop visitor. That login wall is Instagram's, not ours.

### Routing

- `app/page.tsx` — the landing page (hero, products grid, why-Sunflora, how-it-works). "Menu" in nav scrolls to `/#products` on this page rather than routing elsewhere.
- `app/products/[slug]/page.tsx` — generic product detail template, driven entirely by `lib/site.ts`. It excludes the five collection slugs in `CUSTOM_ROUTES`, which have client-side variant state and their own routes.
- `app/products/bouquets/page.tsx` — dedicated route rendering `<BouquetDetail />`, which wraps `<ProductDetail>` with colourway toggle state (`bouquetVariants.burgundy` / `.purple` from `lib/site.ts`).
- `app/products/flower-mala/page.tsx` — dedicated route rendering `<MalaDetail />`, same wrapping pattern with `malaVariants.braided` / `.cluster`. Unlike the bouquet colourways, the two mala styles have **different prices**, so `MalaDetail` swaps `price`/`priceRange` into the product object alongside the images. `ProductDetail` needed no change — it renders whatever `product.price` it is handed. The `products['flower-mala']` entry keeps a spanning `₹150–200` / `{low:150,high:200}` so the JSON-LD `AggregateOffer` and the homepage card stay honest across both styles.
- `app/contact/page.tsx` — single dedicated Contact page with one DM CTA.
- Dynamic route `params` is a `Promise` (Next.js 15) — always `await params` in both the page and `generateMetadata`.

### Styling

Two approaches coexist by necessity, not preference:
- `styled-jsx` (`<style jsx>{...}`) inline in most components — requires the component (or an ancestor) to be a Client Component (`'use client'`). Cannot be used in a file that also exports `generateMetadata` (a Server Component export) — that's why `page.css`, `ProductDetail.css`, and `contact.css` exist as plain imported stylesheets instead.
- Plain `.css` files imported normally, used specifically where `generateMetadata` lives alongside the page.

Layout width is capped via `.site-shell`/`.hp-page { max-width: 1440px; margin: 0 auto }` in `globals.css`/`page.css` — this was deliberately widened from an earlier 1180px value that looked fine on a design mockup but produced excessive side margins on ordinary monitors.

`position: sticky` (used by `Header.tsx`'s `.site-header`) requires its containing block to be full page height. `Header` therefore returns a React Fragment (`<>...</>`), **not** a wrapping `<div>` — a wrapper div only as tall as the header breaks sticky positioning almost immediately on scroll. Don't reintroduce a wrapper element around the header's sticky part.

### Hero scene: `components/HeroScene.tsx` + `scripts/build_hero.py`

The homepage hero is a composite: one backdrop plate (`brand-assets/hero/plate-v3.jpg`, an AI-generated empty room the founder supplies) with twelve real product cut-outs positioned over it, each a link.

The plate is only 1376×768 — a quarter of v2 — so all geometry is kept in a **5504×3072 virtual space** (`PW`/`PH`), measured values multiplied by `PLATE_SCALE`. Cut-outs are generated at that virtual resolution and only downscaled by `EXPORT_SCALE` (0.6) on save; shipping them at full virtual size made the hero 3.3MB. Layout is unaffected because every size is a percentage. `local_exposure` divides back down to sample the plate in its own pixel space.

**Do not hand-edit `lib/heroScene.ts` or the files in `public/assets/hero/`.** Both are generated. `scripts/build_hero.py` (run from the repo root) cuts, grades, scales and positions every piece, then emits the geometry as TypeScript. Editing the outputs means the next run silently reverts you. To change the scene — add a product, move something, resize — edit the `SCENE` list in that script and re-run it, then `scripts/preview_hero.py` to check the result as a flat image before looking at it in the browser.

Cut-outs are made with `rembg` using the **birefnet-general** model (`pip install rembg onnxruntime`). It is far better than isnet or u2net on these photos — it was the difference between the asaan keeping its leaves and losing half of them. It needs ~600MB RAM and ~4 min per image, so run one process at a time; two concurrent sessions OOM with `bad allocation`.

Four things in that script are load-bearing and look like fussiness until you remove one:

- **Cut-outs with soft alpha save `lossless=True`.** Lossy WebP leaves 1–7 alpha noise across the whole bounding box; with rembg's leftover light RGB under it, that composites as a pale rectangle around every product. A piece that is *fully opaque* has no alpha to corrupt and ships as ordinary lossy WebP — for the photo frame that is 48KB instead of 963KB.
- **Alpha is binarised and eroded 1px, not just thresholded.** rembg returns a partial-alpha halo where the product met its own backdrop (the white table under the asaan and the frames). Left in, it is the most obvious "this is a PNG" tell in the scene.
- **Shadow canvases are padded by 3× their blur radius**, in `preview_hero.py` and conceptually in the CSS. A Gaussian with no headroom clips at the canvas edge and a shadow that should trace the product's outline composites as a dark rectangle beside it. This bit us twice — once on the cast shadow, once on the contact shadow.
- **Each piece is dimmed to the plate's own luminance where it lands** (`local_exposure`). Half the wall is inside the window's cast shadow; a piece hung there but lit as if in full sun reads as pasted no matter how clean its edge is.

The light in the plate comes from the window on the **far left**, and every shadow in it falls right and slightly down (measured off the brass hooks' own shadows: +145px across for +15px down). Every shadow in `build_hero.py`, `preview_hero.py` and the `.hs-*` CSS matches that direction. **If the plate is ever regenerated with the window somewhere else, all of them have to move with it** or the scene goes straight back to looking pasted.

Sizes are not arbitrary percentages — each piece is sized from its real dimension (from `lib/site.ts` where the product states one). True scale is impossible in one frame: the products span 10:1 (a 5 ft latkan against a 15 cm asaan) but the plate's furniture is drawn ~4× oversized for them, so a literal asaan lands at 119px on a 1168px plinth. Sizes therefore run through a compression curve that keeps the ORDER and the visible differences while pulling the spread to about 4:1. `TABLE_BOOST` is not a fudge — the table genuinely is nearer the camera than the wall.

Placement rules that are easy to break and obvious once broken:

- **Both display surfaces are seen nearly edge-on, so their top faces are far shallower than they look.** In virtual px the plinth's top face is only y 2512–2640 and the riser's only y 2520–2600 — about 80–130px deep, not the ~200 you'd guess from the render. A `base` well below the front edge sinks the piece into the surface's front *face* and it reads as hovering in front of it; well above the back edge and it hovers behind. Measure the surface before moving anything onto it, don't estimate from a downscaled crop — that mistake put the asaan, the bouquet and the mini frame all in the wrong place at once.
- A piece wider than its surface's projected depth (the asaan is 741px wide on 80px of top face) **should sit just past the front edge and drape over it**, which is what a real flower on a narrow ledge does. Trying to tuck it fully onto the face makes it float.
- Keep a resting piece's full width inside its surface horizontally (plinth x 1736–2908, riser x 3232–4712).
- **A resting piece's TOP is a placement constraint, not just its base.** Six garlands hang above the table and their lowest blooms come down to y 1531–2463. A piece tall enough to reach one of them cuts the bloom in half, which reads as damage rather than as depth — a bloom sitting just *above* a piece reads correctly, and so does a chain disappearing behind it. This is what caps the three bouquets at `cm=26`: their cut-outs run the full height of the wrap, collar to hem, where the older ones were cropped at the collar and so drew shorter for the same real object. Raising a bouquet onto the plinth or riser costs ~260px of that headroom, which is why the third one stands on the table instead.
- Only one garland (the 5 ft Lotus Latkan) is long enough to reach the table zone, so it takes the one hook with clear table beneath it — the far-right one. The CSS gives `.hs-item--rest` a higher `z-index` than `.hs-item--hang` so a garland correctly passes *behind* anything standing on the table.
- `kind='duo'` covers a set-of-2 product where only one strand was ever photographed: it hangs the same strand on both prongs, mirroring the right copy so the pair doesn't read as one image pasted twice. Four of the six garlands are built this way — the Purple, Orange, Maroon and Pink Lotus Latkans — because each was shot lying on a sofa or hanging on a door rather than as a pair. birefnet finds nothing in the full room, so each strand is straightened, cropped to a strip and upscaled before matting. A strip that tall (8:1 or worse) cannot go through birefnet whole: thumbnailed to the model's working size the pearl chain is a few pixels wide and vanishes. Matte it as a row of overlapping near-square tiles with cross-faded alpha instead — and expect two artefacts from doing so, a background slab that each tile confidently keeps (drop every component the strand's own top-row component doesn't reach) and a chain that drops out at a tile seam (refill those rows from the alpha profile either side, which the RGB survives intact for).

`.hs-swing` owns `transform` for the pendulum keyframes, so the hover pop lives on its own `.hs-pop` element. Putting both on one element makes them overwrite each other and the piece stops moving the moment you touch it.

In the CSS, `.hs-scene` carries the plate's exact aspect ratio and holds both the plate and the hotspots, so they crop together. Do not go back to `object-fit: cover` on the plate with percentage-positioned hotspots: at any width where the two ratios disagree the plate crops, the painted hooks slide, and the garlands detach from them.

The mobile rule is counter-intuitive: a phone shows a slice of the 1.79:1 scene, and the slice's **width** is set by `.hs-stage`'s aspect ratio. The scene is sized by height, so a *taller* stage makes it wider and therefore shows *less* of it. The products span 16.8%–96.6% of the scene, which needs at least 1.44:1; the stage is `3 / 2` with `translateX(-58%)` to centre the crop on the products rather than the plate. Making the mobile hero taller silently crops products off both ends — verify with the visibility check rather than by eye.

### Animation: `components/ScrollReveal.tsx`

Mounted once per page. Uses GSAP + `@gsap/react`'s `useGSAP` hook + `ScrollTrigger.batch()` to fade/slide in every `[data-reveal]` element as it scrolls into view (staggered per batch), plus a fixed scroll-progress bar. The reveal tween **must** keep `clearProps: 'transform'` in its `onEnter` callback — GSAP's inline `transform` style otherwise permanently overrides any CSS `:hover` rule on the same element (inline style beats stylesheet regardless of specificity), silently killing hover animations like the product-card lift-on-hover effect.

### Product cards (`components/ProductCatalogGrid.tsx`, `components/ProductDetail.tsx`)

Whole-card click-through to the product page is implemented via `useRouter().push()` on the card's `onClick`, with nested interactive elements (the "DM to order" link) calling `e.stopPropagation()` so they don't also trigger the card navigation. When adding a new clickable nested element inside a `.pcard`/`.ccard`, remember to stop propagation on it.

The current catalogue is data-driven from `catalogProducts` and supports category filtering and price/discount sorting. Keep its product order intentional: it determines the default browsing order on both the homepage and `/products`.

### Images

All product photography lives in `public/assets/` and is referenced by path in `lib/site.ts`. Filenames don't describe content (`frame-1.jpeg` through `frame-6.jpeg`, `wa-1.jpeg` through `wa-4.jpeg`) — they're carried over from the original WhatsApp export naming. `wa-1.jpeg` exists on disk but is intentionally unreferenced anywhere in code (it's a promotional poster with baked-in sale text, not a clean product photo) — don't wire it into a product's `images` array without checking with the founder first.
