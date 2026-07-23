# Sunflora — Website Build Prompt (for Claude / a design-AI)

> **How to use this file:** Paste everything below the line into the design tool as your instructions. **Attach two things alongside it:** (1) `Sunflora_Founding_Document.md`, and (2) the brand image files (the logo + the 4 bouquet photos). Fill in the four bracketed placeholders in §14 (WhatsApp number, exact prices, etc.) before or after — they're clearly marked.

---

## ROLE

You are a senior product designer *and* front-end engineer building a small, **production-quality** website for a real handmade gifting brand called **Sunflora**. You care about spacing, typography, motion, and "feel" — and you write clean, semantic, working code. You are explicitly **not** making a generic AI-template website. Read the attached `Sunflora_Founding_Document.md` in full before you write a single line — it defines the customer, the positioning, the pricing logic, and the tone. Everything you build must be traceable back to it.

---

## 1. THE TASK (in one paragraph)

Build a **warm, personal, premium-feeling website** for Sunflora — a solo-founder brand that turns a customer's own photo into a **handmade 3D pipe-cleaner-flower photo frame** (the hero product), and also sells handmade flower bouquets that never wilt. This is a **showcase + lead-generation site, not a shopping-cart store.** There is no online checkout and no payment on the site. **Every "buy / order" action opens WhatsApp with a pre-filled message to the founder** (mechanics in §8). The whole site must feel like it was made by a person who cares, for a person they care about — the opposite of a mass-produced gift portal.

---

## 2. BEFORE YOU DESIGN — MANDATORY RESEARCH PHASE

Do **not** skip this. Do not start from a template in your head. First, study how real sites in this exact niche are actually built, at the code level:

1. **Inspect real competitor and reference sites — read their actual structure, not just the visuals.** Open each, view the rendered page, and where possible inspect the **HTML structure, CSS layout system (grid/flex, spacing scale, type scale), and any JS interaction** (mobile menu, sliders, WhatsApp deep-links, product filtering). Note *how* they build a section, not just that they have one. Suggested starting points:
   - `lovingcrafts.in` — an established Indian handmade-gift store with *"Miniature Frames"* and a *"Crochet Collection"* as categories. Study its section order, category tiles, product-card anatomy, trust strip, and review layout. **This is the bigger competitor Sunflora is differentiating *against* — learn its structure, then do the opposite on personalization.**
   - Etsy listings for **"pipe cleaner flower bouquet"** (search that phrase) — study how they photograph, title, and describe the product; note the recurring emotional line *"never wilt, just like love and cherished memories that last forever,"* the "priced by number of flowers" model, and the "free message card" upsell.
   - 1–2 **premium single-product / DTC craft brands** (your choice) — study the hero → showcase → story → proof → CTA skeleton and how they handle sticky CTAs and mobile tap targets.
2. **Extract the reusable patterns** worth borrowing: section ordering, product-card structure, how a WhatsApp/DM CTA is wired, mobile nav behavior, how trust is built *without* a huge review count.
3. **Extract the anti-patterns to avoid** (see §13): fake reviews, dead cart/wishlist icons, discount-theatre ("40% OFF" on invented "regular" prices), generic stock language.
4. **Then, and only then, design.** Your output should reflect that you understood how these sites *function*, not just how they look.

---

## 3. THE BRAND IN ONE SCREEN (essentials — full detail in the attached doc)

- **Name:** Sunflora. **Instagram:** @sunflora_official. Pre-launch, solo founder, made-to-order by hand.
- **Hero product:** a **personalized 3D flower photo frame** — the customer sends their own photo; it's framed in hand-shaped pipe-cleaner (craft-wire) flowers. One-of-one. *(Note: real frame photos don't exist yet — handle per §9.)*
- **Also sells:** handmade **flower bouquets** that never wilt, and a cheaper **mini frame** entry product.
- **Customer:** young people, **18–30**, buying a **romantic or heartfelt gift** (partner, best friend, "saw this and thought of you"). Instagram-native. They photograph and share gifts they love — so the site and packaging must be *screenshot-worthy*.
- **The core promise / USP:** **"Turn your favourite photo into a handmade flower frame that never fades — a memory you can keep forever."** Lead with **memory / one-of-one** (the part no factory can copy); "never fades" is the *supporting* reassurance, never the headline. **This ordering is deliberate — do not flip it.**
- **Payment rule (reflect honestly in copy):** every piece is custom-built around a stranger's photo, so **orders are confirmed with payment upfront** (UPI/GPay). No COD. Say this plainly and warmly, framed as "how custom orders work," not as a warning.
- **Tone:** warm, personal, heartfelt, a little hand-lettered. Never corporate, never "craft-stall clip-art," never salesy.

