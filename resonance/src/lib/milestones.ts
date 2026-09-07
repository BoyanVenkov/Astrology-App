/**
 * Practice-streak milestones — the small reward ladder shown on the Journal.
 * Emblems are earned on your *longest-ever* streak (a permanent shelf), while
 * the progress bar tracks the *current* run. Names come from the `mile.*`
 * phrase bank per locale.
 */
import type { MessageKey } from './locales/en'

export interface Milestone {
  /** Consecutive practice days required. */
  days: number
  /** Key into the phrase bank: `mile.<key>` (name) · `mile.<key>.note` (blurb). */
  key: string
  /** A short glyph for the emblem face. */
  glyph: string
}

export const MILESTONES: Milestone[] = [
  { days: 3, key: 'spark', glyph: '✦' },
  { days: 7, key: 'week', glyph: '☾' },
  { days: 14, key: 'fortnight', glyph: '◈' },
  { days: 21, key: 'root', glyph: '❋' },
  { days: 30, key: 'moon', glyph: '☽' },
  { days: 60, key: 'ember', glyph: '✸' },
  { days: 90, key: 'season', glyph: '❂' },
  { days: 180, key: 'halfyear', glyph: '✺' },
  { days: 365, key: 'wheel', glyph: '☉' },
]

export const milestoneName = (m: Milestone, t: (k: MessageKey) => string): string =>
  t(`mile.${m.key}` as MessageKey)

export const milestoneNote = (m: Milestone, t: (k: MessageKey) => string): string =>
  t(`mile.${m.key}.note` as MessageKey)

export interface StreakStanding {
  streak: number
  /** Highest milestone the streak has reached, or `null` below the first. */
  reached: Milestone | null
  /** Next milestone to aim for, or `null` once every one is earned. */
  next: Milestone | null
  /** Progress from the last mark to `next`, 0–1. */
  progress: number
  /** Days left to `next` (0 when all are earned). */
  toNext: number
}

export function streakStanding(streak: number): StreakStanding {
  const reached =
    [...MILESTONES].reverse().find((m) => streak >= m.days) ?? null
  const next = MILESTONES.find((m) => streak < m.days) ?? null
  const floor = reached?.days ?? 0
  const ceil = next?.days ?? floor
  const progress =
    next && ceil > floor ? (streak - floor) / (ceil - floor) : 1
  return {
    streak,
    reached,
    next,
    progress: Math.max(0, Math.min(1, progress)),
    toNext: next ? next.days - streak : 0,
  }
}

/** Every milestone earned on a best-ever run of `best` days. */
export const earnedMilestones = (best: number): Milestone[] =>
  MILESTONES.filter((m) => best >= m.days)

/**
 * The milestone to celebrate right now: the highest the current streak has
 * reached that the user hasn't acknowledged yet (`seenTier` = its `days`).
 * Returns `null` when there's nothing new to celebrate.
 */
export function pendingCelebration(
  streak: number,
  seenTier: number,
): Milestone | null {
  const reached = [...MILESTONES].reverse().find((m) => streak >= m.days)
  return reached && reached.days > seenTier ? reached : null
}
