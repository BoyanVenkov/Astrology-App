import type { SpreadReadingKey } from '../en/spreadReading'

/** Deutsch — Synthese des gesamten Tarot-Legesystems. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Das ganze Legesystem lesen',
  'sp.throughline': 'Diese Lesung neigt sich zu {dominant}. {tone}',
  'sp.dominant.major': 'große, schicksalhafte Wendepunkte',
  'sp.dominant.wands': 'Handeln und Schwung',
  'sp.dominant.cups': 'Gefühl und Verbindung',
  'sp.dominant.swords': 'Gedanken, Wahrheit und Konflikt',
  'sp.dominant.pentacles': 'das Praktische und das Materielle',
  'sp.tone.rising':
    'Die Karten neigen sich hier zu deinen Gunsten — mehr öffnet sich, als sich widersetzt.',
  'sp.tone.testing':
    'Dieses Legesystem verlangt etwas von dir. Gerade gibt es mehr Reibung als Fluss, aber eine Reibung, der zu begegnen sich lohnt.',
  'sp.tone.mixed':
    'Eine wirklich gemischte Hand — echte Unterstützung steht direkt neben echtem Widerstand. Hier ist nichts einfach, und das ist ehrlich so.',
  'sp.tone.steady':
    'Eine ruhige, ausgeglichene Hand. Kein starker Schub in eine Richtung — hier geht es um Beständigkeit, nicht um Drama.',
  'sp.three.arc':
    'Es begann mit {past}, trifft dich jetzt bei {present}, und bewegt sich auf {future} zu.',
  'sp.cross.aligned':
    'Was hier herausfordert, arbeitet tatsächlich mit dem Kern der Sache zusammen, nicht gegen ihn.',
  'sp.cross.opposed':
    'Was hier herausfordert, zieht gegen den Kern der Sache — erwarte echte Spannung, bevor sich das auflöst.',
  'sp.cross.neutral':
    'Die Herausforderung und der Kern der Sache stehen nebeneinander, ohne sich zu helfen oder zu schaden.',
}
