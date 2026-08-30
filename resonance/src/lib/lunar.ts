import * as Astronomy from 'astronomy-engine'
import {
  eclipticLongitude,
  nextMoonSignChanges,
  SIGNS,
  type BodyName,
} from './ephemeris'

/* --------------------------------------------------------------- moon phase */

export interface MoonPhaseEvent {
  kind: 'new' | 'first-quarter' | 'full' | 'last-quarter'
  at: Date
}

const PHASE_DEGREES: { deg: number; kind: MoonPhaseEvent['kind'] }[] = [
  { deg: 0, kind: 'new' },
  { deg: 90, kind: 'first-quarter' },
  { deg: 180, kind: 'full' },
  { deg: 270, kind: 'last-quarter' },
]

/** The next few principal lunar-phase moments. */
export function upcomingMoonPhases(from: Date, count = 4): MoonPhaseEvent[] {
  const out: MoonPhaseEvent[] = []
  for (const { deg, kind } of PHASE_DEGREES) {
    const hit = Astronomy.SearchMoonPhase(deg, from, 40)
    if (hit) out.push({ kind, at: hit.date })
  }
  return out.sort((a, b) => a.at.getTime() - b.at.getTime()).slice(0, count)
}

/* ----------------------------------------------------------- void of course */

// Classical bodies used for void-of-course (the Moon's own aspects excluded).
const VOC_BODIES = ['Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'] as const
const VOC_ANGLES = [0, 60, 90, 120, 180]

export interface MoonVoC {
  active: boolean
  /** The Moon's last exact aspect (when the void began / begins). */
  since: Date | null
  /** When the Moon enters its next sign (the void ends). */
  until: Date | null
  currentSign: string
  nextSign: string
  /** Hours until the void begins, when it hasn't yet. */
  hoursUntil: number | null
}

const sep = (a: number, b: number): number => {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

/**
 * Is the Moon "void of course" — past its last major aspect before changing
 * sign? A traditional cue to avoid new beginnings and instead ground / rest.
 */
export function moonVoidOfCourse(now: Date = new Date()): MoonVoC {
  const moonLon = eclipticLongitude('Moon', now)
  const currentSign = SIGNS[Math.floor(moonLon / 30) % 12]
  const change = nextMoonSignChanges(now, 1)[0]
  const ingress =
    change?.at ?? new Date(now.getTime() + 2.5 * 86_400_000)
  const nextSign = change?.sign ?? SIGNS[(Math.floor(moonLon / 30) + 1) % 12]

  const start = Math.max(
    now.getTime() - 60 * 3_600_000,
    ingress.getTime() - 72 * 3_600_000,
  )
  const end = ingress.getTime()
  const step = 30 * 60_000

  // pre-sample body longitudes across the window
  const samples: { t: number; moon: number; body: Record<string, number> }[] = []
  for (let t = start; t <= end; t += step) {
    const d = new Date(t)
    const body: Record<string, number> = {}
    for (const b of VOC_BODIES) body[b] = eclipticLongitude(b, d)
    samples.push({ t, moon: eclipticLongitude('Moon', d), body })
  }

  const refine = (
    bodyName: BodyName,
    angle: number,
    lo: number,
    hi: number,
  ): number => {
    let a = lo
    let b = hi
    const g = (t: number) =>
      Math.sign(
        sep(eclipticLongitude('Moon', new Date(t)), eclipticLongitude(bodyName, new Date(t))) -
          angle,
      )
    const gLo = g(a)
    for (let i = 0; i < 16; i += 1) {
      const mid = (a + b) / 2
      if (g(mid) === gLo) a = mid
      else b = mid
    }
    return b
  }

  let lastAspect: number | null = null
  for (const b of VOC_BODIES) {
    for (const angle of VOC_ANGLES) {
      let prev = 0
      for (let i = 0; i < samples.length; i += 1) {
        const s = samples[i]
        const f = Math.sign(sep(s.moon, s.body[b]) - angle)
        if (i > 0 && f !== 0 && f !== prev) {
          const t = refine(b, angle, samples[i - 1].t, s.t)
          if (t <= end && (lastAspect == null || t > lastAspect)) lastAspect = t
        }
        prev = f
      }
    }
  }

  const since = lastAspect != null ? new Date(lastAspect) : null
  const nowMs = now.getTime()
  const active = since != null && since.getTime() <= nowMs && nowMs < end
  const hoursUntil =
    since != null && since.getTime() > nowMs
      ? (since.getTime() - nowMs) / 3_600_000
      : null

  return {
    active,
    since,
    until: ingress,
    currentSign,
    nextSign,
    hoursUntil,
  }
}

// The scan is ~100ms — cache it in 5-minute buckets so several components can
// share one computation.
let vocCache: { key: number; value: MoonVoC } | null = null

export function moonVoidOfCourseCached(now: Date = new Date()): MoonVoC {
  const key = Math.floor(now.getTime() / 300_000)
  if (!vocCache || vocCache.key !== key) {
    vocCache = { key, value: moonVoidOfCourse(now) }
  }
  return vocCache.value
}

/**
 * The next few void-of-course windows, each with the moment the void begins
 * (`since`) and the sign ingress that ends it (`until`). Used to schedule the
 * "ground your energy" nudge ahead of time.
 */
export function upcomingVoidOfCourse(
  from: Date = new Date(),
  count = 3,
): { since: Date; until: Date; nextSign: string }[] {
  const out: { since: Date; until: Date; nextSign: string }[] = []
  let cursor = from
  for (let i = 0; i < count + 2 && out.length < count; i += 1) {
    const voc = moonVoidOfCourse(cursor)
    if (voc.since && voc.until && voc.until.getTime() > from.getTime()) {
      out.push({ since: voc.since, until: voc.until, nextSign: voc.nextSign })
    }
    if (!voc.until) break
    // step just past this ingress to find the following window
    cursor = new Date(voc.until.getTime() + 60 * 60_000)
  }
  return out
}
