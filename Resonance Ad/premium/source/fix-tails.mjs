// Removes the junk appended after the speech in phrase files written before readWav read only the
// data chunk: a short loud burst after a silent gap at the very end. Usage: node fix-tails.mjs <wav...>
import { readFileSync, writeFileSync } from 'node:fs'
for (const f of process.argv.slice(2)) {
  const b = readFileSync(f), sr = b.readUInt32LE(24), d = b.indexOf('data') + 8, n = (b.length - d) >> 1
  const x = Float32Array.from({ length: n }, (_, i) => b.readInt16LE(d + i * 2) / 32768), w = Math.round(sr * .01)
  const rms = (s) => { let e = 0; for (let i = 0; i < w; i++) e += x[s + i] ** 2; return Math.sqrt(e / w) }
  // walk back from the end over the loud tail, then find a silent gap of ≥ 60ms before it
  let k = n - w; while (k > 0 && rms(k) > .003 && n - k < sr * .25) k -= w
  let gap = 0, g = k; while (g > 0 && rms(g) <= .003) { gap += w; g -= w }
  if (n - k >= sr * .25 || gap < sr * .06) { console.log(f.split(/[\/]/).pop(), 'no junk tail found — left as is'); continue }
  const cut = Math.min(n, g + w + Math.round(sr * .12)), f10 = Math.round(sr * .01)   // keep 120ms of the silence
  const y = x.slice(0, cut); for (let i = 0; i < f10; i++) y[y.length - 1 - i] *= i / f10
  const o = Buffer.alloc(44 + y.length * 2); b.copy(o, 0, 0, 44); o.writeUInt32LE(36 + y.length * 2, 4); o.writeUInt32LE(y.length * 2, 40)
  y.forEach((v, i) => o.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(v * 32767))), 44 + i * 2))
  writeFileSync(f, o)
  console.log(f.split(/[\/]/).pop(), `cut ${((n - cut) / sr * 1000).toFixed(0)}ms of tail`)
}
