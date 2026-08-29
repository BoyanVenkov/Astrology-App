import type { ReactNode } from 'react'
import type { TabKey } from '../types/resonance'
import {
  ApothecaryIcon,
  BreathIcon,
  DashboardIcon,
  FrequenciesIcon,
  GearIcon,
} from './icons'

interface LayoutProps {
  active: TabKey
  onTabChange: (tab: TabKey) => void
  onOpenSettings: () => void
  children: ReactNode
}

type TabDef = {
  key: TabKey
  label: string
  Icon: (props: { className?: string }) => ReactNode
}

const TABS: TabDef[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { key: 'frequencies', label: 'Frequencies', Icon: FrequenciesIcon },
  { key: 'breathwork', label: 'Breathwork', Icon: BreathIcon },
  { key: 'apothecary', label: 'Apothecary', Icon: ApothecaryIcon },
]

export function Layout({
  active,
  onTabChange,
  onOpenSettings,
  children,
}: LayoutProps) {
  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col">
      {/* iOS notch / status-bar spacer */}
      <div style={{ height: 'env(safe-area-inset-top)' }} aria-hidden />

      <div className="flex justify-end px-3 pt-1.5">
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Settings"
          className="rounded-full p-1.5 text-haze-400 active:text-haze-100"
        >
          <GearIcon className="h-5 w-5" />
        </button>
      </div>

      <main
        className="flex-1 px-4 pt-1"
        style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))' }}
      >
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-gold-500/20 backdrop-blur-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,11,28,0.72), rgba(3,4,12,0.92))',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <ul className="flex items-stretch justify-around px-2 py-1.5">
          {TABS.map(({ key, label, Icon }) => {
            const isActive = key === active
            return (
              <li key={key} className="flex-1">
                <button
                  type="button"
                  onClick={() => onTabChange(key)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[3.25rem] w-full flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'text-gold-300'
                      : 'text-haze-400 active:text-haze-100'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive
                        ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.65)]'
                        : ''
                    }`}
                  />
                  <span>{label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
