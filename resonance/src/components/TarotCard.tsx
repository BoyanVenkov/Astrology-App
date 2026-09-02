import type { CSSProperties } from 'react'
import { cardName, type Suit, type TarotCard } from '../lib/tarot'
import { useT } from '../lib/i18n'
import { GOLD, INK } from './tarotArt'
import { TarotScene } from './tarotScenes'

/**
 * A tarot card — an illustrated moonlit-engraving scene (see `tarotScenes`),
 * inside a gilded frame with the card name. Reversed cards render the scene
 * rotated 180°, exactly like a card dealt upside-down.
 */

const SUIT_COLOR: Record<Suit, string> = {
  wands: '#f6a35c',
  cups: '#6cc4e6',
  swords: '#cbb9f2',
  pentacles: '#7bd6a6',
}

export function TarotCardFace({
  card,
  reversed = false,
  className,
  style,
}: {
  card: TarotCard
  reversed?: boolean
  className?: string
  style?: CSSProperties
}) {
  const t = useT()
  const name = cardName(card, t)
  const color = card.arcana === 'major' ? GOLD : SUIT_COLOR[card.arcana]
  return (
    <svg
      viewBox="0 0 200 340"
      className={className}
      style={style}
      role="img"
      aria-label={reversed ? t('or.stance.reversed') + ' — ' + name : name}
    >
      <TarotScene card={card} reversed={reversed} color={color} name={name} />
    </svg>
  )
}

export function TarotCardBack({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg viewBox="0 0 200 340" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id="tc-back" cx="50%" cy="42%" r="72%">
          <stop offset="0%" stopColor="#242f63" />
          <stop offset="100%" stopColor="#05070f" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="196" height="336" rx="16" fill="url(#tc-back)" />
      <rect
        x="7"
        y="7"
        width="186"
        height="326"
        rx="12"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.75"
        strokeWidth="1.6"
      />
      <rect
        x="12"
        y="12"
        width="176"
        height="316"
        rx="9"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <g stroke={GOLD} strokeOpacity="0.26" strokeWidth="1" fill="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx="100" cy="170" r={14 + i * 21} />
        ))}
      </g>
      <g stroke={GOLD} strokeOpacity="0.5" strokeWidth="1" fill="none">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6
          return (
            <path
              key={i}
              d={`M${100 + Math.cos(a) * 20} ${170 + Math.sin(a) * 20}L${100 + Math.cos(a) * 150} ${170 + Math.sin(a) * 150}`}
            />
          )
        })}
      </g>
      <path
        d="M100 148c1.7 8.6 4.7 11.6 13 13-8.3 1.4-11.3 4.4-13 13-1.7-8.6-4.7-11.6-13-13 8.3-1.4 11.3-4.4 13-13Z"
        fill={GOLD}
      />
      <circle cx="100" cy="116" r="2.4" fill={GOLD} />
      <circle cx="100" cy="224" r="2.4" fill={INK} fillOpacity="0.6" />
    </svg>
  )
}
