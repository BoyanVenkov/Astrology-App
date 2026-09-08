import type { RewardsKey } from '../en/rewards'

/** Türkçe — seri kilometre taşları ve günlükteki ödül şeridi. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- tebrik şeridi ---- */
  'reward.congrats': 'Tebrikler',
  'reward.streakReached': 'Üst üste {days} gün.',
  'reward.dismiss': 'Ne güzel',
  'reward.keepGoing': 'İpi elden bırakma — “{name}” için {days} gün kaldı.',
  'reward.allEarned':
    'Bütün amblemler kazanıldı. Çark artık senin — sadece döndürmeye devam et.',

  /* ---- kilometre taşı rafı ---- */
  'reward.shelfTitle': 'Kilometre taşları',
  'reward.nextMark': '“{name}” için {days} gün',
  'reward.nextMarkOne': '“{name}” için 1 gün',
  'reward.startStreak': 'Bir seri başlatmak için bugün pratik yap.',
  'reward.bestRun': 'En uzun seri · {days} gün',
  'reward.earnedCount': '{total} amblemden {earned} tanesi kazanıldı',

  /* ---- kilometre taşı adları + kısa notlar ---- */
  'mile.spark': 'İlk kıvılcım',
  'mile.spark.note': 'En zor kısmı artık geride kaldı.',
  'mile.week': 'Yedi gece',
  'mile.week.note': 'Bu artık bir deneme değil, bir pratik.',
  'mile.fortnight': 'İki hafta',
  'mile.fortnight.note': 'Gökyüzü bir tur döndü ve sen de onunla döndün.',
  'mile.root': 'Kök salmış',
  'mile.root.note': 'Artık sana ait hissettirecek kadar uzun.',
  'mile.moon': 'Dolunay',
  'mile.moon.note': 'Ay seninle bütün turunu tamamladı.',
  'mile.ember': 'Kor',
  'mile.ember.note': 'Ateş artık kendini besliyor.',
  'mile.season': 'Bir mevsim',
  'mile.season.note': 'Baştan sona tutulmuş bütün bir mevsim.',
  'mile.halfyear': 'Çarkın yarısı',
  'mile.halfyear.note': 'Yarım yıl boyunca dönmek, gün be gün.',
  'mile.wheel': 'Tam çark',
  'mile.wheel.note': 'Güneşin çevresinde tam tur — her bir gün.',
}
