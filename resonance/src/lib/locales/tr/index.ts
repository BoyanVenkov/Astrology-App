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
 * Türkçe. Her modül eksiksiz bir `Record<…Key, string>` olduğundan, eksik bir
 * çeviri derleme hatası verir. `{name}` yer tutucuları `lib/i18n` içindeki
 * `translate()` tarafından doldurulur.
 */
export const tr: Partial<Record<MessageKey, string>> = {
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
