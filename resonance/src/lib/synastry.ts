import type { AspectHarmony } from './astrology'
import { findAspects } from './astrology'
import { birthChart } from './astrology'
import type { BodyName } from './ephemeris'

/**
 * Synastry — the user's natal chart against another person's. Cross-aspects
 * (`findAspects(chartA, chartB)`) between the two sets of planets, weighted by
 * what each relationship lens cares about.
 */

export type CompatLens = 'love' | 'friendship' | 'work' | 'family'

export const LENSES: { key: CompatLens; label: string }[] = [
  { key: 'love', label: 'Love' },
  { key: 'friendship', label: 'Friendship' },
  { key: 'work', label: 'Work' },
  { key: 'family', label: 'Family' },
]

export interface SynastryConnection {
  /** The user's planet. */
  a: BodyName
  /** The other person's planet. */
  b: BodyName
  aspect: string
  harmony: AspectHarmony
  orbDelta: number
  applying: boolean
  /** Plain-language read of this contact. */
  text: string
  /** Its contribution to the chosen lens (− friction, + support). */
  weight: number
}

export interface SynastryReading {
  /** 0–100 for the chosen lens. */
  score: number
  label: string
  summary: string
  connections: SynastryConnection[]
  facets: { key: CompatLens; label: string; score: number }[]
}

const MASS: Record<BodyName, number> = {
  Sun: 1,
  Moon: 1,
  Mercury: 0.7,
  Venus: 0.85,
  Mars: 0.85,
  Jupiter: 0.7,
  Saturn: 0.75,
  Uranus: 0.55,
  Neptune: 0.55,
  Pluto: 0.6,
}

const RELEVANCE: Record<CompatLens, Record<BodyName, number>> = {
  love: {
    Sun: 0.8, Moon: 1, Mercury: 0.4, Venus: 1, Mars: 0.9,
    Jupiter: 0.5, Saturn: 0.5, Uranus: 0.4, Neptune: 0.5, Pluto: 0.6,
  },
  friendship: {
    Sun: 0.8, Moon: 0.7, Mercury: 1, Venus: 0.8, Mars: 0.5,
    Jupiter: 1, Saturn: 0.4, Uranus: 0.7, Neptune: 0.4, Pluto: 0.3,
  },
  work: {
    Sun: 0.8, Moon: 0.4, Mercury: 1, Venus: 0.4, Mars: 0.9,
    Jupiter: 0.7, Saturn: 1, Uranus: 0.5, Neptune: 0.3, Pluto: 0.6,
  },
  family: {
    Sun: 0.9, Moon: 1, Mercury: 0.6, Venus: 0.8, Mars: 0.5,
    Jupiter: 0.6, Saturn: 0.9, Uranus: 0.3, Neptune: 0.4, Pluto: 0.5,
  },
}

const PERSONAL = new Set<BodyName>(['Sun', 'Moon', 'Venus', 'Mars'])

function polarityOf(
  harmony: AspectHarmony,
  a: BodyName,
  b: BodyName,
  lens: CompatLens,
): number {
  if (harmony === 'soft') return 1
  if (harmony === 'neutral') return 0.6
  // hard — friction, softened for personal-planet contacts in love
  return lens === 'love' && PERSONAL.has(a) && PERSONAL.has(b) ? -0.35 : -0.75
}

const has = (a: BodyName, b: BodyName, x: BodyName): boolean => a === x || b === x
const both = (a: BodyName, b: BodyName, xs: BodyName[]): boolean =>
  xs.includes(a) && xs.includes(b)

