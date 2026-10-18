import { useMemo } from 'react'
import { useT } from '../lib/i18n'
import type { ChakraKey } from '../types/resonance'
import type { ChakraReading } from '../lib/chakraField'
import artBody from '../assets/art/body-chakra.webp'

interface ChakraBodyProps {
  field: ChakraReading[]
  size?: number
  selected?: ChakraKey | null
  onSelect?: (key: ChakraKey) => void
  className?: string
}

const useReducedMotion = (): boolean =>
  useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

/** Anatomical y-position (0-1, top to bottom) for each centre, standing figure. */
const NODE_Y: Record<ChakraKey, number> = {
  crown: 0.19,
  'third-eye': 0.225,
  throat: 0.27,
  heart: 0.4,
  'solar-plexus': 0.475,
  sacral: 0.555,
  root: 0.645,
}

const W = 200
const H = 300

/**
 * The seven centres mapped onto the generated holographic body figure — the
 * artwork is the silhouette, this component only draws the live, interactive
 * node layer on top of it. Node glow, ring style and motion read each
 * chakra's live charge and tone for the day.
 */
export function ChakraBody({
  field,
  size = 240,
  selected = null,
  onSelect,
  className = '',
}: ChakraBodyProps) {
  const reduced = useReducedMotion()
  const t = useT()
  const byKey = useMemo(
    () => Object.fromEntries(field.map((c) => [c.key, c])) as Record<ChakraKey, ChakraReading>,
    [field],
  )

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, aspectRatio: `${W} / ${H}` }}
    >
      <img
        src={artBody}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain"
        style={{ filter: 'drop-shadow(0 0 24px rgba(90,200,250,0.22))' }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={t('field.svgAria')}
      >
        <defs>
          <linearGradient id="cf-spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#AF52DE" />
            <stop offset="50%" stopColor="#34C759" />
            <stop offset="100%" stopColor="#FF3B30" />
          </linearGradient>
          {field.map((c) => (
            <radialGradient key={c.key} id={`cb-glow-${c.key}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c.color} stopOpacity="0.95" />
              <stop offset="45%" stopColor={c.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* the spine — a thread of light tying every centre together */}
        <line
          x1={W / 2}
          y1={H * NODE_Y.crown}
          x2={W / 2}
          y2={H * NODE_Y.root}
          stroke="url(#cf-spine)"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {(Object.keys(NODE_Y) as ChakraKey[]).map((key) => {
          const c = byKey[key]
          if (!c) return null
          const y = H * NODE_Y[key]
          const x = W / 2
          const chargeT = c.charge / 100
          const glowR = 13 + chargeT * 20
          const ringR = 9 + chargeT * 5
          const coreR = 3 + chargeT * 4.5
          const isSel = selected === c.key
          const dim = c.tone === 'quiet'
          const strained = c.tone === 'blocked' || c.tone === 'strained'
          const open = c.tone === 'open' || c.tone === 'lit'

          return (
            <g
              key={c.key}
              role={onSelect ? 'button' : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-label={onSelect ? `${c.name} — ${c.state}` : undefined}
              style={{ cursor: onSelect ? 'pointer' : 'default' }}
              onClick={onSelect ? () => onSelect(c.key) : undefined}
              onKeyDown={
                onSelect
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onSelect(c.key)
                      }
                    }
                  : undefined
              }
            >
              {/* a larger invisible hit target — the visible node is small */}
              {onSelect && <circle cx={x} cy={y} r={22} fill="transparent" />}

              <circle
                cx={x}
                cy={y}
                r={glowR}
                fill={`url(#cb-glow-${c.key})`}
                opacity={dim ? 0.4 : 0.9}
                className={
                  !reduced ? (open ? 'animate-pulse-glow' : strained ? 'animate-flicker' : undefined) : undefined
                }
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              {/* strained centres get a flickering orbital ring; everyone else a steady one */}
              <circle
                cx={x}
                cy={y}
                r={ringR + (strained ? 4 : 0)}
                fill="none"
                stroke={c.color}
                strokeWidth={c.focus ? 2 : 1.3}
                strokeOpacity={dim ? 0.3 : strained ? 0.8 : 0.9}
                strokeDasharray={strained ? '2.5 3.5' : undefined}
                className={strained && !reduced ? 'animate-aura-orbit' : undefined}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              <circle cx={x} cy={y} r={coreR} fill={c.color} fillOpacity={dim ? 0.5 : 1} />

              {(c.focus || isSel) && (
                <circle
                  cx={x}
                  cy={y}
                  r={ringR + 7}
                  fill="none"
                  stroke={isSel ? '#f6f1e4' : c.color}
                  strokeWidth="1"
                  strokeOpacity={isSel ? 0.9 : 0.4}
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
