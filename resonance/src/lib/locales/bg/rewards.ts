import type { RewardsKey } from '../en/rewards'

/** Български — етапи на редицата и наградният банер в дневника. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- банерът за поздравление ---- */
  'reward.congrats': 'Поздравления',
  'reward.streakReached': '{days} поредни дни.',
  'reward.dismiss': 'Прекрасно',
  'reward.keepGoing': 'Задръж нишката — {days} дни до „{name}“.',
  'reward.allEarned':
    'Всички знаци са спечелени. Колелото е твое — сега просто продължавай да го въртиш.',

  /* ---- лавицата с етапите ---- */
  'reward.shelfTitle': 'Етапи',
  'reward.nextMark': '{days} дни до „{name}“',
  'reward.nextMarkOne': '1 ден до „{name}“',
  'reward.startStreak': 'Практикувай днес, за да започнеш редица.',
  'reward.bestRun': 'Най-дълга редица · {days} дни',
  'reward.earnedCount': '{earned} от {total} спечелени',

  /* ---- имена на етапите + кратки бележки ---- */
  'mile.spark': 'Първата искра',
  'mile.spark.note': 'Най-трудното вече е зад гърба ти.',
  'mile.week': 'Седем нощи',
  'mile.week.note': 'Вече е практика, а не опит.',
  'mile.fortnight': 'Двете седмици',
  'mile.fortnight.note': 'Небето се завъртя веднъж и ти се завъртя с него.',
  'mile.root': 'Вкоренен',
  'mile.root.note': 'Достатъчно дълго, за да усещаш, че е твое.',
  'mile.moon': 'Пълна луна',
  'mile.moon.note': 'Луната мина целия си кръг с теб.',
  'mile.ember': 'Жарта',
  'mile.ember.note': 'Огънят вече се поддържа сам.',
  'mile.season': 'Цял сезон',
  'mile.season.note': 'Цял сезон, спазен от начало до край.',
  'mile.halfyear': 'Половин колело',
  'mile.halfyear.note': 'Половин година завръщане, ден след ден.',
  'mile.wheel': 'Пълното колело',
  'mile.wheel.note': 'Целият път около слънцето — всеки един ден.',
}
