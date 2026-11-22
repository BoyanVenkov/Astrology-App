// A/B: original vs processed voice take, judged side by side by Gemini. Usage: node ab.mjs <A.wav> <B.wav>...pairs
import { readFileSync } from 'node:fs'
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
const files = process.argv.slice(2)
await Promise.all(Array.from({ length: files.length / 2 }, async (_, i) => {
  const [a, b] = [files[2 * i], files[2 * i + 1]]
  const part = (f) => ({ inline_data: { mime_type: 'audio/wav', data: readFileSync(f).toString('base64') } })
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Clip A:' }, part(a), { text: 'Clip B:' }, part(b), { text: 'Both clips are the same sentence by the same voice; B may be processed to sound deeper. Compare them. Reply in ONE line exactly as: A gender / B gender / deeper: A or B / B artifacts vs A: none|slight|clear / which would you use in a premium ad: A or B' }] }] }),
  })
  const j = await r.json()
  console.log(b.split(/[\/]/).pop(), '→', (j.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? JSON.stringify(j).slice(0, 200)).trim())
}))
