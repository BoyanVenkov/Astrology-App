// Finds stutter: a frame that (nearly) repeats the previous one while the picture around it is moving,
// or a sudden jump much larger than the motion around it. Usage: node stutter-scan.mjs <video> [fps]
import { spawn } from 'node:child_process'
const [SRC, FPSARG] = process.argv.slice(2), FPS = +(FPSARG || 24), W = 108, H = 192, N = W * H
const ff = spawn('ffmpeg', ['-v', 'error', ...(SRC.includes('%') ? ['-framerate', String(FPS)] : []), '-i', SRC, '-vf', `scale=${W}:${H}:flags=area,format=gray`, '-f', 'rawvideo', '-'])
const ch = []; ff.stdout.on('data', (c) => ch.push(c)); await new Promise((r) => ff.on('close', r))
const b = Buffer.concat(ch), n = Math.floor(b.length / N)
const d = [0]
for (let i = 1; i < n; i++) { let s = 0; for (let k = 0; k < N; k++) s += Math.abs(b[i * N + k] - b[(i - 1) * N + k]); d.push(s / N) }
const out = []
for (let i = 2; i < n - 2; i++) {
  const around = (d[i - 1] + d[i + 1] + d[i - 2] + d[i + 2]) / 4
  if (around > 0.6 && d[i] < around * 0.25) out.push(`frame ${i} (${(i / FPS).toFixed(2)}s) FREEZE  motion ${d[i].toFixed(2)} vs around ${around.toFixed(2)}`)
  if (d[i] > 2.5 && d[i] > around * 3.5) out.push(`frame ${i} (${(i / FPS).toFixed(2)}s) JUMP    motion ${d[i].toFixed(2)} vs around ${around.toFixed(2)}`)
}
console.log(out.join('\n')); console.log(`${out.length} events in ${n} frames`)
