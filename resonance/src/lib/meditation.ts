import type {
  AstrologicalTransit,
  ChakraKey,
  ChakraState,
  MeditationStyle,
  MeditationStyleKey,
} from '../types/resonance'
import type { Aspect } from './astrology'
import type { BodyName } from './ephemeris'
import { medName, type TFn } from './i18n'
import type { MessageKey } from './locales/en'

/** The slice of a `DailyReading` the meditation script needs (all in the store). */
export interface MeditationInput {
  chakra: ChakraState
  transit: AstrologicalTransit
  aspects: Aspect[]
  transitHouses: Partial<Record<BodyName, number>>
  hasNatal: boolean
}

/**
 * A guided meditation. The "Chakra Alignment" style is generated live from the
 * person's chart × today's transits; the rest are fixed scripts. Spoken (Web
 * Speech) or read on screen — no recordings, fully offline, per locale.
 */

export type MeditationCue =
  | 'settle'
  | 'breath'
  | 'body'
  | 'transit'
  | 'frequency'
  | 'affirm'
  | 'reflect'
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

/* ------------------------------------------------------------- the catalog */

export const MEDITATION_STYLES: MeditationStyle[] = [
  {
    key: 'chakra',
    name: 'Chakra Alignment',
    tagline: 'Tuned to today’s planet, chakra & transit',
    category: 'grounding',
    durations: [5, 10, 15, 20],
    dynamic: true,
  },
  {
    key: 'breath-awareness',
    name: 'Breath Awareness',
    tagline: 'The simplest anchor — follow, drift, return',
    category: 'focus',
    durations: [5, 10, 20],
  },
  {
    key: 'body-scan',
    name: 'Body Scan',
    tagline: 'Release the body one region at a time',
    category: 'calm',
    durations: [8, 15, 25],
  },
  {
    key: 'metta',
    name: 'Loving-Kindness',
    tagline: 'Metta — goodwill for self and others',
    category: 'heart',
    durations: [10, 15, 20],
  },
  {
    key: 'sound-bath',
    name: 'Sound Bath',
    tagline: 'Rest inside the frequency and let it wash through',
    category: 'calm',
    durations: [5, 10, 15],
  },
  {
    key: 'gratitude',
    name: 'Gratitude',
    tagline: 'Three things, felt in the body, not just named',
    category: 'heart',
    durations: [5, 10],
  },
  {
    key: 'safe-place',
    name: 'Safe Place',
    tagline: 'Build a place of total safety and go there',
    category: 'calm',
    durations: [8, 12, 18],
  },
  {
    key: 'mountain',
    name: 'Mountain Meditation',
    tagline: 'Sit like a mountain while the weather passes',
    category: 'grounding',
    durations: [10, 15, 20],
  },
  {
    key: 'open-awareness',
    name: 'Open Awareness',
    tagline: 'Drop the anchor — rest as the space itself',
    category: 'focus',
    durations: [10, 20],
  },
  {
    key: 'morning',
    name: 'Morning Intention',
    tagline: 'Wake the body, set one intention for the day',
    category: 'energy',
    durations: [5, 10],
  },
  {
    key: 'evening',
    name: 'Evening Release',
    tagline: 'Review the day without judgment, then set it down',
    category: 'sleep',
    durations: [8, 15],
  },
  {
    key: 'yoga-nidra',
    name: 'Yoga Nidra',
    tagline: 'Rotation of awareness at the edge of sleep',
    category: 'sleep',
    durations: [15, 25, 35],
  },
]

export const MEDITATION_STYLE_MAP: Record<MeditationStyleKey, MeditationStyle> =
  Object.fromEntries(MEDITATION_STYLES.map((s) => [s.key, s])) as Record<
    MeditationStyleKey,
    MeditationStyle
  >

/* ------------------------------------------------- script timelines (data) */

interface ScriptLine {
  /** Fraction of the total length where this line lands. */
  f: number
  cue: MeditationCue
}

