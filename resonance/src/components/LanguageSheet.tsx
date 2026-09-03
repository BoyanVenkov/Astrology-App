import { useAppStore } from '../store/useAppStore'
import { LOCALES, applyHtmlLang, useT } from '../lib/i18n'

/**
 * Language picker — a bottom sheet, in the app's own atmosphere. Each language
 * shows its own name in its own script, with the endonym and a line of the
 * script beneath. Picking one switches instantly.
 */
export function LanguageSheet({ onClose }: { onClose: () => void }) {
  const t = useT()
  const locale = useAppStore((s) => s.locale)
  const setLocale = useAppStore((s) => s.setLocale)

  const choose = (code: (typeof LOCALES)[number]['code']) => {
    setLocale(code)
    applyHtmlLang(code)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-midnight-void/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-panel mx-auto flex max-h-[85dvh] w-full max-w-md flex-col rounded-b-none p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-white/20" />
        <p className="eyebrow-hue shrink-0 text-center">{t('lang.title')}</p>
        <p className="mx-auto mt-1.5 max-w-xs shrink-0 text-center text-sm leading-relaxed text-haze-300">
          {t('lang.blurb')}
        </p>

        <ul className="-me-2 mt-5 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain pe-2">
          {LOCALES.map((l) => {
            const active = l.code === locale
            return (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  lang={l.code}
                  className="flex w-full items-center gap-3 rounded-2xl border p-4 text-start transition active:scale-[0.99]"
                  style={{
                    borderColor: active
                      ? 'color-mix(in srgb, var(--rz-hue) 45%, transparent)'
                      : 'rgba(255,255,255,0.1)',
                    background: active
                      ? 'color-mix(in srgb, var(--rz-hue) 10%, transparent)'
                      : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-lg leading-tight text-white">
                      {l.native}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-haze-400">
                      {l.english} · <span className="italic">{l.sample}</span>
                    </span>
                  </span>
                  {active && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--rz-hue)' }}
                      aria-hidden
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full shrink-0 text-center text-[11px] uppercase tracking-[0.14em] text-haze-500"
        >
          {t('common.close')}
        </button>
      </div>
    </div>
  )
}
