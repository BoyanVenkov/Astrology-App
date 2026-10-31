/**
 * Script guard for model-written text (the AI horoscope).
 *
 * Language models writing Bulgarian occasionally slip Latin look-alike
 * letters into Cyrillic words ("cвет" with a Latin c) or leave an English
 * proper noun ("Pluto") in the middle of a Cyrillic sentence. Both read as
 * broken text. This repairs them deterministically:
 *
 *  1. Any single word that mixes Cyrillic and Latin letters is folded into
 *     the reader's script, through a homoglyph table (а/a, е/e, о/o, р/p …).
 *     Only folded when every foreign letter has a look-alike — otherwise left.
 *  2. For non-Latin-script locales, whole English names from the glossary
 *     (planets, signs, aspects, chakras) are swapped for the app's own word.
 *
 * Mirror of src/lib/scriptGuard.ts (the app) — keep the two in sync.
 */

export type Script = 'latin' | 'cyrillic' | 'devanagari' | 'arabic' | 'cjk'

export const LOCALE_SCRIPT: Record<string, Script> = {
  en: 'latin', es: 'latin', it: 'latin', fr: 'latin', de: 'latin', pt: 'latin',
  sv: 'latin', sw: 'latin', tr: 'latin', pl: 'latin',
  bg: 'cyrillic', hi: 'devanagari', ar: 'arabic', zh: 'cjk', ja: 'cjk',
}

/** English name → the app's own word for it, in the reader's language. */
export type Glossary = Record<string, string>

// look-alike pairs only (a Latin h has no Bulgarian twin, so it is left alone)
const LAT_TO_CYR: Record<string, string> = {
  a: 'а', e: 'е', o: 'о', p: 'р', c: 'с', x: 'х', y: 'у', k: 'к', m: 'м', t: 'т',
  A: 'А', B: 'В', E: 'Е', K: 'К', M: 'М', H: 'Н', O: 'О', P: 'Р', C: 'С', T: 'Т', X: 'Х', Y: 'У',
}
const CYR_TO_LAT: Record<string, string> = Object.fromEntries(
  Object.entries(LAT_TO_CYR).map(([lat, cyr]) => [cyr, lat]),
)

const CYR = /\p{Script=Cyrillic}/u
const LAT = /\p{Script=Latin}/u
const WORD = /[\p{L}\p{M}]+/gu

function fold(word: string, table: Record<string, string>, foreign: RegExp): string {
  const chars = [...word]
  if (!chars.every((ch) => !foreign.test(ch) || ch in table)) return word
  return chars.map((ch) => (foreign.test(ch) ? table[ch] : ch)).join('')
}

/** Repair words that mix Cyrillic and Latin letters. */
export function fixMixedScript(text: string, script: Script): string {
  return text.replace(WORD, (word) => {
    if (!(CYR.test(word) && LAT.test(word))) return word
    const cyr = [...word].filter((ch) => CYR.test(ch)).length
    const lat = [...word].filter((ch) => LAT.test(ch)).length
    const toCyrillic = script === 'cyrillic' || (script !== 'latin' && cyr >= lat)
    return toCyrillic ? fold(word, LAT_TO_CYR, LAT) : fold(word, CYR_TO_LAT, CYR)
  })
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Swap stray English names for the app's own words (non-Latin scripts only). */
export function localizeNames(text: string, script: Script, glossary: Glossary): string {
  if (script === 'latin') return text
  let out = text
  // longest first, so "Solar Plexus" wins over "Solar"
  for (const en of Object.keys(glossary).sort((a, b) => b.length - a.length)) {
    const local = glossary[en]
    if (!local || local === en) continue
    out = out.replace(
      new RegExp(`(?<![\\p{L}\\p{M}])${escapeRe(en)}(?![\\p{L}\\p{M}])`, 'giu'),
      local,
    )
  }
  return out
}

/** The full pass — run on every AI reading before it is shown or stored. */
export function guardScript(text: string, locale: string, glossary: Glossary = {}): string {
  const script = LOCALE_SCRIPT[locale] ?? 'latin'
  return fixMixedScript(localizeNames(text, script, glossary), script)
}
