import type { RewardsKey } from '../en/rewards'

/** Español — hitos de la racha y el aviso de recompensa del diario. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- el aviso de felicitación ---- */
  'reward.congrats': 'Enhorabuena',
  'reward.streakReached': '{days} días seguidos.',
  'reward.dismiss': 'Precioso',
  'reward.keepGoing': 'Mantén el hilo: {days} días hasta «{name}».',
  'reward.allEarned':
    'Todos los emblemas conseguidos. La rueda es tuya; ahora solo sigue girándola.',

  /* ---- el estante de hitos ---- */
  'reward.shelfTitle': 'Hitos',
  'reward.nextMark': '{days} días hasta «{name}»',
  'reward.nextMarkOne': '1 día hasta «{name}»',
  'reward.startStreak': 'Practica hoy para empezar una racha.',
  'reward.bestRun': 'Mejor racha · {days} días',
  'reward.earnedCount': '{earned} de {total} conseguidos',

  /* ---- nombres de los hitos + notas breves ---- */
  'mile.spark': 'La primera chispa',
  'mile.spark.note': 'Lo más difícil ya lo has dejado atrás.',
  'mile.week': 'Siete noches',
  'mile.week.note': 'Ahora es una práctica, no un intento.',
  'mile.fortnight': 'La quincena',
  'mile.fortnight.note': 'El cielo ha dado una vuelta y tú has girado con él.',
  'mile.root': 'Con raíces',
  'mile.root.note': 'Ya llevas lo suficiente como para sentirlo tuyo.',
  'mile.moon': 'Una luna llena',
  'mile.moon.note': 'La Luna ha dado toda la vuelta contigo.',
  'mile.ember': 'La brasa',
  'mile.ember.note': 'El fuego ya se mantiene solo.',
  'mile.season': 'Una estación',
  'mile.season.note': 'Una estación entera, de principio a fin.',
  'mile.halfyear': 'Media rueda',
  'mile.halfyear.note': 'Medio año de volver, día tras día.',
  'mile.wheel': 'La rueda completa',
  'mile.wheel.note': 'La vuelta entera al sol, cada uno de los días.',
}
