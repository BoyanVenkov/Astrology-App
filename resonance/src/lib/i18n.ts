import { useCallback } from 'react'
import type { ChakraKey, Locale, Mood } from '../types/resonance'
import { useAppStore } from '../store/useAppStore'
import { detectLocale } from './detectLocale'
import { en, type MessageKey } from './locales/en'
import { bg } from './locales/bg'

export { detectLocale }

/**
 * A small, offline, dependency-free i18n layer. English is the source
 * catalogue and the key type; every other locale must supply every key
 * (a `Record<MessageKey, string>`), so a missing translation won't compile.
 * `{name}` placeholders are substituted by `translate()`.
 */

const CATALOGS: Record<Locale, Partial<Record<MessageKey, string>>> = { en, bg }

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
