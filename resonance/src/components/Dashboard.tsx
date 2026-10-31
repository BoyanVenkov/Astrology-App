import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { computeAura } from '../lib/aura'
import { primaryPreset, usePrescription } from '../lib/prescription'
import { moonVoidOfCourseCached } from '../lib/lunar'
import { computeFasting } from '../lib/fasting'
import { buildQuickHoroscope } from '../lib/horoscope'
import { chakraFieldSummary, useChakraField } from '../lib/chakraField'
import { useEntitlements } from '../lib/premium'
import {
  chakraLabel,
  phaseLabel,
  planetLabel,
  useLocaleTag,
  useT,
} from '../lib/i18n'
import { crystalName } from '../lib/crystals'
import { chakraColor, zodiacGlyph } from '../lib/resonanceData'
import { planetSymbol } from '../data/esoteric'
import type { MessageKey } from '../lib/locales/en'
import { localDayKey } from '../lib/timezone'
import { TodaysPractice } from './TodaysPractice'
import { TodayHero } from './TodayHero'
import { ChakraBody } from './ChakraBody'
import { ASPECT_GLYPH } from '../lib/astrology'
import type { NavSub } from './Layout'
import type { RitualPreset } from './Ritual'
import type { TabKey } from '../types/resonance'
import { ChevronIcon, LockIcon, PlayIcon } from './icons'
import artStone from '../assets/art/orb-stone.webp'
import artField from '../assets/art/orb-field.webp'
import artTarotDeck from '../assets/art/icon-tarot-deck.webp'
import artRuneStone from '../assets/art/icon-rune-stone.webp'
import artHoroscope from '../assets/art/icon-horoscope.webp'
import artTransits from '../assets/art/icon-transits.webp'
import artMoon from '../assets/art/icon-moon.webp'
import artMeditate from '../assets/art/icon-meditate.webp'
import artApothecary from '../assets/art/icon-apothecary.webp'
import artBreathe from '../assets/art/icon-breathe.webp'
import { hexToHue } from '../lib/color'

interface DashboardProps {
  onRitual: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
  onTab: (tab: TabKey) => void
  /** Opens a pushed screen through App's gate (horoscope / compat are Pro). */
  onOpen: (sub: NavSub) => void
  onChakras: () => void
}

const greetingKey = (h: number): MessageKey =>
  h < 5
    ? 'dash.greetingNight'
    : h < 12
      ? 'dash.greetingMorning'
      : h < 18
        ? 'dash.greetingAfternoon'
        : 'dash.greetingEvening'

/** A dashboard widget — glass card, gold hover edge, a "more" chevron. */
function Widget({
  eyebrow,
  title,
  art,
  onClick,
  className = '',
  delay = 0,
  locked = false,
  children,
}: {
  eyebrow: string
  title?: ReactNode
  art?: string
  onClick: () => void
  className?: string
  delay?: number
  locked?: boolean
  children?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-panel card-lift card-press animate-rise-in group relative flex flex-col overflow-hidden p-4.5 text-start md:p-5 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {art && (
        <img
          src={art}
          alt=""
          aria-hidden
          className="animate-card-float pointer-events-none absolute -end-3 -top-3 h-24 w-24 object-contain opacity-90 transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28"
          style={{
            filter:
              'drop-shadow(0 12px 18px rgba(0,0,0,0.6)) drop-shadow(0 0 16px rgba(232,194,116,0.25))',
            animationDelay: `${delay / 200}s`,
          }}
        />
      )}
      <span className="relative flex items-center gap-1.5 pe-16 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--rz-gold)]">
        {eyebrow}
        {locked && <LockIcon className="h-3.5 w-3.5 text-haze-400" />}
      </span>
      {title && (
        <span className="relative mt-2 block pe-14 font-serif text-[1.25rem] leading-tight text-white">
          {title}
        </span>
      )}
      <span className="relative mt-2 flex flex-1 flex-col">{children}</span>
      <ChevronIcon className="absolute bottom-4 end-4 h-4 w-4 -scale-x-100 text-[color:var(--rz-gold)] opacity-70 transition group-hover:opacity-100 rtl:scale-x-100" />
    </button>
  )
}

