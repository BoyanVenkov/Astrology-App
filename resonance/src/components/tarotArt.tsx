import type { ReactNode } from 'react'
import type { Suit } from '../lib/tarot'

/**
 * Illustrated tarot art — a moonlit, gilded-engraving take on the Rider–Waite
 * imagery. Every card is a scene built from these shared primitives: a night
 * sky, an element layer (earth / sea / peaks), and a subject.
 *
 * All coordinates are in a 200×340 viewBox. The scene lives roughly in
 * y 22–286; the name banner sits below.
 */

export const INK = '#e9ddc2'
export const GOLD = '#e0ad3f'
const DIM = '#b7a88a'

const stroke = (w = 2.4): { fill: 'none'; stroke: string; strokeWidth: number; strokeLinecap: 'round'; strokeLinejoin: 'round' } => ({
  fill: 'none',
  stroke: INK,
  strokeWidth: w,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

/* -------------------------------------------------------------- backdrop */

const seed = (s: string): (() => number) => {
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1)
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61)
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296
  }
}

export function Sky({ id, stars = 22 }: { id: string; stars?: number }) {
  const r = seed(id)
  return (
    <>
      <rect x="14" y="14" width="172" height="312" rx="11" fill={`url(#tg-sky-${id})`} />
      <g fill={INK}>
        {Array.from({ length: stars }).map((_, i) => (
          <circle
            key={i}
            cx={24 + r() * 152}
            cy={22 + r() * 200}
            r={0.5 + r() * 1.3}
            opacity={0.35 + r() * 0.5}
          />
        ))}
      </g>
    </>
  )
}

export function Ground({ y = 244, wash = true }: { y?: number; wash?: boolean }) {
  return (
    <g>
      {wash && (
        <path
          d={`M14 ${y}Q60 ${y - 12} 100 ${y}T186 ${y - 6}V326H14Z`}
          fill={`${INK}14`}
        />
      )}
      <path d={`M14 ${y}Q60 ${y - 12} 100 ${y}T186 ${y - 6}`} {...stroke(2)} />
    </g>
  )
}

export function Sea({ y = 236 }: { y?: number }) {
  return (
    <g {...stroke(1.6)} opacity={0.8}>
      <path d={`M16 ${y + 4}q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0`} />
      <path d={`M16 ${y + 14}q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0`} />
      <path d={`M16 ${y + 24}q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0`} />
    </g>
  )
}

export function Mountains({ y = 232 }: { y?: number }) {
  return (
    <g {...stroke(2)}>
      <path d={`M24 ${y}l26-34 20 20 24-30 26 34`} fill={`${INK}10`} />
      <path d={`M110 ${y}l24-26 18 16 20-22 18 24`} fill={`${INK}0d`} />
    </g>
  )
}

