import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { auraLabel, computeAura, MOOD_META } from '../lib/aura'
import { bodyState } from '../lib/biometrics'
import { chakraName } from '../lib/resonanceData'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { useEntitlements } from '../lib/premium'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from '../types/resonance'

interface YouViewProps {
  onOpen: (view: 'journal' | 'mood' | 'body' | 'settings') => void
  onUpgrade: () => void
  onRitual: (preset: RitualPreset) => void
}

function Tile({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick?: () => void
}) {
  const inner = (
    <>
      <p className="font-serif text-2xl text-white">{value}</p>
      <p className="eyebrow mt-1">{label}</p>
    </>
  )
  return onClick ? (
    <button type="button" onClick={onClick} className="text-center">
      {inner}
    </button>
  ) : (
    <div className="text-center">{inner}</div>
  )
}

export function YouView({ onOpen, onUpgrade, onRitual }: YouViewProps) {
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const biometricLog = useAppStore((s) => s.biometricLog)
  const { isPro } = useEntitlements()

  const focus = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focus, sessionLog, moodLog, biometricLog)
  const streak = practiceStreak(sessionLog)
  const totalMinutes = sessionLog
    .filter((s) => s.completed)
    .reduce((n, s) => n + s.minutes, 0)
  const body = bodyState(biometricLog)
  const hasMoodToday = moodLog.some((m) => m.day === localDayKey())

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col items-center pt-1 text-center">
        <Aura state={aura} size={200} className="h-44 w-44" />
        <p className="eyebrow mt-1">Your aura</p>
        <h1 className="font-serif text-3xl text-gilded">{auraLabel(aura.score)}</h1>
        <p className="mt-1 text-sm text-haze-300">
          {chakraName(focus)} · {Math.round(aura.score * 100)}%
          {aura.recovery != null &&
            ` · body ${Math.round(aura.recovery * 100)}%`}
        </p>
      </header>

      <TodaysPractice
        variant="full"
        showDirective={false}
        onLaunch={onRitual}
      />

      <section className="glass-panel grid grid-cols-3 divide-x divide-white/8 p-4">
        <Tile label="day streak" value={String(streak)} onClick={() => onOpen('journal')} />
        <Tile
          label="practices"
          value={String(sessionLog.filter((s) => s.completed).length)}
          onClick={() => onOpen('journal')}
        />
        <Tile label="minutes" value={String(totalMinutes)} onClick={() => onOpen('journal')} />
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOpen('mood')}
          className="glass-panel p-4 text-left"
        >
          <span className="font-serif text-lg text-white">Mood</span>
          <span className="block text-xs text-haze-300">
            {hasMoodToday && aura.mood
              ? `Today: ${MOOD_META[aura.mood].label}`
              : 'Check in for today'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onOpen('body')}
          className="glass-panel p-4 text-left"
        >
          <span className="font-serif text-lg text-white">Body</span>
          <span className="block text-xs text-haze-300">
            {body.hasData ? `${body.label} · ${Math.round(body.recovery * 100)}%` : 'Log HRV & sleep'}
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen('journal')}
        className="glass-panel flex items-center justify-between p-4 text-left"
      >
        <span>
          <span className="font-serif text-lg text-white">Journal</span>
          <span className="block text-xs text-haze-300">
            Your practice history & aura over time
          </span>
        </span>
        <span style={{ color: 'var(--rz-hue)' }}>›</span>
      </button>

      <button
        type="button"
        onClick={isPro ? () => onOpen('settings') : onUpgrade}
        className="glass-panel glass-panel-active flex items-center justify-between p-4 text-left"
      >
        <span>
          <span className="font-serif text-lg text-white">
            {isPro ? 'Resonance Pro ✦' : 'Resonance Pro'}
          </span>
          <span className="block text-xs text-haze-300">
            {isPro ? 'Active · manage in settings' : 'Unlock the full engine'}
          </span>
        </span>
        <span style={{ color: 'var(--rz-hue)' }}>›</span>
      </button>

      <button
        type="button"
        onClick={() => onOpen('settings')}
        className="glass-panel flex items-center justify-between p-4 text-left"
      >
        <span className="font-serif text-lg text-white">Settings</span>
        <span style={{ color: 'var(--rz-hue)' }}>›</span>
      </button>
    </div>
  )
}
