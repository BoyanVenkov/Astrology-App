import type {
  BreathPatternKey,
  ChakraKey,
  Crystal,
  SolfeggioFrequency,
} from '../types/resonance'
import { useAppStore } from '../store/useAppStore'
import { computeAura, type AuraState } from './aura'
import { BREATH_PATTERNS } from './breathwork'
import { chakraName } from './resonanceData'

export interface PrescribedStone {
  name: string
  color: string
  placement: string
}

export interface Prescription {
  chakra: ChakraKey
  chakraLabel: string
  frequency: SolfeggioFrequency
  breathPattern: BreathPatternKey
  breathLabel: string
  breathRatio: string
  /** Recommended meditation length in minutes. */
  minutes: number
  stones: PrescribedStone[]
  headline: string
  /** One sentence that reads like the vision's "The Prescription". */
  directive: string
  /** Body signals say to restore before anything else. */
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
  vulnerable: boolean
}

export function buildPrescription(
  input: PrescriptionInput,
  aura: AuraState,
): Prescription {
  const label = chakraName(input.chakra)
  const pattern = BREATH_PATTERNS[input.suggestedPattern]
  const urgent = aura.needsRest || (input.vulnerable && aura.score < 0.28)

  // restorative days get a shorter, softer sit; strong days can go longer
  const minutes = urgent ? 5 : input.vulnerable ? 10 : 12

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

  const directive = urgent
    ? `Your system is depleted. Start with a ${minutes}-minute ${input.frequency} Hz restorative sit and slow ${pattern.name} breathing before the day asks anything of you.${stoneText}`
    : `A ${minutes}-minute ${input.frequency} Hz meditation for the ${label}, ${pattern.name} breathing (${pattern.ratio}), and time with your stones.${stoneText}`

  return {
    chakra: input.chakra,
    chakraLabel: label,
    frequency: input.frequency,
    breathPattern: input.suggestedPattern,
    breathLabel: pattern.name,
    breathRatio: pattern.ratio,
    minutes,
    stones,
    headline,
    directive,
    urgent,
  }
}

/** Today's prescription, derived from the store. */
export function usePrescription(): Prescription {
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const frequency = useAppStore((s) => s.frequency)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const biometricLog = useAppStore((s) => s.biometricLog)

  const focus = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focus, sessionLog, moodLog, biometricLog)

  return buildPrescription(
    {
      chakra: focus,
      frequency: chakra?.frequency ?? transit?.recommendedFrequency ?? frequency,
      suggestedPattern,
      crystals,
      transitTitle: transit?.title ?? 'today',
      vulnerable: (chakra?.balance ?? 50) < 50,
    },
    aura,
  )
}
