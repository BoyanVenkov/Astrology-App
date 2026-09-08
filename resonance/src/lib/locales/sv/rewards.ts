import type { RewardsKey } from '../en/rewards'

/** Svenska — sviternas milstolpar och belöningsbannern i dagboken. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- gratulationsbannern ---- */
  'reward.congrats': 'Grattis',
  'reward.streakReached': '{days} dagar i rad.',
  'reward.dismiss': 'Fint',
  'reward.keepGoing': 'Håll i tråden — {days} dagar till ”{name}”.',
  'reward.allEarned':
    'Alla emblem intjänade. Hjulet är ditt — fortsätt bara att snurra det.',

  /* ---- milstolpshyllan ---- */
  'reward.shelfTitle': 'Milstolpar',
  'reward.nextMark': '{days} dagar till ”{name}”',
  'reward.nextMarkOne': '1 dag till ”{name}”',
  'reward.startStreak': 'Öva idag för att börja en svit.',
  'reward.bestRun': 'Längsta svit · {days} dagar',
  'reward.earnedCount': '{earned} av {total} intjänade',

  /* ---- milstolparnas namn + korta rader ---- */
  'mile.spark': 'Första gnistan',
  'mile.spark.note': 'Det svåraste ligger redan bakom dig.',
  'mile.week': 'Sju nätter',
  'mile.week.note': 'Nu är det en praktik, inte ett försök.',
  'mile.fortnight': 'De två veckorna',
  'mile.fortnight.note': 'Himlen har vänt ett varv och du vände med den.',
  'mile.root': 'Rotad',
  'mile.root.note': 'Tillräckligt länge nu för att kännas som din.',
  'mile.moon': 'En fullmåne',
  'mile.moon.note': 'Månen har gått hela varvet med dig.',
  'mile.ember': 'Glöden',
  'mile.ember.note': 'Elden håller sig tänd av sig själv nu.',
  'mile.season': 'En årstid',
  'mile.season.note': 'En hel årstid, hållen från början till slut.',
  'mile.halfyear': 'Halva hjulet',
  'mile.halfyear.note': 'Ett halvår av återvändande, dag efter dag.',
  'mile.wheel': 'Hela hjulet',
  'mile.wheel.note': 'Hela varvet runt solen — varenda dag.',
}
