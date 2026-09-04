import type { ScreenKey } from '../en/screens'

/** Polski — teksty ekranów podrzędnych. */
export const screens: Record<ScreenKey, string> = {
  /* ---- lokalne niebo / uziemienie ---- */
  'geo.ground.scarce':
    'Światła dnia jest mało — wyjdź na zewnątrz koło południa, zjedz coś ciepłego i pozwól sobie wcześnie zasnąć.',
  'geo.ground.long':
    'Długie światło rozciąga dzień — weź cień i chłodną wodę w południe i osłoń sypialnię przed późnym słońcem.',
  'geo.ground.spring':
    'Światło wraca — przesuń praktykę ku porankowi i pozwól energii się budować.',
  'geo.ground.summer':
    'Szczyt światła — trzymaj tempo łagodne, nawadniaj się i uziemiaj bosymi stopami na ziemi lub trawie.',
  'geo.ground.autumn':
    'Światło się wciąga — wybieraj wolniejsze, ogrzewające praktyki i wcześniejsze wyciszenie.',
  'geo.ground.winter':
    'Ciemna połowa — odpoczynek jest teraz produktywny; trzymaj praktyki krótkie, regenerujące i przy świecy.',
  'geo.season.spring': 'Wiosna',
  'geo.season.summer': 'Lato',
  'geo.season.autumn': 'Jesień',
  'geo.season.winter': 'Zima',

  /* ---- szybki horoskop ---- */
  'scr.quick.eyebrow': 'Dzisiejszy horoskop',
  'scr.quick.you': 'Ty',
  'scr.quick.moon': 'Księżyc',
  'scr.quick.readFull': 'Przeczytaj w całości →',
  'scr.quick.fullPro': 'Pełny odczyt · Pro →',

  /* ---- pełny horoskop ---- */
  'scr.horo.eyebrow': 'Dzienny horoskop',
  'scr.horo.addBirth': 'Dodaj dane urodzenia →',
  'scr.horo.moonHead': 'Księżyc',
  'scr.horo.skyHead': 'Niebo nad tobą',
  'scr.horo.risingNow': '{sign} wschodzi nad tobą właśnie teraz.',
  'scr.horo.transitingHouse': '{planet} tranzytuje twój {ord} dom.',
  'scr.horo.addPlace': 'Dodaj miejsce urodzenia lub udostępnij lokalizację w Ustawieniach →',
  'scr.horo.practiceHead': 'Dzisiejsza praktyka',
  'scr.horo.geoLine': '{season} · słońce {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h światła',
  'scr.horo.birthPlace': ' · używamy twojego miejsca urodzenia',

  /* ---- tranzyty ---- */
  'scr.transits.eyebrow': 'Niebo',
  'scr.transits.titleNatal': 'Tranzyty do twojego horoskopu',
  'scr.transits.titleSky': 'Niebo dzisiaj',
  'scr.transits.addChart': 'Dodaj horoskop',
  'scr.transits.nowHead': 'Właśnie teraz, nad tobą',
  'scr.transits.rising': '{sign} wschodzi',
  'scr.transits.movingHouse': '{planet} przechodzi przez twój {ord} dom — {arena}.',
  'scr.transits.sunMoon': 'Słońce {sunrise}–{sunset} · Księżyc {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'miejsce urodzenia',
  'scr.transits.allInOrb': 'Każdy tranzyt w orbie',
  'scr.transits.moonAspects': 'Dzisiejsze aspekty Księżyca',
  'scr.transits.natalPrefix': 'natalny ',
  'scr.transits.nothingOrb': 'Nic w orbie dzisiaj.',
  'scr.transits.applying': 'aplikujący',
  'scr.transits.separating': 'separujący',
  'scr.transits.orbNote':
    '↑ wciąż zacieśnia się ku dokładności · ↓ separuje. Ciaśniejsze orby są odczuwane silniej.',

  /* ---- dziennik ---- */
  'scr.journal.dayStreak': 'dni z rzędu',
  'scr.journal.practices': 'praktyk',
  'scr.journal.minutes': 'minut',
  'scr.journal.last4w': 'Ostatnie 4 tygodnie',
  'scr.journal.lastNDays': 'Ostatnie {n} dni',
  'scr.journal.reasonHistory': 'Nielimitowana historia dziennika',
  'scr.journal.fullHistory': 'pełna historia →',
  'scr.journal.gridNote': 'Wypełnienie = przećwiczone minuty · pierścień = zalogowany nastrój',
  'scr.journal.recent': 'Ostatnia praktyka',
  'scr.journal.noSessions': 'Jeszcze brak sesji — zacznij jedną z pulpitu.',
  'scr.journal.endedEarly': ' · zakończona wcześnie',
  'scr.journal.min': '{n} min',

  /* ---- rytuał (odtwarzacz praktyki) ---- */
  'scr.ritual.attuning': 'Dostrajanie do nieba…',
  'scr.ritual.back': 'Wstecz',
  'scr.ritual.todaysPractice': 'Dzisiejsza praktyka',
  'scr.ritual.fromLibrary': 'Z biblioteki',
  'scr.ritual.focusAlignment': 'Dostrojenie {chakra}',
  'scr.ritual.chakraBlurb': 'Prowadzona sesja ukształtowana przez {planet} i twój horoskop.',
  'scr.ritual.freqBlurb':
    '{intention}. Usiądź, zmiękcz się i pozwól tonowi nieść sesję.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Ton',
  'scr.ritual.journeyNote':
    '{n} rund, we własnym tempie — około 12 minut. Ekran prowadzi każdą fazę.',
  'scr.ritual.length': 'Długość',
  'scr.ritual.sound': 'Dźwięk',
  'scr.ritual.sound.tone': 'Ton',
  'scr.ritual.sound.music': 'Muzyka',
  'scr.ritual.sound.silent': 'Tylko misy',
  'scr.ritual.soundTone': 'Ton częstotliwości {hz} Hz gra pod misami.',
  'scr.ritual.soundMusic': 'Miękki, wolno poruszający się akord ambientowy pod misami.',
  'scr.ritual.soundSilent': 'Tylko śpiewające misy, które znaczą każdy krok.',
  'scr.ritual.spokenGuidance': 'Przewodnictwo głosowe',
  'scr.ritual.notAvailable': 'niedostępne tutaj — słowa pojawiają się na ekranie',
  'scr.ritual.beginPractice': 'Zacznij praktykę',
  'scr.ritual.notNow': 'Nie teraz',
  'scr.ritual.endSession': '‹ Zakończ sesję',
  'scr.ritual.complete': 'Praktyka ukończona',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': 'seria {n} dni',
  'scr.ritual.firstLogged': 'Pierwsza praktyka zapisana',
  'scr.ritual.howNow': 'Jak się teraz czujesz?',
  'scr.ritual.done': 'Gotowe',

  /* ---- meldunek nastroju ---- */
  'scr.moodci.default': 'Jak się czujesz?',
  'scr.moodci.logged': 'Zapisano ✦',
  'scr.moodci.logThis': 'Zapisz to',
  'scr.moodci.eyebrow': 'Wieczorny meldunek',
  'scr.moodci.blurb': 'Jedno stuknięcie. Kształtuje jutrzejszą aurę i twój trend nastroju.',
  'scr.moodci.noteLabel': 'Notatka (opcjonalna)',
  'scr.moodci.notePlaceholder': 'Cokolwiek masz w głowie…',
  'scr.moodci.update': 'Aktualizuj meldunek',
  'scr.moodci.save': 'Zapisz meldunek',

  /* ---- horoskop urodzeniowy ---- */
  'scr.natal.eyebrow': 'Horoskop urodzeniowy',
  'scr.natal.title': 'Twoje niebo urodzenia',
  'scr.natal.blurb':
    'Dodaj datę, godzinę i miejsce urodzenia, a Resonance narysuje twój horoskop urodzeniowy — dokładną pozycję Słońca, Księżyca i planet w chwili twojego urodzenia.',
  'scr.natal.addDetails': 'Dodaj dane urodzenia',
  'scr.natal.edit': 'edytuj',
  'scr.natal.timeUnknown': 'godzina nieznana (południe)',
  'scr.natal.angleLine': '{asc} wschodzący · MC {mc} · {system}',
  'scr.natal.placidus': 'domy Placidusa',
  'scr.natal.wholeSign': 'domy znaku całego',
  'scr.natal.addPlace': 'Dodaj miejsce urodzenia dla Ascendentu i domów →',
  'scr.natal.wheelAria': 'Koło horoskopu urodzeniowego',
  'scr.natal.placements': 'Umiejscowienia',
  'scr.natal.aspects': 'Aspekty natalne',
  'scr.natal.noAspects': 'Brak dużych aspektów w orbie.',
  'scr.natal.house': 'D{n}',

  /* ---- apteka ---- */
  'scr.apoth.eyebrow': 'Apteka',
  'scr.apoth.title': 'Towarzysze kryształowi',
  'scr.apoth.subChart': 'Kamienie do dzisiejszej pracy z {chakra} · {n} w szafce',
  'scr.apoth.subPlain': '{n} kamieni w szafce',
  'scr.apoth.all': 'Wszystkie',
  'scr.apoth.today': 'Dziś',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Brak kamieni w kategorii {filter}.',
  'scr.apoth.noneThat': 'tej',
  'scr.apoth.pair': 'połącz kamień z dzisiejszą praktyką →',

  /* ---- ekran Księżyca ---- */
  'scr.moon.eyebrow': 'Niebo',
  'scr.moon.title': 'Księżyc',
  'scr.moon.sub': '{phase} · {pct}% oświetlenia',
  'scr.moon.whereShe': 'Gdzie jest',
  'scr.moon.inSign': 'Księżyc jest w {sign} — {note}.',
  'scr.moon.vocUntil':
    'Bez biegu, aż wejdzie w {sign}{time} — kiepskie okno, by zaczynać coś nowego. Zamiast tego uziem się i domknij luźne końce.',
  'scr.moon.vocAt': ' o {time}',
  'scr.moon.vocSoon': 'Staje się bez biegu za {hours} h.',
  'scr.moon.notVoc': 'Nie bez biegu — Księżyc tworzy czyste aspekty.',
  'scr.moon.comingUp': 'Wkrótce',

  /* ---- powiadomienia lokalne ---- */
  'notif.daily.title': 'Twój odczyt jest gotowy',
  'notif.daily.body': 'Dzisiejszy tranzyt, skupienie czakry i praktyka czekają.',
  'notif.evening.title': 'Wycisz się',
  'notif.evening.body': 'Kilka oddechów i meldunek nastroju przed snem.',
  'notif.newMoon.title': 'Nów dziś wieczorem',
  'notif.newMoon.body': 'Cichy reset — ustaw intencję i zachowaj ją dla siebie.',
  'notif.fullMoon.title': 'Pełnia dziś wieczorem',
  'notif.fullMoon.body': 'Uczucia płoną jasno. Zauważ, co wychodzi na powierzchnię.',
  'notif.moonSign.title': 'Księżyc wchodzi w {sign}',
  'notif.moonSign.body':
    'Pogoda emocjonalna się przesuwa — dobra chwila, by uziemić energię.',
  'notif.voc.title': 'Księżyc staje się bez biegu',
  'notif.voc.body':
    'Bezbieg zaczyna się za 15 minut. Uziem energię — odpocznij, nie zaczynaj.',

  /* ---- baner Księżyca bez biegu ---- */
  'scr.voc.active': 'Księżyc bez biegu — uziem się, nie zaczynaj. Kończy się {time}.',
  'scr.voc.activeSoon': 'Księżyc bez biegu — uziem się, nie zaczynaj. Kończy się wkrótce.',
  'scr.voc.upcoming': 'Księżyc staje się bez biegu za {hours} h.',
  'scr.voc.twoMin': '2 min',

  /* ---- centrum nieba: podsumowanie pola czakr ---- */
  'scr.field.summary.join': ' i ',
  'scr.field.summary.pressure': '{names} pod presją',
  'scr.field.summary.open': '{names} otwarte na oścież',
  'scr.field.summary.carries': '{name} niesie dzień',
  'scr.field.summary.settled': 'Ustabilizowane pole',

  /* ---- karta postu + przewodnik ---- */
  'scr.fast.eyebrow': 'Post',
  'scr.fast.phase.waxing': 'przybywający Księżyc',
  'scr.fast.phase.waning': 'ubywający Księżyc',
  'scr.fast.cardMeta': '{special} · dzień księżycowy {day} · Księżyc w {sign}',
  'scr.fast.bestToday': 'Najlepszy rodzaj dziś:',
  'scr.fast.betterDays': 'Lepsze dni przed nami',
  'scr.fast.waningWindow': 'Okno ubywania',
  'scr.fast.cardDisclaimer':
    'Tradycyjne przewodnictwo księżycowe, nie porada medyczna. Jeśli masz schorzenie lub historię z jedzeniem, pomiń post i po prostu jedz lżej.',
  'scr.fast.fiveKinds': 'Pięć rodzajów i nadchodzące dni →',
  'scr.fast.less': 'Mniej',
  'scr.fast.howHold': 'Jak go utrzymać',
  'scr.fast.guideSubSpecial': '{special} · Księżyc w {sign}',
  'scr.fast.guideSubPhase': '{phase} · dzień księżycowy {day}',
  'scr.fast.today': 'Dziś',
  'scr.fast.skyBacks': 'Niebo wspiera → {method}',
  'scr.fast.whichKind': 'Który rodzaj',
  'scr.fast.whichKindBlurb':
    'Pięć sposobów na post, najłagodniejszy pierwszy — każdy oceniony dla dzisiejszego Księżyca. Stuknij jeden, by go otworzyć.',
  'scr.fast.holdingWell': 'Dobre utrzymanie',
  'scr.fast.hold1':
    'Pij w trakcie — woda, herbata ziołowa, czarna kawa. Szczypta soli pomaga przy dłuższych.',
  'scr.fast.hold2':
    'Przerywaj łagodnie: najpierw ciepła woda, potem coś małego i ugotowanego. Pomiń duży posiłek od razu.',
  'scr.fast.hold3':
    'Poruszaj się wolno, śpij więcej i przestań w chwili, gdy ciało mówi przestań.',
  'scr.fast.guideDisclaimer':
    'Tradycyjne przewodnictwo księżycowe, nie porada medyczna. Post suchy — bez wody — niesie realne ryzyko i nigdy nie jest czymś, co niebo „poleca”; ten przewodnik zakłada, że pijesz. Jeśli jesteś w ciąży, na lekach, chorujesz na cukrzycę, masz niedowagę lub historię z jedzeniem, pomiń post i po prostu jedz lżej.',
}
