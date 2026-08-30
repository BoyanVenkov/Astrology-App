import { useMemo, useState } from 'react'
import { SOLFEGGIO_PRESETS } from '../audio/audioEngine'
import { useAppStore } from '../store/useAppStore'
import { BREATH_PATTERN_LIST } from '../lib/breathwork'
import { MEDITATION_STYLES } from '../lib/meditation'
import {
  breathUnlocked,
  meditationUnlocked,
  useEntitlements,
} from '../lib/premium'
import { chakraColor } from '../lib/resonanceData'
import { LockIcon } from './icons'
import { Screen } from './Screen'
import type {
  BreathCategory,
  MeditationCategory,
  PracticeKind,
  RitualPreset,
} from '../types/resonance'

interface PracticeLibraryProps {
  onBack: () => void
  onLaunch: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
}

const BREATH_ORDER: Record<BreathCategory, number> = {
  calm: 0,
  balance: 1,
  energy: 2,
  advanced: 3,
}
const BREATH_CAT_LABEL: Record<BreathCategory, string> = {
  calm: 'Calm',
  balance: 'Balance',
  energy: 'Energy',
  advanced: 'Advanced',
}
const MED_CAT_LABEL: Record<MeditationCategory, string> = {
  grounding: 'Grounding',
  calm: 'Calm',
  heart: 'Heart',
  focus: 'Focus',
  sleep: 'Sleep',
  energy: 'Energy',
}
const MED_ORDER: MeditationCategory[] = [
  'grounding',
  'calm',
  'heart',
  'focus',
  'energy',
  'sleep',
]

const TAB_LABEL: Record<PracticeKind, string> = {
  breath: 'Breathwork',
  meditation: 'Meditation',
  frequency: 'Frequency',
}

const midOf = (arr: number[]): number =>
  arr.length ? (arr[Math.floor(arr.length / 2)] ?? arr[0]) : 0

const lengthLabel = (durations: number[]): string => {
  if (durations.length === 0) return '3 rounds · ~12 min'
  if (durations.length === 1) return `${durations[0]} min`
  return `${durations[0]}–${durations[durations.length - 1]} min`
}

const breaths = [...BREATH_PATTERN_LIST].sort(
  (a, b) => BREATH_ORDER[a.category] - BREATH_ORDER[b.category],
)
const meditations = [...MEDITATION_STYLES].sort(
  (a, b) => MED_ORDER.indexOf(a.category) - MED_ORDER.indexOf(b.category),
)

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] transition"
      style={{
        color: active ? 'var(--rz-hue)' : 'rgba(154,166,201,0.8)',
        boxShadow: active
          ? 'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 60%, transparent)'
          : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      {label}
    </button>
  )
}

