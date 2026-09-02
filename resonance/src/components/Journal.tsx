import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { BREATH_PATTERNS } from '../lib/breathwork'
import { MEDITATION_STYLE_MAP } from '../lib/meditation'
import { computeAura, MOOD_META } from '../lib/aura'
import { auraLabel, chakraLabel, moodLabel, useT } from '../lib/i18n'
import { useEntitlements } from '../lib/premium'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { BackButton } from './Screen'
import type { Mood } from '../types/resonance'

interface JournalProps {
  onBack: () => void
  onUpgrade: (reason?: string) => void
}

interface DayCell {
  key: string
  label: number
  minutes: number
  mood: Mood | null
  isToday: boolean
}

const dayKeyOffset = (offset: number): string => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return localDayKey(d)
}

export function Journal({ onBack, onUpgrade }: JournalProps) {
  const t = useT()
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const { isPro, freeHistoryDays } = useEntitlements()

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focusChakra, sessionLog, moodLog)
  const streak = practiceStreak(sessionLog)
  const gridDays = isPro ? 28 : Math.min(28, freeHistoryDays)

  const totalMinutes = sessionLog
    .filter((s) => s.completed)
    .reduce((sum, s) => sum + s.minutes, 0)
  const totalSessions = sessionLog.filter((s) => s.completed).length

  const grid = useMemo<DayCell[]>(() => {
    const minutesByDay = new Map<string, number>()
    for (const s of sessionLog) {
      if (!s.completed) continue
      minutesByDay.set(s.day, (minutesByDay.get(s.day) ?? 0) + s.minutes)
    }
    const moodByDay = new Map<string, Mood>()
    for (const m of moodLog) moodByDay.set(m.day, m.mood)

    const today = localDayKey()
    const cells: DayCell[] = []
    for (let i = -(gridDays - 1); i <= 0; i += 1) {
      const key = dayKeyOffset(i)
      cells.push({
        key,
        label: Number(key.slice(-2)),
        minutes: minutesByDay.get(key) ?? 0,
        mood: moodByDay.get(key) ?? null,
        isToday: key === today,
      })
    }
    return cells
  }, [sessionLog, moodLog, gridDays])

  const recent = [...sessionLog].reverse().slice(0, isPro ? 30 : 6)

  return (
    <div className="flex flex-col gap-5">
      <BackButton onClick={onBack} />

      <header className="flex flex-col items-center text-center">
        <Aura state={aura} size={200} className="h-48 w-48" />
        <p className="eyebrow mt-1">{t('aura.yours')}</p>
        <h1 className="font-serif text-3xl text-gilded">
          {auraLabel(aura.score, t)}
        </h1>
        <p className="mt-1 text-sm text-haze-300">
          {chakraLabel(focusChakra, t)} · {Math.round(aura.score * 100)}%
          {aura.mood && aura.moodFresh
            ? ` · ${moodLabel(aura.mood, t)}`
            : ''}
        </p>
      </header>

      <section className="glass-panel grid grid-cols-3 divide-x divide-white/8 p-4 text-center">
        <div>
          <p className="font-serif text-2xl text-white">{streak}</p>
          <p className="eyebrow mt-1">day streak</p>
        </div>
        <div>
          <p className="font-serif text-2xl text-white">{totalSessions}</p>
          <p className="eyebrow mt-1">practices</p>
        </div>
        <div>
          <p className="font-serif text-2xl text-white">{totalMinutes}</p>
          <p className="eyebrow mt-1">minutes</p>
        </div>
      </section>

      {/* practice grid */}
      <section className="glass-panel p-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Last {gridDays === 28 ? '4 weeks' : `${gridDays} days`}</p>
          {!isPro && (
            <button
              type="button"
              onClick={() => onUpgrade('Unlimited journal history')}
              className="text-[10px] uppercase tracking-[0.14em] text-gold-300"
            >
              full history →
            </button>
          )}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {grid.map((cell) => {
            const strength = Math.min(1, cell.minutes / 10)
            return (
              <div
                key={cell.key}
                className="flex aspect-square items-center justify-center rounded-md text-[9px] tabular-nums"
                style={{
                  background:
                    cell.minutes > 0
                      ? `rgba(212,175,55,${0.18 + strength * 0.5})`
                      : 'rgba(255,255,255,0.05)',
                  boxShadow: cell.mood
                    ? `inset 0 0 0 1.5px ${MOOD_META[cell.mood].color}`
                    : cell.isToday
                      ? 'inset 0 0 0 1px rgba(255,255,255,0.25)'
                      : undefined,
                  color:
                    cell.minutes > 0
                      ? 'rgba(3,4,12,0.7)'
                      : 'rgba(233,237,250,0.35)',
                }}
              >
                {cell.label}
              </div>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] text-haze-400">
          Fill = minutes practised · ring = mood logged
        </p>
      </section>

      {/* recent sessions */}
      <section className="glass-panel p-4">
        <p className="eyebrow">Recent practice</p>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-haze-400">
            No sessions yet — start one from the dashboard.
          </p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {recent.map((s, i) => (
              <li
                key={`${s.at}-${i}`}
                className="flex items-center justify-between"
              >
                <span className="text-haze-100">
                  {s.day.slice(5)} ·{' '}
                  {s.kind === 'meditation'
                    ? (MEDITATION_STYLE_MAP[s.style ?? 'chakra']?.name ??
                      'Meditation')
                    : s.kind === 'frequency'
                      ? `${s.frequency} Hz`
                      : (BREATH_PATTERNS[s.pattern]?.name ?? s.pattern)}
                </span>
                <span className="tabular-nums text-xs text-haze-400">
                  {chakraLabel(s.chakra, t)} · {s.minutes} min
                  {s.completed ? '' : ' · ended early'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
