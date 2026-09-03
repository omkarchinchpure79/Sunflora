/**
 * Single source of truth for the whole site.
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
 * Opens the Instagram DM composer.
 */
export const igDm = `https://ig.me/m/${IG_HANDLE}`
/**
 * Opens the Instagram profile.
 */
export const igProfile = `https://www.instagram.com/${IG_HANDLE}/`
/**
 * The app's own URL scheme.
 */
export const igAppProfile = `instagram://user?username=${IG_HANDLE}`
/** Display form, e.g. "@sunflora.craftilicious.ful". */
export const igAt = `@${IG_HANDLE}`

/**
 * Order value above which shipping is free. Single source of truth.
 */
export const FREE_SHIPPING_OVER = '₹999'

export const BRAND = {
  name: 'Sunflora',
  tagline: 'craftilicious forever flowers',
  announcement: `Free Shipping on Orders Above ${FREE_SHIPPING_OVER} • Handcrafted with Love • DM to Order & Customize`,
  announcementShort: `Free Shipping Above ${FREE_SHIPPING_OVER} • DM to Order ✿`,
  shippingNote: `Free shipping on orders above ${FREE_SHIPPING_OVER}`,
} as const

/** Design tokens */
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
  /** Label used in nav, footer and catalog cards. */
  name: string
  /** <h1> on the detail page. */
  title: string
  eyebrow: string
  category: string
  /** Display price / actual selling price. */
  price: string
  /** Numeric selling price for sorting. */
  priceValue: number
  /** Strikethrough Maximum Retail Price (MRP). */
  mrp?: string
  /** Numeric MRP value. */
  mrpValue?: number
  /** Optional badge on card (e.g. 'BESTSELLER', '17% OFF', 'FESTIVE'). */
  badge?: string
  /** <title> for search/share; falls back to `title`. */
  metaTitle?: string
  /** Meta description for search/share; falls back to `summary`. */
  metaDescription?: string
  /** Machine-readable price for JSON-LD. */
  priceRange: { low: number; high: number } | null
  summary: string
  images: string[]
  tags: string[]
  alt: string
  ctaLabel: string
  ctaNote: string
  features: { title: string; body: string }[]
  specs: { label: string; value: string }[]
  specsBg?: string
  orderSteps: { title: string; body: string }[]
  crossSell: string[]
  finalCtaTitle: string
}

