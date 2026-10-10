import type { SpreadReadingKey } from '../en/spreadReading'

/** Svenska — syntes av hela tarotläggningen. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Läsa hela läggningen',
  'sp.throughline': 'Den här läsningen lutar mot {dominant}. {tone}',
  'sp.dominant.major': 'stora, ödesbundna vändpunkter',
  'sp.dominant.wands': 'handling och fart',
  'sp.dominant.cups': 'känsla och samhörighet',
  'sp.dominant.swords': 'tanke, sanning och konflikt',
  'sp.dominant.pentacles': 'det praktiska och det materiella',
  'sp.tone.rising':
    'Korten lutar till fördel här — mer öppnar sig än gör motstånd.',
  'sp.tone.testing':
    'Den här läggningen ber om något. Just nu finns det mer friktion än flöde, men friktion värd att möta.',
  'sp.tone.mixed':
    'En genuint blandad hand — äkta stöd ligger precis bredvid äkta motstånd. Inget här är enkelt, och det är ärligt så.',
  'sp.tone.steady':
    'En lugn, jämn hand. Ingen stark knuff åt något håll — det här handlar om stadga, inte drama.',
  'sp.three.arc':
    'Det började med {past}, möter dig nu vid {present}, och rör sig mot {future}.',
  'sp.cross.aligned':
    'Det som utmanar här arbetar faktiskt tillsammans med sakens kärna, inte emot den.',
  'sp.cross.opposed':
    'Det som utmanar här drar emot sakens kärna — vänta dig verklig spänning innan det löser sig.',
  'sp.cross.neutral':
    'Utmaningen och sakens kärna ligger sida vid sida, utan att varken hjälpa eller skada varandra.',
}
