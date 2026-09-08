import type { DeepReadingKey } from '../en/deepReading'

/**
 * Italiano — la lettura profonda ed estesa: l'Oroscopo Completo a pagamento e la
 * revisione dettagliata della Compatibilità. Scritto per leggersi come una o due
 * pagine di un astrologo vero.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- oroscopo quotidiano (gratis): un po' più di fondo in ogni nota ---- */
  'horo.deep.q.house': 'Sta cadendo nell’area di {theme}.',
  'horo.deep.q.hard': 'Muoviti con cautela con questo.',
  'horo.deep.q.soft': 'Merita un passo piccolo e deliberato.',
  'horo.deep.q.neutral': 'Lascia che si posi prima di agire.',
  'horo.deep.q.thread':
    'Il filo di oggi torna di continuo al tuo {focus} — è lì che tenere l’attenzione.',
  'scr.horo.weekHead': 'L’arco più ampio',

  /* ============================ OROSCOPO COMPLETO ============================ */

  /* -- cosa significa quando ogni pianeta è la forza IN TRANSITO (in movimento) -- */
  'dh.tr.Sun':
    'Il Sole muove la giornata: ovunque vada punta un riflettore lì per circa un mese, scalda quella parte del tema e ti chiede di presentarti lì come te stesso.',
  'dh.tr.Moon':
    'La Luna è il corpo più veloce del cielo; i suoi transiti sono brevi ma fissano il tono emotivo della giornata e portano in superficie ciò che toccano.',
  'dh.tr.Mercury':
    'Mercurio governa il pensare, il parlare e le piccole decisioni che si sommano. I suoi transiti accelerano il traffico di informazioni attorno a un tema — conversazioni, messaggi, scartoffie, ripensamenti.',
  'dh.tr.Venus':
    'Venere regge l’attrazione, il comfort, il denaro e il gusto. Quando transita un punto addolcisce il terreno lì e fa arrivare connessione, spesa e piacere più facilmente.',
  'dh.tr.Mars':
    'Marte è slancio e calore allo stato grezzo. I suoi transiti accendono un fuoco sotto ciò che toccano — ottieni più coraggio e più attrito nello stesso pacchetto, e la voglia di agire prima di averci pensato fino in fondo.',
  'dh.tr.Jupiter':
    'Giove è il pianeta della crescita e del «di più». Espande ciò che contatta — opportunità, fiducia, appetito e, a volte, eccesso — e tende a far aprire di più la porta in quell’area di vita per circa un anno.',
  'dh.tr.Saturn':
    'Saturno è tempo, struttura e conseguenza. Dove passa rallenta le cose e chiede se ciò che hai costruito lì può reggere peso; ciò che può, lo rafforza, e ciò che non può, lo smonta in silenzio perché tu lo ricostruisca come si deve.',
  'dh.tr.Uranus':
    'Urano è il perturbatore. I suoi transiti rompono uno schema diventato stantio — spesso tramite una sorpresa, un’inquietudine improvvisa o un cambiamento che non avevi previsto — e ti restituiscono una libertà che avevi firmato di cedere.',
  'dh.tr.Neptune':
    'Nettuno dissolve i bordi. Dove transita, i contorni si ammorbidiscono: più immaginazione e compassione, ma anche più confusione, e un richiamo a evadere invece di affrontare la cosa direttamente.',
  'dh.tr.Pluto':
    'Plutone lavora sottoterra e non ha fretta. I suoi transiti portano una trasformazione lenta e a fondo a ciò che toccano — lotte di potere, finali e uno spogliarsi fino a ciò che davvero è essenziale.',

  /* -- cosa governa il tuo punto NATALE nel tuo tema -- */
  'dh.na.Sun':
    'la tua identità essenziale, la tua vitalità e il senso di chi sei quando sei più te stesso',
  'dh.na.Moon':
    'i tuoi istinti, i tuoi umori e ciò di cui hai bisogno per sentirti al sicuro e sostenuto',
  'dh.na.Mercury':
    'come pensi, impari, parli e prendi le decisioni di ogni giorno',
  'dh.na.Venus':
    'come ami e sei amato, cosa trovi bello e il tuo rapporto con il denaro e il piacere',
  'dh.na.Mars':
    'il tuo slancio, la tua rabbia, il tuo desiderio e come vai verso ciò che vuoi',
  'dh.na.Jupiter':
    'dove cerchi senso e crescita, e il tuo senso naturale di fede e possibilità',
  'dh.na.Saturn':
    'il tuo rapporto con la disciplina, l’autorità e i limiti — il punto in cui hai dovuto crescere alla dura',
  'dh.na.Uranus':
    'il tuo bisogno di essere libero e di fare le cose a modo tuo',
  'dh.na.Neptune':
    'la tua immaginazione, la tua spiritualità e i luoghi in cui tendi a idealizzare o a perderti',
  'dh.na.Pluto':
    'il tuo rapporto con il potere e il controllo, e ciò che in te è fatto per trasformarsi',

  /* -- la natura di ogni aspetto (due varianti, alternate per sezione) -- */
  'dh.asp.nat.conjunction.0':
    'Una congiunzione è una fusione. Le due forze occupano lo stesso grado e agiscono come una, avviando un ciclo nuovo in quest’area della tua vita — un seme che si pianta, non un raccolto che si coglie.',
  'dh.asp.nat.conjunction.1':
    'Una congiunzione fonde le due energie così a fondo che è difficile distinguerle. Segna un inizio; ciò che prende forma ora si dispiegherà negli anni a venire.',
  'dh.asp.nat.opposition.0':
    'Un’opposizione lavora attraverso lo specchio di altre persone e di circostanze esterne. La tensione è reale, ma è lì per portarti consapevolezza — vedi la questione con chiarezza perché qualcosa le sta di fronte.',
  'dh.asp.nat.opposition.1':
    'Un’opposizione ti tira tra due poli e ti chiede di tenerli entrambi invece di collassare in uno. L’equilibrio qui non è un compromesso; è un’abilità che costruisci sotto pressione.',
  'dh.asp.nat.square.0':
    'Una quadratura è un aspetto di attrito. Le due energie vogliono cose diverse e continuano ad agganciarsi tra loro, e il disagio è il punto — è la ruvidezza che forza un cambiamento reale invece di uno cosmetico.',
  'dh.asp.nat.square.1':
    'Una quadratura mette un ostacolo sulla strada proprio dove preferiresti non doverne affrontare uno. Spingere dritto raramente funziona; la via d’uscita di solito è cambiare approccio, non sforzarsi di più.',
  'dh.asp.nat.trine.0':
    'Un trigono è un canale aperto. Le due energie cooperano senza che glielo si chieda, e il sostegno scorre verso di te qui — ma ti raggiunge solo se davvero ti muovi verso di esso.',
  'dh.asp.nat.trine.1':
    'Un trigono fa sentire quest’area della vita facile e naturale per un po’. Il rischio è l’accontentarsi; la scioltezza che non usi tende a svanire in silenzio.',
  'dh.asp.nat.sextile.0':
    'Un sestile è un’opportunità che devi accettare di proposito. La porta è aperta ma non spalancata — una piccola azione deliberata ora trasforma una possibilità in qualcosa di reale.',
  'dh.asp.nat.sextile.1':
    'Un sestile offre un’apertura utile in questa parte della tua vita. Premia l’iniziativa e non fa assolutamente nulla per l’attesa.',

  /* -- breve frase verbale per l’apertura della sezione -- */
  'dh.asp.verb.conjunction': 'incontra e si fonde con',
  'dh.asp.verb.opposition': 'tira contro',
  'dh.asp.verb.square': 'sfrega contro',
  'dh.asp.verb.trine': 'scorre verso',
  'dh.asp.verb.sextile': 'apre una porta verso',

  /* -- come l’energia si esprime nel segno in cui si trova il punto natale -- */
  'dh.sign.Aries':
    'rapida, diretta e un po’ combattiva, più incline ad agire che ad aspettare',
  'dh.sign.Taurus':
    'lenta, sensuale e testarda, resistente alla fretta e lenta a lasciare andare',
  'dh.sign.Gemini':
    'curiosa e verbale, rapida a collegare idee e rapida a inquietarsi',
  'dh.sign.Cancer':
    'tenera e protettiva, guidata dal sentire prima che dalla logica',
  'dh.sign.Leo':
    'calda, espressiva e orgogliosa, con bisogno di essere vista per sentirsi reale',
  'dh.sign.Virgo':
    'precisa e pratica, più felice quando può essere davvero utile',
  'dh.sign.Libra':
    'orientata all’equilibrio, alla giustizia e alla buona compagnia, e restia a fare una scenata',
  'dh.sign.Scorpio':
    'intensa e riservata, tutto o niente, e attratta da ciò che è nascosto',
  'dh.sign.Sagittarius':
    'inquieta per spazio, senso e una visione più ampia, e impaziente con le clausole in piccolo',
  'dh.sign.Capricorn':
    'seria e autodisciplinata, più colpita dai risultati che dalle promesse',
  'dh.sign.Aquarius':
    'indipendente e rivolta al futuro, pensa in sistemi più che in sentimenti',
  'dh.sign.Pisces':
    'sognante, permeabile e compassionevole, e facilmente sopraffatta',

  /* -- cosa tende a smuovere un transito attraverso ogni casa -- */
  'dh.house.1':
    'In prima casa il lavoro si vede su di te — il tuo corpo, la tua immagine, la prima impressione che fai. È un buon tratto per ridisegnare come ti presenti invece di tenere un contorno che non ti sta più.',
  'dh.house.2':
    'In seconda casa tocca denaro, risorse e autostima. La domanda esterna è cosa guadagni e possiedi; quella interna è cosa credi di meritare.',
  'dh.house.3':
    'In terza casa smuove la mente di ogni giorno — conversazioni, brevi spostamenti, fratelli e vicini, l’infinito piccolo scambio di informazioni. Fai attenzione a cosa continui a ripeterti.',
  'dh.house.4':
    'In quarta casa raggiunge le radici — casa, famiglia, il tuo passato e la base privata a cui torni. Qualcosa nelle tue fondamenta viene esaminato.',
  'dh.house.5':
    'In quinta casa tocca il gioco, il romanticismo, la creatività e le cose che fai per la gioia di farle. Chiede dove sia andata la tua scintilla e come riaverla.',
  'dh.house.6':
    'In sesta casa lavora attraverso la routine, la salute e la fatica quotidiana di tenere in moto te stesso e il tuo lavoro. Le piccole abitudini pesano più del solito ora.',
  'dh.house.7':
    'In settima casa lo specchio sono le altre persone — partner, persone vicine, chi sta dall’altra parte del tavolo. Ciò che incontri in loro è spesso qualcosa di tuo che non hai guardato direttamente.',
  'dh.house.8':
    'In ottava casa va all’acqua profonda — denaro condiviso, intimità, potere e ciò che sta finendo. Questo non è terreno da chiacchiere; qualcosa si trasforma alla radice.',
  'dh.house.9':
    'In nona casa apre la visione più ampia — credo, studio, viaggio e la ricerca di senso. La tua idea di a cosa serva tutto questo si sta allargando.',
  'dh.house.10':
    'In decima casa è pubblico — carriera, reputazione, la tua posizione e il ruolo che giochi nel mondo. Ciò per cui sei conosciuto è in revisione.',
  'dh.house.11':
    'In undicesima casa tocca l’amicizia, la comunità e il futuro verso cui tendi. La compagnia che frequenti e gli obiettivi che tieni si stanno riordinando.',
  'dh.house.12':
    'In dodicesima casa lavora sullo sfondo — riposo, solitudine, l’inconscio e ciò che porti senza nominarlo. Questo è un lavoro quieto e rivolto all’interno.',

  /* -- «nella vita di ogni giorno questo può apparire come…» (alternato per aspetto) -- */
  'dh.life.conjunction.0':
    'Nella vita di ogni giorno questo può sentirsi come un ricominciare che non hai scelto del tutto — nuove condizioni, un capitolo nuovo che si apre in quest’area, che tu ti senta pronto o no.',
  'dh.life.conjunction.1':
    'Giorno per giorno può arrivare come un forte interesse nuovo, una persona che cambia la cornice, o semplicemente la sensazione che la vecchia versione di questo sia finita.',
  'dh.life.conjunction.2':
    'In pratica appare spesso come una soglia — una decisione, un trasloco, un impegno che azzera l’orologio in questa parte della tua vita.',
  'dh.life.opposition.0':
    'Nella vita di ogni giorno questo si gioca spesso attraverso qualcun altro — un disaccordo, una richiesta, o una persona che incarna proprio ciò con cui stai lottando.',
  'dh.life.opposition.1':
    'Giorno per giorno può sentirsi come stare in mezzo a due bisogni validi — il tuo e quello di un altro, o due parti della tua stessa vita che non entrano entrambe.',
  'dh.life.opposition.2':
    'In pratica tende a portare le cose al dunque: una conversazione che non puoi più rimandare, una scelta che aspetta che tu la faccia.',
  'dh.life.square.0':
    'Nella vita di ogni giorno questo può apparire come un piano che continua a incepparsi, una persona che preme sempre lo stesso tasto, o un compito che sembra molto più pesante di quanto dovrebbe.',
  'dh.life.square.1':
    'Giorno per giorno arriva spesso come frustrazione — sforzo che non si converte in nulla, un muro dove ti aspettavi una porta.',
  'dh.life.square.2':
    'In pratica appare come una pressione che non ti lascia andare a ruota libera: la cosa che stai evitando è ora sulla strada.',
  'dh.life.trine.0':
    'Nella vita di ogni giorno questo può sentirsi come una serie di piccole luci verdi — aiuto che arriva, tempi che funzionano, un sì dove ti eri preparato a un no.',
  'dh.life.trine.1':
    'Giorno per giorno appare spesso come scioltezza e flusso in quest’area, e la tentazione di dare per scontato che sarà sempre così semplice.',
  'dh.life.trine.2':
    'In pratica è una finestra favorevole — le presentazioni attecchiscono, le richieste ricevono buona accoglienza, la via è sgombra per un momento.',
  'dh.life.sextile.0':
    'Nella vita di ogni giorno questo può apparire come un’apertura che quasi ti sfugge — un’offerta, un incontro casuale, una porticina che resta aperta solo se la attraversi ora.',
  'dh.life.sextile.1':
    'Giorno per giorno tende a premiare chi fa la prima mossa: manda il messaggio, fai la domanda, proponi il tuo nome.',
  'dh.life.sextile.2':
    'In pratica è un’opportunità a basso costo — niente di drammatico, ma vale la pena agire finché è qui.',

  /* -- l’invito più profondo dell’aspetto (alternato) -- */
  'dh.invite.conjunction.0':
    'L’invito è piantare di proposito. Ciò che inizi ora, per quanto piccolo, è il seme di qualcosa con cui convivrai ancora tra anni — quindi sceglilo apposta.',
  'dh.invite.conjunction.1':
    'Il lavoro più profondo è lasciar andare la vecchia forma di questo con pulizia, senza trascinarla mezza viva nel capitolo nuovo.',
  'dh.invite.conjunction.2':
    'Ciò che questo chiede davvero è un sì chiaro o un no chiaro. L’ambivalenza è l’unica risposta che spreca la finestra.',
  'dh.invite.opposition.0':
    'L’invito non è vincere. È tenere entrambi i lati abbastanza a lungo da trovare la terza opzione che onora ciò che è vero in ciascuno.',
  'dh.invite.opposition.1':
    'Il lavoro più profondo è riprenderti la parte di questo che hai affidato a qualcun altro — la forza, il bisogno o la colpa.',
  'dh.invite.opposition.2':
    'Ciò che questo chiede è consapevolezza onesta. Una volta che vedi davvero lo schema, non ci sei più dentro.',
  'dh.invite.square.0':
    'L’invito non è spingere più forte. È notare cosa hai superato qui e lasciare che l’attrito lo smonti, perché si possa costruire qualcosa di più solido.',
  'dh.invite.square.1':
    'Il lavoro più profondo è un cambio di metodo. L’obiettivo può andare bene; il modo in cui lo stai affrontando è ciò che genera la resistenza.',
  'dh.invite.square.2':
    'Ciò che questo chiede davvero è maturità in un punto preciso — fare la cosa poco appariscente e strutturale che speravi di poter saltare.',
  'dh.invite.trine.0':
    'L’invito è usare la scioltezza, non solo goderne. Il sostegno che non si spende tende a sparire in silenzio.',
  'dh.invite.trine.1':
    'Il lavoro più profondo è costruire qualcosa durante la calma che regga quando il tempo cambia di nuovo.',
  'dh.invite.trine.2':
    'Ciò che questo chiede è che tu dica sì all’aiuto — accetta la presentazione, prendi la scorciatoia, lascia che sia facile per una volta.',
  'dh.invite.sextile.0':
    'L’invito è iniziativa. Questo è una porta lasciata aperta; si spalanca solo se spingi.',
  'dh.invite.sextile.1':
    'Il lavoro più profondo è notare le piccole opportunità da cui abitualmente ti dissuadi, e coglierne una.',
  'dh.invite.sextile.2':
    'Ciò che questo chiede è un atto di coraggio modesto e concreto — niente di drammatico, solo un passo che preferiresti rimandare.',

  /* -- guida concreta (alternata) -- */
  'dh.do.conjunction.0':
    'Dagli un inizio pulito: nomina ciò che comincia, segnalo in qualche modo e non ingombrare le prime settimane con avanzi della versione vecchia.',
  'dh.do.conjunction.1':
    'Muoviti in modo deliberato più che rapido. Una congiunzione mette in moto un ciclo lungo; il tono che fissi ora tende a restare.',
  'dh.do.conjunction.2':
    'Decidi. Di’ il sì o il no ad alta voce davanti ad almeno un’altra persona perché diventi reale.',
  'dh.do.opposition.0':
    'Fai la conversazione attorno a cui stai girando, ed entraci per ascoltare. L’altro lato porta informazioni di cui hai bisogno.',
  'dh.do.opposition.1':
    'Scrivi entrambe le posizioni come se dovessi difendere ciascuna con equità. Il punto di equilibrio di solito si mostra sulla carta.',
  'dh.do.opposition.2':
    'Non forzare una risoluzione oggi. Lascia che la tensione resti finché la terza opzione non affiora da sola.',
  'dh.do.square.0':
    'Non impegnarti e non firmare sotto pressione. Lascia che ciò che resiste ti mostri dove la struttura è sottile, e rinforza quella prima.',
  'dh.do.square.1':
    'Cambia una cosa del tuo approccio e riprova. Lo stesso sforzo, un altro angolo.',
  'dh.do.square.2':
    'Fai il compito noioso e strutturale che continui a rimandare. È tutto il compito.',
  'dh.do.trine.0':
    'Fai un passo vero mentre la porta è aperta — un messaggio, una prenotazione, una prima bozza. La scioltezza svanisce se ti limiti ad ammirarla.',
  'dh.do.trine.1':
    'Chiedi la cosa. Questa è la finestra in cui un sì è più probabile.',
  'dh.do.trine.2':
    'Costruisci ora. Usa la calma per posare fondamenta di cui sarai contento più avanti.',
  'dh.do.sextile.0':
    'Fai la prima mossa oggi, non la settimana prossima. Mandalo, chiedilo, metti il tuo nome.',
  'dh.do.sextile.1':
    'Di’ sì alla piccola offerta anche se sembra minore. Queste si sommano.',
  'dh.do.sextile.2':
    'Scegli l’unica opportunità che di solito rimanderesti, e agisci su di essa prima che finisca il giorno.',

  /* -- linguaggio dei tempi (alternato per stato) -- */
  'dh.time.peak.0':
    'È vicino a esatto e ancora in stringimento, quindi questo culmina entro un giorno o due e poi comincia ad allentarsi.',
  'dh.time.peak.1':
    'Il contatto è quasi preciso proprio ora — questo è il più forte che diventa, e l’intensità cala poco dopo.',
  'dh.time.peak.2':
    'Questo è al suo grado esatto o vicino, ed è per questo che chiede così tanta della tua attenzione tutta insieme.',
  'dh.time.build.0':
    'Sta ancora crescendo. Il tema si fa più forte nei giorni a venire prima di girare.',
  'dh.time.build.1':
    'Questo non ha ancora raggiunto la piena forza; aspettati che continui a salire per un po’ prima di arrivare in cima.',
  'dh.time.build.2':
    'Sei sul versante iniziale di questo. Ciò che ora si legge come un segnale debole diventa inconfondibile entro una settimana circa.',
  'dh.time.fade.0':
    'È appena passato esatto — il bordo più tagliente è già passato e la pressione si sta liberando.',
  'dh.time.fade.1':
    'Il picco di questo è ormai alle tue spalle. Ciò che resta è integrazione, non crisi.',
  'dh.time.fade.2':
    'Questo contatto è in uscita. Stai ripulendo dopo di esso, non vivendone il peggio.',

  'dh.retro':
    ' Essendo retrogrado, questo è una revisione più che un primo passaggio — torni su un terreno che hai già percorso, questa volta per farlo bene.',

  /* -- modelli di assemblaggio della sezione -- */
  'dh.sec.open':
    '{tr} Proprio ora {verb} {target} — la parte di te che governa {na}.',
  'dh.sec.sign':
    'Il tuo {target} natale è in {sign} — {signFlavour} — il che dà forma a come tutto questo atterra per te.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- la panoramica: tre brevi paragrafi -- */
  'dh.ov.lead':
    'Questa lettura è tratta da dove si trovano davvero i pianeti oggi, messi di fronte al tuo tema natale — quindi parla del tuo cielo, non del cielo in generale.',
  'dh.ov.head':
    'Il centro di gravità proprio ora è {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Il clima generale è favorevole: i contatti facili pesano chiaramente più di quelli duri. È un tratto per andare verso qualcosa invece di blindarti contro — il modo principale di sprecarlo è restare fermo.',
  'dh.ov.weather.friction':
    'Il clima generale è esigente. C’è più attrito che flusso nel mix, e diverse cose vogliono essere affrontate di petto invece che desiderate via. Niente di tutto ciò è un disastro; è una fase di costruzione, e le fasi di costruzione si sentono come fatica.',
  'dh.ov.weather.intense':
    'Il clima generale è pesante e concentrato. Pianeti lenti sono seduti proprio sul tuo tema, e il volume è alzato su tutto ciò che toccano. Dosati — questo è un tratto da maratona, non uno sprint.',
  'dh.ov.weather.mixed':
    'Il clima generale è misto — sostegno reale e attrito reale nella stessa finestra. Il lavoro di questo periodo è scegliere dove spenderti e dove trattenerti.',
  'dh.ov.weather.quiet':
    'Il clima generale è quieto. Nessun pianeta preme forte sul tuo tema, il che rende questo un tratto raro per fissare la tua agenda e il tuo ritmo senza che il cielo ti risponda.',
  'dh.ov.tempo.fast':
    'Il ritmo è rapido — i contatti sono stretti e in movimento, quindi i temi arrivano e passano nel giro di giorni. Resta reattivo invece di provare a pianificare tutto in anticipo.',
  'dh.ov.tempo.building':
    'Il ritmo è di lenta costruzione. I temi principali stanno ancora raccogliendo forza, quindi ciò che ora sembra un accenno sarà inconfondibile in una settimana o due.',
  'dh.ov.tempo.slow':
    'Il ritmo è lento e strutturale. I grandi contatti qui si dispiegano nell’arco di mesi, non di giorni; pensa in stagioni e non aspettarti un verdetto dall’oggi al domani.',
  'dh.ov.tempo.settling':
    'Il ritmo si sta assestando — i contatti più taglienti hanno appena passato il picco, quindi questo parla più di integrare ciò che è già successo che di blindarsi per ciò che viene.',

  /* -- il paragrafo della Luna, ampliato -- */
  'dh.moon.lead': 'Il tuo clima emotivo',
  'dh.moon.body':
    'La Luna sta attraversando {sign} — {mood} — ed è {phase} al {pct}% di luce. {phaseNote} Lascia che il tuo umore sia informazione più che un verdetto: ti sta dicendo come si sente da dentro questo tratto di cielo.',

  /* -- i fili: cosa continua a ricorrere -- */
  'scr.horo.threadsHead': 'I fili che collegano',
  'dh.th.house':
    'La tua {ord} casa continua a saltare fuori. Qualsiasi altra cosa succeda, {houseThemeLower} è la stanza in cui ti si chiede di passare tempo in questo periodo.',
  'dh.th.planet':
    'Il tuo {planet} natale viene lavorato da più di un angolo alla volta. Poiché regge {na}, aspettati che sia una nota ricorrente e non un episodio isolato.',
  'dh.th.bal.friction':
    'E la bilancia pende verso l’attrito. Non è sfortuna — è come si sente da dentro una fase di crescita. La fatica è il compito.',
  'dh.th.bal.supportive':
    'E la bilancia pende verso il flusso. I contatti di sostegno superano quelli duri, quindi le porte sono davvero aperte — l’unico modo di sprecarlo è non attraversarne nessuna.',
  'dh.th.bal.mixed':
    'E la bilancia è davvero spaccata. Parte di questo ti sostiene e parte ti resiste, spesso nello stesso giorno, quindi il discernimento conta più dell’energia proprio ora.',
  'dh.th.solo':
    'I contatti sono sparsi per il tuo tema invece di ammucchiarsi su un punto, quindi questo si legge come un periodo vario più che come un’unica storia dominante.',

  /* -- la mappa dei tempi -- */
  'scr.horo.timingHead': 'Come si dispiega questo',
  'dh.tm.tight':
    'In stringimento verso esatto: {list}. Sono le voci più forti nel tuo cielo proprio ora e culmineranno nel giro di giorni.',
  'dh.tm.fade':
    'Passato il picco e in dissolvenza: {list}. La lezione di questi è in gran parte assorbita — ora integri, non ti blindi.',
  'dh.tm.none':
    'Niente è seduto proprio su esatto al momento, il che è in parte il motivo per cui il periodo sembra più aperto che appuntito.',

  /* -- l’arco di chiusura -- */
  'dh.cl.protect':
    'L’arco più ampio ti chiede di proteggere il tuo {focus} lungo questo tratto. Meno impegni, serate più presto e il permesso di essere meno disponibile del solito — recupererai di più custodendo la tua energia che spendendola. È una stagione per curare il terreno, non per forzare il raccolto.',
  'dh.cl.use':
    'L’arco più ampio è una finestra aperta attorno al tuo {focus}, e finestre così non restano aperte a lungo. Puntalo a una cosa che ti importa davvero e metti peso vero dietro ora, mentre il cielo aiuta invece di resistere.',
  'dh.cl.steady':
    'L’arco più ampio chiede fermezza. Tieni le tue routine, tieni la parola che ti sei dato e lascia che il rumore passi senza rincorrerne ogni pezzo. Non ogni transito ha bisogno di una risposta; alcuni vanno solo sopravvissuti.',

  /* ======================= COMPATIBILITÀ — PROFONDA ======================= */

  'syn.deep.patternLead': 'Di cosa vive questo legame',
  'syn.deep.pattern.emotional':
    'Al suo nucleo questa è una connessione emotiva. Le Lune e Venere portano la maggior parte del peso tra voi, il che rende il legame caldo, istintivo e rapido a sintonizzarsi — e significa che sono gli umori, non le discussioni, a fissare la temperatura. Quando siete entrambi saldi è morbido e facile e casa diventa casa in fretta. Quando uno di voi non sta bene, l’altro lo sa nel giro di minuti, che si dica una parola o no. La conseguenza pratica è che prenderti cura del tuo stato interno non è separato dal prenderti cura della relazione; è lo stesso lavoro. Impara a nominare un sentimento presto, prima che diventi clima, e questa connessione reggerà quasi qualsiasi cosa.',
  'syn.deep.pattern.mental':
    'Al suo nucleo questo è un incontro di menti. Vi connettete prima attraverso parole, idee, curiosità e il piacere di essere capiti in fretta, e la scintilla resta accesa esattamente per quanto dura la conversazione. Questa è una forza reale — non vi annoierete mai a vicenda e risolvete bene i problemi in coppia. Il rischio è più sottile: è possibile scambiare una buona conversazione per intimità e vivere un po’ sopra il collo, scambiandovi pensieri mentre lo strato del sentire resta non curato. Fate spazio per le parti della vicinanza che non sono verbali — un silenzio condiviso, un pasto, un compito svolto fianco a fianco — e la connessione mentale diventa un fondamento invece di un sostituto.',
  'syn.deep.pattern.physical':
    'Al suo nucleo questa è una connessione di slancio e corpo. Marte e il Sole fanno il lavoro pesante, quindi qui c’è chimica vera e slancio vero — vi energizzate a vicenda, fate succedere le cose quando siete insieme e funzionate bene come squadra quando c’è un lavoro da fare. Lo stesso cablaggio significa che potete innervosirvi a vicenda altrettanto in fretta; la competitività e l’irritazione sono il lato in ombra dell’attrazione. La soluzione non è reprimere il calore ma indirizzarlo. Dategli una direzione condivisa — un progetto, un piano, una sfida, persino una lite pulita con regole — e l’intensità lavora per voi invece di rivolgersi all’interno.',
  'syn.deep.pattern.karmic':
    'Al suo nucleo questa pesa. Saturno e Plutone sono nel mix, il che porta un senso di conseguenza al legame — come se foste qui per risolvere qualcosa insieme e non solo per passare il tempo piacevolmente. Le connessioni così tendono a sentirsi significative presto e a chiedere di più a entrambe le persone di quanto farebbe un abbinamento più leggero. Gestita bene, diventa profondamente leale e duratura, di quei legami che sopravvivono alle cose. Gestita con noncuranza, si fa pesante — obbligo travestito da vicinanza, o una lenta lotta di potere che nessuno nomina. La differenza è quasi del tutto se entrambi continuate a sceglierla ad alta voce, di proposito, invece di restare perché andarsene sembra un fallimento.',

  'syn.deep.chemHead': 'La chimica tra voi',
  'syn.deep.chem.strong':
    'L’attrazione qui è ben sostenuta. I contatti tra i vostri temi che governano il desiderio e l’affetto sono in gran parte armonici, il che di solito si traduce in una chimica che si sente naturale più che tesa — vi attraete in un modo che non costa molto sostenere. Godine, e non prenderlo come prova che il resto della relazione si reggerà da solo; la scioltezza in un reparto non sostituisce l’impegno negli altri.',
  'syn.deep.chem.mixed':
    'L’attrazione qui ha corrente e anche ruvidezza. Alcuni dei contatti tra i vostri temi vi uniscono con calore; altri aggiungono attrito a quella stessa spinta, il che può leggersi come una chimica con un filo — magnetica, a volte esasperante, raramente scialba. Questo tipo di scintilla tende a durare più di quella senza attrito, proprio perché si rigenera di continuo. Il compito è tenere il filo giocoso invece di lasciarlo inacidire in uno schema di innervosirvi a vicenda.',
  'syn.deep.chem.cool':
    'Il desiderio non è il filo più forte tra i vostri temi. I contatti che governano l’attrazione sono quieti o lievemente sfidanti, il che non significa che non ci sia scintilla — solo che questa connessione è più probabile che si costruisca su altre cose: comprensione condivisa, rispetto, affidabilità, un incontro di valori. Le relazioni fondate su quelle tendono a essere più lente ad accendersi e considerevolmente più difficili da rompere.',

  'syn.deep.commHead': 'Come comunicate',
  'syn.deep.comm.easy':
    'La comunicazione è una forza qui. I vostri contatti di Mercurio scorrono, il che significa che tendete a seguire il pensiero l’uno dell’altro, ad azzeccare le battute e a lavorare un problema insieme senza troppa perdita nella traduzione. Usalo di proposito quando salta fuori qualcosa di difficile — siete più bravi a parlare le cose della maggior parte delle coppie, quindi non lasciate che le conversazioni difficili siano quelle che evitate.',
  'syn.deep.comm.work':
    'La comunicazione qui richiede un po’ di lavoro. I vostri contatti di Mercurio portano attrito, quindi potete parlare l’uno sopra l’altro — tempi diversi, logica diversa, presupposti diversi su cosa è stato davvero concordato. Questo è gestibile, ma serve un’abitudine: rallenta, ripeti ciò che hai sentito e verifica che intendiate la stessa cosa con la stessa parola prima di andare avanti.',
  'syn.deep.comm.quiet':
    'Non c’è un contatto di Mercurio forte tra i vostri temi in nessun senso, il che di solito significa che la comunicazione non è né un dono ovvio né un problema ovvio — è semplicemente qualcosa che costruirete di proposito invece che ricavi da sé. I momenti di verifica regolari e non forzati contano di più per voi che per una coppia che si legge automaticamente.',

  'syn.deep.growthLead': 'Dove questo ti fa crescere',
  'syn.deep.growth.good':
    'La scioltezza tra voi è reale, ed è anche la cosa da tenere d’occhio. Quando una connessione funziona per lo più da sola, è facile prenderla alla leggera — smettere di portare la tua piena onestà e il tuo impegno perché non hai dovuto. Il vostro punto forte come coppia è continuare a presentarvi come si deve per qualcosa che non lo esige: continuare a dire la cosa vera, continuare a fare lo sforzo, continuare a notarvi. Non lasciate che «facile» diventi in silenzio «trascurato».',
  'syn.deep.growth.mid':
    'I punti di attrito tra voi non sono difetti dell’abbinamento; sono il programma di studi. Ognuno segna un punto in cui entrambi dovrete allungarvi — dire la cosa difficile prima, tenere il vostro terreno con più gentilezza, smettere di aspettare di essere letti e iniziare a essere chiari. Le coppie che nominano queste tensioni presto e le trattano come lavoro condiviso tendono a cavarsela bene nel tempo. Quelle che sperano che si dissolvano da sole tendono a incontrare la stessa lite per anni.',
  'syn.deep.growth.hard':
    'Questa connessione chiede molto a entrambi. I contatti sfidanti tra i vostri temi non si dissolveranno da soli, quindi la relazione funziona solo se entrambi trattate la difficoltà come lavoro comune e non come colpa dell’altro. Questo è davvero possibile — molti legami duraturi sono costruiti su aspetti duri — ma è una scelta che dovrete continuare a fare, ripetutamente e ad alta voce, soprattutto nei tratti in cui sarebbe più facile tenere il conto.',

  'syn.deep.nameItLead': 'Di’ questa parte ad alta voce',
  'syn.deep.nameIt':
    'Se c’è una cosa che vale la pena nominare presto invece di sperare che si posi, è il contatto {a}–{b}: {sentence} Non detto, tende a calcificarsi in uno schema; detto con chiarezza e presto, di solito si rivela più piccolo di quanto sembrasse.',
  'syn.deep.nameIt.none':
    'Non c’è un unico punto di attrito da intercettare presto qui — il che vale già la pena saperlo. Il lavoro in questa connessione parla meno di disinnescare una questione e più di restare attenti su tutto l’insieme.',

  'syn.deep.longViewLead': 'La visione a lungo termine',
  'syn.deep.longView.good':
    'questo è il tipo di connessione che invecchia bene. Tende a diventare più facile invece che più difficile man mano che imparate i bordi l’uno dell’altro, e la scioltezza iniziale di solito si approfondisce in qualcosa di più saldo e più affidabile nel tempo. La minaccia principale per essa è la trascuratezza, non il conflitto.',
  'syn.deep.longView.mid':
    'questo diventa ciò che ne fate. Il materiale grezzo è gestibile — né senza sforzo né condannato — e l’esito dipende quasi del tutto dallo sforzo che entrambi mettete durante il primo tratto, prima che gli schemi si fissino. Azzeccate le abitudini presto e questo può durare.',
  'syn.deep.longView.hard':
    'questo è intenso ora, ed è probabile che resti intenso. Ne vale la pena se profondità e significato sono ciò che entrambi volete davvero da una relazione. È sfiancante se una parte di te aspetta che si calmi in qualcosa di facile — probabilmente non è quello il compito qui.',
} as const
