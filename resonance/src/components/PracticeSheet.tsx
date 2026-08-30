import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { TodaysPractice } from './TodaysPractice'
import type { Prescription } from '../lib/prescription'
import type { RitualPreset } from '../types/resonance'

interface PracticeSheetProps {
  prescription: Prescription
  onClose: () => void
  onRitual: (launch: RitualPreset) => void
  onLibrary: () => void
}

function Row({
  title,
  sub,
  onClick,
}: {
  title: string
  sub: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left transition active:scale-[0.98]"
    >
      <span>
        <span className="font-serif text-base text-white">{title}</span>
        <span className="block text-xs text-haze-400">{sub}</span>
      </span>
      <span className="text-haze-500">›</span>
    </button>
  )
}

export function PracticeSheet({
  prescription,
  onClose,
  onRitual,
  onLibrary,
}: PracticeSheetProps) {
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
      className="fixed inset-0 z-50 flex flex-col justify-end bg-midnight-void/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto w-full max-w-md rounded-t-[28px] border-t p-5"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--rz-hue) 10%, #070b1c), #05070f)',
          borderColor: 'color-mix(in srgb, var(--rz-hue) 40%, transparent)',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

        <p className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
          {prescription.urgent ? 'Restore first' : "Today's practice"}
        </p>
        <h2 className="mt-1 font-serif text-2xl leading-snug text-gilded">
          {prescription.headline}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {prescription.directive}
        </p>

        <div className="mt-4">
          <TodaysPractice variant="inline" onLaunch={onRitual} />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Row
            title="Full library"
            sub="12 breath patterns · 12 meditations · 8 tones"
            onClick={onLibrary}
          />
          <Row
            title="2-minute reset"
            sub={doneToday ? 'A quick top-up' : 'Ground your energy fast'}
            onClick={() =>
              onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
            }
          />
        </div>
      </div>
    </div>
  )
}
