import * as Astronomy from 'astronomy-engine'
import type { BirthProfile } from '../types/resonance'
import { eclipticLongitude } from './ephemeris'

export interface GeoContext {
  hasLocation: boolean
  latitude: number | null
  longitude: number | null
  sunrise: Date | null
  sunset: Date | null
  dayLengthHours: number | null
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  hemisphere: 'northern' | 'southern'
  /** A grounding suggestion tied to the local light + season. */
  grounding: string
}

const seasonFromSun = (
  sunLon: number,
  hemisphere: 'northern' | 'southern',
): GeoContext['season'] => {
  // northern: 0°=spring equinox, 90°=summer solstice, 180°=autumn, 270°=winter
  const north = ['spring', 'summer', 'autumn', 'winter'] as const
  const idx = Math.floor(((sunLon % 360) + 360) % 360 / 90)
  const n = north[idx]
  if (hemisphere === 'northern') return n
  return ({ spring: 'autumn', summer: 'winter', autumn: 'spring', winter: 'summer' } as const)[n]
}

const grounding = (
  season: GeoContext['season'],
  dayLength: number | null,
): string => {
  if (dayLength != null && dayLength < 9.5) {
    return 'Daylight is scarce — step outside near midday, eat something warm, and let yourself sleep early.'
  }
  if (dayLength != null && dayLength > 14.5) {
    return 'Long light stretches the day — take shade and cool water at midday, and shield your bedroom from the late sun.'
  }
  return {
    spring: 'The light is returning — move your practice toward the morning and let energy build.',
    summer: 'Peak light — keep the pace gentle, hydrate, and ground with bare feet on earth or grass.',
    autumn: 'The light is drawing in — favour slower, warming practices and an earlier wind-down.',
    winter: 'The dark half — rest is productive now; keep practices short, restorative and candle-lit.',
  }[season]
}

/**
 * Local sky context. Uses the birth place as the location proxy (the only
 * coordinates we have without device geolocation) — swap in `@capacitor/geolocation`
 * later for "where you are now".
 */
export function geoContext(
  profile: BirthProfile | null,
  now: Date = new Date(),
): GeoContext {
  const lat = profile?.lat ?? null
  const lon = profile?.lon ?? null

  const sunLon = eclipticLongitude('Sun', now)
  const hemisphere: GeoContext['hemisphere'] =
    lat != null && lat < 0 ? 'southern' : 'northern'
  const season = seasonFromSun(sunLon, hemisphere)

  let sunrise: Date | null = null
  let sunset: Date | null = null
  let dayLengthHours: number | null = null

  if (lat != null && lon != null) {
    const observer = new Astronomy.Observer(lat, lon, 0)
    const dayStart = new Date(now)
    dayStart.setHours(0, 0, 0, 0)
    const rise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, dayStart, 2)
    const set = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, rise?.date ?? dayStart, 2)
    sunrise = rise?.date ?? null
    sunset = set?.date ?? null
    if (sunrise && sunset) {
      dayLengthHours = (sunset.getTime() - sunrise.getTime()) / 3_600_000
      if (dayLengthHours < 0) dayLengthHours += 24
    }
  }

  return {
    hasLocation: lat != null && lon != null,
    latitude: lat,
    longitude: lon,
    sunrise,
    sunset,
    dayLengthHours,
    season,
    hemisphere,
    grounding: grounding(season, dayLengthHours),
  }
}

export const clockHM = (d: Date | null): string => {
  if (!d) return '—'
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
