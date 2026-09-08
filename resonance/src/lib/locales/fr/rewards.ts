import type { RewardsKey } from '../en/rewards'

/** Français — les paliers de série et le bandeau de récompense du journal. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- le bandeau de félicitations ---- */
  'reward.congrats': 'Félicitations',
  'reward.streakReached': '{days} jours d’affilée.',
  'reward.dismiss': 'Merci',
  'reward.keepGoing': 'Garde le fil : {days} jours avant « {name} ».',
  'reward.allEarned':
    'Tous les emblèmes obtenus. La roue est à toi ; continue simplement de la faire tourner.',

  /* ---- l’étagère des paliers ---- */
  'reward.shelfTitle': 'Paliers',
  'reward.nextMark': '{days} jours avant « {name} »',
  'reward.nextMarkOne': '1 jour avant « {name} »',
  'reward.startStreak': 'Pratique aujourd’hui pour lancer une série.',
  'reward.bestRun': 'Meilleure série · {days} jours',
  'reward.earnedCount': '{earned} sur {total} obtenus',

  /* ---- noms des paliers + notes brèves ---- */
  'mile.spark': 'La première étincelle',
  'mile.spark.note': 'Le plus dur est déjà derrière toi.',
  'mile.week': 'Sept nuits',
  'mile.week.note': 'C’est une pratique maintenant, plus un essai.',
  'mile.fortnight': 'La quinzaine',
  'mile.fortnight.note': 'Le ciel a fait un tour et tu as tourné avec lui.',
  'mile.root': 'Enraciné',
  'mile.root.note': 'Assez longtemps désormais pour que ça te ressemble.',
  'mile.moon': 'Une pleine lune',
  'mile.moon.note': 'La Lune a fait tout son tour avec toi.',
  'mile.ember': 'La braise',
  'mile.ember.note': 'Le feu se maintient tout seul à présent.',
  'mile.season': 'Une saison',
  'mile.season.note': 'Une saison entière, tenue du début à la fin.',
  'mile.halfyear': 'Une demi-roue',
  'mile.halfyear.note': 'Six mois de retour, jour après jour.',
  'mile.wheel': 'La roue complète',
  'mile.wheel.note': 'Le tour entier du soleil — chaque jour, sans exception.',
}
