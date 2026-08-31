import type { AspectHarmony } from './astrology'
import { birthChart, findAspects } from './astrology'
import { SIGNS, type BodyName } from './ephemeris'

/**
 * Synastry — the user's natal chart against another person's. Cross-aspects
 * (`findAspects(chartA, chartB)`) between the two sets of planets, weighted by
 * what each relationship lens cares about, then read out in plain language.
 */

export type CompatLens = 'love' | 'friendship' | 'work' | 'family'

export const LENSES: { key: CompatLens; label: string }[] = [
  { key: 'love', label: 'Love' },
  { key: 'friendship', label: 'Friendship' },
  { key: 'work', label: 'Work' },
  { key: 'family', label: 'Family' },
]

export type ConnectionTone = 'gift' | 'friction' | 'intense'

export interface SynastryConnection {
  /** The user's planet. */
  a: BodyName
  /** The other person's planet. */
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
  /** 0–100 for the chosen lens. */
  score: number
  label: string
  /** Three sentences framing the whole match for this lens. */
  overview: string
  /** One line on the nature of the bond — emotional / mental / physical / … */
  texture: string
  /** One line comparing the two Suns' elements. */
  elements: string
  /** What works, from the supportive contacts. */
  strengths: string[]
  /** What takes effort, from the hard contacts. */
  frictions: string[]
  /** One line of advice for this lens at this score. */
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

/** What each planet contributes to a bond — a short noun phrase, no "and". */
const ROLE: Record<BodyName, string> = {
  Sun: 'core self',
  Moon: 'emotional needs',
  Mercury: 'way of thinking',
  Venus: 'way of loving',
  Mars: 'drive',
  Jupiter: 'generosity',
  Saturn: 'sense of duty',
  Uranus: 'independence',
  Neptune: 'imagination',
  Pluto: 'depth',
}

const pairKey = (a: BodyName, b: BodyName): string =>
  [a, b].sort().join('-')

interface NamedCombo {
  gift: string
  friction: string
  intense: string
}

/** Bespoke reads for the contacts people care most about. */
const NAMED: Record<string, NamedCombo> = {
  'Moon-Sun': {
    gift: 'One of you brings warmth and direction, the other brings feeling and care, and they fit. This is the quiet bedrock of a bond — you settle each other.',
    friction: 'The core rhythms are out of step — one wants to move, the other wants to nest. Not fatal, but you have to keep translating for each other.',
    intense: 'A magnetic, almost involuntary recognition — you feel "seen" by this person. Powerful; watch that it does not tip into needing them to define you.',
  },
  'Mars-Venus': {
    gift: 'Attraction with no drama attached — warmth and wanting move in the same direction. Easy chemistry.',
    friction: 'Sparks that can turn to heat the wrong way. The pull is real, but so is the potential to wind each other up.',
    intense: 'Charged and physical, a little combustible. Hard to stay lukewarm about each other; give the intensity somewhere to go.',
  },
  'Moon-Moon': {
    gift: 'Your emotional weather matches. You comfort each other without being told how, and home feels like home fast.',
    friction: 'You feel things at different speeds and about different things. Say the feeling out loud — do not expect to be read.',
    intense: 'You mirror each other emotionally — soothing when you are both steady, a feedback loop when you are not.',
  },
  'Moon-Venus': {
    gift: 'Affection lands where it is needed. One of you feels loved in exactly the way the other gives it.',
    friction: 'Care and affection are offered in the wrong currency — kind gestures that miss. Name what actually makes you feel loved.',
    intense: 'Tender and a little enmeshed — sweet, but keep some edges so closeness does not become obligation.',
  },
  'Moon-Saturn': {
    gift: 'A steadying, grown-up kind of care. One of you provides the ground the other can lean on.',
    friction: 'One of you can feel judged, held back, or emotionally cool towards the other. Watch the withdrawn spells and the "shoulds".',
    intense: 'Serious and binding — a sense of responsibility for each other. Can be deeply loyal, or heavy; keep it a choice.',
  },
  'Sun-Sun': {
    gift: 'You want broadly the same things and shine in compatible ways. Little competition, lots of mutual recognition.',
    friction: 'Two strong wills pointed slightly different directions. Egos will occasionally knock; take turns leading.',
    intense: 'Very similar in what you need to feel alive — energising, but you can amplify each other’s blind spots.',
  },
  'Sun-Venus': {
    gift: 'You genuinely enjoy each other. One of you finds the other lovely, and says so.',
    friction: 'Affection and identity pull against each other a little — flattery lands wrong, or values differ on money and taste.',
    intense: 'Warm and admiring — you make each other feel attractive. Keep it honest, not just charming.',
  },
  'Mercury-Mercury': {
    gift: 'Conversation is effortless. You finish each other’s thoughts and problem-solve well together.',
    friction: 'You talk past each other — different tempos, different logic. Slow down and check you mean the same thing.',
    intense: 'Two minds locked together — brilliant for ideas, exhausting if you can never stop debating.',
  },
  'Sun-Saturn': {
    gift: 'One of you steadies and structures the other’s ambition. Good for building something that lasts.',
    friction: 'One can feel dampened or over-managed by the other. Keep the support from turning into control.',
    intense: 'A weighty, committed dynamic — you take each other seriously. Loyal, or restrictive; keep expectations spoken.',
  },
  'Mars-Mars': {
    gift: 'You push in the same direction and pace each other well. A good team when there is a job to do.',
    friction: 'Two drives, often competing. Fine channelled into a shared project, corrosive turned on each other.',
    intense: 'High-energy and physical — you spur each other on, and you can escalate a conflict fast.',
  },
  'Mars-Sun': {
    gift: 'One of you energises the other — things get done when you are together.',
    friction: 'One can feel pushed or overpowered by the other’s drive. Watch the bulldozing.',
    intense: 'Dynamic and a little charged — motivating on a good day, a power struggle on a bad one.',
  },
}

function connectionDetail(
  a: BodyName,
  b: BodyName,
  harmony: AspectHarmony,
): { detail: string; summary: string; tone: ConnectionTone } {
  const tone: ConnectionTone =
    harmony === 'soft' ? 'gift' : harmony === 'neutral' ? 'intense' : 'friction'

  const named = NAMED[pairKey(a, b)]
  if (named) {
    const detail =
      tone === 'gift' ? named.gift : tone === 'intense' ? named.intense : named.friction
    const summary =
      tone === 'gift'
        ? 'Flows easily'
        : tone === 'intense'
          ? 'Fuses — hard to ignore'
          : 'Grinds — asks for effort'
    return { detail, summary, tone }
  }

  // generic — from the two planets' roles (compound subject takes a plural verb).
  // A small rotation so several in a row don't read identically.
  const GEN: Record<ConnectionTone, string[]> = {
    gift: [
      'move together with little effort — easy to lean on.',
      'support each other naturally; you won’t have to work at this part.',
      'line up well — one less thing to manage between you.',
    ],
    intense: [
      'fuse — powerful, and hard to stay neutral about.',
      'lock together — intense, and impossible to ignore.',
      'run into each other head-on; a lot of charge in one place.',
    ],
    friction: [
      'grind against each other. A growth edge, not a dealbreaker — keep talking it through.',
      'pull in different directions. Name it plainly rather than hoping it settles.',
      'chafe. Not fatal, but it needs handling on purpose.',
    ],
  }
  const salt = (a.charCodeAt(0) + b.charCodeAt(1)) % 3
  return {
    tone,
    summary:
      tone === 'gift' ? 'Flows easily' : tone === 'intense' ? 'Fuses' : 'Takes effort',
    detail: `Your ${ROLE[a]} and their ${ROLE[b]} ${GEN[tone][salt]}`,
  }
}

/* ---------------------------------------------------------------- overall */

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

const LENS_NOUN: Record<CompatLens, string> = {
  love: 'romantic',
  friendship: 'friendship',
  work: 'working',
  family: 'family',
}

function overviewFor(score: number, lens: CompatLens, top?: SynastryConnection): string {
  const noun = LENS_NOUN[lens]
  const head =
    score >= 62
      ? `The charts back this ${noun} bond well — the ease outweighs the friction.`
      : score >= 46
        ? `A mixed but workable ${noun} match. The good parts are real; the rough parts are specific, not general.`
        : `This ${noun} pairing takes conscious effort. The friction is structural — it will not simply wear off.`
  const mid = top
    ? `The loudest note is the contact between your ${top.a} and their ${top.b} — ${top.summary.toLowerCase()}.`
    : `Nothing between your charts is especially loud — a low-static connection.`
  const tail =
    score >= 62
      ? `Do not take the smooth bits for granted.`
      : score >= 46
        ? `Name the friction early, before it hardens into a pattern.`
        : `Go in with your eyes open about what it will ask of you both.`
  return `${head} ${mid} ${tail}`
}

const CATEGORY = {
  emotional: new Set<BodyName>(['Moon', 'Venus', 'Neptune']),
  mental: new Set<BodyName>(['Mercury', 'Uranus']),
  physical: new Set<BodyName>(['Mars', 'Sun']),
  karmic: new Set<BodyName>(['Saturn', 'Pluto']),
}

function textureFor(conns: SynastryConnection[]): string {
  const tally: Record<string, number> = { emotional: 0, mental: 0, physical: 0, karmic: 0 }
  for (const c of conns) {
    const w = Math.abs(c.weight)
    for (const [cat, set] of Object.entries(CATEGORY)) {
      if (set.has(c.a) || set.has(c.b)) tally[cat] += w
    }
  }
  const top = Object.entries(tally).sort((x, y) => y[1] - x[1])[0]
  if (!top || top[1] === 0) {
    return 'A light, uncomplicated connection — no single force dominates it.'
  }
  const [cat, val] = top
  const total = Object.values(tally).reduce((s, n) => s + n, 0)
  if (val / total < 0.4) {
    return 'A well-rounded mix — heart, mind and drive all show up here.'
  }
  return {
    emotional:
      'This runs on feeling — the Moons and Venus carry it. Warm, but moods will matter a lot.',
    mental:
      'More a meeting of minds than of hearts — you will talk, plan and spark ideas together.',
    physical:
      'There is real drive and chemistry here — it is felt in the body, not only discussed.',
    karmic:
      'This one has weight. Saturn and Pluto are in the mix — it binds, it tests, and it changes you both.',
  }[cat]!
}

const ELEMENT = ['fire', 'earth', 'air', 'water']
const elementOf = (sign: string): string => ELEMENT[SIGNS.indexOf(sign) % 4] ?? 'fire'

const SAME_EL: Record<string, string> = {
  fire: 'quick to ignite and quick to clash — keep it moving',
  earth: 'grounded and practical together, slow to change lanes',
  air: 'lively and heady — sometimes short on feeling',
  water: 'deep and intuitive, and easily flooded',
}
const COMPAT = new Set(['air-fire', 'earth-water'])

function elementsFor(aSun: string, bSun: string): string {
  const ae = elementOf(aSun)
  const be = elementOf(bSun)
  if (ae === be) return `Both ${ae} Suns — ${SAME_EL[ae]}.`
  const key = [ae, be].sort().join('-')
  if (COMPAT.has(key)) {
    return `${cap(ae)} and ${be} Suns — different but feeding: one supplies the spark, the other the medium.`
  }
  return `${cap(ae)} and ${be} Suns — different tempos entirely. You will each have to translate for the other.`
}

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

const firstSentence = (s: string): string => {
  const m = s.match(/^[^.]+\./)
  return m ? m[0] : s
}
function lineFor(c: SynastryConnection): string {
  return `${c.a}–${c.b}: ${firstSentence(c.detail)}`
}

const ADVICE: Record<CompatLens, [string, string, string]> = {
  love: [
    'Protect the ease and keep choosing it. The rough spots are workable if you name them the day they show up, not a month later.',
    'This can be a real relationship with attention. Talk about the friction points directly — they will not resolve on their own.',
    'Only worth it if you both actually want to do the work. The harmony has to be built here; it will not carry you.',
  ],
  friendship: [
    'An easy friendship — low-maintenance and genuine. Just make sure you actually make the plans.',
    'A good friendship that needs a bit of care — do not let the small annoyances stack up unspoken.',
    'This works better in small doses. Keep it light and specific rather than expecting a deep bond.',
  ],
  work: [
    'A strong working pair — divide the work along your natural strengths and let each other lead where you are stronger.',
    'Workable with clear roles. Put expectations and boundaries in writing; do not rely on reading each other.',
    'Only collaborate with structure and a referee. Left informal, this will grind.',
  ],
  family: [
    'A supportive family bond — lean on it, and return the care.',
    'A family tie that needs tending. Keep some boundaries, and address the old patterns rather than repeating them.',
    'Manage the distance consciously. Contact on your terms, with limits, tends to work better than forced closeness.',
  ],
}

function adviceFor(score: number, lens: CompatLens): string {
  const band = score >= 62 ? 0 : score >= 46 ? 1 : 2
  return ADVICE[lens][band]
}

/* --------------------------------------------------------------- compute */

export function computeSynastry(
  aUtc: Date,
  bUtc: Date,
  lens: CompatLens,
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
      const { detail, summary, tone } = connectionDetail(a, b, asp.def.harmony)
      contribs.push({
        a,
        b,
        aspect: asp.def.name,
        harmony: asp.def.harmony,
        orbDelta: asp.orbDelta,
        applying: asp.applying,
        tone,
        title: `Your ${a} & their ${b}`,
        summary,
        detail,
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
    .slice(0, 8)

  const supportive = connections.filter((c) => c.weight > 0.02).slice(0, 3)
  const hard = connections.filter((c) => c.weight < -0.02).slice(0, 3)

  const strengths =
    supportive.length > 0
      ? supportive.map(lineFor)
      : [
          'The support here is quiet — no single contact carries it, but nothing actively undermines it either.',
        ]
  const frictions =
    hard.length > 0
      ? hard.map(lineFor)
      : [
          'No hard aspects of note between your charts — friction, when it comes, will be about circumstance more than chemistry.',
        ]

  const aSun = chartA.find((p) => p.body === 'Sun')?.sign ?? 'Aries'
  const bSun = chartB.find((p) => p.body === 'Sun')?.sign ?? 'Aries'

  return {
    score,
    label: label(score),
    overview: overviewFor(score, lens, connections[0]),
    texture: textureFor(connections),
    elements: elementsFor(aSun, bSun),
    strengths,
    frictions,
    advice: adviceFor(score, lens),
    connections,
    facets,
  }
}
