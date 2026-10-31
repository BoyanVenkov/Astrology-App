import { useEffect, useMemo, useState } from 'react'
import { ASPECT_GLYPH, type Aspect, type AspectHarmony } from '../lib/astrology'
import { useAppStore } from '../store/useAppStore'
import { clockHM, geoContext } from '../lib/geo'
import { SIGNS } from '../lib/ephemeris'
import { aspectReading } from '../lib/horoscope'
import { transitWindow, type TransitSpan } from '../lib/transitTimeline'
import { localDayKey } from '../lib/timezone'
import { planetSymbol } from '../data/esoteric'
import {
  houseArena,
  ordinal,
  planetLabel,
  signLabel,
  transitTitle,
  useLocaleTag,
  useT,
  type TFn,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { Screen } from './Screen'
import { Chip, GlyphBadge, ListRow, SegmentedTabs } from './ui'

interface TransitsProps {
  onBack: () => void
}

type Range = 'today' | 'week' | 'month'
type Filter = 'all' | AspectHarmony

/** Each aspect character has one colour, used on its badge, dot and span bar. */
const HARMONY_COLOR: Record<AspectHarmony, string> = {
  hard: '#f29a9a',
  soft: '#86dcbc',
  neutral: '#e8c274',
}
/** Reuses the compatibility screen's words: Flows · Fuses · Effort. */
const HARMONY_LABEL: Record<AspectHarmony, MessageKey> = {
  soft: 'scr.compat.tone.gift',
  neutral: 'scr.compat.tone.intense',
  hard: 'scr.compat.tone.friction',
}

function intensityKey(a: Aspect): MessageKey {
  if (a.exactness > 0.85) return 'scr.transits.int.exact'
  if (a.exactness > 0.55) return 'scr.transits.int.strong'
  return a.applying ? 'scr.transits.int.building' : 'scr.transits.int.fading'
}

function pairLabel(a: { transiting: string; other: string; def: { name: string } }, hasNatal: boolean, t: TFn) {
  return (
    <>
      {planetLabel(a.transiting, t)}{' '}
      <span aria-hidden className="text-[color:var(--rz-gold)]">
        {ASPECT_GLYPH[a.def.name] ?? '·'}
      </span>{' '}
      {hasNatal ? t('scr.transits.natalPrefix') : ''}
      {planetLabel(a.other, t)}
    </>
  )
}

/** A thin track across the window — the span in orb, a bright dot where it peaks. */
function SpanBar({
  span,
  from,
  days,
}: {
  span: TransitSpan
  from: Date
  days: number
}) {
  const total = days * 86_400_000
  const pct = (d: Date) =>
    Math.min(100, Math.max(0, ((d.getTime() - from.getTime()) / total) * 100))
  const s = pct(span.start)
  const e = Math.max(pct(span.end), s + 1.5)
  const p = pct(span.peak)
  const color = HARMONY_COLOR[span.def.harmony]
  return (
    <span aria-hidden className="relative mt-2 block h-1.5 rounded-full bg-white/[0.07]">
      <span
        className="absolute inset-y-0 rounded-full"
        style={{
          insetInlineStart: `${s}%`,
          width: `${e - s}%`,
          background: `linear-gradient(90deg, transparent, ${color} 30%, ${color} 70%, transparent)`,
          opacity: 0.75,
        }}
      />
      <span
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full rtl:translate-x-1/2"
        style={{
          insetInlineStart: `${p}%`,
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </span>
  )
}

export function Transits({ onBack }: TransitsProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const transit = useAppStore((s) => s.transit)
  const aspects = useAppStore((s) => s.aspects)
  const nowAngles = useAppStore((s) => s.nowAngles)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const profile = useAppStore((s) => s.profile)
  const currentLocation = useAppStore((s) => s.currentLocation)
  const editProfile = useAppStore((s) => s.editProfile)

  const [range, setRange] = useState<Range>('today')
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<string | null>(null)

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 120_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 120_000)),
      120_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const now = useMemo(() => new Date(bucket * 120_000), [bucket])
  const geo = useMemo(
    () => geoContext(profile, currentLocation, now),
    [profile, currentLocation, now],
  )

  // the forward sweep — from local midnight today, recomputed once a day
  const dayKey = localDayKey(now)
  const days = range === 'week' ? 7 : 30
  const from = useMemo(() => {
    const d = new Date(`${dayKey}T00:00:00`)
    return Number.isNaN(d.getTime()) ? new Date() : d
  }, [dayKey])
  const birthUtc = hasNatal && profile ? profile.utc : null
  const spans = useMemo(
    () =>
      range === 'today'
        ? []
        : transitWindow(birthUtc ? new Date(birthUtc) : null, from, days),
    [range, birthUtc, from, days],
  )

  if (!transit) return null

  const risingNow =
    nowAngles != null ? SIGNS[Math.floor(nowAngles.ascendant / 30) % 12] : null
  const dominantHouse = (transitHouses as Record<string, number>)[transit.body]
  const fmtDay = (d: Date) =>
    d.toLocaleDateString(localeTag, { weekday: 'short', month: 'short', day: 'numeric' })

  const todayRows = aspects.filter((a) => filter === 'all' || a.def.harmony === filter)
  const windowRows = spans.filter((s) => filter === 'all' || s.def.harmony === filter)
  const toggle = (key: string) => setOpen((k) => (k === key ? null : key))

  return (
    <Screen
      eyebrow={t('scr.transits.eyebrow')}
      title={
        hasNatal ? t('scr.transits.titleNatal') : t('scr.transits.titleSky')
      }
      subtitle={transitTitle(transit, t)}
      onBack={onBack}
      action={
        hasNatal ? undefined : (
          <button
            type="button"
            onClick={editProfile}
            className="text-[10px] uppercase tracking-[0.14em] text-gold-300"
          >
            {t('scr.transits.addChart')}
          </button>
        )
      }
    >
      <SegmentedTabs
        label={t('scr.transits.tabsLabel')}
        value={range}
        onChange={(r) => {
          setRange(r)
          setOpen(null)
        }}
        options={[
          { key: 'today', label: t('common.today') },
          { key: 'week', label: t('scr.transits.tabWeek') },
          { key: 'month', label: t('scr.transits.tabMonth') },
        ]}
      />

      <div className="no-scrollbar -mx-1 -mt-1 flex gap-2 overflow-x-auto px-1">
        {(['all', 'soft', 'neutral', 'hard'] as const).map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f !== 'all' && (
              <span
                aria-hidden
                className="me-1.5 inline-block h-2 w-2 rounded-full align-middle"
                style={{ background: HARMONY_COLOR[f] }}
              />
            )}
            {f === 'all' ? t('scr.transits.filterAll') : t(HARMONY_LABEL[f])}
          </Chip>
        ))}
      </div>

      {range === 'today' ? (
        <>
          <section className="glass-panel glass-gold p-4">
            <p className="eyebrow" style={{ color: 'var(--rz-gold)' }}>
              {t('scr.transits.nowHead')}
            </p>
            {risingNow && (
              <p className="mt-2 text-sm text-haze-100">
                {t('scr.transits.rising', { sign: signLabel(risingNow, t) })}
              </p>
            )}
            {hasNatal && dominantHouse && (
              <p className="mt-1 text-sm text-haze-100">
                {t('scr.transits.movingHouse', {
                  planet: planetLabel(transit.body, t),
                  ord: ordinal(dominantHouse, t),
                  arena: houseArena(dominantHouse, t),
                })}
              </p>
            )}
            {geo.hasLocation && (
              <p className="data mt-2 text-xs text-haze-400">
                {t('scr.transits.sunMoon', {
                  sunrise: clockHM(geo.sunrise),
                  sunset: clockHM(geo.sunset),
                  moonrise: clockHM(geo.moonrise),
                  moonset: clockHM(geo.moonset),
                })}
                {geo.source === 'birth' ? ` · ${t('scr.transits.birthPlace')}` : ''}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-haze-200">
              {t(geo.groundingKey)}
            </p>
          </section>

          <p className="eyebrow -mb-2 px-1">
            {hasNatal ? t('scr.transits.allInOrb') : t('scr.transits.moonAspects')}
          </p>
          {todayRows.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {todayRows.map((a, i) => {
                const key = `${a.transiting}-${a.other}-${a.def.name}`
                const color = HARMONY_COLOR[a.def.harmony]
                return (
                  <ListRow
                    key={key}
                    delay={i * 40}
                    expanded={open === key}
                    onClick={() => toggle(key)}
                    active={i === 0 && filter === 'all'}
                    leading={<GlyphBadge glyph={planetSymbol(a.transiting)} color={color} />}
                    title={pairLabel(a, hasNatal, t)}
                    sub={
                      <>
                        <span style={{ color }}>{t(HARMONY_LABEL[a.def.harmony])}</span>
                        {' · '}
                        <span className="data">{a.orbDelta.toFixed(1)}°</span>
                        {' · '}
                        {t(intensityKey(a))}
                      </>
                    }
                  >
                    <p className="text-[0.9rem] leading-relaxed text-haze-100">
                      {aspectReading(a, t)}
                    </p>
                    <p className="mt-2 text-[0.75rem] text-haze-400">
                      {a.applying ? t('scr.transits.applying') : t('scr.transits.separating')}
                    </p>
                  </ListRow>
                )
              })}
            </div>
          ) : (
            <p className="glass-panel p-4 text-sm text-haze-400">
              {t('scr.transits.nothingOrb')}
            </p>
          )}
          <p className="px-1 text-[11px] leading-relaxed text-haze-500">
            {t('scr.transits.orbNote')}
          </p>
        </>
      ) : (
        <>
          {/* the window's own axis — first day, middle, last day */}
          <div className="data -mb-2 flex justify-between px-1 text-[0.7rem] text-haze-400">
            <span>{fmtDay(from)}</span>
            <span>{fmtDay(new Date(from.getTime() + (days / 2) * 86_400_000))}</span>
            <span>{fmtDay(new Date(from.getTime() + (days - 1) * 86_400_000))}</span>
          </div>
          {windowRows.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {windowRows.map((s, i) => {
                const color = HARMONY_COLOR[s.def.harmony]
                return (
                  <ListRow
                    key={s.key}
                    delay={i * 40}
                    expanded={open === s.key}
                    onClick={() => toggle(s.key)}
                    leading={<GlyphBadge glyph={planetSymbol(s.transiting)} color={color} />}
                    title={pairLabel(s, hasNatal, t)}
                    sub={
                      <>
                        <span style={{ color }}>{t(HARMONY_LABEL[s.def.harmony])}</span>
                        {' · '}
                        {s.peakInside
                          ? t('scr.transits.exactOn', { date: fmtDay(s.peak) })
                          : t(
                              s.atPeak.applying
                                ? 'scr.transits.int.building'
                                : 'scr.transits.int.fading',
                            )}
                        <SpanBar span={s} from={from} days={days} />
                      </>
                    }
                  >
                    <p className="text-[0.9rem] leading-relaxed text-haze-100">
                      {aspectReading(s.atPeak, t)}
                    </p>
                    <p className="data mt-2 text-[0.72rem] text-haze-400">
                      {fmtDay(s.start)} – {fmtDay(s.end)} · {s.peakOrb.toFixed(1)}°
                    </p>
                  </ListRow>
                )
              })}
            </div>
          ) : (
            <p className="glass-panel p-4 text-sm text-haze-400">
              {t('scr.transits.windowEmpty')}
            </p>
          )}
          <p className="px-1 text-[11px] leading-relaxed text-haze-500">
            {t('scr.transits.windowNote')}
          </p>
        </>
      )}
    </Screen>
  )
}
