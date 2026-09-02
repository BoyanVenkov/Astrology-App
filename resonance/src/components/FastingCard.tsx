import { useMemo, useState } from 'react'
import { computeFasting, fastingSpecialLabel, type FastingVerdict } from '../lib/fasting'
import { signLabel, useLocaleTag, useT } from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'

const VERDICT_COLOR: Record<FastingVerdict, string> = {
  favourable: '#6ee7b7',
  neutral: '#9aa6c9',
  'not-ideal': '#fb923c',
}

interface FastingCardProps {
  /** Push the full fasting guide (methods, days ahead, how to hold it). */
  onOpenGuide?: () => void
}

/** Free — is today a good window to fast, read from the Moon. */
export function FastingCard({ onOpenGuide }: FastingCardProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const [open, setOpen] = useState(false)
  // computed once per locale — the verdict is a whole-day read
  const f = useMemo(() => computeFasting(new Date(), t), [t])
  const tint = VERDICT_COLOR[f.verdict]

  const fmtDay = (key: string): string => {
    const [y, m, d] = key.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString(localeTag, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const special =
    fastingSpecialLabel(f.tithi.special, t) ??
    t(`scr.fast.phase.${f.tithi.phase}` as MessageKey)

  return (
    <section className="glass-panel p-4">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{t('scr.fast.eyebrow')}</p>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: tint, boxShadow: `inset 0 0 0 1px ${tint}55` }}
        >
          {t(`fast.verdict.${f.verdict}` as MessageKey)}
        </span>
      </div>

      <p className="mt-2 font-serif text-lg leading-tight text-white">
        {f.label}
      </p>
      <p className="data mt-1 text-[11px] text-haze-400">
        {t('scr.fast.cardMeta', {
          special,
          day: f.tithi.day,
          sign: signLabel(f.moonSign, t),
        })}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-haze-200">{f.reason}</p>

      <p className="mt-2 text-sm text-haze-300">
        {t('scr.fast.bestToday')}{' '}
        <span className="text-white">{f.pick.name}</span>
        <span className="text-haze-500"> · {f.pick.window}</span>
      </p>

      {open && (
        <div className="animate-rise-in mt-3">
          <p className="text-sm leading-relaxed text-haze-300">{f.note}</p>
          {f.upcoming.length > 0 && (
            <>
              <p className="mt-3 eyebrow">{t('scr.fast.betterDays')}</p>
              <ul className="mt-1.5 flex flex-col gap-1 text-xs">
                {f.upcoming.map((u) => (
                  <li key={u.day} className="flex justify-between">
                    <span className="text-haze-200">
                      {fastingSpecialLabel(u.special, t) ??
                        t('scr.fast.waningWindow')}
                    </span>
                    <span className="data text-haze-400">{fmtDay(u.day)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-haze-500">
            {t('scr.fast.cardDisclaimer')}
          </p>
        </div>
      )}

      {onOpenGuide ? (
        <button
          type="button"
          onClick={onOpenGuide}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          {t('scr.fast.fiveKinds')}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          {open ? t('scr.fast.less') : t('scr.fast.howHold')} →
        </button>
      )}
    </section>
  )
}
