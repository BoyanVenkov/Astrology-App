import type { ReactNode } from 'react'

/** The standard back control — a chevron in a visible chip, matching the gear. */
export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="-ml-1 grid h-9 w-9 shrink-0 place-items-center self-start rounded-full border border-white/20 bg-white/[0.08] text-[#eef1fb] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.55)] transition active:scale-90 active:bg-white/15"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[1.15rem] w-[1.15rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 5l-7 7 7 7" />
      </svg>
    </button>
  )
}

interface ScreenProps {
  /** Small label above the title. */
  eyebrow?: string
  title: string
  /** Optional one-line subtitle under the title. */
  subtitle?: ReactNode
  /** Back / dismiss handler — renders the chevron when set. */
  onBack?: () => void
  /** Optional control on the right of the header (edit link, etc). */
  action?: ReactNode
  children: ReactNode
}

/**
 * The shared shell for every pushed screen — one consistent header (back
 * chevron · eyebrow · serif title · optional action), one consistent rhythm.
 * Tab roots draw their own headers; everything reached by a tap uses this.
 */
export function Screen({
  eyebrow,
  title,
  subtitle,
  onBack,
  action,
  children,
}: ScreenProps) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-start gap-2">
        {onBack && <BackButton onClick={onBack} />}
        <div className="min-w-0 flex-1 pt-0.5">
          {eyebrow && <p className="eyebrow-hue">{eyebrow}</p>}
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-haze-300">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0 pt-1">{action}</div>}
      </header>

      {children}
    </div>
  )
}
