import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine, solfeggioInfo } from '../audio/audioEngine'
import type { SolfeggioFrequency } from '../types/resonance'
import { PauseIcon, PlayIcon } from './icons'

interface FrequencySessionProps {
  frequency: SolfeggioFrequency
  minutes: number
  onComplete: (minutesPractised: number) => void
  className?: string
}

const mmss = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const CUES = [
  'Let the tone do the work. There is nothing to focus on.',
  'Notice where in the body the sound seems to land.',
  'If the mind wanders, the tone is still here when you come back.',
  'Let the sound be wider than any thought.',
  'Soften the jaw, the shoulders, the space behind the eyes.',
  'Let the space between you and the sound dissolve.',
]

export function FrequencySession({
  frequency,
  minutes,
  onComplete,
  className = '',
}: FrequencySessionProps) {
  const setFrequency = useAppStore((s) => s.setFrequency)
  const setAudioMode = useAppStore((s) => s.setAudioMode)
  const setAudioPlaying = useAppStore((s) => s.toggleAudio)

  const info = useMemo(() => solfeggioInfo(frequency), [frequency])
  const tint = info.color
  const totalSeconds = minutes * 60

  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)

  const elapsedRef = useRef(0)
  const legStartRef = useRef(0)
  const doneRef = useRef(false)
  const startedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // audio bed
  useEffect(() => {
    audioEngine.unlock().catch(() => undefined)
    setFrequency(frequency)
    setAudioMode('tone')
    setAudioPlaying(true)
    startedRef.current = true
    return () => {
      if (startedRef.current) useAppStore.getState().toggleAudio(false)
    }
  }, [frequency, setFrequency, setAudioMode, setAudioPlaying])

  const tick = useCallback(() => {
    const total =
      elapsedRef.current +
      (legStartRef.current ? (performance.now() - legStartRef.current) / 1000 : 0)
    const whole = Math.floor(total)
    setElapsed((prev) => (prev === whole ? prev : whole))
    if (!doneRef.current && total >= totalSeconds) {
      doneRef.current = true
      setRunning(false)
      onCompleteRef.current?.(minutes)
    }
  }, [totalSeconds, minutes])

  useEffect(() => {
    if (!running) return
    legStartRef.current = performance.now()
    const id = window.setInterval(tick, 250)
    return () => {
      window.clearInterval(id)
      if (legStartRef.current) {
        elapsedRef.current += (performance.now() - legStartRef.current) / 1000
        legStartRef.current = 0
      }
    }
  }, [running, tick])

  const toggle = () => {
    audioEngine.unlock().catch(() => undefined)
    setRunning((r) => {
      const next = !r
      setAudioPlaying(next)
      return next
    })
  }

  const pct = Math.min(100, (elapsed / totalSeconds) * 100)
  const cue = CUES[Math.min(CUES.length - 1, Math.floor(elapsed / 45)) % CUES.length]

  return (
    <section
      className={`glass-panel flex flex-col items-center gap-6 p-6 ${className}`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="eyebrow">Frequency</p>
          <h2
            className="mt-1 font-serif text-2xl tabular-nums"
            style={{ color: tint }}
          >
            {frequency} Hz
          </h2>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.12em] text-haze-200">
          {mmss(elapsed)} / {mmss(totalSeconds)}
        </span>
      </div>

      <p className="-mt-2 self-start text-sm text-haze-300">{info.intention}</p>

      <div className="w-full">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${pct}%`, background: tint }}
          />
        </div>
      </div>

      {/* resonance rings */}
      <div className="relative flex aspect-square w-full max-w-[260px] items-center justify-center">
        {running &&
          [0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute inset-0 rounded-full border animate-freq-ring"
              style={{
                borderColor: `${tint}66`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        <div
          className="absolute inset-[30%] rounded-full blur-xl animate-aura-breathe"
          style={{
            background: `radial-gradient(circle, ${tint}55 0%, ${tint}00 70%)`,
          }}
        />
        <div
          className="relative grid h-24 w-24 place-items-center rounded-full border"
          style={{
            borderColor: `${tint}88`,
            background:
              'radial-gradient(circle at 50% 35%, rgba(26,38,87,0.7), rgba(3,4,12,0.85))',
            boxShadow: `inset 0 0 40px ${tint}33, 0 0 44px ${tint}22`,
          }}
        >
          <span
            className="font-serif text-lg tabular-nums"
            style={{ color: tint }}
          >
            {frequency}
          </span>
        </div>
      </div>

      <p className="min-h-[3.5rem] max-w-[32ch] text-center text-sm leading-relaxed text-haze-200">
        {cue}
      </p>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={running}
        className="flex items-center gap-3 rounded-full border border-gold-500/40 bg-gold-500/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-95"
      >
        {running ? (
          <PauseIcon className="h-4 w-4" />
        ) : (
          <PlayIcon className="h-4 w-4" />
        )}
        {running ? 'Pause' : 'Resume'}
      </button>
    </section>
  )
}
