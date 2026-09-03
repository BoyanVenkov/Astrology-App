import type { ScreenKey } from '../en/screens'

/** Français — textes des écrans secondaires. */
export const screens: Record<ScreenKey, string> = {
  /* ---- ciel local / ancrage ---- */
  'geo.ground.scarce':
    'La lumière du jour se fait rare — sors un moment vers midi, mange quelque chose de chaud, et autorise-toi à dormir tôt.',
  'geo.ground.long':
    'La lumière longue étire la journée — cherche l’ombre et de l’eau fraîche à midi, et protège ta chambre du soleil tardif.',
  'geo.ground.spring':
    'La lumière revient — déplace ta pratique vers le matin et laisse l’énergie monter.',
  'geo.ground.summer':
    'Lumière au maximum — garde un rythme doux, hydrate-toi, et ancre-toi pieds nus sur la terre ou l’herbe.',
  'geo.ground.autumn':
    'La lumière se retire — privilégie des pratiques plus lentes et réchauffantes et une fin de journée plus tôt.',
  'geo.ground.winter':
    'La moitié sombre — le repos est productif maintenant ; garde les pratiques courtes, réparatrices et à la bougie.',
  'geo.season.spring': 'Printemps',
  'geo.season.summer': 'Été',
  'geo.season.autumn': 'Automne',
  'geo.season.winter': 'Hiver',

  /* ---- horoscope rapide ---- */
  'scr.quick.eyebrow': 'Horoscope du jour',
  'scr.quick.you': 'Toi',
  'scr.quick.moon': 'Lune',
  'scr.quick.readFull': 'Le lire en entier →',
  'scr.quick.fullPro': 'La lecture complète · Pro →',

  /* ---- horoscope complet ---- */
  'scr.horo.eyebrow': 'Horoscope Quotidien',
  'scr.horo.addBirth': 'Ajouter les données de naissance →',
  'scr.horo.moonHead': 'La Lune',
  'scr.horo.skyHead': 'Le ciel au-dessus de toi',
  'scr.horo.risingNow': '{sign} se lève sur toi en ce moment même.',
  'scr.horo.transitingHouse': '{planet} transite ta {ord} maison.',
  'scr.horo.addPlace': 'Ajoute un lieu de naissance, ou partage ta position dans les Réglages →',
  'scr.horo.practiceHead': 'Pratique du jour',
  'scr.horo.geoLine': '{season} · soleil {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h de lumière',
  'scr.horo.birthPlace': ' · j’utilise ton lieu de naissance',

  /* ---- transits ---- */
  'scr.transits.eyebrow': 'Le Ciel',
  'scr.transits.titleNatal': 'Transits à ton thème',
  'scr.transits.titleSky': 'Le ciel du jour',
  'scr.transits.addChart': 'Ajouter le thème',
  'scr.transits.nowHead': 'En ce moment, au-dessus de toi',
  'scr.transits.rising': '{sign} se lève',
  'scr.transits.movingHouse': '{planet} traverse ta {ord} maison — {arena}.',
  'scr.transits.sunMoon': 'Soleil {sunrise}–{sunset} · Lune {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'lieu de naissance',
  'scr.transits.allInOrb': 'Chaque transit en orbe',
  'scr.transits.moonAspects': 'Les aspects de la Lune aujourd’hui',
  'scr.transits.natalPrefix': 'natal ',
  'scr.transits.nothingOrb': 'Rien en orbe aujourd’hui.',
  'scr.transits.applying': 'appliquant',
  'scr.transits.separating': 'séparant',
  'scr.transits.orbNote':
    '↑ encore en resserrement vers l’exact · ↓ en séparation. Les orbes plus serrées se sentent plus fort.',

  /* ---- journal ---- */
  'scr.journal.dayStreak': 'jours d’affilée',
  'scr.journal.practices': 'pratiques',
  'scr.journal.minutes': 'minutes',
  'scr.journal.last4w': '4 dernières semaines',
  'scr.journal.lastNDays': '{n} derniers jours',
  'scr.journal.reasonHistory': 'Historique de journal illimité',
  'scr.journal.fullHistory': 'historique complet →',
  'scr.journal.gridNote': 'Remplissage = minutes pratiquées · anneau = humeur notée',
  'scr.journal.recent': 'Pratique récente',
  'scr.journal.noSessions': 'Aucune séance pour l’instant — lance-en une depuis le tableau de bord.',
  'scr.journal.endedEarly': ' · terminée plus tôt',
  'scr.journal.min': '{n} min',

  /* ---- rituel (exécution de la pratique) ---- */
  'scr.ritual.attuning': 'Accord avec le ciel…',
  'scr.ritual.back': 'Retour',
  'scr.ritual.todaysPractice': 'Pratique du jour',
  'scr.ritual.fromLibrary': 'Depuis la bibliothèque',
  'scr.ritual.focusAlignment': 'Alignement de {chakra}',
  'scr.ritual.chakraBlurb': 'Une séance guidée façonnée par {planet} et ton thème.',
  'scr.ritual.freqBlurb':
    '{intention}. Assieds-toi, adoucis-toi, et laisse la tonalité porter la séance.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Tonalité',
  'scr.ritual.journeyNote':
    '{n} rondes, à ton rythme — environ 12 minutes. L’écran guide chaque phase.',
  'scr.ritual.length': 'Durée',
  'scr.ritual.sound': 'Son',
  'scr.ritual.sound.tone': 'Tonalité',
  'scr.ritual.sound.music': 'Musique',
  'scr.ritual.sound.silent': 'Bols seuls',
  'scr.ritual.soundTone': 'La tonalité de fréquence de {hz} Hz joue sous les bols.',
  'scr.ritual.soundMusic': 'Un accord d’ambiance doux et lent sous les bols.',
  'scr.ritual.soundSilent': 'Seulement les bols chantants qui marquent chaque étape.',
  'scr.ritual.spokenGuidance': 'Guidance parlée',
  'scr.ritual.notAvailable': 'indisponible ici — les mots s’affichent à l’écran',
  'scr.ritual.beginPractice': 'Commencer la pratique',
  'scr.ritual.notNow': 'Pas maintenant',
  'scr.ritual.endSession': '‹ Terminer la séance',
  'scr.ritual.complete': 'Pratique terminée',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': 'Série de {n} jours',
  'scr.ritual.firstLogged': 'Première pratique enregistrée',
  'scr.ritual.howNow': 'Comment te sens-tu maintenant ?',
  'scr.ritual.done': 'Terminé',

  /* ---- bilan d’humeur ---- */
  'scr.moodci.default': 'Comment te sens-tu ?',
  'scr.moodci.logged': 'Noté ✦',
  'scr.moodci.logThis': 'Noter ceci',
  'scr.moodci.eyebrow': 'Bilan du soir',
  'scr.moodci.blurb': 'Un tap. Ça façonne l’aura de demain et l’évolution de ton humeur.',
  'scr.moodci.noteLabel': 'Note (facultative)',
  'scr.moodci.notePlaceholder': 'Tout ce que tu as en tête…',
  'scr.moodci.update': 'Mettre à jour le bilan',
  'scr.moodci.save': 'Enregistrer le bilan',

  /* ---- thème natal ---- */
  'scr.natal.eyebrow': 'Thème Natal',
  'scr.natal.title': 'Le ciel de ta naissance',
  'scr.natal.blurb':
    'Ajoute ta date, ton heure et ton lieu de naissance et Resonance dessinera ton thème natal — la position exacte du Soleil, de la Lune et des planètes au moment de ta naissance.',
  'scr.natal.addDetails': 'Ajouter les données de naissance',
  'scr.natal.edit': 'modifier',
  'scr.natal.timeUnknown': 'heure inconnue (midi)',
  'scr.natal.angleLine': '{asc} ascendant · MC {mc} · {system}',
  'scr.natal.placidus': 'maisons de Placidus',
  'scr.natal.wholeSign': 'maisons en signe entier',
  'scr.natal.addPlace': 'Ajoute ton lieu de naissance pour l’Ascendant et les maisons →',
  'scr.natal.wheelAria': 'Roue du thème natal',
  'scr.natal.placements': 'Positions',
  'scr.natal.aspects': 'Aspects natals',
  'scr.natal.noAspects': 'Aucun aspect majeur en orbe.',
  'scr.natal.house': 'M{n}',

  /* ---- apothicairerie ---- */
  'scr.apoth.eyebrow': 'Apothicairerie',
  'scr.apoth.title': 'Compagnons de cristal',
  'scr.apoth.subChart': 'Pierres pour le travail de {chakra} aujourd’hui · {n} dans l’armoire',
  'scr.apoth.subPlain': '{n} pierres dans l’armoire',
  'scr.apoth.all': 'Toutes',
  'scr.apoth.today': 'Aujourd’hui',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Aucune pierre classée sous {filter}.',
  'scr.apoth.noneThat': 'cette catégorie',
  'scr.apoth.pair': 'associe une pierre à la pratique du jour →',

  /* ---- écran de la Lune ---- */
  'scr.moon.eyebrow': 'Le Ciel',
  'scr.moon.title': 'La Lune',
  'scr.moon.sub': '{phase} · {pct} % éclairée',
  'scr.moon.whereShe': 'Où elle est',
  'scr.moon.inSign': 'La Lune est en {sign} — {note}.',
  'scr.moon.vocUntil':
    'Hors course jusqu’à son entrée en {sign}{time} — une mauvaise fenêtre pour commencer quelque chose de neuf. Ancre-toi et boucle les fils en suspens à la place.',
  'scr.moon.vocAt': ' à {time}',
  'scr.moon.vocSoon': 'Passe hors course dans {hours} h.',
  'scr.moon.notVoc': 'Pas hors course — la Lune fait des aspects nets.',
  'scr.moon.comingUp': 'À venir',

  /* ---- notifications locales ---- */
  'notif.daily.title': 'Ta lecture est prête',
  'notif.daily.body': 'Le transit, le focus de chakra et la pratique du jour t’attendent.',
  'notif.evening.title': 'Ralentis',
  'notif.evening.body': 'Quelques souffles et un bilan d’humeur avant de dormir.',
  'notif.newMoon.title': 'Nouvelle Lune ce soir',
  'notif.newMoon.body': 'Un reset tranquille — fixe une intention et garde-la pour toi.',
  'notif.fullMoon.title': 'Pleine Lune ce soir',
  'notif.fullMoon.body': 'Les sentiments brillent fort. Remarque ce qui remonte à la surface.',
  'notif.moonSign.title': 'La Lune entre en {sign}',
  'notif.moonSign.body':
    'La météo émotionnelle change — un bon moment pour ancrer ton énergie.',
  'notif.voc.title': 'La Lune va passer hors course',
  'notif.voc.body':
    'Le hors course commence dans 15 minutes. Ancre ton énergie — repose-toi, ne commence pas.',

  /* ---- bannière Lune hors course ---- */
  'scr.voc.active': 'Lune hors course — ancre-toi, ne commence pas. Se termine à {time}.',
  'scr.voc.activeSoon': 'Lune hors course — ancre-toi, ne commence pas. Se termine bientôt.',
  'scr.voc.upcoming': 'La Lune passe hors course dans {hours} h.',
  'scr.voc.twoMin': '2 min',

  /* ---- hub du ciel : résumé du champ des chakras ---- */
  'scr.field.summary.join': ' et ',
  'scr.field.summary.pressure': '{names} sous pression',
  'scr.field.summary.open': '{names} grand ouverts',
  'scr.field.summary.carries': '{name} porte le jour',
  'scr.field.summary.settled': 'Un champ apaisé',

  /* ---- fiche et guide du jeûne ---- */
  'scr.fast.eyebrow': 'Jeûne',
  'scr.fast.phase.waxing': 'lune croissante',
  'scr.fast.phase.waning': 'lune décroissante',
  'scr.fast.cardMeta': '{special} · jour lunaire {day} · Lune en {sign}',
  'scr.fast.bestToday': 'Meilleur type aujourd’hui :',
  'scr.fast.betterDays': 'De meilleurs jours arrivent',
  'scr.fast.waningWindow': 'Fenêtre décroissante',
  'scr.fast.cardDisclaimer':
    'Guidance lunaire traditionnelle, pas un avis médical. Si tu as une condition de santé ou une histoire avec la nourriture, saute le jeûne et mange simplement plus léger.',
  'scr.fast.fiveKinds': 'Les cinq types et les jours à venir →',
  'scr.fast.less': 'Moins',
  'scr.fast.howHold': 'Comment le tenir',
  'scr.fast.guideSubSpecial': '{special} · Lune en {sign}',
  'scr.fast.guideSubPhase': '{phase} · jour lunaire {day}',
  'scr.fast.today': 'Aujourd’hui',
  'scr.fast.skyBacks': 'Le ciel soutient → {method}',
  'scr.fast.whichKind': 'Quel type',
  'scr.fast.whichKindBlurb':
    'Cinq façons de tenir un jeûne, la plus douce d’abord — chacune évaluée pour la Lune du jour. Touche-en une pour l’ouvrir.',
  'scr.fast.holdingWell': 'Bien le tenir',
  'scr.fast.hold1':
    'Bois pendant le jeûne — eau, tisane, café noir. Une pincée de sel aide sur les plus longs.',
  'scr.fast.hold2':
    'Romps en douceur : d’abord de l’eau tiède, puis quelque chose de petit et cuit. Évite le grand repas tout de suite.',
  'scr.fast.hold3':
    'Bouge lentement, dors plus, et arrête-toi dès l’instant où ton corps dit stop.',
  'scr.fast.guideDisclaimer':
    'Guidance lunaire traditionnelle, pas un avis médical. Le jeûne sec — sans eau — comporte un risque réel et n’est jamais quelque chose que le ciel « recommande » ; ce guide suppose que tu bois. Si tu es enceinte, sous traitement, diabétique, en sous-poids, ou si tu as une histoire avec la nourriture, saute le jeûne et mange simplement plus léger.',
}