export function Pillar({ x, label }: { x: number; label?: string }) {
  return (
    <g {...stroke(2.2)}>
      <rect x={x - 8} y={96} width={16} height={150} />
      <path d={`M${x - 12} 96h24M${x - 12} 246h24`} />
      {label && (
        <text
          x={x}
          y={128}
          textAnchor="middle"
          fill={GOLD}
          stroke="none"
          fontSize={12}
          fontWeight={700}
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ------------------------------------------------------------ celestials */

export function Sun({ x = 100, y = 78, r = 20, face = false }: { x?: number; y?: number; r?: number; face?: boolean }) {
  return (
    <g {...stroke(2.2)} stroke={GOLD}>
      <circle cx={x} cy={y} r={r} fill={`${GOLD}1f`} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6
        const straight = i % 2 === 0
        return (
          <path
            key={i}
            d={`M${x + Math.cos(a) * (r + 4)} ${y + Math.sin(a) * (r + 4)}L${x + Math.cos(a) * (r + (straight ? 14 : 9))} ${y + Math.sin(a) * (r + (straight ? 14 : 9))}`}
          />
        )
      })}
      {face && (
        <g stroke={GOLD}>
          <circle cx={x - 6} cy={y - 3} r={1.4} fill={GOLD} />
          <circle cx={x + 6} cy={y - 3} r={1.4} fill={GOLD} />
          <path d={`M${x - 6} ${y + 6}q6 6 12 0`} />
        </g>
      )}
    </g>
  )
}

export function Moon({ x = 100, y = 74, r = 18, full = false, face = true }: { x?: number; y?: number; r?: number; full?: boolean; face?: boolean }) {
  return (
    <g {...stroke(2.2)} stroke={GOLD}>
      {full ? (
        <circle cx={x} cy={y} r={r} fill={`${GOLD}1a`} />
      ) : (
        <path d={`M${x + r * 0.5} ${y - r}a${r} ${r} 0 1 0 0 ${2 * r} ${r * 0.72} ${r * 0.72} 0 0 1 0-${2 * r}Z`} fill={`${GOLD}1a`} />
      )}
      {face && !full && (
        <g stroke={GOLD} strokeWidth={1.6}>
          <path d={`M${x - 2} ${y - 6}q-4 3 0 6M${x - 2} ${y + 3}q-3 4 1 7`} />
        </g>
      )}
    </g>
  )
}

export function StarBurst({ x = 100, y = 70, R = 16, points = 8, small }: { x?: number; y?: number; R?: number; points?: number; small?: number[] }) {
  const path = (cx: number, cy: number, rr: number, n: number): string => {
    let d = ''
    for (let i = 0; i < n * 2; i += 1) {
      const rad = i % 2 === 0 ? rr : rr * 0.4
      const a = (i * Math.PI) / n - Math.PI / 2
      d += `${i === 0 ? 'M' : 'L'}${cx + Math.cos(a) * rad} ${cy + Math.sin(a) * rad}`
    }
    return `${d}Z`
  }
  return (
    <g {...stroke(2)} stroke={GOLD}>
      <path d={path(x, y, R, points)} fill={`${GOLD}22`} />
      {small?.map((sx, i) => (
        <path key={i} d={path(sx, y + (i % 2 ? 22 : -6) + 30, 5, 5)} fill={`${GOLD}22`} strokeWidth={1.4} />
      ))}
    </g>
  )
}

export function Lightning({ x = 100, y = 40 }: { x?: number; y?: number }) {
  return <path d={`M${x + 6} ${y}l-16 30h12l-14 26 30-34h-13l14-24Z`} fill={GOLD} stroke={GOLD} strokeWidth={1.5} strokeLinejoin="round" />
}

/* ------------------------------------------------------------- figures */

type Pose =
  | 'stand'
  | 'walk'
  | 'sit'
  | 'armsUp'
  | 'offer'
  | 'kneel'
  | 'lie'
  | 'hang'
  | 'bound'

/**
 * A robed figure — the workhorse of the deck. Drawn as a cloaked silhouette:
 * a bowed head, shoulders, a full draped robe with a centre fold, and arms
 * whose gesture depends on the pose. `y` is the hemline, `h` the full height.
 */
export function Figure({
  x = 100,
  y = 250,
  h = 78,
  pose = 'stand',
  robe = INK,
}: {
  x?: number
  y?: number
  h?: number
  pose?: Pose
  robe?: string
}) {
  const g = { ...stroke(2.2), stroke: robe }
  const fill = `${robe}12`
  const headR = h * 0.1
  const neck = y - h + headR * 2
  const shoulder = neck + headR * 0.9
  const shW = h * 0.17
  const hemW = h * (pose === 'sit' || pose === 'kneel' ? 0.34 : 0.27)
  const hemY = pose === 'sit' || pose === 'kneel' ? y - h * 0.16 : y

  if (pose === 'lie') {
    return (
      <g {...g}>
        <circle cx={x - h * 0.46} cy={y} r={headR} fill={fill} />
        <path
          d={`M${x - h * 0.46 + headR} ${y - 5}q${h * 0.5} -8 ${h * 0.92} 0q-4 8-14 8h-${h * 0.62}q-10 0-14-8Z`}
          fill={fill}
        />
      </g>
    )
  }
  if (pose === 'hang') {
    return (
      <g {...g}>
        <path d={`M${x} ${y - h}v${h * 0.42}`} />
        <circle cx={x} cy={y - h * 0.4} r={headR} fill={fill} />
        <path
          d={`M${x - headR} ${y - h * 0.4 + headR}q-8 4-10 ${h * 0.22}q10 6 20 0q-2-${h * 0.18}-10-${h * 0.22}Z`}
          fill={fill}
        />
        <path d={`M${x} ${y - h * 0.06}l-15 -${h * 0.16}`} />
        <g stroke={GOLD} strokeWidth={1.4}>
          <circle cx={x} cy={y - h * 0.4} r={headR + 4} strokeDasharray="1.5 3" />
        </g>
      </g>
    )
  }

  // head (slightly bowed) + hood line
  const head = (
    <>
      <circle cx={x} cy={y - h + headR} r={headR} fill={fill} />
      <path d={`M${x - headR - 1} ${neck - 1}q${headR + 1} 6 ${2 * headR + 2} 0`} />
    </>
  )

  // robe: shoulders → flared hem, with a centre fold + a hem sweep
  const robeD =
    `M${x - shW} ${shoulder}` +
    `Q${x - shW - 3} ${(shoulder + hemY) / 2} ${x - hemW} ${hemY}` +
    `Q${x} ${hemY + 5} ${x + hemW} ${hemY}` +
    `Q${x + shW + 3} ${(shoulder + hemY) / 2} ${x + shW} ${shoulder}` +
    `Q${x} ${shoulder - 4} ${x - shW} ${shoulder}Z`
  const body = (
    <>
      <path d={robeD} fill={fill} />
      <path d={`M${x} ${shoulder + 2}L${x} ${hemY - 2}`} strokeWidth={1.4} opacity={0.7} />
      {(pose === 'sit' || pose === 'kneel') && (
        <path d={`M${x - hemW} ${hemY}q${hemW} 14 ${2 * hemW} 0`} strokeWidth={1.6} />
      )}
    </>
  )

  let arms: ReactNode
  const aTop = shoulder + 3
  if (pose === 'armsUp') {
    arms = (
      <path
        d={`M${x - shW + 2} ${aTop}q-8-14-4-${h * 0.34}M${x + shW - 2} ${aTop}q8-14 4-${h * 0.34}`}
      />
    )
  } else if (pose === 'offer') {
    arms = (
      <path
        d={`M${x - shW + 2} ${aTop}q-12 6-16 18M${x + shW - 2} ${aTop}q12 6 16 18`}
      />
    )
  } else if (pose === 'walk') {
    arms = (
      <>
        <path d={`M${x - shW + 2} ${aTop}q-10 10-8 22`} />
        <path d={`M${x + shW - 2} ${aTop}q10 8 8 18`} />
        <path d={`M${x - hemW + 4} ${hemY}l-9 12M${x + 4} ${hemY}l9 10`} strokeWidth={1.8} />
      </>
    )
  } else if (pose === 'bound') {
    arms = (
      <path
        d={`M${x - shW + 3} ${aTop + 2}q-6 10-4 18M${x + shW - 3} ${aTop + 2}q6 10 4 18M${x - 11} ${aTop + 20}h22`}
      />
    )
  } else {
    arms = (
      <path
        d={`M${x - shW + 2} ${aTop}q-8 ${(hemY - aTop) * 0.5}-6 ${(hemY - aTop) * 0.86}M${x + shW - 2} ${aTop}q8 ${(hemY - aTop) * 0.5} 6 ${(hemY - aTop) * 0.86}`}
      />
    )
  }

  return (
    <g {...g}>
      {body}
      {head}
      {arms}
    </g>
  )
}

export function Angel({ x = 100, y = 210, h = 96 }: { x?: number; y?: number; h?: number }) {
  return (
    <g {...stroke(2.2)} stroke={GOLD}>
      <path d={`M${x - 6} ${y - h * 0.5}Q${x - 60} ${y - h * 0.7} ${x - 40} ${y - h * 0.2}Q${x - 20} ${y - h * 0.35} ${x - 6} ${y - h * 0.42}Z`} fill={`${GOLD}14`} />
      <path d={`M${x + 6} ${y - h * 0.5}Q${x + 60} ${y - h * 0.7} ${x + 40} ${y - h * 0.2}Q${x + 20} ${y - h * 0.35} ${x + 6} ${y - h * 0.42}Z`} fill={`${GOLD}14`} />
      <Figure x={x} y={y} h={h} pose="offer" robe={GOLD} />
    </g>
  )
}

/* --------------------------------------------------------------- props */

export function SuitProp({ suit, x, y, s = 1, rot = 0 }: { suit: Suit; x: number; y: number; s?: number; rot?: number }) {
  const t = `translate(${x} ${y}) scale(${s}) rotate(${rot})`
  const p = stroke(2.6 / s)
  switch (suit) {
    case 'wands':
      return (
        <g transform={t} {...p}>
          <path d="M0 26V-20" />
          <path d="M0 -20c-4-4-5-11-2-16 4 2 6 8 5 13 4-4 11-4 15-1-2 4-8 6-13 4" />
        </g>
      )
    case 'cups':
      return (
        <g transform={t} {...p}>
          <path d="M-13 -18h26l-3 13a10 10 0 0 1-20 0Z" fill={`${INK}14`} />
          <path d="M0 8v12M-9 22h18" />
        </g>
      )
    case 'swords':
      return (
        <g transform={t} {...p}>
          <path d="M0 -26V22" />
          <path d="M-9 -14h18" />
          <path d="M0 26l-4-6h8Z" fill={INK} />
        </g>
      )
    case 'pentacles':
      return (
        <g transform={t} {...p}>
          <circle cx="0" cy="0" r="15" fill={`${INK}12`} />
          <path d="M0 -12l3.5 7.2 8 1.2-5.8 5.6 1.4 8L0 13.5l-7.1 3.5 1.4-8-5.8-5.6 8-1.2Z" />
        </g>
      )
    default:
      return null
  }
}

/** RWS-style layout of `n` pips of a suit, arranged in the classic tableau. */
export function Pips({ suit, n, id }: { suit: Suit; n: number; id: string }) {
  const cx = 100
  const layout: [number, number][] =
    (
      {
        1: [[cx, 150]],
        2: [
          [cx, 108],
          [cx, 196],
        ],
        3: [
          [cx, 96],
          [cx - 34, 176],
          [cx + 34, 176],
        ],
        4: [
          [cx - 30, 110],
          [cx + 30, 110],
          [cx - 30, 194],
          [cx + 30, 194],
        ],
        5: [
          [cx - 30, 104],
          [cx + 30, 104],
          [cx, 150],
          [cx - 30, 196],
          [cx + 30, 196],
        ],
        6: [
          [cx - 32, 100],
          [cx + 32, 100],
          [cx - 32, 152],
          [cx + 32, 152],
          [cx - 32, 204],
          [cx + 32, 204],
        ],
        7: [
          [cx - 32, 96],
          [cx + 32, 96],
          [cx, 128],
          [cx - 32, 160],
          [cx + 32, 160],
          [cx - 20, 206],
          [cx + 20, 206],
        ],
        8: [
          [cx - 32, 92],
          [cx + 32, 92],
          [cx - 32, 132],
          [cx + 32, 132],
          [cx - 32, 172],
          [cx + 32, 172],
          [cx - 20, 214],
          [cx + 20, 214],
        ],
        9: [
          [cx - 34, 90],
          [cx, 90],
          [cx + 34, 90],
          [cx - 34, 148],
          [cx, 148],
          [cx + 34, 148],
          [cx - 34, 206],
          [cx, 206],
          [cx + 34, 206],
        ],
        10: [
          [cx - 30, 86],
          [cx + 30, 86],
          [cx, 112],
          [cx - 30, 138],
          [cx + 30, 138],
          [cx - 30, 178],
          [cx + 30, 178],
          [cx, 204],
          [cx - 30, 230],
          [cx + 30, 230],
        ],
      } as Record<number, [number, number][]>
    )[Math.min(n, 10)] ?? []
  return (
    <g>
      {layout.map(([px, py], i) => (
        <SuitProp key={`${id}-${i}`} suit={suit} x={px} y={py} s={0.62} />
      ))}
    </g>
  )
}

/** A hand emerging from a cloud, holding a single prop — the Aces. */
export function AceHand({ suit }: { suit: Suit }) {
  return (
    <g {...stroke(2.4)}>
      <path d="M60 200q-14-2-14-14t14-12q4-16 20-14 8-14 24-8 14-4 20 10 16 0 14 16-2 12-18 12Z" fill={`${INK}12`} />
      <path d="M100 190q-8 0-8 10v18" />
      <SuitProp suit={suit} x={100} y={130} s={1.15} />
    </g>
  )
}

export function Throne({ x = 100, y = 240 }: { x?: number; y?: number }) {
  return (
    <g {...stroke(2.4)}>
      <path d={`M${x - 34} ${y}v-64q0-10 10-10h48q10 0 10 10v64`} fill={`${INK}0d`} />
      <path d={`M${x - 34} ${y - 40}h68`} />
    </g>
  )
}

export function Crown({ x = 100, y = 60, w = 26 }: { x?: number; y?: number; w?: number }) {
  return (
    <path
      d={`M${x - w} ${y + 8}l4-18 ${w * 0.55} 10 ${w * 0.45}-14 ${w * 0.45} 14 ${w * 0.55}-10 4 18Z`}
      {...stroke(2)}
      stroke={GOLD}
      fill={`${GOLD}1c`}
    />
  )
}

export function Wreath({ x = 100, y = 160, rx = 46, ry = 70 }: { x?: number; y?: number; rx?: number; ry?: number }) {
  return (
    <g {...stroke(2.4)} stroke={GOLD}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} strokeDasharray="1.5 7" />
      <path d={`M${x - rx} ${y}q4-8 10 0M${x + rx} ${y}q-4 8-10 0`} />
    </g>
  )
}

