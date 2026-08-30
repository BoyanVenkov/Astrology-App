import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine } from '../audio/audioEngine'
import {
  BREATH_PATTERNS,
  BREATH_PATTERN_LIST,
  breathScale,
  MIN_BREATH_SCALE,
  resolveBreath,
} from '../lib/breathwork'
import type { BreathPatternKey, BreathPhaseKind } from '../types/resonance'
import { PauseIcon, PlayIcon } from './icons'

/**
 * Guided breathing ring.
 *
 * Begin / Pause drives BOTH the rAF-scaled visuals and the audio: it sets the
 * store's `audioMode` to `breath` and flips `isPlaying`, so `AudioBridge`
 * starts the pink-noise breath voice + ambient pad. Each phase boundary then
 * calls `audioEngine.breathePhase(kind, seconds)`, which shapes a real
 * inhale/exhale sound synced to that phase's length.
 */
interface BreathVisualizerProps {
  /** Force a pattern; else the store's `breathPattern`. Parent should pass a
   *  matching `key` so a pattern change remounts with a clean timeline. */
  pattern?: BreathPatternKey
  autoStart?: boolean
  /** When set, the session auto-stops after this many seconds. */
  sessionSeconds?: number
  onComplete?: (minutesPractised: number) => void
  className?: string
}

const RING_RADIUS = 46
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const PHASE_HINT: Record<BreathPhaseKind, string> = {
  inhale: 'Draw the breath in slowly',
  hold: 'Keep it soft and still',
  exhale: 'Let everything go',
  rest: 'Rest in the stillness',
  pump: 'Sharp exhales — pump from the belly',
}

