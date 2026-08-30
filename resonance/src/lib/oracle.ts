import type {
  AstrologicalTransit,
  BirthProfile,
  ChakraKey,
} from '../types/resonance'
import { localDayKey } from './timezone'

/**
 * The Natal Oracle — a small reflective deck drawn once a day.
 *
 * The draw is deterministic: the same birth chart on the same date, under the
 * same dominant transit, always turns the same three cards. Tomorrow it moves.
 * These are prompts for reflection, not predictions.
 */

export type OracleMotif =
  | 'star'
  | 'orbit'
  | 'crescent'
  | 'ascend'
  | 'descend'
  | 'nested'
  | 'spark'
  | 'wave'
  | 'gate'
  | 'tide'

export interface OracleCard {
  id: string
  name: string
  motif: OracleMotif
  theme: string
  /** The reading — a reflection for the day, in the second person. */
  message: string
  /** The edge of the card — what to keep an eye on. */
  shadow: string
  chakra: ChakraKey
}

export const ORACLE_DECK: OracleCard[] = [
  {
    id: 'still-point',
    name: 'The Still Point',
    motif: 'star',
    theme: 'Centre',
    message:
      'Everything is turning except the axis it turns on. Today you are that axis — do less, and do it more precisely.',
    shadow:
      'Stillness can curdle into avoidance. Notice if you are calling it peace when it is really a locked door.',
    chakra: 'third-eye',
  },
  {
    id: 'signal-fire',
    name: 'The Signal Fire',
    motif: 'spark',
    theme: 'Being seen',
    message:
      'Light the thing you have been keeping banked. Someone is looking for exactly the signal only you can send.',
    shadow: 'A fire lit for attention burns out fast. Make it warmth, not performance.',
    chakra: 'solar-plexus',
  },
  {
    id: 'deep-well',
    name: 'The Deep Well',
    motif: 'nested',
    theme: 'Source',
    message:
      'Draw from the bottom, not the surface. What you need today is older and quieter than what is shouting for you.',
    shadow: 'Wells are for drawing from, not living in. Do not move in for a long stay.',
    chakra: 'sacral',
  },
  {
    id: 'threshold',
    name: 'The Threshold',
    motif: 'gate',
    theme: 'Crossing',
    message:
      'You are standing in the doorway. It is uncomfortable because it is meant to be walked through, not furnished.',
    shadow:
      'Rushing the crossing leaves things behind you will want. Take one full breath on the sill.',
    chakra: 'root',
  },
  {
    id: 'long-orbit',
    name: 'The Long Orbit',
    motif: 'orbit',
    theme: 'Patience',
    message:
      'What you set in motion months ago is still on its way back to you. Trust the arc; do not chase it.',
    shadow: 'Patience is not passivity. Keep tending the thing while it travels.',
    chakra: 'crown',
  },
  {
    id: 'tuning-fork',
    name: 'The Tuning Fork',
    motif: 'wave',
    theme: 'Alignment',
    message:
      'Strike your own note and let the room find it. You do not have to argue anyone into tune.',
    shadow:
      'Keep matching other people’s pitch and you will forget your own. Sound it first.',
    chakra: 'throat',
  },
  {
    id: 'undertow',
    name: 'The Undertow',
    motif: 'tide',
    theme: 'Hidden pull',
    message:
      'Something beneath the surface is moving you. Name it today, before it decides for you.',
    shadow: 'Fighting the current head-on will exhaust you. Swim across it.',
    chakra: 'sacral',
  },
  {
    id: 'open-hand',
    name: 'The Open Hand',
    motif: 'star',
    theme: 'Exchange',
    message:
      'Give without gripping the outcome; receive without apology. The hand does both in the same shape.',
    shadow: 'An open hand held out too long gets tired. It is allowed to close and rest.',
    chakra: 'heart',
  },
  {
    id: 'watchtower',
    name: 'The Watchtower',
    motif: 'ascend',
    theme: 'Perspective',
    message:
      'Climb high enough to see the whole shape of it. From up here the tangle is just a path.',
    shadow:
      'Do not mistake the view for the walk. At some point you come down and travel it.',
    chakra: 'third-eye',
  },
  {
    id: 'ember',
    name: 'The Ember',
    motif: 'spark',
    theme: 'Keeping faith',
    message:
      'You do not need a blaze today. You need to not let the last coal go out. That is enough.',
    shadow: 'Guard the ember so tightly you smother it and it helps no one. Give it air.',
    chakra: 'solar-plexus',
  },
  {
    id: 'anchor',
    name: 'The Anchor',
    motif: 'descend',
    theme: 'Steadiness',
    message:
      'Drop weight and hold position while the surface tosses. The storm is weather, not instruction.',
    shadow:
      'An anchor set in the wrong place keeps you from a better one. Check where you have dropped it.',
    chakra: 'root',
  },
  {
    id: 'eclipse',
    name: 'The Eclipse',
    motif: 'crescent',
    theme: 'A pause in the light',
    message:
      'Something familiar is briefly hidden. Not a loss — a chance to see what the glare was covering.',
    shadow: 'Do not make permanent decisions in the shadow. The light comes back.',
    chakra: 'third-eye',
  },
  {
    id: 'spring-tide',
    name: 'The Spring Tide',
    motif: 'tide',
    theme: 'Amplification',
    message:
      'Two forces are pulling the same way today. Whatever you do will land bigger than usual — choose it well.',
    shadow: 'High water floods low ground. Mind what you say and send while the pull is strong.',
    chakra: 'sacral',
  },
  {
    id: 'keystone',
    name: 'The Keystone',
    motif: 'gate',
    theme: 'Responsibility',
    message:
      'You are holding more of the structure than you admit. Stand where you are — it stays up because of you.',
    shadow: 'A keystone that resents the arch cracks. If the weight is wrong, say so out loud.',
    chakra: 'root',
  },
  {
    id: 'clear-channel',
    name: 'The Clear Channel',
    motif: 'wave',
    theme: 'Flow',
    message:
      'The path is open. Move now, while nothing is in the way — this window will not stay this wide.',
    shadow:
      'An open channel is easy to fill with the wrong traffic. Send what matters through it.',
    chakra: 'throat',
  },
  {
    id: 'nightwatch',
    name: 'The Nightwatch',
    motif: 'crescent',
    theme: 'Endurance',
    message:
      'Today’s work is to stay awake through the quiet dark without panicking. Rest is the task, not the reward.',
    shadow:
      'Keeping watch alone all night is not noble, it is a rota problem. Ask who can take the next hour.',
    chakra: 'crown',
  },
  {
    id: 'crossroads',
    name: 'The Crossroads',
    motif: 'ascend',
    theme: 'Choice',
    message:
      'Both roads go somewhere real. The cost is not picking wrong — it is standing here until the light fades.',
    shadow:
      'You already know which way you are leaning. The deliberation is a way of not admitting it.',
    chakra: 'solar-plexus',
  },
  {
    id: 'hearth',
    name: 'The Hearth',
    motif: 'nested',
    theme: 'Belonging',
    message:
      'Come back to the warm centre. The people and places that know your name are asking for you today.',
    shadow: 'A hearth you never leave stops being a home and becomes a hiding place.',
    chakra: 'heart',
  },
  {
    id: 'meridian',
    name: 'The Meridian',
    motif: 'star',
    theme: 'High noon',
    message:
      'This is the top of the arc — full light, nothing hidden. Do the thing that needs full daylight now.',
    shadow: 'From noon the only way is down, and that is fine. Do not cling to the peak.',
    chakra: 'solar-plexus',
  },
  {
    id: 'quiet-room',
    name: 'The Quiet Room',
    motif: 'descend',
    theme: 'Boundaries',
    message:
      'Close the door for a while. Not everything that is asking is entitled to an answer today.',
    shadow: 'A room locked forever is a different problem. Set a time to open it again.',
    chakra: 'crown',
  },
  {
    id: 'first-light',
    name: 'The First Light',
    motif: 'crescent',
    theme: 'Beginning',
    message:
      'The permission you were waiting for is just the sky getting lighter. Start before you feel ready.',
    shadow: 'First light is thin. Do not expect noon warmth from a thing that only just began.',
    chakra: 'heart',
  },
  {
    id: 'resonant-chord',
    name: 'The Resonant Chord',
    motif: 'wave',
    theme: 'Harmony',
    message:
      'Separate notes you have been carrying suddenly agree. Let yourself feel how good aligned is.',
    shadow: 'A chord held too long stops being music. Let it ring, then let it go.',
    chakra: 'heart',
  },
]