function connectionText(a: BodyName, b: BodyName, harmony: AspectHarmony): string {
  const soft = harmony === 'soft'
  const conj = harmony === 'neutral'
  const ease = soft
    ? 'flows easily'
    : conj
      ? 'fuses — intense and hard to ignore'
      : 'grinds, and asks for real effort'

  if (both(a, b, ['Sun', 'Moon'])) {
    return `Sun and Moon between you — the core of a bond. ${
      soft
        ? 'You warm and settle each other.'
        : conj
          ? 'A deep, almost magnetic recognition.'
          : 'You run on different rhythms; give each other room.'
    }`
  }
  if (has(a, b, 'Venus') && has(a, b, 'Mars')) {
    return `Venus meets Mars — attraction and chemistry. ${
      soft ? 'Warm and uncomplicated.' : conj ? 'Charged, physical, a little combustible.' : 'Sparks that can turn to friction.'
    }`
  }
  if (both(a, b, ['Moon']) || (has(a, b, 'Moon') && has(a, b, 'Venus'))) {
    return `Your emotional worlds ${ease}. ${soft ? 'You feel safe and understood together.' : 'Feelings get tangled; name them out loud.'}`
  }
  if (has(a, b, 'Moon') && has(a, b, 'Saturn')) {
    return `Moon and Saturn — weight and security. ${
      soft ? 'A steadying, grown-up kind of care.' : 'One of you can feel held back or judged; watch the cool spells.'
    }`
  }
  if (both(a, b, ['Mercury'])) {
    return `Two minds ${ease}. ${soft ? 'Conversation is easy and you get each other.' : 'You talk past each other; slow down and check.'}`
  }
  if (has(a, b, 'Saturn')) {
    return `Saturn is in the mix — commitment, duty, the long haul. ${
      soft ? 'A reliable, load-bearing connection.' : 'It can feel heavy or restrictive; keep expectations explicit.'
    }`
  }
  if (has(a, b, 'Jupiter')) {
    return `Jupiter opens things up — growth, generosity, good humour. ${soft ? 'You bring out each other’s optimism.' : 'Watch for over-promising or excess.'}`
  }
  if (has(a, b, 'Pluto')) {
    return `Pluto runs deep here — power, transformation, nothing halfway. ${soft ? 'Profound and regenerative.' : 'Control struggles are the risk; stay honest.'}`
  }
  if (has(a, b, 'Uranus')) {
    return `Uranus brings freedom and surprise. ${soft ? 'You keep each other interested.' : 'Unpredictable; hard to fully rely on.'}`
  }
  if (has(a, b, 'Neptune')) {
    return `Neptune softens the edges — imagination, compassion, some idealising. ${soft ? 'A dreamy, tender thread.' : 'See each other clearly, not through a haze.'}`
  }
  return `Your ${a} and their ${b} ${ease}.`
}

const label = (score: number): string =>
  score >= 78
    ? 'A strong current'
    : score >= 62
      ? 'Real ease'
      : score >= 46
        ? 'Workable'
        : score >= 32
          ? 'Friction to navigate'
          : 'Hard going'

function summaryFor(
  score: number,
  lens: CompatLens,
  top: SynastryConnection | undefined,
): string {
  const noun =
    lens === 'love'
      ? 'romantic'
      : lens === 'friendship'
        ? 'friendship'
        : lens === 'work'
          ? 'working'
          : 'family'
  const head =
    score >= 62
      ? `The charts support this ${noun} bond well.`
      : score >= 46
        ? `A mixed but workable ${noun} match — the ease is there if you tend the rough spots.`
        : `This ${noun} pairing takes conscious effort; the friction is structural, not personal.`
  return top ? `${head} ${top.text}` : head
}

export function computeSynastry(
  aUtc: Date,
  bUtc: Date,
  lens: CompatLens,
): SynastryReading {
  const chartA = birthChart(aUtc)
  const chartB = birthChart(bUtc)
  const aspects = findAspects(chartA, chartB)

  const scoreLens = (l: CompatLens): { score: number; contribs: SynastryConnection[] } => {
    const contribs: SynastryConnection[] = []
    let sum = 0
    for (const asp of aspects) {
      const a = asp.transiting
      const b = asp.other
      const rel = RELEVANCE[l][a] * RELEVANCE[l][b]
      if (rel < 0.12) continue
      const pol = polarityOf(asp.def.harmony, a, b, l)
      const mass = (MASS[a] + MASS[b]) / 2
      const w = pol * rel * asp.exactness * mass
      sum += w
      contribs.push({
        a,
        b,
        aspect: asp.def.name,
        harmony: asp.def.harmony,
        orbDelta: asp.orbDelta,
        applying: asp.applying,
        text: connectionText(a, b, asp.def.harmony),
        weight: w,
      })
    }
    const score = Math.max(8, Math.min(96, Math.round(50 + sum * 13)))
    return { score, contribs }
  }

  const facets = LENSES.map((l) => ({
    key: l.key,
    label: l.label,
    score: scoreLens(l.key).score,
  }))

  const { score, contribs } = scoreLens(lens)
  const connections = contribs
    .sort((x, y) => Math.abs(y.weight) - Math.abs(x.weight))
    .slice(0, 6)

  return {
    score,
    label: label(score),
    summary: summaryFor(score, lens, connections[0]),
    connections,
    facets,
  }
}
