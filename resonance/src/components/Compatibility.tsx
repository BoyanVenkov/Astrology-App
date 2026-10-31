import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useEntitlements } from '../lib/premium'
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
import { ASPECT_GLYPH } from '../lib/astrology'
import { AddPerson } from './AddPerson'
import { Screen } from './Screen'
import { TrashIcon } from './icons'
import { Chip, GlyphBadge, ListRow } from './ui'
import artSpheres from '../assets/art/compat-spheres.webp'
import type { SavedPerson } from '../types/resonance'

interface CompatibilityProps {
  onBack: () => void
  onUpgrade: (reason?: string) => void
}

const scoreColor = (s: number): string =>
  s >= 62 ? '#6ee7b7' : s >= 44 ? '#eccd82' : '#fb923c'

const TONE_COLOR: Record<ConnectionTone, string> = {
  gift: '#6ee7b7',
  intense: '#eccd82',
  friction: '#fb923c',
}

/**
 * Two worlds meeting — the concept's interacting spheres. Deliberately no
 * number: the warmth of the glow where they overlap follows the synastry,
 * but compatibility is presented as an interpretation, not a score.
 */
function MeetingSpheres({
  warmth = 0.7,
  className = '',
}: {
  /** 0–1 — how bright the meeting point glows. */
  warmth?: number
  className?: string
}) {
  return (
    <div aria-hidden className={`relative mx-auto w-full max-w-[26rem] ${className}`}>
      <span
        className="animate-moon-breathe absolute left-1/2 top-1/2 h-[90%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,214,150,0.6), rgba(232,194,116,0.18) 60%, transparent)',
          opacity: 0.35 + warmth * 0.65,
        }}
      />
      <img
        src={artSpheres}
        alt=""
        className="animate-float-slow relative w-full"
        style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.55))' }}
      />
    </div>
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
        className="flex w-full items-center gap-3 p-3.5 text-start active:scale-[0.995]"
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
        <span className="shrink-0 text-end">
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
            {/* No "tightening/easing" trend here — both charts are fixed at
                birth, so an aspect's exactness never actually changes; that
                would only be meaningful for a live transit, not synastry. */}
            {t('scr.compat.connMeta', {
              aspect: aspectLabel(conn.aspect, t),
              orb: conn.orbDelta.toFixed(1),
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

  // computeSynastry composes ~8 full paragraphs plus a per-connection
  // sentence for every cross-aspect — without memoizing, merely expanding a
  // connection row (`openConn`) re-ran the whole thing on every tap.
  const reading = useMemo(
    () =>
      profile
        ? computeSynastry(new Date(profile.utc), new Date(person.utc), lens, t)
        : null,
    [profile, person, lens, t],
  )

  if (!profile || !reading) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {LENS_KEYS.map((key) => (
          <Chip
            key={key}
            active={lens === key}
            onClick={() => {
              setLens(key)
              setOpenConn(null)
            }}
          >
            {lensLabel(key, t)}
          </Chip>
        ))}
      </div>

      <section className="glass-panel glass-gold p-4 text-center">
        <MeetingSpheres warmth={reading.score / 100} className="max-w-[20rem]" />
        <p className="mt-2 font-serif text-[1.4rem] leading-tight text-gilded">
          {reading.label}
        </p>
        <p className="mt-1 text-xs text-haze-400">
          {t('scr.compat.forLens', {
            lens: lensLabel(lens, t).toLowerCase(),
          })}
        </p>
        <p className="mt-3 text-start text-sm leading-relaxed text-haze-200">
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
        <p className="eyebrow">{t('syn.deep.patternLead')}</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {reading.pattern}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('syn.deep.chemHead')}</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {reading.chemistry}
        </p>
      </section>

      <section className="glass-panel p-4">
        <p className="eyebrow">{t('syn.deep.commHead')}</p>
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {reading.communication}
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
          {t('syn.deep.growthLead')}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-haze-100">
          {reading.growth}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-haze-200">
          {reading.advice}
        </p>
        <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-haze-300">
          {t('syn.deep.nameItLead')}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-haze-200">
          {reading.nameIt}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-haze-300">
          {reading.longView}
        </p>
      </section>

      <p className="px-1 text-[11px] leading-relaxed text-haze-500">
        {t('scr.compat.interpretNote')}
      </p>

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

export function Compatibility({ onBack, onUpgrade }: CompatibilityProps) {
  const t = useT()
  const { isPro } = useEntitlements()
  const profile = useAppStore((s) => s.profile)
  const people = useAppStore((s) => s.people)
  const removePerson = useAppStore((s) => s.removePerson)
  const editProfile = useAppStore((s) => s.editProfile)

  const [selected, setSelected] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const person = people.find((p) => p.id === selected) ?? null

  // The Sky tile is the only normal entry point and already gates this, but
  // that's UI-only — self-gate here too so this Pro screen can't be reached
  // (e.g. by driving `sub` state directly) and shown for free.
  useEffect(() => {
    if (!isPro) onUpgrade(t('sky.reasonCompat'))
  }, [isPro, onUpgrade, t])

  if (!isPro) return null

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

  if (!adding && people.length === 0) {
    return (
      <Screen
        eyebrow={t('scr.compat.eyebrow')}
        title={t('sky.tileCompat')}
        subtitle={t('sky.tileCompatSubPro')}
        onBack={onBack}
        align="center"
      >
        <MeetingSpheres className="my-4" />
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="btn-gold min-h-12 px-6 text-[0.95rem]"
          >
            {t('scr.compat.addSomeone')}
          </button>
          <p className="text-center text-[0.8rem] leading-relaxed text-haze-400">
            {t('scr.compat.addSub')}
          </p>
        </div>
        <p className="px-1 text-center text-[11px] leading-relaxed text-haze-500">
          {t('scr.compat.interpretNote')}
        </p>
      </Screen>
    )
  }

  if (adding) {
    return (
      <Screen
        eyebrow={t('scr.compat.eyebrow')}
        title={t('scr.compat.addSomeone')}
        subtitle={t('scr.compat.addSub')}
        onBack={() => setAdding(false)}
      >
        <AddPerson
          onDone={(p) => {
            setAdding(false)
            setSelected(p.id)
          }}
          onCancel={() => setAdding(false)}
        />
      </Screen>
    )
  }

  return (
    <Screen
      eyebrow={t('scr.compat.eyebrow')}
      title={t('scr.compat.titleList')}
      subtitle={t('sky.tileCompatSubPro')}
      onBack={onBack}
      align="center"
    >
      <MeetingSpheres className="max-w-[20rem]" />
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {people.map((p, i) => (
          <li key={p.id} className="relative">
            <ListRow
              delay={i * 40}
              onClick={() => setSelected(p.id)}
              leading={<GlyphBadge glyph={p.name.trim().charAt(0).toLocaleUpperCase() || '✦'} />}
              title={<span className="font-serif text-[1.1rem] font-medium">{p.name}</span>}
              sub={
                <span className="data block truncate pe-8">
                  {p.date} · {p.placeLabel ?? t('scr.compat.placeUnset')}
                </span>
              }
            />
            <button
              type="button"
              onClick={() => removePerson(p.id)}
              aria-label={`${t('scr.compat.remove')} · ${p.name}`}
              className="absolute end-9 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-haze-500 transition hover:text-red-300 active:bg-white/10"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="btn-gold min-h-12 px-6 text-[0.95rem]"
        >
          {t('scr.compat.addAnother')}
        </button>
        <button
          type="button"
          onClick={() => setSelected(people[0].id)}
          className="btn-ghost min-h-12 rounded-full px-6 text-[0.95rem] text-[#f6ecd2]"
        >
          {t('scr.compat.viewReading')}
        </button>
      </div>
    </Screen>
  )
}
