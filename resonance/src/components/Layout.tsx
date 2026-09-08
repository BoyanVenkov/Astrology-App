import type { ReactNode } from 'react'
import type { TabKey } from '../types/resonance'
import { useDayHue } from '../lib/dayhue'
import { useT, type TFn } from '../lib/i18n'
import { useOverlayOpen } from '../lib/overlayLock'
import type { MessageKey } from '../lib/locales/en'
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
  /** Renders the settings control (tab roots only). */
  onSettings?: () => void
  children: ReactNode
}

type TabDef = {
  key: TabKey
  labelKey: MessageKey
  Icon: (props: { className?: string }) => ReactNode
}

const TABS: TabDef[] = [
  { key: 'today', labelKey: 'nav.today', Icon: DashboardIcon },
  { key: 'sky', labelKey: 'nav.sky', Icon: SkyIcon },
  { key: 'tarot', labelKey: 'nav.tarot', Icon: TarotIcon },
  { key: 'you', labelKey: 'nav.you', Icon: YouIcon },
]
const BOTTOM_LEFT = TABS.slice(0, 2)
const BOTTOM_RIGHT = TABS.slice(2)

/* ---------------------------------------------------------- practice orb */

function PracticeOrb({
  onClick,
  label,
  className = '',
}: {
  onClick: () => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}`}
      className={`relative grid place-items-center rounded-full border transition active:scale-95 ${className}`}
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
      <SparkIcon className="h-[45%] w-[45%] animate-pulse-glow text-[#05070f]" />
    </button>
  )
}

/* --------------------------------------------------------- bottom tab bar */

function BottomTab({
  def,
  active,
  onClick,
  t,
}: {
  def: TabDef
  active: boolean
  onClick: () => void
  t: TFn
}) {
  const Icon = def.Icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="relative flex min-h-[3.4rem] flex-1 flex-col items-center justify-center gap-[3px] rounded-xl px-1 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-[color,transform] active:scale-95"
      style={{ color: active ? 'var(--rz-hue)' : 'rgba(193,203,228,0.94)' }}
    >
      <span
        aria-hidden
        className="absolute inset-x-1 inset-y-0.5 rounded-xl transition-opacity"
        style={{
          opacity: active ? 1 : 0,
          background: 'color-mix(in srgb, var(--rz-hue) 15%, transparent)',
          boxShadow:
            'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 34%, transparent)',
        }}
      />
      <span className="relative flex flex-col items-center gap-[3px]">
        <Icon className="h-6 w-6" />
        <span>{t(def.labelKey)}</span>
      </span>
    </button>
  )
}

/* -------------------------------------------------- left rail (>= md) */

function RailTab({
  def,
  active,
  onClick,
  t,
}: {
  def: TabDef
  active: boolean
  onClick: () => void
  t: TFn
}) {
  const Icon = def.Icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="group relative flex w-full flex-col items-center gap-1 rounded-2xl py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] transition active:scale-95"
      style={{ color: active ? 'var(--rz-hue)' : 'rgba(193,203,228,0.9)' }}
    >
      <span
        aria-hidden
        className="absolute inset-x-2 inset-y-1 rounded-2xl transition-opacity"
        style={{
          opacity: active ? 1 : 0,
          background: 'color-mix(in srgb, var(--rz-hue) 15%, transparent)',
          boxShadow:
            'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 34%, transparent)',
        }}
      />
      <Icon className="relative h-6 w-6" />
      <span className="relative">{t(def.labelKey)}</span>
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
  const t = useT()
  const navHidden = useOverlayOpen()

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col md:flex-row">
      {/* per-tab atmosphere, pinned to the viewport behind everything */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 mx-auto h-[100dvh] w-full max-w-xl overflow-hidden md:max-w-none"
      >
        <TabBackdrop tab={active} />
      </div>

      {/* ---- left rail (tablet / desktop) ---- */}
      {!navHidden && (
        <nav
          className="fixed inset-y-0 start-0 z-30 hidden w-[4.75rem] flex-col items-center border-e border-white/[0.09] px-1.5 py-3 backdrop-blur-2xl md:flex lg:w-[5.5rem]"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,12,28,0.82) 0%, rgba(3,4,12,0.94) 100%)',
            paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          }}
        >
          <PracticeOrb
            onClick={onPractice}
            label={practiceLabel}
            className="mb-3 h-12 w-12 shrink-0"
          />
          <div className="flex w-full flex-1 flex-col gap-0.5">
            {TABS.map((d) => (
              <RailTab
                key={d.key}
                def={d}
                active={active === d.key}
                onClick={() => onTabChange(d.key)}
                t={t}
              />
            ))}
          </div>
          {onSettings && (
            <button
              type="button"
              onClick={onSettings}
              aria-label={t('nav.settings')}
              className="mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-[#eef1fb] transition active:scale-90 active:bg-white/15"
            >
              <GearIcon className="h-[1.3rem] w-[1.3rem]" strokeWidth={1.8} />
            </button>
          )}
        </nav>
      )}

      {/* ---- main column ---- */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col md:ms-[4.75rem] lg:ms-[5.5rem]">
        <div style={{ height: 'env(safe-area-inset-top)' }} aria-hidden />
        {onSettings ? (
          <div className="flex items-center justify-center px-3 py-3 md:justify-start md:px-8 md:pt-5 lg:px-12">
            <ResonanceLockup />
            <button
              type="button"
              onClick={onSettings}
              aria-label={t('nav.settings')}
              className="absolute end-2 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/[0.08] text-[#eef1fb] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.55)] transition active:scale-90 active:bg-white/15 md:hidden"
            >
              <GearIcon className="h-[1.3rem] w-[1.3rem]" strokeWidth={1.8} />
            </button>
          </div>
        ) : (
          <div className="h-3 md:h-5" aria-hidden />
        )}

        <main
          className="mx-auto flex w-full max-w-[34rem] flex-1 flex-col px-4 md:max-w-4xl md:px-8 lg:max-w-5xl lg:px-12"
          style={{
            paddingBottom: navHidden
              ? 'calc(1.5rem + env(safe-area-inset-bottom))'
              : 'calc(6.5rem + env(safe-area-inset-bottom))',
          }}
        >
          {/* my-auto centres a short screen vertically on large displays and
              still scrolls naturally when the content is taller than the view */}
          <div className="w-full md:my-auto md:py-6">{children}</div>
        </main>
      </div>

      {/* ---- bottom tab bar (phone / small tablet) ---- */}
      {!navHidden && (
        <nav
          className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-white/[0.1] backdrop-blur-2xl md:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,12,28,0.86) 0%, rgba(3,4,12,0.98) 100%)',
            boxShadow: '0 -1px 0 0 rgba(255,255,255,0.05) inset',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex items-end px-1.5 pb-1 pt-1.5">
            {BOTTOM_LEFT.map((d) => (
              <BottomTab
                key={d.key}
                def={d}
                active={active === d.key}
                onClick={() => onTabChange(d.key)}
                t={t}
              />
            ))}
            <div className="flex flex-1 justify-center">
              <PracticeOrb
                onClick={onPractice}
                label={practiceLabel}
                className="-mt-7 h-[3.6rem] w-[3.6rem]"
              />
            </div>
            {BOTTOM_RIGHT.map((d) => (
              <BottomTab
                key={d.key}
                def={d}
                active={active === d.key}
                onClick={() => onTabChange(d.key)}
                t={t}
              />
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
