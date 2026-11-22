// Fits the re-voiced phrases into each scene's window: the least uniform speed-up (≤ MAX) that
// fits, the spare time shared out as pauses. Writes <voiceDir>/schedule.json.
// Usage: node schedule.mjs <voiceDir>
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
const DIR = process.argv[2], P = JSON.parse(readFileSync(path.join(DIR, 'phrases.json'), 'utf8'))
const MAX = 1.15, GAP = 0.3, GAP_MAX = 0.8
const GROUPS = [            // [window start, window end, phrases] — windows follow the picture's scenes
  [0.6, 5.8, ['p01']],
  [6.25, 14.5, ['p02', 'p03', 'p04']],
  [14.75, 21.7, ['p05', 'p06', 'p07']],
  [22.0, 27.6, ['p08', 'p09']],
  [31.45, 38.93, ['p10', 'p11', 'p12']],
  [39.92, 44.2, ['p13', 'p14']],
]
const out = {}
for (const [a, b, ids] of GROUPS) {
  const speech = ids.reduce((s, id) => s + P[id].dur, 0), room = b - a - GAP * (ids.length - 1)
  const tempo = Math.min(MAX, Math.max(1, speech / room))
  const slack = Math.max(0, b - a - speech / tempo - GAP * (ids.length - 1))
  const gap = ids.length > 1 ? Math.min(GAP_MAX, GAP + slack / (ids.length - 1)) : 0
  let t = a
  for (const id of ids) {
    const d = P[id].dur / tempo
    out[id] = { at: +t.toFixed(3), tempo: +tempo.toFixed(3), end: +(t + d).toFixed(3) }
    t += d + gap
  }
  const over = t - gap - b
  console.log(`${a}-${b}s ${ids.join(' ')}: tempo x${tempo.toFixed(3)}, pause ${gap.toFixed(2)}s${over > 0.01 ? `, OVERRUNS by ${over.toFixed(2)}s` : ''}`)
}
for (const [id, v] of Object.entries(out)) console.log(`  ${id} ${v.at}s → ${v.end}s (x${v.tempo})`)
writeFileSync(path.join(DIR, 'schedule.json'), JSON.stringify(out, null, 2))
