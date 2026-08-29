import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { MOOD_LIST, MOOD_META } from '../lib/aura'
import { localDayKey } from '../lib/timezone'
import type { Mood } from '../types/resonance'

interface MoodCheckInProps {
  /** Called after a mood is saved (or the user backs out). */
  onDone: () => void
  title?: string
  /** Tighter layout with no note field — for the ritual completion screen. */
  compact?: boolean
}

export function MoodCheckIn({
  onDone,
  title = 'How are you feeling?',
  compact = false,
}: MoodCheckInProps) {
  const moodLog = useAppStore((s) => s.moodLog)
  const logMood = useAppStore((s) => s.logMood)

  const today = localDayKey()
  const existing = moodLog.find((m) => m.day === today) ?? null

  const [mood, setMood] = useState<Mood | null>(existing?.mood ?? null)
  const [note, setNote] = useState(existing?.note ?? '')
  const [saved, setSaved] = useState(false)

  const save = () => {
    if (!mood) return
    logMood({
      at: new Date().toISOString(),
      day: today,
      mood,
      note: note.trim() || undefined,
    })
    setSaved(true)
    if (compact) return
    onDone()
  }

  const grid = (
    <div className="grid grid-cols-3 gap-2">
      {MOOD_LIST.map((m) => {
        const meta = MOOD_META[m]
        const selected = m === mood
        return (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMood(m)
              setSaved(false)
            }}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-xs transition ${
              selected
                ? 'border-white/30 bg-white/10 text-white'
                : 'border-white/10 bg-white/5 text-haze-300 active:text-white'
            }`}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{
                background: meta.color,
                boxShadow: selected ? `0 0 12px ${meta.color}` : undefined,
              }}
            />
            {meta.label}
          </button>
        )
      })}
    </div>
  )

  if (compact) {
    return (
      <div className="w-full">
        <p className="eyebrow text-center">{title}</p>
        <div className="mt-3">{grid}</div>
        <button
          type="button"
          onClick={save}
          disabled={!mood || saved}
          className="mt-4 w-full rounded-2xl border border-gold-400/40 bg-gold-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100 transition disabled:opacity-40"
        >
          {saved ? 'Logged ✦' : 'Log this'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onDone}
        className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        ‹ Back
      </button>

      <header className="px-1">
        <p className="eyebrow">Evening check-in</p>
        <h1 className="mt-1 font-serif text-2xl text-gilded">{title}</h1>
        <p className="mt-1 text-sm text-haze-300">
          One tap. It shapes tomorrow’s aura and your mood trend.
        </p>
      </header>

      <section className="glass-panel p-4">{grid}</section>

      {mood && (
        <p className="px-1 text-sm text-haze-300">{MOOD_META[mood].phrase}</p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="eyebrow">Note (optional)</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Anything on your mind…"
          className="resize-none rounded-2xl border border-white/12 bg-midnight-950/60 px-4 py-3 text-sm text-white outline-none focus:border-gold-400/60"
        />
      </label>

      <button
        type="button"
        onClick={save}
        disabled={!mood}
        className="rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
      >
        {existing ? 'Update check-in' : 'Save check-in'}
      </button>
    </div>
  )
}
