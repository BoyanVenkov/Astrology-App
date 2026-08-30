import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine } from '../audio/audioEngine'
import { BREATH_PATTERNS, breathScale, MIN_BREATH_SCALE } from '../lib/breathwork'
import type { BreathRoundSpec } from '../types/resonance'
import { PlayIcon } from './icons'

/**
 * Wim Hof-style breath journey — a round-based practice the time-driven
 * BreathVisualizer can't model: ~30 power breaths, an open-ended exhale
 * retention (the user taps when they need to breathe), then a ~15-second
 * recovery hold, repeated for three rounds.
 */
interface BreathJourneyProps {
  onComplete: (minutesPractised: number) => void
  className?: string
}

type Phase = 'ready' | 'breaths' | 'retention' | 'recovery' | 'done'

const RING_R = 46
const RING_C = 2 * Math.PI * RING_R
const ACCENT = BREATH_PATTERNS.wimhof.accent
const SPEC: BreathRoundSpec = BREATH_PATTERNS.wimhof.rounds ?? {
  rounds: 3,
  breaths: 30,
  breathSeconds: 3.4,
  retentionTargets: [75, 90, 105],
  recoverySeconds: 15,
}

const mmss = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function BreathJourney({ onComplete, className = '' }: BreathJourneyProps) {
  const setAudioPlaying = useAppStore((s) => s.toggleAudio)

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const [phase, setPhase] = useState<Phase>('ready')
  const [round, setRound] = useState(1)
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [breathHalf, setBreathHalf] = useState<'in' | 'out'>('in')

  const phaseRef = useRef<Phase>('ready')
  const roundRef = useRef(1)
  const phaseStartRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastSecRef = useRef(-1)
  const lastCountRef = useRef(-1)
  const lastHalfRef = useRef('')
  const sessionStartRef = useRef(0)
  const startedAudioRef = useRef(false)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  const auraRef = useRef<HTMLDivElement | null>(null)
  const coreRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<SVGCircleElement | null>(null)

  const stopRaf = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const paint = useCallback(
    (fullness: number, progress: number, smooth = false) => {
      const scale = reducedMotion ? 0.86 : breathScale(fullness)
      const ms = smooth ? 900 : 0
      if (auraRef.current) {
        auraRef.current.style.transition = smooth
          ? `transform ${ms}ms ease, opacity ${ms}ms ease`
          : 'none'
        auraRef.current.style.transform = `scale(${scale})`
        auraRef.current.style.opacity = String(0.28 + fullness * 0.55)
      }
      if (coreRef.current) {
        coreRef.current.style.transition = smooth ? `transform ${ms}ms ease` : 'none'
        coreRef.current.style.transform = `scale(${0.72 + fullness * 0.28})`
      }
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(RING_C * (1 - progress))
      }
    },
    [reducedMotion],
  )

  // A pure state/ref transition — never touches the rAF chain itself.
  const enterPhase = useCallback(
    (p: Phase) => {
      phaseRef.current = p
      phaseStartRef.current = performance.now()
      lastSecRef.current = -1
      lastCountRef.current = -1
      lastHalfRef.current = ''
      setPhase(p)

      if (p === 'breaths') {
        setCount(0)
        setBreathHalf('in')
        paint(0, 0)
      } else if (p === 'retention') {
        setTimer(0)
        paint(0.12, 0, true)
        audioEngine.breathePhase('exhale', 2)
      } else if (p === 'recovery') {
        setTimer(SPEC.recoverySeconds)
        paint(0.95, 1, true)
        audioEngine.breathePhase('inhale', 2)
      } else if (p === 'ready') {
        paint(0.4, 0, true)
        audioEngine.silenceBreath()
      }
    },
    [paint],
  )

  const finish = useCallback(() => {
    enterPhase('done')
    stopRaf()
    setAudioPlaying(false)
    audioEngine.silenceBreath()
    const mins = Math.max(
      1,
      Math.round((performance.now() - sessionStartRef.current) / 60000),
    )
    onCompleteRef.current?.(mins)
  }, [enterPhase, stopRaf, setAudioPlaying])

  const tick = useCallback(
    function tick(now: number) {
      const t = (now - phaseStartRef.current) / 1000
      const ph = phaseRef.current

      if (ph === 'breaths') {
        const inCycle = (t % SPEC.breathSeconds) / SPEC.breathSeconds
        paint(0.5 - 0.5 * Math.cos(inCycle * 2 * Math.PI), inCycle)

        const half = inCycle < 0.5 ? 'in' : 'out'
        if (half !== lastHalfRef.current) {
          lastHalfRef.current = half
          setBreathHalf(half)
          audioEngine.breathePhase(
            half === 'in' ? 'inhale' : 'exhale',
            SPEC.breathSeconds * 0.5,
          )
        }
        const c = Math.min(SPEC.breaths, Math.floor(t / SPEC.breathSeconds) + 1)
        if (c !== lastCountRef.current) {
          lastCountRef.current = c
          setCount(c)
        }
        if (t >= SPEC.breaths * SPEC.breathSeconds) enterPhase('retention')
      } else if (ph === 'retention') {
        const target = SPEC.retentionTargets[roundRef.current - 1] ?? 90
        paint(0.12, Math.min(1, t / target))
        const secs = Math.floor(t)
        if (secs !== lastSecRef.current) {
          lastSecRef.current = secs
          setTimer(secs)
        }
      } else if (ph === 'recovery') {
        const left = Math.max(0, Math.ceil(SPEC.recoverySeconds - t))
        paint(0.95, Math.max(0, 1 - t / SPEC.recoverySeconds))
        if (left !== lastSecRef.current) {
          lastSecRef.current = left
          setTimer(left)
        }
        if (t >= SPEC.recoverySeconds) {
          if (roundRef.current >= SPEC.rounds) {
            finish()
          } else {
            roundRef.current += 1
            setRound(roundRef.current)
            enterPhase('ready')
          }
        }
      }

      const next = phaseRef.current
      if (next === 'breaths' || next === 'retention' || next === 'recovery') {
        rafRef.current = requestAnimationFrame(tick)
      }
    },
    [paint, enterPhase, finish],
  )

  const kick = useCallback(() => {
    stopRaf()
    rafRef.current = requestAnimationFrame(tick)
  }, [stopRaf, tick])

  // audio bed + teardown
  useEffect(() => {
    sessionStartRef.current = performance.now()
    audioEngine.unlock().catch(() => undefined)
    useAppStore.getState().setAudioMode('breath')
    setAudioPlaying(true)
    startedAudioRef.current = true
    paint(0.4, 0, true)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      if (startedAudioRef.current) {
        useAppStore.getState().toggleAudio(false)
        audioEngine.silenceBreath()
      }
    }
  }, [setAudioPlaying, paint])

  const beginRound = () => {
    audioEngine.unlock().catch(() => undefined)
    enterPhase('breaths')
    kick()
  }

  const retentionTarget = SPEC.retentionTargets[round - 1] ?? 90

  return (
    <section
      className={`glass-panel flex flex-col items-center gap-6 p-6 ${className}`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="eyebrow">Wim Hof Method</p>
          <h2 className="mt-1 font-serif text-2xl text-gilded">
            Round {round} of {SPEC.rounds}
          </h2>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.12em] text-haze-200">
          {phase === 'breaths'
            ? `${count} / ${SPEC.breaths}`
            : phase === 'retention'
              ? 'Hold'
              : phase === 'recovery'
                ? 'Recover'
                : phase === 'done'
                  ? 'Complete'
                  : 'Ready'}
        </span>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[280px]">
        <div
          ref={auraRef}
          className="absolute inset-[6%] rounded-full blur-2xl will-change-transform"
          style={{
            background: `radial-gradient(circle, ${ACCENT}5c 0%, ${ACCENT}00 70%)`,
            transform: `scale(${reducedMotion ? 0.86 : MIN_BREATH_SCALE})`,
            opacity: 0.3,
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
            r={RING_R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <circle
            ref={progressRef}
            cx="50"
            cy="50"
            r={RING_R}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C}
            style={{ filter: `drop-shadow(0 0 6px ${ACCENT}aa)` }}
          />
        </svg>
        <div
          ref={coreRef}
          className="absolute inset-[15%] rounded-full border will-change-transform"
          style={{
            borderColor: `${ACCENT}88`,
            background:
              'radial-gradient(circle at 50% 35%, rgba(26,38,87,0.72), rgba(3,4,12,0.85))',
            boxShadow: `inset 0 0 44px ${ACCENT}33, 0 0 42px ${ACCENT}22`,
            transform: 'scale(0.8)',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {phase === 'ready' && (
            <>
              <p className="font-serif text-3xl leading-tight text-white text-glow">
                Round {round}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-haze-300">
                {SPEC.breaths} full breaths, then exhale and hold. Sit or lie
                down — never in water.
              </p>
            </>
          )}
          {phase === 'breaths' && (
            <>
              <p className="eyebrow mb-1" style={{ color: ACCENT }}>
                Breath {count} / {SPEC.breaths}
              </p>
              <p className="font-serif text-4xl leading-none text-white text-glow">
                {breathHalf === 'in' ? 'In' : 'Out'}
              </p>
              <p className="mt-2 px-4 text-xs text-haze-300">
                Full breath in — let the exhale fall out on its own
              </p>
            </>
          )}
          {phase === 'retention' && (
            <>
              <p className="eyebrow mb-1" style={{ color: ACCENT }}>
                Hold · empty
              </p>
              <p className="font-sans text-5xl font-semibold tabular-nums text-white/90">
                {mmss(timer)}
              </p>
              <p className="mt-2 px-2 text-xs text-haze-300">
                Aim for around {retentionTarget}s. Tap when you need to breathe.
              </p>
            </>
          )}
          {phase === 'recovery' && (
            <>
              <p className="eyebrow mb-1" style={{ color: ACCENT }}>
                Hold · full
              </p>
              <p className="font-sans text-5xl font-semibold tabular-nums text-white/90">
                {timer}
              </p>
              <p className="mt-2 px-4 text-xs text-haze-300">
                Big breath in — hold it while the ring empties
              </p>
            </>
          )}
          {phase === 'done' && (
            <p className="font-serif text-2xl leading-tight text-white text-glow">
              All three rounds complete
            </p>
          )}
        </div>
      </div>

      {phase === 'ready' && (
        <button
          type="button"
          onClick={beginRound}
          className="flex items-center gap-3 rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition active:scale-95"
          style={{ borderColor: `${ACCENT}66`, background: `${ACCENT}1f` }}
        >
          <PlayIcon className="h-4 w-4" />
          Begin round {round}
        </button>
      )}

      {phase === 'retention' && (
        <button
          type="button"
          onClick={() => enterPhase('recovery')}
          className="rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition active:scale-95"
          style={{ borderColor: `${ACCENT}66`, background: `${ACCENT}1f` }}
        >
          Breathe in
        </button>
      )}

      {phase === 'breaths' && (
        <button
          type="button"
          onClick={() => enterPhase('retention')}
          className="text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
        >
          Skip to the hold →
        </button>
      )}
    </section>
  )
}
