import * as Astronomy from 'astronomy-engine'
import type { BirthProfile, GeoPoint } from '../types/resonance'
import { eclipticLongitude } from './ephemeris'
import type { MessageKey } from './locales/en'

export interface GeoContext {
  hasLocation: boolean
  /** 'current' when a live fix is used, 'birth' when falling back to the birth place. */
  source: 'current' | 'birth' | 'none'
  latitude: number | null
  longitude: number | null
  sunrise: Date | null
  sunset: Date | null
  moonrise: Date | null
  moonset: Date | null
  dayLengthHours: number | null
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  hemisphere: 'northern' | 'southern'
  /** A grounding suggestion tied to the local light + season. English. */
  grounding: string
  /** Catalogue key for the grounding suggestion — resolve with `t()`. */
  groundingKey: MessageKey
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

const groundingKey = (
  season: GeoContext['season'],
  dayLength: number | null,
): MessageKey => {
  if (dayLength != null && dayLength < 9.5) return 'geo.ground.scarce'
  if (dayLength != null && dayLength > 14.5) return 'geo.ground.long'
  return `geo.ground.${season}` as MessageKey
}

/**
 * Local sky context. Prefers the user's current location; falls back to the
 * birth place; otherwise season-only.
 */
export function geoContext(
  profile: BirthProfile | null,
  currentLocation: GeoPoint | null = null,
  now: Date = new Date(),
): GeoContext {
  const here =
    currentLocation != null
      ? { lat: currentLocation.lat, lon: currentLocation.lon, source: 'current' as const }
      : profile?.lat != null && profile?.lon != null
        ? { lat: profile.lat, lon: profile.lon, source: 'birth' as const }
        : null

  const lat = here?.lat ?? null
  const lon = here?.lon ?? null

  const sunLon = eclipticLongitude('Sun', now)
  const hemisphere: GeoContext['hemisphere'] =
    lat != null && lat < 0 ? 'southern' : 'northern'
  const season = seasonFromSun(sunLon, hemisphere)

  let sunrise: Date | null = null
  let sunset: Date | null = null
  let moonrise: Date | null = null
  let moonset: Date | null = null
  let dayLengthHours: number | null = null

  if (lat != null && lon != null) {
    const observer = new Astronomy.Observer(lat, lon, 0)
    const dayStart = new Date(now)
    dayStart.setHours(0, 0, 0, 0)
    sunrise =
      Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, dayStart, 2)?.date ??
      null
    sunset =
      Astronomy.SearchRiseSet(
        Astronomy.Body.Sun,
        observer,
        -1,
        sunrise ?? dayStart,
        2,
      )?.date ?? null
    moonrise =
      Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, 1, now, 2)?.date ??
      null
    moonset =
      Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, now, 2)?.date ??
      null
    if (sunrise && sunset) {
      dayLengthHours = (sunset.getTime() - sunrise.getTime()) / 3_600_000
      if (dayLengthHours < 0) dayLengthHours += 24
    }
  }

  return {
    hasLocation: lat != null && lon != null,
    source: here?.source ?? 'none',
    latitude: lat,
    longitude: lon,
    sunrise,
    sunset,
    moonrise,
    moonset,
    dayLengthHours,
    season,
    hemisphere,
    grounding: grounding(season, dayLengthHours),
    groundingKey: groundingKey(season, dayLengthHours),
  }
}

export const clockHM = (d: Date | null): string => {
  if (!d) return '—'
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
