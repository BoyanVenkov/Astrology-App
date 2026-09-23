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
 * A guided meditation, delivered as a briefing and then a sequence of
 * self-paced phases. Each phase's instruction stays on screen for its whole
 * duration; where a recorded narration clip exists for its exact line/locale
 * (see lib/meditationAudio.ts), it plays at the phase's `at` offset. The
 * "Chakra Alignment" style picks one of seven fixed scripts based on today's
 * focus centre — it's personalised by *selection*, not by narrating the
 * day's transit specifics (that combinatorial space can't be pre-recorded).
 */

export interface MeditationPhase {
  /** Seconds from the start of the session when this phase opens. */
  at: number
  /** The instruction shown on screen for the whole of this phase. */
  text: string
  /** Which message key this came from — the recorded-narration lookup key. */
  line: MessageKey
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
    tagline: 'Support for whichever centre needs it most today',
    category: 'grounding',
    durations: [5, 10, 15, 20],
    dynamic: true,
  },
  {
    key: 'breath-awareness',
    name: 'Breath Awareness',
    tagline: 'The simplest anchor — follow, drift, return',
    category: 'focus',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'body-scan',
    name: 'Body Scan',
    tagline: 'Release the body one region at a time',
    category: 'calm',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'metta',
    name: 'Loving-Kindness',
    tagline: 'Metta — goodwill for self and others',
    category: 'heart',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'sound-bath',
    name: 'Sound Bath',
    tagline: 'Rest inside the frequency and let it wash through',
    category: 'calm',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'gratitude',
    name: 'Gratitude',
    tagline: 'Three things, felt in the body, not just named',
    category: 'heart',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'safe-place',
    name: 'Safe Place',
    tagline: 'Build a place of total safety and go there',
    category: 'calm',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'mountain',
    name: 'Mountain Meditation',
    tagline: 'Sit like a mountain while the weather passes',
    category: 'grounding',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'open-awareness',
    name: 'Open Awareness',
    tagline: 'Drop the anchor — rest as the space itself',
    category: 'focus',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'morning',
    name: 'Morning Intention',
    tagline: 'Wake the body, set one intention for the day',
    category: 'energy',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'evening',
    name: 'Evening Release',
    tagline: 'Review the day without judgment, then set it down',
    category: 'sleep',
    durations: [5, 10, 15, 20],
  },
  {
    key: 'yoga-nidra',
    name: 'Yoga Nidra',
    tagline: 'Rotation of awareness at the edge of sleep',
    category: 'sleep',
    durations: [5, 10, 15, 20],
  },
]

export const MEDITATION_STYLE_MAP: Record<MeditationStyleKey, MeditationStyle> =
  Object.fromEntries(MEDITATION_STYLES.map((s) => [s.key, s])) as Record<
    MeditationStyleKey,
    MeditationStyle
  >

/* --------------------------------------------------- phase plans (data) */

interface PlanPhase {
  /** Message key for the instruction — also the recorded-narration lookup key. */
  line: MessageKey
  /** Relative share of the session length. */
  weight: number
}

const settle = (): PlanPhase => ({ line: 'med.step.settle', weight: 1 })
const close = (): PlanPhase => ({ line: 'med.step.close', weight: 1 })

/** Which two fixed lines "Chakra Alignment" speaks, per focus centre. */
const CHAKRA_FOCUS_LINES: Record<ChakraKey, [MessageKey, MessageKey]> = {
  root: ['med.step.chakra.root.0', 'med.step.chakra.root.1'],
  sacral: ['med.step.chakra.sacral.0', 'med.step.chakra.sacral.1'],
  'solar-plexus': ['med.step.chakra.solar-plexus.0', 'med.step.chakra.solar-plexus.1'],
  heart: ['med.step.chakra.heart.0', 'med.step.chakra.heart.1'],
  throat: ['med.step.chakra.throat.0', 'med.step.chakra.throat.1'],
  'third-eye': ['med.step.chakra.third-eye.0', 'med.step.chakra.third-eye.1'],
  crown: ['med.step.chakra.crown.0', 'med.step.chakra.crown.1'],
}

const PHASE_PLANS: Record<Exclude<MeditationStyleKey, 'chakra'>, PlanPhase[]> = {
  'breath-awareness': [
    settle(),
    { line: 'med.step.breath', weight: 3 },
    { line: 'med.step.ba.count', weight: 2.2 },
    close(),
  ],
  'body-scan': [
    settle(),
    { line: 'med.step.scan.0', weight: 3.2 },
    { line: 'med.step.scan.1', weight: 2 },
    close(),
  ],
  metta: [
    settle(),
    { line: 'med.step.metta.0', weight: 2.2 },
    { line: 'med.step.metta.1', weight: 2 },
    { line: 'med.step.metta.2', weight: 2 },
    close(),
  ],
  'sound-bath': [
    settle(),
    { line: 'med.step.bath.0', weight: 3 },
    { line: 'med.step.bath.1', weight: 2.4 },
    close(),
  ],
  gratitude: [
    settle(),
    { line: 'med.step.grat.0', weight: 2 },
    { line: 'med.step.grat.1', weight: 2 },
    { line: 'med.step.grat.2', weight: 2 },
    close(),
  ],
  'safe-place': [
    settle(),
    { line: 'med.step.safe.0', weight: 3 },
    { line: 'med.step.safe.1', weight: 2.4 },
    close(),
  ],
  mountain: [
    settle(),
    { line: 'med.step.mtn.0', weight: 3 },
    { line: 'med.step.mtn.1', weight: 2.6 },
    close(),
  ],
  'open-awareness': [
    settle(),
    { line: 'med.step.breath', weight: 1.6 },
    { line: 'med.step.open.0', weight: 2.6 },
    { line: 'med.step.open.1', weight: 2.4 },
    close(),
  ],
  morning: [
    settle(),
    { line: 'med.step.morn.0', weight: 2.4 },
    { line: 'med.step.morn.1', weight: 2.4 },
    close(),
  ],
  evening: [
    settle(),
    { line: 'med.step.eve.0', weight: 2.6 },
    { line: 'med.step.eve.1', weight: 2.6 },
    close(),
  ],
  'yoga-nidra': [
    settle(),
    { line: 'med.step.nidra.0', weight: 2 },
    { line: 'med.step.nidra.1', weight: 2.4 },
    { line: 'med.step.nidra.2', weight: 2.4 },
    { line: 'med.step.nidra.3', weight: 2 },
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

  const plan: PlanPhase[] =
    style === 'chakra'
      ? [
          settle(),
          { line: 'med.step.breath', weight: 1.4 },
          { line: CHAKRA_FOCUS_LINES[focus][0], weight: 2.9 },
          { line: CHAKRA_FOCUS_LINES[focus][1], weight: 2.9 },
          close(),
        ]
      : PHASE_PLANS[style]

  const totalWeight = plan.reduce((sum, p) => sum + p.weight, 0)
  const total = minutes * 60

  let acc = 0
  const phases: MeditationPhase[] = plan.map((p) => {
    const at = Math.round((acc / totalWeight) * total)
    acc += p.weight
    return { at, text: t(p.line), line: p.line }
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
