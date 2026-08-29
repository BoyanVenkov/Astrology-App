import { useMemo } from 'react'
import type { AuraState } from '../lib/aura'

interface AuraProps {
  state: AuraState
  size?: number
  className?: string
}

/**
 * The user's "aura" — a soft orb that grows, brightens and gains orbiting
 * motes as their practice score rises. Pure SVG + CSS animation.
 */
export function Aura({ state, size = 200, className = '' }: AuraProps) {
  const { score, hue } = state
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const c = size / 2
  const coreR = size * (0.11 + score * 0.15)
  const haloR = size * (0.2 + score * 0.28)
  const ringCount = 2 + Math.round(score * 3)
  const moteCount = Math.round(3 + score * 13)
  const glow = 0.32 + score * 0.5

  const motes = useMemo(() => {
    // deterministic scatter so the orbit doesn't reshuffle every render
    const out: { r: number; angle: number; size: number; dim: number }[] = []
    let seed = 1
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    for (let i = 0; i < moteCount; i += 1) {
      out.push({
        r: haloR * (0.55 + rnd() * 0.6),
        angle: rnd() * 360,
        size: 1 + rnd() * 2.2,
        dim: 0.3 + rnd() * 0.6,
      })
    }
    return out
  }, [moteCount, haloR])

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label={`Aura, ${Math.round(score * 100)} percent`}
    >
      <defs>
        <radialGradient id="aura-core" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
          <stop offset="35%" stopColor={hue} stopOpacity={0.9} />
          <stop offset="100%" stopColor={hue} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="aura-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={hue} stopOpacity={glow * 0.5} />
          <stop offset="70%" stopColor={hue} stopOpacity={glow * 0.15} />
          <stop offset="100%" stopColor={hue} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* outer breathing halo */}
      <circle
        cx={c}
        cy={c}
        r={haloR}
        fill="url(#aura-halo)"
        className={reducedMotion ? '' : 'animate-aura-breathe'}
        style={{ transformOrigin: 'center' }}
      />

      {/* concentric rings */}
      {Array.from({ length: ringCount }, (_, i) => {
        const t = (i + 1) / (ringCount + 1)
        return (
          <circle
            key={i}
            cx={c}
            cy={c}
            r={coreR + (haloR - coreR) * t}
            fill="none"
            stroke={hue}
            strokeWidth={0.6}
            strokeOpacity={glow * (1 - t) * 0.6}
          />
        )
      })}

      {/* orbiting motes */}
      <g
        className={reducedMotion ? '' : 'animate-aura-orbit'}
        style={{ transformOrigin: 'center' }}
      >
        {motes.map((m, i) => {
          const rad = (m.angle * Math.PI) / 180
          return (
            <circle
              key={i}
              cx={c + m.r * Math.cos(rad)}
              cy={c + m.r * Math.sin(rad)}
              r={m.size}
              fill={hue}
              fillOpacity={m.dim * glow}
            />
          )
        })}
      </g>

      {/* bright core */}
      <circle
        cx={c}
        cy={c}
        r={coreR}
        fill="url(#aura-core)"
        className={reducedMotion ? '' : 'animate-pulse-glow'}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
}
