// Original ambient score for the ad — synthesized, no samples, no licensing.
// Usage: node audio.mjs <out.wav>
import { execFileSync } from 'node:child_process'

const out = process.argv[2]
const DUR = 30

// a slow D-minor(add9) pad; each voice breathes on its own LFO, R detuned for width
const voices = [
  [73.42, 0.10, 0.08, 0], [146.83, 0.07, 0.11, 0.5], [220.0, 0.06, 0.07, 1],
  [329.63, 0.045, 0.09, 2], [349.23, 0.032, 0.05, 3], [659.26, 0.018, 0.13, 4],
]
const pad = (detune) => voices
  .map(([f, a, lfo, ph]) => `${a}*sin(2*PI*${(f + detune).toFixed(2)}*t)*(0.55+0.45*sin(2*PI*${lfo}*t+${ph}))`)
  .join('+')

// singing bowls at the cuts: [time s, fundamental Hz, gain]
const BOWLS = [
  [0.15, 196.0, 0.85], [3.2, 293.66, 0.55], [7.6, 392.0, 0.38], [11.8, 329.63, 0.4],
  [15.6, 440.0, 0.42], [20.2, 293.66, 0.45], [24.0, 392.0, 0.3], [27.9, 146.83, 0.9], [28.05, 220.0, 0.5],
]
const bowl = (f) =>
  `(1-exp(-80*t))*exp(-0.85*t)*(sin(2*PI*${f}*t)+0.45*exp(-1.3*t)*sin(2*PI*${(f * 2.71).toFixed(2)}*t)+0.18*exp(-2.4*t)*sin(2*PI*${(f * 5.17).toFixed(2)}*t))`

const args = ['-y', '-loglevel', 'error',
  '-f', 'lavfi', '-i', `aevalsrc=exprs=${pad(0)}|${pad(0.45)}:s=48000:d=${DUR}`]
for (const [, f] of BOWLS) args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${bowl(f)}|${bowl(f * 1.002)}:s=48000:d=8`)

const chains = ['[0]lowpass=f=2200,volume=0.9[pad]']
const mixIn = ['[pad]']
BOWLS.forEach(([at, , g], i) => {
  const ms = Math.round(at * 1000)
  chains.push(`[${i + 1}]volume=${g * 0.32},adelay=${ms}|${ms},apad=whole_dur=${DUR}[b${i}]`)
  mixIn.push(`[b${i}]`)
})
chains.push(`${mixIn.join('')}amix=inputs=${mixIn.length}:normalize=0:duration=first,` +
  `aecho=0.8:0.6:70|140:0.22|0.12,afade=t=in:st=0:d=1.0,afade=t=out:st=${DUR - 1.6}:d=1.6,` +
  `atrim=0:${DUR},loudnorm=I=-16:TP=-1.5:LRA=11[out]`)
args.push('-filter_complex', chains.join(';'), '-map', '[out]', '-ar', '48000', '-ac', '2', out)
execFileSync('ffmpeg', args, { stdio: 'inherit' })
console.log('audio ->', out)
