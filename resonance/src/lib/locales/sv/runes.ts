import type { RunesKey } from '../en/runes'

/**
 * Svenska — den Äldre futharken: betydelser, upprätt och omvänd (merkstave)
 * läsning och en dagsanvisning för var och en av de 24 runorna, plus texterna
 * för Run-skärmen. Runornas namn är fornnordiska och förblir lika på alla språk.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ texter */
  'rune.eyebrow': 'Runorna',
  'rune.dailyTitle': 'Din runa för i dag',
  'rune.dailyBlurbChart':
    'En runa, kastad för din karta och detta datum. Den förnyas vid midnatt.',
  'rune.dailyBlurbPlain': 'En runa för dagen. Den förnyas vid midnatt.',
  'rune.tapReveal': 'Tryck på stenen för att vända den.',
  'rune.turnStone': 'Vänd stenen',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'Den föll omvänd — läs den för skuggsidan, blockeringen eller läxan som ännu inte lärts.',
  'rune.sound': 'Ljud',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'Frejs ätt',
  'rune.aett.2': 'Heimdalls ätt',
  'rune.aett.3': 'Tyrs ätt',

  'rune.element.fire': 'Eld',
  'rune.element.ice': 'Is',
  'rune.element.earth': 'Jord',
  'rune.element.air': 'Luft',
  'rune.element.water': 'Vatten',
  'rune.element.spirit': 'Ande',

  'rune.resonance.match':
    'Runorna och himlen är överens i dag — båda pekar mot din {chakra}.',
  'rune.resonance.bridge':
    'Dagens himmel bearbetar din {sky}; runan svarar från din {rune}.',

  'rune.cast': 'Kasta runorna',
  'rune.castSub': 'De tre nornorna, eller femrunorskorset',
  'rune.chooseTitle': 'Välj ett kast',
  'rune.chooseBlurb': 'Håll din fråga, välj sedan hur runorna ska falla.',
  'rune.runeCount.one': '1 runa',
  'rune.runeCount.many': '{n} runor',
  'rune.castEyebrow': 'Runorna · {layout}',
  'rune.drawAgain': 'Kasta igen',
  'rune.doCast': 'Kasta',

  'rune.layout.norns': 'De tre nornorna',
  'rune.layout.nornsSub': 'Det som blivit, det som blir, det som är skyldigt',
  'rune.layout.cross': 'Femrunorskorset',
  'rune.layout.crossSub': 'En fylligare titt på en situation',

  'rune.pos.now': 'Nu',
  'rune.pos.now.prompt': 'var du står',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'det som blivit — roten till det',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'det som blir — den nuvarande vändningen',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'det som ska bli — vad som är skyldigt, och vart det leder',
  'rune.pos.heart': 'Kärnan',
  'rune.pos.heart.prompt': 'sakens kärna',
  'rune.pos.crossing': 'Vad som korsar den',
  'rune.pos.crossing.prompt': 'hindret eller hjälpen',
  'rune.pos.root': 'Roten',
  'rune.pos.root.prompt': 'vad det växer ur',
  'rune.pos.counsel': 'Rådet',
  'rune.pos.counsel.prompt': 'vad runorna råder',
  'rune.pos.outcome': 'Vart det leder',
  'rune.pos.outcome.prompt': 'riktningen det lutar åt',

  'rune.ask': 'Fråga runorna',
  'rune.askSub': 'En runa, ett svar på din fråga',
  'rune.askEyebrow': 'Runorna · Frågan',
  'rune.askBlurb':
    'Ställ din fråga rakt och håll den medan runan dras.',
  'rune.askPlaceholder': 'Ska jag…  ·  Är det dags att…  ·  Vad behöver jag veta om…',
  'rune.consult': 'Dra en runa',
  'rune.askAgain': 'Fråga igen',
  'rune.youAsked': 'Du frågade',
  'rune.answerReading': 'Vad runan säger',
  'rune.castReading': 'Läsningen',

  'rune.verdict.yes': 'Ja',
  'rune.verdict.no': 'Nej',
  'rune.verdict.wait': 'Inte än',
  'rune.verdict.hidden': 'Dolt',
  'rune.verdict.yes.gloss': 'Runan lutar mot ja. Rör dig, och mena det.',
  'rune.verdict.no.gloss': 'Runan lutar bort. Att tvinga fram det här nu kostar mer än det ger tillbaka.',
  'rune.verdict.wait.gloss':
    'Runan säger att tiden inte är mogen. Förbered dig och låt ögonblicket komma till dig.',
  'rune.verdict.hidden.gloss':
    'Runan behåller sitt råd. Det här är inte ditt att veta än — svaret håller fortfarande på att formas.',

  'rune.library': 'Den Äldre futharken',
  'rune.librarySub': 'Alla tjugofyra, att sitta med',

  'dash.dailyRune': 'Dagens runa',
  'dash.runeSeen': 'Dagens runa är vänd',
  'dash.runeNew': 'Kasta din runa för i dag',

  /* ---------------------------------------------- Frejs ätt (1–8) */
  'rune.fehu.meaning': 'Boskap — rörligt välstånd, och vad det kan köpa eller kosta',
  'rune.fehu.keywords': 'Rikedom · Begynnelser · Flöde',
  'rune.fehu.up':
    'Fehu är hjorden: välstånd som rör sig, förökar sig och glider undan om det hamstras. Den markerar ankomsten av nya resurser — pengar, energi, tillfälle, anseende — och starten på något som kan växa. Haken ligger i dess natur: det här förblir levande bara om det fortsätter cirkulera. Ge ut något, dela något, sätt det i arbete. Det du klämmer åt, förlorar du.',
  'rune.fehu.merk':
    'Omvänd är Fehu förlust, eller välstånd som äger dig snarare än tvärtom. Något rinner bort, eller så vaktar du en resurs så hårt att den slutat göra dig någon nytta. Se var din energi och dina pengar faktiskt går, och var ärlig om vad som är värt att behålla.',
  'rune.fehu.today':
    'Sätt något i omlopp i dag — pengar, ansträngning eller ett vänligt ord du sparat på.',

  'rune.uruz.meaning': 'Uroxen — vild, otämjd livskraft',
  'rune.uruz.keywords': 'Vitalitet · Uthållighet · Rå form',
  'rune.uruz.up':
    'Uruz är den vilda oxen: kraft som inte brutits till plogen. Den för med sig en våg av fysisk vitalitet, envis uthållighet och styrkan att forma den råa omständigheten till något eget. Det är en bra runa för begynnelser som behöver muskler — börja träningen, bryta marken, hålla en gräns. Kraften är verklig; arbetet är att lära sig styra den.',
  'rune.uruz.merk':
    'Omvänd är Uruz missbrukad eller frånvarande kraft — styrka vänd mot dig själv, eller en svaghet där du behöver stå fast. Kanske trycker du på när du borde pausa, eller låter något vilt i ditt liv gå ohanterat. Ta tillbaka kraften utan att låta den styra dig.',
  'rune.uruz.today':
    'Använd kroppen i dag — gå långt, lyft något tungt eller ta dig igenom en sak du skjutit upp.',

  'rune.thurisaz.meaning': 'Tornet — en skarp, reaktiv, försvarande kraft',
  'rune.thurisaz.keywords': 'Försvar · Reaktion · En hård grind',
  'rune.thurisaz.up':
    'Thurisaz är tornet på häcken och jättens hammare: en kraft som skyddar genom att såra och röjer genom att bryta. Den markerar ofta en konfrontation, en hård gräns eller en situation som inte viker för charm. Mött rakt på sårar den; mött med tålamod blir den en grind. Sök inte den här striden, men låtsas inte heller att tornet inte finns där.',
  'rune.thurisaz.merk':
    'Omvänd är Thurisaz ett försvar som blivit en mur, eller ett reaktivt humör som gör skada. Kanske slår du omkring dig, eller är så spänd mot angrepp att inget gott heller når dig. Lägg ner hammaren innan du svänger den mot någon som inte förtjänat det.',
  'rune.thurisaz.today':
    'Håll en gräns i dag utan att be om ursäkt för den — och motstå lusten att förklara den tre gånger.',

  'rune.ansuz.meaning': 'Guden — andedräkten, ordet, budskapet från Oden',
  'rune.ansuz.keywords': 'Röst · Budskap · Insikt',
  'rune.ansuz.up':
    'Ansuz är Allfaderns andedräkt: tal, signal och den plötsliga klarheten som anländer utifrån din egen ansträngning. Ett budskap är på väg, eller ett samtal betyder mer än det ser ut. Den råder också över din egen röst — det här är dagen att säga den sanna saken tydligt, att lära ut, att namnge det du ser. Lyssna noga; svaret kan finnas i någon annans mun.',
  'rune.ansuz.merk':
    'Omvänd är Ansuz missförstånd, ett felhört budskap, eller visdom du vägrar höra på grund av vem den kommer från. Ord används för att förvirra snarare än att klargöra — dina eller någon annans. Sakta ner samtalet och kontrollera vad som faktiskt menades.',
  'rune.ansuz.today':
    'Säg den klara saken högt i dag, och lyssna dubbelt så mycket som du talar.',

  'rune.raidho.meaning': 'Ritten — resan, hjulet, den rätta rytmen',
  'rune.raidho.keywords': 'Resa · Rytm · Rätt ordning',
  'rune.raidho.up':
    'Raidho är vagnen på vägen: rörelse med en riktning, och känslan av att bäras längs en stig som har sin egen rytm. Den gynnar resande, beslut som får dig i rörelse och att sätta saker tillbaka i sin rätta ordning. Läxan är att resan har en egen takt — du kan inte jäkta vägen, men du kan sluta kämpa mot den.',
  'rune.raidho.merk':
    'Omvänd är Raidho en resa som stannat av, en plan i fel ordning, eller rörelse i fel riktning. Något är ur takt — en resa du inte borde göra, eller en brådska som kommer att kosta dig. Få ordningen på saker rätt innan du ger dig av igen.',
  'rune.raidho.today':
    'Gör nästa rätta steg i ordning i dag; motstå lusten att hoppa fram till den intressanta delen.',

  'rune.kenaz.meaning': 'Facklan — behärskad eld, hantverk och kunskap',
  'rune.kenaz.keywords': 'Insikt · Hantverk · Skapande eld',
  'rune.kenaz.up':
    'Kenaz är lågan i hallen: inte vildelden utan den bearbetade elden — smedjan, lampan, förståelsens gnista. Den för klarhet in i ett mörkt hörn, skicklighet till en uppgift och den skapande hettan att göra snarare än bara föreställa sig. Något du varit i mörker om blir synligt. Ta det du nu ser och forma det till något verkligt.',
  'rune.kenaz.merk':
    'Omvänd är Kenaz ett ljus som slocknar — förlorad inspiration, ett projekt som svalnar, eller kunskap använd för att bränna snarare än bygga. Kanske är du skapande blockerad, eller klamrar dig fast vid ett sätt att göra saker som inte längre kastar något ljus. Låt det döda mörkna så att en ny låga kan ta.',
  'rune.kenaz.today':
    'Gör något i dag, hur litet och grovt det än är — poängen är att föra en idé in i formen.',

  'rune.gebo.meaning': 'Gåvan — utbytet, och bandet det skapar',
  'rune.gebo.keywords': 'Gåva · Utbyte · Partnerskap',
  'rune.gebo.up':
    'Gebo är den givna gåvan och den skyldiga gåvan — tråden av förpliktelse och generositet som binder människor. Den markerar ett äkta utbyte: ett partnerskap, ett avtal, en handling av givande som kommer att återvända. Det finns ingen omvänd Gebo, för en gåva kan, när den väl getts, inte o-ges. Ge fritt och ta emot med behag, och se hur vågen jämnar ut sig med tiden.',
  'rune.gebo.today':
    'Ge något i dag utan en kontobok i sinnet — och tillåt dig att ta emot det som erbjuds tillbaka.',

  'rune.wunjo.meaning': 'Glädje — harmoni, tillhörighet och saker som faller på plats',
  'rune.wunjo.keywords': 'Glädje · Harmoni · Tillhörighet',
  'rune.wunjo.up':
    'Wunjo är glädjen i den välskötta hallen: inte extas utan förnöjsamhet, känslan av att saker passar ihop och av att vara bland de sina. Den markerar en lösning, en förtjänad belöning, eller ett ögonblick då bitarna faller i linje. Tillåt dig att lägga märke till det. Den här runan ber dig att ta emot det goda som faktiskt är här snarare än att hålla ut för en bättre version.',
  'rune.wunjo.merk':
    'Omvänd är Wunjo uppskjuten glädje eller en falsk harmoni som hålls samman av att inte säga den svåra saken. Något är ostämt under ytan. Släta inte över det — den verkliga lättheten kommer efter det ärliga samtalet, inte i stället för det.',
  'rune.wunjo.today':
    'Namnge en sak som verkligen går bra, och låt det räcka för i dag.',

  /* -------------------------------------------- Heimdalls ätt (9–16) */
  'rune.hagalaz.meaning': 'Hagel — plötslig störning utom din kontroll',
  'rune.hagalaz.keywords': 'Störning · Kris · Röjning',
  'rune.hagalaz.up':
    'Hagalaz är hagelstormen: förstörelse som faller från himlen, ruinerar skörden och sedan smälter till vattnet som föder nästa. Den markerar ett avbrott du inte valt och inte kan argumentera med — en händelse som bryter mönstret. Det finns inget att bekämpa här. Ta skydd, låt det passera, och se vad som fortfarande står kvar efteråt. Hagel röjer mark.',
  'rune.hagalaz.today':
    'Börja inget skört i dag. Bomma luckorna, vänta ut vädret, och lita på att marken röjs.',

  'rune.nauthiz.meaning': 'Nöd — friktion, tvång och elden det gör',
  'rune.nauthiz.keywords': 'Tvång · Nöd · Hård läxa',
  'rune.nauthiz.up':
    'Nauthiz är nödelden, tänd genom att gnida två pinnar mot varandra under press. Den markerar ett tvång — en brist, en försening, en situation du ännu inte kan ta dig ur — och den fyndighet som tvånget tvingar fram ur dig. Läxan är tålamod under friktion. Möt bristen ärligt, gör den lilla disciplinerade sak som står i din makt, och låt motståndet lära dig vad du faktiskt behöver.',
  'rune.nauthiz.merk':
    'Omvänd är Nauthiz förnekad nöd — att låtsas att tvånget inte finns där, eller att låta motgången surna till bitterhet och förhastade beslut. Sluta kämpa mot faktumet av gränsen. Vägen igenom är acceptans först, sedan tålmodig, medveten handling.',
  'rune.nauthiz.today':
    'Acceptera en gräns i dag i stället för att argumentera med den, och gör den enda lilla disciplinerade sak den lämnar öppen för dig.',

  'rune.isa.meaning': 'Is — stillhet, ett stillestånd, det frusna ögonblicket',
  'rune.isa.keywords': 'Stillhet · Stillestånd · Klarhet',
  'rune.isa.up':
    'Isa är floden frusen till botten: all rörelse stoppad, allt hållet på plats. Den markerar ett stillestånd — en plan på is, en relation i stiltje, en period då inget du trycker på tycks röra sig. Det här är inte ett misslyckande; det är vinter. Sluta tvinga fram töandet. Använd stillheten för att se klart vad som ligger under isen, och spara din kraft till våren.',
  'rune.isa.today':
    'Sluta trycka på den fastnade saken i dag. Sitt med den, se på den klart, och låt stillheten göra sitt arbete.',

  'rune.jera.meaning': 'Året — skörd, cykler och möda som bär frukt',
  'rune.jera.keywords': 'Skörd · Cykler · Rätt timing',
  'rune.jera.up':
    'Jera är det vändande året: frö, växt, skörd, vila och frö igen. Den markerar punkten där tidigare möda äntligen ger avkastning — inte genom en lyckträff utan för att tillräckligt med tid gått och tillräckligt med arbete gjorts. Den råder också till tålamod med det som ännu inte är moget. Du kan inte jäkta en årstid. Sköt det du planterat, och samla det som är klart.',
  'rune.jera.today':
    'Kräv in något du planterade för ett tag sedan — avsluta det, sätt det på banken, eller lägg helt enkelt märke till att det fungerade.',

  'rune.eihwaz.meaning': 'Idegranen — axeln mellan liv och död, uthållighet',
  'rune.eihwaz.keywords': 'Uthållighet · Förvandling · Axeln',
  'rune.eihwaz.up':
    'Eihwaz är idegranen, städsegrön och giftig, med rötterna i undervärlden och kronan i ljuset — pålen som löper genom världarna. Den markerar uthållighet genom en hård passage, och en förändring som går hela vägen ner. Något måste sluta för att nästa sak ska leva. Stå som idegranen: rotad, orörlig, förbunden både med det som dör och det som föds.',
  'rune.eihwaz.today':
    'Möt i dag slutet du undvikit — inte för att tvinga fram det, bara för att sluta låtsas att det inte händer.',

  'rune.perthro.meaning': 'Lottbägaren — mysterium, slump och det ödet håller dolt',
  'rune.perthro.keywords': 'Mysterium · Slump · Det osedda',
  'rune.perthro.up':
    'Perthro är bägaren lotterna skakas ur — ögonblicket innan tärningarna landar, när utfallet finns men inte kan ses. Den råder över hemligheter, dolda inflytanden, tur och de delar av mönstret som helt enkelt inte är dina att känna än. Något avgörs utom synhåll. Spela din roll väl och låt kastet falla; inte allt är menat att listas ut i förväg.',
  'rune.perthro.merk':
    'Omvänd är Perthro en hemlighet som behöver förbli begravd som grävs upp, eller en osund fixering vid att känna utfallet. Sluta tvinga fram avslöjandet. En del saker ruttnar i ljuset före sin tid.',
  'rune.perthro.today':
    'Låt en sak förbli okänd i dag. Gör din del, och sluta ladda om sidan.',

  'rune.algiz.meaning': 'Älgen — skydd, och sträckandet mot det högre',
  'rune.algiz.keywords': 'Skydd · Förbindelse · Högre hjälp',
  'rune.algiz.up':
    'Algiz är älgen med hornen resta, och starrgräset som skär handen som griper det — en runa av skydd, och av länken mellan dig och något större. Den markerar en sköld omkring dig just nu, och stöd tillgängligt ovanför din egen nivå om du sträcker dig efter det. Be om hjälp. Stå rak. Det som vakar över dig är på din sida.',
  'rune.algiz.merk':
    'Omvänd är Algiz skydd som sänkts eller hjälp som avvisats — att lämna dig öppen där du borde vara vaktad, eller att skära av dig från stödet som finns där. Kontrollera ditt försvar, och släpp in någon.',
  'rune.algiz.today':
    'Be om hjälp med en sak i dag, av en människa eller en makt över din lönegrad.',

  'rune.sowilo.meaning': 'Solen — helhet, framgång och viljan som vägleder',
  'rune.sowilo.keywords': 'Framgång · Helhet · Klar vilja',
  'rune.sowilo.up':
    'Sowilo är solhjulet: ljuset som alltid återvänder, segern som kommer av en vilja stadigt riktad mot en enda sak. Den markerar framgång, hälsa och en klargörande kraft som bränner bort dimman. Det finns ingen omvänd Sowilo — solen går inte baklänges. Rikta din energi mot det som betyder något, håll den där, och räkna med att utfallet går din väg.',
  'rune.sowilo.today':
    'Rikta allt mot ett mål i dag. Ingen gardering, inget andra mål — bara det ena, tills det mörknar.',

  /* --------------------------------------------------- Tyrs ätt (17–24) */
  'rune.tiwaz.meaning': 'Tyr — rättvisa, mod och det villiga offret',
  'rune.tiwaz.keywords': 'Rättvisa · Mod · Offer',
  'rune.tiwaz.up':
    'Tiwaz är spjutet och handen Tyr gav vargen för att hålla sitt ord — en runa av rättvisa, heder och att göra det rätta till ett verkligt pris. Den gynnar rättsliga frågor, rejäla strider och att stå fast vid ett åtagande när det slutar vara bekvämt. Rikta dig mot det som är sant och håll linjen. Segern här är av det slag du kan leva med efteråt.',
  'rune.tiwaz.merk':
    'Omvänd är Tiwaz mod som sviktar, ett övergivet åtagande, eller rättvisa som böjts ur form. Kanske undviker du ett ställningstagande du vet att du borde ta, eller lägger din energi på en strid som inte är ärlig. Förbind dig på nytt med det som faktiskt är rätt, även om det kostar dig segern.',
  'rune.tiwaz.today':
    'Håll i dag ett löfte som blivit obekvämt, och ta ställningstagandet du duckat för.',

  'rune.berkano.meaning': 'Björken — växt, omvårdnad och tysta nya begynnelser',
  'rune.berkano.keywords': 'Växt · Omvårdnad · Nya begynnelser',
  'rune.berkano.up':
    'Berkano är björken, första trädet att grönska efter isen — en runa av mild, skyddad växt: graviditet, ett nytt projekt i sin späda fas, läkning, omvårdnaden som låter en liten sak bli stark. Den ber dig att vårda snarare än att trycka på. Skydda det nya skottet, mata det, håll frosten borta, och låt det växa i den takt växt faktiskt tar.',
  'rune.berkano.merk':
    'Omvänd är Berkano hämmad växt eller omvårdnad som dragits tillbaka — en ny sak försummad, en familjeknut, eller självförsummelse förklädd till hårdhet. Något behöver skötsel som du låtit klara sig självt. Gå tillbaka och vårda det ordentligt.',
  'rune.berkano.today':
    'Sköt om en växande sak i dag — en människa, en plan eller dig själv — med verklig omsorg, inte bara avsikt.',

  'rune.ehwaz.meaning': 'Hästen — partnerskap, tillit och stadig rörelse',
  'rune.ehwaz.keywords': 'Partnerskap · Tillit · Fart',
  'rune.ehwaz.up':
    'Ehwaz är hästen och ryttaren som rör sig som en — en runa av tillitsfullt partnerskap, lagarbete och framsteg gjorda tillsammans som ingendera skulle göra ensam. Den markerar en relation som fungerar, eller ett samarbete värt att förbinda sig till. Bandet är byggt på tillit och på att båda parter drar åt samma håll. Där du har det, luta dig in i det; där du vill ha det, var först den pålitliga hälften.',
  'rune.ehwaz.merk':
    'Omvänd är Ehwaz ett partnerskap ur takt — misstro, en part som bär den andra, eller rörelse som stannat för att ni inte längre vill samma sak. Namnge var tilliten brast och avgör ärligt om ni fortfarande rider tillsammans.',
  'rune.ehwaz.today':
    'Gör en sak med någon i dag snarare än ensam, och var den hälft som går att lita på.',

  'rune.mannaz.meaning': 'Människan — jaget, och jaget bland andra',
  'rune.mannaz.keywords': 'Jag · Gemenskap · Perspektiv',
  'rune.mannaz.up':
    'Mannaz är mänsklighetens runa — du som individ, och du som en nod i ett nät av andra. Den ber dig se dig själv klart: dina gåvor, dina gränser och din spegling i människorna omkring dig. Den markerar ofta ett ögonblick av att behöva andra, eller att behövas, eller att se dig själv ärligt genom någon annans ögon. Du är inte menad att göra det här ensam, och du är inte heller dess mittpunkt.',
  'rune.mannaz.merk':
    'Omvänd är Mannaz isolering, eller en självbild som drivit bort från sanningen — uppblåst eller orättvist hård. Kanske är du avskuren från de dina, eller din egen värsta kritiker. Skaffa en utomstående blick från någon som är ärlig och vänlig.',
  'rune.mannaz.today':
    'Se dig själv i dag genom ögonen på någon som känner dig väl, och justera bilden där den är fel.',

  'rune.laguz.meaning': 'Vatten — flöde, intuition och det djupa omedvetna',
  'rune.laguz.keywords': 'Flöde · Intuition · Djupet',
  'rune.laguz.up':
    'Laguz är sjön och havet: flöde, känsla, dröm och det djupa vattnet i det omedvetna där saker rör sig som dagssinnet inte kan se. Den gynnar att lita på en magkänsla framför ett kalkylark, att gå med strömmen snarare än mot, och att ge akt på vad dina drömmar och sinnesstämningar säger dig. Tidvattnet vet vart det är på väg. För nu, låt det bära dig.',
  'rune.laguz.merk':
    'Omvänd är Laguz en översvämning, eller att dras under — överväldigad av känsla, undvikande något genom att driva, eller en intuition som surnat till rädsla eller fantasi. Få fötterna på marken. Inte varje ström är värd att följa, och inte varje våg är en varning.',
  'rune.laguz.today':
    'Lita på magkänslan i dag framför det smarta argumentet, och ge akt på vad du drömmer i natt.',

  'rune.ingwaz.meaning': 'Ing — mognad, lagrad potential, en fullbordad cykel',
  'rune.ingwaz.keywords': 'Mognad · Potential · Fullbordan',
  'rune.ingwaz.up':
    'Ingwaz är fröet förseglat i jorden över vintern — potential hållen i en sluten behållare, som gör sitt arbete utom synhåll tills det är redo att släppas på en gång. Den markerar slutet på en mognad: ett projekt, ett beslut eller en inre process som stillsamt puttrat är på väg att bli klar. Öppna inte lådan för tidigt. När det är klart blir det klart rent, och du kommer att känna lättnaden av det.',
  'rune.ingwaz.today':
    'Låt i dag det som är nästan klart bli klart i sin egen tid. Sluta peta på det.',

  'rune.dagaz.meaning': 'Dag — genombrott, uppvaknande, vändningen från mörkt till ljust',
  'rune.dagaz.keywords': 'Genombrott · Uppvaknande · Vändpunkt',
  'rune.dagaz.up':
    'Dagaz är gryningen: gångjärnet mellan natt och dag, ögonblicket då ljuset kommer tillbaka och allt ser annorlunda ut. Den markerar ett genombrott — en insikt, ett sinnesskifte, en situation som vänder från fastlåst till i rörelse på en gång. Det finns ingen omvänd Dagaz; gryningen o-händer inte. Något du varit i mörker om är på väg att bli uppenbart. Var redo att handla på det.',
  'rune.dagaz.today':
    'Handla på insikten i dag, medan den ännu är ljus. Insikt bleknar om man sover på den för länge.',

  'rune.othala.meaning': 'Gården — arv, härkomst och det som verkligen är ditt',
  'rune.othala.keywords': 'Härkomst · Hem · Det som består',
  'rune.othala.up':
    'Othala är fädernejorden: det du ärver, det du hör till, och de saker som inte kan tas ifrån dig för att de är invävda i den du är. Den markerar frågor om hem, familj, tradition och arv — vad som ska behållas från där du kommer ifrån, och vad som ska lämnas bakom. Gör anspråk på det som verkligen är ditt. Sköt om det. Och var ärlig om vilka arv som är gåvor och vilka som bara är gammal tyngd.',
  'rune.othala.merk':
    'Omvänd är Othala ett dåligt arv som hålls fast vid, eller en rotlöshet som inte vill lägga sig — gamla familjemönster på autopilot, eller en vägran att höra hemma någonstans. Sortera arvegodset. Behåll det som tjänar framtiden; ge resten en respektfull begravning.',
  'rune.othala.today':
    'Behåll en sak från där du kommer ifrån i dag, och lägg medvetet ner en sak du burit av vana.',
} as const
