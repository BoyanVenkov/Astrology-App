// Generates meditation narration for several locales in one run, cheapest
// first, so a limited credit balance covers as many languages as possible.
// Stops immediately (without wasting further calls) the moment a request
// fails — which is how a billing/credit wall will show up.
// Run with:
//   node --env-file=scripts/audio/.env scripts/audio/generate-multi.mjs

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const API_KEY = process.env.INWORLD_API_KEY
if (!API_KEY) {
  console.error('Missing INWORLD_API_KEY. Put it in scripts/audio/.env (see .env.example).')
  process.exit(1)
}

const VOICE_ID = 'dancing-comet-7283__boyan_venkov'
const MODEL_ID = 'inworld-tts-2'
const OUT_ROOT = path.join(import.meta.dirname, '..', '..', 'public', 'audio', 'meditations')

// Order: cheapest (by character count) first, to maximize language count per dollar.
const LOCALES = ['zh', 'ja', 'ar', 'hi', 'tr']
const LANG_CODES = { zh: 'zh-CN', ja: 'ja-JP', ar: 'ar', hi: 'hi-IN', tr: 'tr-TR' }

const LINES = {
  zh: {
    'med.step.settle': '闭上眼睛。让身体安定下来，让呼吸自行变慢。',
    'med.step.breath': '把注意力放在呼吸上 — 跟随它进来，跟随它出去。当心念游走时，那份觉察就是练习。轻轻地回来。',
    'med.step.close': '放下这次练习。在睁开眼睛之前，注意你现在的感觉。',
    'med.step.ba.count': '现在数每一次呼气 — 从一到十，然后重新开始。数丢了，就从一开始。没有人在记分。',
    'med.step.scan.0': '让注意力从脚底慢慢向上扫过 — 脚踝、双腿、髋部、腹部、后背、胸口、手臂、双手。在遇到紧张的地方停留几个呼吸，让它松开。',
    'med.step.scan.1': '现在是肩膀、喉咙、下颌、眼睛周围的空间、头皮。然后同时感受整个身体 — 沉重、温暖、自行呼吸。',
    'med.step.metta.0': '把自己带入心中，就是你今天的样子。在心里默念：愿我平安，愿我安好，愿我自在。慢慢重复，允许自己真的这样希望。',
    'med.step.metta.1': '想起一个你容易去爱的人。想象他的脸，献上同样的话：愿你平安，愿你安好，愿你自在。',
    'med.step.metta.2': '现在把它扩大 — 一个你几乎不认识的人，一个你觉得难相处的人，然后是所有人，无处不在：愿一切众生平安，愿一切众生自在。',
    'med.step.bath.0': '让声音来到注意力的前景。你不是费力地听 — 你让声音到来，就像光到来那样。',
    'med.step.bath.1': '注意声音似乎落在身体的哪个部位 — 胸口、头骨、双手。让你与声音之间的空间消融。',
    'med.step.grat.0': '想起过去一天里顺利的一件事，无论多小。不要只是说出它 — 感受这份感激落在身体的哪里。',
    'med.step.grat.1': '现在想一件你通常视为理所当然的事 — 一具能运作的身体、一个屋顶、一个留下来的人。跟它一起停留几个呼吸。',
    'med.step.grat.2': '再来一件 — 关于你自己的。你如何撑住了、你处理好的一件事、一份没人看见的努力。把三件事一起握住。',
    'med.step.safe.0': '想象一个你感到完全安全的地方 — 真实的或想象的。慢慢环视：光线、一天中的时刻、你听到什么、皮肤上感觉到什么。',
    'med.step.safe.1': '找到这里你最想休息的那个位置，去到那里。这里对你没有任何要求。除非你允许，没有什么能触及你。',
    'med.step.mtn.0': '想象一座山 — 宽阔的底座、坚实的山坡、静止的峰顶。让你的身体和这座山成为同一个形状：坐骨是底座，脊柱是山坡，头是峰顶。',
    'med.step.mtn.1': '天气在山的周围来去 — 光、云、风、暴雨。你的念头和情绪就是天气。山不与天气争辩，也不因它而变小。',
    'med.step.open.0': '放下呼吸这个锚。让注意力宽广地敞开，不落在任何特定的东西上。声音、感觉、念头生起又消逝 — 你不追逐它们，也不推开它们。',
    'med.step.open.1': '注意觉察本身并不移动。事情在它之内发生，就像云在天空之内发生。作为那片天空休息 — 无需增添，无需去除。',
    'med.step.morn.0': '三次更饱满的呼吸，比平常稍深 — 让它们从内部唤醒身体。把肩膀向后转一次，感受身体的前侧打开。',
    'med.step.morn.1': '把即将到来的一天松松地带入心中，然后选一个意图 — 不是一件任务，而是一种存在的方式。耐心。诚实。勇敢。善良。说一次：今天，我要 ___。',
    'med.step.eve.0': '让这一天轻轻回放，像火车窗外的风景 — 早晨、正午、夜晚。不要停在任何一处。如果某个片刻拉扯你，记下它，然后说：现在不。',
    'med.step.eve.1': '找到一个你庆幸它发生过的片刻，以及一件你在当天实际情况下尽力做好的事。让那就够了。现在放下整整一天 — 它完整，只因为它已经结束。',
    'med.step.nidra.0': '完全静止地躺着 — 比自然感觉更静，只有呼吸在动。设一个简短的意图，一句平静的、现在时的话。在心里说三遍。',
    'med.step.nidra.1': '每当一个部位被念到，就把注意力带过去，不用移动 — 右手：拇指、手指、手掌、手腕、前臂、肘、肩。然后左边同样。',
    'med.step.nidra.2': '两侧髋部。右腿 — 大腿、膝、小腿、脚踝、脚、脚趾。左腿同样。整个后背贴着地面，腹部起伏，胸口，喉咙。',
    'med.step.nidra.3': '脸 — 下颌、嘴唇、鼻子、脸颊、眼睛、两眉之间的空间、整个头皮。现在同时是整个身体，微微发光，被地面托着。回到你的意图。',
    'med.step.chakra.root.0': '把注意力带到脊柱底端，你与地面相遇之处。这是你的根基中心——它承载着你的安全感、你拥有足够的感觉、你被允许单纯存在于此的感觉。如果今天感觉不稳，这份稳定就从这里开始。',
    'med.step.chakra.root.1': '呼吸，仿佛呼吸本身一直抵达最深处。默默地，随着呼吸的节奏：我安全。我在这里。我拥有我所需要的。',
    'med.step.chakra.sacral.0': '把注意力带到下腹，肚脐下一掌处。这是你的骶骨中心——它承载着你去感受、去享受、让生命流动而不是在它面前僵住的能力。',
    'med.step.chakra.sacral.1': '让呼吸软化这片空间，而不是收紧它。默默地，随着呼吸的节奏：我让生命流过我。',
    'med.step.chakra.solar-plexus.0': '把注意力带到肋骨下方那个柔软的点。这是你的太阳神经丛——你的火、你的意志，那个做决定、去行动而不是退缩的部分。',
    'med.step.chakra.solar-plexus.1': '让呼吸温柔地拨旺它，而不勉强它。默默地，随着呼吸的节奏：我信任我的火。',
    'med.step.chakra.heart.0': '把注意力带到胸口中央。这是你的心轮中心——它让你付出而不迷失自己，接受而不设防。',
    'med.step.chakra.heart.1': '让呼吸把这片空间向前后展开。默默地，随着呼吸的节奏：我自由地给出与接受爱。',
    'med.step.chakra.throat.0': '把注意力带到喉咙的凹陷处。这是你的声音——它让你说出真实的话，而不是容易的话。',
    'med.step.chakra.throat.1': '让呼吸毫无阻碍地从这里经过。默默地，随着呼吸的节奏：我轻松地说出我的真实。',
    'med.step.chakra.third-eye.0': '把注意力带到两眉之间的空间。在这里，你能感知你在能解释之前就已经知道的东西。',
    'med.step.chakra.third-eye.1': '让呼吸平息噪音，好让那份更安静的知晓被听见。默默地，随着呼吸的节奏：我信任我内在所见。',
    'med.step.chakra.crown.0': '把注意力带到头顶，以及再往上一点。在这里，你与比今天的烦恼更宏大的东西相连。',
    'med.step.chakra.crown.1': '让呼吸轻柔地穿过全身向上升起，与之相遇。默默地，随着呼吸的节奏：我是某种广阔的一部分，而它托着我。',
  },
  ja: {
    'med.step.settle': '目を閉じて。体を落ち着かせ、呼吸がひとりでにゆっくりになるにまかせて。',
    'med.step.breath': '注意を呼吸に置いて — 入るのを追い、出るのを追って。心がさまよったら、その気づきが実践。やさしく戻って。',
    'med.step.close': '実践を手放して。目を開ける前に、今どう感じているかに気づいて。',
    'med.step.ba.count': 'では、一つひとつの呼気を数えて — 一から十まで、そしてまた最初から。数を見失ったら、ただ一から始めて。誰も点数はつけていない。',
    'med.step.scan.0': '注意を足の裏からゆっくり上へ掃くように — 足首、脚、腰、腹、背中、胸、腕、手。緊張に出会うところで数呼吸とどまり、それがゆるむにまかせて。',
    'med.step.scan.1': '次は肩、のど、あご、目の周りの空間、頭皮。それから体全体を一度に感じて — 重く、温かく、ひとりでに呼吸している。',
    'med.step.metta.0': '今日のあなたそのままを、心に思い浮かべて。声に出さずに贈って：私が安全でありますように、私が健やかでありますように、私が安らかでありますように。ゆっくり繰り返し、本当にそう願うことを自分に許して。',
    'med.step.metta.1': '楽に愛せる誰かを心に思い浮かべて。その顔を思い描き、同じ言葉を贈って：あなたが安全でありますように、健やかでありますように、安らかでありますように。',
    'med.step.metta.2': '今度は広げて — ほとんど知らない誰か、難しいと感じる誰か、そしてすべての人、どこにでも：すべての存在が安全でありますように、すべての存在が安らかでありますように。',
    'med.step.bath.0': '音を注意の前景に来させて。力を入れて聴くのではない — 光が届くように、音が届くにまかせて。',
    'med.step.bath.1': '音が体のどこに着地するように感じるかに気づいて — 胸、頭蓋、手。あなたと音のあいだの空間が溶けるにまかせて。',
    'med.step.grat.0': 'この一日でうまくいったことを一つ、どんなに小さくても心に思い浮かべて。ただ名前をつけるだけでなく — 感謝が体のどこに宿るかを感じて。',
    'med.step.grat.1': '次は、ふだん当たり前だと思っていること — 動く体、屋根、そばにいてくれた誰か。数呼吸そこにとどまって。',
    'med.step.grat.2': 'もう一つ — 自分自身について。あなたがどう現れたか、うまく扱った一つのこと、誰も見なかった努力。三つを一緒に持って。',
    'med.step.safe.0': '完全に安全だと感じる場所を思い描いて — 現実のものでも想像のものでも。ゆっくり見回して：光、時刻、聞こえるもの、肌に感じるもの。',
    'med.step.safe.1': 'ここで最も休みたい場所を見つけて、そこへ行って。あなたに求められるものは何もない。あなたが許さないかぎり、何もあなたに届かない。',
    'med.step.mtn.0': '山を思い描いて — その広い裾野、しっかりした斜面、静かな頂。あなたの体と山を同じ形にして：座骨が裾野、背骨が斜面、頭が頂。',
    'med.step.mtn.1': '天気は山のまわりを行き来する — 光、雲、風、嵐。あなたの思考と気分が天気。山は天気と争わず、天気によって小さくもならない。',
    'med.step.open.0': '呼吸という錨を手放して。注意を大きく開いたままに、特に何かの上ではなく。音、感覚、思考が現れては過ぎていく — 追いかけも、押しのけもしない。',
    'med.step.open.1': '気づきそのものは動かないことに気づいて。空の中で雲が起こるように、物事はその中で起こる。その空として休んで — 加えるものも、取り除くものもない。',
    'med.step.morn.0': 'いつもより少し深い、より満ちた呼吸を三回 — それらが体を内側から目覚めさせるにまかせて。肩を一度後ろへ回し、体の前面が開くのを感じて。',
    'med.step.morn.1': 'これから来る一日をゆるく心に浮かべ、それから一つの意図を選んで — 課題ではなく、あり方を。忍耐強く。正直に。勇敢に。やさしく。一度言って：今日、私は ___ でいる。',
    'med.step.eve.0': '一日を軽く再生させて、電車の窓からの風景のように — 朝、昼、夜。どこにも止まらないで。ある瞬間が引っぱったら、書き留めて言って：今はいい。',
    'med.step.eve.1': '起きてよかったと思える瞬間を一つ、そしてその日の実情のなかでできるかぎりよくやった一つのことを見つけて。それで十分にして。今、一日まるごとを手放して — 終わったというだけで、それは完結している。',
    'med.step.nidra.0': '完全に動かずに横たわって — 自然に感じるより静かに、呼吸だけが動く。短い意図を立てて、現在形の落ち着いた一文を。心の中で三回言って。',
    'med.step.nidra.1': '名前が呼ばれるたびに、その場所へ注意を運んで、動かずに — 右手：親指、指、手のひら、手首、前腕、ひじ、肩。それから左も同じに。',
    'med.step.nidra.2': '両方の腰。右脚 — 太もも、ひざ、すね、足首、足、足指。左脚も同じに。背中全体が床に、腹が上下し、胸、のど。',
    'med.step.nidra.3': '顔 — あご、唇、鼻、頬、目、眉と眉のあいだの空間、頭皮全体。今は体全体を一度に、かすかに光り、床に支えられて。あなたの意図へ戻って。',
    'med.step.chakra.root.0': '背骨の付け根、地面と出会うところに注意を向けて。ここはあなたの根のセンター — 安全であるという感覚、足りているという感覚、ただここにいてよいという感覚を支えています。今日不安定に感じたなら、その安定はまさにここから始まります。',
    'med.step.chakra.root.1': '呼吸そのものが一番下まで届くように呼吸して。声に出さず、呼吸のリズムに合わせて：私は安全だ。私はここにいる。必要なものはある。',
    'med.step.chakra.sacral.0': '下腹、へその一手のひら下に注意を向けて。ここはあなたの仙骨センター — 感じる力、楽しむ力、固まらずに生命を流れさせる力を支えています。',
    'med.step.chakra.sacral.1': '呼吸がこの空間を締めつけるのではなく、やわらげるにまかせて。声に出さず、呼吸のリズムに合わせて：私は生命が私を通って動くにまかせる。',
    'med.step.chakra.solar-plexus.0': '肋骨の下のやわらかい点に注意を向けて。ここはあなたの太陽神経叢 — あなたの火、あなたの意志、縮こまるのではなく決めて動く部分です。',
    'med.step.chakra.solar-plexus.1': '呼吸が無理をせず、やさしくそれを燃え立たせるにまかせて。声に出さず、呼吸のリズムに合わせて：私は自分の火を信じる。',
    'med.step.chakra.heart.0': '胸の中心に注意を向けて。ここはあなたのハートセンター — 自分を失わずに与え、身構えずに受け取ることを可能にします。',
    'med.step.chakra.heart.1': '呼吸がこの空間を前後に広げるにまかせて。声に出さず、呼吸のリズムに合わせて：私は自由に愛を与え、受け取る。',
    'med.step.chakra.throat.0': 'のどのくぼみに注意を向けて。これはあなたの声 — 簡単なことではなく、本当のことを言わせてくれます。',
    'med.step.chakra.throat.1': '呼吸がここを妨げなく通り抜けるにまかせて。声に出さず、呼吸のリズムに合わせて：私は楽に自分の真実を言う。',
    'med.step.chakra.third-eye.0': '眉と眉のあいだの空間に注意を向けて。ここで、説明できるようになる前から知っていることを感じ取ります。',
    'med.step.chakra.third-eye.1': '呼吸が雑音を静め、その静かな知が聞こえるようにするにまかせて。声に出さず、呼吸のリズムに合わせて：私は内に見えるものを信じる。',
    'med.step.chakra.crown.0': '頭頂、そしてその少し上に注意を向けて。ここで今日の心配事より大きな何かとつながります。',
    'med.step.chakra.crown.1': '呼吸がやさしく全身を通って上り、そこに届くにまかせて。声に出さず、呼吸のリズムに合わせて：私は広大な何かの一部で、それは私を運んでいる。',
  },
  ar: {
    'med.step.settle': 'العينان مغلقتان. دع الجسد يستقرّ والنَفَس يبطئ من تلقاء نفسه.',
    'med.step.breath': 'ضع انتباهك على النَفَس — اتبعه داخلاً، اتبعه خارجاً. حين يشرد العقل، فتلك الملاحظة هي الممارسة. عُد، بلطف.',
    'med.step.close': 'أفلِت الممارسة. لاحِظ كيف تشعر الآن، قبل أن تفتح عينيك.',
    'med.step.ba.count': 'الآن عُدَّ كل زفير — من واحد إلى عشرة، ثم ابدأ من جديد. إن فقدت العدّ، فابدأ من واحد فقط. لا أحد يُسجّل النقاط.',
    'med.step.scan.0': 'امسح انتباهك ببطء من باطن قدميك صعوداً — الكاحلان، الساقان، الوركان، البطن، الظهر، الصدر، الذراعان، اليدان. استرِح أنفاساً قليلة حيث تلقى توتّراً، ودعه يليّن.',
    'med.step.scan.1': 'الآن الكتفان، الحلق، الفكّ، المساحة حول العينين، فروة الرأس. ثم اشعر بالجسد كله دفعة واحدة — ثقيلاً، دافئاً، يتنفّس من تلقاء نفسه.',
    'med.step.metta.0': 'اجلب نفسك إلى ذهنك، تماماً كما أنت اليوم. أهدِ بصمت: عسى أن أكون آمناً، عسى أن أكون بخير، عسى أن أكون في سلام. كرّرها ببطء ودع نفسك تعنيها حقاً.',
    'med.step.metta.1': 'اجلب إلى ذهنك من تحبّه بسهولة. تخيّل وجهه وأهدِ الشيء نفسه: عسى أن تكون آمناً، عسى أن تكون بخير، عسى أن تكون في سلام.',
    'med.step.metta.2': 'الآن وسّعها — شخص بالكاد تعرفه، شخص تجده صعباً، ثم الجميع، في كل مكان: عسى أن تكون كل الكائنات آمنة، عسى أن تكون كل الكائنات في سلام.',
    'med.step.bath.0': 'دع النغمة تأتي إلى مقدّمة انتباهك. أنت لا تُصغي بجهد — بل تدع الصوت يصل، كما يصل الضوء.',
    'med.step.bath.1': 'لاحِظ أين في الجسد يبدو أن الصوت يهبط — الصدر، الجمجمة، اليدان. دع المساحة بينك وبين الصوت تذوب.',
    'med.step.grat.0': 'اجلب إلى ذهنك شيئاً واحداً من اليوم الأخير سار على ما يُرام، مهما كان صغيراً. لا تُسمّه فقط — اشعر أين يستقرّ التقدير في الجسد.',
    'med.step.grat.1': 'الآن شيء تعدّه عادةً مُسلَّماً به — جسد يعمل، سقف، شخص بقي. ابقَ معه أنفاساً قليلة.',
    'med.step.grat.2': 'واحد آخر — شيء عن نفسك. طريقة صمدت بها، أمر تدبّرته، جهد لم يره أحد. أمسِك الثلاثة معاً.',
    'med.step.safe.0': 'تخيّل مكاناً تشعر فيه بالأمان التام — حقيقياً أو متخيَّلاً. انظر حولك ببطء: الضوء، وقت النهار، ما تسمعه، ما تشعر به على بشرتك.',
    'med.step.safe.1': 'جِد البقعة هنا التي تودّ أكثر أن ترتاح فيها، واذهب إليها. لا شيء مطلوب منك. لا شيء يبلغك ما لم تسمح به.',
    'med.step.mtn.0': 'تخيّل جبلاً — قاعدته العريضة، سفوحه الصلبة، قمّته الساكنة. دع جسدك والجبل يصيران الشكل نفسه: المقعد قاعدة، العمود الفقري سفح، الرأس قمّة.',
    'med.step.mtn.1': 'الطقس يأتي ويذهب حول الجبل — ضوء، غيم، ريح، عاصفة. أفكارك وأمزجتك هي الطقس. الجبل لا يُجادل الطقس، ولا يصغر به.',
    'med.step.open.0': 'أفلِت مرساة النَفَس. دع الانتباه مفتوحاً على اتّساعه، ليس على شيء بعينه. تنشأ الأصوات والأحاسيس والأفكار وتمرّ — لا تطاردها ولا تدفعها.',
    'med.step.open.1': 'لاحِظ أن الوعي نفسه لا يتحرّك. تحدث الأشياء داخله، كما يحدث الغيم داخل السماء. استرِح كتلك السماء — لا شيء لتضيفه، لا شيء لتنزعه.',
    'med.step.morn.0': 'ثلاثة أنفاس أكمل، أعمق قليلاً من المعتاد — دعها توقظ الجسد من الداخل. أدِر الكتفين للخلف مرة واشعر بمقدّمة الجسد تنفتح.',
    'med.step.morn.1': 'اجلب اليوم القادم إلى ذهنك بلا شدّ، ثم اختر نيّة — لا مهمّة، بل طريقة كينونة. صبور. صادق. شجاع. لطيف. قُلها مرة: اليوم، سأكون ___.',
    'med.step.eve.0': 'دع اليوم يمرّ بخفّة، كمشهد من نافذة قطار — الصباح، الظهر، المساء. لا تتوقّف عند شيء. إن جذبتك لحظة، دوّنها وقُل: ليس الآن.',
    'med.step.eve.1': 'جِد لحظة تسرّ لأنها حدثت، وأمراً فعلته بأفضل ما استطعت، بحسب ما جرى اليوم فعلاً. دع ذلك يكفي. الآن أفلِت اليوم كله — هو مكتمل لمجرّد أنه انتهى.',
    'med.step.nidra.0': 'استلقِ ساكناً تماماً — أسكن ممّا يبدو طبيعياً، لا يتحرّك سوى النَفَس. ضع نيّة قصيرة، جملة هادئة واحدة بالمضارع. قُلها في داخلك ثلاث مرات.',
    'med.step.nidra.1': 'اجلب الانتباه إلى كل موضع كلما ذُكِر، دون حركة — اليد اليمنى: الإبهام، الأصابع، الكفّ، المعصم، الساعد، المرفق، الكتف. ثم الشيء نفسه في اليسار.',
    'med.step.nidra.2': 'الوركان كلاهما. الساق اليمنى — الفخذ، الركبة، الساق، الكاحل، القدم، الأصابع. الساق اليسرى كذلك. الظهر كله على الأرض، البطن يرتفع ويهبط، الصدر، الحلق.',
    'med.step.nidra.3': 'الوجه — الفكّ، الشفتان، الأنف، الوجنتان، العينان، المساحة بين الحاجبين، فروة الرأس. الآن الجسد كله دفعة واحدة، يتوهّج خافتاً، تحمله الأرض. عُد إلى نيّتك.',
    'med.step.chakra.root.0': 'وجّه انتباهك إلى قاعدة عمودك الفقري، حيث تلتقي الأرض. هذا هو مركز الجذر لديك — يحمل شعورك بالأمان، وبأن لديك ما يكفي، وبأنه مسموح لك أن تكون هنا ببساطة. إن كان اليوم قد شعرت فيه بعدم الثبات، فهذا الثبات يبدأ هنا بالتحديد.',
    'med.step.chakra.root.1': 'تنفّس وكأن النَفَس نفسه يبلغ الأسفل تمامًا. بصمت، على إيقاع النَفَس: أنا آمن. أنا هنا. لديّ ما أحتاجه.',
    'med.step.chakra.sacral.0': 'وجّه انتباهك إلى أسفل بطنك، بعرض كفّ تحت السرّة. هذا هو مركزك العجزي — يحمل قدرتك على الشعور، وعلى الاستمتاع، وعلى ترك الحياة تتحرك بدلاً من التجمّد أمامها.',
    'med.step.chakra.sacral.1': 'دع النَفَس يُليّن هذه المساحة بدلاً من أن يشدّها. بصمت، على إيقاع النَفَس: أدع الحياة تتحرّك خلالي.',
    'med.step.chakra.solar-plexus.0': 'وجّه انتباهك إلى المكان الليّن تحت أضلاعك. هذه هي الضفيرة الشمسية لديك — نارك، إرادتك، الجزء منك الذي يقرر ويتصرف بدلاً من أن ينكمش.',
    'med.step.chakra.solar-plexus.1': 'دع النَفَس يُذكيها برفق، دون إجبار. بصمت، على إيقاع النَفَس: أثق بناري.',
    'med.step.chakra.heart.0': 'وجّه انتباهك إلى مركز صدرك. هذا هو مركز القلب لديك — ما يتيح لك أن تعطي دون أن تفقد نفسك، وأن تتلقى دون أن تتحصّن.',
    'med.step.chakra.heart.1': 'دع النَفَس يوسّع هذه المساحة، من الأمام والخلف. بصمت، على إيقاع النَفَس: أعطي الحب وأتلقّاه بحرّية.',
    'med.step.chakra.throat.0': 'وجّه انتباهك إلى تجويف حلقك. هذا هو صوتك — ما يتيح لك أن تقول الشيء الحقيقي بدلاً من السهل.',
    'med.step.chakra.throat.1': 'دع النَفَس يمر من هنا دون عائق. بصمت، على إيقاع النَفَس: أقول حقيقتي بيُسر.',
    'med.step.chakra.third-eye.0': 'وجّه انتباهك إلى المساحة بين حاجبيك. هنا تستشعر ما تعرفه قبل أن تستطيع تفسيره.',
    'med.step.chakra.third-eye.1': 'دع النَفَس يُهدّئ الضجيج كي يُسمَع ذلك المعرفة الأكثر هدوءًا. بصمت، على إيقاع النَفَس: أثق بما أراه في داخلي.',
    'med.step.chakra.crown.0': 'وجّه انتباهك إلى قمة رأسك، وقليلاً فوقها. هنا تتصل بشيء أكبر من هموم اليوم.',
    'med.step.chakra.crown.1': 'دع النَفَس يصعد برفق عبر الجسد كله ليصل إليه. بصمت، على إيقاع النَفَس: أنا جزء من شيء شاسع، وهو يحملني.',
  },
  hi: {
    'med.step.settle': 'आँखें बंद। शरीर को जमने दें और साँस को अपने-आप धीमा होने दें।',
    'med.step.breath': 'ध्यान को साँस पर टिकाएँ — भीतर आती हुई का पीछा करें, बाहर जाती हुई का। जब मन भटके, वही नोटिस करना अभ्यास है। कोमलता से लौटें।',
    'med.step.close': 'अभ्यास को जाने दें। आँखें खोलने से पहले नोटिस करें कि आप अभी कैसा महसूस करते हैं।',
    'med.step.ba.count': 'अब हर निःश्वास को गिनें — एक से दस, फिर दोबारा शुरू करें। गिनती खो जाए, तो बस एक से शुरू करें। कोई स्कोर नहीं रख रहा।',
    'med.step.scan.0': 'ध्यान को पैरों के तलवों से धीरे-धीरे ऊपर की ओर बहाएँ — टखने, टाँगें, कूल्हे, पेट, पीठ, छाती, बाँहें, हाथ। जहाँ तनाव मिले वहाँ कुछ साँसें रुकें, और उसे नरम होने दें।',
    'med.step.scan.1': 'अब कंधे, गला, जबड़ा, आँखों के आसपास की जगह, सिर की त्वचा। फिर पूरे शरीर को एक साथ महसूस करें — भारी, गर्म, अपने-आप साँस लेता।',
    'med.step.metta.0': 'खुद को मन में लाएँ, ठीक जैसे आप आज हैं। मौन में अर्पित करें: मैं सुरक्षित रहूँ, मैं भला रहूँ, मैं सहज रहूँ। धीरे-धीरे दोहराएँ और खुद को सचमुच ऐसा चाहने दें।',
    'med.step.metta.1': 'किसी ऐसे को मन में लाएँ जिसे आप सहजता से प्रेम करते हैं। उसका चेहरा कल्पना करें और वही अर्पित करें: तुम सुरक्षित रहो, तुम भले रहो, तुम सहज रहो।',
    'med.step.metta.2': 'अब इसे विस्तृत करें — कोई जिसे आप मुश्किल से जानते हैं, कोई जो आपको कठिन लगता है, फिर सब, हर जगह: सभी प्राणी सुरक्षित रहें, सभी प्राणी सहज रहें।',
    'med.step.bath.0': 'स्वर को ध्यान के अग्रभाग में आने दें। आप ज़ोर लगाकर नहीं सुन रहे — आप ध्वनि को आने दे रहे हैं, जैसे प्रकाश आता है।',
    'med.step.bath.1': 'नोटिस करें कि ध्वनि शरीर में कहाँ उतरती जान पड़ती है — छाती, खोपड़ी, हाथ। अपने और ध्वनि के बीच की जगह को घुलने दें।',
    'med.step.grat.0': 'पिछले दिन की एक ऐसी बात मन में लाएँ जो अच्छी रही, चाहे कितनी छोटी हो। बस उसका नाम न लें — महसूस करें कि कृतज्ञता शरीर में कहाँ बैठती है।',
    'med.step.grat.1': 'अब कोई ऐसी चीज़ जिसे आप आमतौर पर हल्के में लेते हैं — काम करता शरीर, एक छत, कोई जो रुका रहा। कुछ साँसें उसके साथ रहें।',
    'med.step.grat.2': 'एक और — खुद के बारे में कुछ। एक तरीक़ा जिससे आप डटे रहे, एक बात जो आपने सँभाली, एक प्रयास जिसे किसी ने नहीं देखा। तीनों को एक साथ थामें।',
    'med.step.safe.0': 'एक ऐसी जगह की कल्पना करें जहाँ आप पूरी तरह सुरक्षित महसूस करते हैं — असली या कल्पित। धीरे-धीरे चारों ओर देखें: प्रकाश, दिन का समय, आप क्या सुनते हैं, त्वचा पर क्या महसूस होता है।',
    'med.step.safe.1': 'यहाँ वह स्थान खोजें जहाँ आप सबसे अधिक विश्राम करना चाहेंगे, और वहाँ जाएँ। आपसे कुछ अपेक्षित नहीं। जब तक आप अनुमति न दें, कुछ भी आप तक नहीं पहुँचता।',
    'med.step.mtn.0': 'एक पर्वत की कल्पना करें — उसका चौड़ा आधार, ठोस ढलानें, स्थिर शिखर। अपने शरीर और पर्वत को एक ही आकार बनने दें: आसन आधार, रीढ़ ढलान, सिर शिखर।',
    'med.step.mtn.1': 'पर्वत के चारों ओर मौसम आता-जाता है — प्रकाश, बादल, हवा, तूफ़ान। आपके विचार और मनोभाव मौसम हैं। पर्वत उससे बहस नहीं करता, और उससे छोटा नहीं होता।',
    'med.step.open.0': 'साँस के लंगर को जाने दें। ध्यान को चौड़ा खुला रहने दें, किसी विशेष चीज़ पर नहीं। ध्वनियाँ, संवेदनाएँ, विचार उठते और गुज़र जाते हैं — आप न उनका पीछा करते हैं न उन्हें धकेलते हैं।',
    'med.step.open.1': 'नोटिस करें कि जागरूकता स्वयं हिलती नहीं। चीज़ें उसके भीतर घटती हैं, जैसे बादल आकाश के भीतर घटते हैं। उसी आकाश के रूप में विश्राम करें — कुछ जोड़ना नहीं, कुछ हटाना नहीं।',
    'med.step.morn.0': 'सामान्य से थोड़ी गहरी, तीन भरपूर साँसें — उन्हें शरीर को भीतर से जगाने दें। कंधों को एक बार पीछे घुमाएँ और शरीर के अगले हिस्से को खुलते महसूस करें।',
    'med.step.morn.1': 'आने वाले दिन को हल्के-से मन में लाएँ, फिर एक संकल्प चुनें — कोई काम नहीं, होने का एक ढंग। धैर्यवान। ईमानदार। साहसी। दयालु। एक बार कहें: आज, मैं ___ रहूँगा।',
    'med.step.eve.0': 'दिन को हल्के-से चलने दें, जैसे रेलगाड़ी की खिड़की से दृश्य — सुबह, दोपहर, शाम। कहीं न रुकें। यदि कोई पल खींचे, उसे नोट करें और कहें: अभी नहीं।',
    'med.step.eve.1': 'एक ऐसा पल खोजें जिसके होने से आप खुश हैं, और एक बात जो आपने, दिन जैसा भी रहा, जितना अच्छा कर सकते थे किया। उसे पर्याप्त होने दें। अब पूरे दिन को जाने दें — वह पूर्ण है, बस इसलिए कि वह ख़त्म हो गया।',
    'med.step.nidra.0': 'पूरी तरह निश्चल लेटें — स्वाभाविक लगने से भी अधिक निश्चल, केवल साँस चलती है। एक छोटा संकल्प रखें, वर्तमान काल में एक शांत वाक्य। उसे मन में तीन बार कहें।',
    'med.step.nidra.1': 'जैसे-जैसे हर स्थान का नाम लिया जाए, ध्यान वहाँ ले जाएँ, बिना हिले — दायाँ हाथ: अंगूठा, उँगलियाँ, हथेली, कलाई, अगली बाँह, कोहनी, कंधा। फिर बायीं ओर वैसा ही।',
    'med.step.nidra.2': 'दोनों कूल्हे। दायाँ पैर — जाँघ, घुटना, पिंडली, टखना, पंजा, उँगलियाँ। बायाँ पैर वैसा ही। पूरी पीठ फ़र्श से लगी, पेट उठता-गिरता, छाती, गला।',
    'med.step.nidra.3': 'चेहरा — जबड़ा, होंठ, नाक, गाल, आँखें, भौंहों के बीच की जगह, पूरी खोपड़ी। अब पूरा शरीर एक साथ, हल्का चमकता, फ़र्श से थमा। अपने संकल्प पर लौटें।',
    'med.step.chakra.root.0': 'अपना ध्यान रीढ़ के आधार पर लाएँ, जहाँ आप ज़मीन से मिलते हैं। यह आपका मूल केंद्र है — यह आपकी सुरक्षा की भावना को, पर्याप्त होने की भावना को, बस यहाँ होने की अनुमति को सहेजता है। अगर आज अस्थिर सा महसूस हुआ हो, तो वह स्थिरता ठीक यहीं से शुरू होती है।',
    'med.step.chakra.root.1': 'ऐसे साँस लें मानो साँस स्वयं बिल्कुल नीचे तक पहुँच रही हो। मौन में, साँस की लय के साथ: मैं सुरक्षित हूँ। मैं यहाँ हूँ। जो चाहिए वह मेरे पास है।',
    'med.step.chakra.sacral.0': 'अपना ध्यान निचले पेट पर लाएँ, नाभि से एक हथेली नीचे। यह आपका सैक्रल केंद्र है — यह महसूस करने, आनंद लेने, और जमने के बजाय जीवन को बहने देने की आपकी क्षमता को सहेजता है।',
    'med.step.chakra.sacral.1': 'साँस को इस जगह को कसने के बजाय नरम करने दें। मौन में, साँस की लय के साथ: मैं जीवन को अपने भीतर से बहने देता हूँ।',
    'med.step.chakra.solar-plexus.0': 'अपना ध्यान पसलियों के नीचे के नरम बिंदु पर लाएँ। यह आपका सोलर प्लेक्सस है — आपकी आग, आपकी इच्छाशक्ति, आपका वह हिस्सा जो सिकुड़ने के बजाय निर्णय लेता और कार्य करता है।',
    'med.step.chakra.solar-plexus.1': 'साँस को इसे बिना दबाव डाले, कोमलता से सुलगाने दें। मौन में, साँस की लय के साथ: मैं अपनी आग पर भरोसा करता हूँ।',
    'med.step.chakra.heart.0': 'अपना ध्यान छाती के केंद्र पर लाएँ। यह आपका हृदय केंद्र है — जो आपको खुद को खोए बिना देने की, और बचाव किए बिना पाने की अनुमति देता है।',
    'med.step.chakra.heart.1': 'साँस को इस जगह को आगे और पीछे फैलाने दें। मौन में, साँस की लय के साथ: मैं मुक्त रूप से प्रेम देता और लेता हूँ।',
    'med.step.chakra.throat.0': 'अपना ध्यान गले के गड्ढे पर लाएँ। यह आपकी आवाज़ है — जो आपको आसान बात के बजाय सच्ची बात कहने देती है।',
    'med.step.chakra.throat.1': 'साँस को यहाँ से बिना रुकावट गुज़रने दें। मौन में, साँस की लय के साथ: मैं सहजता से अपना सच कहता हूँ।',
    'med.step.chakra.third-eye.0': 'अपना ध्यान भौंहों के बीच की जगह पर लाएँ। यहीं आप वह महसूस करते हैं जो आप समझा पाने से पहले ही जानते हैं।',
    'med.step.chakra.third-eye.1': 'साँस को शोर को शांत करने दें ताकि वह शांत जानकारी सुनी जा सके। मौन में, साँस की लय के साथ: मैं जो भीतर देखता हूँ उस पर भरोसा करता हूँ।',
    'med.step.chakra.crown.0': 'अपना ध्यान सिर के शिखर पर लाएँ, और उससे थोड़ा ऊपर। यहीं आप आज की चिंताओं से बड़ी किसी चीज़ से जुड़ते हैं।',
    'med.step.chakra.crown.1': 'साँस को पूरे शरीर में धीरे-धीरे ऊपर उठकर वहाँ तक पहुँचने दें। मौन में, साँस की लय के साथ: मैं किसी विशाल चीज़ का हिस्सा हूँ, और वह मुझे थामे है।',
  },
  tr: {
    'med.step.settle': 'Gözler kapalı. Bedenin yerine oturmasına ve nefesin kendiliğinden yavaşlamasına izin ver.',
    'med.step.breath': 'Dikkatini nefese ver — içeri girişini izle, dışarı çıkışını izle. Zihin dağıldığında, o fark ediş pratiktir. Nazikçe geri dön.',
    'med.step.close': 'Pratiği bırak. Gözlerini açmadan önce şu an nasıl hissettiğini fark et.',
    'med.step.ba.count': 'Şimdi her verişi say — birden ona, sonra baştan başla. Sayıyı kaybedersen sadece birden başla. Kimse puan tutmuyor.',
    'med.step.scan.0': 'Dikkatini ayak tabanlarından yukarı doğru yavaşça süpür — bilekler, bacaklar, kalçalar, karın, sırt, göğüs, kollar, eller. Gerginlikle karşılaştığın yerde birkaç nefes dinlen ve yumuşamasına izin ver.',
    'med.step.scan.1': 'Şimdi omuzlar, boğaz, çene, gözlerin çevresindeki boşluk, saç derisi. Sonra tüm bedeni bir kerede hisset — ağır, sıcak, kendiliğinden nefes alan.',
    'med.step.metta.0': 'Kendini aklına getir, tam da bugünkü halinle. Sessizce sun: güvende olayım, iyi olayım, huzurlu olayım. Yavaşça tekrarla ve gerçekten kastetmene izin ver.',
    'med.step.metta.1': 'Kolayca sevdiğin birini aklına getir. Yüzünü canlandır ve aynısını sun: güvende ol, iyi ol, huzurlu ol.',
    'med.step.metta.2': 'Şimdi genişlet — zar zor tanıdığın biri, zor bulduğun biri, sonra herkes, her yerde: tüm varlıklar güvende olsun, tüm varlıklar huzurlu olsun.',
    'med.step.bath.0': 'Tonun ön plana gelmesine izin ver. Zorlanarak dinlemiyorsun — sesin, ışığın geldiği gibi gelmesine izin veriyorsun.',
    'med.step.bath.1': 'Sesin bedende nereye indiğini fark et — göğüs, kafatası, eller. Seninle ses arasındaki boşluğun erimesine izin ver.',
    'med.step.grat.0': 'Son bir günden iyi giden bir şeyi aklına getir, ne kadar küçük olursa olsun. Yalnızca adlandırma — minnetin bedende nereye yerleştiğini hisset.',
    'med.step.grat.1': 'Şimdi genellikle olağan saydığın bir şey — çalışan bir beden, bir çatı, kalan biri. Birkaç nefes onunla kal.',
    'med.step.grat.2': 'Bir tane daha — kendinle ilgili bir şey. Nasıl dik durduğun, hallettiğin bir şey, kimsenin görmediği bir çaba. Üçünü birlikte tut.',
    'med.step.safe.0': 'Kendini tamamen güvende hissettiğin bir yer canlandır — gerçek ya da hayali. Yavaşça bak: ışık, günün saati, ne duyduğun, teninde ne hissettiğin.',
    'med.step.safe.1': 'Burada en çok dinlenmek isteyeceğin noktayı bul ve oraya git. Senden hiçbir şey istenmiyor. İzin vermediğin hiçbir şey sana ulaşmıyor.',
    'med.step.mtn.0': 'Bir dağ canlandır — geniş tabanı, sağlam yamaçları, hareketsiz zirvesi. Bedeninin ve dağın aynı biçim olmasına izin ver: oturuş taban, omurga yamaç, baş zirve.',
    'med.step.mtn.1': 'Dağın çevresinde hava gelir gider — ışık, bulut, rüzgâr, fırtına. Düşüncelerin ve ruh halin havadır. Dağ onunla tartışmaz ve onunla küçülmez.',
    'med.step.open.0': 'Nefesin çıpasını bırak. Dikkatin belirli bir şeyde değil, geniş açık olsun. Sesler, duyumlar, düşünceler doğar ve geçer — ne peşlerinden gidersin ne de onları itersin.',
    'med.step.open.1': 'Farkındalığın kendisinin hareket etmediğini fark et. Şeyler onun içinde olur, bulutların gökyüzünün içinde olması gibi. O gökyüzü olarak dinlen — eklenecek bir şey yok, çıkarılacak bir şey yok.',
    'med.step.morn.0': 'Normalden biraz daha derin, üç dolu nefes — bedeni içeriden uyandırmalarına izin ver. Omuzları bir kez geriye çevir ve bedenin ön yüzünün açıldığını hisset.',
    'med.step.morn.1': 'Önündeki günü gevşekçe aklına getir, sonra bir niyet seç — bir görev değil, bir varoluş biçimi. Sabırlı. Dürüst. Cesur. Nazik. Bir kez söyle: bugün ___ olacağım.',
    'med.step.eve.0': 'Günün hafifçe geçmesine izin ver, tren penceresinden manzara gibi — sabah, öğle, akşam. Hiçbir şeyde durma. Bir an seni çekerse, not et ve söyle: şimdi değil.',
    'med.step.eve.1': 'Olduğuna sevindiğin bir anı ve günün gerçekten nasıl geçtiğine göre elinden geldiğince iyi yaptığın bir şeyi bul. Bunun yeterli olmasına izin ver. Şimdi tüm günü bırak — sadece bittiği için tamamlanmıştır.',
    'med.step.nidra.0': 'Tamamen hareketsiz uzan — doğal hissettirdiğinden daha hareketsiz, yalnızca nefes hareket ediyor. Kısa bir niyet belirle, şimdiki zamanda tek bir sakin cümle. İçinden üç kez söyle.',
    'med.step.nidra.1': 'Her yer adlandırıldıkça dikkatini oraya götür, hareket etmeden — sağ el: başparmak, parmaklar, avuç, bilek, önkol, dirsek, omuz. Sonra solda aynısı.',
    'med.step.nidra.2': 'İki kalça. Sağ bacak — uyluk, diz, kaval, ayak bileği, ayak, parmaklar. Sol bacak aynı. Tüm sırt yere yaslanmış, karın inip kalkarak, göğüs, boğaz.',
    'med.step.nidra.3': 'Yüz — çene, dudaklar, burun, yanaklar, gözler, kaşların arası, saç derisi. Şimdi tüm beden bir kerede, hafifçe parıldayarak, zeminin taşıdığı. Niyetine geri dön.',
    'med.step.chakra.root.0': 'Dikkatini omurganın tabanına, yerle buluştuğun yere getir. Bu senin kök merkezin — güvende olma, yeterli olma, burada olmaya izinli olma hissini taşır. Bugün sarsıntılı hissettiyse, o denge tam burada başlar.',
    'med.step.chakra.root.1': 'Nefes, ta en dibe ulaşıyormuş gibi nefes al. Sessizce, nefesin ritmiyle: Güvendeyim. Buradayım. İhtiyacım olana sahibim.',
    'med.step.chakra.sacral.0': 'Dikkatini alt karnına, göbeğinin bir el genişliği altına getir. Bu senin sakral merkezin — hissetme, keyif alma, donup kalmak yerine hayatın akmasına izin verme kapasiteni taşır.',
    'med.step.chakra.sacral.1': 'Nefesin bu alanı sıkmak yerine yumuşatmasına izin ver. Sessizce, nefesin ritmiyle: Hayatın içimden geçmesine izin veriyorum.',
    'med.step.chakra.solar-plexus.0': 'Dikkatini kaburgalarının altındaki yumuşak yere getir. Bu senin güneş sinir ağın — ateşin, iraden, büzülmek yerine karar veren ve harekete geçen tarafın.',
    'med.step.chakra.solar-plexus.1': 'Nefesin onu zorlamadan, nazikçe canlandırmasına izin ver. Sessizce, nefesin ritmiyle: Kendi ateşime güveniyorum.',
    'med.step.chakra.heart.0': 'Dikkatini göğsünün merkezine getir. Bu senin kalp merkezin — kendini kaybetmeden verebilmeni, korumaya çalışmadan alabilmeni sağlar.',
    'med.step.chakra.heart.1': 'Nefesin bu alanı, önden ve arkadan genişletmesine izin ver. Sessizce, nefesin ritmiyle: Sevgiyi özgürce verip alıyorum.',
    'med.step.chakra.throat.0': 'Dikkatini boğazının çukuruna getir. Bu senin sesin — kolay olanı değil, doğru olanı söylemeni sağlar.',
    'med.step.chakra.throat.1': 'Nefesin buradan engelsizce geçmesine izin ver. Sessizce, nefesin ritmiyle: Hakikatimi kolaylıkla söylüyorum.',
    'med.step.chakra.third-eye.0': 'Dikkatini kaşlarının arasındaki boşluğa getir. Burada, açıklayabilmeden önce bildiğini hissedersin.',
    'med.step.chakra.third-eye.1': 'Nefesin gürültüyü dindirmesine izin ver, böylece o sessiz bilgi duyulabilsin. Sessizce, nefesin ritmiyle: İçimde gördüğüme güveniyorum.',
    'med.step.chakra.crown.0': 'Dikkatini başının tepesine, biraz üstüne getir. Burada bugünün kaygılarından daha büyük bir şeyle bağlantı kurarsın.',
    'med.step.chakra.crown.1': 'Nefesin tüm bedenden yumuşakça yükselip ona ulaşmasına izin ver. Sessizce, nefesin ritmiyle: Uçsuz bucaksız bir şeyin parçasıyım ve o beni tutuyor.',
  },
}

