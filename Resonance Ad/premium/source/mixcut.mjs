// Soundtracks for the short cuts (15s, 6s): the score's dark intro under the eclipse, its drop landing
// on the first app cut, a hard cut + chime into the logo; heartbeat, swell and boom synthesized;
// the deep voice (Despina) phrases from the re-voice. Usage: node mixcut.mjs <workDir> <15s|6s>
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const [WORK, NAME] = process.argv.slice(2)
const V = path.join(WORK, 'voice-despina'), V8 = path.join(WORK, '..', 'work8', 'audio')
const CUTS = {
  '15s': {
    dur: 15,
    // [file, start s, gain, tempo]
    vo: [[path.join(V, 'p01.wav'), 0.35, 1.1, 1], [path.join(V, 'p02.wav'), 5.5, 1.55, 1], [path.join(V, 'p08.wav'), 7.95, 1.1, 1],
      [path.join(V, 'p09.wav'), 10.45, 1.1, 1], [path.join(V, 'p14.wav'), 12.75, 1.1, 1]],
    beats: [[0.49, 1], [1.52, 1], [2.55, 1], [3.59, 1], [4.57, .8]],
    whoosh: 4.64, boom: 5.5,
    intro: { from: 2.0, len: 5.4, fadeOut: 4.4 },      // score seconds 2.0… under the eclipse
    rise: { from: 23.8, at: 4.4 },                       // the build → its drop (27.0 in the score) lands at 7.6
    cut: 12.2,
    riseGain: 0.42, sfxGain: 0.45, chimeGain: 0.07,     // the build sits right under the voice here
  },
  '30s': {
    dur: 30,
    vo: [[path.join(V, 'p01.wav'), 0.35, 1.1, 1], [path.join(V, 'p02.wav'), 6.05, 1.55, 1], [path.join(V, 'p03.wav'), 8.6, 1.1, 1],
      [path.join(V, 'p05.wav'), 11.2, 1.1, 1], [path.join(V, 'p06.wav'), 12.95, 1.1, 1], [path.join(V, 'p07.wav'), 14.75, 1.1, 1],
      [path.join(V, 'p08.wav'), 18.65, 1.1, 1], [path.join(V, 'p09.wav'), 21.25, 1.1, 1],
      [path.join(V, 'p13.wav'), 25.0, 1.1, 1], [path.join(V, 'p14.wav'), 27.7, 1.1, 1]],
    beats: [[0.53, 1], [1.65, 1], [2.76, 1], [3.88, 1], [4.94, .8]],
    whoosh: 5.04, boom: 5.9,
    // one continuous run of the score: its synths enter on the chart (6.2s), its rise starts at 17s
    // and its drop (27.0 in the score) lands on the drop flash at 23.15
    intro: { from: 2.0, len: 0.5, fadeOut: 0 },
    rise: { from: 3.85, at: 0 },
    cut: 24.6,
    riseGain: 0.55, sfxGain: 0.6, chimeGain: 0.05,
  },
  '6s': {
    dur: 6,
    vo: [[path.join(V8, 's8a.wav'), 0.15, 1.2, 1]],
    beats: [[0.47, 1], [1.47, 1], [2.47, .8]],
    whoosh: 2.5, boom: 3.35,
    intro: { from: 2.0, len: 4.6, fadeOut: 3.3 },        // carries through the score's pre-drop pause
    rise: { from: 26.6, at: 3.0 },                       // the drop lands at 3.4
    cut: 4.1,
    riseGain: 1, sfxGain: 1, chimeGain: 0.12,
  },
}
// "Nothing Is Random": its own score, a ticking clock that stops, a shimmer on the golden star
const VN = path.join(WORK, 'voice-nir')
const nv = (id, at, g = 1.1) => [path.join(VN, `${id}.wav`), at, g, 1]
CUTS.nir45 = {
  dur: 45, score: 'score-nir30.mp3',
  vo: [nv('n0', 0.0, 0.22), nv('n1', 3.9, 1.3), nv('n2', 8.0), nv('n3', 15.4), nv('n4', 21.0), nv('n5', 28.0), nv('n6', 40.3, 1.2)],
  beats: [[0, 0]], ticks: [0.2, 0.7, 1.2, 1.7, 2.2, 2.7], sparkle: 3.4,
  whoosh: 12.75, boom: 3.4,
  intro: { from: 1.0, len: 10.7, fadeOut: 12.5, at: 3.3 },  // silent under the clock
  rise: { from: 16.5, at: 12.5 },                          // the score's big entry (37.0) lands on the convergence at 33
  cut: 37.0, riseGain: 0.6, sfxGain: 0.6, chimeGain: 0.08, sparkleGain: 0.035,
}
CUTS.nir30 = {
  dur: 30, score: 'score-nir30.mp3',
  vo: [nv('n0', 0.0, 0.22), nv('n1', 3.9, 1.3), nv('n2', 6.45), nv('n3', 11.3), nv('n4', 15.4), nv('n5', 19.45), nv('n6', 25.85, 1.2)],
  beats: [[0, 0]], ticks: [0.2, 0.7, 1.2, 1.7, 2.2, 2.7], sparkle: 3.4,
  whoosh: 9.8, boom: 3.4,
  intro: { from: 1.0, len: 8.1, fadeOut: 10.2, at: 3.3 },
  rise: { from: 25.0, at: 10.4 },                          // the big entry lands on the convergence at 22.4
  cut: 24.6, riseGain: 0.6, sfxGain: 0.2, chimeGain: 0.08, sparkleGain: 0.035,
}
// the mix of both concepts: the mystery score and the clock, the eclipse's heartbeat, both concepts' lines
const pv = (id, at, g = 1.1) => [path.join(V, `${id}.wav`), at, g, 1]
CUTS.nir45mix = {
  ...CUTS.nir45,
  vo: [nv('n0', 0.0, 0.22), nv('n1', 3.9, 1.3), nv('n2', 8.0), pv('p02', 14.0, 1.55), pv('p03', 16.6), pv('p08', 21.0), pv('p09', 23.7),
    pv('p05', 28.0), pv('p06', 29.8), pv('p13', 37.9, 1.2), pv('p14', 40.6, 1.2)],
  beats: [[4.5, .7], [5.35, .55]],
  whoosh: 5.75, boom: 6.45, sfxGain: 0.3, chimeGain: 0.045,   // the first and last lines sit on these
}
const C = CUTS[NAME], DUR = C.dur, ms = (s) => Math.round(s * 1000)

