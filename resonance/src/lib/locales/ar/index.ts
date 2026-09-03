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
 * العربية (من اليمين إلى اليسار). كل وحدة هي `Record<…Key, string>` كاملة، فأي
 * ترجمة ناقصة تُسبّب خطأ تجميع. عناصر `{name}` تُملأ عبر `translate()` في `lib/i18n`.
 */
export const ar: Partial<Record<MessageKey, string>> = {
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