const mmss = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function BreathVisualizer({
  pattern,
  autoStart = false,
  sessionSeconds,
  onComplete,
  className = '',
}: BreathVisualizerProps) {
  const storedPattern = useAppStore((s) => s.breathPattern)
  const setBreathPattern = useAppStore((s) => s.setBreathPattern)
  const setAudioPlaying = useAppStore((s) => s.toggleAudio)

  const activeKey = pattern ?? storedPattern
  const activePattern = BREATH_PATTERNS[activeKey]
  const firstStep = activePattern.steps[0]
  const accent = activePattern.accent

  const [running, setRunning] = useState(autoStart)
  const [label, setLabel] = useState(firstStep.label)
  const [kind, setKind] = useState<BreathPhaseKind>(firstStep.kind)
  const [secondsLeft, setSecondsLeft] = useState(firstStep.seconds)
  const [round, setRound] = useState(1)
  const [elapsed, setElapsed] = useState(0)

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const rafRef = useRef<number | null>(null)
  const legStartRef = useRef(0)
  const elapsedRef = useRef(0)
  const lastKindRef = useRef('')
  const lastSecondsRef = useRef(-1)
  const lastRoundRef = useRef(0)
  const lastElapsedRef = useRef(-1)
  const startedByUsRef = useRef(false)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  const auraRef = useRef<HTMLDivElement | null>(null)
  const coreRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<SVGCircleElement | null>(null)

  const restingScale = reducedMotion ? 0.86 : MIN_BREATH_SCALE

  const paint = useCallback(
    (fullness: number, phaseProgress: number) => {
      const scale = reducedMotion ? 0.86 : breathScale(fullness)
      if (auraRef.current) {
        auraRef.current.style.transform = `scale(${scale})`
        auraRef.current.style.opacity = String(0.3 + fullness * 0.55)
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `scale(${0.72 + fullness * 0.28})`
      }
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(
          RING_CIRCUMFERENCE * (1 - phaseProgress),
        )
      }
    },
    [reducedMotion],
  )

  const step = useCallback(
    (total: number) => {
      const tick = resolveBreath(activePattern, total)
      paint(tick.fullness, tick.phaseProgress)

      if (tick.step.kind !== lastKindRef.current) {
        lastKindRef.current = tick.step.kind
        setLabel(tick.step.label)
        setKind(tick.step.kind)
        // shape a real inhale / exhale sound for this phase
        audioEngine.breathePhase(tick.step.kind, tick.step.seconds)
      }
      if (tick.secondsLeft !== lastSecondsRef.current) {
        lastSecondsRef.current = tick.secondsLeft
        setSecondsLeft(tick.secondsLeft)
      }
      if (tick.round !== lastRoundRef.current) {
        lastRoundRef.current = tick.round
        setRound(tick.round)
      }
      const whole = Math.floor(total)
      if (whole !== lastElapsedRef.current) {
        lastElapsedRef.current = whole
        setElapsed(whole)
      }
    },
    [activePattern, paint],
  )

  // rAF loop — only alive while running.
  useEffect(() => {
    if (!running) return

    if (auraRef.current) auraRef.current.style.transition = 'none'
    if (coreRef.current) coreRef.current.style.transition = 'none'

    const loop = (now: number) => {
      if (!legStartRef.current) legStartRef.current = now
      const total = elapsedRef.current + (now - legStartRef.current) / 1000
      step(total)

      if (
        sessionSeconds &&
        !completedRef.current &&
        total >= sessionSeconds
      ) {
        completedRef.current = true
        setRunning(false)
        onCompleteRef.current?.(
          Math.round((sessionSeconds / 60) * 10) / 10,
        )
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      if (legStartRef.current) {
        elapsedRef.current += (performance.now() - legStartRef.current) / 1000
        legStartRef.current = 0
      }
    }
  }, [running, step, sessionSeconds])

  // Audio: breath sounds follow play / pause.
  useEffect(() => {
    const fadeMs = useAppStore.getState().audio.fadeSeconds * 1000

    if (running) {
      startedByUsRef.current = true
      useAppStore.getState().setAudioMode('breath')
      setAudioPlaying(true) // → AudioBridge → breath voice + pad, fade-in
    } else if (startedByUsRef.current) {
      startedByUsRef.current = false
      setAudioPlaying(false) // → audioEngine.stop() with fade-out
      audioEngine.silenceBreath()
      if (auraRef.current) {
        auraRef.current.style.transition = `opacity ${fadeMs}ms ease, transform ${fadeMs}ms ease`
        auraRef.current.style.opacity = '0'
        auraRef.current.style.transform = `scale(${restingScale})`
      }
      if (coreRef.current) {
        coreRef.current.style.transition = `transform ${fadeMs}ms ease`
        coreRef.current.style.transform = 'scale(0.72)'
      }
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(RING_CIRCUMFERENCE)
      }
    }
  }, [running, setAudioPlaying, restingScale])

  // Leaving the screen ends the guided session.
  useEffect(() => {
    return () => {
      if (startedByUsRef.current) useAppStore.getState().toggleAudio(false)
    }
  }, [])

  const toggle = useCallback(() => {
    audioEngine.unlock().catch(() => undefined)
    setRunning((prev) => !prev)
  }, [])

  const sessionPct = sessionSeconds
    ? Math.min(100, (elapsed / sessionSeconds) * 100)
    : 0

  return (
    <section
      className={`glass-panel flex flex-col items-center gap-6 p-6 ${className}`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="eyebrow">Breathwork</p>
          <h2 className="mt-1 font-serif text-2xl text-gilded">
            {activePattern.name}
          </h2>
        </div>
        <span className="rounded-full border border-gold-500/30 px-3 py-1 text-xs tracking-[0.12em] text-haze-200">
          {activePattern.ratio}
        </span>
      </div>

      {sessionSeconds && (
        <div className="w-full">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${sessionPct}%`, background: accent }}
            />
          </div>
          <p className="mt-1 text-center text-[11px] tabular-nums text-haze-400">
            {mmss(elapsed)} / {mmss(sessionSeconds)}
          </p>
        </div>
      )}

      <div className="relative mx-auto aspect-square w-full max-w-[280px]">
        <div
          ref={auraRef}
          className="absolute inset-[6%] rounded-full blur-2xl will-change-transform"
          style={{
            background: `radial-gradient(circle, ${accent}5c 0%, ${accent}00 70%)`,
            transform: `scale(${restingScale})`,
            opacity: 0.3,
            transition: reducedMotion ? undefined : 'opacity 500ms ease',
          }}
        />

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <circle
            ref={progressRef}
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE}
            style={{ filter: `drop-shadow(0 0 6px ${accent}aa)` }}
          />
        </svg>

        <div
          ref={coreRef}
          className="absolute inset-[15%] rounded-full border will-change-transform"
          style={{
            borderColor: `${accent}88`,
            background:
              'radial-gradient(circle at 50% 35%, rgba(26,38,87,0.72), rgba(3,4,12,0.85))',
            boxShadow: `inset 0 0 44px ${accent}33, 0 0 42px ${accent}22`,
            transform: `scale(${0.72 + (reducedMotion ? 0.14 : 0)})`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="eyebrow mb-1" style={{ color: accent }}>
            Round {round}
          </p>
          <p className="font-serif text-4xl leading-none text-white text-glow">
            {label}
          </p>
          <p className="mt-2 font-sans text-5xl font-semibold tabular-nums text-white/90">
            {secondsLeft}
          </p>
          <p className="mt-1 px-6 text-xs text-haze-300">{PHASE_HINT[kind]}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={running}
        className="flex items-center gap-3 rounded-full border border-gold-500/40 bg-gold-500/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-95"
        style={{ boxShadow: running ? `0 0 30px ${accent}55` : undefined }}
      >
        {running ? (
          <PauseIcon className="h-4 w-4" />
        ) : (
          <PlayIcon className="h-4 w-4" />
        )}
        {running ? 'Pause' : 'Begin'}
      </button>

      {!pattern && (
        <div className="flex flex-wrap justify-center gap-2">
          {BREATH_PATTERN_LIST.map((option) => {
            const selected = option.key === activeKey
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setBreathPattern(option.key)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  selected ? 'text-white' : 'text-haze-300 active:text-white'
                }`}
                style={
                  selected
                    ? { boxShadow: `inset 0 0 0 1px ${option.accent}99` }
                    : undefined
                }
              >
                {option.name}
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
