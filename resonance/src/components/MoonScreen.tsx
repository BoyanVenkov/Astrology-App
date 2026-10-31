import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { clockHM, geoContext } from '../lib/geo'
import { moonVoidOfCourseCached, upcomingMoonPhases } from '../lib/lunar'
import { bodyPosition, moonState } from '../lib/ephemeris'
import { computeFasting, fastingSpecialLabel, lunarDay } from '../lib/fasting'
import { zodiacGlyph } from '../lib/resonanceData'
import {
  phaseLabel,
  signLabel,
  useLocaleTag,
  useT,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { FastingCard } from './FastingCard'
import { Screen } from './Screen'
import { ListRow, MoonPhaseArt } from './ui'
import artLandscape from '../assets/art/moon-landscape.webp'

interface MoonScreenProps {
  onBack: () => void
  onOpenFasting: () => void
}

const PHASE_NAME: Record<string, string> = {
  new: 'New Moon',
  'first-quarter': 'First Quarter',
  full: 'Full Moon',
  'last-quarter': 'Last Quarter',
}

const CAL_DAYS = 30

export function MoonScreen({ onBack, onOpenFasting }: MoonScreenProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const transit = useAppStore((s) => s.transit)
  const profile = useAppStore((s) => s.profile)
  const currentLocation = useAppStore((s) => s.currentLocation)

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 300_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 300_000)),
      300_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const now = useMemo(() => new Date(bucket * 300_000), [bucket])
  const voc = useMemo(() => moonVoidOfCourseCached(now), [now])
  const phases = useMemo(() => upcomingMoonPhases(now, 3), [now])
  const moonSign = useMemo(() => bodyPosition('Moon', now).sign, [now])
  const moonNow = useMemo(() => moonState(now), [now])
  const tithiNow = useMemo(() => lunarDay(now).tithi, [now])
  const geo = useMemo(
    () => geoContext(profile, currentLocation, now),
    [profile, currentLocation, now],
  )

  // the calendar — the next 30 local noons, each with its own Moon
  const calendar = useMemo(() => {
    const noon = new Date(now)
    noon.setHours(12, 0, 0, 0)
    return Array.from({ length: CAL_DAYS }, (_, i) => {
      const d = new Date(noon)
      d.setDate(d.getDate() + i)
      const m = moonState(d)
      return { date: d, moon: m, lunar: lunarDay(d) }
    })
  }, [now])
  const [pick, setPick] = useState(0)
  const picked = calendar[pick] ?? calendar[0]
  const pickedFast = useMemo(
    () => computeFasting(picked.date, t),
    [picked.date, t],
  )
  const pickedSign = useMemo(
    () => bodyPosition('Moon', picked.date).sign,
    [picked.date],
  )

  const fmtDay = (d: Date): string =>
    d.toLocaleDateString(localeTag, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

  if (!transit) return null

  const stats: { label: string; value: string; glyph?: string }[] = [
    { label: t('scr.moon.sign'), value: signLabel(moonSign, t), glyph: zodiacGlyph(moonSign) },
    { label: t('scr.moon.lit'), value: `${transit.illumination}%` },
    { label: t('scr.moon.rise'), value: geo.hasLocation ? clockHM(geo.moonrise) : '—' },
    { label: t('scr.moon.set'), value: geo.hasLocation ? clockHM(geo.moonset) : '—' },
  ]

  return (
    <Screen
      eyebrow={t('scr.moon.eyebrow')}
      title={t('scr.moon.title')}
      subtitle={`${phaseLabel(transit.moonPhase, t)} · ${t('dash.lunarDay', { n: tithiNow })}`}
      onBack={onBack}
      align="center"
    >
      {/* ---- the Moon as it is right now, over the lake ---- */}
      <section className="relative isolate -mx-2 overflow-hidden rounded-[1.75rem] border border-white/[0.09] md:mx-0">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#05060f]">
          <img
            src={artLandscape}
            alt=""
            className="animate-ken-burns absolute inset-0 h-full w-full object-cover object-[50%_60%]"
          />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#04050d]/95 via-[#04050d]/40 to-transparent" />
        </div>
        <div className="flex min-h-[25rem] flex-col items-center px-4 pb-4 pt-8 md:min-h-[28rem]">
          <span className="relative w-[58%] max-w-[15rem]">
            <span
              aria-hidden
              className="animate-moon-breathe absolute -inset-[18%] rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(255,228,180,0.32), rgba(232,194,116,0.1) 60%, transparent)',
              }}
            />
            <MoonPhaseArt
              illumination={moonNow.illumination}
              angle={moonNow.angle}
              className="animate-float-slow relative block aspect-square w-full drop-shadow-[0_0_30px_rgba(255,226,170,0.35)]"
            />
          </span>

          <dl className="glass-veil mt-auto grid w-full grid-cols-4 divide-x divide-white/10 rounded-2xl py-3 rtl:divide-x-reverse">
            {stats.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col items-center gap-1 px-1 text-center">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-haze-300">
                  {s.label}
                </dt>
                <dd className="data truncate text-[0.88rem] text-[#f6ecd2]">
                  {s.glyph && <span aria-hidden className="me-1 font-serif">{s.glyph}</span>}
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- where she is ---- */}
      <section className="glass-panel glass-gold p-4">
        <p className="eyebrow" style={{ color: 'var(--rz-gold)' }}>
          {t('scr.moon.whereShe')}
        </p>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-haze-100">
          {t('scr.moon.inSign', {
            sign: signLabel(moonSign, t),
            note: t(`horo.moonSign.${moonSign}` as MessageKey),
          })}
        </p>
        {voc.active ? (
          <p className="mt-2 text-sm text-amber-300">
            {t('scr.moon.vocUntil', {
              sign: voc.nextSign ? signLabel(voc.nextSign, t) : '',
              time: voc.until
                ? t('scr.moon.vocAt', { time: clockHM(voc.until) })
                : '',
            })}
          </p>
        ) : voc.hoursUntil != null && voc.hoursUntil < 12 ? (
          <p className="mt-2 text-sm text-amber-300/90">
            {t('scr.moon.vocSoon', { hours: voc.hoursUntil.toFixed(1) })}
          </p>
        ) : (
          <p className="mt-2 text-sm text-haze-400">{t('scr.moon.notVoc')}</p>
        )}
      </section>

      {/* ---- the lunar calendar — 30 real Moons, tap one to read it ---- */}
      <section className="glass-panel p-4">
        <p className="eyebrow">{t('scr.moon.calendar')}</p>
        <div
          role="listbox"
          aria-label={t('scr.moon.calendar')}
          className="no-scrollbar -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1"
        >
          {calendar.map((c, i) => {
            const on = i === pick
            const special = c.lunar.special === 'Ekadashi'
            return (
              <button
                key={c.date.toISOString()}
                type="button"
                role="option"
                aria-selected={on}
                aria-label={`${fmtDay(c.date)} · ${phaseLabel(c.moon.name, t)}`}
                onClick={() => setPick(i)}
                className={`relative flex w-[3.4rem] shrink-0 flex-col items-center gap-1.5 rounded-2xl py-2.5 transition ${
                  on
                    ? 'bg-[rgba(232,194,116,0.14)] shadow-[inset_0_0_0_1px_rgba(232,194,116,0.6)]'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-haze-400">
                  {c.date.toLocaleDateString(localeTag, { weekday: 'short' })}
                </span>
                <MoonPhaseArt
                  illumination={c.moon.illumination}
                  angle={c.moon.angle}
                  className="h-7 w-7"
                />
                <span className={`data text-[0.8rem] ${on ? 'text-[#fbecc4]' : 'text-haze-200'}`}>
                  {c.date.getDate()}
                </span>
                {special && (
                  <span
                    aria-hidden
                    className="absolute end-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--rz-gold)]"
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-start gap-3.5 border-t border-white/[0.07] pt-3.5">
          <MoonPhaseArt
            illumination={picked.moon.illumination}
            angle={picked.moon.angle}
            className="h-14 w-14 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[1.1rem] leading-tight text-white">
              {fmtDay(picked.date)}
            </p>
            <p className="mt-0.5 text-[0.82rem] text-haze-300">
              {phaseLabel(picked.moon.name, t)} · {picked.moon.illumination}% ·{' '}
              {t('dash.lunarDay', { n: picked.lunar.tithi })} ·{' '}
              <span aria-hidden className="font-serif">{zodiacGlyph(pickedSign)}</span>{' '}
              {signLabel(pickedSign, t)}
            </p>
            <p className="mt-1.5 text-[0.85rem] text-[#f3dca4]">
              {fastingSpecialLabel(picked.lunar.special, t)
                ? `${fastingSpecialLabel(picked.lunar.special, t)} · `
                : ''}
              {pickedFast.label}
            </p>
          </div>
        </div>
      </section>

      {/* ---- the next turning points ---- */}
      <div className="flex flex-col gap-2.5">
        <p className="eyebrow px-1">{t('scr.moon.comingUp')}</p>
        {phases.map((p, i) => {
          const m = moonState(p.at)
          return (
            <ListRow
              key={p.kind}
              delay={i * 50}
              leading={
                <MoonPhaseArt
                  illumination={m.illumination}
                  angle={m.angle}
                  className="h-10 w-10 shrink-0"
                />
              }
              title={phaseLabel(PHASE_NAME[p.kind] ?? p.kind, t)}
              sub={<span className="data">{fmtDay(p.at)}</span>}
            />
          )
        })}
      </div>

      <FastingCard onOpenGuide={onOpenFasting} />
    </Screen>
  )
}
