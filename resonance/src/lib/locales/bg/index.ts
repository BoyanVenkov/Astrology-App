import type { MessageKey } from '../en'
import { chrome } from './chrome'
import { astro } from './astro'
import { mantra } from './mantra'
import { practice } from './practice'
import { reading } from './reading'
import { tarot } from './tarot'
import { screens } from './screens'

/**
 * Български. Modules that are fully translated are typed as complete
 * `Record`s; ones still in progress are `Partial` and fall back to English
 * key-by-key at runtime (see `translate()` in `lib/i18n`).
 */
export const bg: Partial<Record<MessageKey, string>> = {
  ...chrome,
  ...astro,
  ...mantra,
  ...practice,
  ...reading,
  ...tarot,
  ...screens,
}
