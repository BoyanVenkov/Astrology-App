import { useAppStore } from '../store/useAppStore'
import { ALL_CRYSTALS } from '../data/esoteric'
import { chakraName } from '../lib/resonanceData'
import { Screen } from './Screen'

interface ApothecaryProps {
  onBack: () => void
  onShop: () => void
  onPractice: () => void
}

/** The crystal apothecary — today's transit-matched stones, then the full catalog. */
export function Apothecary({ onBack, onShop, onPractice }: ApothecaryProps) {
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const transit = useAppStore((s) => s.transit)
  const todayNames = new Set(dailyCrystals.map((c) => c.name))

  const featured = [
    ...ALL_CRYSTALS.filter((c) => todayNames.has(c.name)),
    ...ALL_CRYSTALS.filter((c) => !todayNames.has(c.name)),
  ]

  return (
    <Screen
      eyebrow="Apothecary"
      title="Crystal Companions"
      subtitle={
        transit
          ? `Stones for ${chakraName(transit.resonantChakra)} work today`
          : 'Stones that resonate with today’s transit'
      }
      onBack={onBack}
      action={
        <button
          type="button"
          onClick={onShop}
          className="text-[10px] uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          Shop ›
        </button>
      }
    >
      <div className="flex flex-col gap-3">
        {featured.map((crystal) => {
          const isToday = todayNames.has(crystal.name)
          return (
            <article
              key={crystal.id}
              className={`glass-panel p-4 ${isToday ? 'glass-panel-active' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: crystal.color,
                    boxShadow: `0 0 10px ${crystal.color}`,
                  }}
                />
                <h3 className="font-serif text-lg text-white">{crystal.name}</h3>
                {isToday && (
                  <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-gold-300">
                    Today
                  </span>
                )}
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-haze-400">
                {chakraName(crystal.chakra)} · {crystal.keywords.join(' · ')}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-haze-200">
                {crystal.description}
              </p>
            </article>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onPractice}
        className="text-center text-xs uppercase tracking-[0.14em] text-haze-500"
      >
        pair a stone with today’s practice →
      </button>
    </Screen>
  )
}
