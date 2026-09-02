/**
 * Text-to-speech for guided meditations, via the Web Speech API — works in the
 * browser and in the Capacitor WebView. Degrades silently where unsupported.
 */

export const speechAvailable = (): boolean =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  typeof SpeechSynthesisUtterance !== 'undefined'

const voiceCache = new Map<string, SpeechSynthesisVoice | null>()

function pickVoice(lang = 'en'): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null
  const prefix = lang.toLowerCase().split('-')[0]
  const matched = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix))
  const pool = matched.length > 0 ? matched : voices
  return (
    pool.find((v) =>
      /samantha|serena|moira|karen|fiona|tessa|calm|soft|natural/i.test(v.name),
    ) ??
    pool.find((v) => v.default) ??
    pool[0]
  )
}

if (speechAvailable()) {
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    voiceCache.clear()
  })
}

export function speak(
  text: string,
  opts: { rate?: number; onEnd?: () => void; lang?: string } = {},
): void {
  if (!speechAvailable() || !text) return
  const lang = opts.lang ?? 'en-US'
  const u = new SpeechSynthesisUtterance(text)
  if (!voiceCache.has(lang)) voiceCache.set(lang, pickVoice(lang))
  const voice = voiceCache.get(lang) ?? null
  if (voice) u.voice = voice
  u.lang = lang
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
