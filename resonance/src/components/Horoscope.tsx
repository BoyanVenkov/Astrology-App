import { useAppStore } from '../store/useAppStore'
import { buildHoroscope } from '../lib/horoscope'
import { clockHM, geoContext } from '../lib/geo'
import { chakraColor } from '../lib/resonanceData'

interface HoroscopeProps {
  onBack: () => void
}

export function Horoscope({ onBack }: HoroscopeProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const profile = useAppStore((s) => s.profile)
  const editProfile = useAppStore((s) => s.editProfile)

  if (!transit || !chakra) return null

  const geo = geoContext(profile)

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
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        ‹ Back
      </button>

      <header className="px-1">
        <p className="eyebrow">Daily Horoscope</p>
        <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
          {transit.title}
        </h1>
        <p className="mt-1 text-sm text-haze-300">{horoscope.greeting}</p>
      </header>

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
        <p className="eyebrow">Where you are</p>
        {geo.hasLocation && (
          <p className="mt-2 text-sm text-haze-300">
            {geo.season} · sun {clockHM(geo.sunrise)}–{clockHM(geo.sunset)}
            {geo.dayLengthHours != null &&
              ` · ${geo.dayLengthHours.toFixed(1)} h of light`}
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
            Add a birth place for local sun times →
          </button>
        )}
      </section>

      <section className="glass-panel glass-panel-active p-5">
        <p className="eyebrow">Today’s practice</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-100">
          {horoscope.practice}
        </p>
        {horoscope.affirmation && (
          <p className="mt-3 font-serif text-lg text-gilded">
            “{horoscope.affirmation}”
          </p>
        )}
      </section>
    </div>
  )
}