export const products: Record<string, Product> = {
  'ganpati-mala-mogra-pink': {
    slug: 'ganpati-mala-mogra-pink',
    name: 'Ganpati Special Mala — Mogra & Pink Lotus',
    title: 'Ganpati Special Mala — Mogra & Pink Lotus',
    eyebrow: 'sacred garland',
    category: 'Ganpati Malas',
    mrp: '₹300',
    mrpValue: 300,
    price: '₹249',
    priceValue: 249,
    badge: '17% OFF',
    metaTitle: 'Ganpati Special Mala (Mogra & Pink Lotus) — handmade velvet deity garland',
    metaDescription: 'Handmade white mogra-loop garland with pink lotus flowers and lustrous pearl strings for Ganpati Bappa. ₹249, made to order.',
    priceRange: { low: 249, high: 249 },
    summary: 'A pristine handcrafted mala with white mogra-inspired loops, vibrant pink lotus blooms, and lustrous pearls — designed specially for Ganpati Bappa.',
    images: ['/assets/ganpati-mala-mogra-pink.jpeg'],
    tags: ['Ganpati décor', 'Pooja garland', 'Murti mala', 'Festivals & poojas'],
    alt: 'Ganpati Special Mala — Mogra & Pink Lotus',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Each mala is crafted individually by hand with love.',
    features: [
      { title: 'Pristine Mogra & Lotus', body: 'Handcrafted white loops accented with pink velvet lotus blooms.' },
      { title: 'Sized for Idols', body: 'Proportioned gracefully to adorn Ganpati murtis and temple altars.' },
      { title: 'Pearl String Detailing', body: 'Finished with lustrous pearl tassels and flower bud pendants.' },
      { title: 'Everlasting Devotion', body: 'Stays fresh and vibrant across years of festive celebrations.' },
    ],
    specs: [
      { label: 'Style', value: 'Mogra & Pink Lotus' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet craft wire & pearls' },
      { label: 'Reusable', value: 'Festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your idol size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['ganpati-mala-braided-rose', 'lotus-asaan', 'ganpati-dashboard-mala'],
    finalCtaTitle: 'Adorn your Bappa with pure handmade devotion.',
  },

  'ganpati-mala-braided-rose': {
    slug: 'ganpati-mala-braided-rose',
    name: 'Ganpati Special Mala — Braided Rose & White',
    title: 'Ganpati Special Mala — Braided Rose & White',
    eyebrow: 'sacred garland',
    category: 'Ganpati Malas',
    mrp: '₹200',
    mrpValue: 200,
    price: '₹149',
    priceValue: 149,
    badge: '25% OFF',
    metaTitle: 'Ganpati Special Mala (Braided Rose & White) — deity garland',
    metaDescription: 'Handmade braided green, white, and red mala with a statement red rose pendant. ₹149, made to order.',
    priceRange: { low: 149, high: 149 },
    summary: 'A traditional braided green, white, and red velvet mala strung on pearls, crowned with a large handmade red rose pendant.',
    images: ['/assets/ganpati-mala-braided-rose.jpeg'],
    tags: ['Ganpati décor', 'Pooja garland', 'Murti mala', 'Festivals & poojas'],
    alt: 'Ganpati Special Mala — Braided Rose & White',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Handmade fresh for your home altar or Ganpati Bappa.',
    features: [
      { title: 'Intricate Braided Pattern', body: 'Rich alternating layers of emerald green, white, and red velvet.' },
      { title: 'Statement Rose Pendant', body: 'Centered with a large hand-shaped velvet rose and golden bead drop.' },
      { title: 'Pearl Segments', body: 'Knotted with faux pearls for a refined auspicious finish.' },
      { title: 'Long-Lasting Keepsake', body: 'Reusable year after year without wilting.' },
    ],
    specs: [
      { label: 'Style', value: 'Braided Rose' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Reusable', value: 'Forever bloom' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['ganpati-mala-mogra-pink', 'ganpati-mala-tricolor', 'lotus-asaan'],
    finalCtaTitle: 'A holy garland crafted for festive blessings.',
  },

  'ganpati-mala-tricolor': {
    slug: 'ganpati-mala-tricolor',
    name: 'Ganpati Special Mala — Tricolor Bloom',
    title: 'Ganpati Special Mala — Tricolor Bloom',
    eyebrow: 'sacred garland',
    category: 'Ganpati Malas',
    mrp: '₹300',
    mrpValue: 300,
    price: '₹249',
    priceValue: 249,
    badge: '17% OFF',
    metaTitle: 'Ganpati Special Mala (Tricolor Bloom) — festive deity garland',
    metaDescription: 'Auspicious Saffron, White, and Green velvet garland for Ganpati Bappa. ₹249, handmade to order.',
    priceRange: { low: 249, high: 249 },
    summary: 'A vibrant auspicious tricolor mala crafted with layered saffron orange, pure white, and deep green velvet florets.',
    images: ['/assets/ganpati-mala-tricolor.jpeg'],
    tags: ['Ganpati décor', 'Pooja garland', 'Tricolor mala', 'Festivals & poojas'],
    alt: 'Ganpati Special Mala — Tricolor Bloom',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Crafted with premium materials for your pooja altar.',
    features: [
      { title: 'Vibrant Tricolor Florets', body: 'Layered saffron, white, and green blooms inspired by sacred tradition.' },
      { title: 'Lustrous Pearl Accents', body: 'Hand-strung with pearl beads for an elegant drape.' },
      { title: 'Perfect Idol Proportions', body: 'Designed to fit comfortably around standard Ganpati murtis.' },
      { title: 'Reusable Design', body: 'Preserve easily in a pouch for every upcoming festival.' },
    ],
    specs: [
      { label: 'Style', value: 'Tricolor Bloom' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet craft wire & pearls' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your murti size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['ganpati-mala-mogra-pink', 'ganpati-mala-red-rose', 'lotus-asaan'],
    finalCtaTitle: 'Bring auspicious tricolor elegance to your altar.',
  },

  'ganpati-mala-red-rose': {
    slug: 'ganpati-mala-red-rose',
    name: 'Ganpati Special Mala — Mogra & Red Rose',
    title: 'Ganpati Special Mala — Mogra & Red Rose',
    eyebrow: 'sacred garland',
    category: 'Ganpati Malas',
    mrp: '₹180',
    mrpValue: 180,
    price: '₹149',
    priceValue: 149,
    badge: '17% OFF',
    metaTitle: 'Ganpati Special Mala (Mogra & Red Rose) — handmade idol garland',
    metaDescription: 'Handmade white mogra loop garland with red velvet segments and rose pendant. ₹149, made to order.',
    priceRange: { low: 149, high: 149 },
    summary: 'Delicate white mogra loops combined with deep red velvet segments and centered with a blooming red rose pendant.',
    images: ['/assets/flower-mala-braided-1.jpeg'],
    tags: ['Ganpati décor', 'Pooja garland', 'Murti mala'],
    alt: 'Ganpati Special Mala — Mogra & Red Rose',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Handmade to order for Ganpati Bappa and poojas.',
    features: [
      { title: 'Classic Red & White Harmony', body: 'White loops and red velvet blooms symbolize devotion and purity.' },
      { title: 'Pearl Strung', body: 'Evenly spaced pearls give the garland a smooth, balanced drape.' },
      { title: 'Hand-shaped Rose', body: 'Finished with a plush handmade rose and bud drop.' },
      { title: 'Zero Maintenance', body: 'Never wilts or fades — ready for every celebration.' },
    ],
    specs: [
      { label: 'Style', value: 'Mogra & Red Rose' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['ganpati-dashboard-mala', 'ganpati-mala-braided-rose', 'lotus-asaan'],
    finalCtaTitle: 'A timeless garland for your deity.',
  },

  'ganpati-dashboard-mala': {
    slug: 'ganpati-dashboard-mala',
    name: 'Car / Dashboard Murti Mala',
    title: 'Car / Dashboard Murti Mala',
    eyebrow: 'compact & sacred',
    category: 'Ganpati Malas',
    mrp: '₹130',
    mrpValue: 130,
    price: '₹99',
    priceValue: 99,
    badge: '24% OFF',
    metaTitle: 'Car / Dashboard Murti Mala — miniature handmade deity garland',
    metaDescription: 'Miniature pink flower garland designed for car dashboard Ganpati idols, home temples, and pooja thalis. ₹99, made to order.',
    priceRange: { low: 99, high: 99 },
    summary: 'A petite handmade garland with vibrant pink blooms and green leaves — custom-sized to frame car dashboard murtis and small temple idols.',
    images: ['/assets/ganpati-mala-murti-pink.jpeg'],
    tags: ['Car dashboard', 'Mini mala', 'Ganpati murti', 'Pooja thali'],
    alt: 'Car Dashboard Murti Mala — miniature flower garland',
    ctaLabel: 'DM us to order 🚗',
    ctaNote: 'Perfect compact size for cars and office desks.',
    features: [
      { title: 'Compact Proportions', body: 'Specially created for 2–4 inch idols without covering the deity face.' },
      { title: 'Vibrant Pink Blooms', body: 'Bright velvet flowers with pearl accents that stand out on dashboards.' },
      { title: 'Secure & Lightweight', body: 'Sits comfortably without slipping or weighing down small idols.' },
      { title: 'All-Year Freshness', body: 'Weather-resistant materials that look fresh through every drive.' },
    ],
    specs: [
      { label: 'Size', value: 'Miniature (fits 2–4 in idols)' },
      { label: 'Use', value: 'Car dashboard & home temple' },
      { label: 'Materials', value: 'Velvet wire & faux pearls' },
      { label: 'Care', value: 'Dust gently with soft cloth' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your quantity', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['ganpati-mala-mogra-pink', 'lotus-asaan', 'ganpati-side-latkan-1ft'],
    finalCtaTitle: 'Carry blessings with you wherever you go.',
  },

  'bouquet-pink-tulips-lilies': {
    slug: 'bouquet-pink-tulips-lilies',
    name: 'Handcrafted Bouquet — Pink Tulips & Lilies',
    title: 'Handcrafted Bouquet — Pink Tulips & Lilies',
    eyebrow: 'everlasting bouquet',
    category: 'Everlasting Bouquets',
    mrp: '₹1,200',
    mrpValue: 1200,
    price: '₹999',
    priceValue: 999,
    badge: 'BESTSELLER',
    metaTitle: 'Handcrafted Bouquet (Pink Tulips & Lilies) — everlasting forever flowers',
    metaDescription: 'Hand-shaped pink tulips & lilies bouquet in pleated champagne wrapping with satin ribbon. ₹999, made to order, ships pan-India.',
    priceRange: { low: 999, high: 999 },
    summary: 'A magnificent everlasting bouquet featuring velvet pink tulips, blooming lilies, delicate accent florets, and lush green foliage wrapped in pleated champagne layers.',
    images: ['/assets/bouquet-pink-tulips-lilies.jpeg'],
    tags: ['Birthdays', 'Anniversaries', 'Romantic gifts', 'Forever flowers'],
    alt: 'Handcrafted Bouquet — Pink Tulips & Lilies',
    ctaLabel: 'DM us to order 💐',
    ctaNote: 'Gift-wrapped and ribboned, ready to surprise someone special.',
    features: [
      { title: 'Never Wilts or Fades', body: 'A handmade floral keepsake that lasts for years, not two days.' },
      { title: 'Pleated Champagne Wrap', body: 'Wrapped in multi-layered champagne pleated paper and tied with a satin ribbon.' },
      { title: 'Meticulous Petal Craft', body: 'Velvet pink tulips and lilies individually shaped by hand.' },
      { title: 'Pan-India Delivery', body: 'Carefully boxed and protected for safe transit.' },
    ],
    specs: [
      { label: 'Height', value: '~14–16 in tall' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Packaging', value: 'Gift-wrapped with satin ribbon' },
      { label: 'Care', value: 'Keep away from direct moisture' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Personalize with a gift note', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We craft & ship it', body: '' },
    ],
    crossSell: ['bouquet-purple', 'bouquet-blush-lily-daisy', 'frame-3d-box'],
    finalCtaTitle: 'A bouquet that never says goodbye.',
  },

  'bouquet-purple': {
    slug: 'bouquet-purple',
    name: 'Handcrafted Bouquet — Lavender & Purple Lilies',
    title: 'Handcrafted Bouquet — Lavender & Purple Lilies',
    eyebrow: 'everlasting bouquet',
    category: 'Everlasting Bouquets',
    mrp: '₹1,200',
    mrpValue: 1200,
    price: '₹999',
    priceValue: 999,
    badge: '17% OFF',
    metaTitle: 'Handcrafted Bouquet (Lavender & Purple Lilies) — forever flowers',
    metaDescription: 'Deep purple lilies and lavender stems wrapped in lilac origami paper with satin ribbon. ₹999, made to order.',
    priceRange: { low: 999, high: 999 },
    summary: 'Handcrafted royal purple lilies and lavender stalks fashioned from velvet craft wire, wrapped in pastel lilac paper and tied with a satin ribbon.',
    images: ['/assets/bouquet-purple.jpeg'],
    tags: ['Birthdays', 'Anniversaries', 'Everlasting'],
    alt: 'Handcrafted Bouquet — Lavender & Purple Lilies',
    ctaLabel: 'DM us to order 💐',
    ctaNote: 'Ready to gift the moment it arrives.',
    features: [
      { title: 'Royal Lavender & Purple Tone', body: 'Vibrant purple lilies paired with textured lavender sprigs.' },
      { title: 'Never Wilts', body: 'Crafted to stay just as radiant year after year.' },
      { title: 'Artisanal Lilac Wrapping', body: 'Crisp origami-style wrapping with a soft sheer ribbon.' },
      { title: 'One of a Kind', body: 'Handmade one bouquet at a time.' },
    ],
    specs: [
      { label: 'Height', value: '~14–16 in tall' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Craft', value: 'Craft-wire velvet petals' },
      { label: 'Care', value: 'Dust gently with brush' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['bouquet-pink-tulips-lilies', 'bouquet-blush-lily-daisy', 'frame-3d-box'],
    finalCtaTitle: 'Give flowers that stay as vibrant as your feelings.',
  },

  'bouquet-blush-lily-daisy': {
    slug: 'bouquet-blush-lily-daisy',
    name: 'Handcrafted Bouquet — Blush Lily & Daisy',
    title: 'Handcrafted Bouquet — Blush Lily & Daisy',
    eyebrow: 'everlasting bouquet',
    category: 'Everlasting Bouquets',
    mrp: '₹1,200',
    mrpValue: 1200,
    price: '₹999',
    priceValue: 999,
    badge: '17% OFF',
    metaTitle: 'Handcrafted Bouquet (Blush Lily & Daisy) — forever flowers',
    metaDescription: 'Handmade blush pink lily with white daisy florets and fern greenery in soft pink wrapping with net lace bow. ₹999, made to order.',
    priceRange: { low: 999, high: 999 },
    summary: 'A charming handcrafted bouquet showcasing a vibrant pink center lily, white daisy blossoms, and fern greenery wrapped in soft blush layers with a net bow.',
    images: ['/assets/bouquet-blush-lily-daisy.jpeg'],
    tags: ['Birthdays', 'Anniversaries', 'Gift-ready'],
    alt: 'Handcrafted Bouquet — Blush Lily & Daisy',
    ctaLabel: 'DM us to order 💐',
    ctaNote: 'Each bouquet is handcrafted with individual care.',
    features: [
      { title: 'Blush Lily & Daisy Harmony', body: 'Vibrant pink lily crowned with white daisy florets and foliage.' },
      { title: 'Forever Keepsake', body: 'A bouquet that holds memories forever.' },
      { title: 'Gift-Boxed Safe Shipping', body: 'Packed securely for pan-India delivery.' },
      { title: 'Hand-Shaped Petals', body: 'Every bloom and leaf is shaped and wired by hand.' },
    ],
    specs: [
      { label: 'Height', value: '~14–16 in tall' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Materials', value: 'Velvet craft wire & paper' },
      { label: 'Reusable', value: 'Forever' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm order details', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['bouquet-pink-tulips-lilies', 'bouquet-purple', 'frame-3d-box'],
    finalCtaTitle: 'A memorable bouquet for someone you cherish.',
  },



  'lotus-decorative-latkan': {
    slug: 'lotus-decorative-latkan',
    name: 'Decorative Latkan for Ganpati (Red Rose)',
    title: 'Decorative Latkan for Ganpati — Set of 2 (Red Rose)',
    eyebrow: 'festive door hanging',
    category: 'Festive Latkans',
    mrp: '₹500',
    mrpValue: 500,
    price: '₹449',
    priceValue: 449,
    badge: '10% OFF',
    metaTitle: 'Decorative Latkan for Ganpati (Red Rose) — set of 2 door hanging',
    metaDescription: 'Handmade red velvet rose latkans on triple pearl strands with rose bud drops. Set of 2, ₹449.',
    priceRange: { low: 449, high: 449 },
    summary: 'Deep red velvet blooms gathered on triple strands of lustrous pearls, finished with matching rose bud drops — a pair for doorways and mandirs.',
    images: ['/assets/lotus-decorative-latkan-1.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Door hanging', 'Festivals & poojas'],
    alt: 'Decorative Latkan for Ganpati — Red Rose & Pearls',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Set of 2 pieces ready to hang.',
    features: [
      { title: 'Matching Pair of 2', body: 'Sold as a pair so you can frame both sides of your doorway or altar.' },
      { title: 'Triple Strand Pearls', body: 'Dense pearl loops catch the festive lighting gracefully.' },
      { title: 'Deep Red Velvet Blooms', body: 'Rich rose flowers hand-rolled from soft velvet craft wire.' },
      { title: 'Reusable Year After Year', body: 'Durable enough to pack away and reuse for every festival.' },
    ],
    specs: [
      { label: 'Pack', value: 'Set of 2 pieces' },
      { label: 'Materials', value: 'Velvet blooms & faux pearls' },
      { label: 'Mounting', value: 'Ready top hanging loop' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm stock & quantity', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['ganpati-side-latkan-1ft', 'door-latkan-5ft-orange', 'lotus-latkan'],
    finalCtaTitle: 'Dress your doorway in festive elegance.',
  },

  'ganpati-side-latkan-1ft': {
    slug: 'ganpati-side-latkan-1ft',
    name: 'Ganpati Side Decoration Latkans (1 Ft)',
    title: 'Ganpati Side Decoration Latkans — 1 Ft (Pack of 2)',
    eyebrow: 'compact latkan pair',
    category: 'Festive Latkans',
    mrp: '₹500',
    mrpValue: 500,
    price: '₹399',
    priceValue: 399,
    badge: '20% OFF',
    metaTitle: 'Ganpati Side Decoration Latkans (1 Ft) — festive pair',
    metaDescription: '1 ft handmade floral side latkans with pearl cascades in Maroon and Pink. Set of 2, ₹399.',
    priceRange: { low: 399, high: 399 },
    summary: 'Compact 1-foot festive latkans handcrafted with lush velvet flowers and cascading pearl drops — ideal for Ganpati makhar, mandir pillars, and mirrors.',
    images: ['/assets/ganpati-side-latkan-1ft.jpeg', '/assets/ganpati-side-latkan-1ft-2.jpeg'],
    tags: ['Ganpati makhar', 'Temple pillars', 'Festive décor', 'Pack of 2'],
    alt: 'Ganpati Side Decoration Latkans 1 Ft',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Pack of 2 pieces.',
    features: [
      { title: 'Compact 1 Ft Drop', body: 'Designed specifically for Ganpati makhars, mandir corners, and mirror frames.' },
      { title: 'Rich Velvet Blooms', body: 'Plush flower heads with detailed green sepals.' },
      { title: 'Multi-Strand Pearl Drops', body: 'Graduated pearl strings with flower bud accents at the bottom.' },
      { title: 'Pack of 2', body: 'Supplied as a matching symmetrical pair.' },
    ],
    specs: [
      { label: 'Length', value: '1 ft' },
      { label: 'Pack', value: 'Set of 2 pieces' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Mounting', value: 'Hanging ring included' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['lotus-decorative-latkan', 'door-latkan-3ft-purple', 'lotus-asaan'],
    finalCtaTitle: 'Add festive detail to your Ganpati setup.',
  },

  'ganpati-side-latkan-maroon': {
    slug: 'ganpati-side-latkan-maroon',
    name: 'Ganpati Side Decoration Latkans (1 Ft — Maroon)',
    title: 'Ganpati Side Decoration Latkans — 1 Ft (Maroon, Pack of 2)',
    eyebrow: 'compact latkan pair',
    category: 'Festive Latkans',
    mrp: '₹500',
    mrpValue: 500,
    price: '₹399',
    priceValue: 399,
    badge: '20% OFF',
    metaTitle: 'Ganpati Side Decoration Latkans 1 Ft (Maroon) — festive pair',
    metaDescription: '1 ft handmade maroon velvet floral side latkans with cascading pearl strands and bud tassels. Pack of 2, ₹399.',
    priceRange: { low: 399, high: 399 },
    summary: 'Lush handcrafted maroon velvet blossoms suspended on premium pearl chains with delicate hanging flower bud tassels — specially designed as a matching pair for Ganpati makhar and mandir decor.',
    images: ['/assets/ganpati-side-latkan-maroon.jpeg'],
    tags: ['Ganpati décor', 'Maroon latkan', 'Side hanging', 'Makhar decor', 'Pack of 2'],
    alt: 'Ganpati Side Decoration Latkans 1 Ft — Maroon with Pearl Strands',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Pack of 2 pieces.',
    features: [
      { title: 'Rich Maroon Velvet Blooms', body: 'Lush multilayered maroon florets crafted with velvet wire.' },
      { title: 'Triple Pearl Cascades', body: 'Tiered pearl strands culminating in delicate bud tassels.' },
      { title: 'Makhar & Mandir Ready', body: 'Compact 1 ft length perfectly frames Ganpati idol backdrops.' },
      { title: 'Pack of 2', body: 'Supplied as a matching symmetrical pair.' },
    ],
    specs: [
      { label: 'Length', value: '1 ft' },
      { label: 'Color', value: 'Deep Maroon & Pearl White' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Mounting', value: 'Hanging ring included' },
    ],
    specsBg: '#fcedec',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['ganpati-side-latkan-1ft', 'lotus-asaan-red', 'lotus-decorative-latkan'],
    finalCtaTitle: 'Frame your Ganpati Bappa in royal maroon elegance.',
  },

  'door-latkan-5ft-orange': {
    slug: 'door-latkan-5ft-orange',
    name: 'Door Side Latkans Decor — 5 Ft (Marigold Orange)',
    title: 'Door Side Latkans Decor — 5 Ft (Marigold Orange, Pack of 2)',
    eyebrow: 'full doorway drape',
    category: 'Festive Latkans',
    mrp: '₹1,000',
    mrpValue: 1000,
    price: '₹799',
    priceValue: 799,
    badge: '20% OFF',
    metaTitle: 'Door Side Latkans Decor 5 Ft (Marigold Orange) — pair',
    metaDescription: 'Full 5 ft handmade marigold orange door latkans with pearl strands and bud drops. Pack of 2, ₹799.',
    priceRange: { low: 799, high: 799 },
    summary: 'Full 5-foot festive door hangings crafted with radiant marigold orange velvet blooms, pearl strands, and triple tassel drops — pack of 2.',
    images: ['/assets/door-latkan-5ft-orange-1.jpeg', '/assets/door-latkan-5ft-orange-2.jpeg'],
    tags: ['Doorway décor', 'Marigold orange', 'Ganpati & Diwali', 'Pack of 2'],
    alt: 'Door Side Latkans Decor 5 Ft — Marigold Orange',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Set of 2 pieces (5 ft each).',
    features: [
      { title: 'Full 5 Ft Doorway Length', body: 'Frames your entrance from top to bottom with grand festive presence.' },
      { title: 'Vibrant Marigold Orange', body: 'Warm, auspicious tones that welcome positivity into your home.' },
      { title: 'Pearl Segments & Tassels', body: 'Evenly spaced pearls with triple bud tassel cascades.' },
      { title: 'Reusable Keepsake', body: 'Never browns or wilts — ready for every pooja and festival.' },
    ],
    specs: [
      { label: 'Length', value: '5 ft each' },
      { label: 'Pack', value: 'Set of 2' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Mounting', value: 'Top loop ready' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-latkan-3ft-lavender', 'door-latkan-3ft-purple', 'lotus-latkan'],
    finalCtaTitle: 'Transform your entrance with auspicious orange blooms.',
  },

  'door-latkan-3ft-lavender': {
    slug: 'door-latkan-3ft-lavender',
    name: 'Door Side Latkans Decor — 3 Ft (Lavender Bud)',
    title: 'Door Side Latkans Decor — 3 Ft (Lavender Bud, Pack of 2)',
    eyebrow: 'pastel elegance',
    category: 'Festive Latkans',
    mrp: '₹1,000',
    mrpValue: 1000,
    price: '₹799',
    priceValue: 799,
    badge: '20% OFF',
    metaTitle: 'Door Side Latkans Decor 3 Ft (Lavender Bud) — pair',
    metaDescription: '3 ft handmade lavender bud and pearl door hangings. Pack of 2, ₹799.',
    priceRange: { low: 799, high: 799 },
    summary: 'Elegant 3-foot door latkans featuring sculptural lavender bud blooms strung on gold-and-white pearl strands with tassel drops — pack of 2.',
    images: ['/assets/door-latkan-3ft-lavender.jpeg'],
    tags: ['Lavender', 'Door hanging', 'Mandir décor', 'Pack of 2'],
    alt: 'Door Side Latkans Decor 3 Ft — Lavender Bud',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Pack of 2 pieces.',
    features: [
      { title: 'Sculpted Lavender Buds', body: 'Velvet petals shaped into blooming bud forms with green leaf cups.' },
      { title: 'Gold & Pearl Chain', body: 'Lustrous pearls paired with metallic gold bead spacers.' },
      { title: '3 Ft Drop', body: 'Ideal length for double doors, temple gateways, and balcony entries.' },
      { title: 'Pack of 2', body: 'Symmetrical pair ready to hang.' },
    ],
    specs: [
      { label: 'Length', value: '3 ft each' },
      { label: 'Pack', value: 'Set of 2' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Care', value: 'Keep dry, reusable' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-latkan-3ft-purple', 'door-latkan-3ft-pink', 'lotus-decorative-latkan'],
    finalCtaTitle: 'Bring soft pastel beauty to your doorway.',
  },

  'door-latkan-3ft-purple': {
    slug: 'door-latkan-3ft-purple',
    name: 'Door Side Latkans Decor — 3 Ft (Purple / Violet)',
    title: 'Door Side Latkans Decor — 3 Ft (Purple / Violet, Pack of 2)',
    eyebrow: 'festive violet',
    category: 'Festive Latkans',
    mrp: '₹800',
    mrpValue: 800,
    price: '₹699',
    priceValue: 699,
    badge: '13% OFF',
    metaTitle: 'Door Side Latkans Decor 3 Ft (Purple / Violet) — pair',
    metaDescription: '3 ft purple and pink floral door hangings with pearl cascades. Pack of 2, ₹699.',
    priceRange: { low: 699, high: 699 },
    summary: 'Vibrant purple and soft pink layered blooms strung on pearl chains with hanging tassels — matching pair for doors and mandir entrances.',
    images: ['/assets/door-latkan-3ft-purple.jpeg'],
    tags: ['Purple latkan', 'Door hanging', 'Ganpati décor', 'Pack of 2'],
    alt: 'Door Side Latkans Decor 3 Ft — Purple / Violet',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Pack of 2 pieces.',
    features: [
      { title: 'Layered Violet & Pink Blooms', body: 'Dual-tone floral clusters shaped by hand.' },
      { title: 'Pearl Strand Drapes', body: 'Double strand pearls connecting each flower tier.' },
      { title: '3 Ft Drop', body: 'Graceful proportion for doorways and pooja setups.' },
      { title: 'Pack of 2', body: 'Matching pair included.' },
    ],
    specs: [
      { label: 'Length', value: '3 ft each' },
      { label: 'Pack', value: 'Set of 2' },
      { label: 'Materials', value: 'Velvet & faux pearls' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-latkan-3ft-pink', 'door-latkan-5ft-orange', 'lotus-latkan'],
    finalCtaTitle: 'Add royal purple charm to your festive home.',
  },

  'door-latkan-3ft-pink': {
    slug: 'door-latkan-3ft-pink',
    name: 'Door Side Pink Latkans Decor — 3 Ft',
    title: 'Door Side Pink Latkans Decor — 3 Ft (Pack of 2)',
    eyebrow: 'vibrant pink pair',
    category: 'Festive Latkans',
    mrp: '₹1,000',
    mrpValue: 1000,
    price: '₹799',
    priceValue: 799,
    badge: '20% OFF',
    metaTitle: 'Door Side Pink Latkans Decor 3 Ft — pair',
    metaDescription: '3 ft bright pink and white tipped floral latkans with pearl strands. Pack of 2, ₹799.',
    priceRange: { low: 799, high: 799 },
    summary: 'Radiant pink velvet flowers with white centers strung on delicate pearl strands — designed to brighten door frames and festive altars.',
    images: ['/assets/door-latkan-3ft-pink.jpeg'],
    tags: ['Pink latkan', 'Doorway décor', 'Diwali & Ganpati', 'Pack of 2'],
    alt: 'Door Side Pink Latkans Decor 3 Ft',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Pack of 2 pieces.',
    features: [
      { title: 'Vibrant Festive Pink', body: 'Eye-catching pink blooms with delicate white inner tiers.' },
      { title: 'Slender Pearl Strands', body: 'Clean pearl stringing allows the blooms to drape fluidly.' },
      { title: '3 Ft Drop', body: 'Perfect height for standard Indian doorways and mandirs.' },
      { title: 'Pack of 2', body: 'Sold as a matching pair.' },
    ],
    specs: [
      { label: 'Length', value: '3 ft each' },
      { label: 'Pack', value: 'Set of 2' },
      { label: 'Materials', value: 'Velvet wire & faux pearls' },
      { label: 'Mounting', value: 'Ready to hang' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-latkan-3ft-lavender', 'door-latkan-3ft-purple', 'lotus-latkan'],
    finalCtaTitle: 'Brighten your entrance with blooming pink elegance.',
  },

  'lotus-latkan': {
    slug: 'lotus-latkan',
    name: 'Lotus Latkan — Set of 2 (5 Ft)',
    title: 'Lotus Latkan — Set of 2 (5 Ft) 🪷',
    eyebrow: 'signature festive hanging',
    category: 'Festive Latkans',
    mrp: '₹1,000',
    mrpValue: 1000,
    price: '₹849',
    priceValue: 849,
    badge: '15% OFF',
    metaTitle: 'Lotus Latkan (Set of 2, 5 Ft) — handmade festive door hanging',
    metaDescription: 'Hand-strung lotus garlands with pearls for door or mandir. Set of 2, 5 ft each, ₹849.',
    priceRange: { low: 849, high: 849 },
    summary: 'A hand-strung lotus garland for your door or mandir — soft pink lotus buds and pearls creating a touch of auspicious grace for every celebration.',
    images: ['/assets/wa-3.jpeg', '/assets/wa-2.jpeg', '/assets/wa-4.jpeg', '/assets/lotus-latkan-flatlay.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Latkan — handmade festive flower hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Set of 2 pieces (5 ft each) ready to hang.',
    features: [
      { title: 'Set of 2, 5 ft each', body: 'Long enough to frame any doorway or mandir beautifully.' },
      { title: 'Lightweight & Reusable', body: 'Durable enough to bring out festival after festival.' },
      { title: 'Hand-strung with Pearls', body: 'Every lotus shaped by hand from premium-quality materials.' },
      { title: 'Easy to Hang & Maintain', body: 'Arrives gift-boxed, ready to hang immediately.' },
    ],
    specs: [
      { label: 'Set of 2', value: 'Sold as a pair' },
      { label: '5 ft each', value: 'Hangs the full doorway' },
      { label: 'Materials', value: 'Craft wire & pearls' },
      { label: 'Reusable', value: 'Festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'We confirm stock', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-latkan-5ft-orange', 'lotus-asaan', 'signature-frame'],
    finalCtaTitle: 'Ready your home for the festival season.',
  },

  'frame-3d-box': {
    slug: 'frame-3d-box',
    name: '3D Flowers Shadow Box Frame (10×10×2 in)',
    title: '3D Flowers Shadow Box Frame (10×10×2 in)',
    eyebrow: 'personalised keepsake',
    category: 'Keepsake Frames',
    mrp: '₹800',
    mrpValue: 800,
    price: '₹699',
    priceValue: 699,
    badge: '13% OFF',
    metaTitle: '3D Flowers Shadow Box Frame (10×10×2 in) — handmade photo gift',
    metaDescription: 'Natural wooden shadow box frame with deep 3D velvet flowers, pearl cores, and your custom photo collage. ₹699.',
    priceRange: { low: 699, high: 699 },
    summary: 'A deep 2-inch wooden shadow box showcasing hand-shaped 3D velvet flowers with pearl cores, customized with your favorite memory photo collage.',
    images: ['/assets/frame-3d-box.jpeg', '/assets/frame-3d-box-2.jpeg'],
    tags: ['Birthdays', 'Anniversaries', 'Keepsake frame', 'Handmade gift'],
    alt: '3D Flowers Shadow Box Frame — handmade photo frame',
    ctaLabel: 'DM us to order 💛',
    ctaNote: 'Place your order → send your photo after → we will craft it with care.',
    features: [
      { title: 'Deep 3D Shadow Box', body: 'Natural pine wood box with 2-inch depth protecting the sculptural blooms.' },
      { title: 'Multi-layer Velvet Flowers', body: 'Red and white textured blooms with lustrous pearl centerpieces.' },
      { title: 'Your Custom Photo Print', body: 'Send your picture to be mounted permanently inside the frame.' },
      { title: 'Forever Keepsake', body: 'Preserves cherished moments in a timeless handmade display.' },
    ],
    specs: [
      { label: 'Frame Size', value: '10 × 10 × 2 in' },
      { label: 'Material', value: 'Solid pine wood & glass front' },
      { label: 'Flowers', value: 'Hand-shaped velvet blooms' },
      { label: 'Photo Required', value: 'Send after ordering via DM' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Send your photo', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We craft & ship it', body: '' },
    ],
    crossSell: ['signature-frame', 'mini-frame', 'bouquet-pink-tulips-lilies'],
    finalCtaTitle: 'A memory framed to last a lifetime.',
  },

  'signature-frame': {
    slug: 'signature-frame',
    name: 'Signature Keepsake Photo Frame',
    title: 'Signature Keepsake Photo Frame',
    eyebrow: 'most loved to give',
    category: 'Keepsake Frames',
    mrp: '₹1,200',
    mrpValue: 1200,
    price: '₹999',
    priceValue: 999,
    badge: 'BESTSELLER',
    metaTitle: 'Personalised Photo Flower Frame — handmade Signature Frame',
    metaDescription: 'Send your favourite photo and we frame it inside hand-shaped craft-wire flowers — a one-of-one handmade keepsake gift. ₹999.',
    priceRange: { low: 999, high: 999 },
    summary: 'Your favourite photo, framed inside a bouquet of hand-shaped flowers — a one-of-one keepsake made just for the two of you.',
    images: ['/assets/frame-4.jpeg', '/assets/frame-1.jpeg', '/assets/frame-2.jpeg', '/assets/frame-3.jpeg'],
    tags: ['Birthdays', 'Anniversaries', 'Weddings', 'Housewarming'],
    alt: 'Signature Frame — handmade flower keepsake frame',
    ctaLabel: 'DM us to order 💛',
    ctaNote: 'Place your order → send your photos after → we will create it with care.',
    features: [
      { title: 'Made for One Person Only', body: 'Built around your photo — it cannot exist for anyone else.' },
      { title: 'A Keepsake, Not a Bouquet', body: 'Flowers that never wilt, framed to last for years.' },
      { title: 'Your Own Words', body: 'Add a short custom message, printed right beside the bouquet.' },
      { title: 'Handmade, Start to Finish', body: 'Every petal shaped by hand from craft wire, one order at a time.' },
    ],
    specs: [
      { label: 'Size', value: '~8×10 in shadow-box frame' },
      { label: 'Made to order', value: '~5–7 days to make' },
      { label: 'Craft', value: 'Craft-wire flowers' },
      { label: 'Customization', value: 'Photo & message included' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Send your photo', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['frame-3d-box', 'mini-frame', 'bouquet-pink-tulips-lilies'],
    finalCtaTitle: 'Have someone in mind? Let us make them a memory that lasts.',
  },

  'mini-frame': {
    slug: 'mini-frame',
    name: 'Mini Keepsake Frame',
    title: 'Mini Keepsake Frame',
    eyebrow: 'pocket-friendly gift',
    category: 'Keepsake Frames',
    mrp: '₹500',
    mrpValue: 500,
    price: '₹399',
    priceValue: 399,
    badge: '20% OFF',
    metaTitle: 'Mini Frame — small handmade flower keepsake gift',
    metaDescription: 'A little square keepsake frame with a handmade craft-wire bloom and your short message. ₹399, made to order.',
    priceRange: { low: 399, high: 399 },
    summary: 'A little square keepsake frame with a handmade bloom and a short message — small, affordable, and just as handmade as the rest.',
    images: ['/assets/frame-5.jpeg', '/assets/frame-6.jpeg'],
    tags: ['Birthdays', 'Thank-you gifts', 'First-time gifting'],
    alt: 'Mini Frame — small handmade flower keepsake',
    ctaLabel: 'DM us to order 💛',
    ctaNote: 'Place your order → send your message → we will craft it with care.',
    features: [
      { title: 'The Perfect First Gift', body: 'Small, sweet, and still entirely handmade.' },
      { title: 'Custom Message Included', body: 'Printed right beside the bloom.' },
      { title: 'Budget-Friendly Care', body: 'Same craft and care, a smaller canvas.' },
      { title: 'Ready in Days', body: 'Faster to make, still made one at a time.' },
    ],
    specs: [
      { label: 'Size', value: '~5×6 in square frame' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Craft', value: 'Craft-wire bloom' },
      { label: 'Message', value: 'Optional custom text' },
    ],
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your message', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['frame-3d-box', 'signature-frame', 'bouquet-pink-tulips-lilies'],
    finalCtaTitle: 'A small gift, a big feeling. Let us make one.',
  },

  'lotus-asaan': {
    slug: 'lotus-asaan',
    name: 'Lotus Asaan — Small (Pink/White)',
    title: 'Lotus Asaan — Small 🪷',
    eyebrow: 'for your bappa',
    category: 'Lotus Asaans',
    mrp: '₹450',
    mrpValue: 450,
    price: '₹349',
    priceValue: 349,
    badge: '22% OFF',
    metaTitle: 'Lotus Asaan (Small) — handmade lotus seat for deity idol',
    metaDescription: 'A handmade craft-wire lotus asaan for your Ganpati or deity idol — pink petals tipped with pearls over green leaves. ₹349.',
    priceRange: { low: 349, high: 349 },
    summary: 'A hand-shaped lotus seat for your Bappa — soft pink and white petals tipped with pearls, resting on a ring of green leaves.',
    images: ['/assets/lotus-asaan-small-1.jpeg', '/assets/lotus-asaan-1.jpeg', '/assets/lotus-asaan-2.jpeg', '/assets/lotus-asaan-3.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Asaan Small — handmade lotus seat for a deity idol',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Order early for Ganesh Chaturthi — each one made fresh.',
    features: [
      { title: 'A Seat Made for Your Bappa', body: 'So your idol never sits bare on the table again.' },
      { title: 'Petals That Never Wilt', body: 'Shaped by hand from craft wire — it comes back out every year.' },
      { title: 'Pearl-Tipped, Leaf-Backed', body: 'Every petal finished with a pearl, set over a ring of green leaves.' },
      { title: 'At Home Anywhere', body: 'Mandir, pooja thali, festive table — or your work desk all year.' },
    ],
    specs: [
      { label: 'Size', value: 'Small (compact idol seat)' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Idol Included', value: 'No (asaan only)' },
      { label: 'Reusable', value: 'Festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Tell us your idol size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan-red', 'lotus-asaan-medium', 'ganpati-mala-mogra-pink'],
    finalCtaTitle: 'Give your Bappa a seat made by hand.',
  },

  'lotus-asaan-red': {
    slug: 'lotus-asaan-red',
    name: 'Lotus Asaan — Vibrant Red & Coral',
    title: 'Lotus Asaan — Vibrant Red & Coral 🪷',
    eyebrow: 'sacred idol seat',
    category: 'Lotus Asaans',
    mrp: '₹450',
    mrpValue: 450,
    price: '₹349',
    priceValue: 349,
    badge: '22% OFF',
    metaTitle: 'Lotus Asaan (Vibrant Red & Coral) — handmade lotus seat for Ganpati',
    metaDescription: 'Handmade velvet craft-wire lotus asaan in vibrant red and coral petals with pearl-tipped edges for your Ganpati idol. ₹349, made to order.',
    priceRange: { low: 349, high: 349 },
    summary: 'A radiant handcrafted lotus asaan featuring vibrant red and coral velvet petals adorned with lustrous pearls and emerald green base leaves — a magnificent sacred throne for Ganpati Bappa.',
    images: ['/assets/lotus-asaan-red.jpeg'],
    tags: ['Lotus Asaan', 'Ganpati seat', 'Murti asaan', 'Pooja decor', 'Red lotus'],
    alt: 'Lotus Asaan Vibrant Red — handmade lotus seat for Ganpati idol',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Each asaan is crafted individually by hand. Idol not included.',
    features: [
      { title: 'Layered Red & Coral Petals', body: 'Rich layered velvet petals shaped by hand for a radiant bloom.' },
      { title: 'Pearl-Tipped Edges', body: 'Each petal crowned with fine pearls for an auspicious finish.' },
      { title: 'Stable Base for Murtis', body: 'Solid circular base holds idols and pooja thalis securely.' },
      { title: 'Forever Keepsake', body: 'Durable velvet craft wire stays fresh season after season.' },
    ],
    specs: [
      { label: 'Style', value: 'Vibrant Red & Coral' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet craft wire & pearls' },
      { label: 'Idol Included', value: 'No (asaan only)' },
    ],
    specsBg: '#fcedec',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your idol size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan', 'lotus-asaan-medium', 'ganpati-side-latkan-maroon'],
    finalCtaTitle: 'Give your Ganpati Bappa a royal handmade throne.',
  },

  'lotus-asaan-medium': {
    slug: 'lotus-asaan-medium',
    name: 'Lotus Asaan — Medium (Multi-Layered)',
    title: 'Lotus Asaan — Medium (Multi-Layered) 🪷',
    eyebrow: 'for your bappa',
    category: 'Lotus Asaans',
    mrp: '₹600',
    mrpValue: 600,
    price: '₹449',
    priceValue: 449,
    badge: '25% OFF',
    metaTitle: 'Lotus Asaan (Medium) — multi-layered handmade lotus seat for Ganpati',
    metaDescription: 'Handmade multi-layered craft-wire lotus asaan for your Ganpati or temple idol — rich pink and white petals with yellow core. ₹449.',
    priceRange: { low: 449, high: 449 },
    summary: 'A grand multi-layered lotus seat for your Bappa — layered pink and white craft-wire petals with a yellow textured core and deep green base leaves.',
    images: ['/assets/lotus-asaan-medium-1.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Lotus Asaan Medium — layered handmade lotus seat for Ganpati idol',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Made to order with care for the festive season.',
    features: [
      { title: 'Grand Layered Design', body: 'Multiple layers of hand-shaped petals create a rich, blooming lotus.' },
      { title: 'Never Wilts', body: 'Crafted with premium materials to shine year after year.' },
      { title: 'Custom Sized for Idols', body: 'Generous medium footprint to seat your Ganpati murti with poise.' },
      { title: 'Pure Handmade Charm', body: 'Every petal shaped and finished by hand with love.' },
    ],
    specs: [
      { label: 'Size', value: 'Medium (fits standard murtis)' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Idol Included', value: 'No (asaan only)' },
      { label: 'Reusable', value: 'Festival after festival' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your murti size', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['pink-lotus-asaan-medium', 'lotus-asaan', 'ganpati-mala-mogra-pink'],
    finalCtaTitle: 'A majestic throne for your Bappa.',
  },

  'pink-lotus-asaan-medium': {
    slug: 'pink-lotus-asaan-medium',
    name: 'Pink Lotus Asaan — Medium (Vibrant Magenta)',
    title: 'Pink Lotus Asaan — Medium (Vibrant Magenta) 🪷',
    eyebrow: 'vibrant magenta',
    category: 'Lotus Asaans',
    mrp: '₹700',
    mrpValue: 700,
    price: '₹549',
    priceValue: 549,
    badge: '21% OFF',
    metaTitle: 'Pink Lotus Asaan (Medium) — vibrant handmade lotus idol seat',
    metaDescription: 'Bright magenta-pink handmade lotus seat for deity idols and Ganpati Bappa — intricate white-tipped stamens and textured center. ₹549.',
    priceRange: { low: 549, high: 549 },
    summary: 'Vibrant magenta-pink lotus asaan with intricate stamens and a rich golden center — a radiant base for your Ganpati or pooja altar.',
    images: ['/assets/pink-lotus-asaan-medium-1.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Pink Lotus Asaan Medium — bright pink handmade lotus seat',
    ctaLabel: 'DM us to order 🪷',
    ctaNote: 'Each asaan is crafted individually by hand.',
    features: [
      { title: 'Vibrant Festive Pink', body: 'Radiant velvet petals that add an eye-catching glow to your altar.' },
      { title: 'Detailed Stamen Crown', body: 'Finished with delicate white-tipped stamens around a plush core.' },
      { title: 'Durable & Reusable', body: 'Keep safely after celebrations and reuse for every festival.' },
      { title: 'Handcrafted Perfection', body: 'Every single petal shaped and mounted by hand.' },
    ],
    specs: [
      { label: 'Size', value: 'Medium (ideal for temple & altar)' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Materials', value: 'Craft-wire & velvet petals' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan-medium', 'lotus-asaan', 'ganpati-mala-mogra-pink'],
    finalCtaTitle: 'Add a vibrant festive touch to your sacred space.',
  },

  // Backward compatibility alias keys for existing routes
  bouquets: {
    slug: 'bouquets',
    name: 'Everlasting Bouquets',
    title: 'Everlasting Bouquets',
    eyebrow: 'everlasting flowers',
    category: 'Everlasting Bouquets',
    mrp: '₹1,200',
    mrpValue: 1200,
    price: '₹999',
    priceValue: 999,
    badge: 'BESTSELLER',
    priceRange: { low: 999, high: 999 },
    summary: "Real flowers wilt in two days. These do not — hand-shaped from craft wire, wrapped and ribboned, ready to gift.",
    images: ['/assets/bouquet-pink-tulips-lilies.jpeg', '/assets/bouquet-purple.jpeg', '/assets/bouquet-blush-lily-daisy.jpeg'],
    tags: ['Birthdays', 'Anniversaries', 'Forever flowers'],
    alt: 'Everlasting handmade bouquet',
    ctaLabel: 'DM us to order 💐',
    ctaNote: 'Choose your favourite colourway over DM.',
    features: [
      { title: 'Never Fades', body: 'A bloom that stays for years, not two days.' },
      { title: 'Gift-Ready', body: 'Wrapped and ribboned, ready to hand over as-is.' },
      { title: 'Actually Handmade', body: 'Every petal shaped by hand from craft wire.' },
      { title: 'Multiple Styles', body: 'Pink Tulips & Lilies, Lavender & Purple Lilies, and Blush Lily & Daisy.' },
    ],
    specs: [
      { label: 'Height', value: '~14 in tall' },
      { label: 'Made to order', value: '~3–5 days to make' },
      { label: 'Materials', value: 'Craft wire & velvet' },
      { label: 'Care', value: 'Keep dry, dust gently' },
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

  'purple-lotus-latkan': {
    slug: 'purple-lotus-latkan',
    name: 'Purple Lotus Latkan — Set of 2',
    title: 'Purple Lotus Latkan — Set of 2 (3 Ft) 🪷',
    eyebrow: 'festive hanging',
    category: 'Festive Latkans',
    mrp: '₹800',
    mrpValue: 800,
    price: '₹699',
    priceValue: 699,
    badge: '13% OFF',
    priceRange: { low: 699, high: 699 },
    summary: 'A hand-strung purple lotus garland for your door or mandir — an elegant, festive touch for every celebration.',
    images: ['/assets/purple-lotus-latkan-1.jpeg', '/assets/purple-lotus-latkan-2.jpeg', '/assets/purple-lotus-latkan-3.jpeg'],
    tags: ['Ganpati décor', 'Diwali décor', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Purple Lotus Latkan — handmade festive flower hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: "Grab yours before it is gone ✿",
    features: [
      { title: 'Set of 2, 3 ft each', body: 'Long enough to frame any doorway or mandir beautifully.' },
      { title: 'Lightweight & Reusable', body: 'Durable enough to bring out festival after festival.' },
      { title: 'Hand-Strung with Pearls', body: 'Every lotus shaped by hand from premium materials.' },
      { title: 'Easy to Hang & Maintain', body: 'Arrives ready to hang the moment it lands.' },
    ],
    specs: [
      { label: 'Set of 2', value: 'Sold as a pair' },
      { label: '3 ft each', value: 'Hangs beautifully at the door' },
      { label: 'Materials', value: 'Velvet petals & pearls' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'We confirm stock', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['lotus-latkan', 'door-latkan-5ft-orange', 'lotus-asaan'],
    finalCtaTitle: 'Bring a touch of purple festive charm to your doorway.',
  },

  'flower-mala': {
    slug: 'flower-mala',
    name: 'Artificial Flower Mala',
    title: 'Artificial Flower Mala',
    eyebrow: 'two styles',
    category: 'Ganpati Malas',
    mrp: '₹180–200',
    mrpValue: 200,
    price: '₹149',
    priceValue: 149,
    badge: 'SALE',
    priceRange: { low: 149, high: 149 },
    summary: 'A handmade velvet-flower mala strung on pearls — for your idol, your mandir, or to welcome someone home.',
    images: ['/assets/flower-mala-braided-1.jpeg', '/assets/flower-mala-cluster-1.jpeg'],
    tags: ['Ganpati décor', 'Weddings', 'Home & temple décor', 'Festivals & poojas'],
    alt: 'Artificial Flower Mala — handmade velvet flower and pearl garland',
    ctaLabel: 'DM us to order 🌺',
    ctaNote: 'Tell us which style — each one is made to order.',
    features: [
      { title: 'Hand-Knotted Pearls', body: 'Pearl segments between every flower, knotted by hand.' },
      { title: 'Sized for Idols', body: 'Made to sit on a murti gracefully.' },
      { title: 'Never Wilts', body: 'Put it away after the pooja and bring it out again next year.' },
      { title: 'Craft-Wire Petals', body: 'Everlasting velvet flowers.' },
    ],
    specs: [
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet craft wire & pearls' },
      { label: 'Reusable', value: 'Yes' },
      { label: 'Care', value: 'Keep dry' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your style', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['lotus-asaan', 'ganpati-mala-mogra-pink', 'lotus-latkan'],
    finalCtaTitle: 'A mala that lasts long after the pooja.',
  },

  'ganpati-special-mala': {
    slug: 'ganpati-special-mala',
    name: 'Ganpati Special Mala Collection',
    title: 'Ganpati Special Mala Collection',
    eyebrow: '4 sacred styles',
    category: 'Ganpati Malas',
    mrp: '₹300',
    mrpValue: 300,
    price: '₹249',
    priceValue: 249,
    badge: 'FESTIVE',
    priceRange: { low: 249, high: 249 },
    summary: 'Handcrafted velvet flower malas strung on pearls — specially designed for Ganpati Bappa idols, home temples, and pooja altars.',
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
      { title: '4 Sacred Styles', body: 'Choose Mogra Lotus, Braided Rose, Tricolor Bloom, or Murti Dashboard Mala.' },
      { title: 'Tailored for Idols', body: 'Proportioned to adorn murtis gracefully without overpowering.' },
      { title: 'Pearl Knotting', body: 'Strung by hand with lustrous pearls and flower bud pendants.' },
      { title: 'Everlasting Devotion', body: 'A holy garland that remains fresh year after year.' },
    ],
    specs: [
      { label: '4 styles', value: 'Mogra, Braided, Tricolor, Murti' },
      { label: 'Made to order', value: '~2–4 days to make' },
      { label: 'Materials', value: 'Velvet blooms & pearls' },
      { label: 'Reusable', value: 'Festival after festival' },
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

  'door-side-latkan-5ft': {
    slug: 'door-side-latkan-5ft',
    name: 'Door Side Latkans Decor (5 Ft)',
    title: 'Door Side Latkans Decor — 5 Ft (Pack of 2)',
    eyebrow: '4 colourways',
    category: 'Festive Latkans',
    mrp: '₹1,000',
    mrpValue: 1000,
    price: '₹799',
    priceValue: 799,
    badge: '20% OFF',
    priceRange: { low: 799, high: 799 },
    summary: 'Full 5-foot festive door latkans handcrafted with layered blooms, pearl beads, and cascading bud drops — available in 4 stunning colourways.',
    images: [
      '/assets/door-latkan-5ft-orange-1.jpeg',
      '/assets/door-latkan-5ft-lavender.jpeg',
      '/assets/door-latkan-5ft-violet-pink.jpeg',
      '/assets/door-latkan-5ft-red.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Doorway décor', 'Festivals & poojas'],
    alt: 'Door Side Latkans Decor 5 Ft — handmade full doorway hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Select your favourite colourway when you message us ✿',
    features: [
      { title: 'Full 5 ft Doorway Coverage', body: 'Hangs the full height of your entrance or mandir for a complete festive look.' },
      { title: '4 Exclusive Colourways', body: 'Choose from Marigold Orange, Lavender, Violet & Pink, or Red Rose.' },
      { title: 'Detailed Pearl Cascades', body: 'Features triple pearl tassels and hand-shaped bud drops at the base.' },
      { title: 'Reusable Year After Year', body: 'Never wilts, browns, or breaks — ready for every celebration.' },
    ],
    specs: [
      { label: 'Length', value: '5 ft each' },
      { label: 'Pack', value: 'Set of 2' },
      { label: 'Materials', value: 'Craft wire, velvet & pearls' },
      { label: 'Mounting', value: 'Top mounting loop included' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your colourway', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['door-latkan-3ft-lavender', 'door-latkan-3ft-purple', 'lotus-latkan'],
    finalCtaTitle: 'Transform your festive entrance with handcrafted grace.',
  },

  'door-side-latkan-4ft': {
    slug: 'door-side-latkan-4ft',
    name: 'Door Side Latkans (4 Ft)',
    title: 'Door Side Latkans — 4 Ft (Pack of 2)',
    eyebrow: 'festive doorway',
    category: 'Festive Latkans',
    mrp: '₹800',
    mrpValue: 800,
    price: '₹649',
    priceValue: 649,
    badge: '19% OFF',
    metaTitle: 'Door Side Latkans 4 Ft (Deep Maroon) — handmade festive doorway hanging',
    metaDescription: 'Handmade deep maroon velvet flower door hanging latkans on lustrous pearl chains with cascading bud drops. Set of 2, 4 ft each, ₹649.',
    priceRange: { low: 649, high: 649 },
    summary: 'Deep maroon velvet flower clusters strung along pearl strands with bud accents — designed to frame doorways with royal elegance.',
    images: [
      '/assets/door-side-latkan-4ft-maroon-1.jpeg',
      '/assets/door-side-latkan-4ft-maroon-2.jpeg',
      '/assets/door-side-latkan-4ft-maroon.jpeg',
    ],
    tags: ['Ganpati décor', 'Diwali décor', 'Doorway décor', 'Festivals & poojas'],
    alt: 'Door Side Latkans 4 Ft — maroon velvet and pearl door hanging',
    ctaLabel: 'DM to order — limited stock',
    ctaNote: 'Handmade to order for your festive entrance.',
    features: [
      { title: '4 ft Doorway Length', body: 'Perfect length to drape gracefully along entrance doors and mandir gates.' },
      { title: 'Rich Maroon Velvet', body: 'Deep wine velvet blooms that exude festive luxury.' },
      { title: 'Hand-Strung Pearl Segments', body: 'Lustrous pearls spaced evenly between each flower cluster.' },
      { title: 'Long-Lasting Keepsake', body: 'Pack away after the festival and bring out every year.' },
    ],
    specs: [
      { label: 'Length', value: '4 ft' },
      { label: 'Pack', value: 'Set of 2' },
      { label: 'Materials', value: 'Velvet blooms & pearls' },
      { label: 'Reusable', value: 'Yes' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Confirm your order', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We pack & ship it', body: '' },
    ],
    crossSell: ['door-latkan-5ft-orange', 'lotus-decorative-latkan', 'lotus-latkan'],
    finalCtaTitle: 'Give your doorway a warm, auspicious welcome.',
  },

  'multipurpose-2ft-latkan': {
    slug: 'multipurpose-2ft-latkan',
    name: 'Multipurpose 2 Ft Latkan',
    title: 'Multipurpose Latkan — 2 Ft (Pack of 2)',
    eyebrow: 'two colourways',
    category: 'Festive Latkans',
    mrp: '₹600',
    mrpValue: 600,
    price: '₹499',
    priceValue: 499,
    badge: '17% OFF',
    priceRange: { low: 499, high: 499 },
    summary: 'A versatile 2-foot handmade latkan featuring a statement bloom, pearl chain, and dangling bud drops — perfect for doors, mandirs, and curtains.',
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
      { title: 'Multipurpose Styling', body: 'Hang it on doorways, mandir corners, curtains, or festive backdrops.' },
      { title: 'Two Vibrant Colourways', body: 'Choose between vibrant Pink/Fuchsia or warm Golden Yellow.' },
      { title: 'Pearl Strands & Bud Drops', body: 'Detailed with lustrous pearls and delicate flower bud tassels.' },
      { title: 'Reusable Forever', body: 'Crafted to stay beautiful across years of celebrations.' },
    ],
    specs: [
      { label: 'Length', value: '2 ft' },
      { label: 'Two colours', value: 'Pink & Golden Yellow' },
      { label: 'Materials', value: 'Craft wire & faux pearls' },
      { label: 'Mounting', value: 'Ready with top loop' },
    ],
    specsBg: '#e7ecd8',
    orderSteps: [
      { title: 'DM us on Instagram', body: '' },
      { title: 'Pick your colourway', body: '' },
      { title: 'Pay upfront to confirm', body: '' },
      { title: 'We make & ship it', body: '' },
    ],
    crossSell: ['door-latkan-5ft-orange', 'lotus-decorative-latkan', 'lotus-latkan'],
    finalCtaTitle: 'Brighten any festive corner with versatile charm.',
  },
}

// Backwards compatibility alias
products['bouquet-pink-lilies'] = products['bouquet-pink-tulips-lilies']

/**
 * Clean flat catalog list for the E-Commerce Product Grid.
 * Each item represents a distinct product or variant card in the store grid.
 */
export const catalogProducts: Product[] = [
  // 1. Ganpati Malas
  products['ganpati-mala-mogra-pink'],
  products['ganpati-mala-braided-rose'],
  products['ganpati-mala-tricolor'],
  products['ganpati-dashboard-mala'],

  // 2. Bouquets
  products['bouquet-pink-tulips-lilies'],
  products['bouquet-purple'],
  products['bouquet-blush-lily-daisy'],

  // 3. Latkans & Festive Hangings
  products['lotus-decorative-latkan'],
  products['ganpati-side-latkan-1ft'],
  products['ganpati-side-latkan-maroon'],
  products['door-latkan-5ft-orange'],
  products['door-side-latkan-4ft'],
  products['door-latkan-3ft-lavender'],
  products['door-latkan-3ft-purple'],
  products['door-latkan-3ft-pink'],
  products['multipurpose-2ft-latkan'],
  products['lotus-latkan'],

  // 4. Frames & Keepsakes
  products['frame-3d-box'],
  products['signature-frame'],
  products['mini-frame'],

  // 5. Lotus Asaans
  products['lotus-asaan'],
  products['lotus-asaan-red'],
  products['lotus-asaan-medium'],
  products['pink-lotus-asaan-medium'],
]

/** Categories for filtering */
export const CATALOG_CATEGORIES = [
  'All Products',
  'Ganpati Malas',
  'Everlasting Bouquets',
  'Festive Latkans',
  'Lotus Asaans',
  'Keepsake Frames',
] as const

/**
 * schema.org Product JSON-LD for a product detail page.
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
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: p.priceRange.low,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/products/${p.slug}`,
          },
        }
      : {}),
  }
}

/** Bouquet variants for dedicated page */
export const bouquetVariants = {
  pink: {
    label: 'Pink Tulips & Lilies',
    images: ['/assets/bouquet-pink-tulips-lilies.jpeg'],
  },
  purple: {
    label: 'Lavender & Purple Lilies',
    images: ['/assets/bouquet-purple.jpeg'],
  },
  blush: {
    label: 'Blush Lily & Daisy',
    images: ['/assets/bouquet-blush-lily-daisy.jpeg'],
  },
} as const

export type BouquetVariant = keyof typeof bouquetVariants

export const malaVariants = {
  mogra: {
    label: 'Mogra & Pink Lotus',
    price: '₹249',
    mrp: '₹300',
    priceRange: { low: 249, high: 249 },
    images: ['/assets/ganpati-mala-mogra-pink.jpeg'],
  },
  braided: {
    label: 'Braided Rose & White',
    price: '₹149',
    mrp: '₹200',
    priceRange: { low: 149, high: 149 },
    images: ['/assets/ganpati-mala-braided-rose.jpeg'],
  },
  tricolor: {
    label: 'Tricolor Bloom',
    price: '₹249',
    mrp: '₹300',
    priceRange: { low: 249, high: 249 },
    images: ['/assets/ganpati-mala-tricolor.jpeg'],
  },
} as const

export type MalaVariant = keyof typeof malaVariants

export const multipurposeLatkanVariants = {
  pink: {
    label: 'Pink / Fuchsia',
    images: ['/assets/multipurpose-latkan-2ft-pink.jpeg'],
  },
  yellow: {
    label: 'Golden Yellow',
    images: ['/assets/multipurpose-latkan-2ft-yellow-1.jpeg', '/assets/multipurpose-latkan-2ft-yellow-2.jpeg'],
  },
} as const

export type MultipurposeLatkanVariant = keyof typeof multipurposeLatkanVariants

export const doorLatkan5ftVariants = {
  orange: {
    label: 'Marigold Orange',
    images: ['/assets/door-latkan-5ft-orange-1.jpeg', '/assets/door-latkan-5ft-orange-2.jpeg'],
  },
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
} as const

export type DoorLatkan5ftVariant = keyof typeof doorLatkan5ftVariants

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
export const navProducts = catalogProducts
