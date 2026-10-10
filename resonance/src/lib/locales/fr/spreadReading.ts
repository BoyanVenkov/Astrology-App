import type { SpreadReadingKey } from '../en/spreadReading'

/** Français — synthèse du tirage de tarot complet. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': "Lire le tirage dans son ensemble",
  'sp.throughline': 'Ce tirage penche vers {dominant}. {tone}',
  'sp.dominant.major': 'de grands tournants marqués par le destin',
  'sp.dominant.wands': "l'action et l'élan",
  'sp.dominant.cups': 'le ressenti et le lien',
  'sp.dominant.swords': 'la pensée, la vérité et le conflit',
  'sp.dominant.pentacles': 'le concret et le matériel',
  'sp.tone.rising':
    "Les cartes penchent en ta faveur ici — plus de choses s'ouvrent qu'elles ne résistent.",
  'sp.tone.testing':
    "Ce tirage te demande quelque chose. Il y a plus de friction que de fluidité en ce moment, mais une friction qui mérite d'être affrontée.",
  'sp.tone.mixed':
    "Une main vraiment mitigée — un vrai soutien se trouve juste à côté d'une vraie résistance. Rien n'est simple ici, et c'est honnête ainsi.",
  'sp.tone.steady':
    "Une main calme et équilibrée. Pas de forte poussée dans un sens ou dans l'autre — il s'agit ici de stabilité, pas de drame.",
  'sp.three.arc':
    'Tout a commencé avec {past}, te rejoint maintenant à {present}, et se dirige vers {future}.',
  'sp.cross.aligned':
    "Ce qui te met à l'épreuve ici travaille en réalité avec le cœur du sujet, pas contre lui.",
  'sp.cross.opposed':
    "Ce qui te met à l'épreuve ici tire contre le cœur du sujet — attends-toi à une vraie tension avant que cela ne se résolve.",
  'sp.cross.neutral':
    "Le défi et le cœur du sujet se trouvent côte à côte, sans s'aider ni se nuire.",
}
