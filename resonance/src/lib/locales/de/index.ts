import type { MessageKey } from '../en'
import { chrome } from './chrome'
import { astro } from './astro'
import { mantra } from './mantra'
import { practice } from './practice'
import { meditation } from './meditation'
import { crystals } from './crystals'
import { reading } from './reading'
import { tarot } from './tarot'
import { screens } from './screens'

/**
 * Deutsch. Every module is a complete `Record<…Key, string>`, so a missing
 * translation is a compile error. `{name}` placeholders are filled by
 * `translate()` in `lib/i18n`.
 */
export const de: Partial<Record<MessageKey, string>> = {
  ...chrome,
  ...astro,
  ...mantra,
  ...practice,
  ...meditation,
  ...crystals,
  ...reading,
  ...tarot,
  ...screens,
}
