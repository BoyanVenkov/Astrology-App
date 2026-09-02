import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { clockHM } from '../lib/geo'
import { moonVoidOfCourseCached, upcomingMoonPhases } from '../lib/lunar'
import { bodyPosition } from '../lib/ephemeris'
import {
  phaseLabel,
  signLabel,
  useLocaleTag,
  useT,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { FastingCard } from './FastingCard'
import { Screen } from './Screen'

interface MoonScreenProps {
  onBack: () => void
  onOpenFasting: () => void
}

const PHASE_NAME: Record<string, string> = {
  new: 'New Moon',
  'first-quarter': 'First Quarter',
  full: 'Full Moon',
  'last-quarter': 'Last Quarter',
}

export function MoonScreen({ onBack, onOpenFasting }: MoonScreenProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const transit = useAppStore((s) => s.transit)

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 300_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 300_000)),
      300_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const now = useMemo(() => new Date(bucket * 300_000), [bucket])
  const voc = useMemo(() => moonVoidOfCourseCached(now), [now])
  const phases = useMemo(() => upcomingMoonPhases(now, 3), [now])
  const moonSign = useMemo(() => bodyPosition('Moon', now).sign, [now])

  const fmtDay = (d: Date): string =>
    d.toLocaleDateString(localeTag, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

  if (!transit) return null

  return (
    <Screen
      eyebrow={t('scr.moon.eyebrow')}
      title={t('scr.moon.title')}
      subtitle={t('scr.moon.sub', {
        phase: phaseLabel(transit.moonPhase, t),
        pct: transit.illumination,
      })}
      onBack={onBack}
    >
      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.moon.whereShe')}</p>
        <p className="mt-2 text-sm text-haze-200">
          {t('scr.moon.inSign', {
            sign: signLabel(moonSign, t),
            note: t(`horo.moonSign.${moonSign}` as MessageKey),
          })}
        </p>
        {voc.active ? (
          <p className="mt-2 text-sm text-amber-300">
            {t('scr.moon.vocUntil', {
              sign: voc.nextSign ? signLabel(voc.nextSign, t) : '',
              time: voc.until
                ? t('scr.moon.vocAt', { time: clockHM(voc.until) })
                : '',
            })}
          </p>
        ) : voc.hoursUntil != null && voc.hoursUntil < 12 ? (
          <p className="mt-2 text-sm text-amber-300/90">
            {t('scr.moon.vocSoon', { hours: voc.hoursUntil.toFixed(1) })}
          </p>
        ) : (
          <p className="mt-2 text-sm text-haze-400">{t('scr.moon.notVoc')}</p>
        )}
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.moon.comingUp')}</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-haze-200">
          {phases.map((p) => (
            <li key={p.kind} className="flex justify-between">
              <span>{phaseLabel(PHASE_NAME[p.kind] ?? p.kind, t)}</span>
              <span className="data text-xs text-haze-400">{fmtDay(p.at)}</span>
            </li>
          ))}
        </ul>
      </section>

      <FastingCard onOpenGuide={onOpenFasting} />
    </Screen>
  )
}
