import type { DeepReadingKey } from '../en/deepReading'

/**
 * Français — la lecture profonde et longue : l'Horoscope Complet payant et la
 * revue détaillée de Compatibilité. Écrit pour se lire comme une page ou deux
 * d'un véritable astrologue.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- horoscope du jour (gratuit) : un peu plus de fond sur chaque note ---- */
  'horo.deep.q.house': 'Cela tombe dans le domaine de {theme}.',
  'horo.deep.q.hard': 'Avance prudemment sur ce point.',
  'horo.deep.q.soft': 'Mérite un petit pas délibéré.',
  'horo.deep.q.neutral': 'Laisse-le se poser avant d’agir.',
  'horo.deep.q.thread':
    'Le fil du jour revient sans cesse à ton {focus} — c’est là qu’il faut garder l’attention.',
  'scr.horo.weekHead': 'L’arc plus large',

  /* ============================ HOROSCOPE COMPLET ============================ */

  /* -- ce que signifie chaque planète quand elle est la force EN TRANSIT (en mouvement) -- */
  'dh.tr.Sun':
    'Le Soleil mène la journée : partout où il va, il braque un projecteur là pour environ un mois, réchauffe cette partie du thème et te demande de t’y présenter tel que tu es.',
  'dh.tr.Moon':
    'La Lune est le corps le plus rapide du ciel ; ses transits sont brefs mais ils fixent le ton émotionnel du jour et font remonter à la surface ce qu’ils touchent.',
  'dh.tr.Mercury':
    'Mercure gouverne la pensée, la parole et les petites décisions qui s’additionnent. Ses transits accélèrent le trafic d’informations autour d’un sujet — conversations, messages, paperasse, secondes pensées.',
  'dh.tr.Venus':
    'Vénus régit l’attraction, le confort, l’argent et le goût. Quand elle transite un point, elle adoucit le terrain là et fait venir plus facilement le lien, la dépense et le plaisir.',
  'dh.tr.Mars':
    'Mars, c’est l’élan et la chaleur à l’état brut. Ses transits allument un feu sous ce qu’ils touchent — tu obtiens plus de courage et plus de friction dans le même paquet, et l’envie d’agir avant d’avoir tout pensé.',
  'dh.tr.Jupiter':
    'Jupiter est la planète de la croissance et du « plus ». Elle amplifie ce qu’elle contacte — opportunité, confiance, appétit, et parfois excès — et elle tend à faire s’ouvrir plus grand la porte de ce domaine de vie pendant environ un an.',
  'dh.tr.Saturn':
    'Saturne, c’est le temps, la structure et la conséquence. Là où elle passe, elle ralentit les choses et demande si ce que tu as bâti là peut porter du poids ; ce qui le peut, elle le renforce, et ce qui ne le peut pas, elle le démonte en silence pour que tu le reconstruises comme il faut.',
  'dh.tr.Uranus':
    'Uranus est le perturbateur. Ses transits brisent un schéma devenu rance — souvent par une surprise, une agitation soudaine ou un changement que tu n’avais pas prévu — et te rendent une liberté que tu avais signé pour céder.',
  'dh.tr.Neptune':
    'Neptune dissout les bords. Là où elle transite, les contours s’adoucissent : plus d’imagination et de compassion, mais aussi plus de confusion, et une envie de fuir plutôt que d’affronter la chose directement.',
  'dh.tr.Pluto':
    'Pluton travaille sous terre et ne se presse pas. Ses transits apportent une transformation lente et complète à ce qu’ils touchent — luttes de pouvoir, fins, et un dépouillement jusqu’à ce qui est vraiment essentiel.',

  /* -- ce que gouverne ton point NATAL dans ton propre thème -- */
  'dh.na.Sun':
    'ton identité essentielle, ta vitalité et le sens de qui tu es quand tu es le plus toi-même',
  'dh.na.Moon':
    'tes instincts, tes humeurs et ce dont tu as besoin pour te sentir en sécurité et soutenu',
  'dh.na.Mercury':
    'comment tu penses, apprends, parles et prends les décisions de tous les jours',
  'dh.na.Venus':
    'comment tu aimes et es aimé, ce que tu trouves beau, et ta relation à l’argent et au plaisir',
  'dh.na.Mars':
    'ton élan, ta colère, ton désir, et comment tu vas chercher ce que tu veux',
  'dh.na.Jupiter':
    'où tu cherches le sens et la croissance, et ton sens naturel de la foi et du possible',
  'dh.na.Saturn':
    'ta relation à la discipline, à l’autorité et aux limites — l’endroit où tu as dû grandir à la dure',
  'dh.na.Uranus':
    'ton besoin d’être libre et de faire les choses à ta façon',
  'dh.na.Neptune':
    'ton imagination, ta spiritualité et les endroits où tu tends à idéaliser ou à te perdre',
  'dh.na.Pluto':
    'ta relation au pouvoir et au contrôle, et ce qui en toi est fait pour être transformé',

  /* -- la nature de chaque aspect (deux variantes, alternées par section) -- */
  'dh.asp.nat.conjunction.0':
    'Une conjonction est une fusion. Les deux forces occupent le même degré et agissent comme une seule, lançant un cycle neuf dans ce domaine de ta vie — une graine qu’on plante, pas une récolte qu’on ramasse.',
  'dh.asp.nat.conjunction.1':
    'Une conjonction fond les deux énergies si complètement qu’il est difficile de les distinguer. Elle marque un début ; ce qui prend forme maintenant se déploiera au fil des années qui suivent.',
  'dh.asp.nat.opposition.0':
    'Une opposition travaille par le miroir des autres et des circonstances extérieures. La tension est réelle, mais elle est là pour t’amener de la conscience — tu vois la question clairement parce que quelque chose lui fait face.',
  'dh.asp.nat.opposition.1':
    'Une opposition te tire entre deux pôles et te demande de tenir les deux plutôt que de t’effondrer dans l’un. L’équilibre ici n’est pas un compromis ; c’est un savoir-faire que tu construis sous pression.',
  'dh.asp.nat.square.0':
    'Un carré est un aspect de friction. Les deux énergies veulent des choses différentes et s’accrochent sans cesse l’une à l’autre, et l’inconfort est le but — c’est le grain qui force un vrai changement plutôt qu’un cosmétique.',
  'dh.asp.nat.square.1':
    'Un carré met un obstacle sur la route précisément là où tu préférerais ne pas avoir à en gérer un. Foncer droit devant marche rarement ; la sortie est en général de changer d’approche, pas de forcer davantage.',
  'dh.asp.nat.trine.0':
    'Un trigone est un canal ouvert. Les deux énergies coopèrent sans qu’on le leur demande, et le soutien coule vers toi ici — mais il ne t’atteint que si tu vas vraiment vers lui.',
  'dh.asp.nat.trine.1':
    'Un trigone rend ce domaine de vie facile et naturel pendant un temps. Le risque est la complaisance ; l’aisance que tu n’utilises pas tend à s’évaporer en silence.',
  'dh.asp.nat.sextile.0':
    'Un sextile est une opportunité qu’il faut accepter exprès. La porte est déverrouillée mais pas ouverte — une petite action délibérée maintenant transforme une possibilité en quelque chose de réel.',
  'dh.asp.nat.sextile.1':
    'Un sextile offre une ouverture utile dans cette partie de ta vie. Il récompense l’initiative et ne fait absolument rien pour l’attente.',

  /* -- courte tournure verbale pour l’ouverture de section -- */
  'dh.asp.verb.conjunction': 'rencontre et fusionne avec',
  'dh.asp.verb.opposition': 'tire contre',
  'dh.asp.verb.square': 'frotte contre',
  'dh.asp.verb.trine': 'coule vers',
  'dh.asp.verb.sextile': 'ouvre une porte vers',

  /* -- comment l’énergie s’exprime dans le signe où se trouve le point natal -- */
  'dh.sign.Aries':
    'rapide, directe et un peu combative, plus encline à agir qu’à attendre',
  'dh.sign.Taurus':
    'lente, sensuelle et têtue, résistante à la précipitation et lente à lâcher prise',
  'dh.sign.Gemini':
    'curieuse et verbale, prompte à relier les idées et prompte à s’agiter',
  'dh.sign.Cancer':
    'tendre et protectrice, se guidant au ressenti avant la logique',
  'dh.sign.Leo':
    'chaleureuse, expressive et fière, ayant besoin d’être vue pour se sentir réelle',
  'dh.sign.Virgo':
    'précise et pratique, la plus heureuse quand elle peut être vraiment utile',
  'dh.sign.Libra':
    'orientée vers l’équilibre, la justice et la bonne compagnie, et rétive à faire une scène',
  'dh.sign.Scorpio':
    'intense et secrète, tout ou rien, et attirée par ce qui est caché',
  'dh.sign.Sagittarius':
    'avide d’espace, de sens et d’une vue plus large, et impatiente avec les petits caractères',
  'dh.sign.Capricorn':
    'sérieuse et autodisciplinée, plus impressionnée par les résultats que par les promesses',
  'dh.sign.Aquarius':
    'indépendante et tournée vers l’avenir, pensant en systèmes plutôt qu’en sentiments',
  'dh.sign.Pisces':
    'rêveuse, perméable et compatissante, et facilement débordée',

  /* -- ce qu’un transit à travers chaque maison tend à remuer -- */
  'dh.house.1':
    'En maison I, le travail se voit sur toi — ton corps, ton image, la première impression que tu fais. C’est une bonne période pour redessiner ta façon de te présenter plutôt que de garder un contour qui ne te va plus.',
  'dh.house.2':
    'En maison II, cela touche l’argent, les ressources et l’estime de soi. La question extérieure est ce que tu gagnes et possèdes ; l’intérieure est ce que tu crois mériter.',
  'dh.house.3':
    'En maison III, cela remue l’esprit du quotidien — conversations, courts trajets, fratrie et voisins, l’interminable petit échange d’informations. Fais attention à ce que tu n’arrêtes pas de te dire.',
  'dh.house.4':
    'En maison IV, cela atteint les racines — foyer, famille, ton passé et la base privée où tu retournes. Quelque chose dans tes fondations est en train d’être examiné.',
  'dh.house.5':
    'En maison V, cela touche le jeu, la romance, la créativité et les choses que tu fais pour la joie de les faire. Cela demande où est passée ton étincelle et comment la retrouver.',
  'dh.house.6':
    'En maison VI, cela travaille par la routine, la santé et le labeur quotidien de te maintenir toi et ton travail en marche. Les petites habitudes pèsent plus que d’habitude en ce moment.',
  'dh.house.7':
    'En maison VII, le miroir, ce sont les autres — partenaires, proches, la personne en face de toi à table. Ce que tu rencontres en eux est souvent quelque chose de toi que tu n’as pas regardé en face.',
  'dh.house.8':
    'En maison VIII, cela va dans l’eau profonde — argent partagé, intimité, pouvoir et ce qui prend fin. Ce n’est pas un terrain de bavardage ; quelque chose se transforme à la racine.',
  'dh.house.9':
    'En maison IX, cela ouvre la vue plus large — croyance, étude, voyage et la quête de sens. Ton idée de à quoi tout cela sert est en train de s’étirer.',
  'dh.house.10':
    'En maison X, c’est public — carrière, réputation, ta position et le rôle que tu joues dans le monde. Ce pour quoi on te connaît est en révision.',
  'dh.house.11':
    'En maison XI, cela touche l’amitié, la communauté et l’avenir vers lequel tu tends. La compagnie que tu gardes et les buts que tu tiens sont en train d’être triés.',
  'dh.house.12':
    'En maison XII, cela travaille en arrière-plan — repos, solitude, l’inconscient et ce que tu portes sans le nommer. C’est un travail silencieux, tourné vers l’intérieur.',

  /* -- « dans la vie de tous les jours, cela peut ressembler à… » (alterné par aspect) -- */
  'dh.life.conjunction.0':
    'Dans la vie de tous les jours, cela peut ressembler à un recommencement que tu n’as pas tout à fait choisi — de nouvelles conditions, un chapitre neuf qui s’ouvre dans ce domaine, que tu te sentes prêt ou non.',
  'dh.life.conjunction.1':
    'Au jour le jour, cela peut arriver comme un fort intérêt neuf, une personne qui change le cadre, ou simplement le sentiment que l’ancienne version de ceci est finie.',
  'dh.life.conjunction.2':
    'En pratique, cela apparaît souvent comme un seuil — une décision, un déménagement, un engagement qui remet le compteur à zéro dans cette partie de ta vie.',
  'dh.life.opposition.0':
    'Dans la vie de tous les jours, cela se joue souvent à travers quelqu’un d’autre — un désaccord, une exigence, ou une personne qui incarne exactement ce avec quoi tu te débats.',
  'dh.life.opposition.1':
    'Au jour le jour, cela peut ressembler à être pris entre deux besoins valables — le tien et celui d’un autre, ou deux parties de ta propre vie qui ne rentrent pas toutes les deux.',
  'dh.life.opposition.2':
    'En pratique, cela tend à faire aboutir les choses : une conversation que tu ne peux plus remettre, un choix qui attend que tu le fasses.',
  'dh.life.square.0':
    'Dans la vie de tous les jours, cela peut ressembler à un plan qui n’arrête pas de caler, une personne qui appuie toujours sur le même bouton, ou une tâche qui pèse bien plus lourd qu’elle ne le devrait.',
  'dh.life.square.1':
    'Au jour le jour, cela arrive souvent comme de la frustration — de l’effort qui ne se convertit en rien, un mur là où tu attendais une porte.',
  'dh.life.square.2':
    'En pratique, cela apparaît comme une pression qui ne te laisse pas rouler en roue libre : la chose que tu évites est maintenant sur la route.',
  'dh.life.trine.0':
    'Dans la vie de tous les jours, cela peut ressembler à une série de petits feux verts — de l’aide qui arrive, un timing qui marche, un oui là où tu t’étais préparé à un non.',
  'dh.life.trine.1':
    'Au jour le jour, cela apparaît souvent comme de l’aisance et du flux dans ce domaine, et la tentation de supposer que ce sera toujours aussi simple.',
  'dh.life.trine.2':
    'En pratique, c’est une fenêtre favorable — les présentations prennent, les demandes reçoivent un accueil chaleureux, le chemin est brièvement dégagé.',
  'dh.life.sextile.0':
    'Dans la vie de tous les jours, cela peut ressembler à une ouverture que tu rates presque — une offre, une rencontre fortuite, une petite porte qui ne reste ouverte que si tu la franchis maintenant.',
  'dh.life.sextile.1':
    'Au jour le jour, cela tend à récompenser celui qui fait le premier pas : envoie le message, pose la question, propose ton nom.',
  'dh.life.sextile.2':
    'En pratique, c’est une opportunité peu coûteuse — rien de dramatique, mais qui vaut la peine d’agir tant qu’elle est là.',

  /* -- l’invitation plus profonde de l’aspect (alternée) -- */
  'dh.invite.conjunction.0':
    'L’invitation est de planter exprès. Ce que tu commences maintenant, si petit soit-il, est la graine de quelque chose avec quoi tu vivras encore dans des années — alors choisis-le à dessein.',
  'dh.invite.conjunction.1':
    'Le travail plus profond est de lâcher proprement l’ancienne forme de ceci, sans la traîner à moitié vivante dans le nouveau chapitre.',
  'dh.invite.conjunction.2':
    'Ce que cela demande vraiment, c’est un oui clair ou un non clair. L’ambivalence est la seule réponse qui gaspille la fenêtre.',
  'dh.invite.opposition.0':
    'L’invitation n’est pas de gagner. C’est de tenir les deux côtés assez longtemps pour trouver la troisième option qui honore ce qui est vrai dans chacun.',
  'dh.invite.opposition.1':
    'Le travail plus profond est de reprendre la part de ceci que tu as sous-traitée à quelqu’un d’autre — la force, le besoin ou le blâme.',
  'dh.invite.opposition.2':
    'Ce que cela demande, c’est une conscience honnête. Une fois que tu vois vraiment le schéma, tu n’es plus dedans.',
  'dh.invite.square.0':
    'L’invitation n’est pas de forcer davantage. C’est de remarquer ce que tu as dépassé ici et de laisser la friction le démonter, pour qu’on puisse bâtir quelque chose de plus solide.',
  'dh.invite.square.1':
    'Le travail plus profond est un changement de méthode. Le but est peut-être bon ; la façon dont tu t’y prends est ce qui génère la résistance.',
  'dh.invite.square.2':
    'Ce que cela demande vraiment, c’est de la maturité à un endroit précis — faire la chose peu reluisante et structurelle que tu espérais pouvoir sauter.',
  'dh.invite.trine.0':
    'L’invitation est d’utiliser l’aisance, pas seulement d’en profiter. Le soutien qu’on ne dépense pas tend à disparaître en silence.',
  'dh.invite.trine.1':
    'Le travail plus profond est de bâtir pendant le calme quelque chose qui tiendra quand le temps tournera de nouveau.',
  'dh.invite.trine.2':
    'Ce que cela demande, c’est de dire oui à l’aide — accepte la présentation, prends le raccourci, laisse-toi la facilité pour une fois.',
  'dh.invite.sextile.0':
    'L’invitation est l’initiative. C’est une porte laissée déverrouillée ; elle ne s’ouvre que si tu pousses.',
  'dh.invite.sextile.1':
    'Le travail plus profond est de remarquer les petites opportunités dont tu te dissuades par habitude, et d’en saisir une.',
  'dh.invite.sextile.2':
    'Ce que cela demande, c’est un acte de courage modeste et concret — rien de dramatique, juste un pas que tu préférerais reporter.',

  /* -- conseils concrets (alternés) -- */
  'dh.do.conjunction.0':
    'Donne-lui un départ propre : nomme ce qui commence, marque-le d’une façon ou d’une autre, et n’encombre pas les premières semaines avec des restes de l’ancienne version.',
  'dh.do.conjunction.1':
    'Avance de façon délibérée plutôt que rapide. Une conjonction met en mouvement un long cycle ; le ton que tu poses maintenant tend à rester.',
  'dh.do.conjunction.2':
    'Décide. Dis le oui ou le non à voix haute devant au moins une autre personne pour que ça devienne réel.',
  'dh.do.opposition.0':
    'Aie la conversation que tu contournes, et entres-y pour écouter. L’autre côté porte des informations dont tu as besoin.',
  'dh.do.opposition.1':
    'Écris les deux positions comme si tu devais défendre chacune avec équité. Le point d’équilibre se montre en général sur le papier.',
  'dh.do.opposition.2':
    'Ne force pas une résolution aujourd’hui. Laisse la tension rester jusqu’à ce que la troisième option remonte d’elle-même.',
  'dh.do.square.0':
    'Ne t’engage pas et ne signe pas sous pression. Laisse ce qui résiste te montrer où la structure est mince, et consolide ça d’abord.',
  'dh.do.square.1':
    'Change une chose à ton approche et réessaie. Le même effort, un autre angle.',
  'dh.do.square.2':
    'Fais la tâche ennuyeuse et structurelle que tu n’arrêtes pas de reporter. C’est toute la consigne.',
  'dh.do.trine.0':
    'Fais un vrai pas tant que la porte est ouverte — un message, une réservation, un premier jet. L’aisance s’estompe si tu te contentes de l’admirer.',
  'dh.do.trine.1':
    'Demande la chose. C’est la fenêtre où un oui est le plus probable.',
  'dh.do.trine.2':
    'Bâtis maintenant. Utilise le calme pour poser des fondations dont tu seras content plus tard.',
  'dh.do.sextile.0':
    'Fais le premier pas aujourd’hui, pas la semaine prochaine. Envoie-le, demande-le, inscris ton nom.',
  'dh.do.sextile.1':
    'Dis oui à la petite offre même si elle paraît mineure. Celles-là s’accumulent.',
  'dh.do.sextile.2':
    'Choisis l’unique opportunité que tu reporterais normalement, et agis dessus avant la fin de la journée.',

  /* -- langage du timing (alterné par état) -- */
  'dh.time.peak.0':
    'C’est proche de l’exact et ça se resserre encore, donc ceci culmine d’ici un jour ou deux puis commence à se relâcher.',
  'dh.time.peak.1':
    'Le contact est presque précis en ce moment — c’est le plus fort qu’il devienne, et l’intensité retombe peu après.',
  'dh.time.peak.2':
    'Ceci est à son degré exact ou près de lui, et c’est pourquoi cela demande autant de ton attention d’un coup.',
  'dh.time.build.0':
    'Ça monte encore. Le thème se fait plus fort au fil des jours à venir avant de tourner.',
  'dh.time.build.1':
    'Celui-ci n’a pas encore atteint sa pleine force ; attends-toi à ce qu’il continue de monter un moment avant de culminer.',
  'dh.time.build.2':
    'Tu es sur la pente précoce de ceci. Ce qui se lit maintenant comme un signal faible devient indubitable d’ici une semaine environ.',
  'dh.time.fade.0':
    'Ça vient de passer l’exact — le tranchant le plus vif est déjà passé et la pression se relâche.',
  'dh.time.fade.1':
    'Le pic de celui-ci est derrière toi maintenant. Ce qui reste est de l’intégration, pas une crise.',
  'dh.time.fade.2':
    'Ce contact est en train de sortir. Tu ranges après lui plutôt que de vivre le pire de lui.',

  'dh.retro':
    ' Étant rétrograde, ceci est une révision plutôt qu’un premier passage — tu repasses sur un terrain que tu as déjà parcouru, cette fois pour bien le faire.',

  /* -- modèles d’assemblage de la section -- */
  'dh.sec.open':
    '{tr} En ce moment, elle {verb} {target} — la partie de toi qui gouverne {na}.',
  'dh.sec.sign':
    'Ton {target} natal est en {sign} — {signFlavour} — ce qui façonne la manière dont tout cela atterrit pour toi.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- l’aperçu : trois courts paragraphes -- */
  'dh.ov.lead':
    'Cette lecture est tirée de là où sont vraiment les planètes aujourd’hui, mises face à ton thème de naissance — donc elle parle de ton ciel, pas du ciel en général.',
  'dh.ov.head':
    'Le centre de gravité en ce moment, c’est {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Le climat général est favorable : les contacts faciles pèsent nettement plus que les durs. C’est une période pour aller chercher quelque chose plutôt que de te blinder contre — la principale façon de la gaspiller est de rester immobile.',
  'dh.ov.weather.friction':
    'Le climat général est exigeant. Il y a plus de friction que de flux dans le mélange, et plusieurs choses veulent être affrontées de face plutôt que souhaitées disparues. Rien de tout ça n’est un désastre ; c’est une phase de construction, et les phases de construction se ressentent comme de l’effort.',
  'dh.ov.weather.intense':
    'Le climat général est lourd et concentré. Des planètes lentes sont posées juste sur ton thème, et le volume est monté sur tout ce qu’elles touchent. Dose-toi — c’est une portion de marathon, pas un sprint.',
  'dh.ov.weather.mixed':
    'Le climat général est mixte — du soutien réel et de la friction réelle dans la même fenêtre. Le travail de cette période est de choisir où te dépenser et où te retenir.',
  'dh.ov.weather.quiet':
    'Le climat général est calme. Aucune planète n’appuie fort sur ton thème, ce qui fait de cette période un rare moment pour fixer ton propre programme et ton rythme sans que le ciel te contredise.',
  'dh.ov.tempo.fast':
    'Le tempo est rapide — les contacts sont serrés et en mouvement, donc les thèmes arrivent et passent en quelques jours. Reste réactif plutôt que d’essayer de tout planifier à l’avance.',
  'dh.ov.tempo.building':
    'Le tempo est à montée lente. Les thèmes principaux rassemblent encore leur force, donc ce qui ressemble maintenant à un indice sera indubitable dans une semaine ou deux.',
  'dh.ov.tempo.slow':
    'Le tempo est lent et structurel. Les grands contacts ici se déploient sur des mois, pas des jours ; pense en saisons et n’attends pas un verdict du jour au lendemain.',
  'dh.ov.tempo.settling':
    'Le tempo se pose — les contacts les plus vifs viennent de passer leur pic, donc il s’agit plus d’intégrer ce qui s’est déjà passé que de te blinder pour ce qui vient.',

  /* -- le paragraphe de la Lune, développé -- */
  'dh.moon.lead': 'Ton climat émotionnel',
  'dh.moon.body':
    'La Lune traverse {sign} — {mood} — et elle est {phase} à {pct}% de lumière. {phaseNote} Que ton humeur soit une information plutôt qu’un verdict : elle te dit à quoi ressemble de l’intérieur cette portion de ciel.',

  /* -- les fils : ce qui revient sans cesse -- */
  'scr.horo.threadsHead': 'Les fils qui relient',
  'dh.th.house':
    'Ta maison {ord} n’arrête pas de revenir. Quoi qu’il se passe d’autre, {houseThemeLower} est la pièce dans laquelle on te demande de passer du temps cette période.',
  'dh.th.planet':
    'Ton {planet} natal est travaillé sous plus d’un angle à la fois. Comme il tient {na}, attends-toi à ce que ce soit une note récurrente et non un événement isolé.',
  'dh.th.bal.friction':
    'Et la balance penche vers la friction. Ce n’est pas de la malchance — c’est à quoi ressemble de l’intérieur une phase de croissance. L’effort est la consigne.',
  'dh.th.bal.supportive':
    'Et la balance penche vers le flux. Les contacts de soutien l’emportent en nombre sur les durs, donc les portes sont vraiment ouvertes — la seule façon de gaspiller ça est de n’en franchir aucune.',
  'dh.th.bal.mixed':
    'Et la balance est vraiment partagée. Une partie de ceci te soutient et une partie te résiste, souvent le même jour, donc le discernement compte plus que l’énergie en ce moment.',
  'dh.th.solo':
    'Les contacts sont répartis sur ton thème plutôt qu’entassés sur un point, donc ceci se lit comme une période variée plutôt que comme une seule histoire dominante.',

  /* -- la carte du timing -- */
  'scr.horo.timingHead': 'Comment ceci se déploie',
  'dh.tm.tight':
    'En resserrement vers l’exact : {list}. Ce sont les voix les plus fortes de ton ciel en ce moment et elles culmineront en quelques jours.',
  'dh.tm.fade':
    'Passé leur pic et en train de s’estomper : {list}. La leçon de ceux-là est en grande partie assimilée — tu intègres maintenant, tu ne te blindes pas.',
  'dh.tm.none':
    'Rien n’est posé juste sur l’exact pour l’instant, ce qui fait partie de la raison pour laquelle la période semble plus ouverte que pointue.',

  /* -- l’arc de clôture -- */
  'dh.cl.protect':
    'L’arc plus large te demande de protéger ton {focus} tout au long de cette portion. Moins d’engagements, des soirées plus tôt, et la permission d’être moins disponible que d’habitude — tu récupéreras plus en gardant ton énergie qu’en la dépensant. C’est une saison pour soigner le terrain, pas pour forcer la récolte.',
  'dh.cl.use':
    'L’arc plus large est une fenêtre ouverte autour de ton {focus}, et les fenêtres comme celle-ci ne restent pas ouvertes longtemps. Vise-la vers une chose qui compte vraiment pour toi et mets du poids réel derrière maintenant, tant que le ciel aide plutôt qu’il ne résiste.',
  'dh.cl.steady':
    'L’arc plus large demande de la constance. Garde tes routines, garde la parole que tu t’es donnée, et laisse le bruit passer sans courir après chaque morceau. Tout transit n’a pas besoin d’une réponse ; certains n’ont qu’à être surpassés dans la durée.',

  /* ======================= COMPATIBILITÉ — PROFONDE ======================= */

  'syn.deep.patternLead': 'Ce qui fait tourner ce lien',
  'syn.deep.pattern.emotional':
    'À son cœur, ceci est une connexion émotionnelle. Les Lunes et Vénus portent l’essentiel du poids entre vous, ce qui rend le lien chaleureux, instinctif et prompt à s’accorder — et cela veut dire que ce sont les humeurs, pas les disputes, qui fixent la température. Quand vous êtes tous les deux stables, c’est doux et facile et le chez-soi se ressent comme un chez-soi rapidement. Quand l’un de vous ne va pas, l’autre le sait en quelques minutes, qu’un mot soit dit ou non. La conséquence pratique, c’est que prendre soin de ton propre état intérieur n’est pas séparé de prendre soin de la relation ; c’est le même travail. Apprends à nommer un sentiment tôt, avant qu’il ne devienne climat, et cette connexion tiendra presque n’importe quoi.',
  'syn.deep.pattern.mental':
    'À son cœur, ceci est une rencontre d’esprits. Vous vous connectez d’abord par les mots, les idées, la curiosité et le plaisir d’être compris vite, et l’étincelle reste allumée exactement aussi longtemps que dure la conversation. C’est une vraie force — vous ne vous ennuierez jamais l’un l’autre et vous résolvez bien les problèmes en duo. Le risque est plus subtil : il est possible de confondre une bonne conversation avec l’intimité et de vivre un peu au-dessus du cou, en échangeant des pensées pendant que la couche du ressenti reste sans soin. Faites de la place pour les parties de la proximité qui ne sont pas verbales — un silence partagé, un repas, une tâche faite côte à côte — et la connexion mentale devient un socle plutôt qu’un substitut.',
  'syn.deep.pattern.physical':
    'À son cœur, ceci est une connexion d’élan et de corps. Mars et le Soleil font le gros du travail, donc il y a ici de la vraie chimie et du vrai élan — vous vous énergisez l’un l’autre, vous faites arriver les choses quand vous êtes ensemble, et vous fonctionnez bien en équipe quand il y a un travail à faire. Le même câblage veut dire que vous pouvez vous agacer l’un l’autre tout aussi vite ; la compétitivité et l’irritation sont la face d’ombre de l’attraction. La solution n’est pas de réprimer la chaleur mais de la diriger. Donnez-lui une direction commune — un projet, un plan, un défi, même une dispute propre avec des règles — et l’intensité travaille pour vous plutôt que de se retourner vers l’intérieur.',
  'syn.deep.pattern.karmic':
    'À son cœur, celui-ci pèse. Saturne et Pluton sont dans le mélange, ce qui apporte un sens de conséquence au lien — comme si vous étiez là pour régler quelque chose ensemble plutôt que simplement passer le temps agréablement. Les connexions comme celle-ci tendent à se ressentir importantes tôt et à demander plus aux deux personnes qu’un appariement plus léger. Bien menée, elle devient profondément loyale et durable, de ces liens qui survivent aux choses. Menée avec négligence, elle devient lourde — de l’obligation déguisée en proximité, ou une lente lutte de pouvoir que personne ne nomme. La différence tient presque entièrement à si vous continuez tous les deux à la choisir à voix haute, exprès, plutôt que de rester parce que partir se ressent comme un échec.',

  'syn.deep.chemHead': 'La chimie entre vous',
  'syn.deep.chem.strong':
    'L’attraction ici est bien soutenue. Les contacts entre vos thèmes qui gouvernent le désir et l’affection sont en grande partie harmonieux, ce qui se traduit d’habitude par une chimie qui se ressent naturelle plutôt que tendue — vous vous attirez d’une manière qui ne coûte pas grand-chose à entretenir. Profites-en, et n’y vois pas la preuve que le reste de la relation se fera tout seul ; l’aisance dans un rayon ne remplace pas l’effort dans les autres.',
  'syn.deep.chem.mixed':
    'L’attraction ici a du courant et aussi du grain. Certains des contacts entre vos thèmes vous rapprochent chaleureusement ; d’autres ajoutent de la friction à ce même tirage, ce qui peut se lire comme une chimie avec un tranchant — magnétique, parfois exaspérante, rarement fade. Ce type d’étincelle tend à durer plus longtemps que celle sans friction, justement parce qu’elle se régénère sans cesse. La tâche est de garder le tranchant joueur plutôt que de le laisser tourner à un schéma où vous vous agacez l’un l’autre.',
  'syn.deep.chem.cool':
    'Le désir n’est pas le fil le plus fort entre vos thèmes. Les contacts qui gouvernent l’attraction sont calmes ou légèrement difficiles, ce qui ne veut pas dire qu’il n’y a pas d’étincelle — seulement que cette connexion est plus susceptible d’être bâtie sur autre chose : une compréhension partagée, du respect, de la fiabilité, une rencontre de valeurs. Les relations fondées là-dessus tendent à être plus lentes à s’enflammer et nettement plus difficiles à rompre.',

  'syn.deep.commHead': 'Comment vous communiquez',
  'syn.deep.comm.easy':
    'La communication est une force ici. Vos contacts de Mercure coulent, ce qui veut dire que vous tendez à suivre la pensée de l’autre, à réussir les blagues et à travailler un problème ensemble sans trop de perte à la traduction. Utilise ça exprès quand quelque chose de difficile surgit — vous êtes meilleurs pour parler les choses que la plupart des couples, alors ne laissez pas les conversations difficiles être celles que vous évitez.',
  'syn.deep.comm.work':
    'La communication demande un peu de travail ici. Vos contacts de Mercure portent de la friction, donc vous pouvez parler en parallèle — des tempos différents, une logique différente, des suppositions différentes sur ce qui a vraiment été convenu. C’est gérable, mais il faut une habitude : ralentis, redis ce que tu as entendu et vérifie que vous entendez la même chose par le même mot avant d’avancer.',
  'syn.deep.comm.quiet':
    'Il n’y a pas de contact de Mercure fort entre vos thèmes dans un sens ou dans l’autre, ce qui veut dire d’habitude que la communication n’est ni un don évident ni un problème évident — c’est simplement quelque chose que vous construirez exprès plutôt que par défaut. Les points réguliers et non forcés comptent plus pour vous que pour un couple qui se lit automatiquement.',

  'syn.deep.growthLead': 'Là où ceci te fait grandir',
  'syn.deep.growth.good':
    'L’aisance entre vous est réelle, et c’est aussi la chose à surveiller. Quand une connexion tourne surtout toute seule, il est facile de devenir désinvolte — d’arrêter d’apporter ta pleine honnêteté et ton effort parce que tu n’as pas eu à le faire. Votre atout en tant que couple, c’est de continuer à vous présenter comme il faut pour quelque chose qui ne l’exige pas : continuer à dire la chose vraie, continuer à faire l’effort, continuer à vous remarquer. Ne laissez pas « facile » devenir en silence « négligé ».',
  'syn.deep.growth.mid':
    'Les points de friction entre vous ne sont pas des défauts de l’appariement ; ils sont le programme. Chacun marque un endroit où vous devrez tous les deux vous étirer — dire la chose difficile plus tôt, tenir ton terrain avec plus de douceur, arrêter d’attendre d’être deviné et commencer à être clair. Les couples qui nomment ces tensions tôt et les traitent comme un travail partagé s’en sortent en général bien avec le temps. Ceux qui espèrent qu’elles se dissoudront d’elles-mêmes tendent à rencontrer la même dispute pendant des années.',
  'syn.deep.growth.hard':
    'Cette connexion demande beaucoup à vous deux. Les contacts difficiles entre vos thèmes ne se dissoudront pas d’eux-mêmes, donc la relation ne marche que si vous traitez tous les deux la difficulté comme un travail commun et non comme la faute de l’autre. C’est vraiment possible — beaucoup de liens durables sont bâtis sur des aspects durs — mais c’est un choix que vous devrez continuer à faire, encore et encore et à voix haute, surtout dans les portions où il serait plus facile de tenir les comptes.',

  'syn.deep.nameItLead': 'Dis cette part à voix haute',
  'syn.deep.nameIt':
    'S’il y a une chose qui vaut la peine d’être nommée tôt plutôt que d’espérer qu’elle se pose, c’est le contact {a}–{b} : {sentence} Non dit, il tend à se calcifier en un schéma ; dit clairement et tôt, il s’avère en général plus petit qu’il ne le paraissait.',
  'syn.deep.nameIt.none':
    'Il n’y a pas ici de point de friction unique à couper court tôt — ce qui vaut déjà la peine d’être su. Le travail dans cette connexion tient moins à désamorcer une question qu’à rester attentif sur l’ensemble.',

  'syn.deep.longViewLead': 'La vue à long terme',
  'syn.deep.longView.good':
    'ceci est le genre de connexion qui vieillit bien. Elle tend à devenir plus facile plutôt que plus difficile à mesure que vous apprenez les bords de l’autre, et l’aisance des débuts s’approfondit en général en quelque chose de plus solide et de plus fiable avec le temps. La principale menace pour elle est la négligence, pas le conflit.',
  'syn.deep.longView.mid':
    'ceci devient ce que vous en faites. La matière première est exploitable — ni sans effort ni condamnée — et le résultat dépend presque entièrement de l’effort que vous mettez tous les deux pendant la première portion, avant que les schémas ne se fixent. Réussissez les habitudes tôt et ceci peut durer.',
  'syn.deep.longView.hard':
    'ceci est intense maintenant, et il est probable que ça reste intense. Ça en vaut la peine si la profondeur et le sens sont ce que vous voulez tous les deux vraiment d’une relation. C’est épuisant si une partie de toi attend que ça se calme en quelque chose de facile — ce n’est probablement pas la consigne ici.',
} as const
