import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { clockHM, geoContext } from '../lib/geo'
import { moonVoidOfCourseCached, upcomingMoonPhases } from '../lib/lunar'
import { chakraName, zodiacGlyph } from '../lib/resonanceData'
import { planetSymbol } from '../data/esoteric'
import { SIGNS } from '../lib/ephemeris'
import { useEntitlements } from '../lib/premium'
import { CardsIcon, LockIcon } from './icons'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset, TabKey } from '../types/resonance'

interface SkyViewProps {
  onTab: (tab: TabKey) => void
  onOpenChart: () => void
  onOpenHoroscope: () => void
  onOpenStones: () => void
  onRitual: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
}

// Trailing U+FE0E keeps these as flat text glyphs, not colour emoji.
const ASPECT_GLYPH: Record<string, string> = {
  conjunction: '☌︎',
  opposition: '☍︎',
  square: '□︎',
  trine: '△︎',
  sextile: '⚹︎',
}

const PHASE_LABEL: Record<string, string> = {
  new: 'New Moon',
  'first-quarter': 'First Quarter',
  full: 'Full Moon',
  'last-quarter': 'Last Quarter',
}

const fmtDay = (d: Date): string =>
  d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

export function SkyView({
  onTab,
  onOpenChart,
  onOpenHoroscope,
  onOpenStones,
  onRitual,
  onUpgrade,
}: SkyViewProps) {
  const { isPro } = useEntitlements()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const aspects = useAppStore((s) => s.aspects)
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const sky = useAppStore((s) => s.sky)
  const nowAngles = useAppStore((s) => s.nowAngles)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const profile = useAppStore((s) => s.profile)
  const currentLocation = useAppStore((s) => s.currentLocation)

  // re-evaluate the time-sensitive sky data every couple of minutes
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
  const voc = useMemo(() => moonVoidOfCourseCached(now), [now])
  const phases = useMemo(() => upcomingMoonPhases(now, 2), [now])

  const focusPlanet = sky.find((p) => p.body === transit?.body)
  const risingNow =
    nowAngles != null ? SIGNS[Math.floor(nowAngles.ascendant / 30) % 12] : null
  const dominantHouse: number | undefined = transit
    ? (transitHouses as Record<string, number>)[transit.body]
    : undefined

  if (!transit || !chakra) return null

  return (
    <div className="flex flex-col gap-4">
      <header className="px-1">
        <p className="eyebrow">The Sky</p>
        <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
          {transit.body} <span aria-hidden>{planetSymbol(transit.body)}</span>
          {focusPlanet?.retrograde && (
            <span className="ml-1 align-super text-sm text-haze-300">℞</span>
          )}
          <span className="text-haze-400"> · </span>
          {chakraName(chakra.key)}
        </h1>
        <p className="mt-1 text-sm text-haze-300">{transit.title}</p>
      </header>

      {/* practise this sky */}
      <TodaysPractice variant="full" showDirective={false} onLaunch={onRitual} />

      {/* right now over you */}
      <section className="glass-panel p-4">
        <p className="eyebrow">Right now, above you</p>
        {risingNow && (
          <p className="mt-2 text-sm text-haze-200">
            <span className="text-white">{risingNow}</span> is rising
          </p>
        )}
        {hasNatal && dominantHouse && (
          <p className="mt-1 text-sm text-haze-200">
            {transit.body} moving through your {ordinal(dominantHouse)} house
          </p>
        )}
        {geo.hasLocation && (
          <p className="mt-2 text-sm text-haze-400">
            Sun {clockHM(geo.sunrise)}–{clockHM(geo.sunset)} · Moon{' '}
            {clockHM(geo.moonrise)}–{clockHM(geo.moonset)}
            {geo.source === 'birth' && ' · birth place'}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {geo.grounding}
        </p>
      </section>

      {/* moon */}
      <section className="glass-panel p-4">
        <p className="eyebrow">The Moon</p>
        <p className="mt-2 text-sm text-haze-200">
          {transit.moonPhase} · {transit.illumination}% lit · in {voc.currentSign}
        </p>
        {voc.active ? (
          <p className="mt-1 text-sm text-amber-300">
            Void of course until it enters {voc.nextSign}
            {voc.until ? ` at ${clockHM(voc.until)}` : ''} — ground, don’t begin.
          </p>
        ) : voc.hoursUntil != null && voc.hoursUntil < 12 ? (
          <p className="mt-1 text-sm text-amber-300/90">
            Goes void of course in {voc.hoursUntil.toFixed(1)} h
          </p>
        ) : null}
        <ul className="mt-2 flex flex-col gap-1 text-xs text-haze-400">
          {phases.map((p) => (
            <li key={p.kind}>
              {PHASE_LABEL[p.kind]} · {fmtDay(p.at)}
            </li>
          ))}
        </ul>
      </section>

      {/* transits */}
      <section className="glass-panel p-4">
        <p className="eyebrow">
          {hasNatal ? 'Transits to your chart' : 'The Moon’s aspects today'}
        </p>
        {aspects.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {aspects.slice(0, 6).map((a) => (
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
          <p className="mt-3 text-sm text-haze-400">No aspects within orb.</p>
        )}
      </section>

      {/* go deeper */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={
            isPro ? onOpenHoroscope : () => onUpgrade('Your full daily horoscope')
          }
          className="glass-panel p-4 text-left active:scale-[0.99]"
        >
          <span className="flex items-center gap-1.5 font-serif text-base leading-tight text-white">
            Full horoscope
            {!isPro && <LockIcon className="h-3.5 w-3.5 text-haze-400" />}
          </span>
          <span className="block text-xs text-haze-300">
            {isPro ? 'Today, in detail' : 'Today, in depth · Pro'}
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenChart}
          className="glass-panel p-4 text-left active:scale-[0.99]"
        >
          <span className="font-serif text-base leading-tight text-white">
            {hasNatal ? 'Natal chart' : 'Birth chart'}
          </span>
          <span className="block text-xs text-haze-300">
            {hasNatal ? 'Your birth sky' : 'Add your details'}{' '}
            <span aria-hidden>{zodiacGlyph(transit.sign)}</span>
          </span>
        </button>
        {dailyCrystals.length > 0 && (
          <button
            type="button"
            onClick={onOpenStones}
            className="glass-panel flex items-center gap-2 p-4 text-left active:scale-[0.99]"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{
                background: dailyCrystals[0].color,
                boxShadow: `0 0 10px ${dailyCrystals[0].color}`,
              }}
            />
            <span className="min-w-0">
              <span className="block font-serif text-base leading-tight text-white">Stones</span>
              <span className="block truncate text-xs text-haze-300">
                {dailyCrystals
                  .slice(0, 2)
                  .map((c) => c.name)
                  .join(' · ')}
              </span>
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={() => onTab('tarot')}
          className="glass-panel flex items-center gap-2 p-4 text-left active:scale-[0.99]"
        >
          <CardsIcon className="h-5 w-5 shrink-0" style={{ color: 'var(--rz-hue)' }} />
          <span className="min-w-0">
            <span className="block font-serif text-base leading-tight text-white">Tarot</span>
            <span className="block text-xs text-haze-300">Today’s card & spreads</span>
          </span>
        </button>
      </div>
    </div>
  )
}

const ORD = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
const ordinal = (n: number): string => ORD[n] ?? `${n}th`
