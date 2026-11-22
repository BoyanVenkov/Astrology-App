// Listens to audio files with Gemini and reports transcript + delivery issues.
// Usage: node qa-audio.mjs <file...>
import { readFileSync } from 'node:fs'
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
const MODEL = process.env.QA_MODEL || 'gemini-3.1-pro-preview'
const ASK = process.env.ASK || 'Transcribe exactly what is spoken. Then in one or two lines describe the delivery (voice gender, tone, pace, whisper or not) and note any artifacts, glitches, mispronunciations, background noise or unnatural moments. Be critical.'
for (const f of process.argv.slice(2)) {
  const mime = f.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav'
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ inline_data: { mime_type: mime, data: readFileSync(f).toString('base64') } }, { text: ASK }] }] }),
  })
  const j = await r.json()
  console.log(`== ${f}\n${j.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? JSON.stringify(j).slice(0, 300)}\n`)
}