const lub = 'sin(2*PI*(58-26*t)*t)*exp(-11*t)+0.5*sin(2*PI*116*t)*exp(-30*t)+0.55*sin(2*PI*(240-80*t)*t)*exp(-38*t)'
const dub = '0.62*(sin(2*PI*(66-28*t)*t)*exp(-13*t)+0.5*sin(2*PI*(260-90*t)*t)*exp(-42*t))'
const heart = `(${lub})+if(gte(t,0.27),${dub.replaceAll('t', '(t-0.27)')},0)`.replaceAll(',', '\\,')
const chime = (f) => `(1-exp(-25*t))*(exp(-0.32*t)*sin(2*PI*${f}*t)+0.5*exp(-0.55*t)*sin(2*PI*${(f * 2.76).toFixed(2)}*t)+0.22*exp(-1.1*t)*sin(2*PI*${(f * 5.4).toFixed(2)}*t))`
const swell = (ch) => `(2*random(${ch})-1)*pow(t/0.8,3)*if(lt(t,0.8),1,exp(-(t-0.8)*9))`.replaceAll(',', '\\,')
const score = path.join(WORK, 'audio', C.score ?? 'score-lyria.mp3')

const args = ['-y', '-loglevel', 'error', '-i', score, '-i', score]
for (const [file] of C.vo) args.push('-i', file)
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${heart}:s=48000:d=0.9`,
  '-f', 'lavfi', '-i', `aevalsrc=exprs=${chime(587.33)}|${chime(587.33 * 1.003)}:s=48000:d=4`,
  '-f', 'lavfi', '-i', `aevalsrc=exprs=${swell(0)}|${swell(1)}:s=48000:d=1.6`,
  '-f', 'lavfi', '-i', `aevalsrc=exprs=sin(2*PI*(48-18*t)*t)*exp(-2.6*t):s=48000:d=2.5`)
const f = []
const tick = '(2*random(0)-1)*exp(-t*900)*0.5+sin(2*PI*3100*t)*exp(-t*140)*0.45+sin(2*PI*1650*t)*exp(-t*70)*0.3'
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${tick}:s=48000:d=0.25`, '-f', 'lavfi', '-i', `aevalsrc=exprs=${chime(1174.66)}|${chime(1174.66 * 1.004)}:s=48000:d=3`)
const iHeart = 2 + C.vo.length, iChime = iHeart + 1, iWhoosh = iChime + 1, iBoom = iWhoosh + 1, iTick = iBoom + 1, iSpark = iTick + 1
const TK = C.ticks ?? [], extra = []
if (TK.length) {
  f.push(`[${iTick}]highpass=f=400,asplit=${TK.length}${TK.map((_, i) => `[tk${i}]`).join('')}`)
  // tick, tock: alternating level, panned a little apart
  TK.forEach((at, i) => f.push(`[tk${i}]volume=${i % 2 ? 0.55 : 0.75},adelay=${ms(at)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},pan=stereo|c0=${i % 2 ? 0.8 : 1}*c0|c1=${i % 2 ? 1 : 0.8}*c0[tko${i}]`))
  f.push(`${TK.map((_, i) => `[tko${i}]`).join('')}amix=inputs=${TK.length}:normalize=0[ticks]`); extra.push('[ticks]')
} else f.push(`[${iTick}]anullsink`)
if (C.sparkle !== undefined) { f.push(`[${iSpark}]volume=${C.sparkleGain ?? 0.09},aecho=0.8:0.8:300|520:0.4|0.25,adelay=${ms(C.sparkle)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[spark]`); extra.push('[spark]') }
else f.push(`[${iSpark}]anullsink`)

