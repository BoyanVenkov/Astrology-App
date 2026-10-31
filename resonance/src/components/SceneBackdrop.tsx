import bgSky from '../assets/art/bg-sky.webp'
import bgTarot from '../assets/art/bg-tarot.webp'
import bgPractice from '../assets/art/bg-practice.webp'
import bgYou from '../assets/art/bg-you.webp'
import bgWelcome from '../assets/art/bg-welcome.webp'

export type SceneKey = 'sky' | 'tarot' | 'practice' | 'you' | 'welcome'

const SCENES: Record<SceneKey, string> = {
  sky: bgSky,
  tarot: bgTarot,
  practice: bgPractice,
  you: bgYou,
  welcome: bgWelcome,
}

/**
 * Each section's own place — Gemini-rendered night scenes (an observatory for
 * the Sky, a candlelit altar for Tarot, a lotus sanctuary for Practice, a
 * desert portal for You, a ringed planet over clouds before you're in).
 *
 * `section`: pinned behind the top of the screen and dissolving into the
 * night below, so content scrolls over it like a slow parallax.
 * `full`: the whole viewport, under a scrim, for the first-run screens.
 * Keyed by scene so changing section cross-fades rather than snapping.
 */
export function SceneBackdrop({
  scene,
  variant = 'section',
}: {
  scene: SceneKey
  variant?: 'section' | 'full'
}) {
  const full = variant === 'full'
  return (
    <div
      aria-hidden
      className={
        full
          ? 'pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05060f]'
          : 'pointer-events-none absolute inset-x-0 top-0 h-[82vh] overflow-hidden'
      }
    >
      <img
        key={scene}
        src={SCENES[scene]}
        alt=""
        className={`animate-scene-in absolute inset-0 h-full w-full object-cover ${
          full ? 'object-[50%_62%] opacity-70' : 'object-[50%_72%] opacity-[0.62]'
        }`}
        style={
          full
            ? undefined
            : {
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 38%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 0%, #000 38%, transparent 100%)',
              }
        }
      />
      {/* keep the type legible — a night veil over the top, deeper when full */}
      <span
        className={`absolute inset-0 ${
          full
            ? 'bg-[linear-gradient(180deg,rgba(4,5,13,0.55)_0%,rgba(4,5,13,0.4)_38%,rgba(4,5,13,0.78)_62%,rgba(4,5,13,0.92)_100%)]'
            : 'bg-[linear-gradient(180deg,rgba(4,5,13,0.55)_0%,rgba(4,5,13,0.15)_40%,transparent_100%)]'
        }`}
      />
    </div>
  )
}
