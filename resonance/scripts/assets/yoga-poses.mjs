// Yoga pose art, one figure per pose, in the same luminous style as chakra-meditator (passed in as a
// style reference). The chakra the pose works on glows in its colour. Rendered as light on pure
// black — the app screen-blends it, so every chakra colour works with no cut-out fringe.
// Usage: node scripts/assets/yoga-poses.mjs [pose,pose...]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const env = Object.fromEntries(readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n').filter((l) => l.includes('='))
  .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]))
const MODEL = 'gemini-3-pro-image'
const OUT_DIR = path.join(__dirname, 'output', 'yoga')
const REF = path.join(__dirname, '..', '..', 'src', 'assets', 'art', 'chakra-meditator.webp')
mkdirSync(OUT_DIR, { recursive: true })

const CHAKRA = {
  root: { colour: 'deep ruby red', at: 'at the base of the spine' },
  sacral: { colour: 'warm orange', at: 'in the lower belly, just below the navel' },
  'solar-plexus': { colour: 'golden yellow', at: 'in the upper belly, below the ribcage' },
  heart: { colour: 'emerald green', at: 'in the centre of the chest' },
  throat: { colour: 'sky blue', at: 'at the throat' },
  'third-eye': { colour: 'deep indigo', at: 'on the forehead between the brows' },
  crown: { colour: 'soft violet', at: 'just above the crown of the head' },
}

// [chakra, the pose described precisely so the anatomy comes out right, camera angle]
export const POSES = {
  // root
  mountain: ['root', 'Mountain pose (Tadasana): standing tall with the feet together and parallel, weight even, legs straight, arms relaxed down by the sides with the palms facing forward, shoulders soft, crown lifted, calm', 'front view'],
  'warrior-2': ['root', 'Warrior II (Virabhadrasana II): feet wide apart, front knee bent at 90 degrees directly over the front ankle, back leg straight, arms extended straight out to the sides at shoulder height parallel to the floor, torso upright, gaze over the front hand', 'front view'],
  garland: ['root', 'Garland pose (Malasana): a deep yogic squat, feet flat on the floor slightly wider than the hips, heels down, knees wide, palms pressed together at the heart with the elbows gently pressing the inner knees, spine long and upright', 'three-quarter side view'],
  // sacral
  'bound-angle': ['sacral', 'Bound Angle pose (Baddha Konasana): seated upright on the floor, the soles of the feet pressed together close to the body, knees relaxed out to the sides, hands holding the feet, spine tall', 'three-quarter view'],
  goddess: ['sacral', 'Goddess pose (Utkata Konasana): standing with the feet wide and toes turned out, knees bent deeply over the toes, hips low, torso upright, arms raised at shoulder height with elbows bent at 90 degrees and palms facing forward', 'three-quarter view'],
  'low-lunge': ['sacral', 'Low Lunge (Anjaneyasana): front knee bent over the front ankle, back knee resting on the floor with the top of the back foot down, hips sinking forward, torso upright, both arms reaching up overhead', 'side view'],
  // solar plexus
  boat: ['solar-plexus', 'Boat pose (Navasana): seated balancing on the sit bones, torso leaning back slightly with a straight spine, legs lifted with the knees bent and the shins parallel to the floor, arms reaching forward parallel to the floor', 'side view'],
  'seated-twist': ['solar-plexus', 'Seated Twist (Ardha Matsyendrasana): seated upright, one leg folded on the floor, the other foot planted outside the opposite knee, the torso gently twisting toward the raised knee, the opposite elbow resting against that knee, the other hand on the floor behind, spine tall', 'three-quarter view'],
  'warrior-1': ['solar-plexus', 'Warrior I (Virabhadrasana I): front knee bent over the front ankle, back leg straight with the back heel down, hips facing forward, torso upright, both arms reaching straight up overhead with the palms facing each other', 'three-quarter side view'],
  // heart
  cobra: ['heart', 'Cobra pose (Bhujangasana): lying face down, hips and legs resting on the floor, legs extended straight behind, tops of the feet on the floor, palms under the shoulders with the elbows clearly bent and hugging the ribs, only the chest gently lifted and open, shoulders relaxed, gaze forward', 'three-quarter side view, so the glowing orb at the centre of the chest is visible from the front'],
  camel: ['heart', 'Camel pose (Ustrasana), supported variation: kneeling upright with the knees hip-width apart, hands resting on the lower back with the fingers pointing down, hips pressing forward over the knees, chest lifting and opening up toward the sky in a gentle backbend, neck long', 'side view'],
  'cat-cow': ['heart', 'Cow pose from Cat–Cow: on hands and knees in a tabletop position, wrists under the shoulders and knees under the hips, the belly softly dropping, the chest opening forward and the gaze lifting gently', 'side view'],
  // throat
  fish: ['throat', 'Fish pose (Matsyasana): lying on the back with the legs extended straight, resting on the forearms with the elbows under the shoulders, the chest lifted high and the throat open, the crown of the head lightly touching the floor', 'side view'],
  bridge: ['throat', 'Bridge pose (Setu Bandhasana): lying on the back, knees bent with the feet flat on the floor hip-width apart, hips lifted high, arms resting on the floor alongside the body, the chest drawing toward the chin', 'side view'],
  // third eye
  child: ["third-eye", "Child's pose (Balasana): kneeling and sitting back on the heels, the torso folded forward over the thighs, the forehead resting on the floor, arms extended forward along the floor with the palms down", 'side view'],
  'down-dog': ['third-eye', 'Downward-Facing Dog (Adho Mukha Svanasana): hands and feet on the floor, hips lifted high so the body forms an inverted V shape, arms straight, legs straight with the heels reaching toward the floor, head relaxed between the arms', 'side view'],
  // crown
  'easy-seat': ['crown', 'Easy Seat (Sukhasana): sitting cross-legged on the floor with a tall straight spine, hands resting on the knees with the palms up, shoulders relaxed, eyes gently closed, serene', 'front view'],
  tree: ['crown', 'Tree pose (Vrikshasana): standing tall balanced on one straight leg, the sole of the other foot resting against the inner calf of the standing leg, that knee pointing out to the side, palms pressed together in prayer above the head with the arms reaching up, spine tall, calm', 'three-quarter view'],
  corpse: ['crown', 'Corpse pose (Savasana): lying flat on the back, fully relaxed, legs extended and slightly apart, arms resting a little away from the body with the palms facing up, eyes closed, completely at rest', 'three-quarter view from slightly above'],
}

