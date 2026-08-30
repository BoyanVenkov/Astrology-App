import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useDayHue } from '../lib/dayhue'
import { deviceTimeZone, listTimeZones, zonedWallTimeToUtc } from '../lib/timezone'
import { searchCities, type City } from '../data/cities'
import { ResonanceMark } from './Logo'

const todayKey = (): string => {
  const n = new Date()
  const m = `${n.getMonth() + 1}`.padStart(2, '0')
  const d = `${n.getDate()}`.padStart(2, '0')
  return `${n.getFullYear()}-${m}-${d}`
}

const field =
  'w-full min-w-0 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-white/30 focus:bg-white/[0.05]'

export function Onboarding() {
  useDayHue()
  const profile = useAppStore((s) => s.profile)
  const setProfile = useAppStore((s) => s.setProfile)
  const skipOnboarding = useAppStore((s) => s.skipOnboarding)

  const zones = useMemo(() => listTimeZones(), [])

  const [date, setDate] = useState(profile?.date ?? '')
  const [timeKnown, setTimeKnown] = useState(profile?.timeKnown ?? true)
  const [time, setTime] = useState(profile?.time ?? '12:00')
  const [timeZone, setTimeZone] = useState(profile?.timeZone ?? deviceTimeZone())

  const [placeQuery, setPlaceQuery] = useState(profile?.placeLabel ?? '')
  const [city, setCity] = useState<City | null>(null)
  const [manual, setManual] = useState(profile?.lat != null && !profile.placeLabel)
  const [lat, setLat] = useState(profile?.lat != null ? String(profile.lat) : '')
  const [lon, setLon] = useState(profile?.lon != null ? String(profile.lon) : '')

  const results = useMemo(
    () => (city ? [] : searchCities(placeQuery)),
    [placeQuery, city],
  )

  const pickCity = (c: City) => {
    setCity(c)
    setPlaceQuery(`${c.name}, ${c.country}`)
    setTimeZone(c.tz)
    setManual(false)
  }

  const geo = city
    ? { lat: city.lat, lon: city.lon }
    : manual && lat.trim() !== '' && lon.trim() !== ''
      ? { lat: Number(lat), lon: Number(lon) }
      : null

  const zoneValid = zones.includes(timeZone)
  const dateValid = /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= todayKey()
  const geoValid =
    geo === null ||
    (Number.isFinite(geo.lat) &&
      Math.abs(geo.lat) <= 90 &&
      Number.isFinite(geo.lon) &&
      Math.abs(geo.lon) <= 180)
  const canSubmit = dateValid && zoneValid && geoValid

  const reveal = () => {
    if (!canSubmit) return
    const [y, mo, d] = date.split('-').map(Number)
    const [h, mi] = (timeKnown ? time : '12:00').split(':').map(Number)
    const utc = zonedWallTimeToUtc(y, mo, d, h, mi, timeZone)
    setProfile({
      date,
      time: timeKnown ? time : '12:00',
      timeKnown,
      timeZone,
      placeLabel: city
        ? `${city.name}, ${city.country}`
        : placeQuery.trim() || undefined,
      lat: geo?.lat,
      lon: geo?.lon,
      utc: utc.toISOString(),
    })
  }

  return (
    <div
      className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center px-5"
      style={{
        paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <ResonanceMark
        className="mb-5 h-9 w-9"
        style={{ color: 'var(--rz-hue)' }}
        animated
      />
      <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
        Welcome to Resonance
      </p>
      <h1 className="mt-2 font-serif text-[2.1rem] leading-[1.1] text-gilded">
        Let’s find your sky
      </h1>
      <p className="mt-2.5 text-sm leading-relaxed text-haze-300">
        Your birth date, time and place let Resonance track the real planets
        against your own chart — and shape each day’s practice around them.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">Birth date</span>
          <input
            type="date"
            value={date}
            max={todayKey()}
            onChange={(e) => setDate(e.target.value)}
            className={field}
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Birth time</span>
            <button
              type="button"
              onClick={() => setTimeKnown((v) => !v)}
              className="text-[11px] uppercase tracking-[0.12em] text-gold-300"
            >
              {timeKnown ? 'I don’t know it' : 'I know it'}
            </button>
          </div>
          {timeKnown ? (
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={field}
            />
          ) : (
            <p className="rounded-2xl border border-white/8 bg-midnight-950/40 px-4 py-3 text-sm text-haze-400">
              Using noon — the Ascendant and Moon will be approximate.
            </p>
          )}
        </div>

        {/* birth place */}
        <div className="relative flex flex-col gap-1.5">
          <span className="eyebrow">Birth place</span>
          <input
            type="text"
            value={placeQuery}
            onChange={(e) => {
              setPlaceQuery(e.target.value)
              setCity(null)
            }}
            placeholder="Start typing a city…"
            autoComplete="off"
            className={field}
          />
          {results.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-56 overflow-y-auto rounded-2xl border border-white/12 bg-midnight-900/95 backdrop-blur-xl">
              {results.map((c) => (
                <li key={`${c.name}-${c.country}`}>
                  <button
                    type="button"
                    onClick={() => pickCity(c)}
                    className="block w-full px-4 py-2.5 text-left text-sm text-haze-100 active:bg-white/10"
                  >
                    {c.name}
                    <span className="text-haze-400">, {c.country}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {city && (
            <p className="text-xs text-haze-400">
              {city.lat.toFixed(2)}°{city.lat >= 0 ? 'N' : 'S'} ·{' '}
              {Math.abs(city.lon).toFixed(2)}°{city.lon >= 0 ? 'E' : 'W'} ·{' '}
              {city.tz}
            </p>
          )}
          {!city && (
            <button
              type="button"
              onClick={() => setManual((v) => !v)}
              className="self-start text-[11px] uppercase tracking-[0.12em] text-gold-300"
            >
              {manual ? 'Hide manual entry' : 'Not listed? Enter coordinates'}
            </button>
          )}
        </div>

        {manual && !city && (
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow">Latitude °N</span>
              <input
                type="number"
                inputMode="decimal"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="43.21"
                className={field}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow">Longitude °E</span>
              <input
                type="number"
                inputMode="decimal"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                placeholder="27.91"
                className={field}
              />
            </label>
          </div>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">Birth time zone</span>
          <input
            list="tz-list"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            placeholder="Europe/Athens"
            className={`${field} ${zoneValid ? '' : '!border-red-400/50'}`}
          />
          <datalist id="tz-list">
            {zones.map((z) => (
              <option key={z} value={z} />
            ))}
          </datalist>
        </label>
      </div>

      <button
        type="button"
        onClick={reveal}
        disabled={!canSubmit}
        className={`mt-6 px-4 py-3.5 text-sm uppercase ${
          canSubmit ? 'btn-primary' : 'btn-ghost opacity-55'
        }`}
      >
        Reveal my chart
      </button>
      <button
        type="button"
        onClick={skipOnboarding}
        className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
      >
        Skip — use today’s sky only
      </button>
    </div>
  )
}
