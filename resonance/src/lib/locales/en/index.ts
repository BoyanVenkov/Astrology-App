import { chrome } from './chrome'
import { astro } from './astro'
import { practice } from './practice'
import { mantra } from './mantra'
import { meditation } from './meditation'
import { crystals } from './crystals'
import { reading } from './reading'
import { deepReading } from './deepReading'
import { tarot } from './tarot'
import { runes } from './runes'
import { rewards } from './rewards'
import { screens } from './screens'

/**
 * English is the source catalogue. Its keys are the type every other locale
 * must satisfy — a missing translation is a compile error.
 *
 * Keys read `area.thing`. `{name}` placeholders are filled by `translate()`.
 */
export const en = {
  ...chrome,
  ...astro,
  ...practice,
  ...mantra,
  ...meditation,
  ...crystals,
  ...reading,
  ...deepReading,
  ...tarot,
  ...runes,
  ...rewards,
  ...screens,
} as const

export type MessageKey = keyof typeof en
