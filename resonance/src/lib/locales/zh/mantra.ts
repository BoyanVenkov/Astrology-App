import type { MantraKey } from '../en/mantra'

/** 简体中文 — 84 句每日真言，以及每个脉轮的短句。 */
export const mantra: Record<MantraKey, string> = {
  /* 海底轮 */
  'mantra.root.restore.0':
    '我可以停下来。无论我做不做什么，大地都托着我。',
  'mantra.root.restore.1': '我的价值从来不是需要去建造的东西。',
  'mantra.root.restore.2': '我让大地暂时替我承担重量。',
  'mantra.root.ground.0': '时间流过，我依然扎根。',
  'mantra.root.ground.1': '就算树梢在摇，我的根基仍然稳固。',
  'mantra.root.ground.2': '我身上坚实的东西，今天依然坚实。',
  'mantra.root.flow.0': '这一天所需的，我都有了，也只为这一天。',
  'mantra.root.flow.1': '我按自己呼吸的节奏移动。',
  'mantra.root.flow.2': '我属于这里，属于这具身体，属于这片大地。',
  'mantra.root.amplify.0': '我站稳脚跟，占据属于我的空间。',
  'mantra.root.amplify.1': '我足够安全，可以想要更多。',
  'mantra.root.amplify.2': '我的根很深，所以我可以长得很高。',

  /* 生殖轮 */
  'mantra.sacral.restore.0':
    '我让水流慢下来。在漩涡里休息，什么也不会失去。',
  'mantra.sacral.restore.1':
    '我的感受是时间，不是判决 — 我让它们经过。',
  'mantra.sacral.restore.2':
    '我不必产出任何东西才算有价值。',
  'mantra.sacral.ground.0': '我完整地感受它，却不被卷走。',
  'mantra.sacral.ground.1': '我托住这份情绪，就像河岸托住一条河。',
  'mantra.sacral.ground.2':
    '浪起来了，而我留在下面的海里。',
  'mantra.sacral.flow.0':
    '我让生命流过我，而不是把它攥住。',
  'mantra.sacral.flow.1': '我跟随今天里带着暖意的东西。',
  'mantra.sacral.flow.2': '变化就是我由之构成的水。',
  'mantra.sacral.amplify.0': '我对带给我喜悦的事说是。',
  'mantra.sacral.amplify.1': '今天我创造一点东西，只为感觉它在动。',
  'mantra.sacral.amplify.2': '愉悦是信息，而我在聆听。',

  /* 太阳神经丛轮 */
  'mantra.solar-plexus.restore.0':
    '我把火放下。等我休息够了，它还会在这里。',
  'mantra.solar-plexus.restore.1':
    '在获得呼吸的许可之前，我不需要证明什么。',
  'mantra.solar-plexus.restore.2':
    '知道何时停下，也是我力量的一部分。',
  'mantra.solar-plexus.ground.0': '就算被推，我也守住我的中心。',
  'mantra.solar-plexus.ground.1':
    '我可以同时坚定又温和。',
  'mantra.solar-plexus.ground.2':
    '压力遇到的，是一个不会弯折的我。',
  'mantra.solar-plexus.flow.0':
    '我信任我的火知道它要去哪里。',
  'mantra.solar-plexus.flow.1':
    '我做下一件对的事，其余的就随它去。',
  'mantra.solar-plexus.flow.2': '我的意志属于我，今天我按自己的选择去用它。',
  'mantra.solar-plexus.amplify.0': '我对那件绕了很久的事采取行动。',
  'mantra.solar-plexus.amplify.1': '我不带歉意地展开我完整的分量。',
  'mantra.solar-plexus.amplify.2': '我做决定，而做决定就是力量。',

  /* 心轮 */
  'mantra.heart.restore.0':
    '今天我让爱成为我所接受的东西，而不只是我付出的。',
  'mantra.heart.restore.1':
    '我的心可以疲惫，却依然保持敞开。',
  'mantra.heart.restore.2': '我不必撑住每一个人。我也可以被撑住。',
  'mantra.heart.ground.0': '我可以关心，而不必背起一切。',
  'mantra.heart.ground.1':
    '就算边缘在痛，我的中心仍然敞开。',
  'mantra.heart.ground.2': '在我这里，爱与界限并不对立。',
  'mantra.heart.flow.0': '我给出与接受爱，像呼吸一样自然。',
  'mantra.heart.flow.1': '今天我让暖意在两个方向流动。',
  'mantra.heart.flow.2': '只要我保持柔软，连结就在这里等我。',
  'mantra.heart.amplify.0':
    '我走近那个我一直想靠近的人。',
  'mantra.heart.amplify.1': '我让自己被看见，心是敞开的。',
  'mantra.heart.amplify.2':
    '我身上的爱，比我正在付出的还要多。',

  /* 喉轮 */
  'mantra.throat.restore.0':
    '今天我不欠任何人我的话语。沉默也是真实。',
  'mantra.throat.restore.1': '我可以让声音休息，而不会失去它。',
  'mantra.throat.restore.2': '重要的事，明天仍然需要被说出来。',
  'mantra.throat.ground.0': '我慢慢说，感受每一个字。',
  'mantra.throat.ground.1': '我可以不带火气地说出那件难说的事。',
  'mantra.throat.ground.2':
    '我的真实不会因为被质疑而变得更响。',
  'mantra.throat.flow.0': '我说出我的真实，让它落在它落下的地方。',
  'mantra.throat.flow.1': '我说出真实的东西，简简单单。',
  'mantra.throat.flow.2': '今天我的声音和我的意思一起前行。',
  'mantra.throat.amplify.0': '我说出那件我一直憋着的事。',
  'mantra.throat.amplify.1': '我让自己被听见，用完整的音量。',
  'mantra.throat.amplify.2': '我的声音配得上它所占的空间。',

  /* 眉心轮 */
  'mantra.third-eye.restore.0':
    '现在，我让画面保持模糊。清明不能硬求。',
  'mantra.third-eye.restore.1':
    '我关掉多余的窗口，让我的内在之眼休息。',
  'mantra.third-eye.restore.2': '暂时还不知道，是一个不错的停留之处。',
  'mantra.third-eye.ground.0':
    '就算有人对我说不，我仍信任我所看见的。',
  'mantra.third-eye.ground.1': '我可以同时握住两种可能，而不慌乱。',
  'mantra.third-eye.ground.2':
    '雾会散的；我不必去追它。',
  'mantra.third-eye.flow.0': '我信任噪音之下那份安静的知道。',
  'mantra.third-eye.flow.1': '我跟随我注意力的那根线。',
  'mantra.third-eye.flow.2': '我需要看见的，会在它自己的时候显现。',
  'mantra.third-eye.amplify.0': '我对我早已拥有的直觉采取行动。',
  'mantra.third-eye.amplify.1': '我让我的直觉做下一个选择。',
  'mantra.third-eye.amplify.2':
    '我能看得比至今被允许的更远。',

  /* 顶轮 */
  'mantra.crown.restore.0':
    '我把那些大问题放下，让某种更大的东西替我托着它们。',
  'mantra.crown.restore.1': '就算我停止划桨，我也被承载着。',
  'mantra.crown.restore.2':
    '意义会找到我；今天我不必去追它。',
  'mantra.crown.ground.0':
    '我的双脚留在这里，同时我仍与某种广阔相连。',
  'mantra.crown.ground.1':
    '就算某一天我看不见它，更大的图案依然成立。',
  'mantra.crown.ground.2': '就算我的那一份很小，我也信任整体。',
  'mantra.crown.flow.0':
    '我是某种广阔的一部分，而它正朝着对我有利的方向移动。',
  'mantra.crown.flow.1': '我让这一天意味着它所意味的一切。',
  'mantra.crown.flow.2': '我松开抓握，在顶端保持敞开。',
  'mantra.crown.amplify.0':
    '我让一个更宽广的视角，改变我度过这一天的方式。',
  'mantra.crown.amplify.1':
    '今天我把一个行动与真正重要的事对齐。',
  'mantra.crown.amplify.2':
    '我是某个巨大而真实之物中，一个小而真实的部分。',

  /* 每个脉轮的短句 */
  'mantra.short.root': '我安全、被托住，就在这里。',
  'mantra.short.sacral': '我让生命流过我。',
  'mantra.short.solar-plexus': '我信任我的火。',
  'mantra.short.heart': '我自由地给出与接受爱。',
  'mantra.short.throat': '我轻松地说出我的真实。',
  'mantra.short.third-eye': '我信任我内在所见。',
  'mantra.short.crown': '我是某种广阔的一部分。',

  /* 冥想用的较长短句 */
  'mantra.long.root': '我安全。我在这里。我拥有我所需要的。',
  'mantra.long.sacral': '我让生命流过我。',
  'mantra.long.solar-plexus': '我信任我的火。',
  'mantra.long.heart': '我自由地给出与接受爱。',
  'mantra.long.throat': '我轻松地说出我的真实。',
  'mantra.long.third-eye': '我信任我内在所见。',
  'mantra.long.crown': '我是某种广阔的一部分，而它托着我。',
}
