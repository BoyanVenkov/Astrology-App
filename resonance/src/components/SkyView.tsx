import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { chakraLabel, useT } from '../lib/i18n'
import { planetSymbol } from '../data/esoteric'
import { useChakraField, type ChakraReading } from '../lib/chakraField'
import { useEntitlements } from '../lib/premium'
import { ApothecaryIcon, CompassIcon, LockIcon, MoonIcon, PulseIcon } from './icons'
import { QuickHoroscope } from './QuickHoroscope'

interface SkyViewProps {
  onOpenChart: () => void
  onOpenHoroscope: () => void
  onOpenChakras: () => void
  onOpenCompat: () => void
  onOpenTransits: () => void
  onOpenMoon: () => void
  onOpenStones: () => void
  onUpgrade: (reason?: string) => void
}

function Tile({
  icon,
  title,
  sub,
  locked = false,
  onClick,
}: {
  icon: ReactNode
  title: string
  sub: string
  locked?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-panel flex flex-col gap-2 p-4 text-left transition active:scale-[0.98]"
    >
      <span className="flex items-center justify-between">
        <span style={{ color: 'var(--rz-hue)' }}>{icon}</span>
        {locked && <LockIcon className="h-3.5 w-3.5 text-haze-400" />}
      </span>
      <span className="font-serif text-base leading-tight text-white">
        {title}
      </span>
      <span className="text-xs leading-snug text-haze-300">{sub}</span>
    </button>
  )
}

function chakraFieldSummary(field: ChakraReading[]): string {
  const strained = field.filter(
    (c) => c.tone === 'blocked' || c.tone === 'strained',
  )
  if (strained.length > 0)
    return `${strained.map((c) => c.name).join(' & ')} under pressure`
  const open = field.filter((c) => c.tone === 'open' || c.tone === 'lit')
  if (open.length > 0)
    return `${open.map((c) => c.name).join(' & ')} wide open`
  const focus = field.find((c) => c.focus)
  return focus ? `${focus.name} carries the day` : 'A settled field'
}

export function SkyView({
  onOpenChart,
  onOpenHoroscope,
  onOpenChakras,
  onOpenCompat,
  onOpenTransits,
  onOpenMoon,
  onOpenStones,
  onUpgrade,
}: SkyViewProps) {
  const t = useT()
  const { isPro } = useEntitlements()
  const chakraField = useChakraField()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const hasNatal = useAppStore((s) => s.hasNatal)

  const focusPlanet = sky.find((p) => p.body === transit?.body)

  if (!transit || !chakra) return null

  return (
    <div className="flex flex-col gap-4">
      <header className="px-1">
        <p className="eyebrow-hue">{t('sky.eyebrow')}</p>
        <h1 className="mt-1.5 font-serif text-2xl leading-tight text-gilded">
          {transit.body} <span aria-hidden>{planetSymbol(transit.body)}</span>
          {focusPlanet?.retrograde && (
            <span className="ml-1 align-super text-sm text-haze-300">℞</span>
          )}
          <span className="text-haze-400"> · </span>
          {chakraLabel(chakra.key, t)}
        </h1>
        <p className="mt-1 text-sm text-haze-300">{transit.title}</p>
      </header>

      <QuickHoroscope
        isPro={isPro}
        onOpenFull={
          isPro ? onOpenHoroscope : () => onUpgrade(t('sky.reasonHoroscope'))
        }
      />

      {/* chakra field — full-width feature row with the live column */}
      <button
        type="button"
        onClick={onOpenChakras}
        className="glass-panel flex items-center gap-4 p-4 text-left transition active:scale-[0.99]"
      >
        <span className="flex h-12 items-center gap-[3px]">
          {[...chakraField].reverse().map((c) => (
            <span
              key={c.key}
              className="rounded-full"
              style={{
                width: 5 + (c.charge / 100) * 5,
                height: 5 + (c.charge / 100) * 5,
                background: c.color,
                opacity: c.tone === 'quiet' ? 0.4 : 1,
                boxShadow: c.focus ? `0 0 8px ${c.color}` : undefined,
              }}
            />
          ))}
        </span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow">{t('sky.chakraField')}</span>
          <span className="mt-1 block font-serif text-lg leading-tight text-white">
            {chakraFieldSummary(chakraField)}
          </span>
          <span className="mt-0.5 block text-xs text-haze-300">
            {t('sky.chakraFieldSub')}
          </span>
        </span>
        <span className="shrink-0 self-center" style={{ color: 'var(--rz-hue)' }}>
          ›
        </span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <Tile
          icon={<CompassIcon className="h-5 w-5" />}
          title={hasNatal ? t('sky.tileChart') : t('sky.addChart')}
          sub={hasNatal ? t('sky.chartSub') : t('sky.addChartSub')}
          onClick={onOpenChart}
        />
        <Tile
          icon={<PulseIcon className="h-5 w-5" />}
          title={t('sky.tileTransits')}
          sub={
            aspects.length > 0
              ? t('sky.transitsCount', { n: aspects.length })
              : t('sky.transitsEmpty')
          }
          onClick={onOpenTransits}
        />
        <Tile
          icon={<MoonIcon className="h-5 w-5" />}
          title={t('sky.tileMoon')}
          sub={t('sky.moonSub', { phase: transit.moonPhase })}
          onClick={onOpenMoon}
        />
        <Tile
          icon={<HeartLinkIcon />}
          title={t('sky.tileCompat')}
          sub={t('sky.tileCompatSub')}
          locked={!isPro}
          onClick={isPro ? onOpenCompat : () => onUpgrade(t('sky.reasonCompat'))}
        />
        <Tile
          icon={<ScrollIcon />}
          title={t('sky.tileHoroscope')}
          sub={isPro ? t('sky.tileHoroscopeSubPro') : t('sky.tileHoroscopeSub')}
          locked={!isPro}
          onClick={
            isPro ? onOpenHoroscope : () => onUpgrade(t('sky.reasonHoroscope'))
          }
        />
        <Tile
          icon={<ApothecaryIcon className="h-5 w-5" />}
          title={t('sky.tileStones')}
          sub={
            dailyCrystals.length > 0
              ? dailyCrystals.slice(0, 2).map((c) => c.name).join(' · ')
              : t('sky.stonesEmpty')
          }
          onClick={onOpenStones}
        />
      </div>
    </div>
  )
}

/* two little inline glyphs the shared icon set doesn't have */

function HeartLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="8.5" cy="12" r="5" />
      <circle cx="15.5" cy="12" r="5" />
    </svg>
  )
}

function ScrollIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M9 8h7M9 12h7M9 16h4" />
    </svg>
  )
}
