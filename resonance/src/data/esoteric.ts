import type { ChakraKey, Crystal, SolfeggioFrequency } from '../types/resonance'
import esotericData from './esotericData.json'
import { CRYSTAL_LIBRARY } from './crystalLibrary'

/* ------------------------------------------------------------------- types */

export type PlanetName =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto'

export interface EsotericCrystal {
  name: string
  color: string
  effect: string
}

/** One row of `esotericData.json` — a chakra × planetary-transit pairing. */
export interface EsotericEntry {
  id: string
  chakra: ChakraKey
  chakraName: string
  sanskrit: string
  note: string
  planet: PlanetName
  planetSymbol: string
  frequency: SolfeggioFrequency
  planetToneHz: number
  color: string
  accentColor: string
  affirmation: string
  guidance: string
  crystals: EsotericCrystal[]
}

/* --------------------------------------------------------------- the table */

// The JSON is authored by hand / by `scratchpad/gen-esoteric.mjs`; the cast
// keeps TS from inferring a 2000-line literal type for it.
export const ESOTERIC_ENTRIES = esotericData as unknown as EsotericEntry[]

export const PLANET_SYMBOL: Record<string, string> = Object.fromEntries(
  ESOTERIC_ENTRIES.map((e) => [e.planet, e.planetSymbol]),
)

// Trailing U+FE0E pins the flat text glyph (♀ ♂ ♃ … would otherwise show as
// colour emoji on some platforms).
export const planetSymbol = (name: string): string =>
  `${PLANET_SYMBOL[name] ?? '✷'}︎`

const slug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const sentence = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}.`

const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'with',
  'against', 'into', 'that', 'this', 'your', 'you', 'it', 'its',
])

/** Two keyword-ish words pulled from a crystal's effect blurb. */
function effectKeywords(effect: string, chakraName: string): string[] {
  const skip = new Set([
    ...STOP,
    ...chakraName.toLowerCase().split(/\s+/),
    'chakra',
    'energy',
  ])
  const words = effect
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !skip.has(w))
  return [...new Set(words)].slice(0, 2)
}

/** The row for a given chakra × planet — always defined (the DB is the full 7×10 grid). */
export function entryFor(chakra: ChakraKey, planet: string): EsotericEntry {
  return (
    ESOTERIC_ENTRIES.find((e) => e.chakra === chakra && e.planet === planet) ??
    ESOTERIC_ENTRIES.find((e) => e.chakra === chakra) ??
    ESOTERIC_ENTRIES[0]
  )
}

/** Expand a row's stones into the `Crystal` shape the UI renders. */
export function entryToCrystals(entry: EsotericEntry): Crystal[] {
  return entry.crystals.map((c) => ({
    id: `${entry.id}__${slug(c.name)}`,
    name: c.name,
    chakra: entry.chakra,
    color: c.color,
    keywords: [entry.planet.toLowerCase(), entry.chakraName.toLowerCase()],
    description: sentence(c.effect),
  }))
}

/* -------------------------------------------------- full apothecary catalog */

/** Every distinct crystal — the transit-row stones plus the standalone
 *  library — de-duplicated by name. */
export const ALL_CRYSTALS: Crystal[] = (() => {
  const byName = new Map<string, Crystal>()
  for (const entry of ESOTERIC_ENTRIES) {
    for (const c of entry.crystals) {
      if (byName.has(c.name)) continue
      byName.set(c.name, {
        id: slug(c.name),
        name: c.name,
        chakra: entry.chakra,
        color: c.color,
        keywords: effectKeywords(c.effect, entry.chakraName),
        description: sentence(c.effect),
      })
    }
  }
  for (const c of CRYSTAL_LIBRARY) {
    if (!byName.has(c.name)) byName.set(c.name, c)
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))
})()
