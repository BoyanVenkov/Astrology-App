import { useState, type ReactNode } from 'react'
import type { TabKey } from '../types/resonance'
import { useDayHue } from '../lib/dayhue'
import { useT, type TFn } from '../lib/i18n'
import { useOverlayOpen } from '../lib/overlayLock'
import type { MessageKey } from '../lib/locales/en'
import { useAppStore } from '../store/useAppStore'
import { crystalName } from '../lib/crystals'
import { ResonanceLockup } from './Logo'
import { TabBackdrop } from './TabBackdrop'
import artStones from '../assets/art/icon-apothecary.webp'
import {
  BreathIcon,
  ChevronIcon,
  CompassIcon,
  DashboardIcon,
  GearIcon,
  JournalIcon,
  MoonIcon,
  OrbitIcon,
  RingsIcon,
  RuneIcon,
  ScrollIcon,
  SkyIcon,
  SparkIcon,
  ApothecaryIcon,
  TarotIcon,
  YouIcon,
} from './icons'

/** Screens the sidebar can open directly — a subset of App's `Sub`. */
export type NavSub =
  | 'horoscope'
  | 'chart'
  | 'transits'
  | 'moon'
  | 'compat'
  | 'runes'
  | 'stones'
  | 'library'
  | 'journal'

interface LayoutProps {
  active: TabKey
  /** The pushed screen on top of the tab, if any — drives the sidebar's gold chip. */
  sub: string | null
  onTabChange: (tab: TabKey) => void
  /** Open a pushed screen (App applies the Pro gates). */
  onOpen: (sub: NavSub) => void
  onPractice: () => void
  practiceLabel: string
  /** Renders the settings control (tab roots only). */
  onSettings?: () => void
  children: ReactNode
}

type Icon = (props: { className?: string }) => ReactNode

type TabDef = { key: TabKey; labelKey: MessageKey; Icon: Icon }

const TABS: TabDef[] = [
  { key: 'today', labelKey: 'nav.today', Icon: DashboardIcon },
  { key: 'sky', labelKey: 'nav.sky', Icon: SkyIcon },
  { key: 'tarot', labelKey: 'nav.tarot', Icon: TarotIcon },
  { key: 'you', labelKey: 'nav.you', Icon: YouIcon },
]
const BOTTOM_LEFT = TABS.slice(0, 2)
const BOTTOM_RIGHT = TABS.slice(2)

/** One sidebar row — either a tab root or a pushed screen. */
type SideItem =
  | { kind: 'tab'; key: TabKey; labelKey: MessageKey; Icon: Icon }
  | { kind: 'sub'; key: NavSub; labelKey: MessageKey; Icon: Icon }

/** The concept's flat list: the day first, then the sky, then the oracles, then you. */
const SIDEBAR: SideItem[][] = [
  [
    { kind: 'tab', key: 'today', labelKey: 'nav.today', Icon: DashboardIcon },
    { kind: 'sub', key: 'horoscope', labelKey: 'sky.tileHoroscope', Icon: ScrollIcon },
    { kind: 'tab', key: 'sky', labelKey: 'nav.sky', Icon: SkyIcon },
    { kind: 'sub', key: 'chart', labelKey: 'sky.tileChart', Icon: CompassIcon },
    { kind: 'sub', key: 'transits', labelKey: 'sky.tileTransits', Icon: OrbitIcon },
    { kind: 'sub', key: 'moon', labelKey: 'sky.tileMoon', Icon: MoonIcon },
    { kind: 'sub', key: 'compat', labelKey: 'sky.tileCompat', Icon: RingsIcon },
  ],
  [
    { kind: 'tab', key: 'tarot', labelKey: 'nav.tarot', Icon: TarotIcon },
    { kind: 'sub', key: 'runes', labelKey: 'rune.eyebrow', Icon: RuneIcon },
    { kind: 'sub', key: 'stones', labelKey: 'sky.tileStones', Icon: ApothecaryIcon },
    { kind: 'sub', key: 'library', labelKey: 'tp.fullLibrary', Icon: BreathIcon },
  ],
  [
    { kind: 'sub', key: 'journal', labelKey: 'you.journal', Icon: JournalIcon },
    { kind: 'tab', key: 'you', labelKey: 'nav.you', Icon: YouIcon },
  ],
]

