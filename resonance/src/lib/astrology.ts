import type {
  AstrologicalTransit,
  BirthProfile,
  BreathPatternKey,
  ChakraKey,
  ChakraState,
  Crystal,
} from '../types/resonance'
import {
  bodyPosition,
  BODIES,
  chartPositions,
  moonState,
  type BodyName,
  type BodyPosition,
} from './ephemeris'
import { computeChartAngles, type ChartAngles } from './houses'
import { entryFor, entryToCrystals } from '../data/esoteric'
import { localDayKey } from './timezone'

/* --------------------------------------------------- planet ↔ chakra system */

/** Each body's primary chakra resonance (drives which centre a transit lights up). */
export const PLANET_CHAKRA: Record<BodyName, ChakraKey> = {
  Sun: 'solar-plexus',
  Moon: 'sacral',
  Mercury: 'throat',
  Venus: 'heart',
  Mars: 'root',
  Jupiter: 'crown',
  Saturn: 'root',
  Uranus: 'third-eye',
  Neptune: 'third-eye',
  Pluto: 'sacral',
}

/** Slower bodies make heavier, longer-felt transits. */
const PLANET_WEIGHT: Record<BodyName, number> = {
  Moon: 0.5,
  Sun: 0.9,
  Mercury: 0.7,
  Venus: 0.7,
  Mars: 0.85,
  Jupiter: 1.0,
  Saturn: 1.2,
  Uranus: 1.15,
  Neptune: 1.15,
  Pluto: 1.25,
}

/* ---------------------------------------------------------------- aspects */

export type AspectHarmony = 'hard' | 'soft' | 'neutral'

export interface AspectDef {
  name: string
  angle: number
  orb: number
  harmony: AspectHarmony
  weight: number
}

const ASPECTS: AspectDef[] = [
  { name: 'conjunction', angle: 0, orb: 8, harmony: 'neutral', weight: 0.9 },
  { name: 'opposition', angle: 180, orb: 7, harmony: 'hard', weight: 1.0 },
  { name: 'square', angle: 90, orb: 6, harmony: 'hard', weight: 1.0 },
  { name: 'trine', angle: 120, orb: 6, harmony: 'soft', weight: 0.7 },
  { name: 'sextile', angle: 60, orb: 4, harmony: 'soft', weight: 0.5 },
]

export interface Aspect {
  /** The moving (transiting) body. */
  transiting: BodyName
  /** The body being aspected (natal, or another transiting body in fallback mode). */
  other: BodyName
  def: AspectDef
  /** Degrees away from exact. */
  orbDelta: number
  /** 0 (edge of orb) → 1 (exact). */
  exactness: number
  score: number
  applying: boolean
}

