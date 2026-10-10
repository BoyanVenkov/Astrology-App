import type { SpreadReadingKey } from '../en/spreadReading'

/** 日本語 — タロットスプレッド全体の統合リーディング。 */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'スプレッド全体を読む',
  'sp.throughline': 'この占いは{dominant}に傾いています。{tone}',
  'sp.dominant.major': '大きな、運命的な転機',
  'sp.dominant.wands': '行動と勢い',
  'sp.dominant.cups': '感情とつながり',
  'sp.dominant.swords': '思考、真実、そして葛藤',
  'sp.dominant.pentacles': '実際的なことと物質的なこと',
  'sp.tone.rising':
    'カードはここであなたに有利に傾いています——抵抗よりも開かれていくものの方が多いです。',
  'sp.tone.testing':
    'このスプレッドはあなたに何かを求めています。今は流れよりも摩擦の方が多いですが、向き合う価値のある摩擦です。',
  'sp.tone.mixed':
    '本当に入り混じった手札です——本物の支えのすぐ隣に本物の抵抗があります。ここでは何もシンプルではなく、それが正直なところです。',
  'sp.tone.steady':
    '静かで均衡の取れた手札です。どちらの方向にも強い後押しはありません——これはドラマではなく、安定についての話です。',
  'sp.three.arc':
    '{past}から始まり、今{present}であなたを迎え、{future}へと向かっています。',
  'sp.cross.aligned':
    'ここであなたに試練を与えているものは、実は物事の核心と対立するのではなく、共に働いています。',
  'sp.cross.opposed':
    'ここであなたに試練を与えているものは、物事の核心に逆らって引っ張っています——これが解決するまで、本当の緊張を覚悟してください。',
  'sp.cross.neutral':
    '試練と物事の核心は、互いに助けることも傷つけることもなく、並んで存在しています。',
}
