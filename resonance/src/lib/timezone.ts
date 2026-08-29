/**
 * Date / time-zone helpers. Birth-chart maths need the exact UTC instant of a
 * local wall-clock birth time, and every "is it still today?" check must use
 * the *local* calendar day (a transit's `window.start` is local midnight
 * serialised as UTC, so a naive `.slice(0, 10)` is a day off east of UTC).
 */

/** Local calendar day as `YYYY-MM-DD`. */
export const localDayKey = (d: Date = new Date()): string => {
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
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
 * One correction pass resolves the DST-boundary case; times that fall in a
 * spring-forward gap resolve to the post-transition instant.
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
  let offset = zoneOffsetMs(new Date(guess), timeZone)
  offset = zoneOffsetMs(new Date(guess - offset), timeZone)
  return new Date(guess - offset)
}
