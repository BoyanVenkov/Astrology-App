import type { ChakraKey } from '../types/resonance'

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

/* ------------------------------------------------------------------ mantras */

/** The day's short mantra — one per chakra centre, used app-wide. */
const CHAKRA_MANTRA: Record<ChakraKey, string> = {
  root: 'I am safe, supported and here.',
  sacral: 'I let life move through me.',
  'solar-plexus': 'I trust my own fire.',
  heart: 'I give and receive love freely.',
  throat: 'I speak my truth with ease.',
  'third-eye': 'I trust what I see within.',
  crown: 'I am part of something vast.',
}

export const chakraMantra = (key: ChakraKey): string => CHAKRA_MANTRA[key]

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
