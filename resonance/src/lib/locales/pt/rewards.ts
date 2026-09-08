import type { RewardsKey } from '../en/rewards'

/** Português (BR) — marcos da sequência e o aviso de recompensa no diário. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- o aviso de parabéns ---- */
  'reward.congrats': 'Parabéns',
  'reward.streakReached': '{days} dias seguidos.',
  'reward.dismiss': 'Que bom',
  'reward.keepGoing': 'Mantenha o fio — {days} dias até "{name}".',
  'reward.allEarned':
    'Todos os emblemas conquistados. A roda é sua; agora é só continuar girando.',

  /* ---- a prateleira de marcos ---- */
  'reward.shelfTitle': 'Marcos',
  'reward.nextMark': '{days} dias até "{name}"',
  'reward.nextMarkOne': '1 dia até "{name}"',
  'reward.startStreak': 'Pratique hoje para começar uma sequência.',
  'reward.bestRun': 'Melhor sequência · {days} dias',
  'reward.earnedCount': '{earned} de {total} conquistados',

  /* ---- nomes dos marcos + notas curtas ---- */
  'mile.spark': 'A primeira faísca',
  'mile.spark.note': 'A parte mais difícil já ficou para trás.',
  'mile.week': 'Sete noites',
  'mile.week.note': 'Agora é uma prática, não uma tentativa.',
  'mile.fortnight': 'A quinzena',
  'mile.fortnight.note': 'O céu deu uma volta e você girou junto.',
  'mile.root': 'Enraizado',
  'mile.root.note': 'Já faz tempo o suficiente para parecer seu.',
  'mile.moon': 'Uma lua cheia',
  'mile.moon.note': 'A Lua deu a volta inteira com você.',
  'mile.ember': 'A brasa',
  'mile.ember.note': 'O fogo se mantém aceso sozinho agora.',
  'mile.season': 'Uma estação',
  'mile.season.note': 'Uma estação inteira, mantida do início ao fim.',
  'mile.halfyear': 'Meia roda',
  'mile.halfyear.note': 'Meio ano voltando, dia após dia.',
  'mile.wheel': 'A roda completa',
  'mile.wheel.note': 'A volta inteira ao redor do sol — todos os dias.',
}
