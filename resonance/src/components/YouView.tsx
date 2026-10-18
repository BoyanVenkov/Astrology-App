import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { ChakraBody } from './ChakraBody'
import { useChakraField } from '../lib/chakraField'
import { computeAura } from '../lib/aura'
import { auraLabel, moodLabel, useT, type TFn } from '../lib/i18n'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { useEntitlements } from '../lib/premium'
import { useAuth } from '../lib/auth'
import artJournal from '../assets/art/icon-journal.webp'

interface YouViewProps {
  onOpen: (view: 'journal' | 'mood' | 'settings') => void
  onUpgrade: () => void
  onAuth: () => void
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="animate-rise-in">
      <p className="eyebrow mb-2 px-1">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  )
}

function Row({
  title,
  sub,
  art,
  accent = false,
  onClick,
}: {
  title: string
  sub: string
  art?: string
  accent?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-panel card-press flex items-center gap-3 justify-between p-4 text-start ${
        accent ? 'glass-panel-active' : ''
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        {art && (
          <img src={art} alt="" aria-hidden className="h-9 w-9 shrink-0 object-contain" />
        )}
        <span className="min-w-0">
          <span className="block font-serif text-lg leading-tight text-white">
            {title}
          </span>
          <span className="mt-0.5 block text-[0.8rem] text-haze-300">{sub}</span>
        </span>
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
  const chakraField = useChakraField()

  const focus = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focus, sessionLog, moodLog)
  const streak = practiceStreak(sessionLog)
  const totalMinutes = sessionLog
    .filter((s) => s.completed)
    .reduce((n, s) => n + s.minutes, 0)
  const totalSessions = sessionLog.filter((s) => s.completed).length
  const hasMoodToday = moodLog.some((m) => m.day === localDayKey())
  const focusReading = chakraField.find((c) => c.focus)

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <header className="animate-bloom-in px-1">
        <p className="eyebrow mb-2">{t('field.eyebrow')}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel glass-panel-active flex flex-col items-center gap-1 p-5 text-center">
            <Aura state={aura} size={120} className="h-24 w-24" />
            <p className="mt-1 font-serif text-lg leading-tight text-gilded">
              {auraLabel(aura.score, t)}
            </p>
            <p className="data text-xs text-haze-300">
              {Math.round(aura.score * 100)}%
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpen('journal')}
            className="card-press glass-panel flex flex-col items-center justify-center gap-1 p-5 text-center"
          >
            <ChakraBody field={chakraField} size={90} className="pointer-events-none" />
            {focusReading && (
              <>
                <p className="mt-1 font-serif text-lg leading-tight text-white">
                  {focusReading.name}
                </p>
                <p className="text-xs uppercase tracking-[0.1em] text-haze-300">
                  {focusReading.state}
                </p>
              </>
            )}
          </button>
        </div>
      </header>

      <Group title={t('you.progress')}>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onOpen('journal')}
            className="card-press glass-panel flex flex-col gap-2 p-4 text-start"
          >
            <span className="eyebrow">{t('you.practices')}</span>
            <span className="font-serif text-2xl text-white">{totalSessions}</span>
            <span className="data text-xs text-haze-400">
              {totalMinutes} {t('you.minutes')}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpen('journal')}
            className="card-press glass-panel flex flex-col gap-2 p-4 text-start"
          >
            <span className="eyebrow">{t('you.dayStreak')}</span>
            <span className="font-serif text-2xl text-white">{streak}</span>
          </button>
        </div>
        <Row
          title={t('you.journal')}
          sub={t('you.journalSub')}
          art={artJournal}
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
