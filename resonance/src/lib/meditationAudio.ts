import type { MeditationStyleKey, Locale } from '../types/resonance'
import type { MeditationPhaseKey } from './meditation'

/**
 * Only the timed steps are narrated. The briefing (read before starting)
 * and the on-screen close line stay text-only, on screen, in every locale.
 */
export type MeditationAudioKey = MeditationPhaseKey

/**
 * Which (style, locale) pairs have real recorded narration under
 * public/audio/meditations/<style>/<locale>/<key>.mp3. Everything else
 * plays silently (on-screen text only) until it's recorded.
 */
const RECORDED: Partial<Record<MeditationStyleKey, Set<Locale>>> = {
  'breath-awareness': new Set<Locale>(['en', 'bg']),
}

export function hasMeditationAudio(style: MeditationStyleKey, locale: Locale): boolean {
  return RECORDED[style]?.has(locale) ?? false
}

export function meditationAudioUrl(
  style: MeditationStyleKey,
  locale: Locale,
  key: MeditationAudioKey,
): string | null {
  if (!hasMeditationAudio(style, locale)) return null
  return `/audio/meditations/${style}/${locale}/${key}.mp3`
}
