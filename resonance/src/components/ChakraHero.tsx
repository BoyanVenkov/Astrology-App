import { useMemo } from 'react'
import type { ChakraReading } from '../lib/chakraField'
import { BREATH_PATTERNS, CHAKRA_BREATH } from '../lib/breathwork'
import { usePrescription } from '../lib/prescription'
import { crystalName } from '../lib/crystals'
import { ALL_CRYSTALS } from '../data/esoteric'
import { useAppStore } from '../store/useAppStore'
import { useT } from '../lib/i18n'
import type { ChakraKey, RitualPreset } from '../types/resonance'
import { ChevronIcon, LockIcon, PlayIcon } from './icons'
import { GemArt } from './ui'
import artMeditator from '../assets/art/chakra-meditator.webp'
import artMeditate from '../assets/art/icon-meditate.webp'
import artBreathe from '../assets/art/icon-breathe.webp'
import artFrequency from '../assets/art/icon-frequency.webp'

/** Where each centre sits on the seated figure (fraction of the image height). */
const NODE_Y: Record<ChakraKey, number> = {
  crown: 0.035,
  'third-eye': 0.105,
  throat: 0.19,
  heart: 0.3,
  'solar-plexus': 0.4,
  sacral: 0.49,
  root: 0.57,
}

const midOf = (arr: number[], fallback: number): number =>
  arr.length ? (arr[Math.floor(arr.length / 2)] ?? arr[0]) : fallback

interface ChakraHeroProps {
  field: ChakraReading[]
  selected: ChakraKey
  /** False for a centre the free tier can't open — selecting it opens the paywall. */
  isUnlocked: (key: ChakraKey) => boolean
  onSelect: (key: ChakraKey) => void
  onRitual: (preset: RitualPreset) => void
  isPro: boolean
}

/**
 * The concept's chakra plate — a luminous seated figure with the seven live
 * centres on its spine, one centre in focus at a time (arrows or a tap on
 * the body), and that centre's own practices: a chakra meditation, its
 * traditional breath, its tone, and its stone.
 */
