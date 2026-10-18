import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  chakraLabel,
  phaseLabel,
  planetLabel,
  transitTitle,
  useT,
  type TFn,
} from '../lib/i18n'
import { crystalName } from '../lib/crystals'
import { planetSymbol } from '../data/esoteric'
import { useChakraField, type ChakraReading } from '../lib/chakraField'
import { useEntitlements } from '../lib/premium'
import { LockIcon, PulseIcon } from './icons'
import { QuickHoroscope } from './QuickHoroscope'
import artCompass from '../assets/art/icon-compass.webp'
import artMoon from '../assets/art/icon-moon.webp'
import artCompatibility from '../assets/art/icon-compatibility.webp'
import artOracle from '../assets/art/icon-oracle.webp'
import artApothecary from '../assets/art/icon-apothecary.webp'

interface SkyViewProps {
  onOpenChart: () => void
  onOpenHoroscope: () => void
  onOpenOracle: () => void
  onOpenChakras: () => void
  onOpenCompat: () => void
  onOpenTransits: () => void
  onOpenMoon: () => void
  onOpenStones: () => void
  onUpgrade: (reason?: string) => void
}

function Tile({
  icon,
  art,
  title,
  sub,
  locked = false,
  index = 0,
  onClick,
}: {
  icon?: ReactNode
  art?: string
  title: string
  sub: string
  locked?: boolean
  index?: number
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-panel bento-tile animate-rise-in flex flex-col gap-2 p-4 text-start"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <span className="flex items-center justify-between">
        {art ? (
          <img src={art} alt="" aria-hidden className="h-10 w-10 object-contain" />
        ) : (
          <span style={{ color: 'var(--rz-hue)' }}>{icon}</span>
        )}
        {locked && <LockIcon className="h-3.5 w-3.5 text-haze-400" />}
      </span>
      <span className="font-serif text-lg leading-tight text-white">
        {title}
      </span>
      <span className="text-[0.8rem] leading-snug text-haze-300">{sub}</span>
    </button>
  )
}

function chakraFieldSummary(field: ChakraReading[], t: TFn): string {
  const join = t('scr.field.summary.join')
  const strained = field.filter(
    (c) => c.tone === 'blocked' || c.tone === 'strained',
  )
  if (strained.length > 0)
    return t('scr.field.summary.pressure', {
      names: strained.map((c) => c.name).join(join),
    })
  const open = field.filter((c) => c.tone === 'open' || c.tone === 'lit')
  if (open.length > 0)
    return t('scr.field.summary.open', {
      names: open.map((c) => c.name).join(join),
    })
  const focus = field.find((c) => c.focus)
  return focus
    ? t('scr.field.summary.carries', { name: focus.name })
    : t('scr.field.summary.settled')
}

export function SkyView({
  onOpenChart,
  onOpenHoroscope,
  onOpenOracle,
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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 lg:max-w-3xl">
      <header className="animate-bloom-in px-1">
        <p className="eyebrow-hue">{t('sky.eyebrow')}</p>
        <h1 className="mt-2 font-serif text-[1.9rem] leading-[1.1] text-gilded">
          {planetLabel(transit.body, t)}{' '}
          <span aria-hidden>{planetSymbol(transit.body)}</span>
          {focusPlanet?.retrograde && (
            <span className="ms-1 align-super text-sm text-haze-300">℞</span>
          )}
          <span className="text-haze-400"> · </span>
          {chakraLabel(chakra.key, t)}
        </h1>
        <p className="mt-1.5 text-[0.95rem] text-haze-300">{transitTitle(transit, t)}</p>
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
        className="glass-panel card-press animate-rise-in flex items-center gap-4 p-4 text-start"
      >
        <span className="flex h-12 items-center gap-[3px]">
          {[...chakraField].reverse().map((c) => (
            <span
              key={c.key}
              className="animate-pulse-glow rounded-full"
              style={{
                width: 5 + (c.charge / 100) * 5,
                height: 5 + (c.charge / 100) * 5,
                background: c.color,
                opacity: c.tone === 'quiet' ? 0.4 : 1,
                boxShadow: c.focus ? `0 0 8px ${c.color}` : undefined,
                animationDuration: c.focus ? '3s' : '6s',
              }}
            />
          ))}
        </span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow">{t('sky.chakraField')}</span>
          <span className="mt-1 block font-serif text-xl leading-tight text-white">
            {chakraFieldSummary(chakraField, t)}
          </span>
          <span className="mt-0.5 block text-[0.8rem] text-haze-300">
            {t('sky.chakraFieldSub')}
          </span>
        </span>
        <span className="shrink-0 self-center" style={{ color: 'var(--rz-hue)' }}>
          ›
        </span>
      </button>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Tile
          index={0}
          art={artCompass}
          title={hasNatal ? t('sky.tileChart') : t('sky.addChart')}
          sub={hasNatal ? t('sky.chartSub') : t('sky.addChartSub')}
          onClick={onOpenChart}
        />
        <Tile
          index={1}
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
          index={2}
          art={artMoon}
          title={t('sky.tileMoon')}
          sub={t('sky.moonSub', { phase: phaseLabel(transit.moonPhase, t) })}
          onClick={onOpenMoon}
        />
        <Tile
          index={3}
          art={artCompatibility}
          title={t('sky.tileCompat')}
          sub={isPro ? t('sky.tileCompatSubPro') : t('sky.tileCompatSub')}
          locked={!isPro}
          onClick={isPro ? onOpenCompat : () => onUpgrade(t('sky.reasonCompat'))}
        />
        <Tile
          index={4}
          icon={<ScrollIcon />}
          title={t('sky.tileHoroscope')}
          sub={isPro ? t('sky.tileHoroscopeSubPro') : t('sky.tileHoroscopeSub')}
          locked={!isPro}
          onClick={
            isPro ? onOpenHoroscope : () => onUpgrade(t('sky.reasonHoroscope'))
          }
        />
        <Tile
          index={5}
          art={artOracle}
          title={t('sky.tileOracle')}
          sub={isPro ? t('sky.tileOracleSubPro') : t('sky.tileOracleSub')}
          locked={!isPro}
          // Unlike the other Pro tiles, this opens the screen either way —
          // OracleAI has its own free-tier teaser (sample lines + unlock
          // CTA) that's worth showing before the paywall, not after skipping
          // straight to it.
          onClick={onOpenOracle}
        />
        <Tile
          index={6}
          art={artApothecary}
          title={t('sky.tileStones')}
          sub={
            dailyCrystals.length > 0
              ? dailyCrystals
                  .slice(0, 2)
                  .map((c) => crystalName(c.name, t))
                  .join(' · ')
              : t('sky.stonesEmpty')
          }
          onClick={onOpenStones}
        />
      </div>
    </div>
  )
}

/* a little inline glyph the shared icon set doesn't have */

function ScrollIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M9 8h7M9 12h7M9 16h4" />
    </svg>
  )
}
