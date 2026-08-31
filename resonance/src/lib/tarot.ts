import type { BirthProfile } from '../types/resonance'
import { localDayKey } from './timezone'

/**
 * A full 78-card Rider–Waite–Smith tarot deck with upright and reversed
 * meanings, plus real spreads and a seeded shuffle. Card meanings follow the
 * traditional RWS readings.
 */

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Arcana = 'major' | Suit

export interface TarotCard {
  id: string
  name: string
  arcana: Arcana
  /** Major 0–21 · pip 1–10 · court 11 Page / 12 Knight / 13 Queen / 14 King. */
  rank: number
  keywords: string[]
  upright: string
  reversed: string
}

type Raw = [name: string, keywords: string, upright: string, reversed: string]

const MAJORS: Raw[] = [
  ['The Fool', 'beginnings, faith, spontaneity', 'A leap into something new. Trust the impulse and take the first step, even without the whole map.', 'Recklessness, or the opposite — hesitating at the edge. A risk taken carelessly, or one you keep refusing.'],
  ['The Magician', 'will, focus, manifestation', 'You have everything you need. Concentrate your intention and act — the elements are in your hands.', 'Scattered power, untapped talent, or skill turned to manipulation. Align the means with the aim.'],
  ['The High Priestess', 'intuition, mystery, the inner voice', 'The answer is already in you, below words. Be still and listen rather than push for it.', 'Ignored instinct, secrets kept, or living on the surface when the depth is asking for attention.'],
  ['The Empress', 'abundance, nurture, the senses', 'Growth, care, and creative fullness. Tend what you love and let it flourish; enjoy the body and the world.', 'A creative block, or nurture spent everywhere but on yourself. Something is being smothered or neglected.'],
  ['The Emperor', 'structure, authority, boundaries', 'Build the framework. Steady leadership, clear limits, and discipline make the vision real.', 'Control hardened into rigidity, or structure that has collapsed. Authority misused, or missing entirely.'],
  ['The Hierophant', 'tradition, belief, mentorship', 'Learn from what is established — a teacher, an institution, a shared way of doing things.', 'The rules no longer fit. Time to question the doctrine and find your own understanding.'],
  ['The Lovers', 'union, values, a real choice', 'A meeting of hearts or minds, and a choice that must be made from your deepest values.', 'Misalignment, a rift, or a decision you keep dodging. Get honest about what you actually want.'],
  ['The Chariot', 'drive, willpower, direction', 'Victory through focus and control. Hold the reins on opposing forces and press forward.', 'Losing the thread, forcing an outcome, or being pulled in two directions with no clear win.'],
  ['Strength', 'courage, patience, gentle mastery', 'Meet the wild thing — fear, anger, desire — with a calm hand rather than force. Quiet courage wins.', 'Self-doubt, raw force, or a resolve worn thin. The strength is there; it needs gentleness, not a whip.'],
  ['The Hermit', 'solitude, search, inner guidance', 'Step back from the noise. The light you need is found in withdrawal and honest reflection.', 'Isolation that has curdled, feeling lost, or refusing the help and company you actually need.'],
  ['Wheel of Fortune', 'cycles, turning points, fate', 'The wheel turns. A shift in luck and circumstance — ride the momentum rather than fight it.', 'Resistance to an inevitable change, a run of bad luck, or clinging to a moment that is already passing.'],
  ['Justice', 'truth, cause and effect, accountability', 'A fair reckoning. Decisions land according to what was actually done. Act with integrity now.', 'Unfairness, dishonesty, or avoiding responsibility. A consequence is being dodged rather than met.'],
  ['The Hanged Man', 'pause, surrender, a new angle', 'Suspend the struggle. Seeing the situation upside-down, from stillness, reveals what effort could not.', 'Stalling, a sacrifice that helps no one, or resisting a release that would actually free you.'],
  ['Death', 'endings, transformation, clearing', 'Something is genuinely over. Let it end cleanly so the ground is clear for what wants to grow.', 'Clinging to what is finished. The change is stalled and something is quietly rotting instead of composting.'],
  ['Temperance', 'balance, patience, blending', 'Combine, moderate, and heal. The right mix, found slowly, of things that seemed opposed.', 'Excess, impatience, or ingredients that will not blend. Something is out of proportion.'],
  ['The Devil', 'attachment, compulsion, the binding story', 'Look at what has a hold on you — a habit, a dynamic, a belief. The chains are looser than they feel.', 'You are breaking free. Facing the shadow honestly and loosening a grip that has run your life.'],
  ['The Tower', 'sudden upheaval, revelation, collapse', 'A false structure comes down, fast. Painful, but it clears a lie. What is left standing is true.', 'Disaster delayed or resisted, fear of the necessary fall, or a slow collapse you keep patching.'],
  ['The Star', 'hope, renewal, faith', 'After the storm, calm and quiet hope. Healing is underway; keep faith and keep it simple.', 'Discouragement, lost faith, or feeling cut off from the source. The star is still there above the cloud.'],
  ['The Moon', 'illusion, the unknown, the dreaming mind', 'Not everything is as it seems. Fear and imagination distort the path — move slowly, trust the body.', 'Confusion beginning to clear, a truth surfacing, or a fear released once looked at directly.'],
  ['The Sun', 'clarity, vitality, joy', 'Warmth, success, and plain happiness. Things are as good as they look. Let yourself enjoy it.', 'Optimism dimmed, delays, or forcing brightness you do not feel. The sun has not gone — it is behind cloud.'],
  ['Judgement', 'reckoning, awakening, a call', 'A summons to rise into a truer version of your life. Review honestly, forgive, and answer the call.', 'Self-doubt, ignoring the call, or judging yourself and others too harshly to move.'],
  ['The World', 'completion, wholeness, arrival', 'A cycle completes. Integration, accomplishment, and a sense of having genuinely arrived somewhere.', 'So close. A chapter unfinished, a loose thread, or a delay right before the finish line.'],
]

