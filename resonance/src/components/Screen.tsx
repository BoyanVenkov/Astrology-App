import type { ReactNode } from 'react'
import { useT } from '../lib/i18n'

/** The standard back control — a chevron in a visible chip, matching the gear. */
export function BackButton({ onClick }: { onClick: () => void }) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t('common.back')}
      className="card-press -ms-1 grid h-10 w-10 shrink-0 place-items-center self-start rounded-full border border-white/20 bg-white/[0.08] text-[#eef1fb] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.55)] active:bg-white/15"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[1.2rem] w-[1.2rem] rtl:-scale-x-100"
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
  /**
   * On tablets / desktop, `'default'` keeps a comfortable reading column;
   * `'wide'` lets the screen use the full content area for its own columns.
   */
  width?: 'default' | 'wide'
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
  width = 'default',
  children,
}: ScreenProps) {
  return (
    <div
      className={`mx-auto flex w-full flex-col gap-5 ${
        width === 'wide' ? '' : 'md:max-w-2xl'
      }`}
    >
      <header className="animate-bloom-in flex items-start gap-3">
        {onBack && <BackButton onClick={onBack} />}
        <div className="min-w-0 flex-1 pt-0.5">
          {eyebrow && <p className="eyebrow-hue">{eyebrow}</p>}
          <h1 className="mt-1.5 font-serif text-[1.9rem] leading-[1.08] text-gilded md:text-[2.2rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-haze-200">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 pt-1">{action}</div>}
      </header>

      <div className="animate-rise-in flex flex-col gap-5" style={{ animationDelay: '80ms' }}>
        {children}
      </div>
    </div>
  )
}
