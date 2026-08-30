import { BREATH_PATTERNS } from '../lib/breathwork'
import { usePrescription } from '../lib/prescription'
import { BreathIcon, FrequenciesIcon, PlayIcon } from './icons'
import type { RitualPreset } from '../types/resonance'

interface TodaysPracticeProps {
  onLaunch: (preset: RitualPreset) => void
  /** `full` wraps it in a glass panel with a heading; `inline` is just the buttons. */
  variant?: 'full' | 'inline'
  /** Show the composed one-line directive (only meaningful for `full`). */
  showDirective?: boolean
  className?: string
}

const midOf = (arr: number[], fallback: number): number =>
  arr.length ? (arr[Math.floor(arr.length / 2)] ?? arr[0]) : fallback

/**
 * The day's personalised practice, tuned to the current transit — one tap to
 * start it as a meditation, a breath session, or a frequency sit. Dropped into
 * every screen where "what should I do about this sky" is a natural question.
 */
export function TodaysPractice({
  onLaunch,
  variant = 'full',
  showDirective = true,
  className = '',
}: TodaysPracticeProps) {
  const rx = usePrescription()
  const breathMin = midOf(BREATH_PATTERNS[rx.breathPattern].durations, 6)

  const options: {
    key: string
    label: string
    sub: string
    accent: boolean
    preset: RitualPreset
  }[] = [
    {
      key: 'meditation',
      label: 'Meditate',
      sub: `${rx.minutes} min`,
      accent: !rx.urgent,
      preset: { mode: 'meditation', minutes: rx.minutes },
    },
    {
      key: 'breath',
      label: 'Breathe',
      sub: rx.breathRatio,
      accent: rx.urgent,
      preset: { mode: 'breath', minutes: breathMin },
    },
    {
      key: 'frequency',
      label: 'Frequency',
      sub: `${rx.frequency} Hz`,
      accent: false,
      preset: { mode: 'frequency', minutes: 12 },
    },
  ]

  const Icon = (key: string) =>
    key === 'breath'
      ? BreathIcon
      : key === 'frequency'
        ? FrequenciesIcon
        : PlayIcon

  const buttons = (
    <div className="grid grid-cols-3 gap-2">
      {options.map((o) => {
        const I = Icon(o.key)
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onLaunch(o.preset)}
            className={`flex flex-col items-center gap-1 rounded-2xl border px-1.5 py-3 text-center transition active:scale-[0.97] ${
              o.accent
                ? 'border-transparent text-midnight-void'
                : 'border-white/12 bg-white/5 text-haze-100'
            }`}
            style={
              o.accent
                ? {
                    background:
                      'linear-gradient(180deg, color-mix(in srgb, var(--rz-hue) 80%, #fff 15%), var(--rz-hue))',
                  }
                : undefined
            }
          >
            <I className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em]">
              {o.label}
            </span>
            <span
              className={`text-[10px] tabular-nums ${o.accent ? 'text-midnight-void/70' : 'text-haze-400'}`}
            >
              {o.sub}
            </span>
          </button>
        )
      })}
    </div>
  )

  if (variant === 'inline') {
    return <div className={className}>{buttons}</div>
  }

  return (
    <section
      className={`glass-panel glass-panel-active p-4 ${className}`}
      style={{ boxShadow: '0 0 32px -12px var(--rz-glow)' }}
    >
      <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
        {rx.urgent ? 'Restore first' : 'Today’s practice'}
      </p>
      {showDirective && (
        <p className="mt-1.5 text-sm leading-relaxed text-haze-200">
          {rx.directive}
        </p>
      )}
      <div className="mt-3">{buttons}</div>
    </section>
  )
}
