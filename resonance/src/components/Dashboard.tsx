import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { auraLabel, computeAura } from '../lib/aura'
import { usePrescription } from '../lib/prescription'
import { moonVoidOfCourseCached } from '../lib/lunar'
import { chakraName, zodiacGlyph } from '../lib/resonanceData'
import { practicedToday } from '../lib/streak'
import { planetSymbol } from '../data/esoteric'
import type { RitualPreset } from './Ritual'
import type { TabKey } from '../types/resonance'
import { PlayIcon } from './icons'

interface DashboardProps {
  onRitual: (preset: RitualPreset) => void
  onPracticeSheet: () => void
  onTab: (tab: TabKey) => void
}

export function Dashboard({
  onRitual,
  onPracticeSheet,
  onTab,
}: DashboardProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const biometricLog = useAppStore((s) => s.biometricLog)

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 300_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 300_000)),
      300_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const voc = useMemo(
    () => moonVoidOfCourseCached(new Date(bucket * 300_000)),
    [bucket],
  )

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focusChakra, sessionLog, moodLog, biometricLog)
  const doneToday = practicedToday(sessionLog)
  const focusPlanet = sky.find((p) => p.body === transit?.body)
  const rx = usePrescription()

  const heroStone = rx.stones[0]
  const vocSoon = voc.active || (voc.hoursUntil != null && voc.hoursUntil < 4)

  return (
    <div
      className="flex flex-col gap-4"
      style={{
        // faint daily wash behind the Today screen
        background:
          'radial-gradient(120% 40% at 50% -5%, var(--rz-hue-soft), transparent 70%)',
      }}
    >
      {/* void of course */}
      {vocSoon && (
        <button
          type="button"
          onClick={() =>
            onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
          }
          className="glass-panel flex items-center justify-between gap-3 border-amber-400/25 p-3 text-left active:scale-[0.99]"
        >
          <span className="text-sm text-amber-200">
            {voc.active
              ? `Moon void of course — ground, don't begin. Ends ${voc.until ? new Date(voc.until).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : 'soon'}.`
              : `Moon goes void of course in ${voc.hoursUntil?.toFixed(1)} h.`}
          </span>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-amber-300">
            2-min
          </span>
        </button>
      )}

      {/* the prescription */}
      <section
        className="glass-panel glass-panel-active p-5"
        style={{
          boxShadow: rx.urgent
            ? '0 0 40px -8px rgba(248,113,113,0.4)'
            : '0 0 44px -10px var(--rz-glow)',
        }}
      >
        <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
          {rx.urgent ? 'Restore first' : `Today · ${rx.chakraLabel} focus`}
        </p>
        <h1 className="mt-1 font-serif text-2xl leading-snug text-gilded">
          {transit ? rx.headline : 'Attuning to the sky…'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-haze-200">
          {rx.directive}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 tabular-nums text-haze-100">
            {rx.minutes} min · {rx.frequency} Hz
          </span>
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-haze-100">
            {rx.breathLabel}
          </span>
          {heroStone && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-haze-100">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: heroStone.color }}
              />
              {heroStone.name}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() =>
              onRitual({
                mode: rx.urgent ? 'breath' : 'meditation',
                minutes: rx.minutes,
              })
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight-void transition active:scale-[0.98]"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--rz-hue) 80%, #fff 15%), var(--rz-hue))',
            }}
          >
            <PlayIcon className="h-4 w-4" />
            {doneToday ? 'Practice again' : 'Begin'}
          </button>
          <button
            type="button"
            onClick={onPracticeSheet}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-haze-200"
          >
            Options
          </button>
        </div>
      </section>

      {/* aura strip */}
      <button
        type="button"
        onClick={() => onTab('you')}
        className="glass-panel flex items-center gap-4 p-4 text-left active:scale-[0.99]"
      >
        <Aura state={aura} size={72} className="h-16 w-16 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Your aura</p>
          <p className="font-serif text-lg text-white">
            {auraLabel(aura.score)}
            <span className="ml-2 text-sm text-haze-400">
              {Math.round(aura.score * 100)}%
            </span>
          </p>
          {aura.needsRest ? (
            <p className="text-xs text-red-300">Body’s run down — go gently</p>
          ) : (
            <p className="text-xs text-haze-400">
              {aura.streak > 0
                ? `${aura.streak}-day streak`
                : 'Begin a streak today'}
            </p>
          )}
        </div>
        <span style={{ color: 'var(--rz-hue)' }}>›</span>
      </button>

      {/* today's sky */}
      {transit && (
        <button
          type="button"
          onClick={() => onTab('sky')}
          className="glass-panel p-4 text-left active:scale-[0.99]"
        >
          <p className="eyebrow">Today’s sky</p>
          <p className="mt-1 font-serif text-lg text-white">
            {transit.body} <span aria-hidden>{planetSymbol(transit.body)}</span>
            {focusPlanet?.retrograde && (
              <span className="ml-1 align-super text-xs text-haze-300">℞</span>
            )}
            <span className="text-haze-400"> · </span>
            {chakraName(focusChakra)}
          </p>
          <p className="mt-0.5 text-sm text-haze-300">
            {transit.title} · {transit.moonPhase} {transit.illumination}%{' '}
            {focusPlanet && (
              <span aria-hidden>{zodiacGlyph(focusPlanet.sign)}</span>
            )}
          </p>
          {!hasNatal && (
            <p className="mt-1 text-xs text-gold-300">
              Add your birth details for a personal reading →
            </p>
          )}
        </button>
      )}

      {/* one stone */}
      {heroStone && (
        <button
          type="button"
          onClick={() => onTab('apothecary')}
          className="glass-panel flex items-center gap-3 p-4 text-left active:scale-[0.99]"
        >
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{
              background: heroStone.color,
              boxShadow: `0 0 10px ${heroStone.color}`,
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg text-white">{heroStone.name}</p>
            <p className="text-xs text-haze-300">Keep it {heroStone.placement}</p>
          </div>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>
      )}
    </div>
  )
}
