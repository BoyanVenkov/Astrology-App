/** The Oracle AI tab — a Claude-written personalised reading (Pro). */
export const oracle = {
  'oracle.eyebrow': 'Oracle AI',
  'oracle.title': 'A reading, written for you',
  'oracle.blurb':
    "Not a generic horoscope — Claude reads today's transits against your own chart and tells you what they actually mean for you today.",
  'oracle.teaserSample1':
    '"Mercury opposite your Moon sharpens old arguments today — this isn\'t the day to relitigate them."',
  'oracle.teaserSample2':
    '"Venus easing into your fourth house softens a home matter you\'ve been avoiding."',
  'oracle.unlock': 'Unlock Oracle AI',
  'oracle.reason': 'Oracle AI — your personalised reading',
  'oracle.consult': 'Consult the Oracle',
  'oracle.consultAgain': 'Ask again',
  'oracle.loading': 'Reading the sky for you…',
  'oracle.remaining': '{n} readings left today',
  'oracle.remainingOne': '1 reading left today',
  'oracle.noneLeft': 'You\'ve used today\'s readings — back tomorrow',
  'oracle.errorGeneric': 'The Oracle is quiet right now — try again in a moment.',
  'oracle.generatedAt': 'Read at {time}',
  'oracle.addBirth': 'Add your birth details for a fully personal reading →',
} as const

export type OracleKey = keyof typeof oracle
