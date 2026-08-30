import type {
  BreathPattern,
  BreathPatternKey,
  BreathStep,
} from '../types/resonance'

const GOLD = '#d4af37'
const CYAN = '#38bdf8'
const VIOLET = '#a78bfa'
const EMBER = '#f97316'
const TEAL = '#2dd4bf'
const INDIGO = '#818cf8'
const ICE = '#60a5fa'

/** Active exhales per second during a Kapalabhati pump phase. */
export const PUMP_RATE = 1.6

export const BREATH_PATTERNS: Record<BreathPatternKey, BreathPattern> = {
  box: {
    key: 'box',
    name: 'Box Breathing',
    tagline: 'Steady focus · nervous-system reset',
    ratio: '4·4·4·4',
    accent: GOLD,
    category: 'balance',
    durations: [2, 5, 10, 15],
    guide:
      'Equal counts in, held full, out, held empty. Square the breath and the mind follows it.',
    steps: [
      { kind: 'inhale', seconds: 4, label: 'Inhale' },
      { kind: 'hold', seconds: 4, label: 'Hold' },
      { kind: 'exhale', seconds: 4, label: 'Exhale' },
      { kind: 'rest', seconds: 4, label: 'Hold empty' },
    ],
  },
  relax: {
    key: 'relax',
    name: '4·7·8 Relax',
    tagline: 'Down-regulate for sleep & release',
    ratio: '4·7·8',
    accent: CYAN,
    category: 'calm',
    durations: [3, 6, 10],
    guide:
      'A long hold and an even longer exhale tell the body it is safe to stand down.',
    steps: [
      { kind: 'inhale', seconds: 4, label: 'Inhale' },
      { kind: 'hold', seconds: 7, label: 'Hold' },
      { kind: 'exhale', seconds: 8, label: 'Exhale' },
    ],
  },
  coherent: {
    key: 'coherent',
    name: 'Coherent 5·5',
    tagline: 'Heart-rate variability · calm alertness',
    ratio: '5·5',
    accent: VIOLET,
    category: 'balance',
    durations: [5, 10, 20],
    guide:
      'Five in, five out — about six breaths a minute, the rate where heart and breath fall into step.',
    steps: [
      { kind: 'inhale', seconds: 5, label: 'Inhale' },
      { kind: 'exhale', seconds: 5, label: 'Exhale' },
    ],
  },
  resonant: {
    key: 'resonant',
    name: 'Resonant 6·6',
    tagline: 'Deep coherence · slow the whole system',
    ratio: '6·6',
    accent: INDIGO,
    category: 'calm',
    durations: [6, 12, 20],
    guide:
      'A slower cousin of coherent breathing — five breaths a minute, for when you have time to drop right down.',
    steps: [
      { kind: 'inhale', seconds: 6, label: 'Inhale' },
      { kind: 'exhale', seconds: 6, label: 'Exhale' },
    ],
  },
  exhale: {
    key: 'exhale',
    name: 'Extended Exhale',
    tagline: 'Vagal brake · ease anxiety',
    ratio: '4·8',
    accent: TEAL,
    category: 'calm',
    durations: [3, 6, 10],
    guide:
      'Keep the inhale easy and make the exhale twice as long. The out-breath is where the brake is.',
    steps: [
      { kind: 'inhale', seconds: 4, label: 'Inhale' },
      { kind: 'exhale', seconds: 8, label: 'Exhale' },
      { kind: 'rest', seconds: 1, label: 'Rest' },
    ],
  },
  sigh: {
    key: 'sigh',
    name: 'Physiological Sigh',
    tagline: 'The fastest way to offload stress',
    ratio: 'in · in · out',
    accent: CYAN,
    category: 'calm',
    durations: [1, 3, 5],
    guide:
      'Two inhales through the nose — a full one, then a short sip to top off — then a long slow exhale through the mouth.',
    steps: [
      { kind: 'inhale', seconds: 2.4, label: 'Inhale' },
      { kind: 'sip', seconds: 1, label: 'Sip more in' },
      { kind: 'exhale', seconds: 6, label: 'Long exhale' },
      { kind: 'rest', seconds: 1, label: 'Rest' },
    ],
  },
  triangle: {
    key: 'triangle',
    name: 'Triangle 4·4·4',
    tagline: 'Simple focus · no hold on empty',
    ratio: '4·4·4',
    accent: GOLD,
    category: 'balance',
    durations: [3, 6, 12],
    guide: 'In, hold, out — three equal sides. Box breathing without the pause on empty.',
    steps: [
      { kind: 'inhale', seconds: 4, label: 'Inhale' },
      { kind: 'hold', seconds: 4, label: 'Hold' },
      { kind: 'exhale', seconds: 4, label: 'Exhale' },
    ],
  },
  nadi: {
    key: 'nadi',
    name: 'Alternate Nostril',
    tagline: 'Nadi Shodhana · balance both sides',
    ratio: '4·4·4·4',
    accent: VIOLET,
    category: 'balance',
    durations: [4, 8, 12],
    guide:
      'Thumb closes the right nostril, ring finger the left. In one side, hold, out the other — then swap.',
    steps: [
      { kind: 'inhale', seconds: 4, label: 'In · left' },
      { kind: 'hold', seconds: 4, label: 'Hold' },
      { kind: 'exhale', seconds: 4, label: 'Out · right' },
      { kind: 'inhale', seconds: 4, label: 'In · right' },
      { kind: 'hold', seconds: 4, label: 'Hold' },
      { kind: 'exhale', seconds: 4, label: 'Out · left' },
    ],
  },
  ujjayi: {
    key: 'ujjayi',
    name: 'Ocean Breath',
    tagline: 'Ujjayi · a warm, audible calm',
    ratio: '5·1·6',
    accent: '#22d3ee',
    category: 'calm',
    durations: [5, 10, 15],
    guide:
      'Breathe through the nose with a slight narrowing at the back of the throat, so each breath sounds like a soft wave.',
    steps: [
      { kind: 'inhale', seconds: 5, label: 'Inhale' },
      { kind: 'hold', seconds: 1, label: 'Turn' },
      { kind: 'exhale', seconds: 6, label: 'Exhale' },
    ],
  },
  energize: {
    key: 'energize',
    name: 'Energising 6·2',
    tagline: 'Longer in than out · a clean lift',
    ratio: '6·2',
    accent: EMBER,
    category: 'energy',
    durations: [2, 4, 6],
    guide:
      'Full slow inhale, quick release — the opposite of the calming ratio. Use it to wake up, not to wind down.',
    steps: [
      { kind: 'inhale', seconds: 6, label: 'Big inhale' },
      { kind: 'exhale', seconds: 2, label: 'Release' },
    ],
  },
  kapalabhati: {
    key: 'kapalabhati',
    name: 'Fire Breath',
    tagline: 'Kapalabhati · shake off a sluggish day',
    ratio: '30 pumps · hold',
    accent: EMBER,
    category: 'energy',
    durations: [3, 6, 9],
    guide:
      'Passive inhale, sharp exhales from the belly — about two a second — then empty the lungs and hold.',
    steps: [
      { kind: 'inhale', seconds: 3, label: 'Full breath in' },
      { kind: 'pump', seconds: 18, label: 'Pump' },
      { kind: 'exhale', seconds: 2, label: 'Empty out' },
      { kind: 'hold', seconds: 10, label: 'Retention' },
      { kind: 'inhale', seconds: 3, label: 'Recovery' },
    ],
  },
  wimhof: {
    key: 'wimhof',
    name: 'Wim Hof Method',
    tagline: 'Power breaths · retention · 3 rounds',
    ratio: '3 rounds',
    accent: ICE,
    category: 'advanced',
    durations: [],
    guide:
      'Thirty full breaths without forcing the exhale, then let the air out and hold. Breathe in deep to finish and hold 15 seconds. Sit or lie down — never in water or while driving.',
    steps: [
      { kind: 'inhale', seconds: 2, label: 'Breathe' },
      { kind: 'exhale', seconds: 2, label: 'Let go' },
    ],
    rounds: {
      rounds: 3,
      breaths: 30,
      breathSeconds: 3.4,
      retentionTargets: [75, 90, 105],
      recoverySeconds: 15,
    },
  },
}

