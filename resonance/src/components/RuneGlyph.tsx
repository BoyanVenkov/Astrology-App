import type { CSSProperties } from 'react'
import { RUNES, type RuneKey } from '../lib/runes'

/**
 * A single Elder Futhark rune, drawn from its stroke path on a 24×34 stave.
 * `merkstave` flips it 180° — a reversed rune, read for the shadow.
 */
export function RuneGlyph({
  runeKey,
  merkstave = false,
  className,
  style,
  strokeWidth = 2.4,
}: {
  runeKey: RuneKey
  merkstave?: boolean
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}) {
  const m = RUNES[runeKey]
  return (
    <svg
      viewBox="0 0 24 34"
      className={className}
      style={style}
      role="img"
      aria-label={m.name}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={merkstave ? 'rotate(180 12 17)' : undefined}
      >
        <path d={m.strokes} />
      </g>
    </svg>
  )
}
