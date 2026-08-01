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

/** Opens the Instagram DM composer. */
export const igDm = `https://ig.me/m/${IG_HANDLE}`
/** Opens the Instagram profile. */
export const igProfile = `https://instagram.com/${IG_HANDLE}`
/** Display form, e.g. "@sunflora.craftilicious.ful". */
export const igAt = `@${IG_HANDLE}`

export const BRAND = {
  name: 'Sunflora',
  tagline: 'craftilicious forever flowers',
  announcement:
    'Free Shipping on Orders Above ₹1000 • Taking Limited Orders Only • DM to Customize Your Bouquet',
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
    name: 'Lotus Asaan',
    title: 'Lotus Asaan 🪷',
    eyebrow: 'for your bappa',
    metaTitle: 'Lotus Asaan — handmade lotus seat for your Ganpati idol',
    metaDescription:
      'A handmade craft-wire lotus asaan for your Ganpati or deity idol — pink petals tipped with pearls over green leaves. ₹350, made to order, ships pan-India.',
    price: '₹350',
    priceRange: { low: 350, high: 350 },
    summary:
      'A hand-shaped lotus seat for your Bappa — soft pink petals tipped with pearls, resting on a ring of green leaves.',
    images: ['/assets/lotus-asaan-1.jpeg', '/assets/lotus-asaan-2.jpeg', '/assets/lotus-asaan-3.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Asaan — handmade lotus seat for a deity idol',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Order early for Ganesh Chaturthi — each one made fresh.',
    features: [
      { title: 'A seat made for your Bappa', body: 'So your idol never sits bare on the table again.' },
      { title: 'Petals that never wilt', body: 'Shaped by hand from craft wire — it comes back out every year.' },
      { title: 'Pearl-tipped, leaf-backed', body: 'Every petal finished with a pearl, set over a ring of green leaves.' },
      { title: 'At home anywhere', body: 'Mandir, pooja thali, festive table — or your work desk all year.' },
    ],
    specs: [
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Idol not included', value: 'the asaan only' },
      { label: 'Handmade', value: 'craft-wire petals & pearls' },
      { label: 'Reusable', value: 'festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your idol size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['purple-lotus-latkan', 'lotus-latkan', 'flower-mala'],
    finalCtaTitle: 'Give your Bappa a seat made by hand.',
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
    crossSell: ['lotus-latkan', 'purple-lotus-latkan', 'flower-mala'],
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
    crossSell: ['lotus-asaan', 'lotus-decorative-latkan', 'lotus-latkan'],
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

/** Nav order, shared by the header menu and the footer. */
export const navProducts = [
  products['signature-frame'],
  products['mini-frame'],
  products.bouquets,
  products['lotus-latkan'],
  products['purple-lotus-latkan'],
  products['lotus-asaan'],
  products['lotus-decorative-latkan'],
  products['flower-mala'],
]
