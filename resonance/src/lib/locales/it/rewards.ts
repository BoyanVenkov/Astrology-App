import type { RewardsKey } from '../en/rewards'

/** Italiano — le tappe della serie e l'avviso di ricompensa del diario. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- l'avviso di congratulazioni ---- */
  'reward.congrats': 'Complimenti',
  'reward.streakReached': '{days} giorni di fila.',
  'reward.dismiss': 'Che bello',
  'reward.keepGoing': 'Tieni il filo: {days} giorni a «{name}».',
  'reward.allEarned':
    'Tutti gli emblemi ottenuti. La ruota è tua: ora continua solo a farla girare.',

  /* ---- la mensola delle tappe ---- */
  'reward.shelfTitle': 'Tappe',
  'reward.nextMark': '{days} giorni a «{name}»',
  'reward.nextMarkOne': '1 giorno a «{name}»',
  'reward.startStreak': 'Pratica oggi per iniziare una serie.',
  'reward.bestRun': 'Serie migliore · {days} giorni',
  'reward.earnedCount': '{earned} di {total} ottenuti',

  /* ---- nomi delle tappe + note brevi ---- */
  'mile.spark': 'La prima scintilla',
  'mile.spark.note': 'La parte più difficile è già alle tue spalle.',
  'mile.week': 'Sette notti',
  'mile.week.note': 'Ora è una pratica, non un tentativo.',
  'mile.fortnight': 'Le due settimane',
  'mile.fortnight.note': 'Il cielo ha fatto un giro e tu hai girato con lui.',
  'mile.root': 'Radicato',
  'mile.root.note': 'Ormai da abbastanza tempo da sentirlo tuo.',
  'mile.moon': 'Una luna piena',
  'mile.moon.note': 'La Luna ha fatto tutto il giro insieme a te.',
  'mile.ember': 'La brace',
  'mile.ember.note': 'Il fuoco ora si tiene acceso da solo.',
  'mile.season': 'Una stagione',
  'mile.season.note': "Un'intera stagione, tenuta dall'inizio alla fine.",
  'mile.halfyear': 'Mezza ruota',
  'mile.halfyear.note': 'Mezzo anno di ritorni, giorno dopo giorno.',
  'mile.wheel': 'La ruota completa',
  'mile.wheel.note': 'Tutto il giro attorno al sole, ogni singolo giorno.',
}
