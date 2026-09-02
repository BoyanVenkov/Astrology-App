import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  computeSynastry,
  LENS_KEYS,
  lensLabel,
  type CompatLens,
  type ConnectionTone,
  type SynastryConnection,
} from '../lib/synastry'
import {
  aspectLabel,
  planetLabel,
  useT,
  type TFn,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
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
  t,
}: {
  conn: SynastryConnection
  open: boolean
  onToggle: () => void
  t: TFn
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
            <span aria-hidden>{planetSymbol(conn.a)}</span>{' '}
            {t('scr.compat.rowPair', {
              a: planetLabel(conn.a, t),
              glyph,
              b: planetLabel(conn.b, t),
            })}{' '}
            <span aria-hidden>{planetSymbol(conn.b)}</span>
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
            {t(`scr.compat.tone.${conn.tone}` as MessageKey)}
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
            {t('scr.compat.connMeta', {
              aspect: aspectLabel(conn.aspect, t),
              orb: conn.orbDelta.toFixed(1),
              trend: conn.applying
                ? t('scr.compat.trendTighter')
                : t('scr.compat.trendEasing'),
            })}
          </p>
        </div>
      )}
    </li>
  )
}

function Reading({ person }: { person: SavedPerson }) {
  const t = useT()
  const profile = useAppStore((s) => s.profile)
  const [lens, setLens] = useState<CompatLens>('love')
  const [openConn, setOpenConn] = useState<number | null>(null)

  if (!profile) return null
  const reading = computeSynastry(
    new Date(profile.utc),
    new Date(person.utc),
    lens,
    t,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {LENS_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setLens(key)
              setOpenConn(null)
            }}
            className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition"
            style={{
              color: lens === key ? 'var(--rz-hue)' : 'rgba(166,177,209,0.9)',
              boxShadow:
                lens === key
                  ? 'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 60%, transparent)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            {lensLabel(key, t)}
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
              {t('scr.compat.forLens', {
                lens: lensLabel(lens, t).toLowerCase(),
              })}
            </span>
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-haze-200">
          {reading.overview}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.compat.texture')}</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {reading.texture}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {reading.elements}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow" style={{ color: '#6ee7b7' }}>
          {t('scr.compat.flows')}
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
          {t('scr.compat.takesWork')}
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
        <p className="eyebrow">{t('scr.compat.everyLens')}</p>
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
        <p className="eyebrow mb-2 px-1">{t('scr.compat.connections')}</p>
        {reading.connections.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {reading.connections.map((conn, i) => (
              <ConnectionRow
                key={`${conn.a}-${conn.b}-${conn.aspect}-${i}`}
                conn={conn}
                open={openConn === i}
                onToggle={() => setOpenConn((c) => (c === i ? null : i))}
                t={t}
              />
            ))}
          </ul>
        ) : (
          <p className="px-1 text-sm text-haze-400">{t('scr.compat.noConn')}</p>
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
          {t('scr.compat.makeWork')}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-haze-100">
          {reading.advice}
        </p>
      </section>

      {(!profile.timeKnown || !person.timeKnown) && (
        <p className="px-1 text-[11px] leading-relaxed text-haze-500">
          {t('scr.compat.noonNote', {
            whose: !person.timeKnown
              ? t('scr.compat.whoseName', { name: person.name })
              : t('scr.compat.whoseYour'),
          })}
        </p>
      )}
    </div>
  )
}

export function Compatibility({ onBack }: CompatibilityProps) {
  const t = useT()
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
        eyebrow={t('scr.compat.eyebrow')}
        title={t('scr.compat.titleNoProfile')}
        onBack={onBack}
      >
        <p className="text-sm leading-relaxed text-haze-300">
          {t('scr.compat.noProfileBlurb')}
        </p>
        <button
          type="button"
          onClick={editProfile}
          className="btn-primary mt-2 px-4 py-3.5 text-sm uppercase"
        >
          {t('scr.compat.addMyChart')}
        </button>
      </Screen>
    )
  }

  if (person) {
    return (
      <Screen
        eyebrow={t('scr.compat.eyebrow')}
        title={t('scr.compat.youAnd', { name: person.name })}
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
            {t('scr.compat.remove')}
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
        eyebrow={t('scr.compat.eyebrow')}
        title={t('scr.compat.addSomeone')}
        subtitle={t('scr.compat.addSub')}
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
      eyebrow={t('scr.compat.eyebrow')}
      title={t('scr.compat.titleList')}
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
                  {p.date} · {p.placeLabel ?? t('scr.compat.placeUnset')}
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
        {t('scr.compat.addAnother')}
      </button>
    </Screen>
  )
}
