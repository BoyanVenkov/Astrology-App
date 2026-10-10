import type { SpreadReadingKey } from '../en/spreadReading'

/** Português (BR) — síntese da tiragem completa de tarô. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Lendo a tiragem inteira',
  'sp.throughline': 'Esta leitura se inclina para {dominant}. {tone}',
  'sp.dominant.major': 'grandes reviravoltas marcadas pelo destino',
  'sp.dominant.wands': 'ação e impulso',
  'sp.dominant.cups': 'sentimento e conexão',
  'sp.dominant.swords': 'pensamento, verdade e conflito',
  'sp.dominant.pentacles': 'o prático e o material',
  'sp.tone.rising':
    'As cartas se inclinam a seu favor aqui — mais coisas estão se abrindo do que resistindo.',
  'sp.tone.testing':
    'Esta tiragem está pedindo algo. Há mais atrito do que fluxo agora, mas é um atrito que vale a pena enfrentar.',
  'sp.tone.mixed':
    'Uma combinação genuinamente mista — apoio real está bem ao lado de resistência real. Nada aqui é simples, e isso é honesto.',
  'sp.tone.steady':
    'Uma combinação tranquila e equilibrada. Sem um empurrão forte em nenhuma direção — isso é sobre estabilidade, não drama.',
  'sp.three.arc':
    'Começou com {past}, encontra você agora em {present}, e está se movendo para {future}.',
  'sp.cross.aligned':
    'O que está desafiando aqui na verdade trabalha junto com o cerne da questão, não contra ele.',
  'sp.cross.opposed':
    'O que está desafiando aqui puxa contra o cerne da questão — espere tensão real antes que isso se resolva.',
  'sp.cross.neutral':
    'O desafio e o cerne da questão ficam lado a lado, sem ajudar nem prejudicar um ao outro.',
}