const NAV_PREF = 'rz-nav-collapsed'
const readCollapsed = (): boolean => {
  try {
    return localStorage.getItem(NAV_PREF) === '1'
  } catch {
    return false
  }
}

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
      className={`card-press relative grid place-items-center rounded-full border ${className}`}
      style={{
        background:
          'radial-gradient(circle at 50% 30%, var(--rz-gold-hi), var(--rz-gold) 45%, var(--rz-gold-lo) 100%)',
        borderColor: 'rgba(251,236,196,0.6)',
        boxShadow:
          '0 0 30px -4px var(--rz-gold-glow), 0 8px 20px -6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* a soft ambient ring pulsing outward — the orb breathing */}
      <span
        aria-hidden
        className="animate-freq-ring pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 0 1.5px var(--rz-gold)` }}
      />
      <span
        aria-hidden
        className="absolute inset-1.5 rounded-full border border-white/25"
      />
      <SparkIcon className="h-[45%] w-[45%] animate-pulse-glow text-[#1a1206]" />
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
      className="card-press relative flex min-h-[3.4rem] flex-1 flex-col items-center justify-center gap-[3px] rounded-xl px-1 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors"
      style={{ color: active ? 'var(--rz-gold)' : 'rgba(193,203,228,0.94)' }}
    >
      <span
        aria-hidden
        className="absolute inset-x-1 inset-y-0.5 rounded-xl transition-opacity"
        style={{
          opacity: active ? 1 : 0,
          background:
            'linear-gradient(180deg, rgba(232,194,116,0.2), rgba(185,134,47,0.08))',
          boxShadow: 'inset 0 0 0 1px rgba(232,194,116,0.34)',
        }}
      />
      {/* the active indicator — a thin glowing line riding the top edge */}
      <span
        aria-hidden
        className="absolute inset-x-3 top-0 h-[2px] rounded-full transition-opacity"
        style={{
          opacity: active ? 1 : 0,
          background: 'var(--rz-gold)',
          boxShadow: '0 0 8px 1px var(--rz-gold-glow)',
        }}
      />
      <span className="relative flex flex-col items-center gap-[3px]">
        <Icon className="h-6 w-6" />
        <span>{t(def.labelKey)}</span>
      </span>
    </button>
  )
}

/* ------------------------------------------------- sidebar (>= md) */

function SideRow({
  item,
  active,
  expanded,
  onClick,
  t,
}: {
  item: SideItem
  active: boolean
  expanded: boolean
  onClick: () => void
  t: TFn
}) {
  const Icon = item.Icon
  const label = t(item.labelKey)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      aria-label={expanded ? undefined : label}
      title={expanded ? undefined : label}
      className={`group relative flex w-full items-center rounded-xl transition-colors duration-200 active:scale-[0.98] ${
        expanded
          ? 'min-h-[2.6rem] gap-3.5 px-3.5 text-start'
          : 'h-11 justify-center'
      } ${
        active
          ? 'text-[#1a1206]'
          : 'text-[#c6cde4] hover:bg-white/[0.05] hover:text-white'
      }`}
    >
      {active && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'linear-gradient(100deg, var(--rz-gold-hi) 0%, var(--rz-gold) 50%, var(--rz-gold-lo) 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 22px -10px var(--rz-gold-glow), 0 0 0 1px rgba(251,236,196,0.25)',
          }}
        />
      )}
      <Icon
        className={`relative h-[1.3rem] w-[1.3rem] shrink-0 ${
          active ? '' : 'text-[color:var(--rz-gold)] opacity-90'
        }`}
      />
      {expanded && (
        <span
          className={`relative min-w-0 truncate text-[0.9rem] leading-tight ${
            active ? 'font-semibold' : 'font-medium'
          }`}
        >
          {label}
        </span>
      )}
    </button>
  )
}

