import type { ChakraKey } from '../types/resonance'
import type { MessageKey } from './locales/en'
import type { TFn } from './i18n'
import mountain from '../assets/art/yoga/mountain.webp'
import warrior2 from '../assets/art/yoga/warrior-2.webp'
import garland from '../assets/art/yoga/garland.webp'
import boundAngle from '../assets/art/yoga/bound-angle.webp'
import goddess from '../assets/art/yoga/goddess.webp'
import lowLunge from '../assets/art/yoga/low-lunge.webp'
import boat from '../assets/art/yoga/boat.webp'
import seatedTwist from '../assets/art/yoga/seated-twist.webp'
import warrior1 from '../assets/art/yoga/warrior-1.webp'
import cobra from '../assets/art/yoga/cobra.webp'
import camel from '../assets/art/yoga/camel.webp'
import catCow from '../assets/art/yoga/cat-cow.webp'
import fish from '../assets/art/yoga/fish.webp'
import bridge from '../assets/art/yoga/bridge.webp'
import child from '../assets/art/yoga/child.webp'
import downDog from '../assets/art/yoga/down-dog.webp'
import easySeat from '../assets/art/yoga/easy-seat.webp'
import tree from '../assets/art/yoga/tree.webp'
import corpse from '../assets/art/yoga/corpse.webp'

/**
 * Yoga for the chakras — two or three classic, beginner-safe poses per centre, held with slow
 * breath. Inversions (shoulder stand, plough, headstand) are left out on purpose: they're not
 * something to learn alone from a phone. The art is generated as light on black
 * (scripts/assets/yoga-poses.mjs), with its alpha taken from its brightness, so it sits on any surface.
 */
export type YogaPoseKey =
  | 'mountain' | 'warrior-2' | 'garland'
  | 'bound-angle' | 'goddess' | 'low-lunge'
  | 'boat' | 'seated-twist' | 'warrior-1'
  | 'cobra' | 'camel' | 'cat-cow'
  | 'fish' | 'bridge'
  | 'child' | 'down-dog'
  | 'easy-seat' | 'tree' | 'corpse'

export interface YogaPose {
  key: YogaPoseKey
  sanskrit: string
  art: string
  /** Seconds to hold (per side, when `sides`). */
  hold: number
  /** Held on the right, then the left (the art is mirrored for the second side). */
  sides?: boolean
  /** Has a "skip this if…" note. */
  caution?: boolean
}

export const YOGA_POSES: Record<YogaPoseKey, YogaPose> = {
  mountain: { key: 'mountain', sanskrit: 'Tadasana', art: mountain, hold: 45 },
  'warrior-2': { key: 'warrior-2', sanskrit: 'Virabhadrasana II', art: warrior2, hold: 40, sides: true },
  garland: { key: 'garland', sanskrit: 'Malasana', art: garland, hold: 60, caution: true },
  'bound-angle': { key: 'bound-angle', sanskrit: 'Baddha Konasana', art: boundAngle, hold: 60 },
  goddess: { key: 'goddess', sanskrit: 'Utkata Konasana', art: goddess, hold: 45 },
  'low-lunge': { key: 'low-lunge', sanskrit: 'Anjaneyasana', art: lowLunge, hold: 40, sides: true },
  boat: { key: 'boat', sanskrit: 'Navasana', art: boat, hold: 35, caution: true },
  'seated-twist': { key: 'seated-twist', sanskrit: 'Ardha Matsyendrasana', art: seatedTwist, hold: 45, sides: true },
  'warrior-1': { key: 'warrior-1', sanskrit: 'Virabhadrasana I', art: warrior1, hold: 40, sides: true },
  cobra: { key: 'cobra', sanskrit: 'Bhujangasana', art: cobra, hold: 40 },
  camel: { key: 'camel', sanskrit: 'Ustrasana', art: camel, hold: 35, caution: true },
  'cat-cow': { key: 'cat-cow', sanskrit: 'Marjaryasana–Bitilasana', art: catCow, hold: 60 },
  fish: { key: 'fish', sanskrit: 'Matsyasana', art: fish, hold: 40, caution: true },
  bridge: { key: 'bridge', sanskrit: 'Setu Bandhasana', art: bridge, hold: 45, caution: true },
  child: { key: 'child', sanskrit: 'Balasana', art: child, hold: 60 },
  'down-dog': { key: 'down-dog', sanskrit: 'Adho Mukha Svanasana', art: downDog, hold: 45, caution: true },
  'easy-seat': { key: 'easy-seat', sanskrit: 'Sukhasana', art: easySeat, hold: 75 },
  tree: { key: 'tree', sanskrit: 'Vrikshasana', art: tree, hold: 40, sides: true },
  corpse: { key: 'corpse', sanskrit: 'Savasana', art: corpse, hold: 120 },
}

/** Each centre's flow, in the order it's practised. */
export const YOGA_FLOWS: Record<ChakraKey, YogaPoseKey[]> = {
  root: ['mountain', 'warrior-2', 'garland'],
  sacral: ['bound-angle', 'goddess', 'low-lunge'],
  'solar-plexus': ['warrior-1', 'seated-twist', 'boat'],
  heart: ['cat-cow', 'cobra', 'camel'],
  throat: ['bridge', 'fish'],
  'third-eye': ['down-dog', 'child'],
  crown: ['tree', 'easy-seat', 'corpse'],
}

/** The two-pose flows run through twice, so every flow is a real few minutes. */
export const YOGA_ROUNDS: Partial<Record<ChakraKey, number>> = { throat: 2, 'third-eye': 2 }

/** Seconds of "get ready" before each hold. */
export const YOGA_PREP_SECONDS = 6

/** One timed hold in a flow — a pose, or one side of it. */
export interface YogaStep {
  pose: YogaPose
  side?: 'right' | 'left'
}

export function yogaSteps(chakra: ChakraKey): YogaStep[] {
  const round = YOGA_FLOWS[chakra].flatMap((k) => {
    const pose = YOGA_POSES[k]
    return pose.sides ? [{ pose, side: 'right' as const }, { pose, side: 'left' as const }] : [{ pose }]
  })
  return Array.from({ length: YOGA_ROUNDS[chakra] ?? 1 }, () => round).flat()
}

/** Whole minutes the flow takes, prep included (rounded, never under 1). */
export function yogaFlowMinutes(chakra: ChakraKey): number {
  const secs = yogaSteps(chakra).reduce((s, st) => s + st.pose.hold + YOGA_PREP_SECONDS, 0)
  return Math.max(1, Math.round(secs / 60))
}

export const poseName = (key: YogaPoseKey, t: TFn): string => t(`yoga.pose.${key}.name` as MessageKey)
export const poseCues = (key: YogaPoseKey, t: TFn): string[] =>
  [0, 1].map((i) => t(`yoga.pose.${key}.cue.${i}` as MessageKey))
export const poseCaution = (key: YogaPoseKey, t: TFn): string | null =>
  YOGA_POSES[key].caution ? t(`yoga.pose.${key}.caution` as MessageKey) : null
