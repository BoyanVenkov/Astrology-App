import { useEffect } from 'react'
import type { ChakraKey } from '../types/resonance'
import { useAppStore } from '../store/useAppStore'
import { chakraColor } from './resonanceData'

export interface DayHue {
  /** The focus chakra's colour — the whole app tints toward this each day. */
  hue: string
  /** Low-alpha tint for backgrounds. */
  soft: string
  /** Mid-alpha for glows. */
  glow: string
  /** Darkened toward the void, for deep panels. */
  deep: string
}

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const mixToward = (hex: string, target: [number, number, number], amt: number): string => {
  const [r, g, b] = hexToRgb(hex)
  const m = (a: number, t: number) => Math.round(a + (t - a) * amt)
  return `rgb(${m(r, target[0])}, ${m(g, target[1])}, ${m(b, target[2])})`
}

export function dayHue(chakra: ChakraKey): DayHue {
  const hue = chakraColor(chakra)
  const [r, g, b] = hexToRgb(hue)
  return {
    hue,
    soft: `rgba(${r}, ${g}, ${b}, 0.13)`,
    glow: `rgba(${r}, ${g}, ${b}, 0.4)`,
    deep: mixToward(hue, [3, 4, 12], 0.72),
  }
}

/**
 * Derives the day's hue from the focus chakra and publishes it as CSS custom
 * properties so panels, the nav orb and the ambient background all shift with it.
 */
export function useDayHue(): DayHue {
  const chakraKey = useAppStore((s) => s.chakra?.key ?? s.transit?.resonantChakra ?? 'heart')
  const dh = dayHue(chakraKey)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--rz-hue', dh.hue)
    root.style.setProperty('--rz-hue-soft', dh.soft)
    root.style.setProperty('--rz-glow', dh.glow)
  }, [dh.hue, dh.soft, dh.glow])

  return dh
}
