import type { ScreenKey } from '../en/screens'

/** 简体中文 — 子界面的文本。 */
export const screens: Record<ScreenKey, string> = {
  /* ---- 本地星空 / 接地 ---- */
  'geo.ground.scarce':
    '日光稀少 — 中午前后出去一会儿，吃点热的，允许自己早点睡。',
  'geo.ground.long':
    '长长的日照拉长了这一天 — 中午找阴凉、喝凉水，把卧室挡住傍晚的太阳。',
  'geo.ground.spring':
    '光在回来 — 把你的练习挪到早上，让能量积累起来。',
  'geo.ground.summer':
    '光的顶点 — 节奏放柔，多喝水，赤脚踩在泥土或草地上接地。',
  'geo.ground.autumn':
    '光在收拢 — 偏向更慢、更暖的练习，也更早收尾这一天。',
  'geo.ground.winter':
    '黑暗的一半 — 现在休息是有产出的；练习保持短、恢复性、烛光下进行。',
  'geo.season.spring': '春',
  'geo.season.summer': '夏',
  'geo.season.autumn': '秋',
  'geo.season.winter': '冬',

  /* ---- 快速运势 ---- */
  'scr.quick.eyebrow': '今日运势',
  'scr.quick.you': '你',
  'scr.quick.moon': '月亮',
  'scr.quick.readFull': '完整阅读 →',
  'scr.quick.fullPro': '完整解读 · Pro →',

  /* ---- 完整运势 ---- */
  'scr.horo.eyebrow': '每日运势',
  'scr.horo.addBirth': '添加出生资料 →',
  'scr.horo.moonHead': '月亮',
  'scr.horo.skyHead': '你头顶的星空',
  'scr.horo.risingNow': '此刻，{sign}正在你头顶上升。',
  'scr.horo.transitingHouse': '{planet}正在行运经过你的{ord}宫。',
  'scr.horo.addPlace': '添加一个出生地点，或在「设置」里分享你的位置 →',
  'scr.horo.practiceHead': '今日练习',
  'scr.horo.geoLine': '{season} · 太阳 {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} 小时日照',
  'scr.horo.birthPlace': ' · 使用你的出生地点',

  /* ---- 行运 ---- */
  'scr.transits.eyebrow': '天空',
  'scr.transits.titleNatal': '对你星盘的行运',
  'scr.transits.titleSky': '今天的星空',
  'scr.transits.addChart': '添加星盘',
  'scr.transits.nowHead': '此刻，在你头顶',
  'scr.transits.rising': '{sign}正在上升',
  'scr.transits.movingHouse': '{planet}正在穿过你的{ord}宫 — {arena}。',
  'scr.transits.sunMoon': '太阳 {sunrise}–{sunset} · 月亮 {moonrise}–{moonset}',
  'scr.transits.birthPlace': '出生地点',
  'scr.transits.allInOrb': '容许度内的每个行运',
  'scr.transits.moonAspects': '今天月亮的相位',
  'scr.transits.natalPrefix': '本命',
  'scr.transits.nothingOrb': '今天容许度内没有相位。',
  'scr.transits.applying': '入相',
  'scr.transits.separating': '出相',
  'scr.transits.orbNote':
    '↑ 仍在朝精确收紧 · ↓ 正在分离。容许度越紧，感觉越强。',

  /* ---- 日记 ---- */
  'scr.journal.dayStreak': '连续天数',
  'scr.journal.practices': '次练习',
  'scr.journal.minutes': '分钟',
  'scr.journal.last4w': '最近 4 周',
  'scr.journal.lastNDays': '最近 {n} 天',
  'scr.journal.reasonHistory': '无限日记历史',
  'scr.journal.fullHistory': '完整历史 →',
  'scr.journal.gridNote': '填充 = 练习分钟数 · 圆环 = 记录的心情',
  'scr.journal.recent': '最近的练习',
  'scr.journal.noSessions': '还没有练习 — 从主面板开始一个。',
  'scr.journal.endedEarly': ' · 提前结束',
  'scr.journal.min': '{n} 分钟',

  /* ---- 仪式（练习执行） ---- */
  'scr.ritual.attuning': '正在与星空校准…',
  'scr.ritual.back': '返回',
  'scr.ritual.todaysPractice': '今日练习',
  'scr.ritual.fromLibrary': '来自曲库',
  'scr.ritual.focusAlignment': '{chakra}的对齐',
  'scr.ritual.chakraBlurb': '一段由{planet}和你的星盘塑造的引导静坐。',
  'scr.ritual.freqBlurb':
    '{intention}。坐下、放柔，让声音带着这段练习走。',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': '声音',
  'scr.ritual.journeyNote':
    '{n} 轮，按你自己的节奏 — 大约 12 分钟。屏幕会引导每一个阶段。',
  'scr.ritual.length': '时长',
  'scr.ritual.sound': '声音',
  'scr.ritual.sound.tone': '音调',
  'scr.ritual.sound.music': '音乐',
  'scr.ritual.sound.silent': '仅颂钵',
  'scr.ritual.soundTone': '{hz} Hz 的频率音调在颂钵下方播放。',
  'scr.ritual.soundMusic': '颂钵下方一段柔和、缓慢移动的环境和弦。',
  'scr.ritual.soundSilent': '只有标记每一步的颂钵声。',
  'scr.ritual.spokenGuidance': '语音引导',
  'scr.ritual.notAvailable': '这里不可用 — 文字会显示在屏幕上',
  'scr.ritual.beginPractice': '开始练习',
  'scr.ritual.notNow': '现在不要',
  'scr.ritual.endSession': '‹ 结束这段练习',
  'scr.ritual.complete': '练习完成',
  'scr.ritual.doneMeta': '{minutes} 分钟 · {chakra} · {label}',
  'scr.ritual.streak': '连续 {n} 天',
  'scr.ritual.firstLogged': '第一次练习已记录',
  'scr.ritual.howNow': '你现在感觉如何？',
  'scr.ritual.done': '完成',

  /* ---- 心情记录 ---- */
  'scr.moodci.default': '你感觉如何？',
  'scr.moodci.logged': '已记录 ✦',
  'scr.moodci.logThis': '记录这个',
  'scr.moodci.eyebrow': '夜间记录',
  'scr.moodci.blurb': '轻轻一触。它会塑造明天的光环和你的心情走势。',
  'scr.moodci.noteLabel': '备注（可选）',
  'scr.moodci.notePlaceholder': '你心里的任何事…',
  'scr.moodci.update': '更新记录',
  'scr.moodci.save': '保存记录',

  /* ---- 出生星盘 ---- */
  'scr.natal.eyebrow': '出生星盘',
  'scr.natal.title': '你出生时的星空',
  'scr.natal.blurb':
    '添加你的出生日期、时间和地点，Resonance 会绘出你的出生星盘 — 你出生那一刻，太阳、月亮和行星的精确位置。',
  'scr.natal.addDetails': '添加出生资料',
  'scr.natal.edit': '编辑',
  'scr.natal.timeUnknown': '时间未知（中午）',
  'scr.natal.angleLine': '{asc} 上升 · MC {mc} · {system}',
  'scr.natal.placidus': '普拉西度宫位制',
  'scr.natal.wholeSign': '整宫制',
  'scr.natal.addPlace': '添加你的出生地点，以获得上升点和宫位 →',
  'scr.natal.wheelAria': '出生星盘的圆盘',
  'scr.natal.placements': '落点',
  'scr.natal.aspects': '本命相位',
  'scr.natal.noAspects': '容许度内没有主要相位。',
  'scr.natal.house': '{n}宫',

  /* ---- 药房 ---- */
  'scr.apoth.eyebrow': '药房',
  'scr.apoth.title': '晶石伙伴',
  'scr.apoth.subChart': '为今天的{chakra}功课准备的晶石 · 柜子里有 {n} 块',
  'scr.apoth.subPlain': '柜子里有 {n} 块晶石',
  'scr.apoth.all': '全部',
  'scr.apoth.today': '今天',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': '「{filter}」类别下没有晶石。',
  'scr.apoth.noneThat': '这个',
  'scr.apoth.pair': '为今天的练习配一块晶石 →',

  /* ---- 月亮界面 ---- */
  'scr.moon.eyebrow': '天空',
  'scr.moon.title': '月亮',
  'scr.moon.sub': '{phase} · 照亮 {pct}%',
  'scr.moon.whereShe': '她在哪里',
  'scr.moon.inSign': '月亮在{sign} — {note}。',
  'scr.moon.vocUntil':
    '空亡，直到她进入{sign}{time} — 一个不宜开始新事物的窗口。改为接地、收尾那些没完的线头。',
  'scr.moon.vocAt': '，时间 {time}',
  'scr.moon.vocSoon': '{hours} 小时后进入空亡。',
  'scr.moon.notVoc': '不是空亡 — 月亮在形成干净的相位。',
  'scr.moon.comingUp': '即将来到',

  /* ---- 本地通知 ---- */
  'notif.daily.title': '你的解读准备好了',
  'notif.daily.body': '今天的行运、脉轮焦点和练习在等你。',
  'notif.evening.title': '慢下来',
  'notif.evening.body': '睡前做几次呼吸，记录一次心情。',
  'notif.newMoon.title': '今夜新月',
  'notif.newMoon.body': '一次安静的重置 — 定一个意图，把它留给自己。',
  'notif.fullMoon.title': '今夜满月',
  'notif.fullMoon.body': '感受明亮地燃烧。留意浮上表面的东西。',
  'notif.moonSign.title': '月亮进入{sign}',
  'notif.moonSign.body':
    '情绪的气候在转变 — 一个为你的能量接地的好时机。',
  'notif.voc.title': '月亮即将进入空亡',
  'notif.voc.body':
    '空亡将在 15 分钟后开始。为你的能量接地 — 休息，别开始。',

  /* ---- 月空亡横幅 ---- */
  'scr.voc.active': '月空亡 — 接地，别开始。{time} 结束。',
  'scr.voc.activeSoon': '月空亡 — 接地，别开始。很快结束。',
  'scr.voc.upcoming': '月亮 {hours} 小时后进入空亡。',
  'scr.voc.twoMin': '2 分钟',

  /* ---- 天空中心：脉轮能量场摘要 ---- */
  'scr.field.summary.join': ' 和 ',
  'scr.field.summary.pressure': '{names}受压',
  'scr.field.summary.open': '{names}大大敞开',
  'scr.field.summary.carries': '{name}扛起这一天',
  'scr.field.summary.settled': '一个安定的能量场',

  /* ---- 断食卡片与指南 ---- */
  'scr.fast.eyebrow': '断食',
  'scr.fast.phase.waxing': '盈月',
  'scr.fast.phase.waning': '亏月',
  'scr.fast.cardMeta': '{special} · 阴历第 {day} 日 · 月亮在{sign}',
  'scr.fast.bestToday': '今天最好的方式：',
  'scr.fast.betterDays': '更好的日子在前面',
  'scr.fast.waningWindow': '亏月窗口',
  'scr.fast.cardDisclaimer':
    '传统的月相指引，不是医疗建议。如果你有健康状况或与食物的过往，请跳过断食，只是吃清淡一些。',
  'scr.fast.fiveKinds': '五种方式与前面的日子 →',
  'scr.fast.less': '收起',
  'scr.fast.howHold': '如何撑住它',
  'scr.fast.guideSubSpecial': '{special} · 月亮在{sign}',
  'scr.fast.guideSubPhase': '{phase} · 阴历第 {day} 日',
  'scr.fast.today': '今天',
  'scr.fast.skyBacks': '星空支持 → {method}',
  'scr.fast.whichKind': '哪一种',
  'scr.fast.whichKindBlurb':
    '撑住一场断食的五种方式，最温和的在前 — 每一种都按今天的月亮评过。轻触一种来打开它。',
  'scr.fast.holdingWell': '把它撑好',
  'scr.fast.hold1':
    '断食期间要喝东西 — 水、花草茶、黑咖啡。较长的断食里一小撮盐有帮助。',
  'scr.fast.hold2':
    '温柔地开斋：先喝温水，再吃点小而煮熟的东西。别马上就上大餐。',
  'scr.fast.hold3':
    '动作放慢，多睡，身体一说停就停。',
  'scr.fast.guideDisclaimer':
    '传统的月相指引，不是医疗建议。干断食 — 不喝水 — 有真实的风险，也从来不是星空所「推荐」的；本指南假设你会喝水。如果你怀孕、在服药、有糖尿病、体重过低，或有与食物的过往，请跳过断食，只是吃清淡一些。',
}
