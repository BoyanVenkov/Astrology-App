import * as Astronomy from 'astronomy-engine'

/**
 * Chart angles + house cusps. Ascendant / MC / sidereal time are verified
 * exact against Astrodienst; intermediate cusps use the iterative Placidus
 * (semi-arc) method, with a whole-sign fallback inside the polar circles
 * where Placidus is undefined.
 */

export type HouseSystem = 'placidus' | 'whole-sign'

export interface ChartAngles {
  /** Ecliptic longitude of the rising degree (house 1 cusp). */
  ascendant: number
  /** Ecliptic longitude of the Midheaven (house 10 cusp). */
  midheaven: number
  /** 12 house cusps, ecliptic longitude, index 0 = house 1. */
  cusps: number[]
  system: HouseSystem
  /** Local apparent sidereal time, hours. */
  lstHours: number
}

const D2R = Math.PI / 180
const R2D = 180 / Math.PI
const norm360 = (x: number): number => ((x % 360) + 360) % 360

/** True obliquity of the ecliptic (degrees) for the instant. */
export function obliquityOfDate(time: Astronomy.AstroTime): number {
  const rot = Astronomy.Rotation_EQJ_ECT(time)
  // Rotate the equatorial pole (0,0,1) into the ecliptic-of-date frame; the
  // angle it makes with the ecliptic pole is the obliquity.
  const pole = Astronomy.RotateVector(rot, new Astronomy.Vector(0, 0, 1, time))
  return Math.acos(pole.z) * R2D
}

/** Local apparent sidereal time in hours (east longitude positive). */
export function localSiderealTime(date: Date, lonEast: number): number {
  const gast = Astronomy.SiderealTime(date) // Greenwich apparent sidereal time, hours
  return ((gast + lonEast / 15) % 24 + 24) % 24
}

const raToEclipticLon = (raDeg: number, oblDeg: number): number =>
  norm360(
    Math.atan2(
      Math.sin(raDeg * D2R),
      Math.cos(raDeg * D2R) * Math.cos(oblDeg * D2R),
    ) * R2D,
  )

/**
 * @param date  birth instant (UTC)
 * @param lat   geographic latitude, degrees (N positive)
 * @param lon   geographic longitude, degrees (E positive)
 */
export function computeChartAngles(
  date: Date,
  lat: number,
  lon: number,
): ChartAngles {
  const time = Astronomy.MakeTime(date)
  const obl = obliquityOfDate(time)
  const lstHours = localSiderealTime(date, lon)
  const ramc = lstHours * 15 // right ascension of the Midheaven, degrees

  const midheaven = raToEclipticLon(ramc, obl)
  const ascendant = norm360(
    Math.atan2(
      Math.cos(ramc * D2R),
      -(
        Math.sin(ramc * D2R) * Math.cos(obl * D2R) +
        Math.tan(lat * D2R) * Math.sin(obl * D2R)
      ),
    ) * R2D,
  )

  // Placidus breaks down near the polar circles — fall back to whole-sign.
  if (Math.abs(lat) >= 66) {
    return {
      ascendant,
      midheaven,
      cusps: wholeSign(ascendant),
      system: 'whole-sign',
      lstHours,
    }
  }

  // Iterative Placidus intermediate cusp.
  //   diurnal side (11, 12):  RA = RAMC + f·(90 + AD)
  //   nocturnal side (2, 3):  RA = RAMC + 180 − f·(90 − AD)
  const cuspFor = (fraction: number, diurnal: boolean): number => {
    let ra = diurnal ? ramc + fraction * 90 : ramc + 180 - fraction * 90
    for (let i = 0; i < 20; i += 1) {
      const eLon = raToEclipticLon(ra, obl)
      const decl =
        Math.asin(Math.sin(obl * D2R) * Math.sin(eLon * D2R)) * R2D
      const s = clamp(
        Math.tan(decl * D2R) * Math.tan(lat * D2R),
        -1,
        1,
      )
      const ad = Math.asin(s) * R2D
      ra = diurnal
        ? ramc + fraction * (90 + ad)
        : ramc + 180 - fraction * (90 - ad)
    }
    return raToEclipticLon(ra, obl)
  }

  const c11 = cuspFor(1 / 3, true)
  const c12 = cuspFor(2 / 3, true)
  const c2 = cuspFor(2 / 3, false)
  const c3 = cuspFor(1 / 3, false)

  const cusps = [
    ascendant, // 1
    c2, // 2
    c3, // 3
    norm360(midheaven + 180), // 4 (IC)
    norm360(c11 + 180), // 5
    norm360(c12 + 180), // 6
    norm360(ascendant + 180), // 7 (Descendant)
    norm360(c2 + 180), // 8
    norm360(c3 + 180), // 9
    midheaven, // 10 (MC)
    c11, // 11
    c12, // 12
  ]

  return { ascendant, midheaven, cusps, system: 'placidus', lstHours }
}

const wholeSign = (ascendant: number): number[] => {
  const start = Math.floor(ascendant / 30) * 30
  return Array.from({ length: 12 }, (_, i) => norm360(start + i * 30))
}

const clamp = (x: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, x))

/** Which house (1–12) an ecliptic longitude falls in, given the cusps. */
export function houseOf(longitude: number, cusps: number[]): number {
  const L = norm360(longitude)
  for (let i = 0; i < 12; i += 1) {
    const a = cusps[i]
    const b = cusps[(i + 1) % 12]
    const span = norm360(b - a)
    if (norm360(L - a) < span) return i + 1
  }
  return 1
}