---

## 4. POSITIONING — WHAT TO LEAD WITH (grounded in real research)

- **Lead with the memory, not the material.** Competitors have already saturated "everlasting / never wilts." Sunflora's uncopyable edge is *your specific photo, framed in flowers made by hand for you and no one else.* The homepage's first screen must land that in ~3 seconds.
- **Turn "small & new" into a strength, not a weakness.** Do **not** fake scale. Lean into: *made one at a time by one pair of hands, a limited number of founding orders, slow on purpose.* Scarcity + honesty reads as premium and trustworthy for a new brand — the opposite of a review-count arms race it can't win.
- **Build trust without a review wall.** Since there are no customer reviews yet, earn trust with: the founder's own voice/story, honest process ("how it's made" / "how ordering works"), clear packaging-and-delivery care, and a real human on the other end of WhatsApp. **Never invent reviews, ratings, or "10,000 happy customers."**

---

## 5. SITE ARCHITECTURE — PAGES TO BUILD

Build **one landing page + three product detail pages** (four pages total), sharing one header, footer, and design system.

| Page | Purpose |
|---|---|
| **`index.html` — Landing page** | The main story + overview of all three products. Most visitors land and convert here. |
| **`frame.html` — Signature Frame (hero product)** | Deep-dive on the personalized photo frame. The most important product page. |
| **`mini-frame.html` — Mini Frame** | The affordable "try me" entry product. |
| **`bouquet.html` — Bouquet** | The everlasting handmade flower bouquet. Uses the real photos. |

Header nav is minimal: **Home · Frames · Bouquets · Order on WhatsApp**. No cart, no login, no wishlist, no search (those are dead icons on a made-to-order brand — omit them entirely).

---

## 6. LANDING PAGE — SECTION BY SECTION (in depth)

Build these sections in this order. Each must earn its place (orient, build desire, or reduce uncertainty).

1. **Slim top bar (optional):** one warm line, e.g. *"Handmade to order · A limited number of founding orders open now."* No fake urgency timers.

2. **Header / nav:** logo (use the provided seal logo), the minimal nav from §5, and a small persistent **"Order on WhatsApp"** button. On mobile, collapse to a hamburger; the WhatsApp button stays visible.

3. **Hero (above the fold):** the single most important screen.
   - **Headline** leads with memory/one-of-one — e.g. *"Turn your favourite photo into a flower that never fades."* (Refine the wording; keep the meaning.)
   - **Sub-line:** one sentence on what it is and why it's different (a handmade frame built around *your* photo — a memory made physical).
   - **Primary CTA:** "Design yours on WhatsApp" (→ §8). **Secondary CTA:** "See the frames" (scrolls to products).
   - **Visual:** the frame is the hero, but **no real frame photo exists yet** — so use a tasteful, clearly-intentional placeholder treatment (an elegant framed-photo mockup / illustrated frame silhouette with soft floral accents), **not** a broken image and **not** a fake stock photo. A subtle "founding sample coming soon" caption is acceptable and honest. (See §9.)
   - One small honesty/scarcity note: *"Made one at a time — a few founding slots open."*

4. **The three products (product ladder):** three cards — **Signature Frame** (badge it as the hero/"most loved-to-give"), **Mini Frame** ("try me"), **Bouquet** ("everlasting"). Each card: photo/placeholder, name, one-line desc, **placeholder price** (see §14), and a link to its detail page + a WhatsApp CTA. Use the **real bouquet photos** on the bouquet card. Frame cards use placeholder treatment.

5. **Why Sunflora (the USP, 3 points):** (a) **Made for one person only** — built around *your* photo, can't exist for anyone else; (b) **Never fades** — real flowers die in two days, these don't; (c) **Actually handmade** — shaped by hand from craft wire, one order at a time. Lead visual weight on (a).

6. **The story / founder's heart:** a short, warm first-person passage on why Sunflora exists (a gift shop sells you a frame; Sunflora makes you *your* memory). Include space for a founder/process photo. This section *is* the trust-builder — write it like a person, not a brand.

7. **How it works (4 steps):** Message us → Send your photo → Pay to confirm (custom-made, so upfront — say it warmly) → We make it & ship it, carefully packed. This section quietly handles the "is this legit / how do I actually buy" objection.

8. **Care & delivery / trust — earned, not faked:** honest reassurances only: *sturdy protective packaging, pan-India courier (Delhivery), your photo is used only for your order and never posted without asking.* **No invented review counts or star ratings.** A single honest founder line beats a wall of fake testimonials.

