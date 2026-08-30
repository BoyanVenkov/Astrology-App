import { useAppStore } from '../store/useAppStore'
import { useEntitlements } from '../lib/premium'
import type { Prescription } from '../lib/prescription'
import type { PracticeKind } from '../types/resonance'

export interface RitualLaunch {
  mode: PracticeKind
  minutes: number
  skipIntro?: boolean
}

interface PracticeSheetProps {
  prescription: Prescription
  onClose: () => void
  onRitual: (launch: RitualLaunch) => void
  onFrequency: () => void
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
  onFrequency,
}: PracticeSheetProps) {
  const doneToday = useAppStore(
    (s) => s.sessionLog.filter((x) => x.completed).length > 0,
  )
  const { isPro } = useEntitlements()

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

        <div className="mt-4 flex flex-col gap-2">
          <Item
            accent
            title={prescription.urgent ? 'Restore now' : "Today's ritual"}
            sub={`${prescription.minutes} min · ${prescription.frequency} Hz · ${prescription.breathLabel}`}
            onClick={() =>
              onRitual({ mode: 'meditation', minutes: prescription.minutes })
            }
          />
          <Item
            title="Breathwork"
            sub={`${prescription.breathLabel} · ${prescription.breathRatio}`}
            onClick={() => onRitual({ mode: 'breath', minutes: 6 })}
          />
          <Item
            title="Meditation"
            sub={`Guided · ${prescription.chakraLabel}`}
            onClick={() => onRitual({ mode: 'meditation', minutes: 10 })}
          />
          <Item
            title="Frequency"
            sub={
              isPro ? 'Full Solfeggio library' : `${prescription.frequency} Hz + 2 more`
            }
            onClick={onFrequency}
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
