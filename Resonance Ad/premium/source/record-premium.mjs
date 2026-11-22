// Deterministic, full-resolution 30 fps recording of real Resonance scenes.
// JS time is virtual (CDP), and every CSS/Web animation is seeked to the same
// virtual clock each frame, so slow 2x captures still give smooth motion.
// Usage: node record-premium.mjs <outDir> [clip,clip...]
import { chromium } from 'file:///C:/Users/User/Desktop/Astrology%20App/resonance/node_modules/playwright/index.mjs'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'

const OUT = process.argv[2]
const ONLY = process.argv[3]?.split(',')
const URL = 'http://localhost:5191'
const TODAY = new Date().toLocaleDateString('en-CA')   // the app's mood check-in is skipped for today
const FPS = 24
const SCALE = 3.3
const W = 390, H = 844

const iso = (d, h) => `${d}T${String(h).padStart(2, '0')}:10:00.000Z`
const day = (n) => { const d = new Date(`${TODAY}T12:00:00`); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10) }
const state = {
  state: {
    authSkipped: true, onboardingComplete: true, moodGateDay: TODAY, locale: 'en', langHintSeen: true,
    profile: { date: '1991-04-18', time: '06:40', timeKnown: true, timeZone: 'Europe/London', placeLabel: 'London', lat: 51.51, lon: -0.13, utc: '1991-04-18T05:40:00.000Z' },
    moodLog: [{ at: iso(TODAY, 7), day: TODAY, mood: 'calm' }],
    sessionLog: [5, 4, 3, 2, 1].map((n) => ({ at: iso(day(n), 7), day: day(n), kind: n % 2 ? 'meditation' : 'breath', chakra: 'sacral', frequency: 417, pattern: 'resonant', style: 'chakra', minutes: 10, completed: true })),
    streakRewardTier: 3, longestStreakEver: 5,
  },
  version: 3,
}

const TAP_CSS = `.rz-tap{position:fixed;z-index:2147483647;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;
background:radial-gradient(circle,rgba(251,236,196,.55),rgba(232,194,116,.18) 60%,transparent 72%);
box-shadow:0 0 0 2px rgba(251,236,196,.9),0 0 26px rgba(232,194,116,.75);pointer-events:none;animation:rztap .75s cubic-bezier(.22,1,.36,1) forwards}
@keyframes rztap{0%{transform:scale(.35);opacity:1}100%{transform:scale(1.55);opacity:0}}`

const browser = await chromium.launch()
const errs = []

async function freshPage(st = state, shiftTo = null) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE, reducedMotion: 'no-preference' })
  // optionally move the page's clock to another moment (e.g. a full moon)
  if (shiftTo) await ctx.addInitScript((to) => {
    const RealDate = Date, off = RealDate.parse(to) - RealDate.now()
    const realNow = RealDate.now.bind(RealDate)
    class ShiftedDate extends RealDate { constructor(...a) { if (a.length === 0) super(realNow() + off); else super(...a) } }
    ShiftedDate.now = () => realNow() + off
    window.Date = ShiftedDate
  }, shiftTo)
  await ctx.addInitScript((s) => {
    if (!sessionStorage.getItem('x')) { localStorage.setItem('resonance-session', JSON.stringify(s)); sessionStorage.setItem('x', '1') }
    // ---- in-page virtual clock (manual once __vt.start() is called) ----
    const realST = window.setTimeout.bind(window), realSI = window.setInterval.bind(window)
    const realCT = window.clearTimeout.bind(window), realCI = window.clearInterval.bind(window)
    const realRAF = window.requestAnimationFrame.bind(window), realCAF = window.cancelAnimationFrame.bind(window)
    const realPerf = performance.now.bind(performance), realDate = Date.now
    let manual = false, vt = 0, perfBase = 0, dateBase = 0, seq = 1
    const timers = new Map()
    let rafs = []
    window.__vt = {
      start() { manual = true; perfBase = realPerf(); dateBase = realDate(); vt = 0 },
      now: () => vt,
      advance(ms) {
        const end = vt + ms
        for (;;) {
          let pick = null
          for (const [id, tm] of timers) if (tm.at <= end && (!pick || tm.at < pick[1].at)) pick = [id, tm]
          if (!pick) break
          const [id, tm] = pick
          vt = Math.max(vt, tm.at)
          if (tm.every) tm.at += tm.every; else timers.delete(id)
          try { tm.fn(...tm.args) } catch (e) { console.error(e) }
        }
        vt = end
        const cbs = rafs; rafs = []
        for (const [, cb] of cbs) { try { cb(perfBase + vt) } catch (e) { console.error(e) } }
      },
    }
    window.setTimeout = (fn, ms = 0, ...args) => {
      if (!manual) return realST(fn, ms, ...args)
      const id = 1e7 + seq++; timers.set(id, { at: vt + Math.max(0, +ms || 0), fn: typeof fn === 'function' ? fn : () => {}, args }); return id
    }
    window.setInterval = (fn, ms = 0, ...args) => {
      if (!manual) return realSI(fn, ms, ...args)
      const every = Math.max(1, +ms || 0), id = 1e7 + seq++
      timers.set(id, { at: vt + every, every, fn, args }); return id
    }
    window.clearTimeout = (id) => { if (timers.has(id)) timers.delete(id); else realCT(id) }
    window.clearInterval = (id) => { if (timers.has(id)) timers.delete(id); else realCI(id) }
    window.requestAnimationFrame = (cb) => { if (!manual) return realRAF(cb); const id = 1e7 + seq++; rafs.push([id, cb]); return id }
    window.cancelAnimationFrame = (id) => { if (id >= 1e7) rafs = rafs.filter(([i]) => i !== id); else realCAF(id) }
    performance.now = () => (manual ? perfBase + vt : realPerf())
    Date.now = () => (manual ? dateBase + vt : realDate())

    // every animation on the page follows the recorder's virtual clock
    window.__rzSync = (vt) => {
      for (const a of document.getAnimations()) {
        if (a.__s === undefined) { a.__s = vt - (a.currentTime ?? 0); a.pause() }
        a.currentTime = Math.max(0, vt - a.__s)
      }
    }
  }, st)
  const page = await ctx.newPage()
  page.on('pageerror', (e) => errs.push(e.message))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: TAP_CSS })
  await page.waitForTimeout(900)
  return page
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Record `seconds` of a scene. `script` is a list of timed steps:
 *   { at, tap: locatorFn }            — gold ripple + click at that moment
 *   { from, to, scroll: dy }          — eased thumb scroll by dy CSS px
 */
