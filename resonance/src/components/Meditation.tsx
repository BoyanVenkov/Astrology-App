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
// Narration surfaces out of the quiet instead of cutting in: the music settles first, then the
// voice fades up (and down at the end) — an instant full-volume line pulls people out of the sit.
const VOICE_VOLUME = 0.8
const VOICE_LEAD_MS = 700
const VOICE_FADE_IN_MS = 1500
const VOICE_FADE_OUT_S = 0.6
const DUCK_MS = 2000
const UNDUCK_MS = 2500
const RESUME_FADE_MS = 1800

/**
 * Glide an element's volume to `to` over `ms` with a smoothstep curve. Runs on a timer, not
 * requestAnimationFrame, so it still completes with the screen off; a newer glide on the same
 * element replaces the one in flight.
 */
const glides = new WeakMap<HTMLAudioElement, number>()
function glideVolume(audio: HTMLAudioElement, to: number, ms: number) {
  window.clearInterval(glides.get(audio))
  const from = audio.volume
  const start = performance.now()
  const id = window.setInterval(() => {
    const k = Math.min(1, (performance.now() - start) / ms)
    audio.volume = from + (to - from) * k * k * (3 - 2 * k)
    if (k >= 1) {
      window.clearInterval(id)
      glides.delete(audio)
    }
  }, 30)
  glides.set(audio, id)
}

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
  const runningRef = useRef(true)
  // a narration line held by pause (mid-line, or still waiting for its lead-in)
  const heldVoiceRef = useRef<HTMLAudioElement | null>(null)
  const [ambientSrc, setAmbientSrc] = useState<string | null>(null)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // stop any in-flight narration clip when the practice unmounts
  useEffect(() => {
    return () => {
      activeAudioRef.current?.pause()
      activeAudioRef.current = null // a line still in its lead-in must not start after we leave
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

  // pause holds the music and the voice; resume eases both back in rather than snapping
  useEffect(() => {
    runningRef.current = running
    const ambient = ambientAudioRef.current
    const voice = activeAudioRef.current
    if (!running) {
      ambient?.pause()
      if (voice && !voice.paused) {
        voice.pause()
        heldVoiceRef.current = voice
      }
      return
    }
    const held = heldVoiceRef.current
    heldVoiceRef.current = null
    if (ambient) {
      // a line that is playing or still in its lead-in keeps the bed low
      const speaking = !!held || (!!voice && !voice.ended && !voice.error)
      ambient.volume = 0
      ambient.play().catch(() => undefined)
      glideVolume(ambient, speaking ? AMBIENT_DUCK_VOLUME : AMBIENT_VOLUME, RESUME_FADE_MS)
    }
    if (held && held === voice) {
      held.volume = 0
      held.play().then(() => glideVolume(held, VOICE_VOLUME, VOICE_FADE_IN_MS)).catch(() => undefined)
    }
  }, [running, ambientSrc])

  const playClip = useCallback(
    (line: MessageKey, onEnded?: () => void) => {
      const url = meditationLineAudioUrl(locale, line)
      if (!url) {
        onEnded?.()
        return
      }
      // read the bed when it's needed, not now: on the first line it may still be loading
      const restore = () => {
        const ambient = ambientAudioRef.current
        if (ambient) glideVolume(ambient, AMBIENT_VOLUME, UNDUCK_MS)
        onEnded?.()
      }
      activeAudioRef.current?.pause()
      if (activeBlobRef.current) {
        revokeCachedAudioSrc(activeBlobRef.current)
        activeBlobRef.current = null
      }
      const audio = new Audio()
      audio.volume = 0
      activeAudioRef.current = audio
      audio.onended = restore
      audio.onerror = restore
      // ease the line out over its last moments
      let fadingOut = false
      audio.ontimeupdate = () => {
        if (!fadingOut && audio.duration - audio.currentTime < VOICE_FADE_OUT_S) {
          fadingOut = true
          glideVolume(audio, 0, VOICE_FADE_OUT_S * 1000)
        }
      }
      void resolveCachedAudioSrc(url).then((src) => {
        if (activeAudioRef.current !== audio) {
          revokeCachedAudioSrc(src)
          return
        }
        activeBlobRef.current = src
        audio.src = src
        // the music settles first, then the voice surfaces
        const ambient = ambientAudioRef.current
        if (ambient) glideVolume(ambient, AMBIENT_DUCK_VOLUME, DUCK_MS)
        window.setTimeout(() => {
          if (activeAudioRef.current !== audio) return
          if (!runningRef.current) {
            heldVoiceRef.current = audio // paused during the lead-in: resume will start it
            return
          }
          audio
            .play()
            .then(() => glideVolume(audio, VOICE_VOLUME, VOICE_FADE_IN_MS))
            .catch(restore)
        }, VOICE_LEAD_MS)
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
