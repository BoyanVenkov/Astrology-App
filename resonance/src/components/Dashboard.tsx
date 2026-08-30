import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { computeAura } from '../lib/aura'
import { usePrescription } from '../lib/prescription'
import { moonVoidOfCourseCached } from '../lib/lunar'
import { chakraName } from '../lib/resonanceData'
import { practicedToday } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { planetSymbol } from '../data/esoteric'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from './Ritual'
import type { TabKey } from '../types/resonance'
import { CardsIcon } from './icons'

interface DashboardProps {
  onRitual: (preset: RitualPreset) => void
  onPracticeSheet: () => void
  onTab: (tab: TabKey) => void
  onStones: () => void
}

const greetingFor = (h: number): string =>
  h < 5 ? 'Still night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'

export function Dashboard({
  onRitual,
  onPracticeSheet,
  onTab,
  onStones,
}: DashboardProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const biometricLog = useAppStore((s) => s.biometricLog)
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
  const [when] = useState(() => {
    const d = new Date()
    return {
      greeting: greetingFor(d.getHours()),
      date: d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
    }
  })

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focusChakra, sessionLog, moodLog, biometricLog)
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
          className="glass-panel flex items-center justify-between gap-3 border-amber-400/25 p-3 text-left active:scale-[0.99]"
        >
          <span className="text-sm text-amber-200">
            {voc.active
              ? `Moon void of course — ground, don't begin. Ends ${voc.until ? new Date(voc.until).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : 'soon'}.`
              : `Moon goes void of course in ${voc.hoursUntil?.toFixed(1)} h.`}
          </span>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-amber-300">
            2-min
          </span>
        </button>
      )}

      <header className="px-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-haze-500">
          {when.greeting} · {when.date}
        </p>
        <h1 className="mt-1.5 font-serif text-[1.7rem] leading-tight text-gilded">
          {transit ? rx.headline : 'Attuning to the sky…'}
        </h1>
      </header>

      {/* the quiet centre of the day */}
      {rx.mantra && (
        <div className="px-3 text-center">
          <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
            Today’s mantra
          </p>
          <p className="mt-2 font-serif text-[1.6rem] leading-snug text-gilded">
            “{rx.mantra}”
          </p>
        </div>
      )}

      {/* the day's one action */}
      <TodaysPractice variant="full" onLaunch={onRitual} />
      <button
        type="button"
        onClick={onPracticeSheet}
        className="-mt-3 text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
      >
        {doneToday ? 'Practise again' : 'More ways to practise'} →
      </button>

      {/* the day at a glance */}
      <section className="glass-panel grid grid-cols-3 divide-x divide-white/8 p-3">
        <button
          type="button"
          onClick={() => onTab('you')}
          className="flex flex-col items-center gap-1.5 px-1 active:scale-[0.97]"
        >
          <Aura state={aura} size={40} className="h-10 w-10" />
          <span className="eyebrow">Aura</span>
          <span className="text-xs tabular-nums text-haze-300">
            {Math.round(aura.score * 100)}%
          </span>
        </button>
        <button
          type="button"
          onClick={() => onTab('sky')}
          className="flex flex-col items-center gap-1.5 px-1 active:scale-[0.97]"
        >
          <span className="text-xl leading-none text-haze-100" aria-hidden>
            {transit ? planetSymbol(transit.body) : '✦'}
          </span>
          <span className="eyebrow">Sky</span>
          <span className="truncate text-xs text-haze-300">
            {chakraName(focusChakra)}
            {focusPlanet?.retrograde ? ' ℞' : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={onStones}
          className="flex flex-col items-center gap-1.5 px-1 active:scale-[0.97]"
        >
          <span
            className="h-4 w-4 rounded-full"
            style={{
              background: heroStone?.color ?? 'var(--rz-hue)',
              boxShadow: `0 0 10px ${heroStone?.color ?? 'var(--rz-glow)'}`,
            }}
          />
          <span className="eyebrow">Stone</span>
          <span className="w-full truncate px-1 text-center text-xs text-haze-300">
            {heroStone?.name ?? '—'}
          </span>
        </button>
      </section>

      {/* tarot */}
      <button
        type="button"
        onClick={() => onTab('tarot')}
        className="glass-panel flex items-center gap-3 p-4 text-left active:scale-[0.99]"
      >
        <CardsIcon className="h-5 w-5" style={{ color: 'var(--rz-hue)' }} />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg text-white">Daily tarot</p>
          <p className="text-xs text-haze-300">
            {tarotDrawn
              ? 'See today’s card, or draw a spread'
              : 'Turn your card for today'}
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
          Add your birth details for a personal reading →
        </button>
      )}
    </div>
  )
}
