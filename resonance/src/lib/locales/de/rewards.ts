import type { RewardsKey } from '../en/rewards'

/** Deutsch — Serien-Meilensteine und das Belohnungsbanner im Tagebuch. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- das Glückwunschbanner ---- */
  'reward.congrats': 'Glückwunsch',
  'reward.streakReached': '{days} Tage in Folge.',
  'reward.dismiss': 'Schön',
  'reward.keepGoing': 'Halt den Faden — {days} Tage bis „{name}“.',
  'reward.allEarned':
    'Alle Embleme verdient. Das Rad gehört dir — jetzt dreh es einfach weiter.',

  /* ---- das Meilenstein-Regal ---- */
  'reward.shelfTitle': 'Meilensteine',
  'reward.nextMark': '{days} Tage bis „{name}“',
  'reward.nextMarkOne': '1 Tag bis „{name}“',
  'reward.startStreak': 'Übe heute, um eine Serie zu starten.',
  'reward.bestRun': 'Längste Serie · {days} Tage',
  'reward.earnedCount': '{earned} von {total} verdient',

  /* ---- Meilenstein-Namen + kurze Notizen ---- */
  'mile.spark': 'Der erste Funke',
  'mile.spark.note': 'Das Schwerste liegt schon hinter dir.',
  'mile.week': 'Sieben Nächte',
  'mile.week.note': 'Jetzt ist es eine Praxis, kein Versuch mehr.',
  'mile.fortnight': 'Die zwei Wochen',
  'mile.fortnight.note': 'Der Himmel hat sich einmal gedreht, und du hast dich mitgedreht.',
  'mile.root': 'Verwurzelt',
  'mile.root.note': 'Lang genug, dass es sich nach deinem anfühlt.',
  'mile.moon': 'Ein Vollmond',
  'mile.moon.note': 'Der Mond hat mit dir die ganze Runde gemacht.',
  'mile.ember': 'Die Glut',
  'mile.ember.note': 'Das Feuer hält sich jetzt von selbst.',
  'mile.season': 'Eine Jahreszeit',
  'mile.season.note': 'Eine ganze Jahreszeit, von Anfang bis Ende gehalten.',
  'mile.halfyear': 'Das halbe Rad',
  'mile.halfyear.note': 'Ein halbes Jahr Wiederkehr, Tag für Tag.',
  'mile.wheel': 'Das ganze Rad',
  'mile.wheel.note': 'Einmal ganz um die Sonne — an jedem einzelnen Tag.',
}
