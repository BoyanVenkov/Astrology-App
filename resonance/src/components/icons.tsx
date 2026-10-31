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

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" {...fill} />
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5S14.4 18.2 12 20.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </svg>
  )
}

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

export function OracleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.2 19.5 8v8L12 20.8 4.5 16V8Z" {...fill} />
      <path d="M12 3.2 19.5 8v8L12 20.8 4.5 16V8Z" />
      <path d="M12 3.2V12M19.5 8 12 12 4.5 8M12 12v8.8" strokeOpacity="0.6" />
      <path d="M12 8.6c.4 1.5 1.1 2.2 2.6 2.6-1.5.4-2.2 1.1-2.6 2.6-.4-1.5-1.1-2.2-2.6-2.6 1.5-.4 2.2-1.1 2.6-2.6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 7h14" />
      <path d="M9 7V5a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 5v2" />
      <path d="M7 7l.8 12a2 2 0 0 0 2 1.9h4.4a2 2 0 0 0 2-1.9L17 7Z" {...fill} />
      <path d="M7 7l.8 12a2 2 0 0 0 2 1.9h4.4a2 2 0 0 0 2-1.9L17 7" />
      <path d="M10 11v6M14 11v6" strokeOpacity="0.6" />
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

/* ------------------------------------------------------- explore nav */

export function ScrollIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 4h10.5a2 2 0 0 1 2 2v.5h-3V18a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18v-.5h11" {...fill} />
      <path d="M7 4h10.5a2 2 0 0 1 2 2v.5h-3" />
      <path d="M7 4a2 2 0 0 0-2 2v11.5M16.5 6.5V18a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18v-.5h11" />
      <path d="M8.5 9h5M8.5 12h5M8.5 15h3" strokeOpacity="0.6" />
    </svg>
  )
}

export function OrbitIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" {...fill} />
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.2" transform="rotate(-28 12 12)" />
      <circle cx="19.6" cy="7.2" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function RingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="12" r="5.6" {...fill} />
      <circle cx="9" cy="12" r="5.6" />
      <circle cx="15" cy="12" r="5.6" />
    </svg>
  )
}

export function RuneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.8c4.6 0 7.4 3.6 7.4 9.2 0 5.4-3 9.2-7.4 9.2s-7.4-3.8-7.4-9.2c0-5.6 2.8-9.2 7.4-9.2Z" {...fill} />
      <path d="M12 2.8c4.6 0 7.4 3.6 7.4 9.2 0 5.4-3 9.2-7.4 9.2s-7.4-3.8-7.4-9.2c0-5.6 2.8-9.2 7.4-9.2Z" />
      <path d="M10 7v10M10 7.5l4 3M10 11l4-3" />
    </svg>
  )
}

export function JournalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3.5" width="14" height="17" rx="2.2" {...fill} />
      <rect x="5" y="3.5" width="14" height="17" rx="2.2" />
      <path d="M8.5 3.5v17M11.5 8.5h4.5M11.5 11.5h4.5" strokeOpacity="0.6" />
    </svg>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={2}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

/* ------------------------------------------------------------- fields */

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.6" {...fill} />
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.6" />
      <path d="M3.5 9.8h17M8 3v4M16 3v4" />
      <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01" strokeWidth={2.4} />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.6" {...fill} />
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </svg>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" {...fill} />
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" {...fill} />
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}
