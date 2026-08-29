import type { BreathPhaseKind, SolfeggioFrequency } from '../types/resonance'

export interface SolfeggioPreset {
  frequency: SolfeggioFrequency
  name: string
  intention: string
}

export const SOLFEGGIO_PRESETS: SolfeggioPreset[] = [
  { frequency: 396, name: '396 Hz', intention: 'Release guilt & fear' },
  { frequency: 417, name: '417 Hz', intention: 'Clear and undo change' },
  { frequency: 432, name: '432 Hz', intention: 'Natural tuning · calm coherence' },
  { frequency: 528, name: '528 Hz', intention: 'Transformation & repair' },
  { frequency: 639, name: '639 Hz', intention: 'Connection & relationship' },
  { frequency: 741, name: '741 Hz', intention: 'Expression & clarity' },
  { frequency: 852, name: '852 Hz', intention: 'Intuition & awakening' },
  { frequency: 963, name: '963 Hz', intention: 'Unity & higher order' },
]

export interface AudioEngineOptions {
  fadeSeconds?: number
  masterVolume?: number
  ambientPadEnabled?: boolean
  ambientPadLevel?: number
}

/** Which voices to have sounding. Unset flags keep their default. */
export interface PlayOptions {
  frequency?: SolfeggioFrequency
  /** Pure sine tone. Default true. */
  tone?: boolean
  /** Tone level 0–1 when it shares the mix with breath. Default 0.85. */
  toneLevel?: number
  /** Low brown-noise ambient bed. Default true. */
  pad?: boolean
  /** Synthesised breathing sound (driven by `breathePhase`). Default false. */
  breath?: boolean
}

type WebkitWindow = typeof window & {
  webkitAudioContext?: typeof AudioContext
}

const MIN_GAIN = 0.0001
const TONE_LEVEL = 0.85
const BREATH_PEAK = 0.17

