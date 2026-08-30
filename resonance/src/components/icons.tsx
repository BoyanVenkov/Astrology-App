import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  width: 24,
  height: 24,
  ...props,
})

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  )
}

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 4.5 8.5v9A1.5 1.5 0 0 0 6 19h12a1.5 1.5 0 0 0 1.5-1.5v-9Z" />
      <path d="M9.5 19v-5h5v5" />
    </svg>
  )
}

export function FrequenciesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 12c2.5 0 2.5-7 5-7s2.5 14 5 14 2.5-7 5-7 2.5 0 5 0" />
    </svg>
  )
}

export function BreathIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

export function ApothecaryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5 6 8l6 13.5L18 8Z" />
      <path d="M6 8h12M9.5 8 12 2.5 14.5 8M9 8l3 13.5L15 8" />
    </svg>
  )
}

export function GearIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10.5 20a1.8 1.8 0 0 0 3 0" />
    </svg>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
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

export function SkyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M17 15A7 7 0 0 1 9 4a7 7 0 1 0 8 11Z" />
      <path d="M18 4.5 18.6 6l1.5.6-1.5.6L18 8.7l-.6-1.5L15.9 6l1.5-.6Z" />
    </svg>
  )
}

export function CardsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="11" height="14" rx="2" transform="rotate(-9 8.5 14)" />
      <rect x="10" y="4" width="11" height="14" rx="2" transform="rotate(9 15.5 11)" />
      <path d="M15 9.5 15.6 11l1.5.6-1.5.6-.6 1.5-.6-1.5L12.4 12l1.5-.9Z" />
    </svg>
  )
}

export function TarotIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M12 7.5c.6 2.6 1.7 3.7 4.3 4.3-2.6.6-3.7 1.7-4.3 4.3-.6-2.6-1.7-3.7-4.3-4.3 2.6-.6 3.7-1.7 4.3-4.3Z" />
    </svg>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11Z" />
    </svg>
  )
}
