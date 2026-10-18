import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
}

const PARTICLE_COUNT = 70
const MAX_DPR = 2

/**
 * A quiet, drifting starfield behind the whole app — small particles with a
 * gentle wander and an individual twinkle, plus a faint nebula wash tinted by
 * the day's hue. Mounted once at the root; a fixed full-screen canvas sits
 * behind every screen so it never remounts or resets on navigation.
 *
 * Pauses entirely in a background tab and respects reduced-motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let dpr = 1

    const seed = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.045,
      vy: (Math.random() - 0.5) * 0.045,
      baseAlpha: Math.random() * 0.5 + 0.25,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.0008 + 0.0003,
    })

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: PARTICLE_COUNT }, seed)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let running = true

    const draw = (t: number) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0
        }
        const twinkle = reduceMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(p.twinklePhase + t * p.twinkleSpeed)
        ctx.globalAlpha = p.baseAlpha * twinkle
        ctx.fillStyle = '#e9edfa'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
    />
  )
}
