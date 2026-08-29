'use client'

import { useCallback, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { igAppProfile, igDm, igProfile } from '@/lib/site'

/**
 * Every "DM us on Instagram" / "@sunflora…" link on the site.
 *
 * The problem this solves: on a phone these links used to land on Instagram's
 * LOGIN page instead of opening the app. Instagram's web serves a login wall to
 * logged-out visitors for both the profile and the DM composer, so the link is
 * only useful if the phone hands it to the INSTALLED APP before the browser
 * ever fetches it. Three separate things were stopping that:
 *
 * 1. `target="_blank"`. iOS hands a URL to an app via Universal Links only on a
 *    top-level, user-initiated navigation; opened into a new tab it frequently
 *    just loads in Safari. So on a touch device we navigate the page itself.
 *
 * 2. In-app browsers. Most of this site's traffic arrives from the link in the
 *    Instagram bio, which opens inside Instagram's own webview — and a webview
 *    NEVER fires a Universal Link or an Android App Link, whatever the URL. The
 *    only thing that escapes it is the app's own `instagram://` scheme, so that
 *    is what we use there, with the web URL as a fallback if nothing catches it.
 *
 * 3. Redirects. `instagram.com/<handle>` 301s to `www.instagram.com/<handle>`;
 *    the OS matches the URL that was tapped, and once the browser is following
 *    a redirect chain the hand-off is already lost. `lib/site.ts` now points at
 *    the canonical URLs. (`ig.me/m/<handle>` also redirects, but ig.me is itself
 *    claimed by the Instagram app on both platforms and is Meta's own documented
 *    DM deep link, so that one is left alone deliberately — see site.ts.)
 *
 * None of this can rescue a phone with no Instagram app installed, or a desktop
 * visitor who isn't signed in: Instagram shows them the login wall and that is
 * Instagram's decision, not ours.
 */

/** Instagram's and Facebook's in-app browsers. */
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Threads/i

/**
 * The href/onClick pair, to spread onto a component's own `<a>`.
 *
 * **Use this, not `<IgLink>`, inside any component with a `<style jsx>` block**
 * — styled-jsx only stamps its scoping class onto DOM elements, never onto a
 * component, so `<IgLink className="dm-pill">` renders an anchor that none of
 * the block's rules reach. That is how the header's DM pill lost its styling
 * and rendered as bare white-on-white text. `Header`, `Footer` and
 * `ProductsSection` all spread this for that reason; `HeroScene` does because
 * its hotspots are internal links half the time.
 *
 * `extra` is composed with the deep-link handler rather than replacing it: the
 * product cards need `stopPropagation` to suppress the whole-card navigation,
 * and an `onClick` written after the spread would silently drop the hand-off.
 */
export function useInstagramLink(
  to: 'dm' | 'profile' = 'dm',
  extra?: (e: MouseEvent<HTMLAnchorElement>) => void,
) {
  const href = to === 'dm' ? igDm : igProfile

  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      extra?.(e)
      if (typeof window === 'undefined') return
      // Let the browser do its normal thing for modified clicks (open in new
      // tab, save link) and for anything but the primary button.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      // Desktop keeps the new tab: there is no app to hand off to, and losing
      // the shop's own tab to Instagram is worse than a login wall.
      if (!window.matchMedia('(hover: none)').matches) return

      e.preventDefault()

      if (IN_APP.test(navigator.userAgent)) {
        let handled = false
        const cancel = () => {
          handled = true
        }
        // If the app takes over, this page is hidden — which is how we know not
        // to fire the fallback and drag the visitor to a login wall on return.
        document.addEventListener('visibilitychange', cancel, { once: true })
        window.addEventListener('pagehide', cancel, { once: true })
        window.location.href = igAppProfile
        window.setTimeout(() => {
          if (!handled) window.location.href = href
        }, 1200)
        return
      }

      window.location.href = href
    },
    [href, extra],
  )

  return { href, target: '_blank', rel: 'noopener noreferrer', onClick } as const
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & {
  to?: 'dm' | 'profile'
  children: ReactNode
}

export default function IgLink({ to = 'dm', children, onClick, ...rest }: Props) {
  const link = useInstagramLink(to, onClick)
  return (
    <a {...link} {...rest}>
      {children}
    </a>
  )
}
