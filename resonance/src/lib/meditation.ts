import type {
  AstrologicalTransit,
  ChakraKey,
  ChakraState,
  MeditationStyle,
  MeditationStyleKey,
} from '../types/resonance'
import type { Aspect } from './astrology'
import type { BodyName } from './ephemeris'
import { chakraName } from './resonanceData'

/** The slice of a `DailyReading` the meditation script needs (all in the store). */
export interface MeditationInput {
  chakra: ChakraState
  transit: AstrologicalTransit
  aspects: Aspect[]
  transitHouses: Partial<Record<BodyName, number>>
  hasNatal: boolean
}

/**
 * A guided meditation. The "Chakra Alignment" style is generated live from the
 * person's chart × today's transits; the rest are fixed scripts. Spoken (Web
 * Speech) or read on screen — no recordings, fully offline.
 */

export type MeditationCue =
  | 'settle'
  | 'breath'
  | 'body'
  | 'transit'
  | 'frequency'
  | 'affirm'
  | 'reflect'
  | 'close'

export interface MeditationStep {
  /** Seconds from the start when this line appears / is spoken. */
  at: number
  text: string
  cue: MeditationCue
}

export interface Meditation {
  title: string
  minutes: number
  hue: string
  frequency: number
  focus: ChakraKey
  steps: MeditationStep[]
}

/* ------------------------------------------------------------- the catalog */

export const MEDITATION_STYLES: MeditationStyle[] = [
  {
    key: 'chakra',
    name: 'Chakra Alignment',
    tagline: 'Tuned to today’s planet, chakra & transit',
    category: 'grounding',
    durations: [5, 10, 15, 20],
    dynamic: true,
  },
  {
    key: 'breath-awareness',
    name: 'Breath Awareness',
    tagline: 'The simplest anchor — follow, drift, return',
    category: 'focus',
    durations: [5, 10, 20],
  },
  {
    key: 'body-scan',
    name: 'Body Scan',
    tagline: 'Release the body one region at a time',
    category: 'calm',
    durations: [8, 15, 25],
  },
  {
    key: 'metta',
    name: 'Loving-Kindness',
    tagline: 'Metta — goodwill for self and others',
    category: 'heart',
    durations: [10, 15, 20],
  },
  {
    key: 'sound-bath',
    name: 'Sound Bath',
    tagline: 'Rest inside the frequency and let it wash through',
    category: 'calm',
    durations: [5, 10, 15],
  },
  {
    key: 'gratitude',
    name: 'Gratitude',
    tagline: 'Three things, felt in the body, not just named',
    category: 'heart',
    durations: [5, 10],
  },
  {
    key: 'safe-place',
    name: 'Safe Place',
    tagline: 'Build a place of total safety and go there',
    category: 'calm',
    durations: [8, 12, 18],
  },
  {
    key: 'mountain',
    name: 'Mountain Meditation',
    tagline: 'Sit like a mountain while the weather passes',
    category: 'grounding',
    durations: [10, 15, 20],
  },
  {
    key: 'open-awareness',
    name: 'Open Awareness',
    tagline: 'Drop the anchor — rest as the space itself',
    category: 'focus',
    durations: [10, 20],
  },
  {
    key: 'morning',
    name: 'Morning Intention',
    tagline: 'Wake the body, set one intention for the day',
    category: 'energy',
    durations: [5, 10],
  },
  {
    key: 'evening',
    name: 'Evening Release',
    tagline: 'Review the day without judgment, then set it down',
    category: 'sleep',
    durations: [8, 15],
  },
  {
    key: 'yoga-nidra',
    name: 'Yoga Nidra',
    tagline: 'Rotation of awareness at the edge of sleep',
    category: 'sleep',
    durations: [15, 25, 35],
  },
]

export const MEDITATION_STYLE_MAP: Record<MeditationStyleKey, MeditationStyle> =
  Object.fromEntries(MEDITATION_STYLES.map((s) => [s.key, s])) as Record<
    MeditationStyleKey,
    MeditationStyle
  >

/* -------------------------------------------------- chart-aware ("chakra") */

const BODY_SEAT: Record<ChakraKey, string> = {
  root: 'the base of your spine, where you meet the ground',
  sacral: 'your lower belly, a hand’s width below the navel',
  'solar-plexus': 'the soft place beneath your ribs',
  heart: 'the centre of your chest',
  throat: 'the hollow of your throat',
  'third-eye': 'the space between your brows',
  crown: 'the crown of your head, and a little above it',
}

