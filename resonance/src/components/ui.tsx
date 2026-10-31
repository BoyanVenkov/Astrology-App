import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { ChevronIcon } from './icons'
import moonDisc from '../assets/art/moon-disc.webp'
import gemPoint from '../assets/art/gem-point.webp'
import gemTumbled from '../assets/art/gem-tumbled.webp'
import gemCluster from '../assets/art/gem-cluster.webp'
import gemRaw from '../assets/art/gem-raw.webp'

/* ------------------------------------------------------- segmented tabs */

/**
 * The concept's gold segmented control — Today / Week / Month, Chart /
 * Positions / Aspects. A real tablist: arrow keys move between segments.
 */
export function SegmentedTabs<K extends string>({
  options,
  value,
  onChange,
  label,
  className = '',
}: {
  options: { key: K; label: string }[]
  value: K
  onChange: (key: K) => void
  /** Accessible name for the tablist. */
  label: string
  className?: string
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: KeyboardEvent, i: number) => {
    const dir =
      e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const rtl = document.documentElement.dir === 'rtl'
    const next = (i + (rtl ? -dir : dir) + options.length) % options.length
    onChange(options[next].key)
    refs.current[next]?.focus()
  }
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`flex rounded-2xl border border-white/[0.08] bg-[rgba(6,8,22,0.6)] p-1 backdrop-blur-xl ${className}`}
    >
      {options.map((o, i) => {
        const active = o.key === value
        return (
          <button
            key={o.key}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.key)}
            onKeyDown={(e) => onKey(e, i)}
            className={`relative min-h-10 flex-1 rounded-xl px-3 text-[0.85rem] font-medium transition-colors duration-200 ${
              active ? 'text-[#fbecc4]' : 'text-haze-300 hover:text-white'
            }`}
          >
            {active && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(232,194,116,0.34), rgba(185,134,47,0.2))',
                  boxShadow:
                    'inset 0 0 0 1px rgba(232,194,116,0.55), 0 6px 18px -8px var(--rz-gold-glow)',
                }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------ chips */

/** A small filter chip — gold ring when on. */
export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium transition ${
        active
          ? 'bg-[rgba(232,194,116,0.14)] text-[#fbecc4] shadow-[inset_0_0_0_1px_rgba(232,194,116,0.6)]'
          : 'text-haze-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------- glyph badge */

/** A ringed medallion around a planet / sign glyph — the concept's list icon. */
export function GlyphBadge({
  glyph,
  color = '#e8c274',
  size = 40,
}: {
  glyph: string
  color?: string
  size?: number
}) {
  return (
    <span
      aria-hidden
      className="relative grid shrink-0 place-items-center rounded-full font-serif"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.44,
        color,
        background: `radial-gradient(circle at 50% 35%, color-mix(in srgb, ${color} 22%, transparent), rgba(6,8,22,0.85) 70%)`,
        boxShadow: `inset 0 0 0 1.5px color-mix(in srgb, ${color} 70%, transparent), 0 0 16px -4px ${color}`,
      }}
    >
      {glyph}
    </span>
  )
}

/* ---------------------------------------------------------- list row */

/** The concept's glass list row — icon, title, a quiet sub-line, a gold chevron. */
export function ListRow({
  leading,
  title,
  sub,
  trailing,
  active = false,
  onClick,
  expanded,
  children,
  delay = 0,
}: {
  leading?: ReactNode
  title: ReactNode
  sub?: ReactNode
  /** Replaces the chevron (a meta value, a lock). */
  trailing?: ReactNode
  /** The chosen row — gold edge and a warm glow. */
  active?: boolean
  onClick?: () => void
  /** When set, the row is a disclosure (aria-expanded) and `children` is its body. */
  expanded?: boolean
  children?: ReactNode
  delay?: number
}) {
  const disclosure = expanded !== undefined
  const head = (
    <>
      {leading}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.95rem] font-semibold leading-snug text-white">
          {title}
        </span>
        {sub && (
          <span className="mt-0.5 block text-[0.8rem] leading-snug text-haze-300">
            {sub}
          </span>
        )}
      </span>
      {trailing ??
        (onClick && (
          <ChevronIcon
            className={`h-4 w-4 shrink-0 text-[color:var(--rz-gold)] transition-transform duration-300 ${
              disclosure
                ? expanded
                  ? 'rotate-90'
                  : '-rotate-90'
                : '-scale-x-100 rtl:scale-x-100'
            }`}
          />
        ))}
    </>
  )
  return (
    <div
      className={`glass-panel animate-rise-in transition-[border-color,box-shadow] duration-300 ${
        active ? 'glass-gold !border-[rgba(232,194,116,0.55)]' : ''
      }`}
      style={{ animationDelay: `${delay}ms`, borderRadius: '1.1rem' }}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-expanded={disclosure ? expanded : undefined}
          className="flex w-full items-center gap-3.5 rounded-[1.1rem] p-3.5 text-start transition-colors hover:bg-white/[0.03]"
        >
          {head}
        </button>
      ) : (
        <div className="flex items-center gap-3.5 p-3.5">{head}</div>
      )}
      {disclosure && expanded && children && (
        <div className="animate-rise-in border-t border-white/[0.07] px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </div>
  )
}

