/**
 * Guided-meditation scripts. The static styles are line-for-line; the
 * chart-aware "Chakra Alignment" script is a template with the day's transit
 * pieces filled in at build time.
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

  /* ---- house themes ---- */
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

  /* ---- chakra alignment script ---- */
  'med.chakraScript.0': 'Settle into a comfortable seat. Let your eyes close, or soften your gaze downward.',
  'med.chakraScript.1': 'Take a slow breath in through the nose… and a longer breath out.',
  'med.chakraScript.2': 'Again — in… and out. Let each exhale be a little longer than the one before.',
  'med.chakraScript.3': 'Bring your attention to {seat}.',
  'med.chakraScript.4': 'Breathe as if the breath itself were reaching {chakraLower}. Let it warm and open there.',
  'med.chakraScript.5': '{transitLine}',
  'med.chakraScript.6': '{planetInvite}',
  'med.chakraScript.7': 'If there is tension anywhere near {chakraLower}, breathe into it. Let the out-breath soften it by a fraction.',
  'med.chakraScript.8': 'Let the {hz} hertz tone move through this space. You do not have to do anything with it — just let it wash through.',
  'med.chakraScript.9': '{houseLine}',
  'med.chakraScript.10': 'Rest your attention lightly on {chakraLower}. Bright, quiet, unhurried.',
  'med.chakraScript.11': 'Silently, to yourself: {affirmation}',
  'med.chakraScript.12': 'Again: {affirmation}',
  'med.chakraScript.13': 'Let the words go. Come back to the simple feeling of breathing.',
  'med.chakraScript.14': 'Begin to deepen the breath. Let the sound fade into the background.',
  'med.chakraScript.15': 'When you are ready, open your eyes. Carry a little of your {chakraLower} with you.',

  /* ---- breath awareness ---- */
  'med.script.breath-awareness.0': 'Sit upright and at ease. Let the eyes close.',
  'med.script.breath-awareness.1': 'Find the breath where it is easiest to feel — the nostrils, the chest, or the belly.',
  'med.script.breath-awareness.2': 'You are not changing the breath. Just watching it arrive and leave.',
  'med.script.breath-awareness.3': 'When you notice the mind has wandered — and it will — that noticing is the practice. Come back, gently.',
  'med.script.breath-awareness.4': 'If it helps, count: in is one, out is one. Up to ten, then start again.',
  'med.script.breath-awareness.5': 'Lose count, and simply begin at one. No score is being kept.',
  'med.script.breath-awareness.6': 'Let the breath be a little slower now, a little deeper, without strain.',
  'med.script.breath-awareness.7': 'Notice how the body feels compared to when you began.',
  'med.script.breath-awareness.8': 'Let the counting go. Rest in plain awareness for a few breaths.',
  'med.script.breath-awareness.9': 'When you are ready, open your eyes. See if you can carry this attention into the next thing you do.',

  /* ---- body scan ---- */
  'med.script.body-scan.0': 'Lie down or sit back. Let the whole weight of the body be held by what is under you.',
  'med.script.body-scan.1': 'Two slow breaths. On each exhale, sink a little heavier.',
  'med.script.body-scan.2': 'Bring attention to the soles of your feet. Not judging how they feel — just feeling them.',
  'med.script.body-scan.3': 'Move up through the ankles, the calves, the knees. Let each part soften as you pass through it.',
  'med.script.body-scan.4': 'The thighs, the hips, the whole base of the body. Let it be heavy.',
  'med.script.body-scan.5': 'The belly and the low back. Let the breath move here freely, no holding.',
  'med.script.body-scan.6': 'The chest, the upper back, the shoulders. Let the shoulders drop away from the ears.',
  'med.script.body-scan.7': 'Down the arms to the hands. Let the fingers be loose.',
  'med.script.body-scan.8': 'The throat, the jaw, the tongue, the space around the eyes. Let the face be smooth.',
  'med.script.body-scan.9': 'The scalp, and the crown of the head. The whole body, resting, complete.',
  'med.script.body-scan.10': 'Feel the body as one piece now — heavy, warm, breathing on its own.',
  'med.script.body-scan.11': 'Wiggle the fingers and toes. Open your eyes slowly when you are ready.',

  /* ---- loving-kindness ---- */
  'med.script.metta.0': 'Sit comfortably. Rest a hand on your chest if you like.',
  'med.script.metta.1': 'A few easy breaths, letting the chest soften.',
  'med.script.metta.2': 'Bring yourself to mind — just as you are today. Silently offer: may I be safe. May I be well. May I be at ease.',
  'med.script.metta.3': 'Repeat it slowly, and let yourself actually mean it: may I be safe, may I be well, may I be at ease.',
  'med.script.metta.4': 'Now bring to mind someone you love easily. Picture their face. May you be safe. May you be well. May you be at ease.',
  'med.script.metta.5': 'Bring to mind someone neutral — someone you pass but barely know. Offer them the same: may you be safe, well, at ease.',
  'med.script.metta.6': 'If you can, bring to mind someone you find difficult. Without forcing warmth: may you, too, be safe and well.',
  'med.script.metta.7': 'Now widen it to everyone, everywhere, in every kind of weather: may all beings be safe. May all beings be at ease.',
  'med.script.metta.8': 'Come back to yourself. Notice any warmth or resistance, and let both be here.',
  'med.script.metta.9': 'Open your eyes. Carry a little of that goodwill into the room.',

  /* ---- sound bath ---- */
  'med.script.sound-bath.0': 'Settle back. Let the eyes close and the hands rest open.',
  'med.script.sound-bath.1': 'Let the {hz} hertz tone come into the foreground of your attention.',
  'med.script.sound-bath.2': 'You are not listening hard. You are letting the sound arrive, the way light arrives.',
  'med.script.sound-bath.3': 'Notice where in the body the tone seems to land. The chest, the skull, the hands. Let it settle there.',
  'med.script.sound-bath.4': 'If the mind starts narrating, let the sound be bigger than the thought. Return to the tone.',
  'med.script.sound-bath.5': 'Imagine the sound moving through you like water through a net — nothing to hold, nothing to catch.',
  'med.script.sound-bath.6': 'Let the space between you and the sound dissolve. Just vibration, and awareness of it.',
  'med.script.sound-bath.7': 'The tone will fade in a moment. Stay with the silence it leaves behind — that is part of the practice.',
  'med.script.sound-bath.8': 'When you are ready, open your eyes.',

  /* ---- gratitude ---- */
  'med.script.gratitude.0': 'Sit comfortably and take one long, slow breath out.',
  'med.script.gratitude.1': 'Bring to mind one thing from the last day that went well — however small. A warm drink. A message. A moment of quiet.',
  'med.script.gratitude.2': "Don't just name it. Let yourself feel it in the body — where does the appreciation sit?",
  'med.script.gratitude.3': 'Now a second thing. Something you usually take for granted — a working body, a roof, someone who stayed.',
  'med.script.gratitude.4': 'Stay with it a few breaths. Let it be more than a thought.',
  'med.script.gratitude.5': 'One more — something about yourself. A way you showed up, a thing you handled, an effort no one saw.',
  'med.script.gratitude.6': 'Hold all three together for a moment. This is what today also contained.',
  'med.script.gratitude.7': 'Open your eyes, and see if the room looks any different.',

  /* ---- safe place ---- */
  'med.script.safe-place.0': 'Close your eyes and take a few breaths, letting the body slow.',
  'med.script.safe-place.1': 'Picture a place where you feel completely safe. Real or imagined — a room, a shore, a wood, a small boat.',
  'med.script.safe-place.2': 'Look around it slowly. What is the light like? What time of day?',
  'med.script.safe-place.3': 'What do you hear there? What can you feel against your skin — warmth, air, a surface?',
  'med.script.safe-place.4': 'Is there a scent? Let the place get more solid with each detail you add.',
  'med.script.safe-place.5': 'Find the spot in this place where you would most want to rest. Go there. Sit or lie down.',
  'med.script.safe-place.6': "Nothing is required of you here. Nothing can reach you that you don't allow. Let that be true for a while.",
  'med.script.safe-place.7': 'Know that this place is yours. You can return any time you close your eyes.',
  'med.script.safe-place.8': 'Bring your attention back to the room, keeping a thread of that safety with you. Open your eyes.',

  /* ---- mountain ---- */
  'med.script.mountain.0': 'Sit tall — cross-legged, or on a chair with both feet down. Let the spine be its own support.',
  'med.script.mountain.1': 'Picture a mountain. Whatever mountain comes. Its broad base, its solid sides, its still peak.',
  'med.script.mountain.2': 'Now let the mountain and your body become the same shape. Your seat is the base. Your spine is the slope. Your head is the summit.',
  'med.script.mountain.3': 'Feel the weight of yourself settling down into the earth, unhurried, immovable.',
  'med.script.mountain.4': 'Around the mountain, weather comes and goes. Light, then cloud. Wind, then stillness. Storms that look like they will never end — and then end.',
  'med.script.mountain.5': 'Your thoughts and moods are the weather. They move across you. The mountain does not argue with the weather, and it is not made less by it.',
  'med.script.mountain.6': 'Sit as the mountain sits. Present, grounded, whole — through whatever passes.',
  'med.script.mountain.7': 'Let the image fade, and keep the steadiness. You can be this solid in an ordinary day.',
  'med.script.mountain.8': 'Open your eyes.',

  /* ---- open awareness ---- */
  'med.script.open-awareness.0': 'Sit with a straight back and a soft face. Eyes closed or barely open.',
  'med.script.open-awareness.1': 'Begin with the breath as an anchor. A dozen breaths, just following.',
  'med.script.open-awareness.2': 'Now let the anchor go. Let attention be wide open — not on anything in particular.',
  'med.script.open-awareness.3': 'Sounds arise and pass. Sensations arise and pass. Thoughts arise and pass. You do not chase them or push them away.',
  'med.script.open-awareness.4': 'Notice that awareness itself is not moving. Things happen within it, the way clouds happen within the sky.',
  'med.script.open-awareness.5': 'Rest as that sky. Nothing to add. Nothing to remove.',
  'med.script.open-awareness.6': 'If you get lost in a thought, no problem — the moment you know it, you are already back. Rest again.',
  'med.script.open-awareness.7': 'Let the eyes soften open while keeping the same wide, easy attention.',
  'med.script.open-awareness.8': 'See if the world can stay this open for the next few minutes of your day.',

  /* ---- morning intention ---- */
  'med.script.morning.0': 'Sit on the edge of the bed or a chair. Feet flat. Spine long.',
  'med.script.morning.1': 'Three fuller breaths — a little deeper than normal. Let them wake the body from the inside.',
  'med.script.morning.2': 'Roll the shoulders back once. Feel the front of the body open. This is the body getting ready to meet the day.',
  'med.script.morning.3': 'Bring the day ahead loosely to mind. Its shape, its main things.',
  'med.script.morning.4': 'Choose one intention — not a task, a way of being. Patient. Honest. Unhurried. Brave. Kind.',
  'med.script.morning.5': 'Say it to yourself once, simply: today, I will be ___.',
  'med.script.morning.6': 'Feel what that intention would be like in the body. Sit in it for a few breaths.',
  'med.script.morning.7': 'You can return to this word any time today by taking one breath and remembering it.',
  'med.script.morning.8': 'Open your eyes. Begin.',

  /* ---- evening release ---- */
  'med.script.evening.0': "Sit or lie back somewhere comfortable. Let the day's effort start to drain out of the limbs.",
  'med.script.evening.1': 'Long exhales. Each one a little longer, as if setting something down.',
  'med.script.evening.2': "Let the day replay lightly, like scenery from a train window. Morning, midday, evening. Don't stop on anything.",
  'med.script.evening.3': 'If a moment tugs — something unfinished, something that stung — note it, and say: not now. Tomorrow, if it matters.',
  'med.script.evening.4': 'Find one moment from today you are glad happened. Rest there a few breaths.',
  'med.script.evening.5': 'Find one thing you did as well as you could, given how the day actually went. Let that be enough.',
  'med.script.evening.6': 'Now let the whole day go — the good and the unfinished alike. It is complete simply because it is over.',
  'med.script.evening.7': 'Let the breath get slow and quiet. There is nothing left to do tonight.',
  'med.script.evening.8': 'Stay here, or let this carry you toward sleep.',

  /* ---- yoga nidra ---- */
  'med.script.yoga-nidra.0': 'Lie on your back, arms a little away from the body, palms up. This practice is done lying down.',
  'med.script.yoga-nidra.1': 'Let the body be completely still now. Stiller than feels natural. Only the breath moves.',
  'med.script.yoga-nidra.2': 'Set a short intention for this practice — a single calm sentence, present tense. Say it three times inwardly.',
  'med.script.yoga-nidra.3': 'Now bring attention to each place as it is named — no need to move, just light up each spot and release it.',
  'med.script.yoga-nidra.4': 'Right hand thumb… second finger… third… fourth… fifth. Palm, back of the hand, wrist, forearm, elbow, upper arm, shoulder.',
  'med.script.yoga-nidra.5': 'The same on the left. Thumb… fingers… palm… wrist… forearm… elbow… shoulder.',
  'med.script.yoga-nidra.6': 'Both hips. Right leg — thigh, knee, shin, ankle, foot, toes. Left leg — thigh, knee, shin, ankle, foot, toes.',
  'med.script.yoga-nidra.7': 'The whole back, spreading against the floor. The belly, rising and falling. The chest. The throat.',
  'med.script.yoga-nidra.8': 'The face — jaw, lips, nose, cheeks, eyes, the space between the brows, the forehead, the whole scalp.',
  'med.script.yoga-nidra.9': 'Now the whole body at once, glowing faintly, held by the floor.',
  'med.script.yoga-nidra.10': 'Watch the breath without touching it. Count backwards with it if you like — 27 in, 27 out, 26 in, 26 out.',
  'med.script.yoga-nidra.11': 'Return once more to the intention you set. The same calm sentence, three times.',
  'med.script.yoga-nidra.12': 'Begin to deepen the breath. Small movements in the fingers and toes.',
  'med.script.yoga-nidra.13': 'Roll to one side. Rest there. Come up to sitting only when you truly want to — or stay, and sleep.',
} as const

export type MeditationKey = keyof typeof meditation
