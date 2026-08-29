import { useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine } from '../audio/audioEngine'
import { BreathVisualizer } from './BreathVisualizer'
import { MoodCheckIn } from './MoodCheckIn'
import { BREATH_PATTERNS } from '../lib/breathwork'
import { buildHoroscope } from '../lib/horoscope'
import { chakraColor, chakraName } from '../lib/resonanceData'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'

interface RitualProps {
  onExit: () => void
}

const DURATIONS = [3, 6, 10]

const shell =
  'mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5'
const shellStyle = {
  paddingTop: 'max(1rem, env(safe-area-inset-top))',
  paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
}

export function Ritual({ onExit }: RitualProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const frequency = useAppStore((s) => s.frequency)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const logPractice = useAppStore((s) => s.logPractice)
  const toggleAudio = useAppStore((s) => s.toggleAudio)

  const [screen, setScreen] = useState<'intro' | 'practice' | 'done'>('intro')
  const [minutes, setMinutes] = useState(6)
  const [withTone, setWithTone] = useState(false)
  const [doneMinutes, setDoneMinutes] = useState(0)
  const startedAtRef = useRef(0)

  if (!transit || !chakra) {
    return (
      <div className={shell} style={shellStyle}>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-haze-300">Attuning to the sky…</p>
          <button
            type="button"
            onClick={onExit}
            className="text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  const patternKey = suggestedPattern
  const pattern = BREATH_PATTERNS[patternKey]
  const accent = chakraColor(chakra.key)
  const focus = chakraName(chakra.key)
  const horoscope = buildHoroscope({
    transit,
    chakra,
    crystals,
    aspects,
    sky,
    hasNatal,
    suggestedPattern,
  })
  const stones = crystals.slice(0, 2).map((c) => c.name)

  const record = (mins: number, completed: boolean) => {
    toggleAudio(false)
    logPractice({
      at: new Date().toISOString(),
      day: localDayKey(),
      chakra: chakra.key,
      frequency,
      pattern: patternKey,
      minutes: mins,
      completed,
    })
  }

  const begin = () => {
    audioEngine.unlock().catch(() => undefined)
    startedAtRef.current = Date.now()
    setScreen('practice')
  }

  const handleComplete = (mins: number) => {
    setDoneMinutes(mins)
    record(mins, true)
    setScreen('done')
  }

  const endEarly = () => {
    const mins = Math.max(
      0,
      Math.round((Date.now() - startedAtRef.current) / 60000),
    )
    record(mins, false)
    onExit()
  }

  /* ---------------------------------------------------------------- intro */
  if (screen === 'intro') {
    return (
      <div className={`${shell} justify-center`} style={shellStyle}>
        <p className="eyebrow">Today’s Practice</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-gilded">
          {focus} alignment
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">
          {horoscope.greeting}
        </p>

        <div className="mt-6 glass-panel p-5">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
            <p className="font-serif text-lg text-white">{pattern.name}</p>
            <span className="ml-auto text-xs text-haze-400">{pattern.ratio}</span>
          </div>
          <p className="mt-2 text-sm text-haze-300">{pattern.tagline}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.12em] text-haze-400">
            {frequency} Hz · {focus}
            {stones.length > 0 && ` · ${stones.join(' / ')}`}
          </p>
        </div>

        <p className="mt-6 eyebrow">Length</p>
        <div className="mt-2 flex gap-2">
          {DURATIONS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMinutes(m)}
              className={`flex-1 rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                m === minutes
                  ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                  : 'border-white/12 bg-white/5 text-haze-300'
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setWithTone((v) => !v)}
          className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-haze-200"
        >
          <span>
            Add {frequency} Hz tone under the breath
          </span>
          <span
            className={`h-5 w-9 rounded-full p-0.5 transition ${
              withTone ? 'bg-gold-500/60' : 'bg-white/15'
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                withTone ? 'translate-x-4' : ''
              }`}
            />
          </span>
        </button>

        <button
          type="button"
          onClick={begin}
          className="mt-6 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98]"
        >
          Begin practice
        </button>
        <button
          type="button"
          onClick={onExit}
          className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
        >
          Not now
        </button>
      </div>
    )
  }

  /* ------------------------------------------------------------- practice */
  if (screen === 'practice') {
    return (
      <div className={shell} style={shellStyle}>
        <button
          type="button"
          onClick={endEarly}
          className="self-start py-2 text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
        >
          ‹ End session
        </button>
        <div className="flex flex-1 items-center">
          <BreathVisualizer
            key={patternKey}
            pattern={patternKey}
            autoStart
            audioMode={withTone ? 'both' : 'breath'}
            sessionSeconds={minutes * 60}
            onComplete={handleComplete}
            className="w-full"
          />
        </div>
      </div>
    )
  }

  /* ----------------------------------------------------------------- done */
  const streak = practiceStreak(sessionLog)
  return (
    <div className={`${shell} justify-center text-center`} style={shellStyle}>
      <div
        className="mx-auto grid h-20 w-20 place-items-center rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}44, transparent 70%)`,
          boxShadow: `0 0 50px ${accent}55`,
        }}
      >
        <span className="text-3xl" style={{ color: accent }}>
          ✦
        </span>
      </div>
      <h1 className="mt-5 font-serif text-3xl text-gilded">Practice complete</h1>
      <p className="mt-2 text-sm text-haze-300">
        {doneMinutes} min · {focus} · {pattern.name}
      </p>

      {horoscope.affirmation && (
        <p className="mt-6 font-serif text-xl leading-relaxed text-white">
          “{horoscope.affirmation}”
        </p>
      )}

      <p className="mt-4 text-sm text-gold-200">
        {streak > 0 ? `${streak}-day streak` : 'First practice logged'}
      </p>

      <div className="mt-8 w-full">
        <MoodCheckIn compact title="How do you feel now?" onDone={() => undefined} />
      </div>

      <button
        type="button"
        onClick={onExit}
        className="mt-6 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-[0.98]"
      >
        Done
      </button>
    </div>
  )
}
