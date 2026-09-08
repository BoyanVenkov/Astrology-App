import type { DeepReadingKey } from '../en/deepReading'

/**
 * Polski — głębokie, długie czytanie: płatny «Pełny horoskop» i szczegółowy
 * przegląd «Kompatybilności». Napisane tak, by czytało się jak strona lub dwie
 * od prawdziwego astrologa. Wymaga sprawdzenia przez native speakera; dla
 * nieuniknionego rodzaju przyjęto formę męską.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- horoskop dzienny (darmowy): odrobinę więcej głębi w każdej nucie ---- */
  'horo.deep.q.house': 'Ląduje to w obszarze {theme}.',
  'horo.deep.q.hard': 'Poruszaj się z tym ostrożnie.',
  'horo.deep.q.soft': 'Wart małego, świadomego kroku.',
  'horo.deep.q.neutral': 'Pozwól temu osiąść, zanim zadziałasz.',
  'horo.deep.q.thread':
    'Nić dnia wciąż wraca do twojego {focus} — tam trzymaj uwagę.',
  'scr.horo.weekHead': 'Większy łuk',

  /* ============================ PEŁNY HOROSKOP ============================ */

  /* -- co oznacza, gdy każda planeta jest siłą TRANZYTUJĄCĄ (ruchomą) -- */
  'dh.tr.Sun':
    'Słońce napędza dzień: dokądkolwiek idzie, kieruje tam reflektor na jakiś miesiąc, rozgrzewa tę część mapy i prosi, byś pojawił się w niej jako ty sam.',
  'dh.tr.Moon':
    'Księżyc to najszybsze ciało na niebie; jego tranzyty są krótkie, ale ustawiają emocjonalny ton dnia i wzburzają na powierzchnię to, czego dotkną.',
  'dh.tr.Mercury':
    'Merkury rządzi myśleniem, mówieniem i drobnymi decyzjami, które się sumują. Jego tranzyty przyspieszają ruch informacji wokół tematu — rozmowy, wiadomości, papierkowa robota, ponowne przemyślenia.',
  'dh.tr.Venus':
    'Wenus rządzi przyciąganiem, wygodą, pieniędzmi i gustem. Gdy tranzytuje jakiś punkt, słodzi tam grunt i sprawia, że więź, wydawanie i przyjemność przychodzą łatwiej.',
  'dh.tr.Mars':
    'Mars to surowy napęd i żar. Jego tranzyty rozpalają ogień pod tym, czego dotkną — w tej samej paczce dostajesz więcej odwagi i więcej tarcia, a także chęć działania, zanim przemyślisz to do końca.',
  'dh.tr.Jupiter':
    'Jowisz to planeta wzrostu i «więcej». Poszerza to, z czym się styka — szansę, pewność siebie, apetyt, a czasem nadmiar — i skłania drzwi w tym obszarze życia, by otwarły się szerzej na jakiś rok.',
  'dh.tr.Saturn':
    'Saturn to czas, struktura i konsekwencja. Gdzie idzie, zwalnia sprawy i pyta, czy to, co tam zbudowałeś, uniesie ciężar; co uniesie, wzmacnia, a czego nie — po cichu rozbiera, byś zbudował to porządnie na nowo.',
  'dh.tr.Uranus':
    'Uran to zakłócacz. Jego tranzyty łamią wzorzec, który zwietrzał — często przez zaskoczenie, nagły niepokój albo zmianę, której nie planowałeś — i oddają ci trochę wolności, której zrzeczenie podpisałeś.',
  'dh.tr.Neptune':
    'Neptun rozpuszcza krawędzie. Gdzie tranzytuje, zarysy miękną: więcej wyobraźni i współczucia, ale też więcej zamętu i ciągnięcia ku ucieczce zamiast zmierzenia się z rzeczą wprost.',
  'dh.tr.Pluto':
    'Pluton pracuje pod ziemią i się nie spieszy. Jego tranzyty przynoszą powolne, gruntowne przekształcenie tego, czego dotkną — walki o władzę, zakończenia i obieranie aż do tego, co naprawdę istotne.',

  /* -- czym rządzi twój punkt NATALNY w twojej własnej mapie -- */
  'dh.na.Sun':
    'twoja rdzenna tożsamość, twoja witalność i poczucie, kim jesteś, gdy jesteś najbardziej sobą',
  'dh.na.Moon':
    'twoje instynkty, twoje nastroje i to, czego potrzebujesz, by czuć się bezpiecznie i objęty',
  'dh.na.Mercury':
    'jak myślisz, uczysz się, mówisz i podejmujesz codzienne decyzje',
  'dh.na.Venus':
    'jak kochasz i jesteś kochany, co uważasz za piękne i twój stosunek do pieniędzy i przyjemności',
  'dh.na.Mars':
    'twój napęd, twój gniew, twoje pragnienie i to, jak idziesz po to, czego chcesz',
  'dh.na.Jupiter':
    'gdzie szukasz sensu i wzrostu oraz twoje naturalne poczucie wiary i możliwości',
  'dh.na.Saturn':
    'twój stosunek do dyscypliny, autorytetu i granic — miejsce, w którym musiałeś dorosnąć trudną drogą',
  'dh.na.Uranus':
    'twoja potrzeba bycia wolnym i robienia rzeczy po swojemu',
  'dh.na.Neptune':
    'twoja wyobraźnia, twoja duchowość i miejsca, w których masz skłonność do idealizowania lub gubienia siebie',
  'dh.na.Pluto':
    'twój stosunek do władzy i kontroli oraz to, co w tobie jest stworzone, by zostać przekształcone',

  /* -- natura każdego aspektu (dwa warianty, zmieniane co sekcję) -- */
  'dh.asp.nat.conjunction.0':
    'Koniunkcja to zlanie. Dwie siły zajmują ten sam stopień i działają jak jedna, rozpoczynając świeży cykl w tym obszarze twojego życia — nasiono, które się sadzi, nie żniwo, które się zbiera.',
  'dh.asp.nat.conjunction.1':
    'Koniunkcja stapia dwie energie tak całkowicie, że trudno je rozróżnić. Znaczy początek; to, co teraz nabiera kształtu, będzie się rozwijać przez kolejne lata.',
  'dh.asp.nat.opposition.0':
    'Opozycja działa przez lustro innych ludzi i zewnętrznych okoliczności. Napięcie jest realne, ale jest po to, by przynieść ci świadomość — widzisz sprawę wyraźnie, bo coś stoi naprzeciw niej.',
  'dh.asp.nat.opposition.1':
    'Opozycja ciągnie cię między dwoma biegunami i prosi, byś trzymał oba, zamiast zapaść się w jeden. Równowaga nie jest tu kompromisem; to umiejętność, którą budujesz pod presją.',
  'dh.asp.nat.square.0':
    'Kwadratura to aspekt tarcia. Dwie energie chcą różnych rzeczy i wciąż zaczepiają się o siebie, a dyskomfort jest sednem — to ten żwir, który wymusza prawdziwą zmianę, nie kosmetyczną.',
  'dh.asp.nat.square.1':
    'Kwadratura kładzie przeszkodę na drodze dokładnie tam, gdzie wolałbyś jej nie mieć. Pchanie prosto rzadko działa; wyjście to zwykle zmiana podejścia, nie większy wysiłek.',
  'dh.asp.nat.trine.0':
    'Trygon to otwarty kanał. Dwie energie współpracują nieproszone, a wsparcie płynie tu ku tobie — ale dosięga cię tylko wtedy, gdy naprawdę ruszysz ku niemu.',
  'dh.asp.nat.trine.1':
    'Trygon sprawia, że ten obszar życia przez jakiś czas wydaje się łatwy i naturalny. Ryzykiem jest samozadowolenie; łatwość, której nie używasz, ma skłonność do cichego wysychania.',
  'dh.asp.nat.sextile.0':
    'Sekstyl to szansa, którą musisz przyjąć celowo. Drzwi są odblokowane, ale nie otwarte — mały, świadomy ruch teraz zamienia możliwość w coś realnego.',
  'dh.asp.nat.sextile.1':
    'Sekstyl oferuje pomocne otwarcie w tej części twojego życia. Nagradza inicjatywę i nie robi nic dla czekania.',

  /* -- krótka fraza czasownikowa na początek sekcji -- */
  'dh.asp.verb.conjunction': 'spotyka się i zlewa z',
  'dh.asp.verb.opposition': 'ciągnie w przeciwną stronę wobec',
  'dh.asp.verb.square': 'ociera się o',
  'dh.asp.verb.trine': 'płynie ku',
  'dh.asp.verb.sextile': 'otwiera drzwi ku',

  /* -- jak energia wyraża się w znaku, w którym siedzi punkt natalny -- */
  'dh.sign.Aries':
    'szybka, bezpośrednia i trochę wojownicza, bardziej skłonna do działania niż do czekania',
  'dh.sign.Taurus':
    'powolna, zmysłowa i uparta, oporna wobec pośpiechu i powolna w puszczaniu',
  'dh.sign.Gemini':
    'ciekawa i słowna, szybka w łączeniu idei i szybka w niepokoju',
  'dh.sign.Cancer':
    'czuła i opiekuńcza, prowadząca się uczuciem przed logiką',
  'dh.sign.Leo':
    'ciepła, ekspresyjna i dumna, potrzebująca być widziana, by czuć się realna',
  'dh.sign.Virgo':
    'precyzyjna i praktyczna, najszczęśliwsza, gdy może być naprawdę użyteczna',
  'dh.sign.Libra':
    'nastawiona na równowagę, sprawiedliwość i dobre towarzystwo, i niechętna scenom',
  'dh.sign.Scorpio':
    'intensywna i skryta, wszystko albo nic, i przyciągana przez to, co ukryte',
  'dh.sign.Sagittarius':
    'niespokojna o przestrzeń, sens i szerszy widok, i niecierpliwa wobec drobnego druku',
  'dh.sign.Capricorn':
    'poważna i samodyscyplinowana, bardziej pod wrażeniem wyników niż obietnic',
  'dh.sign.Aquarius':
    'niezależna i zwrócona ku przyszłości, myśląca w systemach, nie w uczuciach',
  'dh.sign.Pisces':
    'marzycielska, przepuszczalna i współczująca, i łatwo przytłaczana',

  /* -- co tranzyt przez każdy dom zwykle wzburza -- */
  'dh.house.1':
    'W pierwszym domu praca widać na tobie — twoje ciało, twój wizerunek, pierwsze wrażenie, jakie robisz. Dobry odcinek, by przerysować to, jak się pokazujesz, zamiast trzymać zarys, który już nie pasuje.',
  'dh.house.2':
    'W drugim domu dotyka pieniędzy, zasobów i poczucia własnej wartości. Zewnętrzne pytanie to co zarabiasz i posiadasz; wewnętrzne to na co, jak wierzysz, zasługujesz.',
  'dh.house.3':
    'W trzecim domu wzburza codzienny umysł — rozmowy, krótkie wyjazdy, rodzeństwo i sąsiedzi, ta niekończąca się mała wymiana informacji. Zwróć uwagę na to, co wciąż sobie powtarzasz.',
  'dh.house.4':
    'W czwartym domu sięga korzeni — dom, rodzina, twoja przeszłość i prywatna baza, do której wracasz. Coś w twoim fundamencie jest badane.',
  'dh.house.5':
    'W piątym domu dotyka zabawy, romansu, twórczości i rzeczy, które robisz dla samej radości. Pyta, gdzie podziała się twoja iskra i jak ją odzyskać.',
  'dh.house.6':
    'W szóstym domu działa przez rutynę, zdrowie i codzienny trud utrzymywania siebie i swojej pracy w ruchu. Małe nawyki ważą teraz więcej niż zwykle.',
  'dh.house.7':
    'W siódmym domu lustrem są inni ludzie — partnerzy, bliscy, osoba po drugiej stronie stołu. To, co spotykasz w nich, to często coś twojego, na co nie spojrzałeś wprost.',
  'dh.house.8':
    'W ósmym domu wchodzi w głęboką wodę — wspólne pieniądze, intymność, władza i to, co się kończy. To nie teren pogawędek; coś jest przekształcane u korzenia.',
  'dh.house.9':
    'W dziewiątym domu otwiera szerszy widok — wiara, nauka, podróż i poszukiwanie sensu. Twoje poczucie, po co to wszystko, jest rozciągane.',
  'dh.house.10':
    'W dziesiątym domu jest publiczne — kariera, reputacja, twoja pozycja i rola, którą grasz w świecie. To, z czego jesteś znany, jest do rewizji.',
  'dh.house.11':
    'W jedenastym domu dotyka przyjaźni, wspólnoty i przyszłości, ku której sięgasz. Towarzystwo, które trzymasz, i cele, które nosisz, są sortowane.',
  'dh.house.12':
    'W dwunastym domu działa w tle — odpoczynek, samotność, nieświadomość i to, co nosisz, nie nazywając. To cicha, zwrócona do wewnątrz praca.',

  /* -- «w codziennym życiu może to wyglądać jak…» (zmieniane co aspekt) -- */
  'dh.life.conjunction.0':
    'W codziennym życiu może to być odczuwane jak start od nowa, którego nie do końca wybrałeś — nowe warunki, nowy rozdział otwierający się w tym obszarze, czy czujesz się gotowy, czy nie.',
  'dh.life.conjunction.1':
    'Dzień po dniu może przyjść jako silne nowe zainteresowanie, osoba zmieniająca ramę albo po prostu poczucie, że stara wersja tego się skończyła.',
  'dh.life.conjunction.2':
    'W praktyce często pojawia się jako próg — decyzja, przeprowadzka, zobowiązanie, które zeruje zegar w tej części twojego życia.',
  'dh.life.opposition.0':
    'W codziennym życiu rozgrywa się to często przez kogoś innego — nieporozumienie, żądanie albo osobę, która ucieleśnia dokładnie to, z czym się zmagasz.',
  'dh.life.opposition.1':
    'Dzień po dniu może być odczuwane jak zawieszenie między dwiema słusznymi potrzebami — twoją i czyjąś, albo dwiema częściami własnego życia, które obie się nie mieszczą.',
  'dh.life.opposition.2':
    'W praktyce zwykle doprowadza sprawy do punktu kulminacyjnego: rozmowa, której nie możesz już odkładać, wybór, który czekał, aż go dokonasz.',
  'dh.life.square.0':
    'W codziennym życiu może to wyglądać jak plan, który wciąż się zacina, osoba naciskająca ciągle ten sam guzik albo zadanie, które wydaje się o wiele cięższe, niż powinno.',
  'dh.life.square.1':
    'Dzień po dniu przychodzi to często jako frustracja — wysiłek, który się w nic nie przekłada, ściana tam, gdzie spodziewałeś się drzwi.',
  'dh.life.square.2':
    'W praktyce pojawia się jako presja, która nie pozwala ci jechać na luzie: to, czego unikałeś, jest teraz na drodze.',
  'dh.life.trine.0':
    'W codziennym życiu może to być odczuwane jak seria małych zielonych świateł — pomoc, która przychodzi, timing, który działa, tak tam, gdzie spinałeś się na nie.',
  'dh.life.trine.1':
    'Dzień po dniu pojawia się to często jako łatwość i przepływ w tym obszarze, i pokusa, by zakładać, że zawsze będzie tak prosto.',
  'dh.life.trine.2':
    'W praktyce to sprzyjające okno — przedstawienia się przyjmują, prośby dostają ciepłe przyjęcie, droga jest na chwilę wolna.',
  'dh.life.sextile.0':
    'W codziennym życiu może to wyglądać jak otwarcie, które prawie przegapiasz — oferta, przypadkowe spotkanie, małe drzwi, które zostają otwarte tylko, jeśli przejdziesz teraz.',
  'dh.life.sextile.1':
    'Dzień po dniu zwykle nagradza tego, kto robi pierwszy ruch: wyślij wiadomość, zadaj pytanie, wysuń swoje nazwisko.',
  'dh.life.sextile.2':
    'W praktyce to tania szansa — nic dramatycznego, ale warto działać, póki tu jest.',

  /* -- głębsze zaproszenie aspektu (zmieniane) -- */
  'dh.invite.conjunction.0':
    'Zaproszeniem jest sadzić celowo. To, co teraz zaczynasz, choćby najmniejsze, jest nasieniem czegoś, z czym za lata wciąż będziesz żyć — więc wybierz to z rozmysłem.',
  'dh.invite.conjunction.1':
    'Głębszą pracą jest puścić starą formę tego czysto, nie wlokąc jej półżywej do nowego rozdziału.',
  'dh.invite.conjunction.2':
    'Tym, o co to naprawdę prosi, jest jasne tak albo jasne nie. Ambiwalencja to jedyna odpowiedź, która marnuje to okno.',
  'dh.invite.opposition.0':
    'Zaproszeniem nie jest wygrać. Jest trzymać obie strony dość długo, by znaleźć trzecią opcję, która honoruje to, co prawdziwe w każdej.',
  'dh.invite.opposition.1':
    'Głębszą pracą jest odzyskać tę część tego, którą oddawałeś komuś innemu — siłę, potrzebę albo winę.',
  'dh.invite.opposition.2':
    'Tym, o co to prosi, jest szczera świadomość. Gdy już naprawdę widzisz wzorzec, nie jesteś już w nim.',
  'dh.invite.square.0':
    'Zaproszeniem nie jest naciskać mocniej. Jest zauważyć, co tu przerosłeś, i pozwolić tarciu to rozebrać, by dało się zbudować coś solidniejszego.',
  'dh.invite.square.1':
    'Głębszą pracą jest zmiana metody. Cel może być w porządku; sposób, w jaki się do niego zabierasz, jest tym, co generuje opór.',
  'dh.invite.square.2':
    'Tym, o co to naprawdę prosi, jest dojrzałość w konkretnym miejscu — zrobić tę nieefektowną, strukturalną rzecz, którą liczyłeś, że da się pominąć.',
  'dh.invite.trine.0':
    'Zaproszeniem jest użyć łatwości, nie tylko się nią cieszyć. Wsparcie, którego się nie wydaje, ma skłonność do cichego znikania.',
  'dh.invite.trine.1':
    'Głębszą pracą jest zbudować podczas spokoju coś, co utrzyma się, gdy pogoda znów się odmieni.',
  'dh.invite.trine.2':
    'Tym, o co to prosi, jest byś powiedział tak pomocy — przyjmij przedstawienie, weź skrót, pozwól, by raz było łatwo.',
  'dh.invite.sextile.0':
    'Zaproszeniem jest inicjatywa. To drzwi zostawione odblokowane; otwierają się tylko, gdy pchniesz.',
  'dh.invite.sextile.1':
    'Głębszą pracą jest zauważyć małe szanse, od których nawykowo się odwodzisz, i wziąć jedną.',
  'dh.invite.sextile.2':
    'Tym, o co to prosi, jest skromny, konkretny akt odwagi — nic dramatycznego, tylko krok, który wolałbyś odłożyć.',

  /* -- konkretne wskazówki (zmieniane) -- */
  'dh.do.conjunction.0':
    'Daj temu czysty start: nazwij, co się zaczyna, oznacz to jakoś i nie zaśmiecaj pierwszych tygodni resztkami starej wersji.',
  'dh.do.conjunction.1':
    'Poruszaj się z rozmysłem, nie szybko. Koniunkcja wprawia w ruch długi cykl; ton, który teraz ustawisz, ma skłonność do pozostania.',
  'dh.do.conjunction.2':
    'Zdecyduj. Powiedz tak albo nie na głos przy co najmniej jednej innej osobie, by stało się realne.',
  'dh.do.opposition.0':
    'Odbądź rozmowę, którą okrążasz, i wejdź w nią, żeby słuchać. Druga strona niesie informacje, których potrzebujesz.',
  'dh.do.opposition.1':
    'Zapisz obie pozycje, jakbyś musiał uczciwie bronić każdej. Punkt równowagi zwykle pokazuje się na papierze.',
  'dh.do.opposition.2':
    'Nie wymuszaj dziś rozstrzygnięcia. Pozwól napięciu siedzieć, aż trzecia opcja sama wypłynie.',
  'dh.do.square.0':
    'Nie zobowiązuj się i nie podpisuj pod presją. Pozwól temu, co się opiera, pokazać ci, gdzie struktura jest cienka, i najpierw ją podeprzyj.',
  'dh.do.square.1':
    'Zmień jedną rzecz w swoim podejściu i spróbuj ponownie. Ten sam wysiłek, inny kąt.',
  'dh.do.square.2':
    'Zrób to nudne, strukturalne zadanie, które wciąż odkładasz. To całe zadanie.',
  'dh.do.trine.0':
    'Zrób jeden prawdziwy krok, póki drzwi są otwarte — wiadomość, rezerwacja, pierwszy szkic. Łatwość blednie, jeśli tylko ją podziwiasz.',
  'dh.do.trine.1':
    'Poproś o tę rzecz. To okno, w którym tak jest najbardziej prawdopodobne.',
  'dh.do.trine.2':
    'Buduj teraz. Wykorzystaj spokój, by położyć fundament, z którego się później ucieszysz.',
  'dh.do.sextile.0':
    'Zrób pierwszy ruch dziś, nie w przyszłym tygodniu. Wyślij to, zapytaj, wpisz swoje nazwisko.',
  'dh.do.sextile.1':
    'Powiedz tak małej ofercie, nawet jeśli wydaje się drobna. Te się sumują.',
  'dh.do.sextile.2':
    'Wybierz tę jedną szansę, którą normalnie byś odłożył, i zadziałaj na nią przed końcem dnia.',

  /* -- język czasu (zmieniany co stan) -- */
  'dh.time.peak.0':
    'Jest blisko dokładności i wciąż się zacieśnia, więc szczyt osiąga to w dzień lub dwa, a potem zaczyna słabnąć.',
  'dh.time.peak.1':
    'Kontakt jest teraz niemal dokładny — to najgłośniejszy moment, a intensywność opada wkrótce potem.',
  'dh.time.peak.2':
    'Jest to na swoim dokładnym stopniu lub blisko niego, i dlatego prosi o tyle twojej uwagi naraz.',
  'dh.time.build.0':
    'Wciąż się buduje. Temat robi się głośniejszy przez najbliższe dni, zanim się odwróci.',
  'dh.time.build.1':
    'Ten nie osiągnął jeszcze pełnej siły; spodziewaj się, że będzie jeszcze przez chwilę rosnąć, zanim dojdzie do grzbietu.',
  'dh.time.build.2':
    'Jesteś na wczesnym zboczu tego. To, co teraz czyta się jako słaby sygnał, staje się nie do pomylenia w mniej więcej tydzień.',
  'dh.time.fade.0':
    'Właśnie minęło dokładność — najostrzejsza krawędź już przeszła i presja się rozluźnia.',
  'dh.time.fade.1':
    'Szczyt tego jest już za tobą. To, co zostaje, to integracja, nie kryzys.',
  'dh.time.fade.2':
    'Ten kontakt wychodzi. Sprzątasz po nim, a nie przeżywasz jego najgorsze.',

  'dh.retro':
    ' Ponieważ jest retrogradna, to przegląd, a nie pierwsze przejście — wracasz po gruncie, który już pokonałeś, tym razem po to, by zrobić to dobrze.',

  /* -- szablony składania sekcji -- */
  'dh.sec.open':
    '{tr} Teraz {verb} {target} — tę część ciebie, która rządzi {na}.',
  'dh.sec.sign':
    'Twój natalny {target} siedzi w {sign} — {signFlavour} — co kształtuje to, jak całość ląduje u ciebie.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- przegląd: trzy krótkie akapity -- */
  'dh.ov.lead':
    'To czytanie jest wyciągnięte z tego, gdzie planety naprawdę są dzisiaj, zestawione z twoją mapą urodzeniową — więc jest o twoim niebie, nie o niebie w ogóle.',
  'dh.ov.head':
    'Środek ciężkości teraz to {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Ogólna pogoda jest sprzyjająca: łatwe kontakty wyraźnie przeważają nad trudnymi. To odcinek, by sięgać po coś, zamiast spinać się przeciw temu — głównym sposobem zmarnowania go jest siedzenie bez ruchu.',
  'dh.ov.weather.friction':
    'Ogólna pogoda jest wymagająca. W mieszance jest więcej tarcia niż przepływu, a kilka rzeczy chce być spotkanych czołowo, a nie wyżyczonych precz. Nic z tego nie jest katastrofą; to faza budowania, a fazy budowania czuje się jak wysiłek.',
  'dh.ov.weather.intense':
    'Ogólna pogoda jest ciężka i skoncentrowana. Wolno poruszające się planety siedzą wprost na twojej mapie, a głośność jest podkręcona na wszystkim, czego dotkną. Rozkładaj siły — to odcinek maratonu, nie sprint.',
  'dh.ov.weather.mixed':
    'Ogólna pogoda jest mieszana — prawdziwe wsparcie i prawdziwe tarcie w tym samym oknie. Praca tego okresu to wybieranie, gdzie się wydawać, a gdzie się wstrzymywać.',
  'dh.ov.weather.quiet':
    'Ogólna pogoda jest cicha. Żadna planeta nie naciska mocno na twoją mapę, co czyni z tego rzadki odcinek, by ustawić własny plan i tempo, bez sprzeciwu nieba.',
  'dh.ov.tempo.fast':
    'Tempo jest szybkie — kontakty są ciasne i ruchome, więc tematy przychodzą i mijają w ciągu dni. Bądź reaktywny, zamiast próbować rozplanować całość z góry.',
  'dh.ov.tempo.building':
    'Tempo buduje się powoli. Główne tematy wciąż zbierają siłę, więc to, co teraz czuje się jak podpowiedź, będzie nie do pomylenia za tydzień lub dwa.',
  'dh.ov.tempo.slow':
    'Tempo jest wolne i strukturalne. Wielkie kontakty tutaj rozwijają się przez miesiące, nie dni; myśl w porach roku i nie spodziewaj się werdyktu z dnia na dzień.',
  'dh.ov.tempo.settling':
    'Tempo się ustala — najostrzejsze kontakty właśnie minęły swój szczyt, więc chodzi bardziej o integrowanie tego, co już się zdarzyło, niż o spinanie się na to, co nadchodzi.',

  /* -- akapit o Księżycu, rozszerzony -- */
  'dh.moon.lead': 'Twoja emocjonalna pogoda',
  'dh.moon.body':
    'Księżyc przechodzi przez {sign} — {mood} — i jest {phase} przy {pct}% światła. {phaseNote} Niech twój nastrój będzie informacją, a nie werdyktem: mówi ci, jak ten odcinek nieba czuje się od środka.',

  /* -- nici: co wciąż powraca -- */
  'scr.horo.threadsHead': 'Nici, które łączą',
  'dh.th.house':
    'Twój {ord} dom wciąż wraca. Cokolwiek innego się dzieje, {houseThemeLower} to pokój, w którym prosi się, byś w tym okresie spędzał czas.',
  'dh.th.planet':
    'Twój natalny {planet} jest obrabiany z więcej niż jednego kąta naraz. Ponieważ trzyma {na}, spodziewaj się, że będzie to nuta powracająca, a nie jednorazowa.',
  'dh.th.bal.friction':
    'A szala przechyla się ku tarciu. To nie pech — tak faza wzrostu czuje się od środka. Wysiłek to zadanie.',
  'dh.th.bal.supportive':
    'A szala przechyla się ku przepływowi. Kontakty wspierające przeważają liczebnie nad trudnymi, więc drzwi są naprawdę otwarte — jedynym sposobem zmarnowania tego jest nie przejść przez żadne.',
  'dh.th.bal.mixed':
    'A szala jest naprawdę podzielona. Część tego cię wspiera, a część ci się opiera, często tego samego dnia, więc rozróżnianie liczy się teraz bardziej niż energia.',
  'dh.th.solo':
    'Kontakty są rozproszone po twojej mapie, a nie spiętrzone na jednym punkcie, więc czyta się to jako okres zróżnicowany, a nie jedną dominującą historię.',

  /* -- mapa czasu -- */
  'scr.horo.timingHead': 'Jak to się rozwija',
  'dh.tm.tight':
    'Zacieśniają się ku dokładności: {list}. To teraz najgłośniejsze głosy na twoim niebie i osiągną szczyt w ciągu dni.',
  'dh.tm.fade':
    'Za swoim szczytem i słabną: {list}. Lekcja z nich w dużej mierze wylądowała — teraz integrujesz, nie spinasz się.',
  'dh.tm.none':
    'W tej chwili nic nie siedzi wprost na dokładności, i to część powodu, dla którego okres czuje się bardziej otwarty niż ostry.',

  /* -- łuk zamykający -- */
  'dh.cl.protect':
    'Większy łuk prosi, byś przez ten odcinek chronił swoje {focus}. Mniej zobowiązań, wcześniejsze wieczory i pozwolenie na bycie mniej dostępnym niż zwykle — odzyskasz więcej, strzegąc swojej energii, niż wydając ją. To pora na doglądanie gruntu, nie na wymuszanie żniw.',
  'dh.cl.use':
    'Większy łuk to otwarte okno wokół twojego {focus}, a okna takie jak to nie zostają otwarte długo. Wyceluj je w jedną rzecz, która naprawdę ci zależy, i włóż za nią teraz prawdziwy ciężar, póki niebo pomaga, a nie się opiera.',
  'dh.cl.steady':
    'Większy łuk prosi o stałość. Trzymaj swoje rutyny, trzymaj słowo dane sobie i pozwól hałasowi przejść bez gonienia za każdym jego kawałkiem. Nie każdy tranzyt potrzebuje odpowiedzi; niektóre trzeba tylko przetrwać.',

  /* ======================= KOMPATYBILNOŚĆ — GŁĘBOKA ======================= */

  'syn.deep.patternLead': 'Na czym ta więź działa',
  'syn.deep.pattern.emotional':
    'W rdzeniu jest to więź emocjonalna. Księżyce i Wenus niosą większość ciężaru między wami, co czyni więź ciepłą, instynktowną i szybką w strojeniu się — i oznacza, że to nastroje, nie kłótnie, ustawiają temperaturę. Gdy oboje jesteście stabilni, jest miękko i łatwo, a dom szybko czuje się jak dom. Gdy jednemu z was jest niedobrze, drugi wie w ciągu minut, czy słowo padnie, czy nie. Praktyczny wniosek jest taki, że dbanie o własny stan wewnętrzny nie jest oddzielone od dbania o związek; to ta sama praca. Naucz się nazywać uczucie wcześnie, zanim stanie się pogodą, a ta więź utrzyma prawie wszystko.',
  'syn.deep.pattern.mental':
    'W rdzeniu jest to spotkanie umysłów. Łączycie się najpierw przez słowa, idee, ciekawość i przyjemność bycia szybko zrozumianym, a iskra pozostaje zapalona dokładnie tak długo, jak trwa rozmowa. To prawdziwa siła — nigdy się nie znudzicie i dobrze rozwiązujecie problemy jako para. Ryzyko jest subtelniejsze: da się pomylić dobrą rozmowę z intymnością i żyć trochę powyżej szyi, wymieniając myśli, podczas gdy warstwa uczucia zostaje nieopatrzona. Zróbcie miejsce na te części bliskości, które nie są słowne — wspólną ciszę, posiłek, zadanie zrobione ramię w ramię — a więź umysłowa staje się fundamentem, a nie namiastką.',
  'syn.deep.pattern.physical':
    'W rdzeniu jest to więź napędu i ciała. Mars i Słońce wykonują ciężką robotę, więc jest tu prawdziwa chemia i prawdziwy pęd — ładujecie się nawzajem, sprawiacie, że rzeczy się dzieją, gdy jesteście razem, i dobrze działacie jako zespół, gdy jest robota do zrobienia. To samo okablowanie oznacza, że równie szybko potraficie się nawzajem nakręcić; rywalizacja i rozdrażnienie to cienista strona przyciągania. Rozwiązaniem nie jest tłumić żar, lecz go wycelować. Dajcie mu wspólny kierunek — projekt, plan, wyzwanie, nawet czystą kłótnię z zasadami — a intensywność pracuje dla was, zamiast zwracać się do wewnątrz.',
  'syn.deep.pattern.karmic':
    'W rdzeniu ta ma ciężar. Saturn i Pluton są w mieszance, co wnosi do więzi poczucie konsekwencji — jakbyście byli tu, by coś razem rozwiązać, a nie tylko przyjemnie spędzać czas. Więzi takie jak ta zwykle wcześnie czują się znaczące i wymagają od obojga więcej, niż wymagałoby lżejsze dopasowanie. Poprowadzona dobrze, staje się głęboko lojalna i trwała, z tego rodzaju więzi, które przeżywają różne rzeczy. Poprowadzona niedbale, robi się ciężka — obowiązek przebrany za bliskość albo powolna walka o władzę, której nikt nie nazywa. Różnica tkwi prawie w całości w tym, czy oboje wciąż wybieracie ją na głos, celowo, zamiast zostawać, bo odejście czuje się jak porażka.',

  'syn.deep.chemHead': 'Chemia między wami',
  'syn.deep.chem.strong':
    'Przyciąganie jest tu dobrze podparte. Kontakty między waszymi mapami, które rządzą pożądaniem i uczuciem, są w dużej mierze harmonijne, co zwykle przekłada się na chemię, która czuje się naturalna, a nie napięta — przyciągacie się w sposób, którego podtrzymanie niewiele kosztuje. Ciesz się tym i nie bierz tego za dowód, że reszta związku poprowadzi się sama; łatwość w jednym dziale nie zastępuje wysiłku w pozostałych.',
  'syn.deep.chem.mixed':
    'Przyciąganie ma tu i prąd, i żwir. Część kontaktów między waszymi mapami zbliża was ciepło; inne dodają do tego samego ciągnięcia tarcie, co może czytać się jak chemia z ostrzem — magnetyczna, czasem doprowadzająca do szału, rzadko nudna. Ten rodzaj iskry zwykle trwa dłużej niż bezcierny, właśnie dlatego, że wciąż się regeneruje. Zadaniem jest trzymać to ostrze figlarnie, zamiast pozwolić mu skwaśnieć we wzorzec nakręcania się nawzajem.',
  'syn.deep.chem.cool':
    'Pożądanie nie jest najgłośniejszą nicią między waszymi mapami. Kontakty rządzące przyciąganiem są ciche albo lekko wymagające, co nie znaczy, że nie ma iskry — tylko że ta więź prawdopodobniej zbuduje się na czymś innym: wspólnym zrozumieniu, szacunku, niezawodności, spotkaniu wartości. Związki oparte na tym zwykle zapalają się wolniej i są znacznie trudniejsze do zerwania.',

  'syn.deep.commHead': 'Jak się porozumiewacie',
  'syn.deep.comm.easy':
    'Porozumiewanie jest tu siłą. Wasze kontakty Merkurego płyną, co znaczy, że zwykle nadążacie za myśleniem drugiego, trafiacie z żartami i wspólnie obrabiacie problem bez wielkich strat w tłumaczeniu. Użyj tego celowo, gdy pojawi się coś trudnego — jesteście lepsi w przegadywaniu spraw niż większość par, więc nie pozwólcie, by trudne rozmowy były tymi, których unikacie.',
  'syn.deep.comm.work':
    'Porozumiewanie wymaga tu trochę pracy. Wasze kontakty Merkurego niosą tarcie, więc możecie mówić obok siebie — inne tempa, inna logika, inne założenia co do tego, co właściwie zostało ustalone. To da się ogarnąć, ale wymaga nawyku: zwolnij, powtórz, co usłyszałeś, i sprawdź, czy tym samym słowem rozumiecie to samo, zanim ruszycie dalej.',
  'syn.deep.comm.quiet':
    'Między waszymi mapami nie ma silnego kontaktu Merkurego w żadną stronę, co zwykle znaczy, że porozumiewanie nie jest ani oczywistym darem, ani oczywistym problemem — to po prostu coś, co zbudujecie celowo, a nie w co wpadniecie. Regularne, niewymuszone sprawdzanie się liczy dla was bardziej niż dla pary, która czyta się nawzajem automatycznie.',

  'syn.deep.growthLead': 'Gdzie to cię rozwija',
  'syn.deep.growth.good':
    'Łatwość między wami jest prawdziwa i jest też tym, na co trzeba uważać. Gdy więź w większości prowadzi się sama, łatwo zrobić się niedbałym — przestać wnosić pełną szczerość i wysiłek, bo nie trzeba było. Waszym atutem jako pary jest dalej pokazywać się jak trzeba dla czegoś, co tego nie wymaga: dalej mówić prawdziwą rzecz, dalej wkładać wysiłek, dalej się nawzajem zauważać. Nie pozwólcie, by «łatwe» po cichu stało się «zaniedbane».',
  'syn.deep.growth.mid':
    'Punkty tarcia między wami nie są wadami dopasowania; są programem nauczania. Każdy zaznacza miejsce, w którym oboje będziecie musieli się rozciągnąć — powiedzieć trudną rzecz wcześniej, trzymać swój grunt łagodniej, przestać czekać, aż zostaniecie odczytani, i zacząć być jasnym. Pary, które nazywają te napięcia wcześnie i traktują je jak wspólną pracę, zwykle radzą sobie dobrze z czasem. Pary, które liczą, że się po prostu rozpuszczą, zwykle spotykają tę samą kłótnię przez lata.',
  'syn.deep.growth.hard':
    'Ta więź wymaga wiele od was obojga. Wymagające kontakty między waszymi mapami nie rozpuszczą się same, więc związek działa tylko, jeśli oboje traktujecie trudność jak wspólną pracę, a nie winę drugiego. To naprawdę możliwe — wiele trwałych więzi jest zbudowanych na trudnych aspektach — ale to wybór, którego będziecie musieli dokonywać wciąż na nowo, na głos, zwłaszcza na odcinkach, gdzie łatwiej byłoby liczyć punkty.',

  'syn.deep.nameItLead': 'Powiedz tę część na głos',
  'syn.deep.nameIt':
    'Jeśli jest jedna rzecz warta nazwania wcześnie, zamiast liczenia, że się ułoży, to kontakt {a}–{b}: {sentence} Niewypowiedziany, zwykle kostnieje we wzorzec; wypowiedziany jasno i wcześnie, zwykle okazuje się mniejszy, niż się czuł.',
  'syn.deep.nameIt.none':
    'Nie ma tu jednego punktu tarcia, który trzeba by wcześnie odciąć — co samo w sobie warto wiedzieć. Praca w tej więzi jest mniej o rozbrajaniu jednej sprawy, a bardziej o pozostawaniu uważnym na całości.',

  'syn.deep.longViewLead': 'Dłuższa perspektywa',
  'syn.deep.longView.good':
    'to rodzaj więzi, która dobrze się starzeje. Zwykle robi się łatwiejsza, a nie trudniejsza, gdy uczycie się nawzajem swoich krawędzi, a wczesna łatwość zwykle pogłębia się z czasem w coś stabilniejszego i bardziej godnego zaufania. Głównym zagrożeniem dla niej jest zaniedbanie, nie konflikt.',
  'syn.deep.longView.mid':
    'to staje się tym, co z tego zrobicie. Surowiec da się obrobić — ani bezwysiłkowy, ani skazany — a wynik zależy prawie w całości od wysiłku, który oboje włożycie na pierwszym odcinku, zanim wzorce się ustalą. Ustawcie nawyki dobrze wcześnie, a to może przetrwać.',
  'syn.deep.longView.hard':
    'to jest teraz intensywne i prawdopodobnie pozostanie intensywne. Jest tego warte, jeśli głębia i znaczenie to jest to, czego oboje naprawdę chcecie od związku. Jest wyczerpujące, jeśli część ciebie czeka, aż to się uspokoi w coś łatwego — to prawdopodobnie nie jest tu zadanie.',
} as const
