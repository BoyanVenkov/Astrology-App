import type { RewardsKey } from '../en/rewards'

/** 中文 — 连续练习的里程碑与日记里的奖励横幅。 */
export const rewards: Record<RewardsKey, string> = {
  /* ---- 祝贺横幅 ---- */
  'reward.congrats': '恭喜',
  'reward.streakReached': '连续 {days} 天。',
  'reward.dismiss': '真好',
  'reward.keepGoing': '别断了这根线——还有 {days} 天就到「{name}」。',
  'reward.allEarned': '所有徽记都已集齐。这轮子归你了——继续转下去吧。',

  /* ---- 里程碑陈列 ---- */
  'reward.shelfTitle': '里程碑',
  'reward.nextMark': '还有 {days} 天到「{name}」',
  'reward.nextMarkOne': '还有 1 天到「{name}」',
  'reward.startStreak': '今天练习一次，开启一段连续。',
  'reward.bestRun': '最长连续 · {days} 天',
  'reward.earnedCount': '已获得 {earned} / {total}',

  /* ---- 里程碑名称 + 一句话 ---- */
  'mile.spark': '第一簇火花',
  'mile.spark.note': '最难的部分已经过去了。',
  'mile.week': '七个夜晚',
  'mile.week.note': '现在这是一种练习，不再只是尝试。',
  'mile.fortnight': '两周',
  'mile.fortnight.note': '天空转过了一圈，你也随它转了一圈。',
  'mile.root': '扎根',
  'mile.root.note': '已经够久了，久到感觉这是你自己的了。',
  'mile.moon': '一轮满月',
  'mile.moon.note': '月亮陪你走完了整整一圈。',
  'mile.ember': '余烬',
  'mile.ember.note': '这团火现在能自己燃着了。',
  'mile.season': '一整个季节',
  'mile.season.note': '一整个季节，从头到尾守住了。',
  'mile.halfyear': '半个轮回',
  'mile.halfyear.note': '半年的回归，一天接着一天。',
  'mile.wheel': '完整的轮回',
  'mile.wheel.note': '绕太阳整整一圈——每一天都没落下。',
}
