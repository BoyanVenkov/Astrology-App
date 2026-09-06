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
  ordinal,
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
  /** Which natal house each transiting body is moving through (empty without a birth place). */
  transitHouses?: Partial<Record<BodyName, number>>
  /** Natal planet positions — used to colour each aspect with the sign it lands in. */
  natal?: BodyPosition[]
}

/** Plain-language theme of a house, reused from the meditation catalogue (all 15 locales). */
const houseTheme = (house: number | undefined, t: TFn): string | null =>
  house && house >= 1 && house <= 12
    ? t(`med.house.${house}` as MessageKey)
    : null

/** Deterministic 0..n-1 pick, so the same transit always reads the same way. */
const fnv = (s: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}
const pick = (seed: string, n = 3): number => fnv(seed) % n

/** Which arc-of-the-transit timing bank to draw from. */
const timingKind = (a: Aspect): 'peak' | 'build' | 'fade' =>
  !a.applying ? 'fade' : a.orbDelta <= 1.2 ? 'peak' : 'build'

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
  /** The opening: 2–4 short paragraphs setting the whole scene. */
  intro: string[]
  /** One long, layered read per major transit. */
  sections: HoroscopeSection[]
  /** The Moon paragraph — your emotional weather for the stretch. */
  moon: string
  /** What keeps recurring across the chart. */
  threads: string[]
  /** The timing map — what's tightening, what's fading. */
  timing: string[]
  /** The closing arc. */
  close: string
  practice: string
  /** Catalogue key for the closing affirmation, or '' when there's no sky. */
  affirmation: MessageKey | ''
}

const SIGN_ORDER = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]

type Balance = 'supportive' | 'friction' | 'intense' | 'mixed' | 'quiet'

