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

/**
 * What the audio engine is voicing:
 *  - `tone`   pure Solfeggio sine (Frequencies)
 *  - `breath` synthesised breathing sound (Breathwork)
 *  - `drone`  soft evolving ambient chord (meditation "music")
 */
export type AudioMode = 'tone' | 'breath' | 'drone'

/** The sound bed under a guided meditation. */
export type MeditationSound = 'tone' | 'music' | 'silent'

/* ---------------------------------------------------------------- breathwork */

export type BreathPhaseKind =
  | 'inhale'
  | 'hold'
  | 'exhale'
  | 'rest'
  | 'pump'
  | 'sip'

export type BreathPatternKey =
  | 'box'
  | 'relax'
  | 'coherent'
  | 'resonant'
  | 'exhale'
  | 'sigh'
  | 'triangle'
  | 'nadi'
  | 'ujjayi'
  | 'energize'
  | 'kapalabhati'
  | 'wimhof'

export type BreathCategory = 'calm' | 'balance' | 'energy' | 'advanced'

export interface BreathStep {
  kind: BreathPhaseKind
  seconds: number
  /** Prompt shown in the centre of the ring: "Inhale" | "Hold" | … */
  label: string
}

/** Round-based practice (Wim Hof) — routed to the journey player, not the ring. */
export interface BreathRoundSpec {
  rounds: number
  /** Power breaths per round. */
  breaths: number
  /** Seconds per power breath. */
  breathSeconds: number
  /** Retention target per round, seconds — a guide, the user can hold longer. */
  retentionTargets: number[]
  /** Recovery hold after the deep inhale, seconds. */
  recoverySeconds: number
}

export interface BreathPattern {
  key: BreathPatternKey
  name: string
  tagline: string
  /** Compact ratio label, e.g. "4-7-8". */
  ratio: string
  /** Hex accent that tints the aura ring for this pattern. */
  accent: string
  category: BreathCategory
  /** Offered session lengths, minutes. Empty for round-based practices. */
  durations: number[]
  /** One sentence of how-to, shown on the setup screen. */
  guide: string
  steps: BreathStep[]
  /** Present only for advanced round-based practices. */
  rounds?: BreathRoundSpec
}

export type MeditationStyleKey =
  | 'chakra'
  | 'body-scan'
  | 'metta'
  | 'breath-awareness'
  | 'sound-bath'
  | 'gratitude'
  | 'safe-place'
  | 'yoga-nidra'
  | 'morning'
  | 'evening'
  | 'mountain'
  | 'open-awareness'

export type MeditationCategory =
  | 'grounding'
  | 'calm'
  | 'heart'
  | 'focus'
  | 'sleep'
  | 'energy'

export interface MeditationStyle {
  key: MeditationStyleKey
  name: string
  tagline: string
  category: MeditationCategory
  /** Offered session lengths, minutes. */
  durations: number[]
  /** true → the script is personalised to today's chart. */
  dynamic?: boolean
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

export type PracticeKind = 'breath' | 'meditation' | 'frequency'

/** What launches the guided-practice flow — from the sheet, library, or a nudge. */
export interface RitualPreset {
  mode: PracticeKind
  minutes: number
  /** Jump straight into the practice, skipping the setup screen. */
  skipIntro?: boolean
  /** For `mode: 'breath'` — a specific pattern; else today's suggested one. */
  breathPattern?: BreathPatternKey
  /** For `mode: 'meditation'` — a specific style; else `'chakra'`. */
  meditationStyle?: MeditationStyleKey
  /** For `mode: 'frequency'` — the tone to sit with; else today's recommended. */
  frequency?: SolfeggioFrequency
  /** This IS today's chart+mood prescription — frame it as such, not "from the library". */
  personalised?: boolean
}

/** A completed guided practice session, kept for streaks / history. */
export interface PracticeSession {
  /** ISO timestamp of completion. */
  at: string
  /** Local day `YYYY-MM-DD`. */
  day: string
  kind: PracticeKind
  chakra: ChakraKey
  frequency: SolfeggioFrequency
  /** The breath pattern, for `kind: 'breath'`. */
  pattern: BreathPatternKey
  /** The meditation style, for `kind: 'meditation'`. */
  style?: MeditationStyleKey
  /** Minutes actually practised. */
  minutes: number
  /** false if the user exited early. */
  completed: boolean
}

/* ------------------------------------------------------------------ location */

/** A geographic point — the user's current location, or a fallback. */
export interface GeoPoint {
  lat: number
  lon: number
  label?: string
  /** ISO timestamp of the fix. */
  at: string
}

/* --------------------------------------------------------------- biometrics */

/**
 * A body reading entered by hand in the Body check-in. HRV (ms) is the primary
 * stress signal; sleep and resting HR fill in the picture.
 */
export interface BiometricReading {
  at: string
  day: string
  /** Heart-rate variability, ms (RMSSD). Higher = more recovered. */
  hrv?: number
  /** Resting heart rate, bpm. */
  restingHr?: number
  /** Last night's sleep, hours. */
  sleepHours?: number
  /** How it was captured. */
  source: 'manual' | 'health'
}

/* ------------------------------------------------------------ notifications */

export interface NotificationPreferences {
  enabled: boolean
  /** Morning "today's reading is ready", `HH:mm` local. */
  dailyReading: boolean
  dailyReadingTime: string
  /** Alert on New / Full Moon. */
  moonPhases: boolean
  /** Alert when the Moon changes sign (a "reset" moment). */
  moonSignChange: boolean
  /** Alert shortly before the Moon goes void of course ("ground your energy"). */
  voidOfCourse: boolean
  /** Evening nudge to check in + practise, `HH:mm`. */
  eveningWind: boolean
  eveningWindTime: string
}

/* ------------------------------------------------------------------ premium */

export type PremiumTier = 'free' | 'pro'

/* --------------------------------------------------------------- navigation */

export type TabKey = 'today' | 'sky' | 'tarot' | 'you'

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
  /** Body readings (most recent last), capped. */
  biometricLog: BiometricReading[]
  /** The user's current location — powers the "sky above you now" + local times. */
  currentLocation: GeoPoint | null
  notifications: NotificationPreferences
  /** Entitlement tier. `pro` unlocks the full library, houses, deep history. */
  tier: PremiumTier
  /** Local day `YYYY-MM-DD` the daily tarot card was last turned — `null` if never. */
  tarotDrawnDay: string | null
  /** Local day the daily mood gate was answered or dismissed — `null` if never. */
  moodGateDay: string | null
}