9. **Final CTA band:** big, warm closing prompt — *"Have someone in mind? Tell us who it's for."* → primary WhatsApp CTA + Instagram link.

10. **Footer:** logo, tagline (*"a memory you can keep forever"* — the retired *"Craftilicious"* tagline must **not** appear), nav links, Instagram (@sunflora_official), WhatsApp, "Ships pan-India," and a one-line photo-privacy note. Small, tasteful, no fake "© 1M customers" claims.

---

## 7. PRODUCT DETAIL PAGE — TEMPLATE (used by all three product pages)

Each product page shares one template, differing in content/photos:

1. **Header/nav** (shared) with the persistent WhatsApp button.
2. **Product hero:** large image/gallery on one side (real photos for the bouquet; placeholder treatment for frames), product name, one-line hook, **placeholder price**, and a prominent **"Order this on WhatsApp"** CTA (pre-filled with *this specific product's name* — see §8).
3. **What makes it special:** 3–4 short benefit lines specific to that product (for the Signature Frame, hammer the one-of-one/your-photo angle; for the bouquet, everlasting + gift-ready; for the mini frame, affordable first gift / "try me").
4. **Details strip:** honest specs — made-to-order, rough size, materials (pipe-cleaner / craft wire), time to make, "your photo required for frames." Keep it real and simple.
5. **How ordering works (condensed 4 steps)** + the upfront-payment note, warmly framed.
6. **Cross-sell row:** "You might also love" → the other two products.
7. **Final WhatsApp CTA + footer** (shared).

Keep each product page focused: one product, one clear path to WhatsApp, repeated CTA after the benefits build desire.

---

## 8. THE ONE CALL-TO-ACTION: WHATSAPP (exact mechanics)

**Every order/buy/CTA button on the entire site does exactly one thing: open a WhatsApp chat with the founder, with a friendly message pre-filled.** No forms that email, no cart, no checkout, no payment gateway. Simple and professional.

- Use the WhatsApp deep-link (works on mobile app + WhatsApp Web on desktop):
  `https://wa.me/<WHATSAPP_NUMBER>?text=<url-encoded message>`
  where `<WHATSAPP_NUMBER>` is country code + number, **no `+`, spaces, or dashes** (e.g. `9198XXXXXXXX`).
- **Pre-fill a context-specific message per button:**
  - Generic/hero CTA → `Hi Sunflora! I'd love to design a personalised flower frame. 🌸`
  - Signature Frame page → `Hi Sunflora! I'm interested in the Signature Photo Frame. 🌸`
  - Mini Frame page → `Hi Sunflora! I'm interested in the Mini Frame.`
  - Bouquet page → `Hi Sunflora! I'm interested in a handmade Bouquet. 💐`
- Put the number in **one clearly-labelled constant/variable** at the top of the code so the founder can change it in one place.
- Also expose the founder's **Instagram (@sunflora_official)** as a secondary contact everywhere the WhatsApp CTA appears.
- Buttons must be real anchors (`<a href>`), open WhatsApp reliably, and have **44px+ tap targets** on mobile. The primary WhatsApp button should feel like *the_* obvious next step on every screen (sticky/persistent is good on mobile).

---

## 9. ASSETS & IMAGES (what exists, what's a placeholder)

- **Provided (attach these files):** the **Sunflora logo/seal**, and **4 real bouquet photos** (burgundy/white bouquet + purple bouquet, in premium wrapping). These are professionally styled — use them prominently for the **bouquet** card and bouquet page, and for general floral warmth.
- **Missing — the hero frame has NO real photo yet.** For all frame imagery (Signature Frame + Mini Frame): use an **intentional, elegant placeholder** — a clean framed-photo mockup, an illustrated/SVG frame-with-flowers silhouette, or a soft "founding sample coming soon" card. It must look **deliberately designed**, never like a broken/missing image, and never a misleading stock photo pretending to be the product.
- **Floral motifs:** incorporate tasteful **hand-drawn / line-art flower accents** (SVG) as a recurring brand motif — section dividers, corner flourishes, hover details. Keep them refined and sparse, not clip-art-heavy. This is part of making it feel handmade and *not* generic-AI.
- Optimize/compress images; use `alt` text on every image; lazy-load below-the-fold images.

---

## 10. VISUAL / ART DIRECTION (professional, floral, NOT generic AI)

- **Feel:** warm, editorial, handmade-premium. Think a thoughtful indie gifting brand, not a marketplace. Commit to a clear point of view — restraint and refinement over effects for their own sake.
- **Palette:** warm cream/paper base, a soft botanical accent (sage/rose/clay/gold family), deep readable ink for text. Avoid the AI-slop tells: no purple-on-white gradients, no cold corporate blue, no neon.
- **Typography:** pick **characterful** fonts — a refined display serif for headings (e.g. Playfair Display / Fraunces / Cormorant), a clean humanist sans for body (e.g. Poppins / Work Sans), and *optionally* one hand-script accent used sparingly for warmth. **Do not** use Inter, Roboto, Arial, or system defaults for display.
- **Layout:** generous whitespace, real visual hierarchy, occasional asymmetry or gentle overlap — not a stack of identical centered boxes. Use a consistent spacing and type scale (define CSS variables).
- **Motion:** tasteful and few — one well-orchestrated load reveal, soft hover lifts on cards, smooth scroll. Respect `prefers-reduced-motion`. No gratuitous animation.
- **Details that sell "handmade":** subtle paper grain/texture, soft botanical shadows, the SVG floral flourishes, rounded-but-refined cards. Depth and atmosphere, never flat gray boxes.

---

## 11. COPYWRITING RULES

- Write like the founder talking to a friend: warm, specific, heartfelt. Short sentences. Real emotion, no filler adjectives.
- **Lead every key moment with the memory/photo angle**, "never fades" second.
- Be **honest about being new** — "founding orders," "made one at a time." Never claim scale, awards, or customer counts you don't have.
- **Never write fake reviews, testimonials, ratings, or "as seen in."**
- Retire *"Craftilicious"* entirely. Preferred tagline direction: *"a memory you can keep forever"* / *"memories that never fade."*
- Indian context: rupees (₹), pan-India shipping, UPI/GPay language where payment is mentioned.

---

## 12. TECHNICAL REQUIREMENTS

- **Stack:** clean, dependency-light. Semantic HTML5 + modern CSS (Flexbox/Grid, CSS custom properties) + minimal vanilla JS (mobile menu, small interactions, building the WhatsApp links). No heavy frameworks needed. Google Fonts is fine.
- **Fully responsive**, mobile-first (this audience is on phones via Instagram). Test 360px → desktop. 44px+ tap targets. No horizontal scroll.
- **Fast:** compressed images, lazy-loading, minimal JS, no layout shift.
- **Accessible:** proper heading order, `alt` on images, visible focus states, sufficient contrast, `prefers-reduced-motion` honored.
- **Maintainable:** one place to edit the WhatsApp number, Instagram handle, prices, and product info (a clearly-commented config block at the top of the JS or a small data object). The founder is not a strong coder — make edits obvious.
- **Basic SEO/share:** title, meta description, Open Graph tags, and a favicon so shared links look good on WhatsApp/Instagram.

---

## 13. HARD NOs (anti-patterns — do not do these)

- ❌ No shopping cart, checkout, login, wishlist, or search — and **no dead icons** that look clickable but do nothing.
- ❌ **No fake reviews, star ratings, testimonials, or "happy customers" counts.**
- ❌ No discount-theatre (fake struck-through "regular" prices, invented "40% OFF").
- ❌ No stock-photo lies — don't show a photo that pretends to be the actual frame product.
- ❌ No generic AI-template look: no purple/white gradients, no Inter/Roboto, no identical centered card stacks, no lorem-ipsum energy.
- ❌ Don't use the retired "Craftilicious" tagline or call the products "crochet" (they're **pipe-cleaner / craft-wire**).
- ❌ No fake urgency countdown timers.

