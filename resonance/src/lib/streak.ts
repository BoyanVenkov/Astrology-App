import type { PracticeSession } from '../types/resonance'
import { localDayKey } from './timezone'

const completedDays = (log: PracticeSession[]): Set<string> =>
  new Set(log.filter((s) => s.completed).map((s) => s.day))

/** Consecutive days (ending today, or yesterday if today isn't done yet) with a completed practice. */
export function practiceStreak(log: PracticeSession[]): number {
  const days = completedDays(log)
  if (days.size === 0) return 0

  const cursor = new Date()
  if (!days.has(localDayKey(cursor))) cursor.setDate(cursor.getDate() - 1)

  let streak = 0
  while (days.has(localDayKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function practicedToday(log: PracticeSession[]): boolean {
  return completedDays(log).has(localDayKey())
}

/** A `YYYY-MM-DD` key as a day count, for calendar-safe adjacency checks. */
const dayOrdinal = (key: string): number => {
  const [y, m, d] = key.split('-').map(Number)
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000)
}

/** The longest run of consecutive completed-practice days ever recorded. */
export function longestStreak(log: PracticeSession[]): number {
  const days = [...completedDays(log)].sort()
  if (days.length === 0) return 0

  let best = 1
  let run = 1
  for (let i = 1; i < days.length; i += 1) {
    run = dayOrdinal(days[i]) - dayOrdinal(days[i - 1]) === 1 ? run + 1 : 1
    if (run > best) best = run
  }
  return best
}

/** Distinct practiced days within the last `n` days, for a mini calendar. */
export function recentPracticeDays(log: PracticeSession[], n = 7): boolean[] {
  const days = completedDays(log)
  const out: boolean[] = []
  const cursor = new Date()
  cursor.setDate(cursor.getDate() - (n - 1))
  for (let i = 0; i < n; i += 1) {
    out.push(days.has(localDayKey(cursor)))
    cursor.setDate(cursor.getDate() + 1)
  }
  return out
}
