import type { MeditationKey } from '../en/meditation'

/** Français — méditations guidées : un récapitulatif à lire une fois, puis des étapes marquées par un bol. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'la base de la colonne, là où tu rencontres le sol',
  'med.seat.sacral': 'le bas-ventre, une paume sous le nombril',
  'med.seat.solar-plexus': 'le point tendre sous les côtes',
  'med.seat.heart': 'le centre de la poitrine',
  'med.seat.throat': 'le creux de la gorge',
  'med.seat.third-eye': 'l’espace entre les sourcils',
  'med.seat.crown': 'le sommet de la tête, et un peu au-dessus',
  'med.chakraLower': 'le centre {chakra}',

  'med.house.1': 'la façon dont tu te présentes et dont tu rencontres le monde',
  'med.house.2': 'ce à quoi tu tiens et ce qui te stabilise',
  'med.house.3': 'ton esprit quotidien et les mots que tu emploies',
  'med.house.4': 'le foyer, les racines, et là où tu te sens soutenu',
  'med.house.5': 'le jeu, la créativité, et ce qui te donne de la joie',
  'med.house.6': 'le travail quotidien de prendre soin de toi',
  'med.house.7': 'les personnes les plus proches de toi',
  'med.house.8': 'ce qui se termine, et ce que tu partages en profondeur',
  'med.house.9': 'le sens, et la vision d’ensemble',
  'med.house.10': 'ton travail dans le monde et la façon dont on te voit',
  'med.house.11': 'tes gens, et ce vers quoi tu tends',
  'med.house.12': 'le repos, la solitude, et le calme sous toute chose',

  'med.invite.Sun': 'Laisse une chaleur stable se rassembler ici — ta propre lumière, sans détour.',
  'med.invite.Moon': 'Laisse ce que tu ressens simplement être ici, sans besoin de le régler.',
  'med.invite.Mercury': 'Laisse la pensée ralentir. Tu n’as rien à résoudre maintenant.',
  'med.invite.Venus': 'Adoucis-toi envers toi-même comme tu le ferais envers quelqu’un que tu aimes.',
  'med.invite.Mars': 'Remarque toute chaleur ou urgence, et laisse l’expiration en emporter une part.',
  'med.invite.Jupiter': 'Laisse cet espace se sentir un peu plus vaste qu’il y a un instant.',
  'med.invite.Saturn': 'Rencontre le poids ici avec honnêteté. Tu peux en porter plus que tu ne le penses.',
  'med.invite.Uranus': 'Laisse quelque chose se relâcher — une prise, une vieille forme qui ne te sert plus.',
  'med.invite.Neptune': 'Laisse les contours s’estomper. Tu as le droit de ne pas savoir pendant un moment.',
  'med.invite.Pluto': 'Laisse ce qui est fini être fini. Respire dans l’espace que cela laisse.',
  'med.invite.default': 'Laisse cette énergie se mouvoir à travers toi, pas en toi.',

  'med.ease.hard': 'Il y a du frottement dans {dominant} aujourd’hui. Tu n’es pas là pour forcer le passage — seulement pour le sentir clairement et rester souple autour.',
  'med.ease.soft': '{dominant} coule aujourd’hui. Remarque l’aisance, et permets-toi de la recevoir.',
  'med.ease.neutral': '{dominant} est intense aujourd’hui. Laisse-le te traverser au lieu de se loger dans le corps.',

  'med.dominant.aspect': '{planet} {verb} ton {other} natal',
  'med.dominant.sign': '{planet} en transit dans {sign}',
  'med.dominant.chartWord': 'thème',
  'med.domverb.conjunction': 'qui rencontre',
  'med.domverb.opposition': 'en opposition à',
  'med.domverb.square': 'en carré avec',
  'med.domverb.trine': 'en trigone avec',
  'med.domverb.sextile': 'en sextile avec',

  'med.houseLine.known': 'Cela touche la partie de ta vie qui concerne {theme}. Tiens-le avec légèreté. Il n’y a rien à décider ici — seulement à remarquer.',
  'med.houseLine.unknown': 'Quoi que cela remue dans ta vie, laisse-le se poser le temps de cette pratique. Ce sera encore là quand tu finiras, et tu le rencontreras avec plus d’espace.',

  'med.mantraLong.root': 'Je suis en sécurité. Je suis ici. J’ai ce qu’il me faut.',
  'med.mantraLong.sacral': 'Je laisse la vie se mouvoir à travers moi.',
  'med.mantraLong.solar-plexus': 'Je fais confiance à mon feu.',
  'med.mantraLong.heart': 'Je donne et je reçois de l’amour librement.',
  'med.mantraLong.throat': 'Je dis ma vérité avec aisance.',
  'med.mantraLong.third-eye': 'Je fais confiance à ce que je vois en moi.',
  'med.mantraLong.crown': 'Je fais partie de quelque chose de vaste, et cela me porte.',

  'med.title.fallback': 'méditation du centre {chakra}',

  /* ---- le récapitulatif, à lire une fois avant de commencer ---- */
  'med.brief.lead': 'Lis ceci une fois, puis ferme les yeux. Chaque étape s’ouvre par un bol — reste avec elle jusqu’au suivant.',
  'med.brief.close': 'Trois bols doux terminent la pratique. Reviens à ton rythme.',

  /* ---- étapes génériques ---- */
  'med.step.settle': 'Yeux fermés. Laisse le corps se poser et le souffle ralentir de lui-même.',
  'med.step.breath': 'Pose ton attention sur le souffle — suis-le à l’entrée, suis-le à la sortie. Quand l’esprit s’égare, ce constat est la pratique. Reviens, doucement.',
  'med.step.centre': 'Porte ton attention vers {seat}. Respire comme si le souffle lui-même atteignait le {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'En silence, au rythme du souffle : {affirmation}',
  'med.step.close': 'Laisse la pratique partir. Remarque comment tu te sens maintenant, avant d’ouvrir les yeux.',

  /* ---- conscience du souffle ---- */
  'med.step.ba.count': 'Maintenant compte chaque expiration — de un à dix, puis recommence. Si tu perds le compte, repars simplement à un. Personne ne tient les scores.',

  /* ---- scan du corps ---- */
  'med.step.scan.0': 'Balaie ton attention lentement depuis la plante des pieds vers le haut — chevilles, jambes, hanches, ventre, dos, poitrine, bras, mains. Reste quelques souffles là où tu rencontres une tension, et laisse-la s’adoucir.',
  'med.step.scan.1': 'Maintenant les épaules, la gorge, la mâchoire, l’espace autour des yeux, le cuir chevelu. Puis sens tout le corps d’un coup — lourd, chaud, respirant tout seul.',

  /* ---- bienveillance ---- */
  'med.step.metta.0': 'Amène-toi à l’esprit, tel que tu es aujourd’hui. En silence, offre : que je sois en sécurité, que je sois bien, que je sois en paix. Répète-le lentement et permets-toi de le penser vraiment.',
  'med.step.metta.1': 'Amène à l’esprit quelqu’un que tu aimes facilement. Imagine son visage et offre-lui la même chose : que tu sois en sécurité, que tu sois bien, que tu sois en paix.',
  'med.step.metta.2': 'Maintenant élargis — quelqu’un que tu connais à peine, quelqu’un que tu trouves difficile, puis tout le monde, partout : que tous les êtres soient en sécurité, que tous les êtres soient en paix.',

  /* ---- bain de son ---- */
  'med.step.bath.0': 'Laisse le son passer au premier plan. Tu n’écoutes pas avec effort — tu laisses le son arriver, comme la lumière arrive.',
  'med.step.bath.1': 'Remarque à quel endroit du corps le son semble se poser — la poitrine, le crâne, les mains. Laisse l’espace entre toi et le son se dissoudre.',

  /* ---- gratitude ---- */
  'med.step.grat.0': 'Amène à l’esprit une chose du dernier jour qui s’est bien passée, si petite soit-elle. Ne te contente pas de la nommer — sens où la gratitude se pose dans le corps.',
  'med.step.grat.1': 'Maintenant quelque chose que tu tiens d’habitude pour acquis — un corps qui fonctionne, un toit, quelqu’un qui est resté. Reste-y quelques souffles.',
  'med.step.grat.2': 'Une de plus — quelque chose sur toi. Une façon dont tu as été présent, une chose que tu as gérée, un effort que personne n’a vu. Tiens les trois ensemble.',

  /* ---- lieu sûr ---- */
  'med.step.safe.0': 'Imagine un lieu où tu te sens complètement en sécurité — réel ou imaginé. Regarde-le lentement : la lumière, l’heure du jour, ce que tu entends, ce que tu sens contre la peau.',
  'med.step.safe.1': 'Trouve l’endroit ici où tu voudrais le plus te reposer, et vas-y. Rien ne t’est demandé. Rien ne t’atteint que tu ne permettes.',

  /* ---- montagne ---- */
  'med.step.mtn.0': 'Imagine une montagne — sa large base, ses flancs solides, son sommet immobile. Laisse ton corps et la montagne devenir la même forme : l’assise comme base, la colonne comme versant, la tête comme sommet.',
  'med.step.mtn.1': 'Le temps va et vient autour de la montagne — lumière, nuage, vent, tempête. Tes pensées et tes humeurs sont le temps. La montagne ne discute pas avec lui, et il ne la diminue pas.',

  /* ---- conscience ouverte ---- */
  'med.step.open.0': 'Laisse partir l’ancre du souffle. Laisse l’attention grande ouverte, sur rien en particulier. Sons, sensations, pensées surgissent et passent — tu ne les poursuis pas et tu ne les repousses pas.',
  'med.step.open.1': 'Remarque que la conscience elle-même ne bouge pas. Les choses se produisent en elle, comme les nuages se produisent dans le ciel. Repose comme ce ciel — rien à ajouter, rien à retirer.',

  /* ---- intention du matin ---- */
  'med.step.morn.0': 'Trois souffles plus amples, un peu plus profonds que d’habitude — laisse-les réveiller le corps de l’intérieur. Roule les épaules en arrière une fois et sens l’avant du corps s’ouvrir.',
  'med.step.morn.1': 'Amène la journée à venir à l’esprit, sans serrer, puis choisis une intention — pas une tâche, une manière d’être. Patient. Honnête. Courageux. Bienveillant. Dis-le une fois : aujourd’hui, je serai ___.',

  /* ---- relâchement du soir ---- */
  'med.step.eve.0': 'Laisse la journée défiler légèrement, comme le paysage par la fenêtre d’un train — matin, midi, soir. Ne t’arrête sur rien. Si un moment tire, note-le et dis : pas maintenant.',
  'med.step.eve.1': 'Trouve un moment dont tu es content qu’il soit arrivé, et une chose que tu as faite aussi bien que possible. Que cela suffise. Maintenant laisse partir la journée entière — elle est complète simplement parce qu’elle est finie.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Allonge-toi complètement immobile — plus immobile qu’il ne paraît naturel, seul le souffle bouge. Pose une brève intention, une seule phrase calme au présent. Dis-la intérieurement trois fois.',
  'med.step.nidra.1': 'Porte l’attention à chaque endroit à mesure qu’il est nommé, sans bouger — main droite : pouce, doigts, paume, poignet, avant-bras, coude, épaule. Puis la même chose à gauche.',
  'med.step.nidra.2': 'Les deux hanches. Jambe droite — cuisse, genou, tibia, cheville, pied, orteils. Jambe gauche pareil. Tout le dos contre le sol, le ventre qui monte et descend, la poitrine, la gorge.',
  'med.step.nidra.3': 'Le visage — mâchoire, lèvres, nez, joues, yeux, l’espace entre les sourcils, le cuir chevelu. Maintenant tout le corps d’un coup, luisant faiblement, tenu par le sol. Reviens à ton intention.',
}
