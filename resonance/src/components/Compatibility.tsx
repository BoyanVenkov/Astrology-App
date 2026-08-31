import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  computeSynastry,
  LENSES,
  type CompatLens,
  type ConnectionTone,
  type SynastryConnection,
} from '../lib/synastry'
import { planetSymbol } from '../data/esoteric'
import { AddPerson } from './AddPerson'
import { Screen } from './Screen'
import type { SavedPerson } from '../types/resonance'

interface CompatibilityProps {
  onBack: () => void
}

const ASPECT_GLYPH: Record<string, string> = {
  conjunction: '☌︎',
  opposition: '☍︎',
  square: '□︎',
  trine: '△︎',
  sextile: '⚹︎',
}

const scoreColor = (s: number): string =>
  s >= 62 ? '#6ee7b7' : s >= 44 ? '#eccd82' : '#fb923c'

const TONE_COLOR: Record<ConnectionTone, string> = {
  gift: '#6ee7b7',
  intense: '#eccd82',
  friction: '#fb923c',
}
const TONE_LABEL: Record<ConnectionTone, string> = {
  gift: 'Flows',
  intense: 'Fuses',
  friction: 'Effort',
}

function ScoreRing({ score }: { score: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const col = scoreColor(score)
  return (
    <svg viewBox="0 0 80 80" width={92} height={92} role="img" aria-label={`${score} of 100`}>
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke={col}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - score / 100)}
        transform="rotate(-90 40 40)"
        style={{ filter: `drop-shadow(0 0 6px ${col}66)` }}
      />
      <text
        x="40"
        y="45"
        textAnchor="middle"
        fill="#f6f1e4"
        fontSize="20"
        fontFamily="'Space Mono', monospace"
      >
        {score}
      </text>
    </svg>
  )
}

function ConnectionRow({
  conn,
  open,
  onToggle,
}: {
  conn: SynastryConnection
  open: boolean
  onToggle: () => void
}) {
  const glyph = ASPECT_GLYPH[conn.aspect] ?? '·'
  const tint = TONE_COLOR[conn.tone]
  return (
    <li className="glass-panel overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-3.5 text-left active:scale-[0.995]"
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: tint, boxShadow: `0 0 8px ${tint}` }}
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-haze-100">
            Your <span aria-hidden>{planetSymbol(conn.a)}</span> {conn.a}{' '}
            <span aria-hidden>{glyph}</span> their{' '}
            <span aria-hidden>{planetSymbol(conn.b)}</span> {conn.b}
          </span>
          <span className="mt-0.5 block text-xs text-haze-400">
            {conn.summary}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span
            className="block text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: tint }}
          >
            {TONE_LABEL[conn.tone]}
          </span>
          <span className="data block text-[11px] text-haze-400">
            {conn.orbDelta.toFixed(1)}°
          </span>
        </span>
      </button>
      {open && (
        <div className="animate-rise-in border-t border-white/[0.06] px-3.5 py-3.5">
          <p className="text-sm leading-relaxed text-haze-200">{conn.detail}</p>
          <p className="data mt-2 text-[11px] text-haze-500">
            {conn.aspect} · {conn.orbDelta.toFixed(1)}° from exact ·{' '}
            {conn.applying ? 'growing tighter' : 'easing off'}
          </p>
        </div>
      )}
    </li>
  )
}

