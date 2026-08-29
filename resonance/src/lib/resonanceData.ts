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

export const zodiacGlyph = (signName: string): string => GLYPHS[signName] ?? '✷'