const CHAKRA_SCRIPT: ScriptLine[] = [
  { f: 0.0, cue: 'settle' },
  { f: 0.03, cue: 'breath' },
  { f: 0.07, cue: 'breath' },
  { f: 0.12, cue: 'body' },
  { f: 0.17, cue: 'body' },
  { f: 0.24, cue: 'transit' },
  { f: 0.3, cue: 'transit' },
  { f: 0.37, cue: 'body' },
  { f: 0.45, cue: 'frequency' },
  { f: 0.55, cue: 'transit' },
  { f: 0.63, cue: 'body' },
  { f: 0.72, cue: 'affirm' },
  { f: 0.8, cue: 'affirm' },
  { f: 0.87, cue: 'close' },
  { f: 0.93, cue: 'close' },
  { f: 0.98, cue: 'close' },
]

const STATIC_SCRIPTS: Record<Exclude<MeditationStyleKey, 'chakra'>, ScriptLine[]> = {
  'breath-awareness': [
    { f: 0.0, cue: 'settle' },
    { f: 0.04, cue: 'breath' },
    { f: 0.12, cue: 'breath' },
    { f: 0.22, cue: 'breath' },
    { f: 0.36, cue: 'breath' },
    { f: 0.52, cue: 'breath' },
    { f: 0.68, cue: 'body' },
    { f: 0.82, cue: 'reflect' },
    { f: 0.92, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  'body-scan': [
    { f: 0.0, cue: 'settle' },
    { f: 0.05, cue: 'breath' },
    { f: 0.12, cue: 'body' },
    { f: 0.22, cue: 'body' },
    { f: 0.34, cue: 'body' },
    { f: 0.46, cue: 'body' },
    { f: 0.56, cue: 'body' },
    { f: 0.66, cue: 'body' },
    { f: 0.76, cue: 'body' },
    { f: 0.85, cue: 'body' },
    { f: 0.93, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  metta: [
    { f: 0.0, cue: 'settle' },
    { f: 0.05, cue: 'breath' },
    { f: 0.12, cue: 'reflect' },
    { f: 0.26, cue: 'reflect' },
    { f: 0.4, cue: 'reflect' },
    { f: 0.56, cue: 'reflect' },
    { f: 0.7, cue: 'reflect' },
    { f: 0.84, cue: 'reflect' },
    { f: 0.93, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  'sound-bath': [
    { f: 0.0, cue: 'settle' },
    { f: 0.05, cue: 'frequency' },
    { f: 0.14, cue: 'frequency' },
    { f: 0.28, cue: 'body' },
    { f: 0.44, cue: 'frequency' },
    { f: 0.6, cue: 'body' },
    { f: 0.76, cue: 'frequency' },
    { f: 0.9, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  gratitude: [
    { f: 0.0, cue: 'settle' },
    { f: 0.08, cue: 'reflect' },
    { f: 0.24, cue: 'body' },
    { f: 0.42, cue: 'reflect' },
    { f: 0.58, cue: 'body' },
    { f: 0.74, cue: 'reflect' },
    { f: 0.88, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  'safe-place': [
    { f: 0.0, cue: 'settle' },
    { f: 0.08, cue: 'reflect' },
    { f: 0.22, cue: 'reflect' },
    { f: 0.38, cue: 'body' },
    { f: 0.54, cue: 'body' },
    { f: 0.68, cue: 'reflect' },
    { f: 0.82, cue: 'reflect' },
    { f: 0.92, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  mountain: [
    { f: 0.0, cue: 'settle' },
    { f: 0.08, cue: 'reflect' },
    { f: 0.2, cue: 'body' },
    { f: 0.36, cue: 'body' },
    { f: 0.5, cue: 'reflect' },
    { f: 0.66, cue: 'reflect' },
    { f: 0.8, cue: 'body' },
    { f: 0.92, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  'open-awareness': [
    { f: 0.0, cue: 'settle' },
    { f: 0.06, cue: 'breath' },
    { f: 0.2, cue: 'reflect' },
    { f: 0.34, cue: 'reflect' },
    { f: 0.5, cue: 'reflect' },
    { f: 0.66, cue: 'reflect' },
    { f: 0.8, cue: 'reflect' },
    { f: 0.92, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  morning: [
    { f: 0.0, cue: 'settle' },
    { f: 0.08, cue: 'breath' },
    { f: 0.22, cue: 'body' },
    { f: 0.38, cue: 'reflect' },
    { f: 0.54, cue: 'reflect' },
    { f: 0.7, cue: 'reflect' },
    { f: 0.84, cue: 'body' },
    { f: 0.94, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  evening: [
    { f: 0.0, cue: 'settle' },
    { f: 0.08, cue: 'breath' },
    { f: 0.2, cue: 'reflect' },
    { f: 0.38, cue: 'reflect' },
    { f: 0.54, cue: 'reflect' },
    { f: 0.68, cue: 'reflect' },
    { f: 0.82, cue: 'body' },
    { f: 0.92, cue: 'close' },
    { f: 0.98, cue: 'close' },
  ],
  'yoga-nidra': [
    { f: 0.0, cue: 'settle' },
    { f: 0.05, cue: 'breath' },
    { f: 0.12, cue: 'reflect' },
    { f: 0.2, cue: 'body' },
    { f: 0.28, cue: 'body' },
    { f: 0.4, cue: 'body' },
    { f: 0.5, cue: 'body' },
    { f: 0.6, cue: 'body' },
    { f: 0.68, cue: 'body' },
    { f: 0.76, cue: 'body' },
    { f: 0.84, cue: 'breath' },
    { f: 0.9, cue: 'reflect' },
    { f: 0.95, cue: 'close' },
    { f: 0.99, cue: 'close' },
  ],
}

/* --------------------------------------------------------------- builder */

export function buildMeditation(
  style: MeditationStyleKey,
  reading: MeditationInput,
  minutes: number,
  t: TFn,
): Meditation {
  const focus = reading.chakra.key
  const planet = reading.transit.body as BodyName
  const dominantAspect = reading.aspects[0]
  const harmony = dominantAspect?.def.harmony ?? 'neutral'

  const other =
    (dominantAspect?.other ?? '').length > 0
      ? t(`planet.${dominantAspect!.other}` as MessageKey)
      : t('med.dominant.chartWord')
  const verbKey = `med.domverb.${reading.transit.aspect}` as MessageKey
  const dominantText =
    reading.hasNatal && reading.transit.aspect !== 'in'
      ? t('med.dominant.aspect', {
          planet: t(`planet.${reading.transit.body}` as MessageKey),
          verb: t(verbKey),
          other,
        })
      : t('med.dominant.sign', {
          planet: t(`planet.${reading.transit.body}` as MessageKey),
          sign: t(`sign.${reading.transit.sign}` as MessageKey),
        })

  const house = reading.transitHouses[planet]
  const houseLine =
    house && house >= 1 && house <= 12
      ? t('med.houseLine.known', {
          theme: t(`med.house.${house}` as MessageKey),
        })
      : t('med.houseLine.unknown')

  const chakraLower = t('med.chakraLower', {
    chakra: t(`chakra.${focus}` as MessageKey).toLowerCase(),
  })

  const params: Record<string, string | number> = {
    seat: t(`med.seat.${focus}` as MessageKey),
    chakraLower,
    hz: reading.transit.recommendedFrequency,
    affirmation: t(`med.mantraLong.${focus}` as MessageKey),
    transitLine: t(`med.ease.${harmony}` as MessageKey, { dominant: dominantText }),
    planetInvite:
      t(`med.invite.${planet}` as MessageKey) ||
      t('med.invite.default'),
    houseLine,
  }

  const script = style === 'chakra' ? CHAKRA_SCRIPT : STATIC_SCRIPTS[style]
  const prefix =
    style === 'chakra' ? 'med.chakraScript' : `med.script.${style}`
  const total = minutes * 60
  const steps: MeditationStep[] = script.map((s, i) => ({
    at: Math.round(s.f * total),
    text: t(`${prefix}.${i}` as MessageKey, params),
    cue: s.cue,
  }))

  return {
    title:
      medName(style, t) ||
      t('med.title.fallback', {
        chakra: t(`chakra.${focus}` as MessageKey),
      }),
    minutes,
    hue: reading.chakra.color,
    frequency: reading.transit.recommendedFrequency,
    focus,
    steps,
  }
}