const iAt = C.intro.at ?? 0
f.push(`[0]aresample=48000,atrim=${C.intro.from}:${C.intro.from + C.intro.len},asetpts=PTS-STARTPTS,volume=0.32,afade=t=in:d=0.8,afade=t=out:st=${C.intro.fadeOut - iAt}:d=1.0,adelay=${ms(iAt)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[intro]`)
f.push(`[1]aresample=48000,atrim=${C.rise.from}:${C.rise.from + DUR},asetpts=PTS-STARTPTS,volume=${C.riseGain},afade=t=in:d=1.0,adelay=${ms(C.rise.at)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[rise]`)
f.push(`[intro][rise]amix=inputs=2:normalize=0,equalizer=f=2600:t=q:w=1.2:g=-3,equalizer=f=380:t=q:w=1:g=-2,asplit=2[sc1][sc2]`)
f.push(`[sc1]afade=t=out:st=${C.cut - 0.03}:d=0.05,atrim=0:${DUR}[scmain]`)
// the orchestra's last breath rings out briefly after the cut
f.push(`[sc2]atrim=${C.cut - 0.18}:${C.cut},asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st=0.1:d=0.08,apad=pad_dur=2,aecho=0.8:0.9:180|320:0.45|0.25,volume=0.4,afade=t=out:st=0.4:d=1.0,adelay=${ms(C.cut - 0.18)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[sctail]`)
f.push(`[sctail]anullsink;[scmain]anull[score]`)
C.vo.forEach(([, at, g, tempo], i) => f.push(`[${i + 2}]aresample=48000,${tempo > 1.001 ? `atempo=${tempo},` : ''}highpass=f=75,deesser=i=0.45:m=0.5:f=0.5,equalizer=f=190:t=q:w=1:g=2,equalizer=f=3200:t=q:w=1.2:g=1.5,equalizer=f=7500:t=q:w=1.4:g=-2.5,acompressor=threshold=-22dB:ratio=3:attack=8:release=160:makeup=2,volume=${g},adelay=${ms(at)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[v${i}]`))
f.push(`${C.vo.map((_, i) => `[v${i}]`).join('')}amix=inputs=${C.vo.length}:normalize=0,aecho=0.85:0.5:42|84:0.1|0.05,pan=stereo|c0=c0|c1=c0,volume=2.4,asplit=2[vo][vosc]`)
f.push(`[score][vosc]sidechaincompress=threshold=0.04:ratio=3:attack=80:release=1400:makeup=1[duck]`)
f.push(`[${iHeart}]lowpass=f=1400,equalizer=f=200:t=q:w=1:g=4,asoftclip=type=tanh,asplit=${C.beats.length}${C.beats.map((_, i) => `[h${i}]`).join('')}`)
C.beats.forEach(([at, g], i) => f.push(`[h${i}]volume=${g * 0.42},adelay=${ms(at)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[hb${i}]`))
f.push(`${C.beats.map((_, i) => `[hb${i}]`).join('')}amix=inputs=${C.beats.length}:normalize=0,pan=stereo|c0=c0|c1=c0[heart]`)
f.push(`[${iChime}]volume=${C.chimeGain},aecho=0.8:0.85:400|700:0.45|0.3,adelay=${ms(C.cut + 0.05)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[chime]`)
f.push(`[${iWhoosh}]highpass=f=1200,lowpass=f=12000,volume=${0.9 * C.sfxGain},adelay=${ms(C.whoosh)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[whoosh]`)
f.push(`[${iBoom}]lowpass=f=160,volume=${0.9 * C.sfxGain},adelay=${ms(C.boom)}:all=1,asetpts=N/SR/TB,pan=stereo|c0=c0|c1=c0,apad=whole_dur=${DUR}[boom]`)
// STEM=music|vo renders one side un-normalised, to measure the voice-to-music balance
const STEM = process.env.STEM
if (STEM === 'score') { f[f.findIndex((x) => x.includes('sidechaincompress'))] = '[vosc]anullsink;[score]anull[duck]'; f.push(`[vo]anullsink;[heart]anullsink;[chime]anullsink;[whoosh]anullsink;[boom]anullsink;[duck]atrim=0:${DUR}[out]`) }
else if (STEM === 'music') f.push(`[vo]anullsink;[duck][heart][chime][whoosh][boom]${extra.join('')}amix=inputs=${5 + extra.length}:normalize=0,atrim=0:${DUR}[out]`)
else if (STEM === 'vo') f.push(`[duck]anullsink;[heart]anullsink;[chime]anullsink;[whoosh]anullsink;[boom]anullsink;${extra.map((e) => `${e}anullsink;`).join('')}[vo]atrim=0:${DUR}[out]`)
else f.push(`[duck][vo][heart][chime][whoosh][boom]${extra.join('')}amix=inputs=${6 + extra.length}:normalize=0,atrim=0:${DUR},afade=t=in:d=0.05,afade=t=out:st=${DUR - 0.5}:d=0.5,loudnorm=I=-14:TP=-1.5:LRA=11[out]`)
const OUTNAME = NAME === 'nir45' ? 'nir' : NAME === 'nir45mix' ? 'nir-45mix' : NAME.startsWith('nir') ? `nir-${NAME.slice(3)}s` : NAME
const out = path.join(WORK, STEM ? `stem-${OUTNAME}-${STEM}.wav` : `mix-${OUTNAME}.wav`)
args.push('-filter_complex', f.join(';'), '-map', '[out]', '-ar', '48000', '-ac', '2', out)
execFileSync('ffmpeg', args, { stdio: 'inherit' })
console.log('mix ->', out)