function Reading({ person }: { person: SavedPerson }) {
  const profile = useAppStore((s) => s.profile)
  const [lens, setLens] = useState<CompatLens>('love')
  const [openConn, setOpenConn] = useState<number | null>(null)

  if (!profile) return null
  const reading = computeSynastry(
    new Date(profile.utc),
    new Date(person.utc),
    lens,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {LENSES.map((l) => (
          <button
            key={l.key}
            type="button"
            onClick={() => {
              setLens(l.key)
              setOpenConn(null)
            }}
            className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition"
            style={{
              color: lens === l.key ? 'var(--rz-hue)' : 'rgba(166,177,209,0.9)',
              boxShadow:
                lens === l.key
                  ? 'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 60%, transparent)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <section className="glass-panel glass-panel-active p-4">
        <div className="flex items-center gap-4">
          <ScoreRing score={reading.score} />
          <span className="min-w-0">
            <span className="block font-serif text-xl leading-tight text-white">
              {reading.label}
            </span>
            <span className="mt-1 block text-xs text-haze-400">
              for {LENSES.find((l) => l.key === lens)?.label.toLowerCase()}
            </span>
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-haze-200">
          {reading.overview}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">The texture of it</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {reading.texture}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {reading.elements}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow" style={{ color: '#6ee7b7' }}>
          What flows
        </p>
        <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-haze-200">
          {reading.strengths.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span style={{ color: '#6ee7b7' }}>✦</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow" style={{ color: '#fb923c' }}>
          What takes work
        </p>
        <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-haze-200">
          {reading.frictions.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span style={{ color: '#fb923c' }}>△</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">Every lens</p>
        <div className="mt-3 flex flex-col gap-2.5">
          {reading.facets.map((f) => (
            <div key={f.key} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-xs text-haze-300">
                {f.label}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${f.score}%`,
                    background: scoreColor(f.score),
                  }}
                />
              </span>
              <span className="data w-7 shrink-0 text-right text-xs text-haze-400">
                {f.score}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div>
        <p className="eyebrow mb-2 px-1">The connections</p>
        {reading.connections.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {reading.connections.map((conn, i) => (
              <ConnectionRow
                key={`${conn.a}-${conn.b}-${conn.aspect}-${i}`}
                conn={conn}
                open={openConn === i}
                onToggle={() => setOpenConn((c) => (c === i ? null : i))}
              />
            ))}
          </ul>
        ) : (
          <p className="px-1 text-sm text-haze-400">
            No close cross-aspects between your charts — a quiet, low-static match.
          </p>
        )}
      </div>

      <section
        className="glass-panel p-4"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--rz-hue) 8%, transparent), transparent 70%)',
        }}
      >
        <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
          Making it work
        </p>
        <p className="mt-2 text-sm leading-relaxed text-haze-100">
          {reading.advice}
        </p>
      </section>

      {(!profile.timeKnown || !person.timeKnown) && (
        <p className="px-1 text-[11px] leading-relaxed text-haze-500">
          {!person.timeKnown ? `${person.name}'s` : 'Your'} birth time is set to
          noon, so Moon-based contacts are approximate.
        </p>
      )}
    </div>
  )
}

export function Compatibility({ onBack }: CompatibilityProps) {
  const profile = useAppStore((s) => s.profile)
  const people = useAppStore((s) => s.people)
  const removePerson = useAppStore((s) => s.removePerson)
  const editProfile = useAppStore((s) => s.editProfile)

  const [selected, setSelected] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const person = people.find((p) => p.id === selected) ?? null

  if (!profile) {
    return (
      <Screen
        eyebrow="Compatibility"
        title="Two charts, side by side"
        onBack={onBack}
      >
        <p className="text-sm leading-relaxed text-haze-300">
          Compatibility compares your natal chart with someone else&rsquo;s. Add
          your own birth details first.
        </p>
        <button
          type="button"
          onClick={editProfile}
          className="btn-primary mt-2 px-4 py-3.5 text-sm uppercase"
        >
          Add my birth chart
        </button>
      </Screen>
    )
  }

  if (person) {
    return (
      <Screen
        eyebrow="Compatibility"
        title={`You & ${person.name}`}
        subtitle={`${person.date}${person.placeLabel ? ` · ${person.placeLabel}` : ''}`}
        onBack={() => setSelected(null)}
        action={
          <button
            type="button"
            onClick={() => {
              removePerson(person.id)
              setSelected(null)
            }}
            className="text-[10px] uppercase tracking-[0.14em] text-haze-400"
          >
            Remove
          </button>
        }
      >
        <Reading person={person} />
      </Screen>
    )
  }

  if (adding || people.length === 0) {
    return (
      <Screen
        eyebrow="Compatibility"
        title="Add someone"
        subtitle="Their birth date and place — a time helps but isn't required"
        onBack={people.length === 0 ? onBack : () => setAdding(false)}
      >
        <AddPerson
          onDone={(p) => {
            setAdding(false)
            setSelected(p.id)
          }}
          onCancel={people.length === 0 ? undefined : () => setAdding(false)}
        />
      </Screen>
    )
  }

  return (
    <Screen
      eyebrow="Compatibility"
      title="How your charts meet"
      onBack={onBack}
    >
      <ul className="flex flex-col gap-2">
        {people.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setSelected(p.id)}
              className="glass-panel flex w-full items-center justify-between p-4 text-left active:scale-[0.99]"
            >
              <span className="min-w-0">
                <span className="block font-serif text-lg leading-tight text-white">
                  {p.name}
                </span>
                <span className="data mt-0.5 block truncate text-xs text-haze-400">
                  {p.date} · {p.placeLabel ?? 'place not set'}
                </span>
              </span>
              <span style={{ color: 'var(--rz-hue)' }}>›</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setAdding(true)}
        className="btn-ghost mt-1 px-4 py-3 text-xs uppercase tracking-[0.14em]"
      >
        Add someone else
      </button>
    </Screen>
  )
}
