import type { RewardsKey } from '../en/rewards'

/** العربية (فصحى) — محطّات المواظبة ولافتة المكافأة في المفكّرة.
 *  تحتاج مراجعة متحدّث أصلي مثل باقي العربية. */
export const rewards: Record<RewardsKey, string> = {
  /* ---- لافتة التهنئة ---- */
  'reward.congrats': 'تهانينا',
  'reward.streakReached': '{days} أيام متتالية.',
  'reward.dismiss': 'جميل',
  'reward.keepGoing': 'حافظ على الخيط — {days} أيام حتى «{name}».',
  'reward.allEarned':
    'حصلت على كل الشارات. العجلة لك الآن — واصِل إدارتها فحسب.',

  /* ---- رفّ المحطّات ---- */
  'reward.shelfTitle': 'المحطّات',
  'reward.nextMark': '{days} أيام حتى «{name}»',
  'reward.nextMarkOne': 'يوم واحد حتى «{name}»',
  'reward.startStreak': 'مارِس اليوم لتبدأ سلسلة مواظبة.',
  'reward.bestRun': 'أطول سلسلة · {days} أيام',
  'reward.earnedCount': '{earned} من {total}',

  /* ---- أسماء المحطّات + سطر واحد ---- */
  'mile.spark': 'الشرارة الأولى',
  'mile.spark.note': 'أصعب جزء صار خلفك بالفعل.',
  'mile.week': 'سبع ليالٍ',
  'mile.week.note': 'صارت ممارسةً الآن، لا مجرّد محاولة.',
  'mile.fortnight': 'الأسبوعان',
  'mile.fortnight.note': 'دارت السماء دورةً، ودُرتَ معها.',
  'mile.root': 'متجذّر',
  'mile.root.note': 'مضى وقتٌ كافٍ حتى صرتَ تشعر أنها لك.',
  'mile.moon': 'بدرٌ كامل',
  'mile.moon.note': 'أتمّ القمر دورته كلها معك.',
  'mile.ember': 'الجمرة',
  'mile.ember.note': 'صارت النار تُبقي نفسها مشتعلةً وحدها.',
  'mile.season': 'فصلٌ كامل',
  'mile.season.note': 'فصلٌ كامل، حُفِظ من أوّله إلى آخره.',
  'mile.halfyear': 'نصف العجلة',
  'mile.halfyear.note': 'نصف عامٍ من العودة، يومًا بعد يوم.',
  'mile.wheel': 'العجلة كاملة',
  'mile.wheel.note': 'دورةٌ كاملة حول الشمس — كلَّ يومٍ دون استثناء.',
}
