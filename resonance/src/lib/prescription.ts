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
import { breathName, transitTitle, useT, type TFn } from './i18n'
import { crystalName } from './crystals'
import { buildDailyMantra } from './mantra'
import type { MessageKey } from './locales/en'
import {
  MOOD_NEED,
  moodBreath,
  moodMeditation,
  moodMinutesScale,
} from './moodPractice'
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
  /** The day's mantra as a catalogue key — chosen for the focus chakra *and*
   *  the shape of the day. Resolve with `t()`. */
  mantra: MessageKey
  /** Today's logged mood, if any — the prescription is tuned to it. */
  mood: Mood | null
  /** Body signals (or an anxious arrival on a fragile day) say to restore first. */
  urgent: boolean
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
  t: TFn,
): Prescription {
  const label = t(`chakra.${input.chakra}` as MessageKey)
  const { mood } = input

  const breathKey = moodBreath(input.suggestedPattern, mood)
  const pattern = BREATH_PATTERNS[breathKey]
  const breathLabel = breathName(breathKey, t)
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
    placement: t(`rx.place.${input.chakra}` as MessageKey),
  }))

  const headline = urgent
    ? t('rx.headline.restore', { chakra: label })
    : t('rx.headline.focus', { chakra: label, transit: input.transitTitle })

  const stoneText =
    stones.length > 0
      ? t('rx.stoneText', {
          stones: stones
            .map((s) => crystalName(s.name, t))
            .join(t('rx.join.or')),
          place: t(`rx.placeShort.${input.chakra}` as MessageKey),
        })
      : ''

  const arriving = mood ? t(`rx.arriving.${mood}` as MessageKey) : ''
  const need = mood ? MOOD_NEED[mood] : null
  const soften = need === 'settle' || need === 'ground' || need === 'restore'

  const common = {
    minutes,
    hz: input.frequency,
    pattern: breathLabel,
    ratio: pattern.ratio,
    chakra: label,
    transit: input.transitTitle,
    stones: stoneText,
    arriving,
  }

  let directive: string
  if (urgent) {
    directive = mood
      ? t('rx.directive.urgent.mood', common)
      : t('rx.directive.urgent.plain', common)
  } else if (soften) {
    directive = t('rx.directive.soften', common)
  } else {
    directive = mood
      ? t('rx.directive.default.mood', common)
      : t('rx.directive.default.plain', common)
  }

  return {
    chakra: input.chakra,
    chakraLabel: label,
    frequency: input.frequency,
    breathPattern: breathKey,
    breathLabel,
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
  const t = useT()
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const sky = useAppStore((s) => s.sky)
  const profile = useAppStore((s) => s.profile)
  const frequency = useAppStore((s) => s.frequency)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)

  const focus = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focus, sessionLog, moodLog)
  const mood = moodLog.find((m) => m.day === localDayKey())?.mood ?? null
  const planet = transit?.body ?? 'Moon'
  const retrograde = sky.find((p) => p.body === planet)?.retrograde ?? false

  return buildPrescription(
    {
      chakra: focus,
      frequency: chakra?.frequency ?? transit?.recommendedFrequency ?? frequency,
      suggestedPattern,
      crystals,
      transitTitle: transit ? transitTitle(transit, t) : t('rx.transitFallback'),
      planet,
      aspect: transit?.aspect ?? 'in',
      retrograde,
      mantraSeed: `${localDayKey()}|${profile?.utc ?? 'no-natal'}`,
      vulnerable: (chakra?.balance ?? 50) < 50,
      mood,
    },
    aura,
    t,
  )
}
