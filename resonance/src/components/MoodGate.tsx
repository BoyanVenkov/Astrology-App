import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useDayHue } from '../lib/dayhue'
import { MOOD_LIST, MOOD_META } from '../lib/aura'
import { localDayKey } from '../lib/timezone'
import { ResonanceMark } from './Logo'
import type { Mood } from '../types/resonance'

interface MoodGateProps {
  onDone: () => void
}

const PREVIEW: Record<Mood, string> = {
  anxious: 'we’ll slow everything down — 4·7·8 breath and a settling tone',
  heavy: 'gentle grounding today — slow coherent breath and warmth',
  tired: 'short and soft — a restorative sit, nothing demanding',
  bright: 'we’ll lean into the sky’s charge and give you more',
  clear: 'we’ll follow the sky — a focused, unhurried practice',
  calm: 'we’ll follow the sky — steady, aligned practice',
}

/**
 * The daily threshold. Before the main interface, once a day: how are you
 * arriving? The answer is folded into the astrological reading to choose the
 * day's practice.
 */
export function MoodGate({ onDone }: MoodGateProps) {
  useDayHue()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const logMood = useAppStore((s) => s.logMood)
  const dismissMoodGate = useAppStore((s) => s.dismissMoodGate)

  const [mood, setMood] = useState<Mood | null>(null)

  const commit = () => {
    if (mood) {
      logMood({ at: new Date().toISOString(), day: localDayKey(), mood })
    }
    dismissMoodGate()
    onDone()
  }

  return (
    <div
      className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center px-6"
      style={{
        paddingTop: 'max(2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        background:
          'radial-gradient(ellipse 90% 45% at 50% 0%, var(--rz-hue-soft), transparent 60%)',
      }}
    >
      <ResonanceMark
        className="mb-6 h-8 w-8 self-center"
        style={{ color: 'var(--rz-hue)' }}
        animated
      />

      <p className="eyebrow text-center" style={{ color: 'var(--rz-hue)' }}>
        Before you begin
      </p>
      <h1 className="mt-2 text-center font-serif text-[2rem] leading-tight text-gilded">
        How are you arriving?
      </h1>

      {transit && (
        <p className="mt-3 text-center text-sm leading-relaxed text-haze-300">
          The sky today is{' '}
          <span className="text-haze-100">{transit.title}</span>
          {chakra ? ` · ${chakra.name} focus` : ''}. Your practice is shaped by
          that — and by this.
        </p>
      )}

      <div className="mt-7 grid grid-cols-2 gap-2.5">
        {MOOD_LIST.map((m) => {
          const meta = MOOD_META[m]
          const on = m === mood
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className="flex items-center gap-3 rounded-2xl border px-3.5 py-3.5 text-left transition active:scale-[0.98]"
              style={{
                borderColor: on
                  ? meta.color
                  : 'rgba(255,255,255,0.1)',
                background: on
                  ? `color-mix(in srgb, ${meta.color} 14%, transparent)`
                  : 'rgba(255,255,255,0.03)',
              }}
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{
                  background: meta.color,
                  boxShadow: on ? `0 0 14px ${meta.color}` : `0 0 6px ${meta.color}66`,
                }}
              />
              <span
                className={`font-serif text-base ${on ? 'text-white' : 'text-haze-200'}`}
              >
                {meta.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 min-h-[3rem] text-center">
        {mood && (
          <p className="animate-rise-in text-sm leading-relaxed text-haze-300">
            You’re <span className="text-haze-100">{MOOD_META[mood].label.toLowerCase()}</span> — {PREVIEW[mood]}.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={commit}
        disabled={!mood}
        className="mt-3 rounded-2xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-midnight-void transition active:scale-[0.98] disabled:opacity-30"
        style={{
          background: mood
            ? 'linear-gradient(180deg, color-mix(in srgb, var(--rz-hue) 82%, #fff 14%), var(--rz-hue))'
            : 'rgba(255,255,255,0.08)',
          color: mood ? '#03040c' : 'rgba(154,166,201,0.7)',
        }}
      >
        Enter
      </button>
      <button
        type="button"
        onClick={commit}
        className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-haze-500 active:text-haze-300"
      >
        Skip for today
      </button>
    </div>
  )
}