const HOUSE_THEME: Record<number, string> = {
  1: 'how you show up and meet the world',
  2: 'what you value and what steadies you',
  3: 'your everyday mind and the words you use',
  4: 'home, roots, and where you feel held',
  5: 'play, creativity, and what delights you',
  6: 'the daily work of tending yourself',
  7: 'the people closest to you',
  8: 'what is ending, and what you share deeply',
  9: 'meaning, and the wider view',
  10: 'your work in the world and how you are seen',
  11: 'your people, and what you are reaching for',
  12: 'rest, solitude, and the quiet under everything',
}

const PLANET_INVITE: Record<BodyName, string> = {
  Sun: 'Let a steady warmth gather here — your own light, uncomplicated.',
  Moon: 'Let whatever you feel simply be here, without needing to fix it.',
  Mercury: 'Let the thinking slow down. You do not have to solve anything now.',
  Venus: 'Soften toward yourself the way you would toward someone you love.',
  Mars: 'Notice any heat or urgency, and let the out-breath carry some of it away.',
  Jupiter: 'Let this space feel a little more spacious than a moment ago.',
  Saturn: 'Meet the weight here honestly. You can hold more than you think.',
  Uranus: 'Let something loosen — a grip, an old shape you no longer need.',
  Neptune: 'Let the edges blur. You are allowed to not know for a while.',
  Pluto: 'Let what is finished finish. Breathe into the space it leaves.',
}

const easeText = (dominant: string, harmony: string): string => {
  if (harmony === 'hard') {
    return `There is friction in ${dominant} today. You are not here to push through it — just to feel it clearly and stay soft around it.`
  }
  if (harmony === 'soft') {
    return `${dominant} is flowing today. Notice the ease, and let yourself receive it.`
  }
  return `${dominant} is intense today. Let it move through you rather than lodging in your body.`
}

interface Ctx {
  seat: string
  chakraLower: string
  frequency: number
  affirmation: string
  transitLine: string
  planetInvite: string
  houseLine: string
}

type Line = { f: number; cue: MeditationCue; make: (c: Ctx) => string }

// The chakra script as fractions of the total length, so it scales to any duration.
const CHAKRA_SCRIPT: Line[] = [
  { f: 0.0, cue: 'settle', make: () => 'Settle into a comfortable seat. Let your eyes close, or soften your gaze downward.' },
  { f: 0.03, cue: 'breath', make: () => 'Take a slow breath in through the nose… and a longer breath out.' },
  { f: 0.07, cue: 'breath', make: () => 'Again — in… and out. Let each exhale be a little longer than the one before.' },
  { f: 0.12, cue: 'body', make: (c) => `Bring your attention to ${c.seat}.` },
  { f: 0.17, cue: 'body', make: (c) => `Breathe as if the breath itself were reaching ${c.chakraLower}. Let it warm and open there.` },
  { f: 0.24, cue: 'transit', make: (c) => c.transitLine },
  { f: 0.3, cue: 'transit', make: (c) => c.planetInvite },
  { f: 0.37, cue: 'body', make: (c) => `If there is tension anywhere near ${c.chakraLower}, breathe into it. Let the out-breath soften it by a fraction.` },
  { f: 0.45, cue: 'frequency', make: (c) => `Let the ${c.frequency} hertz tone move through this space. You do not have to do anything with it — just let it wash through.` },
  { f: 0.55, cue: 'transit', make: (c) => c.houseLine },
  { f: 0.63, cue: 'body', make: (c) => `Rest your attention lightly on ${c.chakraLower}. Bright, quiet, unhurried.` },
  { f: 0.72, cue: 'affirm', make: (c) => `Silently, to yourself: ${c.affirmation}` },
  { f: 0.8, cue: 'affirm', make: (c) => `Again: ${c.affirmation}` },
  { f: 0.87, cue: 'close', make: () => 'Let the words go. Come back to the simple feeling of breathing.' },
  { f: 0.93, cue: 'close', make: () => 'Begin to deepen the breath. Let the sound fade into the background.' },
  { f: 0.98, cue: 'close', make: (c) => `When you are ready, open your eyes. Carry a little of your ${c.chakraLower} with you.` },
]

/* --------------------------------------------------------- fixed scripts */

