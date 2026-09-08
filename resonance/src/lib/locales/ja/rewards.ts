import type { RewardsKey } from '../en/rewards'

/** 日本語 — 連続記録のマイルストーンと日記の達成バナー。です・ます調。 */
export const rewards: Record<RewardsKey, string> = {
  /* ---- お祝いバナー ---- */
  'reward.congrats': 'おめでとうございます',
  'reward.streakReached': '{days}日連続です。',
  'reward.dismiss': 'すてき',
  'reward.keepGoing': '糸を切らさずに——「{name}」まであと{days}日です。',
  'reward.allEarned':
    'すべての印を集めました。この輪はあなたのもの——あとは回し続けるだけです。',

  /* ---- マイルストーンの棚 ---- */
  'reward.shelfTitle': 'マイルストーン',
  'reward.nextMark': '「{name}」まであと{days}日',
  'reward.nextMarkOne': '「{name}」まであと1日',
  'reward.startStreak': '今日ひとつ実践して、連続を始めましょう。',
  'reward.bestRun': '最長連続 · {days}日',
  'reward.earnedCount': '{total}個中{earned}個 獲得',

  /* ---- マイルストーン名 + 一言 ---- */
  'mile.spark': '最初の火花',
  'mile.spark.note': 'いちばん難しいところは、もう越えました。',
  'mile.week': '七つの夜',
  'mile.week.note': 'これはもう試みではなく、ひとつの実践です。',
  'mile.fortnight': '二週間',
  'mile.fortnight.note': '空がひと回りし、あなたもそれとともに回りました。',
  'mile.root': '根を張る',
  'mile.root.note': '自分のものだと感じられるくらいには、続きました。',
  'mile.moon': '満月ひとつ',
  'mile.moon.note': '月はあなたとともに、ひと巡りしきりました。',
  'mile.ember': '熾火',
  'mile.ember.note': '火はもう、ひとりでに燃え続けます。',
  'mile.season': 'ひと季節',
  'mile.season.note': 'ひと季節まるごと、初めから終わりまで守りました。',
  'mile.halfyear': '輪の半分',
  'mile.halfyear.note': '半年ぶんの帰還、一日また一日と。',
  'mile.wheel': '完全な輪',
  'mile.wheel.note': '太陽をひと周り——一日も欠かさずに。',
}
