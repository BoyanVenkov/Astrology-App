import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { bodyState } from '../lib/biometrics'
import { localDayKey } from '../lib/timezone'
import { BackButton } from './Screen'

interface BodyCheckInProps {
  onDone: () => void
  compact?: boolean
}

const numOrUndef = (s: string): number | undefined => {
  const n = Number(s)
  return s.trim() !== '' && Number.isFinite(n) ? n : undefined
}

const fieldCls =
  'rounded-2xl border border-white/12 bg-midnight-950/60 px-4 py-3 text-white outline-none focus:border-gold-400/60'

export function BodyCheckIn({ onDone, compact = false }: BodyCheckInProps) {
  const biometricLog = useAppStore((s) => s.biometricLog)
  const logBiometrics = useAppStore((s) => s.logBiometrics)

  const today = localDayKey()
  const existing = biometricLog.find((b) => b.day === today) ?? null

  const [hrv, setHrv] = useState(existing?.hrv != null ? String(existing.hrv) : '')
  const [sleep, setSleep] = useState(
    existing?.sleepHours != null ? String(existing.sleepHours) : '',
  )
  const [rhr, setRhr] = useState(
    existing?.restingHr != null ? String(existing.restingHr) : '',
  )
  const [saved, setSaved] = useState(false)

  const draft = {
    at: new Date().toISOString(),
    day: today,
    hrv: numOrUndef(hrv),
    sleepHours: numOrUndef(sleep),
    restingHr: numOrUndef(rhr),
    source: 'manual' as const,
  }
  const anything =
    draft.hrv != null || draft.sleepHours != null || draft.restingHr != null
  const preview = bodyState([draft])

  const save = () => {
    if (!anything) return
    logBiometrics(draft)
    setSaved(true)
    if (!compact) onDone()
  }

  const fields = (
    <div className="grid grid-cols-3 gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="eyebrow">HRV ms</span>
        <input
          type="number"
          inputMode="decimal"
          value={hrv}
          onChange={(e) => {
            setHrv(e.target.value)
            setSaved(false)
          }}
          placeholder="42"
          className={fieldCls}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="eyebrow">Sleep h</span>
        <input
          type="number"
          inputMode="decimal"
          value={sleep}
          onChange={(e) => {
            setSleep(e.target.value)
            setSaved(false)
          }}
          placeholder="7.5"
          className={fieldCls}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="eyebrow">Rest HR</span>
        <input
          type="number"
          inputMode="decimal"
          value={rhr}
          onChange={(e) => {
            setRhr(e.target.value)
            setSaved(false)
          }}
          placeholder="58"
          className={fieldCls}
        />
      </label>
    </div>
  )

  if (compact) {
    return (
      <div className="w-full">
        <p className="eyebrow text-center">Log a body reading</p>
        <div className="mt-3">{fields}</div>
        {anything && (
          <p className="mt-2 text-center text-xs text-haze-300">
            {preview.label} · {Math.round(preview.recovery * 100)}% recovered
          </p>
        )}
        <button
          type="button"
          onClick={save}
          disabled={!anything || saved}
          className="mt-3 w-full rounded-2xl border border-gold-400/40 bg-gold-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100 transition disabled:opacity-40"
        >
          {saved ? 'Logged ✦' : 'Log reading'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <BackButton onClick={onDone} />
      <header className="px-1">
        <p className="eyebrow">Body reading</p>
        <h1 className="mt-1 font-serif text-2xl text-gilded">
          How is your body today?
        </h1>
        <p className="mt-1 text-sm text-haze-300">
          From your wearable, or a rough guess. HRV matters most; leave blank
          what you don’t have.
        </p>
      </header>

      <section className="glass-panel p-4">{fields}</section>

      {anything && (
        <p className="px-1 text-sm text-haze-300">
          Reads as <span className="text-white">{preview.label}</span> —{' '}
          {Math.round(preview.recovery * 100)}% recovered.
          {preview.needsRest &&
            ' Today’s practice will lean restorative.'}
        </p>
      )}

      <button
        type="button"
        onClick={save}
        disabled={!anything}
        className="rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
      >
        {existing ? 'Update reading' : 'Save reading'}
      </button>
    </div>
  )
}