function balanceOf(aspects: Aspect[]): Balance {
  if (aspects.length === 0) return 'quiet'
  let hard = 0
  let soft = 0
  let neutral = 0
  for (const a of aspects) {
    if (a.def.harmony === 'hard') hard += a.exactness
    else if (a.def.harmony === 'soft') soft += a.exactness
    else neutral += a.exactness
  }
  if (soft > hard * 1.6 && soft >= neutral) return 'supportive'
  if (hard > soft * 1.6 && hard >= neutral) return 'friction'
  if (neutral > hard && neutral > soft) return 'intense'
  return 'mixed'
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

const quickCueLong: Record<string, MessageKey> = {
  hard: 'horo.deep.q.hard',
  soft: 'horo.deep.q.soft',
  neutral: 'horo.deep.q.neutral',
}

export function buildQuickHoroscope(
  reading: HoroscopeInput,
  t: TFn,
): QuickHoroscope {
  const { transit, chakra, aspects, sky, hasNatal, transitHouses = {} } = reading
  const moonPos = sky.find((p) => p.body === 'Moon')
  const vulnerable = chakra.balance < 50
  const focus = t(`chakra.${chakra.key}` as MessageKey)

  const balance = balanceOf(aspects)
  const tight = aspects.filter((a) => a.exactness > 0.55).length

  let weather: string
  if (balance === 'quiet') {
    weather = t('horo.weather.quiet')
  } else if (balance === 'supportive') {
    weather = t('horo.weather.supportive')
  } else if (balance === 'friction') {
    weather = tight
      ? t('horo.weather.frictionTight', {
          tight:
            tight > 1
              ? t('horo.weather.tight.many', { n: tight })
              : t('horo.weather.tight.one'),
        })
      : t('horo.weather.friction')
  } else if (balance === 'intense') {
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
    .map((a) => {
      const theme = houseTheme(transitHouses[a.transiting], t)
      const cue = t(`horo.quickCue.${a.def.harmony}` as MessageKey, {
        area: t(`horo.area.${a.other}` as MessageKey),
      })
      const houseBit = theme
        ? ' ' + t('horo.deep.q.house', { theme })
        : ''
      return {
        label: t('horo.note.label', {
          planet: planetLabel(a.transiting, t),
          rel: rel(a.def.name, t),
          target: otherName(a.other, hasNatal, t, 'horo.note.yourBody'),
        }),
        text:
          t('horo.note.text', {
            planet: planetLabel(a.transiting, t),
            short: t(`horo.short.${a.transiting}` as MessageKey),
            cue,
          }) +
          houseBit +
          ' ' +
          t(quickCueLong[a.def.harmony] ?? 'horo.deep.q.neutral'),
      }
    })

  if (notes.length === 0) {
    notes.push({
      label: transitTitle(transit, t),
      text: cap(transitInfluence(transit, t).split('.')[0]) + '.',
    })
  }

  const body =
    (vulnerable
      ? t('horo.body.tender', { focus })
      : t('horo.body.charged', { focus })) +
    ' ' +
    t('horo.deep.q.thread', { focus })

  const moon = moonPos
    ? t('horo.moon.quick', {
        sign: signLabel(moonPos.sign, t),
        mood: t(`horo.moonSign.${moonPos.sign}` as MessageKey),
      })
    : ''

  return { weather, notes, body, moon }
}

/** Rough count of days a transit stays inside its own influence, for the tempo read. */
const TEMPO_SPEED: Partial<Record<BodyName, 'fast' | 'slow'>> = {
  Moon: 'fast', Mercury: 'fast', Venus: 'fast', Sun: 'fast',
  Mars: 'slow', Jupiter: 'slow', Saturn: 'slow',
  Uranus: 'slow', Neptune: 'slow', Pluto: 'slow',
}

function composeSection(
  a: Aspect,
  /** How many earlier sections already used this aspect type — rotates variants. */
  sib: number,
  reading: HoroscopeInput,
  t: TFn,
): HoroscopeSection {
  const asp = a.def.name
  const houses = reading.transitHouses ?? {}
  const natal = reading.natal ?? []
  // Rotate on the aspect type + sibling position so two squares (or two
  // conjunctions) in the same reading never draw the same variant.
  const v3 = (salt: string, base = 3): number => (pick(asp + salt) + sib) % base
  const v2 = (salt: string): number => (pick(asp + salt) + sib) % 2

  const trPlanet = planetLabel(a.transiting, t)
  const targetPlain = planetLabel(a.other, t)
  const b = otherName(a.other, reading.hasNatal, t, 'horo.section.natalName')

  const retro = reading.sky.find((p) => p.body === a.transiting)?.retrograde
    ? t('dh.retro')
    : ''

  // paragraph 1 — the transiting force, what it touches, the sign, the house
  const open = t('dh.sec.open', {
    tr: t(`dh.tr.${a.transiting}` as MessageKey),
    verb: t(`dh.asp.verb.${asp}` as MessageKey),
    target: b,
    na: t(`dh.na.${a.other}` as MessageKey),
  })

  const natalSign = natal.find((p) => p.body === a.other)?.sign
  const signLine =
    reading.hasNatal && natalSign && SIGN_ORDER.includes(natalSign)
      ? ' ' +
        t('dh.sec.sign', {
          target: targetPlain,
          sign: signLabel(natalSign, t),
          signFlavour: t(`dh.sign.${natalSign}` as MessageKey),
        })
      : ''

  const houseNum = houses[a.transiting]
  const houseLine =
    houseNum && houseNum >= 1 && houseNum <= 12
      ? ' ' + t(`dh.house.${houseNum}` as MessageKey)
      : ''

  // paragraph 2 — the aspect's nature, its timing, and what to do about it
  const tv = (pick(a.transiting + asp + 't') + sib) % 3
  const aspectLine = t('dh.sec.aspect', {
    aspectNature: t(`dh.asp.nat.${asp}.${v2('n')}` as MessageKey),
    timing: t(`dh.time.${timingKind(a)}.${tv}` as MessageKey),
    retro,
  })
  const closeLine =
    ' ' +
    t('dh.sec.close', {
      life: t(`dh.life.${asp}.${v3('l')}` as MessageKey),
      invite: t(`dh.invite.${asp}.${v3('i')}` as MessageKey),
      do: t(`dh.do.${asp}.${v3('d')}` as MessageKey),
    })

  return {
    heading: t('horo.section.heading', {
      a: trPlanet,
      rel: rel(asp, t),
      b,
    }),
    body: open + signLine + houseLine + '\n\n' + aspectLine + closeLine,
  }
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

  const balance = balanceOf(aspects)
  const top = aspects.slice(0, 5)

  /* ---- the opening: lead + headline + weather + tempo ---- */
  const intro: string[] = [t('dh.ov.lead')]
  if (hasNatal && top[0]) {
    intro.push(
      t('dh.ov.head', {
        a: planetLabel(top[0].transiting, t),
        aspectWord: rel(top[0].def.name, t),
        b: otherName(top[0].other, true, t, 'horo.section.natalName'),
        trMeaning: t(`dh.tr.${top[0].transiting}` as MessageKey),
      }),
    )
  } else {
    intro.push(
      t('horo.overview.noNatal', { influence: transitInfluence(transit, t) }),
    )
  }
  intro.push(t(`dh.ov.weather.${balance}` as MessageKey))
  const speeds = top.map((a) => TEMPO_SPEED[a.transiting])
  const separating = top.filter((a) => !a.applying).length
  const tempo =
    balance === 'quiet' || separating > top.length / 2
      ? 'settling'
      : speeds.every((s) => s === 'slow')
        ? 'slow'
        : speeds.filter((s) => s === 'fast').length >= speeds.length / 2
          ? 'fast'
          : 'building'
  intro.push(t(`dh.ov.tempo.${tempo}` as MessageKey))

  /* ---- one long read per major transit ---- */
  const usedByAspect = new Map<string, number>()
  const sections = top.map((a) => {
    const sib = usedByAspect.get(a.def.name) ?? 0
    usedByAspect.set(a.def.name, sib + 1)
    return composeSection(a, sib, reading, t)
  })

  /* ---- the Moon ---- */
  const moon = moonPos
    ? t('dh.moon.body', {
        sign: signLabel(moonPos.sign, t),
        mood: t(`horo.moonSign.${moonPos.sign}` as MessageKey),
        phase: phaseLabel(transit.moonPhase, t),
        pct: transit.illumination,
        phaseNote: t(phaseNoteKey(transit.moonPhase)),
      })
    : ''

  /* ---- the threads that recur ---- */
  const threads: string[] = []
  const houseCount = new Map<number, number>()
  const planetCount = new Map<BodyName, number>()
  for (const a of top) {
    const h = (reading.transitHouses ?? {})[a.transiting]
    if (h) houseCount.set(h, (houseCount.get(h) ?? 0) + 1)
    planetCount.set(a.other, (planetCount.get(a.other) ?? 0) + 1)
  }
  const repeatHouse = [...houseCount.entries()].find(([, n]) => n >= 2)?.[0]
  const repeatPlanet = [...planetCount.entries()].find(([, n]) => n >= 2)?.[0]
  if (repeatHouse) {
    const theme = houseTheme(repeatHouse, t)
    threads.push(
      t('dh.th.house', {
        ord: ordinal(repeatHouse, t),
        houseThemeLower: theme ? theme.toLowerCase() : '',
      }),
    )
  }
  if (repeatPlanet) {
    threads.push(
      t('dh.th.planet', {
        planet: planetLabel(repeatPlanet, t),
        na: t(`dh.na.${repeatPlanet}` as MessageKey),
      }),
    )
  }
  if (threads.length === 0) threads.push(t('dh.th.solo'))
  threads.push(
    t(
      `dh.th.bal.${
        balance === 'supportive'
          ? 'supportive'
          : balance === 'friction' || balance === 'intense'
            ? 'friction'
            : 'mixed'
      }` as MessageKey,
    ),
  )

  /* ---- the timing map ---- */
  const naming = (a: Aspect): string =>
    `${planetLabel(a.transiting, t)} ${rel(a.def.name, t)} ${planetLabel(a.other, t)}`
  const tightening = top.filter((a) => a.applying && a.orbDelta <= 2)
  const fading = top.filter((a) => !a.applying && a.orbDelta <= 3)
  const timing: string[] = []
  if (tightening.length)
    timing.push(t('dh.tm.tight', { list: tightening.map(naming).join('; ') }))
  if (fading.length)
    timing.push(t('dh.tm.fade', { list: fading.map(naming).join('; ') }))
  if (timing.length === 0) timing.push(t('dh.tm.none'))

  /* ---- the closing arc ---- */
  const closeKind = vulnerable
    ? 'protect'
    : balance === 'supportive'
      ? 'use'
      : 'steady'
  const close = t(`dh.cl.${closeKind}` as MessageKey, { focus })

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
    intro,
    sections,
    moon,
    threads,
    timing,
    close,
    practice,
    affirmation: sky.length ? chakraMantra(chakra.key) : '',
  }
}