export function ChakraHero({
  field,
  selected,
  isUnlocked,
  onSelect,
  onRitual,
  isPro,
}: ChakraHeroProps) {
  const t = useT()
  const rx = usePrescription()
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const idx = Math.max(0, field.findIndex((c) => c.key === selected))
  const c = field[idx]

  const stone = useMemo(() => {
    if (!c) return null
    return (
      dailyCrystals.find((s) => s.chakra === c.key) ??
      ALL_CRYSTALS.find((s) => s.chakra === c.key) ??
      null
    )
  }, [c, dailyCrystals])

  if (!c) return null

  // free tier: today's prescribed breath (always free); Pro: the centre's own
  const breathKey = isPro ? CHAKRA_BREATH[c.key] : rx.breathPattern
  const breath = BREATH_PATTERNS[breathKey]
  const practices: { key: string; art: string; label: string; value: string; preset: RitualPreset }[] = [
    {
      key: 'med',
      art: artMeditate,
      label: t('tp.meditate'),
      value: t('tp.min', { n: rx.minutes }),
      preset: { mode: 'meditation', minutes: rx.minutes, meditationStyle: 'chakra', personalised: c.focus },
    },
    {
      key: 'breath',
      art: artBreathe,
      label: t('tp.breathe'),
      value: breath.ratio,
      preset: {
        mode: 'breath',
        minutes: midOf(breath.durations, 6),
        breathPattern: breathKey,
        personalised: !isPro || c.focus,
      },
    },
    {
      key: 'freq',
      art: artFrequency,
      label: t('tp.frequency'),
      value: `${c.frequency} Hz`,
      preset: { mode: 'frequency', frequency: c.frequency, minutes: 10 },
    },
  ]

  const step = (dir: 1 | -1) => {
    const next = field[(idx + dir + field.length) % field.length]
    onSelect(next.key)
  }

  return (
    <section className="glass-panel glass-gold relative overflow-hidden px-4 pb-5 pt-5 text-center">
      {/* the centre's own colour, rising behind the figure */}
      <span
        aria-hidden
        className="animate-moon-breathe pointer-events-none absolute left-1/2 top-[34%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: c.color, opacity: 0.28 }}
      />

      <p className="eyebrow-hue relative">{t('field.eyebrow')}</p>
      <h2 className="relative mt-1.5 font-serif text-[1.8rem] leading-tight text-gilded">{c.name}</h2>
      <p className="relative mx-auto mt-1 max-w-xs text-[0.85rem] leading-snug text-haze-200">
        {c.theme}
      </p>

      {/* ---- the figure ---- */}
      <div className="relative mx-auto mt-3 w-full max-w-[17rem]">
        <img src={artMeditator} alt="" aria-hidden className="relative w-full" style={{ filter: 'drop-shadow(0 0 24px rgba(232,194,116,0.35))' }} />
        {field.map((n) => {
          const on = n.key === c.key
          const locked = !isUnlocked(n.key)
          const size = 12 + n.charge * 0.1 + (on ? 8 : 0)
          return (
            <button
              key={n.key}
              type="button"
              onClick={() => onSelect(n.key)}
              aria-label={`${n.name} · ${n.state}`}
              aria-pressed={on}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
              style={{
                left: '50%',
                top: `${NODE_Y[n.key] * 100}%`,
                width: size,
                height: size,
                background: `radial-gradient(circle at 40% 35%, #fff, ${n.color} 55%)`,
                boxShadow: `0 0 ${on ? 26 : 14}px ${on ? 6 : 2}px ${n.color}`,
                opacity: locked ? 0.55 : 1,
              }}
            >
              {on && (
                <span
                  aria-hidden
                  className="animate-freq-ring absolute -inset-2 rounded-full"
                  style={{ boxShadow: `0 0 0 1.5px ${n.color}` }}
                />
              )}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={t('field.prev')}
          className="glass-veil absolute start-[-0.5rem] top-[30%] grid h-10 w-10 place-items-center rounded-full text-[#f6ecd2] transition hover:text-white active:scale-90"
        >
          <ChevronIcon className="h-4 w-4 rtl:-scale-x-100" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={t('field.next')}
          className="glass-veil absolute end-[-0.5rem] top-[30%] grid h-10 w-10 place-items-center rounded-full text-[#f6ecd2] transition hover:text-white active:scale-90"
        >
          <ChevronIcon className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
        </button>
      </div>

      {/* ---- state + symbolic charge ---- */}
      <div className="relative mx-auto mt-2 max-w-xs">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]" style={{ color: c.color }}>
          {c.state}
        </p>
        <div className="mt-1.5 h-[3px] rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full"
            style={{ width: `${c.charge}%`, background: c.color, boxShadow: `0 0 8px ${c.color}` }}
          />
        </div>
      </div>

      {/* ---- the centre's practices ---- */}
      <p className="eyebrow relative mt-5 text-start">{t('field.keyPractices')}</p>
      <div className="relative mt-2 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.08] bg-[rgba(6,8,22,0.45)] py-3 rtl:divide-x-reverse">
        {practices.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => onRitual(p.preset)}
            className="card-press flex flex-col items-center gap-1 px-1"
          >
            <img src={p.art} alt="" aria-hidden className="h-11 w-11 object-contain" />
            <span className="text-[0.72rem] text-haze-200">{p.label}</span>
            <span className="data text-[0.85rem] text-[#f3dca4]">{p.value}</span>
          </button>
        ))}
      </div>

      {stone && (
        <p className="relative mt-3 flex items-center justify-center gap-2 text-[0.82rem] text-haze-200">
          <GemArt name={stone.name} color={stone.color} className="h-7 w-7" />
          <span className="text-haze-400">{t('dash.slotStone')}:</span>
          <span className="font-serif text-[0.95rem] text-white">{crystalName(stone.name, t)}</span>
        </p>
      )}

      <button
        type="button"
        onClick={() => onRitual(practices[0].preset)}
        className="btn-gold relative mt-4 inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2.5 text-[0.95rem]"
      >
        {isUnlocked(c.key) ? (
          <PlayIcon className="h-4 w-4 rtl:-scale-x-100" />
        ) : (
          <LockIcon className="h-4 w-4" />
        )}
        {t('field.startNow')}
      </button>
    </section>
  )
}