const WANDS: Raw[] = [
  ['Ace of Wands', 'spark, inspiration, new venture', 'A creative spark, a green light, raw energy for a new project. Grab it before it cools.', 'A false start, a delay, or an idea with no direction yet. The fire is there but not aimed.'],
  ['Two of Wands', 'planning, first steps, wider horizon', 'The vision is set and the world is in your hands. Decide on the bigger picture before you move.', 'Fear of the unknown, playing it too safe, or plans that fell apart before they began.'],
  ['Three of Wands', 'expansion, foresight, waiting on returns', 'Your ships are out. Early efforts are moving; keep the long view and let them come back to you.', 'Delays, obstacles at a distance, or a plan whose foresight was too narrow.'],
  ['Four of Wands', 'celebration, homecoming, a milestone', 'A stable, happy marker — a home, a union, a completion worth celebrating with your people.', 'A muted celebration, tension at home, or a transition that has unsettled the foundations.'],
  ['Five of Wands', 'friction, competition, clashing aims', 'Everyone is pulling a different way. Scrappy conflict — sometimes productive, often just noise.', 'Conflict resolved or avoided, inner tension, or choosing to step out of a pointless fight.'],
  ['Six of Wands', 'public success, recognition, riding high', 'A visible win and the acknowledgement that comes with it. Enjoy it, and stay gracious.', 'A win that falls flat, ego running the show, or recognition delayed.'],
  ['Seven of Wands', 'defence, holding your ground', 'You have the high ground and something to protect. Stand firm — the pressure is testing your conviction.', 'Overwhelm, giving up the position, or exhaustion from defending something no longer worth it.'],
  ['Eight of Wands', 'speed, news, momentum', 'Things move fast now. Messages, travel, events lining up. Act while the current is quick.', 'Delays, scattered energy, or news held up. The rush has stalled.'],
  ['Nine of Wands', 'resilience, one last push', 'Bruised but still standing. You are closer to done than it feels — hold the line once more.', 'Depleted, paranoid, or refusing to lower a guard that is now just hurting you.'],
  ['Ten of Wands', 'burden, overcommitment', 'You are carrying too much. The goal is near, but the load has to be set down or shared.', 'Releasing a burden, delegating at last, or finally admitting the weight was crushing.'],
  ['Page of Wands', 'curiosity, a creative idea, eager beginner', 'A spark of an idea and the enthusiasm to chase it. Explore freely; nothing is committed yet.', 'A stalled idea, all talk and no move, or restlessness with nothing to land on.'],
  ['Knight of Wands', 'bold action, adventure, charisma', 'Charge. Passion, movement, and a magnetic energy that pulls others along — just watch the corners.', 'Recklessness, impatience, or a chase that keeps changing direction and burning out.'],
  ['Queen of Wands', 'confidence, warmth, magnetic drive', 'Sure of yourself and radiant with it. Creative determination that draws people and opportunities in.', 'Self-doubt behind the confidence, overextension, or a demanding heat that scorches.'],
  ['King of Wands', 'vision, leadership, drive with direction', 'A natural leader with a clear vision and the will to see it through. Bold, but grounded.', 'Impulsive leadership, a domineering streak, or forcing a vision others never signed up for.'],
]

