import type {
  AstrologicalTransit,
  BreathPatternKey,
  ChakraState,
  Crystal,
} from '../types/resonance'
import type { Aspect } from './astrology'
import type { BodyName, BodyPosition } from './ephemeris'
import { BREATH_PATTERNS } from './breathwork'
import { crystalName } from './crystals'
import type { MessageKey } from './locales/en'
import {
  breathName,
  planetLabel,
  phaseLabel,
  signLabel,
  transitInfluence,
  transitTitle,
  type TFn,
} from './i18n'
import { chakraMantra } from './resonanceData'

/** The slice of a `DailyReading` the horoscope narrative needs — all in the store. */
export interface HoroscopeInput {
  transit: AstrologicalTransit
  chakra: ChakraState
  crystals: Crystal[]
  aspects: Aspect[]
  sky: BodyPosition[]
  hasNatal: boolean
  suggestedPattern: BreathPatternKey
}

/**
 * Turns a `DailyReading` (real transits × the natal chart) into a readable
 * daily horoscope. Text is composed from phrase banks per locale — no LLM,
 * works offline.
 */

export interface HoroscopeSection {
  heading: string
  body: string
}

export interface DailyHoroscope {
  greeting: string
  overview: string
  sections: HoroscopeSection[]
  moon: string
  practice: string
  /** Catalogue key for the closing affirmation, or '' when there's no sky. */
  affirmation: MessageKey | ''
}

const rel = (name: string, t: TFn): string =>
  t(`horo.rel.${name}` as MessageKey)

/** The aspected body as it should read — "your Venus" / "natal Venus" / "Venus". */
const otherName = (
  other: BodyName,
  hasNatal: boolean,
  t: TFn,
  natalKey: 'horo.note.yourBody' | 'horo.section.natalName',
): string =>
  hasNatal
    ? t(natalKey, { body: planetLabel(other, t) })
    : planetLabel(other, t)

const phaseNoteKey = (name: string): MessageKey => {
  if (name.includes('New')) return 'horo.phase.new'
  if (name.includes('Waxing')) return 'horo.phase.waxing'
  if (name.includes('Full')) return 'horo.phase.full'
  return 'horo.phase.waning'
}

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

/** A quick, plain read of the day — synthesised from every transit. Free tier. */
export interface QuickHoroscope {
  weather: string
  notes: { label: string; text: string }[]
  body: string
  moon: string
}

export function buildQuickHoroscope(
  reading: HoroscopeInput,
  t: TFn,
): QuickHoroscope {
  const { transit, chakra, aspects, sky, hasNatal } = reading
  const moonPos = sky.find((p) => p.body === 'Moon')
  const vulnerable = chakra.balance < 50
  const focus = t(`chakra.${chakra.key}` as MessageKey)

  let hard = 0
  let soft = 0
  let neutral = 0
  for (const a of aspects) {
    if (a.def.harmony === 'hard') hard += a.exactness
    else if (a.def.harmony === 'soft') soft += a.exactness
    else neutral += a.exactness
  }
  const tight = aspects.filter((a) => a.exactness > 0.55).length

  let weather: string
  if (aspects.length === 0) {
    weather = t('horo.weather.quiet')
  } else if (soft > hard * 1.6 && soft >= neutral) {
    weather = t('horo.weather.supportive')
  } else if (hard > soft * 1.6 && hard >= neutral) {
    weather = tight
      ? t('horo.weather.frictionTight', {
          tight:
            tight > 1
              ? t('horo.weather.tight.many', { n: tight })
              : t('horo.weather.tight.one'),
        })
      : t('horo.weather.friction')
  } else if (neutral > hard && neutral > soft) {
    weather = t('horo.weather.neutral')
  } else {
    weather = t('horo.weather.mixed')
  }

  const seen = new Set<BodyName>()
  const notes = aspects
    .filter((a) => {
      if (seen.has(a.other)) return false
      seen.add(a.other)
      return true
    })
    .slice(0, hasNatal ? 3 : 2)
    .map((a) => ({
      label: t('horo.note.label', {
        planet: planetLabel(a.transiting, t),
        rel: rel(a.def.name, t),
        target: otherName(a.other, hasNatal, t, 'horo.note.yourBody'),
      }),
      text: t('horo.note.text', {
        planet: planetLabel(a.transiting, t),
        short: t(`horo.short.${a.transiting}` as MessageKey),
        cue: t(`horo.quickCue.${a.def.harmony}` as MessageKey, {
          area: t(`horo.area.${a.other}` as MessageKey),
        }),
      }),
    }))

  if (notes.length === 0) {
    notes.push({
      label: transitTitle(transit, t),
      text: cap(transitInfluence(transit, t).split('.')[0]) + '.',
    })
  }

  const body = vulnerable
    ? t('horo.body.tender', { focus })
    : t('horo.body.charged', { focus })

  const moon = moonPos
    ? t('horo.moon.quick', {
        sign: signLabel(moonPos.sign, t),
        mood: t(`horo.moonSign.${moonPos.sign}` as MessageKey),
      })
    : ''

  return { weather, notes, body, moon }
}

