import type { SpreadReadingKey } from '../en/spreadReading'

/** 中文 — 整个塔罗牌阵的综合解读。 */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': '解读整个牌阵',
  'sp.throughline': '这次解读偏向{dominant}。{tone}',
  'sp.dominant.major': '重大的、命中注定的转折点',
  'sp.dominant.wands': '行动与势头',
  'sp.dominant.cups': '情感与联系',
  'sp.dominant.swords': '思想、真相与冲突',
  'sp.dominant.pentacles': '实际与物质层面',
  'sp.tone.rising': '这里的牌对你有利——打开的比阻碍的多。',
  'sp.tone.testing':
    '这个牌阵在向你提出要求。现在的摩擦多于顺畅，但这是值得面对的摩擦。',
  'sp.tone.mixed':
    '一手真正复杂的牌——真正的支持就在真正的阻力旁边。这里没有什么是简单的，这很诚实。',
  'sp.tone.steady':
    '一手平静、均衡的牌。没有哪个方向特别强势——这关乎稳定，而非戏剧性。',
  'sp.three.arc':
    '一切始于{past}，如今在{present}与你相遇，并正朝着{future}前进。',
  'sp.cross.aligned': '这里的挑战其实是在配合事情的核心，而非与之对抗。',
  'sp.cross.opposed':
    '这里的挑战正在拉扯事情的核心——在这件事解决之前，预料会有真正的紧张。',
  'sp.cross.neutral':
    '挑战与事情的核心并排而立，既不互相帮助，也不互相伤害。',
}
