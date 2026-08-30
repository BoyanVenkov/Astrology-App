import type {
  AstrologicalTransit,
  ChakraKey,
  ChakraState,
} from '../types/resonance'
import type { Aspect } from './astrology'
import type { BodyName } from './ephemeris'
import { chakraName } from './resonanceData'

/** The slice of a `DailyReading` the meditation script needs (all in the store). */
export interface MeditationInput {
  chakra: ChakraState
  transit: AstrologicalTransit
  aspects: Aspect[]
  transitHouses: Partial<Record<BodyName, number>>
  hasNatal: boolean
}

/**
 * A guided meditation, generated from the person's chart × today's transits —
 * spoken (Web Speech) or read on screen. No recordings; fully offline.
 */

export type MeditationCue =
  | 'settle'
  | 'breath'
  | 'body'
  | 'transit'
  | 'frequency'
  | 'affirm'
  | 'close'

export interface MeditationStep {
  /** Seconds from the start when this line appears / is spoken. */
  at: number
  text: string
  cue: MeditationCue
}

export interface Meditation {
  title: string
  minutes: number
  hue: string
  frequency: number
  focus: ChakraKey
  steps: MeditationStep[]
}

const BODY_SEAT: Record<ChakraKey, string> = {
  root: 'the base of your spine, where you meet the ground',
  sacral: 'your lower belly, a hand’s width below the navel',
  'solar-plexus': 'the soft place beneath your ribs',
  heart: 'the centre of your chest',
  throat: 'the hollow of your throat',
  'third-eye': 'the space between your brows',
  crown: 'the crown of your head, and a little above it',
}

const HOUSE_THEME: Record<number, string> = {
  1: 'how you show up and meet the world',
  2: 'what you value and what steadies you',
  3: 'your everyday mind and the words you use',
  4: 'home, roots, and where you feel held',
  5: 'play, creativity, and what delights you',
  6: 'the daily work of tending yourself',
  7: 'the people closest to you',
  8: 'what is ending, and what you share deeply',
  9: 'meaning, and the wider view',
  10: 'your work in the world and how you are seen',
  11: 'your people, and what you are reaching for',
  12: 'rest, solitude, and the quiet under everything',
}

const PLANET_INVITE: Record<BodyName, string> = {
  Sun: 'Let a steady warmth gather here — your own light, uncomplicated.',
  Moon: 'Let whatever you feel simply be here, without needing to fix it.',
  Mercury: 'Let the thinking slow down. You do not have to solve anything now.',
  Venus: 'Soften toward yourself the way you would toward someone you love.',
  Mars: 'Notice any heat or urgency, and let the out-breath carry some of it away.',
  Jupiter: 'Let this space feel a little more spacious than a moment ago.',
  Saturn: 'Meet the weight here honestly. You can hold more than you think.',
  Uranus: 'Let something loosen — a grip, an old shape you no longer need.',
  Neptune: 'Let the edges blur. You are allowed to not know for a while.',
  Pluto: 'Let what is finished finish. Breathe into the space it leaves.',
}

const easeText = (dominant: string, harmony: string): string => {
  if (harmony === 'hard') {
    return `There is friction in ${dominant} today. You are not here to push through it — just to feel it clearly and stay soft around it.`
  }
  if (harmony === 'soft') {
    return `${dominant} is flowing today. Notice the ease, and let yourself receive it.`
  }
  return `${dominant} is intense today. Let it move through you rather than lodging in your body.`
}

