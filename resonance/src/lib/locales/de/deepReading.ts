import type { DeepReadingKey } from '../en/deepReading'

/**
 * Deutsch — die tiefe, lange Deutung: das kostenpflichtige Vollhoroskop und die
 * ausführliche Kompatibilitäts-Betrachtung. Geschrieben, um sich wie ein, zwei
 * Seiten von einem echten Astrologen zu lesen.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- Tageshoroskop (gratis): etwas mehr Tiefe je Notiz ---- */
  'horo.deep.q.house': 'Es landet im Bereich {theme}.',
  'horo.deep.q.hard': 'Geh damit vorsichtig um.',
  'horo.deep.q.soft': 'Ein kleiner, bewusster Schritt lohnt sich.',
  'horo.deep.q.neutral': 'Lass es sich setzen, bevor du handelst.',
  'horo.deep.q.thread':
    'Der Faden heute kehrt immer wieder zu deinem {focus} zurück — dort halte die Aufmerksamkeit.',
  'scr.horo.weekHead': 'Der größere Bogen',

  /* ============================ VOLLHOROSKOP ============================ */

  /* -- was es bedeutet, wenn jeder Planet die LAUFENDE (bewegte) Kraft ist -- */
  'dh.tr.Sun':
    'Die Sonne treibt den Tag: Wohin sie geht, setzt sie für rund einen Monat ein Scheinwerferlicht, wärmt jenen Teil des Radix und bittet dich, dort als du selbst aufzutauchen.',
  'dh.tr.Moon':
    'Der Mond ist der schnellste Körper am Himmel; seine Transite sind kurz, aber sie setzen den emotionalen Ton des Tages und bringen an die Oberfläche, was sie berühren.',
  'dh.tr.Mercury':
    'Merkur regiert das Denken, das Reden und die kleinen Entscheidungen, die sich summieren. Seine Transite beschleunigen den Informationsverkehr um ein Thema — Gespräche, Nachrichten, Papierkram, zweite Gedanken.',
  'dh.tr.Venus':
    'Venus regiert Anziehung, Behagen, Geld und Geschmack. Wenn sie einen Punkt überläuft, versüßt sie dort den Boden und lässt Verbindung, Ausgeben und Genuss leichter kommen.',
  'dh.tr.Mars':
    'Mars ist roher Antrieb und Hitze. Seine Transite entzünden ein Feuer unter dem, was sie berühren — du bekommst mehr Mut und mehr Reibung im selben Paket, und den Drang zu handeln, bevor du es zu Ende gedacht hast.',
  'dh.tr.Jupiter':
    'Jupiter ist der Planet des Wachstums und des «Mehr». Er dehnt aus, was er berührt — Gelegenheit, Zuversicht, Appetit und gelegentlich Übermaß — und lässt die Tür in jenem Lebensbereich für rund ein Jahr weiter aufschwingen.',
  'dh.tr.Saturn':
    'Saturn ist Zeit, Struktur und Folge. Wo er hingeht, verlangsamt er die Dinge und fragt, ob das, was du dort gebaut hast, Gewicht tragen kann; was kann, stärkt er, und was nicht, nimmt er still auseinander, damit du es richtig neu baust.',
  'dh.tr.Uranus':
    'Uranus ist der Störer. Seine Transite brechen ein Muster, das schal geworden ist — oft durch eine Überraschung, eine plötzliche Unruhe oder eine Veränderung, die du nicht geplant hast — und geben dir ein Stück Freiheit zurück, das du weggegeben hattest.',
  'dh.tr.Neptune':
    'Neptun löst die Ränder auf. Wo er überläuft, werden die Umrisse weich: mehr Fantasie und Mitgefühl, aber auch mehr Verwirrung und ein Sog, zu fliehen, statt der Sache direkt ins Auge zu sehen.',
  'dh.tr.Pluto':
    'Pluto arbeitet unter der Erde und hat es nicht eilig. Seine Transite bringen eine langsame, gründliche Verwandlung in das, was sie berühren — Machtkämpfe, Enden und ein Abtragen bis auf das, was wirklich wesentlich ist.',

  /* -- was dein RADIX-Punkt in deinem eigenen Radix regiert -- */
  'dh.na.Sun':
    'deine Kernidentität, deine Vitalität und das Gefühl davon, wer du bist, wenn du am meisten du selbst bist',
  'dh.na.Moon':
    'deine Instinkte, deine Stimmungen und was du brauchst, um dich sicher und gehalten zu fühlen',
  'dh.na.Mercury':
    'wie du denkst, lernst, sprichst und alltägliche Entscheidungen triffst',
  'dh.na.Venus':
    'wie du liebst und geliebt wirst, was du schön findest und dein Verhältnis zu Geld und Lust',
  'dh.na.Mars':
    'deinen Antrieb, deinen Zorn, dein Begehren und wie du dem nachgehst, was du willst',
  'dh.na.Jupiter':
    'wo du nach Sinn und Wachstum suchst und deinen natürlichen Sinn für Vertrauen und Möglichkeit',
  'dh.na.Saturn':
    'dein Verhältnis zu Disziplin, Autorität und Grenzen — die Stelle, an der du auf die harte Tour erwachsen werden musstest',
  'dh.na.Uranus':
    'dein Bedürfnis, frei zu sein und die Dinge auf deine Weise zu tun',
  'dh.na.Neptune':
    'deine Fantasie, deine Spiritualität und die Stellen, an denen du zum Idealisieren oder zum Sich-Verlieren neigst',
  'dh.na.Pluto':
    'dein Verhältnis zu Macht und Kontrolle und das, was in dir gebaut ist, um verwandelt zu werden',

  /* -- die Natur jedes Aspekts (zwei Varianten, je Abschnitt gewechselt) -- */
  'dh.asp.nat.conjunction.0':
    'Eine Konjunktion ist eine Verschmelzung. Die beiden Kräfte besetzen denselben Grad und wirken als eine, beginnen einen frischen Zyklus in diesem Lebensbereich — ein Samen, der gepflanzt wird, keine Ernte, die eingebracht wird.',
  'dh.asp.nat.conjunction.1':
    'Eine Konjunktion verschmilzt die beiden Energien so vollständig, dass sie kaum zu unterscheiden sind. Sie markiert einen Anfang; was jetzt Gestalt annimmt, entfaltet sich über die folgenden Jahre.',
  'dh.asp.nat.opposition.0':
    'Eine Opposition wirkt durch den Spiegel anderer Menschen und äußerer Umstände. Die Spannung ist echt, aber sie ist da, um dir Bewusstheit zu bringen — du siehst die Sache klar, weil ihr etwas gegenübersteht.',
  'dh.asp.nat.opposition.1':
    'Eine Opposition zieht dich zwischen zwei Pole und bittet dich, beide zu halten, statt in einen zu kippen. Balance ist hier kein Kompromiss; sie ist ein Können, das du unter Druck aufbaust.',
  'dh.asp.nat.square.0':
    'Ein Quadrat ist ein Reibungsaspekt. Die beiden Energien wollen Verschiedenes und haken sich ständig aneinander, und das Unbehagen ist der Punkt — es ist der Grus, der eine echte Veränderung erzwingt statt einer kosmetischen.',
  'dh.asp.nat.square.1':
    'Ein Quadrat legt ein Hindernis auf den Weg, genau dort, wo du am liebsten keines hättest. Geradeaus durchdrücken funktioniert selten; der Weg vorbei ist meist, den Zugang zu ändern, nicht sich mehr anzustrengen.',
  'dh.asp.nat.trine.0':
    'Ein Trigon ist ein offener Kanal. Die beiden Energien arbeiten ungefragt zusammen, und Unterstützung fließt hier zu dir — aber sie erreicht dich nur, wenn du dich wirklich auf sie zubewegst.',
  'dh.asp.nat.trine.1':
    'Ein Trigon lässt diesen Lebensbereich eine Weile leicht und natürlich wirken. Das Risiko ist Selbstzufriedenheit; Leichtigkeit, die du nicht nutzt, versickert meist still.',
  'dh.asp.nat.sextile.0':
    'Ein Sextil ist eine Gelegenheit, die du bewusst annehmen musst. Die Tür ist unverschlossen, aber nicht offen — eine kleine, bewusste Handlung jetzt macht aus einer Möglichkeit etwas Wirkliches.',
  'dh.asp.nat.sextile.1':
    'Ein Sextil bietet eine hilfreiche Öffnung in diesem Teil deines Lebens. Es belohnt Initiative und tut für das Warten gar nichts.',

  /* -- kurze Verbwendung für den Abschnittseinstieg -- */
  'dh.asp.verb.conjunction': 'trifft und verschmilzt mit',
  'dh.asp.verb.opposition': 'zieht gegen',
  'dh.asp.verb.square': 'reibt sich an',
  'dh.asp.verb.trine': 'fließt hin zu',
  'dh.asp.verb.sextile': 'öffnet eine Tür zu',

  /* -- wie Energie sich im Zeichen ausdrückt, in dem der Radix-Punkt steht -- */
  'dh.sign.Aries':
    'schnell, direkt und ein wenig kämpferisch, eher zum Handeln als zum Warten geneigt',
  'dh.sign.Taurus':
    'langsam, sinnlich und stur, widerspenstig gegen Hetze und langsam im Loslassen',
  'dh.sign.Gemini':
    'neugierig und wortreich, schnell im Verknüpfen von Ideen und schnell rastlos',
  'dh.sign.Cancer':
    'zart und beschützend, geht mit dem Gefühl vor der Logik voran',
  'dh.sign.Leo':
    'warm, ausdrucksstark und stolz, braucht gesehen zu werden, um sich echt zu fühlen',
  'dh.sign.Virgo':
    'präzise und praktisch, am glücklichsten, wenn sie wirklich nützlich sein kann',
  'dh.sign.Libra':
    'ausgerichtet auf Balance, Fairness und gute Gesellschaft, und einer Szene abgeneigt',
  'dh.sign.Scorpio':
    'intensiv und verschlossen, alles oder nichts, und vom Verborgenen angezogen',
  'dh.sign.Sagittarius':
    'rastlos nach Raum, Sinn und einer weiteren Sicht, und ungeduldig mit dem Kleingedruckten',
  'dh.sign.Capricorn':
    'ernst und selbstdiszipliniert, mehr beeindruckt von Ergebnissen als von Versprechen',
  'dh.sign.Aquarius':
    'unabhängig und in die Zukunft blickend, denkt in Systemen statt in Gefühlen',
  'dh.sign.Pisces':
    'verträumt, durchlässig und mitfühlend, und leicht überflutet',

  /* -- was ein Transit durch jedes Haus tendenziell aufwirbelt -- */
  'dh.house.1':
    'Im ersten Haus ist die Arbeit an dir sichtbar — dein Körper, dein Bild, der erste Eindruck, den du machst. Eine gute Strecke, um neu zu zeichnen, wie du auftrittst, statt einen Umriss zu behalten, der nicht mehr passt.',
  'dh.house.2':
    'Im zweiten Haus berührt es Geld, Ressourcen und Selbstwert. Die äußere Frage ist, was du verdienst und besitzt; die innere ist, was du glaubst zu verdienen.',
  'dh.house.3':
    'Im dritten Haus wirbelt es den Alltagsverstand auf — Gespräche, kurze Wege, Geschwister und Nachbarn, den endlosen kleinen Austausch von Information. Achte darauf, was du dir immer wieder erzählst.',
  'dh.house.4':
    'Im vierten Haus erreicht es die Wurzeln — Zuhause, Familie, deine Vergangenheit und die private Basis, zu der du zurückkehrst. Etwas in deinem Fundament wird geprüft.',
  'dh.house.5':
    'Im fünften Haus berührt es Spiel, Romantik, Kreativität und die Dinge, die du aus Freude machst. Es fragt, wohin dein Funke ging und wie du ihn zurückholst.',
  'dh.house.6':
    'Im sechsten Haus wirkt es durch Routine, Gesundheit und die tägliche Mühe, dich und deine Arbeit am Laufen zu halten. Kleine Gewohnheiten wiegen jetzt schwerer als sonst.',
  'dh.house.7':
    'Im siebten Haus sind andere Menschen der Spiegel — Partner, Nahestehende, die Person dir gegenüber am Tisch. Was du in ihnen begegnest, ist oft etwas Eigenes, das du nicht direkt angesehen hast.',
  'dh.house.8':
    'Im achten Haus geht es ins tiefe Wasser — geteiltes Geld, Intimität, Macht und das, was endet. Das ist kein Smalltalk-Gebiet; etwas wird an der Wurzel verwandelt.',
  'dh.house.9':
    'Im neunten Haus öffnet es die weitere Sicht — Glaube, Studium, Reise und die Suche nach Sinn. Dein Gefühl davon, wofür das alles ist, wird gedehnt.',
  'dh.house.10':
    'Im zehnten Haus ist es öffentlich — Beruf, Ruf, dein Stand und die Rolle, die du in der Welt spielst. Wofür du bekannt bist, steht zur Überarbeitung.',
  'dh.house.11':
    'Im elften Haus berührt es Freundschaft, Gemeinschaft und die Zukunft, nach der du greifst. Die Gesellschaft, die du hältst, und die Ziele, die du trägst, werden sortiert.',
  'dh.house.12':
    'Im zwölften Haus wirkt es im Hintergrund — Ruhe, Alleinsein, das Unbewusste und das, was du ungenannt mit dir trägst. Das ist stille, nach innen gerichtete Arbeit.',

  /* -- „im Alltag kann das aussehen wie…“ (je Aspekt gewechselt) -- */
  'dh.life.conjunction.0':
    'Im Alltag kann sich das wie ein Neuanfang anfühlen, den du nicht ganz gewählt hast — neue Bedingungen, ein neues Kapitel öffnet sich in diesem Bereich, ob du dich bereit fühlst oder nicht.',
  'dh.life.conjunction.1':
    'Von Tag zu Tag kann es als starkes neues Interesse kommen, als Person, die den Rahmen ändert, oder einfach als Gefühl, dass die alte Version davon vorbei ist.',
  'dh.life.conjunction.2':
    'Praktisch zeigt es sich oft als Schwelle — eine Entscheidung, ein Umzug, eine Bindung, die die Uhr in diesem Teil deines Lebens zurücksetzt.',
  'dh.life.opposition.0':
    'Im Alltag spielt sich das oft über jemand anderen ab — eine Meinungsverschiedenheit, eine Forderung oder eine Person, die genau das verkörpert, womit du ringst.',
  'dh.life.opposition.1':
    'Von Tag zu Tag kann es sich anfühlen wie zwischen zwei berechtigten Bedürfnissen gefangen — deinem und dem eines anderen, oder zwei Teilen deines eigenen Lebens, die nicht beide hineinpassen.',
  'dh.life.opposition.2':
    'Praktisch treibt es die Dinge zur Entscheidung: ein Gespräch, das du nicht länger aufschieben kannst, eine Wahl, die darauf wartet, dass du sie triffst.',
  'dh.life.square.0':
    'Im Alltag kann das aussehen wie ein Plan, der immer wieder stockt, eine Person, die stets denselben Knopf drückt, oder eine Aufgabe, die sich weit schwerer anfühlt, als sie sollte.',
  'dh.life.square.1':
    'Von Tag zu Tag kommt es oft als Frust — Mühe, die sich nicht umsetzt, eine Wand, wo du eine Tür erwartet hast.',
  'dh.life.square.2':
    'Praktisch zeigt es sich als Druck, der dich nicht rollen lässt: das, was du vermeidest, liegt jetzt auf dem Weg.',
  'dh.life.trine.0':
    'Im Alltag kann sich das wie eine Reihe kleiner grüner Ampeln anfühlen — Hilfe, die kommt, Timing, das passt, ein Ja, wo du dich für ein Nein gewappnet hast.',
  'dh.life.trine.1':
    'Von Tag zu Tag zeigt es sich oft als Leichtigkeit und Fluss in diesem Bereich, und als Versuchung anzunehmen, es werde immer so einfach sein.',
  'dh.life.trine.2':
    'Praktisch ist es ein günstiges Fenster — Vorstellungen greifen, Bitten bekommen einen warmen Empfang, der Weg ist kurz frei.',
  'dh.life.sextile.0':
    'Im Alltag kann das aussehen wie eine Öffnung, die du fast verpasst — ein Angebot, eine zufällige Begegnung, eine kleine Tür, die nur offen bleibt, wenn du jetzt hindurchgehst.',
  'dh.life.sextile.1':
    'Von Tag zu Tag belohnt es die Person, die den ersten Zug macht: schick die Nachricht, stell die Frage, bring deinen Namen ein.',
  'dh.life.sextile.2':
    'Praktisch ist es eine günstige Gelegenheit — nichts Dramatisches, aber wert, danach zu handeln, solange sie da ist.',

  /* -- die tiefere Einladung des Aspekts (gewechselt) -- */
  'dh.invite.conjunction.0':
    'Die Einladung ist, bewusst zu pflanzen. Was du jetzt beginnst, so klein es auch ist, ist der Samen von etwas, mit dem du in Jahren noch lebst — also wähle es mit Absicht.',
  'dh.invite.conjunction.1':
    'Die tiefere Arbeit ist, die alte Form davon sauber loszulassen, ohne sie halb lebendig ins neue Kapitel zu schleppen.',
  'dh.invite.conjunction.2':
    'Was das wirklich verlangt, ist ein klares Ja oder ein klares Nein. Ambivalenz ist die einzige Antwort, die das Fenster vergeudet.',
  'dh.invite.opposition.0':
    'Die Einladung ist nicht, zu gewinnen. Sie ist, beide Seiten lange genug zu halten, um die dritte Option zu finden, die ehrt, was in jeder wahr ist.',
  'dh.invite.opposition.1':
    'Die tiefere Arbeit ist, den Teil davon zurückzuholen, den du an jemand anderen ausgelagert hast — die Kraft, das Bedürfnis oder die Schuld.',
  'dh.invite.opposition.2':
    'Was das verlangt, ist ehrliche Bewusstheit. Sobald du das Muster wirklich sehen kannst, bist du nicht mehr darin.',
  'dh.invite.square.0':
    'Die Einladung ist nicht, härter zu drücken. Sie ist, zu bemerken, was du hier entwachsen bist, und die Reibung es auseinandernehmen zu lassen, damit etwas Stabileres gebaut werden kann.',
  'dh.invite.square.1':
    'Die tiefere Arbeit ist ein Methodenwechsel. Das Ziel mag in Ordnung sein; die Art, wie du es angehst, erzeugt den Widerstand.',
  'dh.invite.square.2':
    'Was das wirklich verlangt, ist Reife an einer bestimmten Stelle — das unglamouröse, strukturelle Ding zu tun, das du zu überspringen gehofft hast.',
  'dh.invite.trine.0':
    'Die Einladung ist, die Leichtigkeit zu nutzen, nicht nur zu genießen. Unterstützung, die ungenutzt bleibt, verschwindet meist still.',
  'dh.invite.trine.1':
    'Die tiefere Arbeit ist, während der Ruhe etwas zu bauen, das hält, wenn das Wetter wieder umschlägt.',
  'dh.invite.trine.2':
    'Was das verlangt, ist, dass du Ja zur Hilfe sagst — nimm die Vorstellung an, nimm die Abkürzung, lass es einmal leicht sein.',
  'dh.invite.sextile.0':
    'Die Einladung ist Initiative. Das ist eine Tür, die unverschlossen gelassen wurde; sie öffnet sich nur, wenn du drückst.',
  'dh.invite.sextile.1':
    'Die tiefere Arbeit ist, die kleinen Gelegenheiten zu bemerken, von denen du dich gewohnheitsmäßig abbringst, und eine zu ergreifen.',
  'dh.invite.sextile.2':
    'Was das verlangt, ist ein bescheidener, konkreter Akt von Mut — nichts Dramatisches, nur ein Schritt, den du lieber aufschieben würdest.',

  /* -- konkreter Rat (gewechselt) -- */
  'dh.do.conjunction.0':
    'Gib ihm einen sauberen Start: benenne, was beginnt, markiere es irgendwie, und stopf die ersten Wochen nicht mit Resten der alten Version voll.',
  'dh.do.conjunction.1':
    'Beweg dich bewusst statt schnell. Eine Konjunktion setzt einen langen Zyklus in Gang; der Ton, den du jetzt setzt, bleibt meist haften.',
  'dh.do.conjunction.2':
    'Entscheide. Sag das Ja oder das Nein laut vor mindestens einer anderen Person, damit es wirklich wird.',
  'dh.do.opposition.0':
    'Führ das Gespräch, um das du kreist, und geh hinein, um zuzuhören. Die andere Seite trägt Informationen, die du brauchst.',
  'dh.do.opposition.1':
    'Schreib beide Positionen auf, als müsstest du jede fair vertreten. Der Ausgleichspunkt zeigt sich meist auf dem Papier.',
  'dh.do.opposition.2':
    'Erzwing heute keine Lösung. Lass die Spannung stehen, bis die dritte Option von selbst auftaucht.',
  'dh.do.square.0':
    'Binde dich nicht und unterschreib nicht unter Druck. Lass das, was sich widersetzt, dir zeigen, wo die Struktur dünn ist, und stütze das zuerst.',
  'dh.do.square.1':
    'Ändere eine Sache an deinem Zugang und versuch es erneut. Dieselbe Mühe, ein anderer Winkel.',
  'dh.do.square.2':
    'Mach die langweilige, strukturelle Aufgabe, die du immer wieder aufschiebst. Das ist die ganze Aufgabe.',
  'dh.do.trine.0':
    'Mach einen echten Schritt, solange die Tür offen ist — eine Nachricht, eine Buchung, ein erster Entwurf. Leichtigkeit verblasst, wenn du sie nur bewunderst.',
  'dh.do.trine.1':
    'Bitte um die Sache. Das ist das Fenster, in dem ein Ja am wahrscheinlichsten ist.',
  'dh.do.trine.2':
    'Bau jetzt. Nutz die Ruhe, um Grundlagen zu legen, über die du dich später freust.',
  'dh.do.sextile.0':
    'Mach heute den ersten Zug, nicht nächste Woche. Schick es, frag es, trag deinen Namen ein.',
  'dh.do.sextile.1':
    'Sag Ja zum kleinen Angebot, auch wenn es geringfügig wirkt. Diese summieren sich.',
  'dh.do.sextile.2':
    'Wähl die eine Gelegenheit, die du normalerweise aufschieben würdest, und handle danach, bevor der Tag vorbei ist.',

  /* -- Timing-Sprache (je Zustand gewechselt) -- */
  'dh.time.peak.0':
    'Es ist nah an exakt und zieht sich noch enger, also erreicht das binnen ein, zwei Tagen seinen Höhepunkt und beginnt dann nachzulassen.',
  'dh.time.peak.1':
    'Der Kontakt ist gerade jetzt fast genau — das ist das Lauteste, das er wird, und die Intensität fällt bald danach ab.',
  'dh.time.peak.2':
    'Das ist auf oder nahe seinem exakten Grad, und darum verlangt es so viel deiner Aufmerksamkeit auf einmal.',
  'dh.time.build.0':
    'Es baut sich noch auf. Das Thema wird in den kommenden Tagen lauter, bevor es sich wendet.',
  'dh.time.build.1':
    'Dieser hat seine volle Stärke noch nicht erreicht; erwarte, dass er noch eine Weile steigt, bevor er den Kamm erreicht.',
  'dh.time.build.2':
    'Du bist am frühen Hang davon. Was jetzt als schwaches Signal zu lesen ist, wird binnen einer Woche oder so unverkennbar.',
  'dh.time.fade.0':
    'Es ist gerade an exakt vorbei — die schärfste Kante ist schon durch und der Druck lässt nach.',
  'dh.time.fade.1':
    'Der Höhepunkt davon liegt jetzt hinter dir. Was bleibt, ist Integration, keine Krise.',
  'dh.time.fade.2':
    'Dieser Kontakt ist auf dem Weg hinaus. Du räumst hinter ihm auf, statt das Schlimmste davon zu durchleben.',

  'dh.retro':
    ' Weil er rückläufig ist, ist das eine Überarbeitung statt eines ersten Durchgangs — du gehst über Boden zurück, den du schon gegangen bist, diesmal, um es richtig zu machen.',

  /* -- Vorlagen für den Abschnittsaufbau -- */
  'dh.sec.open':
    '{tr} Gerade jetzt {verb} sie {target} — den Teil von dir, der {na} regiert.',
  'dh.sec.sign':
    'Dein Radix-{target} steht in {sign} — {signFlavour} — was prägt, wie das Ganze bei dir landet.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- der Überblick: drei kurze Absätze -- */
  'dh.ov.lead':
    'Diese Deutung ist daraus gezogen, wo die Planeten heute wirklich stehen, gegen dein Geburtsbild gestellt — es geht also um deinen Himmel, nicht um den Himmel im Allgemeinen.',
  'dh.ov.head':
    'Der Schwerpunkt gerade jetzt ist {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Das Gesamtwetter ist günstig: Die leichten Kontakte wiegen klar schwerer als die harten. Das ist eine Strecke, um nach etwas zu greifen, statt dich dagegen zu stemmen — die Hauptweise, es zu vergeuden, ist stillzusitzen.',
  'dh.ov.weather.friction':
    'Das Gesamtwetter ist fordernd. Es ist mehr Reibung als Fluss in der Mischung, und mehrere Dinge wollen frontal getroffen statt weggewünscht werden. Nichts davon ist ein Desaster; es ist eine Aufbauphase, und Aufbauphasen fühlen sich nach Mühe an.',
  'dh.ov.weather.intense':
    'Das Gesamtwetter ist schwer und konzentriert. Langsame Planeten sitzen direkt auf deinem Radix, und die Lautstärke ist bei allem aufgedreht, was sie berühren. Teil dir die Kräfte ein — das ist eine Marathonstrecke, kein Sprint.',
  'dh.ov.weather.mixed':
    'Das Gesamtwetter ist gemischt — echte Unterstützung und echte Reibung im selben Fenster. Die Arbeit dieser Zeit ist zu wählen, wo du dich verausgabst und wo du dich zurückhältst.',
  'dh.ov.weather.quiet':
    'Das Gesamtwetter ist ruhig. Kein Planet drückt hart auf deinen Radix, was das zu einer seltenen Strecke macht, dein eigenes Programm und Tempo zu setzen, ohne dass der Himmel widerspricht.',
  'dh.ov.tempo.fast':
    'Das Tempo ist schnell — die Kontakte sind eng und in Bewegung, also kommen und gehen Themen binnen Tagen. Bleib reaktionsfähig, statt zu versuchen, alles im Voraus zu planen.',
  'dh.ov.tempo.building':
    'Das Tempo baut sich langsam auf. Die Hauptthemen sammeln noch Kraft, also wird das, was sich jetzt wie ein Hinweis anfühlt, in ein bis zwei Wochen unverkennbar sein.',
  'dh.ov.tempo.slow':
    'Das Tempo ist langsam und strukturell. Die großen Kontakte hier entfalten sich über Monate, nicht Tage; denk in Jahreszeiten und erwarte kein Urteil über Nacht.',
  'dh.ov.tempo.settling':
    'Das Tempo setzt sich — die schärfsten Kontakte haben ihren Höhepunkt gerade überschritten, also geht es mehr darum, das schon Geschehene zu integrieren, als sich für das Kommende zu wappnen.',

  /* -- der Mond-Absatz, erweitert -- */
  'dh.moon.lead': 'Dein emotionales Wetter',
  'dh.moon.body':
    'Der Mond zieht durch {sign} — {mood} — und ist ein {phase} bei {pct}% Licht. {phaseNote} Lass deine Stimmung Information sein statt ein Urteil: sie sagt dir, wie sich diese Strecke Himmel von innen anfühlt.',

  /* -- die Fäden: was immer wiederkehrt -- */
  'scr.horo.threadsHead': 'Die Fäden, die verbinden',
  'dh.th.house':
    'Dein {ord} Haus kommt immer wieder hoch. Was sonst auch los ist, {houseThemeLower} ist der Raum, in dem du diese Zeit Zeit verbringen sollst.',
  'dh.th.planet':
    'Dein Radix-{planet} wird aus mehr als einem Winkel zugleich bearbeitet. Da er {na} hält, rechne damit, dass das eine wiederkehrende Note ist und nicht einmalig.',
  'dh.th.bal.friction':
    'Und die Waage neigt sich zur Reibung. Das ist kein Pech — so fühlt sich eine Wachstumsphase von innen an. Die Mühe ist die Aufgabe.',
  'dh.th.bal.supportive':
    'Und die Waage neigt sich zum Fluss. Die stützenden Kontakte sind zahlreicher als die harten, also sind die Türen wirklich offen — die einzige Weise, das zu vergeuden, ist durch keine zu gehen.',
  'dh.th.bal.mixed':
    'Und die Waage ist wirklich geteilt. Ein Teil davon stützt dich und ein Teil widersetzt sich dir, oft am selben Tag, also zählt Unterscheidungsvermögen gerade mehr als Energie.',
  'dh.th.solo':
    'Die Kontakte sind über deinen Radix verteilt, statt sich auf einen Punkt zu häufen, also liest sich das als abwechslungsreiche Zeit statt als eine einzige beherrschende Geschichte.',

  /* -- die Timing-Karte -- */
  'scr.horo.timingHead': 'Wie sich das entfaltet',
  'dh.tm.tight':
    'Ziehen sich zu exakt zusammen: {list}. Das sind gerade die lautesten Stimmen an deinem Himmel und erreichen binnen Tagen ihren Höhepunkt.',
  'dh.tm.fade':
    'Über ihren Höhepunkt hinaus und verblassend: {list}. Die Lektion darin ist größtenteils angekommen — du integrierst jetzt, du wappnest dich nicht.',
  'dh.tm.none':
    'Nichts sitzt im Moment direkt auf exakt, was mit ein Grund ist, warum die Zeit sich offener als spitz anfühlt.',

  /* -- der abschließende Bogen -- */
  'dh.cl.protect':
    'Der größere Bogen bittet dich, dein {focus} durch diese Strecke zu schützen. Weniger Verpflichtungen, frühere Nächte und die Erlaubnis, weniger verfügbar zu sein als sonst — du bekommst mehr zurück, indem du deine Energie hütest, als indem du sie ausgibst. Das ist eine Jahreszeit, den Boden zu pflegen, nicht die Ernte zu erzwingen.',
  'dh.cl.use':
    'Der größere Bogen ist ein offenes Fenster rund um dein {focus}, und Fenster wie dieses bleiben nicht lange offen. Richte es auf eine Sache, die dir wirklich wichtig ist, und leg jetzt echtes Gewicht dahinter, solange der Himmel hilft statt sich zu widersetzen.',
  'dh.cl.steady':
    'Der größere Bogen verlangt Beständigkeit. Halt deine Routinen, halt dein Wort dir selbst gegenüber, und lass den Lärm durchziehen, ohne jedem Stück nachzujagen. Nicht jeder Transit braucht eine Antwort; manche müssen nur ausgesessen werden.',

  /* ======================= KOMPATIBILITÄT — TIEF ======================= */

  'syn.deep.patternLead': 'Wovon diese Bindung lebt',
  'syn.deep.pattern.emotional':
    'Im Kern ist das eine emotionale Verbindung. Die Monde und Venus tragen den größten Teil des Gewichts zwischen euch, was die Bindung warm, instinktiv und schnell im Einschwingen macht — und es bedeutet, dass Stimmungen, nicht Streit, die Temperatur setzen. Wenn ihr beide gefestigt seid, ist es weich und leicht und Zuhause fühlt sich schnell wie Zuhause an. Wenn einem von euch nicht wohl ist, weiß es der andere binnen Minuten, ob ein Wort fällt oder nicht. Die praktische Folge ist, dass sich um deinen eigenen inneren Zustand zu kümmern nicht getrennt ist davon, sich um die Beziehung zu kümmern; es ist dieselbe Arbeit. Lern, ein Gefühl früh zu benennen, bevor es zum Wetter wird, und diese Verbindung hält fast alles aus.',
  'syn.deep.pattern.mental':
    'Im Kern ist das ein Treffen der Köpfe. Ihr verbindet euch zuerst über Worte, Ideen, Neugier und die Freude, schnell verstanden zu werden, und der Funke bleibt genau so lange an, wie das Gespräch dauert. Das ist eine echte Stärke — ihr langweilt einander nie und löst als Paar gut Probleme. Das Risiko ist feiner: Es ist möglich, ein gutes Gespräch mit Nähe zu verwechseln und ein wenig oberhalb des Halses zu leben, Gedanken zu tauschen, während die Gefühlsschicht ungepflegt bleibt. Macht Raum für die Teile der Nähe, die nicht wortreich sind — ein geteiltes Schweigen, eine Mahlzeit, eine Aufgabe Seite an Seite erledigt — und die geistige Verbindung wird ein Fundament statt eines Ersatzes.',
  'syn.deep.pattern.physical':
    'Im Kern ist das eine Verbindung von Antrieb und Körper. Mars und die Sonne machen die schwere Arbeit, also gibt es hier echte Chemie und echten Schwung — ihr energisiert einander, ihr lasst Dinge geschehen, wenn ihr zusammen seid, und ihr funktioniert als Team gut, wenn es eine Aufgabe gibt. Dieselbe Verdrahtung bedeutet, dass ihr einander ebenso schnell aufziehen könnt; Wettbewerb und Gereiztheit sind die Schattenseite der Anziehung. Die Lösung ist nicht, die Hitze zu unterdrücken, sondern sie zu richten. Gebt ihr eine gemeinsame Richtung — ein Projekt, einen Plan, eine Herausforderung, sogar einen sauberen Streit mit Regeln — und die Intensität arbeitet für euch, statt sich nach innen zu wenden.',
  'syn.deep.pattern.karmic':
    'Im Kern hat diese hier Gewicht. Saturn und Pluto sind in der Mischung, was der Bindung ein Gefühl von Folge bringt — als wärt ihr hier, um etwas zusammen aufzuarbeiten, statt einfach die Zeit angenehm zu verbringen. Verbindungen wie diese fühlen sich meist früh bedeutsam an und verlangen beiden Menschen mehr ab, als es eine leichtere Paarung täte. Gut gehandhabt, wird sie zutiefst loyal und dauerhaft, von der Art Bindung, die Dinge übersteht. Nachlässig gehandhabt, wird sie schwer — Pflicht als Nähe verkleidet, oder ein langsamer Machtkampf, den niemand benennt. Der Unterschied liegt fast ganz darin, ob ihr beide sie weiter laut und mit Absicht wählt, statt zu bleiben, weil Gehen sich wie Scheitern anfühlt.',

  'syn.deep.chemHead': 'Die Chemie zwischen euch',
  'syn.deep.chem.strong':
    'Die Anziehung hier ist gut gestützt. Die Kontakte zwischen euren Radizes, die Begehren und Zuneigung regieren, sind weitgehend harmonisch, was sich meist in eine Chemie übersetzt, die sich natürlich statt angespannt anfühlt — ihr zieht euch auf eine Weise an, die nicht viel kostet aufrechtzuerhalten. Genieß das und nimm es nicht als Beweis, dass der Rest der Beziehung von selbst läuft; Leichtigkeit in einer Abteilung ersetzt keine Mühe in den anderen.',
  'syn.deep.chem.mixed':
    'Die Anziehung hier hat Strom und auch Grus. Manche der Kontakte zwischen euren Radizes ziehen euch warm zusammen; andere fügen demselben Zug Reibung hinzu, was sich als Chemie mit einer Kante lesen kann — magnetisch, gelegentlich zum Wahnsinnigwerden, selten fad. Diese Art Funke hält meist länger als die reibungslose, gerade weil sie sich ständig neu erzeugt. Die Aufgabe ist, die Kante spielerisch zu halten, statt sie in ein Muster des Aufziehens umkippen zu lassen.',
  'syn.deep.chem.cool':
    'Begehren ist nicht der lauteste Faden zwischen euren Radizes. Die Kontakte, die Anziehung regieren, sind ruhig oder mild herausfordernd, was nicht heißt, dass es keinen Funken gibt — nur, dass diese Verbindung eher auf anderem gebaut ist: geteiltes Verständnis, Respekt, Verlässlichkeit, ein Treffen der Werte. Beziehungen, die darauf gegründet sind, entzünden sich meist langsamer und sind erheblich schwerer zu brechen.',

  'syn.deep.commHead': 'Wie ihr kommuniziert',
  'syn.deep.comm.easy':
    'Kommunikation ist hier eine Stärke. Eure Merkur-Kontakte fließen, was heißt, dass ihr meist dem Denken des anderen folgt, Witze landet und ein Problem zusammen bearbeitet ohne viel Übersetzungsverlust. Nutz das bewusst, wenn etwas Schweres aufkommt — ihr seid besser darin, Dinge durchzusprechen, als die meisten Paare, also lasst die schwierigen Gespräche nicht die sein, die ihr vermeidet.',
  'syn.deep.comm.work':
    'Kommunikation braucht hier etwas Arbeit. Eure Merkur-Kontakte tragen Reibung, also könnt ihr aneinander vorbeireden — verschiedene Tempi, verschiedene Logik, verschiedene Annahmen darüber, was eigentlich vereinbart war. Das ist machbar, aber es braucht eine Gewohnheit: verlangsame, wiederhol, was du gehört hast, und prüf, ob ihr dasselbe mit demselben Wort meint, bevor ihr weitergeht.',
  'syn.deep.comm.quiet':
    'Es gibt in keiner Richtung einen starken Merkur-Kontakt zwischen euren Radizes, was meist heißt, dass Kommunikation weder eine offensichtliche Gabe noch ein offensichtliches Problem ist — sie ist einfach etwas, das ihr bewusst baut, statt hineinzufallen. Regelmäßige, ungezwungene Rücksprachen zählen für euch mehr als für ein Paar, das einander automatisch liest.',

  'syn.deep.growthLead': 'Wo dich das wachsen lässt',
  'syn.deep.growth.good':
    'Die Leichtigkeit zwischen euch ist echt, und sie ist auch das, worauf zu achten ist. Wenn eine Verbindung meist von selbst läuft, wird man leicht lässig — hört auf, die volle Ehrlichkeit und Mühe einzubringen, weil man nicht musste. Eure Kante als Paar ist, weiter richtig aufzutauchen für etwas, das es nicht verlangt: weiter die wahre Sache zu sagen, weiter die Mühe zu machen, einander weiter zu bemerken. Lasst „leicht“ nicht still zu „unbeachtet“ werden.',
  'syn.deep.growth.mid':
    'Die Reibungspunkte zwischen euch sind keine Mängel der Passung; sie sind der Lehrplan. Jeder markiert eine Stelle, an der ihr euch beide strecken müsst — die schwere Sache früher zu sagen, deinen Boden freundlicher zu halten, aufzuhören, auf Gelesenwerden zu warten, und anzufangen, klar zu sein. Paare, die diese Spannungen früh benennen und sie als geteilte Arbeit behandeln, kommen mit der Zeit meist gut zurecht. Paare, die hoffen, sie lösten sich einfach auf, treffen meist jahrelang denselben Streit.',
  'syn.deep.growth.hard':
    'Diese Verbindung verlangt euch beiden viel ab. Die herausfordernden Kontakte zwischen euren Radizes lösen sich nicht von selbst auf, also funktioniert die Beziehung nur, wenn ihr beide die Schwierigkeit als gemeinsame Arbeit behandelt und nicht als Schuld des anderen. Das ist wirklich möglich — viele dauerhafte Bindungen sind auf harten Aspekten gebaut — aber es ist eine Wahl, die ihr immer wieder treffen müsst, laut, besonders in den Strecken, in denen es leichter wäre, Buch zu führen.',

  'syn.deep.nameItLead': 'Sag diesen Teil laut',
  'syn.deep.nameIt':
    'Wenn es eine Sache gibt, die es wert ist, früh benannt zu werden, statt zu hoffen, dass sie sich legt, dann ist es der {a}–{b}-Kontakt: {sentence} Ungesagt verhärtet er sich meist zu einem Muster; klar und früh gesagt, stellt er sich meist als kleiner heraus, als er sich anfühlte.',
  'syn.deep.nameIt.none':
    'Es gibt hier keinen einzelnen Reibungspunkt, der früh abgefangen werden müsste — was für sich schon wert ist zu wissen. Die Arbeit in dieser Verbindung geht weniger darum, ein Thema zu entschärfen, und mehr darum, über das Ganze hinweg aufmerksam zu bleiben.',

  'syn.deep.longViewLead': 'Die lange Sicht',
  'syn.deep.longView.good':
    'das ist die Art Verbindung, die gut altert. Sie wird meist leichter statt schwerer, während ihr die Kanten des anderen lernt, und die frühe Leichtigkeit vertieft sich meist mit der Zeit zu etwas Festerem und Vertrauenswürdigerem. Die Hauptbedrohung für sie ist Vernachlässigung, nicht Konflikt.',
  'syn.deep.longView.mid':
    'das wird, was ihr daraus macht. Das Rohmaterial ist machbar — weder mühelos noch verloren — und das Ergebnis hängt fast ganz von der Mühe ab, die ihr beide während der ersten Strecke einbringt, bevor sich die Muster setzen. Bringt die Gewohnheiten früh in Ordnung, und das kann halten.',
  'syn.deep.longView.hard':
    'das ist jetzt intensiv, und es bleibt wahrscheinlich intensiv. Das ist es wert, wenn Tiefe und Bedeutung das sind, was ihr beide wirklich von einer Beziehung wollt. Es zehrt, wenn ein Teil von dir darauf wartet, dass es sich zu etwas Leichtem beruhigt — das ist hier wahrscheinlich nicht die Aufgabe.',
} as const