async function record(page, name, seconds, script) {
  const cdp = await page.context().newCDPSession(page)

  // resolve tap targets up front (while time is still running)
  const taps = []
  for (const s of script.filter((s) => s.tap)) {
    const loc = s.tap(page)
    await loc.scrollIntoViewIfNeeded().catch(() => {})
    taps.push({ at: s.at, loc })
  }
  const scrolls = script.filter((s) => s.scroll !== undefined).map((s) => ({ ...s, y0: null }))

  await page.evaluate(() => window.__vt.start())
  const dir = path.join(OUT, name)
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true })
  const total = Math.round(seconds * FPS)
  for (let f = 0; f < total; f++) {
    const t = f / FPS
    for (const tp of taps) {
      if (!tp.done && t >= tp.at) {
        tp.done = true
        const bb = await tp.loc.boundingBox()
        if (!bb) { errs.push(`${name}: tap target hidden at ${t}s`); continue }
        const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2
        await page.evaluate(([x, y]) => {
          const d = document.createElement('div'); d.className = 'rz-tap'
          d.style.left = x + 'px'; d.style.top = y + 'px'; document.body.appendChild(d)
          setTimeout(() => d.remove(), 900)
        }, [x, y])
        tp.clickAt = t + 0.17
        tp.xy = [x, y]
      }
      if (tp.clickAt !== undefined && !tp.clicked && t >= tp.clickAt) { tp.clicked = true; await page.mouse.click(...tp.xy) }
    }
    for (const s of scrolls) {
      if (t >= s.from && t <= s.to + 1 / FPS) {
        if (s.y0 === null) s.y0 = await page.evaluate(() => window.scrollY)
        const k = Math.min(1, (t - s.from) / (s.to - s.from))
        await page.evaluate((y) => window.scrollTo(0, y), s.y0 + s.scroll * ease(k))
      }
    }
    // the capture clip is in page coordinates — follow the live scroll position
    const sy = await page.evaluate((ms) => { window.__vt.advance(ms); window.__rzSync(window.__vt.now()); return window.scrollY }, 1000 / FPS)
    const r = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92, clip: { x: 0, y: sy, width: W, height: H, scale: SCALE } })
    writeFileSync(path.join(dir, `${String(f).padStart(4, '0')}.jpg`), Buffer.from(r.data, 'base64'))
  }
  await page.context().close()
  console.log(`${name}: ${total} frames (${seconds}s)`)
}

const dock = (page) => page.locator('nav').last()
const sky = async (page, row) => {
  await dock(page).getByRole('button', { name: 'Sky' }).click(); await page.waitForTimeout(700)
  await page.getByRole('button', { name: row }).first().click(); await page.waitForTimeout(1200)
}

// a querent whose card today is The Star, upright
const STAR = { ...state, state: { ...state.state, profile: { ...state.state.profile, utc: '1991-04-18T05:00:09.000Z' } } }

