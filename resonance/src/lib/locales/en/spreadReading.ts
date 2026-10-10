/**
 * The whole-spread synthesis for multi-card tarot draws — reading the
 * three-card and Celtic Cross spreads as one connected picture, not just
 * card by card. English-only for now; other locales fall back per-key.
 */
export const spreadReading = {
  'sp.reading.heading': 'Reading the whole spread',
  'sp.throughline': 'This reading leans toward {dominant}. {tone}',
  'sp.dominant.major': 'big, fated turning points',
  'sp.dominant.wands': 'action and momentum',
  'sp.dominant.cups': 'feeling and connection',
  'sp.dominant.swords': 'thought, truth and conflict',
  'sp.dominant.pentacles': 'the practical and the material',
  'sp.tone.rising':
    'The cards are leaning in your favour here — more is opening up than resisting.',
  'sp.tone.testing':
    "This spread is asking something of you. There's more friction than flow right now, but it's friction worth meeting.",
  'sp.tone.mixed':
    "A genuinely mixed hand — real support sits right next to real resistance. Nothing here is simple, and that's honest.",
  'sp.tone.steady':
    'A quiet, even hand. No strong push either way — this is about steadiness, not drama.',
  'sp.three.arc':
    'It began with {past}, meets you now at {present}, and is moving toward {future}.',
  'sp.cross.aligned':
    "What's challenging you here is actually working with the heart of the matter, not against it.",
  'sp.cross.opposed':
    "What's challenging you here is pulling against the heart of the matter — expect real tension before this resolves.",
  'sp.cross.neutral':
    'The challenge and the heart of the matter sit side by side, neither helping nor hurting each other.',
} as const

export type SpreadReadingKey = keyof typeof spreadReading
