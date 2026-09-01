import { useState } from 'react'
import {
  computeFasting,
  type FastingVerdict,
  type MethodFit,
} from '../lib/fasting'
import { Screen } from './Screen'

const VERDICT_COLOR: Record<FastingVerdict, string> = {
  favourable: '#6ee7b7',
  neutral: '#9aa6c9',
  'not-ideal': '#fb923c',
}

const FIT_META: Record<MethodFit, { label: string; color: string }> = {
  good: { label: 'Good today', color: '#6ee7b7' },
  ok: { label: 'Workable', color: '#9aa6c9' },
  'not-today': { label: 'Not today', color: '#fb923c' },
}

const fmtDay = (key: string): string => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

interface FastingGuideProps {
  onBack: () => void
}

/** Free — the full fasting read: today's verdict, which method the sky backs, the days ahead. */
export function FastingGuide({ onBack }: FastingGuideProps) {
  const [f] = useState(() => computeFasting())
  const [openKey, setOpenKey] = useState<string | null>(f.pick.key)
  const tint = VERDICT_COLOR[f.verdict]

  return (
    <Screen
      eyebrow="The Moon"
      title="Fasting"
      subtitle={
        f.tithi.special
          ? `${f.tithi.special} · Moon in ${f.moonSign}`
          : `${f.tithi.phase} moon · lunar day ${f.tithi.day}`
      }
      onBack={onBack}
    >
      <section className="glass-panel p-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Today</p>
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
        <p className="mt-2 text-sm leading-relaxed text-haze-200">{f.reason}</p>
        <p className="data mt-3 text-[11px] text-haze-400">
          Sky backs → <span className="text-haze-200">{f.pick.name}</span>
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">Which kind</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          Five ways to hold a fast, gentlest first — each rated for the Moon
          today. Tap one to open it.
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {f.methods.map((m) => {
            const meta = FIT_META[m.fit]
            const open = openKey === m.key
            return (
              <li key={m.key}>
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? null : m.key)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-base leading-tight text-white">
                      {m.name}
                    </span>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
                      style={{
                        color: meta.color,
                        boxShadow: `inset 0 0 0 1px ${meta.color}55`,
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="data mt-1 text-[11px] text-haze-400">
                    {m.window}
                  </p>
                  {open && (
                    <div className="animate-rise-in mt-2">
                      <p className="text-sm leading-relaxed text-haze-200">
                        {m.what}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-haze-300">
                        <span style={{ color: meta.color }}>
                          {meta.label}.
                        </span>{' '}
                        {m.why}
                      </p>
                    </div>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {f.upcoming.length > 0 && (
        <section className="glass-panel p-4">
          <p className="eyebrow">Better days ahead</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            {f.upcoming.map((u) => (
              <li key={u.day} className="flex justify-between">
                <span className="text-haze-200">
                  {u.special ?? 'Waning window'}
                </span>
                <span className="data text-xs text-haze-400">
                  {fmtDay(u.day)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="glass-panel p-4">
        <p className="eyebrow">Holding it well</p>
        <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-haze-200">
          <li>
            Drink through it — water, herbal tea, black coffee. A pinch of salt
            helps on the longer ones.
          </li>
          <li>
            Break gently: warm water first, then something small and cooked.
            Skip the big meal straight away.
          </li>
          <li>Move slowly, sleep more, and stop the moment your body says stop.</li>
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-haze-500">
          Traditional lunar guidance, not medical advice. Dry fasting — going
          without water — carries real risk and is never something the sky
          &ldquo;recommends&rdquo;; this guide assumes you drink. If you are
          pregnant, on medication, diabetic, underweight, or have a history with
          food, skip fasting and just eat lighter.
        </p>
      </section>
    </Screen>
  )
}
