import type { SpreadReadingKey } from '../en/spreadReading'

/** Español — síntesis de la tirada completa de tarot. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Leyendo la tirada completa',
  'sp.throughline': 'Esta lectura se inclina hacia {dominant}. {tone}',
  'sp.dominant.major': 'grandes giros marcados por el destino',
  'sp.dominant.wands': 'acción e impulso',
  'sp.dominant.cups': 'sentimiento y conexión',
  'sp.dominant.swords': 'pensamiento, verdad y conflicto',
  'sp.dominant.pentacles': 'lo práctico y lo material',
  'sp.tone.rising':
    'Las cartas se inclinan a tu favor aquí — se abre más de lo que se resiste.',
  'sp.tone.testing':
    'Esta tirada te está pidiendo algo. Ahora hay más fricción que fluidez, pero es una fricción que vale la pena afrontar.',
  'sp.tone.mixed':
    'Una mano genuinamente mixta — el apoyo real está justo al lado de la resistencia real. Nada aquí es simple, y eso es honesto.',
  'sp.tone.steady':
    'Una mano tranquila y equilibrada. Sin un empuje fuerte en ninguna dirección — esto trata de estabilidad, no de drama.',
  'sp.three.arc':
    'Comenzó con {past}, te encuentra ahora en {present}, y se dirige hacia {future}.',
  'sp.cross.aligned':
    'Lo que te desafía aquí en realidad trabaja junto al corazón del asunto, no en su contra.',
  'sp.cross.opposed':
    'Lo que te desafía aquí tira en contra del corazón del asunto — espera tensión real antes de que esto se resuelva.',
  'sp.cross.neutral':
    'El desafío y el corazón del asunto están uno junto al otro, sin ayudarse ni perjudicarse.',
}
