// Soundtrack for the 8s cut: heartbeat under the eclipse, swell + boom into the flash, the Lyria
// drop on the first app cut, a hard cut + chime under the last line. Voice: Despina (deep).
// Usage: node mix8.mjs <workDir> <work8Dir>
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const [WORK, W8] = process.argv.slice(2), DUR = 8
const VO = [['s8a', 0.25, 1.2], ['s8b', 6.0, 1.2]]
const BEATS = [[0.47, 1], [1.47, 1], [2.47, .8]]
const CUT_AT = 5.8

const lub = 'sin(2*PI*(58-26*t)*t)*exp(-11*t)+0.5*sin(2*PI*116*t)*exp(-30*t)+0.55*sin(2*PI*(240-80*t)*t)*exp(-38*t)'
const dub = '0.62*(sin(2*PI*(66-28*t)*t)*exp(-13*t)+0.5*sin(2*PI*(260-90*t)*t)*exp(-42*t))'
const heart = `(${lub})+if(gte(t,0.27),${dub.replaceAll('t', '(t-0.27)')},0)`.replaceAll(',', '\\,')
const chime = (f) => `(1-exp(-25*t))*(exp(-0.32*t)*sin(2*PI*${f}*t)+0.5*exp(-0.55*t)*sin(2*PI*${(f * 2.76).toFixed(2)}*t)+0.22*exp(-1.1*t)*sin(2*PI*${(f * 5.4).toFixed(2)}*t))`
const swell = (ch) => `(2*random(${ch})-1)*pow(t/0.8,3)*if(lt(t,0.8),1,exp(-(t-0.8)*9))`.replaceAll(',', '\\,')
const score = path.join(WORK, 'audio', 'score-lyria.mp3')

const args = ['-y', '-loglevel', 'error', '-i', score, '-i', score]
for (const [n] of VO) args.push('-i', path.join(W8, 'audio', `${n}.wav`))
args.push('-f', 'lavfi', '-i', `aevalsrc=exprs=${heart}:s=48000:d=0.9`,
  '-f', 'lavfi', '-i', `aevalsrc=exprs=${chime(587.33)}|${chime(587.33 * 1.003)}:s=48000:d=4`,
  '-f', 'lavfi', '-i', `aevalsrc=exprs=${swell(0)}|${swell(1)}:s=48000:d=1.6`,
  '-f', 'lavfi', '-i', `aevalsrc=exprs=sin(2*PI*(48-18*t)*t)*exp(-2.6*t):s=48000:d=2.5`)
const iHeart = 2 + VO.length, iChime = iHeart + 1, iWhoosh = iChime + 1, iBoom = iWhoosh + 1
const ms = (s) => Math.round(s * 1000)

const f = []
// dark drone from the score's intro, then its drop (27.0s in the score) landing on the first app cut at 3.4s
f.push(`[0]aresample=48000,atrim=2:5.4,asetpts=PTS-STARTPTS,volume=0.32,afade=t=out:st=2.9:d=0.5,apad=whole_dur=${DUR}[intro]`)
f.push(`[1]aresample=48000,atrim=26.6:30,asetpts=PTS-STARTPTS,afade=t=in:d=0.35,adelay=${ms(3.0)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[drop]`)
f.push(`[intro][drop]amix=inputs=2:normalize=0,equalizer=f=2600:t=q:w=1.2:g=-3,asplit=2[sc1][sc2]`)
f.push(`[sc1]afade=t=out:st=${CUT_AT - 0.03}:d=0.05,atrim=0:${DUR}[scmain]`)
f.push(`[sc2]atrim=${CUT_AT - 0.18}:${CUT_AT},asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st=0.1:d=0.08,apad=pad_dur=2,aecho=0.8:0.9:180|320:0.45|0.25,volume=0.4,afade=t=out:st=0.4:d=1.0,adelay=${ms(CUT_AT - 0.18)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR},atrim=0:${DUR}[sctail]`)
f.push(`[sctail]anullsink;[scmain]anull[score]`)
VO.forEach(([, at, g], i) => f.push(`[${i + 2}]aresample=48000,highpass=f=70,deesser=i=0.4:m=0.5:f=0.5,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3000:t=q:w=1.2:g=1.5,equalizer=f=7500:t=q:w=1.4:g=-2,acompressor=threshold=-22dB:ratio=3:attack=8:release=160:makeup=2,volume=${g},adelay=${ms(at)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[v${i}]`))
f.push(`${VO.map((_, i) => `[v${i}]`).join('')}amix=inputs=${VO.length}:normalize=0,aecho=0.85:0.5:42|84:0.1|0.05,pan=stereo|c0=c0|c1=c0,volume=2.4,asplit=2[vo][vosc]`)
f.push(`[score][vosc]sidechaincompress=threshold=0.025:ratio=5:attack=40:release=450:makeup=1[duck]`)
f.push(`[${iHeart}]lowpass=f=1400,equalizer=f=200:t=q:w=1:g=4,asoftclip=type=tanh,asplit=${BEATS.length}${BEATS.map((_, i) => `[h${i}]`).join('')}`)
BEATS.forEach(([at, g], i) => f.push(`[h${i}]volume=${g * 0.42},adelay=${ms(at)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[hb${i}]`))
f.push(`${BEATS.map((_, i) => `[hb${i}]`).join('')}amix=inputs=${BEATS.length}:normalize=0,pan=stereo|c0=c0|c1=c0[heart]`)
f.push(`[${iChime}]volume=0.12,aecho=0.8:0.85:400|700:0.45|0.3,adelay=${ms(CUT_AT + 0.05)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[chime]`)
f.push(`[${iWhoosh}]highpass=f=1200,lowpass=f=12000,volume=0.9,adelay=${ms(2.45)}:all=1,asetpts=N/SR/TB,apad=whole_dur=${DUR}[whoosh]`)
f.push(`[${iBoom}]lowpass=f=160,volume=0.9,adelay=${ms(3.3)}:all=1,asetpts=N/SR/TB,pan=stereo|c0=c0|c1=c0,apad=whole_dur=${DUR}[boom]`)
f.push(`[duck][vo][heart][chime][whoosh][boom]amix=inputs=6:normalize=0,atrim=0:${DUR},afade=t=in:d=0.05,afade=t=out:st=${DUR - 0.5}:d=0.5,loudnorm=I=-14:TP=-1.5:LRA=11[out]`)
args.push('-filter_complex', f.join(';'), '-map', '[out]', '-ar', '48000', '-ac', '2', path.join(WORK, 'mix-8s.wav'))
execFileSync('ffmpeg', args, { stdio: 'inherit' })
console.log('mix ->', path.join(WORK, 'mix-8s.wav'))
