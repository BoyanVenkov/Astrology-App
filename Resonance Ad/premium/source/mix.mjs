// Final soundtrack: Lyria score (shifted so its drop lands at 28s, hard cut at 39s),
// synthesized heartbeat / whoosh / chime cues, and the voiceover with ducking.
// Usage: node mix.mjs <workDir>
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const WORK = process.argv[2], A = path.join(WORK, 'audio'), DUR = 46
// voice entries: [name, file, start s, gain, tempo]. VOICE_DIR = a re-voice (phrases + schedule.json);
// the whisper texture under the opening (vo0) is kept either way.
const VOICE_DIR = process.env.VOICE_DIR
const VO = [['vo0', path.join(A, 'vo0.wav'), 0.0, 0.16, 1]]
if (VOICE_DIR) {
  const sched = JSON.parse(readFileSync(path.join(VOICE_DIR, 'schedule.json'), 'utf8'))
  // the last climax line sits on the score's peak — it gets a little extra lift
  for (const [id, v] of Object.entries(sched)) VO.push([id, path.join(VOICE_DIR, `${id}.wav`), v.at, id === 'p12' ? 1.4 : 1.1, v.tempo])
} else {
  for (const [n, at, g] of [['vo1', 0.5, 1.3], ['vo2', 6.4, 1], ['vo3', 14.0, 1], ['vo4', 22.0, 1], ['vo5', 31.2, 1.3], ['vo6', 39.6, 1]]) VO.push([n, path.join(A, `${n}.wav`), at, g, 1])
}
// the heartbeat belongs to the opening scene only (a late thump reads as a glitch after a line)
const BEATS = [[0.35, 1], [1.35, 1], [2.3, 1], [3.25, 1], [4.2, 1], [5.1, 1], [6.05, .45]]

// the knock (180-240 Hz) is what carries the beat on a phone speaker
const lub = 'sin(2*PI*(58-26*t)*t)*exp(-11*t)+0.5*sin(2*PI*116*t)*exp(-30*t)+0.55*sin(2*PI*(240-80*t)*t)*exp(-38*t)'
const dub = '0.62*(sin(2*PI*(66-28*t)*t)*exp(-13*t)+0.5*sin(2*PI*(260-90*t)*t)*exp(-42*t))'
const heart = `(${lub})+if(gte(t,0.27),${dub.replaceAll('t', '(t-0.27)')},0)`
const chime = (f) => `(1-exp(-25*t))*(exp(-0.32*t)*sin(2*PI*${f}*t)+0.5*exp(-0.55*t)*sin(2*PI*${(f * 2.76).toFixed(2)}*t)+0.22*exp(-1.1*t)*sin(2*PI*${(f * 5.4).toFixed(2)}*t))`

const args = ['-y', '-loglevel', 'error', '-i', path.join(A, 'score-lyria.mp3')]
for (const [, file] of VO) args.push('-i', file)
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${heart.replaceAll(',', '\\,')}:s=48000:d=0.9`)
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${chime(587.33)}|${chime(587.33 * 1.003)}:s=48000:d=7`)
const swell = (ch) => `(2*random(${ch})-1)*pow(t/0.8,3)*if(lt(t,0.8),1,exp(-(t-0.8)*9))`.replaceAll(',', '\\,')
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${swell(0)}|${swell(1)}:s=48000:d=1.6`)
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=sin(2*PI*(48-18*t)*t)*exp(-2.6*t):s=48000:d=2.5`)
const iHeart = 1 + VO.length, iChime = iHeart + 1, iWhoosh = iChime + 1, iBoom = iWhoosh + 1

