import type { OracleKey } from '../en/oracle'

/** 日本語 — 「AIホロスコープ」画面（Pro）。 */
export const oracle: Record<OracleKey, string> = {
  'oracle.eyebrow': 'AIホロスコープ',
  'oracle.title': 'あなたのためだけの、AIが書いたホロスコープ',
  'oracle.blurb':
    '一般的なホロスコープではありません — Claudeが今日のトランジットをあなた自身のチャートと照らし合わせ、それが今日のあなたにとって本当に何を意味するかをお伝えします。',
  'oracle.teaserSample1':
    '「水星があなたの月と対立し、今日は古い言い争いが再燃しやすいとき — 蒸し返すべき日ではありません」',
  'oracle.teaserSample2': '「金星があなたの第4ハウスに入り、避けてきた家庭の問題を和らげます」',
  'oracle.unlock': 'AIホロスコープを解放する',
  'oracle.reason': 'AIホロスコープ',
  'oracle.consult': '自分のAIホロスコープを見る',
  'oracle.consultAgain': 'もう一度きく',
  'oracle.loading': 'あなたのために空を読んでいます…',
  'oracle.remaining': '本日はあと{n}回読めます',
  'oracle.remainingOne': '本日はあと1回読めます',
  'oracle.noneLeft': '本日分は使い切りました — また明日お越しください',
  'oracle.errorGeneric': 'オラクルは今静かにしています — また少ししてからお試しください。',
  'oracle.generatedAt': '{time}に読み取り',
  'oracle.addBirth': '出生データを追加すると、完全に個人向けの鑑定になります →',
}
