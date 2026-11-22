// Finds local glitches: a patch of the picture that jumps away from BOTH neighbouring frames while
// the neighbours agree with each other (a one-frame pop, stale frame, half-paint, flash of the
// wrong image). Works on a video or a frame folder. Usage: node glitch-scan.mjs <video|dir/%04d.jpg> [fps]
import { spawn } from 'node:child_process'
const [SRC, FPSARG] = process.argv.slice(2), FPS = +(FPSARG || 24)
const W = 108, H = 192, T = 12, GX = W / T, GY = H / T, N = W * H
const isPattern = SRC.includes('%')
const ff = spawn('ffmpeg', ['-v', 'error', ...(isPattern ? ['-framerate', String(FPS)] : []), '-i', SRC, '-vf', `scale=${W}:${H}:flags=area,format=gray`, '-f', 'rawvideo', '-'])
const chunks = []; ff.stdout.on('data', (c) => chunks.push(c))
await new Promise((r) => ff.on('close', r))
const buf = Buffer.concat(chunks), n = Math.floor(buf.length / N)
const tileDiff = (a, b) => {          // mean abs difference per tile
  const out = new Float32Array(GX * GY)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) out[Math.floor(y / T) * GX + Math.floor(x / T)] += Math.abs(buf[a * N + y * W + x] - buf[b * N + y * W + x])
  return out.map((v) => v / (T * T))
}
const hits = []
for (let i = 1; i < n - 1; i++) {
  const p = tileDiff(i, i - 1), q = tileDiff(i, i + 1), r = tileDiff(i - 1, i + 1)
  let tiles = 0, worst = 0
  for (let k = 0; k < p.length; k++) {
    const m = Math.min(p[k], q[k])
    if (m > 14 && r[k] < m * 0.35) { tiles++; worst = Math.max(worst, m) }
  }
  if (tiles) hits.push({ i, t: i / FPS, tiles, worst })
}
for (const h of hits) console.log(`frame ${String(h.i).padStart(4, '0')} (${h.t.toFixed(2)}s)  ${h.tiles} patch${h.tiles > 1 ? 'es' : ''}  jump ${h.worst.toFixed(0)}`)
console.log(`${hits.length} suspicious frames of ${n}`)
