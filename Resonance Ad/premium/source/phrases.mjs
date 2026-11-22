// Re-voices the full spot phrase by phrase so each line lands exactly on its on-screen caption.
// Per phrase: N takes (Gemini TTS), each trimmed, pitch-measured and rated by Gemini; the kept take
// is the best-rated one that fits its slot, deeper takes winning ties.
// Usage: VOICE=Despina node phrases.mjs <workDir> [takes]
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'
const WORK = process.argv[2], N = +(process.argv[3] || 3), VOICE = process.env.VOICE || 'Despina'
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
const STYLE = 'a deep, low, rich and warm female voice in her lower register, intimate and confident, at a natural unhurried pace, close to the microphone; fully voiced, not breathy, never theatrical'
const MAX_TEMPO = 1.12   // a take may be sped up this much (pitch kept) to fit its slot
// [id, text, speech start (s, = caption time + ~0.1), slot length (s)]
const PHRASES = [
  ['p01', 'What if the universe <short pause> has been trying to tell you something?', 0.7, 5.2],
  ['p02', 'Every planet moves.', 6.4, 1.95], ['p03', 'Every cycle changes.', 8.55, 1.85], ['p04', 'And every moment tells a different story.', 10.57, 3.4],
  ['p05', 'Follow the Moon.', 14.28, 1.55], ['p06', 'Find your rhythm.', 15.98, 1.8], ['p07', 'Turn ancient wisdom into a daily ritual.', 17.94, 3.7],
  ['p08', "Some answers aren't found.", 22.0, 2.7], ['p09', "They're revealed.", 24.85, 3.0],
  ['p10', 'The stars are moving.', 31.55, 2.2], ['p11', 'The Moon is changing.', 33.91, 2.65], ['p12', 'Something is calling.', 36.71, 2.2],
  ['p13', 'The universe is speaking.', 39.92, 2.35], ['p14', 'Are you listening?', 42.4, 1.9],
]
const RATE = 'Listen to the attached audio: a voiceover take for a premium cinematic mystical brand ad. The brief wants a DEEP, low FEMALE voice, warm, intimate, confident, natural, never theatrical or breathy. Reply ONLY with three integers 1-10 separated by slashes: depth/warmth/naturalness (no AI artifacts, no mispronunciation). If the voice is not female reply 0/0/0.'

const post = async (url, body, headers = {}) => {
  for (let a = 1; ; a++) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })
    const j = await r.json(); if (r.ok) return j
    if (a >= 5) throw new Error(JSON.stringify(j).slice(0, 300)); await new Promise((s) => setTimeout(s, 7000 * a))
  }
}
// read only the 'data' chunk — TTS files carry metadata chunks after it, which must not be played as audio
const readWav = (b) => {
  const sr = b.readUInt32LE(24), at = b.indexOf('data'), d = at + 8, len = Math.min(b.readUInt32LE(at + 4), b.length - d)
  return { sr, x: Float32Array.from({ length: len >> 1 }, (_, i) => b.readInt16LE(d + i * 2) / 32768) }
}
const writeWav = (x, sr) => {
  const b = Buffer.alloc(44 + x.length * 2)
  b.write('RIFF', 0); b.writeUInt32LE(36 + x.length * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22)
  b.writeUInt32LE(sr, 24); b.writeUInt32LE(sr * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(x.length * 2, 40)
  x.forEach((v, i) => b.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(v * 32767))), 44 + i * 2)); return b
}
// trim leading/trailing silence (10ms windows above -40 dB), keep 40ms margins, 10ms fades
const trim = ({ x, sr }) => {
  const w = Math.round(sr * .01), on = []
  for (let s = 0; s + w <= x.length; s += w) { let e = 0; for (let i = 0; i < w; i++) e += x[s + i] ** 2; on.push(Math.sqrt(e / w) > 0.01) }
  const a = Math.max(0, (on.indexOf(true) - 4) * w), z = Math.min(x.length, (on.lastIndexOf(true) + 5) * w)
  const y = x.slice(a, z), f = Math.round(sr * .01)
  for (let i = 0; i < f; i++) { y[i] *= i / f; y[y.length - 1 - i] *= i / f }
  return y
}
const pitch = (x, sr) => {
  const n = Math.round(sr * .04), f0 = []
  for (let s = 0; s + n < x.length; s += n >> 1) {
    let e = 0; for (let i = 0; i < n; i++) e += x[s + i] ** 2
    if (Math.sqrt(e / n) < .02) continue
    let best = 0, lag = 0
    for (let l = Math.floor(sr / 400); l <= Math.floor(sr / 70); l++) { let c = 0; for (let i = 0; i < n - l; i++) c += x[s + i] * x[s + i + l]; if (c > best) { best = c; lag = l } }
    if (best / e > .5) f0.push(sr / lag)
  }
  f0.sort((a, b) => a - b); return f0[f0.length >> 1] ?? 0
}