/** The concept's footer card — today's stone, one tap to the apothecary. */
function StoneOfDay({
  expanded,
  onClick,
  t,
}: {
  expanded: boolean
  onClick: () => void
  t: TFn
}) {
  const stone = useAppStore((s) => s.dailyCrystals[0])
  if (!stone) return null
  const name = crystalName(stone.name, t)
  if (!expanded)
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${t('dash.stoneOfDay')}: ${name}`}
        title={name}
        className="card-press mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(232,194,116,0.28)] bg-white/[0.04]"
      >
        <img src={artStones} alt="" className="h-10 w-10 object-contain" />
      </button>
    )
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-panel glass-gold card-lift relative flex w-full items-center gap-3 overflow-visible p-3 text-start"
    >
      <span className="relative grid h-14 w-14 shrink-0 place-items-center">
        <span
          aria-hidden
          className="absolute h-12 w-12 rounded-full opacity-60 blur-xl"
          style={{ background: stone.color }}
        />
        <img
          src={artStones}
          alt=""
          aria-hidden
          className="animate-card-float relative h-16 w-16 object-contain"
          style={{ filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.55))' }}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.12em] text-[color:var(--rz-gold)]">
          {t('dash.stoneOfDay')}
        </span>
        <span className="mt-1 block truncate font-serif text-[1rem] text-white">
          {name}
        </span>
      </span>
      <ChevronIcon className="h-4 w-4 shrink-0 -scale-x-100 text-[color:var(--rz-gold)] rtl:scale-x-100" />
    </button>
  )
}

/** Top-right controls on wide screens — settings + the profile medallion. */
function TopBar({
  onSettings,
  onProfile,
  t,
}: {
  onSettings: () => void
  onProfile: () => void
  t: TFn
}) {
  return (
    <div className="pointer-events-none absolute end-6 top-5 z-20 hidden items-center gap-2.5 md:flex lg:end-10 lg:top-7">
      <button
        type="button"
        onClick={onSettings}
        aria-label={t('nav.settings')}
        className="glass-veil pointer-events-auto grid h-10 w-10 place-items-center rounded-full text-[#eef1fb] transition hover:text-white active:scale-90"
      >
        <GearIcon className="h-[1.25rem] w-[1.25rem]" strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={onProfile}
        aria-label={t('nav.you')}
        className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full p-[2px] transition active:scale-90"
        style={{
          background:
            'conic-gradient(from 200deg, var(--rz-gold-hi), var(--rz-gold-lo), var(--rz-gold), var(--rz-gold-hi))',
          boxShadow: '0 0 18px -4px var(--rz-gold-glow)',
        }}
      >
        <span className="grid h-full w-full place-items-center rounded-full bg-[#0b0f24] text-[color:var(--rz-gold)]">
          <YouIcon className="h-5 w-5" />
        </span>
      </button>
    </div>
  )
}

export function Layout({
  active,
  sub,
  onTabChange,
  onOpen,
  onPractice,
  practiceLabel,
  onSettings,
  children,
}: LayoutProps) {
  useDayHue()
  const t = useT()
  const navHidden = useOverlayOpen()
  const [collapsed, setCollapsed] = useState(readCollapsed)
  const toggleCollapsed = () =>
    setCollapsed((c) => {
      try {
        localStorage.setItem(NAV_PREF, c ? '0' : '1')
      } catch {
        /* private mode — the preference just won't persist */
      }
      return !c
    })

  const isActive = (item: SideItem) =>
    item.kind === 'sub'
      ? sub === item.key
      : active === item.key && (sub === null || !SIDEBAR.flat().some((i) => i.key === sub))
  const select = (item: SideItem) =>
    item.kind === 'tab' ? onTabChange(item.key) : onOpen(item.key)

  // md: always the icon rail; lg+: the full labelled sidebar unless collapsed.
  const railW = 'md:w-[4.75rem]'
  const fullW = collapsed ? 'lg:w-[4.75rem]' : 'lg:w-[16rem]'
  const mainMs = collapsed ? 'md:ms-[4.75rem]' : 'md:ms-[4.75rem] lg:ms-[16rem]'

  const sidebar = (expanded: boolean) => (
    <>
      <div
        className={`flex shrink-0 items-center ${
          expanded ? 'justify-between px-3 pb-6 pt-1' : 'flex-col gap-3 pb-4'
        }`}
      >
        {expanded ? (
          <ResonanceLockup />
        ) : (
          <PracticeOrb
            onClick={onPractice}
            label={practiceLabel}
            className="h-12 w-12 shrink-0"
          />
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={expanded ? t('nav.collapse') : t('nav.expand')}
          aria-expanded={expanded}
          className="hidden h-8 w-8 place-items-center rounded-full border border-white/10 text-haze-300 transition hover:border-[rgba(232,194,116,0.4)] hover:text-[color:var(--rz-gold)] lg:grid"
        >
          <ChevronIcon
            className={`h-4 w-4 ${expanded ? 'rtl:-scale-x-100' : '-scale-x-100 rtl:scale-x-100'}`}
          />
        </button>
      </div>

      <div className="no-scrollbar -mx-1 flex min-h-0 flex-1 flex-col overflow-y-auto px-1">
        {SIDEBAR.map((group, gi) => (
          <div
            key={gi}
            role="group"
            aria-label={gi === 0 ? undefined : t('nav.explore')}
            className={`flex flex-col gap-1 ${
              gi > 0 ? 'mt-2.5 border-t border-white/[0.07] pt-2.5' : ''
            }`}
          >
            {group.map((item) => (
              <SideRow
                key={item.key}
                item={item}
                active={isActive(item)}
                expanded={expanded}
                onClick={() => select(item)}
                t={t}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 shrink-0">
        <StoneOfDay
          expanded={expanded}
          onClick={() => onOpen('stones')}
          t={t}
        />
      </div>
    </>
  )

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col md:flex-row">
      {/* per-tab atmosphere, pinned to the viewport behind everything */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 mx-auto h-[100dvh] w-full max-w-xl overflow-hidden md:max-w-none"
      >
        <TabBackdrop tab={active} />
      </div>

      {/* ---- sidebar (tablet / desktop) ---- */}
      {!navHidden && (
        <nav
          aria-label="Resonance"
          className={`fixed inset-y-0 start-0 z-30 hidden flex-col border-e border-white/[0.08] py-4 backdrop-blur-2xl transition-[width] duration-300 ease-resonance md:flex ${railW} ${fullW} ${
            collapsed ? 'px-2' : 'px-2 lg:px-3.5'
          }`}
          style={{
            background:
              'linear-gradient(180deg, rgba(10,13,32,0.9) 0%, rgba(4,5,14,0.96) 100%)',
            boxShadow: '1px 0 0 rgba(232,194,116,0.05), 24px 0 60px -40px rgba(0,0,0,0.9)',
            paddingTop: 'max(1.1rem, env(safe-area-inset-top))',
          }}
        >
          {/* rail on md; the full sidebar on lg unless collapsed */}
          <div className={`flex min-h-0 flex-1 flex-col ${collapsed ? '' : 'lg:hidden'}`}>
            {sidebar(false)}
          </div>
          {!collapsed && (
            <div className="hidden min-h-0 flex-1 flex-col lg:flex">
              {sidebar(true)}
            </div>
          )}
        </nav>
      )}

      {/* ---- main column ---- */}
      <div
        className={`relative z-10 flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-resonance ${mainMs}`}
      >
        <div style={{ height: 'env(safe-area-inset-top)' }} aria-hidden />
        {onSettings ? (
          <>
            {/* phone header — lockup centred, gear on the end */}
            <div className="flex items-center justify-center px-3 py-3 md:hidden">
              <ResonanceLockup />
              <button
                type="button"
                onClick={onSettings}
                aria-label={t('nav.settings')}
                className="absolute end-2 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/[0.08] text-[#eef1fb] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.55)] transition active:scale-90 active:bg-white/15"
              >
                <GearIcon className="h-[1.3rem] w-[1.3rem]" strokeWidth={1.8} />
              </button>
            </div>
            <TopBar
              onSettings={onSettings}
              onProfile={() => onTabChange('you')}
              t={t}
            />
          </>
        ) : (
          <div className="h-3 md:h-5" aria-hidden />
        )}

        <main
          className={`mx-auto flex w-full max-w-[34rem] flex-1 flex-col px-4 md:max-w-none md:px-6 lg:px-8 ${
            onSettings ? 'md:pt-5 lg:pt-6' : ''
          }`}
          style={{
            paddingBottom: navHidden
              ? 'calc(1.5rem + env(safe-area-inset-bottom))'
              : 'calc(7rem + env(safe-area-inset-bottom))',
          }}
        >
          {/* tab roots that aren't Today keep the old comfortable measure */}
          <div
            className={`w-full md:mx-auto md:pb-8 ${
              active === 'today' && sub === null
                ? 'max-w-[90rem]'
                : `md:max-w-5xl ${onSettings ? 'md:pt-12' : ''}`
            }`}
          >
            {children}
          </div>
        </main>
      </div>

      {/* ---- floating tab dock (phone / small tablet) ---- */}
      {!navHidden && (
        <nav
          className="fixed inset-x-3 z-30 mx-auto max-w-[27rem] rounded-[1.75rem] border border-white/[0.12] backdrop-blur-2xl md:hidden"
          style={{
            bottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
            background:
              'linear-gradient(180deg, rgba(10,14,32,0.88) 0%, rgba(4,5,14,0.96) 100%)',
            boxShadow:
              '0 1px 0 0 rgba(255,255,255,0.07) inset, 0 20px 46px -16px rgba(0,0,0,0.75), 0 0 32px -14px var(--rz-gold-glow)',
          }}
        >
          <div className="flex items-end px-1.5 pb-1.5 pt-1.5">
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
