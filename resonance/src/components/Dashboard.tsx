import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { computeAura } from '../lib/aura'
import { usePrescription } from '../lib/prescription'
import { moonVoidOfCourseCached } from '../lib/lunar'
import { chakraLabel, useLocaleTag, useT } from '../lib/i18n'
import { crystalName } from '../lib/crystals'
import type { MessageKey } from '../lib/locales/en'
import { practicedToday } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from './Ritual'
import type { TabKey } from '../types/resonance'
import { useChakraField } from '../lib/chakraField'
import { CardsIcon, SparkIcon } from './icons'

interface DashboardProps {
  onRitual: (preset: RitualPreset) => void
  onPracticeSheet: () => void
  onTab: (tab: TabKey) => void
  onStones: () => void
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

export function Dashboard({
  onRitual,
  onPracticeSheet,
  onTab,
  onStones,
  onChakras,
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

  return (
    <div className="flex flex-col gap-5">
      {vocSoon && (
        <button
          type="button"
          onClick={() =>
            onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
          }
          className="glass-panel flex items-center justify-between gap-3 border-amber-400/25 p-3 text-start active:scale-[0.99]"
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

      <header className="px-1 pt-1">
        <p className="eyebrow-hue">
          {t('dash.headerDate', {
            greeting: t(when.greetingKey),
            date: when.date,
          })}
        </p>
        <h1 className="mt-2 font-serif text-[1.75rem] leading-[1.12] text-gilded">
          {transit ? rx.headline : t('dash.attuning')}
        </h1>
      </header>

      {/* the quiet centre of the day */}
      {transit && (
        <div className="px-2 py-1 text-center">
          <div className="mx-auto mb-3.5 flex items-center justify-center gap-2.5">
            <span className="h-px w-9 bg-gradient-to-r from-transparent to-white/20" />
            <SparkIcon className="h-2.5 w-2.5" style={{ color: 'var(--rz-hue)' }} />
            <span className="h-px w-9 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <p className="display text-[1.8rem] text-gilded">“{t(rx.mantra)}”</p>
          <p className="mt-3 eyebrow" style={{ color: 'var(--rz-hue)' }}>
            {t('dash.mantra')}
          </p>
        </div>
      )}

      {/* the day's one action */}
      <TodaysPractice variant="full" onLaunch={onRitual} />
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

      {/* the day at a glance */}
      <section className="glass-panel grid grid-cols-3 divide-x divide-white/8 p-3">
        <button
          type="button"
          onClick={() => onTab('you')}
          className="flex flex-col items-center gap-1.5 px-1 active:scale-[0.97]"
        >
          <Aura state={aura} size={40} className="h-10 w-10" />
          <span className="eyebrow">{t('dash.slotAura')}</span>
          <span className="text-xs tabular-nums text-haze-300">
            {Math.round(aura.score * 100)}%
          </span>
        </button>
        <button
          type="button"
          onClick={onChakras}
          className="flex flex-col items-center gap-1.5 px-1 active:scale-[0.97]"
        >
          <span className="flex h-10 items-center gap-[3px]">
            {[...chakraField].reverse().map((c) => (
              <span
                key={c.key}
                className="rounded-full"
                style={{
                  width: 4 + (c.charge / 100) * 4,
                  height: 4 + (c.charge / 100) * 4,
                  background: c.color,
                  opacity: c.tone === 'quiet' ? 0.4 : 1,
                  boxShadow: c.focus ? `0 0 8px ${c.color}` : undefined,
                }}
              />
            ))}
          </span>
          <span className="eyebrow">{t('dash.slotField')}</span>
          <span className="truncate text-xs text-haze-300">
            {chakraLabel(focusChakra, t)}
            {focusPlanet?.retrograde ? ' ℞' : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={onStones}
          className="flex flex-col items-center gap-1.5 px-1 active:scale-[0.97]"
        >
          <span className="grid h-10 w-10 place-items-center">
            <span
              className="h-[18px] w-[18px] rounded-full"
              style={{
                background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.85), ${
                  heroStone?.color ?? 'var(--rz-hue)'
                } 58%)`,
                boxShadow: `0 0 12px ${heroStone?.color ?? 'var(--rz-glow)'}, inset 0 0 4px rgba(255,255,255,0.35)`,
              }}
            />
          </span>
          <span className="eyebrow">{t('dash.slotStone')}</span>
          <span className="w-full truncate px-1 text-center text-xs text-haze-300">
            {heroStone ? crystalName(heroStone.name, t) : '—'}
          </span>
        </button>
      </section>

      {/* tarot */}
      <button
        type="button"
        onClick={() => onTab('tarot')}
        className="glass-panel flex items-center gap-3 p-4 text-start active:scale-[0.99]"
      >
        <CardsIcon className="h-5 w-5" style={{ color: 'var(--rz-hue)' }} />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg text-white">{t('dash.dailyTarot')}</p>
          <p className="text-xs text-haze-300">
            {tarotDrawn ? t('dash.tarotSeen') : t('dash.tarotNew')}
          </p>
        </div>
        <span style={{ color: 'var(--rz-hue)' }}>›</span>
      </button>

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
  )
}