const sep = (a: number, b: number): number => {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

const BODY_INDEX: Record<BodyName, number> = Object.fromEntries(
  BODIES.map((b, i) => [b, i]),
) as Record<BodyName, number>

export function findAspects(
  moving: BodyPosition[],
  targets: BodyPosition[],
  { sameSet = false }: { sameSet?: boolean } = {},
): Aspect[] {
  const out: Aspect[] = []
  for (const t of moving) {
    for (const n of targets) {
      // within one chart, count each pair once
      if (sameSet && BODY_INDEX[t.body] >= BODY_INDEX[n.body]) continue
      const separation = sep(t.longitude, n.longitude)
      for (const def of ASPECTS) {
        const orbDelta = Math.abs(separation - def.angle)
        if (orbDelta > def.orb) continue
        const exactness = 1 - orbDelta / def.orb
        const score =
          exactness *
          def.weight *
          ((PLANET_WEIGHT[t.body] + PLANET_WEIGHT[n.body]) / 2)
        // crude "applying vs separating": is the moving body heading toward exact?
        const future = sep(t.longitude + t.speed * 0.1, n.longitude)
        out.push({
          transiting: t.body,
          other: n.body,
          def,
          orbDelta,
          exactness,
          score,
          applying: Math.abs(future - def.angle) < orbDelta,
        })
      }
    }
  }
  return out.sort((a, b) => b.score - a.score)
}

/* ----------------------------------------------------- the daily algorithm */

export interface DailyReading {
  transit: AstrologicalTransit
  chakra: ChakraState
  crystals: Crystal[]
  /** Transit-to-natal aspects (or transiting-Moon aspects when no natal chart). */
  aspects: Aspect[]
  /** Positions of the ten bodies right now — for the sky report. */
  sky: BodyPosition[]
  /** Natal positions — empty when the user has no birth data. */
  natal: BodyPosition[]
  /** Aspects within the natal chart itself. */
  natalAspects: Aspect[]
  /** Ascendant / MC / house cusps — null until birth place (lat/lon) is set. */
  angles: ChartAngles | null
  suggestedPattern: BreathPatternKey
  hasNatal: boolean
}

const geoOf = (
  profile: BirthProfile | null,
): { lat: number; lon: number } | null =>
  profile && profile.lat != null && profile.lon != null
    ? { lat: profile.lat, lon: profile.lon }
    : null

const startOfLocalDay = (now: Date): Date => {
  const d = new Date(now)
  d.setHours(0, 0, 0, 0)
  return d
}

interface Dominant {
  chakra: ChakraKey
  planet: BodyName
  trigger: BodyName | null
  aspectName: string
  targetLabel: string
  harmony: AspectHarmony
  exactness: number
}

function pickDominant(
  transiting: BodyPosition[],
  birthUtc: Date | null,
): { dominant: Dominant; aspects: Aspect[]; hasNatal: boolean } {
  if (birthUtc) {
    const natal = birthChart(birthUtc)
    const aspects = findAspects(transiting, natal)
    const top = aspects[0]
    if (top) {
      return {
        hasNatal: true,
        aspects,
        dominant: {
          chakra: PLANET_CHAKRA[top.transiting],
          planet: top.transiting,
          trigger: null,
          aspectName: top.def.name,
          targetLabel: `natal ${top.other}`,
          harmony: top.def.harmony,
          exactness: top.exactness,
        },
      }
    }
  }

  // Fallback: no natal chart → read the transiting Moon against the slower bodies.
  const moon = transiting.filter((p) => p.body === 'Moon')
  const slow = transiting.filter((p) => p.body !== 'Moon' && p.body !== 'Sun')
  const aspects = findAspects(moon, slow)
  const top = aspects[0]
  const moonPos = transiting.find((p) => p.body === 'Moon')

  if (top) {
    return {
      hasNatal: false,
      aspects,
      dominant: {
        chakra: PLANET_CHAKRA[top.other],
        planet: top.other,
        trigger: 'Moon',
        aspectName: top.def.name,
        targetLabel: top.other,
        harmony: top.def.harmony,
        exactness: top.exactness,
      },
    }
  }

  // Deep fallback: just the Moon's sign.
  return {
    hasNatal: false,
    aspects: [],
    dominant: {
      chakra: PLANET_CHAKRA.Moon,
      planet: 'Moon',
      trigger: null,
      aspectName: 'in',
      targetLabel: moonPos?.sign ?? 'the sky',
      harmony: 'neutral',
      exactness: 0.4,
    },
  }
}

function composeInfluence(
  base: string,
  dominant: Dominant,
  vulnerable: boolean,
  planetPos: BodyPosition,
): string {
  const retro = planetPos.retrograde ? `, retrograde,` : ''
  const headline =
    dominant.aspectName === 'in'
      ? `${dominant.planet}${retro} moving through ${planetPos.sign}`
      : `${dominant.trigger ? `${dominant.trigger} ` : 'Transiting '}${dominant.planet}${retro} ${dominant.aspectName} ${dominant.targetLabel}`
  const guidance = vulnerable
    ? 'This centre is under pressure today — favour grounding, slow breath and restorative sound over pushing forward.'
    : 'This centre is well-supported today — a good window to amplify it with focused practice.'
  return `${headline}. ${base} ${guidance}`
}

/**
 * The core "Daily Algorithm": real transits → the chakra most in play →
 * the esoteric row for that chakra × planet → a full daily reading.
 * Falls back to a transit-only read when there is no natal chart yet.
 */
export function computeDailyReading(
  profile: BirthProfile | null,
  now: Date = new Date(),
): DailyReading {
  const birthUtc = profile ? new Date(profile.utc) : null
  const geo = geoOf(profile)

  const sky = chartPositions(now)
  const moon = moonState(now)
  const { dominant, aspects, hasNatal } = pickDominant(sky, birthUtc)

  const natal = birthUtc ? birthChart(birthUtc) : []
  const natalAspects = birthUtc
    ? findAspects(natal, natal, { sameSet: true })
    : []
  const angles =
    birthUtc && geo ? computeChartAngles(birthUtc, geo.lat, geo.lon) : null

  const planetPos =
    sky.find((p) => p.body === dominant.planet) ?? bodyPosition(dominant.planet, now)
  const entry = entryFor(dominant.chakra, dominant.planet)
  const vulnerable = dominant.harmony !== 'soft'

  const from = startOfLocalDay(now)
  const to = new Date(from)
  to.setDate(to.getDate() + 1)

  const title =
    dominant.aspectName === 'in'
      ? `${dominant.planet} in ${planetPos.sign}`
      : `${dominant.trigger ? `${dominant.trigger} ` : ''}${dominant.planet} ${dominant.aspectName} ${dominant.targetLabel}`

  const transit: AstrologicalTransit = {
    id: `transit-${localDayKey(from)}-${dominant.chakra}-${dominant.planet}`,
    title,
    body: dominant.planet,
    sign: planetPos.sign,
    aspect: dominant.aspectName,
    target: dominant.targetLabel,
    moonPhase: moon.name,
    illumination: moon.illumination,
    influence: composeInfluence(entry.guidance, dominant, vulnerable, planetPos),
    resonantChakra: dominant.chakra,
    recommendedFrequency: entry.frequency,
    window: { start: from.toISOString(), end: to.toISOString() },
  }

  const chakra: ChakraState = {
    key: dominant.chakra,
    name: entry.chakraName,
    note: entry.note,
    color: entry.color,
    frequency: entry.frequency,
    balance: Math.round(
      vulnerable
        ? 32 + (1 - dominant.exactness) * 34
        : 62 + dominant.exactness * 32,
    ),
    active: true,
  }

  // Adaptive cadence: hard aspect ⇒ down-regulate (4-7-8); a quiet sky with
  // only soft/wide contacts ⇒ stoke the fire (Kapalabhati); otherwise coherent.
  const tightContacts = aspects.filter((a) => a.exactness > 0.5).length
  const suggestedPattern: BreathPatternKey = vulnerable
    ? 'relax'
    : tightContacts <= 1
      ? 'kapalabhati'
      : 'coherent'

  return {
    transit,
    chakra,
    crystals: entryToCrystals(entry),
    aspects,
    sky,
    natal,
    natalAspects,
    angles,
    suggestedPattern,
    hasNatal,
  }
}

/** The natal chart — positions frozen at the birth instant. */
export function birthChart(birthUtc: Date): BodyPosition[] {
  return chartPositions(birthUtc)
}
