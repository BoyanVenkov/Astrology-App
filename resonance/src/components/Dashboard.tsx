import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Aura } from './Aura'
import { computeAura } from '../lib/aura'
import { usePrescription } from '../lib/prescription'
import { moonVoidOfCourseCached } from '../lib/lunar'
import { chakraLabel, useLocaleTag, useT } from '../lib/i18n'
import { crystalName } from '../lib/crystals'
import { chakraColor } from '../lib/resonanceData'
import type { MessageKey } from '../lib/locales/en'
import { localDayKey } from '../lib/timezone'
import { TodaysPractice } from './TodaysPractice'
import type { RitualPreset } from './Ritual'
import type { TabKey } from '../types/resonance'
import { SparkIcon } from './icons'
import artStone from '../assets/art/orb-stone.webp'
import artField from '../assets/art/orb-field.webp'
import artTarotDeck from '../assets/art/icon-tarot-deck.webp'
import artRuneStone from '../assets/art/icon-rune-stone.webp'
import artWaveMesh from '../assets/art/bg-wave-mesh.webp'
import artMandala from '../assets/art/icon-breathe.webp'
import { hexToHue } from '../lib/color'

interface DashboardProps {
  onRitual: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
  onTab: (tab: TabKey) => void
  onStones: () => void
  onChakras: () => void
  onRunes: () => void
}

const greetingKey = (h: number): MessageKey =>
  h < 5
    ? 'dash.greetingNight'
    : h < 12
      ? 'dash.greetingMorning'
      : h < 18
        ? 'dash.greetingAfternoon'
        : 'dash.greetingEvening'

