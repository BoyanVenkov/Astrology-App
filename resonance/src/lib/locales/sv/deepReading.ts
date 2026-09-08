import type { DeepReadingKey } from '../en/deepReading'

/**
 * Svenska — den djupa, långa tydningen: det betalda Fullständiga horoskopet och
 * den detaljerade Kompatibilitetsgenomgången. Skriven för att läsas som en
 * sida eller två från en riktig astrolog.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- dagshoroskop (gratis): lite mer djup i varje notering ---- */
  'horo.deep.q.house': 'Det landar i området {theme}.',
  'horo.deep.q.hard': 'Rör dig försiktigt med den här.',
  'horo.deep.q.soft': 'Värt ett litet, medvetet steg.',
  'horo.deep.q.neutral': 'Låt det lägga sig innan du handlar.',
  'horo.deep.q.thread':
    'Tråden i dag återvänder gång på gång till din {focus} — där ska uppmärksamheten hållas.',
  'scr.horo.weekHead': 'Den större bågen',

  /* ============================ FULLSTÄNDIGT HOROSKOP ============================ */

  /* -- vad det betyder när varje planet är den PASSERANDE (rörliga) kraften -- */
  'dh.tr.Sun':
    'Solen driver dagen: vart den än går sätter den en strålkastare där i ungefär en månad, värmer den delen av kartan och ber dig dyka upp där som dig själv.',
  'dh.tr.Moon':
    'Månen är den snabbaste kroppen på himlen; dess transiter är korta men de sätter dagens känsloton och rör upp det de rör vid till ytan.',
  'dh.tr.Mercury':
    'Merkurius styr tänkande, tal och de små besluten som summeras. Dess transiter snabbar upp informationstrafiken kring ett ämne — samtal, meddelanden, pappersarbete, andra tankar.',
  'dh.tr.Venus':
    'Venus råder över attraktion, bekvämlighet, pengar och smak. När den passerar en punkt sötar den marken där och låter kontakt, spenderande och njutning komma lättare.',
  'dh.tr.Mars':
    'Mars är rå drivkraft och hetta. Dess transiter tänder en eld under det de rör vid — du får mer mod och mer friktion i samma paket, och lusten att handla innan du tänkt klart.',
  'dh.tr.Jupiter':
    'Jupiter är tillväxtens och «mer»:s planet. Den vidgar det den kontaktar — möjlighet, självförtroende, aptit och emellanåt överdrift — och tenderar att svänga upp dörren i det livsområdet vidare i ungefär ett år.',
  'dh.tr.Saturn':
    'Saturnus är tid, struktur och konsekvens. Där den går saktar den ner saker och frågar om det du byggt där kan bära vikt; det som kan stärker den, och det som inte kan tar den stilla isär så att du kan bygga om det ordentligt.',
  'dh.tr.Uranus':
    'Uranus är störaren. Dess transiter bryter ett mönster som blivit unket — ofta genom en överraskning, en plötslig rastlöshet eller en förändring du inte planerat — och ger dig tillbaka en frihet du skrivit på att avstå.',
  'dh.tr.Neptune':
    'Neptunus löser upp kanterna. Där den passerar blir konturerna mjuka: mer fantasi och medkänsla, men också mer förvirring, och en dragning att fly snarare än att möta saken direkt.',
  'dh.tr.Pluto':
    'Pluto arbetar under jorden och har ingen brådska. Dess transiter för en långsam, grundlig förvandling till det de rör vid — maktkamper, slut och ett skalande in till det som faktiskt är väsentligt.',

  /* -- vad din RADIX-punkt styr i din egen karta -- */
  'dh.na.Sun':
    'din kärnidentitet, din vitalitet och känslan av vem du är när du är som mest dig själv',
  'dh.na.Moon':
    'dina instinkter, dina sinnesstämningar och vad du behöver för att känna dig trygg och hållen',
  'dh.na.Mercury':
    'hur du tänker, lär dig, talar och fattar vardagliga beslut',
  'dh.na.Venus':
    'hur du älskar och blir älskad, vad du finner vackert och din relation till pengar och njutning',
  'dh.na.Mars':
    'din drivkraft, din ilska, ditt begär och hur du går efter det du vill',
  'dh.na.Jupiter':
    'var du söker mening och tillväxt, och din naturliga känsla för tillit och möjlighet',
  'dh.na.Saturn':
    'din relation till disciplin, auktoritet och gränser — platsen där du fått växa upp den hårda vägen',
  'dh.na.Uranus':
    'ditt behov av att vara fri och att göra saker på ditt eget sätt',
  'dh.na.Neptune':
    'din fantasi, din andlighet och de ställen där du är benägen att idealisera eller tappa bort dig',
  'dh.na.Pluto':
    'din relation till makt och kontroll, och det i dig som är byggt för att förvandlas',

  /* -- varje aspekts natur (två varianter, växlade per avsnitt) -- */
  'dh.asp.nat.conjunction.0':
    'En konjunktion är en sammansmältning. De två krafterna upptar samma grad och agerar som en, startar en färsk cykel i det här området av ditt liv — ett frö som planteras, inte en skörd som bärgas.',
  'dh.asp.nat.conjunction.1':
    'En konjunktion smälter samman de två energierna så fullständigt att de är svåra att skilja åt. Den markerar en början; det som tar form nu vecklar ut sig under åren som följer.',
  'dh.asp.nat.opposition.0':
    'En opposition verkar genom spegeln av andra människor och yttre omständigheter. Spänningen är verklig, men den finns där för att ge dig medvetenhet — du ser frågan klart för att något står emot den.',
  'dh.asp.nat.opposition.1':
    'En opposition drar dig mellan två poler och ber dig hålla båda snarare än att kollapsa in i den ena. Balans här är ingen kompromiss; den är en färdighet du bygger under press.',
  'dh.asp.nat.square.0':
    'En kvadratur är en friktionsaspekt. De två energierna vill olika saker och hakar ständigt i varandra, och obehaget är poängen — det är gruset som tvingar fram en verklig förändring snarare än en kosmetisk.',
  'dh.asp.nat.square.1':
    'En kvadratur lägger ett hinder på vägen precis där du helst inte vill hantera ett. Att trycka rakt igenom fungerar sällan; vägen förbi är oftast att byta angreppssätt, inte att anstränga sig mer.',
  'dh.asp.nat.trine.0':
    'En trigon är en öppen kanal. De två energierna samarbetar utan att bli ombedda, och stöd flödar mot dig här — men det når dig bara om du faktiskt rör dig mot det.',
  'dh.asp.nat.trine.1':
    'En trigon får det här livsområdet att kännas lätt och naturligt ett tag. Risken är självbelåtenhet; lätthet du inte använder tenderar att sila bort i tysthet.',
  'dh.asp.nat.sextile.0':
    'En sextil är en möjlighet du måste anta med avsikt. Dörren är olåst men inte öppen — en liten, medveten handling nu gör en möjlighet till något verkligt.',
  'dh.asp.nat.sextile.1':
    'En sextil erbjuder en hjälpsam öppning i den här delen av ditt liv. Den belönar initiativ och gör absolut ingenting för väntan.',

  /* -- kort verbfras för avsnittets inledning -- */
  'dh.asp.verb.conjunction': 'möter och smälter samman med',
  'dh.asp.verb.opposition': 'drar emot',
  'dh.asp.verb.square': 'skaver mot',
  'dh.asp.verb.trine': 'flödar mot',
  'dh.asp.verb.sextile': 'öppnar en dörr till',

  /* -- hur energin uttrycks i tecknet där radix-punkten står -- */
  'dh.sign.Aries':
    'snabb, direkt och lite stridslysten, mer benägen att handla än att vänta',
  'dh.sign.Taurus':
    'långsam, sinnlig och envis, motsträvig mot att jäktas och långsam att släppa taget',
  'dh.sign.Gemini':
    'nyfiken och verbal, snabb att koppla ihop idéer och snabb att bli rastlös',
  'dh.sign.Cancer':
    'öm och beskyddande, går med känslan före logiken',
  'dh.sign.Leo':
    'varm, uttrycksfull och stolt, behöver bli sedd för att känna sig verklig',
  'dh.sign.Virgo':
    'precis och praktisk, gladast när den kan vara genuint till nytta',
  'dh.sign.Libra':
    'inriktad på balans, rättvisa och gott sällskap, och obenägen till en scen',
  'dh.sign.Scorpio':
    'intensiv och privat, allt eller inget, och dragen till det dolda',
  'dh.sign.Sagittarius':
    'rastlös efter utrymme, mening och en vidare vy, och otålig med finstilt text',
  'dh.sign.Capricorn':
    'allvarlig och självdisciplinerad, mer imponerad av resultat än av löften',
  'dh.sign.Aquarius':
    'självständig och framåtblickande, tänker i system snarare än i känslor',
  'dh.sign.Pisces':
    'drömsk, genomsläpplig och medkännande, och lätt överväldigad',

  /* -- vad en transit genom varje hus tenderar att röra upp -- */
  'dh.house.1':
    'I första huset syns arbetet på dig — din kropp, din bild, det första intrycket du gör. En bra sträcka att rita om hur du framträder snarare än att behålla en kontur som inte längre passar.',
  'dh.house.2':
    'I andra huset rör det pengar, resurser och självvärde. Den yttre frågan är vad du tjänar och äger; den inre är vad du tror att du förtjänar.',
  'dh.house.3':
    'I tredje huset rör det upp vardagssinnet — samtal, korta resor, syskon och grannar, det ändlösa lilla utbytet av information. Var uppmärksam på vad du ständigt säger till dig själv.',
  'dh.house.4':
    'I fjärde huset når det rötterna — hem, familj, ditt förflutna och den privata bas du återvänder till. Något i ditt fundament granskas.',
  'dh.house.5':
    'I femte huset rör det lek, romantik, kreativitet och det du gör för glädjens skull. Det frågar vart din gnista tog vägen och hur du får tillbaka den.',
  'dh.house.6':
    'I sjätte huset verkar det genom rutin, hälsa och det dagliga slitet att hålla dig själv och ditt arbete i gång. Små vanor väger tyngre än vanligt nu.',
  'dh.house.7':
    'I sjunde huset är spegeln andra människor — partner, närstående, personen mitt emot vid bordet. Det du möter i dem är ofta något eget som du inte tittat rakt på.',
  'dh.house.8':
    'I åttonde huset går det till det djupa vattnet — delade pengar, intimitet, makt och det som håller på att ta slut. Det här är inte kallpratsterräng; något förvandlas i roten.',
  'dh.house.9':
    'I nionde huset öppnar det den vidare vyn — tro, studier, resande och sökandet efter mening. Din känsla av vad allt är till för sträcks ut.',
  'dh.house.10':
    'I tionde huset är det offentligt — karriär, rykte, din ställning och den roll du spelar i världen. Det du är känd för är uppe för omprövning.',
  'dh.house.11':
    'I elfte huset rör det vänskap, gemenskap och den framtid du sträcker dig mot. Sällskapet du håller och målen du bär sorteras.',
  'dh.house.12':
    'I tolfte huset verkar det i bakgrunden — vila, ensamhet, det omedvetna och det du burit utan att namnge. Det här är tyst, inåtvänt arbete.',

  /* -- «i vardagen kan det se ut som…» (växlat per aspekt) -- */
  'dh.life.conjunction.0':
    'I vardagen kan det kännas som en nystart du inte helt valt — nya villkor, ett nytt kapitel som öppnas i det här området, oavsett om du känner dig redo eller inte.',
  'dh.life.conjunction.1':
    'Dag för dag kan det komma som ett starkt nytt intresse, en person som ändrar ramen, eller helt enkelt känslan att den gamla versionen av det här är över.',
  'dh.life.conjunction.2':
    'I praktiken visar det sig ofta som en tröskel — ett beslut, en flytt, ett åtagande som nollställer klockan i den här delen av ditt liv.',
  'dh.life.opposition.0':
    'I vardagen utspelar sig det här ofta genom någon annan — en oenighet, ett krav, eller en person som förkroppsligar precis det du brottas med.',
  'dh.life.opposition.1':
    'Dag för dag kan det kännas som att vara fångad mellan två giltiga behov — ditt och någon annans, eller två delar av ditt eget liv som inte båda får plats.',
  'dh.life.opposition.2':
    'I praktiken tenderar det att sätta saker på sin spets: ett samtal du inte längre kan skjuta upp, ett val som väntat på att du ska göra det.',
  'dh.life.square.0':
    'I vardagen kan det se ut som en plan som ständigt stannar av, en person som trycker på samma knapp om och om igen, eller en uppgift som känns långt tyngre än den borde.',
  'dh.life.square.1':
    'Dag för dag kommer det ofta som frustration — ansträngning som inte omvandlas till något, en vägg där du väntade en dörr.',
  'dh.life.square.2':
    'I praktiken visar det sig som ett tryck som inte låter dig rulla på: det du undvikit ligger nu på vägen.',
  'dh.life.trine.0':
    'I vardagen kan det kännas som en rad små gröna ljus — hjälp som kommer, timing som stämmer, ett ja där du spänt dig för ett nej.',
  'dh.life.trine.1':
    'Dag för dag visar det sig ofta som lätthet och flöde i det här området, och en frestelse att anta att det alltid kommer att vara så enkelt.',
  'dh.life.trine.2':
    'I praktiken är det ett gynnsamt fönster — introduktioner landar, förfrågningar får ett varmt mottagande, vägen är kort fri.',
  'dh.life.sextile.0':
    'I vardagen kan det se ut som en öppning du nästan missar — ett erbjudande, ett tillfälligt möte, en liten dörr som bara står öppen om du kliver igenom nu.',
  'dh.life.sextile.1':
    'Dag för dag tenderar det att belöna den som gör första draget: skicka meddelandet, ställ frågan, lägg fram ditt namn.',
  'dh.life.sextile.2':
    'I praktiken är det en billig möjlighet — inget dramatiskt, men värt att handla på medan den är här.',

  /* -- aspektens djupare inbjudan (växlad) -- */
  'dh.invite.conjunction.0':
    'Inbjudan är att plantera med avsikt. Det du börjar nu, hur litet det än är, är fröet till något du fortfarande lever med om flera år — så välj det med avsikt.',
  'dh.invite.conjunction.1':
    'Det djupare arbetet är att släppa den gamla formen av det här rent, utan att släpa den halvlevande in i det nya kapitlet.',
  'dh.invite.conjunction.2':
    'Det som det här verkligen ber om är ett tydligt ja eller ett tydligt nej. Ambivalens är det enda svaret som slösar bort fönstret.',
  'dh.invite.opposition.0':
    'Inbjudan är inte att vinna. Den är att hålla båda sidor tillräckligt länge för att hitta den tredje möjligheten som hedrar det som är sant i var och en.',
  'dh.invite.opposition.1':
    'Det djupare arbetet är att ta tillbaka den del av det här som du lagt ut på någon annan — styrkan, behovet eller skulden.',
  'dh.invite.opposition.2':
    'Det som det här ber om är ärlig medvetenhet. När du väl kan se mönstret på riktigt är du inte längre inuti det.',
  'dh.invite.square.0':
    'Inbjudan är inte att trycka hårdare. Den är att lägga märke till vad du vuxit ifrån här och låta friktionen ta isär det, så att något stadigare kan byggas.',
  'dh.invite.square.1':
    'Det djupare arbetet är ett metodbyte. Målet kan vara okej; sättet du gått till väga är det som skapar motståndet.',
  'dh.invite.square.2':
    'Det som det här verkligen ber om är mognad på en bestämd plats — att göra den oglamorösa, strukturella saken du hoppats kunna hoppa över.',
  'dh.invite.trine.0':
    'Inbjudan är att använda lättheten, inte bara njuta av den. Stöd som inte spenderas tenderar att försvinna i tysthet.',
  'dh.invite.trine.1':
    'Det djupare arbetet är att bygga något under lugnet som håller när vädret vänder igen.',
  'dh.invite.trine.2':
    'Det som det här ber om är att du säger ja till hjälpen — anta introduktionen, ta genvägen, låt det vara lätt för en gångs skull.',
  'dh.invite.sextile.0':
    'Inbjudan är initiativ. Det här är en dörr som lämnats olåst; den öppnas bara om du trycker.',
  'dh.invite.sextile.1':
    'Det djupare arbetet är att lägga märke till de små möjligheterna du vanemässigt pratar dig ur, och ta en.',
  'dh.invite.sextile.2':
    'Det som det här ber om är en blygsam, konkret handling av mod — inget dramatiskt, bara ett steg du helst skulle skjuta upp.',

  /* -- konkret vägledning (växlad) -- */
  'dh.do.conjunction.0':
    'Ge det en ren start: namnge det som börjar, markera det på något sätt, och belamra inte de första veckorna med rester från den gamla versionen.',
  'dh.do.conjunction.1':
    'Rör dig medvetet snarare än snabbt. En konjunktion sätter en lång cykel i rörelse; tonen du sätter nu tenderar att sitta kvar.',
  'dh.do.conjunction.2':
    'Bestäm dig. Säg ja:et eller nej:et högt inför minst en annan person så att det blir verkligt.',
  'dh.do.opposition.0':
    'Ha samtalet du cirklar kring, och gå in för att lyssna. Den andra sidan bär information du behöver.',
  'dh.do.opposition.1':
    'Skriv ner båda ståndpunkterna som om du var tvungen att argumentera för var och en rättvist. Balanspunkten visar sig oftast på pappret.',
  'dh.do.opposition.2':
    'Tvinga inte fram en lösning i dag. Låt spänningen sitta kvar tills den tredje möjligheten dyker upp av sig själv.',
  'dh.do.square.0':
    'Bind dig inte och skriv inte på under press. Låt det som gör motstånd visa dig var strukturen är tunn, och stärk det först.',
  'dh.do.square.1':
    'Ändra en sak i ditt angreppssätt och försök igen. Samma ansträngning, en annan vinkel.',
  'dh.do.square.2':
    'Gör den tråkiga, strukturella uppgiften du ständigt skjuter upp. Det är hela uppdraget.',
  'dh.do.trine.0':
    'Ta ett riktigt steg medan dörren är öppen — ett meddelande, en bokning, ett första utkast. Lättheten bleknar om du bara beundrar den.',
  'dh.do.trine.1':
    'Be om saken. Det här är fönstret där ett ja är mest sannolikt.',
  'dh.do.trine.2':
    'Bygg nu. Använd lugnet till att lägga en grund du blir glad för senare.',
  'dh.do.sextile.0':
    'Gör första draget i dag, inte nästa vecka. Skicka det, fråga det, sätt ditt namn.',
  'dh.do.sextile.1':
    'Säg ja till det lilla erbjudandet även om det känns obetydligt. De här summeras.',
  'dh.do.sextile.2':
    'Välj den enda möjlighet du normalt skulle skjuta upp, och handla på den innan dagen är slut.',

  /* -- timingspråk (växlat per tillstånd) -- */
  'dh.time.peak.0':
    'Den är nära exakt och drar fortfarande åt, så det här når sin topp inom en dag eller två och börjar sedan lätta.',
  'dh.time.peak.1':
    'Kontakten är nästan exakt just nu — det här är det starkaste den blir, och intensiteten faller av strax efter.',
  'dh.time.peak.2':
    'Det här är på eller nära sin exakta grad, och det är därför det ber om så mycket av din uppmärksamhet på en gång.',
  'dh.time.build.0':
    'Den byggs fortfarande upp. Temat blir starkare under de kommande dagarna innan det vänder.',
  'dh.time.build.1':
    'Den här har inte nått full styrka än; räkna med att den fortsätter stiga ett tag innan den kröner.',
  'dh.time.build.2':
    'Du är på den tidiga sluttningen av det här. Det som nu läses som en svag signal blir omisskännligt inom ungefär en vecka.',
  'dh.time.fade.0':
    'Den är precis förbi exakt — den skarpaste kanten har redan passerat och trycket släpper.',
  'dh.time.fade.1':
    'Toppen på den här ligger bakom dig nu. Det som återstår är integration, inte kris.',
  'dh.time.fade.2':
    'Den här kontakten är på väg ut. Du städar efter den snarare än lever igenom det värsta av den.',

  'dh.retro':
    ' Eftersom den är retrograd är det här en översyn snarare än en första genomgång — du går tillbaka över mark du redan täckt, den här gången för att göra rätt.',

  /* -- mallar för avsnittssammansättning -- */
  'dh.sec.open':
    '{tr} Just nu {verb} den {target} — den del av dig som styr {na}.',
  'dh.sec.sign':
    'Din radix-{target} står i {sign} — {signFlavour} — vilket formar hur alltihop landar för dig.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- översikten: tre korta stycken -- */
  'dh.ov.lead':
    'Den här tydningen är dragen ur var planeterna faktiskt står i dag, ställd mot din födelsekarta — så den handlar om din himmel, inte himlen i allmänhet.',
  'dh.ov.head':
    'Tyngdpunkten just nu är {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Det övergripande vädret är gynnsamt: de lätta kontakterna väger klart tyngre än de hårda. Det här är en sträcka att sträcka sig efter något snarare än att spänna dig mot det — det främsta sättet att slösa bort den är att sitta still.',
  'dh.ov.weather.friction':
    'Det övergripande vädret är krävande. Det är mer friktion än flöde i blandningen, och flera saker vill mötas rakt på snarare än önskas bort. Inget av det är en katastrof; det är en byggfas, och byggfaser känns som ansträngning.',
  'dh.ov.weather.intense':
    'Det övergripande vädret är tungt och koncentrerat. Långsamma planeter sitter rakt på din karta, och volymen är uppskruvad på allt de rör vid. Portionera dina krafter — det här är en maratonsträcka, inte en spurt.',
  'dh.ov.weather.mixed':
    'Det övergripande vädret är blandat — verkligt stöd och verklig friktion inom samma fönster. Den här periodens arbete är att välja var du förbrukar dig och var du håller igen.',
  'dh.ov.weather.quiet':
    'Det övergripande vädret är stilla. Ingen planet trycker hårt på din karta, vilket gör det här till en sällsynt sträcka att sätta din egen agenda och takt utan att himlen säger emot.',
  'dh.ov.tempo.fast':
    'Tempot är snabbt — kontakterna är täta och i rörelse, så teman kommer och går inom dagar. Håll dig lyhörd snarare än att försöka planera hela saken i förväg.',
  'dh.ov.tempo.building':
    'Tempot byggs långsamt upp. Huvudtemana samlar fortfarande kraft, så det som nu känns som en antydan kommer att vara omisskännligt om en vecka eller två.',
  'dh.ov.tempo.slow':
    'Tempot är långsamt och strukturellt. De stora kontakterna här vecklar ut sig över månader, inte dagar; tänk i årstider och förvänta dig inget utslag över en natt.',
  'dh.ov.tempo.settling':
    'Tempot lägger sig — de skarpaste kontakterna har precis passerat sin topp, så det här handlar mer om att integrera det som redan hänt än att spänna sig för det som kommer.',

  /* -- Mån-stycket, utökat -- */
  'dh.moon.lead': 'Ditt känsloväder',
  'dh.moon.body':
    'Månen rör sig genom {sign} — {mood} — och är {phase} vid {pct}% ljus. {phaseNote} Låt din sinnesstämning vara information snarare än ett utslag: den berättar hur den här sträckan av himmel känns inifrån.',

  /* -- trådarna: vad som ständigt återkommer -- */
  'scr.horo.threadsHead': 'Trådarna som förbinder',
  'dh.th.house':
    'Ditt {ord} hus kommer ständigt upp. Vad som än annars pågår är {houseThemeLower} rummet du ombeds tillbringa tid i den här perioden.',
  'dh.th.planet':
    'Din radix-{planet} bearbetas från fler än en vinkel samtidigt. Eftersom den håller {na}, räkna med att det blir en återkommande ton och inte en engångsföreteelse.',
  'dh.th.bal.friction':
    'Och vågen lutar mot friktion. Det är inte otur — det är hur en tillväxtfas känns inifrån. Ansträngningen är uppdraget.',
  'dh.th.bal.supportive':
    'Och vågen lutar mot flöde. De stödjande kontakterna är fler än de hårda, så dörrarna är verkligen öppna — det enda sättet att slösa bort det är att gå genom ingen.',
  'dh.th.bal.mixed':
    'Och vågen är verkligt delad. En del av det stöder dig och en del gör motstånd, ofta samma dag, så omdöme betyder mer än energi just nu.',
  'dh.th.solo':
    'Kontakterna är spridda över din karta snarare än hopade på en punkt, så det här läses som en varierad period snarare än en enda dominerande historia.',

  /* -- timingkartan -- */
  'scr.horo.timingHead': 'Hur det här vecklar ut sig',
  'dh.tm.tight':
    'Drar åt mot exakt: {list}. Det här är de starkaste rösterna på din himmel just nu och når sin topp inom dagar.',
  'dh.tm.fade':
    'Förbi sin topp och bleknande: {list}. Läxan i de här har till stor del landat — du integrerar nu, du spänner dig inte.',
  'dh.tm.none':
    'Inget sitter rakt på exakt för tillfället, vilket är en del av varför perioden känns mer öppen än spetsig.',

  /* -- den avslutande bågen -- */
  'dh.cl.protect':
    'Den större bågen ber dig skydda din {focus} genom den här sträckan. Färre åtaganden, tidigare kvällar och tillåtelse att vara mindre tillgänglig än vanligt — du får mer tillbaka av att vakta din energi än av att spendera den. Det här är en årstid för att sköta marken, inte för att tvinga fram skörden.',
  'dh.cl.use':
    'Den större bågen är ett öppet fönster kring din {focus}, och fönster som det här står inte öppna länge. Rikta det mot en sak som verkligen betyder något för dig och lägg verklig tyngd bakom nu, medan himlen hjälper snarare än gör motstånd.',
  'dh.cl.steady':
    'Den större bågen ber om stadga. Håll dina rutiner, håll ditt ord till dig själv, och låt bruset dra förbi utan att jaga varje bit. Inte varje transit behöver ett svar; en del behöver bara sittas ut.',

  /* ======================= KOMPATIBILITET — DJUP ======================= */

  'syn.deep.patternLead': 'Vad det här bandet går på',
  'syn.deep.pattern.emotional':
    'I sin kärna är det här en känslomässig förbindelse. Månarna och Venus bär det mesta av vikten mellan er, vilket gör bandet varmt, instinktivt och snabbt att stämma av — och det betyder att det är sinnesstämningar, inte gräl, som sätter temperaturen. När ni båda är stadiga är det mjukt och lätt och hemmet känns som hemma snabbt. När en av er inte mår bra vet den andra inom minuter, oavsett om ett ord sägs eller inte. Den praktiska följden är att sköta om ditt eget inre tillstånd inte är skilt från att sköta om relationen; det är samma arbete. Lär dig att namnge en känsla tidigt, innan den blir väder, och den här förbindelsen håller nästan vad som helst.',
  'syn.deep.pattern.mental':
    'I sin kärna är det här ett möte mellan sinnen. Ni förbinds först genom ord, idéer, nyfikenhet och nöjet att bli förstådd snabbt, och gnistan hålls tänd exakt så länge som samtalet varar. Det är en verklig styrka — ni kommer aldrig att tråka ut varandra och ni löser problem bra som par. Risken är finare: det går att förväxla ett gott samtal med närhet och att leva lite ovanför halsen, byta tankar medan känslolagret lämnas oskött. Ge plats åt de delar av närheten som inte är verbala — en delad tystnad, en måltid, en syssla gjord sida vid sida — och den mentala förbindelsen blir en grund snarare än en ersättning.',
  'syn.deep.pattern.physical':
    'I sin kärna är det här en förbindelse av drivkraft och kropp. Mars och Solen gör tungjobbet, så det finns verklig kemi och verkligt driv här — ni energiserar varandra, ni får saker att hända när ni är tillsammans, och ni fungerar bra som lag när det finns ett jobb att göra. Samma koppling betyder att ni kan trissa upp varandra lika snabbt; tävlingslust och irritation är attraktionens skuggsida. Lösningen är inte att undertrycka hettan utan att rikta den. Ge den en gemensam riktning — ett projekt, en plan, en utmaning, till och med ett rent gräl med regler — och intensiteten arbetar för er i stället för att vända inåt.',
  'syn.deep.pattern.karmic':
    'I sin kärna väger den här. Saturnus och Pluto är med i blandningen, vilket ger bandet en känsla av konsekvens — som om ni var här för att reda ut något tillsammans snarare än att bara fördriva tiden trevligt. Förbindelser som den här tenderar att kännas betydelsefulla tidigt och att kräva mer av båda personer än ett lättare par skulle. Väl hanterad blir den djupt lojal och varaktig, av det slags band som överlever saker. Slarvigt hanterad blir den tung — plikt förklädd till närhet, eller en långsam maktkamp som ingen namnger. Skillnaden ligger nästan helt i om ni båda fortsätter välja den högt, med avsikt, snarare än att stanna för att lämna känns som ett misslyckande.',

  'syn.deep.chemHead': 'Kemin mellan er',
  'syn.deep.chem.strong':
    'Attraktionen här är väl understödd. Kontakterna mellan era kartor som styr begär och tillgivenhet är till stor del harmoniska, vilket oftast översätts till en kemi som känns naturlig snarare än spänd — ni dras till varandra på ett sätt som inte kostar mycket att upprätthålla. Njut av det, och ta det inte som bevis för att resten av relationen sköter sig själv; lätthet i en avdelning ersätter inte ansträngning i de andra.',
  'syn.deep.chem.mixed':
    'Attraktionen här har både ström och grus. En del av kontakterna mellan era kartor drar er samman varmt; andra lägger friktion till samma dragning, vilket kan läsas som en kemi med en egg — magnetisk, emellanåt vansinnesframkallande, sällan trist. Den sortens gnista tenderar att hålla längre än den friktionsfria, just för att den ständigt återskapas. Uppgiften är att hålla eggen lekfull snarare än att låta den surna till ett mönster av att trissa upp varandra.',
  'syn.deep.chem.cool':
    'Begär är inte den starkaste tråden mellan era kartor. Kontakterna som styr attraktion är stilla eller milt utmanande, vilket inte betyder att det inte finns någon gnista — bara att den här förbindelsen sannolikt är byggd på annat: delad förståelse, respekt, pålitlighet, ett möte av värderingar. Relationer grundade på det tenderar att vara långsammare att tändas och betydligt svårare att bryta.',

  'syn.deep.commHead': 'Hur ni kommunicerar',
  'syn.deep.comm.easy':
    'Kommunikation är en styrka här. Era Merkurius-kontakter flödar, vilket betyder att ni tenderar att följa varandras tänkande, landa skämt och arbeta ett problem tillsammans utan mycket översättningsförlust. Använd det med avsikt när något svårt dyker upp — ni är bättre på att prata igenom saker än de flesta par, så låt inte de svåra samtalen bli de ni undviker.',
  'syn.deep.comm.work':
    'Kommunikation kräver en del arbete här. Era Merkurius-kontakter bär friktion, så ni kan prata förbi varandra — olika tempon, olika logik, olika antaganden om vad som faktiskt kommits överens om. Det är hanterbart, men det behöver en vana: sakta ner, spela tillbaka det du hört, och kontrollera att ni menar samma sak med samma ord innan ni går vidare.',
  'syn.deep.comm.quiet':
    'Det finns ingen stark Merkurius-kontakt mellan era kartor åt något håll, vilket oftast betyder att kommunikation varken är en uppenbar gåva eller ett uppenbart problem — det är helt enkelt något ni bygger med avsikt snarare än ramlar in i. Regelbundna, otvungna avstämningar betyder mer för er än för ett par som läser varandra automatiskt.',

  'syn.deep.growthLead': 'Var det här får dig att växa',
  'syn.deep.growth.good':
    'Lättheten mellan er är verklig, och den är också det som ska bevakas. När en förbindelse mest sköter sig själv blir det lätt att bli slapp — att sluta ta med din fulla ärlighet och ansträngning för att du inte behövt. Er egg som par är att fortsätta dyka upp ordentligt för något som inte kräver det: fortsätta säga den sanna saken, fortsätta göra ansträngningen, fortsätta lägga märke till varandra. Låt inte «lätt» stillsamt bli «obevakat».',
  'syn.deep.growth.mid':
    'Friktionspunkterna mellan er är inga fel i matchningen; de är kursplanen. Var och en markerar en plats där ni båda måste sträcka er — säga den svåra saken tidigare, hålla din mark vänligare, sluta vänta på att bli läst och börja vara tydlig. Par som namnger de här spänningarna tidigt och behandlar dem som gemensamt arbete tenderar att klara sig bra med tiden. Par som hoppas att de bara ska lösas upp tenderar att möta samma gräl i åratal.',
  'syn.deep.growth.hard':
    'Den här förbindelsen kräver mycket av er båda. De utmanande kontakterna mellan era kartor löses inte upp av sig själva, så relationen fungerar bara om ni båda behandlar svårigheten som gemensamt arbete och inte som den andras fel. Det är verkligen möjligt — många varaktiga band är byggda på hårda aspekter — men det är ett val ni måste fortsätta göra, om och om igen och högt, särskilt i de sträckor där det vore lättare att räkna poäng.',

  'syn.deep.nameItLead': 'Säg den här delen högt',
  'syn.deep.nameIt':
    'Om det finns en sak värd att namnge tidigt snarare än att hoppas att den lägger sig, är det {a}–{b}-kontakten: {sentence} Osagd tenderar den att förkalkas till ett mönster; sagd tydligt och tidigt visar den sig oftast vara mindre än den kändes.',
  'syn.deep.nameIt.none':
    'Det finns ingen enskild friktionspunkt som behöver avvärjas tidigt här — vilket i sig är värt att veta. Arbetet i den här förbindelsen handlar mindre om att desarmera en fråga och mer om att förbli uppmärksam över helheten.',

  'syn.deep.longViewLead': 'Det långa perspektivet',
  'syn.deep.longView.good':
    'det här är den sortens förbindelse som åldras väl. Den tenderar att bli lättare snarare än svårare allteftersom ni lär er varandras kanter, och den tidiga lättheten fördjupas oftast till något stadigare och mer pålitligt med tiden. Det främsta hotet mot den är försummelse, inte konflikt.',
  'syn.deep.longView.mid':
    'det här blir vad ni gör det till. Råmaterialet är hanterbart — varken ansträngningslöst eller dömt — och utfallet beror nästan helt på ansträngningen ni båda lägger in under den första sträckan, innan mönstren sätter sig. Få vanorna rätt tidigt och det här kan hålla.',
  'syn.deep.longView.hard':
    'det här är intensivt nu, och det förblir troligen intensivt. Det är värt det om djup och betydelse är vad ni båda verkligen vill ha av en relation. Det är tärande om en del av dig väntar på att det ska lugna ner sig till något lätt — det är troligen inte uppdraget här.',
} as const
