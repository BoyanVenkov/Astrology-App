/**
 * Guided-meditation copy. A meditation is now a short briefing the user reads
 * once, then a run of self-paced phases — each opens with a singing-bowl strike,
 * its instruction stays on screen, and three bowls close the practice. No
 * spoken audio. The chart-aware "Chakra Alignment" phases are templates with
 * the day's transit pieces filled in at build time.
 */
export const meditation = {
  /* ---- where each centre sits in the body ---- */
  'med.seat.root': 'the base of your spine, where you meet the ground',
  'med.seat.sacral': "your lower belly, a hand's width below the navel",
  'med.seat.solar-plexus': 'the soft place beneath your ribs',
  'med.seat.heart': 'the centre of your chest',
  'med.seat.throat': 'the hollow of your throat',
  'med.seat.third-eye': 'the space between your brows',
  'med.seat.crown': 'the crown of your head, and a little above it',
  'med.chakraLower': '{chakra} centre',

  /* ---- house themes (kept for other readings) ---- */
  'med.house.1': 'how you show up and meet the world',
  'med.house.2': 'what you value and what steadies you',
  'med.house.3': 'your everyday mind and the words you use',
  'med.house.4': 'home, roots, and where you feel held',
  'med.house.5': 'play, creativity, and what delights you',
  'med.house.6': 'the daily work of tending yourself',
  'med.house.7': 'the people closest to you',
  'med.house.8': 'what is ending, and what you share deeply',
  'med.house.9': 'meaning, and the wider view',
  'med.house.10': 'your work in the world and how you are seen',
  'med.house.11': 'your people, and what you are reaching for',
  'med.house.12': 'rest, solitude, and the quiet under everything',

  /* ---- planet invitations ---- */
  'med.invite.Sun': 'Let a steady warmth gather here — your own light, uncomplicated.',
  'med.invite.Moon': 'Let whatever you feel simply be here, without needing to fix it.',
  'med.invite.Mercury': 'Let the thinking slow down. You do not have to solve anything now.',
  'med.invite.Venus': 'Soften toward yourself the way you would toward someone you love.',
  'med.invite.Mars': 'Notice any heat or urgency, and let the out-breath carry some of it away.',
  'med.invite.Jupiter': 'Let this space feel a little more spacious than a moment ago.',
  'med.invite.Saturn': 'Meet the weight here honestly. You can hold more than you think.',
  'med.invite.Uranus': 'Let something loosen — a grip, an old shape you no longer need.',
  'med.invite.Neptune': 'Let the edges blur. You are allowed to not know for a while.',
  'med.invite.Pluto': 'Let what is finished finish. Breathe into the space it leaves.',
  'med.invite.default': 'Let this energy move through you, not into you.',

  /* ---- how the day's contact eases ---- */
  'med.ease.hard': 'There is friction in {dominant} today. You are not here to push through it — just to feel it clearly and stay soft around it.',
  'med.ease.soft': '{dominant} is flowing today. Notice the ease, and let yourself receive it.',
  'med.ease.neutral': '{dominant} is intense today. Let it move through you rather than lodging in your body.',

  'med.dominant.aspect': '{planet} {verb} your natal {other}',
  'med.dominant.sign': '{planet} moving through {sign}',
  'med.dominant.chartWord': 'chart',
  'med.domverb.conjunction': 'meeting',
  'med.domverb.opposition': 'opposite',
  'med.domverb.square': 'square',
  'med.domverb.trine': 'trine',
  'med.domverb.sextile': 'sextile',

  'med.houseLine.known': 'This is touching the part of your life that is about {theme}. Hold that lightly. Nothing needs deciding here — only noticing.',
  'med.houseLine.unknown': 'Whatever this stirs in your life, let it settle for the length of this practice. It will still be there when you finish, and you will meet it with more room.',

  /* ---- long chakra mantras ---- */
  'med.mantraLong.root': 'I am safe. I am here. I have what I need.',
  'med.mantraLong.sacral': 'I let life move through me.',
  'med.mantraLong.solar-plexus': 'I trust my own fire.',
  'med.mantraLong.heart': 'I give and receive love freely.',
  'med.mantraLong.throat': 'I speak my truth with ease.',
  'med.mantraLong.third-eye': 'I trust what I see within.',
  'med.mantraLong.crown': 'I am part of something vast, and it holds me.',

  'med.title.fallback': '{chakra} meditation',

  /* ---- the briefing, read once before starting ---- */
  'med.brief.lead': 'Read this once, then close your eyes. Each step opens with a bowl — stay with it until the next one.',
  'med.brief.close': 'Three soft bowls end the practice. Come back in your own time.',

  /* ---- generic phases ---- */
  'med.step.settle': 'Eyes closed. Let the body settle and the breath slow on its own.',
  'med.step.breath': 'Rest your attention on the breath — follow it in, follow it out. When the mind wanders, that noticing is the practice. Come back, gently.',
  'med.step.centre': 'Bring your attention to {seat}. Breathe as if the breath itself reached the {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Silently, in time with the breath: {affirmation}',
  'med.step.close': 'Let the practice go. Notice how you feel now, before you open your eyes.',

  /* ---- breath awareness ---- */
  'med.step.ba.count': 'Now count each exhale — one to ten, then start again. Lose count, and simply begin at one. No score is being kept.',

  /* ---- body scan ---- */
  'med.step.scan.0': 'Sweep your attention slowly from the soles of your feet upward — ankles, legs, hips, belly, back, chest, arms, hands. Rest a few breaths wherever you meet tension, and let it soften.',
  'med.step.scan.1': 'Now the shoulders, throat, jaw, the space around the eyes, the scalp. Then feel the whole body at once — heavy, warm, breathing on its own.',

  /* ---- loving-kindness ---- */
  'med.step.metta.0': 'Bring yourself to mind, just as you are today. Silently offer: may I be safe, may I be well, may I be at ease. Repeat it slowly, and let yourself mean it.',
  'med.step.metta.1': 'Bring to mind someone you love easily. Picture their face and offer the same: may you be safe, may you be well, may you be at ease.',
  'med.step.metta.2': 'Now widen it — someone you barely know, someone you find difficult, then everyone, everywhere: may all beings be safe, may all beings be at ease.',

  /* ---- sound bath ---- */
  'med.step.bath.0': 'Let the tone come into the foreground. You are not listening hard — you are letting the sound arrive, the way light arrives.',
  'med.step.bath.1': 'Notice where in the body the sound seems to land — the chest, the skull, the hands. Let the space between you and the sound dissolve.',

  /* ---- gratitude ---- */
  'med.step.grat.0': 'Bring to mind one thing from the last day that went well, however small. Don’t just name it — feel where the appreciation sits in the body.',
  'med.step.grat.1': 'Now something you usually take for granted — a working body, a roof, someone who stayed. Stay with it a few breaths.',
  'med.step.grat.2': 'One more — something about yourself. A way you showed up, a thing you handled, an effort no one saw. Hold all three together.',

  /* ---- safe place ---- */
  'med.step.safe.0': 'Picture a place where you feel completely safe — real or imagined. Look around slowly: the light, the time of day, what you hear, what you feel against your skin.',
  'med.step.safe.1': 'Find the spot here where you’d most want to rest, and go there. Nothing is required of you. Nothing reaches you that you don’t allow.',

  /* ---- mountain ---- */
  'med.step.mtn.0': 'Picture a mountain — its broad base, its solid sides, its still peak. Let your body and the mountain become the same shape: seat as base, spine as slope, head as summit.',
  'med.step.mtn.1': 'Weather comes and goes around the mountain — light, cloud, wind, storm. Your thoughts and moods are the weather. The mountain does not argue with it, and is not made less by it.',

  /* ---- open awareness ---- */
  'med.step.open.0': 'Let the anchor of the breath go. Let attention be wide open, not on anything in particular. Sounds, sensations, thoughts arise and pass — you neither chase them nor push them away.',
  'med.step.open.1': 'Notice that awareness itself is not moving. Things happen within it, the way clouds happen within the sky. Rest as that sky — nothing to add, nothing to remove.',

  /* ---- morning intention ---- */
  'med.step.morn.0': 'Three fuller breaths, a little deeper than normal — let them wake the body from the inside. Roll the shoulders back once and feel the front of the body open.',
  'med.step.morn.1': 'Bring the day ahead loosely to mind, then choose one intention — not a task, a way of being. Patient. Honest. Brave. Kind. Say it once: today, I will be ___.',

  /* ---- evening release ---- */
  'med.step.eve.0': 'Let the day replay lightly, like scenery from a train window — morning, midday, evening. Don’t stop on anything. If a moment tugs, note it and say: not now.',
  'med.step.eve.1': 'Find one moment you’re glad happened, and one thing you did as well as you could. Let that be enough. Now let the whole day go — it is complete simply because it is over.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Lie completely still — stiller than feels natural, only the breath moving. Set a short intention, a single calm sentence in the present tense. Say it inwardly three times.',
  'med.step.nidra.1': 'Bring attention to each place as it is named, without moving — right hand: thumb, fingers, palm, wrist, forearm, elbow, shoulder. Then the same on the left.',
  'med.step.nidra.2': 'Both hips. Right leg — thigh, knee, shin, ankle, foot, toes. Left leg the same. The whole back against the floor, the belly rising and falling, the chest, the throat.',
  'med.step.nidra.3': 'The face — jaw, lips, nose, cheeks, eyes, the space between the brows, the scalp. Now the whole body at once, glowing faintly, held by the floor. Return to your intention.',
} as const

export type MeditationKey = keyof typeof meditation
