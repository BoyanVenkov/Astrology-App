import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useDayHue } from '../lib/dayhue'
import { useT } from '../lib/i18n'
import { CHAKRA_ORDER, chakraColor } from '../lib/resonanceData'
import { signInWithGoogle } from '../lib/auth'
import { PRIVACY_URL, TERMS_URL, openExternal } from '../lib/links'
import { GlobeIcon } from './icons'
import { LanguageSheet } from './LanguageSheet'
import { ResonanceMark } from './Logo'

/* ----------------------------------------------------------------- backdrop */

const STARS = (() => {
  let s = 20260901
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  return Array.from({ length: 40 }, () => ({
    x: Math.round(rnd() * 400),
    y: Math.round(rnd() * 800),
    r: Number((0.5 + rnd() * 1.4).toFixed(2)),
    o: Number((0.2 + rnd() * 0.5).toFixed(2)),
  }))
})()

const TICKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return { x1: Math.cos(a) * 140, y1: Math.sin(a) * 140, x2: Math.cos(a) * 170, y2: Math.sin(a) * 170 }
})

/** The welcome atmosphere — orbits forming a chart, in the day's hue. */
function WelcomeSky() {
  return (
    <svg
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full"
      style={{ color: 'var(--rz-hue)' }}
    >
      <defs>
        <radialGradient id="rz-welcome" cx="50%" cy="0%" r="78%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="42%" stopColor="#2b3a78" stopOpacity="0.13" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="800" fill="url(#rz-welcome)" />

      {/* rings ringing out from a point above the fold */}
      <g fill="none" stroke="currentColor" transform="translate(200 116)">
        <circle r="92" strokeOpacity="0.14" />
        <circle r="150" strokeOpacity="0.1" strokeDasharray="2 10" />
        <circle r="222" strokeOpacity="0.072" />
        <circle r="308" strokeOpacity="0.05" strokeDasharray="2 12" />
        <circle r="410" strokeOpacity="0.03" />
      </g>

      {/* bodies riding the rings */}
      <g fill="currentColor" transform="translate(200 116)">
        <circle cx="0" cy="-92" r="2.1" className="animate-twinkle" />
        <circle cx="150" cy="6" r="1.7" opacity="0.6" />
        <circle
          cx="-196"
          cy="104"
          r="1.7"
          className="animate-twinkle"
          style={{ animationDelay: '1.8s' }}
        />
        <circle cx="250" cy="180" r="1.5" opacity="0.5" />
      </g>

      {/* a faint chart wheel settling at the base */}
      <g transform="translate(200 616)" fill="none" stroke="currentColor" strokeOpacity="0.08">
        <circle r="170" />
        <circle r="140" />
        {TICKS.map((t) => (
          <line key={`${t.x1}-${t.y1}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
      </g>

      <g fill="#e6ecff">
        {STARS.map((st) => (
          <circle key={`${st.x}-${st.y}-${st.r}`} cx={st.x} cy={st.y} r={st.r} opacity={st.o} />
        ))}
      </g>
    </svg>
  )
}

const PLANETS: { g: string; x: string; y: string; s: number; o: number }[] = [
  { g: '☉︎', x: '7%', y: '13%', s: 34, o: 0.16 },
  { g: '♄︎', x: '82%', y: '9%', s: 30, o: 0.14 },
  { g: '☿︎', x: '87%', y: '40%', s: 21, o: 0.13 },
  { g: '♀︎', x: '5%', y: '45%', s: 23, o: 0.13 },
  { g: '♃︎', x: '15%', y: '80%', s: 29, o: 0.13 },
  { g: '☽︎', x: '85%', y: '84%', s: 25, o: 0.14 },
]

function PlanetField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {PLANETS.map((p) => (
        <span
          key={p.g}
          className="absolute leading-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.s,
            opacity: p.o,
            color: 'var(--rz-hue)',
            filter: 'drop-shadow(0 0 12px var(--rz-glow))',
          }}
        >
          {p.g}
        </span>
      ))}
    </div>
  )
}

/** The seven centres, as a quiet spectrum under the headline. */
function ChakraSpectrum() {
  return (
    <div className="mx-auto mt-8 flex items-center gap-3">
      {CHAKRA_ORDER.map((key, i) => {
        const c = chakraColor(key)
        return (
          <span
            key={key}
            className="h-2 w-2 rounded-full animate-pulse-glow"
            style={{
              background: c,
              boxShadow: `0 0 10px ${c}, 0 0 3px ${c}`,
              animationDelay: `${i * 0.28}s`,
            }}
          />
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------- splash */

/** Shown while the stored session is being checked — no flash of the gate. */
export function Splash() {
  useDayHue()
  return (
    <div
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-md items-center justify-center overflow-hidden px-6"
      style={{
        background:
          'radial-gradient(ellipse 90% 45% at 50% 0%, var(--rz-hue-soft), transparent 60%)',
      }}
    >
      <ResonanceMark
        className="h-12 w-12"
        style={{ color: 'var(--rz-hue)', filter: 'drop-shadow(0 0 16px var(--rz-glow))' }}
        animated
      />
    </div>
  )
}

/* ------------------------------------------------------------------ welcome */

const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
)

interface WelcomeProps {
  /** Enter the app as a guest — sign-in stays available in Settings, and is
   *  required later to buy Pro. */
  onSkip: () => void
}

/**
 * The startup sign-in screen. Signing in keeps the session on the device
 * (Supabase), so it only shows on a fresh install or after a sign-out — or
 * until the visitor taps "explore without an account".
 */
export function Welcome({ onSkip }: WelcomeProps) {
  useDayHue()
  const t = useT()
  const transit = useAppStore((s) => s.transit)

  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [langOpen, setLangOpen] = useState(false)

  const google = async () => {
    setBusy(true)
    setErr(null)
    const e = await signInWithGoogle()
    setBusy(false)
    if (e) setErr(e.message)
    // native returns via the deep link; web redirects away. On success the
    // auth listener flips App past this gate — no callback needed.
  }

  return (
    <div
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col overflow-hidden px-6"
      style={{
        paddingTop: 'max(2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom))',
      }}
    >
      <WelcomeSky />
      <PlanetField />

      <button
        type="button"
        onClick={() => setLangOpen(true)}
        aria-label={t('welcome.language')}
        className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-haze-200 active:bg-white/[0.12]"
      >
        <GlobeIcon className="h-[1.15rem] w-[1.15rem]" />
      </button>

      <div className="flex flex-1 flex-col justify-center py-8">
        <ResonanceMark
          className="mb-7 h-11 w-11 self-center"
          style={{ color: 'var(--rz-hue)', filter: 'drop-shadow(0 0 14px var(--rz-glow))' }}
          animated
        />
        <p className="eyebrow-hue text-center">{t('welcome.eyebrow')}</p>
        <h1 className="display mt-3 whitespace-pre-line text-center text-[2.35rem] leading-[1.08] text-gilded">
          {t('welcome.title')}
        </h1>
        <p className="mx-auto mt-4 max-w-[19rem] text-center text-sm leading-relaxed text-haze-300">
          {t('welcome.blurb')}
        </p>

        <ChakraSpectrum />

        {transit && (
          <p className="data mt-7 text-center text-[11px] tracking-wide text-haze-500">
            {t('welcome.tonight', { title: transit.title })}
          </p>
        )}
      </div>

      <div className="shrink-0">
        <div className="flex flex-col gap-2.5">
          <p className="mb-1 text-center text-[11px] leading-relaxed text-haze-500">
            {t('welcome.pitch')}
          </p>
          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="flex items-center justify-center gap-3 rounded-[0.95rem] bg-[#f6f4ec] px-4 py-4 text-[0.95rem] font-semibold text-[#1a1c22] shadow-[0_10px_30px_-12px_var(--rz-glow)] transition active:scale-[0.98] disabled:opacity-60"
          >
            <GoogleG />
            {busy ? t('welcome.googleOpening') : t('welcome.google')}
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="mt-1 text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
          >
            {t('welcome.explore')}
          </button>
        </div>

        {err && (
          <p className="mt-3 text-center text-xs text-red-300">{err}</p>
        )}

        <p className="mx-auto mt-5 max-w-[19rem] text-center text-[11px] leading-relaxed text-haze-500">
          {t('welcome.legalPre')}
          <button
            type="button"
            onClick={() => void openExternal(TERMS_URL)}
            className="text-haze-300 underline underline-offset-2 active:text-haze-100"
          >
            {t('welcome.terms')}
          </button>
          {t('welcome.legalMid')}
          <button
            type="button"
            onClick={() => void openExternal(PRIVACY_URL)}
            className="text-haze-300 underline underline-offset-2 active:text-haze-100"
          >
            {t('welcome.privacy')}
          </button>
          {t('welcome.legalEnd')}
        </p>
      </div>

      {langOpen && <LanguageSheet onClose={() => setLangOpen(false)} />}
    </div>
  )
}
