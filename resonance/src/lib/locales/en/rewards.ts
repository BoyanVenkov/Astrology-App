/**
 * Streak milestones & the Journal reward banner. English-complete; other
 * locales fall back here per-key until they ship their own `rewards.ts`.
 */
export const rewards = {
  /* ---- the celebration banner ---- */
  'reward.congrats': 'Congratulations',
  'reward.streakReached': '{days} days in a row.',
  'reward.dismiss': 'Lovely',
  'reward.keepGoing': 'Keep the thread going — {days} days to {name}.',
  'reward.allEarned': "Every emblem earned. The wheel is yours — now just keep turning it.",

  /* ---- the milestone shelf ---- */
  'reward.shelfTitle': 'Milestones',
  'reward.nextMark': '{days} days to {name}',
  'reward.nextMarkOne': '1 day to {name}',
  'reward.startStreak': 'Practise today to begin a streak.',
  'reward.bestRun': 'Best run · {days} days',
  'reward.earnedCount': '{earned} of {total} earned',

  /* ---- milestone names + one-line notes ---- */
  'mile.spark': 'First Spark',
  'mile.spark.note': 'The hardest part is already behind you.',
  'mile.week': 'Seven Nights',
  'mile.week.note': 'A practice now, not an attempt.',
  'mile.fortnight': 'The Fortnight',
  'mile.fortnight.note': 'The sky has turned once, and you turned with it.',
  'mile.root': 'Rooted',
  'mile.root.note': 'Long enough now that it feels like yours.',
  'mile.moon': 'A Full Moon',
  'mile.moon.note': 'One whole lunar round of showing up.',
  'mile.ember': 'The Ember',
  'mile.ember.note': 'The fire keeps itself lit now.',
  'mile.season': 'A Season',
  'mile.season.note': 'A quarter of the year, kept.',
  'mile.halfyear': 'Half the Wheel',
  'mile.halfyear.note': 'Half a year of returning, day after day.',
  'mile.wheel': 'The Full Wheel',
  'mile.wheel.note': 'All the way around the sun — every single day.',
} as const
