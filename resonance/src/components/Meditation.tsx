import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine } from '../audio/audioEngine'
import { buildMeditation } from '../lib/meditation'
import { speak, speechAvailable, stopSpeaking } from '../lib/speech'
import type { MeditationSound, MeditationStyleKey } from '../types/resonance'
import { PauseIcon, PlayIcon } from './icons'

interface MeditationProps {
  minutes: number
  withVoice: boolean
  style?: MeditationStyleKey
  /** Sound bed: the frequency tone, soft ambient music, or nothing. */
  sound?: MeditationSound
  onComplete: (minutesPractised: number) => void
  className?: string
}

const mmss = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function Meditation({
  minutes,
  withVoice,
  style = 'chakra',
  sound = 'tone',
  onComplete,
  className = '',
}: MeditationProps) {
  // The sound bath is built around the tone — it always plays.
  const bed: MeditationSound = style === 'sound-bath' ? 'tone' : sound
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const aspects = useAppStore((s) => s.aspects)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const setAudioPlaying = useAppStore((s) => s.toggleAudio)
  const setAudioMode = useAppStore((s) => s.setAudioMode)

  const meditation = useMemo(() => {
    if (!transit || !chakra) return null
    return buildMeditation(
      style,
      { transit, chakra, aspects, transitHouses, hasNatal },
      minutes,
    )
  }, [style, transit, chakra, aspects, transitHouses, hasNatal, minutes])

  const totalSeconds = minutes * 60
  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  const elapsedRef = useRef(0)
  const legStartRef = useRef(0)
  const nextStepRef = useRef(0)
  const doneRef = useRef(false)
  const startedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // start the audio bed once
  useEffect(() => {
    if (bed === 'silent') {
      // no engine audio — spoken / on-screen guidance only
      return () => stopSpeaking()
    }
    audioEngine.unlock().catch(() => undefined)
    setAudioMode(bed === 'music' ? 'drone' : 'tone')
    setAudioPlaying(true)
    startedRef.current = true
    return () => {
      stopSpeaking()
      if (startedRef.current) useAppStore.getState().toggleAudio(false)
    }
  }, [bed, setAudioMode, setAudioPlaying])

  const tick = useCallback(() => {
    if (!meditation) return
    const total =
      elapsedRef.current +
      (legStartRef.current ? (performance.now() - legStartRef.current) / 1000 : 0)

    const whole = Math.floor(total)
    setElapsed((prev) => (prev === whole ? prev : whole))

    // fire any steps we've passed
    while (
      nextStepRef.current < meditation.steps.length &&
      total >= meditation.steps[nextStepRef.current].at
    ) {
      const idx = nextStepRef.current
      nextStepRef.current += 1
      setStepIndex(idx)
      if (withVoice && speechAvailable()) {
        speak(meditation.steps[idx].text, { rate: 0.8 })
      }
    }

    if (!doneRef.current && total >= totalSeconds) {
      doneRef.current = true
      setRunning(false)
      stopSpeaking()
      onCompleteRef.current?.(minutes)
    }
  }, [meditation, withVoice, totalSeconds, minutes])

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
    if (running) stopSpeaking()
    setRunning((r) => !r)
  }

  if (!meditation) {
    return (
      <div className={`glass-panel p-6 text-center text-sm text-haze-300 ${className}`}>
        Attuning to the sky…
      </div>
    )
  }

  const hue = meditation.hue
  const currentText = meditation.steps[stepIndex]?.text ?? ''
  const pct = Math.min(100, (elapsed / totalSeconds) * 100)

  return (
    <section
      className={`glass-panel flex flex-col items-center gap-6 p-6 ${className}`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="eyebrow">Meditation</p>
          <h2 className="mt-1 font-serif text-2xl text-gilded">
            {meditation.title}
          </h2>
        </div>
        <span className="rounded-full border border-gold-500/30 px-3 py-1 text-xs tracking-[0.12em] text-haze-200">
          {bed === 'tone'
            ? `${meditation.frequency} Hz`
            : bed === 'music'
              ? 'Ambient music'
              : 'Quiet'}
        </span>
      </div>

      <div className="w-full">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${pct}%`, background: hue }}
          />
        </div>
        <p className="mt-1 text-center text-[11px] tabular-nums text-haze-400">
          {mmss(elapsed)} / {mmss(totalSeconds)}
        </p>
      </div>

      {/* breathing orb */}
      <div className="relative flex aspect-square w-full max-w-[240px] items-center justify-center">
        <div
          className="absolute inset-[10%] rounded-full blur-2xl animate-aura-breathe"
          style={{
            background: `radial-gradient(circle, ${hue}55 0%, ${hue}00 70%)`,
            transformOrigin: 'center',
          }}
        />
        <div
          className="absolute inset-[26%] rounded-full border animate-aura-breathe"
          style={{
            borderColor: `${hue}88`,
            background:
              'radial-gradient(circle at 50% 35%, rgba(26,38,87,0.7), rgba(3,4,12,0.85))',
            boxShadow: `inset 0 0 40px ${hue}33, 0 0 40px ${hue}22`,
            transformOrigin: 'center',
            animationDelay: '-2s',
          }}
        />
      </div>

      <p className="min-h-[4.5rem] max-w-[34ch] text-center text-lg leading-relaxed text-white">
        {currentText}
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={running}
          className="flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-95"
        >
          {running ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
          {running ? 'Pause' : 'Resume'}
        </button>
      </div>

      {withVoice && !speechAvailable() && (
        <p className="text-xs text-haze-400">
          Voice isn’t available here — follow the words on screen.
        </p>
      )}
    </section>
  )
}
