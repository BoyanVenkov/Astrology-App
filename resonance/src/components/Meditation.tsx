import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { buildMeditation } from '../lib/meditation'
import {
  ambientTrackUrl,
  hasFullMeditationAudio,
  meditationLineAudioUrl,
} from '../lib/meditationAudio'
import { resolveCachedAudioSrc, revokeCachedAudioSrc } from '../lib/audioCache'
import { useT } from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import type { MeditationStyleKey } from '../types/resonance'
import { PauseIcon, PlayIcon } from './icons'

interface MeditationProps {
  minutes: number
  style?: MeditationStyleKey
  onComplete: (minutesPractised: number) => void
  /** Fired once, right as the timed session starts. */
  onStarted?: () => void
  className?: string
}

const mmss = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const AMBIENT_VOLUME = 0.35
const AMBIENT_DUCK_VOLUME = 0.12

export function Meditation({
  minutes,
  style = 'chakra',
  onComplete,
  onStarted,
  className = '',
}: MeditationProps) {
  const t = useT()
  const locale = useAppStore((s) => s.locale)
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const aspects = useAppStore((s) => s.aspects)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const hasNatal = useAppStore((s) => s.hasNatal)

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
  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)

  const elapsedRef = useRef(0)
  const legStartRef = useRef(0)
  const nextPhaseRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const activeAudioRef = useRef<HTMLAudioElement | null>(null)
  const activeBlobRef = useRef<string | null>(null)
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null)
  const [ambientSrc, setAmbientSrc] = useState<string | null>(null)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // stop any in-flight narration clip when the practice unmounts
  useEffect(() => {
    return () => {
      activeAudioRef.current?.pause()
      if (activeBlobRef.current) revokeCachedAudioSrc(activeBlobRef.current)
    }
  }, [])

  // fetch (or reuse the cached copy of) the ambient bed for this session length
  useEffect(() => {
    let cancelled = false
    void resolveCachedAudioSrc(ambientTrackUrl(minutes)).then((src) => {
      if (cancelled) {
        revokeCachedAudioSrc(src)
        return
      }
      setAmbientSrc(src)
    })
    return () => {
      cancelled = true
    }
  }, [minutes])

  // ambient bed: one track per session length, ducked under narration
  useEffect(() => {
    if (!ambientSrc) return
    const audio = new Audio(ambientSrc)
    audio.volume = AMBIENT_VOLUME
    ambientAudioRef.current = audio
    return () => {
      audio.pause()
      ambientAudioRef.current = null
      revokeCachedAudioSrc(ambientSrc)
    }
  }, [ambientSrc])

  useEffect(() => {
    const audio = ambientAudioRef.current
    if (!audio) return
    if (running) audio.play().catch(() => undefined)
    else audio.pause()
  }, [running, ambientSrc])

  const playClip = useCallback(
    (line: MessageKey, onEnded?: () => void) => {
      const url = meditationLineAudioUrl(locale, line)
      if (!url) {
        onEnded?.()
        return
      }
      const ambient = ambientAudioRef.current
      const restore = () => {
        if (ambient) ambient.volume = AMBIENT_VOLUME
        onEnded?.()
      }
      activeAudioRef.current?.pause()
      if (activeBlobRef.current) {
        revokeCachedAudioSrc(activeBlobRef.current)
        activeBlobRef.current = null
      }
      const audio = new Audio()
      activeAudioRef.current = audio
      audio.onended = restore
      audio.onerror = restore
      void resolveCachedAudioSrc(url).then((src) => {
        if (activeAudioRef.current !== audio) {
          revokeCachedAudioSrc(src)
          return
        }
        activeBlobRef.current = src
        audio.src = src
        if (ambient) ambient.volume = AMBIENT_DUCK_VOLUME
        audio.play().catch(restore)
      })
    },
    [locale],
  )

  const tick = useCallback(() => {
    if (!meditation) return
    const total =
      elapsedRef.current +
      (legStartRef.current ? (performance.now() - legStartRef.current) / 1000 : 0)

    const whole = Math.floor(total)
    setElapsed((prev) => (prev === whole ? prev : whole))

    // open any phases we've passed
    while (
      nextPhaseRef.current < meditation.phases.length &&
      total >= meditation.phases[nextPhaseRef.current].at
    ) {
      const idx = nextPhaseRef.current
      nextPhaseRef.current += 1
      setPhaseIndex(idx)
      playClip(meditation.phases[idx].line)
    }

    if (!doneRef.current && total >= totalSeconds) {
      doneRef.current = true
      setRunning(false)
      onCompleteRef.current?.(minutes)
    }
  }, [meditation, totalSeconds, minutes, playClip])

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

  // fire once, the moment the practice starts — phase 0's narration is
  // handled by the tick loop above (nextPhaseRef starts at 0), the same
  // reliable path every later phase uses, rather than a separate mount hook
  const startedRef = useRef(false)
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    onStarted?.()
  }, [onStarted])

  if (!meditation) {
    return (
      <div className={`glass-panel p-6 text-center text-sm text-haze-300 ${className}`}>
        {t('medp.attuning')}
      </div>
    )
  }

  const hue = meditation.hue

  /* ----------------------------------------------------------- running */
  const currentText = meditation.phases[phaseIndex]?.text ?? ''
  const pct = Math.min(100, (elapsed / totalSeconds) * 100)

  return (
    <section
      className={`glass-panel flex flex-col items-center gap-6 p-6 ${className}`}
    >
      <div className="w-full">
        <p className="eyebrow">{t('medp.eyebrow')}</p>
        <h2 className="mt-1 font-serif text-2xl leading-tight text-gilded">
          {meditation.title}
        </h2>
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

      {!hasFullMeditationAudio(
        locale,
        meditation.phases.map((p) => p.line),
      ) && <p className="text-center text-[11px] text-haze-500">{t('medp.noVoice')}</p>}
    </section>
  )
}
