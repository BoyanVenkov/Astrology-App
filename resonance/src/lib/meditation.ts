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

/** The slice of a `DailyReading` the meditation needs (all in the store). */
export interface MeditationInput {
  chakra: ChakraState
  transit: AstrologicalTransit
  aspects: Aspect[]
  transitHouses: Partial<Record<BodyName, number>>
  hasNatal: boolean
}

/**
 * A guided meditation, delivered as a briefing the user reads once and then a
 * sequence of self-paced phases. There is no spoken audio — each phase opens
 * with a singing-bowl strike (the cue to move on), the instruction for the
 * current phase stays on screen, and three bowls close the practice. The
 * "Chakra Alignment" style is composed live from the person's chart × today's
 * transits; the rest are fixed. Fully offline, per locale.
 */

export type MeditationPhaseKey =
  | 'settle'
  | 'breath'
  | 'centre'
  | 'transit'
  | 'affirm'
  | 'close'
  | 'count'
  | 'scan'
  | 'metta'
  | 'bath'
  | 'gratitude'
  | 'safe'
  | 'mountain'
  | 'open'
  | 'morning'
  | 'evening'
  | 'nidra'

export interface MeditationPhase {
  /** Seconds from the start of the session when this phase opens (its bowl). */
  at: number
  /** The instruction shown on screen for the whole of this phase. */
  text: string
}

export interface Meditation {
  title: string
  minutes: number
  hue: string
  frequency: number
  focus: ChakraKey
  /** One line, read before starting. */
  briefingLead: string
  /** One line, read before starting — what the closing bowls mean. */
  briefingClose: string
  phases: MeditationPhase[]
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

/* --------------------------------------------------- phase plans (data) */

interface PlanPhase {
  key: MeditationPhaseKey
  /** Message key for the instruction. */
  line: MessageKey
  /** Relative share of the session length. */
  weight: number
}

const settle = (): PlanPhase => ({
  key: 'settle',
  line: 'med.step.settle',
  weight: 1,
})
const close = (): PlanPhase => ({
  key: 'close',
  line: 'med.step.close',
  weight: 1,
})

const PHASE_PLANS: Record<MeditationStyleKey, PlanPhase[]> = {
  chakra: [
    settle(),
    { key: 'breath', line: 'med.step.breath', weight: 1.4 },
    { key: 'centre', line: 'med.step.centre', weight: 2.4 },
    { key: 'transit', line: 'med.step.transit', weight: 2 },
    { key: 'affirm', line: 'med.step.affirm', weight: 1.4 },
    close(),
  ],
  'breath-awareness': [
    settle(),
    { key: 'breath', line: 'med.step.breath', weight: 3 },
    { key: 'count', line: 'med.step.ba.count', weight: 2.2 },
    close(),
  ],
  'body-scan': [
    settle(),
    { key: 'scan', line: 'med.step.scan.0', weight: 3.2 },
    { key: 'scan', line: 'med.step.scan.1', weight: 2 },
    close(),
  ],
  metta: [
    settle(),
    { key: 'metta', line: 'med.step.metta.0', weight: 2.2 },
    { key: 'metta', line: 'med.step.metta.1', weight: 2 },
    { key: 'metta', line: 'med.step.metta.2', weight: 2 },
    close(),
  ],
  'sound-bath': [
    settle(),
    { key: 'bath', line: 'med.step.bath.0', weight: 3 },
    { key: 'bath', line: 'med.step.bath.1', weight: 2.4 },
    close(),
  ],
  gratitude: [
    settle(),
    { key: 'gratitude', line: 'med.step.grat.0', weight: 2 },
    { key: 'gratitude', line: 'med.step.grat.1', weight: 2 },
    { key: 'gratitude', line: 'med.step.grat.2', weight: 2 },
    close(),
  ],
  'safe-place': [
    settle(),
    { key: 'safe', line: 'med.step.safe.0', weight: 3 },
    { key: 'safe', line: 'med.step.safe.1', weight: 2.4 },
    close(),
  ],
  mountain: [
    settle(),
    { key: 'mountain', line: 'med.step.mtn.0', weight: 3 },
    { key: 'mountain', line: 'med.step.mtn.1', weight: 2.6 },
    close(),
  ],
  'open-awareness': [
    settle(),
    { key: 'breath', line: 'med.step.breath', weight: 1.6 },
    { key: 'open', line: 'med.step.open.0', weight: 2.6 },
    { key: 'open', line: 'med.step.open.1', weight: 2.4 },
    close(),
  ],
  morning: [
    settle(),
    { key: 'morning', line: 'med.step.morn.0', weight: 2.4 },
    { key: 'morning', line: 'med.step.morn.1', weight: 2.4 },
    close(),
  ],
  evening: [
    settle(),
    { key: 'evening', line: 'med.step.eve.0', weight: 2.6 },
    { key: 'evening', line: 'med.step.eve.1', weight: 2.6 },
    close(),
  ],
  'yoga-nidra': [
    settle(),
    { key: 'nidra', line: 'med.step.nidra.0', weight: 2 },
    { key: 'nidra', line: 'med.step.nidra.1', weight: 2.4 },
    { key: 'nidra', line: 'med.step.nidra.2', weight: 2.4 },
    { key: 'nidra', line: 'med.step.nidra.3', weight: 2 },
    close(),
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

  const chakraLower = t('med.chakraLower', {
    chakra: t(`chakra.${focus}` as MessageKey).toLowerCase(),
  })

  const params: Record<string, string | number> = {
    seat: t(`med.seat.${focus}` as MessageKey),
    chakra: t(`chakra.${focus}` as MessageKey),
    chakraLower,
    hz: reading.transit.recommendedFrequency,
    affirmation: t(`med.mantraLong.${focus}` as MessageKey),
    transitLine: t(`med.ease.${harmony}` as MessageKey, { dominant: dominantText }),
    planetInvite:
      t(`med.invite.${planet}` as MessageKey) || t('med.invite.default'),
  }

  const plan = PHASE_PLANS[style]
  const totalWeight = plan.reduce((sum, p) => sum + p.weight, 0)
  const total = minutes * 60

  let acc = 0
  const phases: MeditationPhase[] = plan.map((p) => {
    const at = Math.round((acc / totalWeight) * total)
    acc += p.weight
    return { at, text: t(p.line, params) }
  })

  return {
    title:
      medName(style, t) ||
      t('med.title.fallback', { chakra: t(`chakra.${focus}` as MessageKey) }),
    minutes,
    hue: reading.chakra.color,
    frequency: reading.transit.recommendedFrequency,
    focus,
    briefingLead: t('med.brief.lead'),
    briefingClose: t('med.brief.close'),
    phases,
  }
}
