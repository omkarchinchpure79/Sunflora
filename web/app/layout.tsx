import type { Metadata, Viewport } from 'next'
import { Caveat, Cormorant_Garamond, Work_Sans } from 'next/font/google'
import { BRAND, SITE_URL, igProfile } from '@/lib/site'
import './globals.css'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sunflora — Turn your favourite photo into a flower that never fades',
    template: '%s · Sunflora',
  },
  description:
    'Handmade, made-to-order photo keepsake frames, everlasting bouquets and festive Lotus Latkan hangings. Shaped by hand from craft wire, one order at a time. Ships pan-India.',
  keywords: [
    'handmade photo frame',
    'personalised gift India',
    'everlasting bouquet',
    'craft wire flowers',
    'lotus latkan',
    'handmade gifts India',
    'Sunflora',
  ],
  authors: [{ name: BRAND.name }],
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Sunflora — a memory you can keep forever',
    description:
      'Handmade keepsake frames, everlasting bouquets and festive lotus hangings. Made to order, one at a time.',
    images: [
      {
        url: '/assets/bouquet-burgundy-white-styled.jpg',
        // Actual pixel dimensions of the file — keep in sync if it changes.
        width: 1086,
        height: 1448,
        alt: 'A handmade everlasting bouquet by Sunflora',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunflora — a memory you can keep forever',
    description:
      'Handmade keepsake frames, everlasting bouquets and festive lotus hangings.',
    images: ['/assets/bouquet-burgundy-white-styled.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#F7F3FB',
  width: 'device-width',
  initialScale: 1,
  // Never block pinch-zoom — some visitors need it to read the fine print.
  maximumScale: 5,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: BRAND.name,
  description:
    'Handmade, made-to-order photo keepsake frames, everlasting bouquets and festive lotus hangings.',
  url: SITE_URL,
  image: `${SITE_URL}/assets/bouquet-burgundy-white-styled.jpg`,
  sameAs: [igProfile],
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  areaServed: 'IN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${caveat.variable} ${cormorant.variable} ${workSans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
