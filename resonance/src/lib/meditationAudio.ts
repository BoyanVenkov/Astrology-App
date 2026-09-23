import type { Locale } from '../types/resonance'
import type { MessageKey } from './locales/en'

/**
 * Recorded narration lines, per locale. Keyed by message key rather than by
 * meditation style, since several styles share the exact same line (e.g.
 * every style's "settle"/"close", or "breath" across three styles) — one
 * recording covers all of them. Files live at
 * public/audio/meditations/<locale>/<line>.mp3
 */
const RECORDED_KEYS: MessageKey[] = [
  'med.step.settle',
  'med.step.breath',
  'med.step.close',
  'med.step.ba.count',
  'med.step.scan.0',
  'med.step.scan.1',
  'med.step.metta.0',
  'med.step.metta.1',
  'med.step.metta.2',
  'med.step.bath.0',
  'med.step.bath.1',
  'med.step.grat.0',
  'med.step.grat.1',
  'med.step.grat.2',
  'med.step.safe.0',
  'med.step.safe.1',
  'med.step.mtn.0',
  'med.step.mtn.1',
  'med.step.open.0',
  'med.step.open.1',
  'med.step.morn.0',
  'med.step.morn.1',
  'med.step.eve.0',
  'med.step.eve.1',
  'med.step.nidra.0',
  'med.step.nidra.1',
  'med.step.nidra.2',
  'med.step.nidra.3',
  'med.step.chakra.root.0',
  'med.step.chakra.root.1',
  'med.step.chakra.sacral.0',
  'med.step.chakra.sacral.1',
  'med.step.chakra.solar-plexus.0',
  'med.step.chakra.solar-plexus.1',
  'med.step.chakra.heart.0',
  'med.step.chakra.heart.1',
  'med.step.chakra.throat.0',
  'med.step.chakra.throat.1',
  'med.step.chakra.third-eye.0',
  'med.step.chakra.third-eye.1',
  'med.step.chakra.crown.0',
  'med.step.chakra.crown.1',
]

const RECORDED_LINES: Partial<Record<Locale, Set<MessageKey>>> = {
  en: new Set<MessageKey>(RECORDED_KEYS),
  bg: new Set<MessageKey>(RECORDED_KEYS),
}

export function meditationLineAudioUrl(locale: Locale, line: MessageKey): string | null {
  if (!RECORDED_LINES[locale]?.has(line)) return null
  return `/audio/meditations/${locale}/${line}.mp3`
}

/** Does every phase in this built meditation have a recorded clip? */
export function hasFullMeditationAudio(locale: Locale, lines: MessageKey[]): boolean {
  return lines.length > 0 && lines.every((line) => meditationLineAudioUrl(locale, line) !== null)
}

/** One ambient bed per session length — sized to match, so nothing loops. */
const AMBIENT_MINUTES = [5, 10, 15, 20] as const

export function ambientTrackUrl(minutes: number): string {
  const closest = AMBIENT_MINUTES.reduce((best, m) =>
    Math.abs(m - minutes) < Math.abs(best - minutes) ? m : best,
  )
  return `/audio/ambient/${closest}min.mp3`
}
