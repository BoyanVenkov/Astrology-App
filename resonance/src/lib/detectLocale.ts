import type { Locale } from '../types/resonance'

/** Supported UI languages — keep in sync with `lib/i18n` catalogues. */
export const SUPPORTED_LOCALES: Locale[] = ['en', 'bg', 'es', 'it', 'fr', 'de']

/** Best-guess locale from the device language list, English otherwise. */
export function detectLocale(): Locale {
  try {
    const langs = navigator.languages ?? [navigator.language]
    for (const raw of langs) {
      const code = raw.toLowerCase().split('-')[0]
      if ((SUPPORTED_LOCALES as string[]).includes(code)) return code as Locale
    }
  } catch {
    /* ignore */
  }
  return 'en'
}
