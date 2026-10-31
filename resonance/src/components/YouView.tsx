import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { ChakraBody } from './ChakraBody'
import { useChakraField } from '../lib/chakraField'
import { computeAura } from '../lib/aura'
import { auraLabel, moodLabel, signLabel, useT, type TFn } from '../lib/i18n'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { useEntitlements } from '../lib/premium'
import { useAuth } from '../lib/auth'
import { zodiacGlyph } from '../lib/resonanceData'
import { GlyphBadge, ListRow } from './ui'
import { GearIcon, JournalIcon, LockIcon, PulseIcon, SparkIcon } from './icons'

interface YouViewProps {
  onOpen: (view: 'journal' | 'mood' | 'settings') => void
  onUpgrade: () => void
  onAuth: () => void
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="animate-rise-in">
      <p className="eyebrow mb-2 px-1">{title}</p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  )
}

/** A gold-ringed icon for the list rows — the same medallion the transit rows use. */
function RowIcon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[color:var(--rz-gold)]"
      style={{
        background: 'radial-gradient(circle at 50% 35%, rgba(232,194,116,0.18), rgba(6,8,22,0.85) 70%)',
        boxShadow: 'inset 0 0 0 1.5px rgba(232,194,116,0.55)',
      }}
    >
      {children}
    </span>
  )
}

export function YouView({ onOpen, onUpgrade, onAuth }: YouViewProps) {
  const t: TFn = useT()
  const { status, user } = useAuth()
  const chakra = useAppStore((s) => s.chakra)
  const transit = useAppStore((s) => s.transit)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const profile = useAppStore((s) => s.profile)
  const natal = useAppStore((s) => s.natal)
  const editProfile = useAppStore((s) => s.editProfile)
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
  const sun = natal.find((p) => p.body === 'Sun')
  const moon = natal.find((p) => p.body === 'Moon')

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      {/* ---- who you are, in the sky ---- */}
      <header className="glass-panel glass-gold animate-bloom-in flex items-center gap-4 p-4">
        <GlyphBadge glyph={sun ? zodiacGlyph(sun.sign) : '✦'} size={64} />
        <div className="min-w-0 flex-1">
          <p className="eyebrow-hue">{t('nav.profile')}</p>
          <p className="mt-1 font-serif text-[1.35rem] leading-tight text-gilded">
            {sun ? signLabel(sun.sign, t) : t('sky.addChart')}
            {moon && (
              <span className="text-haze-300">
                {' · '}
                <span aria-hidden className="font-serif">{zodiacGlyph(moon.sign)}</span>{' '}
                {signLabel(moon.sign, t)}
              </span>
            )}
          </p>
          {profile && (
            <p className="data mt-1 truncate text-[0.75rem] text-haze-400">
              {profile.date} · {profile.timeKnown ? profile.time : t('scr.natal.timeUnknown')}
              {profile.placeLabel ? ` · ${profile.placeLabel}` : ''}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={editProfile}
          className="shrink-0 self-start rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--rz-gold)] shadow-[inset_0_0_0_1px_rgba(232,194,116,0.4)] transition hover:bg-[rgba(232,194,116,0.1)]"
        >
          {profile ? t('scr.natal.edit') : t('scr.natal.addDetails')}
        </button>
      </header>

      {/* ---- the field today + progress ---- */}
      <section className="animate-rise-in grid grid-cols-2 gap-3">
        <div className="glass-panel flex flex-col items-center gap-1 p-4 text-center">
          <Aura state={aura} size={110} className="h-20 w-20" />
          <p className="mt-1 font-serif text-[1.05rem] leading-tight text-white">
            {auraLabel(aura.score, t)}
          </p>
          <p className="data text-xs text-[#f3dca4]">{Math.round(aura.score * 100)}%</p>
        </div>
        <div className="glass-panel flex flex-col items-center justify-center gap-1 p-4 text-center">
          <ChakraBody field={chakraField} size={64} className="pointer-events-none" />
          {focusReading && (
            <>
              <p className="mt-1 font-serif text-[1.05rem] leading-tight text-white">
                {focusReading.name}
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.1em] text-haze-300">
                {focusReading.state}
              </p>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => onOpen('journal')}
          className="glass-panel card-lift card-press flex flex-col gap-1 p-4 text-start"
        >
          <span className="eyebrow">{t('you.practices')}</span>
          <span className="font-serif text-[1.8rem] leading-none text-gilded">{totalSessions}</span>
          <span className="data text-xs text-haze-400">
            {totalMinutes} {t('you.minutes')}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onOpen('journal')}
          className="glass-panel card-lift card-press flex flex-col gap-1 p-4 text-start"
        >
          <span className="eyebrow">{t('you.dayStreak')}</span>
          <span className="font-serif text-[1.8rem] leading-none text-gilded">{streak}</span>
        </button>
        <p className="col-span-2 -mt-1 px-1 text-center text-[11px] leading-snug text-haze-500">
          {t('dash.symbolicNote')}
        </p>
      </section>

      <Group title={t('you.progress')}>
        <ListRow
          leading={<RowIcon><JournalIcon className="h-5 w-5" /></RowIcon>}
          title={t('you.journal')}
          sub={t('you.journalSub')}
          onClick={() => onOpen('journal')}
        />
      </Group>

      <Group title={t('you.checkIn')}>
        <ListRow
          leading={<RowIcon><PulseIcon className="h-5 w-5" /></RowIcon>}
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
        <ListRow
          active={!isPro}
          leading={<RowIcon>{isPro ? <SparkIcon className="h-5 w-5" /> : <LockIcon className="h-5 w-5" />}</RowIcon>}
          title={isPro ? t('you.proActive') : t('you.pro')}
          sub={isPro ? t('you.proActiveSub') : t('you.proSub')}
          onClick={isPro ? () => onOpen('settings') : onUpgrade}
        />
        {status === 'signed-in' ? (
          <ListRow
            leading={<RowIcon><SparkIcon className="h-5 w-5" /></RowIcon>}
            title={t('you.backupOn')}
            sub={t('you.backupOnSub', {
              email: user?.email ?? t('set.signedIn'),
            })}
            onClick={() => onOpen('settings')}
          />
        ) : (
          <ListRow
            leading={<RowIcon><SparkIcon className="h-5 w-5" /></RowIcon>}
            title={t('you.backupSync')}
            sub={t('you.backupSyncSub')}
            onClick={onAuth}
          />
        )}
        <ListRow
          leading={<RowIcon><GearIcon className="h-5 w-5" /></RowIcon>}
          title={t('you.settings')}
          sub={t('you.settingsSub')}
          onClick={() => onOpen('settings')}
        />
      </Group>
    </div>
  )
}
