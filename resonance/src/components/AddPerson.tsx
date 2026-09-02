import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { zonedWallTimeToUtc } from '../lib/timezone'
import { searchCities, type City } from '../data/cities'
import { DateField, TimeField } from './DateTimeField'
import type { SavedPerson } from '../types/resonance'

interface AddPersonProps {
  onDone: (person: SavedPerson) => void
  onCancel?: () => void
}

const field =
  'w-full min-w-0 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-white/30 focus:bg-white/[0.05]'

const todayKey = (): string => new Date().toISOString().slice(0, 10)

/** A compact birth-data form for adding someone to compare charts with. */
export function AddPerson({ onDone, onCancel }: AddPersonProps) {
  const addPerson = useAppStore((s) => s.addPerson)

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [timeKnown, setTimeKnown] = useState(true)
  const [time, setTime] = useState('12:00')
  const [query, setQuery] = useState('')
  const [city, setCity] = useState<City | null>(null)

  const results = useMemo(
    () => (city ? [] : searchCities(query)),
    [query, city],
  )

  const dateValid = /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= todayKey()
  const canSave = name.trim().length > 0 && dateValid && city != null

  const save = () => {
    if (!canSave || !city) return
    const [y, mo, d] = date.split('-').map(Number)
    const [h, mi] = (timeKnown ? time : '12:00').split(':').map(Number)
    const utc = zonedWallTimeToUtc(y, mo, d, h, mi, city.tz)
    const person: SavedPerson = {
      id: `p-${Date.now().toString(36)}`,
      name: name.trim(),
      date,
      time: timeKnown ? time : '12:00',
      timeKnown,
      timeZone: city.tz,
      placeLabel: `${city.name}, ${city.country}`,
      lat: city.lat,
      lon: city.lon,
      utc: utc.toISOString(),
    }
    addPerson(person)
    onDone(person)
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="eyebrow">Their name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex"
          autoComplete="off"
          className={field}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="eyebrow">Birth date</span>
        <DateField value={date} max={todayKey()} onChange={setDate} />
      </label>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Birth time</span>
          <button
            type="button"
            onClick={() => setTimeKnown((v) => !v)}
            className="text-[11px] uppercase tracking-[0.12em] text-gold-300"
          >
            {timeKnown ? 'Don’t know it' : 'I know it'}
          </button>
        </div>
        {timeKnown ? (
          <TimeField value={time} onChange={setTime} />
        ) : (
          <p className="rounded-xl border border-white/[0.08] bg-midnight-950/40 px-4 py-3 text-sm text-haze-400">
            Using noon — the Moon and rising sign will be approximate.
          </p>
        )}
      </div>

      <div className="relative flex flex-col gap-1.5">
        <span className="eyebrow">Birth place</span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
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
                  onClick={() => {
                    setCity(c)
                    setQuery(`${c.name}, ${c.country}`)
                  }}
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
          <p className="data text-xs text-haze-400">
            {city.lat.toFixed(2)}°{city.lat >= 0 ? 'N' : 'S'} ·{' '}
            {Math.abs(city.lon).toFixed(2)}°{city.lon >= 0 ? 'E' : 'W'} · {city.tz}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={!canSave}
        className={`mt-1 px-4 py-3.5 text-sm uppercase ${
          canSave ? 'btn-primary' : 'btn-ghost opacity-55'
        }`}
      >
        Save &amp; compare
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
        >
          Cancel
        </button>
      )}
    </div>
  )
}