export function Wheel({ x = 100, y = 130, r = 34 }: { x?: number; y?: number; r?: number }) {
  return (
    <g {...stroke(2.4)} stroke={GOLD}>
      <circle cx={x} cy={y} r={r} />
      <circle cx={x} cy={y} r={r * 0.42} />
      <circle cx={x} cy={y} r={4} fill={GOLD} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        return <path key={i} d={`M${x + Math.cos(a) * (r * 0.42)} ${y + Math.sin(a) * (r * 0.42)}L${x + Math.cos(a) * r} ${y + Math.sin(a) * r}`} />
      })}
    </g>
  )
}

export function Tower({ x = 100, y = 250 }: { x?: number; y?: number }) {
  return (
    <g {...stroke(2.4)}>
      <path d={`M${x - 22} ${y}V${y - 120}h44V${y}`} fill={`${INK}0d`} />
      <path d={`M${x - 26} ${y - 120}l8-16h36l8 16`} />
      <path d={`M${x - 6} ${y - 40}h12v40h-12ZM${x - 22} ${y - 84}h44`} />
      {/* the crown flying off */}
      <path d={`M${x - 18} ${y - 150}l4-14 8 8 6-12 6 12 8-8 4 14Z`} {...stroke(1.8)} stroke={GOLD} fill={`${GOLD}1c`} />
    </g>
  )
}

