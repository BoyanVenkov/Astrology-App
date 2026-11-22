// Renders the premium spot frame by frame (4K, 24 fps) in parallel, then encodes.
// Usage: node render.mjs <workDir> stills <t,t,...>     review frames
//        node render.mjs <workDir> frames [workers]      all frames → <work>/frames
//        node render.mjs <workDir> encode <out-basename> 4K + 1080p MP4 with <work>/mix.wav
// CUT=8s renders a short cut (see CUTS in stage.html) into frames-8s/, encoded with mix-8s.wav
import { chromium } from 'file:///C:/Users/User/Desktop/Astrology%20App/resonance/node_modules/playwright/index.mjs'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const [WORK, MODE, ARG] = process.argv.slice(2)
const REPO = 'C:/Users/User/Desktop/Astrology App/resonance'
const SRC = path.dirname(fileURLToPath(import.meta.url))
const CUT = process.env.CUT
const FPS = 24, DUR = CUT ? parseFloat(CUT) : process.env.STAGE === 'nir' ? 45 : 46
// HD=1 renders at 1080x1920 (4x faster than the 4K master) into frames…-hd/, encoded as 1080p only
const HD = !!process.env.HD, STAGE = process.env.STAGE
const RERENDER = process.env.RERENDER?.split(',').map((r) => r.split('-').map(Number))
const TAG = (STAGE ? `-${STAGE}` : '') + (CUT ? `-${CUT}` : '') + (HD ? '-hd' : '')
const fileUrl = (p) => pathToFileURL(p).href

function build() {
  const clips = path.join(WORK, 'clips')
  // STAGE=nir renders the "Nothing Is Random" spot (stage-nir.html)
  let html = readFileSync(path.join(SRC, STAGE ? `stage-${STAGE}.html` : 'stage.html'), 'utf8')
    .replaceAll('FONT_DIR', fileUrl(path.join(REPO, 'node_modules/@fontsource-variable')))
    .replaceAll('ART_DIR', fileUrl(path.join(REPO, 'src/assets/art')))
    .replaceAll('GEN_DIR', fileUrl(path.join(WORK, 'art')))
    .replaceAll('CLIP_DIR', fileUrl(clips))
  const counts = Object.fromEntries(readdirSync(clips, { withFileTypes: true }).filter((d) => d.isDirectory())
    .map((d) => [d.name, readdirSync(path.join(clips, d.name)).filter((f) => f.endsWith('.jpg')).length]))
  html = html.replace('<script>', `<script>window.__FRAMES = ${JSON.stringify(counts)}; window.__CUT = ${JSON.stringify(CUT ?? null)}</script><script>`)
  const p = path.join(WORK, `stage${TAG}.built.html`); writeFileSync(p, html); return p
}

// A 4K frame can be captured before every tile is painted (black blocks). Wait for paint, then
// capture until two consecutive screenshots are byte-identical.
async function capture(page, t, opts) {
  await page.evaluate((t) => window.setTime(t), t)
  let prev = null
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
    const buf = await page.screenshot(opts)
    if (prev && buf.equals(prev)) return buf
    prev = buf
  }
  console.log(`frame at ${t.toFixed(3)}s never settled`)
  return prev
}

async function openStage(browser, stage) {
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: HD ? 1 : 2 })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => console.log('PAGE ERROR', e.message))
  await page.goto(fileUrl(stage), { waitUntil: 'load' })
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))) })
  return page
}

if (MODE === 'stills' || MODE === 'frames') {
  const stage = build()
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--force-gpu-mem-available-mb=8192'] })
  if (MODE === 'stills') {
    const page = await openStage(browser, stage)
    const out = path.join(WORK, `stills${TAG}`); mkdirSync(out, { recursive: true })
    for (const s of ARG.split(',').map(Number)) {
      // settle the frame through the previous half second so stateful bits (images) are warm
      writeFileSync(path.join(out, `s-${s.toFixed(2)}.jpg`), await capture(page, s, { type: 'jpeg', quality: 88 }))
    }
    console.log('stills ->', out)
  } else {
    const workers = +(ARG || 4), total = FPS * DUR
    const out = path.join(WORK, `frames${TAG}`); mkdirSync(out, { recursive: true })
    const t0 = Date.now(); let done = 0
    await Promise.all(Array.from({ length: workers }, async (_, w) => {
      const page = await openStage(browser, stage)
      for (let f = w; f < total; f += workers) {
        const file = path.join(out, `${String(f).padStart(4, '0')}.jpg`)
        // RERENDER=a-b,c-d overwrites just those frames; otherwise frames already on disk are kept
        if (RERENDER ? !RERENDER.some(([a, b]) => f >= a && f <= b) : existsSync(file)) { done++; continue }
        writeFileSync(file, await capture(page, f / FPS, { type: 'jpeg', quality: 94 }))
        if (++done % 48 === 0) console.log(`${done}/${total} frames · ${((Date.now() - t0) / 1000).toFixed(0)}s`)
      }
    }))
    console.log('frames done in', ((Date.now() - t0) / 1000).toFixed(0), 's')
  }
  await browser.close()
}

if (MODE === 'encode') {
  const mix = path.join(WORK, `mix${STAGE ? `-${STAGE}` : ''}${CUT ? `-${CUT}` : ''}.wav`)
  const common = ['-framerate', String(FPS), '-i', path.join(WORK, `frames${TAG}`, '%04d.jpg'), '-i', mix,
    '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-t', String(DUR), '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv']
  if (!HD) execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...common, '-vf', 'scale=out_range=tv:out_color_matrix=bt709', '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-profile:v', 'high', '-level', '5.2', '-r', String(FPS), `${ARG}-4K.mp4`], { stdio: 'inherit' })
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...common, '-vf', 'scale=1080:1920:flags=lanczos:out_range=tv:out_color_matrix=bt709', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-profile:v', 'high', '-level', '4.2', '-r', String(FPS), `${ARG}-1080p.mp4`], { stdio: 'inherit' })
  console.log('encoded', ARG)
}