const DIR = path.join(WORK, `voice-${VOICE.toLowerCase()}`), TK = path.join(DIR, 'takes'); mkdirSync(TK, { recursive: true })
const kept = {}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const rate = async (buf) => {
  const q = await post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${KEY}`,
    { contents: [{ parts: [{ inline_data: { mime_type: 'audio/wav', data: buf.toString('base64') } }, { text: RATE }] }] })
  return ((q.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '').match(/\d+/g) ?? []).slice(0, 3).map(Number)
}
const cands = Object.fromEntries(PHRASES.map(([id]) => [id, []])), ratings = []
// SELECT=1: no new takes — rate and choose from the takes already on disk
if (process.env.SELECT) for (const f of readdirSync(TK).filter((f) => f.endsWith('.wav'))) {
  const id = f.split('-')[0], buf = readFileSync(path.join(TK, f)), w = readWav(buf)
  const c = { file: path.join(TK, f), dur: w.x.length / w.sr, f0: pitch(w.x, w.sr) }
  cands[id]?.push(c); ratings.push(rate(buf).then((sc) => { c.sc = sc }))
}
for (let i = 0; i < (process.env.SELECT ? 0 : N); i++) for (const [id, text] of PHRASES) {
  const t0 = Date.now()
  const j = await post('https://generativelanguage.googleapis.com/v1beta/interactions', {
    model: 'gemini-3.8-flash-tts',
    input: [{ type: 'user_input', content: [{ type: 'text', text, annotations: [{ type: 'speech_metadata', style: STYLE }] }] }],
    response_format: { type: 'audio' }, generation_config: { speech_config: [{ voice: VOICE }] },
  }, { 'Api-Revision': '2026-05-20', 'x-goog-api-key': KEY })
  const wav = readWav(Buffer.from(j.steps.flatMap((s) => s.content ?? []).find((c) => c.type === 'audio').data, 'base64'))
  const y = trim(wav), file = path.join(TK, `${id}-${i}.wav`), buf = writeWav(y, wav.sr)
  writeFileSync(file, buf)
  const c = { file, dur: y.length / wav.sr, f0: pitch(y, wav.sr) }
  cands[id].push(c)
  ratings.push(rate(buf).then((sc) => { c.sc = sc }))
  process.stdout.write('.')
  await sleep(Math.max(0, 6500 - (Date.now() - t0)))   // 10 requests/minute
}
await Promise.all(ratings)
console.log()
for (const [id, text, at, slot] of PHRASES) {
  const cs = cands[id].map((c) => ({ ...c, tempo: Math.max(1, c.dur / slot), score: c.sc?.length === 3 && c.sc[0] > 0 ? c.sc[0] + c.sc[1] + c.sc[2] : -1 }))
  // fits (within MAX_TEMPO), then rating, then the least speed-up, then depth
  cs.sort((a, b) => (b.tempo <= MAX_TEMPO) - (a.tempo <= MAX_TEMPO) || b.score - a.score || a.tempo - b.tempo || a.f0 - b.f0)
  const k = cs[0]
  writeFileSync(path.join(DIR, `${id}.wav`), readFileSync(k.file))
  kept[id] = { at, slot, dur: +k.dur.toFixed(2), tempo: +Math.min(k.tempo, MAX_TEMPO).toFixed(3), f0: Math.round(k.f0), rating: (k.sc ?? []).join('/') }
  console.log(`${id} "${text.replace(/<[^>]+>/g, '').slice(0, 38)}" → ${path.basename(k.file)} ${k.dur.toFixed(2)}s/${slot}s x${kept[id].tempo} ${kept[id].f0}Hz ${kept[id].rating}`
    + `   (all: ${cs.map((c) => `${c.dur.toFixed(1)}s ${Math.round(c.f0)}Hz ${(c.sc ?? []).join('/')}`).join(' | ')})`)
}
writeFileSync(path.join(DIR, 'phrases.json'), JSON.stringify(kept, null, 2))
