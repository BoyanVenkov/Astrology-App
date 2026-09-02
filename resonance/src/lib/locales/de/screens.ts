import type { ScreenKey } from '../en/screens'

/** Deutsch — Texte der Unterbildschirme. */
export const screens: Record<ScreenKey, string> = {
  /* ---- lokaler Himmel / Erdung ---- */
  'geo.ground.scarce':
    'Das Tageslicht ist knapp — geh gegen Mittag kurz nach draußen, iss etwas Warmes, und erlaube dir, früh zu schlafen.',
  'geo.ground.long':
    'Langes Licht dehnt den Tag — nimm mittags Schatten und kühles Wasser, und schirm dein Schlafzimmer gegen die späte Sonne ab.',
  'geo.ground.spring':
    'Das Licht kehrt zurück — verleg deine Praxis in den Morgen und lass die Energie wachsen.',
  'geo.ground.summer':
    'Höchststand des Lichts — halt das Tempo sanft, trink genug, und erde dich barfuß auf Erde oder Gras.',
  'geo.ground.autumn':
    'Das Licht zieht sich zurück — bevorzuge langsamere, wärmende Praxen und einen früheren Ausklang.',
  'geo.ground.winter':
    'Die dunkle Hälfte — Ruhe ist jetzt produktiv; halt die Praxen kurz, erholsam und bei Kerzenschein.',
  'geo.season.spring': 'Frühling',
  'geo.season.summer': 'Sommer',
  'geo.season.autumn': 'Herbst',
  'geo.season.winter': 'Winter',

  /* ---- Schnellhoroskop ---- */
  'scr.quick.eyebrow': 'Horoskop für heute',
  'scr.quick.you': 'Du',
  'scr.quick.moon': 'Mond',
  'scr.quick.readFull': 'In voller Länge lesen →',
  'scr.quick.fullPro': 'Die volle Deutung · Pro →',

  /* ---- volles Horoskop ---- */
  'scr.horo.eyebrow': 'Tageshoroskop',
  'scr.horo.addBirth': 'Geburtsdaten hinzufügen →',
  'scr.horo.moonHead': 'Der Mond',
  'scr.horo.skyHead': 'Der Himmel über dir',
  'scr.horo.risingNow': '{sign} steigt gerade jetzt über dir auf.',
  'scr.horo.transitingHouse': '{planet} transitiert dein {ord} Haus.',
  'scr.horo.addPlace': 'Füge einen Geburtsort hinzu, oder teil deinen Standort in den Einstellungen →',
  'scr.horo.practiceHead': 'Praxis des Tages',
  'scr.horo.geoLine': '{season} · Sonne {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} Std. Licht',
  'scr.horo.birthPlace': ' · ich verwende deinen Geburtsort',

  /* ---- Transite ---- */
  'scr.transits.eyebrow': 'Der Himmel',
  'scr.transits.titleNatal': 'Transite zu deinem Chart',
  'scr.transits.titleSky': 'Der Himmel heute',
  'scr.transits.addChart': 'Chart hinzufügen',
  'scr.transits.nowHead': 'Gerade jetzt, über dir',
  'scr.transits.rising': '{sign} steigt auf',
  'scr.transits.movingHouse': '{planet} zieht durch dein {ord} Haus — {arena}.',
  'scr.transits.sunMoon': 'Sonne {sunrise}–{sunset} · Mond {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'Geburtsort',
  'scr.transits.allInOrb': 'Jeder Transit im Orbis',
  'scr.transits.moonAspects': 'Die Aspekte des Mondes heute',
  'scr.transits.natalPrefix': 'Radix-',
  'scr.transits.nothingOrb': 'Heute nichts im Orbis.',
  'scr.transits.applying': 'zunehmend',
  'scr.transits.separating': 'abnehmend',
  'scr.transits.orbNote':
    '↑ noch enger werdend zum Exakten · ↓ sich trennend. Engere Orbes werden stärker gefühlt.',

  /* ---- Journal ---- */
  'scr.journal.dayStreak': 'Tage in Folge',
  'scr.journal.practices': 'Praxen',
  'scr.journal.minutes': 'Minuten',
  'scr.journal.last4w': 'Letzte 4 Wochen',
  'scr.journal.lastNDays': 'Letzte {n} Tage',
  'scr.journal.reasonHistory': 'Unbegrenzter Journal-Verlauf',
  'scr.journal.fullHistory': 'voller Verlauf →',
  'scr.journal.gridNote': 'Füllung = geübte Minuten · Ring = notierte Stimmung',
  'scr.journal.recent': 'Jüngste Praxis',
  'scr.journal.noSessions': 'Noch keine Sitzungen — starte eine vom Dashboard.',
  'scr.journal.endedEarly': ' · früh beendet',
  'scr.journal.min': '{n} Min.',

  /* ---- Ritual (Praxis-Runner) ---- */
  'scr.ritual.attuning': 'Abstimmung mit dem Himmel…',
  'scr.ritual.back': 'Zurück',
  'scr.ritual.todaysPractice': 'Praxis des Tages',
  'scr.ritual.fromLibrary': 'Aus der Bibliothek',
  'scr.ritual.focusAlignment': 'Ausrichtung von {chakra}',
  'scr.ritual.chakraBlurb': 'Eine geführte Sitzung, geformt von {planet} und deinem Chart.',
  'scr.ritual.freqBlurb':
    '{intention}. Sitz, werde weich, und lass den Ton die Sitzung tragen.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Ton',
  'scr.ritual.journeyNote':
    '{n} Runden, im eigenen Tempo — etwa 12 Minuten. Der Bildschirm führt jede Phase.',
  'scr.ritual.length': 'Dauer',
  'scr.ritual.sound': 'Ton',
  'scr.ritual.sound.tone': 'Ton',
  'scr.ritual.sound.music': 'Musik',
  'scr.ritual.sound.silent': 'Still',
  'scr.ritual.soundTone': 'Der {hz}-Hz-Frequenzton spielt darunter.',
  'scr.ritual.soundMusic': 'Ein weicher, langsam sich bewegender Ambient-Akkord.',
  'scr.ritual.soundSilent': 'Kein Ton — nur gesprochene oder Bildschirm-Führung.',
  'scr.ritual.spokenGuidance': 'Gesprochene Führung',
  'scr.ritual.notAvailable': 'hier nicht verfügbar — die Worte erscheinen auf dem Bildschirm',
  'scr.ritual.beginPractice': 'Praxis beginnen',
  'scr.ritual.notNow': 'Nicht jetzt',
  'scr.ritual.endSession': '‹ Sitzung beenden',
  'scr.ritual.complete': 'Praxis abgeschlossen',
  'scr.ritual.doneMeta': '{minutes} Min. · {chakra} · {label}',
  'scr.ritual.streak': 'Serie von {n} Tagen',
  'scr.ritual.firstLogged': 'Erste Praxis notiert',
  'scr.ritual.howNow': 'Wie fühlst du dich jetzt?',
  'scr.ritual.done': 'Fertig',

  /* ---- Stimmungs-Check-in ---- */
  'scr.moodci.default': 'Wie fühlst du dich?',
  'scr.moodci.logged': 'Notiert ✦',
  'scr.moodci.logThis': 'Das notieren',
  'scr.moodci.eyebrow': 'Abend-Check-in',
  'scr.moodci.blurb': 'Ein Tippen. Es formt die Aura von morgen und deinen Stimmungsverlauf.',
  'scr.moodci.noteLabel': 'Notiz (optional)',
  'scr.moodci.notePlaceholder': 'Was dir auch immer im Kopf ist…',
  'scr.moodci.update': 'Check-in aktualisieren',
  'scr.moodci.save': 'Check-in speichern',

  /* ---- Geburtshoroskop ---- */
  'scr.natal.eyebrow': 'Geburtshoroskop',
  'scr.natal.title': 'Dein Geburtshimmel',
  'scr.natal.blurb':
    'Füge dein Geburtsdatum, deine Geburtszeit und deinen Geburtsort hinzu und Resonance zeichnet dein Geburtshoroskop — die genaue Position von Sonne, Mond und Planeten im Moment deiner Geburt.',
  'scr.natal.addDetails': 'Geburtsdaten hinzufügen',
  'scr.natal.edit': 'bearbeiten',
  'scr.natal.timeUnknown': 'Zeit unbekannt (Mittag)',
  'scr.natal.angleLine': '{asc}-Aszendent · MC {mc} · {system}',
  'scr.natal.placidus': 'Placidus-Häuser',
  'scr.natal.wholeSign': 'Ganzzeichen-Häuser',
  'scr.natal.addPlace': 'Füge deinen Geburtsort für Aszendent und Häuser hinzu →',
  'scr.natal.wheelAria': 'Rad des Geburtshoroskops',
  'scr.natal.placements': 'Positionen',
  'scr.natal.aspects': 'Radix-Aspekte',
  'scr.natal.noAspects': 'Keine großen Aspekte im Orbis.',
  'scr.natal.house': 'H{n}',

  /* ---- Apotheke ---- */
  'scr.apoth.eyebrow': 'Apotheke',
  'scr.apoth.title': 'Kristall-Gefährten',
  'scr.apoth.subChart': 'Steine für die heutige {chakra}-Arbeit · {n} im Schrank',
  'scr.apoth.subPlain': '{n} Steine im Schrank',
  'scr.apoth.all': 'Alle',
  'scr.apoth.today': 'Heute',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Keine Steine unter {filter} abgelegt.',
  'scr.apoth.noneThat': 'dieser Kategorie',
  'scr.apoth.pair': 'kombiniere einen Stein mit der heutigen Praxis →',

  /* ---- Mond-Bildschirm ---- */
  'scr.moon.eyebrow': 'Der Himmel',
  'scr.moon.title': 'Der Mond',
  'scr.moon.sub': '{phase} · {pct} % beleuchtet',
  'scr.moon.whereShe': 'Wo er ist',
  'scr.moon.inSign': 'Der Mond ist im {sign} — {note}.',
  'scr.moon.vocUntil':
    'Leerlaufend, bis er in {sign} eintritt{time} — ein schlechtes Fenster, um etwas Neues zu beginnen. Erde dich und knüpf stattdessen lose Enden zusammen.',
  'scr.moon.vocAt': ' um {time}',
  'scr.moon.vocSoon': 'Läuft in {hours} Std. leer.',
  'scr.moon.notVoc': 'Nicht leerlaufend — der Mond macht saubere Aspekte.',
  'scr.moon.comingUp': 'Bald',

  /* ---- lokale Benachrichtigungen ---- */
  'notif.daily.title': 'Deine Deutung ist bereit',
  'notif.daily.body': 'Der heutige Transit, der Chakra-Fokus und die Praxis warten.',
  'notif.evening.title': 'Ausklang',
  'notif.evening.body': 'Ein paar Atemzüge und ein Stimmungs-Check-in vor dem Schlaf.',
  'notif.newMoon.title': 'Heute Nacht Neumond',
  'notif.newMoon.body': 'Ein stiller Reset — setz eine Absicht und behalt sie für dich.',
  'notif.fullMoon.title': 'Heute Nacht Vollmond',
  'notif.fullMoon.body': 'Die Gefühle brennen hell. Bemerke, was an die Oberfläche kommt.',
  'notif.moonSign.title': 'Mond tritt in {sign} ein',
  'notif.moonSign.body':
    'Das emotionale Wetter verschiebt sich — ein guter Moment, deine Energie zu erden.',
  'notif.voc.title': 'Mond läuft gleich leer',
  'notif.voc.body':
    'Der Leerlauf beginnt in 15 Minuten. Erde deine Energie — ruhe, beginn nicht.',

  /* ---- Banner: leerlaufender Mond ---- */
  'scr.voc.active': 'Mond leerlaufend — erde dich, beginn nicht. Endet um {time}.',
  'scr.voc.activeSoon': 'Mond leerlaufend — erde dich, beginn nicht. Endet bald.',
  'scr.voc.upcoming': 'Der Mond läuft in {hours} Std. leer.',
  'scr.voc.twoMin': '2 Min.',

  /* ---- Himmel-Hub: Chakra-Feld-Zusammenfassung ---- */
  'scr.field.summary.join': ' und ',
  'scr.field.summary.pressure': '{names} unter Druck',
  'scr.field.summary.open': '{names} weit offen',
  'scr.field.summary.carries': '{name} trägt den Tag',
  'scr.field.summary.settled': 'Ein gesetztes Feld',

  /* ---- Fasten-Karte + Leitfaden ---- */
  'scr.fast.eyebrow': 'Fasten',
  'scr.fast.phase.waxing': 'zunehmender Mond',
  'scr.fast.phase.waning': 'abnehmender Mond',
  'scr.fast.cardMeta': '{special} · Mondtag {day} · Mond im {sign}',
  'scr.fast.bestToday': 'Beste Art heute:',
  'scr.fast.betterDays': 'Bessere Tage voraus',
  'scr.fast.waningWindow': 'Abnehmendes Fenster',
  'scr.fast.cardDisclaimer':
    'Traditionelle Mondführung, kein medizinischer Rat. Wenn du eine gesundheitliche Vorbelastung oder eine Geschichte mit Essen hast, lass das Fasten und iss einfach leichter.',
  'scr.fast.fiveKinds': 'Die fünf Arten und die Tage voraus →',
  'scr.fast.less': 'Weniger',
  'scr.fast.howHold': 'Wie man es hält',
  'scr.fast.guideSubSpecial': '{special} · Mond im {sign}',
  'scr.fast.guideSubPhase': '{phase} · Mondtag {day}',
  'scr.fast.today': 'Heute',
  'scr.fast.skyBacks': 'Der Himmel stützt → {method}',
  'scr.fast.whichKind': 'Welche Art',
  'scr.fast.whichKindBlurb':
    'Fünf Arten, ein Fasten zu halten, die sanfteste zuerst — jede für den heutigen Mond bewertet. Tippe auf eine, um sie zu öffnen.',
  'scr.fast.holdingWell': 'Es gut halten',
  'scr.fast.hold1':
    'Trink währenddessen — Wasser, Kräutertee, schwarzer Kaffee. Eine Prise Salz hilft bei den längeren.',
  'scr.fast.hold2':
    'Brich es sanft: erst warmes Wasser, dann etwas Kleines und Gekochtes. Lass die große Mahlzeit sofort aus.',
  'scr.fast.hold3':
    'Beweg dich langsam, schlaf mehr, und hör in dem Moment auf, in dem dein Körper Stopp sagt.',
  'scr.fast.guideDisclaimer':
    'Traditionelle Mondführung, kein medizinischer Rat. Trockenfasten — ohne Wasser — birgt ein echtes Risiko und ist nie etwas, das der Himmel «empfiehlt»; dieser Leitfaden geht davon aus, dass du trinkst. Wenn du schwanger bist, Medikamente nimmst, Diabetiker bist, Untergewicht hast oder eine Geschichte mit Essen hast, lass das Fasten und iss einfach leichter.',
}
