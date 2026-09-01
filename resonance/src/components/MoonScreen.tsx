import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { clockHM } from '../lib/geo'
import { moonVoidOfCourseCached, upcomingMoonPhases } from '../lib/lunar'
import { bodyPosition } from '../lib/ephemeris'
import { FastingCard } from './FastingCard'
import { Screen } from './Screen'

interface MoonScreenProps {
  onBack: () => void
  onOpenFasting: () => void
}

const PHASE_LABEL: Record<string, string> = {
  new: 'New Moon',
  'first-quarter': 'First Quarter',
  full: 'Full Moon',
  'last-quarter': 'Last Quarter',
}

const MOON_SIGN: Record<string, string> = {
  Aries: 'you want action and directness; patience is thin',
  Taurus: 'slow, sensory and steady — comfort matters',
  Gemini: 'curious and talkative, easily scattered',
  Cancer: 'tender and inward; home and care come first',
  Leo: 'warm and expressive, wanting to be seen',
  Virgo: 'precise and useful; tidy one small thing',
  Libra: 'seeking balance, beauty and fair company',
  Scorpio: 'deep, private and all-or-nothing',
  Sagittarius: 'restless for meaning and a bigger view',
  Capricorn: 'serious and goal-focused; do the hard thing',
  Aquarius: 'detached and inventive; think in systems',
  Pisces: 'dreamy, permeable and compassionate',
}

const fmtDay = (d: Date): string =>
  d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

export function MoonScreen({ onBack, onOpenFasting }: MoonScreenProps) {
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

  if (!transit) return null

  return (
    <Screen
      eyebrow="The Sky"
      title="The Moon"
      subtitle={`${transit.moonPhase} · ${transit.illumination}% lit`}
      onBack={onBack}
    >
      <section className="glass-panel p-4">
        <p className="eyebrow">Where she is</p>
        <p className="mt-2 text-sm text-haze-200">
          The Moon is in <span className="text-white">{moonSign}</span> —{' '}
          {MOON_SIGN[moonSign] ?? 'a shifting mood'}.
        </p>
        {voc.active ? (
          <p className="mt-2 text-sm text-amber-300">
            Void of course until it enters {voc.nextSign}
            {voc.until ? ` at ${clockHM(voc.until)}` : ''} — a poor window to
            start something new. Ground and tie off loose ends instead.
          </p>
        ) : voc.hoursUntil != null && voc.hoursUntil < 12 ? (
          <p className="mt-2 text-sm text-amber-300/90">
            Goes void of course in {voc.hoursUntil.toFixed(1)} h.
          </p>
        ) : (
          <p className="mt-2 text-sm text-haze-400">
            Not void of course — the Moon is making clean aspects.
          </p>
        )}
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">Coming up</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-haze-200">
          {phases.map((p) => (
            <li key={p.kind} className="flex justify-between">
              <span>{PHASE_LABEL[p.kind]}</span>
              <span className="data text-xs text-haze-400">{fmtDay(p.at)}</span>
            </li>
          ))}
        </ul>
      </section>

      <FastingCard onOpenGuide={onOpenFasting} />
    </Screen>
  )
}
