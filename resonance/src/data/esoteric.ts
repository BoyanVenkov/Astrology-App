import type { ChakraKey, Crystal, SolfeggioFrequency } from '../types/resonance'
import esotericData from './esotericData.json'

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

export const planetSymbol = (name: string): string => PLANET_SYMBOL[name] ?? '✷'

const slug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const sentence = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}.`

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

/** Every distinct crystal in the database, de-duplicated by name. */
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
        keywords: [entry.chakraName.toLowerCase()],
        description: sentence(c.effect),
      })
    }
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))
})()
