import type { ChakraKey } from '../types/resonance'
import type { MoodNeed } from './moodPractice'
import type { MessageKey } from './locales/en'

/**
 * The day's mantra — chosen for the focus centre *and* the shape of the day:
 * a hard transit or a heavy mood pulls a grounding line, a soft transit or a
 * bright mood pulls an expansive one, depletion pulls a restful one. The exact
 * line is seeded by the day + chart + planet, so it shifts as the sky moves
 * but stays stable within a day.
 */

type MantraMode = 'restore' | 'ground' | 'flow' | 'amplify'

const BANK: Record<ChakraKey, Record<MantraMode, string[]>> = {
  root: {
    restore: [
      'I am allowed to stop. The ground holds me whether I do anything or not.',
      'My worth was never a thing I had to build.',
      'I let the earth carry the weight for a while.',
    ],
    ground: [
      'I stay rooted while the weather moves through.',
      'I am steady at the base, even when the top of me sways.',
      'What is solid in me is still solid today.',
    ],
    flow: [
      'I have what I need for this day, and this day only.',
      'I move at the pace of my own breath.',
      'I belong here, in this body, on this ground.',
    ],
    amplify: [
      'I plant my feet and take up the space that is mine.',
      'I am safe enough to want more.',
      'My roots are deep, so I can grow tall.',
    ],
  },
  sacral: {
    restore: [
      'I let the current slow. Nothing is lost by resting in the eddy.',
      'My feelings are weather, not verdicts — I let them pass.',
      'I do not have to make anything to be worth something.',
    ],
    ground: [
      'I feel it fully without being swept away.',
      'I hold this emotion the way a bank holds a river.',
      'The wave rises, and I stay with the sea underneath it.',
    ],
    flow: [
      'I let life move through me instead of holding it still.',
      'I follow what has warmth in it today.',
      'Change is the water I am made of.',
    ],
    amplify: [
      'I say yes to what delights me.',
      'I make something today, just to feel it move.',
      'Pleasure is information, and I am listening.',
    ],
  },
  'solar-plexus': {
    restore: [
      'I set the fire down. It will still be here when I have rested.',
      'I do not have to prove anything before I am allowed to breathe.',
      'My strength includes knowing when to stop.',
    ],
    ground: [
      'I hold my centre even when I am pushed.',
      'I can be certain and gentle at the same time.',
      'The pressure meets a self that does not fold.',
    ],
    flow: [
      'I trust my own fire to know where it is going.',
      'I do the next right thing and let the rest be.',
      'My will is mine to spend as I choose today.',
    ],
    amplify: [
      'I act on the thing I have been circling.',
      'I take up my full size without apology.',
      'I decide, and the deciding is the power.',
    ],
  },
  heart: {
    restore: [
      'I let love be something I receive today, not only give.',
      'My heart is allowed to be tired and still be open.',
      'I do not have to hold everyone. I can be held.',
    ],
    ground: [
      'I can care without carrying it all.',
      'I stay open at the centre even when the edges hurt.',
      'Love and boundaries are not opposites in me.',
    ],
    flow: [
      'I give and receive love as easily as breath.',
      'I let warmth move both ways today.',
      'Connection is here for me if I stay soft.',
    ],
    amplify: [
      'I reach toward the person I have been meaning to reach.',
      'I let myself be seen with my heart uncovered.',
      'There is more love in me than I have been spending.',
    ],
  },
  throat: {
    restore: [
      'I owe no one my words today. Silence is also true.',
      'I can rest my voice without losing it.',
      'What matters will still need saying tomorrow.',
    ],
    ground: [
      'I speak slowly and mean each word.',
      'I can say the hard thing without heat.',
      'My truth does not get louder because it is doubted.',
    ],
    flow: [
      'I speak my truth and let it land where it lands.',
      'I say what is real, plainly.',
      'My voice and my meaning move together today.',
    ],
    amplify: [
      'I say the thing I have been holding back.',
      'I let myself be heard at full volume.',
      'My voice deserves the room it takes.',
    ],
  },
  'third-eye': {
    restore: [
      'I let the picture stay blurred for now. Clarity does not need forcing.',
      'I close the extra windows and rest my inner eye.',
      'Not knowing yet is a fine place to be.',
    ],
    ground: [
      'I trust what I see even when I am told not to.',
      'I can hold two possibilities without alarm.',
      'The fog will lift; I do not have to chase it.',
    ],
    flow: [
      'I trust the quiet knowing under the noise.',
      'I follow the thread of my own attention.',
      'What I need to see will show itself in time.',
    ],
    amplify: [
      'I act on the insight I already have.',
      'I let my intuition make the next choice.',
      'I can see further than I have been letting myself.',
    ],
  },
  crown: {
    restore: [
      'I set the large questions down and let something larger hold them.',
      'I am carried even when I stop paddling.',
      'Meaning will find me; I do not have to hunt it today.',
    ],
    ground: [
      'I stay joined to something vast while my feet stay here.',
      'The larger pattern holds, even on a day I cannot see it.',
      'I trust the whole even when my part is small.',
    ],
    flow: [
      'I am part of something vast, and it is moving in my favour.',
      'I let the day mean whatever it means.',
      'I loosen my grip and stay open at the top.',
    ],
    amplify: [
      'I let a wider view change how I spend this day.',
      'I align one action today with what actually matters.',
      'I am a small, real part of an enormous, real thing.',
    ],
  },
}

const HARD = new Set(['square', 'opposition'])
const SOFT = new Set(['trine', 'sextile'])

const fnv1a = (str: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export interface MantraInput {
  chakra: ChakraKey
  /** Dominant transiting planet, e.g. "Saturn". */
  planet: string
  /** Its aspect, e.g. "square" / "trine" / "in". */
  aspect: string
  /** From the day's mood, if logged. */
  moodNeed: MoodNeed | null
  moodBright: boolean
  /** Body / mood say restore first. */
  urgent: boolean
  retrograde: boolean
  /** Stable-per-day seed — usually `${dayKey}|${profile.utc}`. */
  seed: string
}

function modeFor(input: MantraInput): MantraMode {
  const { moodNeed, moodBright, urgent, aspect } = input
  if (urgent) return 'restore'
  // a logged mood has the first say; otherwise the transit's harmony decides
  if (moodNeed === 'amplify' || moodBright) return 'amplify'
  if (moodNeed === 'settle' || moodNeed === 'ground' || moodNeed === 'restore') {
    return 'ground'
  }
  const harmony = HARD.has(aspect) ? 'hard' : SOFT.has(aspect) ? 'soft' : 'neutral'
  if (harmony === 'hard') return 'ground'
  if (harmony === 'soft') return 'amplify'
  return 'flow'
}

/** Returns a catalogue key like `mantra.root.ground.1` — resolve it with `t()`. */
export function buildDailyMantra(input: MantraInput): MessageKey {
  const mode = modeFor(input)
  const pool = BANK[input.chakra][mode]
  const key = `${input.seed}|${input.planet}|${input.aspect}|${input.retrograde}|${input.moodNeed ?? 'none'}|${mode}`
  const idx = fnv1a(key) % pool.length
  return `mantra.${input.chakra}.${mode}.${idx}` as MessageKey
}
