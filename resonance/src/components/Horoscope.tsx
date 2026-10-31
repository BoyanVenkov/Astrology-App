import { useEffect, useState, type ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { buildHoroscope } from '../lib/horoscope'
import { clockHM, geoContext } from '../lib/geo'
import {
  ordinal,
  seasonLabel,
  signLabel,
  planetLabel,
  transitTitle,
  useT,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { useEntitlements } from '../lib/premium'
import { planetSymbol } from '../data/esoteric'
import { Screen } from './Screen'
import { TodaysPractice } from './TodaysPractice'
import { Chip, GlyphBadge, ListRow } from './ui'
import type { RitualPreset } from '../types/resonance'
import artHoroscope from '../assets/art/icon-horoscope.webp'

interface HoroscopeProps {
  onBack: () => void
  onRitual: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
}

const HARMONY_COLOR = { hard: '#f29a9a', soft: '#86dcbc', neutral: '#e8c274' } as const

const SIGN_KEYS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]

/** A titled block of the reading — one anchor the chip bar can jump to. */
function Block({
  id,
  title,
  children,
  accent = false,
}: {
  id: string
  title: string
  children: ReactNode
  accent?: boolean
}) {
  return (
    <section
      id={id}
      className={`glass-panel scroll-mt-20 p-4 ${accent ? 'glass-gold' : ''}`}
    >
      <p className="eyebrow" style={accent ? { color: 'var(--rz-gold)' } : undefined}>
        {title}
      </p>
      <div className="mt-2 flex flex-col gap-2 text-[0.92rem] leading-relaxed text-haze-100">
        {children}
      </div>
    </section>
  )
}

export function Horoscope({ onBack, onRitual, onUpgrade }: HoroscopeProps) {
  const t = useT()
  const { isPro } = useEntitlements()
  const [open, setOpen] = useState(0)

  // The Sky tile is the only normal entry point and already gates this, but
  // that's UI-only — self-gate here too so this Pro screen can't be reached
  // (e.g. by driving `sub` state directly) and shown for free.
  useEffect(() => {
    if (!isPro) onUpgrade(t('sky.reasonHoroscope'))
  }, [isPro, onUpgrade, t])

  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const profile = useAppStore((s) => s.profile)
  const currentLocation = useAppStore((s) => s.currentLocation)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const natal = useAppStore((s) => s.natal)
  const nowAngles = useAppStore((s) => s.nowAngles)
  const editProfile = useAppStore((s) => s.editProfile)

  if (!isPro) return null
  if (!transit || !chakra) return null

  const geo = geoContext(profile, currentLocation)
  const dominantBody = transit.body
  const dominantHouse = transitHouses[dominantBody as keyof typeof transitHouses]
  const risingNow =
    nowAngles != null ? SIGN_KEYS[Math.floor(nowAngles.ascendant / 30)] : null

  const horoscope = buildHoroscope(
    {
      transit,
      chakra,
      crystals,
      aspects,
      sky,
      hasNatal,
      suggestedPattern,
      transitHouses,
      natal,
    },
    t,
  )

  // the chip bar — every part of the reading, one tap away
  const parts: { id: string; label: string }[] = [
    { id: 'h-overview', label: t('nav.overview') },
    ...(horoscope.sections.length ? [{ id: 'h-transits', label: t('sky.tileTransits') }] : []),
    ...(horoscope.moon ? [{ id: 'h-moon', label: t('scr.horo.moonHead') }] : []),
    ...(horoscope.threads.length ? [{ id: 'h-threads', label: t('scr.horo.threadsHead') }] : []),
    ...(horoscope.timing.length ? [{ id: 'h-timing', label: t('scr.horo.timingHead') }] : []),
    { id: 'h-week', label: t('scr.horo.weekHead') },
    { id: 'h-sky', label: t('scr.horo.skyHead') },
    { id: 'h-practice', label: t('scr.horo.practiceHead') },
  ]
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // intro[0] is the "how this is read" note — a caption, not the lead
  const [note, lead, ...rest] = horoscope.intro

  return (
    <Screen
      eyebrow={t('scr.horo.eyebrow')}
      title={transitTitle(transit, t)}
      subtitle={horoscope.greeting}
      onBack={onBack}
    >
      {/* ---- jump bar, pinned while you read ---- */}
      <nav
        aria-label={t('scr.horo.eyebrow')}
        className="no-scrollbar sticky top-0 z-20 -mx-4 -mt-2 flex gap-2 overflow-x-auto bg-[linear-gradient(180deg,rgba(5,6,15,0.92),rgba(5,6,15,0.7))] px-4 py-2.5 backdrop-blur-xl md:-mx-0 md:rounded-2xl"
        style={{ top: 'env(safe-area-inset-top)' }}
      >
        {parts.map((p) => (
          <Chip key={p.id} active={false} onClick={() => jump(p.id)}>
            {p.label}
          </Chip>
        ))}
      </nav>

      {/* ---- the lead ---- */}
      <section id="h-overview" className="glass-panel glass-gold relative scroll-mt-20 overflow-hidden p-5">
        <img
          src={artHoroscope}
          alt=""
          aria-hidden
          className="animate-card-float pointer-events-none absolute -end-4 -top-4 h-28 w-28 object-contain opacity-80"
        />
        <GlyphBadge glyph={planetSymbol(transit.body)} size={44} />
        {lead && (
          <p className="relative mt-3 pe-16 font-serif text-[1.15rem] leading-snug text-[#fbf3df]">
            {lead}
          </p>
        )}
        {rest.map((para, i) => (
          <p key={i} className="relative mt-3 text-[0.92rem] leading-relaxed text-haze-100">
            {para}
          </p>
        ))}
        {note && (
          <p className="relative mt-4 border-t border-white/[0.08] pt-3 text-[0.78rem] leading-relaxed text-haze-400">
            {note}
          </p>
        )}
        {!hasNatal && (
          <button
            type="button"
            onClick={editProfile}
            className="relative mt-3 text-xs uppercase tracking-[0.14em] text-[color:var(--rz-gold)]"
          >
            {t('scr.horo.addBirth')}
          </button>
        )}
      </section>

      {/* ---- one card per transit; the first one opens ---- */}
      {horoscope.sections.length > 0 && (
        <div id="h-transits" className="flex scroll-mt-20 flex-col gap-2.5">
          {horoscope.sections.map((section, i) => {
            const paras = section.body.split('\n\n')
            const color = section.harmony ? HARMONY_COLOR[section.harmony] : '#e8c274'
            return (
              <ListRow
                key={section.heading}
                delay={i * 50}
                active={i === 0}
                expanded={open === i}
                onClick={() => setOpen((o) => (o === i ? -1 : i))}
                leading={
                  <GlyphBadge
                    glyph={section.transiting ? planetSymbol(section.transiting) : '✦'}
                    color={color}
                  />
                }
                title={<span className="font-serif text-[1.08rem] font-medium">{section.heading}</span>}
                sub={
                  open === i ? undefined : (
                    <span className="line-clamp-2">{paras[0]}</span>
                  )
                }
              >
                <div className="flex flex-col gap-2.5 text-[0.92rem] leading-relaxed text-haze-100">
                  {paras.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </ListRow>
            )
          })}
        </div>
      )}

      {horoscope.moon && (
        <Block id="h-moon" title={t('scr.horo.moonHead')}>
          <p>{horoscope.moon}</p>
        </Block>
      )}

      {horoscope.threads.length > 0 && (
        <Block id="h-threads" title={t('scr.horo.threadsHead')}>
          {horoscope.threads.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Block>
      )}

      {horoscope.timing.length > 0 && (
        <Block id="h-timing" title={t('scr.horo.timingHead')}>
          {horoscope.timing.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Block>
      )}

      <Block id="h-week" title={t('scr.horo.weekHead')} accent>
        <p className="font-serif text-[1.02rem] leading-snug text-[#fbf3df]">{horoscope.close}</p>
      </Block>

      <Block id="h-sky" title={t('scr.horo.skyHead')}>
        {risingNow && <p>{t('scr.horo.risingNow', { sign: signLabel(risingNow, t) })}</p>}
        {dominantHouse && (
          <p>
            {t('scr.horo.transitingHouse', {
              planet: planetLabel(dominantBody, t),
              ord: ordinal(dominantHouse, t),
            })}
          </p>
        )}
        {geo.hasLocation && (
          <p className="text-haze-300">
            {t('scr.horo.geoLine', {
              season: seasonLabel(geo.season, t),
              sunrise: clockHM(geo.sunrise),
              sunset: clockHM(geo.sunset),
              light:
                geo.dayLengthHours != null
                  ? t('scr.horo.dayLight', { hours: geo.dayLengthHours.toFixed(1) })
                  : '',
              place: geo.source === 'birth' ? t('scr.horo.birthPlace') : '',
            })}
          </p>
        )}
        <p>{t(geo.groundingKey as MessageKey)}</p>
        {!geo.hasLocation && (
          <button
            type="button"
            onClick={editProfile}
            className="self-start text-xs uppercase tracking-[0.14em] text-[color:var(--rz-gold)]"
          >
            {t('scr.horo.addPlace')}
          </button>
        )}
      </Block>

      <Block id="h-practice" title={t('scr.horo.practiceHead')} accent>
        <p>{horoscope.practice}</p>
        <div className="mt-2">
          <TodaysPractice variant="inline" onLaunch={onRitual} onUpgrade={onUpgrade} />
        </div>
      </Block>
    </Screen>
  )
}
