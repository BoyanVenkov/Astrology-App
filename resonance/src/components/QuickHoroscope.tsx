import { useAppStore } from '../store/useAppStore'
import { buildQuickHoroscope } from '../lib/horoscope'

interface QuickHoroscopeProps {
  /** Opens the full (Pro) horoscope. */
  onOpenFull: () => void
  isPro: boolean
  className?: string
}

/** The free three-line read of the day. The deep multi-section horoscope is Pro. */
export function QuickHoroscope({
  onOpenFull,
  isPro,
  className = '',
}: QuickHoroscopeProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)

  if (!transit || !chakra) return null

  const q = buildQuickHoroscope({
    transit,
    chakra,
    crystals,
    aspects,
    sky,
    hasNatal,
    suggestedPattern,
  })

  const lines: { label: string; text: string }[] = [
    { label: 'Sky', text: q.sky },
    { label: 'You', text: q.body },
    ...(q.moon ? [{ label: 'Moon', text: q.moon }] : []),
  ]

  return (
    <section className={`glass-panel p-4 ${className}`}>
      <p className="eyebrow">Today’s horoscope</p>
      <div className="mt-3 flex flex-col gap-2.5">
        {lines.map((l) => (
          <p key={l.label} className="text-sm leading-relaxed text-haze-200">
            <span
              className="mr-2 text-[10px] uppercase tracking-[0.16em] text-haze-400"
              aria-hidden
            >
              {l.label}
            </span>
            {l.text}
          </p>
        ))}
      </div>
      <button
        type="button"
        onClick={onOpenFull}
        className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        {isPro ? 'Read it in full →' : 'The full reading · Pro →'}
      </button>
    </section>
  )
}