export function buildHoroscope(
  reading: HoroscopeInput,
  t: TFn,
): DailyHoroscope {
  const { transit, chakra, aspects, sky, hasNatal, suggestedPattern } = reading
  const moonPos = sky.find((p) => p.body === 'Moon')
  const vulnerable = chakra.balance < 50
  const focus = t(`chakra.${chakra.key}` as MessageKey)

  const greeting = vulnerable
    ? t('horo.greeting.protect', { focus })
    : t('horo.greeting.lit', { focus })

  const influence = transitInfluence(transit, t)
  const overview = hasNatal
    ? t('horo.overview.natal', {
        body: planetLabel(transit.body, t),
        rel: rel(transit.aspect, t),
        target: otherName(
          (transit.parts.targetBody ?? transit.body) as BodyName,
          transit.parts.targetNatal,
          t,
          'horo.section.natalName',
        ),
        influence,
      })
    : t('horo.overview.noNatal', { influence })

  const top = aspects.slice(0, 3)
  const sections: HoroscopeSection[] = top.map((a) => {
    const b = otherName(a.other, hasNatal, t, 'horo.section.natalName')
    const what = t(`horo.what.${a.other}` as MessageKey)
    const flavour =
      a.def.harmony === 'neutral'
        ? t('horo.flavour.neutral', {
            short: t(`horo.short.${a.other}` as MessageKey),
            what,
          })
        : t(`horo.flavour.${a.def.harmony}` as MessageKey, { what })
    return {
      heading: t('horo.section.heading', {
        a: planetLabel(a.transiting, t),
        rel: rel(a.def.name, t),
        b,
      }),
      body: t('horo.section.body', {
        a: planetLabel(a.transiting, t),
        manner: t(`horo.manner.${a.def.harmony}` as MessageKey),
        b,
        flavour,
        orb: a.orbDelta.toFixed(1),
        trend: a.applying
          ? t('horo.trend.tightening')
          : t('horo.trend.easing'),
      }),
    }
  })

  const moon = moonPos
    ? t('horo.moon.full', {
        sign: signLabel(moonPos.sign, t),
        mood: t(`horo.moonSign.${moonPos.sign}` as MessageKey),
        phase: phaseLabel(transit.moonPhase, t),
        pct: transit.illumination,
        phaseNote: t(phaseNoteKey(transit.moonPhase)),
      })
    : ''

  const pattern = BREATH_PATTERNS[suggestedPattern]
  const stones = reading.crystals.slice(0, 2).map((c) => crystalName(c.name, t))
  const practice = t('horo.practice', {
    hz: transit.recommendedFrequency,
    focus,
    pattern: breathName(suggestedPattern, t),
    ratio: pattern.ratio,
    stones: stones.join(t('horo.join.or')),
  })

  return {
    greeting,
    overview,
    sections,
    moon,
    practice,
    affirmation: sky.length ? chakraMantra(chakra.key) : '',
  }
}
