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

export type FastingMethod =
  | 'intermittent'
  | 'omad'
  | 'one-day'
  | 'sunrise-sunset'
  | 'prolonged'

export type MethodFit = 'good' | 'ok' | 'not-today'

export interface FastingMethodRead {
  key: FastingMethod
  name: string
  /** e.g. "16:8 · skip breakfast". */
  window: string
  /** One sentence — what it is / how to run it. */
  what: string
  fit: MethodFit
  /** One sentence — why today does or doesn't suit it. */
  why: string
}

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
  /** Every method, rated for today, best-fitting first. */
  methods: FastingMethodRead[]
  /** The method today most supports. */
  pick: FastingMethodRead
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

interface MethodDef {
  key: FastingMethod
  name: string
  window: string
  what: string
}

/** Ordered gentlest → deepest. */
const METHOD_DEFS: MethodDef[] = [
  {
    key: 'intermittent',
    name: 'Intermittent',
    window: '16:8 — a daily 8-hour eating window',
    what: 'The everyday version: push the first meal later or the last one earlier so the body gets 16 hours clear. Water, tea and black coffee through the gap.',
  },
  {
    key: 'sunrise-sunset',
    name: 'Dawn to dusk',
    window: 'First light to sunset, water through the day',
    what: 'Nothing solid while the sun is up; a normal meal after dark and again before dawn. The rhythm most fasting traditions are built on.',
  },
  {
    key: 'omad',
    name: 'One meal a day',
    window: '20:4 — a single meal, one short window',
    what: 'Eat once, usually late afternoon or evening, and make it a full plate. Everything else in the day is water, tea or broth.',
  },
  {
    key: 'one-day',
    name: 'A full day',
    window: '24–36 hours, dinner to dinner',
    what: 'The classic Ekadashi length. Finish dinner, skip every meal the next day, break the following evening with something light and warm.',
  },
  {
    key: 'prolonged',
    name: 'Prolonged',
    window: '48 hours and up — multi-day',
    what: 'Two to five days on water, salt and minerals only. Real shifts in energy and mood; ease in for days beforehand and break it very slowly. Not a first fast, and not one to run without guidance.',
  },
]

