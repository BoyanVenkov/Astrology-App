import { useMemo } from 'react'
import type { AuraState } from '../lib/aura'
import artOrb from '../assets/art/orb-aura.webp'

interface AuraProps {
  state: AuraState
  size?: number
  className?: string
}

/**
 * The user's "aura" — the generated iridescent orb as the core, with a
 * live SVG halo + orbiting motes layered on top that still grow, brighten
 * and multiply as their practice score rises. Real artwork, same meaningful
 * data encoding as before.
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
  const coreR = size * (0.2 + score * 0.17)
  const haloR = size * (0.26 + score * 0.26)
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
    <div
      className={`relative ${className}`}
      role="img"
      aria-label={`Aura, ${Math.round(score * 100)} percent`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="aura-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={hue} stopOpacity={glow * 0.5} />
            <stop offset="70%" stopColor={hue} stopOpacity={glow * 0.15} />
            <stop offset="100%" stopColor={hue} stopOpacity={0} />
          </radialGradient>
        </defs>

        <circle
          cx={c}
          cy={c}
          r={haloR}
          fill="url(#aura-halo)"
          className={reducedMotion ? '' : 'animate-aura-breathe'}
          style={{ transformOrigin: 'center' }}
        />

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
      </svg>

      <img
        src={artOrb}
        alt=""
        aria-hidden
        className={reducedMotion ? 'absolute inset-0 h-full w-full object-contain' : 'animate-aura-breathe absolute inset-0 h-full w-full object-contain'}
        style={{
          padding: `${(1 - (0.42 + score * 0.3)) * 50}%`,
          opacity: 0.85 + score * 0.15,
        }}
      />
    </div>
  )
}
