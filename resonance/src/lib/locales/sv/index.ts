import type { MessageKey } from '../en'
import { chrome } from './chrome'
import { astro } from './astro'
import { mantra } from './mantra'
import { practice } from './practice'
import { meditation } from './meditation'
import { crystals } from './crystals'
import { reading } from './reading'
import { deepReading } from './deepReading'
import { tarot } from './tarot'
import { runes } from './runes'
import { rewards } from './rewards'
import { screens } from './screens'

/**
 * Svenska. Every module is a complete `Record<…Key, string>`, so a missing
 * translation is a compile error. `{name}` placeholders are filled by
 * `translate()` in `lib/i18n`.
 */
export const sv: Partial<Record<MessageKey, string>> = {
  ...chrome,
  ...astro,
  ...mantra,
  ...practice,
  ...meditation,
  ...crystals,
  ...reading,
  ...deepReading,
  ...tarot,
  ...runes,
  ...rewards,
  ...screens,
}
