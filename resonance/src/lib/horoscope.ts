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

/** A three-line read of the day — the free-tier horoscope. */
export interface QuickHoroscope {
  /** The dominant transit, in plain language. */
  sky: string
  /** What today asks of the user's focus centre. */
  body: string
  /** The Moon's mood. */
  moon: string
}

export function buildQuickHoroscope(reading: HoroscopeInput): QuickHoroscope {
  const { transit, chakra, aspects, sky, hasNatal } = reading
  const moonPos = sky.find((p) => p.body === 'Moon')
  const vulnerable = chakra.balance < 50
  const focus = chakraName(chakra.key)
  const top = aspects[0]

  const skyLine =
    hasNatal && top
      ? `${top.transiting} is ${MANNER[top.def.harmony]} your ${top.other} — ${SHORT[top.transiting]} in the mix, ${top.applying ? 'still building' : 'easing off'}.`
      : `${transit.title}. ${transit.influence.split('.')[0]}.`

  const bodyLine = vulnerable
    ? `Your ${focus} is tender today — move slower than feels necessary and protect it.`
    : `Your ${focus} is charged — put it to use before the window closes.`

  const moonLine = moonPos
    ? `Moon in ${moonPos.sign}: ${MOON_SIGN[moonPos.sign] ?? 'a shifting mood'}.`
    : ''

  return { sky: skyLine, body: bodyLine, moon: moonLine }
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
