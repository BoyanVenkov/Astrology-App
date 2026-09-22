import type { OracleKey } from '../en/oracle'

/** 中文 — "AI 运势" 页面（Pro）。 */
export const oracle: Record<OracleKey, string> = {
  'oracle.eyebrow': 'AI 运势',
  'oracle.title': '你的运势，由 AI 撰写 — 只为你',
  'oracle.blurb':
    '不是千篇一律的运势解读——Claude 会对照你自己的星盘解读今天的行运，告诉你这些对你今天到底意味着什么。',
  'oracle.teaserSample1': '"水星与你的月亮相冲，今天容易翻旧账——今天不是重提往事的日子。"',
  'oracle.teaserSample2': '"金星进入你的第四宫，缓和了一件你一直回避的家庭事务。"',
  'oracle.unlock': '解锁 AI 运势',
  'oracle.reason': 'AI 运势',
  'oracle.consult': '获取我的 AI 运势',
  'oracle.consultAgain': '再问一次',
  'oracle.loading': '正在为你解读星空…',
  'oracle.remaining': '今天还剩 {n} 次解读',
  'oracle.remainingOne': '今天还剩 1 次解读',
  'oracle.noneLeft': '今天的解读已用完——明天再来吧',
  'oracle.errorGeneric': '神谕暂时沉默——请稍后再试。',
  'oracle.errorNotPro': '你的 Pro 订阅在我们这边尚未显示为已激活。请尝试"设置 → 升级 → 恢复购买"，如果已经扣款，请联系客服。',
  'oracle.generatedAt': '{time} 生成',
  'oracle.addBirth': '添加你的出生资料，获取完全个性化的解读 →',
}
