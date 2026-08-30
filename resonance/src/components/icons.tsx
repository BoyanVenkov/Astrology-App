import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/**
 * The Resonance icon set — a bespoke duotone family: one soft `currentColor`
 * fill beneath a crisp 1.6px stroke, on a 24 grid with rounded terminals.
 * They inherit `currentColor`, so the daily hue and the active-tab glow flow
 * straight through them.
 */

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

const fill = { fill: 'currentColor', fillOpacity: 0.15, stroke: 'none' }

/* ---------------------------------------------------------------- nav */

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="10.5" r="3.6" {...fill} />
      <circle cx="12" cy="10.5" r="3.6" />
      <path d="M12 3.5v1.6M12 16v1.5M4.3 10.5H2.8M21.2 10.5h-1.5M6.5 5l-1.1-1.1M18.6 5l1.1-1.1M6.5 16l-1.1 1.1M18.6 16l1.1 1.1" />
      <path d="M3.5 20.5h17" />
    </svg>
  )
}

export function SkyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 15.4A7 7 0 0 1 8.6 6a7 7 0 1 0 9.4 9.4Z" {...fill} />
      <path d="M18 15.4A7 7 0 0 1 8.6 6a7 7 0 1 0 9.4 9.4Z" />
      <path d="M17.5 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" {...fill} />
      <path d="M17.5 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />
    </svg>
  )
}

export function TarotIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3" width="14" height="18" rx="2.6" {...fill} />
      <rect x="5" y="3" width="14" height="18" rx="2.6" />
      <path d="M12 7c.5 2.7 1.8 4 4.5 4.5C13.8 12 12.5 13.3 12 16c-.5-2.7-1.8-4-4.5-4.5C10.2 11 11.5 9.7 12 7Z" {...fill} />
      <path d="M12 7c.5 2.7 1.8 4 4.5 4.5C13.8 12 12.5 13.3 12 16c-.5-2.7-1.8-4-4.5-4.5C10.2 11 11.5 9.7 12 7Z" />
    </svg>
  )
}

export function YouIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.6" {...fill} />
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1-3.6 3.8-5.4 7-5.4s6 1.8 7 5.4Z" {...fill} />
      <path d="M5 20c1-3.6 3.8-5.4 7-5.4s6 1.8 7 5.4" />
    </svg>
  )
}

/* --------------------------------------------------------- practice */

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M8 5.6v12.8a1 1 0 0 0 1.53.85l10.1-6.4a1 1 0 0 0 0-1.7L9.53 4.75A1 1 0 0 0 8 5.6Z" />
    </svg>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <rect x="6" y="5" width="4" height="14" rx="1.5" />
      <rect x="14" y="5" width="4" height="14" rx="1.5" />
    </svg>
  )
}

export function BreathIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="5" strokeOpacity="0.55" />
      <circle cx="12" cy="12" r="2.2" {...fill} fillOpacity="0.5" />
    </svg>
  )
}

export function FrequenciesIcon(props: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={1.9}>
      <path d="M3 12c1.7-7 3.9-7 5.5 0s3.9 7 5.5 0 3.9-7 5.5 0" />
    </svg>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.8" {...fill} />
      <circle cx="12" cy="12" r="8.8" />
      <path d="M15.6 8.4 13 13l-4.6 2.6L11 11Z" fill="currentColor" fillOpacity="0.9" stroke="none" />
      <path d="M15.6 8.4 13 13l-4.6 2.6L11 11Z" />
    </svg>
  )
}

/* ----------------------------------------------------------- utility */

export function GearIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" {...fill} />
      <path d="M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />
      <path d="M19.3 14.6a1.5 1.5 0 0 0 .3 1.65l.05.05a1.8 1.8 0 1 1-2.55 2.55l-.05-.05a1.5 1.5 0 0 0-1.65-.3 1.5 1.5 0 0 0-.9 1.37V20a1.8 1.8 0 1 1-3.6 0v-.08a1.5 1.5 0 0 0-1-1.37 1.5 1.5 0 0 0-1.65.3l-.05.05a1.8 1.8 0 1 1-2.55-2.55l.05-.05a1.5 1.5 0 0 0 .3-1.65 1.5 1.5 0 0 0-1.37-.9H4A1.8 1.8 0 1 1 4 10h.08a1.5 1.5 0 0 0 1.37-1 1.5 1.5 0 0 0-.3-1.65l-.05-.05a1.8 1.8 0 1 1 2.55-2.55l.05.05a1.5 1.5 0 0 0 1.65.3H10a1.5 1.5 0 0 0 .9-1.37V4a1.8 1.8 0 1 1 3.6 0v.08a1.5 1.5 0 0 0 .9 1.37 1.5 1.5 0 0 0 1.65-.3l.05-.05a1.8 1.8 0 1 1 2.55 2.55l-.05.05a1.5 1.5 0 0 0-.3 1.65V10a1.5 1.5 0 0 0 1.37.9H20a1.8 1.8 0 1 1 0 3.6h-.08a1.5 1.5 0 0 0-1.37.9Z" />
    </svg>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" {...fill} />
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10.4 20a1.9 1.9 0 0 0 3.2 0" />
    </svg>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.4" {...fill} />
      <rect x="5" y="10.5" width="14" height="10" rx="2.4" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function PulseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 12h4l2-5 4 12 3-9 2 2h5" />
    </svg>
  )
}

export function CardsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="11" height="14" rx="2.4" transform="rotate(-9 8.5 14)" {...fill} />
      <rect x="3" y="7" width="11" height="14" rx="2.4" transform="rotate(-9 8.5 14)" />
      <rect x="10" y="4" width="11" height="14" rx="2.4" transform="rotate(9 15.5 11)" {...fill} />
      <rect x="10" y="4" width="11" height="14" rx="2.4" transform="rotate(9 15.5 11)" />
      <path d="M15.4 8.6l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ApothecaryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.6 6 8l6 13.4L18 8Z" {...fill} />
      <path d="M12 2.6 6 8l6 13.4L18 8Z" />
      <path d="M6 8h12M9.6 8 12 2.6 14.4 8M9 8l3 13.4L15 8" strokeOpacity="0.55" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 13.5A8.5 8.5 0 0 1 10.5 4a8.5 8.5 0 1 0 9.5 9.5Z" {...fill} />
      <path d="M20 13.5A8.5 8.5 0 0 1 10.5 4a8.5 8.5 0 1 0 9.5 9.5Z" />
    </svg>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 3c1 6.2 3.8 9 10 10-6.2 1-9 3.8-10 10-1-6.2-3.8-9-10-10 6.2-1 9-3.8 10-10Z" />
    </svg>
  )
}