export function Scales({ x = 100, y = 150 }: { x?: number; y?: number }) {
  return (
    <g {...stroke(2.2)} stroke={GOLD}>
      <path d={`M${x} ${y - 30}v54M${x - 34} ${y - 24}h68`} />
      <path d={`M${x - 34} ${y - 24}l-9 16a11 11 0 0 0 18 0ZM${x + 34} ${y - 24}l-9 16a11 11 0 0 0 18 0Z`} />
    </g>
  )
}

export function Lantern({ x = 100, y = 120 }: { x?: number; y?: number }) {
  return (
    <g {...stroke(2.2)} stroke={GOLD}>
      <path d={`M${x - 11} ${y}h22l4 26H${x - 15}ZM${x} ${y - 8}v8`} />
      <circle cx={x} cy={y + 13} r={7} fill={`${GOLD}33`} />
    </g>
  )
}

/* --------------------------------------------------------- animals & flora */

export function Dog({ x = 70, y = 250 }: { x?: number; y?: number }) {
  return (
    <g {...stroke(1.8)}>
      {/* body + legs + head + perky tail */}
      <path d={`M${x - 9} ${y}v-7l3-4 3 4 3-4 3 4v7`} />
      <path d={`M${x - 9} ${y - 11}q-4-1-5-5 3-1 5 1`} />
      <path d={`M${x + 9} ${y - 11}q4-4 7-3`} />
      <circle cx={x - 12} cy={y - 15} r={1} fill={INK} />
    </g>
  )
}

