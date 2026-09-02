import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { clockHM, geoContext } from '../lib/geo'
import { SIGNS } from '../lib/ephemeris'
import {
  houseArena,
  ordinal,
  planetLabel,
  signLabel,
  transitTitle,
  useT,
} from '../lib/i18n'
import { Screen } from './Screen'

interface TransitsProps {
  onBack: () => void
}

const ASPECT_GLYPH: Record<string, string> = {
  conjunction: '☌︎',
  opposition: '☍︎',
  square: '□︎',
  trine: '△︎',
  sextile: '⚹︎',
}

export function Transits({ onBack }: TransitsProps) {
  const t = useT()
  const transit = useAppStore((s) => s.transit)
  const aspects = useAppStore((s) => s.aspects)
  const nowAngles = useAppStore((s) => s.nowAngles)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const profile = useAppStore((s) => s.profile)
  const currentLocation = useAppStore((s) => s.currentLocation)
  const editProfile = useAppStore((s) => s.editProfile)

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 120_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 120_000)),
      120_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const now = useMemo(() => new Date(bucket * 120_000), [bucket])
  const geo = useMemo(
    () => geoContext(profile, currentLocation, now),
    [profile, currentLocation, now],
  )

  if (!transit) return null

  const risingNow =
    nowAngles != null ? SIGNS[Math.floor(nowAngles.ascendant / 30) % 12] : null
  const dominantHouse = (transitHouses as Record<string, number>)[transit.body]

  return (
    <Screen
      eyebrow={t('scr.transits.eyebrow')}
      title={
        hasNatal ? t('scr.transits.titleNatal') : t('scr.transits.titleSky')
      }
      subtitle={transitTitle(transit, t)}
      onBack={onBack}
      action={
        hasNatal ? undefined : (
          <button
            type="button"
            onClick={editProfile}
            className="text-[10px] uppercase tracking-[0.14em] text-gold-300"
          >
            {t('scr.transits.addChart')}
          </button>
        )
      }
    >
      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.transits.nowHead')}</p>
        {risingNow && (
          <p className="mt-2 text-sm text-haze-200">
            {t('scr.transits.rising', {
              sign: signLabel(risingNow, t),
            })}
          </p>
        )}
        {hasNatal && dominantHouse && (
          <p className="mt-1 text-sm text-haze-200">
            {t('scr.transits.movingHouse', {
              planet: planetLabel(transit.body, t),
              ord: ordinal(dominantHouse, t),
              arena: houseArena(dominantHouse, t),
            })}
          </p>
        )}
        {geo.hasLocation && (
          <p className="data mt-2 text-xs text-haze-400">
            {t('scr.transits.sunMoon', {
              sunrise: clockHM(geo.sunrise),
              sunset: clockHM(geo.sunset),
              moonrise: clockHM(geo.moonrise),
              moonset: clockHM(geo.moonset),
            })}
            {geo.source === 'birth' ? ` · ${t('scr.transits.birthPlace')}` : ''}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {t(geo.groundingKey)}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">
          {hasNatal
            ? t('scr.transits.allInOrb')
            : t('scr.transits.moonAspects')}
        </p>
        {aspects.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {aspects.map((a) => (
              <li
                key={`${a.transiting}-${a.other}-${a.def.name}`}
                className="flex items-center justify-between"
              >
                <span className="text-haze-100">
                  {planetLabel(a.transiting, t)}{' '}
                  <span aria-hidden>{ASPECT_GLYPH[a.def.name] ?? '·'}</span>{' '}
                  {hasNatal ? t('scr.transits.natalPrefix') : ''}
                  {planetLabel(a.other, t)}
                </span>
                <span className="data shrink-0 whitespace-nowrap text-xs text-haze-400">
                  {a.orbDelta.toFixed(1)}°{' '}
                  <span aria-hidden>{a.applying ? '↑' : '↓'}</span>
                  <span className="sr-only">
                    {a.applying
                      ? t('scr.transits.applying')
                      : t('scr.transits.separating')}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-haze-400">
            {t('scr.transits.nothingOrb')}
          </p>
        )}
        <p className="mt-3 text-[11px] leading-relaxed text-haze-500">
          {t('scr.transits.orbNote')}
        </p>
      </section>
    </Screen>
  )
}
