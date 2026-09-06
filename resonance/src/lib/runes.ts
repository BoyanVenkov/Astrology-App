import type { BirthProfile, ChakraKey } from '../types/resonance'
import { fnv1a, mulberry32 } from './tarot'
import { localDayKey } from './timezone'
import type { MessageKey } from './locales/en'
import type { TFn } from './i18n'

/**
 * The Elder Futhark — 24 runes in three ættir. Drawn deterministically from a
 * seed (the day + the querent's chart), so a reading is stable and personal.
 * Text is composed from the `rune.*` phrase bank per locale; the glyphs are
 * hand-drawn SVG stroke paths so they render on-brand at any size.
 */

export type RuneKey =
  | 'fehu' | 'uruz' | 'thurisaz' | 'ansuz' | 'raidho' | 'kenaz' | 'gebo' | 'wunjo'
  | 'hagalaz' | 'nauthiz' | 'isa' | 'jera' | 'eihwaz' | 'perthro' | 'algiz' | 'sowilo'
  | 'tiwaz' | 'berkano' | 'ehwaz' | 'mannaz' | 'laguz' | 'ingwaz' | 'dagaz' | 'othala'

export type RuneElement = 'fire' | 'ice' | 'earth' | 'air' | 'water' | 'spirit'

export interface RuneMeta {
  key: RuneKey
  /** Reconstructed Old Norse name — the same in every language. */
  name: string
  /** The sound the rune carried. */
  sound: string
  aett: 1 | 2 | 3
  /** Symmetrical runes have no reversed form. */
  reversible: boolean
  element: RuneElement
  /** Which of Resonance's seven centres this rune resonates with. */
  chakra: ChakraKey
  /** Inherent yes/no lean for "Ask the Runes", −3…+3. */
  lean: number
  /** SVG stroke path on a `0 0 24 34` viewBox. */
  strokes: string
}

