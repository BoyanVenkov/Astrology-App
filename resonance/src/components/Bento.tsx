import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface BentoProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** A Tailwind max-height class, e.g. `max-h-[22rem]`. Content beyond this
   *  scrolls inside the box instead of pushing the page ever taller. */
  maxHeightClass?: string
  /** The hero/chosen surface — a whisper of the day's hue, same as glass-panel-active. */
  active?: boolean
  /** Make the whole box itself pressable (for a card that's also a button). */
  pressable?: boolean
  onClick?: () => void
}

/**
 * A glass-panel that contains long content by scrolling internally instead
 * of growing the page, with an inset "scroll-depth" shadow that only shows
 * while there's genuinely more to read below — not a decorative cue on a
 * card that's already fully visible.
 */
export function Bento({
  children,
  className = '',
  style,
  maxHeightClass = 'max-h-[26rem]',
  active = false,
  pressable = false,
  onClick,
}: BentoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [moreBelow, setMoreBelow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      const overflowing = el.scrollHeight > el.clientHeight + 2
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
      setMoreBelow(overflowing && !atBottom)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', check)
      ro.disconnect()
    }
  }, [children])

  const Wrapper = pressable || onClick ? 'button' : 'div'

  return (
    <Wrapper
      type={Wrapper === 'button' ? 'button' : undefined}
      onClick={onClick}
      className={`relative w-full text-start ${pressable || onClick ? 'bento-tile' : ''} ${
        active ? 'glass-panel glass-panel-active' : 'glass-panel'
      } ${className}`}
      style={style}
    >
      <div
        ref={ref}
        className={`no-scrollbar overflow-y-auto overscroll-contain ${maxHeightClass} ${
          moreBelow ? 'scroll-depth' : ''
        }`}
      >
        {children}
      </div>
      {moreBelow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"
        >
          <span className="h-1 w-8 animate-pulse-glow rounded-full bg-white/25" />
        </span>
      )}
    </Wrapper>
  )
}
