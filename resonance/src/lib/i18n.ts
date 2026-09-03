import { useCallback } from 'react'
import type {
  AstrologicalTransit,
  ChakraKey,
  Locale,
  Mood,
  TransitParts,
} from '../types/resonance'
import { useAppStore } from '../store/useAppStore'
import { detectLocale } from './detectLocale'
import { en, type MessageKey } from './locales/en'
import { bg } from './locales/bg'
import { es } from './locales/es'
import { it } from './locales/it'
import { fr } from './locales/fr'
import { de } from './locales/de'
import { pt } from './locales/pt'
import { sv } from './locales/sv'

export { detectLocale }

/**
 * A small, offline, dependency-free i18n layer. English is the source
 * catalogue and the key type; every other locale must supply every key
 * (a `Record<MessageKey, string>`), so a missing translation won't compile.
 * `{name}` placeholders are substituted by `translate()`.
 */

const CATALOGS: Record<Locale, Partial<Record<MessageKey, string>>> = {
  en,
  bg,
  es,
  it,
  fr,
  de,
  pt,
  sv,
}

export type { Locale }
export type { MessageKey }

export interface LocaleInfo {
  code: Locale
  /** The language's own name, in its own script. */
  native: string
  /** The language's English name. */
  english: string
  /** A short line of the script, for the picker. */
  sample: string
}

export const LOCALES: LocaleInfo[] = [
  { code: 'en', native: 'English', english: 'English', sample: 'The sky, read for you' },
  { code: 'bg', native: 'Български', english: 'Bulgarian', sample: 'Небето, разчетено за теб' },
  { code: 'es', native: 'Español', english: 'Spanish', sample: 'El cielo, leído para ti' },
  { code: 'it', native: 'Italiano', english: 'Italian', sample: 'Il cielo, letto per te' },
  { code: 'fr', native: 'Français', english: 'French', sample: 'Le ciel, lu pour toi' },
  { code: 'de', native: 'Deutsch', english: 'German', sample: 'Der Himmel, für dich gelesen' },
  { code: 'pt', native: 'Português', english: 'Portuguese', sample: 'O céu, lido para você' },
  { code: 'sv', native: 'Svenska', english: 'Swedish', sample: 'Himlen, läst för dig' },
]

export type TranslateParams = Record<string, string | number>

export function translate(
  locale: Locale,
  key: MessageKey,
  params?: TranslateParams,
): string {
  const raw = CATALOGS[locale]?.[key] ?? en[key] ?? key
  if (!params) return raw
  return raw.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in params ? String(params[name]) : `{${name}}`,
  )
}

export type TFn = (key: MessageKey, params?: TranslateParams) => string

/** Hook — re-renders the component when the locale changes. */
export function useT(): TFn {
  const locale = useAppStore((s) => s.locale)
  return useCallback<TFn>((key, params) => translate(locale, key, params), [locale])
}

/** For non-React code (rare — most generated text is handled elsewhere). */
export const t: TFn = (key, params) =>
  translate(useAppStore.getState().locale, key, params)

/** BCP-47 tag for `Intl` / `toLocale*` formatting. */
const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en-US',
  bg: 'bg-BG',
  es: 'es-ES',
  it: 'it-IT',
  fr: 'fr-FR',
  de: 'de-DE',
  pt: 'pt-BR',
  sv: 'sv-SE',
}
export const localeTag = (locale: Locale): string => LOCALE_TAGS[locale]

/** Hook — the BCP-47 tag for the active locale. */
export function useLocaleTag(): string {
  return localeTag(useAppStore((s) => s.locale))
}

/** Keep `<html lang>` in step so fonts / hyphenation resolve per script. */
export function applyHtmlLang(locale: Locale): void {
  try {
    document.documentElement.lang = locale
  } catch {
    /* ignore */
  }
}

/* ---- localized display names for engine identifiers ---- */

export const chakraLabel = (key: ChakraKey, tr: TFn): string =>
  tr(`chakra.${key}` as MessageKey)

export const moodLabel = (m: Mood, tr: TFn): string =>
  tr(`mood.${m}` as MessageKey)

export const auraLabel = (score: number, tr: TFn): string => {
  if (score >= 0.8) return tr('aura.radiant')
  if (score >= 0.62) return tr('aura.bright')
  if (score >= 0.42) return tr('aura.steady')
  if (score >= 0.25) return tr('aura.dim')
  return tr('aura.depleted')
}

export const signLabel = (sign: string, tr: TFn): string =>
  tr(`sign.${sign}` as MessageKey)
export const seasonLabel = (season: string, tr: TFn): string =>
  tr(`geo.season.${season}` as MessageKey)
export const planetLabel = (body: string, tr: TFn): string =>
  tr(`planet.${body}` as MessageKey)
export const phaseLabel = (phase: string, tr: TFn): string =>
  tr(`phase.${phase}` as MessageKey)
export const aspectLabel = (name: string, tr: TFn): string =>
  tr(`aspect.${name}` as MessageKey)
