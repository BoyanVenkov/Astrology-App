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

function Item({
  title,
  sub,
  onClick,
  accent,
}: {
  title: string
  sub: string
  onClick: () => void
  accent?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-panel flex items-center justify-between p-4 text-left transition active:scale-[0.98] ${
        accent ? 'glass-panel-active' : ''
      }`}
    >
      <span>
        <span className="font-serif text-lg text-white">{title}</span>
        <span className="block text-xs text-haze-300">{sub}</span>
      </span>
      <span style={{ color: 'var(--rz-hue)' }}>›</span>
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
        <p className="eyebrow">Practice</p>
        <h2 className="mt-1 font-serif text-2xl text-gilded">
          {prescription.headline}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {prescription.directive}
        </p>

        <div className="mt-4">
          <TodaysPractice variant="inline" onLaunch={onRitual} />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Item
            title="Practice library"
            sub="Every breathwork pattern & guided meditation"
            onClick={onLibrary}
          />
          <Item
            title="Frequency session"
            sub={`Sit with ${prescription.frequency} Hz for the ${prescription.chakraLabel}`}
            onClick={() =>
              onRitual({
                mode: 'frequency',
                frequency: prescription.frequency,
                minutes: 10,
              })
            }
          />
          <Item
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
