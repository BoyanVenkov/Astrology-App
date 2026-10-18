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
import { QuickHoroscope } from './QuickHoroscope'
import { ChakraBody } from './ChakraBody'
import { FeatureRow } from './FeatureRow'
import artCompass from '../assets/art/icon-compass.webp'
import artMoon from '../assets/art/icon-moon.webp'
import artCompatibility from '../assets/art/icon-compatibility.webp'
import artOracle from '../assets/art/icon-oracle.webp'
import artApothecary from '../assets/art/icon-apothecary.webp'
import artTransits from '../assets/art/icon-transits.webp'
import artHoroscope from '../assets/art/icon-horoscope.webp'
import artWaveMesh from '../assets/art/bg-wave-mesh.webp'

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
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <img
            src={artWaveMesh}
            alt=""
            className="animate-drift absolute -left-[30%] -top-[20%] w-[160%] max-w-none opacity-60 mix-blend-screen"
            style={{ animationDuration: '32s' }}
          />
          <span
            className="animate-drift absolute end-[6%] top-[-6%] h-32 w-32 rounded-full opacity-35 blur-3xl"
            style={{ background: 'var(--rz-hue)', animationDuration: '20s' }}
          />
        </div>
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
      </div>

      <QuickHoroscope
        isPro={isPro}
        onOpenFull={
          isPro ? onOpenHoroscope : () => onUpgrade(t('sky.reasonHoroscope'))
        }
      />

      {/* chakra field — full-width feature row, the live column rendered as premium art */}
      <button
        type="button"
        onClick={onOpenChakras}
        className="glass-panel card-press animate-rise-in flex items-center gap-4 p-4 text-start"
      >
        <span
          className="relative grid h-24 w-14 shrink-0 place-items-center"
          style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5)) drop-shadow(0 0 14px var(--rz-glow))' }}
        >
          <ChakraBody field={chakraField} size={56} className="pointer-events-none" />
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

      <div className="flex flex-col gap-3">
        <FeatureRow
          index={0}
          art={artCompass}
          title={hasNatal ? t('sky.tileChart') : t('sky.addChart')}
          sub={hasNatal ? t('sky.chartSub') : t('sky.addChartSub')}
          onClick={onOpenChart}
        />
        <FeatureRow
          index={1}
          art={artTransits}
          title={t('sky.tileTransits')}
          sub={
            aspects.length > 0
              ? t('sky.transitsCount', { n: aspects.length })
              : t('sky.transitsEmpty')
          }
          onClick={onOpenTransits}
        />
        <FeatureRow
          index={2}
          art={artMoon}
          title={t('sky.tileMoon')}
          sub={t('sky.moonSub', { phase: phaseLabel(transit.moonPhase, t) })}
          onClick={onOpenMoon}
        />
        <FeatureRow
          index={3}
          art={artCompatibility}
          title={t('sky.tileCompat')}
          sub={isPro ? t('sky.tileCompatSubPro') : t('sky.tileCompatSub')}
          locked={!isPro}
          onClick={isPro ? onOpenCompat : () => onUpgrade(t('sky.reasonCompat'))}
        />
        <FeatureRow
          index={4}
          art={artHoroscope}
          title={t('sky.tileHoroscope')}
          sub={isPro ? t('sky.tileHoroscopeSubPro') : t('sky.tileHoroscopeSub')}
          locked={!isPro}
          onClick={
            isPro ? onOpenHoroscope : () => onUpgrade(t('sky.reasonHoroscope'))
          }
        />
        <FeatureRow
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
        <FeatureRow
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
