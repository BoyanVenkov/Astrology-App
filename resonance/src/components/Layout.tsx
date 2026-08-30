import type { ReactNode } from 'react'
import type { TabKey } from '../types/resonance'
import { useDayHue } from '../lib/dayhue'
import { ResonanceLockup } from './Logo'
import { TabBackdrop } from './TabBackdrop'
import {
  DashboardIcon,
  GearIcon,
  SkyIcon,
  SparkIcon,
  TarotIcon,
  YouIcon,
} from './icons'

interface LayoutProps {
  active: TabKey
  onTabChange: (tab: TabKey) => void
  onPractice: () => void
  practiceLabel: string
  /** Renders the settings gear in the top chrome when set (tab roots only). */
  onSettings?: () => void
  children: ReactNode
}

type TabDef = {
  key: TabKey
  label: string
  Icon: (props: { className?: string }) => ReactNode
}

const LEFT: TabDef[] = [
  { key: 'today', label: 'Today', Icon: DashboardIcon },
  { key: 'sky', label: 'Sky', Icon: SkyIcon },
]
const RIGHT: TabDef[] = [
  { key: 'tarot', label: 'Tarot', Icon: TarotIcon },
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
      className="relative flex min-h-[3.4rem] flex-1 flex-col items-center justify-center gap-[3px] rounded-2xl px-1 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] transition-[color,transform] active:scale-95"
      style={{
        color: active ? 'var(--rz-hue)' : 'rgba(147,159,193,0.6)',
        filter: active ? 'drop-shadow(0 0 9px var(--rz-glow))' : undefined,
      }}
    >
      <Icon className="h-[1.45rem] w-[1.45rem]" />
      <span>{def.label}</span>
      <span
        className="absolute bottom-0 h-[3px] w-[3px] rounded-full transition-opacity"
        style={{
          background: 'var(--rz-hue)',
          opacity: active ? 1 : 0,
        }}
      />
    </button>
  )
}

export function Layout({
  active,
  onTabChange,
  onPractice,
  practiceLabel,
  onSettings,
  children,
}: LayoutProps) {
  useDayHue()

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col">
      {/* per-tab atmosphere, pinned to the viewport behind everything */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-[100dvh] w-full max-w-md overflow-hidden"
      >
        <TabBackdrop tab={active} />
      </div>

      <div style={{ height: 'env(safe-area-inset-top)' }} aria-hidden />
      {onSettings ? (
        <div className="relative z-10 flex items-center justify-center px-3 py-2.5">
          <ResonanceLockup />
          <button
            type="button"
            onClick={onSettings}
            aria-label="Settings"
            className="absolute right-2 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-haze-300 transition active:scale-90 active:bg-white/10"
          >
            <GearIcon className="h-[1.2rem] w-[1.2rem]" />
          </button>
        </div>
      ) : (
        <div className="h-3" aria-hidden />
      )}

      <main
        className="relative z-10 min-w-0 flex-1 px-4"
        style={{ paddingBottom: 'calc(6.5rem + env(safe-area-inset-bottom))' }}
      >
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-white/[0.06] backdrop-blur-2xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,9,22,0.72) 0%, rgba(3,4,12,0.96) 100%)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-end px-1.5 pb-1 pt-1.5">
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
              className="relative -mt-7 grid h-[3.6rem] w-[3.6rem] place-items-center rounded-full border transition active:scale-95"
              style={{
                background:
                  'radial-gradient(circle at 50% 32%, color-mix(in srgb, var(--rz-hue) 72%, #fff 16%), color-mix(in srgb, var(--rz-hue) 38%, #05070f) 78%)',
                borderColor: 'color-mix(in srgb, var(--rz-hue) 45%, transparent)',
                boxShadow:
                  '0 0 30px -4px var(--rz-glow), 0 8px 20px -6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              <span
                aria-hidden
                className="absolute inset-1.5 rounded-full border border-white/15"
              />
              <SparkIcon className="h-6 w-6 animate-pulse-glow text-[#05070f]" />
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
