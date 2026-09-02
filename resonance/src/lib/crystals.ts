import type { Crystal } from '../types/resonance'
import { type TFn } from './i18n'
import type { MessageKey } from './locales/en'

/**
 * Localised display for the crystal catalogue. The `Crystal` objects keep
 * their English `name` (used as the stable key); the name, keyword tags and
 * description shown to the user are resolved from the `crystal.*` catalogue.
 */

const slug = (v: string): string =>
  v
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const crystalName = (name: string, t: TFn): string =>
  t(`crystal.${slug(name)}.n` as MessageKey)

export const crystalDesc = (c: Crystal, t: TFn): string =>
  t(`crystal.${slug(c.name)}.d` as MessageKey)

export const crystalKeywords = (c: Crystal, t: TFn): string[] =>
  t(`crystal.${slug(c.name)}.k` as MessageKey)
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
