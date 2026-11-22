// Median speaking pitch (F0) of 16-bit mono WAVs by autocorrelation over voiced frames.
// Usage: node pitch.mjs <file.wav...>
import { readFileSync } from 'node:fs'
for (const f of process.argv.slice(2)) {
  const b = readFileSync(f), sr = b.readUInt32LE(24), data = b.indexOf('data') + 8
  const x = new Float32Array((b.length - data) >> 1).map((_, i) => b.readInt16LE(data + i * 2) / 32768)
  const N = Math.round(sr * 0.04), f0s = []
  for (let s = 0; s + N < x.length; s += N >> 1) {
    let e = 0; for (let i = 0; i < N; i++) e += x[s + i] ** 2
    if (Math.sqrt(e / N) < 0.02) continue
    let best = 0, lag = 0
    for (let l = Math.floor(sr / 400); l <= Math.floor(sr / 70); l++) {
      let c = 0; for (let i = 0; i < N - l; i++) c += x[s + i] * x[s + i + l]
      if (c > best) { best = c; lag = l }
    }
    if (best / e > 0.5) f0s.push(sr / lag)
  }
  f0s.sort((a, b) => a - b)
  console.log(`${f.split(/[\/]/).pop()}: median pitch ${f0s[f0s.length >> 1]?.toFixed(0)} Hz (${f0s.length} voiced frames)`)
}
