import type { ChakraKey, SolfeggioFrequency } from '../types/resonance'
import type { MessageKey } from './locales/en'

/* ------------------------------------------------------------------ chakras */

const CHAKRA_META: Record<
  ChakraKey,
  { name: string; note: string; color: string }
> = {
  root: { name: 'Root', note: 'C', color: '#ef4444' },
  sacral: { name: 'Sacral', note: 'D', color: '#f97316' },
  'solar-plexus': { name: 'Solar Plexus', note: 'E', color: '#facc15' },
  heart: { name: 'Heart', note: 'F', color: '#34d399' },
  throat: { name: 'Throat', note: 'G', color: '#38bdf8' },
  'third-eye': { name: 'Third Eye', note: 'A', color: '#6366f1' },
  crown: { name: 'Crown', note: 'B', color: '#a78bfa' },
}

export const chakraName = (key: ChakraKey): string => CHAKRA_META[key].name
export const chakraColor = (key: ChakraKey): string => CHAKRA_META[key].color
export const chakraNote = (key: ChakraKey): string => CHAKRA_META[key].note

/** Root → Crown, base of the spine to the crown of the head. */
export const CHAKRA_ORDER: ChakraKey[] = [
  'root',
  'sacral',
  'solar-plexus',
  'heart',
  'throat',
  'third-eye',
  'crown',
]

const CHAKRA_FREQ: Record<ChakraKey, SolfeggioFrequency> = {
  root: 396,
  sacral: 417,
  'solar-plexus': 528,
  heart: 639,
  throat: 741,
  'third-eye': 852,
  crown: 963,
}

export const chakraFrequency = (key: ChakraKey): SolfeggioFrequency =>
  CHAKRA_FREQ[key]

export interface ChakraInfo {
  key: ChakraKey
  name: string
  color: string
  note: string
  frequency: SolfeggioFrequency
  sanskrit: string
  element: string
  /** Where it sits in the body. */
  location: string
  /** Traditional petal count, for the visualisation. */
  petals: number
  /** One line — what this centre governs. */
  theme: string
}

const CHAKRA_DETAIL: Record<
  ChakraKey,
  Pick<ChakraInfo, 'sanskrit' | 'element' | 'location' | 'petals' | 'theme'>
> = {
  root: {
    sanskrit: 'Muladhara',
    element: 'Earth',
    location: 'Base of the spine',
    petals: 4,
    theme: 'Safety, ground and the will to keep going',
  },
  sacral: {
    sanskrit: 'Svadhisthana',
    element: 'Water',
    location: 'Lower belly',
    petals: 6,
    theme: 'Feeling, flow, pleasure and change',
  },
  'solar-plexus': {
    sanskrit: 'Manipura',
    element: 'Fire',
    location: 'Upper stomach',
    petals: 10,
    theme: 'Will, confidence and personal power',
  },
  heart: {
    sanskrit: 'Anahata',
    element: 'Air',
    location: 'Centre of the chest',
    petals: 12,
    theme: 'Love, connection and compassion',
  },
  throat: {
    sanskrit: 'Vishuddha',
    element: 'Ether',
    location: 'The throat',
    petals: 16,
    theme: 'Voice, truth and expression',
  },
  'third-eye': {
    sanskrit: 'Ajna',
    element: 'Light',
    location: 'The brow',
    petals: 2,
    theme: 'Insight, intuition and inner vision',
  },
  crown: {
    sanskrit: 'Sahasrara',
    element: 'Thought',
    location: 'Crown of the head',
    petals: 12,
    theme: 'Meaning, perspective and the vast',
  },
}

export const chakraInfo = (key: ChakraKey): ChakraInfo => ({
  key,
  name: CHAKRA_META[key].name,
  color: CHAKRA_META[key].color,
  note: CHAKRA_META[key].note,
  frequency: CHAKRA_FREQ[key],
  ...CHAKRA_DETAIL[key],
})

/* ------------------------------------------------------------------ mantras */

/** The short per-chakra mantra, as a catalogue key. Resolve with `t()`. */
export const chakraMantra = (key: ChakraKey): MessageKey =>
  `mantra.short.${key}` as MessageKey

/* ------------------------------------------------------------ zodiac glyphs */

const GLYPHS: Record<string, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
}

// U+FE0E forces the flat text glyph — several sign codepoints (♐ ♑ ♒ …)
// otherwise render as colour emoji on Android / some desktop platforms.
export const zodiacGlyph = (signName: string): string =>
  `${GLYPHS[signName] ?? '✷'}︎`
