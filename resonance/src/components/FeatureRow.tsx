import { LockIcon } from './icons'

/** A full-width "bento" row — glowing art on the left, title/sub on the right. */
export function FeatureRow({
  art,
  title,
  sub,
  locked = false,
  index = 0,
  onClick,
}: {
  art: string
  title: string
  sub: string
  locked?: boolean
  index?: number
  onClick: () => void
}) {
  const tilt = index % 2 === 0 ? 'rotate-[4deg]' : '-rotate-[4deg]'
  return (
    <button
      type="button"
      onClick={onClick}
      className="bento-tile glass-panel animate-rise-in relative flex items-center gap-4 overflow-visible p-4 text-start"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="relative grid h-16 w-16 shrink-0 place-items-center">
        <img
          src={art}
          alt=""
          aria-hidden
          className={`animate-card-float h-[5.5rem] w-[5.5rem] object-contain ${tilt}`}
          style={{
            filter:
              'drop-shadow(0 8px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 12px var(--rz-glow))',
            animationDelay: `${0.1 + index * 0.08}s`,
          }}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 font-serif text-lg text-white">
          {title}
          {locked && <LockIcon className="h-4 w-4 text-haze-400" />}
        </span>
        <span className="block text-xs text-haze-300">{sub}</span>
      </span>
      <span className="shrink-0 self-center" style={{ color: 'var(--rz-hue)' }}>
        ›
      </span>
    </button>
  )
}
