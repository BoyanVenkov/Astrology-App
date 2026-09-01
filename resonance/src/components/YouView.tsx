import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { auraLabel, computeAura, MOOD_META } from '../lib/aura'
import { bodyState } from '../lib/biometrics'
import { chakraName } from '../lib/resonanceData'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { useEntitlements } from '../lib/premium'
import { useAuth } from '../lib/auth'

interface YouViewProps {
  onOpen: (view: 'journal' | 'mood' | 'body' | 'settings') => void
  onUpgrade: () => void
  onAuth: () => void
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <p className="eyebrow mb-2 px-1">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  )
}

function Row({
  title,
  sub,
  accent = false,
  onClick,
}: {
  title: string
  sub: string
  accent?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-panel flex items-center justify-between p-4 text-left transition active:scale-[0.99] ${
        accent ? 'glass-panel-active' : ''
      }`}
    >
      <span className="min-w-0">
        <span className="block font-serif text-lg leading-tight text-white">
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-haze-300">{sub}</span>
      </span>
      <span className="shrink-0" style={{ color: 'var(--rz-hue)' }}>
        ›
      </span>
    </button>
  )
}

export function YouView({ onOpen, onUpgrade, onAuth }: YouViewProps) {
  const { status, user } = useAuth()
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
  const totalSessions = sessionLog.filter((s) => s.completed).length
  const body = bodyState(biometricLog)
  const hasMoodToday = moodLog.some((m) => m.day === localDayKey())

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center pt-1 text-center">
        <Aura state={aura} size={200} className="h-44 w-44" />
        <p className="eyebrow-hue mt-1">Your aura</p>
        <h1 className="font-serif text-3xl text-gilded">
          {auraLabel(aura.score)}
        </h1>
        <p className="mt-1 text-sm text-haze-300">
          {chakraName(focus)} · {Math.round(aura.score * 100)}%
          {aura.recovery != null && ` · body ${Math.round(aura.recovery * 100)}%`}
        </p>
      </header>

      <Group title="Progress">
        <button
          type="button"
          onClick={() => onOpen('journal')}
          className="glass-panel grid grid-cols-3 divide-x divide-white/8 p-4 transition active:scale-[0.99]"
        >
          {[
            { label: 'day streak', value: streak },
            { label: 'practices', value: totalSessions },
            { label: 'minutes', value: totalMinutes },
          ].map((s) => (
            <span key={s.label} className="text-center">
              <span className="block font-serif text-2xl text-white">
                {s.value}
              </span>
              <span className="eyebrow mt-1 block">{s.label}</span>
            </span>
          ))}
        </button>
        <Row
          title="Journal"
          sub="Practice history & aura over time"
          onClick={() => onOpen('journal')}
        />
      </Group>

      <Group title="Check in">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onOpen('mood')}
            className="glass-panel p-4 text-left transition active:scale-[0.98]"
          >
            <span className="block font-serif text-lg text-white">Mood</span>
            <span className="mt-0.5 block text-xs text-haze-300">
              {hasMoodToday && aura.mood
                ? `Today: ${MOOD_META[aura.mood].label}`
                : 'Check in for today'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpen('body')}
            className="glass-panel p-4 text-left transition active:scale-[0.98]"
          >
            <span className="block font-serif text-lg text-white">Body</span>
            <span className="mt-0.5 block text-xs text-haze-300">
              {body.hasData
                ? `${body.label} · ${Math.round(body.recovery * 100)}%`
                : 'Log HRV & sleep'}
            </span>
          </button>
        </div>
      </Group>

      <Group title="Account">
        {status === 'signed-in' ? (
          <Row
            title="Backup on ✦"
            sub={`${user?.email ?? 'Signed in'} · manage in settings`}
            onClick={() => onOpen('settings')}
          />
        ) : (
          <Row
            title="Back up & sync"
            sub="Sign in so your data survives a reinstall"
            onClick={onAuth}
          />
        )}
        <Row
          title={isPro ? 'Resonance Pro ✦' : 'Resonance Pro'}
          sub={isPro ? 'Active · manage in settings' : 'Unlock the full engine'}
          accent={!isPro}
          onClick={isPro ? () => onOpen('settings') : onUpgrade}
        />
        <Row
          title="Settings"
          sub="Sound, notifications, chart, location, data"
          onClick={() => onOpen('settings')}
        />
      </Group>
    </div>
  )
}
