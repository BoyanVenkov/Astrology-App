import type { OracleKey } from '../en/oracle'

/** Français — l'écran « Horoscope IA » (Pro). */
export const oracle: Record<OracleKey, string> = {
  'oracle.eyebrow': 'Horoscope IA',
  'oracle.title': 'Ton horoscope, écrit par l’IA — rien que pour toi',
  'oracle.blurb':
    'Pas un horoscope générique — Claude lit les transits du jour par rapport à ton propre thème et te dit ce qu’ils signifient vraiment pour toi aujourd’hui.',
  'oracle.teaserSample1':
    '« Mercure en opposition à ta Lune avive de vieilles disputes aujourd’hui — ce n’est pas le jour pour les relancer. »',
  'oracle.teaserSample2':
    '« Vénus qui entre dans ta quatrième maison adoucit une question domestique que tu évites. »',
  'oracle.unlock': 'Débloquer l’Horoscope IA',
  'oracle.reason': 'Horoscope IA',
  'oracle.consult': 'Obtenir mon horoscope IA',
  'oracle.consultAgain': 'Redemander',
  'oracle.loading': 'Lecture du ciel pour toi…',
  'oracle.remaining': '{n} lectures restantes aujourd’hui',
  'oracle.remainingOne': '1 lecture restante aujourd’hui',
  'oracle.noneLeft': 'Tu as utilisé tes lectures du jour — reviens demain',
  'oracle.errorGeneric': 'L’Oracle est silencieux pour l’instant — réessaie dans un moment.',
  'oracle.generatedAt': 'Lu à {time}',
  'oracle.addBirth': 'Ajoute tes informations de naissance pour une lecture entièrement personnelle →',
}
