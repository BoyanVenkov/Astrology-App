import { bodyPosition, moonState } from './ephemeris'
import { moonVoidOfCourseCached } from './lunar'
import { localDayKey } from './timezone'

/**
 * Whether the sky supports a fast today — read from the lunar day (tithi),
 * the waxing/waning half, the Moon's sign and its void-of-course state.
 * Ekadashi (the 11th lunar day) is the classic fasting day; the waning half
 * favours release and lightening. Gentle guidance, not medical advice.
 */

export type FastingVerdict = 'favourable' | 'neutral' | 'not-ideal'

export interface FastingReading {
  verdict: FastingVerdict
  /** 0–100 — how supportive today's sky is. */
  score: number
  /** Short headline. */
  label: string
  /** Why, in one or two sentences. */
  reason: string
  /** How to hold it. */
  note: string
  tithi: {
    /** Lunar day 1–30. */
    day: number
    phase: 'waxing' | 'waning'
    /** Ekadashi / New Moon / Full Moon, when it applies. */
    special: string | null
  }
  moonSign: string
  /** The best fasting days over the next fortnight. */
  upcoming: { day: string; label: string; special: string | null }[]
}

const WATER = new Set(['Cancer', 'Scorpio', 'Pisces'])
const EARTH = new Set(['Taurus', 'Virgo', 'Capricorn'])
const FIRE = new Set(['Aries', 'Leo', 'Sagittarius'])

interface Lunar {
  angle: number
  tithi: number
  phase: 'waxing' | 'waning'
  special: string | null
}

function lunarDay(date: Date): Lunar {
  // elongation Moon−Sun, 0 = new, 180 = full
  const angle = moonState(date).angle
  const tithi = Math.floor(angle / 12) + 1
  const phase: 'waxing' | 'waning' = angle < 180 ? 'waxing' : 'waning'

  let special: string | null = null
  if (angle >= 120 && angle < 132) special = 'Ekadashi'
  else if (angle >= 300 && angle < 312) special = 'Ekadashi'
  else if (angle < 6 || angle >= 354) special = 'New Moon'
  else if (angle >= 174 && angle < 186) special = 'Full Moon'

  return { angle, tithi, phase, special }
}

function scoreFor(l: Lunar, moonSign: string, vocActive: boolean): number {
  let s = 50
  s += l.phase === 'waning' ? 16 : -10
  if (l.special === 'Ekadashi') s += 30
  else if (l.special === 'New Moon') s += 14
  else if (l.special === 'Full Moon') s += 8

  if (WATER.has(moonSign)) s += 8
  else if (EARTH.has(moonSign)) s += 10
  else if (FIRE.has(moonSign)) s -= 4
  else s -= 5

  if (vocActive) s -= 12
  return Math.max(5, Math.min(98, Math.round(s)))
}

const verdictOf = (score: number): FastingVerdict =>
  score >= 68 ? 'favourable' : score >= 46 ? 'neutral' : 'not-ideal'

const LABEL: Record<FastingVerdict, string> = {
  favourable: 'A supported window',
  neutral: 'A neutral day',
  'not-ideal': 'Not the moment',
}

function reasonFor(l: Lunar, moonSign: string, vocActive: boolean): string {
  const parts: string[] = []

  if (l.special === 'Ekadashi') {
    parts.push(
      `It's Ekadashi — the 11th lunar day, kept for fasting across many traditions`,
    )
  } else if (l.special === 'New Moon') {
    parts.push(`The New Moon is a natural reset point`)
  } else if (l.special === 'Full Moon') {
    parts.push(`The Full Moon runs hot — a fast here is about release, not restriction`)
  } else {
    parts.push(
      l.phase === 'waning'
        ? `The Moon is waning — the half of the cycle that favours lightening and letting go`
        : `The Moon is waxing — the body is in a building phase, less suited to going without`,
    )
  }

  if (EARTH.has(moonSign)) {
    parts.push(`with the Moon in earthy ${moonSign}, discipline comes easier`)
  } else if (WATER.has(moonSign)) {
    parts.push(`the Moon in watery ${moonSign} supports a gentle cleanse`)
  } else if (FIRE.has(moonSign)) {
    parts.push(`the Moon in fiery ${moonSign} sharpens both willpower and hunger`)
  } else {
    parts.push(`the Moon in airy ${moonSign} can make it easy to get distracted from it`)
  }

  if (vocActive) {
    parts.push(`and the Moon is void of course — a poor time to begin anything, a fast included`)
  }

  return parts.join('; ') + '.'
}

const noteFor = (verdict: FastingVerdict): string =>
  verdict === 'favourable'
    ? 'Break it gently — warm water, then something light. Stop if your body says stop.'
    : verdict === 'neutral'
      ? 'Fine for a shorter fast or a lighter day of eating. Follow how you feel.'
      : 'If you fast anyway, keep it short and easy. This is guidance, not medical advice.'

export function computeFasting(now: Date = new Date()): FastingReading {
  const l = lunarDay(now)
  const moonSign = bodyPosition('Moon', now).sign
  const voc = moonVoidOfCourseCached(now)
  const score = scoreFor(l, moonSign, voc.active)
  const verdict = verdictOf(score)

  // best days over the next fortnight, checked at local noon
  const upcoming: FastingReading['upcoming'] = []
  const noon = new Date(now)
  noon.setHours(12, 0, 0, 0)
  for (let i = 1; i <= 15; i += 1) {
    const d = new Date(noon)
    d.setDate(d.getDate() + i)
    const dl = lunarDay(d)
    const ds = scoreFor(dl, bodyPosition('Moon', d).sign, false)
    if (dl.special === 'Ekadashi' || ds >= 74) {
      upcoming.push({
        day: localDayKey(d),
        label: dl.special ?? `Waning · lunar day ${dl.tithi}`,
        special: dl.special,
      })
    }
  }

  return {
    verdict,
    score,
    label: LABEL[verdict],
    reason: reasonFor(l, moonSign, voc.active),
    note: noteFor(verdict),
    tithi: { day: l.tithi, phase: l.phase, special: l.special },
    moonSign,
    upcoming: upcoming.slice(0, 3),
  }
}
