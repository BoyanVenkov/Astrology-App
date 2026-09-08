import type { RunesKey } from '../en/runes'

/**
 * Deutsch — das Ältere Futhark: Bedeutungen, aufrechte und umgekehrte
 * (merkstave) Lesung und eine Tagesweisung für jede der 24 Runen, plus die
 * Texte des Runen-Bildschirms. Die Runennamen sind Altnordisch und bleiben in
 * jeder Sprache gleich.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ Texte */
  'rune.eyebrow': 'Die Runen',
  'rune.dailyTitle': 'Deine Rune für heute',
  'rune.dailyBlurbChart':
    'Eine Rune, geworfen für dein Radix und dieses Datum. Sie erneuert sich um Mitternacht.',
  'rune.dailyBlurbPlain': 'Eine Rune für den Tag. Sie erneuert sich um Mitternacht.',
  'rune.tapReveal': 'Tippe auf den Stein, um ihn zu wenden.',
  'rune.turnStone': 'Stein wenden',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'Sie fiel umgekehrt — lies sie für die Schattenseite, die Blockade oder die noch ungelernte Lektion.',
  'rune.sound': 'Laut',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'Freyrs Ætt',
  'rune.aett.2': 'Heimdalls Ætt',
  'rune.aett.3': 'Týrs Ætt',

  'rune.element.fire': 'Feuer',
  'rune.element.ice': 'Eis',
  'rune.element.earth': 'Erde',
  'rune.element.air': 'Luft',
  'rune.element.water': 'Wasser',
  'rune.element.spirit': 'Geist',

  'rune.resonance.match':
    'Die Runen und der Himmel stimmen heute überein — beide weisen auf dein {chakra}.',
  'rune.resonance.bridge':
    'Der Himmel von heute bearbeitet dein {sky}; die Rune antwortet aus deinem {rune}.',

  'rune.cast': 'Die Runen werfen',
  'rune.castSub': 'Die Drei Nornen oder das Fünf-Runen-Kreuz',
  'rune.chooseTitle': 'Wähle einen Wurf',
  'rune.chooseBlurb': 'Halte deine Frage, dann wähle, wie die Runen fallen sollen.',
  'rune.runeCount.one': '1 Rune',
  'rune.runeCount.many': '{n} Runen',
  'rune.castEyebrow': 'Die Runen · {layout}',
  'rune.drawAgain': 'Erneut werfen',
  'rune.doCast': 'Werfen',

  'rune.layout.norns': 'Die Drei Nornen',
  'rune.layout.nornsSub': 'Was geworden ist, was wird, was geschuldet ist',
  'rune.layout.cross': 'Das Fünf-Runen-Kreuz',
  'rune.layout.crossSub': 'Ein vollerer Blick auf eine Lage',

  'rune.pos.now': 'Jetzt',
  'rune.pos.now.prompt': 'wo du stehst',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'das, was geworden ist — die Wurzel davon',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'das, was wird — die gegenwärtige Wende',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'das, was sein wird — was geschuldet ist und wohin es führt',
  'rune.pos.heart': 'Der Kern',
  'rune.pos.heart.prompt': 'der Kern der Sache',
  'rune.pos.crossing': 'Was ihn kreuzt',
  'rune.pos.crossing.prompt': 'das Hindernis oder die Hilfe',
  'rune.pos.root': 'Die Wurzel',
  'rune.pos.root.prompt': 'woraus es wächst',
  'rune.pos.counsel': 'Der Rat',
  'rune.pos.counsel.prompt': 'was die Runen raten',
  'rune.pos.outcome': 'Wohin es führt',
  'rune.pos.outcome.prompt': 'die Richtung, in die es neigt',

  'rune.ask': 'Die Runen befragen',
  'rune.askSub': 'Eine Rune, eine Antwort auf deine Frage',
  'rune.askEyebrow': 'Die Runen · Die Frage',
  'rune.askBlurb':
    'Stell deine Frage klar und halte sie, während die Rune gezogen wird.',
  'rune.askPlaceholder': 'Soll ich…  ·  Ist es Zeit, zu…  ·  Was muss ich wissen über…',
  'rune.consult': 'Eine Rune ziehen',
  'rune.askAgain': 'Erneut befragen',
  'rune.youAsked': 'Du hast gefragt',
  'rune.answerReading': 'Was die Rune sagt',
  'rune.castReading': 'Die Deutung',

  'rune.verdict.yes': 'Ja',
  'rune.verdict.no': 'Nein',
  'rune.verdict.wait': 'Noch nicht',
  'rune.verdict.hidden': 'Verborgen',
  'rune.verdict.yes.gloss': 'Die Rune neigt zum Ja. Beweg dich, und meine es ernst.',
  'rune.verdict.no.gloss': 'Die Rune neigt sich weg. Das jetzt zu erzwingen kostet mehr, als es zurückgibt.',
  'rune.verdict.wait.gloss':
    'Die Rune sagt, das Timing ist nicht reif. Bereite dich vor und lass den Moment zu dir kommen.',
  'rune.verdict.hidden.gloss':
    'Die Rune behält ihren Rat für sich. Dieser ist noch nicht deiner zu wissen — die Antwort bildet sich noch.',

  'rune.library': 'Das Ältere Futhark',
  'rune.librarySub': 'Alle vierundzwanzig, um mit ihnen zu sitzen',

  'dash.dailyRune': 'Rune des Tages',
  'dash.runeSeen': 'Die Rune von heute ist gewendet',
  'dash.runeNew': 'Wirf deine Rune für heute',

  /* ---------------------------------------------- Freyrs Ætt (1–8) */
  'rune.fehu.meaning': 'Vieh — bewegliches Vermögen und was es kaufen oder kosten kann',
  'rune.fehu.keywords': 'Reichtum · Anfänge · Fluss',
  'rune.fehu.up':
    'Fehu ist die Herde: Vermögen, das sich bewegt, sich mehrt und entgleitet, wenn es gehortet wird. Es markiert das Eintreffen neuer Mittel — Geld, Energie, Gelegenheit, Ansehen — und den Beginn von etwas, das wachsen kann. Der Haken liegt in seiner Natur: Das bleibt nur lebendig, wenn es im Umlauf bleibt. Gib etwas davon aus, teil etwas davon, setz es an die Arbeit. Was du umklammerst, verlierst du.',
  'rune.fehu.merk':
    'Umgekehrt ist Fehu Verlust, oder Vermögen, das dich besitzt statt umgekehrt. Etwas rinnt davon, oder du hütest eine Ressource so fest, dass sie dir nichts mehr nützt. Schau, wohin deine Energie und dein Geld wirklich gehen, und sei ehrlich, was zu behalten sich lohnt.',
  'rune.fehu.today':
    'Bring heute etwas in Umlauf — Geld, Mühe oder ein freundliches Wort, das du zurückgehalten hast.',

  'rune.uruz.meaning': 'Der Auerochse — wilde, ungezähmte Lebenskraft',
  'rune.uruz.keywords': 'Vitalität · Ausdauer · Rohform',
  'rune.uruz.up':
    'Uruz ist der wilde Ochse: Kraft, die nicht an den Pflug gebrochen wurde. Sie bringt einen Schub körperlicher Vitalität, sture Ausdauer und die Kraft, den rohen Umstand in etwas Eigenes zu formen. Eine gute Rune für Anfänge, die Muskel brauchen — das Training beginnen, den Boden aufbrechen, eine Grenze halten. Die Kraft ist echt; die Arbeit ist, zu lernen, sie zu lenken.',
  'rune.uruz.merk':
    'Umgekehrt ist Uruz missbrauchte oder fehlende Kraft — Wucht gegen dich selbst gewendet, oder eine Schwäche, wo du festbleiben musst. Vielleicht drückst du, wenn du innehalten solltest, oder du lässt etwas Wildes in deinem Leben ungemanagt. Hol dir die Kraft zurück, ohne sie dich lenken zu lassen.',
  'rune.uruz.today':
    'Nutz heute deinen Körper — geh weit, heb etwas Schweres oder stoß dich durch eine Sache, die du aufgeschoben hast.',

  'rune.thurisaz.meaning': 'Der Dorn — eine scharfe, reaktive, abwehrende Kraft',
  'rune.thurisaz.keywords': 'Abwehr · Reaktion · Ein hartes Tor',
  'rune.thurisaz.up':
    'Thurisaz ist der Dorn an der Hecke und der Hammer des Riesen: eine Kraft, die schützt, indem sie verletzt, und räumt, indem sie bricht. Sie markiert oft eine Konfrontation, eine harte Grenze oder eine Lage, die dem Charme nicht weicht. Frontal getroffen verwundet sie; mit Geduld getroffen wird sie ein Tor. Such diesen Kampf nicht, aber tu auch nicht so, als wäre der Dorn nicht da.',
  'rune.thurisaz.merk':
    'Umgekehrt ist Thurisaz eine Abwehr, die zur Mauer geworden ist, oder ein reaktives Temperament, das Schaden anrichtet. Vielleicht schlägst du um dich, oder du bist so gegen den Angriff verspannt, dass auch nichts Gutes dich erreicht. Leg den Hammer hin, bevor du ihn auf jemanden schwingst, der es nicht verdient hat.',
  'rune.thurisaz.today':
    'Halte heute eine Grenze, ohne dich dafür zu entschuldigen — und widersteh dem Drang, sie dreimal zu erklären.',

  'rune.ansuz.meaning': 'Der Gott — der Atem, das Wort, die Botschaft von Odin',
  'rune.ansuz.keywords': 'Stimme · Botschaft · Einsicht',
  'rune.ansuz.up':
    'Ansuz ist der Atem des Allvaters: Rede, Signal und die plötzliche Klarheit, die von außerhalb deiner eigenen Mühe kommt. Eine Botschaft kommt, oder ein Gespräch zählt mehr, als es aussieht. Sie regiert auch deine eigene Stimme — das ist der Tag, die wahre Sache klar zu sagen, zu lehren, zu benennen, was du siehst. Hör genau hin; die Antwort kann im Mund eines anderen sein.',
  'rune.ansuz.merk':
    'Umgekehrt ist Ansuz Missverständnis, eine falsch gehörte Botschaft, oder Weisheit, die du nicht hören willst, weil du weißt, von wem sie kommt. Worte werden benutzt, um zu verwirren statt zu klären — deine oder die eines anderen. Verlangsame das Gespräch und prüf, was eigentlich gemeint war.',
  'rune.ansuz.today':
    'Sag heute die klare Sache laut, und hör doppelt so viel zu, wie du redest.',

  'rune.raidho.meaning': 'Der Ritt — die Reise, das Rad, der rechte Rhythmus',
  'rune.raidho.keywords': 'Reise · Rhythmus · Rechte Ordnung',
  'rune.raidho.up':
    'Raidho ist der Wagen auf der Straße: Bewegung mit einer Richtung und das Gefühl, entlang eines Weges getragen zu werden, der seinen eigenen Rhythmus hat. Sie begünstigt Reisen, Entscheidungen, die dich in Bewegung bringen, und das Zurückbringen der Dinge in ihre rechte Ordnung. Die Lektion ist, dass die Reise ein eigenes Tempo hat — du kannst die Straße nicht hetzen, aber du kannst aufhören, gegen sie zu kämpfen.',
  'rune.raidho.merk':
    'Umgekehrt ist Raidho eine stockende Reise, ein Plan aus der Reihe, oder Bewegung in die falsche Richtung. Etwas ist aus dem Takt — eine Fahrt, die du nicht machen solltest, oder eine Hast, die dich kosten wird. Bring die Ordnung der Dinge in Ordnung, bevor du wieder losfährst.',
  'rune.raidho.today':
    'Mach heute den nächsten rechten Schritt der Reihe nach; widersteh dem Drang, zum interessanten Teil zu springen.',

  'rune.kenaz.meaning': 'Die Fackel — beherrschtes Feuer, Handwerk und Wissen',
  'rune.kenaz.keywords': 'Einsicht · Handwerk · Schöpferisches Feuer',
  'rune.kenaz.up':
    'Kenaz ist die Flamme in der Halle: nicht das Lauffeuer, sondern das bearbeitete Feuer — die Schmiede, die Lampe, der Funke des Verstehens. Sie bringt Klarheit in eine dunkle Ecke, Können zu einer Aufgabe und die schöpferische Hitze, zu machen statt nur zu träumen. Etwas, worüber du im Dunkeln warst, wird sichtbar. Nimm, was du jetzt siehst, und form es zu etwas Wirklichem.',
  'rune.kenaz.merk':
    'Umgekehrt ist Kenaz ein Licht, das erlischt — verlorene Inspiration, ein erkaltendes Projekt, oder Wissen, das zum Brennen statt zum Bauen benutzt wird. Vielleicht bist du schöpferisch blockiert, oder klammerst dich an eine Weise, Dinge zu tun, die kein Licht mehr wirft. Lass das Tote dunkel werden, damit eine neue Flamme fangen kann.',
  'rune.kenaz.today':
    'Mach heute etwas, so klein und roh es auch ist — der Punkt ist, eine Idee in Form zu bringen.',

  'rune.gebo.meaning': 'Die Gabe — der Austausch und die Bindung, die er schafft',
  'rune.gebo.keywords': 'Gabe · Austausch · Partnerschaft',
  'rune.gebo.up':
    'Gebo ist die gegebene Gabe und die geschuldete Gabe — der Faden aus Verpflichtung und Großzügigkeit, der Menschen bindet. Sie markiert einen echten Austausch: eine Partnerschaft, einen Vertrag, einen Akt des Gebens, der zurückkommen wird. Es gibt keine umgekehrte Gebo, denn eine Gabe kann, einmal gegeben, nicht zurückgegeben werden. Gib frei und empfange anmutig, und schau zu, wie sich die Waage mit der Zeit ausgleicht.',
  'rune.gebo.today':
    'Gib heute etwas ohne Rechnungsbuch im Kopf — und erlaub dir, anzunehmen, was dir zurück angeboten wird.',

  'rune.wunjo.meaning': 'Freude — Harmonie, Zugehörigkeit und Dinge, die an ihren Platz fallen',
  'rune.wunjo.keywords': 'Freude · Harmonie · Zugehörigkeit',
  'rune.wunjo.up':
    'Wunjo ist die Freude der gut geführten Halle: nicht Ekstase, sondern Zufriedenheit, das Gefühl, dass die Dinge zusammenpassen und dass du unter deinen Leuten bist. Sie markiert eine Auflösung, eine verdiente Belohnung, oder einen Moment, in dem sich die Teile ausrichten. Erlaub dir, es zu bemerken. Diese Rune bittet dich, das Gute anzunehmen, das wirklich da ist, statt auf eine bessere Version zu warten.',
  'rune.wunjo.merk':
    'Umgekehrt ist Wunjo aufgeschobene Freude oder eine falsche Harmonie, zusammengehalten davon, die schwere Sache nicht zu sagen. Etwas ist unter der Oberfläche verstimmt. Übertünch es nicht — die echte Leichtigkeit kommt nach dem ehrlichen Gespräch, nicht statt seiner.',
  'rune.wunjo.today':
    'Benenn eine Sache, die wirklich gut läuft, und lass das für heute genug sein.',

  /* -------------------------------------------- Heimdalls Ætt (9–16) */
  'rune.hagalaz.meaning': 'Hagel — plötzliche Störung außerhalb deiner Kontrolle',
  'rune.hagalaz.keywords': 'Störung · Krise · Klärung',
  'rune.hagalaz.up':
    'Hagalaz ist der Hagelsturm: Zerstörung, die vom Himmel fällt, die Ernte ruiniert und dann zu dem Wasser schmilzt, das die nächste nährt. Er markiert eine Unterbrechung, die du nicht gewählt hast und mit der du nicht streiten kannst — ein Ereignis, das das Muster bricht. Hier gibt es nichts zu bekämpfen. Such Schutz, lass es vorüberziehen und schau danach, was noch steht. Hagel klärt den Boden.',
  'rune.hagalaz.today':
    'Beginn heute nichts Zerbrechliches. Sichere die Luken, wart das Wetter aus und vertrau darauf, dass der Boden sich klärt.',

  'rune.nauthiz.meaning': 'Not — Reibung, Zwang und das Feuer, das er macht',
  'rune.nauthiz.keywords': 'Zwang · Not · Harte Lektion',
  'rune.nauthiz.up':
    'Nauthiz ist das Notfeuer, entzündet, indem man unter Druck zwei Hölzer aneinander reibt. Es markiert einen Zwang — einen Mangel, eine Verzögerung, eine Lage, aus der du noch nicht heraus kannst — und den Einfallsreichtum, den dieser Zwang aus dir herausdrückt. Die Lektion ist Geduld unter Reibung. Begegne dem Mangel ehrlich, tu die kleine disziplinierte Sache in deiner Macht, und lass den Widerstand dich lehren, was du wirklich brauchst.',
  'rune.nauthiz.merk':
    'Umgekehrt ist Nauthiz verleugnete Not — so zu tun, als wäre der Zwang nicht da, oder die Härte zu Groll und übereilten Entscheidungen sauer werden zu lassen. Hör auf, gegen die Tatsache der Grenze zu kämpfen. Der Weg hindurch ist zuerst Annahme, dann geduldiges, bewusstes Handeln.',
  'rune.nauthiz.today':
    'Nimm heute eine Grenze an, statt mit ihr zu streiten, und tu die eine kleine disziplinierte Sache, die sie dir offen lässt.',

  'rune.isa.meaning': 'Eis — Stille, ein Stillstand, der eingefrorene Moment',
  'rune.isa.keywords': 'Stille · Stillstand · Klarheit',
  'rune.isa.up':
    'Isa ist der zum Grund gefrorene Fluss: alle Bewegung gestoppt, alles an seinem Platz gehalten. Es markiert einen Stillstand — ein Plan auf Eis, eine Beziehung in Stasis, eine Zeit, in der nichts, was du drückst, sich zu bewegen scheint. Das ist kein Versagen; es ist Winter. Hör auf, das Tauen zu erzwingen. Nutz die Stille, um klar zu sehen, was unter dem Eis liegt, und spar deine Kraft für den Frühling.',
  'rune.isa.today':
    'Hör heute auf, das festgefahrene Ding zu drücken. Sitz mit ihm, schau es klar an und lass die Stille ihre Arbeit tun.',

  'rune.jera.meaning': 'Das Jahr — Ernte, Zyklen und Mühe, die Frucht trägt',
  'rune.jera.keywords': 'Ernte · Zyklen · Rechtes Timing',
  'rune.jera.up':
    'Jera ist das sich drehende Jahr: Samen, Wachstum, Ernte, Ruhe und wieder Samen. Sie markiert den Punkt, an dem frühere Mühe endlich Ertrag bringt — nicht durch einen Glücksfall, sondern weil genug Zeit vergangen und genug Arbeit getan ist. Sie rät auch Geduld mit dem, was noch nicht reif ist. Du kannst eine Jahreszeit nicht hetzen. Pfleg, was du gepflanzt hast, und sammle, was bereit ist.',
  'rune.jera.today':
    'Zieh etwas ein, das du vor einer Weile gepflanzt hast — beende es, verbuch es, oder bemerk einfach, dass es funktioniert hat.',

  'rune.eihwaz.meaning': 'Die Eibe — die Achse zwischen Leben und Tod, Ausdauer',
  'rune.eihwaz.keywords': 'Ausdauer · Wandlung · Die Achse',
  'rune.eihwaz.up':
    'Eihwaz ist der Eibenbaum, immergrün und giftig, seine Wurzeln in der Unterwelt und seine Krone im Licht — der Pfahl, der durch die Welten läuft. Sie markiert Ausdauer durch einen harten Übergang und eine Veränderung, die bis nach ganz unten geht. Etwas muss enden, damit das Nächste leben kann. Steh wie die Eibe: verwurzelt, unbewegt, verbunden sowohl mit dem, was stirbt, als auch mit dem, was geboren wird.',
  'rune.eihwaz.today':
    'Stell dich heute dem Ende, das du vermeidest — nicht um es zu erzwingen, nur um aufzuhören, so zu tun, als geschähe es nicht.',

  'rune.perthro.meaning': 'Der Losbecher — Geheimnis, Zufall und was das Schicksal verborgen hält',
  'rune.perthro.keywords': 'Geheimnis · Zufall · Das Ungesehene',
  'rune.perthro.up':
    'Perthro ist der Becher, aus dem die Lose geschüttelt werden — der Moment, bevor die Würfel fallen, wenn der Ausgang existiert, aber nicht gesehen werden kann. Sie regiert Geheimnisse, verborgene Einflüsse, Glück und die Teile des Musters, die einfach noch nicht deine zu wissen sind. Etwas wird außer Sicht entschieden. Spiel deine Rolle gut und lass den Wurf fallen; nicht alles ist dazu bestimmt, im Voraus herausgefunden zu werden.',
  'rune.perthro.merk':
    'Umgekehrt ist Perthro ein Geheimnis, das begraben bleiben muss und ausgegraben wird, oder eine ungesunde Fixierung darauf, den Ausgang zu kennen. Hör auf, die Enthüllung zu erzwingen. Manche Dinge verfaulen im Licht vor ihrer Zeit.',
  'rune.perthro.today':
    'Lass heute eine Sache unbekannt bleiben. Tu deinen Teil und hör auf, die Seite neu zu laden.',

  'rune.algiz.meaning': 'Der Elch — Schutz und das Greifen zum Höheren',
  'rune.algiz.keywords': 'Schutz · Verbindung · Höhere Hilfe',
  'rune.algiz.up':
    'Algiz ist der Elch mit erhobenem Geweih und das Riedgras, das die Hand schneidet, die danach greift — eine Rune des Schutzes und der Verbindung zwischen dir und etwas Größerem. Sie markiert einen Schild um dich gerade jetzt und Beistand, verfügbar über deiner eigenen Ebene, wenn du danach greifst. Bitte um Hilfe. Steh aufrecht. Was über dich wacht, ist auf deiner Seite.',
  'rune.algiz.merk':
    'Umgekehrt ist Algiz fallengelassener Schutz oder abgelehnte Hilfe — dich offen zu lassen, wo du bewacht sein solltest, oder dich vom Beistand abzuschneiden, der da ist. Prüf deine Abwehr und lass jemanden herein.',
  'rune.algiz.today':
    'Bitte heute bei einer Sache um Hilfe, von einem Menschen oder einer Macht über deiner Gehaltsstufe.',

  'rune.sowilo.meaning': 'Die Sonne — Ganzheit, Erfolg und der Wille, der leitet',
  'rune.sowilo.keywords': 'Erfolg · Ganzheit · Klarer Wille',
  'rune.sowilo.up':
    'Sowilo ist das Sonnenrad: das Licht, das immer wiederkehrt, der Sieg, der aus einem Willen kommt, stetig auf eine Sache gerichtet. Sie markiert Erfolg, Gesundheit und eine klärende Kraft, die den Nebel wegbrennt. Es gibt keine umgekehrte Sowilo — die Sonne geht nicht rückwärts. Richte deine Energie auf das, was zählt, halt sie dort, und erwarte, dass der Ausgang zu deinen Gunsten geht.',
  'rune.sowilo.today':
    'Richte heute alles auf ein Ziel. Kein Absichern, kein zweites Ziel — nur das eine, bis es dunkel wird.',

  /* --------------------------------------------------- Týrs Ætt (17–24) */
  'rune.tiwaz.meaning': 'Týr — Gerechtigkeit, Mut und das bereitwillige Opfer',
  'rune.tiwaz.keywords': 'Gerechtigkeit · Mut · Opfer',
  'rune.tiwaz.up':
    'Tiwaz ist der Speer und die Hand, die Týr dem Wolf gab, um sein Wort zu halten — eine Rune der Gerechtigkeit, der Ehre und des Rechttuns zu echtem Preis. Sie begünstigt Rechtsangelegenheiten, faire Kämpfe und das Stehen zu einer Verpflichtung, wenn sie aufhört, bequem zu sein. Richte dich auf das, was wahr ist, und halt die Linie. Der Sieg hier ist von der Art, mit der du danach leben kannst.',
  'rune.tiwaz.merk':
    'Umgekehrt ist Tiwaz versagender Mut, eine aufgegebene Verpflichtung, oder verbogene Gerechtigkeit. Vielleicht meidest du eine Haltung, von der du weißt, dass du sie einnehmen solltest, oder verausgabst deine Energie in einem Kampf, der nicht ehrlich ist. Verpflichte dich neu dem, was wirklich richtig ist, auch wenn es dich den Sieg kostet.',
  'rune.tiwaz.today':
    'Halt heute ein Versprechen, das unbequem geworden ist, und nimm die Haltung ein, der du ausweichst.',

  'rune.berkano.meaning': 'Die Birke — Wachstum, Pflege und stille neue Anfänge',
  'rune.berkano.keywords': 'Wachstum · Pflege · Neue Anfänge',
  'rune.berkano.up':
    'Berkano ist die Birke, der erste Baum, der nach dem Eis ergrünt — eine Rune sanften, geschützten Wachstums: Schwangerschaft, ein neues Projekt in seiner zarten Phase, Heilung, die Pflege, die eine kleine Sache stark werden lässt. Sie bittet dich, zu hegen statt zu drücken. Schütz den neuen Trieb, füttere ihn, halt den Frost von ihm fern und lass ihn im Tempo wachsen, das Wachstum wirklich braucht.',
  'rune.berkano.merk':
    'Umgekehrt ist Berkano verkümmertes Wachstum oder zurückgezogene Pflege — eine vernachlässigte neue Sache, ein Familienknoten, oder Selbstvernachlässigung, als Härte verkleidet. Etwas braucht Zuwendung, die du hast sich selbst überlassen. Geh zurück und hege es richtig.',
  'rune.berkano.today':
    'Pfleg heute eine wachsende Sache — einen Menschen, einen Plan oder dich selbst — mit echter Pflege, nicht nur mit Absicht.',

  'rune.ehwaz.meaning': 'Das Pferd — Partnerschaft, Vertrauen und stetige Bewegung',
  'rune.ehwaz.keywords': 'Partnerschaft · Vertrauen · Schwung',
  'rune.ehwaz.up':
    'Ehwaz ist Pferd und Reiter, die sich als eins bewegen — eine Rune vertrauensvoller Partnerschaft, Teamarbeit und gemeinsam gemachten Fortschritts, den keiner allein machen würde. Sie markiert eine Beziehung, die funktioniert, oder eine Zusammenarbeit, für die es sich lohnt, sich zu binden. Die Bindung ist auf Vertrauen gebaut und darauf, dass beide Seiten in dieselbe Richtung ziehen. Wo du das hast, lehn dich hinein; wo du es willst, sei zuerst die verlässliche Hälfte.',
  'rune.ehwaz.merk':
    'Umgekehrt ist Ehwaz eine Partnerschaft aus dem Takt — Misstrauen, eine Seite, die die andere trägt, oder Bewegung, die stockt, weil ihr nicht mehr dasselbe wollt. Benenn, wo das Vertrauen brach, und entscheide ehrlich, ob ihr noch zusammen reitet.',
  'rune.ehwaz.today':
    'Mach heute eine Sache mit jemandem statt allein, und sei die Hälfte, auf die man sich verlassen kann.',

  'rune.mannaz.meaning': 'Der Mensch — das Selbst und das Selbst unter anderen',
  'rune.mannaz.keywords': 'Selbst · Gemeinschaft · Perspektive',
  'rune.mannaz.up':
    'Mannaz ist die Rune der Menschheit — du als Einzelner und du als ein Knoten in einem Netz anderer. Sie bittet dich, dich klar zu sehen: deine Gaben, deine Grenzen und dein Spiegelbild in den Menschen um dich. Sie markiert oft einen Moment, in dem du andere brauchst, oder gebraucht wirst, oder dich ehrlich durch die Augen eines anderen siehst. Du bist nicht dafür gemacht, das allein zu tun, und du bist auch nicht der Mittelpunkt davon.',
  'rune.mannaz.merk':
    'Umgekehrt ist Mannaz Isolation, oder ein Selbstbild, das von der Wahrheit abgedriftet ist — aufgebläht oder ungerecht hart. Vielleicht bist du von deinen Leuten abgeschnitten, oder dein eigener schlimmster Kritiker. Hol dir einen Blick von außen von jemandem, der ehrlich und freundlich sein wird.',
  'rune.mannaz.today':
    'Sieh dich heute durch die Augen von jemandem, der dich gut kennt, und korrigier das Bild, wo es falsch ist.',

  'rune.laguz.meaning': 'Wasser — Fluss, Intuition und das tiefe Unbewusste',
  'rune.laguz.keywords': 'Fluss · Intuition · Die Tiefe',
  'rune.laguz.up':
    'Laguz ist der See und das Meer: Fluss, Gefühl, Traum und das tiefe Wasser des Unbewussten, in dem sich Dinge bewegen, die der Tagesverstand nicht sehen kann. Sie begünstigt es, einem Bauchgefühl vor einer Tabelle zu trauen, mit der Strömung statt gegen sie zu gehen und darauf zu achten, was deine Träume und Stimmungen dir sagen. Die Flut weiß, wohin sie geht. Lass dich vorerst von ihr tragen.',
  'rune.laguz.merk':
    'Umgekehrt ist Laguz eine Flut, oder unter Wasser gezogen zu werden — vom Gefühl überwältigt, etwas durch Abdriften vermeidend, oder eine Intuition, die zu Angst oder Fantasie sauer geworden ist. Bring die Füße auf den Boden. Nicht jede Strömung ist wert, ihr zu folgen, und nicht jede Welle ist eine Warnung.',
  'rune.laguz.today':
    'Trau heute dem Bauchgefühl vor dem klugen Argument, und achte darauf, was du heute Nacht träumst.',

  'rune.ingwaz.meaning': 'Ing — Reifung, gespeichertes Potenzial, ein vollendeter Zyklus',
  'rune.ingwaz.keywords': 'Reifung · Potenzial · Vollendung',
  'rune.ingwaz.up':
    'Ingwaz ist der über den Winter in die Erde versiegelte Samen — Potenzial, in einem geschlossenen Behälter gehalten, das seine Arbeit außer Sicht tut, bis es bereit ist, sich auf einmal zu lösen. Es markiert das Ende einer Reifung: ein Projekt, eine Entscheidung oder ein innerer Vorgang, der still gekocht hat, ist kurz davor, fertig zu sein. Öffne die Kiste nicht zu früh. Wenn es fertig ist, wird es sauber fertig sein, und du wirst die Erleichterung davon spüren.',
  'rune.ingwaz.today':
    'Lass heute das, was fast fertig ist, in seiner eigenen Zeit fertig werden. Hör auf, daran herumzustochern.',

  'rune.dagaz.meaning': 'Tag — Durchbruch, Erwachen, die Wende von dunkel zu hell',
  'rune.dagaz.keywords': 'Durchbruch · Erwachen · Wendepunkt',
  'rune.dagaz.up':
    'Dagaz ist die Morgendämmerung: das Scharnier zwischen Nacht und Tag, der Moment, in dem das Licht zurückkehrt und alles anders aussieht. Sie markiert einen Durchbruch — eine Erkenntnis, einen Sinneswandel, eine Lage, die auf einmal von festgefahren zu in Bewegung kippt. Es gibt keine umgekehrte Dagaz; die Morgendämmerung wird nicht ungeschehen. Etwas, worüber du im Dunkeln warst, wird gleich offensichtlich. Sei bereit, danach zu handeln.',
  'rune.dagaz.today':
    'Handle heute nach der Erkenntnis, solange sie noch hell ist. Einsicht verblasst, wenn man zu lange darüber schläft.',

  'rune.othala.meaning': 'Der Hof — Erbe, Herkunft und was wirklich deins ist',
  'rune.othala.keywords': 'Herkunft · Zuhause · Was bleibt',
  'rune.othala.up':
    'Othala ist das Ahnenland: was du erbst, wozu du gehörst, und die Dinge, die dir nicht genommen werden können, weil sie in dein Wer-du-bist gewoben sind. Sie markiert Fragen von Zuhause, Familie, Tradition und Vermächtnis — was von dort, wo du herkommst, zu behalten ist, und was zurückzulassen ist. Beansprucht, was wirklich deins ist. Pfleg es. Und sei ehrlich, welche Erbschaften Gaben sind und welche nur altes Gewicht.',
  'rune.othala.merk':
    'Umgekehrt ist Othala ein schlechtes Erbe, an dem festgehalten wird, oder eine Wurzellosigkeit, die sich nicht setzt — alte Familienmuster auf Autopilot, oder eine Weigerung, irgendwo dazuzugehören. Sortier die Erbstücke. Behalt, was der Zukunft dient; dem Rest gib ein achtungsvolles Begräbnis.',
  'rune.othala.today':
    'Behalt heute eine Sache von dort, wo du herkommst, und leg bewusst eine Sache ab, die du aus Gewohnheit trägst.',
} as const