/* viewBox 0 0 24 34 · stave usually x≈6, top y≈3, bottom y≈31 */
export const RUNES: Record<RuneKey, RuneMeta> = {
  fehu: {
    key: 'fehu', name: 'Fehu', sound: 'F', aett: 1, reversible: true,
    element: 'earth', chakra: 'root', lean: 2,
    strokes: 'M6 3V31 M6 11L18 5 M6 19L18 13',
  },
  uruz: {
    key: 'uruz', name: 'Uruz', sound: 'U', aett: 1, reversible: true,
    element: 'earth', chakra: 'root', lean: 1,
    strokes: 'M6 31V4L18 12V31',
  },
  thurisaz: {
    key: 'thurisaz', name: 'Thurisaz', sound: 'Th', aett: 1, reversible: true,
    element: 'fire', chakra: 'solar-plexus', lean: -1,
    strokes: 'M6 3V31 M6 12L17 17L6 22',
  },
  ansuz: {
    key: 'ansuz', name: 'Ansuz', sound: 'A', aett: 1, reversible: true,
    element: 'air', chakra: 'throat', lean: 1,
    strokes: 'M6 3V31 M6 8L18 14 M6 16L18 22',
  },
  raidho: {
    key: 'raidho', name: 'Raidho', sound: 'R', aett: 1, reversible: true,
    element: 'air', chakra: 'sacral', lean: 1,
    strokes: 'M6 3V31 M6 3L17 8L6 17 M6 17L18 31',
  },
  kenaz: {
    key: 'kenaz', name: 'Kenaz', sound: 'K', aett: 1, reversible: true,
    element: 'fire', chakra: 'sacral', lean: 1,
    strokes: 'M18 5L6 17L18 29',
  },
  gebo: {
    key: 'gebo', name: 'Gebo', sound: 'G', aett: 1, reversible: false,
    element: 'spirit', chakra: 'heart', lean: 2,
    strokes: 'M5 5L19 29 M19 5L5 29',
  },
  wunjo: {
    key: 'wunjo', name: 'Wunjo', sound: 'W', aett: 1, reversible: true,
    element: 'spirit', chakra: 'heart', lean: 3,
    strokes: 'M6 3V31 M6 3L18 9L6 16',
  },
  hagalaz: {
    key: 'hagalaz', name: 'Hagalaz', sound: 'H', aett: 2, reversible: false,
    element: 'ice', chakra: 'root', lean: -3,
    strokes: 'M6 3V31 M18 3V31 M6 14L18 22',
  },
  nauthiz: {
    key: 'nauthiz', name: 'Nauthiz', sound: 'N', aett: 2, reversible: true,
    element: 'fire', chakra: 'solar-plexus', lean: -2,
    strokes: 'M12 3V31 M4 22L20 12',
  },
  isa: {
    key: 'isa', name: 'Isa', sound: 'I', aett: 2, reversible: false,
    element: 'ice', chakra: 'third-eye', lean: -2,
    strokes: 'M12 3V31',
  },
  jera: {
    key: 'jera', name: 'Jera', sound: 'J / Y', aett: 2, reversible: false,
    element: 'earth', chakra: 'sacral', lean: 2,
    strokes: 'M7 5L14 10L7 15 M17 19L10 24L17 29',
  },
  eihwaz: {
    key: 'eihwaz', name: 'Eihwaz', sound: 'Ï', aett: 2, reversible: false,
    element: 'spirit', chakra: 'root', lean: 0,
    strokes: 'M10 3V31 M10 6L16 3 M10 28L4 31',
  },
  perthro: {
    key: 'perthro', name: 'Perthro', sound: 'P', aett: 2, reversible: true,
    element: 'water', chakra: 'third-eye', lean: 0,
    strokes: 'M17 3L7 8V26L17 31',
  },
  algiz: {
    key: 'algiz', name: 'Algiz', sound: 'Z', aett: 2, reversible: true,
    element: 'spirit', chakra: 'crown', lean: 1,
    strokes: 'M12 5V31 M12 13L4 4 M12 13L20 4',
  },
  sowilo: {
    key: 'sowilo', name: 'Sowilo', sound: 'S', aett: 2, reversible: false,
    element: 'fire', chakra: 'solar-plexus', lean: 3,
    strokes: 'M18 4L8 4L18 17L8 30',
  },
  tiwaz: {
    key: 'tiwaz', name: 'Tiwaz', sound: 'T', aett: 3, reversible: true,
    element: 'air', chakra: 'solar-plexus', lean: 1,
    strokes: 'M12 6V31 M5 12L12 5L19 12',
  },
  berkano: {
    key: 'berkano', name: 'Berkano', sound: 'B', aett: 3, reversible: true,
    element: 'earth', chakra: 'sacral', lean: 2,
    strokes: 'M6 3V31 M6 4L17 9L6 16 M6 16L17 22L6 29',
  },
  ehwaz: {
    key: 'ehwaz', name: 'Ehwaz', sound: 'E', aett: 3, reversible: true,
    element: 'air', chakra: 'heart', lean: 1,
    strokes: 'M6 31V5L12 13L18 5V31',
  },
  mannaz: {
    key: 'mannaz', name: 'Mannaz', sound: 'M', aett: 3, reversible: false,
    element: 'air', chakra: 'heart', lean: 1,
    strokes: 'M6 3V31 M18 3V31 M6 5L18 15 M18 5L6 15',
  },
  laguz: {
    key: 'laguz', name: 'Laguz', sound: 'L', aett: 3, reversible: true,
    element: 'water', chakra: 'sacral', lean: 0,
    strokes: 'M8 3V31 M8 5L18 11',
  },
  ingwaz: {
    key: 'ingwaz', name: 'Ingwaz', sound: 'Ng', aett: 3, reversible: false,
    element: 'earth', chakra: 'root', lean: 1,
    strokes: 'M12 4L20 17L12 30L4 17Z',
  },
  dagaz: {
    key: 'dagaz', name: 'Dagaz', sound: 'D', aett: 3, reversible: false,
    element: 'fire', chakra: 'crown', lean: 2,
    strokes: 'M4 4L20 30 M20 4L4 30 M4 4V30 M20 4V30',
  },
  othala: {
    key: 'othala', name: 'Othala', sound: 'O', aett: 3, reversible: true,
    element: 'earth', chakra: 'root', lean: 0,
    strokes: 'M12 3L20 12L12 21L4 12Z M9 19L4 31 M15 19L20 31',
  },
}

