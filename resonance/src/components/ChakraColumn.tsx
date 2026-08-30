import { useMemo } from 'react'
import type { ChakraKey } from '../types/resonance'
import type { ChakraReading } from '../lib/chakraField'

interface ChakraColumnProps {
  field: ChakraReading[]
  /** Rendered width in px. */
  size?: number
  /** Show name + state to the right of each node. */
  labels?: boolean
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

/**
 * The seven centres as a luminous vertical channel — node size, glow and ring
 * style read each chakra's charge and tone for the day. Root sits at the base,
 * crown at the top.
 */
export function ChakraColumn({
  field,
  size = 120,
  labels = false,
  selected = null,
  onSelect,
  className = '',
}: ChakraColumnProps) {
  const reduced = useReducedMotion()

  const W = labels ? 300 : 116
  const H = labels ? 416 : 356
  const nodeX = labels ? 42 : W / 2
  const labelX = 86
  const padY = labels ? 30 : 26
  const step = (H - padY * 2) / 6

  // index 0 = root (bottom) … 6 = crown (top)
  const yOf = (i: number): number => H - padY - i * step

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      className={className}
      role="img"
      aria-label="The seven chakras and their charge today"
    >
      <defs>
        <linearGradient id="cf-channel" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#34d399" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.35" />
        </linearGradient>
        {field.map((c) => (
          <radialGradient key={c.key} id={`cf-glow-${c.key}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.color} stopOpacity="0.9" />
            <stop offset="45%" stopColor={c.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* the central channel */}
      <line
        x1={nodeX}
        y1={yOf(0)}
        x2={nodeX}
        y2={yOf(6)}
        stroke="url(#cf-channel)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {field.map((c, i) => {
        const y = yOf(i)
        const t = c.charge / 100
        const glowR = 10 + t * 15
        const ringR = 7.5 + t * 4.5
        const coreR = 2.4 + t * 4
        const isSel = selected === c.key
        const dim = c.tone === 'quiet'
        const strained = c.tone === 'blocked' || c.tone === 'strained'

        const petals = Array.from({ length: c.petals }, (_, p) => {
          const a = (p / c.petals) * Math.PI * 2 - Math.PI / 2
          const r1 = ringR + 2.5
          const r2 = ringR + 6
          return (
            <line
              key={p}
              x1={nodeX + Math.cos(a) * r1}
              y1={y + Math.sin(a) * r1}
              x2={nodeX + Math.cos(a) * r2}
              y2={y + Math.sin(a) * r2}
              stroke={c.color}
              strokeWidth="1"
              strokeOpacity={dim ? 0.12 : 0.3}
              strokeLinecap="round"
            />
          )
        })

        return (
          <g
            key={c.key}
            role={onSelect ? 'button' : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-label={
              onSelect ? `${c.name} — ${c.state}` : undefined
            }
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
            {/* soft glow */}
            <circle
              cx={nodeX}
              cy={y}
              r={glowR}
              fill={`url(#cf-glow-${c.key})`}
              opacity={dim ? 0.45 : 0.9}
              className={c.focus && !reduced ? 'animate-pulse-glow' : undefined}
              style={{ transformOrigin: `${nodeX}px ${y}px` }}
            />
            {petals}
            {/* ring */}
            <circle
              cx={nodeX}
              cy={y}
              r={ringR}
              fill="none"
              stroke={c.color}
              strokeWidth={c.focus ? 2 : 1.3}
              strokeOpacity={dim ? 0.35 : strained ? 0.55 : 0.95}
              strokeDasharray={strained ? '3 3' : undefined}
            />
            {/* core */}
            <circle
              cx={nodeX}
              cy={y}
              r={coreR}
              fill={c.color}
              fillOpacity={dim ? 0.5 : 1}
            />
            {/* focus / selection marker */}
            {(c.focus || isSel) && (
              <circle
                cx={nodeX}
                cy={y}
                r={ringR + 5}
                fill="none"
                stroke={isSel ? '#f6f1e4' : c.color}
                strokeWidth="1"
                strokeOpacity={isSel ? 0.9 : 0.4}
              />
            )}

            {labels && (
              <>
                <text
                  x={labelX}
                  y={y - 2}
                  fill="#f6f1e4"
                  fontSize="13"
                  fontFamily="'Fraunces Variable', Georgia, serif"
                >
                  {c.name}
                </text>
                <text
                  x={labelX}
                  y={y + 12}
                  fill="rgba(154,166,201,0.9)"
                  fontSize="9.5"
                  letterSpacing="0.12em"
                  fontFamily="'Space Mono', monospace"
                >
                  {c.state.toUpperCase()} · {c.charge}
                </text>
              </>
            )}
          </g>
        )
      })}
    </svg>
  )
}
