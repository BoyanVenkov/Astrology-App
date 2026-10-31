import { useEffect, type ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useT } from '../lib/i18n'
import { TodaysPractice } from './TodaysPractice'
import { GemArt } from './ui'
import { ChevronIcon, PlayIcon } from './icons'
import { crystalName } from '../lib/crystals'
import { primaryPreset, type Prescription } from '../lib/prescription'
import type { RitualPreset } from '../types/resonance'

interface PracticeSheetProps {
  prescription: Prescription
  onClose: () => void
  onRitual: (launch: RitualPreset) => void
  onUpgrade: (reason?: string) => void
  onLibrary: () => void
  /** The stones for today's work — the Practice section's third home. */
  onStones: () => void
}

function Row({
  title,
  sub,
  leading,
  onClick,
}: {
  title: string
  sub: string
  leading?: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-start transition hover:border-[rgba(232,194,116,0.35)] active:scale-[0.98]"
    >
      {leading}
      <span className="min-w-0 flex-1">
        <span className="font-serif text-base text-white">{title}</span>
        <span className="block text-xs text-haze-400">{sub}</span>
      </span>
      <ChevronIcon className="h-4 w-4 shrink-0 -scale-x-100 text-[color:var(--rz-gold)] rtl:scale-x-100" />
    </button>
  )
}

export function PracticeSheet({
  prescription,
  onClose,
  onRitual,
  onUpgrade,
  onLibrary,
  onStones,
}: PracticeSheetProps) {
  const t = useT()
  const stone = prescription.stones[0]
  const doneToday = useAppStore(
    (s) => s.sessionLog.filter((x) => x.completed).length > 0,
  )

  // close on Escape / back gesture without losing the scrim tap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-midnight-void/70 backdrop-blur-sm sm:justify-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="mx-auto max-h-[100dvh] w-full max-w-md overflow-y-auto overscroll-contain rounded-t-[28px] border-t p-5 sm:max-h-[92dvh] sm:rounded-b-[28px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--rz-gold) 10%, #070b1c), #05070f)',
          borderColor: 'color-mix(in srgb, var(--rz-gold) 40%, transparent)',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

        <p className="eyebrow" style={{ color: 'var(--rz-gold)' }}>
          {prescription.urgent ? t('tp.restoreFirst') : t('tp.today')}
        </p>
        <h2 className="mt-1 font-serif text-2xl leading-snug text-gilded">
          {prescription.headline}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {prescription.directive}
        </p>

        <button
          type="button"
          onClick={() => onRitual(primaryPreset(prescription))}
          className="btn-gold mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2.5 text-[0.95rem]"
        >
          <PlayIcon className="h-4 w-4 rtl:-scale-x-100" />
          {t('dash.beginPractice')}
        </button>

        <div className="mt-3">
          <TodaysPractice variant="inline" onLaunch={onRitual} onUpgrade={onUpgrade} />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Row
            title={t('tp.fullLibrary')}
            sub={t('tp.librarySub')}
            onClick={onLibrary}
          />
          <Row
            title={t('tp.reset2')}
            sub={doneToday ? t('tp.resetTopUp') : t('tp.resetGround')}
            onClick={() =>
              onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
            }
          />
          <Row
            title={t('sky.tileStones')}
            sub={stone ? crystalName(stone.name, t) : t('sky.stonesEmpty')}
            leading={
              stone && <GemArt name={stone.name} color={stone.color} className="h-9 w-9 shrink-0" />
            }
            onClick={onStones}
          />
        </div>
      </div>
    </div>
  )
}
