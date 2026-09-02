import { useMemo, useState } from 'react'
import {
  computeFasting,
  fastingSpecialLabel,
  type FastingVerdict,
  type MethodFit,
} from '../lib/fasting'
import { signLabel, useLocaleTag, useT } from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { Screen } from './Screen'

const VERDICT_COLOR: Record<FastingVerdict, string> = {
  favourable: '#6ee7b7',
  neutral: '#9aa6c9',
  'not-ideal': '#fb923c',
}

const FIT_COLOR: Record<MethodFit, string> = {
  good: '#6ee7b7',
  ok: '#9aa6c9',
  'not-today': '#fb923c',
}

interface FastingGuideProps {
  onBack: () => void
}

/** Free — the full fasting read: today's verdict, which method the sky backs, the days ahead. */
export function FastingGuide({ onBack }: FastingGuideProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const f = useMemo(() => computeFasting(new Date(), t), [t])
  const [openKey, setOpenKey] = useState<string | null>(f.pick.key)
  const tint = VERDICT_COLOR[f.verdict]

  const fitLabel = (fit: MethodFit): string =>
    t(`fast.fit.${fit}` as MessageKey)

  const fmtDay = (key: string): string => {
    const [y, m, d] = key.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString(localeTag, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Screen
      eyebrow={t('scr.horo.moonHead')}
      title={t('scr.fast.eyebrow')}
      subtitle={
        f.tithi.special
          ? t('scr.fast.guideSubSpecial', {
              special: fastingSpecialLabel(f.tithi.special, t) ?? '',
              sign: signLabel(f.moonSign, t),
            })
          : t('scr.fast.guideSubPhase', {
              phase: t(`scr.fast.phase.${f.tithi.phase}` as MessageKey),
              day: f.tithi.day,
            })
      }
      onBack={onBack}
    >
      <section className="glass-panel p-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{t('scr.fast.today')}</p>
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
        <p className="mt-2 text-sm leading-relaxed text-haze-200">{f.reason}</p>
        <p className="data mt-3 text-[11px] text-haze-400">
          {t('scr.fast.skyBacks', { method: f.pick.name })}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.fast.whichKind')}</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {t('scr.fast.whichKindBlurb')}
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {f.methods.map((m) => {
            const color = FIT_COLOR[m.fit]
            const label = fitLabel(m.fit)
            const open = openKey === m.key
            return (
              <li key={m.key}>
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? null : m.key)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-base leading-tight text-white">
                      {m.name}
                    </span>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
                      style={{
                        color,
                        boxShadow: `inset 0 0 0 1px ${color}55`,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <p className="data mt-1 text-[11px] text-haze-400">
                    {m.window}
                  </p>
                  {open && (
                    <div className="animate-rise-in mt-2">
                      <p className="text-sm leading-relaxed text-haze-200">
                        {m.what}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-haze-300">
                        <span style={{ color }}>{label}.</span> {m.why}
                      </p>
                    </div>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {f.upcoming.length > 0 && (
        <section className="glass-panel p-4">
          <p className="eyebrow">{t('scr.fast.betterDays')}</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            {f.upcoming.map((u) => (
              <li key={u.day} className="flex justify-between">
                <span className="text-haze-200">
                  {fastingSpecialLabel(u.special, t) ??
                    t('scr.fast.waningWindow')}
                </span>
                <span className="data text-xs text-haze-400">
                  {fmtDay(u.day)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.fast.holdingWell')}</p>
        <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-haze-200">
          <li>{t('scr.fast.hold1')}</li>
          <li>{t('scr.fast.hold2')}</li>
          <li>{t('scr.fast.hold3')}</li>
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-haze-500">
          {t('scr.fast.guideDisclaimer')}
        </p>
      </section>
    </Screen>
  )
}
