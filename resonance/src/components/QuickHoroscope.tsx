import { useAppStore } from '../store/useAppStore'
import { buildQuickHoroscope } from '../lib/horoscope'
import { useT } from '../lib/i18n'

interface QuickHoroscopeProps {
  /** Opens the full (Pro) horoscope. */
  onOpenFull: () => void
  isPro: boolean
  className?: string
}

/** The free quick read — synthesised from every transit. Deep horoscope is Pro. */
export function QuickHoroscope({
  onOpenFull,
  isPro,
  className = '',
}: QuickHoroscopeProps) {
  const t = useT()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)

  if (!transit || !chakra) return null

  const q = buildQuickHoroscope(
    {
      transit,
      chakra,
      crystals,
      aspects,
      sky,
      hasNatal,
      suggestedPattern,
    },
    t,
  )

  return (
    <section className={`glass-panel p-4 ${className}`}>
      <p className="eyebrow">{t('scr.quick.eyebrow')}</p>

      <p className="mt-2.5 text-sm leading-relaxed text-haze-100">{q.weather}</p>

      {q.notes.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2.5">
          {q.notes.map((n) => (
            <li key={n.label}>
              <p className="text-[13px] font-semibold leading-tight text-white">
                {n.label}
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-haze-300">
                {n.text}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-col gap-1.5 border-t border-white/[0.07] pt-3">
        <p className="text-[13px] leading-snug text-haze-200">
          <span className="me-2 text-[10px] uppercase tracking-[0.16em] text-haze-400">
            {t('scr.quick.you')}
          </span>
          {q.body}
        </p>
        {q.moon && (
          <p className="text-[13px] leading-snug text-haze-200">
            <span className="me-2 text-[10px] uppercase tracking-[0.16em] text-haze-400">
              {t('scr.quick.moon')}
            </span>
            {q.moon}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenFull}
        className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        {isPro ? t('scr.quick.readFull') : t('scr.quick.fullPro')}
      </button>
    </section>
  )
}