export function Bird({ x = 100, y = 90, s = 1 }: { x?: number; y?: number; s?: number }) {
  return <path d={`M${x - 10 * s} ${y}q10 -8 ${10 * s} 0q10 -8 ${10 * s} 0`} {...stroke(1.8)} />
}

export function Fish({ x = 100, y = 250 }: { x?: number; y?: number }) {
  return <path d={`M${x - 12} ${y}q12 -8 24 0q-12 8-24 0Zm24 0l6-5v10Z`} {...stroke(1.8)} />
}

export function Rose({ x = 100, y = 100, r = 6, color = GOLD }: { x?: number; y?: number; r?: number; color?: string }) {
  return (
    <g {...stroke(1.8)} stroke={color}>
      <circle cx={x} cy={y} r={r} fill={`${color}22`} />
      <circle cx={x} cy={y} r={r * 0.45} />
    </g>
  )
}

/* --------------------------------------------------------------- frame */

export function Frame({
  id,
  name,
  reversed,
  color,
  children,
}: {
  id: string
  name: string
  reversed?: boolean
  color: string
  children: ReactNode
}) {
  return (
    <>
      <defs>
        <radialGradient id={`tg-sky-${id}`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#1b2a5e" />
          <stop offset="60%" stopColor="#0c1330" />
          <stop offset="100%" stopColor="#05070f" />
        </radialGradient>
      </defs>

      <rect x="2" y="2" width="196" height="336" rx="16" fill="#05070f" />
      <Sky id={id} />

      <g transform={reversed ? 'rotate(180 100 168)' : undefined}>{children}</g>

      {/* frame over the art */}
      <rect x="7" y="7" width="186" height="326" rx="12" fill="none" stroke={GOLD} strokeOpacity="0.85" strokeWidth="1.6" />
      <rect x="12" y="12" width="176" height="316" rx="9" fill="none" stroke={GOLD} strokeOpacity="0.28" strokeWidth="1" />
      {[
        [21, 21],
        [179, 21],
        [21, 319],
        [179, 319],
      ].map(([cx, cy]) => (
        <path
          key={`${cx}-${cy}`}
          d={`M${cx} ${cy - 5}l1.4 3.6 3.6 1.4-3.6 1.4L${cx} ${cy + 5}l-1.4-3.6L${cx - 5} ${cy}l3.6-1.4Z`}
          fill={GOLD}
          fillOpacity="0.7"
        />
      ))}

      {/* name banner */}
      <rect x="18" y="292" width="164" height="34" rx="7" fill="#05070f" />
      <rect x="18" y="292" width="164" height="34" rx="7" fill={`${color}12`} stroke={`${GOLD}55`} strokeWidth="1" />
      <text
        x="100"
        y="314"
        textAnchor="middle"
        fill={INK}
        fontSize={name.length > 17 ? 11.5 : 13.5}
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        letterSpacing="0.6"
      >
        {name}
      </text>

      {reversed && (
        <text x="176" y="332" textAnchor="end" fill={GOLD} fillOpacity="0.85" fontSize="11" fontWeight="700">
          ℞
        </text>
      )}
    </>
  )
}

export { DIM }