const T = (text: string): ((c: Ctx) => string) => () => text

const STATIC_SCRIPTS: Record<Exclude<MeditationStyleKey, 'chakra'>, Line[]> = {
  'breath-awareness': [
    { f: 0.0, cue: 'settle', make: T('Sit upright and at ease. Let the eyes close.') },
    { f: 0.04, cue: 'breath', make: T('Find the breath where it is easiest to feel — the nostrils, the chest, or the belly.') },
    { f: 0.12, cue: 'breath', make: T('You are not changing the breath. Just watching it arrive and leave.') },
    { f: 0.22, cue: 'breath', make: T('When you notice the mind has wandered — and it will — that noticing is the practice. Come back, gently.') },
    { f: 0.36, cue: 'breath', make: T('If it helps, count: in is one, out is one. Up to ten, then start again.') },
    { f: 0.52, cue: 'breath', make: T('Lose count, and simply begin at one. No score is being kept.') },
    { f: 0.68, cue: 'body', make: T('Let the breath be a little slower now, a little deeper, without strain.') },
    { f: 0.82, cue: 'reflect', make: T('Notice how the body feels compared to when you began.') },
    { f: 0.92, cue: 'close', make: T('Let the counting go. Rest in plain awareness for a few breaths.') },
    { f: 0.98, cue: 'close', make: T('When you are ready, open your eyes. See if you can carry this attention into the next thing you do.') },
  ],
  'body-scan': [
    { f: 0.0, cue: 'settle', make: T('Lie down or sit back. Let the whole weight of the body be held by what is under you.') },
    { f: 0.05, cue: 'breath', make: T('Two slow breaths. On each exhale, sink a little heavier.') },
    { f: 0.12, cue: 'body', make: T('Bring attention to the soles of your feet. Not judging how they feel — just feeling them.') },
    { f: 0.22, cue: 'body', make: T('Move up through the ankles, the calves, the knees. Let each part soften as you pass through it.') },
    { f: 0.34, cue: 'body', make: T('The thighs, the hips, the whole base of the body. Let it be heavy.') },
    { f: 0.46, cue: 'body', make: T('The belly and the low back. Let the breath move here freely, no holding.') },
    { f: 0.56, cue: 'body', make: T('The chest, the upper back, the shoulders. Let the shoulders drop away from the ears.') },
    { f: 0.66, cue: 'body', make: T('Down the arms to the hands. Let the fingers be loose.') },
    { f: 0.76, cue: 'body', make: T('The throat, the jaw, the tongue, the space around the eyes. Let the face be smooth.') },
    { f: 0.85, cue: 'body', make: T('The scalp, and the crown of the head. The whole body, resting, complete.') },
    { f: 0.93, cue: 'close', make: T('Feel the body as one piece now — heavy, warm, breathing on its own.') },
    { f: 0.98, cue: 'close', make: T('Wiggle the fingers and toes. Open your eyes slowly when you are ready.') },
  ],
  metta: [
    { f: 0.0, cue: 'settle', make: T('Sit comfortably. Rest a hand on your chest if you like.') },
    { f: 0.05, cue: 'breath', make: T('A few easy breaths, letting the chest soften.') },
    { f: 0.12, cue: 'reflect', make: T('Bring yourself to mind — just as you are today. Silently offer: may I be safe. May I be well. May I be at ease.') },
    { f: 0.26, cue: 'reflect', make: T('Repeat it slowly, and let yourself actually mean it: may I be safe, may I be well, may I be at ease.') },
    { f: 0.4, cue: 'reflect', make: T('Now bring to mind someone you love easily. Picture their face. May you be safe. May you be well. May you be at ease.') },
    { f: 0.56, cue: 'reflect', make: T('Bring to mind someone neutral — someone you pass but barely know. Offer them the same: may you be safe, well, at ease.') },
    { f: 0.7, cue: 'reflect', make: T('If you can, bring to mind someone you find difficult. Without forcing warmth: may you, too, be safe and well.') },
    { f: 0.84, cue: 'reflect', make: T('Now widen it to everyone, everywhere, in every kind of weather: may all beings be safe. May all beings be at ease.') },
    { f: 0.93, cue: 'close', make: T('Come back to yourself. Notice any warmth or resistance, and let both be here.') },
    { f: 0.98, cue: 'close', make: T('Open your eyes. Carry a little of that goodwill into the room.') },
  ],
  'sound-bath': [
    { f: 0.0, cue: 'settle', make: T('Settle back. Let the eyes close and the hands rest open.') },
    { f: 0.05, cue: 'frequency', make: (c) => `Let the ${c.frequency} hertz tone come into the foreground of your attention.` },
    { f: 0.14, cue: 'frequency', make: T('You are not listening hard. You are letting the sound arrive, the way light arrives.') },
    { f: 0.28, cue: 'body', make: T('Notice where in the body the tone seems to land. The chest, the skull, the hands. Let it settle there.') },
    { f: 0.44, cue: 'frequency', make: T('If the mind starts narrating, let the sound be bigger than the thought. Return to the tone.') },
    { f: 0.6, cue: 'body', make: T('Imagine the sound moving through you like water through a net — nothing to hold, nothing to catch.') },
    { f: 0.76, cue: 'frequency', make: T('Let the space between you and the sound dissolve. Just vibration, and awareness of it.') },
    { f: 0.9, cue: 'close', make: T('The tone will fade in a moment. Stay with the silence it leaves behind — that is part of the practice.') },
    { f: 0.98, cue: 'close', make: T('When you are ready, open your eyes.') },
  ],
  gratitude: [
    { f: 0.0, cue: 'settle', make: T('Sit comfortably and take one long, slow breath out.') },
    { f: 0.08, cue: 'reflect', make: T('Bring to mind one thing from the last day that went well — however small. A warm drink. A message. A moment of quiet.') },
    { f: 0.24, cue: 'body', make: T('Don’t just name it. Let yourself feel it in the body — where does the appreciation sit?') },
    { f: 0.42, cue: 'reflect', make: T('Now a second thing. Something you usually take for granted — a working body, a roof, someone who stayed.') },
    { f: 0.58, cue: 'body', make: T('Stay with it a few breaths. Let it be more than a thought.') },
    { f: 0.74, cue: 'reflect', make: T('One more — something about yourself. A way you showed up, a thing you handled, an effort no one saw.') },
    { f: 0.88, cue: 'close', make: T('Hold all three together for a moment. This is what today also contained.') },
    { f: 0.98, cue: 'close', make: T('Open your eyes, and see if the room looks any different.') },
  ],
  'safe-place': [
    { f: 0.0, cue: 'settle', make: T('Close your eyes and take a few breaths, letting the body slow.') },
    { f: 0.08, cue: 'reflect', make: T('Picture a place where you feel completely safe. Real or imagined — a room, a shore, a wood, a small boat.') },
    { f: 0.22, cue: 'reflect', make: T('Look around it slowly. What is the light like? What time of day?') },
    { f: 0.38, cue: 'body', make: T('What do you hear there? What can you feel against your skin — warmth, air, a surface?') },
    { f: 0.54, cue: 'body', make: T('Is there a scent? Let the place get more solid with each detail you add.') },
    { f: 0.68, cue: 'reflect', make: T('Find the spot in this place where you would most want to rest. Go there. Sit or lie down.') },
    { f: 0.82, cue: 'reflect', make: T('Nothing is required of you here. Nothing can reach you that you don’t allow. Let that be true for a while.') },
    { f: 0.92, cue: 'close', make: T('Know that this place is yours. You can return any time you close your eyes.') },
    { f: 0.98, cue: 'close', make: T('Bring your attention back to the room, keeping a thread of that safety with you. Open your eyes.') },
  ],
  mountain: [
    { f: 0.0, cue: 'settle', make: T('Sit tall — cross-legged, or on a chair with both feet down. Let the spine be its own support.') },
    { f: 0.08, cue: 'reflect', make: T('Picture a mountain. Whatever mountain comes. Its broad base, its solid sides, its still peak.') },
    { f: 0.2, cue: 'body', make: T('Now let the mountain and your body become the same shape. Your seat is the base. Your spine is the slope. Your head is the summit.') },
    { f: 0.36, cue: 'body', make: T('Feel the weight of yourself settling down into the earth, unhurried, immovable.') },
    { f: 0.5, cue: 'reflect', make: T('Around the mountain, weather comes and goes. Light, then cloud. Wind, then stillness. Storms that look like they will never end — and then end.') },
    { f: 0.66, cue: 'reflect', make: T('Your thoughts and moods are the weather. They move across you. The mountain does not argue with the weather, and it is not made less by it.') },
    { f: 0.8, cue: 'body', make: T('Sit as the mountain sits. Present, grounded, whole — through whatever passes.') },
    { f: 0.92, cue: 'close', make: T('Let the image fade, and keep the steadiness. You can be this solid in an ordinary day.') },
    { f: 0.98, cue: 'close', make: T('Open your eyes.') },
  ],
  'open-awareness': [
    { f: 0.0, cue: 'settle', make: T('Sit with a straight back and a soft face. Eyes closed or barely open.') },
    { f: 0.06, cue: 'breath', make: T('Begin with the breath as an anchor. A dozen breaths, just following.') },
    { f: 0.2, cue: 'reflect', make: T('Now let the anchor go. Let attention be wide open — not on anything in particular.') },
    { f: 0.34, cue: 'reflect', make: T('Sounds arise and pass. Sensations arise and pass. Thoughts arise and pass. You do not chase them or push them away.') },
    { f: 0.5, cue: 'reflect', make: T('Notice that awareness itself is not moving. Things happen within it, the way clouds happen within the sky.') },
    { f: 0.66, cue: 'reflect', make: T('Rest as that sky. Nothing to add. Nothing to remove.') },
    { f: 0.8, cue: 'reflect', make: T('If you get lost in a thought, no problem — the moment you know it, you are already back. Rest again.') },
    { f: 0.92, cue: 'close', make: T('Let the eyes soften open while keeping the same wide, easy attention.') },
    { f: 0.98, cue: 'close', make: T('See if the world can stay this open for the next few minutes of your day.') },
  ],
  morning: [
    { f: 0.0, cue: 'settle', make: T('Sit on the edge of the bed or a chair. Feet flat. Spine long.') },
    { f: 0.08, cue: 'breath', make: T('Three fuller breaths — a little deeper than normal. Let them wake the body from the inside.') },
    { f: 0.22, cue: 'body', make: T('Roll the shoulders back once. Feel the front of the body open. This is the body getting ready to meet the day.') },
    { f: 0.38, cue: 'reflect', make: T('Bring the day ahead loosely to mind. Its shape, its main things.') },
    { f: 0.54, cue: 'reflect', make: T('Choose one intention — not a task, a way of being. Patient. Honest. Unhurried. Brave. Kind.') },
    { f: 0.7, cue: 'reflect', make: T('Say it to yourself once, simply: today, I will be ___.') },
    { f: 0.84, cue: 'body', make: T('Feel what that intention would be like in the body. Sit in it for a few breaths.') },
    { f: 0.94, cue: 'close', make: T('You can return to this word any time today by taking one breath and remembering it.') },
    { f: 0.98, cue: 'close', make: T('Open your eyes. Begin.') },
  ],
  evening: [
    { f: 0.0, cue: 'settle', make: T('Sit or lie back somewhere comfortable. Let the day’s effort start to drain out of the limbs.') },
    { f: 0.08, cue: 'breath', make: T('Long exhales. Each one a little longer, as if setting something down.') },
    { f: 0.2, cue: 'reflect', make: T('Let the day replay lightly, like scenery from a train window. Morning, midday, evening. Don’t stop on anything.') },
    { f: 0.38, cue: 'reflect', make: T('If a moment tugs — something unfinished, something that stung — note it, and say: not now. Tomorrow, if it matters.') },
    { f: 0.54, cue: 'reflect', make: T('Find one moment from today you are glad happened. Rest there a few breaths.') },
    { f: 0.68, cue: 'reflect', make: T('Find one thing you did as well as you could, given how the day actually went. Let that be enough.') },
    { f: 0.82, cue: 'body', make: T('Now let the whole day go — the good and the unfinished alike. It is complete simply because it is over.') },
    { f: 0.92, cue: 'close', make: T('Let the breath get slow and quiet. There is nothing left to do tonight.') },
    { f: 0.98, cue: 'close', make: T('Stay here, or let this carry you toward sleep.') },
  ],
  'yoga-nidra': [
    { f: 0.0, cue: 'settle', make: T('Lie on your back, arms a little away from the body, palms up. This practice is done lying down.') },
    { f: 0.05, cue: 'breath', make: T('Let the body be completely still now. Stiller than feels natural. Only the breath moves.') },
    { f: 0.12, cue: 'reflect', make: T('Set a short intention for this practice — a single calm sentence, present tense. Say it three times inwardly.') },
    { f: 0.2, cue: 'body', make: T('Now bring attention to each place as it is named — no need to move, just light up each spot and release it.') },
    { f: 0.28, cue: 'body', make: T('Right hand thumb… second finger… third… fourth… fifth. Palm, back of the hand, wrist, forearm, elbow, upper arm, shoulder.') },
    { f: 0.4, cue: 'body', make: T('The same on the left. Thumb… fingers… palm… wrist… forearm… elbow… shoulder.') },
    { f: 0.5, cue: 'body', make: T('Both hips. Right leg — thigh, knee, shin, ankle, foot, toes. Left leg — thigh, knee, shin, ankle, foot, toes.') },
    { f: 0.6, cue: 'body', make: T('The whole back, spreading against the floor. The belly, rising and falling. The chest. The throat.') },
    { f: 0.68, cue: 'body', make: T('The face — jaw, lips, nose, cheeks, eyes, the space between the brows, the forehead, the whole scalp.') },
    { f: 0.76, cue: 'body', make: T('Now the whole body at once, glowing faintly, held by the floor.') },
    { f: 0.84, cue: 'breath', make: T('Watch the breath without touching it. Count backwards with it if you like — 27 in, 27 out, 26 in, 26 out.') },
    { f: 0.9, cue: 'reflect', make: T('Return once more to the intention you set. The same calm sentence, three times.') },
    { f: 0.95, cue: 'close', make: T('Begin to deepen the breath. Small movements in the fingers and toes.') },
    { f: 0.99, cue: 'close', make: T('Roll to one side. Rest there. Come up to sitting only when you truly want to — or stay, and sleep.') },
  ],
}

