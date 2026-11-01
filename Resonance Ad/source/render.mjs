// Renders the ad stage frame by frame, then encodes the final MP4.
// Usage: node render.mjs <adDir> <out.mp4> [stillsOnly: comma list of seconds]
import { chromium } from 'file:///C:/Users/User/Desktop/Astrology%20App/resonance/node_modules/playwright/index.mjs'
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const [AD, OUT, STILLS] = process.argv.slice(2)
const REPO = 'C:/Users/User/Desktop/Astrology App/resonance'
const FPS = 30, DUR = 30

const fileUrl = (p) => pathToFileURL(p).href
let html = readFileSync(path.join(AD, 'stage.html'), 'utf8')
  .replaceAll('FONT_DIR', fileUrl(path.join(REPO, 'node_modules/@fontsource-variable')))
  .replaceAll('ART_DIR', fileUrl(path.join(REPO, 'src/assets/art')))
  .replaceAll('CLIP_DIR', fileUrl(path.join(AD, 'clips2')))
const counts = Object.fromEntries(
  readdirSync(path.join(AD, 'clips2')).map((c) => [c, readdirSync(path.join(AD, 'clips2', c)).filter((f) => f.endsWith('.jpg')).length]),
)
html = html.replace('<script>', `<script>window.__FRAMES = ${JSON.stringify(counts)}</script><script>`)
const stagePath = path.join(AD, 'stage.built.html')
writeFileSync(stagePath, html)

const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] })
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
const errs = []
page.on('pageerror', (e) => errs.push(e.message))
await page.goto(fileUrl(stagePath), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)

if (STILLS) {
  for (const s of STILLS.split(',').map(Number)) {
    await page.evaluate((t) => window.setTime(t), s)
    await page.screenshot({ path: path.join(AD, `still-${s}.jpg`), type: 'jpeg', quality: 90 })
  }
  console.log('stills done', errs.join('\n'))
  await browser.close(); process.exit(0)
}

const frames = path.join(AD, 'frames')
rmSync(frames, { recursive: true, force: true }); mkdirSync(frames)
const total = FPS * DUR
const t0 = Date.now()
for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.setTime(t), f / FPS)
  await page.screenshot({ path: path.join(frames, `${String(f).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 95 })
  if (f % 150 === 0) console.log(`frame ${f}/${total} (${((Date.now() - t0) / 1000).toFixed(0)}s)`)
}
await browser.close()

const score = path.join(AD, 'score.wav')
execFileSync('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-framerate', String(FPS), '-i', path.join(frames, '%04d.jpg'),
  ...(existsSync(score) ? ['-i', score] : []),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-profile:v', 'high', '-level', '4.2',
  '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart',
  ...(existsSync(score) ? ['-c:a', 'aac', '-b:a', '192k', '-shortest'] : []),
  '-t', String(DUR), OUT,
], { stdio: 'inherit' })
console.log('encoded ->', OUT, errs.length ? '\nERRORS:\n' + errs.join('\n') : '')
