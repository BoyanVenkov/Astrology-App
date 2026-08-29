import type {
  BreathPattern,
  BreathPatternKey,
  BreathStep,
} from '../types/resonance'

const GOLD = '#d4af37'
const CYAN = '#38bdf8'
const VIOLET = '#a78bfa'
const EMBER = '#f97316'

/** Active exhales per second during a Kapalabhati pump phase. */
export const PUMP_RATE = 1.6

export const BREATH_PATTERNS: Record<BreathPatternKey, BreathPattern> = {
  box: {
    key: 'box',
    name: 'Box Breathing',
    tagline: 'Steady focus · nervous-system reset',
    ratio: '4-4-4-4',
    accent: GOLD,
    steps: [
      { kind: 'inhale', seconds: 4, label: 'Inhale' },
      { kind: 'hold', seconds: 4, label: 'Hold' },
      { kind: 'exhale', seconds: 4, label: 'Exhale' },
      { kind: 'rest', seconds: 4, label: 'Rest' },
    ],
  },
  relax: {
    key: 'relax',
    name: 'Deep Relax',
    tagline: 'Down-regulate for sleep & release',
    ratio: '4-7-8',
    accent: CYAN,
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
    ratio: '5-5',
    accent: VIOLET,
    steps: [
      { kind: 'inhale', seconds: 5, label: 'Inhale' },
      { kind: 'exhale', seconds: 5, label: 'Exhale' },
    ],
  },
  kapalabhati: {
    key: 'kapalabhati',
    name: 'Fire Breath',
    tagline: 'Kapalabhati · shake off a sluggish day',
    ratio: '30 pumps · hold',
    accent: EMBER,
    steps: [
      { kind: 'inhale', seconds: 3, label: 'Full breath in' },
      { kind: 'pump', seconds: 18, label: 'Pump' },
      { kind: 'exhale', seconds: 2, label: 'Empty out' },
      { kind: 'hold', seconds: 10, label: 'Retention' },
      { kind: 'inhale', seconds: 3, label: 'Recovery' },
    ],
  },
}

export const BREATH_PATTERN_LIST: BreathPattern[] = Object.values(BREATH_PATTERNS)

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
