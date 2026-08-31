import type { ChakraKey, Crystal } from '../types/resonance'

/**
 * A standalone crystal catalogue for the Apothecary — well-known stones beyond
 * the handful embedded in each transit row. These are browse-only; the daily
 * "prescribed" stones still come from `esotericData.json`.
 */

type Raw = [
  name: string,
  chakra: ChakraKey,
  color: string,
  keywords: string,
  description: string,
]

const RAW: Raw[] = [
  /* ---- root ---- */
  ['Black Onyx', 'root', '#141414', 'willpower, protection', 'Absorbs chaotic, nervous energy and hands back steady resolve.'],
  ['Jet', 'root', '#0b0b0b', 'grief, cleansing', 'An old talisman against low moods — it draws off heavy feeling.'],
  ['Shungite', 'root', '#2b2b2b', 'purification, shielding', 'Neutralises electromagnetic and emotional static; a deep reset.'],
  ['Bronzite', 'root', '#6b5439', 'certainty, action', 'Steadies indecision and returns a sense of your own ground.'],
  ['Fire Agate', 'root', '#7c2d12', 'courage, boundary', 'Rekindles drive and reflects hostility back to its source.'],
  ['Vanadinite', 'root', '#b91c1c', 'focus, endurance', 'Anchors scattered attention into the physical task in front of you.'],
  ['Dravite', 'root', '#4a3728', 'self-acceptance, grounding', 'Brown tourmaline — meets the shadow with practical kindness.'],

  /* ---- sacral ---- */
  ['Peach Moonstone', 'sacral', '#ffd8b1', 'soothing, self-worth', 'Calms an anxious heart and quiets the inner critic.'],
  ['Amber', 'sacral', '#d97706', 'warmth, release', 'Fossil resin that draws out pain and lightens the mood.'],
  ['Aragonite', 'sacral', '#b45309', 'patience, the earth', 'Steadies you when feelings run ahead of the facts.'],
  ['Snowflake Obsidian', 'sacral', '#2d2d2d', 'balance, honesty', 'Brings the buried thing gently into the light.'],
  ['Peach Aventurine', 'sacral', '#f6b28f', 'quiet confidence, decisions', 'Softens overthinking so a small choice can actually be made.'],
  ['Ocean Jasper', 'sacral', '#2f8f7f', 'renewal, joy', 'Lifts stagnation and reminds you that moods pass in tides.'],

  /* ---- solar plexus ---- */
  ['Pyrite', 'solar-plexus', '#b08d2e', 'confidence, abundance', 'A shield of self-belief that deflects doubt and criticism.'],
  ['Rutilated Quartz', 'solar-plexus', '#d4b483', 'clarity, drive', 'Golden threads that pull energy and intention into one line.'],
  ['Golden Healer Quartz', 'solar-plexus', '#eab308', 'vitality, courage', 'Floods a tired system with warm, restorative light.'],
  ['Heliodor', 'solar-plexus', '#facc15', 'will, sovereignty', 'Golden beryl — for owning your authority without apology.'],
  ['Mookaite', 'solar-plexus', '#a3542e', 'instinct, stamina', 'Grounds a decision in the gut and gives it staying power.'],

  /* ---- heart ---- */
  ['Malachite', 'heart', '#0f766e', 'transformation, boundaries', 'Breaks old patterns and guards the heart while it mends.'],
  ['Rhodonite', 'heart', '#e11d63', 'forgiveness, old wounds', 'Works on long-held grievances and calls you back to compassion.'],
  ['Rhodochrosite', 'heart', '#f472b6', 'self-love, the inner child', 'Reaches the tender, younger part of you with real warmth.'],
  ['Kunzite', 'heart', '#f9a8d4', 'receiving love, surrender', 'Dissolves the reflex to keep love at arm’s length.'],
  ['Emerald', 'heart', '#059669', 'devotion, honesty', 'Steadies a bond and keeps the heart truthful within it.'],
  ['Green Jade', 'heart', '#22c55e', 'harmony, steady growth', 'A calm, lucky stone for long-term wellbeing and ease.'],
  ['Prehnite', 'heart', '#a3e635', 'calm, decluttering', 'Quiets a busy mind and heals the one who does the healing.'],
  ['Chrysoprase', 'heart', '#34d399', 'hope, gentleness', 'Lifts a heavy heart and invites you to be kind to yourself.'],
  ['Unakite', 'heart', '#84cc16', 'patience, slow change', 'Eases you through the necessary, unhurried emotional work.'],
  ['Pink Opal', 'heart', '#fbcfe8', 'renewal, peace', 'A soft stone for grief and for starting to feel again.'],

  /* ---- throat ---- */
  ['Amazonite', 'throat', '#2dd4bf', 'truth, calm', 'Filters the noise so you can hear, and say, what is real.'],
  ['Chrysocolla', 'throat', '#0e7490', 'expression, wisdom', 'Steadies the voice for the difficult, necessary conversation.'],
  ['Blue Kyanite', 'throat', '#2563eb', 'alignment, clearing', 'Cuts through confusion and refuses to hold negative energy.'],
  ['Larimar', 'throat', '#38bdf8', 'serenity, the sea', 'Cools heated words and brings a settled clarity.'],
  ['Angelite', 'throat', '#93c5fd', 'gentle speech, listening', 'Softens both how you speak and how you take things in.'],
  ['Blue Apatite', 'throat', '#0ea5e9', 'clarity, motivation', 'Clears mental fog and curbs the pull toward distraction.'],
  ['Blue Chalcedony', 'throat', '#7dd3fc', 'diplomacy, ease', 'Takes the edge off a message so it can actually land.'],

  /* ---- third eye ---- */
  ['Azurite', 'third-eye', '#1e3a8a', 'insight, old knowledge', 'Opens perception and loosens a fixed idea.'],
  ['Iolite', 'third-eye', '#4338ca', 'inner vision, direction', 'A “viking compass” for finding your way through fog.'],
  ['Tanzanite', 'third-eye', '#6d28d9', 'awareness, calm mind', 'Links a quick mind to a settled heart.'],
  ['Sugilite', 'third-eye', '#7e22ce', 'protection, purpose', 'Shields a sensitive mind and holds it steady on its path.'],
  ['Moldavite', 'third-eye', '#4d7c0f', 'rapid change, awakening', 'Intense — it accelerates transformation whether you feel ready or not.'],
  ['Blue Sapphire', 'third-eye', '#1d4ed8', 'discernment, focus', 'Sharpens judgement and steadies the mind under pressure.'],
  ['Merlinite', 'third-eye', '#3f3f46', 'intuition, the shadow', 'Opens the deeper mind and its darker, wiser corners.'],

  /* ---- crown ---- */
  ['Celestite', 'crown', '#bae6fd', 'serenity, contemplation', 'A gentle stone for peace and quiet reflection.'],
  ['Apophyllite', 'crown', '#ecfeff', 'light, presence', 'Brings a room, and a mind, into stillness.'],
  ['Petalite', 'crown', '#f5f3ff', 'calm, the higher self', 'Serene without being dulling — the “stone of the angels”.'],
  ['Lithium Quartz', 'crown', '#ddd6fe', 'deep calm, sleep', 'A naturally soothing stone for an over-wound nervous system.'],
  ['Ametrine', 'crown', '#c084fc', 'balance, decisions', 'Amethyst and citrine in one — clears the head so you can choose.'],
  ['Spirit Quartz', 'crown', '#a78bfa', 'harmony, alignment', 'Brings scattered parts of a self, or a family, into accord.'],
  ['Phenacite', 'crown', '#f8fafc', 'clarity, ascension', 'A high, clear stone — pairs well with quieter grounding ones.'],
]

const slug = (v: string): string =>
  v.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const CRYSTAL_LIBRARY: Crystal[] = RAW.map(
  ([name, chakra, color, keywords, description]) => ({
    id: `lib-${slug(name)}`,
    name,
    chakra,
    color,
    keywords: keywords.split(',').map((k) => k.trim()),
    description,
  }),
)
