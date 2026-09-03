import type { MeditationKey } from '../en/meditation'

/** Italiano — meditazioni guidate: un riassunto da leggere una volta, poi passi scanditi da una campana. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'la base della colonna, dove incontri il terreno',
  'med.seat.sacral': 'il basso ventre, un palmo sotto l’ombelico',
  'med.seat.solar-plexus': 'il punto morbido sotto le costole',
  'med.seat.heart': 'il centro del petto',
  'med.seat.throat': 'l’incavo della gola',
  'med.seat.third-eye': 'lo spazio tra le sopracciglia',
  'med.seat.crown': 'la sommità del capo, e un po’ più su',
  'med.chakraLower': 'il centro {chakra}',

  'med.house.1': 'come ti presenti e come incontri il mondo',
  'med.house.2': 'ciò che valorizzi e ciò che ti stabilizza',
  'med.house.3': 'la tua mente quotidiana e le parole che usi',
  'med.house.4': 'casa, radici, e dove ti senti sostenuto',
  'med.house.5': 'gioco, creatività, e ciò che ti dà gioia',
  'med.house.6': 'il lavoro quotidiano di prenderti cura di te',
  'med.house.7': 'le persone più vicine a te',
  'med.house.8': 'ciò che finisce, e ciò che condividi in profondità',
  'med.house.9': 'il significato, e la visione più ampia',
  'med.house.10': 'il tuo lavoro nel mondo e come vieni visto',
  'med.house.11': 'la tua gente, e ciò verso cui ti tendi',
  'med.house.12': 'riposo, solitudine, e la quiete sotto ogni cosa',

  'med.invite.Sun': 'Lascia che qui si raccolga un calore stabile — la tua stessa luce, senza complicazioni.',
  'med.invite.Moon': 'Lascia che qualunque cosa senti semplicemente sia qui, senza bisogno di sistemarla.',
  'med.invite.Mercury': 'Lascia che il pensiero rallenti. Non devi risolvere niente ora.',
  'med.invite.Venus': 'Ammorbidisciti verso di te come faresti verso qualcuno che ami.',
  'med.invite.Mars': 'Nota ogni calore o urgenza, e lascia che l’espirazione ne porti via una parte.',
  'med.invite.Jupiter': 'Lascia che questo spazio si senta un po’ più ampio di un momento fa.',
  'med.invite.Saturn': 'Incontra il peso qui con onestà. Puoi sostenere più di quanto pensi.',
  'med.invite.Uranus': 'Lascia che qualcosa si allenti — una presa, una vecchia forma che non ti serve più.',
  'med.invite.Neptune': 'Lascia che i contorni sfumino. Ti è concesso di non sapere per un po’.',
  'med.invite.Pluto': 'Lascia che ciò che è finito finisca. Respira nello spazio che lascia.',
  'med.invite.default': 'Lascia che questa energia si muova attraverso di te, non dentro di te.',

  'med.ease.hard': 'Oggi c’è attrito in {dominant}. Non sei qui per spingerci attraverso — solo per sentirlo con chiarezza e restare morbido intorno.',
  'med.ease.soft': '{dominant} fluisce oggi. Nota la facilità, e permettiti di riceverla.',
  'med.ease.neutral': '{dominant} è intenso oggi. Lascia che ti attraversi invece di alloggiarsi nel corpo.',

  'med.dominant.aspect': '{planet} {verb} il tuo {other} natale',
  'med.dominant.sign': '{planet} in transito attraverso {sign}',
  'med.dominant.chartWord': 'tema',
  'med.domverb.conjunction': 'che incontra',
  'med.domverb.opposition': 'in opposizione a',
  'med.domverb.square': 'in quadratura con',
  'med.domverb.trine': 'in trigono con',
  'med.domverb.sextile': 'in sestile con',

  'med.houseLine.known': 'Questo tocca la parte della tua vita che riguarda {theme}. Tienilo con leggerezza. Qui non c’è niente da decidere — solo da notare.',
  'med.houseLine.unknown': 'Qualunque cosa questo smuova nella tua vita, lascia che si posi per la durata di questa pratica. Sarà ancora lì quando finisci, e la incontrerai con più spazio.',

  'med.mantraLong.root': 'Sono al sicuro. Sono qui. Ho ciò che mi serve.',
  'med.mantraLong.sacral': 'Lascio che la vita si muova attraverso di me.',
  'med.mantraLong.solar-plexus': 'Mi fido del mio fuoco.',
  'med.mantraLong.heart': 'Do e ricevo amore liberamente.',
  'med.mantraLong.throat': 'Dico la mia verità con facilità.',
  'med.mantraLong.third-eye': 'Mi fido di ciò che vedo dentro.',
  'med.mantraLong.crown': 'Sono parte di qualcosa di vasto, e mi sostiene.',

  'med.title.fallback': 'meditazione del centro {chakra}',

  /* ---- il riassunto, da leggere una volta prima di iniziare ---- */
  'med.brief.lead': 'Leggi questo una volta, poi chiudi gli occhi. Ogni passo si apre con una campana — resta con esso fino alla successiva.',
  'med.brief.close': 'Tre campane morbide chiudono la pratica. Torna con i tuoi tempi.',

  /* ---- passi generici ---- */
  'med.step.settle': 'Occhi chiusi. Lascia che il corpo si posi e il respiro rallenti da solo.',
  'med.step.breath': 'Appoggia l’attenzione sul respiro — seguilo dentro, seguilo fuori. Quando la mente vaga, quell’accorgersene è la pratica. Torna, con dolcezza.',
  'med.step.centre': 'Porta la tua attenzione a {seat}. Respira come se il respiro stesso raggiungesse il {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'In silenzio, al ritmo del respiro: {affirmation}',
  'med.step.close': 'Lascia andare la pratica. Nota come ti senti ora, prima di aprire gli occhi.',

  /* ---- consapevolezza del respiro ---- */
  'med.step.ba.count': 'Ora conta ogni espirazione — da uno a dieci, poi ricomincia. Se perdi il conto, riparti semplicemente da uno. Nessuno tiene il punteggio.',

  /* ---- scansione del corpo ---- */
  'med.step.scan.0': 'Percorri l’attenzione lentamente dalle piante dei piedi verso l’alto — caviglie, gambe, fianchi, ventre, schiena, petto, braccia, mani. Riposa qualche respiro dove incontri tensione, e lascia che si ammorbidisca.',
  'med.step.scan.1': 'Ora le spalle, la gola, la mascella, lo spazio intorno agli occhi, il cuoio capelluto. Poi senti tutto il corpo insieme — pesante, caldo, che respira da solo.',

  /* ---- gentilezza amorevole ---- */
  'med.step.metta.0': 'Portati alla mente, così come sei oggi. In silenzio offri: che io sia al sicuro, che io stia bene, che io sia in pace. Ripetilo lentamente e permettiti di intenderlo davvero.',
  'med.step.metta.1': 'Porta alla mente qualcuno che ami con facilità. Immagina il suo viso e offrigli lo stesso: che tu sia al sicuro, che tu stia bene, che tu sia in pace.',
  'med.step.metta.2': 'Ora allargalo — qualcuno che conosci appena, qualcuno che trovi difficile, poi tutti, ovunque: che tutti gli esseri siano al sicuro, che tutti gli esseri siano in pace.',

  /* ---- bagno di suono ---- */
  'med.step.bath.0': 'Lascia che il tono venga in primo piano. Non ascolti con sforzo — lasci che il suono arrivi, come arriva la luce.',
  'med.step.bath.1': 'Nota in quale parte del corpo il suono sembra posarsi — il petto, il cranio, le mani. Lascia che lo spazio tra te e il suono si dissolva.',

  /* ---- gratitudine ---- */
  'med.step.grat.0': 'Porta alla mente una cosa dell’ultimo giorno che è andata bene, per quanto piccola. Non limitarti a nominarla — senti dove si posa la gratitudine nel corpo.',
  'med.step.grat.1': 'Ora qualcosa che di solito dai per scontato — un corpo che funziona, un tetto, qualcuno che è rimasto. Restaci qualche respiro.',
  'med.step.grat.2': 'Un’altra — qualcosa su di te. Un modo in cui ci sei stato, una cosa che hai gestito, uno sforzo che nessuno ha visto. Tieni le tre insieme.',

  /* ---- luogo sicuro ---- */
  'med.step.safe.0': 'Immagina un luogo dove ti senti completamente al sicuro — reale o immaginato. Guardalo lentamente: la luce, l’ora del giorno, cosa senti, cosa percepisci sulla pelle.',
  'med.step.safe.1': 'Trova il punto qui dove più vorresti riposare, e vacci. Nulla ti è richiesto. Nulla ti raggiunge che tu non permetta.',

  /* ---- montagna ---- */
  'med.step.mtn.0': 'Immagina una montagna — la sua base ampia, i suoi fianchi solidi, la sua vetta ferma. Lascia che il tuo corpo e la montagna siano la stessa forma: la seduta come base, la colonna come pendio, la testa come cima.',
  'med.step.mtn.1': 'Il tempo va e viene intorno alla montagna — luce, nuvola, vento, tempesta. I tuoi pensieri e i tuoi umori sono il tempo. La montagna non discute con esso, e non ne viene diminuita.',

  /* ---- consapevolezza aperta ---- */
  'med.step.open.0': 'Lascia andare l’ancora del respiro. Lascia che l’attenzione sia spalancata, non su nulla in particolare. Suoni, sensazioni, pensieri sorgono e passano — non li insegui né li allontani.',
  'med.step.open.1': 'Nota che la consapevolezza stessa non si muove. Le cose accadono al suo interno, come le nuvole accadono nel cielo. Riposa come quel cielo — niente da aggiungere, niente da togliere.',

  /* ---- intenzione del mattino ---- */
  'med.step.morn.0': 'Tre respiri più pieni, un po’ più profondi del solito — lascia che sveglino il corpo da dentro. Ruota le spalle indietro una volta e senti il fronte del corpo aprirsi.',
  'med.step.morn.1': 'Porta alla mente la giornata che viene, senza stringere, poi scegli un’intenzione — non un compito, un modo di essere. Paziente. Onesto. Coraggioso. Gentile. Dillo una volta: oggi sarò ___.',

  /* ---- rilascio della sera ---- */
  'med.step.eve.0': 'Lascia che la giornata scorra leggera, come il paesaggio dal finestrino di un treno — mattina, mezzogiorno, sera. Non fermarti su nulla. Se un momento tira, annotalo e di’: non ora.',
  'med.step.eve.1': 'Trova un momento di cui sei contento che sia accaduto, e una cosa che hai fatto bene quanto potevi. Che questo basti. Ora lascia andare l’intera giornata — è completa semplicemente perché è finita.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Sdraiati completamente immobile — più immobile di quanto sembri naturale, solo il respiro si muove. Fissa una breve intenzione, una sola frase calma al presente. Dilla dentro tre volte.',
  'med.step.nidra.1': 'Porta l’attenzione a ogni punto man mano che viene nominato, senza muoverti — mano destra: pollice, dita, palmo, polso, avambraccio, gomito, spalla. Poi lo stesso a sinistra.',
  'med.step.nidra.2': 'Entrambi i fianchi. Gamba destra — coscia, ginocchio, stinco, caviglia, piede, dita. Gamba sinistra uguale. Tutta la schiena contro il pavimento, il ventre che sale e scende, il petto, la gola.',
  'med.step.nidra.3': 'Il viso — mascella, labbra, naso, guance, occhi, lo spazio tra le sopracciglia, il cuoio capelluto. Ora tutto il corpo insieme, che brilla lieve, sostenuto dal pavimento. Torna alla tua intenzione.',
}