async function synthesize(text, langCode) {
  const res = await fetch('https://api.inworld.ai/tts/v1/voice', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voiceId: VOICE_ID,
      modelId: MODEL_ID,
      audioConfig: { speakingRate: 0.9 },
      deliveryMode: 'BALANCED',
      language: langCode,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HTTP ${res.status}: ${body}`)
  }

  const json = await res.json()
  return Buffer.from(json.audioContent, 'base64')
}

async function main() {
  const completedLocales = []
  let stoppedEarly = false

  outer: for (const locale of LOCALES) {
    const dir = path.join(OUT_ROOT, locale)
    await mkdir(dir, { recursive: true })
    const lines = LINES[locale]
    const langCode = LANG_CODES[locale]

    for (const [key, text] of Object.entries(lines)) {
      process.stdout.write(`${locale}/${key}... `)
      try {
        const audio = await synthesize(text, langCode)
        await writeFile(path.join(dir, `${key}.mp3`), audio)
        console.log(`ok (${audio.length} bytes)`)
      } catch (err) {
        console.log('FAILED')
        console.error(`  ${err.message}`)
        console.error(`\nStopped during "${locale}" — looks like the credit wall. Top up and re-run; already-written files won't be redone since this run continues from here next time only if you re-run with just the remaining locales.`)
        stoppedEarly = true
        break outer
      }
    }
    completedLocales.push(locale)
  }

  console.log(`\nFully completed locales this run: ${completedLocales.join(', ') || '(none)'}`)
  if (stoppedEarly) console.log('Stopped early due to a failure (likely credits).')
}

main()
