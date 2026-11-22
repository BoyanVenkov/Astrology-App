// 4K portrait remasters of the app's own art (image-to-image) + the new eclipse.
// Usage: node gen-art.mjs <workDir> [name,...]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
const WORK = process.argv[2], ONLY = process.argv[3]?.split(',')
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
const ART = 'C:/Users/User/Desktop/Astrology App/resonance/src/assets/art'
const OUT = path.join(WORK, 'art'); mkdirSync(OUT, { recursive: true })

const REMASTER = 'Recreate this exact image as a tall 9:16 portrait at very high resolution. Keep the same composition, subject, colours, lighting and mood; extend the scene naturally at the top and bottom to fill the taller frame. Photorealistic, ultra detailed, sharp, cinematic film grade. No text, no letters, no watermark, no borders.'
const JOBS = {
  lake: { src: 'moon-landscape', prompt: REMASTER + ' Leave the sky above the mountains open and dark (a moon will be composited there later), keep the moonlight reflection on the lake.' },
  meditate: { src: 'hero-today-tall', prompt: REMASTER },
  altar: { src: 'bg-tarot', prompt: REMASTER },
  observatory: { src: 'bg-sky', prompt: REMASTER },
  moon: { src: 'moon-disc', aspect: '1:1', prompt: 'Recreate this exact full Moon at very high resolution: the same face, craters, maria and warm champagne tint, perfectly round, exactly centred, filling 90% of the frame, on a pure flat black background. Photorealistic, ultra sharp detail. No text, no stars, no glow, no watermark.' },
  // "Nothing Is Random"
  woman: { prompt: 'A mysterious woman seen from behind, standing alone and still on a dark rocky plateau beneath a monumental night sky: a vast, dense Milky Way arching overhead with subtle violet nebulae and countless stars. She is small in the lower third of the frame, a long dark coat, dark hair, a faint antique-gold rim light on her silhouette. Deep navy and obsidian tones, high contrast, photorealistic, cinematic film still, slow and contemplative. The upper two thirds is open sky. No text, no letters, no watermark.' },
  ocean: { prompt: 'A dark, calm ocean at night under a deep navy starry sky, photographed in portrait. The horizon sits at about 62% of the frame height. A long shimmering path of warm moonlight runs across the water toward the viewer in the centre, as if a huge full moon were rising just at the horizon (the moon itself is NOT in the frame). Obsidian water, subtle violet in the sky, high contrast, photorealistic, cinematic. No text, no letters, no watermark.' },
  midnight: { prompt: 'A deep midnight-blue cosmic sky in portrait: very dark navy space with fine sharp stars, a soft subtle violet and blue nebula drifting through the middle, elegant and minimal, lots of dark negative space, photorealistic astrophotography. No planets, no text, no letters, no watermark.' },
  eclipse: { prompt: 'A total solar eclipse photographed in deep space: a perfectly black lunar disc in the exact centre, surrounded by a brilliant antique-gold and champagne corona with fine radiating filaments and a thin glowing diamond-ring edge, faint violet outer glow, set against pure black space with a few tiny stars. Square, centred, the disc and corona occupy the middle 60% of the frame. Photorealistic, ultra detailed, cinematic. No text, no letters, no watermark.', aspect: '1:1' },
}

for (const [name, job] of Object.entries(JOBS)) {
  if (ONLY && !ONLY.includes(name)) continue
  const parts = [{ text: job.prompt }]
  if (job.src) {
    const png = execFileSync('ffmpeg', ['-loglevel', 'error', '-i', path.join(ART, job.src + '.webp'), '-f', 'image2', '-c:v', 'png', '-'], { maxBuffer: 64e6 })
    parts.unshift({ inlineData: { mimeType: 'image/png', data: png.toString('base64') } })
  }
  let j
  for (let a = 1; a <= 4; a++) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent?key=${KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: job.aspect ?? '9:16', imageSize: '4K' } } }),
    })
    j = await r.json(); if (r.ok) break
    console.log(name, 'retry', r.status, JSON.stringify(j).slice(0, 200)); await new Promise((s) => setTimeout(s, 10000 * a))
  }
  const img = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
  if (!img) { console.log(name, 'NO IMAGE', JSON.stringify(j).slice(0, 300)); continue }
  const raw = path.join(OUT, `${name}.raw`); writeFileSync(raw, Buffer.from(img.inlineData.data, 'base64'))
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-q:v', '2', path.join(OUT, `${name}.jpg`)])
  console.log(name, execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path.join(OUT, `${name}.jpg`)]).toString().trim())
}
