import type { ReactNode } from 'react'
import heroWide from '../assets/art/hero-today-wide.webp'
import heroTall from '../assets/art/hero-today-tall.webp'

interface TodayHeroProps {
  eyebrow: string
  greeting: string
  /** The day's focus line — chakra · transit. */
  headline: string
  /** Glyphs of the day's actual players (transiting body, its sign, its target). */
  glyphs: string[]
  /** The mantra plate, set over the Moon. */
  mantra?: ReactNode
}

/** unit four-pointed star (same shape as the tab backdrops), points at ±12 */
const STAR =
  'M0 -12C1.2 -4.4 4.4 -1.2 12 0 4.4 1.2 1.2 4.4 0 12 -1.2 4.4 -4.4 1.2 -12 0 -4.4 -1.2 -1.2 -4.4 0 -12Z'

/** A tiny twinkling star, centred on (x, y). */
function Star({ x, y, r, delay }: { x: number; y: number; r: number; delay: number }) {
  return (
    <path
      d={STAR}
      transform={`translate(${x} ${y}) scale(${r / 12})`}
      fill="#fbecc4"
      className="animate-twinkle"
      style={{ animationDelay: `${delay}s`, animationDuration: `${4 + (delay % 3)}s` }}
    />
  )
}

/** A constellation — a few gold nodes joined by hairlines. */
function Constellation({
  points,
  className,
  seed,
}: {
  points: [number, number][]
  className: string
  seed: number
}) {
  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={`pointer-events-none absolute ${className}`}>
      <path d={d} fill="none" stroke="#e8c274" strokeOpacity={0.32} strokeWidth={0.5} />
      {points.map(([x, y], i) => (
        <Star key={i} x={x} y={y} r={i % 2 ? 2.4 : 3.4} delay={seed + i * 0.7} />
      ))}
    </svg>
  )
}

/**
 * The Today hero — a cinematic plate. A Gemini-rendered night scene (giant
 * Moon over a mountain sea, a meditator on the rock) is brought to life in
 * code: a slow camera push, moonlight breathing, two orbital rings turning
 * around the Moon in opposite directions, constellations twinkling, and the
 * day's real transit glyphs drifting on the rings. All motion is CSS, so
 * `prefers-reduced-motion` stills every bit of it.
 */
export function TodayHero({
  eyebrow,
  greeting,
  headline,
  glyphs,
  mantra,
}: TodayHeroProps) {
  return (
    <section className="animate-bloom-in relative isolate -mx-2 overflow-hidden rounded-[1.75rem] border border-white/[0.09] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:mx-0 md:rounded-[2rem]">
      {/* ---- the plate ---- */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-[#05060f]">
        <img
          src={heroTall}
          alt=""
          className="animate-ken-burns absolute inset-0 h-full w-full object-cover object-[50%_42%] md:hidden"
        />
        <img
          src={heroWide}
          alt=""
          className="animate-ken-burns absolute inset-0 hidden h-full w-full object-cover object-[50%_45%] md:block"
        />

        {/* moonlight — a warm breathing bloom sitting on the Moon */}
        <span
          className="animate-moon-breathe absolute left-1/2 top-[47%] h-[46%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:top-[51%] md:h-[62%] md:w-[34%]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,220,160,0.32), rgba(232,194,116,0.12) 55%, transparent 80%)',
          }}
        />

        {/* orbital rings around the Moon, turning in opposite directions */}
        <div className="absolute left-1/2 top-[47%] aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 md:top-[51%] md:w-[62%]">
          <div className="animate-orbit-slow absolute inset-0">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <ellipse
                cx="100"
                cy="100"
                rx="78"
                ry="30"
                transform="rotate(-18 100 100)"
                fill="none"
                stroke="#e8c274"
                strokeOpacity="0.42"
                strokeWidth="0.35"
              />
              <circle cx="174" cy="76" r="1.6" fill="#fbecc4" />
              <circle cx="174" cy="76" r="4" fill="#e8c274" opacity="0.25" />
            </svg>
          </div>
          <div className="animate-orbit-slow-rev absolute inset-0">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <ellipse
                cx="100"
                cy="100"
                rx="64"
                ry="22"
                transform="rotate(24 100 100)"
                fill="none"
                stroke="#c9b6ff"
                strokeOpacity="0.3"
                strokeWidth="0.3"
                strokeDasharray="1.5 2.5"
              />
              <circle cx="40" cy="74" r="1.2" fill="#e6dcff" />
            </svg>
          </div>
        </div>

        <Constellation
          seed={0}
          className="start-[4%] top-[12%] h-[22%] w-[30%] md:start-[8%] md:top-[14%] md:w-[16%]"
          points={[[8, 70], [30, 48], [52, 58], [70, 26], [92, 34]]}
        />
        <Constellation
          seed={1.6}
          className="end-[4%] top-[22%] h-[20%] w-[26%] md:end-[9%] md:top-[18%] md:w-[14%]"
          points={[[10, 20], [34, 40], [60, 32], [78, 64], [94, 80]]}
        />

        {/* the day's players, drifting near the rings */}
        {glyphs.slice(0, 3).map((g, i) => (
          <span
            key={`${g}-${i}`}
            className="animate-float-slow absolute font-serif text-[1.35rem] text-[#f3dca4] md:text-[1.6rem]"
            style={{
              top: ['30%', '24%', '58%'][i],
              insetInlineStart: ['14%', '80%', '84%'][i],
              opacity: 0.6,
              textShadow: '0 0 14px rgba(232,194,116,0.6)',
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${7 + i}s`,
            }}
          >
            {g}
          </span>
        ))}

        {/* legibility scrims — sky dark behind the type, foreground grounded */}
        <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#04050d]/85 via-[#04050d]/45 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#04050d]/90 via-[#04050d]/40 to-transparent" />
        <span className="absolute inset-0 shadow-[inset_0_0_120px_30px_rgba(3,4,12,0.7)]" />
      </div>

      {/* ---- the type ---- */}
      {/* the mantra plate rides the Moon's lower half and stops just above the
          meditator's head — the figure stays the focal point at the bottom */}
      <div className="relative flex min-h-[40rem] flex-col items-center px-5 pb-[10.5rem] pt-9 text-center md:min-h-[34rem] md:px-10 md:pb-[6.5rem] md:pt-10 lg:min-h-[38rem] lg:pb-[7.5rem] lg:pt-12">
        <p
          className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--rz-gold)]"
          style={{ textShadow: '0 0 18px rgba(0,0,0,0.9)' }}
        >
          {eyebrow}
        </p>
        <h1
          className="display mt-3 text-[2.6rem] leading-[1.02] md:text-[3.3rem] lg:text-[3.9rem]"
          style={{
            color: '#fbf3df',
            textShadow: '0 2px 30px rgba(0,0,0,0.75), 0 0 40px rgba(232,194,116,0.25)',
          }}
        >
          {greeting}
        </h1>
        <p
          className="mt-3 max-w-[34rem] font-serif text-[1.15rem] leading-snug text-[#f1e3bf] md:text-[1.4rem] lg:text-[1.55rem]"
          style={{ textShadow: '0 2px 18px rgba(0,0,0,0.9)' }}
        >
          {headline}
        </p>

        <div className="flex w-full flex-1 items-end justify-center pt-6">
          {mantra}
        </div>
      </div>
    </section>
  )
}