/**
 * Quantum Audio Engine — one graph, three voices:
 *   • tone   — pure Solfeggio sine
 *   • pad    — low-pass brown noise, the ambient bed
 *   • breath — band-pass pink noise shaped into inhale / exhale sounds
 *
 * Every level change is a ramp; oscillators/sources are never switched at full
 * amplitude, which is what pops on phone speakers.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null

  private toneOsc: OscillatorNode | null = null
  private toneGain: GainNode | null = null

  private padSource: AudioBufferSourceNode | null = null
  private padFilter: BiquadFilterNode | null = null
  private padGain: GainNode | null = null

  private breathSource: AudioBufferSourceNode | null = null
  private breathBand: BiquadFilterNode | null = null
  private breathGain: GainNode | null = null

  private brownNoise: AudioBuffer | null = null
  private pinkNoise: AudioBuffer | null = null

  private fadeSeconds: number
  private masterVolume: number
  private padEnabled: boolean
  private padLevel: number

  private frequency: SolfeggioFrequency = 528
  private playing = false
  private teardownTimer: ReturnType<typeof setTimeout> | null = null

  constructor(options: AudioEngineOptions = {}) {
    this.fadeSeconds = options.fadeSeconds ?? 2
    this.masterVolume = clamp(options.masterVolume ?? 0.5, 0, 1)
    this.padEnabled = options.ambientPadEnabled ?? true
    this.padLevel = clamp(options.ambientPadLevel ?? 0.12, 0, 1)
  }

  get isPlaying(): boolean {
    return this.playing
  }

  get contextState(): AudioContextState | 'unavailable' {
    return this.ctx?.state ?? 'unavailable'
  }

  /** Resume the AudioContext — MUST run inside a user gesture on mobile. */
  async unlock(): Promise<void> {
    const ctx = this.ensureContext()
    if (ctx && ctx.state === 'suspended') await ctx.resume()
  }

  /**
   * Bring the requested voices in and duck the rest. Safe to call repeatedly
   * to change the mix (e.g. switch from tone to breath).
   */
  async play(options: PlayOptions = {}): Promise<boolean> {
    const ctx = this.ensureContext()
    if (!ctx || !this.master) return false

    if (this.teardownTimer) {
      clearTimeout(this.teardownTimer)
      this.teardownTimer = null
    }
    if (ctx.state === 'suspended') await ctx.resume()

    if (options.frequency) this.frequency = options.frequency
    const wantTone = options.tone ?? true
    const wantPad = options.pad ?? true
    const wantBreath = options.breath ?? false
    const now = ctx.currentTime

    if (wantTone) this.startTone(now, options.toneLevel ?? TONE_LEVEL)
    else this.duckVoice(this.toneGain, 0.8)

    if (wantPad) this.startPad(now)
    else this.duckVoice(this.padGain, 0.8)

    if (wantBreath) this.startBreath(now)
    else this.duckVoice(this.breathGain, 0.8)

    this.rampParam(this.master.gain, this.masterVolume, this.fadeSeconds)
    this.playing = wantTone || wantPad || wantBreath
    return true
  }

  /** Fade all voices out over `fadeSeconds`, then release them. */
  async stop(): Promise<void> {
    const ctx = this.ctx
    if (!ctx || !this.playing) return

    const now = ctx.currentTime
    const end = now + this.fadeSeconds

    this.fadeToSilence(this.toneGain, now, end)
    this.fadeToSilence(this.padGain, now, end)
    this.fadeToSilence(this.breathGain, now, end)

    safeStop(this.toneOsc, end + 0.05)
    safeStop(this.padSource, end + 0.05)
    safeStop(this.breathSource, end + 0.05)

    this.playing = false

    await new Promise<void>((resolve) => {
      this.teardownTimer = setTimeout(
        () => {
          this.releaseVoices()
          this.teardownTimer = null
          resolve()
        },
        this.fadeSeconds * 1000 + 150,
      )
    })
  }

  /**
   * Shape the breathing sound for one phase of a breath pattern — call at each
   * phase boundary with the phase kind and its length in seconds. No-ops if
   * the breath voice isn't running.
   */
  breathePhase(kind: BreathPhaseKind, seconds: number): void {
    if (!this.ctx || !this.breathGain || !this.breathBand) return
    const now = this.ctx.currentTime
    const g = this.breathGain.gain
    const f = this.breathBand.frequency
    g.cancelScheduledValues(now)
    f.cancelScheduledValues(now)
    g.setValueAtTime(Math.max(g.value, MIN_GAIN), now)
    f.setValueAtTime(Math.max(f.value, 60), now)

    switch (kind) {
      case 'inhale': {
        // air drawn in: quick swell, brief hold, soft taper; filter opens up
        g.exponentialRampToValueAtTime(BREATH_PEAK, now + seconds * 0.6)
        g.setValueAtTime(BREATH_PEAK, now + seconds * 0.82)
        g.exponentialRampToValueAtTime(BREATH_PEAK * 0.5, now + seconds)
        f.setValueAtTime(430, now)
        f.linearRampToValueAtTime(1200, now + Math.max(seconds, 0.1))
        break
      }
      case 'exhale': {
        // released breath: louder onset, long warm decay; filter closes down
        g.exponentialRampToValueAtTime(BREATH_PEAK * 1.1, now + seconds * 0.22)
        g.exponentialRampToValueAtTime(MIN_GAIN, now + seconds)
        f.setValueAtTime(950, now)
        f.linearRampToValueAtTime(270, now + Math.max(seconds, 0.1))
        break
      }
      case 'hold': {
        g.exponentialRampToValueAtTime(0.006, now + 0.5) // faint held breath
        f.setValueAtTime(500, now)
        break
      }
      case 'pump': {
        // Kapalabhati: rapid sharp exhales
        f.setValueAtTime(780, now)
        const rate = 1.6
        const count = Math.max(1, Math.floor(seconds * rate))
        const dt = 1 / rate
        g.setValueAtTime(MIN_GAIN, now)
        for (let i = 0; i < count; i += 1) {
          const t0 = now + i * dt
          g.setValueAtTime(MIN_GAIN, t0)
          g.exponentialRampToValueAtTime(BREATH_PEAK * 1.15, t0 + dt * 0.3)
          g.exponentialRampToValueAtTime(MIN_GAIN, t0 + dt * 0.9)
        }
        break
      }
      default: {
        g.exponentialRampToValueAtTime(MIN_GAIN, now + 0.6) // rest
      }
    }
  }

  /** Fade the breath voice out (session paused / ended). */
  silenceBreath(): void {
    this.duckVoice(this.breathGain, 1)
  }

  setFrequency(frequency: SolfeggioFrequency): void {
    this.frequency = frequency
    if (!this.ctx || !this.toneOsc) return
    const now = this.ctx.currentTime
    const param = this.toneOsc.frequency
    param.cancelScheduledValues(now)
    param.setValueAtTime(param.value, now)
    param.linearRampToValueAtTime(frequency, now + 0.4)
  }

  setMasterVolume(value: number): void {
    this.masterVolume = clamp(value, 0, 1)
    if (this.ctx && this.master) {
      this.rampParam(this.master.gain, this.masterVolume, 0.3)
    }
  }

  setAmbientPadEnabled(enabled: boolean): void {
    this.padEnabled = enabled
    if (!this.ctx || !this.padGain) return
    this.rampParam(this.padGain.gain, enabled ? this.padLevel : MIN_GAIN, 1)
  }

  setAmbientPadLevel(value: number): void {
    this.padLevel = clamp(value, 0, 1)
    if (this.ctx && this.padGain && this.padEnabled) {
      this.rampParam(this.padGain.gain, this.padLevel, 0.6)
    }
  }

  async dispose(): Promise<void> {
    if (this.teardownTimer) {
      clearTimeout(this.teardownTimer)
      this.teardownTimer = null
    }
    this.releaseVoices()
    if (this.ctx) await this.ctx.close().catch(() => undefined)
    this.ctx = null
    this.master = null
    this.playing = false
  }

  // ---------------------------------------------------------------- internals

  private ensureContext(): AudioContext | null {
    if (this.ctx) return this.ctx
    if (typeof window === 'undefined') return null

    const Ctor =
      window.AudioContext ?? (window as WebkitWindow).webkitAudioContext
    if (!Ctor) return null

    const ctx = new Ctor()
    const master = ctx.createGain()
    master.gain.value = MIN_GAIN
    master.connect(ctx.destination)

    this.ctx = ctx
    this.master = master
    return ctx
  }

  private startTone(now: number, level: number): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master) return

    if (!this.toneOsc) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(this.frequency, now)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(MIN_GAIN, now)
      osc.connect(gain).connect(master)
      osc.start(now)
      this.toneOsc = osc
      this.toneGain = gain
    } else {
      this.setFrequency(this.frequency)
    }
    if (this.toneGain) {
      this.rampParam(this.toneGain.gain, clamp(level, MIN_GAIN, 1), this.fadeSeconds)
    }
  }

  private startPad(now: number): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master) return

    if (!this.padSource) {
      const src = ctx.createBufferSource()
      src.buffer = this.getBrownNoise(ctx)
      src.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 380
      filter.Q.value = 0.6
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(MIN_GAIN, now)
      src.connect(filter).connect(gain).connect(master)
      src.start(now)
      this.padSource = src
      this.padFilter = filter
      this.padGain = gain
    }
    const target = this.padEnabled ? this.padLevel : MIN_GAIN
    if (this.padGain) this.rampParam(this.padGain.gain, target, this.fadeSeconds)
  }

  private startBreath(now: number): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master || this.breathSource) return

    const src = ctx.createBufferSource()
    src.buffer = this.getPinkNoise(ctx)
    src.loop = true
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 600
    band.Q.value = 1.1
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(MIN_GAIN, now) // stays silent until breathePhase
    src.connect(band).connect(gain).connect(master)
    src.start(now)
    this.breathSource = src
    this.breathBand = band
    this.breathGain = gain
  }

  private duckVoice(gain: GainNode | null, seconds: number): void {
    if (!this.ctx || !gain) return
    const now = this.ctx.currentTime
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(Math.max(gain.gain.value, MIN_GAIN), now)
    gain.gain.exponentialRampToValueAtTime(MIN_GAIN, now + seconds)
  }

  private getBrownNoise(ctx: AudioContext): AudioBuffer {
    if (this.brownNoise) return this.brownNoise
    const length = Math.floor(ctx.sampleRate * 6)
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    }
    this.brownNoise = buffer
    return buffer
  }

  /** Pink noise (Paul Kellet's refined filter) — cached. Warmer than white for breath. */
  private getPinkNoise(ctx: AudioContext): AudioBuffer {
    if (this.pinkNoise) return this.pinkNoise
    const length = Math.floor(ctx.sampleRate * 4)
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0
    let b1 = 0
    let b2 = 0
    let b3 = 0
    let b4 = 0
    let b5 = 0
    let b6 = 0
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.969 * b2 + white * 0.153852
      b3 = 0.8665 * b3 + white * 0.3104856
      b4 = 0.55 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      b6 = white * 0.115926
    }
    this.pinkNoise = buffer
    return buffer
  }

  private rampParam(param: AudioParam, target: number, seconds: number): void {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    param.cancelScheduledValues(now)
    param.setValueAtTime(Math.max(param.value, MIN_GAIN), now)
    param.exponentialRampToValueAtTime(Math.max(target, MIN_GAIN), now + seconds)
  }

  private fadeToSilence(gain: GainNode | null, now: number, end: number): void {
    if (!gain) return
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(Math.max(gain.gain.value, MIN_GAIN), now)
    gain.gain.exponentialRampToValueAtTime(MIN_GAIN, end)
    gain.gain.linearRampToValueAtTime(0, end + 0.04)
  }

  private releaseVoices(): void {
    const nodes: (AudioNode | null)[] = [
      this.toneOsc,
      this.toneGain,
      this.padSource,
      this.padFilter,
      this.padGain,
      this.breathSource,
      this.breathBand,
      this.breathGain,
    ]
    for (const node of nodes) {
      try {
        node?.disconnect()
      } catch {
        // already detached
      }
    }
    this.toneOsc = null
    this.toneGain = null
    this.padSource = null
    this.padFilter = null
    this.padGain = null
    this.breathSource = null
    this.breathBand = null
    this.breathGain = null
  }
}

/** Shared engine instance — the whole app drives this single graph. */
export const audioEngine = new AudioEngine()

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function safeStop(
  node: OscillatorNode | AudioBufferSourceNode | null,
  when: number,
): void {
  try {
    node?.stop(when)
  } catch {
    // already stopped / never started
  }
}
