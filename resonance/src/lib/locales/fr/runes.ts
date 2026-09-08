import type { RunesKey } from '../en/runes'

/**
 * Français — le Futhark ancien : significations, lecture droite et inversée
 * (merkstave) et une directive quotidienne pour chacune des 24 runes, plus les
 * textes de l'écran Runes. Les noms des runes sont en vieux norrois et restent
 * identiques dans toutes les langues.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ textes */
  'rune.eyebrow': 'Les Runes',
  'rune.dailyTitle': 'Ta rune du jour',
  'rune.dailyBlurbChart':
    'Une rune, tirée pour ton thème et cette date. Elle se renouvelle à minuit.',
  'rune.dailyBlurbPlain': 'Une rune pour la journée. Elle se renouvelle à minuit.',
  'rune.tapReveal': 'Touche la pierre pour la retourner.',
  'rune.turnStone': 'Retourner la pierre',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'Elle est tombée inversée — lis-la pour le côté d’ombre, le blocage ou la leçon encore non apprise.',
  'rune.sound': 'Son',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'La Ætt de Freyr',
  'rune.aett.2': 'La Ætt de Heimdall',
  'rune.aett.3': 'La Ætt de Týr',

  'rune.element.fire': 'Feu',
  'rune.element.ice': 'Glace',
  'rune.element.earth': 'Terre',
  'rune.element.air': 'Air',
  'rune.element.water': 'Eau',
  'rune.element.spirit': 'Esprit',

  'rune.resonance.match':
    'Les runes et le ciel s’accordent aujourd’hui — les deux pointent vers ton {chakra}.',
  'rune.resonance.bridge':
    'Le ciel du jour travaille ton {sky} ; la rune répond depuis ton {rune}.',

  'rune.cast': 'Jeter les runes',
  'rune.castSub': 'Les Trois Nornes, ou la croix de cinq runes',
  'rune.chooseTitle': 'Choisis un tirage',
  'rune.chooseBlurb': 'Tiens ta question, puis choisis comment les runes doivent tomber.',
  'rune.runeCount.one': '1 rune',
  'rune.runeCount.many': '{n} runes',
  'rune.castEyebrow': 'Les Runes · {layout}',
  'rune.drawAgain': 'Jeter de nouveau',
  'rune.doCast': 'Jeter',

  'rune.layout.norns': 'Les Trois Nornes',
  'rune.layout.nornsSub': 'Ce qui est devenu, ce qui devient, ce qui est dû',
  'rune.layout.cross': 'La Croix de Cinq Runes',
  'rune.layout.crossSub': 'Un regard plus complet sur une situation',

  'rune.pos.now': 'Maintenant',
  'rune.pos.now.prompt': 'où tu te tiens',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'ce qui est devenu — la racine de la chose',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'ce qui devient — le tournant présent',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'ce qui sera — ce qui est dû, et où cela mène',
  'rune.pos.heart': 'Le cœur',
  'rune.pos.heart.prompt': 'le noyau de la question',
  'rune.pos.crossing': 'Ce qui la croise',
  'rune.pos.crossing.prompt': 'l’obstacle ou l’aide',
  'rune.pos.root': 'La racine',
  'rune.pos.root.prompt': 'de quoi cela pousse',
  'rune.pos.counsel': 'Le conseil',
  'rune.pos.counsel.prompt': 'ce que conseillent les runes',
  'rune.pos.outcome': 'Où cela mène',
  'rune.pos.outcome.prompt': 'la direction vers laquelle cela tend',

  'rune.ask': 'Interroger les runes',
  'rune.askSub': 'Une rune, une réponse à ta question',
  'rune.askEyebrow': 'Les Runes · La Question',
  'rune.askBlurb':
    'Pose ta question clairement et tiens-la pendant que la rune est tirée.',
  'rune.askPlaceholder': 'Devrais-je…  ·  Est-il temps de…  ·  Que dois-je savoir sur…',
  'rune.consult': 'Tirer une rune',
  'rune.askAgain': 'Interroger de nouveau',
  'rune.youAsked': 'Tu as demandé',
  'rune.answerReading': 'Ce que dit la rune',
  'rune.castReading': 'La lecture',

  'rune.verdict.yes': 'Oui',
  'rune.verdict.no': 'Non',
  'rune.verdict.wait': 'Pas encore',
  'rune.verdict.hidden': 'Caché',
  'rune.verdict.yes.gloss': 'La rune penche vers le oui. Bouge, et avec conviction.',
  'rune.verdict.no.gloss': 'La rune s’écarte. Forcer ceci maintenant coûte plus que ça ne rapporte.',
  'rune.verdict.wait.gloss':
    'La rune dit que le moment n’est pas mûr. Prépare-toi et laisse l’instant venir à toi.',
  'rune.verdict.hidden.gloss':
    'La rune garde son conseil. Celui-ci n’est pas à toi de le savoir encore — la réponse est encore en train de se former.',

  'rune.library': 'Le Futhark Ancien',
  'rune.librarySub': 'Les vingt-quatre, pour s’asseoir avec elles',

  'dash.dailyRune': 'Rune du jour',
  'dash.runeSeen': 'La rune du jour est retournée',
  'dash.runeNew': 'Jette ta rune du jour',

  /* ---------------------------------------------- La Ætt de Freyr (1–8) */
  'rune.fehu.meaning': 'Le bétail — richesse mobile, et ce qu’elle peut acheter ou coûter',
  'rune.fehu.keywords': 'Richesse · Commencements · Flux',
  'rune.fehu.up':
    'Fehu est le troupeau : une richesse qui bouge, se multiplie et file si on la thésaurise. Elle marque l’arrivée de ressources neuves — argent, énergie, opportunité, standing — et le début de quelque chose qui peut croître. Le piège est dans sa nature : ceci ne reste vivant que si ça continue de circuler. Dépenses-en un peu, partages-en un peu, mets-le au travail. Ce que tu serres, tu le perds.',
  'rune.fehu.merk':
    'Inversée, Fehu est la perte, ou une richesse qui te possède plutôt que l’inverse. Quelque chose s’écoule, ou tu gardes une ressource si serrée qu’elle a cessé de te servir à quoi que ce soit. Regarde où vont vraiment ton énergie et ton argent, et sois honnête sur ce qui vaut la peine d’être gardé.',
  'rune.fehu.today':
    'Mets quelque chose en circulation aujourd’hui — de l’argent, de l’effort ou un mot gentil que tu gardais en réserve.',

  'rune.uruz.meaning': 'L’aurochs — une force vitale sauvage, non domptée',
  'rune.uruz.keywords': 'Vitalité · Endurance · Forme brute',
  'rune.uruz.up':
    'Uruz est le bœuf sauvage : une puissance qui n’a pas été pliée à la charrue. Elle apporte une montée de vitalité physique, une endurance têtue et la force de façonner la circonstance brute en quelque chose à toi. C’est une bonne rune pour les débuts qui ont besoin de muscle — commencer l’entraînement, retourner la terre, tenir une limite. La force est réelle ; le travail est d’apprendre à la diriger.',
  'rune.uruz.merk':
    'Inversée, Uruz est une force mal employée ou absente — de la puissance retournée contre toi-même, ou une faiblesse là où tu dois tenir ferme. Tu pousses peut-être quand tu devrais t’arrêter, ou tu laisses quelque chose de sauvage dans ta vie sans gestion. Reprends la puissance sans la laisser te mener.',
  'rune.uruz.today':
    'Sers-toi de ton corps aujourd’hui — marche loin, soulève quelque chose de lourd ou traverse une chose que tu repousses.',

  'rune.thurisaz.meaning': 'L’épine — une force acérée, réactive et défensive',
  'rune.thurisaz.keywords': 'Défense · Réaction · Une porte dure',
  'rune.thurisaz.up':
    'Thurisaz est l’épine de la haie et le marteau du géant : une force qui protège en blessant et dégage en brisant. Elle marque souvent une confrontation, une limite dure ou une situation qui ne cède pas au charme. Affrontée de face, elle blesse ; affrontée avec patience, elle devient une porte. Ne cherche pas cette bagarre, mais ne fais pas non plus semblant que l’épine n’est pas là.',
  'rune.thurisaz.merk':
    'Inversée, Thurisaz est une défense devenue un mur, ou un tempérament réactif qui fait des dégâts. Tu frappes peut-être, ou tu es si arc-bouté contre l’attaque que rien de bon ne t’atteint non plus. Pose le marteau avant de l’abattre sur quelqu’un qui ne l’a pas mérité.',
  'rune.thurisaz.today':
    'Tiens une limite aujourd’hui sans t’en excuser — et résiste à l’envie de l’expliquer trois fois.',

  'rune.ansuz.meaning': 'Le dieu — le souffle, la parole, le message d’Odin',
  'rune.ansuz.keywords': 'Voix · Message · Discernement',
  'rune.ansuz.up':
    'Ansuz est le souffle du Père de Tout : parole, signal et la clarté soudaine qui arrive du dehors de ton propre effort. Un message arrive, ou une conversation compte plus qu’il n’y paraît. Elle régit aussi ta propre voix — c’est le jour pour dire la chose vraie clairement, pour enseigner, pour nommer ce que tu vois. Écoute de près ; la réponse est peut-être dans la bouche d’un autre.',
  'rune.ansuz.merk':
    'Inversée, Ansuz est un malentendu, un message mal entendu, ou une sagesse que tu refuses d’écouter à cause de qui la porte. On se sert de mots pour embrouiller plutôt que pour éclaircir — les tiens ou ceux d’un autre. Ralentis la conversation et vérifie ce qui était vraiment voulu.',
  'rune.ansuz.today':
    'Dis la chose claire à voix haute aujourd’hui, et écoute deux fois plus que tu ne parles.',

  'rune.raidho.meaning': 'La chevauchée — le voyage, la roue, le juste rythme',
  'rune.raidho.keywords': 'Voyage · Rythme · Juste ordre',
  'rune.raidho.up':
    'Raidho est le chariot sur la route : un mouvement avec une direction, et le sentiment d’être porté le long d’un chemin qui a son propre rythme. Elle favorise le voyage, les décisions qui te mettent en marche, et le fait de remettre les choses dans leur juste ordre. La leçon est que le voyage a un rythme à lui — tu ne peux pas presser la route, mais tu peux cesser de te battre contre elle.',
  'rune.raidho.merk':
    'Inversée, Raidho est un voyage bloqué, un plan hors séquence, ou un mouvement dans la mauvaise direction. Quelque chose est à contretemps — un trajet que tu ne devrais pas faire, ou une hâte qui te coûtera. Remets l’ordre des choses avant de repartir.',
  'rune.raidho.today':
    'Fais le prochain juste pas dans l’ordre aujourd’hui ; résiste à l’envie de sauter à la partie intéressante.',

  'rune.kenaz.meaning': 'La torche — feu maîtrisé, métier et connaissance',
  'rune.kenaz.keywords': 'Discernement · Métier · Feu créatif',
  'rune.kenaz.up':
    'Kenaz est la flamme dans la salle : pas l’incendie mais le feu travaillé — la forge, la lampe, l’étincelle de la compréhension. Elle apporte de la clarté dans un coin sombre, de l’habileté à une tâche et la chaleur créative pour faire plutôt que seulement imaginer. Quelque chose sur quoi tu étais dans le noir devient visible. Prends ce que tu vois maintenant et donne-lui forme en quelque chose de réel.',
  'rune.kenaz.merk':
    'Inversée, Kenaz est une lumière qui s’éteint — inspiration perdue, un projet qui refroidit, ou une connaissance servant à brûler plutôt qu’à bâtir. Tu es peut-être bloqué créativement, ou accroché à une façon de faire qui n’éclaire plus rien. Laisse la chose morte s’assombrir pour qu’une flamme neuve puisse prendre.',
  'rune.kenaz.today':
    'Fabrique quelque chose aujourd’hui, si petit et brut soit-il — le but est de faire passer une idée dans la forme.',

  'rune.gebo.meaning': 'Le don — l’échange, et le lien qu’il crée',
  'rune.gebo.keywords': 'Don · Échange · Partenariat',
  'rune.gebo.up':
    'Gebo est le don donné et le don dû — le fil d’obligation et de générosité qui lie les gens. Elle marque un échange authentique : un partenariat, un contrat, un acte de donner qui reviendra. Il n’y a pas de Gebo inversée, car un don, une fois donné, ne peut être dé-donné. Donne librement et reçois avec grâce, et regarde la balance s’équilibrer avec le temps.',
  'rune.gebo.today':
    'Donne quelque chose aujourd’hui sans livre de comptes en tête — et autorise-toi à accepter ce qu’on t’offre en retour.',

  'rune.wunjo.meaning': 'La joie — harmonie, appartenance et choses qui se mettent en place',
  'rune.wunjo.keywords': 'Joie · Harmonie · Appartenance',
  'rune.wunjo.up':
    'Wunjo est la joie de la salle bien tenue : pas l’extase mais le contentement, le sentiment que les choses s’emboîtent et d’être parmi les siens. Elle marque une résolution, une récompense gagnée, ou un moment où les pièces s’alignent. Autorise-toi à le remarquer. Cette rune te demande d’accepter le bien qui est vraiment là plutôt que de tenir bon pour une meilleure version.',
  'rune.wunjo.merk':
    'Inversée, Wunjo est une joie différée ou une fausse harmonie tenue par le fait de ne pas dire la chose difficile. Quelque chose sonne faux sous la surface. Ne le camoufle pas — la vraie aisance vient après la conversation honnête, pas à sa place.',
  'rune.wunjo.today':
    'Nomme une chose qui va vraiment bien, et que ça suffise pour aujourd’hui.',

  /* -------------------------------------------- La Ætt de Heimdall (9–16) */
  'rune.hagalaz.meaning': 'La grêle — perturbation soudaine hors de ton contrôle',
  'rune.hagalaz.keywords': 'Perturbation · Crise · Dégagement',
  'rune.hagalaz.up':
    'Hagalaz est l’orage de grêle : une destruction qui tombe du ciel, ruine la récolte, puis fond dans l’eau qui nourrit la suivante. Elle marque une interruption que tu n’as pas choisie et avec laquelle tu ne peux pas discuter — un événement qui brise le schéma. Il n’y a rien à combattre ici. Mets-toi à l’abri, laisse passer, et regarde ce qui tient encore debout après. La grêle dégage le terrain.',
  'rune.hagalaz.today':
    'Ne commence rien de fragile aujourd’hui. Verrouille les écoutilles, attends que le temps passe, et fais confiance : le terrain se dégage.',

  'rune.nauthiz.meaning': 'Le besoin — friction, contrainte et le feu qu’il fait',
  'rune.nauthiz.keywords': 'Contrainte · Besoin · Leçon dure',
  'rune.nauthiz.up':
    'Nauthiz est le feu du besoin, allumé en frottant deux bâtons sous pression. Elle marque une contrainte — une pénurie, un retard, une situation dont tu ne peux pas encore sortir — et la débrouillardise que cette contrainte t’oblige à faire sortir. La leçon est la patience sous friction. Affronte le manque honnêtement, fais la petite chose disciplinée en ton pouvoir, et laisse la résistance t’apprendre ce dont tu as vraiment besoin.',
  'rune.nauthiz.merk':
    'Inversée, Nauthiz est un besoin nié — faire semblant que la contrainte n’est pas là, ou laisser la difficulté tourner à la rancœur et aux décisions hâtives. Cesse de te battre contre le fait de la limite. La sortie est l’acceptation d’abord, puis l’action patiente et délibérée.',
  'rune.nauthiz.today':
    'Accepte une limite aujourd’hui au lieu de discuter avec elle, et fais la seule petite chose disciplinée qu’elle te laisse ouverte.',

  'rune.isa.meaning': 'La glace — immobilité, un arrêt total, l’instant figé',
  'rune.isa.keywords': 'Immobilité · Arrêt · Clarté',
  'rune.isa.up':
    'Isa est la rivière gelée jusqu’au fond : tout mouvement arrêté, tout tenu en place. Elle marque un arrêt — un plan en suspens, une relation en stase, une période où rien de ce que tu pousses ne semble bouger. Ce n’est pas un échec ; c’est l’hiver. Cesse de forcer le dégel. Sers-toi de l’immobilité pour voir clairement ce qu’il y a sous la glace, et garde ta force pour le printemps.',
  'rune.isa.today':
    'Cesse de pousser la chose coincée aujourd’hui. Assieds-toi avec elle, regarde-la clairement, et laisse l’immobilité faire son travail.',

  'rune.jera.meaning': 'L’année — récolte, cycles et effort qui porte ses fruits',
  'rune.jera.keywords': 'Récolte · Cycles · Juste moment',
  'rune.jera.up':
    'Jera est l’année qui tourne : graine, croissance, récolte, repos, et graine de nouveau. Elle marque le point où l’effort d’avant rend enfin — pas par un coup de chance mais parce qu’assez de temps a passé et qu’assez de travail a été fait. Elle conseille aussi la patience avec ce qui n’est pas encore mûr. Tu ne peux pas presser une saison. Soigne ce que tu as planté, et récolte ce qui est prêt.',
  'rune.jera.today':
    'Encaisse quelque chose que tu as planté il y a un moment — finis-le, mets-le en banque, ou remarque simplement que ça a marché.',

  'rune.eihwaz.meaning': 'L’if — l’axe entre la vie et la mort, l’endurance',
  'rune.eihwaz.keywords': 'Endurance · Transformation · L’axe',
  'rune.eihwaz.up':
    'Eihwaz est l’if, à feuillage persistant et vénéneux, ses racines dans le monde d’en bas et sa cime dans la lumière — le poteau qui traverse les mondes. Elle marque l’endurance à travers un passage dur, et un changement qui va jusqu’au bout. Quelque chose doit finir pour que la chose suivante vive. Tiens-toi comme l’if : enraciné, immobile, relié à la fois à ce qui meurt et à ce qui naît.',
  'rune.eihwaz.today':
    'Fais face aujourd’hui à la fin que tu évites — pas pour la forcer, juste pour cesser de faire semblant qu’elle n’arrive pas.',

  'rune.perthro.meaning': 'Le cornet à sorts — mystère, hasard et ce que le destin garde caché',
  'rune.perthro.keywords': 'Mystère · Hasard · L’invisible',
  'rune.perthro.up':
    'Perthro est le cornet d’où l’on secoue les sorts — l’instant avant que les dés retombent, quand l’issue existe mais ne peut être vue. Elle régit les secrets, les influences cachées, la chance, et les parts du schéma qui ne sont simplement pas encore à toi de connaître. Quelque chose se décide hors de vue. Joue bien ton rôle et laisse le jet retomber ; tout n’est pas fait pour être élucidé d’avance.',
  'rune.perthro.merk':
    'Inversée, Perthro est un secret qui doit rester enterré et qu’on déterre, ou une fixation malsaine sur le fait de connaître l’issue. Cesse de forcer la révélation. Certaines choses pourrissent à la lumière avant l’heure.',
  'rune.perthro.today':
    'Laisse une chose rester inconnue aujourd’hui. Fais ta part, et arrête de rafraîchir la page.',

  'rune.algiz.meaning': 'L’élan — protection, et l’élan vers le plus haut',
  'rune.algiz.keywords': 'Protection · Connexion · Aide d’en haut',
  'rune.algiz.up':
    'Algiz est l’élan aux bois dressés, et la laîche qui coupe la main qui la saisit — une rune de protection, et du lien entre toi et quelque chose de plus grand. Elle marque un bouclier autour de toi en ce moment, et un soutien disponible au-dessus de ton propre niveau si tu tends la main. Demande de l’aide. Tiens-toi droit. Ce qui veille sur toi est de ton côté.',
  'rune.algiz.merk':
    'Inversée, Algiz est une protection baissée ou une aide refusée — te laisser à découvert là où tu devrais être gardé, ou te couper du soutien qui est là. Vérifie tes défenses, et laisse quelqu’un entrer.',
  'rune.algiz.today':
    'Demande de l’aide pour une chose aujourd’hui, à une personne ou à une puissance au-dessus de ton grade.',

  'rune.sowilo.meaning': 'Le soleil — plénitude, réussite et la volonté qui guide',
  'rune.sowilo.keywords': 'Réussite · Plénitude · Volonté claire',
  'rune.sowilo.up':
    'Sowilo est la roue solaire : la lumière qui revient toujours, la victoire qui vient d’une volonté pointée fermement sur une seule chose. Elle marque la réussite, la santé et une force clarifiante qui brûle le brouillard. Il n’y a pas de Sowilo inversée — le soleil ne recule pas. Pointe ton énergie sur ce qui compte, garde-la là, et attends-toi à ce que l’issue aille en ta faveur.',
  'rune.sowilo.today':
    'Pointe tout sur un seul but aujourd’hui. Sans te couvrir, sans deuxième cible — juste celle-là, jusqu’à la nuit.',

  /* --------------------------------------------------- La Ætt de Týr (17–24) */
  'rune.tiwaz.meaning': 'Týr — justice, courage et le sacrifice consenti',
  'rune.tiwaz.keywords': 'Justice · Courage · Sacrifice',
  'rune.tiwaz.up':
    'Tiwaz est la lance et la main que Týr a donnée au loup pour tenir sa parole — une rune de justice, d’honneur et du fait de faire ce qui est juste à un coût réel. Elle favorise les affaires légales, les combats loyaux, et le fait de tenir un engagement quand il cesse d’être commode. Pointe-toi vers ce qui est vrai et tiens la ligne. La victoire ici est de celles avec lesquelles tu peux vivre après.',
  'rune.tiwaz.merk':
    'Inversée, Tiwaz est un courage qui flanche, un engagement abandonné, ou une justice tordue. Tu évites peut-être une prise de position que tu sais devoir prendre, ou tu dépenses ton énergie dans un combat qui n’est pas honnête. Réengage-toi envers ce qui est vraiment juste, même si ça te coûte la victoire.',
  'rune.tiwaz.today':
    'Tiens aujourd’hui une promesse devenue gênante, et prends la position que tu esquives.',

  'rune.berkano.meaning': 'Le bouleau — croissance, soin et commencements neufs et silencieux',
  'rune.berkano.keywords': 'Croissance · Soin · Commencements neufs',
  'rune.berkano.up':
    'Berkano est le bouleau, premier arbre à reverdir après la glace — une rune de croissance douce et à l’abri : grossesse, un projet neuf dans sa phase tendre, guérison, le soin qui laisse une petite chose devenir forte. Elle te demande de couver plutôt que de pousser. Protège la jeune pousse, nourris-la, tiens le gel loin d’elle, et laisse-la croître au rythme que la croissance prend vraiment.',
  'rune.berkano.merk':
    'Inversée, Berkano est une croissance rabougrie ou un soin retiré — une chose neuve négligée, un nœud familial, ou une négligence de soi déguisée en dureté. Quelque chose a besoin de soin que tu laisses se débrouiller seul. Reviens et couve-le comme il faut.',
  'rune.berkano.today':
    'Soigne aujourd’hui une chose qui grandit — une personne, un plan ou toi-même — avec un vrai soin, pas juste avec de l’intention.',

  'rune.ehwaz.meaning': 'Le cheval — partenariat, confiance et mouvement régulier',
  'rune.ehwaz.keywords': 'Partenariat · Confiance · Élan',
  'rune.ehwaz.up':
    'Ehwaz est le cheval et le cavalier se mouvant comme un seul — une rune de partenariat de confiance, de travail d’équipe et de progrès fait ensemble qu’aucun des deux ne ferait seul. Elle marque une relation qui fonctionne, ou une collaboration pour laquelle il vaut la peine de s’engager. Le lien est bâti sur la confiance et sur le fait que les deux parties tirent dans la même direction. Là où tu l’as, appuie-toi dessus ; là où tu le veux, sois d’abord la moitié fiable.',
  'rune.ehwaz.merk':
    'Inversée, Ehwaz est un partenariat désaccordé — méfiance, une partie qui porte l’autre, ou un mouvement bloqué parce que vous ne voulez plus la même chose. Nomme où la confiance s’est brisée et décide honnêtement si vous chevauchez encore ensemble.',
  'rune.ehwaz.today':
    'Fais une chose avec quelqu’un aujourd’hui plutôt que seul, et sois la moitié sur laquelle on peut compter.',

  'rune.mannaz.meaning': 'L’humain — le soi, et le soi parmi les autres',
  'rune.mannaz.keywords': 'Soi · Communauté · Perspective',
  'rune.mannaz.up':
    'Mannaz est la rune de l’humanité — toi comme individu, et toi comme un nœud dans une toile d’autres. Elle te demande de te voir clairement : tes dons, tes limites et ton reflet dans les gens autour de toi. Elle marque souvent un moment d’avoir besoin des autres, ou d’être nécessaire, ou de te voir honnêtement à travers les yeux d’un autre. Tu n’es pas fait pour faire ça seul, et tu n’en es pas non plus le centre.',
  'rune.mannaz.merk':
    'Inversée, Mannaz est l’isolement, ou une image de toi qui a dérivé loin de la vérité — gonflée ou injustement dure. Tu es peut-être coupé des tiens, ou ton pire critique. Procure-toi un regard extérieur de quelqu’un qui sera honnête et bienveillant.',
  'rune.mannaz.today':
    'Vois-toi aujourd’hui à travers les yeux de quelqu’un qui te connaît bien, et ajuste le portrait là où il est faux.',

  'rune.laguz.meaning': 'L’eau — flux, intuition et l’inconscient profond',
  'rune.laguz.keywords': 'Flux · Intuition · Le profond',
  'rune.laguz.up':
    'Laguz est le lac et la mer : flux, ressenti, rêve et l’eau profonde de l’inconscient où bougent des choses que l’esprit du jour ne peut pas voir. Elle favorise le fait de se fier à une intuition du ventre plutôt qu’à un tableur, d’aller avec le courant plutôt que contre, et de prêter attention à ce que tes rêves et tes humeurs te disent. La marée sait où elle va. Pour l’instant, laisse-la te porter.',
  'rune.laguz.merk':
    'Inversée, Laguz est une inondation, ou le fait d’être tiré sous l’eau — débordé par le ressenti, évitant quelque chose en dérivant, ou une intuition tournée en peur ou en fantasme. Mets les pieds sur terre. Tout courant ne vaut pas la peine d’être suivi, et toute vague n’est pas un avertissement.',
  'rune.laguz.today':
    'Fie-toi aujourd’hui à l’intuition du ventre plutôt qu’à l’argument astucieux, et prête attention à ce que tu rêves cette nuit.',

  'rune.ingwaz.meaning': 'Ing — gestation, potentiel emmagasiné, un cycle achevé',
  'rune.ingwaz.keywords': 'Gestation · Potentiel · Achèvement',
  'rune.ingwaz.up':
    'Ingwaz est la graine scellée dans la terre pendant l’hiver — un potentiel tenu dans un contenant fermé, faisant son travail hors de vue jusqu’à être prêt à se libérer d’un coup. Elle marque la fin d’une gestation : un projet, une décision ou un processus intérieur qui a mijoté en silence est sur le point d’être fait. N’ouvre pas la boîte trop tôt. Quand ce sera fini, ce sera fini proprement, et tu en sentiras le soulagement.',
  'rune.ingwaz.today':
    'Laisse aujourd’hui la chose presque prête finir à son propre rythme. Arrête de la triturer.',

  'rune.dagaz.meaning': 'Le jour — percée, éveil, le tournant de l’obscur au clair',
  'rune.dagaz.keywords': 'Percée · Éveil · Point de bascule',
  'rune.dagaz.up':
    'Dagaz est l’aube : la charnière entre la nuit et le jour, l’instant où la lumière revient et où tout paraît différent. Elle marque une percée — une prise de conscience, un revirement, une situation qui passe de coincée à en mouvement d’un coup. Il n’y a pas de Dagaz inversée ; l’aube ne se dé-produit pas. Quelque chose sur quoi tu étais dans le noir est sur le point de devenir évident. Sois prêt à agir dessus.',
  'rune.dagaz.today':
    'Agis aujourd’hui sur la prise de conscience, tant qu’elle est encore vive. Le discernement s’estompe si on dort dessus trop longtemps.',

  'rune.othala.meaning': 'Le domaine — héritage, patrimoine et ce qui est vraiment à toi',
  'rune.othala.keywords': 'Patrimoine · Foyer · Ce qui dure',
  'rune.othala.up':
    'Othala est la terre ancestrale : ce dont tu hérites, ce à quoi tu appartiens, et les choses qu’on ne peut pas t’enlever parce qu’elles sont tissées dans qui tu es. Elle marque des questions de foyer, de famille, de tradition et de legs — quoi garder de là d’où tu viens, et quoi laisser derrière. Réclame ce qui est vraiment à toi. Soigne-le. Et sois honnête sur quels héritages sont des dons et lesquels ne sont qu’un vieux poids.',
  'rune.othala.merk':
    'Inversée, Othala est un mauvais héritage auquel on s’accroche, ou un déracinement qui ne se pose pas — de vieux schémas familiaux en pilote automatique, ou un refus d’appartenir où que ce soit. Trie les objets de famille. Garde ce qui sert l’avenir ; au reste, donne un enterrement respectueux.',
  'rune.othala.today':
    'Garde aujourd’hui une chose de là d’où tu viens, et dépose consciemment une chose que tu portes par habitude.',
} as const
