import type { AspectHarmony } from './astrology'
import { birthChart, findAspects } from './astrology'
import { SIGNS, type BodyName } from './ephemeris'
import { planetLabel, type TFn } from './i18n'
import type { MessageKey } from './locales/en'

/**
 * Synastry — the user's natal chart against another person's. Cross-aspects
 * (`findAspects(chartA, chartB)`) between the two sets of planets, weighted by
 * what each relationship lens cares about, then read out in plain language
 * per locale.
 */

export type CompatLens = 'love' | 'friendship' | 'work' | 'family'

export const LENS_KEYS: CompatLens[] = ['love', 'friendship', 'work', 'family']

export const lensLabel = (key: CompatLens, t: TFn): string =>
  t(`syn.lens.${key}` as MessageKey)

export type ConnectionTone = 'gift' | 'friction' | 'intense'

export interface SynastryConnection {
  a: BodyName
  b: BodyName
  aspect: string
  harmony: AspectHarmony
  orbDelta: number
  applying: boolean
  tone: ConnectionTone
  /** "Your Moon & their Sun". */
  title: string
  /** One line for the collapsed row. */
  summary: string
  /** Two–four sentences: the dynamic, the gift, the watch-out. */
  detail: string
  /** Contribution to the chosen lens (− friction, + support). */
  weight: number
}

export interface SynastryReading {
  score: number
  label: string
  overview: string
  texture: string
  elements: string
  strengths: string[]
  frictions: string[]
  advice: string
  connections: SynastryConnection[]
  facets: { key: CompatLens; label: string; score: number }[]
}

const MASS: Record<BodyName, number> = {
  Sun: 1, Moon: 1, Mercury: 0.7, Venus: 0.85, Mars: 0.85,
  Jupiter: 0.7, Saturn: 0.75, Uranus: 0.55, Neptune: 0.55, Pluto: 0.6,
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
  return lens === 'love' && PERSONAL.has(a) && PERSONAL.has(b) ? -0.35 : -0.75
}

/* ------------------------------------------------------------ connections */

const pairKey = (a: BodyName, b: BodyName): string => [a, b].sort().join('-')

/** Contacts with a bespoke, hand-written read (both tone variants live in the catalogue). */
const NAMED_PAIRS = new Set([
  'Moon-Sun',
  'Mars-Venus',
  'Moon-Moon',
  'Moon-Venus',
  'Moon-Saturn',
  'Sun-Sun',
  'Sun-Venus',
  'Mercury-Mercury',
  'Mars-Mars',
  'Mars-Sun',
])

function connectionDetail(
  a: BodyName,
  b: BodyName,
  harmony: AspectHarmony,
  t: TFn,
): { detail: string; summary: string; tone: ConnectionTone } {
  const tone: ConnectionTone =
    harmony === 'soft' ? 'gift' : harmony === 'neutral' ? 'intense' : 'friction'
  const key = pairKey(a, b)

  if (NAMED_PAIRS.has(key)) {
    const detail = t(`syn.named.${key}.${tone}` as MessageKey)
    const summary =
      tone === 'gift'
        ? t('syn.sum.gift')
        : tone === 'intense'
          ? t('syn.sum.intenseNamed')
          : t('syn.sum.frictionNamed')
    return { detail, summary, tone }
  }

  // generic — from the two planets' roles. A small rotation so several in a
  // row don't read identically.
  const salt = (a.charCodeAt(0) + b.charCodeAt(1)) % 3
  const summary =
    tone === 'gift'
      ? t('syn.sum.gift')
      : tone === 'intense'
        ? t('syn.sum.intenseGen')
        : t('syn.sum.frictionGen')
  const detail = t('syn.gen.detail', {
    roleA: t(`syn.role.${a}` as MessageKey),
    roleB: t(`syn.role.${b}` as MessageKey),
    phrase: t(`syn.gen.${tone}.${salt}` as MessageKey),
  })
  return { tone, summary, detail }
}

/* ---------------------------------------------------------------- overall */

const labelKey = (score: number): MessageKey =>
  score >= 78
    ? 'syn.label.strong'
    : score >= 62
      ? 'syn.label.ease'
      : score >= 46
        ? 'syn.label.workable'
        : score >= 32
          ? 'syn.label.friction'
          : 'syn.label.hard'

function overviewFor(
  score: number,
  lens: CompatLens,
  t: TFn,
  top?: SynastryConnection,
): string {
  const noun = t(`syn.noun.${lens}` as MessageKey)
  const head =
    score >= 62
      ? t('syn.ov.head.good', { noun })
      : score >= 46
        ? t('syn.ov.head.mid', { noun })
        : t('syn.ov.head.hard', { noun })
  const mid = top
    ? t('syn.ov.mid', {
        a: planetLabel(top.a, t),
        b: planetLabel(top.b, t),
        summary: top.summary.toLowerCase(),
      })
    : t('syn.ov.midQuiet')
  const tail =
    score >= 62
      ? t('syn.ov.tail.good')
      : score >= 46
        ? t('syn.ov.tail.mid')
        : t('syn.ov.tail.hard')
  return t('syn.ov.full', { head, mid, tail })
}

