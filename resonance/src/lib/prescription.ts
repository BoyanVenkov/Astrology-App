import type {
  BreathPatternKey,
  ChakraKey,
  Crystal,
  MeditationStyleKey,
  Mood,
  SolfeggioFrequency,
} from '../types/resonance'
import { useAppStore } from '../store/useAppStore'
import { computeAura, type AuraState } from './aura'
import { BREATH_PATTERNS } from './breathwork'
import { buildDailyMantra } from './mantra'
import {
  MOOD_NEED,
  moodBreath,
  moodClause,
  moodMeditation,
  moodMinutesScale,
} from './moodPractice'
import { chakraName } from './resonanceData'
import { localDayKey } from './timezone'

export interface PrescribedStone {
  name: string
  color: string
  placement: string
}

export interface Prescription {
  chakra: ChakraKey
  chakraLabel: string
  frequency: SolfeggioFrequency
  /** Breath pattern, already bent by today's mood. */
  breathPattern: BreathPatternKey
  breathLabel: string
  breathRatio: string
  /** Meditation style, bent by today's mood (else the chart-tuned 'chakra'). */
  meditationStyle: MeditationStyleKey
  /** Recommended session length in minutes. */
  minutes: number
  stones: PrescribedStone[]
  headline: string
  /** One sentence that reads like the vision's "The Prescription". */
  directive: string
  /** The day's mantra — chosen for the focus chakra *and* the shape of the day
   *  (the transit, its harmony, the mood, whether to restore). */
  mantra: string
  /** Today's logged mood, if any — the prescription is tuned to it. */
  mood: Mood | null
  /** Body signals (or an anxious arrival on a fragile day) say to restore first. */
  urgent: boolean
}

const PLACEMENT: Record<ChakraKey, string> = {
  root: 'in your pocket or by your feet as you sit',
  sacral: 'in a low pocket, near the hips',
  'solar-plexus': 'in a pocket at your waist',
  heart: 'over your heart, or on a cord around your neck',
  throat: 'as a pendant at the throat',
  'third-eye': 'on your desk, in your eyeline as you work',
  crown: 'on your pillow, or above your head as you rest',
}

interface PrescriptionInput {
  chakra: ChakraKey
  frequency: SolfeggioFrequency
  suggestedPattern: BreathPatternKey
  crystals: Crystal[]
  transitTitle: string
  /** Dominant transiting planet + aspect — shape the mantra. */
  planet: string
  aspect: string
  retrograde: boolean
  /** Stable-per-day seed for the mantra pick, `${dayKey}|${profile.utc}`. */
  mantraSeed: string
  vulnerable: boolean
  mood: Mood | null
}

const clampMinutes = (n: number): number => Math.max(3, Math.min(25, Math.round(n)))

export function buildPrescription(
  input: PrescriptionInput,
  aura: AuraState,
): Prescription {
  const label = chakraName(input.chakra)
  const { mood } = input

  const breathKey = moodBreath(input.suggestedPattern, mood)
  const pattern = BREATH_PATTERNS[breathKey]
  const meditationStyle = moodMeditation(mood)

  const urgent =
    aura.needsRest ||
    (input.vulnerable && aura.score < 0.28) ||
    (mood === 'anxious' && input.vulnerable)

  const base = urgent ? 5 : input.vulnerable ? 10 : 12
  const minutes = clampMinutes(base * moodMinutesScale(mood))

  const stones: PrescribedStone[] = input.crystals.slice(0, 2).map((c) => ({
    name: c.name,
    color: c.color,
    placement: PLACEMENT[input.chakra],
  }))

  const headline = urgent
    ? `Restore first · ${label}`
    : `${label} focus · ${input.transitTitle}`

  const stoneText =
    stones.length > 0
      ? ` Keep ${stones.map((s) => s.name).join(' or ')} ${PLACEMENT[input.chakra].replace(/,.*/, '')}.`
      : ''

  const arriving = moodClause(mood)
  const need = mood ? MOOD_NEED[mood] : null
  const soften = need === 'settle' || need === 'ground' || need === 'restore'

  let directive: string
  if (urgent) {
    directive = `${arriving ? `You’re ${arriving}, and your ` : 'Your '}system is depleted. Start with a ${minutes}-minute ${input.frequency} Hz restorative sit and slow ${pattern.name} breathing before the day asks anything of you.${stoneText}`
  } else if (soften) {
    directive = `You’re ${arriving}. With ${input.transitTitle} in the sky, the move is ${pattern.name} breathing (${pattern.ratio}) and ${input.frequency} Hz to settle into the ${label} — ${minutes} minutes.${stoneText}`
  } else {
    directive = `${arriving ? `You’re ${arriving} — a` : 'A'} ${minutes}-minute ${input.frequency} Hz meditation for the ${label}, ${pattern.name} breathing (${pattern.ratio}), and time with your stones.${stoneText}`
  }

  return {
    chakra: input.chakra,
    chakraLabel: label,
    frequency: input.frequency,
    breathPattern: breathKey,
    breathLabel: pattern.name,
    breathRatio: pattern.ratio,
    meditationStyle,
    minutes,
    stones,
    headline,
    directive,
    mantra: buildDailyMantra({
      chakra: input.chakra,
      planet: input.planet,
      aspect: input.aspect,
      moodNeed: mood ? MOOD_NEED[mood] : null,
      moodBright: mood === 'bright',
      urgent,
      retrograde: input.retrograde,
      seed: input.mantraSeed,
    }),
    mood,
    urgent,
  }
}

/** Today's prescription, derived from the live reading + today's mood. */
export function usePrescription(): Prescription {
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const sky = useAppStore((s) => s.sky)
  const profile = useAppStore((s) => s.profile)
  const frequency = useAppStore((s) => s.frequency)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const biometricLog = useAppStore((s) => s.biometricLog)

  const focus = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focus, sessionLog, moodLog, biometricLog)
  const mood = moodLog.find((m) => m.day === localDayKey())?.mood ?? null
  const planet = transit?.body ?? 'Moon'
  const retrograde = sky.find((p) => p.body === planet)?.retrograde ?? false

  return buildPrescription(
    {
      chakra: focus,
      frequency: chakra?.frequency ?? transit?.recommendedFrequency ?? frequency,
      suggestedPattern,
      crystals,
      transitTitle: transit?.title ?? 'today',
      planet,
      aspect: transit?.aspect ?? 'in',
      retrograde,
      mantraSeed: `${localDayKey()}|${profile?.utc ?? 'no-natal'}`,
      vulnerable: (chakra?.balance ?? 50) < 50,
      mood,
    },
    aura,
  )
}