// The script as fractions of the total length, so it scales to any duration.
const SCRIPT: { f: number; cue: MeditationCue; make: (c: Ctx) => string }[] = [
  { f: 0.0, cue: 'settle', make: () => 'Settle into a comfortable seat. Let your eyes close, or soften your gaze downward.' },
  { f: 0.03, cue: 'breath', make: () => 'Take a slow breath in through the nose… and a longer breath out.' },
  { f: 0.07, cue: 'breath', make: () => 'Again — in… and out. Let each exhale be a little longer than the one before.' },
  { f: 0.12, cue: 'body', make: (c) => `Bring your attention to ${c.seat}.` },
  { f: 0.17, cue: 'body', make: (c) => `Breathe as if the breath itself were reaching ${c.chakraLower}. Let it warm and open there.` },
  { f: 0.24, cue: 'transit', make: (c) => c.transitLine },
  { f: 0.3, cue: 'transit', make: (c) => c.planetInvite },
  { f: 0.37, cue: 'body', make: (c) => `If there is tension anywhere near ${c.chakraLower}, breathe into it. Let the out-breath soften it by a fraction.` },
  { f: 0.45, cue: 'frequency', make: (c) => `Let the ${c.frequency} hertz tone move through this space. You do not have to do anything with it — just let it wash through.` },
  { f: 0.55, cue: 'transit', make: (c) => c.houseLine },
  { f: 0.63, cue: 'body', make: (c) => `Rest your attention lightly on ${c.chakraLower}. Bright, quiet, unhurried.` },
  { f: 0.72, cue: 'affirm', make: (c) => `Silently, to yourself: ${c.affirmation}` },
  { f: 0.8, cue: 'affirm', make: (c) => `Again: ${c.affirmation}` },
  { f: 0.87, cue: 'close', make: () => 'Let the words go. Come back to the simple feeling of breathing.' },
  { f: 0.93, cue: 'close', make: () => 'Begin to deepen the breath. Let the sound fade into the background.' },
  { f: 0.98, cue: 'close', make: (c) => `When you are ready, open your eyes. Carry a little of your ${c.chakraLower} with you.` },
]

interface Ctx {
  seat: string
  chakraLower: string
  frequency: number
  affirmation: string
  transitLine: string
  planetInvite: string
  houseLine: string
}

export function buildMeditation(
  reading: MeditationInput,
  minutes: number,
): Meditation {
  const focus = reading.chakra.key
  const planet = reading.transit.body as BodyName
  const dominantAspect = reading.aspects[0]
  const harmony = dominantAspect?.def.harmony ?? 'neutral'
  const dominantText =
    reading.hasNatal && reading.transit.aspect !== 'in'
      ? `${reading.transit.body} ${reading.transit.aspect === 'conjunction' ? 'meeting' : reading.transit.aspect === 'opposition' ? 'opposite' : reading.transit.aspect} your natal ${(dominantAspect?.other ?? '').toLowerCase() || 'chart'}`
      : `${reading.transit.body} moving through ${reading.transit.sign}`

  const house = reading.transitHouses[planet]
  const houseLine =
    house && HOUSE_THEME[house]
      ? `This is touching the part of your life that is about ${HOUSE_THEME[house]}. Hold that lightly. Nothing needs deciding here — only noticing.`
      : 'Whatever this stirs in your life, let it settle for the length of this practice. It will still be there when you finish, and you will meet it with more room.'

  const affirmation = AFFIRMATIONS[focus]

  const ctx: Ctx = {
    seat: BODY_SEAT[focus],
    chakraLower: `${chakraName(focus).toLowerCase()} centre`,
    frequency: reading.transit.recommendedFrequency,
    affirmation,
    transitLine: easeText(dominantText, harmony),
    planetInvite: PLANET_INVITE[planet] ?? 'Let this energy move through you, not into you.',
    houseLine,
  }

  const total = minutes * 60
  const steps: MeditationStep[] = SCRIPT.map((s) => ({
    at: Math.round(s.f * total),
    text: s.make(ctx),
    cue: s.cue,
  }))

  return {
    title: `${chakraName(focus)} meditation`,
    minutes,
    hue: reading.chakra.color,
    frequency: reading.transit.recommendedFrequency,
    focus,
    steps,
  }
}

const AFFIRMATIONS: Record<ChakraKey, string> = {
  root: 'I am safe. I am here. I have what I need.',
  sacral: 'I let life move through me.',
  'solar-plexus': 'I trust my own fire.',
  heart: 'I give and receive love freely.',
  throat: 'I speak my truth with ease.',
  'third-eye': 'I trust what I see within.',
  crown: 'I am part of something vast, and it holds me.',
}
