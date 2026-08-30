import type { ReactNode } from 'react'
import type { TabKey } from '../types/resonance'
import { useDayHue } from '../lib/dayhue'
import { ApothecaryIcon, DashboardIcon, SkyIcon } from './icons'

interface LayoutProps {
  active: TabKey
  onTabChange: (tab: TabKey) => void
  onPractice: () => void
  practiceLabel: string
  children: ReactNode
}

type TabDef = {
  key: TabKey
  label: string
  Icon: (props: { className?: string }) => ReactNode
}

const YouIcon = (props: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    className={props.className}
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
  </svg>
)

const LEFT: TabDef[] = [
  { key: 'today', label: 'Today', Icon: DashboardIcon },
  { key: 'sky', label: 'Sky', Icon: SkyIcon },
]
const RIGHT: TabDef[] = [
  { key: 'apothecary', label: 'Stones', Icon: ApothecaryIcon },
  { key: 'you', label: 'You', Icon: YouIcon },
]

function Tab({
  def,
  active,
  onClick,
}: {
  def: TabDef
  active: boolean
  onClick: () => void
}) {
  const Icon = def.Icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors"
      style={{
        color: active ? 'var(--rz-hue)' : 'rgba(154,166,201,0.75)',
        filter: active ? 'drop-shadow(0 0 8px var(--rz-glow))' : undefined,
      }}
    >
      <Icon className="h-5 w-5" />
      <span>{def.label}</span>
    </button>
  )
}

export function Layout({
  active,
  onTabChange,
  onPractice,
  practiceLabel,
  children,
}: LayoutProps) {
  useDayHue()

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col">
      <div style={{ height: 'env(safe-area-inset-top)' }} aria-hidden />
      <div className="flex items-center justify-center py-2">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.4em] text-haze-500"
          style={{ textShadow: '0 0 14px var(--rz-glow)' }}
        >
          Resonance
        </span>
      </div>

      <main
        className="flex-1 px-4"
        style={{ paddingBottom: 'calc(6.5rem + env(safe-area-inset-bottom))' }}
      >
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t backdrop-blur-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,11,28,0.78), rgba(3,4,12,0.94))',
          borderColor: 'color-mix(in srgb, var(--rz-hue) 25%, transparent)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-end px-2 pb-1 pt-1.5">
          {LEFT.map((d) => (
            <Tab
              key={d.key}
              def={d}
              active={active === d.key}
              onClick={() => onTabChange(d.key)}
            />
          ))}

          {/* centre practice orb */}
          <div className="flex flex-1 justify-center">
            <button
              type="button"
              onClick={onPractice}
              aria-label={`Begin practice — ${practiceLabel}`}
              className="-mt-7 flex h-16 w-16 flex-col items-center justify-center rounded-full border text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition active:scale-95"
              style={{
                background:
                  'radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--rz-hue) 65%, #fff 10%), color-mix(in srgb, var(--rz-hue) 40%, #03040c))',
                borderColor: 'color-mix(in srgb, var(--rz-hue) 55%, transparent)',
                boxShadow:
                  '0 0 26px var(--rz-glow), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              <span className="animate-pulse-glow text-lg leading-none">✦</span>
            </button>
          </div>

          {RIGHT.map((d) => (
            <Tab
              key={d.key}
              def={d}
              active={active === d.key}
              onClick={() => onTabChange(d.key)}
            />
          ))}
        </div>
      </nav>
    </div>
  )
}
