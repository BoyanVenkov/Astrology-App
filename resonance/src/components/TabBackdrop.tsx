import type { TabKey } from '../types/resonance'

/**
 * Per-tab atmosphere — one full-bleed SVG behind each tab's content.
 *
 * All four scenes share a language: faint single-weight geometry drawn in the
 * day's hue (`currentColor`, fed from `--rz-hue`) over a soft radial wash, with
 * a handful of opacity-twinkling accents. They sit at ~2–20% opacity so they
 * read as texture, never as content. Geometry is static; only a few small dots
 * animate, and `prefers-reduced-motion` stills those too.
 */

const VB = '0 0 400 860'

/** unit four-pointed star, centred on the origin, points at ±12 */
const STAR =
  'M0 -12C1.2 -4.4 4.4 -1.2 12 0 4.4 1.2 1.2 4.4 0 12 -1.2 4.4 -4.4 1.2 -12 0 -4.4 -1.2 -1.2 -4.4 0 -12Z'

function Spark({
  x,
  y,
  size,
  opacity = 0.4,
  twinkle,
  delay,
}: {
  x: number
  y: number
  size: number
  opacity?: number
  twinkle?: boolean
  delay?: number
}) {
  return (
    <path
      d={STAR}
      transform={`translate(${x} ${y}) scale(${size / 12})`}
      fill="currentColor"
      className={twinkle ? 'animate-twinkle' : undefined}
      opacity={twinkle ? undefined : opacity}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    />
  )
}

/* --------------------------------------------------------------- scenes */

/** Today — wavefronts emanating from the top, like a struck bell at dawn. */
function TodayScene() {
  return (
    <svg
      viewBox={VB}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="h-full w-full"
      style={{ color: 'var(--rz-hue)' }}
    >
      <defs>
        <radialGradient id="rz-today" cx="50%" cy="3%" r="62%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="860" fill="url(#rz-today)" />
      <g fill="none" stroke="currentColor">
        <circle cx="200" cy="-30" r="150" strokeOpacity="0.1" strokeDasharray="3 9" />
        <circle cx="200" cy="-30" r="232" strokeOpacity="0.075" />
        <circle cx="200" cy="-30" r="322" strokeOpacity="0.055" strokeDasharray="2 12" />
        <circle cx="200" cy="-30" r="424" strokeOpacity="0.04" />
        <circle cx="200" cy="-30" r="540" strokeOpacity="0.03" strokeDasharray="2 14" />
        <circle cx="200" cy="-30" r="672" strokeOpacity="0.022" />
      </g>
      <Spark x={58} y={232} size={7} twinkle />
      <Spark x={338} y={430} size={9} twinkle delay={1.6} />
      <Spark x={150} y={654} size={5} opacity={0.32} />
      <Spark x={300} y={720} size={4} opacity={0.26} />
    </svg>
  )
}

const STARS = (() => {
  let s = 1337
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  return Array.from({ length: 46 }, () => ({
    x: Math.round(rnd() * 400),
    y: Math.round(rnd() * 860),
    r: Number((0.5 + rnd() * 1.5).toFixed(2)),
    o: Number((0.22 + rnd() * 0.55).toFixed(2)),
  }))
})()

/** Sky — a quiet star field crossed by two orbits and a faint constellation. */
function SkyScene() {
  return (
    <svg
      viewBox={VB}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="h-full w-full"
      style={{ color: 'var(--rz-hue)' }}
    >
      <defs>
        <radialGradient id="rz-sky" cx="82%" cy="9%" r="58%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="55%" stopColor="#2b3a78" stopOpacity="0.1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="860" fill="url(#rz-sky)" />

      <g fill="none" stroke="currentColor" strokeOpacity="0.09">
        <ellipse cx="210" cy="300" rx="250" ry="118" transform="rotate(-18 210 300)" />
        <ellipse cx="188" cy="474" rx="300" ry="150" transform="rotate(12 188 474)" />
      </g>

      <polyline
        points="52,150 120,206 96,300 182,338 250,292"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeDasharray="1 7"
        strokeLinecap="round"
      />

      <g fill="#e6ecff">
        {STARS.map((st) => (
          <circle
            key={`${st.x}-${st.y}-${st.r}`}
            cx={st.x}
            cy={st.y}
            r={st.r}
            opacity={st.o}
          />
        ))}
      </g>

      <circle cx="120" cy="206" r="1.9" fill="currentColor" className="animate-twinkle" />
      <circle
        cx="250"
        cy="292"
        r="1.7"
        fill="currentColor"
        className="animate-twinkle"
        style={{ animationDelay: '2s' }}
      />
      <circle
        cx="322"
        cy="628"
        r="2"
        fill="#fff"
        className="animate-twinkle"
        style={{ animationDelay: '1s' }}
      />
    </svg>
  )
}

/** Tarot — three faint dealt cards under a lattice of stars. */
function TarotBackdropScene() {
  return (
    <svg
      viewBox={VB}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="h-full w-full"
      style={{ color: 'var(--rz-hue)' }}
    >
      <defs>
        <radialGradient id="rz-tarot" cx="50%" cy="8%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="860" fill="url(#rz-tarot)" />

      <g fill="none" stroke="currentColor" strokeOpacity="0.09" strokeLinejoin="round">
        <rect x="42" y="150" width="150" height="250" rx="14" transform="rotate(-9 117 275)" />
        <rect x="128" y="120" width="150" height="250" rx="14" />
        <rect x="214" y="150" width="150" height="250" rx="14" transform="rotate(9 289 275)" />
      </g>

      <Spark x={200} y={92} size={9} twinkle />
      <Spark x={70} y={540} size={5} opacity={0.3} />
      <Spark x={330} y={620} size={6} twinkle delay={1.4} />
      <Spark x={150} y={730} size={4} opacity={0.26} />
    </svg>
  )
}

/** You — an aura: concentric rings breathing out from where the orb sits. */
function YouScene() {
  return (
    <svg
      viewBox={VB}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="h-full w-full"
      style={{ color: 'var(--rz-hue)' }}
    >
      <defs>
        <radialGradient id="rz-you" cx="50%" cy="25%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="45%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="860" fill="url(#rz-you)" />

      <g fill="none" stroke="currentColor" transform="translate(200 214)">
        <circle r="72" strokeOpacity="0.14" />
        <circle r="120" strokeOpacity="0.1" strokeDasharray="2 10" />
        <circle r="182" strokeOpacity="0.075" />
        <circle r="252" strokeOpacity="0.05" strokeDasharray="2 12" />
        <circle r="332" strokeOpacity="0.035" />
        <circle r="430" strokeOpacity="0.022" />
      </g>

      <g fill="currentColor" transform="translate(200 214)">
        <circle cx="0" cy="-120" r="2" className="animate-twinkle" />
        <circle cx="182" cy="4" r="1.6" opacity="0.5" />
        <circle
          cx="-140"
          cy="118"
          r="1.6"
          className="animate-twinkle"
          style={{ animationDelay: '1.5s' }}
        />
      </g>
    </svg>
  )
}

/* ----------------------------------------------------------------- switch */

export function TabBackdrop({ tab }: { tab: TabKey }) {
  switch (tab) {
    case 'sky':
      return <SkyScene />
    case 'tarot':
      return <TarotBackdropScene />
    case 'you':
      return <YouScene />
    default:
      return <TodayScene />
  }
}
