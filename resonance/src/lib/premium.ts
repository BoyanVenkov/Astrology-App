import { useAppStore } from '../store/useAppStore'
import type {
  BreathPatternKey,
  MeditationStyleKey,
  PremiumTier,
} from '../types/resonance'

export const PRO_PRICING = {
  monthly: '$6.99',
  yearly: '$29.99',
  /** Effective monthly cost of the annual plan — used on the paywall. */
  yearlyPerMonth: '$2.50',
  /** Free-trial length on the annual plan, in days. */
  trialDays: 7,
}

export const PRO_FEATURES = [
  'Compatibility readings for anyone in your life',
  'The full Chakra Field — every centre, decoded',
  'Every breath pattern, meditation & Solfeggio tone',
  'The 3-card & Celtic Cross spreads, and the Oracle',
  'Your full daily horoscope, in depth',
  'Unlimited journal history & aura trends',
]

/**
 * Practices a free account can *choose* from the library. Today's prescribed
 * practice is always playable whatever it is — this only gates browsing the
 * rest of the catalogue.
 */
export const FREE_BREATH_PATTERNS: BreathPatternKey[] = ['box', 'relax']
export const FREE_MEDITATION_STYLES: MeditationStyleKey[] = [
  'chakra',
  'breath-awareness',
]

export interface Entitlements {
  tier: PremiumTier
  isPro: boolean
  /** Free users can play the first N Solfeggio presets. */
  freeFrequencyCount: number
  /** Free users see the last N days of journal history. */
  freeHistoryDays: number
}

/**
 * Review build only. `npm run build:review` (Vite `--mode review`, which loads
 * `.env.review` with VITE_REVIEW_UNLOCK=1) unlocks every Pro feature so you can
 * walk the whole app on a device without a real purchase. A normal `vite build`
 * has no such env var, so this folds to `false` and is dead-code-eliminated.
 */
export const REVIEW_UNLOCK = import.meta.env.VITE_REVIEW_UNLOCK === '1'

export function entitlementsFor(tier: PremiumTier): Entitlements {
  const isPro = tier === 'pro' || REVIEW_UNLOCK
  return {
    tier,
    isPro,
    freeFrequencyCount: isPro ? Infinity : 3,
    freeHistoryDays: isPro ? Infinity : 7,
  }
}

export function useEntitlements(): Entitlements {
  const tier = useAppStore((s) => s.tier)
  return entitlementsFor(tier)
}

/* ---------------------------------------------------------------- gates */

export const breathUnlocked = (
  key: BreathPatternKey,
  isPro: boolean,
): boolean => isPro || FREE_BREATH_PATTERNS.includes(key)

export const meditationUnlocked = (
  key: MeditationStyleKey,
  isPro: boolean,
): boolean => isPro || FREE_MEDITATION_STYLES.includes(key)

/** Free tarot is the daily one-card draw; spreads are Pro. */
export const spreadUnlocked = (spreadKey: string, isPro: boolean): boolean =>
  isPro || spreadKey === 'one'

/* -------------------------------------------------------------- purchase */

// The actual purchase flow (Play Billing via RevenueCat) lives in
// `lib/revenuecat.ts` and is used directly by `Paywall.tsx` — it needs a
// specific package (monthly/annual) to buy, which this module has no notion of.