---

## 14. PLACEHOLDERS TO FILL IN (the founder will supply these — mark them clearly in code)

- **`WHATSAPP_NUMBER`** = `[FOUNDER TO PROVIDE — e.g. 9198XXXXXXXX, country code + number, no + or spaces]`
- **Prices** (use these placeholder ranges now; founder will replace with exact fixed prices):
  - Signature Frame: **~₹900–1,200** (placeholder)
  - Mini Frame: **~₹400–500** (placeholder)
  - Bouquet: **from ~₹549** (placeholder — founder to confirm)
- **Instagram:** @sunflora_official (confirmed).
- **Frame product photos:** none yet — use the placeholder treatment from §9 until the founder supplies real frame photos.

Mark every placeholder in the code with a clear comment (e.g. `/* TODO: founder to update */`) so they're trivial to find and replace.

---

## 15. DELIVERABLE

Deliver clean, commented, working files: `index.html`, `frame.html`, `mini-frame.html`, `bouquet.html`, plus a shared stylesheet and a small JS file (or a shared `<style>`/`<script>` pattern). Everything should run by opening `index.html` in a browser, with the provided images dropped in beside the files. At the top, include a short comment block telling the founder exactly what to edit (WhatsApp number, prices, images). Make it something the founder would be *proud to share the link to* — professional, personal, and unmistakably Sunflora.
