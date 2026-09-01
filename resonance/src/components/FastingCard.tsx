import { useState } from 'react'
import { computeFasting, type FastingVerdict } from '../lib/fasting'

const VERDICT_COLOR: Record<FastingVerdict, string> = {
  favourable: '#6ee7b7',
  neutral: '#9aa6c9',
  'not-ideal': '#fb923c',
}

const fmtDay = (key: string): string => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

interface FastingCardProps {
  /** Push the full fasting guide (methods, days ahead, how to hold it). */
  onOpenGuide?: () => void
}

/** Free — is today a good window to fast, read from the Moon. */
export function FastingCard({ onOpenGuide }: FastingCardProps) {
  const [open, setOpen] = useState(false)
  // computed once on mount — the verdict is a whole-day read
  const [f] = useState(() => computeFasting())
  const tint = VERDICT_COLOR[f.verdict]

  return (
    <section className="glass-panel p-4">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Fasting</p>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: tint, boxShadow: `inset 0 0 0 1px ${tint}55` }}
        >
          {f.verdict === 'not-ideal' ? 'Not ideal' : f.verdict}
        </span>
      </div>

      <p className="mt-2 font-serif text-lg leading-tight text-white">
        {f.label}
      </p>
      <p className="data mt-1 text-[11px] text-haze-400">
        {f.tithi.special ?? `${f.tithi.phase} moon`} · lunar day {f.tithi.day} ·
        Moon in {f.moonSign}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-haze-200">{f.reason}</p>

      <p className="mt-2 text-sm text-haze-300">
        Best kind today:{' '}
        <span className="text-white">{f.pick.name}</span>
        <span className="text-haze-500"> · {f.pick.window}</span>
      </p>

      {open && (
        <div className="animate-rise-in mt-3">
          <p className="text-sm leading-relaxed text-haze-300">{f.note}</p>
          {f.upcoming.length > 0 && (
            <>
              <p className="mt-3 eyebrow">Better days ahead</p>
              <ul className="mt-1.5 flex flex-col gap-1 text-xs">
                {f.upcoming.map((u) => (
                  <li key={u.day} className="flex justify-between">
                    <span className="text-haze-200">
                      {u.special ?? 'Waning window'}
                    </span>
                    <span className="data text-haze-400">{fmtDay(u.day)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-haze-500">
            Traditional lunar guidance, not medical advice. If you have a health
            condition or a history with food, skip fasting and just eat lighter.
          </p>
        </div>
      )}

      {onOpenGuide ? (
        <button
          type="button"
          onClick={onOpenGuide}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          The five kinds & the days ahead →
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          {open ? 'Less' : 'How to hold it'} →
        </button>
      )}
    </section>
  )
}
