// One-time (and re-runnable) upload of all meditation/ambient audio into the
// public "meditation-audio" Supabase Storage bucket, mirroring the local
// public/audio/ folder structure exactly (so lib/meditationAudio.ts's URLs
// just work). Safe to re-run — uploads overwrite existing files.
//
// Before running:
//   1. In the Supabase dashboard: Storage -> New bucket -> name it exactly
//      "meditation-audio" -> toggle "Public bucket" ON -> Create.
//   2. Put your service-role key in scripts/audio/.env.supabase:
//        SUPABASE_SERVICE_ROLE_KEY=...
//      (Project Settings -> API -> service_role secret. This key has full
//      admin access — never commit it, never ship it client-side.)
//
// Run with:
//   node --env-file=scripts/audio/.env.supabase scripts/audio/upload-to-supabase.mjs

import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const SUPABASE_URL = 'https://oyjceuypabkrnkpenaqu.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SERVICE_ROLE_KEY) {
  console.error(
    'Missing SUPABASE_SERVICE_ROLE_KEY. Put it in scripts/audio/.env.supabase (see comment at top of this file).',
  )
  process.exit(1)
}

const BUCKET = 'meditation-audio'
const PUBLIC_AUDIO_DIR = path.join(import.meta.dirname, '..', '..', 'public', 'audio')

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

async function collectMp3s(dir, baseDir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectMp3s(full, baseDir)))
    } else if (entry.name.endsWith('.mp3')) {
      // storage path uses forward slashes regardless of OS
      const rel = path.relative(baseDir, full).split(path.sep).join('/')
      files.push({ full, rel })
    }
  }
  return files
}

async function main() {
  const files = await collectMp3s(PUBLIC_AUDIO_DIR, PUBLIC_AUDIO_DIR)
  console.log(`Found ${files.length} files to upload.\n`)

  let ok = 0
  let failed = 0

  for (const { full, rel } of files) {
    process.stdout.write(`${rel}... `)
    try {
      const data = await readFile(full)
      const { error } = await supabase.storage.from(BUCKET).upload(rel, data, {
        contentType: 'audio/mpeg',
        upsert: true,
      })
      if (error) throw error
      console.log('ok')
      ok++
    } catch (err) {
      console.log('FAILED')
      console.error(`  ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone: ${ok} uploaded, ${failed} failed.`)
}

main()
