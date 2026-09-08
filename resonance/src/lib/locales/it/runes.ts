import type { RunesKey } from '../en/runes'

/**
 * Italiano — il Futhark Antico: significati, lettura dritta e rovesciata
 * (merkstave) e una direttiva quotidiana per ognuna delle 24 rune, più i testi
 * della schermata Rune. I nomi delle rune sono in norreno antico e restano
 * uguali in ogni lingua.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ testi */
  'rune.eyebrow': 'Le Rune',
  'rune.dailyTitle': 'La tua runa di oggi',
  'rune.dailyBlurbChart':
    'Una runa, tratta per il tuo tema e questa data. Si rinnova a mezzanotte.',
  'rune.dailyBlurbPlain': 'Una runa per la giornata. Si rinnova a mezzanotte.',
  'rune.tapReveal': 'Tocca la pietra per girarla.',
  'rune.turnStone': 'Gira la pietra',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'È caduta rovesciata — leggila per il lato in ombra, il blocco o la lezione ancora non appresa.',
  'rune.sound': 'Suono',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'La Ætt di Freyr',
  'rune.aett.2': 'La Ætt di Heimdall',
  'rune.aett.3': 'La Ætt di Týr',

  'rune.element.fire': 'Fuoco',
  'rune.element.ice': 'Ghiaccio',
  'rune.element.earth': 'Terra',
  'rune.element.air': 'Aria',
  'rune.element.water': 'Acqua',
  'rune.element.spirit': 'Spirito',

  'rune.resonance.match':
    'Le rune e il cielo concordano oggi — entrambi puntano al tuo {chakra}.',
  'rune.resonance.bridge':
    'Il cielo di oggi lavora il tuo {sky}; la runa risponde dal tuo {rune}.',

  'rune.cast': 'Getta le rune',
  'rune.castSub': 'Le Tre Norne, o la croce di cinque rune',
  'rune.chooseTitle': 'Scegli una stesa',
  'rune.chooseBlurb': 'Tieni la tua domanda, poi scegli come devono cadere le rune.',
  'rune.runeCount.one': '1 runa',
  'rune.runeCount.many': '{n} rune',
  'rune.castEyebrow': 'Le Rune · {layout}',
  'rune.drawAgain': 'Getta di nuovo',
  'rune.doCast': 'Getta',

  'rune.layout.norns': 'Le Tre Norne',
  'rune.layout.nornsSub': 'Ciò che è diventato, ciò che sta diventando, ciò che è dovuto',
  'rune.layout.cross': 'La Croce di Cinque Rune',
  'rune.layout.crossSub': 'Uno sguardo più completo a una situazione',

  'rune.pos.now': 'Ora',
  'rune.pos.now.prompt': 'dove ti trovi',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'ciò che è diventato — la sua radice',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'ciò che sta diventando — la svolta presente',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'ciò che sarà — ciò che è dovuto, e dove porta',
  'rune.pos.heart': 'Il cuore',
  'rune.pos.heart.prompt': 'il nucleo della questione',
  'rune.pos.crossing': 'Ciò che lo attraversa',
  'rune.pos.crossing.prompt': 'l’ostacolo o l’aiuto',
  'rune.pos.root': 'La radice',
  'rune.pos.root.prompt': 'da cosa cresce',
  'rune.pos.counsel': 'Il consiglio',
  'rune.pos.counsel.prompt': 'ciò che consigliano le rune',
  'rune.pos.outcome': 'Dove porta',
  'rune.pos.outcome.prompt': 'la direzione in cui tende',

  'rune.ask': 'Interroga le rune',
  'rune.askSub': 'Una runa, una risposta alla tua domanda',
  'rune.askEyebrow': 'Le Rune · La Domanda',
  'rune.askBlurb':
    'Poni la tua domanda con chiarezza e tienila mentre la runa viene tratta.',
  'rune.askPlaceholder': 'Dovrei…  ·  È il momento di…  ·  Cosa devo sapere di…',
  'rune.consult': 'Trai una runa',
  'rune.askAgain': 'Interroga di nuovo',
  'rune.youAsked': 'Hai chiesto',
  'rune.answerReading': 'Cosa dice la runa',
  'rune.castReading': 'La lettura',

  'rune.verdict.yes': 'Sì',
  'rune.verdict.no': 'No',
  'rune.verdict.wait': 'Non ancora',
  'rune.verdict.hidden': 'Nascosto',
  'rune.verdict.yes.gloss': 'La runa pende verso il sì. Muoviti, e con intenzione.',
  'rune.verdict.no.gloss': 'La runa si allontana. Forzare questo ora costa più di quanto renda.',
  'rune.verdict.wait.gloss':
    'La runa dice che il tempo non è maturo. Preparati e lascia che il momento venga a te.',
  'rune.verdict.hidden.gloss':
    'La runa tiene per sé il suo consiglio. Questo non è tuo da sapere ancora — la risposta si sta ancora formando.',

  'rune.library': 'Il Futhark Antico',
  'rune.librarySub': 'Tutte e ventiquattro, per sedersi con loro',

  'dash.dailyRune': 'Runa del giorno',
  'dash.runeSeen': 'La runa di oggi è girata',
  'dash.runeNew': 'Getta la tua runa di oggi',

  /* ---------------------------------------------- La Ætt di Freyr (1–8) */
  'rune.fehu.meaning': 'Bestiame — ricchezza mobile, e ciò che può comprare o costare',
  'rune.fehu.keywords': 'Ricchezza · Inizi · Flusso',
  'rune.fehu.up':
    'Fehu è la mandria: ricchezza che si muove, si moltiplica e sfugge se viene accumulata. Segna l’arrivo di risorse nuove — denaro, energia, opportunità, posizione — e l’avvio di qualcosa che può crescere. La trappola è nella sua natura: questo resta vivo solo se continua a circolare. Spendine un po’, condividine un po’, mettilo al lavoro. Ciò che stringi, lo perdi.',
  'rune.fehu.merk':
    'Rovesciata, Fehu è perdita, o ricchezza che possiede te invece del contrario. Qualcosa si sta prosciugando, o custodisci una risorsa così stretta che ha smesso di servirti a qualcosa. Guarda dove vanno davvero la tua energia e il tuo denaro, e sii onesto su cosa vale la pena tenere.',
  'rune.fehu.today':
    'Metti qualcosa in circolo oggi — denaro, sforzo o una parola gentile che stavi mettendo da parte.',

  'rune.uruz.meaning': 'L’uro — forza vitale selvaggia, non domata',
  'rune.uruz.keywords': 'Vitalità · Resistenza · Forma grezza',
  'rune.uruz.up':
    'Uruz è il bue selvaggio: potere che non è stato piegato all’aratro. Porta un’ondata di vitalità fisica, resistenza testarda e la forza di plasmare la circostanza grezza in qualcosa di tuo. È una buona runa per inizi che hanno bisogno di muscoli — cominciare l’allenamento, rompere il terreno, tenere un confine. La forza è reale; il lavoro è imparare a guidarla.',
  'rune.uruz.merk':
    'Rovesciata, Uruz è forza usata male o assente — potenza rivolta contro te stesso, o una debolezza dove devi stare saldo. Forse stai spingendo quando dovresti fermarti, o lasci qualcosa di selvaggio nella tua vita senza gestione. Riprenditi il potere senza lasciare che ti comandi.',
  'rune.uruz.today':
    'Usa il corpo oggi — cammina a lungo, solleva qualcosa di pesante o attraversa una cosa che stai rimandando.',

  'rune.thurisaz.meaning': 'La spina — una forza affilata, reattiva e difensiva',
  'rune.thurisaz.keywords': 'Difesa · Reazione · Una porta dura',
  'rune.thurisaz.up':
    'Thurisaz è la spina della siepe e il martello del gigante: una forza che protegge ferendo e sgombra rompendo. Spesso segna un confronto, un confine duro o una situazione che non cede al fascino. Affrontata di petto ferisce; affrontata con pazienza diventa una porta. Non cercare questa lite, ma non fingere nemmeno che la spina non ci sia.',
  'rune.thurisaz.merk':
    'Rovesciata, Thurisaz è una difesa che è diventata un muro, o un temperamento reattivo che fa danni. Forse stai sferzando, o sei così blindato contro l’attacco che nemmeno il bene ti raggiunge. Posa il martello prima di calarlo su qualcuno che non se l’è meritato.',
  'rune.thurisaz.today':
    'Tieni un confine oggi senza scusarti per esso — e resisti alla voglia di spiegarlo tre volte.',

  'rune.ansuz.meaning': 'Il dio — il respiro, la parola, il messaggio di Odino',
  'rune.ansuz.keywords': 'Voce · Messaggio · Intuizione',
  'rune.ansuz.up':
    'Ansuz è il respiro del Padre di Tutti: parola, segnale e la chiarezza improvvisa che arriva da fuori del tuo sforzo. Sta arrivando un messaggio, o una conversazione conta più di quanto sembri. Regge anche la tua voce — questo è il giorno per dire la cosa vera con chiarezza, per insegnare, per nominare ciò che vedi. Ascolta da vicino; la risposta può essere in bocca a un altro.',
  'rune.ansuz.merk':
    'Rovesciata, Ansuz è cattiva comunicazione, un messaggio frainteso, o saggezza che ti rifiuti di sentire per via di chi la porta. Si usano parole per confondere invece di chiarire — tue o di un altro. Rallenta la conversazione e verifica cosa si intendesse davvero.',
  'rune.ansuz.today':
    'Di’ la cosa chiara ad alta voce oggi, e ascolta il doppio di quanto parli.',

  'rune.raidho.meaning': 'La cavalcata — il viaggio, la ruota, il ritmo giusto',
  'rune.raidho.keywords': 'Viaggio · Ritmo · Ordine giusto',
  'rune.raidho.up':
    'Raidho è il carro sulla strada: movimento con una direzione, e la sensazione di essere portato lungo un sentiero che ha un suo ritmo. Favorisce il viaggio, le decisioni che ti mettono in moto e il rimettere le cose nel loro ordine dovuto. La lezione è che il viaggio ha un ritmo suo — non puoi mettere fretta alla strada, ma puoi smettere di lottare con essa.',
  'rune.raidho.merk':
    'Rovesciata, Raidho è un viaggio bloccato, un piano fuori sequenza, o movimento nella direzione sbagliata. Qualcosa è fuori ritmo — un viaggio che non dovresti fare, o una fretta che ti costerà. Metti in ordine le cose prima di ripartire.',
  'rune.raidho.today':
    'Fai il prossimo passo giusto in ordine oggi; resisti alla voglia di saltare alla parte interessante.',

  'rune.kenaz.meaning': 'La torcia — fuoco controllato, mestiere e conoscenza',
  'rune.kenaz.keywords': 'Intuizione · Mestiere · Fuoco creativo',
  'rune.kenaz.up':
    'Kenaz è la fiamma nella sala: non l’incendio ma il fuoco lavorato — la fucina, la lampada, la scintilla del comprendere. Porta chiarezza in un angolo buio, abilità a un compito e il calore creativo per fare e non solo immaginare. Qualcosa su cui sei stato al buio diventa visibile. Prendi ciò che ora vedi e dagli forma in qualcosa di reale.',
  'rune.kenaz.merk':
    'Rovesciata, Kenaz è una luce che si spegne — ispirazione perduta, un progetto che si raffredda, o conoscenza usata per bruciare invece che costruire. Forse sei bloccato creativamente, o aggrappato a un modo di fare le cose che non getta più luce. Lascia che la cosa morta si spenga così una fiamma nuova può prendere.',
  'rune.kenaz.today':
    'Fai qualcosa oggi, per quanto piccolo e grezzo — il punto è portare un’idea nella forma.',

  'rune.gebo.meaning': 'Il dono — lo scambio, e il legame che crea',
  'rune.gebo.keywords': 'Dono · Scambio · Partnership',
  'rune.gebo.up':
    'Gebo è il dono dato e il dono dovuto — il filo di obbligo e generosità che lega le persone. Segna uno scambio genuino: una partnership, un contratto, un atto di dare che tornerà. Non c’è Gebo rovesciata, perché un dono, una volta dato, non può essere ri-tolto. Da’ liberamente e ricevi con grazia, e guarda l’equilibrio pareggiarsi nel tempo.',
  'rune.gebo.today':
    'Da’ qualcosa oggi senza un libro dei conti in mente — e concediti di accettare ciò che ti viene offerto in cambio.',

  'rune.wunjo.meaning': 'Gioia — armonia, appartenenza e cose che vanno al loro posto',
  'rune.wunjo.keywords': 'Gioia · Armonia · Appartenenza',
  'rune.wunjo.up':
    'Wunjo è la gioia della sala ben tenuta: non estasi ma contentezza, la sensazione che le cose combacino e di essere tra i tuoi. Segna una risoluzione, una ricompensa guadagnata, o un momento in cui i pezzi si allineano. Concediti di notarlo. Questa runa ti chiede di accettare il bene che è davvero qui invece di tenere duro per una versione migliore.',
  'rune.wunjo.merk':
    'Rovesciata, Wunjo è gioia rimandata o un’armonia falsa tenuta insieme dal non dire la cosa difficile. Qualcosa è stonato sotto la superficie. Non coprirlo — la vera scioltezza arriva dopo la conversazione onesta, non al suo posto.',
  'rune.wunjo.today':
    'Nomina una cosa che va davvero bene, e lascia che basti per oggi.',

  /* -------------------------------------------- La Ætt di Heimdall (9–16) */
  'rune.hagalaz.meaning': 'Grandine — disturbo improvviso fuori dal tuo controllo',
  'rune.hagalaz.keywords': 'Disturbo · Crisi · Sgombro',
  'rune.hagalaz.up':
    'Hagalaz è la grandinata: distruzione che cade dal cielo, rovina il raccolto e poi si scioglie nell’acqua che nutre il successivo. Segna un’interruzione che non hai scelto e con cui non puoi discutere — un evento che rompe lo schema. Qui non c’è niente da combattere. Riparati, lascia che passi e guarda cosa è ancora in piedi dopo. La grandine sgombra il terreno.',
  'rune.hagalaz.today':
    'Non iniziare niente di fragile oggi. Serra i boccaporti, aspetta che passi il tempo e confida che il terreno si sgombra.',

  'rune.nauthiz.meaning': 'Bisogno — attrito, costrizione e il fuoco che genera',
  'rune.nauthiz.keywords': 'Costrizione · Bisogno · Lezione dura',
  'rune.nauthiz.up':
    'Nauthiz è il fuoco del bisogno, acceso strofinando due bastoni sotto pressione. Segna una costrizione — una scarsità, un ritardo, una situazione da cui non puoi ancora uscire — e l’ingegno che quella costrizione ti costringe a tirare fuori. La lezione è pazienza sotto attrito. Affronta la mancanza con onestà, fai la piccola cosa disciplinata in tuo potere, e lascia che la resistenza ti insegni di cosa hai davvero bisogno.',
  'rune.nauthiz.merk':
    'Rovesciata, Nauthiz è bisogno negato — fingere che la costrizione non ci sia, o lasciare che la difficoltà si inacidisca in rancore e decisioni avventate. Smetti di lottare con il fatto del limite. La via d’uscita è accettazione prima, poi azione paziente e deliberata.',
  'rune.nauthiz.today':
    'Accetta un limite oggi invece di discuterci, e fai l’unica piccola cosa disciplinata che ti lascia aperta.',

  'rune.isa.meaning': 'Ghiaccio — immobilità, un punto morto, l’istante congelato',
  'rune.isa.keywords': 'Immobilità · Punto morto · Chiarezza',
  'rune.isa.up':
    'Isa è il fiume ghiacciato del tutto: ogni moto fermo, tutto tenuto al suo posto. Segna un punto morto — un piano in sospeso, una relazione in stasi, un periodo in cui niente di ciò che spingi sembra muoversi. Questo non è un fallimento; è inverno. Smetti di forzare il disgelo. Usa l’immobilità per vedere con chiarezza cosa c’è sotto il ghiaccio, e conserva la forza per la primavera.',
  'rune.isa.today':
    'Smetti di spingere la cosa bloccata oggi. Siediti con essa, guardala con chiarezza e lascia che l’immobilità faccia il suo lavoro.',

  'rune.jera.meaning': 'L’anno — raccolto, cicli e sforzo che dà frutto',
  'rune.jera.keywords': 'Raccolto · Cicli · Tempo giusto',
  'rune.jera.up':
    'Jera è l’anno che gira: seme, crescita, raccolto, riposo e di nuovo seme. Segna il punto in cui lo sforzo di prima finalmente rende — non per un colpo di fortuna ma perché è passato tempo a sufficienza ed è stato fatto lavoro a sufficienza. Consiglia anche pazienza con ciò che non è ancora maturo. Non puoi mettere fretta a una stagione. Cura ciò che hai piantato e raccogli ciò che è pronto.',
  'rune.jera.today':
    'Incassa qualcosa che hai piantato tempo fa — finiscilo, mettilo da parte, o semplicemente nota che ha funzionato.',

  'rune.eihwaz.meaning': 'Il tasso — l’asse tra la vita e la morte, resistenza',
  'rune.eihwaz.keywords': 'Resistenza · Trasformazione · L’asse',
  'rune.eihwaz.up':
    'Eihwaz è il tasso, sempreverde e velenoso, con le radici nell’oltretomba e la chioma nella luce — il palo che attraversa i mondi. Segna resistenza attraverso un passaggio duro, e un cambiamento che arriva fino in fondo. Qualcosa deve finire perché la cosa successiva viva. Sta’ come il tasso: radicato, immobile, connesso sia a ciò che muore sia a ciò che nasce.',
  'rune.eihwaz.today':
    'Affronta oggi il finale che stai evitando — non per forzarlo, solo per smettere di fingere che non stia accadendo.',

  'rune.perthro.meaning': 'Il bossolo delle sorti — mistero, caso e ciò che il destino tiene nascosto',
  'rune.perthro.keywords': 'Mistero · Caso · L’invisibile',
  'rune.perthro.up':
    'Perthro è il bossolo da cui si scuotono le sorti — il momento prima che i dadi cadano, quando l’esito esiste ma non può essere visto. Regge i segreti, le influenze nascoste, la fortuna e le parti dello schema che semplicemente non sono tue da conoscere ancora. Qualcosa si sta decidendo fuori dalla vista. Gioca bene la tua parte e lascia che il getto cada; non tutto è pensato per essere risolto in anticipo.',
  'rune.perthro.merk':
    'Rovesciata, Perthro è un segreto che deve restare sepolto che viene dissotterrato, o una fissazione malsana sul conoscere l’esito. Smetti di forzare la rivelazione. Alcune cose marciscono alla luce prima del loro tempo.',
  'rune.perthro.today':
    'Lascia che una cosa resti sconosciuta oggi. Fa’ la tua parte e smetti di aggiornare la pagina.',

  'rune.algiz.meaning': 'L’alce — protezione, e lo slancio verso il più alto',
  'rune.algiz.keywords': 'Protezione · Connessione · Aiuto dall’alto',
  'rune.algiz.up':
    'Algiz è l’alce con le corna alzate, e il carice che taglia la mano che lo afferra — una runa di protezione e del legame tra te e qualcosa di più grande. Segna uno scudo intorno a te proprio ora, e sostegno disponibile sopra il tuo livello se lo raggiungi. Chiedi aiuto. Sta’ dritto. Ciò che veglia su di te è dalla tua parte.',
  'rune.algiz.merk':
    'Rovesciata, Algiz è protezione abbassata o aiuto rifiutato — lasciarti scoperto dove dovresti essere protetto, o tagliarti fuori dal sostegno che c’è. Controlla le tue difese e lascia entrare qualcuno.',
  'rune.algiz.today':
    'Chiedi aiuto per una cosa oggi, a una persona o a un potere sopra il tuo grado.',

  'rune.sowilo.meaning': 'Il sole — interezza, successo e la volontà che guida',
  'rune.sowilo.keywords': 'Successo · Interezza · Volontà chiara',
  'rune.sowilo.up':
    'Sowilo è la ruota solare: la luce che torna sempre, la vittoria che viene da una volontà puntata con fermezza su una sola cosa. Segna successo, salute e una forza chiarificatrice che brucia la nebbia. Non c’è Sowilo rovesciata — il sole non va all’indietro. Punta la tua energia a ciò che conta, tienila lì e aspettati che l’esito vada a tuo favore.',
  'rune.sowilo.today':
    'Punta tutto a un obiettivo oggi. Senza coprirti le spalle, senza un secondo bersaglio — solo quello, fino al buio.',

  /* --------------------------------------------------- La Ætt di Týr (17–24) */
  'rune.tiwaz.meaning': 'Týr — giustizia, coraggio e il sacrificio volontario',
  'rune.tiwaz.keywords': 'Giustizia · Coraggio · Sacrificio',
  'rune.tiwaz.up':
    'Tiwaz è la lancia e la mano che Týr diede al lupo per mantenere la parola — una runa di giustizia, onore e fare la cosa giusta a un costo reale. Favorisce le questioni legali, le lotte leali e lo stare dietro a un impegno quando smette di essere comodo. Puntati a ciò che è vero e tieni la linea. La vittoria qui è di quelle con cui puoi vivere dopo.',
  'rune.tiwaz.merk':
    'Rovesciata, Tiwaz è coraggio che viene meno, un impegno abbandonato, o giustizia storta. Forse stai evitando una presa di posizione che sai di dover prendere, o spendi la tua energia in una lotta che non è onesta. Rimpegnati con ciò che è davvero giusto, anche se ti costa la vittoria.',
  'rune.tiwaz.today':
    'Mantieni oggi una promessa diventata scomoda, e prendi la posizione che stai schivando.',

  'rune.berkano.meaning': 'La betulla — crescita, cura e inizi nuovi e quieti',
  'rune.berkano.keywords': 'Crescita · Cura · Inizi nuovi',
  'rune.berkano.up':
    'Berkano è la betulla, primo albero a rinverdire dopo il ghiaccio — una runa di crescita gentile e riparata: gravidanza, un progetto nuovo nella sua fase tenera, guarigione, la cura che lascia diventare forte una cosa piccola. Ti chiede di allevare invece di spingere. Proteggi il germoglio nuovo, nutrilo, tieni il gelo lontano e lascialo crescere al ritmo che la crescita davvero ha.',
  'rune.berkano.merk':
    'Rovesciata, Berkano è crescita bloccata o cura ritirata — una cosa nuova trascurata, un nodo familiare, o l’autotrascuratezza travestita da durezza. Qualcosa ha bisogno di cure che stai lasciando arrangiarsi da solo. Torna indietro e allevalo come si deve.',
  'rune.berkano.today':
    'Cura oggi una cosa che cresce — una persona, un piano o te stesso — con cura vera, non solo con intenzione.',

  'rune.ehwaz.meaning': 'Il cavallo — partnership, fiducia e movimento saldo',
  'rune.ehwaz.keywords': 'Partnership · Fiducia · Slancio',
  'rune.ehwaz.up':
    'Ehwaz è il cavallo e il cavaliere che si muovono come uno — una runa di partnership di fiducia, lavoro di squadra e progresso fatto insieme che nessuno dei due farebbe da solo. Segna una relazione che funziona, o una collaborazione per cui vale la pena impegnarsi. Il legame è costruito sulla fiducia e sul fatto che entrambe le parti tirino nella stessa direzione. Dove ce l’hai, appoggiati; dove lo vuoi, sii prima tu la metà affidabile.',
  'rune.ehwaz.merk':
    'Rovesciata, Ehwaz è una partnership fuori passo — sfiducia, una parte che porta l’altra, o movimento bloccato perché non volete più la stessa cosa. Nomina dove si è rotta la fiducia e decidi con onestà se state ancora cavalcando insieme.',
  'rune.ehwaz.today':
    'Fai una cosa con qualcuno oggi invece che da solo, e sii la metà su cui si può contare.',

  'rune.mannaz.meaning': 'L’umano — il sé, e il sé tra gli altri',
  'rune.mannaz.keywords': 'Sé · Comunità · Prospettiva',
  'rune.mannaz.up':
    'Mannaz è la runa dell’umanità — tu come individuo, e tu come un nodo in una rete di altri. Ti chiede di vederti con chiarezza: i tuoi doni, i tuoi limiti e il tuo riflesso nelle persone attorno a te. Spesso segna un momento di aver bisogno degli altri, o di essere necessario, o di vederti con onestà attraverso gli occhi di un altro. Non sei fatto per farlo da solo, e non ne sei nemmeno il centro.',
  'rune.mannaz.merk':
    'Rovesciata, Mannaz è isolamento, o un’immagine di te che si è allontanata dalla verità — gonfiata o ingiustamente dura. Forse sei tagliato fuori dalla tua gente, o il tuo peggior critico. Procurati uno sguardo esterno da qualcuno che sarà onesto e gentile.',
  'rune.mannaz.today':
    'Vediti oggi attraverso gli occhi di qualcuno che ti conosce bene, e aggiusta il ritratto dove è sbagliato.',

  'rune.laguz.meaning': 'Acqua — flusso, intuito e l’inconscio profondo',
  'rune.laguz.keywords': 'Flusso · Intuito · Il profondo',
  'rune.laguz.up':
    'Laguz è il lago e il mare: flusso, sentire, sogno e l’acqua profonda dell’inconscio dove si muovono cose che la mente diurna non può vedere. Favorisce il fidarsi di un’intuizione di pancia più che di un foglio di calcolo, l’andare con la corrente invece che contro, e il prestare attenzione a ciò che i tuoi sogni e i tuoi umori ti dicono. La marea sa dove va. Per ora, lascia che ti porti.',
  'rune.laguz.merk':
    'Rovesciata, Laguz è un’inondazione, o l’essere tirato sotto — sopraffatto dal sentire, evitando qualcosa alla deriva, o un intuito inacidito in paura o fantasia. Metti i piedi a terra. Non ogni corrente vale la pena seguirla, e non ogni onda è un avvertimento.',
  'rune.laguz.today':
    'Fidati oggi dell’intuizione di pancia più che dell’argomento astuto, e presta attenzione a cosa sogni stanotte.',

  'rune.ingwaz.meaning': 'Ing — gestazione, potenziale conservato, un ciclo completato',
  'rune.ingwaz.keywords': 'Gestazione · Potenziale · Completamento',
  'rune.ingwaz.up':
    'Ingwaz è il seme sigillato nella terra durante l’inverno — potenziale trattenuto in un contenitore chiuso, che fa il suo lavoro fuori dalla vista finché non è pronto a rilasciarsi tutto insieme. Segna la fine di una gestazione: un progetto, una decisione o un processo interno che ha cotto in silenzio sta per essere pronto. Non aprire la scatola in anticipo. Quando finisce, finirà con pulizia, e ne sentirai il sollievo.',
  'rune.ingwaz.today':
    'Lascia oggi che la cosa quasi pronta finisca nei suoi tempi. Smetti di stuzzicarla.',

  'rune.dagaz.meaning': 'Giorno — svolta, risveglio, il passaggio dal buio alla luce',
  'rune.dagaz.keywords': 'Svolta · Risveglio · Punto di svolta',
  'rune.dagaz.up':
    'Dagaz è l’alba: il cardine tra la notte e il giorno, il momento in cui la luce torna e tutto sembra diverso. Segna una svolta — una comprensione, un cambio di cuore, una situazione che passa da bloccata a in moto tutta insieme. Non c’è Dagaz rovesciata; l’alba non si dis-fa. Qualcosa su cui sei stato al buio sta per diventare ovvio. Sii pronto ad agirci.',
  'rune.dagaz.today':
    'Agisci oggi sulla comprensione, mentre è ancora luminosa. L’intuizione svanisce se ci dormi sopra troppo a lungo.',

  'rune.othala.meaning': 'Il podere — eredità, retaggio e ciò che è davvero tuo',
  'rune.othala.keywords': 'Retaggio · Casa · Ciò che dura',
  'rune.othala.up':
    'Othala è la terra ancestrale: ciò che erediti, ciò a cui appartieni e le cose che non possono esserti tolte perché sono intessute in chi sei. Segna questioni di casa, famiglia, tradizione e lascito — cosa tenere di dove vieni e cosa lasciare indietro. Reclama ciò che è davvero tuo. Curalo. E sii onesto su quali eredità sono doni e quali sono solo peso vecchio.',
  'rune.othala.merk':
    'Rovesciata, Othala è una cattiva eredità a cui aggrapparsi, o uno sradicamento che non si posa — vecchi schemi familiari sul pilota automatico, o un rifiuto di appartenere a un posto. Metti in ordine i cimeli. Tieni ciò che serve al futuro; al resto, da’ una sepoltura rispettosa.',
  'rune.othala.today':
    'Tieni oggi una cosa di dove vieni, e deponi a mente lucida una cosa che porti per abitudine.',
} as const