export const RUNE_KEYS = Object.keys(RUNES) as RuneKey[]

export const runeMeta = (key: RuneKey): RuneMeta => RUNES[key]

/* --------------------------------------------------------------- text */

export interface RuneText {
  name: string
  meaning: string
  keywords: string[]
  /** The full reading for the drawn orientation. */
  body: string
  /** The one-line "what it asks of you". */
  today: string
}

export const runeText = (key: RuneKey, merkstave: boolean, t: TFn): RuneText => {
  const m = RUNES[key]
  const orient = merkstave && m.reversible ? 'merk' : 'up'
  return {
    name: m.name,
    meaning: t(`rune.${key}.meaning` as MessageKey),
    keywords: t(`rune.${key}.keywords` as MessageKey).split(' · '),
    body: t(`rune.${key}.${orient}` as MessageKey),
    today: t(`rune.${key}.today` as MessageKey),
  }
}

/* --------------------------------------------------------------- draw */

export interface DrawnRune {
  key: RuneKey
  merkstave: boolean
}

export interface RuneCast {
  layoutKey: RuneLayoutKey
  runes: DrawnRune[]
  seed: string
}

export type RuneLayoutKey = 'one' | 'norns' | 'cross'

export interface RuneLayout {
  key: RuneLayoutKey
  count: number
  /** Position keys, for the phrase bank (`rune.pos.<key>`). */
  positions: string[]
}

export const RUNE_LAYOUTS: RuneLayout[] = [
  { key: 'one', count: 1, positions: ['now'] },
  { key: 'norns', count: 3, positions: ['urdr', 'verdandi', 'skuld'] },
  {
    key: 'cross',
    count: 5,
    positions: ['heart', 'crossing', 'root', 'counsel', 'outcome'],
  },
]

export const layoutOf = (key: RuneLayoutKey): RuneLayout =>
  RUNE_LAYOUTS.find((l) => l.key === key) ?? RUNE_LAYOUTS[0]

/** Draw `count` distinct runes with the seed; ~1 in 3 reversible runes fall merkstave. */
export function drawRunes(layout: RuneLayout, seed: string): RuneCast {
  const rand = mulberry32(fnv1a(seed))
  const order = RUNE_KEYS.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const runes: DrawnRune[] = Array.from({ length: layout.count }, (_, i) => {
    const key = RUNE_KEYS[order[i]]
    return { key, merkstave: RUNES[key].reversible && rand() < 0.34 }
  })
  return { layoutKey: layout.key, runes, seed }
}

/** The day's stable single rune for this querent. */
export function runeDailySeed(
  profile: BirthProfile | null,
  date: Date = new Date(),
): string {
  return `${localDayKey(date)}|${profile?.utc ?? 'no-natal'}|daily-rune`
}

export function runeFreshSeed(): string {
  return `rune-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function runeAskSeed(
  question: string,
  profile: BirthProfile | null,
  date: Date = new Date(),
): string {
  const q = question.trim().toLowerCase().replace(/\s+/g, ' ')
  return `${localDayKey(date)}|${profile?.utc ?? 'no-natal'}|rune-ask|${q}`
}

/* ------------------------------------------------------- ask the runes */

export type RuneVerdict = 'yes' | 'no' | 'wait' | 'hidden'

export interface RuneAnswer {
  drawn: DrawnRune
  verdict: RuneVerdict
}

export function askRunes(
  question: string,
  profile: BirthProfile | null,
): RuneAnswer {
  const { runes } = drawRunes(layoutOf('one'), runeAskSeed(question, profile))
  const drawn = runes[0]
  const m = RUNES[drawn.key]
  let lean = m.lean
  if (drawn.merkstave) lean = -lean
  let verdict: RuneVerdict
  if (drawn.key === 'perthro' || drawn.key === 'eihwaz') verdict = 'hidden'
  else if (lean >= 2) verdict = 'yes'
  else if (lean <= -2) verdict = 'no'
  else verdict = 'wait'
  return { drawn, verdict }
}