const CUPS: Raw[] = [
  ['Ace of Cups', 'new feeling, love offered, an open heart', 'An emotional opening — love, compassion, or creative feeling offered to you or through you.', 'A blocked or spilled feeling, a closed heart, or love that cannot find a channel.'],
  ['Two of Cups', 'attraction, partnership, a meeting of hearts', 'A genuine connection — mutual, balanced, and worth tending. Two things coming into harmony.', 'An imbalance, a rift, or crossed signals between two people who mean well.'],
  ['Three of Cups', 'friendship, community, shared joy', 'Celebrate with the people who have your back. Support, belonging, and good company.', 'Overindulgence, gossip, or feeling like the outsider in a group that should be yours.'],
  ['Four of Cups', 'apathy, contemplation, missing the offer', 'Withdrawn and unmoved, staring at what you lack while a new cup is being held right out to you.', 'Coming out of the fog, a new openness, or finally accepting the help that was there all along.'],
  ['Five of Cups', 'grief, regret, focus on the loss', 'Real loss, and the pull to keep looking at what spilled. Two cups still stand behind you.', 'Acceptance, turning around, and gathering what can still be saved. The grief is loosening.'],
  ['Six of Cups', 'nostalgia, innocence, a kindness', 'A sweetness from the past returns — a memory, an old friend, a simple generous gesture.', 'Stuck in the past, idealising what was, or a childhood pattern that needs to be outgrown.'],
  ['Seven of Cups', 'options, illusion, wishful thinking', 'Many possibilities float in front of you, some real and some fantasy. Do not choose from a daydream.', 'Clarity returns, the fog lifts, and you can see which cup actually has something in it.'],
  ['Eight of Cups', 'walking away, seeking meaning', 'Leaving something that is fine but not enough, to go looking for what actually matters.', 'Fear of leaving, drifting without deciding, or going back to what you already outgrew.'],
  ['Nine of Cups', 'contentment, a wish fulfilled', 'Emotional satisfaction — the "wish card". Something you wanted has come, and it feels good.', 'Smugness, a wish that rings hollow once granted, or comfort used to avoid something deeper.'],
  ['Ten of Cups', 'lasting harmony, belonging, fulfilment', 'The picture of emotional home — aligned values, peace with the people you love, a full heart.', 'A fractured ideal, misaligned values under the surface, or a strain in the family picture.'],
  ['Page of Cups', 'a tender message, a creative feeling', 'An unexpected emotional or creative offering — soft, sincere, a little vulnerable. Receive it kindly.', 'Emotional immaturity, moodiness, or a creative impulse that keeps getting blocked.'],
  ['Knight of Cups', 'romance, following the heart, an offer', 'An invitation led by feeling — a proposal, an artistic pursuit, a romantic gesture. Charming and sincere.', 'Moody idealism, an offer that will not hold up, or a heart that promises more than it delivers.'],
  ['Queen of Cups', 'emotional depth, compassion, intuition', 'Deep feeling held with grace. Caring, intuitive, able to hold others without drowning.', 'Emotional overwhelm, martyrdom, or care given from insecurity rather than fullness.'],
  ['King of Cups', 'emotional mastery, calm, diplomacy', 'Steady in strong feeling. Able to stay kind and clear when the water is rough.', 'Feeling suppressed until it leaks, volatility under a calm mask, or warmth used to manipulate.'],
]

