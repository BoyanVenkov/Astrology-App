import type { MeditationKey } from '../en/meditation'

/** Polski — medytacje prowadzone: streszczenie czytane raz, potem kroki znaczone misą rezonansową. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'podstawa kręgosłupa, tam gdzie spotykasz ziemię',
  'med.seat.sacral': 'podbrzusze, szerokość dłoni pod pępkiem',
  'med.seat.solar-plexus': 'miękkie miejsce pod żebrami',
  'med.seat.heart': 'środek klatki piersiowej',
  'med.seat.throat': 'wgłębienie gardła',
  'med.seat.third-eye': 'przestrzeń między brwiami',
  'med.seat.crown': 'czubek głowy i trochę ponad nim',
  'med.chakraLower': 'centrum {chakra}',

  'med.house.1': 'jak się pokazujesz i jak spotykasz świat',
  'med.house.2': 'co cenisz i co cię stabilizuje',
  'med.house.3': 'twój codzienny umysł i słowa, których używasz',
  'med.house.4': 'dom, korzenie i miejsce, gdzie czujesz się trzymany',
  'med.house.5': 'zabawa, twórczość i to, co cię cieszy',
  'med.house.6': 'codzienna praca troszczenia się o siebie',
  'med.house.7': 'osoby najbliższe tobie',
  'med.house.8': 'to, co się kończy, i to, co dzielisz głęboko',
  'med.house.9': 'sens i szerszy widok',
  'med.house.10': 'twoja praca w świecie i jak jesteś widziany',
  'med.house.11': 'twoi ludzie i to, ku czemu sięgasz',
  'med.house.12': 'odpoczynek, samotność i cisza pod wszystkim',

  'med.invite.Sun': 'Niech zbierze się tu stałe ciepło — twoje własne światło, bez obchodzenia.',
  'med.invite.Moon': 'Niech to, co czujesz, po prostu tu będzie, bez potrzeby naprawiania.',
  'med.invite.Mercury': 'Niech myślenie zwolni. Teraz nie musisz niczego rozwiązywać.',
  'med.invite.Venus': 'Zmiękcz się ku sobie tak, jak zrobiłbyś to wobec kogoś, kogo kochasz.',
  'med.invite.Mars': 'Zauważ jakikolwiek żar lub pośpiech i pozwól, by wydech uniósł jego część.',
  'med.invite.Jupiter': 'Niech ta przestrzeń poczuje się nieco przestronniej niż chwilę temu.',
  'med.invite.Saturn': 'Spotkaj tu ciężar szczerze. Możesz unieść więcej, niż myślisz.',
  'med.invite.Uranus': 'Niech coś się rozluźni — uchwyt, stary kształt, którego już nie potrzebujesz.',
  'med.invite.Neptune': 'Niech krawędzie się rozmyją. Wolno ci przez chwilę nie wiedzieć.',
  'med.invite.Pluto': 'Niech to, co skończone, się skończy. Wdychaj w przestrzeń, którą zostawia.',
  'med.invite.default': 'Niech ta energia porusza się przez ciebie, nie w ciebie.',

  'med.ease.hard': 'Dziś {dominant} niesie tarcie. Nie jesteś tu, by się przez nie przebić — tylko by poczuć je wyraźnie i zostać miękki wokół.',
  'med.ease.soft': 'Dziś {dominant} płynie. Zauważ łatwość i pozwól sobie ją przyjąć.',
  'med.ease.neutral': 'Dziś {dominant} działa mocno. Niech przejdzie przez ciebie, zamiast osiąść w ciele.',

  'med.dominant.aspect': '{verb} {planet}–{other}',
  'med.dominant.sign': 'tranzyt {planet} przez znak {sign}',
  'med.dominant.chartWord': 'horoskop',
  'med.domverb.conjunction': 'koniunkcja',
  'med.domverb.opposition': 'opozycja',
  'med.domverb.square': 'kwadratura',
  'med.domverb.trine': 'trygon',
  'med.domverb.sextile': 'sekstyl',

  'med.houseLine.known': 'To dotyka części twojego życia, która jest o {theme}. Trzymaj to lekko. Nic tu nie trzeba rozstrzygać — tylko zauważać.',
  'med.houseLine.unknown': 'Cokolwiek to porusza w twoim życiu, niech osiądzie na czas tej praktyki. Wciąż tam będzie, gdy skończysz, a ty spotkasz to z większą przestrzenią.',

  'med.mantraLong.root': 'Czuję się bezpiecznie. Jestem tutaj. Mam to, czego potrzebuję.',
  'med.mantraLong.sacral': 'Pozwalam życiu poruszać się przeze mnie.',
  'med.mantraLong.solar-plexus': 'Ufam własnemu ogniowi.',
  'med.mantraLong.heart': 'Daję i przyjmuję miłość swobodnie.',
  'med.mantraLong.throat': 'Mówię swoją prawdę z łatwością.',
  'med.mantraLong.third-eye': 'Ufam temu, co widzę w środku.',
  'med.mantraLong.crown': 'Jestem częścią czegoś bezkresnego, a to mnie trzyma.',

  'med.title.fallback': 'medytacja centrum {chakra}',

  /* ---- streszczenie, czytane raz przed startem ---- */
  'med.brief.lead': 'Przeczytaj to raz, potem zamknij oczy. Każdy krok otwiera misa — zostań z nim aż do następnej.',
  'med.brief.close': 'Trzy miękkie misy kończą praktykę. Wróć we własnym tempie.',

  /* ---- kroki ogólne ---- */
  'med.step.settle': 'Oczy zamknięte. Niech ciało się osadzi, a oddech samo zwolni.',
  'med.step.breath': 'Oprzyj uwagę na oddechu — podążaj za nim do wewnątrz, podążaj na zewnątrz. Gdy umysł błądzi, to zauważanie jest praktyką. Wróć, łagodnie.',
  'med.step.centre': 'Przynieś uwagę do {seat}. Oddychaj, jakby sam oddech sięgał {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Bezgłośnie, w rytm oddechu: {affirmation}',
  'med.step.close': 'Puść praktykę. Zauważ, jak się teraz czujesz, zanim otworzysz oczy.',

  /* ---- świadomość oddechu ---- */
  'med.step.ba.count': 'Teraz licz każdy wydech — od jednego do dziesięciu, potem zacznij od nowa. Zgubisz rachubę — po prostu zacznij od jednego. Nikt nie liczy punktów.',

  /* ---- skan ciała ---- */
  'med.step.scan.0': 'Przesuwaj uwagę powoli od podeszew stóp w górę — kostki, nogi, biodra, brzuch, plecy, klatka, ramiona, dłonie. Spocznij kilka oddechów tam, gdzie spotykasz napięcie, i pozwól mu zmięknąć.',
  'med.step.scan.1': 'Teraz barki, gardło, szczęka, przestrzeń wokół oczu, skóra głowy. Potem poczuj całe ciało naraz — ciężkie, ciepłe, oddychające samo.',

  /* ---- kochająca dobroć ---- */
  'med.step.metta.0': 'Przywołaj siebie w myślach, dokładnie takiego, jaki jesteś dzisiaj. Ofiaruj bezgłośnie: obym był bezpieczny, obym miał się dobrze, obym był w spokoju. Powtarzaj powoli i pozwól sobie naprawdę to mieć na myśli.',
  'med.step.metta.1': 'Przywołaj kogoś, kogo łatwo kochasz. Wyobraź jego twarz i ofiaruj to samo: obyś był bezpieczny, obyś miał się dobrze, obyś był w spokoju.',
  'med.step.metta.2': 'Teraz rozszerz to — ktoś, kogo ledwie znasz, ktoś, kogo uważasz za trudnego, potem wszyscy, wszędzie: oby wszystkie istoty były bezpieczne, oby wszystkie istoty były w spokoju.',

  /* ---- kąpiel dźwiękowa ---- */
  'med.step.bath.0': 'Niech ton wyjdzie na pierwszy plan uwagi. Nie słuchasz z wysiłkiem — pozwalasz dźwiękowi przybyć, tak jak przybywa światło.',
  'med.step.bath.1': 'Zauważ, gdzie w ciele dźwięk zdaje się lądować — klatka, czaszka, dłonie. Niech przestrzeń między tobą a dźwiękiem się rozpuści.',

  /* ---- wdzięczność ---- */
  'med.step.grat.0': 'Przywołaj jedną rzecz z ostatniego dnia, która poszła dobrze, choćby najmniejszą. Nie tylko ją nazwij — poczuj, gdzie wdzięczność osiada w ciele.',
  'med.step.grat.1': 'Teraz coś, co zwykle bierzesz za pewnik — działające ciało, dach, ktoś, kto został. Zostań z tym kilka oddechów.',
  'med.step.grat.2': 'Jeszcze jedna — coś o tobie. Sposób, w jaki się pokazałeś, rzecz, którą ogarnąłeś, wysiłek, którego nikt nie widział. Trzymaj wszystkie trzy razem.',

  /* ---- bezpieczne miejsce ---- */
  'med.step.safe.0': 'Wyobraź miejsce, gdzie czujesz się całkowicie bezpiecznie — realne lub wyobrażone. Rozejrzyj się powoli: światło, pora dnia, co słyszysz, co czujesz na skórze.',
  'med.step.safe.1': 'Znajdź tu miejsce, gdzie najbardziej chciałbyś spocząć, i tam idź. Nic nie jest od ciebie wymagane. Nic cię nie dosięga, na co nie pozwolisz.',

  /* ---- góra ---- */
  'med.step.mtn.0': 'Wyobraź górę — jej szeroka podstawa, jej solidne zbocza, jej nieruchomy szczyt. Niech twoje ciało i góra staną się tym samym kształtem: siedzisko to podstawa, kręgosłup to zbocze, głowa to szczyt.',
  'med.step.mtn.1': 'Pogoda przychodzi i odchodzi wokół góry — światło, chmura, wiatr, burza. Twoje myśli i nastroje to pogoda. Góra nie kłóci się z pogodą i nie staje się przez nią mniejsza.',

  /* ---- otwarta świadomość ---- */
  'med.step.open.0': 'Puść kotwicę oddechu. Niech uwaga będzie szeroko otwarta, na niczym konkretnym. Dźwięki, doznania, myśli powstają i mijają — nie gonisz ich ani nie odpychasz.',
  'med.step.open.1': 'Zauważ, że sama świadomość się nie porusza. Rzeczy dzieją się w niej, tak jak chmury dzieją się w niebie. Spocznij jako to niebo — nic do dodania, nic do usunięcia.',

  /* ---- poranna intencja ---- */
  'med.step.morn.0': 'Trzy pełniejsze oddechy, nieco głębsze niż zwykle — niech obudzą ciało od wewnątrz. Obróć raz barki do tyłu i poczuj, jak przód ciała się otwiera.',
  'med.step.morn.1': 'Przywołaj luźno nadchodzący dzień, potem wybierz jedną intencję — nie zadanie, sposób bycia. Cierpliwy. Szczery. Odważny. Życzliwy. Powiedz raz: dzisiaj będę ___.',

  /* ---- wieczorne uwolnienie ---- */
  'med.step.eve.0': 'Niech dzień przewinie się lekko, jak krajobraz z okna pociągu — poranek, południe, wieczór. Nie zatrzymuj się na niczym. Jeśli jakaś chwila ciągnie, zanotuj ją i powiedz: nie teraz.',
  'med.step.eve.1': 'Znajdź jedną chwilę, z której cieszysz się, że się wydarzyła, i jedną rzecz, którą zrobiłeś tak dobrze, jak mogłeś, biorąc pod uwagę, jak dzień faktycznie poszedł. Niech to wystarczy. Teraz puść cały dzień — jest kompletny po prostu dlatego, że się skończył.',

  /* ---- joga nidra ---- */
  'med.step.nidra.0': 'Połóż się całkiem nieruchomo — nieruchomiej, niż wydaje się naturalne, porusza się tylko oddech. Ustaw krótką intencję, jedno spokojne zdanie w czasie teraźniejszym. Powiedz je wewnętrznie trzy razy.',
  'med.step.nidra.1': 'Przynoś uwagę do każdego miejsca, gdy zostaje nazwane, bez ruchu — prawa dłoń: kciuk, palce, wnętrze dłoni, nadgarstek, przedramię, łokieć, bark. Potem to samo po lewej.',
  'med.step.nidra.2': 'Oba biodra. Prawa noga — udo, kolano, goleń, kostka, stopa, palce. Lewa noga tak samo. Całe plecy przy podłodze, brzuch wznoszący się i opadający, klatka, gardło.',
  'med.step.nidra.3': 'Twarz — szczęka, wargi, nos, policzki, oczy, przestrzeń między brwiami, skóra głowy. Teraz całe ciało naraz, świecące słabo, trzymane przez podłogę. Wróć do swojej intencji.',
}
