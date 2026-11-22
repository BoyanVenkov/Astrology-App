// Voiceover (Gemini TTS) + score (Lyria 3.5) for the premium ad.
// Usage: node gen-audio.mjs <workDir> [vo|score]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const WORK = process.argv[2]
const ONLY = process.argv[3]
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
const VOICE = process.env.VOICE || 'Sulafat'
const OUT = path.join(WORK, 'audio'); mkdirSync(OUT, { recursive: true })

async function interact(body) {
  for (let attempt = 1; ; attempt++) {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Api-Revision': '2026-05-20', 'x-goog-api-key': KEY },
      body: JSON.stringify(body),
    })
    const j = await r.json()
    if (r.ok) return j
    if (attempt >= 4 || ![429, 500, 503].includes(r.status)) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 400)}`)
    await new Promise((res) => setTimeout(res, 8000 * attempt))
  }
}
const audioOf = (j) => {
  for (const s of j.steps ?? []) for (const c of s.content ?? []) if (c.type === 'audio' && c.data) return Buffer.from(c.data, 'base64')
  throw new Error('no audio in response: ' + JSON.stringify(j).slice(0, 400))
}

const LINES = [
  ['vo0', 'listen <long pause> the signs <long pause> listen <long pause> it is calling', 'distant, barely audible, airy whispers, slow and mysterious'],
  ['vo1', 'What if the universe <short pause> has been trying to tell you something?', 'a hushed whisper, slow and intimate, warm and mysterious, close to the microphone, never theatrical'],
  ['vo2', 'Every planet moves. <short pause> Every cycle changes. <short pause> And every moment tells a different story.', 'speaking softly in a warm, low, fully voiced and intimate tone, not whispering and not breathy, unhurried, calm and confident, never theatrical'],
  ['vo3', 'Follow the Moon. <short pause> Find your rhythm. <short pause> Turn ancient wisdom into a daily ritual.', 'speaking softly in a warm, low, fully voiced and intimate tone, not whispering and not breathy, unhurried, calm and confident, never theatrical'],
  ['vo4', "Some answers aren't found. <short pause> They're revealed.", 'speaking softly in a warm, low, fully voiced and intimate tone, not whispering and not breathy, unhurried, calm and confident, never theatrical, with a subtle knowing warmth'],
  ['vo5', 'The stars are moving. <short pause> The Moon is changing. <short pause> Something is calling.', 'speaking softly in a warm, low, fully voiced and intimate tone, not whispering and not breathy, unhurried, calm and confident, never theatrical, with quiet anticipation'],
  ['vo6', 'The universe is speaking. <long pause> Are you listening?', 'very slow and intimate, almost a whisper, close to the microphone, warm and confident, never theatrical'],
]

if (!ONLY || ONLY === 'vo') {
  for (const [name, text, style] of LINES) {
    if (process.env.LINES && !process.env.LINES.split(',').includes(name)) continue
    const j = await interact({
      model: 'gemini-3.8-flash-tts',
      input: [{ type: 'user_input', content: [{ type: 'text', text, annotations: [{ type: 'speech_metadata', style }] }] }],
      response_format: { type: 'audio' },
      generation_config: { speech_config: [{ voice: VOICE }] },
    })
    writeFileSync(path.join(OUT, `${name}.wav`), audioOf(j))
    console.log('voice', name)
  }
}

// "Nothing Is Random": a psychological-mystery trailer score, one per length
const NIR = {
  'nir45': `[0:00 - 0:04] Intro: near silence, only a very faint low drone.
[0:04 - 0:12] Mystery: deep sub-bass pulses every two seconds, a dark low string drone, sparse suspense, lots of space.
[0:12 - 0:25] Investigation: the pulse quickens, a hypnotic dark synth ostinato with low strings and soft taiko-like pulses, tension building steadily.
[0:25 - 0:37] Crescendo: a luxurious, powerful orchestral crescendo — wide strings, brass, a deep choir-like pad (no words), rising to a huge peak at 0:37.
[0:37 - 0:45] Silence, then one low resonant tone and a soft celestial pad.`,
  'nir30': `[0:00 - 0:03] Intro: near silence, only a very faint low drone.
[0:03 - 0:09] Mystery: deep sub-bass pulses every two seconds, a dark low string drone, suspense.
[0:09 - 0:18] Investigation: the pulse quickens, a hypnotic dark synth ostinato with low strings, tension building.
[0:18 - 0:25] Crescendo: a luxurious, powerful orchestral crescendo — wide strings, brass, a deep choir-like pad (no words), rising to a huge peak at 0:25.
[0:25 - 0:30] Silence, then one low resonant tone and a soft celestial pad.`,
}
if (ONLY in NIR) {
  const prompt = `Instrumental only. No vocals, no lyrics, no spoken words, no drum kit.
Ultra-premium score for a psychological mystery movie trailer crossed with a luxury technology brand: suspenseful, dark, elegant, never cheesy. Key of C minor, about 70 BPM. Total length about ${ONLY.slice(3)} seconds.
${NIR[ONLY]}
High-end film mix, deep and wide, restrained, sophisticated.`
  const j = await interact({ model: 'lyria-3.5', input: prompt })
  writeFileSync(path.join(OUT, `score-${ONLY}.mp3`), audioOf(j))
  console.log('score', ONLY)
}

if (!ONLY || ONLY === 'score') {
  const prompt = `Instrumental only. No vocals, no lyrics, no spoken words, no drums kit.
Premium cinematic trailer score for the launch of a luxury mystical technology brand: dark luxury, cosmic mystery, cinematic spirituality. Key of D minor, slow, about 70 BPM. Total length about 48 seconds.
[0:00 - 0:10] Intro: almost silent. A very deep, dark sub-bass drone and faint airy breath-like textures, sparse and mysterious, leaving lots of space.
[0:10 - 0:21] Atmosphere: warm atmospheric analog synthesizer pads enter, shimmering celestial bells and a slow glassy arpeggio, ethereal and spacious.
[0:21 - 0:39] Rise: a powerful but elegant cinematic build. Wide sustained strings, an ethereal wordless choir pad (pure "ah" texture, no words), deep sub-bass swells and soft low cinematic pulses, growing steadily in intensity and brightness to a big emotional peak at 0:39.
[0:39 - 0:48] Outro: sudden silence, then one resonant crystal chime that decays slowly.
High-end film mix, deep and wide, restrained, elegant, never cheesy.`
  const j = await interact({ model: 'lyria-3.5', input: prompt })
  for (const s of j.steps ?? []) for (const c of s.content ?? []) if (c.type === 'text') console.log('lyria text:', c.text.slice(0, 300))
  writeFileSync(path.join(OUT, 'score-lyria.mp3'), audioOf(j))
  console.log('score done')
}