/* --------------------------------------------------------------- builder */

const CHAKRA_MANTRA_LONG: Record<ChakraKey, string> = {
  root: 'I am safe. I am here. I have what I need.',
  sacral: 'I let life move through me.',
  'solar-plexus': 'I trust my own fire.',
  heart: 'I give and receive love freely.',
  throat: 'I speak my truth with ease.',
  'third-eye': 'I trust what I see within.',
  crown: 'I am part of something vast, and it holds me.',
}

export function buildMeditation(
  style: MeditationStyleKey,
  reading: MeditationInput,
  minutes: number,
): Meditation {
  const focus = reading.chakra.key
  const planet = reading.transit.body as BodyName
  const dominantAspect = reading.aspects[0]
  const harmony = dominantAspect?.def.harmony ?? 'neutral'
  const dominantText =
    reading.hasNatal && reading.transit.aspect !== 'in'
      ? `${reading.transit.body} ${reading.transit.aspect === 'conjunction' ? 'meeting' : reading.transit.aspect === 'opposition' ? 'opposite' : reading.transit.aspect} your natal ${(dominantAspect?.other ?? '').toLowerCase() || 'chart'}`
      : `${reading.transit.body} moving through ${reading.transit.sign}`

  const house = reading.transitHouses[planet]
  const houseLine =
    house && HOUSE_THEME[house]
      ? `This is touching the part of your life that is about ${HOUSE_THEME[house]}. Hold that lightly. Nothing needs deciding here — only noticing.`
      : 'Whatever this stirs in your life, let it settle for the length of this practice. It will still be there when you finish, and you will meet it with more room.'

  const ctx: Ctx = {
    seat: BODY_SEAT[focus],
    chakraLower: `${chakraName(focus).toLowerCase()} centre`,
    frequency: reading.transit.recommendedFrequency,
    affirmation: CHAKRA_MANTRA_LONG[focus],
    transitLine: easeText(dominantText, harmony),
    planetInvite:
      PLANET_INVITE[planet] ?? 'Let this energy move through you, not into you.',
    houseLine,
  }

  const script =
    style === 'chakra' ? CHAKRA_SCRIPT : STATIC_SCRIPTS[style] ?? CHAKRA_SCRIPT
  const total = minutes * 60
  const steps: MeditationStep[] = script.map((s) => ({
    at: Math.round(s.f * total),
    text: s.make(ctx),
    cue: s.cue,
  }))

  return {
    title: MEDITATION_STYLE_MAP[style]?.name ?? `${chakraName(focus)} meditation`,
    minutes,
    hue: reading.chakra.color,
    frequency: reading.transit.recommendedFrequency,
    focus,
    steps,
  }
}
