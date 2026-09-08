import type { RewardsKey } from '../en/rewards'

/** Kiswahili — hatua za mfululizo na bango la zawadi kwenye shajara. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- bango la pongezi ---- */
  'reward.congrats': 'Hongera',
  'reward.streakReached': 'Siku {days} mfululizo.',
  'reward.dismiss': 'Vizuri',
  'reward.keepGoing': 'Endelea kushika uzi — siku {days} hadi “{name}”.',
  'reward.allEarned':
    'Nembo zote zimepatikana. Gurudumu ni lako — sasa endelea tu kulizungusha.',

  /* ---- rafu ya hatua ---- */
  'reward.shelfTitle': 'Hatua',
  'reward.nextMark': 'Siku {days} hadi “{name}”',
  'reward.nextMarkOne': 'Siku 1 hadi “{name}”',
  'reward.startStreak': 'Fanya mazoezi leo ili kuanza mfululizo.',
  'reward.bestRun': 'Mfululizo bora · siku {days}',
  'reward.earnedCount': '{earned} kati ya {total} zimepatikana',

  /* ---- majina ya hatua + maelezo mafupi ---- */
  'mile.spark': 'Cheche ya kwanza',
  'mile.spark.note': 'Sehemu ngumu zaidi tayari iko nyuma yako.',
  'mile.week': 'Usiku saba',
  'mile.week.note': 'Sasa ni mazoezi, si jaribio.',
  'mile.fortnight': 'Wiki mbili',
  'mile.fortnight.note': 'Anga limezunguka mara moja, nawe umezunguka nalo.',
  'mile.root': 'Umejikita',
  'mile.root.note': 'Muda wa kutosha sasa hivi kwamba unahisi ni wako.',
  'mile.moon': 'Mwezi mpevu',
  'mile.moon.note': 'Mwezi umekamilisha mzunguko wake wote nawe.',
  'mile.ember': 'Kaa la moto',
  'mile.ember.note': 'Moto sasa unajiwasha wenyewe.',
  'mile.season': 'Msimu mzima',
  'mile.season.note': 'Msimu mzima, umeshikwa toka mwanzo hadi mwisho.',
  'mile.halfyear': 'Nusu ya gurudumu',
  'mile.halfyear.note': 'Nusu mwaka wa kurudi, siku baada ya siku.',
  'mile.wheel': 'Gurudumu kamili',
  'mile.wheel.note': 'Mzunguko mzima wa jua — kila siku moja.',
}
