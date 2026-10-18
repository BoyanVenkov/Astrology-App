import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { computeAura } from '../lib/aura'
import { usePrescription } from '../lib/prescription'
import { moonVoidOfCourseCached } from '../lib/lunar'
import { chakraLabel, useLocaleTag, useT } from '../lib/i18n'
import { crystalName } from '../lib/crystals'
import { chakraColor } from '../lib/resonanceData'
import type { MessageKey } from '../lib/locales/en'
import { practicedToday } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from './Ritual'
import type { TabKey } from '../types/resonance'
import { useChakraField } from '../lib/chakraField'
import { drawRunes, layoutOf, runeDailySeed } from '../lib/runes'
import { RuneGlyph } from './RuneGlyph'
import { SparkIcon } from './icons'
import artStone from '../assets/art/orb-stone.webp'
import artTarotDeck from '../assets/art/icon-tarot-deck.webp'
import artRuneStone from '../assets/art/icon-rune-stone.webp'
import { hexToHue } from '../lib/color'

interface DashboardProps {
  onRitual: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
  onPracticeSheet: () => void
  onTab: (tab: TabKey) => void
  onStones: () => void
  onChakras: () => void
  onRunes: () => void
}

const greetingKey = (h: number): MessageKey =>
  h < 5
    ? 'dash.greetingNight'
    : h < 12
      ? 'dash.greetingMorning'
      : h < 18
        ? 'dash.greetingAfternoon'
        : 'dash.greetingEvening'

