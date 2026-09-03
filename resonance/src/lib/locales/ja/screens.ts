import type { ScreenKey } from '../en/screens'

/** 日本語 — サブ画面のテキスト。 */
export const screens: Record<ScreenKey, string> = {
  /* ---- 地元の空 / 地に着くこと ---- */
  'geo.ground.scarce':
    '日光が乏しいです — 正午ごろに少し外へ出て、温かいものを食べ、早く眠ることを自分に許してください。',
  'geo.ground.long':
    '長い光が一日を引き伸ばします — 正午は日陰と冷たい水を取り、寝室を遅い日ざしから守ってください。',
  'geo.ground.spring':
    '光が戻っています — 実践を朝へ寄せ、エネルギーが積み上がるにまかせてください。',
  'geo.ground.summer':
    '光の頂点 — ペースをやさしく保ち、水分をとり、土か草の上に裸足で地に着いてください。',
  'geo.ground.autumn':
    '光が引いています — よりゆっくりした温める実践と、早めのクールダウンを優先してください。',
  'geo.ground.winter':
    '暗い半分 — 今は休むことが生産的です。実践は短く、回復させるもので、ろうそくの明かりのもとで。',
  'geo.season.spring': '春',
  'geo.season.summer': '夏',
  'geo.season.autumn': '秋',
  'geo.season.winter': '冬',

  /* ---- 簡易ホロスコープ ---- */
  'scr.quick.eyebrow': '今日のホロスコープ',
  'scr.quick.you': 'あなた',
  'scr.quick.moon': '月',
  'scr.quick.readFull': '全文を読む →',
  'scr.quick.fullPro': '完全なリーディング · Pro →',

  /* ---- 完全なホロスコープ ---- */
  'scr.horo.eyebrow': '毎日のホロスコープ',
  'scr.horo.addBirth': '出生情報を追加 →',
  'scr.horo.moonHead': '月',
  'scr.horo.skyHead': 'あなたの頭上の空',
  'scr.horo.risingNow': '今この瞬間、{sign}があなたの上に昇っています。',
  'scr.horo.transitingHouse': '{planet}があなたの{ord}ハウスを運行しています。',
  'scr.horo.addPlace': '出生地を追加するか、「設定」で位置情報を共有してください →',
  'scr.horo.practiceHead': '今日の実践',
  'scr.horo.geoLine': '{season} · 太陽 {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} 時間の日照',
  'scr.horo.birthPlace': ' · あなたの出生地を使用',

  /* ---- トランジット ---- */
  'scr.transits.eyebrow': '空',
  'scr.transits.titleNatal': 'あなたのホロスコープへのトランジット',
  'scr.transits.titleSky': '今日の空',
  'scr.transits.addChart': 'ホロスコープを追加',
  'scr.transits.nowHead': '今この瞬間、あなたの頭上で',
  'scr.transits.rising': '{sign}が昇っています',
  'scr.transits.movingHouse': '{planet}があなたの{ord}ハウスを通っています — {arena}。',
  'scr.transits.sunMoon': '太陽 {sunrise}–{sunset} · 月 {moonrise}–{moonset}',
  'scr.transits.birthPlace': '出生地',
  'scr.transits.allInOrb': 'オーブ内のすべてのトランジット',
  'scr.transits.moonAspects': '今日の月のアスペクト',
  'scr.transits.natalPrefix': 'ネイタル',
  'scr.transits.nothingOrb': '今日はオーブ内に何もありません。',
  'scr.transits.applying': 'アプライング',
  'scr.transits.separating': 'セパレーティング',
  'scr.transits.orbNote':
    '↑ まだ正確へ近づいている · ↓ 離れている。オーブが狭いほど、強く感じられます。',

  /* ---- 日記 ---- */
  'scr.journal.dayStreak': '日連続',
  'scr.journal.practices': '回の実践',
  'scr.journal.minutes': '分',
  'scr.journal.last4w': '過去 4 週間',
  'scr.journal.lastNDays': '過去 {n} 日',
  'scr.journal.reasonHistory': '無制限の日記履歴',
  'scr.journal.fullHistory': '完全な履歴 →',
  'scr.journal.gridNote': '塗り = 実践した分 · 輪 = 記録した気分',
  'scr.journal.recent': '最近の実践',
  'scr.journal.noSessions': 'まだセッションがありません — メイン画面から始めてください。',
  'scr.journal.endedEarly': ' · 早く終了',
  'scr.journal.min': '{n} 分',

  /* ---- 儀式（実践の実行） ---- */
  'scr.ritual.attuning': '空と調律しています…',
  'scr.ritual.back': '戻る',
  'scr.ritual.todaysPractice': '今日の実践',
  'scr.ritual.fromLibrary': 'ライブラリから',
  'scr.ritual.focusAlignment': '{chakra}の調整',
  'scr.ritual.chakraBlurb': '{planet}とあなたのホロスコープで形づくられた、ガイドのひととき。',
  'scr.ritual.freqBlurb':
    '{intention}。座り、やわらぎ、音にセッションを運ばせてください。',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': '音',
  'scr.ritual.journeyNote':
    '{n} ラウンド、自分のペースで — 約 12 分。画面が各局面をガイドします。',
  'scr.ritual.length': '長さ',
  'scr.ritual.sound': '音',
  'scr.ritual.sound.tone': 'トーン',
  'scr.ritual.sound.music': '音楽',
  'scr.ritual.sound.silent': 'リンのみ',
  'scr.ritual.soundTone': '{hz} Hz の周波数トーンがリンの下で鳴ります。',
  'scr.ritual.soundMusic': 'リンの下で、やわらかくゆっくり動くアンビエントの和音。',
  'scr.ritual.soundSilent': '各ステップを知らせるリンの音だけ。',
  'scr.ritual.spokenGuidance': '話されるガイダンス',
  'scr.ritual.notAvailable': 'ここでは使えません — 言葉は画面に表示されます',
  'scr.ritual.beginPractice': '実践を始める',
  'scr.ritual.notNow': '今はしない',
  'scr.ritual.endSession': '‹ セッションを終える',
  'scr.ritual.complete': '実践完了',
  'scr.ritual.doneMeta': '{minutes} 分 · {chakra} · {label}',
  'scr.ritual.streak': '{n} 日連続',
  'scr.ritual.firstLogged': '最初の実践を記録',
  'scr.ritual.howNow': '今、どう感じますか？',
  'scr.ritual.done': '完了',

  /* ---- 気分の記録 ---- */
  'scr.moodci.default': 'どう感じますか？',
  'scr.moodci.logged': '記録しました ✦',
  'scr.moodci.logThis': 'これを記録',
  'scr.moodci.eyebrow': '夜の記録',
  'scr.moodci.blurb': 'ひとタップ。明日のオーラと、あなたの気分の推移を形づくります。',
  'scr.moodci.noteLabel': 'メモ（任意）',
  'scr.moodci.notePlaceholder': '心にあることを何でも…',
  'scr.moodci.update': '記録を更新',
  'scr.moodci.save': '記録を保存',

  /* ---- 出生図 ---- */
  'scr.natal.eyebrow': '出生図',
  'scr.natal.title': 'あなたが生まれたときの空',
  'scr.natal.blurb':
    '生年月日・出生時刻・出生地を追加すると、Resonance があなたの出生図を描きます — あなたが生まれた瞬間の、太陽・月・惑星の正確な位置です。',
  'scr.natal.addDetails': '出生情報を追加',
  'scr.natal.edit': '編集',
  'scr.natal.timeUnknown': '時刻不明（正午）',
  'scr.natal.angleLine': '{asc} アセンダント · MC {mc} · {system}',
  'scr.natal.placidus': 'プラシーダス・ハウス',
  'scr.natal.wholeSign': 'ホールサイン・ハウス',
  'scr.natal.addPlace': 'アセンダントとハウスのために、出生地を追加してください →',
  'scr.natal.wheelAria': '出生図のホイール',
  'scr.natal.placements': '配置',
  'scr.natal.aspects': 'ネイタルのアスペクト',
  'scr.natal.noAspects': 'オーブ内に主要なアスペクトはありません。',
  'scr.natal.house': '{n}ハウス',

  /* ---- 薬房 ---- */
  'scr.apoth.eyebrow': '薬房',
  'scr.apoth.title': 'クリスタルの伴侶',
  'scr.apoth.subChart': '今日の{chakra}の取り組みのための石 · キャビネットに {n} 個',
  'scr.apoth.subPlain': 'キャビネットに {n} 個の石',
  'scr.apoth.all': 'すべて',
  'scr.apoth.today': '今日',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': '「{filter}」に分類された石はありません。',
  'scr.apoth.noneThat': 'その',
  'scr.apoth.pair': '今日の実践に石を合わせて →',

  /* ---- 月の画面 ---- */
  'scr.moon.eyebrow': '空',
  'scr.moon.title': '月',
  'scr.moon.sub': '{phase} · {pct}% 照らされている',
  'scr.moon.whereShe': 'どこにいるか',
  'scr.moon.inSign': '月は{sign}にあります — {note}。',
  'scr.moon.vocUntil':
    '{sign}に入るまでボイド{time} — 何か新しいことを始めるのに良くない窓です。代わりに地に着き、切れた糸を結んでください。',
  'scr.moon.vocAt': '（{time}）',
  'scr.moon.vocSoon': '{hours} 時間後にボイドになります。',
  'scr.moon.notVoc': 'ボイドではありません — 月はきれいなアスペクトを結んでいます。',
  'scr.moon.comingUp': 'まもなく',

  /* ---- ローカル通知 ---- */
  'notif.daily.title': 'あなたのリーディングの用意ができました',
  'notif.daily.body': '今日のトランジット、チャクラの焦点、実践が待っています。',
  'notif.evening.title': 'ゆっくりして',
  'notif.evening.body': '眠る前に、数回の呼吸と気分の記録を。',
  'notif.newMoon.title': '今夜は新月',
  'notif.newMoon.body': '静かなリセット — 意図を立て、自分の中に留めてください。',
  'notif.fullMoon.title': '今夜は満月',
  'notif.fullMoon.body': '感情が明るく燃えます。表面に上がってくるものに気づいてください。',
  'notif.moonSign.title': '月が{sign}に入ります',
  'notif.moonSign.body':
    '感情の空模様が移り変わります — エネルギーを地に着けるのに良い時です。',
  'notif.voc.title': '月がまもなくボイドになります',
  'notif.voc.body':
    'ボイドは 15 分後に始まります。エネルギーを地に着けて — 休んで、始めないで。',

  /* ---- ボイドの月のバナー ---- */
  'scr.voc.active': 'ボイドの月 — 地に着いて、始めないで。{time}に終わります。',
  'scr.voc.activeSoon': 'ボイドの月 — 地に着いて、始めないで。まもなく終わります。',
  'scr.voc.upcoming': '月は {hours} 時間後にボイドになります。',
  'scr.voc.twoMin': '2 分',

  /* ---- 空のハブ：チャクラの場の要約 ---- */
  'scr.field.summary.join': ' と ',
  'scr.field.summary.pressure': '{names}が圧を受けている',
  'scr.field.summary.open': '{names}が大きく開いている',
  'scr.field.summary.carries': '{name}が一日を担う',
  'scr.field.summary.settled': '落ち着いた場',

  /* ---- 断食カードとガイド ---- */
  'scr.fast.eyebrow': '断食',
  'scr.fast.phase.waxing': '満ちゆく月',
  'scr.fast.phase.waning': '欠けゆく月',
  'scr.fast.cardMeta': '{special} · 月日 {day} · 月は{sign}に',
  'scr.fast.bestToday': '今日の最良のやり方：',
  'scr.fast.betterDays': 'より良い日が先に',
  'scr.fast.waningWindow': '欠けゆく窓',
  'scr.fast.cardDisclaimer':
    '伝統的な月のガイダンスで、医療上の助言ではありません。健康上の問題や食との過去がある場合は、断食を控え、ただ軽めに食べてください。',
  'scr.fast.fiveKinds': '五つのやり方と、先の日々 →',
  'scr.fast.less': '閉じる',
  'scr.fast.howHold': '保ち方',
  'scr.fast.guideSubSpecial': '{special} · 月は{sign}に',
  'scr.fast.guideSubPhase': '{phase} · 月日 {day}',
  'scr.fast.today': '今日',
  'scr.fast.skyBacks': '空が後押し → {method}',
  'scr.fast.whichKind': 'どのやり方',
  'scr.fast.whichKindBlurb':
    '断食を保つ五つのやり方、いちばんやさしいものから — それぞれ今日の月に照らして評価。タップして開いてください。',
  'scr.fast.holdingWell': 'うまく保つ',
  'scr.fast.hold1':
    '断食中も飲んで — 水、ハーブティー、ブラックコーヒー。長めのものではひとつまみの塩が役立ちます。',
  'scr.fast.hold2':
    'やさしく解いて：まず温かい水、それから小さく火の通ったもの。大きな食事はすぐには避けて。',
  'scr.fast.hold3':
    'ゆっくり動き、多く眠り、体が止めろと言った瞬間に止めて。',
  'scr.fast.guideDisclaimer':
    '伝統的な月のガイダンスで、医療上の助言ではありません。ドライファスティング — 水なし — は本当のリスクを伴い、空が「推奨」するものでは決してありません。このガイドはあなたが飲むことを前提としています。妊娠中、服薬中、糖尿病、低体重、または食との過去がある場合は、断食を控え、ただ軽めに食べてください。',
}
