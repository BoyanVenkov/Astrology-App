import { BREATH_PATTERNS } from '../lib/breathwork'
import { usePrescription } from '../lib/prescription'
import { useT } from '../lib/i18n'
import { LockIcon } from './icons'
import type { RitualPreset } from '../types/resonance'
import artMeditate from '../assets/art/icon-meditate.webp'
import artBreathe from '../assets/art/icon-breathe.webp'
import artFrequency from '../assets/art/icon-frequency.webp'

interface TodaysPracticeProps {
  onLaunch: (preset: RitualPreset) => void
  /** Locked (free tier, today's pick happens to be Pro) opens the paywall instead. */
  onUpgrade: (reason?: string) => void
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
  onUpgrade,
  variant = 'full',
  showDirective = true,
  className = '',
}: TodaysPracticeProps) {
  const t = useT()
  const rx = usePrescription()
  const breathMin = midOf(BREATH_PATTERNS[rx.breathPattern].durations, 6)

  const options: {
    key: string
    label: string
    sub: string
    accent: boolean
    locked: boolean
    reason?: string
    preset: RitualPreset
  }[] = [
    {
      key: 'meditation',
      label: t('tp.meditate'),
      sub: t('tp.min', { n: rx.minutes }),
      accent: !rx.urgent,
      // today's recommended meditation is always free, regardless of which
      // style it happens to be — same carve-out as the frequency option below
      locked: false,
      reason: t('lib.reasonMed'),
      preset: {
        mode: 'meditation',
        minutes: rx.minutes,
        meditationStyle: rx.meditationStyle,
        personalised: true,
      },
    },
    {
      key: 'breath',
      label: t('tp.breathe'),
      sub: rx.breathRatio,
      accent: rx.urgent,
      // today's recommended breath pattern is always free, same carve-out
      locked: false,
      reason: t('lib.reasonBreath'),
      preset: {
        mode: 'breath',
        minutes: breathMin,
        breathPattern: rx.breathPattern,
        personalised: true,
      },
    },
    {
      key: 'frequency',
      label: t('tp.frequency'),
      sub: `${rx.frequency} Hz`,
      accent: false,
      // today's recommended frequency is always free (Ritual.tsx's own picker
      // carves out the current recommendation regardless of tier)
      locked: false,
      preset: {
        mode: 'frequency',
        minutes: Math.max(10, rx.minutes),
        frequency: rx.frequency,
        personalised: true,
      },
    },
  ]

  const ART: Record<string, string> = {
    meditation: artMeditate,
    breath: artBreathe,
    frequency: artFrequency,
  }

  const buttons = (
    <div className="relative grid grid-cols-3 divide-x divide-white/10 overflow-visible pt-3">
      {options.map((o) => {
        const showAccent = o.accent && !o.locked
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => (o.locked ? onUpgrade(o.reason) : onLaunch(o.preset))}
            className={`card-press relative flex flex-col items-center gap-2 px-1 pt-1 ${o.locked ? 'opacity-60' : ''}`}
          >
            <span className="relative mb-0.5 grid h-20 w-20 place-items-center">
              {showAccent && (
                <span
                  aria-hidden
                  className="absolute h-16 w-16 rounded-full blur-xl"
                  style={{
                    background: 'radial-gradient(circle, var(--rz-hue) 0%, transparent 72%)',
                    opacity: 0.55,
                  }}
                />
              )}
              <img
                src={ART[o.key]}
                alt=""
                aria-hidden
                className="relative h-16 w-16 object-contain"
                style={{
                  filter: showAccent
                    ? 'drop-shadow(0 10px 12px rgba(0,0,0,0.5))'
                    : 'saturate(0.65) brightness(0.82) drop-shadow(0 8px 10px rgba(0,0,0,0.45))',
                }}
              />
              {o.locked && (
                <LockIcon className="absolute end-0 top-0 h-3.5 w-3.5 text-haze-400" />
              )}
            </span>
            <span className="eyebrow">{o.label}</span>
            <span className="data text-sm text-haze-200">{o.sub}</span>
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
      className={`glass-panel glass-panel-active animate-bloom-in p-4.5 ${className}`}
      style={{ boxShadow: '0 0 36px -12px var(--rz-glow)' }}
    >
      <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
        {rx.urgent ? t('tp.restoreFirst') : t('tp.today')}
      </p>
      {showDirective && (
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-haze-200">
          {rx.directive}
        </p>
      )}
      <div className="mt-3.5">{buttons}</div>
    </section>
  )
}
