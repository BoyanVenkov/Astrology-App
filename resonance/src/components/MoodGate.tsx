import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useDayHue } from '../lib/dayhue'
import { useT } from '../lib/i18n'
import { MOOD_LIST, MOOD_META } from '../lib/aura'
import { localDayKey } from '../lib/timezone'
import { ResonanceMark } from './Logo'
import type { Mood } from '../types/resonance'
import type { MessageKey } from '../lib/locales/en'

interface MoodGateProps {
  onDone: () => void
}

/**
 * The daily threshold. Before the main interface, once a day: how are you
 * arriving? The answer is folded into the astrological reading to choose the
 * day's practice.
 */
export function MoodGate({ onDone }: MoodGateProps) {
  useDayHue()
  const t = useT()
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
        {t('mood.eyebrow')}
      </p>
      <h1 className="mt-2 text-center font-serif text-[2rem] leading-tight text-gilded">
        {t('mood.title')}
      </h1>

      {transit && (
        <p className="mt-3 text-center text-sm leading-relaxed text-haze-300">
          {t('mood.skyLine', {
            title: transit.title,
            chakra: chakra
              ? t('mood.skyChakra', {
                  chakra: t(`chakra.${chakra.key}` as MessageKey),
                })
              : '',
          })}
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
                {t(`mood.${m}` as MessageKey)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 min-h-[3rem] text-center">
        {mood && (
          <p className="animate-rise-in text-sm leading-relaxed text-haze-300">
            {t('mood.you', {
              mood: t(`mood.${mood}` as MessageKey),
              preview: t(`mood.preview.${mood}` as MessageKey),
            })}
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
        {t('mood.enter')}
      </button>
      <button
        type="button"
        onClick={commit}
        className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
      >
        {t('mood.skipToday')}
      </button>
    </div>
  )
}
