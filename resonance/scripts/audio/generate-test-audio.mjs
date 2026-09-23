// One-off test: generate the "Breath Awareness" meditation as audio, in
// English + Bulgarian, using your cloned Inworld voice. Run with:
//   node --env-file=scripts/audio/.env scripts/audio/generate-test-audio.mjs
//
// Text below is copied verbatim from lib/locales/en/meditation.ts and
// lib/locales/bg/meditation.ts (the fixed "breath-awareness" phase plan).

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const API_KEY = process.env.INWORLD_API_KEY
if (!API_KEY) {
  console.error('Missing INWORLD_API_KEY. Put it in scripts/audio/.env (see .env.example).')
  process.exit(1)
}

const VOICE_ID = 'dancing-comet-7283__boyan_venkov'
const MODEL_ID = 'inworld-tts-2'
const OUT_DIR = path.join(import.meta.dirname, 'output')

const LINES = [
  {
    id: '00-briefing-lead',
    en: 'Read this once, then close your eyes. Each step opens with a bowl — stay with it until the next one.',
    bg: 'Прочети това веднъж, после затвори очи. Всяка стъпка започва със звън на купа — остани с нея до следващата.',
  },
  {
    id: '01-briefing-close',
    en: 'Three soft bowls end the practice. Come back in your own time.',
    bg: 'Три меки купи завършват практиката. Върни се без бързане.',
  },
  {
    id: '02-settle',
    en: 'Eyes closed. Let the body settle and the breath slow on its own.',
    bg: 'Очите затворени. Нека тялото се уталожи и дъхът се забави сам.',
  },
  {
    id: '03-breath',
    en: 'Rest your attention on the breath — follow it in, follow it out. When the mind wanders, that noticing is the practice. Come back, gently.',
    bg: 'Задръж вниманието върху дъха — навътре, навън. Когато умът се отнесе, това забелязване е практиката. Върни се внимателно.',
  },
  {
    id: '04-count',
    en: 'Now count each exhale — one to ten, then start again. Lose count, and simply begin at one. No score is being kept.',
    bg: 'Сега брой всяко издишване — от едно до десет, после започни отначало. Изгубиш ли бройката, просто започни от едно. Никой не води резултат.',
  },
  {
    id: '05-close',
    en: 'Let the practice go. Notice how you feel now, before you open your eyes.',
    bg: 'Пусни практиката. Забележи как се чувстваш сега, преди да отвориш очи.',
  },
]

async function synthesize(text, languageCode) {
  const res = await fetch('https://api.inworld.ai/tts/v1/voice', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voiceId: VOICE_ID,
      modelId: MODEL_ID,
      audioConfig: { speakingRate: 0.9 },
      deliveryMode: 'BALANCED',
      language: languageCode,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HTTP ${res.status}: ${body}`)
  }

  const json = await res.json()
  return Buffer.from(json.audioContent, 'base64')
}

async function main() {
  let ok = 0
  let failed = 0

  for (const lang of ['en', 'bg']) {
    const langCode = lang === 'en' ? 'en-US' : 'bg-BG'
    const dir = path.join(OUT_DIR, lang)
    await mkdir(dir, { recursive: true })

    for (const line of LINES) {
      const outPath = path.join(dir, `${line.id}.mp3`)
      process.stdout.write(`${lang}/${line.id}... `)
      try {
        const audio = await synthesize(line[lang], langCode)
        await writeFile(outPath, audio)
        console.log(`ok (${audio.length} bytes)`)
        ok++
      } catch (err) {
        console.log('FAILED')
        console.error(`  ${err.message}`)
        failed++
      }
    }
  }

  console.log(`\nDone: ${ok} succeeded, ${failed} failed.`)
  console.log(`Output: ${OUT_DIR}`)
}

main()
