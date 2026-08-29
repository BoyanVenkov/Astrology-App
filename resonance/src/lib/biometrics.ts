import type { BiometricReading } from '../types/resonance'
import { localDayKey } from './timezone'

/**
 * Body state — from a manual check-in now, or Apple Health / Google Fit once
 * the native health plugin is wired (see `connectHealth`). HRV is the primary
 * stress signal; sleep and resting HR fill in the picture.
 */
export interface BodyState {
  hasData: boolean
  /** Reading is from today or yesterday. */
  fresh: boolean
  hrv: number | null
  restingHr: number | null
  sleepHours: number | null
  /** 0–1: how recovered the body is (low = stressed / depleted). */
  recovery: number
  label: string
  /** Steer the day toward restorative practice. */
  needsRest: boolean
}

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n))
const lerp = (a: number, b: number, x: number): number => clamp01((x - a) / (b - a))

const yesterdayKey = (): string => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return localDayKey(d)
}

export function bodyState(log: BiometricReading[]): BodyState {
  const latest = log.length > 0 ? log[log.length - 1] : null
  if (!latest) {
    return {
      hasData: false,
      fresh: false,
      hrv: null,
      restingHr: null,
      sleepHours: null,
      recovery: 0.55,
      label: 'No reading',
      needsRest: false,
    }
  }

  const fresh = latest.day === localDayKey() || latest.day === yesterdayKey()

  const parts: number[] = []
  if (latest.hrv != null) parts.push(lerp(18, 75, latest.hrv))
  if (latest.sleepHours != null) parts.push(lerp(4.5, 8, latest.sleepHours))
  if (latest.restingHr != null) parts.push(1 - lerp(48, 82, latest.restingHr))

  const recovery = parts.length
    ? clamp01(parts.reduce((s, p) => s + p, 0) / parts.length)
    : 0.55

  const label =
    recovery >= 0.72
      ? 'Recovered'
      : recovery >= 0.48
        ? 'Balanced'
        : recovery >= 0.3
          ? 'Run down'
          : 'Depleted'

  return {
    hasData: true,
    fresh,
    hrv: latest.hrv ?? null,
    restingHr: latest.restingHr ?? null,
    sleepHours: latest.sleepHours ?? null,
    recovery,
    label,
    needsRest: fresh && recovery < 0.34,
  }
}

/**
 * Placeholder for on-device health data. When you add
 * `@capacitor-community/health` (or HealthKit / Health Connect directly),
 * request permissions here, read the latest HRV / resting HR / sleep, and
 * return a `BiometricReading`. On web / unsupported platforms it stays null.
 */
export async function connectHealth(): Promise<BiometricReading | null> {
  return null
}