const CATEGORY = {
  emotional: new Set<BodyName>(['Moon', 'Venus', 'Neptune']),
  mental: new Set<BodyName>(['Mercury', 'Uranus']),
  physical: new Set<BodyName>(['Mars', 'Sun']),
  karmic: new Set<BodyName>(['Saturn', 'Pluto']),
}

function textureFor(conns: SynastryConnection[], t: TFn): string {
  const tally: Record<string, number> = { emotional: 0, mental: 0, physical: 0, karmic: 0 }
  for (const c of conns) {
    const w = Math.abs(c.weight)
    for (const [cat, set] of Object.entries(CATEGORY)) {
      if (set.has(c.a) || set.has(c.b)) tally[cat] += w
    }
  }
  const top = Object.entries(tally).sort((x, y) => y[1] - x[1])[0]
  if (!top || top[1] === 0) return t('syn.texture.light')
  const [cat, val] = top
  const total = Object.values(tally).reduce((s, n) => s + n, 0)
  if (val / total < 0.4) return t('syn.texture.rounded')
  return t(`syn.texture.${cat}` as MessageKey)
}

const ELEMENT = ['fire', 'earth', 'air', 'water']
const elementOf = (sign: string): string => ELEMENT[SIGNS.indexOf(sign) % 4] ?? 'fire'
const COMPAT = new Set(['air-fire', 'earth-water'])
const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

function elementsFor(aSun: string, bSun: string, t: TFn): string {
  const ae = elementOf(aSun)
  const be = elementOf(bSun)
  const ael = t(`syn.element.${ae}` as MessageKey)
  const bel = t(`syn.element.${be}` as MessageKey)
  if (ae === be) {
    return t('syn.el.same', {
      el: ael,
      note: t(`syn.el.sameNote.${ae}` as MessageKey),
    })
  }
  const key = [ae, be].sort().join('-')
  const params = { a: ael, aCap: cap(ael), b: bel }
  return COMPAT.has(key) ? t('syn.el.compat', params) : t('syn.el.diff', params)
}

const firstSentence = (s: string): string => {
  const m = s.match(/^[^.]+\./)
  return m ? m[0] : s
}
const lineFor = (c: SynastryConnection, t: TFn): string =>
  t('syn.line', {
    a: planetLabel(c.a, t),
    b: planetLabel(c.b, t),
    sentence: firstSentence(c.detail),
  })

function adviceFor(score: number, lens: CompatLens, t: TFn): string {
  const band = score >= 62 ? 0 : score >= 46 ? 1 : 2
  return t(`syn.advice.${lens}.${band}` as MessageKey)
}

/* --------------------------------------------------------------- compute */

export function computeSynastry(
  aUtc: Date,
  bUtc: Date,
  lens: CompatLens,
  t: TFn,
): SynastryReading {
  const chartA = birthChart(aUtc)
  const chartB = birthChart(bUtc)
  const aspects = findAspects(chartA, chartB)

  const scoreLens = (
    l: CompatLens,
  ): { score: number; contribs: SynastryConnection[] } => {
    const contribs: SynastryConnection[] = []
    let sum = 0
    for (const asp of aspects) {
      const a = asp.transiting
      const b = asp.other
      const rel = RELEVANCE[l][a] * RELEVANCE[l][b]
      if (rel < 0.12) continue
      const pol = polarityOf(asp.def.harmony, a, b, l)
      const w = pol * rel * asp.exactness * ((MASS[a] + MASS[b]) / 2)
      sum += w
      const { detail, summary, tone } = connectionDetail(a, b, asp.def.harmony, t)
      contribs.push({
        a,
        b,
        aspect: asp.def.name,
        harmony: asp.def.harmony,
        orbDelta: asp.orbDelta,
        applying: asp.applying,
        tone,
        title: t('syn.connTitle', { a: planetLabel(a, t), b: planetLabel(b, t) }),
        summary,
        detail,
        weight: w,
      })
    }
    const score = Math.max(8, Math.min(96, Math.round(50 + sum * 13)))
    return { score, contribs }
  }

  const facets = LENS_KEYS.map((key) => ({
    key,
    label: lensLabel(key, t),
    score: scoreLens(key).score,
  }))

  const { score, contribs } = scoreLens(lens)
  const connections = contribs
    .sort((x, y) => Math.abs(y.weight) - Math.abs(x.weight))
    .slice(0, 8)

  const supportive = connections.filter((c) => c.weight > 0.02).slice(0, 3)
  const hard = connections.filter((c) => c.weight < -0.02).slice(0, 3)

  const strengths =
    supportive.length > 0
      ? supportive.map((c) => lineFor(c, t))
      : [t('syn.strengthsQuiet')]
  const frictions =
    hard.length > 0
      ? hard.map((c) => lineFor(c, t))
      : [t('syn.frictionsQuiet')]

  const aSun = chartA.find((p) => p.body === 'Sun')?.sign ?? 'Aries'
  const bSun = chartB.find((p) => p.body === 'Sun')?.sign ?? 'Aries'

  return {
    score,
    label: t(labelKey(score)),
    overview: overviewFor(score, lens, t, connections[0]),
    texture: textureFor(connections, t),
    elements: elementsFor(aSun, bSun, t),
    strengths,
    frictions,
    advice: adviceFor(score, lens, t),
    connections,
    facets,
  }
}