export const BREATH_PATTERN_LIST: BreathPattern[] = Object.values(BREATH_PATTERNS)

/** Classic time-based patterns only (the round-based ones use their own player). */
export const CLASSIC_BREATH_PATTERNS: BreathPattern[] = BREATH_PATTERN_LIST.filter(
  (p) => !p.rounds,
)

/** How far the aura contracts on a full exhale / expands on a full inhale. */
export const MIN_BREATH_SCALE = 0.52
export const MAX_BREATH_SCALE = 1

export interface BreathTick {
  step: BreathStep
  stepIndex: number
  /** 1-based cycle counter, for the "Round N" label. */
  round: number
  /** Whole seconds left in this phase (drives the countdown). */
  secondsLeft: number
  /** 0 → 1 progress through the current phase (drives the ring). */
  phaseProgress: number
  /** Eased 0 → 1 "lung fullness"; drives scale + opacity. */
  fullness: number
  cycleSeconds: number
}

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n))

const easeInOut = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2

export const patternCycleSeconds = (pattern: BreathPattern): number =>
  pattern.steps.reduce((sum, step) => sum + step.seconds, 0)

/**
 * Pure mapping from "seconds since the session started" to everything the
 * visualizer needs to render a frame. No timers, no state — call it from rAF.
 */
export function resolveBreath(
  pattern: BreathPattern,
  elapsedSeconds: number,
): BreathTick {
  const cycleSeconds = patternCycleSeconds(pattern)
  const safeElapsed = Math.max(0, elapsedSeconds)
  const round = Math.floor(safeElapsed / cycleSeconds) + 1

  let offset = safeElapsed % cycleSeconds
  let stepIndex = pattern.steps.length - 1
  for (let i = 0; i < pattern.steps.length; i += 1) {
    if (offset < pattern.steps[i].seconds) {
      stepIndex = i
      break
    }
    offset -= pattern.steps[i].seconds
  }

  const step = pattern.steps[stepIndex]
  const phaseProgress = clamp01(offset / step.seconds)
  const secondsLeft = Math.max(0, Math.ceil(step.seconds - offset))

  let fullness: number
  switch (step.kind) {
    case 'inhale':
      fullness = easeInOut(phaseProgress)
      break
    case 'exhale':
      fullness = 1 - easeInOut(phaseProgress)
      break
    case 'hold':
      fullness = 1
      break
    case 'pump': {
      // rapid belly pumps — a fast pulse around a fairly full baseline
      const elapsedInPhase = phaseProgress * step.seconds
      fullness = 0.62 + 0.3 * Math.sin(elapsedInPhase * PUMP_RATE * 2 * Math.PI)
      break
    }
    case 'sip':
      // a short catch at the top of the inhale — barely rises, then holds full
      fullness = 0.9 + 0.1 * Math.sin(phaseProgress * Math.PI)
      break
    default:
      fullness = 0
  }

  return {
    step,
    stepIndex,
    round,
    secondsLeft,
    phaseProgress,
    fullness,
    cycleSeconds,
  }
}

export const breathScale = (fullness: number): number =>
  MIN_BREATH_SCALE + (MAX_BREATH_SCALE - MIN_BREATH_SCALE) * fullness
