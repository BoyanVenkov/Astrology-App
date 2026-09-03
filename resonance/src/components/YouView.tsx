import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { computeAura } from '../lib/aura'
import { auraLabel, chakraLabel, moodLabel, useT, type TFn } from '../lib/i18n'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { useEntitlements } from '../lib/premium'
import { useAuth } from '../lib/auth'

interface YouViewProps {
  onOpen: (view: 'journal' | 'mood' | 'settings') => void
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
      className={`glass-panel flex items-center justify-between p-4 text-start transition active:scale-[0.99] ${
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
  const t: TFn = useT()
  const { status, user } = useAuth()
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const { isPro } = useEntitlements()

  const focus = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focus, sessionLog, moodLog)
  const streak = practiceStreak(sessionLog)
  const totalMinutes = sessionLog
    .filter((s) => s.completed)
    .reduce((n, s) => n + s.minutes, 0)
  const totalSessions = sessionLog.filter((s) => s.completed).length
  const hasMoodToday = moodLog.some((m) => m.day === localDayKey())

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center pt-1 text-center">
        <Aura state={aura} size={200} className="h-44 w-44" />
        <p className="eyebrow-hue mt-1">{t('aura.yours')}</p>
        <h1 className="font-serif text-3xl text-gilded">
          {auraLabel(aura.score, t)}
        </h1>
        <p className="mt-1 text-sm text-haze-300">
          {chakraLabel(focus, t)} · {Math.round(aura.score * 100)}%
        </p>
      </header>

      <Group title={t('you.progress')}>
        <button
          type="button"
          onClick={() => onOpen('journal')}
          className="glass-panel grid grid-cols-3 divide-x divide-white/8 p-4 transition active:scale-[0.99]"
        >
          {[
            { label: t('you.dayStreak'), value: streak },
            { label: t('you.practices'), value: totalSessions },
            { label: t('you.minutes'), value: totalMinutes },
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
          title={t('you.journal')}
          sub={t('you.journalSub')}
          onClick={() => onOpen('journal')}
        />
      </Group>

      <Group title={t('you.checkIn')}>
        <Row
          title={t('you.mood')}
          sub={
            hasMoodToday && aura.mood
              ? t('mood.todayIs', { mood: moodLabel(aura.mood, t) })
              : t('mood.checkInToday')
          }
          onClick={() => onOpen('mood')}
        />
      </Group>

      <Group title={t('you.account')}>
        {status === 'signed-in' ? (
          <Row
            title={t('you.backupOn')}
            sub={t('you.backupOnSub', {
              email: user?.email ?? t('set.signedIn'),
            })}
            onClick={() => onOpen('settings')}
          />
        ) : (
          <Row
            title={t('you.backupSync')}
            sub={t('you.backupSyncSub')}
            onClick={onAuth}
          />
        )}
        <Row
          title={isPro ? t('you.proActive') : t('you.pro')}
          sub={isPro ? t('you.proActiveSub') : t('you.proSub')}
          accent={!isPro}
          onClick={isPro ? () => onOpen('settings') : onUpgrade}
        />
        <Row
          title={t('you.settings')}
          sub={t('you.settingsSub')}
          onClick={() => onOpen('settings')}
        />
      </Group>
    </div>
  )
}