export function PracticeLibrary({
  onBack,
  onLaunch,
  onUpgrade,
}: PracticeLibraryProps) {
  const [tab, setTab] = useState<PracticeKind>('breath')
  const [cat, setCat] = useState<string>('all')
  const { isPro, freeFrequencyCount } = useEntitlements()
  const recommended = useAppStore((s) => s.transit?.recommendedFrequency)

  const categories = useMemo(() => {
    if (tab === 'frequency') return []
    const set =
      tab === 'breath'
        ? [...new Set(breaths.map((b) => b.category))].sort(
            (a, b) => BREATH_ORDER[a] - BREATH_ORDER[b],
          )
        : [...new Set(meditations.map((m) => m.category))].sort(
            (a, b) => MED_ORDER.indexOf(a) - MED_ORDER.indexOf(b),
          )
    return ['all', ...set]
  }, [tab])

  const catLabel = (c: string): string =>
    c === 'all'
      ? 'All'
      : tab === 'breath'
        ? BREATH_CAT_LABEL[c as BreathCategory]
        : MED_CAT_LABEL[c as MeditationCategory]

  const switchTab = (next: PracticeKind) => {
    setTab(next)
    setCat('all')
  }

  const shownBreaths = breaths.filter((b) => cat === 'all' || b.category === cat)
  const shownMeds = meditations.filter((m) => cat === 'all' || m.category === cat)

  return (
    <Screen
      eyebrow="Practice Library"
      title="Choose how you want to sit"
      subtitle={`${breaths.length} breath patterns · ${meditations.length} meditations · ${SOLFEGGIO_PRESETS.length} tones`}
      onBack={onBack}
    >
      <div className="grid grid-cols-3 gap-2">
        {(['breath', 'meditation', 'frequency'] as PracticeKind[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => switchTab(t)}
            className={`rounded-2xl border px-2 py-3 text-xs font-semibold transition ${
              t === tab
                ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                : 'border-white/12 bg-white/5 text-haze-300'
            }`}
          >
            {TAB_LABEL[t]}
          </button>
        ))}
      </div>

      {categories.length > 0 && (
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {categories.map((c) => (
            <Chip
              key={c}
              label={catLabel(c)}
              active={cat === c}
              onClick={() => setCat(c)}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {tab === 'breath' &&
          shownBreaths.map((b) => {
            const unlocked = breathUnlocked(b.key, isPro)
            return (
              <button
                key={b.key}
                type="button"
                onClick={() =>
                  unlocked
                    ? onLaunch({
                        mode: 'breath',
                        breathPattern: b.key,
                        minutes: midOf(b.durations),
                      })
                    : onUpgrade('Every breath pattern')
                }
                className={`glass-panel p-4 text-left active:scale-[0.99] ${
                  unlocked ? '' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: b.accent,
                      boxShadow: `0 0 10px ${b.accent}`,
                    }}
                  />
                  <h2 className="font-serif text-lg text-white">{b.name}</h2>
                  {unlocked ? (
                    <span className="data ml-auto shrink-0 text-xs text-haze-400">
                      {b.ratio}
                    </span>
                  ) : (
                    <LockIcon className="ml-auto h-4 w-4 shrink-0 text-haze-400" />
                  )}
                </div>
                <p className="mt-1 text-sm text-haze-300">{b.tagline}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-haze-500">
                  {BREATH_CAT_LABEL[b.category]} · {lengthLabel(b.durations)}
                </p>
              </button>
            )
          })}

        {tab === 'meditation' &&
          shownMeds.map((m) => {
            const unlocked = meditationUnlocked(m.key, isPro)
            return (
              <button
                key={m.key}
                type="button"
                onClick={() =>
                  unlocked
                    ? onLaunch({
                        mode: 'meditation',
                        meditationStyle: m.key,
                        minutes: midOf(m.durations),
                      })
                    : onUpgrade('Every guided meditation')
                }
                className={`glass-panel p-4 text-left active:scale-[0.99] ${
                  unlocked ? '' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: 'var(--rz-hue)',
                      boxShadow: '0 0 10px var(--rz-glow)',
                    }}
                  />
                  <h2 className="font-serif text-lg text-white">{m.name}</h2>
                  {!unlocked ? (
                    <LockIcon className="ml-auto h-4 w-4 shrink-0 text-haze-400" />
                  ) : m.dynamic ? (
                    <span
                      className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em]"
                      style={{
                        color: chakraColor('third-eye'),
                        boxShadow: `inset 0 0 0 1px ${chakraColor('third-eye')}66`,
                      }}
                    >
                      Your chart
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-haze-300">{m.tagline}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-haze-500">
                  {MED_CAT_LABEL[m.category]} · {lengthLabel(m.durations)}
                </p>
              </button>
            )
          })}

        {tab === 'frequency' &&
          SOLFEGGIO_PRESETS.map((p, i) => {
            const isToday = p.frequency === recommended
            const unlocked = isPro || i < freeFrequencyCount || isToday
            return (
              <button
                key={p.frequency}
                type="button"
                onClick={() =>
                  unlocked
                    ? onLaunch({
                        mode: 'frequency',
                        frequency: p.frequency,
                        minutes: 10,
                      })
                    : onUpgrade('The full frequency library')
                }
                className={`glass-panel p-4 text-left active:scale-[0.99] ${
                  unlocked ? '' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: p.color,
                      boxShadow: `0 0 10px ${p.color}`,
                    }}
                  />
                  <h2 className="data text-base font-normal text-white">
                    {p.frequency} Hz
                  </h2>
                  {isToday ? (
                    <span
                      className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em]"
                      style={{ color: p.color, boxShadow: `inset 0 0 0 1px ${p.color}66` }}
                    >
                      Today
                    </span>
                  ) : (
                    !unlocked && (
                      <LockIcon className="ml-auto h-4 w-4 shrink-0 text-haze-400" />
                    )
                  )}
                </div>
                <p className="mt-1 text-sm text-haze-300">{p.intention}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-haze-500">
                  Frequency · 5–45 min
                </p>
              </button>
            )
          })}
      </div>
    </Screen>
  )
}
