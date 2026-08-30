import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { drawDailyReading, type OracleMotif } from '../lib/oracle'
import { chakraColor, chakraName } from '../lib/resonanceData'
import { localDayKey } from '../lib/timezone'
import { ResonanceMark } from './Logo'

interface OracleReaderProps {
  onBack: () => void
  onPractice?: () => void
}

/* ------------------------------------------------------------- card glyphs */

const glyphBase = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function OracleGlyph({
  motif,
  className,
}: {
  motif: OracleMotif
  className?: string
}) {
  switch (motif) {
    case 'star':
      return (
        <svg {...glyphBase} className={className}>
          <path
            d="M20 6c1.6 8 5.6 12 14 14-8.4 2-12.4 6-14 14-1.6-8-5.6-12-14-14 8.4-2 12.4-6 14-14Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )
    case 'orbit':
      return (
        <svg {...glyphBase} className={className}>
          <ellipse cx="20" cy="20" rx="15" ry="7" transform="rotate(-20 20 20)" />
          <circle cx="33" cy="14" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'crescent':
      return (
        <svg {...glyphBase} className={className}>
          <path
            d="M24 6a14 14 0 1 0 0 28 11 11 0 0 1 0-28Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )
    case 'ascend':
      return (
        <svg {...glyphBase} className={className}>
          <path d="M20 7 33 31H7Z" />
        </svg>
      )
    case 'descend':
      return (
        <svg {...glyphBase} className={className}>
          <path d="M7 9h26L20 33Z" />
        </svg>
      )
    case 'nested':
      return (
        <svg {...glyphBase} className={className}>
          <circle cx="20" cy="20" r="6" />
          <circle cx="20" cy="20" r="11" />
          <circle cx="20" cy="20" r="16" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...glyphBase} className={className}>
          <path d="M20 4v32M4 20h32M8.5 8.5l23 23M31.5 8.5l-23 23" />
        </svg>
      )
    case 'wave':
      return (
        <svg {...glyphBase} className={className}>
          <path d="M4 20q6-12 12 0t12 0" />
        </svg>
      )
    case 'gate':
      return (
        <svg {...glyphBase} className={className}>
          <path d="M8 34V18a12 12 0 0 1 24 0v16" />
        </svg>
      )
    case 'tide':
      return (
        <svg {...glyphBase} className={className}>
          <path d="M4 16q6-9 12 0t12 0M4 26q6-9 12 0t12 0" />
        </svg>
      )
    default:
      return null
  }
}

/* ----------------------------------------------------------------- reader */

export function OracleReader({ onBack, onPractice }: OracleReaderProps) {
  const profile = useAppStore((s) => s.profile)
  const transit = useAppStore((s) => s.transit)
  const revealedDay = useAppStore((s) => s.oracleRevealedDay)
  const revealOracle = useAppStore((s) => s.revealOracle)

  const reading = useMemo(
    () => drawDailyReading(profile, transit),
    [profile, transit],
  )
  const [revealed, setRevealed] = useState(revealedDay === localDayKey())

  const turn = () => {
    setRevealed(true)
    revealOracle()
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        ‹ Back
      </button>

      <header className="px-1">
        <p className="eyebrow">Natal Oracle</p>
        <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
          {revealed ? 'Your cards for today' : 'Draw your cards'}
        </h1>
        <p className="mt-1 text-sm text-haze-300">
          {reading.fromNatal
            ? 'Three cards, drawn from your birth chart and today’s sky.'
            : 'Three cards, drawn from today’s sky. Add your birth details for a chart-tuned draw.'}
        </p>
      </header>

      {!revealed ? (
        <div className="glass-panel flex flex-col items-center gap-6 p-6">
          <div className="flex items-end justify-center gap-3">
            {reading.cards.map(({ card }, i) => (
              <div
                key={card.id}
                className="grid h-32 w-[4.75rem] place-items-center rounded-2xl border border-dashed"
                style={{
                  borderColor:
                    'color-mix(in srgb, var(--rz-hue) 42%, transparent)',
                  background: 'color-mix(in srgb, var(--rz-hue) 8%, #05070f)',
                  transform: `rotate(${(i - 1) * 6}deg) translateY(${
                    i === 1 ? -8 : 0
                  }px)`,
                }}
              >
                <ResonanceMark
                  className="h-7 w-7"
                  style={{ color: 'var(--rz-hue)', opacity: 0.5 }}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={turn}
            className="rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight-void transition active:scale-[0.98]"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--rz-hue) 80%, #fff 15%), var(--rz-hue))',
            }}
          >
            Turn the cards
          </button>
          <p className="text-center text-xs text-haze-500">
            One draw a day. Your cards renew at midnight.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {reading.cards.map(({ position, card }, i) => {
              const tint = chakraColor(card.chakra)
              return (
                <article
                  key={card.id}
                  className="glass-panel animate-rise-in p-5"
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="eyebrow">{position.label}</p>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-haze-500">
                      {position.prompt}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border"
                      style={{
                        color: tint,
                        borderColor: `color-mix(in srgb, ${tint} 45%, transparent)`,
                        background: `color-mix(in srgb, ${tint} 12%, transparent)`,
                      }}
                    >
                      <OracleGlyph motif={card.motif} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-serif text-xl leading-tight text-white">
                        {card.name}
                      </h2>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-haze-400">
                        {card.theme} · {chakraName(card.chakra)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-haze-100">
                    {card.message}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-haze-400">
                    <span className="text-haze-300">The edge · </span>
                    {card.shadow}
                  </p>
                </article>
              )
            })}
          </div>

          <p className="px-2 text-center text-xs text-haze-500">
            {reading.fromNatal
              ? 'Drawn from your chart and today’s sky.'
              : 'Drawn from today’s sky.'}{' '}
            These cards renew at midnight.
          </p>

          {onPractice && (
            <button
              type="button"
              onClick={onPractice}
              className="glass-panel p-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-haze-200 active:scale-[0.99]"
            >
              Take this into practice
            </button>
          )}
        </>
      )}
    </div>
  )
}