const SWORDS: Raw[] = [
  ['Ace of Swords', 'clarity, breakthrough, truth', 'A clean mental breakthrough. The truth cuts through confusion — say it, or see it, plainly.', 'Confusion, misinformation, or a sharp clarity used to wound rather than to free.'],
  ['Two of Swords', 'stalemate, avoidance, a deferred choice', 'A hard decision held at arm’s length, blindfolded. The impasse is a choice not to choose.', 'The blindfold slips, information arrives, and the decision can finally be made.'],
  ['Three of Swords', 'heartbreak, painful truth', 'Grief said out loud. A painful truth that hurts precisely because it is true.', 'The pain is releasing. Recovery, forgiveness beginning, or a wound finally allowed to close.'],
  ['Four of Swords', 'rest, recovery, a deliberate pause', 'Stop. Lie down. Recovery is not optional — the mind needs stillness before the next round.', 'Restlessness, burnout ignored, or a rest you keep postponing until you break.'],
  ['Five of Swords', 'conflict, a hollow victory', 'Winning at a cost that is not worth it. Ego, tension, and a fight that leaves everyone smaller.', 'Reconciliation, walking away from the fight, or recognising the price of "winning".'],
  ['Six of Swords', 'transition, moving to calmer water', 'Leaving a rough patch behind for something quieter. A necessary, if sad, departure.', 'A move that keeps stalling, baggage carried along, or resistance to a change that must happen.'],
  ['Seven of Swords', 'strategy, stealth, getting away with it', 'A clever, quiet manoeuvre. Acting alone, keeping cards hidden — effective, if not entirely clean.', 'A plan exposed, a conscience catching up, or returning something taken.'],
  ['Eight of Swords', 'restriction, self-limiting thoughts, a mental cage', 'Boxed in — but the cage is built of thoughts, and the blindfold is yours to remove.', 'The blindfold comes off. Self-liberation, a new perspective, seeing that the door was never locked.'],
  ['Nine of Swords', 'anxiety, dread, the 3am mind', 'The worry that wakes you. Almost always worse in the dark of the head than in daylight.', 'The anxiety easing, the worry shared and made smaller, or seeing it was catastrophe-thinking.'],
  ['Ten of Swords', 'a painful ending, rock bottom', 'The worst has happened and it is genuinely over. Nothing left to dread — the sun is already rising.', 'Survival, slow recovery, and a firm refusal to let this particular ruin repeat.'],
  ['Page of Swords', 'curiosity, vigilance, a truth-seeker', 'Sharp, watchful, hungry for information. Ask the hard questions — just be fair with the answers.', 'Cynicism, gossip, scattered thinking, or using cleverness to needle rather than understand.'],
  ['Knight of Swords', 'fast ideas, direct action, charging in', 'Bold, quick, logical and blunt. Cuts to the point and acts — sometimes before thinking it through.', 'Haste, aggression, all force and no aim. Slow down before someone gets cut.'],
  ['Queen of Swords', 'clear boundaries, honesty, independent judgment', 'Perceptive and direct, unclouded by sentiment. Says the true thing, kindly but without flinching.', 'Coldness, bitterness, or honesty sharpened into cruelty. Boundaries that have become walls.'],
  ['King of Swords', 'intellectual authority, ethics, sound judgment', 'Clear thinking held to a principle. Fair, rational, able to decide well under pressure.', 'Power misused, logic without heart, or a clever argument built to control rather than clarify.'],
]

