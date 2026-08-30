import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { BODY_SYMBOL, SIGNS } from '../lib/ephemeris'
import { houseOf } from '../lib/houses'
import { zodiacGlyph } from '../lib/resonanceData'
import { Screen } from './Screen'

interface NatalChartProps {
  onBack: () => void
}

const SIZE = 340
const C = SIZE / 2
const R_OUTER = 165
const R_BAND = 133 // inner edge of the sign band
const R_SIGN = 149
const R_PLANET = 110
const R_FOOT = R_BAND
const R_ASPECT = 92
const R_HUB = 50
const R_HOUSE_NUM = 68

const ELEMENT = ['#ef4444', '#34d399', '#38bdf8', '#6366f1'] // fire earth air water

const ASPECT_STROKE: Record<string, string> = {
  hard: 'rgba(248,113,113,0.55)',
  soft: 'rgba(56,189,248,0.5)',
  neutral: 'rgba(212,175,55,0.55)',
}
const ASPECT_MARK: Record<string, string> = {
  conjunction: '☌︎',
  opposition: '☍︎',
  square: '□︎',
  trine: '△︎',
  sextile: '⚹︎',
}
const aspectMark = (name: string): string => ASPECT_MARK[name] ?? '·'

export function NatalChart({ onBack }: NatalChartProps) {
  const natal = useAppStore((s) => s.natal)
  const natalAspects = useAppStore((s) => s.natalAspects)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const angles = useAppStore((s) => s.angles)
  const profile = useAppStore((s) => s.profile)
  const editProfile = useAppStore((s) => s.editProfile)

  // Rotate so the Ascendant sits at 9 o'clock; without houses, 0° Aries there.
  const rot = angles ? angles.ascendant : 0
  const polar = useMemo(() => {
    return (r: number, lon: number) => {
      const a = ((180 + lon - rot) * Math.PI) / 180
      return { x: C + r * Math.cos(a), y: C - r * Math.sin(a) }
    }
  }, [rot])

  // Spread overlapping glyphs so they stay legible.
  const placed = useMemo(() => {
    const sorted = [...natal].sort((a, b) => a.longitude - b.longitude)
    const plot: number[] = []
    sorted.forEach((p, i) => {
      const min = i === 0 ? p.longitude : plot[i - 1] + 9
      plot.push(Math.max(p.longitude, min))
    })
    return sorted.map((p, i) => ({ pos: p, plotLon: plot[i] }))
  }, [natal])

  if (!hasNatal) {
    return (
      <Screen eyebrow="Natal Chart" title="Your birth sky" onBack={onBack}>
        <div className="glass-panel p-6 text-sm leading-relaxed text-haze-300">
          <p>
            Add your birth date, time and place and Resonance will draw your natal
            chart — the exact position of the Sun, Moon and planets at the moment
            you were born.
          </p>
          <button
            type="button"
            onClick={editProfile}
            className="mt-4 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100"
          >
            Add birth details
          </button>
        </div>
      </Screen>
    )
  }

  const byBody = new Map(natal.map((p) => [p.body, p]))
  const cusps = angles?.cusps ?? null
  const ANGLE_LABELS = ['AC', 'IC', 'DC', 'MC'] // cusps 1, 4, 7, 10

  return (
    <Screen
      eyebrow="Natal Chart"
      title="Your birth sky"
      onBack={onBack}
      action={
        <button
          type="button"
          onClick={editProfile}
          className="text-[10px] uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          edit
        </button>
      }
      subtitle={
        profile
          ? `${profile.date} · ${profile.timeKnown ? profile.time : 'time unknown (noon)'}${profile.placeLabel ? ` · ${profile.placeLabel}` : ''}`
          : undefined
      }
    >
      {angles ? (
        <p className="-mt-2 px-1 text-xs text-haze-400">
          {fmtDegSign(angles.ascendant)} rising · MC {fmtDegSign(angles.midheaven)}{' '}
          · {angles.system === 'placidus' ? 'Placidus houses' : 'whole-sign houses'}
        </p>
      ) : (
        <button
          type="button"
          onClick={editProfile}
          className="-mt-2 px-1 text-left text-xs text-gold-300"
        >
          Add your birth place for the Ascendant & houses →
        </button>
      )}

      {/* ---- the wheel ---- */}
      <div className="glass-panel flex justify-center p-3">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full max-w-[360px]"
          role="img"
          aria-label="Natal chart wheel"
        >
          {/* sign band */}
          {SIGNS.map((sign, i) => {
            const a1 = polar(R_OUTER, i * 30)
            const a2 = polar(R_OUTER, (i + 1) * 30)
            const b2 = polar(R_BAND, (i + 1) * 30)
            const b1 = polar(R_BAND, i * 30)
            return (
              <path
                key={sign}
                d={`M${a1.x} ${a1.y} A${R_OUTER} ${R_OUTER} 0 0 0 ${a2.x} ${a2.y} L${b2.x} ${b2.y} A${R_BAND} ${R_BAND} 0 0 1 ${b1.x} ${b1.y} Z`}
                fill={ELEMENT[i % 4]}
                fillOpacity={0.1}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.75}
              />
            )
          })}
          {SIGNS.map((sign, i) => {
            const p = polar(R_SIGN, i * 30 + 15)
            return (
              <text
                key={sign}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={13}
                fill="rgba(233,237,250,0.78)"
              >
                {zodiacGlyph(sign)}
              </text>
            )
          })}

          {/* inner disc */}
          <circle
            cx={C}
            cy={C}
            r={R_BAND}
            fill="rgba(3,4,12,0.5)"
            stroke="rgba(212,175,55,0.22)"
            strokeWidth={1}
          />

          {/* house cusps */}
          {cusps &&
            cusps.map((cuspLon, i) => {
              const isAngle = i === 0 || i === 3 || i === 6 || i === 9
              const inner = polar(isAngle ? 0 : R_HUB, cuspLon)
              const outer = polar(R_BAND, cuspLon)
              const mid =
                cusps[i] +
                (((cusps[(i + 1) % 12] - cusps[i]) % 360) + 360) % 360 / 2
              const numPos = polar(R_HOUSE_NUM, mid)
              return (
                <g key={`cusp-${i}`}>
                  <line
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke={
                      isAngle
                        ? 'rgba(212,175,55,0.55)'
                        : 'rgba(255,255,255,0.14)'
                    }
                    strokeWidth={isAngle ? 1.4 : 0.75}
                  />
                  <text
                    x={numPos.x}
                    y={numPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={8}
                    fill="rgba(233,237,250,0.4)"
                  >
                    {i + 1}
                  </text>
                  {isAngle && (
                    <text
                      x={polar(R_OUTER + 9, cuspLon).x}
                      y={polar(R_OUTER + 9, cuspLon).y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={9}
                      fontWeight={600}
                      fill="rgba(212,175,55,0.9)"
                    >
                      {ANGLE_LABELS[[0, 3, 6, 9].indexOf(i)]}
                    </text>
                  )}
                </g>
              )
            })}

          {/* central hub */}
          <circle
            cx={C}
            cy={C}
            r={R_HUB}
            fill="rgba(3,4,12,0.6)"
            stroke="rgba(255,255,255,0.08)"
          />

          {/* aspect lines */}
          {natalAspects.map((a) => {
            const p1 = byBody.get(a.transiting)
            const p2 = byBody.get(a.other)
            if (!p1 || !p2) return null
            const q1 = polar(R_ASPECT, p1.longitude)
            const q2 = polar(R_ASPECT, p2.longitude)
            return (
              <line
                key={`${a.transiting}-${a.other}-${a.def.name}`}
                x1={q1.x}
                y1={q1.y}
                x2={q2.x}
                y2={q2.y}
                stroke={ASPECT_STROKE[a.def.harmony]}
                strokeWidth={0.5 + a.exactness}
              />
            )
          })}

          {/* planets */}
          {placed.map(({ pos, plotLon }) => {
            const glyph = polar(R_PLANET, plotLon)
            const foot = polar(R_FOOT - 2, pos.longitude)
            const connect = polar(R_PLANET - 9, plotLon)
            return (
              <g key={pos.body}>
                <line
                  x1={connect.x}
                  y1={connect.y}
                  x2={foot.x}
                  y2={foot.y}
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth={0.75}
                />
                <circle cx={foot.x} cy={foot.y} r={1.6} fill="rgba(212,175,55,0.9)" />
                <text
                  x={glyph.x}
                  y={glyph.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={15}
                  fill="#f6f1e4"
                >
                  {BODY_SYMBOL[pos.body]}
                </text>
                {pos.retrograde && (
                  <text
                    x={glyph.x + 10}
                    y={glyph.y + 8}
                    textAnchor="middle"
                    fontSize={7}
                    fill="rgba(233,237,250,0.6)"
                  >
                    ℞
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* ---- placements ---- */}
      <section className="glass-panel p-4">
        <p className="eyebrow">Placements</p>
        <ul className="mt-3 grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2 sm:gap-x-4">
          {natal.map((p) => (
            <li key={p.body} className="flex items-center gap-2">
              <span className="w-4 text-center text-haze-200">
                {BODY_SYMBOL[p.body]}
              </span>
              <span className="text-haze-100">{p.body}</span>
              <span className="data ml-auto text-xs text-haze-400">
                {Math.floor(p.signDegree)}° {p.sign.slice(0, 3)}
                {p.retrograde ? ' ℞' : ''}
                {cusps ? ` · H${houseOf(p.longitude, cusps)}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- natal aspects ---- */}
      <section className="glass-panel p-4">
        <p className="eyebrow">Natal aspects</p>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {natalAspects.slice(0, 12).map((a) => (
            <li
              key={`${a.transiting}-${a.other}-${a.def.name}`}
              className="flex items-center justify-between"
            >
              <span className="text-haze-100">
                {a.transiting} {aspectMark(a.def.name)} {a.other}
              </span>
              <span className="data text-xs text-haze-400">
                {a.def.name} · {a.orbDelta.toFixed(1)}°
              </span>
            </li>
          ))}
          {natalAspects.length === 0 && (
            <li className="text-haze-400">No major aspects within orb.</li>
          )}
        </ul>
      </section>
    </Screen>
  )
}

const fmtDegSign = (lon: number): string => {
  const s = ((lon % 360) + 360) % 360
  return `${Math.floor(s % 30)}° ${SIGNS[Math.floor(s / 30)]}`
}
