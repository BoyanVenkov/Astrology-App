import type { RewardsKey } from '../en/rewards'

/** Polski — kamienie milowe serii i baner nagrody w dzienniku.
 *  Wymaga korekty native speakera, jak reszta polskiego. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- baner z gratulacjami ---- */
  'reward.congrats': 'Gratulacje',
  'reward.streakReached': '{days} dni z rzędu.',
  'reward.dismiss': 'Wspaniale',
  'reward.keepGoing': 'Trzymaj nić — {days} dni do „{name}”.',
  'reward.allEarned':
    'Wszystkie odznaki zdobyte. Koło jest twoje — teraz po prostu obracaj je dalej.',

  /* ---- półka z kamieniami milowymi ---- */
  'reward.shelfTitle': 'Kamienie milowe',
  'reward.nextMark': '{days} dni do „{name}”',
  'reward.nextMarkOne': '1 dzień do „{name}”',
  'reward.startStreak': 'Poćwicz dziś, aby rozpocząć serię.',
  'reward.bestRun': 'Najdłuższa seria · {days} dni',
  'reward.earnedCount': '{earned} z {total} zdobytych',

  /* ---- nazwy kamieni milowych + krótkie notki ---- */
  'mile.spark': 'Pierwsza iskra',
  'mile.spark.note': 'Najtrudniejsze jest już za tobą.',
  'mile.week': 'Siedem nocy',
  'mile.week.note': 'To już praktyka, a nie próba.',
  'mile.fortnight': 'Dwa tygodnie',
  'mile.fortnight.note': 'Niebo obróciło się raz, a ty obróciłeś się razem z nim.',
  'mile.root': 'Zakorzeniony',
  'mile.root.note': 'Już wystarczająco długo, by czuć, że jest twoje.',
  'mile.moon': 'Pełnia',
  'mile.moon.note': 'Księżyc przeszedł z tobą cały krąg.',
  'mile.ember': 'Żar',
  'mile.ember.note': 'Ogień podtrzymuje się teraz sam.',
  'mile.season': 'Cała pora roku',
  'mile.season.note': 'Cała pora roku, dotrzymana od początku do końca.',
  'mile.halfyear': 'Pół koła',
  'mile.halfyear.note': 'Pół roku powrotów, dzień po dniu.',
  'mile.wheel': 'Pełne koło',
  'mile.wheel.note': 'Całe okrążenie słońca — każdego dnia.',
}
