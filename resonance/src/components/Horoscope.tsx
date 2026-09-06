import { useAppStore } from '../store/useAppStore'
import { buildHoroscope } from '../lib/horoscope'
import { clockHM, geoContext } from '../lib/geo'
import {
  ordinal,
  seasonLabel,
  signLabel,
  planetLabel,
  transitTitle,
  useT,
} from '../lib/i18n'
import { chakraColor } from '../lib/resonanceData'
import { Screen } from './Screen'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from '../types/resonance'

interface HoroscopeProps {
  onBack: () => void
  onRitual: (preset: RitualPreset) => void
}

export function Horoscope({ onBack, onRitual }: HoroscopeProps) {
  const t = useT()
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
  const natal = useAppStore((s) => s.natal)
  const nowAngles = useAppStore((s) => s.nowAngles)
  const editProfile = useAppStore((s) => s.editProfile)

  if (!transit || !chakra) return null

  const geo = geoContext(profile, currentLocation)
  const dominantBody = transit.body
  const dominantHouse = transitHouses[dominantBody as keyof typeof transitHouses]
  const SIGN_KEYS = [
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
  ]
  const risingNow =
    nowAngles != null
      ? SIGN_KEYS[Math.floor(nowAngles.ascendant / 30)]
      : null

  const horoscope = buildHoroscope(
    {
      transit,
      chakra,
      crystals,
      aspects,
      sky,
      hasNatal,
      suggestedPattern,
      transitHouses,
      natal,
    },
    t,
  )
  const accent = chakraColor(chakra.key)

  return (
    <Screen
      eyebrow={t('scr.horo.eyebrow')}
      title={transitTitle(transit, t)}
      subtitle={horoscope.greeting}
      onBack={onBack}
    >

      <section className="glass-panel p-5">
        {horoscope.intro.map((para, i) => (
          <p
            key={i}
            className={`text-sm leading-relaxed ${
              i === 0 ? 'text-haze-300' : 'text-haze-200'
            } ${i > 0 ? 'mt-3' : ''}`}
          >
            {para}
          </p>
        ))}
        {!hasNatal && (
          <button
            type="button"
            onClick={editProfile}
            className="mt-3 text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            {t('scr.horo.addBirth')}
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
          {section.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mt-2 text-sm leading-relaxed text-haze-200"
            >
              {para}
            </p>
          ))}
        </section>
      ))}

      {horoscope.moon && (
        <section className="glass-panel p-4">
          <p className="eyebrow">{t('scr.horo.moonHead')}</p>
          <p className="mt-2 text-sm leading-relaxed text-haze-200">
            {horoscope.moon}
          </p>
        </section>
      )}

      {horoscope.threads.length > 0 && (
        <section className="glass-panel p-4">
          <p className="eyebrow">{t('scr.horo.threadsHead')}</p>
          {horoscope.threads.map((para, i) => (
            <p
              key={i}
              className={`text-sm leading-relaxed text-haze-200 ${
                i > 0 ? 'mt-2' : 'mt-2'
              }`}
            >
              {para}
            </p>
          ))}
        </section>
      )}

      {horoscope.timing.length > 0 && (
        <section className="glass-panel p-4">
          <p className="eyebrow">{t('scr.horo.timingHead')}</p>
          {horoscope.timing.map((para, i) => (
            <p
              key={i}
              className="mt-2 text-sm leading-relaxed text-haze-200"
            >
              {para}
            </p>
          ))}
        </section>
      )}

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.horo.weekHead')}</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-100">
          {horoscope.close}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.horo.skyHead')}</p>
        {risingNow && (
          <p className="mt-2 text-sm text-haze-200">
            {t('scr.horo.risingNow', { sign: signLabel(risingNow, t) })}
          </p>
        )}
        {dominantHouse && (
          <p className="mt-1 text-sm text-haze-200">
            {t('scr.horo.transitingHouse', {
              planet: planetLabel(dominantBody, t),
              ord: ordinal(dominantHouse, t),
            })}
          </p>
        )}
        {geo.hasLocation && (
          <p className="mt-2 text-sm text-haze-300">
            {t('scr.horo.geoLine', {
              season: seasonLabel(geo.season, t),
              sunrise: clockHM(geo.sunrise),
              sunset: clockHM(geo.sunset),
              light:
                geo.dayLengthHours != null
                  ? t('scr.horo.dayLight', {
                      hours: geo.dayLengthHours.toFixed(1),
                    })
                  : '',
              place: geo.source === 'birth' ? t('scr.horo.birthPlace') : '',
            })}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {t(geo.groundingKey)}
        </p>
        {!geo.hasLocation && (
          <button
            type="button"
            onClick={editProfile}
            className="mt-2 text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            {t('scr.horo.addPlace')}
          </button>
        )}
      </section>

      <section className="glass-panel glass-panel-active p-5">
        <p className="eyebrow">{t('scr.horo.practiceHead')}</p>
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
