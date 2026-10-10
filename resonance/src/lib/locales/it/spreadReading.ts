import type { SpreadReadingKey } from '../en/spreadReading'

/** Italiano — sintesi della stesa completa di tarocchi. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': "Leggere l'intera stesa",
  'sp.throughline': 'Questa lettura pende verso {dominant}. {tone}',
  'sp.dominant.major': 'grandi svolte segnate dal destino',
  'sp.dominant.wands': 'azione e slancio',
  'sp.dominant.cups': 'sentimento e connessione',
  'sp.dominant.swords': 'pensiero, verità e conflitto',
  'sp.dominant.pentacles': 'il pratico e il materiale',
  'sp.tone.rising':
    'Le carte pendono a tuo favore qui — si apre più di quanto resista.',
  'sp.tone.testing':
    "Questa stesa ti sta chiedendo qualcosa. C'è più attrito che flusso adesso, ma è un attrito che vale la pena affrontare.",
  'sp.tone.mixed':
    "Una mano davvero mista — un sostegno reale sta proprio accanto a una resistenza reale. Qui niente è semplice, ed è onesto così.",
  'sp.tone.steady':
    "Una mano tranquilla ed equilibrata. Nessuna spinta forte in una direzione o nell'altra — qui si tratta di stabilità, non di dramma.",
  'sp.three.arc':
    'È iniziata con {past}, ti incontra ora a {present}, e si muove verso {future}.',
  'sp.cross.aligned':
    'Ciò che ti mette alla prova qui in realtà lavora insieme al cuore della questione, non contro di esso.',
  'sp.cross.opposed':
    'Ciò che ti mette alla prova qui tira contro il cuore della questione — aspettati una vera tensione prima che si risolva.',
  'sp.cross.neutral':
    'La sfida e il cuore della questione stanno fianco a fianco, senza aiutarsi né danneggiarsi.',
}
