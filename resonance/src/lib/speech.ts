/**
 * Text-to-speech for guided meditations, via the Web Speech API — works in the
 * browser and in the Capacitor WebView. Degrades silently where unsupported.
 */

export const speechAvailable = (): boolean =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  typeof SpeechSynthesisUtterance !== 'undefined'

let cachedVoice: SpeechSynthesisVoice | null = null

function pickVoice(): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const pool = en.length > 0 ? en : voices
  return (
    pool.find((v) =>
      /samantha|serena|moira|karen|fiona|tessa|calm|soft/i.test(v.name),
    ) ??
    pool.find((v) => v.default) ??
    pool[0]
  )
}

if (speechAvailable()) {
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    cachedVoice = pickVoice()
  })
}

export function speak(
  text: string,
  opts: { rate?: number; onEnd?: () => void } = {},
): void {
  if (!speechAvailable() || !text) return
  const u = new SpeechSynthesisUtterance(text)
  cachedVoice = cachedVoice ?? pickVoice()
  if (cachedVoice) u.voice = cachedVoice
  u.rate = opts.rate ?? 0.82
  u.pitch = 0.96
  u.volume = 1
  if (opts.onEnd) u.onend = opts.onEnd
  try {
    window.speechSynthesis.speak(u)
  } catch {
    /* ignore */
  }
}

export function stopSpeaking(): void {
  if (speechAvailable()) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      /* ignore */
    }
  }
}