function methodFit(
  key: FastingMethod,
  l: Lunar,
  moonSign: string,
  vocActive: boolean,
  score: number,
): { fit: MethodFit; why: string } {
  const waning = l.phase === 'waning'
  const earth = EARTH.has(moonSign)
  const water = WATER.has(moonSign)
  const fire = FIRE.has(moonSign)
  const ekadashi = l.special === 'Ekadashi'

  switch (key) {
    case 'intermittent': {
      if (vocActive)
        return {
          fit: 'ok',
          why: 'The void-of-course Moon dulls willpower a little, but a 16:8 gap is small enough to hold anyway.',
        }
      if (fire && !waning)
        return {
          fit: 'ok',
          why: `A waxing Moon in fiery ${moonSign} sharpens hunger — workable, just expect to feel it.`,
        }
      return {
        fit: 'good',
        why: 'Short and daily — the sky rarely argues with this one, and today is no exception.',
      }
    }
    case 'sunrise-sunset': {
      if (vocActive)
        return {
          fit: 'ok',
          why: 'Fine to continue if it is already your rhythm; a poor day to start it fresh with the Moon void of course.',
        }
      if (earth)
        return {
          fit: 'good',
          why: `The Moon in earthy ${moonSign} makes a daylight fast feel structured and doable.`,
        }
      if (score >= 58)
        return { fit: 'good', why: 'The lunar day backs a steady, contained fast like this.' }
      if (score >= 44)
        return {
          fit: 'ok',
          why: 'Neither helped nor hindered — lean on routine rather than the sky today.',
        }
      return {
        fit: 'not-today',
        why: 'A waxing, building Moon works against going a whole day on water.',
      }
    }
    case 'omad': {
      if (vocActive)
        return {
          fit: 'not-today',
          why: 'The Moon is void of course — a scattered day to hold to a single meal.',
        }
      if (waning && !fire)
        return {
          fit: 'good',
          why: 'The waning Moon favours eating less, and one full meal sits neatly inside that.',
        }
      if (earth && !fire)
        return {
          fit: 'good',
          why: `The Moon in steady ${moonSign} makes a single meal easy to keep to.`,
        }
      if (fire && !waning)
        return {
          fit: 'not-today',
          why: `A waxing Moon in fiery ${moonSign} spikes appetite — one meal will feel like a fight.`,
        }
      return {
        fit: 'ok',
        why: 'A neutral day — possible, but you will be running on discipline, not momentum.',
      }
    }
    case 'one-day': {
      if (vocActive)
        return {
          fit: 'not-today',
          why: 'Void of course — the tradition is clear that you do not begin a fast of this length now.',
        }
      if (ekadashi && waning)
        return { fit: 'good', why: 'Waning Ekadashi — the exact window this fast was built for.' }
      if (ekadashi)
        return {
          fit: 'good',
          why: 'It is Ekadashi, the day kept for a 24-hour fast across many traditions.',
        }
      if (waning && score >= 60)
        return {
          fit: 'good',
          why: 'The waning half and a supportive Moon give a full day solid backing.',
        }
      if (waning || l.special === 'New Moon')
        return {
          fit: 'ok',
          why: 'Some support from the cycle, though not a standout day — keep it to 24 hours rather than 36.',
        }
      return {
        fit: 'not-today',
        why: 'A waxing Moon makes a full day harder than it needs to be — wait for the waning half.',
      }
    }
    case 'prolonged': {
      if (ekadashi && waning && !vocActive && score >= 70 && (earth || water))
        return {
          fit: 'good',
          why: 'Everything lines up — waning Ekadashi, a grounded Moon, no void. A rare green light for a long fast.',
        }
      if (vocActive)
        return {
          fit: 'not-today',
          why: 'Void of course — never the moment to begin something this demanding.',
        }
      if (waning && score >= 62)
        return {
          fit: 'ok',
          why: 'The waning half supports it, but only start a multi-day fast if you have done shorter ones and prepared for days.',
        }
      return {
        fit: 'not-today',
        why: waning
          ? 'The cycle is willing but the day is not strong enough to launch a multi-day fast.'
          : 'A waxing Moon and a multi-day fast pull in opposite directions.',
      }
    }
  }
}

const FIT_RANK: Record<MethodFit, number> = { good: 0, ok: 1, 'not-today': 2 }
const AUTO_PICK: FastingMethod[] = ['intermittent', 'sunrise-sunset', 'omad', 'one-day']

function methodsFor(
  l: Lunar,
  moonSign: string,
  vocActive: boolean,
  score: number,
): { methods: FastingMethodRead[]; pick: FastingMethodRead } {
  const rated = new Map<FastingMethod, FastingMethodRead>()
  for (const def of METHOD_DEFS) {
    const { fit, why } = methodFit(def.key, l, moonSign, vocActive, score)
    rated.set(def.key, { ...def, fit, why })
  }

  // deepest method that still rates 'good' (prolonged never auto-recommended),
  // else the gentlest that isn't ruled out
  const pickKey =
    [...AUTO_PICK].reverse().find((k) => rated.get(k)!.fit === 'good') ??
    AUTO_PICK.find((k) => rated.get(k)!.fit !== 'not-today') ??
    'intermittent'

  const methods = [...rated.values()].sort(
    (a, b) => FIT_RANK[a.fit] - FIT_RANK[b.fit],
  )
  return { methods, pick: rated.get(pickKey)! }
}

export function computeFasting(now: Date = new Date()): FastingReading {
  const l = lunarDay(now)
  const moonSign = bodyPosition('Moon', now).sign
  const voc = moonVoidOfCourseCached(now)
  const score = scoreFor(l, moonSign, voc.active)
  const verdict = verdictOf(score)
  const { methods, pick } = methodsFor(l, moonSign, voc.active, score)

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
    methods,
    pick,
    upcoming: upcoming.slice(0, 3),
  }
}
