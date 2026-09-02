import type { Aspect, AspectHarmony } from './astrology'
import { PLANET_CHAKRA } from './astrology'
import type { BodyName } from './ephemeris'
import { useAppStore } from '../store/useAppStore'
import { chakraDetail, useT, type TFn } from './i18n'
import type { MessageKey } from './locales/en'
import { CHAKRA_ORDER, chakraInfo, chakraMantra } from './resonanceData'
import type { ChakraKey, SolfeggioFrequency } from '../types/resonance'

/**
 * The Chakra Field — the same transit engine that picks the day's focus, run
 * across all seven centres. Each transiting body resonates with one chakra
 * (`PLANET_CHAKRA`); its aspects to the natal chart (or, chart-less, the
 * transiting Moon's aspects) charge or strain that centre.
 */

export type ChakraTone =
  | 'blocked'
  | 'strained'
  | 'quiet'
  | 'steady'
  | 'lit'
  | 'open'


export interface ChakraContact {
  /** The moving body whose resonance lands on this centre. */
  transiting: BodyName
  aspect: string
  /** The body it aspects — natal, or (chart-less) another transiting body. */
  other: BodyName
  natal: boolean
  harmony: AspectHarmony
  orbDelta: number
  applying: boolean
  exactness: number
}

export interface ChakraReading {
  key: ChakraKey
  name: string
  color: string
  note: string
  sanskrit: string
  element: string
  location: string
  petals: number
  theme: string
  mantra: string
  frequency: SolfeggioFrequency
  /** 0–100 — how open / flowing this centre is right now. */
  charge: number
  tone: ChakraTone
  state: string
  /** The strongest contact, or null when nothing touches this centre. */
  driver: ChakraContact | null
  contacts: ChakraContact[]
  /** Natal house the driver is transiting, if known. */
  house: number | null
  /** One-line practice cue. */
  cue: string
  /** True for the day's focus centre. */
  focus: boolean
}

/** Benefic (+) / malefic (−) lean — colours what a conjunction does. */
const NATURE: Record<BodyName, number> = {
  Sun: 0.2,
  Moon: 0,
  Mercury: 0,
  Venus: 1,
  Mars: -0.7,
  Jupiter: 1,
  Saturn: -0.8,
  Uranus: -0.3,
  Neptune: -0.2,
  Pluto: -0.6,
}

/** How heavily a body's contact weighs. */
const MASS: Record<BodyName, number> = {
  Moon: 0.6,
  Sun: 0.9,
  Mercury: 0.7,
  Venus: 0.75,
  Mars: 0.85,
  Jupiter: 1,
  Saturn: 1.1,
  Uranus: 1.05,
  Neptune: 1.05,
  Pluto: 1.15,
}

const clamp = (n: number): number => Math.max(6, Math.min(98, Math.round(n)))

function cueFor(tone: ChakraTone, freq: SolfeggioFrequency, t: TFn): string {
  switch (tone) {
    case 'blocked':
    case 'strained':
      return t('field.cue.blocked', { hz: freq })
    case 'quiet':
      return t('field.cue.quiet')
    case 'steady':
      return t('field.cue.steady', { hz: freq })
    case 'lit':
      return t('field.cue.lit', { hz: freq })
    case 'open':
      return t('field.cue.open', { hz: freq })
  }
}

export interface ChakraFieldInput {
  aspects: Aspect[]
  hasNatal: boolean
  focusKey: ChakraKey
  focusBalance: number
  transitHouses: Partial<Record<BodyName, number>>
}

export function computeChakraField(
  input: ChakraFieldInput,
  t: TFn,
): ChakraReading[] {
  const { aspects, hasNatal, focusKey, focusBalance, transitHouses } = input

  const buckets: Record<ChakraKey, ChakraContact[]> = {
    root: [],
    sacral: [],
    'solar-plexus': [],
    heart: [],
    throat: [],
    'third-eye': [],
    crown: [],
  }

  for (const a of aspects) {
    // natal mode → the transiting body's centre; chart-less → the body the
    // transiting Moon is contacting.
    const resonator = hasNatal ? a.transiting : a.other
    buckets[PLANET_CHAKRA[resonator]].push({
      transiting: a.transiting,
      aspect: a.def.name,
      other: a.other,
      natal: hasNatal,
      harmony: a.def.harmony,
      orbDelta: a.orbDelta,
      applying: a.applying,
      exactness: a.exactness,
    })
  }

  return CHAKRA_ORDER.map((key) => {
    const info = chakraInfo(key)
    const detail = chakraDetail(key, t)
    const contacts = [...buckets[key]].sort((x, y) => y.exactness - x.exactness)
    const driver = contacts[0] ?? null

    let charge: number
    if (key === focusKey) {
      charge = clamp(focusBalance)
    } else if (contacts.length === 0) {
      charge = 50
    } else {
      let s = 50
      for (const c of contacts) {
        const w = c.exactness * MASS[c.transiting]
        if (c.harmony === 'soft') s += w * 15
        else if (c.harmony === 'hard') s -= w * 15
        else s += NATURE[hasNatal ? c.other : c.transiting] * w * 12
      }
      charge = clamp(s)
    }

    let tone: ChakraTone
    if (contacts.length === 0 && key !== focusKey) {
      tone = 'quiet'
    } else {
      const soft = contacts.filter((c) => c.harmony === 'soft').length
      const hard = contacts.filter((c) => c.harmony === 'hard').length
      const conj = driver?.harmony === 'neutral'
      if (charge >= 66) tone = 'open'
      else if (charge >= 44) tone = conj && soft === hard ? 'lit' : 'steady'
      else if (charge >= 32) tone = 'strained'
      else tone = 'blocked'
    }

    const house = driver ? (transitHouses[driver.transiting] ?? null) : null

    return {
      key,
      name: detail.name,
      color: info.color,
      note: info.note,
      sanskrit: detail.sanskrit,
      element: detail.element,
      location: detail.location,
      petals: info.petals,
      theme: detail.theme,
      mantra: t(chakraMantra(key)),
      frequency: info.frequency,
      charge,
      tone,
      state: t(`field.state.${tone}` as MessageKey),
      driver,
      contacts,
      house,
      cue: cueFor(tone, info.frequency, t),
      focus: key === focusKey,
    }
  })
}

/** Today's chakra field, live from the store's reading. */
export function useChakraField(): ChakraReading[] {
  const t = useT()
  const aspects = useAppStore((s) => s.aspects)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const chakra = useAppStore((s) => s.chakra)
  const transitHouses = useAppStore((s) => s.transitHouses)
  return computeChakraField(
    {
      aspects,
      hasNatal,
      focusKey: chakra?.key ?? 'heart',
      focusBalance: chakra?.balance ?? 50,
      transitHouses,
    },
    t,
  )
}
