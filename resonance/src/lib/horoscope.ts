import type {
  AstrologicalTransit,
  BreathPatternKey,
  ChakraState,
  Crystal,
} from '../types/resonance'
import type { Aspect } from './astrology'
import type { BodyName, BodyPosition } from './ephemeris'
import { BREATH_PATTERNS } from './breathwork'
import { chakraMantra, chakraName } from './resonanceData'

/** The slice of a `DailyReading` the horoscope narrative needs — all in the store. */
export interface HoroscopeInput {
  transit: AstrologicalTransit
  chakra: ChakraState
  crystals: Crystal[]
  aspects: Aspect[]
  sky: BodyPosition[]
  hasNatal: boolean
  suggestedPattern: BreathPatternKey
}

/**
 * Turns a `DailyReading` (real transits × the natal chart) into a readable
 * daily horoscope. Text is composed from phrase banks — no LLM, works offline.
 */

export interface HoroscopeSection {
  heading: string
  body: string
}

export interface DailyHoroscope {
  greeting: string
  overview: string
  sections: HoroscopeSection[]
  moon: string
  practice: string
  affirmation: string
}

const WHAT: Record<BodyName, string> = {
  Sun: 'your vitality and sense of who you are',
  Moon: 'your moods, instincts and need for safety',
  Mercury: 'how you think, speak and make plans',
  Venus: 'love, pleasure, money and what you value',
  Mars: 'drive, desire, friction and the will to act',
  Jupiter: 'growth, faith and where you reach for more',
  Saturn: 'structure, duty and the limits you are working within',
  Uranus: 'the urge to break a pattern and do it your own way',
  Neptune: 'imagination, longing and the softening of boundaries',
  Pluto: 'deep change, power, and what is ready to end',
}

const SHORT: Record<BodyName, string> = {
  Sun: 'clarity and warmth',
  Moon: 'feeling and memory',
  Mercury: 'quick thinking',
  Venus: 'sweetness and charm',
  Mars: 'heat and urgency',
  Jupiter: 'expansion and luck',
  Saturn: 'weight and discipline',
  Uranus: 'a jolt of the unexpected',
  Neptune: 'a dreamlike haze',
  Pluto: 'intensity and depth',
}

const MANNER: Record<'hard' | 'soft' | 'neutral', string> = {
  hard: 'pressing hard against',
  soft: 'reaching gently toward',
  neutral: 'merging with',
}

const FLAVOUR: Record<'hard' | 'soft' | 'neutral', (n: BodyName) => string> = {
  hard: (n) =>
    `Expect some friction around ${WHAT[n]} — a test, a delay, or a push to grow up in this area. Don't force an outcome today; work with what resists.`,
  soft: (n) =>
    `A clear channel opens around ${WHAT[n]}. Support is available if you take one small, deliberate step rather than waiting for the perfect moment.`,
  neutral: (n) =>
    `These energies fuse today — ${SHORT[n]} pours straight into ${WHAT[n]}. It can feel like a lot at once, but it clarifies what matters.`,
}

const MOON_SIGN: Record<string, string> = {
  Aries: 'you want action and directness; patience is thin',
  Taurus: 'slow, sensory and steady wins — comfort matters',
  Gemini: 'curious and talkative, easily scattered',
  Cancer: 'tender and inward; home and care come first',
  Leo: 'warm, expressive, wanting to be seen and to give',
  Virgo: 'precise and useful; tidy one small thing',
  Libra: 'seeking balance, beauty and fair company',
  Scorpio: 'deep, private and all-or-nothing',
  Sagittarius: 'restless for meaning, space and a bigger view',
  Capricorn: 'serious and goal-focused; do the hard thing',
  Aquarius: 'detached and inventive; think in systems',
  Pisces: 'dreamy, permeable and compassionate',
}

const PHASE_NOTE = (name: string): string => {
  if (name.includes('New')) return 'A quiet moment to set an intention and keep it to yourself.'
  if (name.includes('Waxing')) return 'Momentum is building — a good phase to start and to do.'
  if (name.includes('Full')) return 'Things come to a head and feelings run bright. Notice what is revealed.'
  return 'A releasing phase — let something go rather than adding more.'
}

const ordinal = (aspectName: string): string =>
  aspectName === 'conjunction'
    ? 'conjunct'
    : aspectName === 'opposition'
      ? 'opposite'
      : aspectName

/** Short "life area" phrase per body — for the quick read (WHAT is fuller). */
const AREA: Record<BodyName, string> = {
  Sun: 'your identity and drive',
  Moon: 'your feelings and comfort',
  Mercury: 'your thinking and words',
  Venus: 'love, money and pleasure',
  Mars: 'your energy and temper',
  Jupiter: 'your growth and outlook',
  Saturn: 'your work and its limits',
  Uranus: 'your need for freedom',
  Neptune: 'your imagination and boundaries',
  Pluto: 'what is ending and changing',
}

const ASPECT_VERB: Record<string, string> = {
  conjunction: 'conjunct',
  opposition: 'opposite',
  square: 'square',
  trine: 'trine',
  sextile: 'sextile',
}

const QUICK_CUE: Record<'hard' | 'soft' | 'neutral', (o: BodyName) => string> = {
  hard: (o) => ` to ${AREA[o]} — a test or a delay; don't push it.`,
  soft: (o) => ` to ${AREA[o]} — an easy opening; take one real step.`,
  neutral: (o) => ` to ${AREA[o]}, landing all at once but clarifying.`,
}

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

