import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '.env')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)
const API_KEY = env.GEMINI_API_KEY
if (!API_KEY) throw new Error('GEMINI_API_KEY missing from scripts/assets/.env')

const MODEL = 'gemini-3-pro-image'
const OUT_DIR = path.join(__dirname, 'output')
mkdirSync(OUT_DIR, { recursive: true })

const STYLE_SUFFIX = `
Style: "Celestial Luxury" — premium mystical wellness app aesthetic, deep cosmic obsidian and gold, glossy premium 3D render quality, soft realistic lighting, high detail, centered composition, no clutter.
Strict constraints: solid flat background color #00FF00 (pure chroma-key green, like a film green-screen), no gradient or texture in the background, no green anywhere in the subject itself, no drop shadow, no shadow of any kind, no reflection on a surface below it, the subject floats in empty space, no text, no letters, no watermark, no logo, no border, no frame, no extra objects.`

async function generateOne(name, prompt, aspectRatio = '1:1') {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt + STYLE_SUFFIX }] }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
          imageConfig: { aspectRatio },
        },
      }),
    },
  )
  if (!res.ok) {
    const errText = await res.text()
    console.error(`[${name}] HTTP ${res.status}: ${errText.slice(0, 500)}`)
    return
  }
  const data = await res.json()
  const parts = data.candidates?.[0]?.content?.parts ?? []
  const imgPart = parts.find((p) => p.inlineData)
  if (!imgPart) {
    console.error(`[${name}] No image returned. Response:`, JSON.stringify(data).slice(0, 800))
    return
  }
  const raw = path.join(OUT_DIR, `${name}.raw.png`)
  const final = path.join(OUT_DIR, `${name}.png`)
  writeFileSync(raw, Buffer.from(imgPart.inlineData.data, 'base64'))

  // The model approximates the requested hex, it doesn't hit it exactly —
  // sample the actual rendered corner pixel and key out THAT real colour.
  const px = execFileSync('ffmpeg', [
    '-y', '-i', raw,
    '-vf', 'crop=2:2:4:4,format=rgba',
    '-f', 'rawvideo', 'pipe:1',
  ])
  const [r, g, b] = [px[0], px[1], px[2]]
  const sampledHex = [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')
  console.log(`[${name}] sampled background colour: #${sampledHex}`)

  execFileSync('ffmpeg', [
    '-y',
    '-i', raw,
    '-vf', `colorkey=0x${sampledHex}:0.16:0.08,despill=type=green,format=rgba`,
    final,
  ])
  console.log(`[${name}] saved -> ${final}`)
}

const ASSETS = {
  'orb-aura': `A single glossy iridescent 3D sphere floating alone in space, like a luxury opal marble or soap bubble — holographic rainbow sheen shifting through purple, blue, teal and gold, soft bright specular highlight toward the upper-left, subtle realistic glass/liquid refraction, faint inner glow. Premium 3D product render, studio lighting.`,
  'orb-stone': `A single glossy 3D sphere with a visible crystalline mineral texture inside it, like a polished gemstone orb — faceted internal structure visible through a glassy polished surface, warm amber and deep red tones with subtle sparkle inclusions. Premium 3D product render, studio lighting.`,
  'orb-field': `A single glossy 3D sphere containing a swirling multicolour energy vortex — a visible spectrum of colour (red, orange, gold, green, blue, violet) spiralling and blending inside a translucent glass orb, like a captured aurora or a miniature nebula in a crystal ball. Premium 3D product render, studio lighting.`,
  'icon-meditate': `A minimalist glowing line-art illustration of a person sitting cross-legged in a meditation lotus pose, seen from the front, soft golden and teal aura light radiating around their silhouette in concentric rings, intricate thin gold linework, mystical sacred-geometry details, a few small glowing particles drifting near the figure. Icon-style composition, symmetrical.`,
  'icon-breathe': `A minimalist glowing mandala — concentric rings of fine gold linework forming a radiant sacred-geometry circular pattern, like a breath/pranayama symbol, soft warm glow, intricate fine detail, perfectly symmetrical. Icon-style composition.`,
  'icon-frequency': `A glowing gold soundwave illustration — an elegant flowing waveform pattern with fine linework and soft radiant glow, symmetrical, mystical sound-healing aesthetic. Icon-style composition.`,
  'body-chakra': `A glowing holographic human figure facing forward, standing upright, arms relaxed at the sides, rendered as a translucent blue-cyan luminous energy body or light scan, soft inner glow along the spine, sci-fi mystical aesthetic, symmetrical silhouette, no facial detail, no chakra symbols or dots on it — the figure alone.`,
  'icon-tarot-deck': `A 3D rendered illustration of a mystical tarot card deck, a small stack of cards fanned slightly, ornate gold filigree card backs facing the viewer, a subtle glowing aura radiating from the deck. Premium product photography style, dramatic soft lighting.`,
  'icon-rune-stone': `A single 3D rendered rune stone — a smooth dark river stone with a glowing carved rune symbol etched into its surface, soft ambient light. Premium product photography style, floating slightly.`,
  'icon-compatibility': `Two overlapping glowing rings forming a venn-diagram shape, one ring warm red-orange and one ring cool blue, soft glow where they intersect blending into violet. Minimalist elegant line-art style. Icon-style composition.`,
  'icon-journal': `A minimalist glowing line-art illustration of an elegant quill pen resting beside an open page, fine gold linework, soft radiant glow, mystical journal aesthetic. Icon-style composition.`,
  'icon-compass': `A minimalist glowing line-art illustration of an ornate astrological compass or astrolabe, fine gold linework with star and zodiac motifs, soft radiant glow, symmetrical. Icon-style composition.`,
  'icon-apothecary': `A small cluster of glowing crystal gemstones — faceted amethyst and rose-quartz points — with a soft inner glow. Premium 3D render, studio lighting. Icon-style composition.`,
  'icon-oracle': `A glowing mystical all-seeing eye set within a radiant sacred-geometry frame, fine gold linework, soft ethereal glow, symmetrical. Icon-style composition.`,
  'icon-moon': `A glowing crescent moon rendered with fine gold linework detail and soft star-dust particles drifting around it, mystical celestial illustration. Icon-style composition.`,
}

const WIDE_ASSETS = {
  'bg-wave-mesh': `An elegant abstract background texture of flowing silk-like wireframe mesh waves — thin silver and white linework forming smooth sweeping ribbon shapes drifting across the frame, delicate, sparse and premium, like fabric or light frozen in motion. Not busy, plenty of open space between the lines.`,
}

const only = process.argv[2]
const allEntries = [
  ...Object.entries(ASSETS).map(([n, p]) => [n, p, '1:1']),
  ...Object.entries(WIDE_ASSETS).map(([n, p]) => [n, p, '16:9']),
]
const entries = only ? allEntries.filter(([n]) => n === only) : allEntries
for (const [name, prompt, aspectRatio] of entries) {
  if (!prompt) {
    console.error(`Unknown asset "${name}".`)
    continue
  }
  if (existsSync(path.join(OUT_DIR, `${name}.png`)) && !only) {
    console.log(`[${name}] already exists, skipping (pass the name directly to force regen)`)
    continue
  }
  await generateOne(name, prompt, aspectRatio)
}
