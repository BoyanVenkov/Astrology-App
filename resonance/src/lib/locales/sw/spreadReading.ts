import type { SpreadReadingKey } from '../en/spreadReading'

/** Kiswahili — muhtasari wa mchoro mzima wa tarot. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Kusoma mchoro mzima',
  'sp.throughline': 'Usomaji huu unaelekea {dominant}. {tone}',
  'sp.dominant.major': 'mageuzi makubwa ya hatima',
  'sp.dominant.wands': 'kitendo na kasi',
  'sp.dominant.cups': 'hisia na uhusiano',
  'sp.dominant.swords': 'fikra, ukweli na mgogoro',
  'sp.dominant.pentacles': 'mambo ya vitendo na kimwili',
  'sp.tone.rising':
    'Karata zinaelekea upande wako hapa — mengi yanafunguka kuliko yanayopinga.',
  'sp.tone.testing':
    'Mchoro huu unakuomba kitu. Sasa hivi kuna msuguano zaidi kuliko mtiririko, lakini ni msuguano unaofaa kukabiliana nao.',
  'sp.tone.mixed':
    'Mkono uliochanganyika kweli kweli — msaada halisi upo karibu kabisa na upinzani halisi. Hakuna kitu rahisi hapa, na hiyo ni kweli.',
  'sp.tone.steady':
    'Mkono tulivu, ulio sawa. Hakuna msukumo mkali upande wowote — hii inahusu uthabiti, si mchezo wa kuigiza.',
  'sp.three.arc':
    'Ilianza na {past}, inakutana nawe sasa kwenye {present}, na inaelekea {future}.',
  'sp.cross.aligned':
    'Kinachokupa changamoto hapa kwa kweli kinafanya kazi pamoja na kiini cha jambo, si dhidi yake.',
  'sp.cross.opposed':
    'Kinachokupa changamoto hapa kinavuta dhidi ya kiini cha jambo — tarajia mvutano wa kweli kabla hili halijatatuliwa.',
  'sp.cross.neutral':
    'Changamoto na kiini cha jambo vipo bega kwa bega, bila kusaidiana wala kudhuriana.',
}
