/**
 * Single source of truth for the whole site.
 *
 * ⚠️ BEFORE LAUNCH — the founder must confirm these three things:
 *   1. IG_HANDLE  — every "DM to order" button on every page points here.
 *   2. SITE_URL   — used for canonical URLs, sitemap, and Open Graph.
 *   3. Any price still reading "DM for price" (see `products` below).
 */

/** The real Instagram handle, without the "@". */
export const IG_HANDLE = 'sunflora.craftilicious.ful'

/**
 * Production origin, no trailing slash. Overridable via NEXT_PUBLIC_SITE_URL in Vercel.
 * www is the canonical host — the apex sunflora.shop 308-redirects to www.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sunflora.shop'
).replace(/\/$/, '')

/**
 * Opens the Instagram DM composer. `ig.me` is Meta's own documented messaging
 * deep link and the Instagram app claims it on both iOS and Android, so the
 * 302 it serves to `www.instagram.com/m/…` is only ever followed when there is
 * no app to hand off to. Do NOT "simplify" this to the www URL it redirects to.
 */
export const igDm = `https://ig.me/m/${IG_HANDLE}`
/**
 * Opens the Instagram profile. The `www.` and the trailing slash are load-
 * bearing: the bare `instagram.com/<handle>` 301-redirects here, and a phone
 * matches the URL that was TAPPED against the app — once the browser is
 * following a redirect, the app never gets the chance.
 */
export const igProfile = `https://www.instagram.com/${IG_HANDLE}/`
/**
 * The app's own URL scheme. The only thing that escapes an in-app browser
 * (Instagram's link-in-bio webview, where much of this site's traffic lands),
 * because a webview never fires a Universal Link or an Android App Link.
 * See `components/IgLink.tsx`.
 */
export const igAppProfile = `instagram://user?username=${IG_HANDLE}`
/** Display form, e.g. "@sunflora.craftilicious.ful". */
export const igAt = `@${IG_HANDLE}`

/**
 * Order value above which shipping is free. Single source of truth — it appears
 * in the announcement bar (full + short forms) and on the mobile sticky DM bar,
 * so changing it here changes it everywhere.
 */
export const FREE_SHIPPING_OVER = '₹999'

export const BRAND = {
  name: 'Sunflora',
  tagline: 'craftilicious forever flowers',
  announcement: `Free Shipping on Orders Above ${FREE_SHIPPING_OVER} • Taking Limited Orders Only • DM to Customize Your Bouquet`,
  /** Short form for narrow screens, where the full announcement would wrap. */
  announcementShort: `Free Shipping Above ${FREE_SHIPPING_OVER} • DM to Customize ✿`,
  /** Small print under the mobile sticky DM button. */
  shippingNote: `Free shipping on orders above ${FREE_SHIPPING_OVER}`,
} as const

/** Design tokens, lifted verbatim from the design handoff. */
export const C = {
  paper: '#F7F3FB',
  ink: '#3A2647',
  terracotta: '#6B2E8F',
  terracottaDeep: '#4F2169',
  sage: '#8A9A5B',
  tan: '#E3C9F5',
  surface: '#FDFBFF',
  muted: '#7c608e',
  body: '#6d5a82',
  border: '#d9bdee',
  borderSoft: '#e3cff3',
  latkanTint: '#e7ecd8',
  latkanInk: '#5c6a3f',
  gold: '#E8A93A',
  blush: '#A569BD',
  onDark: '#F1E4FA',
  onDarkMuted: '#cbb0dd',
  cardShadow: '0 18px 34px -22px rgba(58,38,71,.4)',
} as const

export type Product = {
  slug: string
  /** Label used in nav, footer and cross-sell tiles. */
  name: string
  /** <h1> on the detail page. */
  title: string
  eyebrow: string
  /** Display price. Keep as "DM for price" until the founder supplies one. */
  price: string
  /** <title> for search/share; falls back to `title`. Keep honest — no keyword stuffing. */
  metaTitle?: string
  /** Meta description for search/share; falls back to `summary`. */
  metaDescription?: string
  /** Machine-readable price for JSON-LD; null while the price is unconfirmed. */
  priceRange: { low: number; high: number } | null
  summary: string
  images: string[]
  tags: string[]
  /** Accessible label for gallery images. */
  alt: string
  /** Primary CTA button copy, e.g. "DM us to order 💛". */
  ctaLabel: string
  /** Small caption under the primary CTA on the detail page. */
  ctaNote: string
  /** "What makes it special" — exactly 4 cards. */
  features: { title: string; body: string }[]
  /** Quick-facts strip — 3 or 4 items. */
  specs: { label: string; value: string }[]
  /** Optional background tint for the specs strip (defaults to tan). */
  specsBg?: string
  /** "How ordering works" — always 4 steps. */
  orderSteps: { title: string; body: string }[]
  /** Other product slugs to show in "You might also love", in order. */
  crossSell: string[]
  /** Final-CTA heading on the detail page. */
  finalCtaTitle: string
}