const PENTACLES: Raw[] = [
  ['Ace of Pentacles', 'a tangible opportunity, a seed of prosperity', 'A real, grounded opening — a job, a resource, a practical chance. Plant it properly.', 'A missed chance, scarcity thinking, or an opportunity with no plan behind it.'],
  ['Two of Pentacles', 'juggling, adaptability, balancing demands', 'Keeping several things in the air with a bit of grace. Manageable, if you stay light on your feet.', 'Overwhelm, dropped balls, or finances and time in disarray.'],
  ['Three of Pentacles', 'collaboration, skilled work, building', 'Good work done with others, each bringing real skill. Something solid is taking shape.', 'Poor teamwork, misaligned effort, or work that is technically fine but half-hearted.'],
  ['Four of Pentacles', 'security, saving, holding on', 'Stability held onto tightly. Some caution is wise; a clenched fist is not.', 'Loosening the grip and letting some flow — or the opposite, hoarding to a fault.'],
  ['Five of Pentacles', 'hardship, exclusion, material worry', 'A cold patch — money, health, or belonging feels scarce. Help is nearer than it looks.', 'Recovery, help found, or the worst of the hard season beginning to pass.'],
  ['Six of Pentacles', 'generosity, fair exchange', 'Giving and receiving in balance. Support offered without strings, or gratefully accepted.', 'Strings attached, an imbalance of power in the giving, or a debt that distorts the relationship.'],
  ['Seven of Pentacles', 'assessment, patience, the long game', 'Pause and look at what you have grown. Slow returns — decide whether to keep tending or replant.', 'Impatience, effort that yielded little, or pulling something up before it had time to fruit.'],
  ['Eight of Pentacles', 'diligence, mastery through repetition', 'Head down, learning the craft one repetition at a time. This is how real skill is built.', 'Cut corners, uninspired work, or perfectionism that never lets anything be finished.'],
  ['Nine of Pentacles', 'self-sufficiency, earned comfort', 'Enjoying the fruit of your own disciplined work, in your own space, on your own terms.', 'Overwork with no enjoyment, financial dependence, or comfort that has become a gilded cage.'],
  ['Ten of Pentacles', 'legacy, lasting wealth, roots', 'Wealth that lasts beyond you — family, tradition, a foundation others can stand on.', 'A family financial strain, an unstable foundation, or fortune that will not hold.'],
  ['Page of Pentacles', 'a study, a new venture, grounded ambition', 'A practical goal taken up with focus. Willing to learn and to start small.', 'Procrastination, unrealistic plans, or an opportunity left to go stale.'],
  ['Knight of Pentacles', 'steady effort, reliability, method', 'Slow, dependable, thorough. Not exciting — but this one actually finishes what it starts.', 'Stagnation, boredom, or doing the bare minimum and calling it diligence.'],
  ['Queen of Pentacles', 'practical nurture, grounded abundance', 'Providing well and warmly — a home that works, resources shared, care that is also competent.', 'Self-neglect, work-and-home out of balance, or nurture that has tipped into smothering.'],
  ['King of Pentacles', 'material success, stability, disciplined generosity', 'Abundance built and held steady. Generous without being reckless, secure without being rigid.', 'Greed, status-obsession, or using money and comfort to control the people around you.'],
]

function build(raws: Raw[], arcana: Arcana, rankStart: number): TarotCard[] {
  return raws.map((r, i) => {
    const rank = rankStart + i
    return {
      id: `${arcana}-${String(rank).padStart(2, '0')}`,
      name: r[0],
      arcana,
      rank,
      keywords: r[1].split(',').map((k) => k.trim()),
      upright: r[2],
      reversed: r[3],
    }
  })
}

