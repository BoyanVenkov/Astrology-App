/**
 * Core domain interfaces for Resonance.
 *
 * NOTE: reconstructed here because the repo only had a partial `ChakraState`
 * in `src/lib/astrology.ts`. Reconcile with your canonical definitions if
 * they diverge — the store and audio engine both import from this file.
 */

export type ChakraKey =
  | 'root'
  | 'sacral'
  | 'solar-plexus'
  | 'heart'
  | 'throat'
  | 'third-eye'
  | 'crown'

/** The nine Solfeggio tones plus 432 Hz "natural" tuning. */
export type SolfeggioFrequency =
  | 174
  | 285
  | 396
  | 417
  | 432
  | 528
  | 639
  | 741
  | 852
  | 963

export interface ChakraState {
  key: ChakraKey
  /** Display name, e.g. "Heart". */
  name: string
  /** Associated musical note, e.g. "F". */
  note: string
  /** Hex colour for the aura / meter. */
  color: string
  /** Tuned Solfeggio tone for this centre. */
  frequency: SolfeggioFrequency
  /** Current balance / activation, 0–100. */
  balance: number
  active: boolean
}

export interface AstrologicalTransit {
  id: string
  /** Human-readable summary, e.g. "Moon trine Venus". */
  title: string
  /** Primary moving body, e.g. "Moon". */
  body: string
  /** Zodiac sign the body currently occupies. */
  sign: string
  /** Aspect type, e.g. "trine", "square", "conjunction". */
  aspect: string
  /** Aspected body, when the transit is an aspect. */
  target?: string
  /** Named lunar phase, e.g. "Waxing Gibbous". */
  moonPhase: string
  /** Illuminated fraction of the Moon, 0–100. */
  illumination: number
  /** Short guidance text for the user. */
  influence: string
  /** Chakra this transit most strongly resonates with. */
  resonantChakra: ChakraKey
  /** Suggested tone to work with during this window. */
  recommendedFrequency: SolfeggioFrequency
  /** Active window as ISO-8601 timestamps. */
  window: { start: string; end: string }
}

export interface AudioPreferences {
  /** Output level, 0–1. */
  masterVolume: number
  /** Layer the low-pass brown-noise pad beneath the tone. */
  ambientPadEnabled: boolean
  /** Pad level, 0–1. */
  ambientPadLevel: number
  /** Fade-in / fade-out ramp length in seconds (pop-free start/stop). */
  fadeSeconds: number
  /** Play the synthesised breathing sound during guided breathwork. */
  breathVoice: boolean
}

/** What the audio engine is voicing: pure tone, breath sounds, or both. */
export type AudioMode = 'tone' | 'breath' | 'both'

/* ---------------------------------------------------------------- breathwork */

export type BreathPhaseKind = 'inhale' | 'hold' | 'exhale' | 'rest' | 'pump'

export type BreathPatternKey = 'box' | 'relax' | 'coherent' | 'kapalabhati'

export interface BreathStep {
  kind: BreathPhaseKind
  seconds: number
  /** Prompt shown in the centre of the ring: "Inhale" | "Hold" | … */
  label: string
}

export interface BreathPattern {
  key: BreathPatternKey
  name: string
  tagline: string
  /** Compact ratio label, e.g. "4-7-8". */
  ratio: string
  /** Hex accent that tints the aura ring for this pattern. */
  accent: string
  steps: BreathStep[]
}

/* --------------------------------------------------------------- apothecary */

export interface Crystal {
  id: string
  name: string
  chakra: ChakraKey
  /** Hex colour for the stone's dot / glow. */
  color: string
  keywords: string[]
  description: string
}

/* ---------------------------------------------------------------- astrology */

export interface BirthProfile {
  /** Local birth date, `YYYY-MM-DD`. */
  date: string
  /** Local birth time, `HH:mm`. `12:00` when unknown. */
  time: string
  timeKnown: boolean
  /** IANA zone of the birth place, e.g. `Europe/Athens`. */
  timeZone: string
  /** Free-text place, shown in the UI. */
  placeLabel?: string
  /** Birth latitude, degrees N. Needed for houses / Ascendant. */
  lat?: number
  /** Birth longitude, degrees E. */
  lon?: number
  /** Derived birth instant as an ISO-8601 UTC string. */
  utc: string
}

/* ----------------------------------------------------------------- practice */

export type Mood = 'bright' | 'calm' | 'clear' | 'heavy' | 'anxious' | 'tired'

/** An end-of-day mood check-in (one per day, latest wins). */
export interface MoodEntry {
  /** ISO timestamp. */
  at: string
  /** Local day `YYYY-MM-DD`. */
  day: string
  mood: Mood
  note?: string
}

/** A completed guided practice session, kept for streaks / history. */
export interface PracticeSession {
  /** ISO timestamp of completion. */
  at: string
  /** Local day `YYYY-MM-DD`. */
  day: string
  chakra: ChakraKey
  frequency: SolfeggioFrequency
  pattern: BreathPatternKey
  /** Minutes actually practised. */
  minutes: number
  /** false if the user exited early. */
  completed: boolean
}

/* --------------------------------------------------------------- navigation */

export type TabKey = 'dashboard' | 'frequencies' | 'breathwork' | 'apothecary'

/**
 * The persisted, resumable state of a user's alignment session.
 */
export interface ResonanceSession {
  id: string
  /** ISO timestamp for when this session began. */
  startedAt: string
  /** Chakra currently in focus. */
  chakra: ChakraState | null
  /** Astrological context driving the session. */
  transit: AstrologicalTransit | null
  /** Tone the engine is (or would be) playing. */
  frequency: SolfeggioFrequency
  /** Whether audio is currently sounding. Never rehydrated as `true`. */
  isPlaying: boolean
  /** What the engine is voicing — tone (Frequencies) or breath (Breathwork). */
  audioMode: AudioMode
  /** Breath pattern selected for the guided practice. */
  breathPattern: BreathPatternKey
  /** Pattern today's sky recommends — shown as a nudge, not forced. */
  suggestedPattern: BreathPatternKey
  /** Crystals recommended for today's chakra × planet transit. */
  dailyCrystals: Crystal[]
  /** Natal data, once the user has entered it. */
  profile: BirthProfile | null
  /** True once the user has entered birth data OR chosen to skip. */
  onboardingComplete: boolean
  audio: AudioPreferences
  /** Lifetime count of completed sessions. */
  completedSessions: number
  /** ISO timestamp of the last completed session, or null. */
  lastCompletedAt: string | null
  /** Practice history (most recent last), capped to a sane length. */
  sessionLog: PracticeSession[]
  /** Daily mood check-ins (most recent last), capped. */
  moodLog: MoodEntry[]
}