export const products: Record<string, Product> = {
  'signature-frame': {
    slug: 'signature-frame',
    name: 'Signature Frame',
    title: 'Signature Frame',
    eyebrow: 'most loved to give',
    metaTitle: 'Personalised Photo Flower Frame — handmade Signature Frame',
    metaDescription:
      'Send your favourite photo and we frame it inside hand-shaped craft-wire flowers — a one-of-one handmade keepsake gift. ₹900–1,200, made to order, ships pan-India.',
    price: '₹900–1,200',
    priceRange: { low: 900, high: 1200 },
    summary:
      'Your favourite photo, framed inside a bouquet of hand-shaped flowers — a one-of-one keepsake made just for the two of you.',
    images: [
      '/assets/frame-4.jpeg',
      '/assets/frame-1.jpeg',
      '/assets/frame-2.jpeg',
      '/assets/frame-3.jpeg',
    ],
    tags: ['Birthdays', 'Anniversaries', 'Weddings', 'Housewarming'],
    alt: 'Signature Frame — handmade flower keepsake frame',
    ctaLabel: 'DM us to order 💛',
    ctaNote: "Place your order → send your photos after → we'll create it with care.",
    features: [
      { title: 'Made for one person only', body: "Built around your photo — it can't exist for anyone else." },
      { title: 'A keepsake, not a bouquet', body: 'Flowers that never wilt, framed to last for years — not two days.' },
      { title: 'Your own words', body: 'Add a short custom message, printed right beside the bouquet.' },
      { title: 'Handmade, start to finish', body: 'Every petal shaped by hand from craft wire, one order at a time.' },
    ],
    specs: [
      { label: 'Made to order', value: '~5–7 days to make' },
      { label: '~8×10 in', value: 'wooden shadow-box frame' },
      { label: 'Craft-wire flowers', value: 'hand-shaped, never mass-made' },
      { label: 'Your photo required', value: 'sent to us after ordering' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Send your photo', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['mini-frame', 'bouquets', 'lotus-latkan'],
    finalCtaTitle: "Have someone in mind? Let's make them a memory that lasts.",
  },
  'mini-frame': {
    slug: 'mini-frame',
    name: 'Mini Frame',
    title: 'Mini Frame',
    eyebrow: 'try me',
    metaTitle: 'Mini Frame — small handmade flower keepsake gift',
    metaDescription:
      'A little square keepsake frame with a handmade craft-wire bloom and your short message. ₹400–500, made to order, ships pan-India.',
    price: '₹400–500',
    priceRange: { low: 400, high: 500 },
    summary:
      'A little square keepsake frame with a handmade bloom and a short message — small, affordable, and just as handmade as the rest.',
    images: ['/assets/frame-5.jpeg', '/assets/frame-6.jpeg'],
    tags: ['Birthdays', 'Thank-you gifts', 'First-time gifting'],
    alt: 'Mini Frame — small handmade flower keepsake',
    ctaLabel: 'DM us to order 💛',
    ctaNote: "Place your order → send your message → we'll craft it with care.",
    features: [
      { title: 'The perfect first gift', body: 'Small, sweet, and still entirely handmade.' },
      { title: 'A short message that says everything', body: 'Printed right beside the bloom.' },
      { title: 'Budget-friendly, never careless', body: 'Same craft and care, a smaller canvas.' },
      { title: 'Ready in days', body: 'Faster to make, still made one at a time.' },
    ],
    specs: [
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: '~5×6 in', value: 'square keepsake frame' },
      { label: 'Craft-wire flowers', value: 'hand-shaped, one at a time' },
      { label: 'Message optional', value: "tell us if you'd like one printed" },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your message', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['signature-frame', 'bouquets', 'lotus-latkan'],
    finalCtaTitle: "A small gift, a big feeling. Let's make one.",
  },
  bouquets: {
    slug: 'bouquets',
    name: 'Bouquets',
    title: 'Everlasting Bouquet',
    eyebrow: 'everlasting',
    metaTitle: 'Everlasting Bouquet — handmade forever flowers',
    metaDescription:
      'A handmade forever-flower bouquet shaped from craft wire — wrapped, ribboned and gift-ready. Two colourways. Made to order, ships pan-India.',
    price: 'DM for price', // TODO(founder): supply the real price.
    priceRange: null,
    summary:
      "Real flowers wilt in two days. These don't — hand-shaped from craft wire, wrapped and ribboned, ready to gift.",
    // NOTE: bouquet-red-white.jpeg is a byte-identical copy of
    // bouquet-burgundy-white-styled.jpg — do not add it back as a "third" photo.
    images: [
      '/assets/bouquet-burgundy-white-styled.jpg',
      '/assets/bouquet-burgundy-white.webp',
    ],
    tags: [],
    alt: 'Everlasting handmade bouquet',
    ctaLabel: 'DM us to order 💐',
    ctaNote: '',
    features: [
      { title: 'Never fades', body: 'A bloom that stays for years, not two days.' },
      { title: 'Gift-ready', body: 'Wrapped and ribboned, ready to hand over as-is.' },
      { title: 'Actually handmade', body: 'Every petal shaped by hand from craft wire.' },
      { title: 'Two colourways', body: 'Deep burgundy & white, or violet purple.' },
    ],
    specs: [
      { label: 'Made to order', value: '~4–6 days to make' },
      { label: '~12 in tall', value: 'wrapped & ribboned' },
      { label: 'Craft-wire flowers', value: 'hand-shaped, one at a time' },
      { label: 'Easy care', value: 'dust gently, keep out of direct sun' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your colourway', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['signature-frame', 'mini-frame', 'lotus-latkan'],
    finalCtaTitle: 'A bouquet that never says goodbye.',
  },
  'lotus-latkan': {
    slug: 'lotus-latkan',
    name: 'Lotus Latkan',
    title: 'Lotus Latkan — Set of 2 🪷',
    eyebrow: 'festive hanging',
    metaTitle: 'Lotus Latkan (Set of 2) — handmade festive door hanging',
    metaDescription:
      'Hand-strung lotus garlands with pearls for your door or mandir — Ganpati, Diwali and pooja décor. Set of 2, 5 ft each, gift-boxed. Ships pan-India.',
    price: 'DM for price', // TODO(founder): supply the real price.
    priceRange: null,
    summary:
      'A hand-strung lotus garland for your door or mandir — a touch of elegance and festive charm for every celebration.',
    images: [
      '/assets/wa-3.jpeg',
      '/assets/wa-2.jpeg',
      '/assets/wa-4.jpeg',
      '/assets/lotus-latkan-flatlay.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Latkan — handmade festive flower hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: "Grab yours before it's gone ✿",
    features: [
      { title: 'Set of 2, 5 ft each', body: 'Long enough to frame any doorway or mandir beautifully.' },
      { title: 'Lightweight & reusable', body: 'Durable enough to bring out festival after festival.' },
      { title: 'Hand-strung with pearls', body: 'Every lotus shaped by hand from premium-quality materials.' },
      { title: 'Easy to hang & maintain', body: 'Arrives gift-boxed, ready to hang the moment it lands.' },
    ],
    specs: [
      { label: 'Set of 2', value: 'sold as a pair' },
      { label: '5 ft each', value: 'hangs the full doorway' },
      { label: 'Handmade & gift-boxed', value: 'ready to hang, ready to gift' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'We confirm stock', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['purple-lotus-latkan', 'lotus-asaan', 'signature-frame'],
    finalCtaTitle: 'Ready your home for the festival season.',
  },
  'purple-lotus-latkan': {
    slug: 'purple-lotus-latkan',
    name: 'Purple Lotus Latkan',
    title: 'Purple Lotus Latkan — Set of 2 🪷',
    eyebrow: 'festive hanging',
    metaTitle: 'Purple Lotus Latkan (Set of 2) — festive door hanging',
    metaDescription:
      'Hand-strung purple lotus garlands with pearls for your door or mandir — Ganpati, Diwali and pooja décor. Set of 2, 3 ft each, ₹800/pair. Ships pan-India.',
    price: '₹800 / pair',
    priceRange: { low: 800, high: 800 },
    summary:
      'A hand-strung purple lotus garland for your door or mandir — an elegant, festive touch for every celebration.',
    images: [
      '/assets/purple-lotus-latkan-1.jpeg',
      '/assets/purple-lotus-latkan-2.jpeg',
      '/assets/purple-lotus-latkan-3.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Purple Lotus Latkan — handmade festive flower hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: "Grab yours before it's gone ✿",
    features: [
      { title: 'Set of 2, 3 ft each', body: 'Long enough to frame any doorway or mandir beautifully.' },
      { title: 'Lightweight & reusable', body: 'Durable enough to bring out festival after festival.' },
      { title: 'Hand-strung with pearls', body: 'Every lotus shaped by hand from premium-quality materials.' },
      { title: 'Easy to hang & maintain', body: 'Arrives ready to hang the moment it lands.' },
    ],
    specs: [
      { label: 'Set of 2', value: 'sold as a pair' },
      { label: '3 ft each', value: 'hangs beautifully at the door' },
      { label: 'Handmade', value: 'ready to hang, ready to gift' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'We confirm stock', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['lotus-latkan', 'lotus-asaan', 'signature-frame'],
    finalCtaTitle: 'Bring a touch of purple festive charm to your doorway.',
  },
  'lotus-asaan': {
    slug: 'lotus-asaan',
    name: 'Lotus Asaan (Small)',
    title: 'Lotus Asaan — Small 🪷',
    eyebrow: 'for your bappa',
    metaTitle: 'Lotus Asaan (Small) — handmade lotus seat for your Ganpati idol',
    metaDescription:
      'A handmade craft-wire lotus asaan for your Ganpati or deity idol — pink petals tipped with pearls over green leaves. DM for price, made to order, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'A hand-shaped lotus seat for your Bappa — soft pink and white petals tipped with pearls, resting on a ring of green leaves.',
    images: [
      '/assets/lotus-asaan-small-1.jpeg',
      '/assets/lotus-asaan-1.jpeg',
      '/assets/lotus-asaan-2.jpeg',
      '/assets/lotus-asaan-3.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Asaan Small — handmade lotus seat for a deity idol',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Order early for Ganesh Chaturthi — each one made fresh.',
    features: [
      { title: 'A seat made for your Bappa', body: 'So your idol never sits bare on the table again.' },
      { title: 'Petals that never wilt', body: 'Shaped by hand from craft wire — it comes back out every year.' },
      { title: 'Pearl-tipped, leaf-backed', body: 'Every petal finished with a pearl, set over a ring of green leaves.' },
      { title: 'At home anywhere', body: 'Mandir, pooja thali, festive table — or your work desk all year.' },
    ],
    specs: [
      { label: 'Small size', value: 'compact idol seat' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Idol not included', value: 'the asaan only' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your idol size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan-medium', 'pink-lotus-asaan-medium', 'ganpati-special-mala'],
    finalCtaTitle: 'Give your Bappa a seat made by hand.',
  },
  'lotus-asaan-medium': {
    slug: 'lotus-asaan-medium',
    name: 'Lotus Asaan (Medium)',
    title: 'Lotus Asaan — Medium 🪷',
    eyebrow: 'for your bappa',
    metaTitle: 'Lotus Asaan (Medium) — multi-layered handmade lotus seat for Ganpati',
    metaDescription:
      'Handmade multi-layered craft-wire lotus asaan for your Ganpati or temple idol — rich pink and white petals with yellow core. DM for price, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'A grand multi-layered lotus seat for your Bappa — layered pink and white craft-wire petals with a yellow textured core and deep green base leaves.',
    images: ['/assets/lotus-asaan-medium-1.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Asaan Medium — layered handmade lotus seat for Ganpati idol',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Made to order with care for the festive season.',
    features: [
      { title: 'Grand layered design', body: 'Multiple layers of hand-shaped petals create a rich, blooming lotus.' },
      { title: 'Never wilts', body: 'Crafted with premium materials to shine year after year.' },
      { title: 'Custom sized for idols', body: 'Generous medium footprint to seat your Ganpati murti with poise.' },
      { title: 'Pure handmade charm', body: 'Every petal shaped and finished by hand with love.' },
    ],
    specs: [
      { label: 'Medium size', value: 'fits standard murtis' },
      { label: 'Made to order', value: '~4–6 days to make' },
      { label: 'Idol not included', value: 'the asaan only' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your murti size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['pink-lotus-asaan-medium', 'lotus-asaan', 'ganpati-special-mala'],
    finalCtaTitle: 'A majestic throne for your Bappa.',
  },
  'pink-lotus-asaan-medium': {
    slug: 'pink-lotus-asaan-medium',
    name: 'Pink Lotus Asaan (Medium)',
    title: 'Pink Lotus Asaan — Medium 🪷',
    eyebrow: 'vibrant pink',
    metaTitle: 'Pink Lotus Asaan (Medium) — vibrant handmade lotus idol seat',
    metaDescription:
      'Bright pink handmade lotus seat for deity idols and Ganpati Bappa — intricate white-tipped stamens and textured center. DM for price, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'Vibrant magenta-pink lotus asaan with intricate stamens and a rich golden center — a radiant base for your Ganpati or pooja altar.',
    images: ['/assets/pink-lotus-asaan-medium-1.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Pink Lotus Asaan Medium — bright pink handmade lotus seat',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Each asaan is crafted individually by hand.',
    features: [
      { title: 'Vibrant festive pink', body: 'Radiant velvet petals that add an eye-catching glow to your altar.' },
      { title: 'Detailed stamen crown', body: 'Finished with delicate white-tipped stamens around a plush core.' },
      { title: 'Durable & reusable', body: 'Keep safely after celebrations and reuse for every festival.' },
      { title: 'Handcrafted perfection', body: 'Every single petal shaped and mounted by hand.' },
    ],
    specs: [
      { label: 'Medium size', value: 'ideal for temple & altar' },
      { label: 'Made to order', value: '~4–6 days to make' },
      { label: 'Idol not included', value: 'the asaan only' },
      { label: 'Handmade', value: 'craft-wire & velvet petals' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan-medium', 'lotus-asaan', 'ganpati-special-mala'],
    finalCtaTitle: 'Add a vibrant festive touch to your sacred space.',
  },
  'multipurpose-2ft-latkan': {
    slug: 'multipurpose-2ft-latkan',
    name: 'Multipurpose 2 Ft Latkan',
    title: 'Multipurpose Latkan — 2 Ft',
    eyebrow: 'two colourways',
    metaTitle: 'Multipurpose 2 Ft Latkan — handmade festive flower hanging',
    metaDescription:
      'Versatile 2 ft hanging latkans with pearl strands and bud drops — available in Pink / Fuchsia and Golden Yellow. DM for price, made to order, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'A versatile 2-foot handmade latkan featuring a statement bloom, pearl chain, and dangling bud drops — perfect for doors, mandirs, curtains, and wall accents.',
    images: [
      '/assets/multipurpose-latkan-2ft-pink.jpeg',
      '/assets/multipurpose-latkan-2ft-yellow-1.jpeg',
      '/assets/multipurpose-latkan-2ft-yellow-2.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Wall & door hanging', 'Festivals & poojas'],
    alt: 'Multipurpose 2 Ft Latkan — handmade flower and pearl hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Choose your favourite colourway over DM ✿',
    features: [
      { title: 'Multipurpose styling', body: 'Hang it on doorways, mandir corners, curtains, or festive backdrops.' },
      { title: 'Two vibrant colourways', body: 'Choose between vibrant Pink/Fuchsia or warm Golden Yellow.' },
      { title: 'Pearl strands & bud drops', body: 'Detailed with lustrous pearls and delicate flower bud tassels.' },
      { title: 'Reusable forever', body: 'Crafted to stay beautiful across years of celebrations.' },
    ],
    specs: [
      { label: 'Length', value: '2 ft' },
      { label: 'Two colours', value: 'Pink & Golden Yellow' },
      { label: 'Handmade', value: 'craft wire & faux pearls' },
      { label: 'Easy to hang', value: 'ready with top loop' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your colourway', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['door-side-latkan-4ft', 'door-side-latkan-5ft', 'lotus-latkan'],
    finalCtaTitle: 'Brighten any festive corner with versatile charm.',
  },
  'door-side-latkan-4ft': {
    slug: 'door-side-latkan-4ft',
    name: 'Door Side Latkans (4 Ft)',
    title: 'Door Side Latkans — 4 Ft',
    eyebrow: 'festive doorway',
    metaTitle: 'Door Side Latkans (4 Ft) — handmade maroon flower & pearl hanging',
    metaDescription:
      'Handmade 4 ft door latkans featuring deep maroon velvet flower clusters strung on lustrous pearls. DM for price, made to order, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'Deep maroon velvet flower clusters strung along pearl strands with bud accents — designed to frame doorways and pooja entrances with royal elegance.',
    images: ['/assets/door-side-latkan-4ft-maroon.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Doorway décor', 'Festivals & poojas'],
    alt: 'Door Side Latkans 4 Ft — maroon velvet and pearl door hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Handmade to order for your festive entrance.',
    features: [
      { title: '4 ft doorway length', body: 'Perfect length to drape gracefully along entrance doors and mandir gates.' },
      { title: 'Rich maroon velvet', body: 'Deep wine velvet blooms that exude festive luxury.' },
      { title: 'Hand-strung pearl segments', body: 'Lustrous pearls spaced evenly between each flower cluster.' },
      { title: 'Long-lasting heirloom', body: 'Pack away after the festive season and bring out every year.' },
    ],
    specs: [
      { label: 'Length', value: '4 ft' },
      { label: 'Made to order', value: '~4–6 days to make' },
      { label: 'Handmade', value: 'velvet blooms & pearls' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-side-latkan-5ft', 'multipurpose-2ft-latkan', 'lotus-latkan'],
    finalCtaTitle: 'Give your doorway a warm, auspicious welcome.',
  },
  'door-side-latkan-5ft': {
    slug: 'door-side-latkan-5ft',
    name: 'Door Side Latkans Decor (5 Ft)',
    title: 'Door Side Latkans Decor — 5 Ft',
    eyebrow: '4 colourways',
    metaTitle: 'Door Side Latkans Decor (5 Ft) — festive hanging in 4 colors',
    metaDescription:
      'Full-length 5 ft handmade door latkans with pearl strands and bud drops in Lavender, Violet & Pink, Red Rose, and Marigold Orange. DM for price, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'Full 5-foot festive door latkans handcrafted with layered blooms, pearl beads, and cascading bud drops — available in 4 stunning colourways.',
    images: [
      '/assets/door-latkan-5ft-lavender.jpeg',
      '/assets/door-latkan-5ft-violet-pink.jpeg',
      '/assets/door-latkan-5ft-red.jpeg',
      '/assets/door-latkan-5ft-orange-1.jpeg',
      '/assets/door-latkan-5ft-orange-2.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Doorway décor', 'Festivals & poojas'],
    alt: 'Door Side Latkans Decor 5 Ft — handmade full doorway hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Select your favourite colourway when you message us ✿',
    features: [
      { title: 'Full 5 ft doorway coverage', body: 'Hangs the full height of your entrance or mandir for a complete festive look.' },
      { title: '4 exclusive colourways', body: 'Choose from Lavender, Violet & Pink, Red Rose, or Marigold Orange.' },
      { title: 'Detailed pearl cascades', body: 'Features triple pearl tassels and hand-shaped bud drops at the base.' },
      { title: 'Reusable year after year', body: 'Never wilts, browns, or breaks — ready for every celebration.' },
    ],
    specs: [
      { label: 'Length', value: '5 ft each' },
      { label: '4 Colourways', value: 'Lavender, Violet, Red, Orange' },
      { label: 'Handmade', value: 'craft wire, velvet & pearls' },
      { label: 'Ready to hang', value: 'top mounting loop included' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your colourway', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['door-side-latkan-4ft', 'multipurpose-2ft-latkan', 'lotus-latkan'],
    finalCtaTitle: 'Transform your festive entrance with handcrafted grace.',
  },
  'ganpati-special-mala': {
    slug: 'ganpati-special-mala',
    name: 'Ganpati Special Mala',
    title: 'Ganpati Special Mala',
    eyebrow: '4 sacred styles',
    metaTitle: 'Ganpati Special Mala — handmade velvet & pearl deity garland',
    metaDescription:
      'Handmade pooja & deity malas for Ganpati Bappa in 4 styles: Mogra Lotus, Braided Rose, Tricolor Bloom, and Murti Dashboard Mala. DM for price, ships pan-India.',
    price: 'DM for price',
    priceRange: null,
    summary:
      'Handcrafted velvet flower malas strung on pearls — specially designed for Ganpati Bappa idols, home temples, pooja thalis, and car dashboards.',
    images: [
      '/assets/ganpati-mala-mogra-pink.jpeg',
      '/assets/ganpati-mala-braided-rose.jpeg',
      '/assets/ganpati-mala-tricolor.jpeg',
      '/assets/ganpati-mala-murti-pink.jpeg',
    ],
    tags: ['Ganpati décor', 'Pooja garland', 'Murti mala', 'Festivals & poojas'],
    alt: 'Ganpati Special Mala — handmade velvet flower garland',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Select your preferred style and tell us your idol size.',
    features: [
      { title: '4 sacred styles', body: 'Choose Mogra Lotus, Braided Rose, Tricolor Bloom, or Murti Dashboard Mala.' },
      { title: 'Tailored for idols', body: 'Carefully proportioned to adorn murtis gracefully without overpowering.' },
      { title: 'Pearl knotting', body: 'Strung by hand with lustrous pearls and flower bud pendants.' },
      { title: 'Everlasting devotion', body: 'A holy garland that remains fresh and vibrant year after year.' },
    ],
    specs: [
      { label: '4 styles', value: 'Mogra, Rose, Tricolor, Murti' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Handmade', value: 'velvet blooms & pearls' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your style & murti size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan', 'lotus-asaan-medium', 'pink-lotus-asaan-medium'],
    finalCtaTitle: 'Adorn your Bappa with a garland made with pure devotion.',
  },
  'lotus-decorative-latkan': {
    slug: 'lotus-decorative-latkan',
    name: 'Lotus Decorative Latkan',
    title: 'Lotus Decorative Latkan — Set of 2',
    eyebrow: 'festive hanging',
    metaTitle: 'Lotus Decorative Latkan (Set of 2) — rose & pearl door hanging',
    metaDescription:
      'Handmade velvet-rose latkans on triple pearl strands, finished with a rose and bud drop — for your door, mandir or festive corner. Set of 2, ₹500/pair. Ships pan-India.',
    price: '₹500 / pair',
    priceRange: { low: 500, high: 500 },
    summary:
      'Deep red velvet blooms gathered on triple strands of pearls, finished with a rose and a soft bud drop — a matching pair for your doorway.',
    images: ['/assets/lotus-decorative-latkan-1.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Decorative Latkan — handmade red rose and pearl hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: "Grab yours before it's gone ✿",
    features: [
      { title: 'Set of 2', body: 'A matching pair, so your doorway or mandir is framed on both sides.' },
      { title: 'Layered by hand', body: 'Every bloom rolled and shaped from craft wire, one petal at a time.' },
      { title: 'Triple pearl strands', body: 'Three rows of pearls between each flower, so it catches the light.' },
      { title: 'Out every festival', body: 'Never wilts, never browns — it comes back year after year.' },
    ],
    specs: [
      { label: 'Set of 2', value: 'sold as a pair' },
      { label: 'Made to order', value: '~4–6 days to make' },
      { label: 'Handmade', value: 'craft-wire blooms & pearls' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'We confirm stock', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['lotus-latkan', 'purple-lotus-latkan', 'door-side-latkan-5ft'],
    finalCtaTitle: 'Dress your doorway for the season.',
  },
  'flower-mala': {
    slug: 'flower-mala',
    name: 'Artificial Flower Mala',
    title: 'Artificial Flower Mala',
    eyebrow: 'two styles',
    metaTitle: 'Artificial Flower Mala — handmade velvet & pearl garland',
    metaDescription:
      'Handmade velvet flower malas strung on pearls, in two styles from ₹150. For your Ganpati idol, mandir, pooja or welcome garland. Made to order, ships pan-India.',
    // Spans both styles — the page swaps in the selected style's own price.
    price: '₹150–200',
    priceRange: { low: 150, high: 200 },
    summary:
      'A handmade velvet-flower mala strung on pearls — for your idol, your mandir, or to welcome someone home.',
    images: ['/assets/flower-mala-braided-1.jpeg', '/assets/flower-mala-cluster-1.jpeg'],
    tags: ['Ganpati décor', 'Weddings', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Artificial Flower Mala — handmade velvet flower and pearl garland',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Tell us which style — each one is made to order.',
    features: [
      { title: 'Two styles, one craft', body: 'Braided Rose or Mixed Bloom — pick the one that suits the occasion.' },
      { title: 'Strung on pearls', body: 'Pearl segments between every flower, knotted by hand.' },
      { title: 'Sized for idols', body: 'Made to sit on a murti rather than swamp it.' },
      { title: 'Never wilts', body: 'Put it away after the pooja and bring it out again next year.' },
    ],
    specs: [
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Two styles', value: '₹200 or ₹150' },
      { label: 'Handmade', value: 'craft-wire blooms & pearls' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your style', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan', 'ganpati-special-mala', 'lotus-latkan'],
    finalCtaTitle: 'A mala that lasts long after the pooja.',
  },
}

/**
 * schema.org Product JSON-LD for a product detail page.
 * Emits an offer only when a confirmed price exists (priceRange is null while
 * a product still reads "DM for price") — never invents prices, reviews or ratings.
 */
export function productJsonLd(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.summary,
    image: p.images.map((i) => `${SITE_URL}${i}`),
    brand: { '@type': 'Brand', name: BRAND.name },
    url: `${SITE_URL}/products/${p.slug}`,
    ...(p.priceRange
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: p.priceRange.low,
            highPrice: p.priceRange.high,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/products/${p.slug}`,
          },
        }
      : {}),
  }
}

/**
 * The two colourways on the bouquet page.
 * Each colourway has exactly 2 unique photos on disk — the apparent "third"
 * files (bouquet-red-white.jpeg, bouquet-purple-2.jpeg) are byte-identical
 * duplicates of the styled shots and must not be re-added.
 */
export const bouquetVariants = {
  burgundy: {
    label: 'Burgundy & White',
    images: [
      '/assets/bouquet-burgundy-white-styled.jpg',
      '/assets/bouquet-burgundy-white.webp',
    ],
  },
  purple: {
    label: 'Purple',
    images: [
      '/assets/bouquet-purple-styled.jpg',
      '/assets/bouquet-purple.webp',
    ],
  },
} as const

export type BouquetVariant = keyof typeof bouquetVariants

/**
 * The two styles on the Artificial Flower Mala page.
 * Unlike `bouquetVariants`, each style carries its own price — the page swaps
 * `price`/`priceRange` along with the photos, so the number on screen always
 * matches the style that's selected. The `products['flower-mala']` entry keeps
 * the spanning "₹150–200" for JSON-LD and for the landing-page card.
 */
export const malaVariants = {
  braided: {
    label: 'Braided Rose',
    price: '₹200',
    priceRange: { low: 200, high: 200 },
    images: ['/assets/flower-mala-braided-1.jpeg'],
  },
  cluster: {
    label: 'Mixed Bloom',
    price: '₹150',
    priceRange: { low: 150, high: 150 },
    images: ['/assets/flower-mala-cluster-1.jpeg'],
  },
} as const

export type MalaVariant = keyof typeof malaVariants

/**
 * The two colourways on the Multipurpose 2 Ft Latkan page.
 */
export const multipurposeLatkanVariants = {
  pink: {
    label: 'Pink / Fuchsia',
    images: ['/assets/multipurpose-latkan-2ft-pink.jpeg'],
  },
  yellow: {
    label: 'Golden Yellow',
    images: [
      '/assets/multipurpose-latkan-2ft-yellow-1.jpeg',
      '/assets/multipurpose-latkan-2ft-yellow-2.jpeg',
    ],
  },
} as const

export type MultipurposeLatkanVariant = keyof typeof multipurposeLatkanVariants

/**
 * The four colourways on the Door Side Latkans Decor 5 Ft page.
 */
export const doorLatkan5ftVariants = {
  lavender: {
    label: 'Lavender Bud',
    images: ['/assets/door-latkan-5ft-lavender.jpeg'],
  },
  violetPink: {
    label: 'Violet & Pink',
    images: ['/assets/door-latkan-5ft-violet-pink.jpeg'],
  },
  red: {
    label: 'Red Rose',
    images: ['/assets/door-latkan-5ft-red.jpeg'],
  },
  orange: {
    label: 'Marigold Orange',
    images: [
      '/assets/door-latkan-5ft-orange-1.jpeg',
      '/assets/door-latkan-5ft-orange-2.jpeg',
    ],
  },
} as const

export type DoorLatkan5ftVariant = keyof typeof doorLatkan5ftVariants

/**
 * The four styles on the Ganpati Special Mala page.
 */
export const ganpatiMalaVariants = {
  mograPink: {
    label: 'Mogra & Pink Lotus',
    images: ['/assets/ganpati-mala-mogra-pink.jpeg'],
  },
  braidedRose: {
    label: 'Braided Rose',
    images: ['/assets/ganpati-mala-braided-rose.jpeg'],
  },
  tricolor: {
    label: 'Tricolor Bloom',
    images: ['/assets/ganpati-mala-tricolor.jpeg'],
  },
  murtiPink: {
    label: 'Murti / Dashboard Mala',
    images: ['/assets/ganpati-mala-murti-pink.jpeg'],
  },
} as const

export type GanpatiMalaVariant = keyof typeof ganpatiMalaVariants

/** Nav order, shared by the header menu and the footer. */
export const navProducts = [
  products['signature-frame'],
  products['mini-frame'],
  products.bouquets,
  products['lotus-latkan'],
  products['purple-lotus-latkan'],
  products['door-side-latkan-4ft'],
  products['door-side-latkan-5ft'],
  products['multipurpose-2ft-latkan'],
  products['lotus-asaan'],
  products['lotus-asaan-medium'],
  products['pink-lotus-asaan-medium'],
  products['lotus-decorative-latkan'],
  products['flower-mala'],
  products['ganpati-special-mala'],
]

