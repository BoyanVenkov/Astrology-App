import { useAppStore } from '../store/useAppStore'
import { buildHoroscope } from '../lib/horoscope'
import { clockHM, geoContext } from '../lib/geo'
import { chakraColor } from '../lib/resonanceData'
import { Screen } from './Screen'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from '../types/resonance'

interface HoroscopeProps {
  onBack: () => void
  onRitual: (preset: RitualPreset) => void
}

const ORD = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
const ordinal = (n: number): string => ORD[n] ?? `${n}th`

export function Horoscope({ onBack, onRitual }: HoroscopeProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const profile = useAppStore((s) => s.profile)
  const currentLocation = useAppStore((s) => s.currentLocation)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const nowAngles = useAppStore((s) => s.nowAngles)
  const editProfile = useAppStore((s) => s.editProfile)

  if (!transit || !chakra) return null

  const geo = geoContext(profile, currentLocation)
  const dominantBody = transit.body
  const dominantHouse = transitHouses[dominantBody as keyof typeof transitHouses]
  const risingNow =
    nowAngles != null
      ? [
          'Aries',
          'Taurus',
          'Gemini',
          'Cancer',
          'Leo',
          'Virgo',
          'Libra',
          'Scorpio',
          'Sagittarius',
          'Capricorn',
          'Aquarius',
          'Pisces',
        ][Math.floor(nowAngles.ascendant / 30)]
      : null

  const horoscope = buildHoroscope({
    transit,
    chakra,
    crystals,
    aspects,
    sky,
    hasNatal,
    suggestedPattern,
  })
  const accent = chakraColor(chakra.key)

  return (
    <Screen
      eyebrow="Daily Horoscope"
      title={transit.title}
      subtitle={horoscope.greeting}
      onBack={onBack}
    >

      <section className="glass-panel p-5">
        <p className="text-sm leading-relaxed text-haze-200">
          {horoscope.overview}
        </p>
        {!hasNatal && (
          <button
            type="button"
            onClick={editProfile}
            className="mt-3 text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            Add birth details →
          </button>
        )}
      </section>

      {horoscope.sections.map((section) => (
        <section key={section.heading} className="glass-panel p-4">
          <p
            className="font-serif text-lg text-white"
            style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 10 }}
          >
            {section.heading}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-haze-200">
            {section.body}
          </p>
        </section>
      ))}

      {horoscope.moon && (
        <section className="glass-panel p-4">
          <p className="eyebrow">The Moon</p>
          <p className="mt-2 text-sm leading-relaxed text-haze-200">
            {horoscope.moon}
          </p>
        </section>
      )}

      <section className="glass-panel p-4">
        <p className="eyebrow">The sky above you</p>
        {risingNow && (
          <p className="mt-2 text-sm text-haze-200">
            {risingNow} is rising over you right now.
          </p>
        )}
        {dominantHouse && (
          <p className="mt-1 text-sm text-haze-200">
            {dominantBody} is transiting your {ordinal(dominantHouse)} house.
          </p>
        )}
        {geo.hasLocation && (
          <p className="mt-2 text-sm text-haze-300">
            {geo.season} · sun {clockHM(geo.sunrise)}–{clockHM(geo.sunset)}
            {geo.dayLengthHours != null &&
              ` · ${geo.dayLengthHours.toFixed(1)} h of light`}
            {geo.source === 'birth' && ' · using your birth place'}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {geo.grounding}
        </p>
        {!geo.hasLocation && (
          <button
            type="button"
            onClick={editProfile}
            className="mt-2 text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            Add a birth place, or share your location in Settings →
          </button>
        )}
      </section>

      <section className="glass-panel glass-panel-active p-5">
        <p className="eyebrow">Today’s practice</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-100">
          {horoscope.practice}
        </p>
        <div className="mt-4">
          <TodaysPractice variant="inline" onLaunch={onRitual} />
        </div>
      </section>
    </Screen>
  )
}
