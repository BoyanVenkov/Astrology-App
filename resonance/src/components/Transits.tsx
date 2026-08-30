import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { clockHM, geoContext } from '../lib/geo'
import { SIGNS } from '../lib/ephemeris'
import { HOUSE_ARENA, ORDINAL } from '../lib/astrology'
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
      eyebrow="The Sky"
      title={hasNatal ? 'Transits to your chart' : 'The sky today'}
      subtitle={transit.title}
      onBack={onBack}
      action={
        hasNatal ? undefined : (
          <button
            type="button"
            onClick={editProfile}
            className="text-[10px] uppercase tracking-[0.14em] text-gold-300"
          >
            Add chart
          </button>
        )
      }
    >
      <section className="glass-panel p-4">
        <p className="eyebrow">Right now, above you</p>
        {risingNow && (
          <p className="mt-2 text-sm text-haze-200">
            <span className="text-white">{risingNow}</span> is rising
          </p>
        )}
        {hasNatal && dominantHouse && HOUSE_ARENA[dominantHouse] && (
          <p className="mt-1 text-sm text-haze-200">
            {transit.body} is moving through your {ORDINAL[dominantHouse]} house —{' '}
            {HOUSE_ARENA[dominantHouse]}.
          </p>
        )}
        {geo.hasLocation && (
          <p className="data mt-2 text-xs text-haze-400">
            Sun {clockHM(geo.sunrise)}–{clockHM(geo.sunset)} · Moon{' '}
            {clockHM(geo.moonrise)}–{clockHM(geo.moonset)}
            {geo.source === 'birth' ? ' · birth place' : ''}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {geo.grounding}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">
          {hasNatal ? 'Every transit in orb' : 'The Moon’s aspects today'}
        </p>
        {aspects.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {aspects.map((a) => (
              <li
                key={`${a.transiting}-${a.other}-${a.def.name}`}
                className="flex items-center justify-between"
              >
                <span className="text-haze-100">
                  {a.transiting}{' '}
                  <span aria-hidden>{ASPECT_GLYPH[a.def.name] ?? '·'}</span>{' '}
                  {hasNatal ? 'natal ' : ''}
                  {a.other}
                </span>
                <span className="data shrink-0 whitespace-nowrap text-xs text-haze-400">
                  {a.orbDelta.toFixed(1)}°{' '}
                  <span aria-hidden>{a.applying ? '↑' : '↓'}</span>
                  <span className="sr-only">
                    {a.applying ? 'applying' : 'separating'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-haze-400">Nothing within orb today.</p>
        )}
        <p className="mt-3 text-[11px] leading-relaxed text-haze-500">
          ↑ still tightening toward exact · ↓ separating. Tighter orbs are felt
          more strongly.
        </p>
      </section>
    </Screen>
  )
}