export function Dashboard({
  onRitual,
  onUpgrade,
  onTab,
  onOpen,
  onChakras,
}: DashboardProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const { isPro } = useEntitlements()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const sky = useAppStore((s) => s.sky)
  const aspects = useAppStore((s) => s.aspects)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const tarotDrawnDay = useAppStore((s) => s.tarotDrawnDay)
  const runeDrawnDay = useAppStore((s) => s.runeDrawnDay)
  const chakraField = useChakraField()

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 300_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 300_000)),
      300_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const voc = useMemo(
    () => moonVoidOfCourseCached(new Date(bucket * 300_000)),
    [bucket],
  )
  const when = useMemo(() => {
    const d = new Date()
    return {
      greetingKey: greetingKey(d.getHours()),
      date: d.toLocaleDateString(localeTag, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    }
  }, [localeTag])
  // the lunar-day read only changes with the hour; recompute per 5-min tick
  const fasting = useMemo(
    () => computeFasting(new Date(bucket * 300_000), t),
    [bucket, t],
  )

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focusChakra, sessionLog, moodLog)
  const focusPlanet = sky.find((p) => p.body === transit?.body)
  const rx = usePrescription()
  const quick = useMemo(
    () =>
      transit && chakra
        ? buildQuickHoroscope(
            {
              transit,
              chakra,
              crystals,
              aspects,
              sky,
              hasNatal,
              suggestedPattern,
              transitHouses,
            },
            t,
          )
        : null,
    [transit, chakra, crystals, aspects, sky, hasNatal, suggestedPattern, transitHouses, t],
  )

  const heroStone = rx.stones[0]
  const vocSoon = voc.active || (voc.hoursUntil != null && voc.hoursUntil < 4)
  const tarotDrawn = tarotDrawnDay === localDayKey()
  const runeDrawn = runeDrawnDay === localDayKey()
  const topAspects = aspects.slice(0, 3)

  const glyphs = transit
    ? [
        planetSymbol(transit.body),
        zodiacGlyph(transit.sign),
        ...(transit.target ? [planetSymbol(transit.target)] : []),
      ].filter(Boolean)
    : []

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {vocSoon && (
        <button
          type="button"
          onClick={() =>
            onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
          }
          className="glass-panel card-press animate-rise-in flex items-center justify-between gap-3 border-amber-400/25 p-3 text-start md:me-28"
        >
          <span className="text-sm text-amber-200">
            {voc.active
              ? voc.until
                ? t('scr.voc.active', {
                    time: new Date(voc.until).toLocaleTimeString(localeTag, {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  })
                : t('scr.voc.activeSoon')
              : t('scr.voc.upcoming', {
                  hours: voc.hoursUntil?.toFixed(1) ?? '',
                })}
          </span>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-amber-300">
            {t('scr.voc.twoMin')}
          </span>
        </button>
      )}

      {/* ======== the hero — a cinematic plate ======== */}
      <TodayHero
        eyebrow={when.date}
        greeting={t(when.greetingKey)}
        headline={transit ? rx.headline : t('dash.attuning')}
        glyphs={glyphs}
        mantra={
          transit && (
            <figure className="glass-veil animate-bloom-in w-full max-w-[30rem] rounded-[1.4rem] px-6 py-5 md:px-8">
              <blockquote className="display text-[1.45rem] leading-[1.25] text-[#fbf3df] md:text-[1.7rem]">
                “{t(rx.mantra)}”
              </blockquote>
              <figcaption className="mt-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--rz-gold)]">
                {t('dash.mantra')}
              </figcaption>
            </figure>
          )
        }
      />

      {/* ======== practice · the day at a glance ======== */}
      <div className="grid gap-5 xl:grid-cols-5">
        <section className="glass-panel glass-gold animate-rise-in relative overflow-hidden p-5 md:p-6 xl:col-span-3">
          <img
            src={artMeditate}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -end-6 h-40 w-40 object-contain opacity-[0.12]"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="font-serif text-[1.45rem] leading-tight text-gilded md:text-[1.6rem]">
              {t('tp.today')}
            </h2>
            {rx.urgent && (
              <span className="rounded-full border border-[rgba(232,194,116,0.35)] px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--rz-gold)]">
                {t('tp.restoreFirst')}
              </span>
            )}
          </div>
          <div className="relative mt-3 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="min-w-0 flex-1">
              <p className="text-[0.95rem] leading-relaxed text-haze-100">
                {rx.directive}
              </p>
              <button
                type="button"
                onClick={() => onRitual(primaryPreset(rx))}
                className="btn-gold mt-4 inline-flex min-h-11 items-center gap-2.5 py-1 pe-5 ps-1 text-[0.9rem]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1a1206] text-[color:var(--rz-gold)]">
                  <PlayIcon className="h-4 w-4 rtl:-scale-x-100" />
                </span>
                {t('dash.beginPractice')}
              </button>
            </div>
            <TodaysPractice
              variant="inline"
              onLaunch={onRitual}
              onUpgrade={onUpgrade}
              className="-mt-2 md:w-[17rem] md:shrink-0"
            />
          </div>
        </section>

        {/* aura · field · stone — symbolic, and labelled as such */}
        <section className="glass-panel animate-rise-in flex flex-col p-4 pt-5 xl:col-span-2">
          <div className="grid flex-1 grid-cols-3 divide-x divide-white/10 rtl:divide-x-reverse">
            <button
              type="button"
              onClick={() => onTab('you')}
              className="card-press group flex flex-col items-center gap-2 px-1"
            >
              <span className="grid h-24 w-24 place-items-center transition-transform duration-500 group-hover:scale-105">
                <Aura
                  state={aura}
                  size={96}
                  className="h-24 w-24 drop-shadow-[0_16px_18px_rgba(0,0,0,0.55)]"
                />
              </span>
              <span className="eyebrow">{t('dash.slotAura')}</span>
              <span className="data text-sm text-[#f3dca4]">
                {Math.round(aura.score * 100)}%
              </span>
            </button>
            <button
              type="button"
              onClick={onChakras}
              className="card-press group flex flex-col items-center gap-2 px-1"
            >
              <span className="relative grid h-24 w-24 place-items-center transition-transform duration-500 group-hover:scale-105">
                <span
                  aria-hidden
                  className="absolute h-20 w-20 rounded-full blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${chakraColor(focusChakra)} 0%, transparent 72%)`,
                    opacity: 0.55,
                  }}
                />
                <img
                  src={artField}
                  alt=""
                  aria-hidden
                  className="animate-aura-breathe relative h-20 w-20 object-contain"
                  style={{
                    filter: `hue-rotate(${hexToHue(chakraColor(focusChakra)) - 25}deg) saturate(1.4) drop-shadow(0 14px 16px rgba(0,0,0,0.55))`,
                  }}
                />
              </span>
              <span className="eyebrow">{t('dash.slotField')}</span>
              <span className="w-full truncate text-center text-sm text-[#f3dca4]">
                {chakraLabel(focusChakra, t)}
                {focusPlanet?.retrograde ? ' ℞' : ''}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onOpen('stones')}
              className="card-press group flex flex-col items-center gap-2 px-1"
            >
              <span className="relative grid h-24 w-24 place-items-center transition-transform duration-500 group-hover:scale-105">
                <span
                  aria-hidden
                  className="absolute h-20 w-20 rounded-full blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${heroStone?.color ?? 'var(--rz-glow)'} 0%, transparent 72%)`,
                    opacity: 0.55,
                  }}
                />
                <img
                  src={artStone}
                  alt=""
                  aria-hidden
                  className="relative h-[5.5rem] w-[5.5rem] object-contain"
                  style={{
                    filter: `hue-rotate(${
                      heroStone ? hexToHue(heroStone.color) - 25 : 0
                    }deg) drop-shadow(0 14px 16px rgba(0,0,0,0.55))`,
                  }}
                />
              </span>
              <span className="eyebrow">{t('dash.slotStone')}</span>
              <span className="w-full truncate px-1 text-center text-sm text-[#f3dca4]">
                {heroStone ? crystalName(heroStone.name, t) : '—'}
              </span>
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] leading-snug text-haze-400">
            {t('dash.symbolicNote')}
          </p>
        </section>
      </div>

      {/* ======== your day — the widgets ======== */}
      <h2 className="mt-1 px-1 font-serif text-[1.5rem] text-gilded md:text-[1.75rem]">
        {t('dash.yourDay')}
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        {/* daily horoscope — the free quick read, full reading behind Pro */}
        {quick && (
          <Widget
            eyebrow={t('scr.quick.eyebrow')}
            art={artHoroscope}
            onClick={() => onOpen('horoscope')}
            className="col-span-2 min-h-[13rem]"
            locked={!isPro}
          >
            <span className="line-clamp-5 pe-6 text-[0.92rem] leading-relaxed text-haze-100 md:pe-10">
              {quick.weather}
            </span>
            <span className="mt-auto pt-3 text-[0.78rem] font-medium text-[color:var(--rz-gold)]">
              {isPro ? t('scr.quick.readFull') : t('scr.quick.fullPro')}
            </span>
          </Widget>
        )}

        {/* transits to the chart — the three tightest contacts */}
        <Widget
          eyebrow={t('sky.tileTransits')}
          art={artTransits}
          onClick={() => onOpen('transits')}
          className="col-span-2 min-h-[13rem] md:col-span-1"
          delay={60}
        >
          {topAspects.length > 0 ? (
            <ul className="mt-1 flex flex-col gap-2.5 pe-4">
              {topAspects.map((a) => (
                <li
                  key={`${a.transiting}-${a.other}-${a.def.name}`}
                  className="flex items-center gap-3"
                >
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border font-serif text-[0.95rem]"
                    style={{
                      color: a.def.harmony === 'hard' ? '#f4a3a3' : a.def.harmony === 'soft' ? '#9fe0c8' : '#f3dca4',
                      borderColor: 'rgba(255,255,255,0.14)',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {planetSymbol(a.transiting)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.88rem] text-white">
                      {planetLabel(a.transiting, t)}{' '}
                      <span aria-hidden>{ASPECT_GLYPH[a.def.name] ?? '·'}</span>{' '}
                      {planetLabel(a.other, t)}
                    </span>
                    <span className="data block text-[0.72rem] text-haze-400">
                      {a.orbDelta.toFixed(1)}° {a.applying ? '↑' : '↓'}
                      <span className="sr-only">
                        {a.applying
                          ? t('scr.transits.applying')
                          : t('scr.transits.separating')}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-[0.9rem] text-haze-300">
              {t('sky.transitsEmpty')}
            </span>
          )}
        </Widget>

        {/* chakra balance — the live column */}
        <Widget
          eyebrow={t('sky.chakraField')}
          onClick={onChakras}
          className="min-h-[13rem]"
          delay={120}
        >
          <span className="flex flex-1 items-center gap-3">
            <span
              className="grid h-36 w-16 shrink-0 place-items-center"
              style={{ filter: 'drop-shadow(0 0 12px var(--rz-glow))' }}
            >
              <ChakraBody field={chakraField} size={64} className="pointer-events-none" />
            </span>
            <span className="pe-3 font-serif text-[1rem] leading-snug text-white">
              {chakraFieldSummary(chakraField, t)}
            </span>
          </span>
        </Widget>

        {/* moon & fasting */}
        <Widget
          eyebrow={t('sky.tileMoon')}
          art={artMoon}
          onClick={() => onOpen('moon')}
          className="min-h-[13rem]"
          delay={180}
        >
          {transit && (
            <>
              <span className="pe-10 font-serif text-[1.2rem] leading-tight text-white">
                {phaseLabel(transit.moonPhase, t)}
              </span>
              <span className="data mt-1 text-[0.78rem] text-haze-300">
                {Math.round(transit.illumination)}% ·{' '}
                {t('dash.lunarDay', { n: fasting.tithi.day })}
              </span>
              <span className="mt-auto pt-3 pe-5 text-[0.82rem] leading-snug text-[#f3dca4]">
                {fasting.label}
              </span>
            </>
          )}
        </Widget>

        {/* tarot + rune — big hero art */}
        <Widget
          eyebrow={t('dash.dailyTarot')}
          art={artTarotDeck}
          onClick={() => onTab('tarot')}
          className="min-h-[11rem]"
          delay={240}
        >
          <span className="mt-auto pe-6 text-[0.88rem] leading-snug text-haze-200">
            {tarotDrawn ? t('dash.tarotSeen') : t('dash.tarotNew')}
          </span>
        </Widget>
        <Widget
          eyebrow={t('dash.dailyRune')}
          art={artRuneStone}
          onClick={() => onOpen('runes')}
          className="min-h-[11rem]"
          delay={300}
        >
          <span className="mt-auto pe-6 text-[0.88rem] leading-snug text-haze-200">
            {runeDrawn ? t('dash.runeSeen') : t('dash.runeNew')}
          </span>
        </Widget>

        {/* the stone to carry, and the full practice library */}
        <Widget
          eyebrow={t('dash.stoneOfDay')}
          art={artApothecary}
          title={heroStone ? crystalName(heroStone.name, t) : t('sky.tileStones')}
          onClick={() => onOpen('stones')}
          className="min-h-[11rem]"
          delay={360}
        >
          {heroStone?.placement && (
            <span className="mt-auto line-clamp-3 pe-6 text-[0.84rem] leading-snug text-haze-300">
              {heroStone.placement}
            </span>
          )}
        </Widget>
        <Widget
          eyebrow={t('tp.fullLibrary')}
          art={artBreathe}
          onClick={() => onOpen('library')}
          className="min-h-[11rem]"
          delay={420}
        >
          <span className="mt-auto pe-6 text-[0.84rem] leading-snug text-haze-300">
            {t('tp.librarySub')}
          </span>
        </Widget>
      </div>

      {!hasNatal && (
        <button
          type="button"
          onClick={() => onOpen('chart')}
          className="text-center text-xs uppercase tracking-[0.14em] text-[color:var(--rz-gold)] hover:text-[color:var(--rz-gold-hi)]"
        >
          {t('dash.addBirth')}
        </button>
      )}
    </div>
  )
}
