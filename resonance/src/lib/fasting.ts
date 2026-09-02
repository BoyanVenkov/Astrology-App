import { bodyPosition, moonState } from './ephemeris'
import { signLabel, type TFn } from './i18n'
import type { MessageKey } from './locales/en'
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

function reasonFor(
  l: Lunar,
  moonSign: string,
  vocActive: boolean,
  t: TFn,
): string {
  const sign = signLabel(moonSign, t)
  const parts: string[] = []

  if (l.special === 'Ekadashi') parts.push(t('fast.reason.ekadashi'))
  else if (l.special === 'New Moon') parts.push(t('fast.reason.newMoon'))
  else if (l.special === 'Full Moon') parts.push(t('fast.reason.fullMoon'))
  else
    parts.push(
      l.phase === 'waning'
        ? t('fast.reason.waning')
        : t('fast.reason.waxing'),
    )

  if (EARTH.has(moonSign)) parts.push(t('fast.reason.earth', { sign }))
  else if (WATER.has(moonSign)) parts.push(t('fast.reason.water', { sign }))
  else if (FIRE.has(moonSign)) parts.push(t('fast.reason.fire', { sign }))
  else parts.push(t('fast.reason.air', { sign }))

  if (vocActive) parts.push(t('fast.reason.voc'))

  return parts.join(t('fast.reason.join')) + '.'
}

const noteFor = (verdict: FastingVerdict, t: TFn): string =>
  verdict === 'favourable'
    ? t('fast.note.favourable')
    : verdict === 'neutral'
      ? t('fast.note.neutral')
      : t('fast.note.not-ideal')

/** Ordered gentlest → deepest. */
const METHOD_KEYS: FastingMethod[] = [
  'intermittent',
  'sunrise-sunset',
  'omad',
  'one-day',
  'prolonged',
]

function methodFit(
  key: FastingMethod,
  l: Lunar,
  moonSign: string,
  vocActive: boolean,
  score: number,
  t: TFn,
): { fit: MethodFit; why: string } {
  const waning = l.phase === 'waning'
  const earth = EARTH.has(moonSign)
  const water = WATER.has(moonSign)
  const fire = FIRE.has(moonSign)
  const ekadashi = l.special === 'Ekadashi'
  const sign = signLabel(moonSign, t)
  const why = (k: MessageKey): string => t(k, { sign })

  switch (key) {
    case 'intermittent': {
      if (vocActive) return { fit: 'ok', why: why('fast.why.intermittent.voc') }
      if (fire && !waning)
        return { fit: 'ok', why: why('fast.why.intermittent.fire') }
      return { fit: 'good', why: why('fast.why.intermittent.good') }
    }
    case 'sunrise-sunset': {
      if (vocActive) return { fit: 'ok', why: why('fast.why.sunrise-sunset.voc') }
      if (earth) return { fit: 'good', why: why('fast.why.sunrise-sunset.earth') }
      if (score >= 58)
        return { fit: 'good', why: why('fast.why.sunrise-sunset.good') }
      if (score >= 44) return { fit: 'ok', why: why('fast.why.sunrise-sunset.ok') }
      return { fit: 'not-today', why: why('fast.why.sunrise-sunset.no') }
    }
    case 'omad': {
      if (vocActive) return { fit: 'not-today', why: why('fast.why.omad.voc') }
      if (waning && !fire) return { fit: 'good', why: why('fast.why.omad.waning') }
      if (earth && !fire) return { fit: 'good', why: why('fast.why.omad.earth') }
      if (fire && !waning)
        return { fit: 'not-today', why: why('fast.why.omad.fire') }
      return { fit: 'ok', why: why('fast.why.omad.ok') }
    }
    case 'one-day': {
      if (vocActive) return { fit: 'not-today', why: why('fast.why.one-day.voc') }
      if (ekadashi && waning)
        return { fit: 'good', why: why('fast.why.one-day.ekadashiWaning') }
      if (ekadashi) return { fit: 'good', why: why('fast.why.one-day.ekadashi') }
      if (waning && score >= 60)
        return { fit: 'good', why: why('fast.why.one-day.waningGood') }
      if (waning || l.special === 'New Moon')
        return { fit: 'ok', why: why('fast.why.one-day.someSupport') }
      return { fit: 'not-today', why: why('fast.why.one-day.no') }
    }
    case 'prolonged': {
      if (ekadashi && waning && !vocActive && score >= 70 && (earth || water))
        return { fit: 'good', why: why('fast.why.prolonged.good') }
      if (vocActive)
        return { fit: 'not-today', why: why('fast.why.prolonged.voc') }
      if (waning && score >= 62)
        return { fit: 'ok', why: why('fast.why.prolonged.ok') }
      return {
        fit: 'not-today',
        why: waning
          ? why('fast.why.prolonged.noWaning')
          : why('fast.why.prolonged.no'),
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
  t: TFn,
): { methods: FastingMethodRead[]; pick: FastingMethodRead } {
  const rated = new Map<FastingMethod, FastingMethodRead>()
  for (const key of METHOD_KEYS) {
    const { fit, why } = methodFit(key, l, moonSign, vocActive, score, t)
    rated.set(key, {
      key,
      name: t(`fast.method.${key}.name` as MessageKey),
      window: t(`fast.method.${key}.window` as MessageKey),
      what: t(`fast.method.${key}.what` as MessageKey),
      fit,
      why,
    })
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

export function computeFasting(now: Date, t: TFn): FastingReading {
  const l = lunarDay(now)
  const moonSign = bodyPosition('Moon', now).sign
  const voc = moonVoidOfCourseCached(now)
  const score = scoreFor(l, moonSign, voc.active)
  const verdict = verdictOf(score)
  const { methods, pick } = methodsFor(l, moonSign, voc.active, score, t)

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
        label: dl.special
          ? t(`fast.special.${dl.special}` as MessageKey)
          : t('fast.upcoming.waning', { n: dl.tithi }),
        special: dl.special,
      })
    }
  }

  return {
    verdict,
    score,
    label: t(`fast.label.${verdict}` as MessageKey),
    reason: reasonFor(l, moonSign, voc.active, t),
    note: noteFor(verdict, t),
    tithi: { day: l.tithi, phase: l.phase, special: l.special },
    moonSign,
    methods,
    pick,
    upcoming: upcoming.slice(0, 3),
  }
}

/** Localised label for a special lunar day (`tithi.special`). */
export const fastingSpecialLabel = (special: string | null, t: TFn): string | null =>
  special ? t(`fast.special.${special}` as MessageKey) : null
