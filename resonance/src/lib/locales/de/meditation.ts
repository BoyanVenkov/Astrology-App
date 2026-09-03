import type { MeditationKey } from '../en/meditation'

/** Deutsch — geführte Meditationen: eine Übersicht, einmal gelesen, dann Schritte mit Klangschale. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'die Basis der Wirbelsäule, wo du den Boden triffst',
  'med.seat.sacral': 'der Unterbauch, eine Handbreit unter dem Nabel',
  'med.seat.solar-plexus': 'die weiche Stelle unter den Rippen',
  'med.seat.heart': 'die Mitte der Brust',
  'med.seat.throat': 'die Kuhle der Kehle',
  'med.seat.third-eye': 'der Raum zwischen den Augenbrauen',
  'med.seat.crown': 'der Scheitel des Kopfes, und ein Stück darüber',
  'med.chakraLower': 'das {chakra}-Zentrum',

  'med.house.1': 'wie du dich zeigst und wie du der Welt begegnest',
  'med.house.2': 'was du schätzt und was dich stabilisiert',
  'med.house.3': 'dein Alltagsverstand und die Worte, die du nutzt',
  'med.house.4': 'Zuhause, Wurzeln und wo du dich getragen fühlst',
  'med.house.5': 'Spiel, Kreativität und was dir Freude bringt',
  'med.house.6': 'die tägliche Arbeit, für dich zu sorgen',
  'med.house.7': 'die Menschen, die dir am nächsten sind',
  'med.house.8': 'was endet, und was du in der Tiefe teilst',
  'med.house.9': 'der Sinn, und das größere Bild',
  'med.house.10': 'deine Arbeit in der Welt und wie du gesehen wirst',
  'med.house.11': 'deine Leute, und wonach du dich streckst',
  'med.house.12': 'Ruhe, Alleinsein und die Stille unter allem',

  'med.invite.Sun': 'Lass eine stabile Wärme sich hier sammeln — dein eigenes Licht, ohne Umwege.',
  'med.invite.Moon': 'Lass, was du fühlst, einfach hier sein, ohne es richten zu müssen.',
  'med.invite.Mercury': 'Lass das Denken langsamer werden. Du musst jetzt nichts lösen.',
  'med.invite.Venus': 'Werde weich zu dir, wie du es zu jemandem wärst, den du liebst.',
  'med.invite.Mars': 'Bemerke jede Wärme oder Dringlichkeit, und lass die Ausatmung einen Teil davon forttragen.',
  'med.invite.Jupiter': 'Lass diesen Raum sich etwas weiter anfühlen als noch einen Moment zuvor.',
  'med.invite.Saturn': 'Begegne dem Gewicht hier mit Ehrlichkeit. Du kannst mehr tragen, als du denkst.',
  'med.invite.Uranus': 'Lass etwas sich lösen — einen Griff, eine alte Form, die du nicht mehr brauchst.',
  'med.invite.Neptune': 'Lass die Konturen verschwimmen. Du darfst eine Weile nicht wissen.',
  'med.invite.Pluto': 'Lass, was vorbei ist, vorbei sein. Atme in den Raum, den es lässt.',
  'med.invite.default': 'Lass diese Energie durch dich hindurchgehen, nicht in dich hinein.',

  'med.ease.hard': 'Heute liegt Reibung in {dominant}. Du bist nicht hier, um dich hindurchzudrängen — nur um es klar zu spüren und weich drum herum zu bleiben.',
  'med.ease.soft': '{dominant} fließt heute. Bemerke die Leichtigkeit, und erlaube dir, sie zu empfangen.',
  'med.ease.neutral': '{dominant} ist heute intensiv. Lass es dich durchströmen, statt sich im Körper festzusetzen.',

  'med.dominant.aspect': '{planet} {verb} deinen Radix-{other}',
  'med.dominant.sign': '{planet} im Transit durch {sign}',
  'med.dominant.chartWord': 'Chart',
  'med.domverb.conjunction': 'in Begegnung mit',
  'med.domverb.opposition': 'in Opposition zu',
  'med.domverb.square': 'im Quadrat zu',
  'med.domverb.trine': 'im Trigon zu',
  'med.domverb.sextile': 'im Sextil zu',

  'med.houseLine.known': 'Das berührt den Teil deines Lebens, in dem es um {theme} geht. Halt ihn leicht. Hier gibt es nichts zu entscheiden — nur zu bemerken.',
  'med.houseLine.unknown': 'Was auch immer das in deinem Leben aufrührt, lass es sich für die Dauer dieser Praxis setzen. Es wird noch da sein, wenn du fertig bist, und du wirst ihm mit mehr Raum begegnen.',

  'med.mantraLong.root': 'Ich bin sicher. Ich bin hier. Ich habe, was ich brauche.',
  'med.mantraLong.sacral': 'Ich lasse das Leben durch mich hindurchfließen.',
  'med.mantraLong.solar-plexus': 'Ich vertraue meinem Feuer.',
  'med.mantraLong.heart': 'Ich gebe und empfange Liebe frei.',
  'med.mantraLong.throat': 'Ich sage meine Wahrheit mit Leichtigkeit.',
  'med.mantraLong.third-eye': 'Ich vertraue dem, was ich in mir sehe.',
  'med.mantraLong.crown': 'Ich bin Teil von etwas Weitem, und es trägt mich.',

  'med.title.fallback': 'Meditation des {chakra}-Zentrums',

  /* ---- die Übersicht, einmal vor dem Start gelesen ---- */
  'med.brief.lead': 'Lies das einmal, dann schließ die Augen. Jeder Schritt beginnt mit einer Klangschale — bleib bei ihm bis zur nächsten.',
  'med.brief.close': 'Drei sanfte Klangschalen beenden die Praxis. Komm in deinem eigenen Tempo zurück.',

  /* ---- allgemeine Schritte ---- */
  'med.step.settle': 'Augen geschlossen. Lass den Körper sich setzen und den Atem von selbst langsamer werden.',
  'med.step.breath': 'Leg die Aufmerksamkeit auf den Atem — folge ihm hinein, folge ihm hinaus. Wenn der Geist abschweift, ist dieses Bemerken die Praxis. Komm sanft zurück.',
  'med.step.centre': 'Bring deine Aufmerksamkeit zu {seat}. Atme, als erreichte der Atem selbst das {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Still, im Takt des Atems: {affirmation}',
  'med.step.close': 'Lass die Praxis los. Bemerke, wie du dich jetzt fühlst, bevor du die Augen öffnest.',

  /* ---- Atembewusstsein ---- */
  'med.step.ba.count': 'Zähl jetzt jede Ausatmung — eins bis zehn, dann fang von vorn an. Verlierst du die Zählung, beginn einfach bei eins. Niemand führt Buch.',

  /* ---- Körperscan ---- */
  'med.step.scan.0': 'Führe die Aufmerksamkeit langsam von den Fußsohlen aufwärts — Knöchel, Beine, Hüften, Bauch, Rücken, Brust, Arme, Hände. Bleib ein paar Atemzüge, wo du Spannung triffst, und lass sie weich werden.',
  'med.step.scan.1': 'Jetzt die Schultern, die Kehle, den Kiefer, den Raum um die Augen, die Kopfhaut. Dann spür den ganzen Körper auf einmal — schwer, warm, von selbst atmend.',

  /* ---- liebende Güte ---- */
  'med.step.metta.0': 'Bring dich in den Sinn, genau so, wie du heute bist. Biete still an: möge ich sicher sein, möge es mir gut gehen, möge ich in Frieden sein. Wiederhol es langsam und erlaube dir, es wirklich zu meinen.',
  'med.step.metta.1': 'Bring jemanden in den Sinn, den du leicht liebst. Stell dir sein Gesicht vor und biete dasselbe an: mögest du sicher sein, möge es dir gut gehen, mögest du in Frieden sein.',
  'med.step.metta.2': 'Jetzt weite es aus — jemand, den du kaum kennst, jemand, den du schwierig findest, dann alle, überall: mögen alle Wesen sicher sein, mögen alle Wesen in Frieden sein.',

  /* ---- Klangbad ---- */
  'med.step.bath.0': 'Lass den Ton in den Vordergrund kommen. Du hörst nicht angestrengt hin — du lässt den Klang ankommen, so wie Licht ankommt.',
  'med.step.bath.1': 'Bemerke, wo im Körper der Klang zu landen scheint — die Brust, der Schädel, die Hände. Lass den Raum zwischen dir und dem Klang sich auflösen.',

  /* ---- Dankbarkeit ---- */
  'med.step.grat.0': 'Bring eine Sache aus dem letzten Tag in den Sinn, die gut lief, so klein sie auch war. Benenn sie nicht nur — spür, wo die Dankbarkeit im Körper sitzt.',
  'med.step.grat.1': 'Jetzt etwas, das du sonst für selbstverständlich hältst — ein funktionierender Körper, ein Dach, jemand, der geblieben ist. Bleib ein paar Atemzüge dabei.',
  'med.step.grat.2': 'Noch eine — etwas über dich selbst. Eine Art, wie du da warst, eine Sache, die du gemeistert hast, eine Mühe, die niemand gesehen hat. Halt alle drei zusammen.',

  /* ---- sicherer Ort ---- */
  'med.step.safe.0': 'Stell dir einen Ort vor, an dem du dich völlig sicher fühlst — echt oder erdacht. Sieh dich langsam um: das Licht, die Tageszeit, was du hörst, was du auf der Haut spürst.',
  'med.step.safe.1': 'Finde die Stelle hier, an der du am liebsten ruhen würdest, und geh dorthin. Nichts wird von dir verlangt. Nichts erreicht dich, das du nicht zulässt.',

  /* ---- Berg ---- */
  'med.step.mtn.0': 'Stell dir einen Berg vor — seine breite Basis, seine festen Flanken, seinen stillen Gipfel. Lass deinen Körper und den Berg dieselbe Form werden: der Sitz als Basis, die Wirbelsäule als Hang, der Kopf als Gipfel.',
  'med.step.mtn.1': 'Das Wetter kommt und geht um den Berg — Licht, Wolke, Wind, Sturm. Deine Gedanken und Stimmungen sind das Wetter. Der Berg streitet nicht mit ihm, und es macht ihn nicht kleiner.',

  /* ---- offenes Gewahrsein ---- */
  'med.step.open.0': 'Lass den Anker des Atems los. Lass die Aufmerksamkeit weit offen sein, nicht auf etwas Bestimmtem. Geräusche, Empfindungen, Gedanken steigen auf und vergehen — du jagst ihnen nicht nach und schiebst sie nicht weg.',
  'med.step.open.1': 'Bemerke, dass das Gewahrsein selbst sich nicht bewegt. Die Dinge geschehen darin, wie Wolken im Himmel geschehen. Ruh als dieser Himmel — nichts hinzuzufügen, nichts wegzunehmen.',

  /* ---- Morgenabsicht ---- */
  'med.step.morn.0': 'Drei vollere Atemzüge, etwas tiefer als sonst — lass sie den Körper von innen wecken. Roll die Schultern einmal nach hinten und spür, wie sich die Vorderseite des Körpers öffnet.',
  'med.step.morn.1': 'Bring den kommenden Tag locker in den Sinn, dann wähl eine Absicht — keine Aufgabe, eine Art zu sein. Geduldig. Ehrlich. Mutig. Freundlich. Sag es einmal: heute werde ich ___ sein.',

  /* ---- Abendloslassen ---- */
  'med.step.eve.0': 'Lass den Tag leicht vorüberziehen, wie Landschaft aus dem Zugfenster — Morgen, Mittag, Abend. Bleib an nichts hängen. Wenn ein Moment zieht, notier ihn und sag: nicht jetzt.',
  'med.step.eve.1': 'Finde einen Moment, über den du froh bist, dass er geschah, und eine Sache, die du so gut gemacht hast, wie du konntest. Lass das genug sein. Jetzt lass den ganzen Tag los — er ist vollständig, einfach weil er vorbei ist.',

  /* ---- Yoga Nidra ---- */
  'med.step.nidra.0': 'Leg dich völlig still hin — stiller, als sich natürlich anfühlt, nur der Atem bewegt sich. Setz eine kurze Absicht, einen einzigen ruhigen Satz im Präsens. Sag ihn dreimal innerlich.',
  'med.step.nidra.1': 'Bring die Aufmerksamkeit zu jeder Stelle, sowie sie genannt wird, ohne dich zu bewegen — rechte Hand: Daumen, Finger, Handfläche, Handgelenk, Unterarm, Ellbogen, Schulter. Dann dasselbe links.',
  'med.step.nidra.2': 'Beide Hüften. Rechtes Bein — Oberschenkel, Knie, Schienbein, Knöchel, Fuß, Zehen. Linkes Bein genauso. Der ganze Rücken am Boden, der Bauch, der sich hebt und senkt, die Brust, die Kehle.',
  'med.step.nidra.3': 'Das Gesicht — Kiefer, Lippen, Nase, Wangen, Augen, der Raum zwischen den Brauen, die Kopfhaut. Jetzt der ganze Körper auf einmal, schwach leuchtend, vom Boden gehalten. Kehr zu deiner Absicht zurück.',
}
