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
 * Polski. Każdy moduł to kompletny `Record<…Key, string>`, więc brak tłumaczenia
 * to błąd kompilacji. Symbole `{name}` są wypełniane przez `translate()` w `lib/i18n`.
 */
export const pl: Partial<Record<MessageKey, string>> = {
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
