import type { SpreadReadingKey } from '../en/spreadReading'

/** العربية (الفصحى) — قراءة شاملة للتوزيعة الكاملة من أوراق التاروت. needs native review. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'قراءة التوزيعة بأكملها',
  'sp.throughline': 'تميل هذه القراءة نحو {dominant}. {tone}',
  'sp.dominant.major': 'منعطفات كبرى مرتبطة بالقدر',
  'sp.dominant.wands': 'الفعل والزخم',
  'sp.dominant.cups': 'الشعور والتواصل',
  'sp.dominant.swords': 'الفكر والحقيقة والصراع',
  'sp.dominant.pentacles': 'الجانب العملي والمادي',
  'sp.tone.rising': 'تميل الأوراق هنا لصالحك — ينفتح أكثر مما يقاوم.',
  'sp.tone.testing':
    'تطلب منك هذه التوزيعة شيئًا. هناك احتكاك أكثر من الانسياب الآن، لكنه احتكاك يستحق المواجهة.',
  'sp.tone.mixed':
    'يد مختلطة حقًا — دعم حقيقي بجانب مقاومة حقيقية تمامًا. لا شيء هنا بسيط، وهذا صادق.',
  'sp.tone.steady':
    'يد هادئة ومتوازنة. لا دفعة قوية في أي اتجاه — الأمر هنا يتعلق بالثبات، لا بالدراما.',
  'sp.three.arc':
    'بدأ الأمر بـ{past}، ويلقاك الآن عند {present}، ويتجه نحو {future}.',
  'sp.cross.aligned':
    'ما يتحداك هنا يعمل في الواقع مع جوهر المسألة، لا ضده.',
  'sp.cross.opposed':
    'ما يتحداك هنا يشد عكس جوهر المسألة — توقع توترًا حقيقيًا قبل أن يُحل هذا.',
  'sp.cross.neutral':
    'يقف التحدي وجوهر المسألة جنبًا إلى جنب، دون أن يساعد أحدهما الآخر أو يؤذيه.',
}
