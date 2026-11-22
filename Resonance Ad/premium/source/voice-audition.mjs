// Auditions several voices on one line; Gemini ranks them for depth, warmth and naturalness.
// Usage: node voice-audition.mjs <outDir> "<text>" "<style>" Voice1 Voice2 ...
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
const [OUT, TEXT, STYLE, ...VOICES] = process.argv.slice(2)
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
mkdirSync(OUT, { recursive: true })
const post = async (url, body, headers = {}) => {
  for (let a = 1; ; a++) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })
    const j = await r.json(); if (r.ok) return j
    if (a >= 4) throw new Error(JSON.stringify(j).slice(0, 300)); await new Promise((s) => setTimeout(s, 6000 * a))
  }
}
const files = await Promise.all(VOICES.map(async (v) => {
  const j = await post('https://generativelanguage.googleapis.com/v1beta/interactions', {
    model: 'gemini-3.8-flash-tts',
    input: [{ type: 'user_input', content: [{ type: 'text', text: TEXT, annotations: [{ type: 'speech_metadata', style: STYLE }] }] }],
    response_format: { type: 'audio' }, generation_config: { speech_config: [{ voice: v }] },
  }, { 'Api-Revision': '2026-05-20', 'x-goog-api-key': KEY })
  const f = path.join(OUT, `${v}.wav`)
  writeFileSync(f, Buffer.from(j.steps.flatMap((s) => s.content ?? []).find((c) => c.type === 'audio').data, 'base64'))
  return [v, f]
}))
const parts = []
for (const [v, f] of files) parts.push({ text: `Candidate "${v}":` }, { inline_data: { mime_type: 'audio/wav', data: readFileSync(f).toString('base64') } })
parts.push({ text: 'These are voiceover candidates for a premium, cinematic mystical brand ad. The client wants a FEMALE voice that is noticeably DEEP and low (rich lower register), warm, intimate, confident and natural — never theatrical or breathy. For each candidate give: gender heard, depth 1-10 (10 = deepest), warmth 1-10, naturalness 1-10, one short note. Then name the single best candidate for this brief.' })
const q = await post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${KEY}`, { contents: [{ parts }] })
console.log(q.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? JSON.stringify(q).slice(0, 300))
