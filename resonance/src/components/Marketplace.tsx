import { useAppStore } from '../store/useAppStore'
import { ALL_CRYSTALS } from '../data/esoteric'
import { chakraName } from '../lib/resonanceData'
import { Screen } from './Screen'

interface MarketplaceProps {
  onBack: () => void
}

interface Masterclass {
  id: string
  title: string
  teacher: string
  minutes: number
  price: string
}

const MASTERCLASSES: Masterclass[] = [
  { id: 'quantum', title: 'Frequency & the Body', teacher: 'Dr. Lena Voss', minutes: 62, price: '$29' },
  { id: 'geometry', title: 'Sacred Geometry Foundations', teacher: 'Amara Okafor', minutes: 48, price: '$19' },
  { id: 'chakra', title: 'Advanced Chakra Balancing', teacher: 'Ravi Menon', minutes: 90, price: '$45' },
  { id: 'transits', title: 'Reading Your Transits', teacher: 'Sofia Klein', minutes: 55, price: '$25' },
]

// Placeholder — replace with real affiliate URLs before release.
const shopUrl = (name: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(`buy ${name} crystal`)}`

export function Marketplace({ onBack }: MarketplaceProps) {
  const transit = useAppStore((s) => s.transit)
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const todayNames = new Set(dailyCrystals.map((c) => c.name))

  const featured = [
    ...ALL_CRYSTALS.filter((c) => todayNames.has(c.name)),
    ...ALL_CRYSTALS.filter((c) => !todayNames.has(c.name)),
  ].slice(0, 10)

  return (
    <Screen
      eyebrow="Shop"
      title="The Apothecary Shop"
      subtitle={`Stones for ${transit ? chakraName(transit.resonantChakra) : 'your'} work, and deep-dive courses.`}
      onBack={onBack}
    >
      <section>
        <p className="eyebrow mb-2 px-1">Recommended stones</p>
        <div className="flex flex-col gap-2">
          {featured.map((crystal) => (
            <div
              key={crystal.id}
              className="glass-panel flex items-center gap-3 p-4"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  background: crystal.color,
                  boxShadow: `0 0 10px ${crystal.color}`,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg leading-tight text-white">
                  {crystal.name}
                  {todayNames.has(crystal.name) && (
                    <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-gold-300">
                      today
                    </span>
                  )}
                </p>
                <p className="text-xs text-haze-300">
                  {chakraName(crystal.chakra)}
                </p>
              </div>
              <a
                href={shopUrl(crystal.name)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100"
              >
                Shop
              </a>
            </div>
          ))}
        </div>
        <p className="mt-2 px-1 text-[11px] text-haze-400">
          Purchases open in your browser. Affiliate links help support the app.
        </p>
      </section>

      <section>
        <p className="eyebrow mb-2 px-1">Masterclasses</p>
        <div className="flex flex-col gap-2">
          {MASTERCLASSES.map((mc) => (
            <div key={mc.id} className="glass-panel flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg leading-tight text-white">
                  {mc.title}
                </p>
                <p className="text-xs text-haze-300">
                  {mc.teacher} · {mc.minutes} min
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-haze-200"
              >
                {mc.price}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 px-1 text-[11px] text-haze-400">
          One-time purchases · lifetime access. Coming with the next release.
        </p>
      </section>
    </Screen>
  )
}
