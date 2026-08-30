import type { SVGProps } from 'react'

type MarkProps = SVGProps<SVGSVGElement> & {
  /** Gentle breathing pulse — for splash / onboarding, never for chrome. */
  animated?: boolean
}

/**
 * Resonance — the brand mark.
 *
 * A still four-pointed star at the centre; two broken orbital rings ring out
 * from it like a struck note, closed by a faint outer field. One stroke weight,
 * legible from a 16px favicon to a full-screen splash. Inherits `currentColor`
 * so it takes the gold chrome, the daily hue, or plain white unchanged.
 */
export function ResonanceMark({ animated, className, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      role="img"
      aria-label="Resonance"
      className={[animated ? 'animate-hum' : '', className ?? '']
        .join(' ')
        .trim() || undefined}
      {...props}
    >
      {/* outer field */}
      <circle cx="24" cy="24" r="22.5" strokeWidth={1} opacity={0.32} />
      {/* orbital rings — broken, counter-posed, a note ringing out */}
      <circle
        cx="24"
        cy="24"
        r="18"
        strokeDasharray="42 14.55"
        strokeDashoffset="28.3"
        opacity={0.6}
      />
      <circle
        cx="24"
        cy="24"
        r="12.5"
        strokeDasharray="29 10.27"
        opacity={0.85}
        transform="rotate(45 24 24)"
      />
      {/* two bodies riding the ring */}
      <circle cx="24" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle
        cx="42"
        cy="24"
        r="1.1"
        fill="currentColor"
        stroke="none"
        opacity={0.7}
      />
      {/* the still point */}
      <path
        d="M24 12c1.2 7.6 4.4 10.8 12 12-7.6 1.2-10.8 4.4-12 12-1.2-7.6-4.4-10.8-12-12 7.6-1.2 10.8-4.4 12-12Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

/**
 * Mark + wordmark, for the app's top chrome. The wordmark stays as live text
 * (the licensed display face renders crisper than any outlined path), the mark
 * carries the identity.
 */
export function ResonanceLockup({
  className = '',
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <ResonanceMark
        className={compact ? 'h-4 w-4' : 'h-5 w-5'}
        style={{
          color: 'var(--rz-hue)',
          filter: 'drop-shadow(0 0 12px var(--rz-glow))',
        }}
      />
      <span
        className={`text-gilded font-bold uppercase ${
          compact
            ? 'text-[10px] tracking-[0.32em]'
            : 'text-[12px] tracking-[0.34em]'
        }`}
        style={{ marginRight: '-0.34em' }}
      >
        Resonance
      </span>
    </span>
  )
}
