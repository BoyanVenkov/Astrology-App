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
