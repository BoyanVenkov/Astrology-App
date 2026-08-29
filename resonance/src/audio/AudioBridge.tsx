import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine } from './audioEngine'

/**
 * Headless bridge: the Zustand store is the single source of truth for
 * playback, and this component is the only thing that talks to the engine.
 * Mount it once at the app root.
 *
 * Components call `unlock()` in their tap handler (autoplay policy), then set
 * `audioMode` and flip `isPlaying` — the effects below carry it into the graph.
 */
export function AudioBridge() {
  const isPlaying = useAppStore((s) => s.isPlaying)
  const audioMode = useAppStore((s) => s.audioMode)
  const frequency = useAppStore((s) => s.frequency)
  const masterVolume = useAppStore((s) => s.audio.masterVolume)
  const ambientPadEnabled = useAppStore((s) => s.audio.ambientPadEnabled)
  const ambientPadLevel = useAppStore((s) => s.audio.ambientPadLevel)
  const breathVoice = useAppStore((s) => s.audio.breathVoice)

  // Play / stop / re-mix.
  useEffect(() => {
    let cancelled = false
    if (isPlaying) {
      const { frequency: freq, audioMode: mode, audio } = useAppStore.getState()
      void audioEngine.unlock().then(() => {
        if (cancelled) return
        void audioEngine.play({
          frequency: freq,
          tone: mode !== 'breath',
          toneLevel: mode === 'both' ? 0.32 : undefined,
          pad: true,
          breath: mode !== 'tone' && audio.breathVoice,
        })
      })
    } else {
      void audioEngine.stop()
    }
    return () => {
      cancelled = true
    }
  }, [isPlaying, audioMode, breathVoice])

  // Live retune while a tone is sounding.
  useEffect(() => {
    if (isPlaying && audioMode !== 'breath') audioEngine.setFrequency(frequency)
  }, [frequency, isPlaying, audioMode])

  // Preference changes.
  useEffect(() => {
    audioEngine.setMasterVolume(masterVolume)
  }, [masterVolume])

  useEffect(() => {
    audioEngine.setAmbientPadEnabled(ambientPadEnabled)
  }, [ambientPadEnabled])

  useEffect(() => {
    audioEngine.setAmbientPadLevel(ambientPadLevel)
  }, [ambientPadLevel])

  return null
}