const CLIPS = {
  chart: async () => {
    const p = await freshPage(); await sky(p, /^Birth chart/)
    await record(p, 'chart', 2.8, [{ at: 0.5, tap: (pg) => pg.locator('svg [role=button][aria-label^="Venus"]') }])
  },
  transits: async () => {
    const p = await freshPage(); await sky(p, /^Transits/)
    await record(p, 'transits', 2.8, [{ at: 0.6, tap: (pg) => pg.getByRole('tab', { name: 'Week' }) }, { from: 1.4, to: 2.7, scroll: 220 }])
  },
  moon: async () => {
    const p = await freshPage({ ...state, state: { ...state.state, moodGateDay: '2026-11-24', moodLog: [{ at: '2026-11-24T07:10:00.000Z', day: '2026-11-24', mood: 'calm' }] } }, '2026-11-24T21:30:00'); await sky(p, /^Moon & fasting/)
    await record(p, 'moon', 2.8, [{ from: 0.6, to: 2.7, scroll: 160 }])
  },
  breath: async () => {
    const p = await freshPage()
    await p.locator('main').getByRole('button', { name: /Breathe/ }).first().click(); await p.waitForTimeout(1300)
    await record(p, 'breath', 3.0, [{ at: 0.3, tap: (pg) => pg.locator('button.btn-gold').first() }])
  },
  today: async () => {
    const p = await freshPage()
    await record(p, 'today', 1.6, [{ from: 0.1, to: 1.5, scroll: 380 }])
  },
  chakra: async () => {
    const p = await freshPage(); await sky(p, /The Chakra Field/)
    await record(p, 'chakra', 1.5, [{ at: 0.15, tap: (pg) => pg.getByRole('button', { name: 'Next centre' }) }])
  },
  compat: async () => {
    const p = await freshPage(); await sky(p, /^Compatibility/)
    await record(p, 'compat', 1.4, [])
  },
  tarot: async () => {
    const p = await freshPage(STAR)
    await dock(p).getByRole('button', { name: 'Tarot' }).click(); await p.waitForTimeout(1300)
    await record(p, 'tarot', 1.8, [{ at: 0.1, tap: (pg) => pg.locator('main .tf-scene').first() }])
  },
  horoscope: async () => {
    const p = await freshPage(); await sky(p, /^Full horoscope/)
    await record(p, 'horoscope', 3.0, [{ from: 0.6, to: 2.8, scroll: 420 }])
  },
  rune: async () => {
    const p = await freshPage()
    await dock(p).getByRole('button', { name: 'Tarot' }).click(); await p.waitForTimeout(700)
    await p.getByRole('button', { name: /Rune of the day/ }).click(); await p.waitForTimeout(1300)
    await record(p, 'rune', 2.6, [{ at: 0.3, tap: (pg) => pg.locator('main button.tf-scene').first() }])
  },
  meditate: async () => {
    const p = await freshPage()
    await p.locator('main').getByRole('button', { name: /Begin practice/ }).first().click(); await p.waitForTimeout(1200)
    await p.getByRole('button', { name: /Begin practice/ }).last().click(); await p.waitForTimeout(1800)   // start the session
    await record(p, 'meditate', 3.0, [])
  },
  // v2 — no taps that swap the whole screen in one frame (they read as glitches in an ad): slow scrolls,
  // and the breathing session already running when the recording starts
  transits2: async () => {
    const p = await freshPage(); await sky(p, /^Transits/)
    await record(p, 'transits', 2.8, [{ from: 0.3, to: 2.7, scroll: 300 }])
  },
  breath2: async () => {
    const p = await freshPage()
    await p.locator('main').getByRole('button', { name: /Breathe/ }).first().click(); await p.waitForTimeout(1300)
    await p.locator('button.btn-gold').first().click(); await p.waitForTimeout(1500)
    await record(p, 'breath', 3.0, [])
  },
  chakra2: async () => {
    const p = await freshPage(); await sky(p, /The Chakra Field/)
    await record(p, 'chakra', 1.5, [{ from: 0.1, to: 1.45, scroll: 140 }])
  },
  // the real card and rune stone, cut out, for the 3D sequences
  cards: async () => {
    // a querent whose card today is The Star, upright
    const p = await freshPage(STAR)
    await dock(p).getByRole('button', { name: 'Tarot' }).click(); await p.waitForTimeout(1500)
    const card = p.locator('main .tf-scene').first()
    await card.scrollIntoViewIfNeeded()
    const freeze = await p.addStyleTag({ content: 'main .tf-scene, main .tf-scene * { animation: none !important; }' })
    await p.waitForTimeout(300)
    await card.screenshot({ path: path.join(OUT, 'card-back.png') })
    await freeze.evaluate((el) => el.remove())
    await card.click(); await p.waitForTimeout(2400)
    await p.addStyleTag({ content: 'main .tf-scene, main .tf-scene * { animation: none !important; }' })
    await p.waitForTimeout(300)
    await card.screenshot({ path: path.join(OUT, 'card-face.png') })
    await p.context().close(); console.log('cards captured')
  },
}

for (const [k, fn] of Object.entries(CLIPS)) {
  if (ONLY && !ONLY.includes(k)) continue
  try { await fn() } catch (e) { errs.push(`${k}: ${e.message.split('\n')[0]}`) }
}
console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no errors')
await browser.close()