export function Dashboard({
  onRitual,
  onUpgrade,
  onPracticeSheet,
  onTab,
  onStones,
  onChakras,
  onRunes,
}: DashboardProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const chakraField = useChakraField()
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const tarotDrawnDay = useAppStore((s) => s.tarotDrawnDay)
  const runeDrawnDay = useAppStore((s) => s.runeDrawnDay)
  const profile = useAppStore((s) => s.profile)
  const dailyRune = useMemo(
    () => drawRunes(layoutOf('one'), runeDailySeed(profile)).runes[0],
    [profile],
  )

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

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focusChakra, sessionLog, moodLog)
  const doneToday = practicedToday(sessionLog)
  const focusPlanet = sky.find((p) => p.body === transit?.body)
  const rx = usePrescription()

  const heroStone = rx.stones[0]
  const vocSoon = voc.active || (voc.hoursUntil != null && voc.hoursUntil < 4)
  const tarotDrawn = tarotDrawnDay === localDayKey()
  const runeDrawn = runeDrawnDay === localDayKey()

  return (
    <div className="flex flex-col gap-5">
      {vocSoon && (
        <button
          type="button"
          onClick={() =>
            onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
          }
          className="glass-panel card-press animate-rise-in flex items-center justify-between gap-3 border-amber-400/25 p-3 text-start"
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

      {/* -------- the quiet centre — full width, nebula drifting behind it -------- */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <span
            className="animate-drift absolute start-[8%] top-[-10%] h-40 w-40 rounded-full opacity-40 blur-3xl"
            style={{ background: 'var(--rz-hue)', animationDuration: '18s' }}
          />
          <span
            className="animate-drift absolute end-[4%] top-[6%] h-28 w-28 rounded-full opacity-30 blur-3xl"
            style={{ background: 'var(--rz-hue)', animationDuration: '22s', animationDelay: '-6s' }}
          />
        </div>

        <header className="animate-bloom-in px-1 pt-1 md:mx-auto md:max-w-2xl md:text-center">
          <p className="eyebrow-hue">
            {t('dash.headerDate', {
              greeting: t(when.greetingKey),
              date: when.date,
            })}
          </p>
          <h1 className="mt-2.5 font-serif text-[2.1rem] leading-[1.08] text-gilded md:text-[2.5rem]">
            {transit ? rx.headline : t('dash.attuning')}
          </h1>
        </header>

        {transit && (
          <div
            className="animate-bloom-in mt-4 md:mx-auto md:max-w-2xl"
            style={{ animationDelay: '120ms' }}
          >
            {/* the celestial card — the mantra, lit from behind */}
            <div
              className="glass-panel glass-panel-active relative overflow-hidden px-6 py-7 text-center"
              style={{ boxShadow: '0 0 60px -20px var(--rz-glow)' }}
            >
              <span
                aria-hidden
                className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: 'var(--rz-hue)', opacity: 0.22 }}
              />
              <div className="relative mx-auto mb-4 flex items-center justify-center gap-2.5">
                <span className="h-px w-9 bg-gradient-to-r from-transparent to-white/20" />
                <SparkIcon
                  className="animate-pulse-glow h-2.5 w-2.5"
                  style={{ color: 'var(--rz-hue)' }}
                />
                <span className="h-px w-9 bg-gradient-to-l from-transparent to-white/20" />
              </div>
              <p className="display relative text-[2.05rem] leading-[1.18] text-gilded md:text-[2.35rem]">
                “{t(rx.mantra)}”
              </p>
              <p className="relative mt-3.5 eyebrow" style={{ color: 'var(--rz-hue)' }}>
                {t('dash.mantra')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* -------- the day, in two panes on a wide screen -------- */}
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:items-start md:gap-x-10">
      {/* left — the one action */}
      <div className="flex flex-col gap-5">
      <TodaysPractice variant="full" onLaunch={onRitual} onUpgrade={onUpgrade} />
      <button
        type="button"
        onClick={onPracticeSheet}
        className="-mt-1.5 self-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition active:scale-95"
        style={{
          color: 'var(--rz-hue)',
          borderColor: 'color-mix(in srgb, var(--rz-hue) 42%, transparent)',
          background: 'color-mix(in srgb, var(--rz-hue) 9%, transparent)',
        }}
      >
        {doneToday ? t('dash.practiseAgain') : t('dash.moreWays')} →
      </button>
      </div>

      {/* right — the day around it */}
      <div className="flex flex-col gap-5">
      {/* the day at a glance — a unified glowing-sphere widget */}
      <section className="glass-panel animate-rise-in grid grid-cols-3 divide-x divide-white/8 p-3.5">
        <button
          type="button"
          onClick={() => onTab('you')}
          className="card-press flex flex-col items-center gap-2 px-1"
        >
          <Aura state={aura} size={48} className="h-12 w-12" />
          <span className="eyebrow">{t('dash.slotAura')}</span>
          <span className="data text-sm text-haze-200">
            {Math.round(aura.score * 100)}%
          </span>
        </button>
        <button
          type="button"
          onClick={onChakras}
          className="card-press flex flex-col items-center gap-2 px-1"
        >
          <span
            aria-hidden
            className="grid h-12 w-12 place-items-center rounded-full"
            style={{
              background: `radial-gradient(circle at 36% 30%, color-mix(in srgb, ${chakraColor(focusChakra)} 55%, white), ${chakraColor(focusChakra)} 62%)`,
              boxShadow: `0 0 18px -2px ${chakraColor(focusChakra)}`,
            }}
          >
            <span className="flex items-center gap-[2.5px]">
              {[...chakraField].reverse().map((c) => (
                <span
                  key={c.key}
                  className="animate-pulse-glow rounded-full bg-white"
                  style={{
                    width: 2.5 + (c.charge / 100) * 2.5,
                    height: 2.5 + (c.charge / 100) * 2.5,
                    opacity: c.tone === 'quiet' ? 0.35 : 0.9,
                    animationDuration: c.focus ? '3s' : '6s',
                  }}
                />
              ))}
            </span>
          </span>
          <span className="eyebrow">{t('dash.slotField')}</span>
          <span className="truncate text-sm text-haze-200">
            {chakraLabel(focusChakra, t)}
            {focusPlanet?.retrograde ? ' ℞' : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={onStones}
          className="card-press flex flex-col items-center gap-2 px-1"
        >
          <span className="grid h-12 w-12 place-items-center">
            <img
              src={artStone}
              alt=""
              aria-hidden
              className="h-10 w-10 object-contain"
              style={{
                filter: `hue-rotate(${
                  heroStone ? hexToHue(heroStone.color) - 25 : 0
                }deg) drop-shadow(0 0 8px ${heroStone?.color ?? 'var(--rz-glow)'})`,
              }}
            />
          </span>
          <span className="eyebrow">{t('dash.slotStone')}</span>
          <span className="w-full truncate px-1 text-center text-sm text-haze-200">
            {heroStone ? crystalName(heroStone.name, t) : '—'}
          </span>
        </button>
      </section>

      {/* tarot + rune */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onTab('tarot')}
          className="glass-panel bento-tile animate-rise-in flex flex-col gap-1.5 p-4 text-start"
          style={{ animationDelay: '60ms' }}
        >
          <img src={artTarotDeck} alt="" aria-hidden className="h-11 w-11 object-contain" />
          <p className="font-serif text-lg leading-tight text-white">
            {t('dash.dailyTarot')}
          </p>
          <p className="text-sm text-haze-300">
            {tarotDrawn ? t('dash.tarotSeen') : t('dash.tarotNew')}
          </p>
        </button>

        <button
          type="button"
          onClick={onRunes}
          className="glass-panel bento-tile animate-rise-in flex flex-col gap-1.5 p-4 text-start"
          style={{ animationDelay: '110ms' }}
        >
          <span className="relative grid h-11 w-11 place-items-center">
            <img src={artRuneStone} alt="" aria-hidden className="h-11 w-11 object-contain" />
            <RuneGlyph
              runeKey={dailyRune.key}
              merkstave={runeDrawn && dailyRune.merkstave}
              className="absolute h-4 w-3"
              style={{ color: runeDrawn ? '#e3c063' : 'var(--rz-hue)' }}
            />
          </span>
          <p className="font-serif text-lg leading-tight text-white">
            {t('dash.dailyRune')}
          </p>
          <p className="text-sm text-haze-300">
            {runeDrawn ? t('dash.runeSeen') : t('dash.runeNew')}
          </p>
        </button>
      </div>

      {!hasNatal && (
        <button
          type="button"
          onClick={() => onTab('sky')}
          className="text-center text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          {t('dash.addBirth')}
        </button>
      )}
      </div>
      </div>
    </div>
  )
}
