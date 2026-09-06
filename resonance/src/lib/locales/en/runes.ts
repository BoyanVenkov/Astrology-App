/**
 * The Elder Futhark — meanings, upright and merkstave (shadow) readings, and a
 * daily directive for each of the 24 runes, plus the chrome for the Runes
 * screen. Written in a plain seer's voice: what the rune is, what it is doing
 * now, and what it asks of you.
 *
 * English-complete; other locales fall back here per-key until they ship their
 * own `runes.ts`. Rune names are Old Norse and stay the same in every language.
 */
export const runes = {
  /* ------------------------------------------------------------ chrome */
  'rune.eyebrow': 'The Runes',
  'rune.dailyTitle': 'Your rune for today',
  'rune.dailyBlurbChart':
    'One rune, cast for your chart and this date. It renews at midnight.',
  'rune.dailyBlurbPlain': 'One rune for the day. It renews at midnight.',
  'rune.tapReveal': 'Tap the stone to turn it.',
  'rune.turnStone': 'Turn the stone',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'It fell reversed — read for the shadow side, the block, or the lesson still unlearned.',
  'rune.sound': 'Sound',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': "Freyr's Ætt",
  'rune.aett.2': "Heimdall's Ætt",
  'rune.aett.3': "Týr's Ætt",

  'rune.element.fire': 'Fire',
  'rune.element.ice': 'Ice',
  'rune.element.earth': 'Earth',
  'rune.element.air': 'Air',
  'rune.element.water': 'Water',
  'rune.element.spirit': 'Spirit',

  'rune.resonance.match':
    'The runes and the sky agree today — both point to your {chakra}.',
  'rune.resonance.bridge':
    "Today's sky works your {sky}; the rune answers from your {rune}.",

  'rune.cast': 'Cast the runes',
  'rune.castSub': 'The Three Norns, or the five-rune cross',
  'rune.chooseTitle': 'Choose a cast',
  'rune.chooseBlurb': 'Hold your question, then choose how the runes should fall.',
  'rune.runeCount.one': '1 rune',
  'rune.runeCount.many': '{n} runes',
  'rune.castEyebrow': 'The Runes · {layout}',
  'rune.drawAgain': 'Cast again',
  'rune.doCast': 'Cast',

  'rune.layout.norns': 'The Three Norns',
  'rune.layout.nornsSub': 'What has become, what is becoming, what is owed',
  'rune.layout.cross': 'The Five-Rune Cross',
  'rune.layout.crossSub': 'A fuller look at one situation',

  'rune.pos.now': 'Now',
  'rune.pos.now.prompt': 'where you stand',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'that which has become — the root of it',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'that which is becoming — the present turning',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'that which shall be — what is owed, and where it leads',
  'rune.pos.heart': 'The heart',
  'rune.pos.heart.prompt': 'the core of the matter',
  'rune.pos.crossing': 'What crosses it',
  'rune.pos.crossing.prompt': 'the obstacle or the help',
  'rune.pos.root': 'The root',
  'rune.pos.root.prompt': 'what it grows from',
  'rune.pos.counsel': 'The counsel',
  'rune.pos.counsel.prompt': 'what the runes advise',
  'rune.pos.outcome': 'Where it leads',
  'rune.pos.outcome.prompt': 'the way it tends',

  'rune.ask': 'Ask the runes',
  'rune.askSub': 'One rune, one answer to your question',
  'rune.askEyebrow': 'The Runes · The Question',
  'rune.askBlurb':
    'Put your question plainly and hold it while the rune is drawn.',
  'rune.askPlaceholder': 'Should I…  ·  Is it time to…  ·  What do I need to know about…',
  'rune.consult': 'Draw a rune',
  'rune.askAgain': 'Ask again',
  'rune.youAsked': 'You asked',
  'rune.answerReading': 'What the rune says',
  'rune.castReading': 'The reading',

  'rune.verdict.yes': 'Yes',
  'rune.verdict.no': 'No',
  'rune.verdict.wait': 'Not yet',
  'rune.verdict.hidden': 'Hidden',
  'rune.verdict.yes.gloss': 'The rune leans toward yes. Move, and mean it.',
  'rune.verdict.no.gloss': 'The rune leans away. Forcing this now costs more than it returns.',
  'rune.verdict.wait.gloss':
    'The rune says the timing is not ripe. Prepare, and let the moment come to you.',
  'rune.verdict.hidden.gloss':
    'The rune keeps its counsel. This one is not yours to know yet — the answer is still forming.',

  'rune.library': 'The Elder Futhark',
  'rune.librarySub': 'All twenty-four, to sit with',

  'dash.dailyRune': 'Rune of the day',
  'dash.runeSeen': "Today's rune is turned",
  'dash.runeNew': 'Cast your rune for today',

  /* ---------------------------------------------- Freyr's Ætt (1–8) */
  'rune.fehu.meaning': 'Cattle — movable wealth, and what it can buy or cost',
  'rune.fehu.keywords': 'Wealth · Beginnings · Flow',
  'rune.fehu.up':
    'Fehu is the herd: wealth that moves, multiplies, and slips away if it is hoarded. It marks the arrival of new resources — money, energy, opportunity, standing — and the start of something that can grow. The catch is in its nature: this only stays alive if it keeps circulating. Spend some of it, share some of it, put it to work. What you clutch, you lose.',
  'rune.fehu.merk':
    'Reversed, Fehu is loss, or wealth that owns you rather than the other way round. Something is draining away, or you are guarding a resource so tightly it has stopped doing you any good. Look at where your energy and money actually go, and be honest about what is worth keeping.',
  'rune.fehu.today':
    'Put something into circulation today — money, effort, or a kind word you have been saving.',

  'rune.uruz.meaning': 'The aurochs — wild, untamed vital strength',
  'rune.uruz.keywords': 'Vitality · Endurance · Raw form',
  'rune.uruz.up':
    'Uruz is the wild ox: power that has not been broken to the plough. It brings a surge of physical vitality, stubborn endurance, and the strength to shape raw circumstance into something of your own. This is a good rune for beginnings that need muscle — starting the training, breaking the ground, holding a boundary. The strength is real; the work is learning to steer it.',
  'rune.uruz.merk':
    'Reversed, Uruz is strength misused or missing — force turned against yourself, or a weakness where you need to stand firm. You may be pushing when you should pause, or letting something wild in your life go unmanaged. Reclaim the power without letting it run you.',
  'rune.uruz.today':
    'Use your body today — walk far, lift something heavy, or push through one thing you have been putting off.',

  'rune.thurisaz.meaning': 'The thorn — a sharp, reactive, defensive force',
  'rune.thurisaz.keywords': 'Defence · Reaction · A hard gate',
  'rune.thurisaz.up':
    'Thurisaz is the thorn on the hedge and the giant’s hammer: a force that protects by hurting, and clears by breaking. It often marks a confrontation, a hard boundary, or a situation that will not yield to charm. Met head-on it wounds; met with patience it becomes a gate. Do not pick this fight, but do not pretend the thorn is not there.',
  'rune.thurisaz.merk':
    'Reversed, Thurisaz is a defence that has become a wall, or a reactive temper doing damage. You may be lashing out, or so braced against attack that nothing good can reach you either. Put the hammer down before you swing it at someone who did not earn it.',
  'rune.thurisaz.today':
    'Hold one boundary today without apologising for it — and resist the urge to explain it three times.',

  'rune.ansuz.meaning': 'The god — the breath, the word, the message from Odin',
  'rune.ansuz.keywords': 'Voice · Message · Insight',
  'rune.ansuz.up':
    'Ansuz is the breath of the All-Father: speech, signal, and the sudden clarity that arrives from outside your own effort. A message is coming, or a conversation matters more than it looks. It also rules your own voice — this is the day to say the true thing clearly, to teach, to name what you see. Listen closely; the answer may be in someone else’s mouth.',
  'rune.ansuz.merk':
    'Reversed, Ansuz is miscommunication, a message misheard, or wisdom you are refusing to hear because of who it comes from. Words are being used to confuse rather than clarify — yours or someone else’s. Slow the conversation down and check what was actually meant.',
  'rune.ansuz.today':
    'Say the clear thing out loud today, and listen twice as hard as you speak.',

  'rune.raidho.meaning': 'The ride — the journey, the wheel, right rhythm',
  'rune.raidho.keywords': 'Journey · Rhythm · Right order',
  'rune.raidho.up':
    'Raidho is the wagon on the road: movement with a direction, and the sense of being carried along a path that has its own rhythm. It favours travel, decisions that get you moving, and putting things back into their proper order. The lesson is that the journey has a pace of its own — you cannot rush the road, but you can stop fighting it.',
  'rune.raidho.merk':
    'Reversed, Raidho is a journey stalled, a plan out of sequence, or movement in the wrong direction. Something is off-rhythm — a trip you should not take, or a rush that will cost you. Get the order of things right before you set off again.',
  'rune.raidho.today':
    'Do the next right step in order today; resist the urge to skip ahead to the interesting part.',

  'rune.kenaz.meaning': 'The torch — controlled fire, craft, and knowledge',
  'rune.kenaz.keywords': 'Insight · Craft · Creative fire',
  'rune.kenaz.up':
    'Kenaz is the flame in the hall: not the wildfire but the worked fire — the forge, the lamp, the spark of understanding. It brings clarity into a dark corner, skill to a task, and the creative heat to make rather than just imagine. Something you have been in the dark about becomes visible. Take what you now see and shape it into something real.',
  'rune.kenaz.merk':
    'Reversed, Kenaz is a light going out — inspiration lost, a project cooling, or knowledge used to burn rather than build. You may be creatively blocked, or clinging to a way of doing things that no longer sheds any light. Let the dead thing go dark so a new flame can catch.',
  'rune.kenaz.today':
    'Make something today, however small and rough — the point is to bring an idea into form.',

  'rune.gebo.meaning': 'The gift — exchange, and the bond it creates',
  'rune.gebo.keywords': 'Gift · Exchange · Partnership',
  'rune.gebo.up':
    'Gebo is the gift given and the gift owed — the thread of obligation and generosity that binds people together. It marks a genuine exchange: a partnership, a contract, an act of giving that will come back around. There is no reversed Gebo, because a gift, once given, cannot be un-given. Give freely and receive gracefully, and watch the balance even out over time.',
  'rune.gebo.today':
    'Give something today with no ledger in mind — and let yourself accept what is offered back.',

  'rune.wunjo.meaning': 'Joy — harmony, belonging, and things clicking into place',
  'rune.wunjo.keywords': 'Joy · Harmony · Belonging',
  'rune.wunjo.up':
    'Wunjo is the joy of the well-run hall: not ecstasy but contentment, the feeling of things fitting together and of being among your own people. It marks a resolution, a reward earned, or a moment where the pieces align. Let yourself notice it. This rune asks you to accept the good that is actually here rather than holding out for a better version.',
  'rune.wunjo.merk':
    'Reversed, Wunjo is joy delayed or a false harmony held together by not saying the hard thing. Something is out of tune under the surface. Do not paper over it — the real ease comes after the honest conversation, not instead of it.',
  'rune.wunjo.today':
    'Name one thing that is genuinely going well, and let that be enough for today.',

  /* -------------------------------------------- Heimdall's Ætt (9–16) */
  'rune.hagalaz.meaning': 'Hail — sudden disruption from outside your control',
  'rune.hagalaz.keywords': 'Disruption · Crisis · Clearing',
  'rune.hagalaz.up':
    'Hagalaz is the hailstorm: destruction that falls from the sky, ruins the crop, and then melts into the water that feeds the next one. It marks an interruption you did not choose and cannot argue with — an event that breaks the pattern. There is nothing to fight here. Take shelter, let it pass, and look at what is still standing afterwards. Hail clears ground.',
  'rune.hagalaz.today':
    'Do not start anything fragile today. Batten down, wait out the weather, and trust that the ground clears.',

  'rune.nauthiz.meaning': 'Need — friction, constraint, and the fire it makes',
  'rune.nauthiz.keywords': 'Constraint · Need · Hard lesson',
  'rune.nauthiz.up':
    'Nauthiz is the need-fire, lit by rubbing two sticks together under pressure. It marks a constraint — a shortage, a delay, a situation you cannot yet get out of — and the resourcefulness that constraint forces out of you. The lesson is patience under friction. Meet the lack honestly, do the small disciplined thing within your power, and let the resistance teach you what you actually need.',
  'rune.nauthiz.merk':
    'Reversed, Nauthiz is need denied — pretending the constraint is not there, or letting hardship curdle into resentment and rash decisions. Stop fighting the fact of the limit. The way through is acceptance first, then patient, deliberate action.',
  'rune.nauthiz.today':
    'Accept one limit today instead of arguing with it, and do the one small disciplined thing it leaves open to you.',

  'rune.isa.meaning': 'Ice — stillness, a standstill, the frozen moment',
  'rune.isa.keywords': 'Stillness · Standstill · Clarity',
  'rune.isa.up':
    'Isa is the river frozen solid: all motion stopped, everything held in place. It marks a standstill — a plan on hold, a relationship in stasis, a period where nothing you push seems to move. This is not failure; it is winter. Stop trying to force the thaw. Use the stillness to see clearly what is under the ice, and conserve your strength for spring.',
  'rune.isa.today':
    'Stop pushing the stuck thing today. Sit with it, look at it clearly, and let the stillness do its work.',

  'rune.jera.meaning': 'The year — harvest, cycles, and effort coming to fruit',
  'rune.jera.keywords': 'Harvest · Cycles · Right timing',
  'rune.jera.up':
    'Jera is the turning year: seed, growth, harvest, rest, and seed again. It marks the point where earlier effort finally yields — not through a lucky break but because enough time has passed and enough work has been done. It also counsels patience with what is not ripe yet. You cannot hurry a season. Tend what you planted, and gather what is ready.',
  'rune.jera.today':
    'Collect on something you planted a while ago — finish it, bank it, or simply notice it worked.',

  'rune.eihwaz.meaning': 'The yew — the axis between life and death, endurance',
  'rune.eihwaz.keywords': 'Endurance · Transformation · The axis',
  'rune.eihwaz.up':
    'Eihwaz is the yew tree, evergreen and poisonous, its roots in the underworld and its crown in the light — the pole that runs through the worlds. It marks endurance through a hard passage, and a change that goes all the way down. Something must end for the next thing to live. Stand like the yew: rooted, unmoving, connected to both what is dying and what is being born.',
  'rune.eihwaz.today':
    'Face the ending you have been avoiding today — not to force it, just to stop pretending it is not happening.',

  'rune.perthro.meaning': 'The lot-cup — mystery, chance, and what fate keeps hidden',
  'rune.perthro.keywords': 'Mystery · Chance · The unseen',
  'rune.perthro.up':
    'Perthro is the cup the lots are shaken from — the moment before the dice land, when the outcome exists but cannot be seen. It rules secrets, hidden influences, luck, and the parts of the pattern that are simply not yours to know yet. Something is being decided out of sight. Play your part well and let the cast fall; not everything is meant to be figured out in advance.',
  'rune.perthro.merk':
    'Reversed, Perthro is a secret that needs to stay buried being dug up, or an unhealthy fixation on knowing the outcome. Stop trying to force the reveal. Some things rot in the light before their time.',
  'rune.perthro.today':
    'Let one thing stay unknown today. Do your part, and stop refreshing the page.',

  'rune.algiz.meaning': 'The elk — protection, and the reach toward the higher',
  'rune.algiz.keywords': 'Protection · Connection · Higher help',
  'rune.algiz.up':
    'Algiz is the elk with its antlers raised, and the sedge grass that cuts the hand that grabs it — a rune of protection, and of the link between you and something larger. It marks a shield around you right now, and support available from above your own level if you reach for it. Ask for help. Stand tall. What is watching over you is on your side.',
  'rune.algiz.merk':
    'Reversed, Algiz is protection dropped or help refused — leaving yourself open where you should be guarded, or cutting yourself off from the support that is there. Check your defences, and let someone in.',
  'rune.algiz.today':
    'Ask for help with one thing today, from a person or a power above your own pay grade.',

  'rune.sowilo.meaning': 'The sun — wholeness, success, and the will that guides',
  'rune.sowilo.keywords': 'Success · Wholeness · Clear will',
  'rune.sowilo.up':
    'Sowilo is the sun-wheel: the light that always returns, the victory that comes from a will pointed steadily at one thing. It marks success, health, and a clarifying force that burns off fog. There is no reversed Sowilo — the sun does not go backwards. Aim your energy at what matters, keep it there, and expect the outcome to go your way.',
  'rune.sowilo.today':
    'Point everything at one goal today. No hedging, no second target — just the one, until dark.',

  /* --------------------------------------------------- Týr's Ætt (17–24) */
  'rune.tiwaz.meaning': 'Týr — justice, courage, and the willing sacrifice',
  'rune.tiwaz.keywords': 'Justice · Courage · Sacrifice',
  'rune.tiwaz.up':
    'Tiwaz is the spear and the hand Týr gave to the wolf to keep his word — a rune of justice, honour, and doing the right thing at a real cost. It favours legal matters, fair fights, and standing by a commitment when it stops being convenient. Point yourself at what is true and hold the line. Victory here is the kind you can live with afterwards.',
  'rune.tiwaz.merk':
    'Reversed, Tiwaz is courage failing, a commitment abandoned, or justice bent out of shape. You may be avoiding a stand you know you should take, or spending your energy on a fight that is not honest. Recommit to what is actually right, even if it costs you the win.',
  'rune.tiwaz.today':
    'Keep one promise today that has become inconvenient, and take the stand you have been ducking.',

  'rune.berkano.meaning': 'The birch — growth, nurture, and quiet new beginnings',
  'rune.berkano.keywords': 'Growth · Nurture · New beginnings',
  'rune.berkano.up':
    'Berkano is the birch, first tree to green after the ice — a rune of gentle, sheltered growth: pregnancy, a new project in its tender phase, healing, the care that lets a small thing become strong. It asks you to nurture rather than push. Protect the new shoot, feed it, keep the frost off it, and let it grow at the pace growth actually takes.',
  'rune.berkano.merk':
    'Reversed, Berkano is growth stunted or care withdrawn — a new thing neglected, a family knot, or self-neglect dressed up as toughness. Something needs tending that you have been leaving to fend for itself. Go back and mother it properly.',
  'rune.berkano.today':
    'Tend one growing thing today — a person, a plan, or yourself — with actual care, not just intention.',

  'rune.ehwaz.meaning': 'The horse — partnership, trust, and steady movement',
  'rune.ehwaz.keywords': 'Partnership · Trust · Momentum',
  'rune.ehwaz.up':
    'Ehwaz is the horse and rider moving as one — a rune of trusted partnership, teamwork, and progress made together that neither could make alone. It marks a relationship that is working, or a collaboration worth committing to. The bond is built on trust and on both parties pulling in the same direction. Where you have that, lean into it; where you want it, be the reliable half first.',
  'rune.ehwaz.merk':
    'Reversed, Ehwaz is a partnership out of step — mistrust, one party carrying the other, or movement that has stalled because you no longer want the same thing. Name where the trust broke, and decide honestly whether you are still riding together.',
  'rune.ehwaz.today':
    'Do one thing with someone today rather than alone, and be the half that can be relied on.',

  'rune.mannaz.meaning': 'The human — the self, and the self among others',
  'rune.mannaz.keywords': 'Self · Community · Perspective',
  'rune.mannaz.up':
    'Mannaz is the rune of humankind — you as an individual, and you as one node in a web of others. It asks you to see yourself clearly: your gifts, your limits, and your reflection in the people around you. It often marks a moment of needing others, or being needed, or seeing yourself honestly through someone else’s eyes. You are not meant to do this alone, and you are not the centre of it either.',
  'rune.mannaz.merk':
    'Reversed, Mannaz is isolation, or a self-image that has drifted from the truth — either inflated or unfairly harsh. You may be cut off from your people, or your own worst critic. Get an outside view from someone who will be honest and kind.',
  'rune.mannaz.today':
    'See yourself through the eyes of someone who knows you well today, and adjust the picture where it is wrong.',

  'rune.laguz.meaning': 'Water — flow, intuition, and the deep unconscious',
  'rune.laguz.keywords': 'Flow · Intuition · The deep',
  'rune.laguz.up':
    'Laguz is the lake and the sea: flow, feeling, dream, and the deep water of the unconscious where things move that the daylight mind cannot see. It favours trusting a gut sense over a spreadsheet, going with the current rather than against it, and paying attention to what your dreams and moods are telling you. The tide knows where it is going. For now, let it carry you.',
  'rune.laguz.merk':
    'Reversed, Laguz is a flood, or being pulled under — overwhelmed by feeling, avoiding something by drifting, or an intuition that has curdled into fear or fantasy. Get your feet on the ground. Not every current is worth following, and not every wave is a warning.',
  'rune.laguz.today':
    'Trust the gut read today over the clever argument, and pay attention to what you dream tonight.',

  'rune.ingwaz.meaning': 'Ing — gestation, stored potential, a cycle completed',
  'rune.ingwaz.keywords': 'Gestation · Potential · Completion',
  'rune.ingwaz.up':
    'Ingwaz is the seed sealed in the earth over winter — potential held in a closed container, doing its work out of sight until it is ready to release all at once. It marks the end of a gestation: a project, a decision, or an inner process that has been quietly cooking is about to be done. Do not open the box early. When it is finished, it will finish cleanly, and you will feel the relief of it.',
  'rune.ingwaz.today':
    'Let the thing that is nearly ready finish in its own time today. Stop poking it.',

  'rune.dagaz.meaning': 'Day — breakthrough, awakening, the turn from dark to light',
  'rune.dagaz.keywords': 'Breakthrough · Awakening · Turning point',
  'rune.dagaz.up':
    'Dagaz is dawn: the hinge between night and day, the moment the light comes back and everything looks different. It marks a breakthrough — a realisation, a change of heart, a situation that flips from stuck to moving all at once. There is no reversed Dagaz; dawn does not un-happen. Something you have been in the dark about is about to become obvious. Be ready to act on it.',
  'rune.dagaz.today':
    'Act on the realisation today, while it is still bright. Insight fades if you sleep on it too long.',

  'rune.othala.meaning': 'The homestead — inheritance, heritage, and what is truly yours',
  'rune.othala.keywords': 'Heritage · Home · What endures',
  'rune.othala.up':
    'Othala is the ancestral land: what you inherit, what you belong to, and the things that cannot be taken because they are woven into who you are. It marks questions of home, family, tradition, and legacy — what to keep from where you come from, and what to leave behind. Claim what is genuinely yours. Tend it. And be honest about which inheritances are gifts and which are just old weight.',
  'rune.othala.merk':
    'Reversed, Othala is a bad inheritance clung to, or a rootlessness that will not settle — old family patterns run on autopilot, or a refusal to belong anywhere. Sort the heirlooms. Keep what serves the future; give the rest a respectful burial.',
  'rune.othala.today':
    'Keep one thing from where you come from today, and consciously set down one thing you have been carrying out of habit.',
} as const
