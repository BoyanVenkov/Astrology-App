// Several TTS takes per line, each rated by Gemini; the best is kept as <line>.wav.
// Usage: node takes.mjs <workDir> <n> line=style...
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
const [WORK, N] = process.argv.slice(2, 4)
const KEY = readFileSync('C:/Users/User/Desktop/Astrology App/resonance/scripts/assets/.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim()
const TEXT = {
  vo1: 'What if the universe <short pause> has been trying to tell you something?',
  vo2: 'Every planet moves. <short pause> Every cycle changes. <short pause> And every moment tells a different story.',
  vo3: 'Follow the Moon. <short pause> Find your rhythm. <short pause> Turn ancient wisdom into a daily ritual.',
  vo4: "Some answers aren't found. <short pause> They're revealed.",
  vo5: 'The stars are moving. <short pause> The Moon is changing. <short pause> Something is calling.',
  vo6: 'The universe is speaking. <long pause> Are you listening?',
  s8a: 'The universe is speaking.',
  s8b: 'Are you listening?',
}
const STYLE = {
  grounded: 'a warm, natural, grounded speaking voice, gentle and confident, as if sharing a beautiful secret with one person; fully voiced, not whispering, not breathy, not spooky, never theatrical',
  deep: 'a deep, low, rich and warm female voice in her lower register, slow, intimate and confident, close to the microphone; fully voiced, not breathy, never theatrical',
  hushed: 'soft and intimate, a little hushed but fully voiced and natural, warm and confident, close to the microphone; not breathy, not spooky, never theatrical',
}
const RATE = (process.env.RATE_PREFIX || '') + 'Female voiceover candidate for a premium, cinematic mystical brand ad. Ideal: warm, mysterious, intimate, confident, natural, never theatrical. Reply ONLY with three integers 1-10 separated by slashes: warmth/naturalness (no AI artifacts, no harsh sibilance, not overly breathy)/premium suitability.'
const post = async (url, body, headers = {}) => {
  for (let a = 1; ; a++) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })
    const j = await r.json(); if (r.ok) return j
    if (a >= 4) throw new Error(JSON.stringify(j).slice(0, 300)); await new Promise((s) => setTimeout(s, 6000 * a))
  }
}
const dir = path.join(WORK, 'takes'); mkdirSync(dir, { recursive: true })
await Promise.all(process.argv.slice(4).map(async (spec) => {
  const [line, styleKey] = spec.split('=')
  let best = null
  for (let i = 0; i < +N; i++) {
    const j = await post('https://generativelanguage.googleapis.com/v1beta/interactions', {
      model: 'gemini-3.8-flash-tts',
      input: [{ type: 'user_input', content: [{ type: 'text', text: TEXT[line], annotations: [{ type: 'speech_metadata', style: STYLE[styleKey] }] }] }],
      response_format: { type: 'audio' }, generation_config: { speech_config: [{ voice: process.env.VOICE || 'Sulafat' }] },
    }, { 'Api-Revision': '2026-05-20', 'x-goog-api-key': KEY })
    const audio = Buffer.from(j.steps.flatMap((s) => s.content ?? []).find((c) => c.type === 'audio').data, 'base64')
    const f = path.join(dir, `${line}-${styleKey}-${i}.wav`); writeFileSync(f, audio)
    const q = await post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${KEY}`,
      { contents: [{ parts: [{ inline_data: { mime_type: 'audio/wav', data: audio.toString('base64') } }, { text: RATE }] }] })
    const txt = q.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? ''
    const sc = (txt.match(/\d+/g) ?? []).slice(0, 3).map(Number); const sum = sc.reduce((a, b) => a + b, 0)
    console.log(line, styleKey, i, sc.join('/'))
    if (!best || sum > best.sum) best = { f, sum, sc }
  }
  copyFileSync(best.f, path.join(WORK, 'audio', `${line}.wav`))
  console.log(`>> ${line}: kept ${path.basename(best.f)} (${best.sc.join('/')})`)
}))