/** A quick, plain read of the day — synthesised from every transit. Free tier. */
export interface QuickHoroscope {
  /** One line on the overall weather — the balance of all contacts. */
  weather: string
  /** The 2–3 strongest contacts, each in one short line. */
  notes: { label: string; text: string }[]
  /** What today asks of the focus centre. */
  body: string
  /** The Moon's mood. */
  moon: string
}

export function buildQuickHoroscope(reading: HoroscopeInput): QuickHoroscope {
  const { transit, chakra, aspects, sky, hasNatal } = reading
  const moonPos = sky.find((p) => p.body === 'Moon')
  const vulnerable = chakra.balance < 50
  const focus = chakraName(chakra.key)

  // weigh every contact by how exact it is
  let hard = 0
  let soft = 0
  let neutral = 0
  for (const a of aspects) {
    if (a.def.harmony === 'hard') hard += a.exactness
    else if (a.def.harmony === 'soft') soft += a.exactness
    else neutral += a.exactness
  }
  const tight = aspects.filter((a) => a.exactness > 0.55).length

  let weather: string
  if (aspects.length === 0) {
    weather =
      'A quiet sky — nothing pulls hard on your chart today. A good day to set your own pace.'
  } else if (soft > hard * 1.6 && soft >= neutral) {
    weather =
      'The sky leans supportive today — the easy contacts outweigh the hard ones. Doors open if you actually walk through them.'
  } else if (hard > soft * 1.6 && hard >= neutral) {
    weather = `More friction than flow today${
      tight ? ` — ${tight} contact${tight > 1 ? 's are' : ' is'} close to exact` : ''
    }. Push gently; don't try to force anything to completion.`
  } else if (neutral > hard && neutral > soft) {
    weather =
      'Several planets sit right on your chart — a lot lands at once. Let the day clarify what actually matters.'
  } else {
    weather =
      'A mixed day — support and friction pulling at the same time. Pick your battles and let the small stuff go.'
  }

  // one note per natal body, strongest first — spreads the read across life areas
  const seen = new Set<BodyName>()
  const notes = aspects
    .filter((a) => {
      if (seen.has(a.other)) return false
      seen.add(a.other)
      return true
    })
    .slice(0, hasNatal ? 3 : 2)
    .map((a) => ({
      label: `${a.transiting} ${ASPECT_VERB[a.def.name] ?? a.def.name} ${
        hasNatal ? 'your ' : ''
      }${a.other}`,
      text: `${a.transiting} brings ${SHORT[a.transiting]}${QUICK_CUE[a.def.harmony](a.other)}`,
    }))

  if (notes.length === 0) {
    notes.push({
      label: transit.title,
      text: cap(transit.influence.split('.')[0]) + '.',
    })
  }

  const body = vulnerable
    ? `Your ${focus} is tender today — move slower than feels necessary and protect it.`
    : `Your ${focus} is charged — put it to use before the window closes.`

  const moon = moonPos
    ? `Moon in ${moonPos.sign} — ${MOON_SIGN[moonPos.sign] ?? 'a shifting mood'}.`
    : ''

  return { weather, notes, body, moon }
}

export function buildHoroscope(reading: HoroscopeInput): DailyHoroscope {
  const { transit, chakra, aspects, sky, hasNatal, suggestedPattern } = reading
  const moonPos = sky.find((p) => p.body === 'Moon')
  const vulnerable = chakra.balance < 50
  const focus = chakraName(chakra.key)

  const greeting = vulnerable
    ? `A day to protect your ${focus}. Go slower than feels necessary.`
    : `Your ${focus} is lit up today. Put it to use before the window closes.`

  const overview = hasNatal
    ? `The strongest note in your sky is ${transit.body} ${ordinal(transit.aspect)} ${transit.target}. ${transit.influence}`
    : `Without your birth time this is a general read of today's sky. ${transit.influence} Add your birth details for a reading tuned to your own chart.`

  const top = aspects.slice(0, 3)
  const sections: HoroscopeSection[] = top.map((a) => {
    const other = a.other
    return {
      heading: `${a.transiting} ${ordinal(a.def.name)} ${hasNatal ? 'natal ' : ''}${other}`,
      body: `Transiting ${a.transiting} is ${MANNER[a.def.harmony]} ${hasNatal ? 'your natal ' : ''}${other}. ${FLAVOUR[a.def.harmony](other)} (${a.orbDelta.toFixed(1)}° from exact, ${a.applying ? 'still tightening' : 'easing off'}.)`,
    }
  })

  const moon = moonPos
    ? `The Moon is in ${moonPos.sign} — ${MOON_SIGN[moonPos.sign] ?? 'a shifting mood'}. It's a ${transit.moonPhase} at ${transit.illumination}% light. ${PHASE_NOTE(transit.moonPhase)}`
    : ''

  const pattern = BREATH_PATTERNS[suggestedPattern]
  const stones = reading.crystals.slice(0, 2).map((c) => c.name)
  const practice = `Sit with ${transit.recommendedFrequency} Hz for the ${focus}, breathe the ${pattern.name} pattern (${pattern.ratio}), and keep ${stones.join(' or ')} within reach.`

  return {
    greeting,
    overview,
    sections,
    moon,
    practice,
    affirmation: sky.length ? chakraMantra(chakra.key) : '',
  }
}
