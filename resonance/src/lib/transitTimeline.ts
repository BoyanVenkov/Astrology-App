import { birthChart, findAspects, type Aspect, type AspectDef } from './astrology'
import { chartPositions, type BodyName } from './ephemeris'

/** One transit as it moves through a window of days — in orb, exact, gone. */
export interface TransitSpan {
  key: string
  transiting: BodyName
  other: BodyName
  def: AspectDef
  /** First / last sampled instant inside orb (clipped to the window). */
  start: Date
  end: Date
  /** The sampled instant closest to exact. */
  peak: Date
  peakOrb: number
  /** The contact at its peak — for glyphs and the per-aspect reading. */
  atPeak: Aspect
  /**
   * False when the closest sample sits on the window's edge — the contact
   * perfects before or after the window, so there's no exact date inside it.
   */
  peakInside: boolean
}

/**
 * Sweep the real ephemeris across `days` from `from`, find every transit
 * that comes into orb, and record when it enters, peaks and leaves.
 *
 * The Moon is left out — it touches everything within a couple of days, so
 * across a week or a month it would drown the slower, meaningful contacts.
 * With a natal chart, transits are read against it; without one, the moving
 * planets are read against each other.
 */
export function transitWindow(
  birthUtc: Date | null,
  from: Date,
  days: number,
): TransitSpan[] {
  const natal = birthUtc ? birthChart(birthUtc) : null
  const stepHours = days <= 7 ? 12 : 24
  const steps = Math.round((days * 24) / stepHours)
  const spans = new Map<string, TransitSpan>()

  for (let i = 0; i < steps; i += 1) {
    const at = new Date(from.getTime() + i * stepHours * 3_600_000)
    const moving = chartPositions(at).filter((p) => p.body !== 'Moon')
    const hits = natal
      ? findAspects(moving, natal)
      : findAspects(moving, moving, { sameSet: true })
    for (const a of hits) {
      const key = `${a.transiting}-${a.def.name}-${a.other}`
      const s = spans.get(key)
      if (!s) {
        spans.set(key, {
          key,
          transiting: a.transiting,
          other: a.other,
          def: a.def,
          start: at,
          end: at,
          peak: at,
          peakOrb: a.orbDelta,
          atPeak: a,
          peakInside: false,
        })
      } else {
        s.end = at
        if (a.orbDelta < s.peakOrb) {
          s.peak = at
          s.peakOrb = a.orbDelta
          s.atPeak = a
        }
      }
    }
  }

  const first = from.getTime()
  const last = first + (steps - 1) * stepHours * 3_600_000
  for (const s of spans.values()) {
    const p = s.peak.getTime()
    s.peakInside = p !== first && p !== last
  }

  // the strongest contacts, then in the order they peak
  return [...spans.values()]
    .sort((a, b) => b.atPeak.score - a.atPeak.score)
    .slice(0, 14)
    .sort((a, b) => a.peak.getTime() - b.peak.getTime())
}
