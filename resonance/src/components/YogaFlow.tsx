import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { audioEngine } from '../audio/audioEngine'
import { chakraLabel, useT } from '../lib/i18n'
import { chakraColor } from '../lib/resonanceData'
import { poseCaution, poseCues, poseName, YOGA_FLOWS, YOGA_PREP_SECONDS, yogaSteps } from '../lib/yoga'
import type { ChakraKey } from '../types/resonance'
import { PauseIcon, PlayIcon } from './icons'

interface YogaFlowProps {
  chakra: ChakraKey
  onComplete: (minutesPractised: number) => void
  className?: string
}

const RING_R = 30
const RING_C = 2 * Math.PI * RING_R

/**
 * A guided chakra flow: for each pose (each side, where it has two) a short "get ready", then a
 * timed hold with the cues on screen. A soft bowl marks the start of every hold; three close the
 * flow. Time is tracked like Meditation's — accumulated legs, so pause freezes it exactly.
 */
export function YogaFlow({ chakra, onComplete, className = '' }: YogaFlowProps) {
  const t = useT()
  const steps = useMemo(() => yogaSteps(chakra), [chakra])
  const poseKeys = YOGA_FLOWS[chakra]
  const accent = chakraColor(chakra)

  const [running, setRunning] = useState(true)
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<'prep' | 'hold'>('prep')
  const [phaseElapsed, setPhaseElapsed] = useState(0)

  const elapsedRef = useRef(0) // seconds into the current phase, before this leg
  const legStartRef = useRef(0)
  const totalRef = useRef(0) // seconds practised, for the log
  const doneRef = useRef(false)

  const step = steps[stepIndex]
  const phaseLength = phase === 'prep' ? YOGA_PREP_SECONDS : step.pose.hold

  const advance = useCallback(() => {
    totalRef.current += phaseLength
    elapsedRef.current = 0
    legStartRef.current = performance.now()
    setPhaseElapsed(0)
    if (phase === 'prep') {
      audioEngine.chime(1, { gain: 0.45 })
      setPhase('hold')
      return
    }
    if (stepIndex + 1 < steps.length) {
      setStepIndex((i) => i + 1)
      setPhase('prep')
      return
    }
    doneRef.current = true
    setRunning(false)
    audioEngine.chime(3, { gain: 0.5 })
    onComplete(Math.max(1, Math.round(totalRef.current / 60)))
  }, [phase, phaseLength, stepIndex, steps.length, onComplete])

  const tick = useCallback(() => {
    if (doneRef.current) return
    const s = elapsedRef.current + (legStartRef.current ? (performance.now() - legStartRef.current) / 1000 : 0)
    if (s >= phaseLength) advance()
    else setPhaseElapsed(s)
  }, [phaseLength, advance])

  useEffect(() => {
    if (!running) return
    legStartRef.current = performance.now()
    const id = window.setInterval(tick, 200)
    return () => {
      window.clearInterval(id)
      if (legStartRef.current) {
        elapsedRef.current += (performance.now() - legStartRef.current) / 1000
        legStartRef.current = 0
      }
    }
  }, [running, tick])

  const poseIndex = poseKeys.indexOf(step.pose.key)
  const next = steps[stepIndex + 1]
  const remaining = Math.max(0, Math.ceil(phaseLength - phaseElapsed))
  const progress = Math.min(1, phaseElapsed / phaseLength)
  const caution = poseCaution(step.pose.key, t)

  return (
    <section className={`glass-panel flex flex-col items-center gap-5 p-6 ${className}`}>
      <div className="w-full text-center">
        <p className="eyebrow">{t('yoga.flowName', { chakra: chakraLabel(chakra, t) })}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-haze-400">
          {t('yoga.step', { i: poseIndex + 1, n: poseKeys.length })}
        </p>
      </div>

      {/* the pose: mirrored for the second side, quietly breathing through the hold */}
      <div className="relative aspect-square w-full max-w-[19rem]">
        <div
          aria-hidden
          className="absolute inset-[18%] rounded-full blur-3xl transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, ${accent}40, transparent 70%)`, opacity: phase === 'hold' ? 1 : 0.4 }}
        />
        <img
          key={`${step.pose.key}-${step.side ?? ''}`}
          src={step.pose.art}
          alt={poseName(step.pose.key, t)}
          className={`relative h-full w-full object-contain transition-opacity duration-700 ${phase === 'hold' && running ? 'animate-yoga-breathe' : ''}`}
          style={{ opacity: phase === 'hold' ? 1 : 0.55, scale: step.side === 'left' ? '-1 1' : undefined }}
        />
      </div>

      <div className="text-center">
        <h2 className="font-serif text-2xl leading-tight text-gilded">{poseName(step.pose.key, t)}</h2>
        <p className="mt-0.5 text-xs italic text-haze-400">{step.pose.sanskrit}</p>
        {step.side && (
          <span
            className="mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: accent, boxShadow: `inset 0 0 0 1px ${accent}66` }}
          >
            {t(step.side === 'right' ? 'yoga.side.right' : 'yoga.side.left')}
          </span>
        )}
      </div>

      {/* the timer: a quiet ring, counting the hold (or the few seconds before it) */}
      <div className="flex items-center gap-4">
        <div className="relative h-[4.5rem] w-[4.5rem]">
          <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="36" cy="36" r={RING_R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <circle
              cx="36" cy="36" r={RING_R} fill="none" strokeWidth="3" strokeLinecap="round"
              stroke={phase === 'hold' ? accent : 'var(--rz-gold)'}
              strokeDasharray={RING_C} strokeDashoffset={RING_C * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.2s linear' }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-serif text-xl tabular-nums text-white">{remaining}</span>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-100">
          {phase === 'prep' ? t('yoga.getReady') : t('yoga.hold')}
        </p>
      </div>

      <ul className="w-full max-w-[34ch] space-y-2 text-[0.95rem] leading-relaxed text-haze-100">
        {poseCues(step.pose.key, t).map((cue) => (
          <li key={cue} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            <span>{cue}</span>
          </li>
        ))}
      </ul>
      {caution && <p className="max-w-[34ch] text-center text-xs leading-relaxed text-amber-200/80">{caution}</p>}

      {next && (
        <p className="text-[11px] uppercase tracking-[0.12em] text-haze-500">
          {t('yoga.next', {
            pose:
              next.pose.key === step.pose.key
                ? t(next.side === 'left' ? 'yoga.side.left' : 'yoga.side.right')
                : poseName(next.pose.key, t),
          })}
        </p>
      )}

      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        aria-pressed={running}
        className="flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-95"
      >
        {running ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        {running ? t('medp.pause') : t('medp.resume')}
      </button>
    </section>
  )
}
