import type { RunesKey } from '../en/runes'

/**
 * Polski — Starszy Futhark: znaczenia 24 run, odczyt prosty i odwrócony
 * (merkstave) oraz codzienna wskazówka dla każdej runy, a także teksty ekranu
 * Run. Nazwy run są staronordyckie i pozostają takie same w każdym języku.
 * Wymaga sprawdzenia przez native speakera; dla nieuniknionego rodzaju przyjęto
 * formę męską.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ teksty */
  'rune.eyebrow': 'Runy',
  'rune.dailyTitle': 'Twoja runa na dziś',
  'rune.dailyBlurbChart':
    'Jedna runa, rzucona dla twojej mapy i tej daty. Odnawia się o północy.',
  'rune.dailyBlurbPlain': 'Jedna runa na dzień. Odnawia się o północy.',
  'rune.tapReveal': 'Dotknij kamienia, by go odwrócić.',
  'rune.turnStone': 'Odwróć kamień',
  'rune.merkstave': 'Merkstave (odwrócona)',
  'rune.merkstaveNote':
    'Wypadła odwrócona — czytaj ją pod kątem cienistej strony, blokady albo nienauczonej jeszcze lekcji.',
  'rune.sound': 'Dźwięk',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'Ætt Freyra',
  'rune.aett.2': 'Ætt Heimdalla',
  'rune.aett.3': 'Ætt Týra',

  'rune.element.fire': 'Ogień',
  'rune.element.ice': 'Lód',
  'rune.element.earth': 'Ziemia',
  'rune.element.air': 'Powietrze',
  'rune.element.water': 'Woda',
  'rune.element.spirit': 'Duch',

  'rune.resonance.match':
    'Runy i niebo są dziś zgodne — oba wskazują na twoje {chakra}.',
  'rune.resonance.bridge':
    'Dzisiejsze niebo obrabia twoje {sky}; runa odpowiada z twojego {rune}.',

  'rune.cast': 'Rzuć runy',
  'rune.castSub': 'Trzy Norny albo krzyż pięciu run',
  'rune.chooseTitle': 'Wybierz rzut',
  'rune.chooseBlurb': 'Trzymaj swoje pytanie, potem wybierz, jak runy mają upaść.',
  'rune.runeCount.one': '1 runa',
  'rune.runeCount.many': '{n} run',
  'rune.castEyebrow': 'Runy · {layout}',
  'rune.drawAgain': 'Rzuć ponownie',
  'rune.doCast': 'Rzuć',

  'rune.layout.norns': 'Trzy Norny',
  'rune.layout.nornsSub': 'Co się stało, co się staje, co jest należne',
  'rune.layout.cross': 'Krzyż Pięciu Run',
  'rune.layout.crossSub': 'Pełniejsze spojrzenie na jedną sytuację',

  'rune.pos.now': 'Teraz',
  'rune.pos.now.prompt': 'gdzie stoisz',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'to, co się stało — korzeń tego',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'to, co się staje — obecny zwrot',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'to, co się stanie — co jest należne i dokąd to prowadzi',
  'rune.pos.heart': 'Sedno',
  'rune.pos.heart.prompt': 'sedno sprawy',
  'rune.pos.crossing': 'Co to przecina',
  'rune.pos.crossing.prompt': 'przeszkoda albo pomoc',
  'rune.pos.root': 'Korzeń',
  'rune.pos.root.prompt': 'z czego to wyrasta',
  'rune.pos.counsel': 'Rada',
  'rune.pos.counsel.prompt': 'co doradzają runy',
  'rune.pos.outcome': 'Dokąd to prowadzi',
  'rune.pos.outcome.prompt': 'kierunek, ku któremu to zmierza',

  'rune.ask': 'Zapytaj runy',
  'rune.askSub': 'Jedna runa, jedna odpowiedź na twoje pytanie',
  'rune.askEyebrow': 'Runy · Pytanie',
  'rune.askBlurb':
    'Postaw pytanie wprost i trzymaj je, gdy runa jest ciągnięta.',
  'rune.askPlaceholder': 'Czy powinienem…  ·  Czy to czas, by…  ·  Co muszę wiedzieć o…',
  'rune.consult': 'Wyciągnij runę',
  'rune.askAgain': 'Zapytaj ponownie',
  'rune.youAsked': 'Zapytałeś',
  'rune.answerReading': 'Co mówi runa',
  'rune.castReading': 'Odczyt',

  'rune.verdict.yes': 'Tak',
  'rune.verdict.no': 'Nie',
  'rune.verdict.wait': 'Jeszcze nie',
  'rune.verdict.hidden': 'Ukryte',
  'rune.verdict.yes.gloss': 'Runa skłania się ku tak. Rusz się, i na serio.',
  'rune.verdict.no.gloss': 'Runa odchyla się. Forsowanie tego teraz kosztuje więcej, niż zwraca.',
  'rune.verdict.wait.gloss':
    'Runa mówi, że czas nie dojrzał. Przygotuj się i pozwól, by chwila przyszła do ciebie.',
  'rune.verdict.hidden.gloss':
    'Runa zachowuje radę dla siebie. To jeszcze nie twoje, byś wiedział — odpowiedź wciąż się formuje.',

  'rune.library': 'Starszy Futhark',
  'rune.librarySub': 'Wszystkie dwadzieścia cztery, by przy nich posiedzieć',

  'dash.dailyRune': 'Runa dnia',
  'dash.runeSeen': 'Dzisiejsza runa jest odwrócona',
  'dash.runeNew': 'Rzuć swoją runę na dziś',

  /* ---------------------------------------------- Ætt Freyra (1–8) */
  'rune.fehu.meaning': 'Bydło — ruchome bogactwo i to, co może kupić albo kosztować',
  'rune.fehu.keywords': 'Bogactwo · Początki · Przepływ',
  'rune.fehu.up':
    'Fehu to stado: bogactwo, które się porusza, mnoży i wymyka, jeśli się je gromadzi. Znaczy przybycie nowych zasobów — pieniędzy, energii, szansy, pozycji — i start czegoś, co może rosnąć. Haczyk tkwi w jego naturze: to pozostaje żywe tylko, jeśli dalej krąży. Wydaj coś z tego, podziel się czymś, wpuść to w pracę. Co ściskasz, tracisz.',
  'rune.fehu.merk':
    'Odwrócona, Fehu to strata albo bogactwo, które posiada ciebie zamiast odwrotnie. Coś się wysącza albo strzeżesz zasobu tak ciasno, że przestał ci się na cokolwiek przydawać. Popatrz, dokąd naprawdę idzie twoja energia i pieniądze, i bądź szczery co do tego, co warto zatrzymać.',
  'rune.fehu.today':
    'Puść coś dziś w obieg — pieniądze, wysiłek albo dobre słowo, które trzymałeś w zapasie.',

  'rune.uruz.meaning': 'Tur — dzika, nieoswojona siła życia',
  'rune.uruz.keywords': 'Witalność · Wytrzymałość · Surowa forma',
  'rune.uruz.up':
    'Uruz to dziki wół: moc, której nie złamano do pługa. Przynosi przypływ cielesnej witalności, upartą wytrzymałość i siłę, by ukształtować surową okoliczność w coś własnego. To dobra runa dla początków, które potrzebują mięśni — zacząć trening, przełamać ziemię, utrzymać granicę. Siła jest prawdziwa; praca to nauczyć się nią kierować.',
  'rune.uruz.merk':
    'Odwrócona, Uruz to siła źle użyta albo nieobecna — moc obrócona przeciw sobie albo słabość tam, gdzie trzeba stać twardo. Może pchasz, kiedy powinieneś się zatrzymać, albo pozwalasz, by coś dzikiego w twoim życiu było bez zarządu. Odzyskaj moc, nie pozwalając, by cię prowadziła.',
  'rune.uruz.today':
    'Użyj dziś ciała — idź daleko, podnieś coś ciężkiego albo przebij się przez jedną rzecz, którą odkładasz.',

  'rune.thurisaz.meaning': 'Cierń — ostra, reaktywna, obronna siła',
  'rune.thurisaz.keywords': 'Obrona · Reakcja · Twarda brama',
  'rune.thurisaz.up':
    'Thurisaz to cierń na żywopłocie i młot olbrzyma: siła, która chroni raniąc i oczyszcza łamiąc. Często znaczy konfrontację, twardą granicę albo sytuację, która nie ugnie się przed urokiem. Spotkana czołowo rani; spotkana z cierpliwością staje się bramą. Nie wywołuj tej walki, ale i nie udawaj, że ciernia tam nie ma.',
  'rune.thurisaz.merk':
    'Odwrócona, Thurisaz to obrona, która stała się murem, albo reaktywny temperament robiący szkodę. Może wymachujesz na oślep albo jesteś tak spięty przeciw atakowi, że nic dobrego też do ciebie nie dociera. Odłóż młot, zanim spuścisz go na kogoś, kto na to nie zasłużył.',
  'rune.thurisaz.today':
    'Utrzymaj dziś jedną granicę, nie przepraszając za nią — i oprzyj się chęci, by tłumaczyć ją trzy razy.',

  'rune.ansuz.meaning': 'Bóg — oddech, słowo, wiadomość od Odyna',
  'rune.ansuz.keywords': 'Głos · Wiadomość · Wgląd',
  'rune.ansuz.up':
    'Ansuz to oddech Wszechojca: mowa, sygnał i nagła jasność, która przybywa spoza twojego własnego wysiłku. Nadchodzi wiadomość albo rozmowa znaczy więcej, niż wygląda. Rządzi też twoim własnym głosem — to dzień, by powiedzieć prawdziwą rzecz jasno, uczyć, nazwać to, co widzisz. Słuchaj uważnie; odpowiedź może być w czyichś ustach.',
  'rune.ansuz.merk':
    'Odwrócona, Ansuz to nieporozumienie, źle usłyszana wiadomość albo mądrość, której odmawiasz słuchania z powodu tego, od kogo pochodzi. Słowa są używane, by mącić, a nie wyjaśniać — twoje albo czyjeś. Zwolnij rozmowę i sprawdź, co właściwie było w zamyśle.',
  'rune.ansuz.today':
    'Powiedz dziś jasną rzecz na głos i słuchaj dwa razy więcej, niż mówisz.',

  'rune.raidho.meaning': 'Jazda — podróż, koło, właściwy rytm',
  'rune.raidho.keywords': 'Podróż · Rytm · Właściwy porządek',
  'rune.raidho.up':
    'Raidho to wóz na drodze: ruch z kierunkiem i poczucie bycia niesionym wzdłuż ścieżki, która ma własny rytm. Sprzyja podróży, decyzjom, które wprawiają cię w ruch, i odkładaniu rzeczy z powrotem we właściwy porządek. Lekcja jest taka, że podróż ma własne tempo — nie możesz poganiać drogi, ale możesz przestać z nią walczyć.',
  'rune.raidho.merk':
    'Odwrócona, Raidho to podróż, która utknęła, plan poza kolejnością albo ruch w złym kierunku. Coś jest poza rytmem — wyjazd, którego nie powinieneś odbyć, albo pośpiech, który cię kosztuje. Ustaw porządek rzeczy, zanim znów wyruszysz.',
  'rune.raidho.today':
    'Zrób dziś następny właściwy krok po kolei; oprzyj się chęci, by przeskoczyć do interesującej części.',

  'rune.kenaz.meaning': 'Pochodnia — kontrolowany ogień, rzemiosło i wiedza',
  'rune.kenaz.keywords': 'Wgląd · Rzemiosło · Twórczy ogień',
  'rune.kenaz.up':
    'Kenaz to płomień w sali: nie pożar, lecz ogień obrobiony — kuźnia, lampa, iskra zrozumienia. Wnosi jasność w ciemny kąt, umiejętność do zadania i twórcze ciepło, by tworzyć, a nie tylko wyobrażać. Coś, co do tej pory było dla ciebie w mroku, staje się widoczne. Weź to, co teraz widzisz, i nadaj temu kształt czegoś realnego.',
  'rune.kenaz.merk':
    'Odwrócona, Kenaz to gasnące światło — utracone natchnienie, stygnący projekt albo wiedza używana, by palić, a nie budować. Może jesteś twórczo zablokowany albo trzymasz się sposobu robienia rzeczy, który już nie rzuca żadnego światła. Pozwól martwej rzeczy pociemnieć, by nowy płomień mógł się zająć.',
  'rune.kenaz.today':
    'Zrób dziś coś, choćby najmniejszego i najbardziej surowego — chodzi o to, by wprowadzić ideę w formę.',

  'rune.gebo.meaning': 'Dar — wymiana i więź, którą tworzy',
  'rune.gebo.keywords': 'Dar · Wymiana · Partnerstwo',
  'rune.gebo.up':
    'Gebo to dar dany i dar należny — nić zobowiązania i hojności, która wiąże ludzi. Znaczy prawdziwą wymianę: partnerstwo, umowę, akt dawania, który wróci. Nie ma odwróconej Gebo, bo daru, raz danego, nie da się odebrać. Dawaj swobodnie i przyjmuj z gracją, i patrz, jak z czasem szala się wyrównuje.',
  'rune.gebo.today':
    'Daj dziś coś bez księgi rachunkowej w głowie — i pozwól sobie przyjąć to, co jest ci ofiarowane w zamian.',

  'rune.wunjo.meaning': 'Radość — harmonia, przynależność i rzeczy wskakujące na miejsce',
  'rune.wunjo.keywords': 'Radość · Harmonia · Przynależność',
  'rune.wunjo.up':
    'Wunjo to radość dobrze prowadzonej sali: nie ekstaza, lecz zadowolenie, poczucie, że rzeczy do siebie pasują i że jesteś wśród swoich. Znaczy rozwiązanie, zasłużoną nagrodę albo moment, gdy elementy się wyrównują. Pozwól sobie to zauważyć. Ta runa prosi, byś przyjął dobro, które naprawdę tu jest, zamiast wytrzymywać na lepszą wersję.',
  'rune.wunjo.merk':
    'Odwrócona, Wunjo to radość odłożona albo fałszywa harmonia trzymana razem przez niewypowiedzenie trudnej rzeczy. Coś jest rozstrojone pod powierzchnią. Nie zamiataj tego — prawdziwa lekkość przychodzi po szczerej rozmowie, a nie zamiast niej.',
  'rune.wunjo.today':
    'Nazwij jedną rzecz, która naprawdę idzie dobrze, i niech to wystarczy na dziś.',

  /* -------------------------------------------- Ætt Heimdalla (9–16) */
  'rune.hagalaz.meaning': 'Grad — nagłe zakłócenie spoza twojej kontroli',
  'rune.hagalaz.keywords': 'Zakłócenie · Kryzys · Oczyszczenie',
  'rune.hagalaz.up':
    'Hagalaz to burza gradowa: zniszczenie, które spada z nieba, rujnuje plon, a potem topnieje w wodę żywiącą następny. Znaczy przerwanie, którego nie wybrałeś i z którym nie możesz się spierać — zdarzenie, które łamie wzorzec. Nie ma tu z czym walczyć. Schroń się, pozwól temu przejść i popatrz potem, co wciąż stoi. Grad oczyszcza grunt.',
  'rune.hagalaz.today':
    'Nie zaczynaj dziś niczego kruchego. Zaryglij luki, przeczekaj pogodę i zaufaj, że grunt się oczyszcza.',

  'rune.nauthiz.meaning': 'Potrzeba — tarcie, ograniczenie i ogień, który tworzy',
  'rune.nauthiz.keywords': 'Ograniczenie · Potrzeba · Twarda lekcja',
  'rune.nauthiz.up':
    'Nauthiz to ogień potrzeby, rozpalony tarciem dwóch patyków pod presją. Znaczy ograniczenie — niedobór, opóźnienie, sytuację, z której jeszcze nie możesz wyjść — i pomysłowość, którą to ograniczenie z ciebie wymusza. Lekcją jest cierpliwość pod tarciem. Zmierz się z brakiem uczciwie, zrób małą zdyscyplinowaną rzecz w swojej mocy i pozwól oporowi nauczyć cię, czego naprawdę potrzebujesz.',
  'rune.nauthiz.merk':
    'Odwrócona, Nauthiz to potrzeba wyparta — udawanie, że ograniczenia nie ma, albo pozwolenie, by trudność skwaśniała w urazę i pochopne decyzje. Przestań walczyć z faktem granicy. Droga przez to prowadzi najpierw przez przyjęcie, potem przez cierpliwe, świadome działanie.',
  'rune.nauthiz.today':
    'Przyjmij dziś jedno ograniczenie, zamiast się z nim spierać, i zrób tę jedną małą zdyscyplinowaną rzecz, którą ci zostawia.',

  'rune.isa.meaning': 'Lód — bezruch, zastój, zamrożona chwila',
  'rune.isa.keywords': 'Bezruch · Zastój · Jasność',
  'rune.isa.up':
    'Isa to rzeka zamarznięta do dna: cały ruch zatrzymany, wszystko trzymane w miejscu. Znaczy zastój — plan wstrzymany, związek w bezruchu, okres, w którym nic, co pchasz, nie wydaje się ruszać. To nie porażka; to zima. Przestań forsować roztopy. Użyj bezruchu, by zobaczyć jasno, co jest pod lodem, i zachowaj siłę na wiosnę.',
  'rune.isa.today':
    'Przestań dziś pchać zaciętą rzecz. Posiedź z nią, popatrz na nią jasno i pozwól bezruchowi zrobić swoje.',

  'rune.jera.meaning': 'Rok — plon, cykle i wysiłek wydający owoc',
  'rune.jera.keywords': 'Plon · Cykle · Właściwy czas',
  'rune.jera.up':
    'Jera to obracający się rok: nasiono, wzrost, plon, odpoczynek i znów nasiono. Znaczy punkt, w którym wcześniejszy wysiłek w końcu daje plon — nie przez łut szczęścia, lecz dlatego, że minęło dość czasu i wykonano dość pracy. Doradza też cierpliwość wobec tego, co jeszcze nie dojrzało. Nie da się poganiać pory roku. Doglądaj tego, co zasiałeś, i zbierz to, co gotowe.',
  'rune.jera.today':
    'Zbierz coś, co zasiałeś jakiś czas temu — dokończ to, zaksięguj albo po prostu zauważ, że zadziałało.',

  'rune.eihwaz.meaning': 'Cis — oś między życiem a śmiercią, wytrwałość',
  'rune.eihwaz.keywords': 'Wytrwałość · Przemiana · Oś',
  'rune.eihwaz.up':
    'Eihwaz to cis, wiecznie zielony i trujący, korzeniami w podziemiu, koroną w świetle — słup, który biegnie przez światy. Znaczy wytrwałość przez trudne przejście i zmianę, która sięga do samego dna. Coś musi się skończyć, by następna rzecz mogła żyć. Stój jak cis: zakorzeniony, nieruchomy, połączony i z tym, co umiera, i z tym, co się rodzi.',
  'rune.eihwaz.today':
    'Stań dziś twarzą w twarz z zakończeniem, którego unikasz — nie żeby je wymusić, tylko żeby przestać udawać, że się nie dzieje.',

  'rune.perthro.meaning': 'Kubek losów — tajemnica, przypadek i to, co los trzyma w ukryciu',
  'rune.perthro.keywords': 'Tajemnica · Przypadek · Niewidziane',
  'rune.perthro.up':
    'Perthro to kubek, z którego wytrząsa się losy — chwila, zanim kości upadną, gdy wynik istnieje, ale nie da się go zobaczyć. Rządzi tajemnicami, ukrytymi wpływami, szczęściem i tymi częściami wzorca, które po prostu nie są jeszcze twoje, byś je znał. Coś jest rozstrzygane poza wzrokiem. Zagraj swoją rolę dobrze i pozwól rzutowi upaść; nie wszystko jest przeznaczone, by rozgryźć to z góry.',
  'rune.perthro.merk':
    'Odwrócona, Perthro to tajemnica, która musi zostać pogrzebana, a jest odkopywana, albo niezdrowe skupienie na poznaniu wyniku. Przestań forsować ujawnienie. Niektóre rzeczy gniją w świetle przed swoim czasem.',
  'rune.perthro.today':
    'Pozwól dziś jednej rzeczy pozostać nieznaną. Zrób swoje i przestań odświeżać stronę.',

  'rune.algiz.meaning': 'Łoś — ochrona i sięganie ku wyższemu',
  'rune.algiz.keywords': 'Ochrona · Połączenie · Pomoc z góry',
  'rune.algiz.up':
    'Algiz to łoś z uniesionym porożem i turzyca, która tnie chwytającą ją dłoń — runa ochrony i więzi między tobą a czymś większym. Znaczy tarczę wokół ciebie właśnie teraz i wsparcie dostępne ponad twoim własnym poziomem, jeśli po nie sięgniesz. Poproś o pomoc. Stój wyprostowany. To, co nad tobą czuwa, jest po twojej stronie.',
  'rune.algiz.merk':
    'Odwrócona, Algiz to opuszczona ochrona albo odrzucona pomoc — zostawianie się odsłoniętym tam, gdzie powinieneś być strzeżony, albo odcinanie się od wsparcia, które jest. Sprawdź swoją obronę i wpuść kogoś.',
  'rune.algiz.today':
    'Poproś dziś o pomoc w jednej rzeczy — osobę albo moc ponad twoją rangą.',

  'rune.sowilo.meaning': 'Słońce — pełnia, sukces i wola, która prowadzi',
  'rune.sowilo.keywords': 'Sukces · Pełnia · Jasna wola',
  'rune.sowilo.up':
    'Sowilo to koło słoneczne: światło, które zawsze wraca, zwycięstwo płynące z woli wycelowanej stale w jedną rzecz. Znaczy sukces, zdrowie i wyjaśniającą siłę, która wypala mgłę. Nie ma odwróconej Sowilo — słońce nie cofa się. Wyceluj swoją energię w to, co się liczy, trzymaj ją tam i spodziewaj się, że wynik pójdzie po twojej myśli.',
  'rune.sowilo.today':
    'Wyceluj dziś wszystko w jeden cel. Bez asekuracji, bez drugiej tarczy — tylko ten jeden, do ciemności.',

  /* --------------------------------------------------- Ætt Týra (17–24) */
  'rune.tiwaz.meaning': 'Týr — sprawiedliwość, odwaga i dobrowolna ofiara',
  'rune.tiwaz.keywords': 'Sprawiedliwość · Odwaga · Ofiara',
  'rune.tiwaz.up':
    'Tiwaz to włócznia i dłoń, którą Týr dał wilkowi, by dotrzymać słowa — runa sprawiedliwości, honoru i robienia tego, co słuszne, realnym kosztem. Sprzyja sprawom prawnym, uczciwym walkom i staniu przy zobowiązaniu, gdy przestaje być wygodne. Wyceluj się w to, co prawdziwe, i utrzymaj linię. Zwycięstwo tutaj jest z tych, z którymi da się potem żyć.',
  'rune.tiwaz.merk':
    'Odwrócona, Tiwaz to odwaga, która zawodzi, porzucone zobowiązanie albo sprawiedliwość wygięta z kształtu. Może unikasz stanowiska, o którym wiesz, że powinieneś je zająć, albo wydajesz energię na walkę, która nie jest uczciwa. Zaangażuj się na nowo w to, co naprawdę słuszne, nawet jeśli kosztuje cię to zwycięstwo.',
  'rune.tiwaz.today':
    'Dotrzymaj dziś obietnicy, która stała się niewygodna, i zajmij stanowisko, przed którym się uchylasz.',

  'rune.berkano.meaning': 'Brzoza — wzrost, pielęgnacja i ciche nowe początki',
  'rune.berkano.keywords': 'Wzrost · Pielęgnacja · Nowe początki',
  'rune.berkano.up':
    'Berkano to brzoza, pierwsze drzewo, które zieleni się po lodzie — runa łagodnego, osłoniętego wzrostu: ciąża, nowy projekt w kruchej fazie, gojenie, troska, która pozwala małej rzeczy stać się silną. Prosi, byś pielęgnował, a nie pchał. Chroń nowy pęd, karm go, trzymaj z dala mróz i pozwól mu rosnąć w tempie, jakie wzrost naprawdę zajmuje.',
  'rune.berkano.merk':
    'Odwrócona, Berkano to wzrost zahamowany albo troska wycofana — zaniedbana nowa rzecz, węzeł rodzinny albo zaniedbywanie siebie przebrane za twardość. Coś potrzebuje doglądania, które zostawiałeś, by radziło sobie samo. Wróć i wypielęgnuj to jak trzeba.',
  'rune.berkano.today':
    'Zadbaj dziś o jedną rosnącą rzecz — osobę, plan albo siebie — z prawdziwą troską, nie tylko z intencją.',

  'rune.ehwaz.meaning': 'Koń — partnerstwo, zaufanie i stały ruch',
  'rune.ehwaz.keywords': 'Partnerstwo · Zaufanie · Rozpęd',
  'rune.ehwaz.up':
    'Ehwaz to koń i jeździec poruszający się jak jeden — runa zaufanego partnerstwa, pracy zespołowej i postępu zrobionego razem, którego żadne z nich nie zrobiłoby samo. Znaczy związek, który działa, albo współpracę wartą zaangażowania. Więź jest zbudowana na zaufaniu i na tym, że obie strony ciągną w tym samym kierunku. Gdzie to masz, oprzyj się na tym; gdzie tego chcesz, bądź najpierw niezawodną połową.',
  'rune.ehwaz.merk':
    'Odwrócona, Ehwaz to partnerstwo poza krokiem — nieufność, jedna strona niosąca drugą albo ruch, który utknął, bo nie chcecie już tego samego. Nazwij, gdzie zaufanie pękło, i zdecyduj uczciwie, czy wciąż jedziecie razem.',
  'rune.ehwaz.today':
    'Zrób dziś jedną rzecz z kimś, a nie samotnie, i bądź połową, na której da się polegać.',

  'rune.mannaz.meaning': 'Człowiek — jaźń i jaźń wśród innych',
  'rune.mannaz.keywords': 'Jaźń · Wspólnota · Perspektywa',
  'rune.mannaz.up':
    'Mannaz to runa ludzkości — ty jako jednostka i ty jako jeden węzeł w sieci innych. Prosi, byś zobaczył siebie jasno: swoje dary, swoje granice i swoje odbicie w ludziach wokół. Często znaczy moment potrzebowania innych albo bycia potrzebnym, albo widzenia siebie uczciwie oczami kogoś innego. Nie jesteś stworzony, by robić to samotnie, i nie jesteś też jego środkiem.',
  'rune.mannaz.merk':
    'Odwrócona, Mannaz to izolacja albo obraz siebie, który odpłynął od prawdy — napompowany albo niesprawiedliwie surowy. Może jesteś odcięty od swoich ludzi albo jesteś swoim najgorszym krytykiem. Zdobądź spojrzenie z zewnątrz od kogoś, kto będzie i uczciwy, i życzliwy.',
  'rune.mannaz.today':
    'Zobacz dziś siebie oczami kogoś, kto zna cię dobrze, i popraw obraz tam, gdzie jest błędny.',

  'rune.laguz.meaning': 'Woda — przepływ, intuicja i głęboka nieświadomość',
  'rune.laguz.keywords': 'Przepływ · Intuicja · Głębia',
  'rune.laguz.up':
    'Laguz to jezioro i morze: przepływ, czucie, sen i głęboka woda nieświadomości, gdzie poruszają się rzeczy, których dzienny umysł nie widzi. Sprzyja zawierzeniu przeczuciu ponad arkuszem kalkulacyjnym, płynięciu z prądem, a nie pod prąd, i uważaniu na to, co mówią ci twoje sny i nastroje. Przypływ wie, dokąd zmierza. Na razie pozwól mu się nieść.',
  'rune.laguz.merk':
    'Odwrócona, Laguz to powódź albo bycie wciąganym pod wodę — przytłoczony czuciem, unikający czegoś przez dryfowanie albo intuicja, która skwaśniała w lęk lub fantazję. Postaw stopy na ziemi. Nie każdy prąd wart jest podążania, i nie każda fala jest ostrzeżeniem.',
  'rune.laguz.today':
    'Zawierz dziś odczytowi z trzewi ponad sprytnym argumentem i uważaj na to, co przyśni ci się tej nocy.',

  'rune.ingwaz.meaning': 'Ing — wylęganie, zmagazynowany potencjał, dopełniony cykl',
  'rune.ingwaz.keywords': 'Wylęganie · Potencjał · Dopełnienie',
  'rune.ingwaz.up':
    'Ingwaz to nasiono zapieczętowane w ziemi przez zimę — potencjał trzymany w zamkniętym naczyniu, robiący swoje poza wzrokiem, aż będzie gotów uwolnić się naraz. Znaczy koniec wylęgania: projekt, decyzja albo wewnętrzny proces, który po cichu się dusił, ma zaraz być gotowy. Nie otwieraj skrzynki za wcześnie. Gdy się skończy, skończy się czysto i poczujesz jego ulgę.',
  'rune.ingwaz.today':
    'Pozwól dziś temu, co jest prawie gotowe, dokończyć się we własnym czasie. Przestań to szturchać.',

  'rune.dagaz.meaning': 'Dzień — przełom, przebudzenie, zwrot od ciemności ku światłu',
  'rune.dagaz.keywords': 'Przełom · Przebudzenie · Punkt zwrotny',
  'rune.dagaz.up':
    'Dagaz to świt: zawias między nocą a dniem, moment, gdy światło wraca i wszystko wygląda inaczej. Znaczy przełom — uświadomienie, zmianę serca, sytuację, która naraz przeskakuje z zaciętej w ruchomą. Nie ma odwróconej Dagaz; świt się nie odstaje. Coś, co do tej pory było dla ciebie w mroku, ma zaraz stać się oczywiste. Bądź gotów, by na to zadziałać.',
  'rune.dagaz.today':
    'Zadziałaj dziś na to uświadomienie, póki jeszcze jest jasne. Wgląd blednie, jeśli prześpisz go zbyt długo.',

  'rune.othala.meaning': 'Zagroda — dziedzictwo, ród i to, co naprawdę twoje',
  'rune.othala.keywords': 'Ród · Dom · To, co trwa',
  'rune.othala.up':
    'Othala to ziemia przodków: to, co dziedziczysz, to, do czego należysz, i rzeczy, których nie da się odebrać, bo są wplecione w to, kim jesteś. Znaczy pytania o dom, rodzinę, tradycję i spuściznę — co zachować z miejsca, skąd pochodzisz, a co zostawić za sobą. Upomnij się o to, co naprawdę twoje. Dogląduj tego. I bądź szczery co do tego, które dziedzictwa są darami, a które tylko starym ciężarem.',
  'rune.othala.merk':
    'Odwrócona, Othala to złe dziedzictwo, którego się trzymasz, albo brak korzeni, który nie chce się osadzić — stare rodzinne wzorce na autopilocie albo odmowa przynależności gdziekolwiek. Przesortuj pamiątki. Zatrzymaj to, co służy przyszłości; reszcie daj godny pochówek.',
  'rune.othala.today':
    'Zachowaj dziś jedną rzecz z miejsca, skąd pochodzisz, i świadomie odłóż jedną rzecz, którą nosisz z przyzwyczajenia.',
} as const
