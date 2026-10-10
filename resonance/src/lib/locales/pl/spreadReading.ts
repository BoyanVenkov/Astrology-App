import type { SpreadReadingKey } from '../en/spreadReading'

/** Polski — synteza całego układu tarota. needs native review, like other pl modules. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Odczytanie całego układu',
  'sp.throughline': 'Ten odczyt skłania się ku {dominant}. {tone}',
  'sp.dominant.major': 'wielkie, przeznaczone zwroty losu',
  'sp.dominant.wands': 'działanie i rozpęd',
  'sp.dominant.cups': 'uczucie i więź',
  'sp.dominant.swords': 'myśl, prawda i konflikt',
  'sp.dominant.pentacles': 'to, co praktyczne i materialne',
  'sp.tone.rising':
    'Karty skłaniają się tutaj na twoją korzyść — więcej się otwiera, niż stawia opór.',
  'sp.tone.testing':
    'Ten układ czegoś od ciebie chce. Teraz jest więcej tarcia niż przepływu, ale to tarcie warte podjęcia.',
  'sp.tone.mixed':
    'Naprawdę mieszany układ — prawdziwe wsparcie stoi tuż obok prawdziwego oporu. Nic tu nie jest proste, i to jest szczere.',
  'sp.tone.steady':
    'Spokojny, wyrównany układ. Brak silnego impulsu w którąkolwiek stronę — chodzi tu o stabilność, nie dramat.',
  'sp.three.arc':
    'Zaczęło się od {past}, spotyka cię teraz przy {present}, i zmierza ku {future}.',
  'sp.cross.aligned':
    'To, co tu wyzywa, faktycznie współdziała z sednem sprawy, a nie przeciw niemu.',
  'sp.cross.opposed':
    'To, co tu wyzywa, ciągnie przeciw sednu sprawy — spodziewaj się prawdziwego napięcia, zanim to się rozwiąże.',
  'sp.cross.neutral':
    'Wyzwanie i sedno sprawy stoją obok siebie, nie pomagając sobie ani nie szkodząc.',
}
