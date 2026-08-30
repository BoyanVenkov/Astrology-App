import * as Astronomy from 'astronomy-engine'

/**
 * Thin wrapper over astronomy-engine: geocentric ecliptic longitudes of the
 * ten traditional bodies, referred to the true equinox of date (the tropical
 * zodiac astrologers use). Pure computation, no data files — safe offline.
 */

export type BodyName =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto'

export const BODIES: BodyName[] = [
  'Sun',
  'Moon',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
]

// U+FE0E (text presentation selector) keeps ♀ ♂ ♃ … from rendering as colour
// emoji on platforms that default those codepoints to an emoji font.
export const BODY_SYMBOL: Record<BodyName, string> = {
  Sun: '☉︎',
  Moon: '☽︎',
  Mercury: '☿︎',
  Venus: '♀︎',
  Mars: '♂︎',
  Jupiter: '♃︎',
  Saturn: '♄︎',
  Uranus: '♅︎',
  Neptune: '♆︎',
  Pluto: '♇︎',
}

export const SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
]

const MOON_PHASES = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Last Quarter',
  'Waning Crescent',
]

const astroBody = (name: BodyName): Astronomy.Body =>
  Astronomy.Body[name as keyof typeof Astronomy.Body]

/** Geocentric ecliptic longitude (degrees, 0–360) of a body, equinox of date. */
export function eclipticLongitude(name: BodyName, date: Date): number {
  const time = Astronomy.MakeTime(date)
  const vec = Astronomy.GeoVector(astroBody(name), time, true)
  const rotated = Astronomy.RotateVector(Astronomy.Rotation_EQJ_ECT(time), vec)
  const lon = Astronomy.SphereFromVector(rotated).lon
  return ((lon % 360) + 360) % 360
}

export interface BodyPosition {
  body: BodyName
  /** Ecliptic longitude, 0–360. */
  longitude: number
  sign: string
  /** Degrees into the sign, 0–30. */
  signDegree: number
  /** Signed motion in °/day (negative ⇒ retrograde). */
  speed: number
  retrograde: boolean
}

const DAY_MS = 86_400_000

export function bodyPosition(name: BodyName, date: Date): BodyPosition {
  const longitude = eclipticLongitude(name, date)
  const prev = eclipticLongitude(name, new Date(date.getTime() - DAY_MS))
  let speed = longitude - prev
  if (speed > 180) speed -= 360
  if (speed < -180) speed += 360
  return {
    body: name,
    longitude,
    sign: SIGNS[Math.floor(longitude / 30) % 12],
    signDegree: longitude % 30,
    speed,
    retrograde: speed < 0,
  }
}

/** All ten bodies positioned for one instant. */
export function chartPositions(date: Date): BodyPosition[] {
  return BODIES.map((name) => bodyPosition(name, date))
}

export interface MoonState {
  name: string
  /** Illuminated fraction, 0–100. */
  illumination: number
  /** Phase angle, 0–360 (0 = new, 180 = full). */
  angle: number
}

export function moonState(date: Date): MoonState {
  const angle = Astronomy.MoonPhase(date)
  const illumination = Math.round(
    Astronomy.Illumination(Astronomy.Body.Moon, date).phase_fraction * 100,
  )
  const index = Math.floor(((angle + 22.5) % 360) / 45) % 8
  return { name: MOON_PHASES[index], illumination, angle }
}

/** Upcoming instants when the Moon crosses into a new sign (step + bisect). */
export function nextMoonSignChanges(from: Date, count: number): {
  at: Date
  sign: string
}[] {
  const out: { at: Date; sign: string }[] = []
  let t = from.getTime()
  const stepMs = 2 * 3_600_000 // the Moon moves ~1° in 2h
  let prevSign = Math.floor(eclipticLongitude('Moon', new Date(t)) / 30)

  for (let guard = 0; guard < 400 && out.length < count; guard += 1) {
    const next = t + stepMs
    const sign = Math.floor(eclipticLongitude('Moon', new Date(next)) / 30)
    if (sign !== prevSign) {
      // bisect the 2h window down to ~1 minute
      let lo = t
      let hi = next
      while (hi - lo > 60_000) {
        const mid = (lo + hi) / 2
        const s = Math.floor(eclipticLongitude('Moon', new Date(mid)) / 30)
        if (s === prevSign) lo = mid
        else hi = mid
      }
      out.push({ at: new Date(hi), sign: SIGNS[sign % 12] })
      prevSign = sign
    }
    t = next
  }
  return out
}
