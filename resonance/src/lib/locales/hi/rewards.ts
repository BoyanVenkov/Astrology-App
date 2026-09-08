import type { RewardsKey } from '../en/rewards'

/** हिन्दी — सिलसिले के पड़ाव और डायरी का इनाम बैनर।
 *  बाकी हिन्दी की तरह इसे भी native speaker से जँचवाना ज़रूरी है। */
export const rewards: Record<RewardsKey, string> = {
  /* ---- बधाई बैनर ---- */
  'reward.congrats': 'बधाई हो',
  'reward.streakReached': 'लगातार {days} दिन।',
  'reward.dismiss': 'बहुत बढ़िया',
  'reward.keepGoing': 'धागा बना रहने दें — "{name}" तक {days} दिन बाकी हैं।',
  'reward.allEarned':
    'सभी निशान मिल गए। यह चक्र अब आपका है — बस इसे घुमाते रहिए।',

  /* ---- पड़ावों की अलमारी ---- */
  'reward.shelfTitle': 'पड़ाव',
  'reward.nextMark': '"{name}" तक {days} दिन',
  'reward.nextMarkOne': '"{name}" तक 1 दिन',
  'reward.startStreak': 'सिलसिला शुरू करने के लिए आज अभ्यास करें।',
  'reward.bestRun': 'सबसे लंबा सिलसिला · {days} दिन',
  'reward.earnedCount': '{total} में से {earned} मिले',

  /* ---- पड़ावों के नाम + एक पंक्ति ---- */
  'mile.spark': 'पहली चिंगारी',
  'mile.spark.note': 'सबसे मुश्किल हिस्सा पीछे छूट चुका है।',
  'mile.week': 'सात रातें',
  'mile.week.note': 'अब यह एक अभ्यास है, कोशिश भर नहीं।',
  'mile.fortnight': 'दो हफ़्ते',
  'mile.fortnight.note': 'आसमान एक बार घूमा और आप उसके साथ घूमे।',
  'mile.root': 'जड़ जमाई',
  'mile.root.note': 'अब इतने दिन हो गए कि यह अपना-सा लगने लगा है।',
  'mile.moon': 'एक पूर्णिमा',
  'mile.moon.note': 'चाँद ने आपके साथ पूरा चक्कर पूरा किया।',
  'mile.ember': 'दहकता अंगारा',
  'mile.ember.note': 'आग अब ख़ुद जलती रहती है।',
  'mile.season': 'एक पूरा मौसम',
  'mile.season.note': 'एक पूरा मौसम, शुरू से आख़िर तक निभाया।',
  'mile.halfyear': 'आधा चक्र',
  'mile.halfyear.note': 'आधे साल की वापसी, दिन-ब-दिन।',
  'mile.wheel': 'पूरा चक्र',
  'mile.wheel.note': 'सूरज के चारों ओर पूरा चक्कर — हर एक दिन।',
}
