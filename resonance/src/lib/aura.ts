import type {
  BiometricReading,
  ChakraKey,
  Mood,
  MoodEntry,
  PracticeSession,
} from '../types/resonance'
import { bodyState } from './biometrics'
import { chakraColor } from './resonanceData'
import {
  practiceStreak,
  practicedToday,
  recentPracticeDays,
} from './streak'
import { localDayKey } from './timezone'

export interface MoodMeta {
  label: string
  color: string
  phrase: string
  /** Contribution to the aura score (today = full, yesterday = half). */
  lift: number
}

export const MOOD_META: Record<Mood, MoodMeta> = {
  bright: { label: 'Bright', color: '#e9c469', phrase: 'Bright & energised', lift: 0.12 },
  calm: { label: 'Calm', color: '#34d399', phrase: 'Calm & settled', lift: 0.07 },
  clear: { label: 'Clear', color: '#38bdf8', phrase: 'Clear & focused', lift: 0.07 },
  heavy: { label: 'Heavy', color: '#7c3aed', phrase: 'Heavy or low', lift: -0.06 },
  anxious: { label: 'Anxious', color: '#f87171', phrase: 'Anxious or wired', lift: -0.08 },
  tired: { label: 'Tired', color: '#94a3b8', phrase: 'Tired & depleted', lift: -0.07 },
}

export const MOOD_LIST = Object.keys(MOOD_META) as Mood[]

export interface AuraState {
  /** Overall vitality, 0–1 — drives the aura's size, glow and particle count. */
  score: number
  hue: string
  streak: number
  practicedToday: boolean
  /** Practiced days in the last 7. */
  recentDays: number
  mood: Mood | null
  /** The latest mood is from today or yesterday. */
  moodFresh: boolean
  /** 0–1 body recovery when a fresh biometric reading exists, else null. */
  recovery: number | null
  /** Body signals say to keep the day restorative. */
  needsRest: boolean
}

const yesterdayKey = (): string => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return localDayKey(d)
}

/**
 * Translates practice consistency + the latest mood into a single 0–1 score.
 * Consistency is the backbone; a fresh mood nudges it up or down.
 */
export function computeAura(
  focusChakra: ChakraKey,
  sessionLog: PracticeSession[],
  moodLog: MoodEntry[],
  biometricLog: BiometricReading[] = [],
): AuraState {
  const streak = practiceStreak(sessionLog)
  const today = practicedToday(sessionLog)
  const recentDays = recentPracticeDays(sessionLog, 7).filter(Boolean).length

  const latest = moodLog.length > 0 ? moodLog[moodLog.length - 1] : null
  const todayKey = localDayKey()
  const moodFresh =
    latest != null && (latest.day === todayKey || latest.day === yesterdayKey())
  const moodLift =
    latest && moodFresh
      ? MOOD_META[latest.mood].lift * (latest.day === todayKey ? 1 : 0.5)
      : 0

  let score = 0.22
  score += today ? 0.2 : 0
  score += Math.min(recentDays / 7, 1) * 0.26
  score += Math.min(streak / 10, 1) * 0.2
  score += moodLift
  score = Math.max(0.08, Math.min(1, score))

  // A fresh body reading pulls the aura toward the measured recovery.
  const body = bodyState(biometricLog)
  const recovery = body.hasData && body.fresh ? body.recovery : null
  if (recovery != null) score = score * 0.6 + recovery * 0.4

  return {
    score: Math.max(0.08, Math.min(1, score)),
    hue: chakraColor(focusChakra),
    streak,
    practicedToday: today,
    recentDays,
    mood: latest?.mood ?? null,
    moodFresh,
    recovery,
    needsRest: body.needsRest,
  }
}

export const auraLabel = (score: number): string => {
  if (score >= 0.8) return 'Radiant'
  if (score >= 0.62) return 'Bright'
  if (score >= 0.42) return 'Steady'
  if (score >= 0.25) return 'Dim'
  return 'Depleted'
}
