import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'

/**
 * External links (privacy policy, terms). The page lives at `docs/index.html`
 * in the repo root — publish it with GitHub Pages (Settings → Pages → deploy
 * from `main` / `/docs`) and these URLs resolve. Swap the origin if you host
 * it somewhere else or move to a custom domain.
 */
const LEGAL_ORIGIN = 'https://boyanvenkov.github.io/Astrology-App'
export const PRIVACY_URL = `${LEGAL_ORIGIN}/#privacy`
export const TERMS_URL = `${LEGAL_ORIGIN}/#terms`
export const SUPPORT_EMAIL = 'ludbobo@gmail.com'

/** Open a URL in the system browser (native) or a new tab (web). */
export async function openExternal(url: string): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url, presentationStyle: 'popover' })
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  } catch {
    /* ignore */
  }
}