export const houseArena = (n: number, tr: TFn): string =>
  tr(`house.${n}` as MessageKey)
export const ordinal = (n: number, tr: TFn): string =>
  tr(`ord.${n}` as MessageKey)

export const breathName = (key: string, tr: TFn): string =>
  tr(`breath.${key}.name` as MessageKey)
export const breathTag = (key: string, tr: TFn): string =>
  tr(`breath.${key}.tag` as MessageKey)
export const breathGuide = (key: string, tr: TFn): string =>
  tr(`breath.${key}.guide` as MessageKey)
export const breathStep = (label: string, tr: TFn): string =>
  tr(`breath.step.${label}` as MessageKey)
export const medName = (key: string, tr: TFn): string =>
  tr(`med.${key}.name` as MessageKey)
export const medTag = (key: string, tr: TFn): string =>
  tr(`med.${key}.tag` as MessageKey)
export const breathHint = (kind: string, tr: TFn): string =>
  tr(`breath.hint.${kind}` as MessageKey)

const KNOWN_HZ = new Set([174, 285, 396, 417, 432, 528, 639, 741, 852, 963])
export const solfeggioIntention = (hz: number, tr: TFn): string =>
  KNOWN_HZ.has(hz)
    ? tr(`freq.intention.${hz}` as MessageKey)
    : tr('freq.intention.default')

/* ---- generated reading text — recomposed per locale at display ---- */

/** The chakra's localised detail (name, sanskrit, element, location, theme). */
export const chakraDetail = (
  key: ChakraKey,
  tr: TFn,
): {
  name: string
  sanskrit: string
  element: string
  location: string
  theme: string
} => ({
  name: tr(`chakra.${key}` as MessageKey),
  sanskrit: tr(`chakra.${key}.sanskrit` as MessageKey),
  element: tr(`chakra.${key}.element` as MessageKey),
  location: tr(`chakra.${key}.location` as MessageKey),
  theme: tr(`chakra.${key}.theme` as MessageKey),
})

/** The esoteric guidance line — composed from planet × chakra pieces. */
export const esotericGuidance = (
  chakra: ChakraKey,
  planet: string,
  tr: TFn,
): string =>
  tr('esoteric.line', {
    planet: planetLabel(planet, tr),
    verb: tr(`esoteric.verb.${planet}` as MessageKey),
    chakra: tr(`chakra.${chakra}` as MessageKey),
    focus: tr(`esoteric.focus.${chakra}` as MessageKey),
    colour: tr(`esoteric.colour.${planet}` as MessageKey),
  })

export const transitTarget = (p: TransitParts, tr: TFn): string => {
  const body = p.targetBody
    ? planetLabel(p.targetBody, tr)
    : signLabel(p.sign, tr)
  return p.targetNatal ? tr('transit.natalTarget', { body }) : body
}

/** The day's transit as a headline — "Saturn square natal Neptune". */
export const transitTitle = (
  transit: Pick<AstrologicalTransit, 'title' | 'parts'>,
  tr: TFn,
): string => {
  const p = transit.parts
  if (!p) return transit.title
  if (p.aspect === 'in') {
    return tr('transit.title.inSign', {
      planet: planetLabel(p.planet, tr),
      sign: signLabel(p.sign, tr),
    })
  }
  return tr('transit.title.aspect', {
    a: planetLabel(p.trigger ?? p.planet, tr),
    rel: tr(`transit.rel.${p.aspect}` as MessageKey),
    b: transitTarget(p, tr),
  })
}

/** The day's transit as a paragraph — headline, house, guidance, closing cue. */
export const transitInfluence = (
  transit: Pick<AstrologicalTransit, 'influence' | 'parts'>,
  tr: TFn,
): string => {
  const p = transit.parts
  if (!p) return transit.influence
  const rx = p.retrograde ? tr('transit.rx') : ''
  const rel = tr(`transit.rel.${p.aspect}` as MessageKey)
  let headline: string
  if (p.aspect === 'in') {
    headline = tr('transit.headline.inSign', {
      planet: planetLabel(p.planet, tr),
      rx,
      sign: signLabel(p.sign, tr),
    })
  } else if (p.trigger) {
    headline = tr('transit.headline.trigger', {
      a: planetLabel(p.trigger, tr),
      rel,
      b: transitTarget(p, tr),
    })
  } else {
    headline = tr('transit.headline.aspect', {
      planet: planetLabel(p.planet, tr),
      rx,
      rel,
      b: transitTarget(p, tr),
    })
  }
  const house =
    p.house != null && p.house >= 1
      ? tr('transit.house', {
          ord: ordinal(p.house, tr),
          arena: houseArena(p.house, tr),
        })
      : ''
  return tr('transit.influence', {
    headline,
    house,
    esoteric: esotericGuidance(p.chakra, p.planet, tr),
    guide: p.vulnerable ? tr('transit.guide.ground') : tr('transit.guide.amplify'),
  })
}
