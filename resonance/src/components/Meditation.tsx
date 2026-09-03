import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine } from '../audio/audioEngine'
import { buildMeditation } from '../lib/meditation'
import { useT } from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import type { MeditationSound, MeditationStyleKey } from '../types/resonance'
import { PauseIcon, PlayIcon } from './icons'

interface MeditationProps {
  minutes: number
  style?: MeditationStyleKey
  /** Sound bed: the frequency tone, soft ambient music, or nothing. */
  sound?: MeditationSound
  onComplete: (minutesPractised: number) => void
  /** Fired when the user leaves the briefing and the timed session starts. */
  onStarted?: () => void
  className?: string
}

const mmss = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function Meditation({
  minutes,
  style = 'chakra',
  sound = 'tone',
  onComplete,
  onStarted,
  className = '',
}: MeditationProps) {
  const t = useT()
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
      t,
    )
  }, [style, transit, chakra, aspects, transitHouses, hasNatal, minutes, t])

  const totalSeconds = minutes * 60
  const [stage, setStage] = useState<'briefing' | 'running'>('briefing')
  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)

  const elapsedRef = useRef(0)
  const legStartRef = useRef(0)
  const nextPhaseRef = useRef(1)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // start / stop the audio bed with the running stage
  useEffect(() => {
    if (stage !== 'running' || bed === 'silent') return
    audioEngine.unlock().catch(() => undefined)
    setAudioMode(bed === 'music' ? 'drone' : 'tone')
    setAudioPlaying(true)
    return () => {
      useAppStore.getState().toggleAudio(false)
    }
  }, [stage, bed, setAudioMode, setAudioPlaying])

  const tick = useCallback(() => {
    if (!meditation) return
    const total =
      elapsedRef.current +
      (legStartRef.current ? (performance.now() - legStartRef.current) / 1000 : 0)

    const whole = Math.floor(total)
    setElapsed((prev) => (prev === whole ? prev : whole))

    // open any phases we've passed — each with a single bowl
    while (
      nextPhaseRef.current < meditation.phases.length &&
      total >= meditation.phases[nextPhaseRef.current].at
    ) {
      const idx = nextPhaseRef.current
      nextPhaseRef.current += 1
      setPhaseIndex(idx)
      audioEngine.chime(1)
    }

    if (!doneRef.current && total >= totalSeconds) {
      doneRef.current = true
      setRunning(false)
      audioEngine.chime(3)
      onCompleteRef.current?.(minutes)
    }
  }, [meditation, totalSeconds, minutes])

  useEffect(() => {
    if (stage !== 'running' || !running) return
    legStartRef.current = performance.now()
    const id = window.setInterval(tick, 250)
    return () => {
      window.clearInterval(id)
      if (legStartRef.current) {
        elapsedRef.current += (performance.now() - legStartRef.current) / 1000
        legStartRef.current = 0
      }
    }
  }, [stage, running, tick])

  const begin = () => {
    audioEngine.unlock().catch(() => undefined)
    audioEngine.chime(1) // the opening bowl
    onStarted?.()
    setStage('running')
  }

  if (!meditation) {
    return (
      <div className={`glass-panel p-6 text-center text-sm text-haze-300 ${className}`}>
        {t('medp.attuning')}
      </div>
    )
  }

  const hue = meditation.hue

  /* ---------------------------------------------------------- briefing */
  if (stage === 'briefing') {
    return (
      <section className={`glass-panel flex flex-col gap-5 p-6 ${className}`}>
        <div>
          <p className="eyebrow">{t('medp.eyebrow')}</p>
          <h2 className="mt-1 font-serif text-2xl text-gilded">
            {meditation.title}
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-haze-200">
          {meditation.briefingLead}
        </p>

        <ol className="flex flex-col gap-3">
          {meditation.phases.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums"
                style={{ borderColor: `${hue}66`, color: hue }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-haze-100">{p.text}</p>
            </li>
          ))}
        </ol>

        <p className="text-sm leading-relaxed text-haze-300">
          {meditation.briefingClose}
        </p>

        <button
          type="button"
          onClick={begin}
          className="mt-1 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98]"
        >
          {t('scr.ritual.beginPractice')}
        </button>
      </section>
    )
  }

  /* ----------------------------------------------------------- running */
  const currentText = meditation.phases[phaseIndex]?.text ?? ''
  const pct = Math.min(100, (elapsed / totalSeconds) * 100)

  return (
    <section
      className={`glass-panel flex flex-col items-center gap-6 p-6 ${className}`}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">{t('medp.eyebrow')}</p>
          <h2 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            {meditation.title}
          </h2>
        </div>
        <span className="mt-1 shrink-0 whitespace-nowrap rounded-full border border-gold-500/30 px-3 py-1 text-xs tabular-nums tracking-[0.12em] text-haze-200">
          {t('medp.bowlOf', {
            n: phaseIndex + 1,
            total: meditation.phases.length,
          })}
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

      <p className="min-h-[7rem] max-w-[36ch] text-center text-lg leading-relaxed text-white">
        {currentText}
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          aria-pressed={running}
          className="flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-95"
        >
          {running ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
          {running ? t('medp.pause') : t('medp.resume')}
        </button>
      </div>

      <p className="text-center text-[11px] text-haze-500">
        {bed === 'tone'
          ? t('scr.ritual.soundTone', { hz: meditation.frequency })
          : bed === 'music'
            ? t('medp.ambient')
            : t(`scr.ritual.sound.silent` as MessageKey)}
      </p>
    </section>
  )
}
