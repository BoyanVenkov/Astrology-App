import { useMemo, useState, type KeyboardEvent } from 'react'
import { useAppStore } from '../store/useAppStore'
import { BODY_SYMBOL, SIGNS, type BodyName, type BodyPosition } from '../lib/ephemeris'
import { houseOf } from '../lib/houses'
import { ASPECT_GLYPH, type Aspect, type AspectHarmony } from '../lib/astrology'
import { aspectReading } from '../lib/horoscope'
import {
  aspectLabel,
  houseArena,
  ordinal,
  planetLabel,
  signLabel,
  useT,
  type TFn,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { zodiacGlyph } from '../lib/resonanceData'
import { Screen } from './Screen'
import { GlyphBadge, ListRow, SegmentedTabs } from './ui'

interface NatalChartProps {
  onBack: () => void
}

type Tab = 'chart' | 'positions' | 'aspects' | 'reading'

const SIZE = 360
const C = SIZE / 2
const R_OUTER = 172
const R_BAND = 140 // inner edge of the sign band
const R_SIGN = 156
const R_PLANET = 116
const R_FOOT = R_BAND
const R_ASPECT = 96
const R_HUB = 46
const R_HOUSE_NUM = 70

/** fire · earth · air · water — the sign ring's colours */
const ELEMENT = ['#f0786a', '#7bd39b', '#7ec8f2', '#a08cf5']

const HARMONY_COLOR: Record<AspectHarmony, string> = {
  hard: '#f29a9a',
  soft: '#86dcbc',
  neutral: '#e8c274',
}
const HARMONY_LABEL: Record<AspectHarmony, MessageKey> = {
  soft: 'scr.compat.tone.gift',
  neutral: 'scr.compat.tone.intense',
  hard: 'scr.compat.tone.friction',
}

const fmtDegSign = (lon: number, t: TFn): string => {
  const s = ((lon % 360) + 360) % 360
  return `${Math.floor(s % 30)}° ${signLabel(SIGNS[Math.floor(s / 30)], t)}`
}

/**
 * The traditional read of one natal placement, composed from the deep
 * horoscope's own translated fragments: sign colour, what the planet
 * governs, the house it lives in, and retrograde if it was.
 */
function placementReading(p: BodyPosition, cusps: number[] | null, t: TFn): string[] {
  const planet = planetLabel(p.body, t)
  const lines = [
    t('scr.natal.inSign', {
      planet,
      sign: signLabel(p.sign, t),
      flavour: t(`dh.sign.${p.sign}` as MessageKey),
    }),
    t('scr.natal.holds', { planet, na: t(`dh.na.${p.body}` as MessageKey) }),
  ]
  if (cusps) {
    const h = houseOf(p.longitude, cusps)
    lines.push(t('scr.natal.inHouse', { ord: ordinal(h, t), arena: houseArena(h, t) }))
  }
  if (p.retrograde) lines.push(t('scr.natal.retro'))
  return lines
}

function placementMeta(p: BodyPosition, cusps: number[] | null, t: TFn): string {
  return `${Math.floor(p.signDegree)}° ${signLabel(p.sign, t)}${
    cusps ? ` · ${t('scr.natal.house', { n: houseOf(p.longitude, cusps) })}` : ''
  }${p.retrograde ? ' · ℞' : ''}`
}

function aspectPair(a: Aspect, t: TFn) {
  return (
    <>
      {planetLabel(a.transiting, t)}{' '}
      <span aria-hidden className="text-[color:var(--rz-gold)]">
        {ASPECT_GLYPH[a.def.name] ?? '·'}
      </span>{' '}
      {planetLabel(a.other, t)}
    </>
  )
}

export function NatalChart({ onBack }: NatalChartProps) {
  const t = useT()
  const natal = useAppStore((s) => s.natal)
  const natalAspects = useAppStore((s) => s.natalAspects)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const angles = useAppStore((s) => s.angles)
  const profile = useAppStore((s) => s.profile)
  const editProfile = useAppStore((s) => s.editProfile)

  const [tab, setTab] = useState<Tab>('chart')
  const [selected, setSelected] = useState<BodyName | null>(null)
  const [open, setOpen] = useState<string | null>(null)

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
      const min = i === 0 ? p.longitude : plot[i - 1] + 10
      plot.push(Math.max(p.longitude, min))
    })
    return sorted.map((p, i) => ({ pos: p, plotLon: plot[i] }))
  }, [natal])

  if (!hasNatal) {
    return (
      <Screen
        eyebrow={t('scr.natal.eyebrow')}
        title={t('scr.natal.title')}
        onBack={onBack}
      >
        <div className="glass-panel glass-gold p-6 text-sm leading-relaxed text-haze-200">
          <p>{t('scr.natal.blurb')}</p>
          <button
            type="button"
            onClick={editProfile}
            className="btn-gold mt-5 min-h-12 w-full px-6 text-[0.95rem]"
          >
            {t('scr.natal.addDetails')}
          </button>
        </div>
      </Screen>
    )
  }

  const byBody = new Map(natal.map((p) => [p.body, p]))
  const cusps = angles?.cusps ?? null
  const ANGLE_LABELS = ['AC', 'IC', 'DC', 'MC'] // cusps 1, 4, 7, 10
  const sel = selected ? byBody.get(selected) ?? null : null
  const selAspects = sel
    ? natalAspects.filter((a) => a.transiting === sel.body || a.other === sel.body)
    : []
  const pick = (b: BodyName) => setSelected((cur) => (cur === b ? null : b))
  const onPlanetKey = (e: KeyboardEvent, b: BodyName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(b)
    }
  }

  const wheel = (
    <svg
      viewBox={`-14 -14 ${SIZE + 28} ${SIZE + 28}`}
      className="h-auto w-full max-w-[26rem]"
      role="group"
      aria-label={t('scr.natal.wheelAria')}
    >
      <defs>
        <linearGradient id="nc-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a08cf5" />
          <stop offset="35%" stopColor="#7ec8f2" />
          <stop offset="65%" stopColor="#e8c274" />
          <stop offset="100%" stopColor="#f0786a" />
        </linearGradient>
        <radialGradient id="nc-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,194,116,0.12)" />
          <stop offset="100%" stopColor="rgba(3,4,12,0.65)" />
        </radialGradient>
        <filter id="nc-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* the neon rim */}
      <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke="url(#nc-rim)" strokeWidth={1.6} filter="url(#nc-glow)" opacity={0.9} />

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
            fillOpacity={0.08}
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
            fontSize={14}
            fill={ELEMENT[i % 4]}
            style={{ filter: `drop-shadow(0 0 4px ${ELEMENT[i % 4]})` }}
          >
            {zodiacGlyph(sign)}
          </text>
        )
      })}

      {/* inner disc */}
      <circle cx={C} cy={C} r={R_BAND} fill="url(#nc-core)" stroke="rgba(232,194,116,0.3)" strokeWidth={1} />

      {/* house cusps */}
      {cusps &&
        cusps.map((cuspLon, i) => {
          const isAngle = i === 0 || i === 3 || i === 6 || i === 9
          const inner = polar(isAngle ? 0 : R_HUB, cuspLon)
          const outer = polar(isAngle ? R_OUTER + 4 : R_BAND, cuspLon)
          const mid =
            cusps[i] +
            (((cusps[(i + 1) % 12] - cusps[i]) % 360) + 360) % 360 / 2
          const numPos = polar(R_HOUSE_NUM, mid)
          const lab = polar(R_OUTER + 12, cuspLon)
          return (
            <g key={`cusp-${i}`}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={isAngle ? 'rgba(232,194,116,0.7)' : 'rgba(255,255,255,0.12)'}
                strokeWidth={isAngle ? 1.4 : 0.75}
              />
              <text
                x={numPos.x}
                y={numPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={8}
                fill="rgba(233,237,250,0.42)"
              >
                {i + 1}
              </text>
              {isAngle && (
                <text
                  x={lab.x}
                  y={lab.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={9.5}
                  fontWeight={700}
                  fill="#e8c274"
                >
                  {ANGLE_LABELS[[0, 3, 6, 9].indexOf(i)]}
                </text>
              )}
            </g>
          )
        })}

      {/* central hub */}
      <circle cx={C} cy={C} r={R_HUB} fill="rgba(3,4,12,0.7)" stroke="rgba(255,255,255,0.08)" />

      {/* aspect lines — the selected planet's light up, the rest step back */}
      {natalAspects.map((a) => {
        const p1 = byBody.get(a.transiting)
        const p2 = byBody.get(a.other)
        if (!p1 || !p2) return null
        const q1 = polar(R_ASPECT, p1.longitude)
        const q2 = polar(R_ASPECT, p2.longitude)
        const involved = !sel || a.transiting === sel.body || a.other === sel.body
        return (
          <line
            key={`${a.transiting}-${a.other}-${a.def.name}`}
            x1={q1.x}
            y1={q1.y}
            x2={q2.x}
            y2={q2.y}
            stroke={HARMONY_COLOR[a.def.harmony]}
            strokeOpacity={sel ? (involved ? 0.95 : 0.08) : 0.5}
            strokeWidth={(0.5 + a.exactness) * (sel && involved ? 1.6 : 1)}
            style={{ transition: 'stroke-opacity 0.3s ease' }}
          />
        )
      })}

      {/* planets — each one a button */}
      {placed.map(({ pos, plotLon }) => {
        const glyph = polar(R_PLANET, plotLon)
        const foot = polar(R_FOOT - 2, pos.longitude)
        const connect = polar(R_PLANET - 10, plotLon)
        const on = selected === pos.body
        const label = `${planetLabel(pos.body, t)} · ${placementMeta(pos, cusps, t)}`
        return (
          <g
            key={pos.body}
            role="button"
            tabIndex={0}
            aria-label={label}
            aria-pressed={on}
            onClick={() => pick(pos.body)}
            onKeyDown={(e) => onPlanetKey(e, pos.body)}
            className="cursor-pointer outline-none [&:focus-visible>circle.hit]:stroke-[#e8c274]"
            opacity={sel && !on ? 0.55 : 1}
          >
            <title>{label}</title>
            <line x1={connect.x} y1={connect.y} x2={foot.x} y2={foot.y} stroke="rgba(255,255,255,0.28)" strokeWidth={0.75} />
            <circle cx={foot.x} cy={foot.y} r={1.8} fill="#e8c274" />
            <circle
              className="hit"
              cx={glyph.x}
              cy={glyph.y}
              r={12}
              fill={on ? 'rgba(232,194,116,0.22)' : 'rgba(6,8,22,0.55)'}
              stroke={on ? '#e8c274' : 'rgba(255,255,255,0.12)'}
              strokeWidth={on ? 1.4 : 0.8}
            />
            <text
              x={glyph.x}
              y={glyph.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
              fill={on ? '#fbecc4' : '#f6f1e4'}
            >
              {BODY_SYMBOL[pos.body]}
            </text>
            {pos.retrograde && (
              <text x={glyph.x + 11} y={glyph.y + 10} textAnchor="middle" fontSize={7} fill="rgba(233,237,250,0.7)">
                ℞
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )

  const planetPanel = sel && (
    <section className="glass-panel glass-gold animate-rise-in p-4">
      <div className="flex items-center gap-3">
        <GlyphBadge glyph={BODY_SYMBOL[sel.body]} size={48} />
        <div className="min-w-0">
          <p className="font-serif text-[1.35rem] leading-tight text-gilded">
            {planetLabel(sel.body, t)}
          </p>
          <p className="data text-[0.78rem] text-haze-300">{placementMeta(sel, cusps, t)}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2 text-[0.92rem] leading-relaxed text-haze-100">
        {placementReading(sel, cusps, t).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {selAspects.length > 0 && (
        <>
          <p className="eyebrow mt-4">{t('scr.natal.aspectsOf')}</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {selAspects.map((a) => (
              <li key={`${a.transiting}-${a.other}-${a.def.name}`} className="flex items-center justify-between gap-3 text-[0.85rem]">
                <span className="text-haze-100">{aspectPair(a, t)}</span>
                <span className="data shrink-0 text-[0.75rem]" style={{ color: HARMONY_COLOR[a.def.harmony] }}>
                  {t(HARMONY_LABEL[a.def.harmony])} · {a.orbDelta.toFixed(1)}°
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )

  return (
    <Screen
      eyebrow={t('scr.natal.eyebrow')}
      title={t('scr.natal.title')}
      width="wide"
      onBack={onBack}
      action={
        <button
          type="button"
          onClick={editProfile}
          className="rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--rz-gold)] shadow-[inset_0_0_0_1px_rgba(232,194,116,0.4)] transition hover:bg-[rgba(232,194,116,0.1)]"
        >
          {t('scr.natal.edit')}
        </button>
      }
      subtitle={
        profile
          ? `${profile.date} · ${profile.timeKnown ? profile.time : t('scr.natal.timeUnknown')}${profile.placeLabel ? ` · ${profile.placeLabel}` : ''}`
          : undefined
      }
    >
      <SegmentedTabs
        label={t('scr.natal.tabsLabel')}
        value={tab}
        onChange={setTab}
        className="md:max-w-2xl"
        options={[
          { key: 'chart', label: t('scr.natal.tabChart') },
          { key: 'positions', label: t('scr.natal.tabPositions') },
          { key: 'aspects', label: t('scr.natal.tabAspects') },
          { key: 'reading', label: t('scr.natal.tabReading') },
        ]}
      />

      {tab === 'chart' && (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,26rem)_1fr] md:items-start md:gap-6">
          <div className="glass-panel flex flex-col items-center gap-3 p-3 md:sticky md:top-4">
            {wheel}
            {angles ? (
              <div className="flex w-full justify-center gap-2 pb-1">
                <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[0.75rem] text-haze-200 shadow-[inset_0_0_0_1px_rgba(232,194,116,0.3)]">
                  <span className="font-semibold text-[color:var(--rz-gold)]">{t('scr.natal.ascendant')}</span>{' '}
                  <span className="data">{fmtDegSign(angles.ascendant, t)}</span>
                </span>
                <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[0.75rem] text-haze-200 shadow-[inset_0_0_0_1px_rgba(232,194,116,0.3)]">
                  <span className="font-semibold text-[color:var(--rz-gold)]">{t('scr.natal.midheaven')}</span>{' '}
                  <span className="data">{fmtDegSign(angles.midheaven, t)}</span>
                </span>
              </div>
            ) : (
              <button type="button" onClick={editProfile} className="pb-1 text-xs text-[color:var(--rz-gold)]">
                {t('scr.natal.addPlace')}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {planetPanel || (
              <p className="glass-panel p-4 text-center text-[0.9rem] text-haze-300">
                {t('scr.natal.tapPlanet')}
              </p>
            )}
            {angles && (
              <p className="px-1 text-[11px] text-haze-500">
                {angles.system === 'placidus' ? t('scr.natal.placidus') : t('scr.natal.wholeSign')}
              </p>
            )}
          </div>
        </div>
      )}

      {tab === 'positions' && (
        <div className="grid grid-cols-1 items-start gap-2.5 md:grid-cols-2">
          {natal.map((p, i) => (
            <ListRow
              key={p.body}
              delay={i * 30}
              expanded={open === p.body}
              onClick={() => setOpen((o) => (o === p.body ? null : p.body))}
              leading={<GlyphBadge glyph={BODY_SYMBOL[p.body]} />}
              title={planetLabel(p.body, t)}
              sub={
                <span className="data">
                  <span aria-hidden className="font-serif">{zodiacGlyph(p.sign)}</span>{' '}
                  {placementMeta(p, cusps, t)}
                </span>
              }
            >
              <div className="flex flex-col gap-2 text-[0.9rem] leading-relaxed text-haze-100">
                {placementReading(p, cusps, t).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </ListRow>
          ))}
        </div>
      )}

      {tab === 'aspects' && (
        <div className="grid grid-cols-1 items-start gap-2.5 md:grid-cols-2">
          {natalAspects.length === 0 && (
            <p className="glass-panel p-4 text-sm text-haze-400">{t('scr.natal.noAspects')}</p>
          )}
          {natalAspects.map((a, i) => {
            const key = `${a.transiting}-${a.other}-${a.def.name}`
            const color = HARMONY_COLOR[a.def.harmony]
            return (
              <ListRow
                key={key}
                delay={Math.min(i, 12) * 30}
                expanded={open === key}
                onClick={() => setOpen((o) => (o === key ? null : key))}
                leading={<GlyphBadge glyph={ASPECT_GLYPH[a.def.name] ?? '·'} color={color} />}
                title={aspectPair(a, t)}
                sub={
                  <>
                    <span style={{ color }}>{t(HARMONY_LABEL[a.def.harmony])}</span>
                    {' · '}
                    {aspectLabel(a.def.name, t)}
                    {' · '}
                    <span className="data">{a.orbDelta.toFixed(1)}°</span>
                  </>
                }
              >
                <p className="text-[0.9rem] leading-relaxed text-haze-100">{aspectReading(a, t)}</p>
              </ListRow>
            )
          })}
        </div>
      )}

      {tab === 'reading' && (
        <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {natal.map((p, i) => (
            <section
              key={p.body}
              className="glass-panel animate-rise-in p-4"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                <GlyphBadge glyph={BODY_SYMBOL[p.body]} />
                <div className="min-w-0">
                  <p className="font-serif text-[1.1rem] leading-tight text-white">
                    {planetLabel(p.body, t)}
                  </p>
                  <p className="data text-[0.75rem] text-haze-400">{placementMeta(p, cusps, t)}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2 text-[0.9rem] leading-relaxed text-haze-100">
                {placementReading(p, cusps, t).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Screen>
  )
}
