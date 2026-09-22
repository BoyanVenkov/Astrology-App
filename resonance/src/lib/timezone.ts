/**
 * Date / time-zone helpers. Birth-chart maths need the exact UTC instant of a
 * local wall-clock birth time, and every "is it still today?" check must use
 * the *local* calendar day (a transit's `window.start` is local midnight
 * serialised as UTC, so a naive `.slice(0, 10)` is a day off east of UTC).
 */

import { useEffect, useState } from 'react'

/** Local calendar day as `YYYY-MM-DD`. */
export const localDayKey = (d: Date = new Date()): string => {
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/**
 * `localDayKey()`, re-rendering the caller once the local day actually rolls
 * over. For a "whole-day read" computed with `useMemo(() => compute(new
 * Date()), [t])` — a value that's only supposed to change once a day but is
 * otherwise frozen at mount — plain `new Date()` never changes, so a screen
 * left open across midnight (or reopened from a backgrounded app the next
 * day) keeps showing yesterday's read. Depend on this hook's return value
 * instead of `t` alone to pick up the rollover without polling every render.
 */
export function useLocalDayKey(): string {
  const [key, setKey] = useState(() => localDayKey())
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = localDayKey()
      setKey((prev) => (prev === next ? prev : next))
    }, 5 * 60_000)
    return () => window.clearInterval(id)
  }, [])
  return key
}

export const deviceTimeZone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

const FALLBACK_ZONES = [
  'UTC',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Athens',
  'Europe/Moscow',
  'Africa/Lagos',
  'Africa/Johannesburg',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Bangkok',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
]

/** Every IANA zone the runtime knows, or a sensible short list on old engines. */
export const listTimeZones = (): string[] => {
  try {
    const withValues = Intl as typeof Intl & {
      supportedValuesOf?: (key: string) => string[]
    }
    if (typeof withValues.supportedValuesOf === 'function') {
      return withValues.supportedValuesOf('timeZone')
    }
  } catch {
    /* fall through */
  }
  return FALLBACK_ZONES
}

/**
 * Whether the runtime accepts this string as an IANA time zone. More forgiving
 * than `listTimeZones().includes(tz)` — the suggestion list can lag the engine's
 * real zone database (e.g. `America/Nuuk` vs the older `America/Godthab`).
 */
export const isValidTimeZone = (tz: string): boolean => {
  if (!tz) return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

/** Milliseconds to add to a UTC instant to get wall-clock time in `timeZone`. */
function zoneOffsetMs(instant: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const parts: Record<string, number> = {}
  for (const part of dtf.formatToParts(instant)) {
    if (part.type !== 'literal') parts[part.type] = Number(part.value)
  }
  const asUTC = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  )
  return asUTC - instant.getTime()
}

/**
 * Convert a wall-clock time in `timeZone` to the true UTC instant.
 *
 * A single correction pass (guess -> offset -> corrected) is only safe when
 * the offset at the corrected instant matches the offset used to compute it.
 * Near a DST boundary it often doesn't — applying an offset sampled on one
 * side of the transition to the original guess can land the result back on
 * the *other* side, silently producing a self-contradictory instant (this
 * previously shifted a spring-forward-gap birth time by a full hour with no
 * indication anything was off). This checks self-consistency and iterates:
 *
 * - If the first offset is already self-consistent, that's an ordinary
 *   instant (no boundary involved) — done in one step.
 * - Otherwise try the offset at that corrected instant instead. If *that's*
 *   self-consistent, it's a real, existing wall-clock time near a boundary
 *   (including the fall-back hour that occurs twice — this resolves to its
 *   first/earlier occurrence, same as before).
 * - If neither is self-consistent, the wall-clock time named a spring-forward
 *   gap that never existed (e.g. 2:30 AM on a "clocks jump 2:00->3:00" day).
 *   Resolve it the way most timezone libraries do: shift forward past the
 *   gap, i.e. take the later of the two candidate instants.
 */
export function zonedWallTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute)

  const offset1 = zoneOffsetMs(new Date(guess), timeZone)
  const candidate1 = guess - offset1
  const offset2 = zoneOffsetMs(new Date(candidate1), timeZone)
  if (offset2 === offset1) return new Date(candidate1)

  const candidate2 = guess - offset2
  const offset3 = zoneOffsetMs(new Date(candidate2), timeZone)
  if (offset3 === offset2) return new Date(candidate2)

  // Spring-forward gap — neither candidate is self-consistent.
  return new Date(Math.max(candidate1, candidate2))
}