/* ----------------------------------------------------------- gem art */

const hashOf = (s: string): number => {
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** Which of the four photographed forms a stone is usually sold as. */
function gemForm(name: string): string {
  if (/quartz|amethyst|citrine|fluorite|selenite|kyanite|aquamarine|herkimer|apophyllite/i.test(name))
    return hashOf(name) % 2 ? gemCluster : gemPoint
  if (/jasper|agate|eye|aventurine|howlite|hematite|turquoise|onyx|jade|stone|calcite|lace|bloodstone|carnelian|amber/i.test(name))
    return gemTumbled
  return [gemRaw, gemTumbled, gemPoint, gemCluster][hashOf(name) % 4]
}

/** Relative luminance of a hex colour, 0–1. */
function lum(hex: string): number {
  const m = hex.replace('#', '')
  const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * A photoreal gemstone in the stone's own colour. The four forms were
 * rendered in neutral grey; a `color` blend layer — masked to the gem's own
 * silhouette — lays the stone's hue over the photograph's real light and
 * facets, and the base brightness follows the stone's luminance so obsidian
 * reads black and selenite reads white.
 */
export function GemArt({
  name,
  color,
  className = '',
}: {
  name: string
  color: string
  className?: string
}) {
  const src = gemForm(name)
  const mask = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  } as const
  return (
    <span aria-hidden className={`relative inline-block isolate ${className}`}>
      <span
        className="absolute inset-[12%] rounded-full opacity-55 blur-xl"
        style={{ background: color }}
      />
      <img
        src={src}
        alt=""
        className="relative h-full w-full object-contain"
        style={{
          filter: `grayscale(1) brightness(${(0.42 + lum(color) * 0.78).toFixed(2)}) contrast(1.12)`,
        }}
      />
      <span
        className="absolute inset-0"
        style={{ background: color, mixBlendMode: 'color', ...mask }}
      />
      <span
        className="absolute inset-0 opacity-40"
        style={{ background: color, mixBlendMode: 'soft-light', ...mask }}
      />
    </span>
  )
}

/* ------------------------------------------------------ moon phase art */

/**
 * The real Moon, lit as it is right now. A photographed full disc with the
 * terminator cut from the actual illuminated fraction and phase angle
 * (0° new → 180° full → 360°): the lit limb is a half-disc on one side, the
 * terminator a half-ellipse whose width is |1 − 2k|·r. Waxing is lit on the
 * right (as seen from the northern hemisphere), waning on the left. The dark
 * side keeps a faint earthshine so the whole disc stays legible.
 */
export function MoonPhaseArt({
  illumination,
  angle,
  className = '',
}: {
  /** 0–100 */
  illumination: number
  /** 0–360 */
  angle: number
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  const k = Math.min(1, Math.max(0, illumination / 100))
  const rx = 50 * Math.abs(1 - 2 * k)
  const waxing = angle < 180
  const lit = `M50 0 A50 50 0 0 1 50 100 A${rx.toFixed(2)} 50 0 0 ${k < 0.5 ? 0 : 1} 50 0 Z`
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <defs>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <mask id={`${id}-lit`}>
          <path
            d={lit}
            fill="#fff"
            filter={`url(#${id}-soft)`}
            transform={waxing ? undefined : 'matrix(-1 0 0 1 100 0)'}
          />
        </mask>
        <clipPath id={`${id}-disc`}>
          <circle cx="50" cy="50" r="49.6" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-disc)`}>
        <image href={moonDisc} width="100" height="100" opacity="0.14" />
        <image href={moonDisc} width="100" height="100" mask={`url(#${id}-lit)`} />
      </g>
    </svg>
  )
}