export const TAROT_DECK: TarotCard[] = [
  ...build(MAJORS, 'major', 0),
  ...build(WANDS, 'wands', 1),
  ...build(CUPS, 'cups', 1),
  ...build(SWORDS, 'swords', 1),
  ...build(PENTACLES, 'pentacles', 1),
]

/* ------------------------------------------------------------------ spreads */

export interface SpreadPosition {
  key: string
  label: string
  prompt: string
}

export interface Spread {
  key: 'one' | 'three' | 'cross'
  name: string
  blurb: string
  positions: SpreadPosition[]
}

export const SPREADS: Spread[] = [
  {
    key: 'one',
    name: 'One Card',
    blurb: 'A single card for a single question — or just for the day.',
    positions: [{ key: 'card', label: 'Your Card', prompt: 'the heart of it' }],
  },
  {
    key: 'three',
    name: 'Past · Present · Future',
    blurb: 'Three cards tracing where a situation came from and where it is going.',
    positions: [
      { key: 'past', label: 'Past', prompt: 'what led here' },
      { key: 'present', label: 'Present', prompt: 'where you stand now' },
      { key: 'future', label: 'Future', prompt: 'where this is heading' },
    ],
  },
  {
    key: 'cross',
    name: 'Celtic Cross',
    blurb: 'The classic ten-card reading — a full picture of a question from every side.',
    positions: [
      { key: 'heart', label: 'The Heart', prompt: 'the matter itself' },
      { key: 'crossing', label: 'The Crossing', prompt: 'what challenges or supports it' },
      { key: 'foundation', label: 'The Foundation', prompt: 'the root beneath it' },
      { key: 'past', label: 'The Past', prompt: 'what is passing away' },
      { key: 'crown', label: 'The Crown', prompt: 'the aim, or what is possible' },
      { key: 'future', label: 'The Future', prompt: 'what comes next' },
      { key: 'self', label: 'Yourself', prompt: 'how you meet it' },
      { key: 'air', label: 'Around You', prompt: 'others and circumstance' },
      { key: 'hopes', label: 'Hopes & Fears', prompt: 'what you long for and dread' },
      { key: 'outcome', label: 'The Outcome', prompt: 'where it resolves' },
    ],
  },
]

export const spreadOf = (key: Spread['key']): Spread =>
  SPREADS.find((s) => s.key === key) ?? SPREADS[0]

/* ------------------------------------------------------------------- shuffle */

export interface DrawnCard {
  card: TarotCard
  reversed: boolean
}

export interface TarotReading {
  spreadKey: Spread['key']
  cards: DrawnCard[]
  seed: string
}