async function generate(name) {
  const [chakra, pose, view] = POSES[name], c = CHAKRA[chakra]
  const prompt = `Use the attached image only as the STYLE reference: the same luminous figure made of soft warm golden-amber light — translucent and glowing from within like an energy body, with a faint glowing spine line and a delicate aura, no face details.
Now show that figure in this yoga pose, anatomically correct and natural, with realistic human proportions and joints: ${pose}. ${view}, full body visible, centred, with comfortable margin around the figure.
The figure is softly androgynous and modestly dressed in a simple fitted long-sleeve top and full-length leggings, both made of the same soft golden light — elegant, serene and smooth, like a sculpture of light.
A single softly glowing ${c.colour} orb of light ${c.at} — the only coloured element; no other dots, symbols or chakra markings.
No yoga mat, no floor line, no props.
Style: "Celestial Luxury" — premium mystical wellness app aesthetic, premium cinematic 3D render, soft volumetric glow, high detail, no clutter.
Strict constraints: a solid pure black background (#000000), completely flat, no gradient, no stars, no texture; no shadow, no reflection, the figure floats in empty space; no text, no letters, no watermark, no border.`
  const ref = execFileSync('ffmpeg', ['-loglevel', 'error', '-i', REF, '-f', 'image2', '-c:v', 'png', '-'], { maxBuffer: 64e6 })
  let data
  for (let a = 1; a <= 4; a++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ inlineData: { mimeType: 'image/png', data: ref.toString('base64') } }, { text: prompt }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '1:1' } } }),
    })
    data = await res.json()
    if (res.ok) break
    console.error(`[${name}] HTTP ${res.status}, retrying`); await new Promise((r) => setTimeout(r, 8000 * a))
  }
  const img = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
  if (!img) { console.error(`[${name}] no image`, JSON.stringify(data).slice(0, 300)); return }
  // light on pure black: the app screen-blends it onto its dark surfaces, so there are no cut-out fringes
  const final = path.join(OUT_DIR, `${name}.png`)
  writeFileSync(final, Buffer.from(img.inlineData.data, 'base64'))
  console.log(`[${name}] ${chakra} → ${final}`)
}

const only = process.argv[2]?.split(',')
await Promise.all(Object.keys(POSES).filter((n) => !only || only.includes(n)).map(generate))
