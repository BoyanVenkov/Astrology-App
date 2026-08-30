import type { BreathPatternKey, MeditationStyleKey, Mood } from '../types/resonance'

/**
 * How the day's mood bends the astrological prescription. The sky says what the
 * *field* is doing; the mood says how *you* are arriving into it — and the
 * practice is chosen from both.
 */

export type MoodNeed = 'settle' | 'ground' | 'restore' | 'follow' | 'amplify'

export const MOOD_NEED: Record<Mood, MoodNeed> = {
  anxious: 'settle', // wired → down-regulate firmly
  heavy: 'ground', // low → slow, warm, grounding
  tired: 'restore', // depleted → short and soft
  calm: 'follow', // steady → do what the sky suggests
  clear: 'follow', // focused → follow the sky, can go longer
  bright: 'amplify', // energised → lean into the sky's charge
}

/** The breath pattern the mood calls for, given what the sky suggested. */
export function moodBreath(
  skyPattern: BreathPatternKey,
  mood: Mood | null,
): BreathPatternKey {
  if (!mood) return skyPattern
  switch (MOOD_NEED[mood]) {
    case 'settle':
      return 'relax' // 4·7·8
    case 'ground':
      return 'coherent' // slow 5·5
    case 'restore':
      return 'exhale' // long, easy exhale
    case 'amplify':
      return skyPattern === 'relax' || skyPattern === 'exhale'
        ? 'coherent'
        : skyPattern
    default:
      return skyPattern
  }
}

/** The meditation style the mood calls for (else today's chart-tuned one). */
export function moodMeditation(mood: Mood | null): MeditationStyleKey {
  switch (mood) {
    case 'anxious':
      return 'breath-awareness'
    case 'heavy':
      return 'body-scan'
    case 'tired':
      return 'safe-place'
    case 'bright':
      return 'gratitude'
    default:
      return 'chakra'
  }
}

/** Session length relative to the base minutes. */
export function moodMinutesScale(mood: Mood | null): number {
  if (!mood) return 1
  const need = MOOD_NEED[mood]
  return need === 'restore' ? 0.7 : need === 'amplify' ? 1.2 : 1
}

/** A short second-person clause naming how the user is arriving. */
export function moodClause(mood: Mood | null): string {
  switch (mood) {
    case 'anxious':
      return 'arriving anxious'
    case 'heavy':
      return 'arriving heavy'
    case 'tired':
      return 'arriving tired'
    case 'bright':
      return 'arriving bright'
    case 'clear':
      return 'arriving clear'
    case 'calm':
      return 'arriving calm'
    default:
      return ''
  }
}
