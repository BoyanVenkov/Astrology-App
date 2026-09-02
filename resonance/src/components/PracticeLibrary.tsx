import { useMemo, useState } from 'react'
import { SOLFEGGIO_PRESETS } from '../audio/audioEngine'
import { useAppStore } from '../store/useAppStore'
import { BREATH_PATTERN_LIST } from '../lib/breathwork'
import { MEDITATION_STYLES } from '../lib/meditation'
import {
  breathName,
  breathTag,
  medName,
  medTag,
  solfeggioIntention,
  useT,
  type TFn,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
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
const MED_ORDER: MeditationCategory[] = [
  'grounding',
  'calm',
  'heart',
  'focus',
  'energy',
  'sleep',
]

const breathCatLabel = (c: BreathCategory, t: TFn): string =>
  t(`breath.cat.${c}` as MessageKey)
const medCatLabel = (c: MeditationCategory, t: TFn): string =>
  t(`med.cat.${c}` as MessageKey)

const midOf = (arr: number[]): number =>
  arr.length ? (arr[Math.floor(arr.length / 2)] ?? arr[0]) : 0

const lengthLabel = (durations: number[], t: TFn): string => {
  if (durations.length === 0) return t('lib.len.rounds')
  if (durations.length === 1) return t('lib.len.one', { n: durations[0] })
  return t('lib.len.range', {
    a: durations[0],
    b: durations[durations.length - 1],
  })
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
  const t = useT()
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
      ? t('lib.cat.all')
      : tab === 'breath'
        ? breathCatLabel(c as BreathCategory, t)
        : medCatLabel(c as MeditationCategory, t)

  const switchTab = (next: PracticeKind) => {
    setTab(next)
    setCat('all')
  }

  const shownBreaths = breaths.filter((b) => cat === 'all' || b.category === cat)
  const shownMeds = meditations.filter((m) => cat === 'all' || m.category === cat)

  return (
    <Screen
      eyebrow={t('lib.eyebrow')}
      title={t('lib.title')}
      subtitle={t('lib.sub', {
        breaths: breaths.length,
        meds: meditations.length,
        tones: SOLFEGGIO_PRESETS.length,
      })}
      onBack={onBack}
    >
      <div className="grid grid-cols-3 gap-2">
        {(['breath', 'meditation', 'frequency'] as PracticeKind[]).map((tk) => (
          <button
            key={tk}
            type="button"
            onClick={() => switchTab(tk)}
            className={`rounded-2xl border px-2 py-3 text-xs font-semibold transition ${
              tk === tab
                ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                : 'border-white/12 bg-white/5 text-haze-300'
            }`}
          >
            {t(`lib.tab.${tk}` as MessageKey)}
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
                    : onUpgrade(t('lib.reasonBreath'))
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
                  <h2 className="font-serif text-lg text-white">
                    {breathName(b.key, t)}
                  </h2>
                  {unlocked ? (
                    <span className="data ml-auto shrink-0 text-xs text-haze-400">
                      {b.ratio}
                    </span>
                  ) : (
                    <LockIcon className="ml-auto h-4 w-4 shrink-0 text-haze-400" />
                  )}
                </div>
                <p className="mt-1 text-sm text-haze-300">
                  {breathTag(b.key, t)}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-haze-500">
                  {t('lib.catMeta', {
                    cat: breathCatLabel(b.category, t),
                    len: lengthLabel(b.durations, t),
                  })}
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
                    : onUpgrade(t('lib.reasonMed'))
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
                  <h2 className="font-serif text-lg text-white">
                    {medName(m.key, t)}
                  </h2>
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
                      {t('med.yourChart')}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-haze-300">{medTag(m.key, t)}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-haze-500">
                  {t('lib.catMeta', {
                    cat: medCatLabel(m.category, t),
                    len: lengthLabel(m.durations, t),
                  })}
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
                    : onUpgrade(t('lib.reasonFreq'))
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
                      {t('lib.today')}
                    </span>
                  ) : (
                    !unlocked && (
                      <LockIcon className="ml-auto h-4 w-4 shrink-0 text-haze-400" />
                    )
                  )}
                </div>
                <p className="mt-1 text-sm text-haze-300">
                  {solfeggioIntention(p.frequency, t)}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-haze-500">
                  {t('freq.lengthNote')}
                </p>
              </button>
            )
          })}
      </div>
    </Screen>
  )
}
