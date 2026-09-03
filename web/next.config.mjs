const isDev = process.env.NODE_ENV === 'development'

/**
 * Next's dev bundler ships modules wrapped in `eval()` for HMR and source maps,
 * so a CSP without 'unsafe-eval' blocks *all* client JavaScript on `next dev` —
 * styled-jsx never injects its <style> tags and GSAP never runs, which makes the
 * dev site render as unstyled HTML while production looks perfectly fine.
 * 'unsafe-eval' is therefore added in development only; the production policy
 * stays strict. Don't "simplify" this back to a single constant string.
 */
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'"

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['gsap', '@gsap/react'],
  images: {
    // All product photography is local, so only the local loader is needed.
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            // 'unsafe-inline' is required by styled-jsx (<style> tags) and
            // Next's inline bootstrap scripts; everything else is same-origin.
            // data: images cover the 1-px <picture> placeholder GIF.
            // `scriptSrc` adds 'unsafe-eval' in dev only — see the note above it.
            key: 'Content-Security-Policy',
            value:
              `default-src 'self'; ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'${isDev ? ' ws: wss:' : ''}; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'`,
          },
        ],
      },
    ]
  },
}

export default nextConfig
