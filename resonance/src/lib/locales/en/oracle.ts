/** The AI Horoscope screen (branded "Oracle AI") — a Claude-written personalised reading (Pro). */
export const oracle = {
  'oracle.eyebrow': 'AI Horoscope',
  'oracle.title': 'Your horoscope, written by AI — just for you',
  'oracle.blurb':
    "Not a generic horoscope — Claude reads today's transits against your own chart and tells you what they actually mean for you today.",
  'oracle.teaserSample1':
    '"Mercury opposite your Moon sharpens old arguments today — this isn\'t the day to relitigate them."',
  'oracle.teaserSample2':
    '"Venus easing into your fourth house softens a home matter you\'ve been avoiding."',
  'oracle.unlock': 'Unlock AI Horoscope',
  'oracle.reason': 'AI Horoscope — a personalised reading, written for you',
  'oracle.consult': 'Get my AI horoscope',
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
