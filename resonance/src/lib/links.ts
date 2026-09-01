import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'

/**
 * External links (privacy policy, terms). Google Play requires a reachable
 * privacy policy URL — replace these with the real hosted pages before ship.
 */
export const PRIVACY_URL = 'https://resonance.app/privacy'
export const TERMS_URL = 'https://resonance.app/terms'
export const SUPPORT_EMAIL = 'hello@resonance.app'

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