const fnv1a = (str: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

const mulberry32 = (seed: number) => {
  let a = seed >>> 0
  return (): number => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Shuffle the full deck with `seed`, cut, and draw for the spread. ~1 in 3 reversed. */
export function drawReading(spread: Spread, seed: string): TarotReading {
  const rand = mulberry32(fnv1a(seed))
  const order = TAROT_DECK.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = order[i]
    order[i] = order[j]
    order[j] = tmp
  }
  const cards: DrawnCard[] = spread.positions.map((_, i) => ({
    card: TAROT_DECK[order[i]],
    reversed: rand() < 0.32,
  }))
  return { spreadKey: spread.key, cards, seed }
}

/** The day's stable one-card reading for this querent. */
export function dailySeed(profile: BirthProfile | null, date: Date = new Date()): string {
  return `${localDayKey(date)}|${profile?.utc ?? 'no-natal'}|daily-tarot`
}

/** A fresh, non-repeating shuffle seed. */
export function freshSeed(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/* ---------------------------------------------------------------- oracle */

/** Seed for a one-card Oracle pull — stable for the same question on the same day. */
export function oracleSeed(
  question: string,
  profile: BirthProfile | null,
  date: Date = new Date(),
): string {
  const q = question.trim().toLowerCase().replace(/\s+/g, ' ')
  return `${localDayKey(date)}|${profile?.utc ?? 'no-natal'}|oracle|${q}`
}

/** A single-card Oracle draw for a question. */
export function drawOracle(question: string, profile: BirthProfile | null): DrawnCard {
  return drawReading(spreadOf('one'), oracleSeed(question, profile)).cards[0]
}

/* --------------------------------------------- reading the question itself */

export type OracleKind = 'decision' | 'timing' | 'open'
export type OracleDomain = 'love' | 'work' | 'money' | 'home' | 'creative' | 'self'

export interface OracleClass {
  kind: OracleKind
  domain: OracleDomain
  aboutPerson: boolean
}

// "what/how/where/why/which/who ..." → open, even if it contains "should"
const OPEN_RE = /\b(what|how|where|why|which|who)\b/
const TIMING_RE = /\b(when|how long|how soon|by when|until when|how many (days|weeks|months)|timing|will .* happen)\b/
const DECISION_RE =
  /\b(should i|shall i|ought i|is it worth|is it (a )?good idea|do i (need|have) to|is now the time|would it be|is it better|worth it|go for it|take (the|this|that|it)|say yes|do it|stay or|move on|is this the right)\b/
const PERSON_RE =
  /\b(him|her|them|his|hers|their|he'?s|she'?s|they'?re|my (ex|partner|boyfriend|girlfriend|husband|wife|boss|manager|friend|mother|father|mom|dad|sister|brother|son|daughter|colleague|co-?worker))\b/

const DOMAIN_RE: [OracleDomain, RegExp][] = [
  ['love', /\b(love|relationship|partner|boyfriend|girlfriend|husband|wife|marriage|marry|dating|romance|romantic|crush|my ex|breakup|break up|feelings for)\b/],
  ['creative', /\b(art|artist|write|writing|writer|music|song|paint|painting|creative|my book|novel|film|the project|my project)\b/],
  ['work', /\b(job|work|career|boss|manager|co-?worker|colleague|business|company|client|interview|promotion|quit|resign|hire|hired|fired|the office|my role|startup)\b/],
  ['money', /\b(money|salary|pay|paid|afford|buy|purchase|invest|debt|loan|finances|financial|savings|rent|budget|price)\b/],
  ['home', /\b(move|moving|relocat|house|apartment|flat|move (back|out|in)|home town|hometown|family|mother|father|mom|dad|sister|brother|parents|kids|children|son|daughter)\b/],
]

export function classifyQuestion(q: string): OracleClass {
  const s = ` ${q.toLowerCase().trim()} `
  const kind: OracleKind = TIMING_RE.test(s)
    ? 'timing'
    : OPEN_RE.test(s)
      ? 'open'
      : DECISION_RE.test(s)
        ? 'decision'
        : 'open'
  let domain: OracleDomain = 'self'
  for (const [d, re] of DOMAIN_RE) {
    if (re.test(s)) {
      domain = d
      break
    }
  }
  return { kind, domain, aboutPerson: PERSON_RE.test(s) }
}

/* ------------------------------------------------------ the yes / no lean */

// −2 firm no · −1 caution · 0 it depends / wait · +1 forward · +2 clear yes
const MAJOR_LEAN = [
  1, 2, 0, 2, 1, 0, 1, 2, 1, -1, 1, 0, 0, -1, 0, -1, -2, 2, -1, 2, 1, 2,
]
const PIP_LEAN: Record<Suit, number[]> = {
  //          A   2   3   4   5   6   7   8   9  10
  wands: [2, 1, 1, 1, -1, 1, 0, 2, 0, -1],
  cups: [2, 2, 2, -1, -2, 1, -1, 0, 2, 2],
  swords: [0, 0, -2, 0, -2, 1, -1, -1, -2, -1],
  pentacles: [2, 0, 2, -1, -2, 1, 0, 2, 2, 2],
}

function leanValue(card: TarotCard): number {
  if (card.arcana === 'major') return MAJOR_LEAN[card.rank] ?? 0
  if (card.rank >= 11) return 0 // courts describe an approach, not a verdict
  return PIP_LEAN[card.arcana as Suit][card.rank - 1] ?? 0
}

export type OracleVerdict = 'yes' | 'no' | 'wait' | 'both'

const VERDICT_LABEL: Record<OracleVerdict, string> = {
  yes: 'Yes-leaning',
  no: 'No-leaning',
  wait: 'Not yet',
  both: "It's both",
}

export interface OracleReading {
  card: TarotCard
  reversed: boolean
  class: OracleClass
  /** Only present for decision questions. */
  verdict: OracleVerdict | null
  verdictLabel: string | null
  /** The card's essence, oriented to the question. */
  heart: string
  /** What it is really about. */
  meaning: string
  /** What to do. */
  action: string
}

const DOMAIN_PHRASE: Record<OracleDomain, string> = {
  love: 'your relationships and your heart',
  work: 'your work and where it is heading',
  money: 'money and what you can build',
  home: 'home, family and where you belong',
  creative: 'the creative work you are carrying',
  self: 'your own path right now',
}

const FAST = new Set([
  'major-00', 'major-10', 'major-16', 'major-19',
  'wands-01', 'wands-08', 'cups-01', 'swords-01', 'pentacles-01',
])
const SLOW = new Set([
  'major-04', 'major-05', 'major-09', 'major-12', 'major-14', 'major-21',
  'pentacles-04', 'pentacles-07', 'swords-04',
])

/** Cards that genuinely put the choice back on you. */
const FORK = new Set(['major-06', 'major-11', 'swords-02', 'cups-07'])

export function oracleReading(drawn: DrawnCard, question: string): OracleReading {
  const { card, reversed } = drawn
  const cls = classifyQuestion(question)
  const base = leanValue(card)
  // reversed dampens a yes and softens a no
  const lean = reversed
    ? base > 0
      ? Math.max(base - 2, -1)
      : base < 0
        ? base + 1
        : 0
    : base

  let verdict: OracleVerdict | null = null
  if (cls.kind === 'decision') {
    verdict = FORK.has(card.id)
      ? 'both'
      : lean >= 1
        ? 'yes'
        : lean <= -1
          ? 'no'
          : 'wait'
  }

  const stance = reversed ? 'reversed' : 'upright'
  const heart = `${card.name}, ${stance} — ${card.keywords[0]}. It lands on ${DOMAIN_PHRASE[cls.domain]}.`
  const meaning = reversed ? card.reversed : card.upright

  let action: string
  if (verdict === 'yes') {
    action = `Lean toward yes — but on the card's terms, not by forcing it. Move once, then look again.`
  } else if (verdict === 'no') {
    action = `Lean toward no, or at least not like this. The card is closing this door rather than opening one.`
  } else if (verdict === 'both') {
    action = `Genuinely both. The card won't choose for you — the deciding is yours, and it wants you to make it consciously.`
  } else if (verdict === 'wait') {
    action = `Not yet. The ground isn't set. Give it time and ask again when something has actually moved.`
  } else if (cls.kind === 'timing') {
    action = FAST.has(card.id)
      ? `Sooner than it feels — think weeks, not months. Stay ready.`
      : SLOW.has(card.id)
        ? `This takes its own time. Think seasons, not weeks — pushing won't speed it.`
        : `No fixed date. The timing hangs on a move you haven't made yet — make it, and the clock starts.`
  } else {
    action = reversed
      ? `Turn toward what you've been avoiding here. One honest look changes more than more effort.`
      : `Put your attention on ${card.keywords.join(', ')}. Take one real step, then re-read the situation.`
  }

  return {
    card,
    reversed,
    class: cls,
    verdict,
    verdictLabel: verdict ? VERDICT_LABEL[verdict] : null,
    heart,
    meaning,
    action,
  }
}
