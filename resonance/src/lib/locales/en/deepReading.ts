/**
 * The deep, long-form reading — the paid Full Horoscope and the detailed
 * Compatibility review. Written to read like a page or two from a real
 * astrologer: the transiting force, the natal point it touches, the sign and
 * house it lands in, the timing, how it shows up day to day, and what it asks.
 *
 * Split into its own module so other locales can adopt it file-by-file; until a
 * locale ships its own `deepReading.ts` these keys fall back to English
 * (see `translate()`), and the shorter native strings keep working everywhere.
 */
export const deepReading = {
  /* ---- daily (free) horoscope: a touch more depth on each note ---- */
  'horo.deep.q.house': 'It’s landing in the area of {theme}.',
  'horo.deep.q.hard': 'Move carefully with this one.',
  'horo.deep.q.soft': 'Worth a small, deliberate step.',
  'horo.deep.q.neutral': 'Let it settle before you act.',
  'horo.deep.q.thread':
    'The thread today keeps returning to your {focus} — that’s where to keep your attention.',
  'scr.horo.weekHead': 'The bigger arc',

  /* ============================ FULL HOROSCOPE ============================ */

  /* -- what it means when each planet is the TRANSITING (moving) force -- */
  'dh.tr.Sun':
    'The Sun is the day-mover — wherever it goes it puts a spotlight there for about a month, warming that part of the chart and asking you to show up as yourself in it.',
  'dh.tr.Moon':
    'The Moon is the fastest body in the sky; its transits are brief but they set the emotional tone of the day and stir whatever they touch to the surface.',
  'dh.tr.Mercury':
    'Mercury governs thinking, talking and the small decisions that add up. Its transits speed up the traffic of information around a subject — conversations, messages, paperwork, second thoughts.',
  'dh.tr.Venus':
    'Venus rules attraction, comfort, money and taste. When it transits a point it sweetens the ground there and makes connection, spending and enjoyment come more easily.',
  'dh.tr.Mars':
    'Mars is raw drive and heat. Its transits light a fire under whatever they touch — you get more courage and more friction in the same package, and the urge to act before you have thought it fully through.',
  'dh.tr.Jupiter':
    'Jupiter is the planet of growth and more. It expands whatever it contacts — opportunity, confidence, appetite, and occasionally excess — and it tends to make the door in that area of life swing wider for about a year.',
  'dh.tr.Saturn':
    'Saturn is time, structure and consequence. Where it goes it slows things down and asks whether what you have built there can carry weight; what can, it strengthens, and what cannot, it quietly takes apart so you can rebuild it properly.',
  'dh.tr.Uranus':
    'Uranus is the disruptor. Its transits break a pattern that has gone stale — often through a surprise, a sudden restlessness, or a change you did not plan — and hand you back some freedom you had signed away.',
  'dh.tr.Neptune':
    'Neptune dissolves edges. Where it transits, the outlines go soft: more imagination and compassion, but also more confusion, and a pull to escape rather than face the thing directly.',
  'dh.tr.Pluto':
    'Pluto works underground and does not rush. Its transits bring a slow, thorough transformation to whatever they touch — power struggles, endings, and a stripping-back to what is actually essential.',

  /* -- what your NATAL point governs in your own chart -- */
  'dh.na.Sun':
    'your core identity, your vitality, and the sense of who you are when you are most yourself',
  'dh.na.Moon':
    'your instincts, your moods, and what you need in order to feel safe and held',
  'dh.na.Mercury':
    'how you think, learn, speak and make everyday decisions',
  'dh.na.Venus':
    'how you love and are loved, what you find beautiful, and your relationship with money and pleasure',
  'dh.na.Mars':
    'your drive, your anger, your desire, and how you go after what you want',
  'dh.na.Jupiter':
    'where you look for meaning and growth, and your natural sense of faith and possibility',
  'dh.na.Saturn':
    'your relationship with discipline, authority and limits — the place you have had to grow up the hard way',
  'dh.na.Uranus':
    'your need to be free and to do things your own way',
  'dh.na.Neptune':
    'your imagination, your spirituality, and the places you are prone to idealise or lose yourself',
  'dh.na.Pluto':
    'your relationship with power and control, and what in you is built to be transformed',

  /* -- the nature of each aspect (two variants, rotated per section) -- */
  'dh.asp.nat.conjunction.0':
    'A conjunction is a merger. The two forces occupy the same degree and act as one, starting a fresh cycle in this area of your life — a seed being planted rather than a harvest being gathered.',
  'dh.asp.nat.conjunction.1':
    'A conjunction fuses the two energies so completely that it is hard to tell them apart. It marks a beginning; whatever takes shape now will unfold over the years that follow.',
  'dh.asp.nat.opposition.0':
    'An opposition works through the mirror of other people and outside circumstances. The tension is real, but it is there to bring you awareness — you see the issue clearly because something is standing opposite it.',
  'dh.asp.nat.opposition.1':
    'An opposition pulls you between two poles and asks you to hold both rather than collapse into one. Balance here is not a compromise; it is a skill you build under pressure.',
  'dh.asp.nat.square.0':
    'A square is a friction aspect. The two energies want different things and keep catching on each other, and the discomfort is the point — it is the grit that forces a real change rather than a cosmetic one.',
  'dh.asp.nat.square.1':
    'A square puts an obstacle in the road exactly where you would rather not deal with one. Pushing straight through rarely works; the way past is usually to change your approach, not to try harder.',
  'dh.asp.nat.trine.0':
    'A trine is an open channel. The two energies cooperate without being asked, and support flows toward you here — but only reaches you if you actually move toward it.',
  'dh.asp.nat.trine.1':
    'A trine makes this area of life feel easy and natural for a while. The risk is complacency; ease you do not use tends to quietly drain away.',
  'dh.asp.nat.sextile.0':
    'A sextile is an opportunity you have to accept on purpose. The door is unlocked but not open — a small, deliberate action now turns a possibility into something real.',
  'dh.asp.nat.sextile.1':
    'A sextile offers a helpful opening in this part of your life. It rewards initiative and does nothing at all for waiting.',

  /* -- short verb phrase for the section opener -- */
  'dh.asp.verb.conjunction': 'is meeting and merging with',
  'dh.asp.verb.opposition': 'is pulling against',
  'dh.asp.verb.square': 'is grinding against',
  'dh.asp.verb.trine': 'is flowing toward',
  'dh.asp.verb.sextile': 'is opening a door to',

  /* -- how energy expresses in the sign the natal point sits in -- */
  'dh.sign.Aries':
    'fast-moving, direct and a little combative, more inclined to act than to wait',
  'dh.sign.Taurus':
    'slow, sensual and stubborn, resistant to being rushed and slow to let go',
  'dh.sign.Gemini':
    'curious and verbal, quick to connect ideas and quick to get restless',
  'dh.sign.Cancer':
    'tender and protective, leading with feeling before logic',
  'dh.sign.Leo':
    'warm, expressive and proud, needing to be seen in order to feel real',
  'dh.sign.Virgo':
    'precise and practical, happiest when it can be genuinely useful',
  'dh.sign.Libra':
    'oriented toward balance, fairness and good company, and averse to a scene',
  'dh.sign.Scorpio':
    'intense and private, all-or-nothing, and drawn to what is hidden',
  'dh.sign.Sagittarius':
    'restless for room, meaning and a wider view, and impatient with fine print',
  'dh.sign.Capricorn':
    'serious and self-disciplined, more impressed by results than by promises',
  'dh.sign.Aquarius':
    'independent and future-facing, thinking in systems rather than feelings',
  'dh.sign.Pisces':
    'dreamy, permeable and compassionate, and easily overwhelmed',

  /* -- what a transit through each house tends to stir up -- */
  'dh.house.1':
    'In the first house the work is visible on you — your body, your image, the first impression you make. It is a good stretch to redraw how you show up rather than keep an outline that no longer fits.',
  'dh.house.2':
    'In the second house it touches money, resources and self-worth. The outer question is what you earn and own; the inner one is what you believe you deserve.',
  'dh.house.3':
    'In the third house it stirs the everyday mind — conversations, short trips, siblings and neighbours, the endless small exchange of information. Pay attention to what you keep telling yourself.',
  'dh.house.4':
    'In the fourth house it reaches the roots — home, family, your past, and the private base you return to. Something in your foundation is being examined.',
  'dh.house.5':
    'In the fifth house it touches play, romance, creativity and the things you make for the joy of it. It is asking where your spark went and how to get it back.',
  'dh.house.6':
    'In the sixth house it works through routine, health, and the daily labour of keeping yourself and your work running. Small habits carry more weight than usual now.',
  'dh.house.7':
    'In the seventh house the mirror is other people — partners, close others, the person across the table. What you meet in them is often something of your own you have not looked at directly.',
  'dh.house.8':
    'In the eighth house it goes to the deep water — shared money, intimacy, power, and what is ending. This is not small-talk territory; something is being transformed at the root.',
  'dh.house.9':
    'In the ninth house it opens the wider view — belief, study, travel, and the search for meaning. Your sense of what it is all for is being stretched.',
  'dh.house.10':
    'In the tenth house it is public — career, reputation, your standing and the role you play in the world. What you are known for is up for revision.',
  'dh.house.11':
    'In the eleventh house it touches friendship, community, and the future you are reaching toward. The company you keep and the goals you hold are being sorted.',
  'dh.house.12':
    'In the twelfth house it works in the background — rest, solitude, the unconscious, and what you have been carrying without naming. This is quiet, inward work.',

  /* -- "in daily life this can look like…" (rotated per aspect) -- */
  'dh.life.conjunction.0':
    'In daily life this can feel like a fresh start you did not entirely choose — new terms, a new chapter opening in this area whether or not you feel ready.',
  'dh.life.conjunction.1':
    'Day to day it can arrive as a strong new interest, a person who changes the frame, or simply the sense that the old version of this is over.',
  'dh.life.conjunction.2':
    'Practically it often shows up as a threshold — a decision, a move, a commitment that resets the clock in this part of your life.',
  'dh.life.opposition.0':
    'In daily life this often plays out through someone else — a disagreement, a demand, or a person who embodies exactly the thing you are wrestling with.',
  'dh.life.opposition.1':
    'Day to day it can feel like being caught between two valid needs — yours and someone else’s, or two parts of your own life that will not both fit.',
  'dh.life.opposition.2':
    'Practically it tends to bring things to a head: a conversation you can no longer put off, a choice that has been waiting for you to make it.',
  'dh.life.square.0':
    'In daily life this can look like a plan that keeps stalling, a person who keeps pushing the same button, or a task that feels far heavier than it should.',
  'dh.life.square.1':
    'Day to day it often arrives as frustration — effort that is not converting, a wall where you expected a door.',
  'dh.life.square.2':
    'Practically it shows up as pressure that will not let you coast: the thing you have been avoiding is now in the road.',
  'dh.life.trine.0':
    'In daily life this can feel like a run of small green lights — help that arrives, timing that works, a yes where you braced for a no.',
  'dh.life.trine.1':
    'Day to day it often shows up as ease and flow in this area, and a temptation to assume it will always be this simple.',
  'dh.life.trine.2':
    'Practically it is a favourable window — introductions land, requests get a warm reception, the path is briefly clear.',
  'dh.life.sextile.0':
    'In daily life this can look like an opening you almost miss — an offer, a chance meeting, a small door that only stays open if you step through it now.',
  'dh.life.sextile.1':
    'Day to day it tends to reward the person who makes the first move: send the message, ask the question, put your name forward.',
  'dh.life.sextile.2':
    'Practically it is a low-cost opportunity — not dramatic, but worth acting on while it is here.',

  /* -- the deeper invitation of the aspect (rotated) -- */
  'dh.invite.conjunction.0':
    'The invitation is to plant deliberately. What you begin now, however small, is the seed of something you will still be living with years from now — so choose it on purpose.',
  'dh.invite.conjunction.1':
    'The deeper work is to let the old form of this go cleanly, without dragging it half-alive into the new chapter.',
  'dh.invite.conjunction.2':
    'What this really asks is a clear yes or a clear no. Ambivalence is the one response that wastes the window.',
  'dh.invite.opposition.0':
    'The invitation is not to win. It is to hold both sides long enough to find the third option that honours what is true in each.',
  'dh.invite.opposition.1':
    'The deeper work is to take back the part of this you have been outsourcing to someone else — the strength, the need, or the blame.',
  'dh.invite.opposition.2':
    'What this asks is honest awareness. Once you can actually see the pattern, you are no longer inside it.',
  'dh.invite.square.0':
    'The invitation is not to push harder. It is to notice what you have outgrown here and let the friction take it apart, so something sturdier can be built.',
  'dh.invite.square.1':
    'The deeper work is a change of method. The goal may be fine; the way you have been going about it is what is generating the resistance.',
  'dh.invite.square.2':
    'What this really asks is maturity in a specific place — to do the unglamorous, structural thing you have been hoping you could skip.',
  'dh.invite.trine.0':
    'The invitation is to use the ease, not just enjoy it. Support that goes unspent tends to quietly disappear.',
  'dh.invite.trine.1':
    'The deeper work is to build something during the calm that will hold when the weather turns again.',
  'dh.invite.trine.2':
    'What this asks is that you say yes to the help — accept the introduction, take the shortcut, let it be easy for once.',
  'dh.invite.sextile.0':
    'The invitation is initiative. This is a door left unlocked; it opens only if you push.',
  'dh.invite.sextile.1':
    'The deeper work is to notice the small opportunities you habitually talk yourself out of, and take one.',
  'dh.invite.sextile.2':
    'What this asks is a modest, concrete act of courage — nothing dramatic, just a step you would rather defer.',

  /* -- concrete guidance (rotated) -- */
  'dh.do.conjunction.0':
    'Give it a clean start: name what is beginning, mark it somehow, and don’t clutter the first weeks with leftovers from the old version.',
  'dh.do.conjunction.1':
    'Move deliberately rather than fast. A conjunction sets a long cycle in motion; the tone you set now tends to stick.',
  'dh.do.conjunction.2':
    'Decide. Say the yes or the no out loud to at least one other person so it becomes real.',
  'dh.do.opposition.0':
    'Have the conversation you have been circling, and go in listening. The other side is carrying information you need.',
  'dh.do.opposition.1':
    'Write both positions down as if you had to argue each one fairly. The balance point usually shows itself on the page.',
  'dh.do.opposition.2':
    'Don’t force a resolution today. Let the tension sit until the third option surfaces on its own.',
  'dh.do.square.0':
    'Don’t commit or sign under pressure. Let what resists show you where the structure is thin, and shore that up first.',
  'dh.do.square.1':
    'Change one thing about your approach and try again. Same effort, different angle.',
  'dh.do.square.2':
    'Do the boring, structural task you keep postponing. That is the whole assignment.',
  'dh.do.trine.0':
    'Take one real step while the door is open — a message, a booking, a first draft. Ease fades if you only admire it.',
  'dh.do.trine.1':
    'Ask for the thing. This is the window where a yes is most likely.',
  'dh.do.trine.2':
    'Build now. Use the calm to lay groundwork you will be glad of later.',
  'dh.do.sextile.0':
    'Make the first move today, not next week. Send it, ask it, put your name in.',
  'dh.do.sextile.1':
    'Say yes to the small offer even if it feels minor. These compound.',
  'dh.do.sextile.2':
    'Pick the one opportunity you would normally defer, and act on it before the day is out.',

  /* -- timing language (rotated per state) -- */
  'dh.time.peak.0':
    'It is close to exact and still tightening, so this peaks within a day or two and then begins to ease.',
  'dh.time.peak.1':
    'The contact is nearly precise right now — this is the loudest it gets, and the intensity drops off soon after.',
  'dh.time.peak.2':
    'This is at or near its exact degree, which is why it is asking for so much of your attention at once.',
  'dh.time.build.0':
    'It is still building. The theme grows louder over the coming days before it turns.',
  'dh.time.build.1':
    'This one has not reached full strength yet; expect it to keep rising for a while before it crests.',
  'dh.time.build.2':
    'You are on the early slope of this. What reads as a faint signal now becomes unmistakable within a week or so.',
  'dh.time.fade.0':
    'It is just past exact — the sharpest edge has already passed and the pressure is releasing.',
  'dh.time.fade.1':
    'The peak of this one is behind you now. What is left is integration, not crisis.',
  'dh.time.fade.2':
    'This contact is on its way out. You are cleaning up after it rather than living through the worst of it.',

  'dh.retro':
    ' Because it is retrograde, this is a review rather than a first pass — you are going back over ground you have covered before, this time to get it right.',

  /* -- section assembly templates -- */
  'dh.sec.open':
    '{tr} Right now it {verb} {target} — the part of you that governs {na}.',
  'dh.sec.sign':
    'Your natal {target} sits in {sign} — {signFlavour} — which shapes how the whole thing lands for you.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- the overview: three short paragraphs -- */
  'dh.ov.lead':
    'This reading is drawn from where the planets actually are today, set against your birth chart — so it is about your sky, not the sky in general.',
  'dh.ov.head':
    'The centre of gravity right now is {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'The overall weather is favourable: the easy contacts clearly outweigh the hard ones. This is a stretch to reach for something rather than brace against it — the main way to waste it is to sit still.',
  'dh.ov.weather.friction':
    'The overall weather is demanding. There is more friction than flow in the mix, and several things want to be met head-on rather than wished away. None of it is disaster; it is a build phase, and build phases feel like effort.',
  'dh.ov.weather.intense':
    'The overall weather is heavy and concentrated. Slow-moving planets are sitting right on your chart, and the volume is turned up on everything they touch. Pace yourself — this is a marathon stretch, not a sprint.',
  'dh.ov.weather.mixed':
    'The overall weather is mixed — real support and real friction inside the same window. The work of this period is choosing where to spend yourself and where to hold back.',
  'dh.ov.weather.quiet':
    'The overall weather is quiet. No planet is pressing hard on your chart, which makes this a rare stretch to set your own agenda and pace without the sky arguing back.',
  'dh.ov.tempo.fast':
    'The tempo is quick — contacts are tight and moving, so themes arrive and pass within days. Stay responsive rather than trying to plan the whole thing out.',
  'dh.ov.tempo.building':
    'The tempo is slow-building. The main themes are still gathering force, so what feels like a hint now will be unmistakable in a week or two.',
  'dh.ov.tempo.slow':
    'The tempo is slow and structural. The big contacts here unfold over months, not days; think in seasons, and do not expect an overnight verdict.',
  'dh.ov.tempo.settling':
    'The tempo is settling — the sharpest contacts are just past their peak, so this is more about integrating what has already happened than bracing for what is next.',

  /* -- the moon paragraph, expanded -- */
  'dh.moon.lead': 'Your emotional weather',
  'dh.moon.body':
    'The Moon is moving through {sign} — {mood} — and it is a {phase} at {pct}% light. {phaseNote} Let your mood be information rather than a verdict: it is telling you what this stretch of sky feels like from the inside.',

  /* -- the threads: what keeps recurring -- */
  'scr.horo.threadsHead': 'The threads that connect',
  'dh.th.house':
    'Your {ord} house keeps coming up. Whatever else is going on, {houseThemeLower} is the room you are being asked to spend time in this period.',
  'dh.th.planet':
    'Natal {planet} is being worked from more than one angle at once. Since it holds {na}, expect that to be a recurring note rather than a one-off.',
  'dh.th.bal.friction':
    'And the balance leans toward friction. That is not bad luck — it is what a growth phase feels like from inside. The effort is the assignment.',
  'dh.th.bal.supportive':
    'And the balance leans toward flow. The supportive contacts outnumber the hard ones, so the doors are genuinely open — the only way to waste that is to walk through none of them.',
  'dh.th.bal.mixed':
    'And the balance is genuinely split. Some of this supports you and some of it resists you, often on the same day, so discernment matters more than energy right now.',
  'dh.th.solo':
    'The contacts are spread across your chart rather than piling onto one point, so this reads as a varied period rather than a single dominant story.',

  /* -- the timing map -- */
  'scr.horo.timingHead': 'How this unfolds',
  'dh.tm.tight':
    'Tightening toward exact: {list}. These are the loudest voices in your sky right now and will peak within days.',
  'dh.tm.fade':
    'Past their peak and fading: {list}. The lesson in these is mostly landed — you are integrating now, not bracing.',
  'dh.tm.none':
    'Nothing is sitting right on exact at the moment, which is part of why the period feels more open than pointed.',

  /* -- the closing arc -- */
  'dh.cl.protect':
    'The bigger arc asks you to protect your {focus} through this stretch. Fewer commitments, earlier nights, and permission to be less available than usual — you will get more back by guarding your energy than by spending it. This is a season for tending the ground, not forcing the harvest.',
  'dh.cl.use':
    'The bigger arc is an open window around your {focus}, and windows like this do not stay open long. Aim it at one thing that genuinely matters to you and put real weight behind it now, while the sky is helping rather than resisting.',
  'dh.cl.steady':
    'The bigger arc asks for steadiness. Keep your routines, keep your word to yourself, and let the noise move through without chasing every piece of it. Not every transit needs a response; some just need to be outlasted.',

  /* ======================= COMPATIBILITY — DEEP ======================= */

  'syn.deep.patternLead': 'What this bond runs on',
  'syn.deep.pattern.emotional':
    'At its core this is an emotional connection. The Moons and Venus carry most of the weight between you, which makes the bond warm, instinctive and quick to attune — and it means that moods, not arguments, set the temperature. When you are both steady it is soft and easy and home feels like home fast. When one of you is off, the other knows within minutes, whether or not a word is said. The practical upshot is that looking after your own inner state is not separate from looking after the relationship; it is the same job. Learn to name a feeling early, before it becomes weather, and this connection will hold almost anything.',
  'syn.deep.pattern.mental':
    'At its core this is a meeting of minds. You connect first through words, ideas, curiosity and the pleasure of being understood quickly, and the spark stays lit for exactly as long as the conversation does. That is a real strength — you will never bore each other, and you problem-solve well as a pair. The risk is subtler: it is possible to mistake a good conversation for intimacy and to live slightly above the neck, trading thoughts while the feeling layer goes untended. Make room for the parts of closeness that are not verbal — a shared silence, a meal, a task done side by side — and the mental connection becomes a foundation rather than a substitute.',
  'syn.deep.pattern.physical':
    'At its core this is a connection of drive and body. Mars and the Sun are doing the heavy lifting, so there is real chemistry and real momentum here — you energise each other, you make things happen when you are together, and you act well as a team when there is a job to do. The same wiring means you can wind each other up just as fast; competitiveness and irritation are the shadow side of the attraction. The fix is not to suppress the heat but to aim it. Give it a shared direction — a project, a plan, a challenge, even a clean fight with rules — and the intensity works for you instead of turning inward.',
  'syn.deep.pattern.karmic':
    'At its core this one has weight. Saturn and Pluto are in the mix, which brings a sense of consequence to the bond — as though you are here to work something out together rather than simply to pass the time pleasantly. Connections like this tend to feel significant early and to ask more of both people than a lighter pairing would. Handled well, it becomes profoundly loyal and durable, the kind of bond that survives things. Handled carelessly, it turns heavy — obligation dressed up as closeness, or a slow power struggle nobody names. The difference is almost entirely whether you both keep choosing it out loud, on purpose, rather than staying because leaving feels like failure.',

  'syn.deep.chemHead': 'The chemistry between you',
  'syn.deep.chem.strong':
    'The attraction here is well-supported. The contacts between your charts that govern desire and affection are largely harmonious, which usually translates to chemistry that feels natural rather than fraught — you are drawn to each other in a way that does not cost much to sustain. Enjoy that, and do not take it as proof that the rest of the relationship will run itself; ease in one department is not a substitute for effort in the others.',
  'syn.deep.chem.mixed':
    'The attraction here has both current and grit. Some of the contacts between your charts pull you together warmly; others add friction to that same pull, which can read as chemistry with an edge — magnetic, occasionally maddening, rarely dull. This kind of spark tends to last longer than the frictionless kind precisely because it keeps regenerating. The task is to keep the edge playful rather than letting it curdle into a pattern of winding each other up.',
  'syn.deep.chem.cool':
    'Desire is not the loudest thread between your charts. The contacts that govern attraction are quiet or mildly challenging, which does not mean there is no spark — only that this connection is more likely to be built on other things: shared understanding, respect, reliability, a meeting of values. Relationships founded on those tend to be slower to ignite and considerably harder to break.',

  'syn.deep.commHead': 'How you communicate',
  'syn.deep.comm.easy':
    'Communication is a strength here. Your Mercury contacts flow, which means you tend to track each other’s thinking, land jokes, and work a problem together without much translation loss. Use that deliberately when something hard comes up — you are better at talking things through than most pairs, so do not let the difficult conversations be the ones you avoid.',
  'syn.deep.comm.work':
    'Communication takes some work here. Your Mercury contacts carry friction, so you can talk past each other — different tempos, different logic, different assumptions about what was actually agreed. This is workable, but it needs a habit: slow down, play back what you heard, and check you mean the same thing by the same word before you move on.',
  'syn.deep.comm.quiet':
    'There is no strong Mercury contact between your charts either way, which tends to mean communication is neither an obvious gift nor an obvious problem — it is simply something you will build deliberately rather than fall into. Regular, unforced check-ins matter more for you than for a pair who can read each other automatically.',

  'syn.deep.growthLead': 'Where this grows you',
  'syn.deep.growth.good':
    'The ease between you is real, and it is also the thing to watch. When a connection mostly runs itself, it is easy to get casual — to stop bringing your full honesty and effort because you have not had to. Your edge as a pair is to keep showing up properly for something that does not demand it: keep saying the true thing, keep making the effort, keep noticing each other. Do not let “easy” quietly become “unattended.”',
  'syn.deep.growth.mid':
    'The friction points between you are not flaws in the match; they are the curriculum. Each one marks a place you will both have to stretch — to say the hard thing sooner, to hold your ground more kindly, to stop waiting to be read and start being clear. Couples who name these tensions early and treat them as shared work tend to do well over time. Couples who hope they will simply dissolve tend to meet the same argument for years.',
  'syn.deep.growth.hard':
    'This connection asks a great deal of both of you. The challenging contacts between your charts will not dissolve on their own, so the relationship only works if you both treat the difficulty as joint work rather than the other person’s fault. That is genuinely possible — plenty of lasting bonds are built on hard aspects — but it is a choice you will have to keep making, repeatedly and out loud, especially in the stretches when it would be easier to keep score.',

  'syn.deep.nameItLead': 'Say this part out loud',
  'syn.deep.nameIt':
    'If there is one thing worth naming early rather than hoping it settles, it is the {a}–{b} contact: {sentence} Left unspoken it tends to calcify into a pattern; spoken plainly and early, it usually turns out to be smaller than it felt.',
  'syn.deep.nameIt.none':
    'There is no single friction point that needs heading off early here — which is itself worth knowing. The work in this connection is less about defusing one issue and more about staying attentive across the whole of it.',

  'syn.deep.longViewLead': 'The long view',
  'syn.deep.longView.good':
    'this is the kind of connection that ages well. It tends to get easier rather than harder as you learn each other’s edges, and the early ease usually deepens into something steadier and more trustworthy over time. The main threat to it is neglect, not conflict.',
  'syn.deep.longView.mid':
    'this becomes what you make it. The raw material is workable — neither effortless nor doomed — and the outcome depends almost entirely on the effort you both put in during the first stretch, before the patterns set. Get the habits right early and this can last.',
  'syn.deep.longView.hard':
    'this is intense now, and it is likely to stay intense. That is worth it if depth and significance are what you both actually want from a relationship. It is draining if part of you is waiting for it to calm down into something easy — that is probably not the assignment here.',
} as const