const f = []
// the score: 1s later (drop at 28s), quieter intro, hard cut at 39s
f.push(`[0]aresample=48000,adelay=1000:all=1,equalizer=f=2600:t=q:w=1.2:g=-3,equalizer=f=380:t=q:w=1:g=-2,volume='if(lt(t,11),0.3,if(lt(t,13.5),0.3+(t-11)/2.5*0.7,if(between(t,36.05,39.1),0.3,if(between(t,31.0,39.1),0.5,1))))':eval=frame,asplit=2[sc1][sc2]`)
f.push(`[sc1]afade=t=out:st=38.97:d=0.05,apad=whole_dur=${DUR},atrim=0:${DUR}[scmain]`)
// the orchestra's last breath rings out for a moment after the cut, instead of a digital mute
f.push(`[sc2]atrim=38.82:39.0,asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st=0.1:d=0.08,apad=pad_dur=2,aecho=0.8:0.9:180|320:0.45|0.25,volume=0.4,afade=t=out:st=0.4:d=1.0,adelay=38820:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[sctail]`)
f.push(`[sctail]anullsink;[scmain]anull[score]`)
// voice: clean, warm, close
VO.forEach(([n, , at, g, tempo], i) => {
  const ms = Math.round(at * 1000)
  const chain = (tempo > 1.001 ? `atempo=${tempo},` : '') + (n === 'vo0'
    ? `highpass=f=320,lowpass=f=6000,aecho=0.8:0.7:180|340:0.4|0.25`
    : `highpass=f=75,deesser=i=0.45:m=0.5:f=0.5,equalizer=f=190:t=q:w=1:g=2,equalizer=f=3200:t=q:w=1.2:g=1.5,equalizer=f=7500:t=q:w=1.4:g=-2.5,acompressor=threshold=-22dB:ratio=3:attack=8:release=160:makeup=2`)
  f.push(`[${i + 1}]aresample=48000,${chain},volume=${g},adelay=${ms}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[v${i}]`)
})
f.push(`${VO.map((_, i) => `[v${i}]`).join('')}amix=inputs=${VO.length}:normalize=0,aecho=0.85:0.5:42|84:0.1|0.05,pan=stereo|c0=c0|c1=c0,volume=2.4,asplit=2[vo][vosc]`)
f.push(`[score][vosc]sidechaincompress=threshold=0.04:ratio=3:attack=80:release=1400:makeup=1[duck]`)
// heartbeat at each beat
f.push(`[${iHeart}]lowpass=f=1400,equalizer=f=200:t=q:w=1:g=4,asoftclip=type=tanh,asplit=${BEATS.length}${BEATS.map((_, i) => `[h${i}]`).join('')}`)
BEATS.forEach(([at, g], i) => f.push(`[h${i}]volume=${g * 0.42},adelay=${Math.round(at * 1000)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[hb${i}]`))
f.push(`${BEATS.map((_, i) => `[hb${i}]`).join('')}amix=inputs=${BEATS.length}:normalize=0,pan=stereo|c0=c0|c1=c0[heart]`)
// the resonant chime under the last line, the swell + boom into the first flash
f.push(`[${iChime}]volume=0.12,aecho=0.8:0.85:400|700:0.45|0.3,adelay=39050:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[chime]`)
f.push(`[${iWhoosh}]highpass=f=1200,lowpass=f=12000,volume=0.9,adelay=5250:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[whoosh]`)
f.push(`[${iBoom}]lowpass=f=160,volume=0.9,adelay=6050:all=1,asetpts=N/SR/TB,pan=stereo|c0=c0|c1=c0,apad=whole_dur=${DUR}[boom]`)
// STEM=music|vo renders one side un-normalised, to measure the voice-to-music balance
const STEM = process.env.STEM
if (STEM === 'music') f.push(`[vo]anullsink;[duck][heart][chime][whoosh][boom]amix=inputs=5:normalize=0,atrim=0:${DUR}[out]`)
else if (STEM === 'vo') f.push(`[duck]anullsink;[heart]anullsink;[chime]anullsink;[whoosh]anullsink;[boom]anullsink;[vo]atrim=0:${DUR}[out]`)
else f.push(`[duck][vo][heart][chime][whoosh][boom]amix=inputs=6:normalize=0,atrim=0:${DUR},afade=t=out:st=${DUR - 1.2}:d=1.2,loudnorm=I=-14:TP=-1.5:LRA=11[out]`)
args.push('-filter_complex', f.join(';'), '-map', '[out]', '-ar', '48000', '-ac', '2', path.join(WORK, STEM ? `stem-${STEM}.wav` : 'mix.wav'))
execFileSync('ffmpeg', args, { stdio: 'inherit' })
console.log('mix ->', path.join(WORK, 'mix.wav'))
