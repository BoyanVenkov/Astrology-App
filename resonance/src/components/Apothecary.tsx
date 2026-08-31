import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { ALL_CRYSTALS } from '../data/esoteric'
import { CHAKRA_ORDER, chakraName } from '../lib/resonanceData'
import { Screen } from './Screen'
import type { ChakraKey } from '../types/resonance'

interface ApothecaryProps {
  onBack: () => void
  onPractice: () => void
}

/** The crystal apothecary — today's transit-matched stones, then the full catalogue. */
export function Apothecary({ onBack, onPractice }: ApothecaryProps) {
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const transit = useAppStore((s) => s.transit)
  const todayNames = useMemo(
    () => new Set(dailyCrystals.map((c) => c.name)),
    [dailyCrystals],
  )

  const [filter, setFilter] = useState<ChakraKey | 'all'>('all')

  const list = useMemo(() => {
    const pool =
      filter === 'all'
        ? ALL_CRYSTALS
        : ALL_CRYSTALS.filter((c) => c.chakra === filter)
    // today's stones first, then the rest (already A–Z within each group)
    return [
      ...pool.filter((c) => todayNames.has(c.name)),
      ...pool.filter((c) => !todayNames.has(c.name)),
    ]
  }, [filter, todayNames])

  return (
    <Screen
      eyebrow="Apothecary"
      title="Crystal Companions"
      subtitle={
        transit
          ? `Stones for ${chakraName(transit.resonantChakra)} work today · ${ALL_CRYSTALS.length} in the cabinet`
          : `${ALL_CRYSTALS.length} stones in the cabinet`
      }
      onBack={onBack}
    >
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {(['all', ...CHAKRA_ORDER] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition"
            style={{
              color: filter === k ? 'var(--rz-hue)' : 'rgba(166,177,209,0.9)',
              boxShadow:
                filter === k
                  ? 'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 60%, transparent)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            {k === 'all' ? 'All' : chakraName(k)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {list.map((crystal) => {
          const isToday = todayNames.has(crystal.name)
          return (
            <article
              key={crystal.id}
              className={`glass-panel p-4 ${isToday ? 'glass-panel-active' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-[18px] w-[18px] shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.85), ${crystal.color} 58%)`,
                    boxShadow: `0 0 10px ${crystal.color}, inset 0 0 4px rgba(255,255,255,0.35)`,
                  }}
                />
                <h3 className="font-serif text-lg leading-tight text-white">
                  {crystal.name}
                </h3>
                {isToday && (
                  <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-gold-300">
                    Today
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-haze-400">
                {chakraName(crystal.chakra)} · {crystal.keywords.join(' · ')}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-haze-200">
                {crystal.description}
              </p>
            </article>
          )
        })}
        {list.length === 0 && (
          <p className="px-1 text-sm text-haze-400">
            No stones filed under {filter === 'all' ? 'that' : chakraName(filter)}.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onPractice}
        className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        pair a stone with today’s practice →
      </button>
    </Screen>
  )
}