export function Dashboard({
  onRitual,
  onUpgrade,
  onTab,
  onStones,
  onChakras,
  onRunes,
}: DashboardProps) {
  const t = useT()
  const localeTag = useLocaleTag()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const tarotDrawnDay = useAppStore((s) => s.tarotDrawnDay)
  const runeDrawnDay = useAppStore((s) => s.runeDrawnDay)

  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / 300_000))
  useEffect(() => {
    const id = window.setInterval(
      () => setBucket(Math.floor(Date.now() / 300_000)),
      300_000,
    )
    return () => window.clearInterval(id)
  }, [])
  const voc = useMemo(
    () => moonVoidOfCourseCached(new Date(bucket * 300_000)),
    [bucket],
  )
  const when = useMemo(() => {
    const d = new Date()
    return {
      greetingKey: greetingKey(d.getHours()),
      date: d.toLocaleDateString(localeTag, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    }
  }, [localeTag])

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const aura = computeAura(focusChakra, sessionLog, moodLog)
  const focusPlanet = sky.find((p) => p.body === transit?.body)
  const rx = usePrescription()

  const heroStone = rx.stones[0]
  const vocSoon = voc.active || (voc.hoursUntil != null && voc.hoursUntil < 4)
  const tarotDrawn = tarotDrawnDay === localDayKey()
  const runeDrawn = runeDrawnDay === localDayKey()

  return (
    <div className="flex flex-col gap-5">
      {vocSoon && (
        <button
          type="button"
          onClick={() =>
            onRitual({ mode: 'breath', minutes: 2, skipIntro: true })
          }
          className="glass-panel card-press animate-rise-in flex items-center justify-between gap-3 border-amber-400/25 p-3 text-start"
        >
          <span className="text-sm text-amber-200">
            {voc.active
              ? voc.until
                ? t('scr.voc.active', {
                    time: new Date(voc.until).toLocaleTimeString(localeTag, {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  })
                : t('scr.voc.activeSoon')
              : t('scr.voc.upcoming', {
                  hours: voc.hoursUntil?.toFixed(1) ?? '',
                })}
          </span>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-amber-300">
            {t('scr.voc.twoMin')}
          </span>
        </button>
      )}

      {/* -------- the quiet centre — full width, nebula drifting behind it -------- */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <img
            src={artWaveMesh}
            alt=""
            className="animate-drift absolute -left-[30%] -top-[6%] w-[160%] max-w-none opacity-70 mix-blend-screen"
            style={{ animationDuration: '32s' }}
          />
          <span
            className="animate-drift absolute start-[8%] top-[-10%] h-40 w-40 rounded-full opacity-40 blur-3xl"
            style={{ background: 'var(--rz-hue)', animationDuration: '18s' }}
          />
          <span
            className="animate-drift absolute end-[4%] top-[6%] h-28 w-28 rounded-full opacity-30 blur-3xl"
            style={{ background: 'var(--rz-hue)', animationDuration: '22s', animationDelay: '-6s' }}
          />
        </div>

        <header className="animate-bloom-in px-1 pt-1 md:mx-auto md:max-w-2xl md:text-center">
          <p className="eyebrow-hue">
            {t('dash.headerDate', {
              greeting: t(when.greetingKey),
              date: when.date,
            })}
          </p>
          <h1 className="mt-2.5 font-serif text-[2.1rem] leading-[1.08] text-gilded md:text-[2.5rem]">
            {transit ? rx.headline : t('dash.attuning')}
          </h1>
        </header>

        {transit && (
          <div
            className="animate-bloom-in mt-4 md:mx-auto md:max-w-2xl"
            style={{ animationDelay: '120ms' }}
          >
            {/* the celestial card — the mantra, lit from behind */}
            <div
              className="glass-panel glass-panel-active relative mt-7 overflow-visible px-6 pb-7 pt-10 text-center"
              style={{ boxShadow: '0 0 60px -20px var(--rz-glow)' }}
            >
              <span
                aria-hidden
                className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: 'var(--rz-hue)', opacity: 0.22 }}
              />

              {/* the crest — a mandala medallion straddling the card's own top edge */}
              <span className="absolute left-1/2 -top-9 h-16 w-16 -translate-x-1/2">
                <span
                  aria-hidden
                  className="animate-pulse-glow absolute inset-0 rounded-full blur-xl"
                  style={{ background: 'var(--rz-hue)', opacity: 0.6 }}
                />
                <span
                  className="absolute inset-0 rounded-full border bg-midnight-void/90"
                  style={{
                    borderColor: 'var(--rz-hue)',
                    boxShadow: '0 0 16px -2px var(--rz-glow), inset 0 0 10px -4px var(--rz-glow)',
                  }}
                />
                <img
                  src={artMandala}
                  alt=""
                  aria-hidden
                  className="animate-drift relative h-full w-full object-contain p-2"
                  style={{ animationDuration: '40s', filter: 'brightness(1.5) contrast(1.15)' }}
                />
                <SparkIcon
                  className="animate-pulse-glow absolute -top-2.5 left-1/2 h-3 w-3 -translate-x-1/2"
                  style={{ color: '#f6f1e4', filter: 'drop-shadow(0 0 4px var(--rz-glow))' }}
                />
              </span>

              <p className="display relative text-[2.05rem] leading-[1.18] text-gilded md:text-[2.35rem]">
                “{t(rx.mantra)}”
              </p>
              <p className="relative mt-3.5 eyebrow" style={{ color: 'var(--rz-hue)' }}>
                {t('dash.mantra')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* -------- the day, in two panes on a wide screen -------- */}
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:items-start md:gap-x-10">
      {/* left — the one action */}
      <div className="flex flex-col gap-5">
      <TodaysPractice variant="full" onLaunch={onRitual} onUpgrade={onUpgrade} />
      </div>

      {/* right — the day around it */}
      <div className="flex flex-col gap-5">
      {/* the day at a glance — a unified glowing-sphere widget */}
      <section className="glass-panel glass-panel-active animate-rise-in relative grid grid-cols-3 divide-x divide-white/10 overflow-visible px-2 pb-3.5 pt-5">
        <button
          type="button"
          onClick={() => onTab('you')}
          className="card-press relative flex flex-col items-center gap-2 px-1 pt-1"
        >
          <span className="mb-0.5 grid place-items-center">
            <Aura
              state={aura}
              size={96}
              className="h-24 w-24 drop-shadow-[0_16px_18px_rgba(0,0,0,0.55)]"
            />
          </span>
          <span className="eyebrow">{t('dash.slotAura')}</span>
          <span className="data text-sm text-haze-200">
            {Math.round(aura.score * 100)}%
          </span>
        </button>
        <button
          type="button"
          onClick={onChakras}
          className="card-press relative flex flex-col items-center gap-2 px-1 pt-1"
        >
          <span className="mb-0.5 relative grid h-24 w-24 place-items-center">
            <svg viewBox="0 0 96 96" className="pointer-events-none absolute inset-0 h-24 w-24 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="43"
                fill="none"
                stroke={chakraColor(focusChakra)}
                strokeOpacity="0.9"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray={`${Math.max(aura.score, 0.12) * 270} 270`}
                style={{ filter: `drop-shadow(0 0 10px ${chakraColor(focusChakra)})` }}
              />
            </svg>
            <img
              src={artField}
              alt=""
              aria-hidden
              className="animate-aura-breathe h-16 w-16 object-contain"
              style={{
                filter: `hue-rotate(${hexToHue(chakraColor(focusChakra)) - 25}deg) saturate(1.4) drop-shadow(0 14px 16px rgba(0,0,0,0.55)) drop-shadow(0 0 14px ${chakraColor(focusChakra)})`,
              }}
            />
          </span>
          <span className="eyebrow">{t('dash.slotField')}</span>
          <span className="truncate text-sm text-haze-200">
            {chakraLabel(focusChakra, t)}
            {focusPlanet?.retrograde ? ' ℞' : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={onStones}
          className="card-press relative flex flex-col items-center gap-2 px-1 pt-1"
        >
          <span className="mb-0.5 grid h-24 w-24 place-items-center">
            <img
              src={artStone}
              alt=""
              aria-hidden
              className="h-[5.5rem] w-[5.5rem] object-contain"
              style={{
                filter: `hue-rotate(${
                  heroStone ? hexToHue(heroStone.color) - 25 : 0
                }deg) drop-shadow(0 14px 16px rgba(0,0,0,0.55)) drop-shadow(0 0 14px ${heroStone?.color ?? 'var(--rz-glow)'})`,
              }}
            />
          </span>
          <span className="eyebrow">{t('dash.slotStone')}</span>
          <span className="w-full truncate px-1 text-center text-sm text-haze-200">
            {heroStone ? crystalName(heroStone.name, t) : '—'}
          </span>
        </button>
      </section>

      {/* tarot + rune — big hero art, popping past the card's own edge */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <button
          type="button"
          onClick={() => onTab('tarot')}
          className="bento-tile glass-panel relative flex min-h-[9.5rem] flex-col justify-end overflow-visible p-4 pt-2 text-start"
          style={{ animationDelay: '60ms' }}
        >
          <img
            src={artTarotDeck}
            alt=""
            aria-hidden
            className="animate-card-float pointer-events-none absolute -top-5 end-1 h-28 w-28 rotate-[9deg] object-contain"
            style={{
              filter: 'drop-shadow(0 16px 26px rgba(0,0,0,0.6)) drop-shadow(0 0 18px var(--rz-glow))',
              animationDelay: '0.3s',
            }}
          />
          <p className="relative font-serif text-lg leading-tight text-white">
            {t('dash.dailyTarot')}
          </p>
          <p className="relative text-sm text-haze-300">
            {tarotDrawn ? t('dash.tarotSeen') : t('dash.tarotNew')}
          </p>
        </button>

        <button
          type="button"
          onClick={onRunes}
          className="bento-tile glass-panel relative flex min-h-[9.5rem] flex-col justify-end overflow-visible p-4 pt-2 text-start"
          style={{ animationDelay: '110ms' }}
        >
          <img
            src={artRuneStone}
            alt=""
            aria-hidden
            className="animate-card-float pointer-events-none absolute -top-5 end-2 h-24 w-24 -rotate-6 object-contain"
            style={{ filter: 'drop-shadow(0 16px 26px rgba(0,0,0,0.6)) drop-shadow(0 0 18px var(--rz-glow))' }}
          />
          <p className="relative font-serif text-lg leading-tight text-white">
            {t('dash.dailyRune')}
          </p>
          <p className="relative text-sm text-haze-300">
            {runeDrawn ? t('dash.runeSeen') : t('dash.runeNew')}
          </p>
        </button>
      </div>

      {!hasNatal && (
        <button
          type="button"
          onClick={() => onTab('sky')}
          className="text-center text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          {t('dash.addBirth')}
        </button>
      )}
      </div>
      </div>
    </div>
  )
}