export const ORACLE_POSITIONS = [
  { key: 'ground', label: 'The Ground', prompt: 'what you’re standing on' },
  {
    key: 'current',
    label: 'The Current',
    prompt: 'the charge moving through today',
  },
  {
    key: 'opening',
    label: 'The Opening',
    prompt: 'where the day wants you to lean',
  },
] as const

export type OraclePosition = (typeof ORACLE_POSITIONS)[number]

export interface OracleReading {
  day: string
  fromNatal: boolean
  cards: { position: OraclePosition; card: OracleCard }[]
}

const fnv1a = (str: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

const mulberry32 = (seed: number) => {
  let a = seed >>> 0
  return (): number => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Today's three cards for this chart. Deterministic per chart × day × transit. */
export function drawDailyReading(
  profile: BirthProfile | null,
  transit: AstrologicalTransit | null,
  date: Date = new Date(),
): OracleReading {
  const day = localDayKey(date)
  const seed = fnv1a(
    [day, profile?.utc ?? 'sky-only', transit?.body ?? '', transit?.title ?? ''].join(
      '|',
    ),
  )
  const rand = mulberry32(seed)

  const pool = ORACLE_DECK.map((_, i) => i)
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = pool[i]
    pool[i] = pool[j]
    pool[j] = tmp
  }

  return {
    day,
    fromNatal: profile != null,
    cards: ORACLE_POSITIONS.map((position, i) => ({
      position,
      card: ORACLE_DECK[pool[i]],
    })),
  }
}
