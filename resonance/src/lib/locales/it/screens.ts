import type { ScreenKey } from '../en/screens'

/** Italiano — testi delle schermate secondarie. */
export const screens: Record<ScreenKey, string> = {
  /* ---- cielo locale / radicamento ---- */
  'geo.ground.scarce':
    'La luce del giorno scarseggia — esci un momento verso mezzogiorno, mangia qualcosa di caldo e concediti di dormire presto.',
  'geo.ground.long':
    'La luce lunga allunga la giornata — cerca ombra e acqua fresca a mezzogiorno, e proteggi la camera dal sole tardivo.',
  'geo.ground.spring':
    'La luce torna — sposta la tua pratica verso il mattino e lascia crescere l’energia.',
  'geo.ground.summer':
    'Massima luce — tieni il ritmo dolce, idratati e radicati a piedi nudi su terra o erba.',
  'geo.ground.autumn':
    'La luce si ritira — privilegia pratiche più lente e riscaldanti e una chiusura del giorno più presto.',
  'geo.ground.winter':
    'La metà buia — riposare è produttivo ora; tieni le pratiche brevi, ristoratrici e a lume di candela.',
  'geo.season.spring': 'Primavera',
  'geo.season.summer': 'Estate',
  'geo.season.autumn': 'Autunno',
  'geo.season.winter': 'Inverno',

  /* ---- oroscopo rapido ---- */
  'scr.quick.eyebrow': 'Oroscopo di oggi',
  'scr.quick.you': 'Tu',
  'scr.quick.moon': 'Luna',
  'scr.quick.readFull': 'Leggilo per intero →',
  'scr.quick.fullPro': 'La lettura completa · Pro →',

  /* ---- oroscopo completo ---- */
  'scr.horo.eyebrow': 'Oroscopo Giornaliero',
  'scr.horo.addBirth': 'Aggiungi dati di nascita →',
  'scr.horo.moonHead': 'La Luna',
  'scr.horo.skyHead': 'Il cielo sopra di te',
  'scr.horo.risingNow': '{sign} sta sorgendo su di te proprio ora.',
  'scr.horo.transitingHouse': '{planet} sta transitando nella tua {ord} casa.',
  'scr.horo.addPlace': 'Aggiungi un luogo di nascita, o condividi la posizione nelle Impostazioni →',
  'scr.horo.practiceHead': 'Pratica di oggi',
  'scr.horo.geoLine': '{season} · sole {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h di luce',
  'scr.horo.birthPlace': ' · uso il tuo luogo di nascita',

  /* ---- transiti ---- */
  'scr.transits.eyebrow': 'Il Cielo',
  'scr.transits.titleNatal': 'Transiti al tuo tema',
  'scr.transits.titleSky': 'Il cielo di oggi',
  'scr.transits.addChart': 'Aggiungi tema',
  'scr.transits.nowHead': 'Proprio ora, sopra di te',
  'scr.transits.rising': '{sign} sta sorgendo',
  'scr.transits.movingHouse': '{planet} sta attraversando la tua {ord} casa — {arena}.',
  'scr.transits.sunMoon': 'Sole {sunrise}–{sunset} · Luna {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'luogo di nascita',
  'scr.transits.allInOrb': 'Ogni transito in orbita',
  'scr.transits.moonAspects': 'Gli aspetti della Luna oggi',
  'scr.transits.natalPrefix': 'natale ',
  'scr.transits.nothingOrb': 'Niente in orbita oggi.',
  'scr.transits.applying': 'applicativo',
  'scr.transits.separating': 'separativo',
  'scr.transits.orbNote':
    '↑ ancora in stretta verso l’esatto · ↓ in separazione. Le orbite più strette si sentono più forte.',

  /* ---- diario ---- */
  'scr.journal.dayStreak': 'giorni di fila',
  'scr.journal.practices': 'pratiche',
  'scr.journal.minutes': 'minuti',
  'scr.journal.last4w': 'Ultime 4 settimane',
  'scr.journal.lastNDays': 'Ultimi {n} giorni',
  'scr.journal.reasonHistory': 'Storico del diario illimitato',
  'scr.journal.fullHistory': 'storico completo →',
  'scr.journal.gridNote': 'Riempimento = minuti praticati · anello = umore registrato',
  'scr.journal.recent': 'Pratica recente',
  'scr.journal.noSessions': 'Ancora nessuna sessione — inizia dalla schermata principale.',
  'scr.journal.endedEarly': ' · terminata prima',
  'scr.journal.min': '{n} min',

  /* ---- rituale (esecuzione della pratica) ---- */
  'scr.ritual.attuning': 'Sintonizzazione con il cielo…',
  'scr.ritual.back': 'Indietro',
  'scr.ritual.todaysPractice': 'Pratica di oggi',
  'scr.ritual.fromLibrary': 'Dalla libreria',
  'scr.ritual.focusAlignment': 'Allineamento di {chakra}',
  'scr.ritual.chakraBlurb': 'Una seduta guidata modellata da {planet} e dal tuo tema.',
  'scr.ritual.freqBlurb':
    '{intention}. Siediti, ammorbidisciti e lascia che il tono porti la sessione.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Tono',
  'scr.ritual.journeyNote':
    '{n} round, al tuo ritmo — circa 12 minuti. Lo schermo guida ogni fase.',
  'scr.ritual.length': 'Durata',
  'scr.ritual.sound': 'Suono',
  'scr.ritual.sound.tone': 'Tono',
  'scr.ritual.sound.music': 'Musica',
  'scr.ritual.sound.silent': 'Solo campane',
  'scr.ritual.soundTone': 'Il tono di frequenza da {hz} Hz suona sotto le campane.',
  'scr.ritual.soundMusic': 'Un accordo ambientale morbido e lento sotto le campane.',
  'scr.ritual.soundSilent': 'Solo le campane tibetane che scandiscono ogni passo.',
  'scr.ritual.spokenGuidance': 'Guida parlata',
  'scr.ritual.notAvailable': 'non disponibile qui — le parole appaiono sullo schermo',
  'scr.ritual.beginPractice': 'Inizia la pratica',
  'scr.ritual.notNow': 'Non ora',
  'scr.ritual.endSession': '‹ Termina sessione',
  'scr.ritual.complete': 'Pratica completa',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': 'Serie di {n} giorni',
  'scr.ritual.firstLogged': 'Prima pratica registrata',
  'scr.ritual.howNow': 'Come ti senti ora?',
  'scr.ritual.done': 'Fatto',

  /* ---- registro dell’umore ---- */
  'scr.moodci.default': 'Come ti senti?',
  'scr.moodci.logged': 'Registrato ✦',
  'scr.moodci.logThis': 'Registra questo',
  'scr.moodci.eyebrow': 'Registro della sera',
  'scr.moodci.blurb': 'Un tocco. Modella l’aura di domani e l’andamento del tuo umore.',
  'scr.moodci.noteLabel': 'Nota (facoltativa)',
  'scr.moodci.notePlaceholder': 'Qualsiasi cosa tu abbia in testa…',
  'scr.moodci.update': 'Aggiorna registro',
  'scr.moodci.save': 'Salva registro',

  /* ---- tema natale ---- */
  'scr.natal.eyebrow': 'Tema Natale',
  'scr.natal.title': 'Il cielo della tua nascita',
  'scr.natal.blurb':
    'Aggiungi la tua data, ora e luogo di nascita e Resonance disegnerà il tuo tema natale — la posizione esatta di Sole, Luna e pianeti nel momento in cui sei nato.',
  'scr.natal.addDetails': 'Aggiungi dati di nascita',
  'scr.natal.edit': 'modifica',
  'scr.natal.timeUnknown': 'ora sconosciuta (mezzogiorno)',
  'scr.natal.angleLine': '{asc} asc · MC {mc} · {system}',
  'scr.natal.placidus': 'case di Placido',
  'scr.natal.wholeSign': 'case a segno intero',
  'scr.natal.addPlace': 'Aggiungi il tuo luogo di nascita per l’Ascendente e le case →',
  'scr.natal.wheelAria': 'Ruota del tema natale',
  'scr.natal.placements': 'Posizioni',
  'scr.natal.aspects': 'Aspetti natali',
  'scr.natal.noAspects': 'Nessun aspetto maggiore in orbita.',
  'scr.natal.house': 'C{n}',

  /* ---- spezieria ---- */
  'scr.apoth.eyebrow': 'Spezieria',
  'scr.apoth.title': 'Compagni di cristallo',
  'scr.apoth.subChart': 'Pietre per il lavoro di {chakra} oggi · {n} nell’armadietto',
  'scr.apoth.subPlain': '{n} pietre nell’armadietto',
  'scr.apoth.all': 'Tutte',
  'scr.apoth.today': 'Oggi',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Nessuna pietra nella categoria {filter}.',
  'scr.apoth.noneThat': 'quella',
  'scr.apoth.pair': 'abbina una pietra alla pratica di oggi →',

  /* ---- schermata della Luna ---- */
  'scr.moon.eyebrow': 'Il Cielo',
  'scr.moon.title': 'La Luna',
  'scr.moon.sub': '{phase} · {pct}% illuminata',
  'scr.moon.whereShe': 'Dov’è',
  'scr.moon.inSign': 'La Luna è in {sign} — {note}.',
  'scr.moon.vocUntil':
    'Fuori corso finché non entra in {sign}{time} — una brutta finestra per iniziare qualcosa di nuovo. Radicati e chiudi i fili in sospeso invece.',
  'scr.moon.vocAt': ' alle {time}',
  'scr.moon.vocSoon': 'Va fuori corso tra {hours} h.',
  'scr.moon.notVoc': 'Non è fuori corso — la Luna sta facendo aspetti puliti.',
  'scr.moon.comingUp': 'In arrivo',

  /* ---- notifiche locali ---- */
  'notif.daily.title': 'La tua lettura è pronta',
  'notif.daily.body': 'Il transito, il focus di chakra e la pratica di oggi ti aspettano.',
  'notif.evening.title': 'Rallenta',
  'notif.evening.body': 'Qualche respiro e un registro dell’umore prima di dormire.',
  'notif.newMoon.title': 'Luna Nuova stanotte',
  'notif.newMoon.body': 'Un reset quieto — fissa un’intenzione e tienila per te.',
  'notif.fullMoon.title': 'Luna Piena stanotte',
  'notif.fullMoon.body': 'I sentimenti brillano forte. Nota cosa viene a galla.',
  'notif.moonSign.title': 'La Luna entra in {sign}',
  'notif.moonSign.body':
    'Il clima emotivo cambia — un buon momento per radicare la tua energia.',
  'notif.voc.title': 'La Luna sta per andare fuori corso',
  'notif.voc.body':
    'Il fuori corso inizia tra 15 minuti. Radica la tua energia — riposa, non iniziare.',

  /* ---- banner Luna fuori corso ---- */
  'scr.voc.active': 'Luna fuori corso — radicati, non iniziare. Finisce alle {time}.',
  'scr.voc.activeSoon': 'Luna fuori corso — radicati, non iniziare. Finisce presto.',
  'scr.voc.upcoming': 'La Luna va fuori corso tra {hours} h.',
  'scr.voc.twoMin': '2 min',

  /* ---- hub del cielo: riepilogo del campo dei chakra ---- */
  'scr.field.summary.join': ' e ',
  'scr.field.summary.pressure': '{names} sotto pressione',
  'scr.field.summary.open': '{names} spalancati',
  'scr.field.summary.carries': '{name} porta il giorno',
  'scr.field.summary.settled': 'Un campo assestato',

  /* ---- scheda e guida al digiuno ---- */
  'scr.fast.eyebrow': 'Digiuno',
  'scr.fast.phase.waxing': 'luna crescente',
  'scr.fast.phase.waning': 'luna calante',
  'scr.fast.cardMeta': '{special} · giorno lunare {day} · Luna in {sign}',
  'scr.fast.bestToday': 'Miglior tipo oggi:',
  'scr.fast.betterDays': 'Giorni migliori in arrivo',
  'scr.fast.waningWindow': 'Finestra calante',
  'scr.fast.cardDisclaimer':
    'Guida lunare tradizionale, non consiglio medico. Se hai una condizione di salute o una storia con il cibo, salta il digiuno e mangia semplicemente più leggero.',
  'scr.fast.fiveKinds': 'I cinque tipi e i giorni in arrivo →',
  'scr.fast.less': 'Meno',
  'scr.fast.howHold': 'Come portarlo',
  'scr.fast.guideSubSpecial': '{special} · Luna in {sign}',
  'scr.fast.guideSubPhase': '{phase} · giorno lunare {day}',
  'scr.fast.today': 'Oggi',
  'scr.fast.skyBacks': 'Il cielo sostiene → {method}',
  'scr.fast.whichKind': 'Quale tipo',
  'scr.fast.whichKindBlurb':
    'Cinque modi di portare un digiuno, il più delicato per primo — ognuno valutato per la Luna di oggi. Tocca un tipo per aprirlo.',
  'scr.fast.holdingWell': 'Portarlo bene',
  'scr.fast.hold1':
    'Bevi durante il digiuno — acqua, tisana, caffè nero. Un pizzico di sale aiuta in quelli più lunghi.',
  'scr.fast.hold2':
    'Rompilo con delicatezza: prima acqua tiepida, poi qualcosa di piccolo e cotto. Non buttarti subito sul pasto grande.',
  'scr.fast.hold3':
    'Muoviti lentamente, dormi di più, e fermati nel momento in cui il corpo ti dice di fermarti.',
  'scr.fast.guideDisclaimer':
    'Guida lunare tradizionale, non consiglio medico. Il digiuno secco — senza acqua — comporta un rischio reale e non è mai qualcosa che il cielo «raccomanda»; questa guida presume che tu beva. Se sei incinta, in terapia farmacologica, diabetico, sottopeso, o hai una storia con il cibo, salta il digiuno e mangia semplicemente più leggero.',
}
