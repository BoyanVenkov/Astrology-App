/**
 * Scroll calm — while the page is scrolling, every looping decorative
 * animation (drifting art, breathing glows, orbit rings, twinkles, the star
 * canvas) holds still, and resumes from the same frame ~180ms after the last
 * scroll event.
 *
 * The decoration animates elements that carry filters (glows, drop shadows,
 * hue shifts), which a phone must re-rasterize every frame; with all of them
 * running, scrolling the Today screen dropped ~1 in 4 frames on a mid-range
 * CPU. Paused, scrolling gets the whole frame budget. Entrance animations are
 * not paused (see `.is-scrolling` in index.css), so nothing freezes half-in.
 */

const SETTLE_MS = 180

export const isScrolling = (): boolean =>
  document.documentElement.classList.contains('is-scrolling')

export function installScrollCalm(): void {
  const root = document.documentElement
  let timer = 0
  const onScroll = () => {
    if (!timer) root.classList.add('is-scrolling')
    else window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      root.classList.remove('is-scrolling')
      timer = 0
    }, SETTLE_MS)
  }
  // capture: also catches scrollable panels (sheets, horizontal strips)
  window.addEventListener('scroll', onScroll, { passive: true, capture: true })
}
