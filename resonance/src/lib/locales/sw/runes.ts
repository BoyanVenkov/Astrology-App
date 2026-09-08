import type { RunesKey } from '../en/runes'

/**
 * Kiswahili — Futhark ya Kale (Elder Futhark): maana za rune 24, usomaji wa
 * wima na wa kupinduliwa (merkstave), na mwongozo wa kila siku kwa kila rune,
 * pamoja na maandishi ya skrini ya Rune. Majina ya rune ni ya Kinorse cha kale
 * na yanabaki yaleyale katika kila lugha. Inahitaji ukaguzi wa mzungumzaji asilia.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ maandishi */
  'rune.eyebrow': 'Rune',
  'rune.dailyTitle': 'Rune yako ya leo',
  'rune.dailyBlurbChart':
    'Rune moja, iliyotupwa kwa chati yako na tarehe hii. Inajifanya upya usiku wa manane.',
  'rune.dailyBlurbPlain': 'Rune moja kwa siku. Inajifanya upya usiku wa manane.',
  'rune.tapReveal': 'Gusa jiwe ili kuligeuza.',
  'rune.turnStone': 'Geuza jiwe',
  'rune.merkstave': 'Merkstave (iliyopinduliwa)',
  'rune.merkstaveNote':
    'Ilianguka ikiwa imepinduliwa — soma kwa upande wa kivuli, kizuizi, au somo ambalo bado halijajifunzwa.',
  'rune.sound': 'Sauti',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'Ætt ya Freyr',
  'rune.aett.2': 'Ætt ya Heimdall',
  'rune.aett.3': 'Ætt ya Týr',

  'rune.element.fire': 'Moto',
  'rune.element.ice': 'Barafu',
  'rune.element.earth': 'Ardhi',
  'rune.element.air': 'Hewa',
  'rune.element.water': 'Maji',
  'rune.element.spirit': 'Roho',

  'rune.resonance.match':
    'Rune na anga zinakubaliana leo — zote zinaelekeza kwenye {chakra} yako.',
  'rune.resonance.bridge':
    'Anga la leo linafanyia kazi {sky} yako; rune inajibu kutoka {rune} yako.',

  'rune.cast': 'Tupa rune',
  'rune.castSub': 'Norn Watatu, au msalaba wa rune tano',
  'rune.chooseTitle': 'Chagua utupaji',
  'rune.chooseBlurb': 'Shikilia swali lako, kisha chagua jinsi rune zinapaswa kuanguka.',
  'rune.runeCount.one': 'rune 1',
  'rune.runeCount.many': 'rune {n}',
  'rune.castEyebrow': 'Rune · {layout}',
  'rune.drawAgain': 'Tupa tena',
  'rune.doCast': 'Tupa',

  'rune.layout.norns': 'Norn Watatu',
  'rune.layout.nornsSub': 'Kilichokuwa, kinachokuwa, kinachodaiwa',
  'rune.layout.cross': 'Msalaba wa Rune Tano',
  'rune.layout.crossSub': 'Mtazamo mkamilifu zaidi wa hali moja',

  'rune.pos.now': 'Sasa',
  'rune.pos.now.prompt': 'ulipo',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'kile kilichokuwa — mzizi wake',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'kile kinachokuwa — mgeuko wa sasa',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'kile kitakachokuwa — kinachodaiwa, na kinakoelekea',
  'rune.pos.heart': 'Kiini',
  'rune.pos.heart.prompt': 'kiini cha jambo',
  'rune.pos.crossing': 'Kinachokivuka',
  'rune.pos.crossing.prompt': 'kizuizi au msaada',
  'rune.pos.root': 'Mzizi',
  'rune.pos.root.prompt': 'kinachomea kutoka',
  'rune.pos.counsel': 'Shauri',
  'rune.pos.counsel.prompt': 'kile rune zinashauri',
  'rune.pos.outcome': 'Kinakoelekea',
  'rune.pos.outcome.prompt': 'mwelekeo kinakoelekea',

  'rune.ask': 'Uliza rune',
  'rune.askSub': 'Rune moja, jibu moja kwa swali lako',
  'rune.askEyebrow': 'Rune · Swali',
  'rune.askBlurb':
    'Weka swali lako wazi na ulishikilie wakati rune inavutwa.',
  'rune.askPlaceholder': 'Je, nifanye…  ·  Je, ni wakati wa…  ·  Ni nini nahitaji kujua kuhusu…',
  'rune.consult': 'Vuta rune',
  'rune.askAgain': 'Uliza tena',
  'rune.youAsked': 'Uliuliza',
  'rune.answerReading': 'Kile rune inasema',
  'rune.castReading': 'Usomaji',

  'rune.verdict.yes': 'Ndiyo',
  'rune.verdict.no': 'Hapana',
  'rune.verdict.wait': 'Bado',
  'rune.verdict.hidden': 'Imefichwa',
  'rune.verdict.yes.gloss': 'Rune inaegemea ndiyo. Sogea, na kwa dhati.',
  'rune.verdict.no.gloss': 'Rune inaegemea mbali. Kulazimisha hili sasa kunagharimu zaidi ya kinachorudisha.',
  'rune.verdict.wait.gloss':
    'Rune inasema wakati haujaiva. Jiandae, na uache wakati uje kwako.',
  'rune.verdict.hidden.gloss':
    'Rune inashikilia shauri lake. Hili bado si lako kujua — jibu bado linaundika.',

  'rune.library': 'Futhark ya Kale',
  'rune.librarySub': 'Zote ishirini na nne, za kukaa nazo',

  'dash.dailyRune': 'Rune ya siku',
  'dash.runeSeen': 'Rune ya leo imegeuzwa',
  'dash.runeNew': 'Tupa rune yako ya leo',

  /* ---------------------------------------------- Ætt ya Freyr (1–8) */
  'rune.fehu.meaning': 'Ng’ombe — utajiri unaosonga, na kile unachoweza kununua au kugharimu',
  'rune.fehu.keywords': 'Utajiri · Mianzo · Mtiririko',
  'rune.fehu.up':
    'Fehu ni kundi la mifugo: utajiri unaosonga, unaozidisha, na unaoteleza ukihifadhiwa kwa uchoyo. Unaashiria kuwasili kwa rasilimali mpya — pesa, nishati, fursa, hadhi — na kuanza kwa kitu kinachoweza kukua. Mtego uko katika asili yake: hiki kinabaki hai tu kikiendelea kuzunguka. Tumia sehemu, shiriki sehemu, kiweke kazini. Kile unachokamata kwa nguvu, unakipoteza.',
  'rune.fehu.merk':
    'Ikipinduliwa, Fehu ni hasara, au utajiri unaokumiliki badala ya wewe kuumiliki. Kitu kinamwagika, au unalinda rasilimali kwa nguvu sana kiasi kwamba imeacha kukufaa kwa lolote. Angalia nishati na pesa zako zinakoenda kweli, na uwe mwaminifu kuhusu kile kinachostahili kuhifadhiwa.',
  'rune.fehu.today':
    'Weka kitu katika mzunguko leo — pesa, juhudi, au neno jema ulilokuwa umehifadhi.',

  'rune.uruz.meaning': 'Nyati mwitu — nguvu ya uhai ya mwitu, isiyofugwa',
  'rune.uruz.keywords': 'Uhai · Uvumilivu · Umbo ghafi',
  'rune.uruz.up':
    'Uruz ni ng’ombe wa mwitu: nguvu isiyovunjwa kwa jembe. Inaleta wimbi la uhai wa mwili, uvumilivu wa ukaidi, na nguvu ya kuunda hali ghafi kuwa kitu chako mwenyewe. Ni rune nzuri kwa mianzo inayohitaji misuli — kuanza mazoezi, kupasua ardhi, kushikilia mpaka. Nguvu ni halisi; kazi ni kujifunza kuiongoza.',
  'rune.uruz.merk':
    'Ikipinduliwa, Uruz ni nguvu iliyotumiwa vibaya au isiyokuwepo — nguvu iliyogeuzwa dhidi ya nafsi yako, au udhaifu mahali unahitaji kusimama imara. Huenda unasukuma pale unapaswa kusimama, au unaacha kitu cha mwitu maishani mwako bila kusimamiwa. Rudisha nguvu bila kuiacha ikuendeshe.',
  'rune.uruz.today':
    'Tumia mwili wako leo — tembea mbali, inua kitu kizito, au pita kupitia jambo moja ulilokuwa ukiliahirisha.',

  'rune.thurisaz.meaning': 'Mwiba — nguvu kali, ya kuitikia, ya kujihami',
  'rune.thurisaz.keywords': 'Ulinzi · Mwitikio · Lango gumu',
  'rune.thurisaz.up':
    'Thurisaz ni mwiba wa ua na nyundo ya jitu: nguvu inayolinda kwa kuumiza, na kusafisha kwa kuvunja. Mara nyingi inaashiria mgongano, mpaka mgumu, au hali isiyokubali ushawishi. Ukikabiliwa uso kwa uso inaumiza; ukikabiliwa kwa subira inakuwa lango. Usitafute pambano hili, lakini pia usijifanye mwiba haupo.',
  'rune.thurisaz.merk':
    'Ikipinduliwa, Thurisaz ni ulinzi uliokuwa ukuta, au hasira ya kuitikia inayoharibu. Huenda unapiga ovyo, au umejiimarisha sana dhidi ya shambulio kiasi kwamba hata jema haliwezi kukufikia. Weka nyundo chini kabla ya kuipiga kwa mtu asiyeistahili.',
  'rune.thurisaz.today':
    'Shikilia mpaka mmoja leo bila kuomba radhi kwa ajili yake — na pinga hamu ya kuueleza mara tatu.',

  'rune.ansuz.meaning': 'Mungu — pumzi, neno, ujumbe kutoka Odin',
  'rune.ansuz.keywords': 'Sauti · Ujumbe · Ufahamu',
  'rune.ansuz.up':
    'Ansuz ni pumzi ya Baba wa Wote: kusema, ishara, na uwazi wa ghafla unaowasili kutoka nje ya juhudi zako mwenyewe. Ujumbe unakuja, au mazungumzo yana maana zaidi ya yanavyoonekana. Pia inatawala sauti yako mwenyewe — hii ni siku ya kusema jambo la kweli wazi, kufundisha, kutaja unachokiona. Sikiliza kwa makini; jibu linaweza kuwa mdomoni mwa mtu mwingine.',
  'rune.ansuz.merk':
    'Ikipinduliwa, Ansuz ni mawasiliano mabaya, ujumbe uliosikiwa vibaya, au hekima unayokataa kuisikia kwa sababu ya nani anaileta. Maneno yanatumika kuchanganya badala ya kufafanua — yako au ya mtu mwingine. Punguza kasi ya mazungumzo na uhakiki kilichokusudiwa kweli.',
  'rune.ansuz.today':
    'Sema jambo lililo wazi kwa sauti leo, na usikilize mara mbili zaidi ya unavyosema.',

  'rune.raidho.meaning': 'Mpando — safari, gurudumu, mdundo sahihi',
  'rune.raidho.keywords': 'Safari · Mdundo · Mpangilio sahihi',
  'rune.raidho.up':
    'Raidho ni gari barabarani: msogeo wenye mwelekeo, na hisia ya kubebwa katika njia yenye mdundo wake mwenyewe. Inapendelea safari, maamuzi yanayokusogeza, na kurudisha mambo katika mpangilio wake sahihi. Somo ni kwamba safari ina kasi yake mwenyewe — huwezi kuharakisha njia, lakini unaweza kuacha kupambana nayo.',
  'rune.raidho.merk':
    'Ikipinduliwa, Raidho ni safari iliyokwama, mpango uliokosa mpangilio, au msogeo katika mwelekeo mbaya. Kitu kimekosa mdundo — safari usiyopaswa kuifanya, au haraka itakayokugharimu. Rekebisha mpangilio wa mambo kabla ya kuondoka tena.',
  'rune.raidho.today':
    'Fanya hatua ifuatayo sahihi kwa mpangilio leo; pinga hamu ya kuruka hadi sehemu ya kuvutia.',

  'rune.kenaz.meaning': 'Kurunzi — moto uliodhibitiwa, ufundi na maarifa',
  'rune.kenaz.keywords': 'Ufahamu · Ufundi · Moto wa ubunifu',
  'rune.kenaz.up':
    'Kenaz ni mwali ndani ya ukumbi: si moto wa msituni bali moto uliofanyiwa kazi — mfuo, taa, cheche ya kuelewa. Inaleta uwazi katika pembe yenye giza, ustadi kwa kazi, na joto la ubunifu la kutengeneza badala ya kuwazia tu. Kitu ulichokuwa gizani kuhusu kinakuwa cha kuonekana. Chukua unachokiona sasa na ukiunde kuwa kitu halisi.',
  'rune.kenaz.merk':
    'Ikipinduliwa, Kenaz ni mwanga unaozimika — msukumo uliopotea, mradi unaopoa, au maarifa yanayotumika kuchoma badala ya kujenga. Huenda umekwama kiubunifu, au unashikilia namna ya kufanya mambo isiyotoa mwanga tena. Acha kilichokufa kiingie gizani ili mwali mpya uweze kushika.',
  'rune.kenaz.today':
    'Tengeneza kitu leo, hata kikiwa kidogo na ghafi — hoja ni kuleta wazo katika umbo.',

  'rune.gebo.meaning': 'Zawadi — kubadilishana, na kifungo kinachozalisha',
  'rune.gebo.keywords': 'Zawadi · Kubadilishana · Ushirika',
  'rune.gebo.up':
    'Gebo ni zawadi iliyotolewa na zawadi inayodaiwa — uzi wa wajibu na ukarimu unaowaunganisha watu. Inaashiria kubadilishana kwa dhati: ushirika, mkataba, tendo la kutoa litakalorudi. Hakuna Gebo iliyopinduliwa, kwa sababu zawadi, ikishatolewa, haiwezi kutokutolewa. Toa kwa uhuru na upokee kwa neema, na uangalie mizani ikilingana baada ya muda.',
  'rune.gebo.today':
    'Toa kitu leo bila daftari la hesabu akilini — na jiruhusu kupokea kile kinachotolewa kwako kwa kurudi.',

  'rune.wunjo.meaning': 'Furaha — upatano, kuwa wa kwao, na mambo yanayokaa mahali pake',
  'rune.wunjo.keywords': 'Furaha · Upatano · Kuwa wa kwao',
  'rune.wunjo.up':
    'Wunjo ni furaha ya ukumbi unaoendeshwa vizuri: si furaha ya kupindukia bali kuridhika, hisia ya mambo kufanana na ya kuwa miongoni mwa watu wako. Inaashiria utatuzi, tuzo iliyochumwa, au wakati vipande vinapopangika. Jiruhusu kuiona. Rune hii inakuomba ukubali jema lililopo kweli badala ya kusubiri toleo bora zaidi.',
  'rune.wunjo.merk':
    'Ikipinduliwa, Wunjo ni furaha iliyoahirishwa au upatano wa uongo unaoshikiliwa kwa kutosema jambo gumu. Kitu kimekosa sauti chini ya uso. Usikifunike — utulivu halisi unakuja baada ya mazungumzo ya uaminifu, si badala yake.',
  'rune.wunjo.today':
    'Taja jambo moja linaloenda vizuri kweli, na uache hilo litoshe kwa leo.',

  /* -------------------------------------------- Ætt ya Heimdall (9–16) */
  'rune.hagalaz.meaning': 'Mvua ya mawe — vurugu ya ghafla nje ya udhibiti wako',
  'rune.hagalaz.keywords': 'Vurugu · Mgogoro · Kusafisha',
  'rune.hagalaz.up':
    'Hagalaz ni dhoruba ya mvua ya mawe: uharibifu unaoanguka kutoka mbinguni, unaoharibu mazao, kisha unayeyuka kuwa maji yanayolisha mazao yajayo. Unaashiria kukatizwa usikochagua na usiyoweza kubishana nako — tukio linalovunja mkakati. Hakuna cha kupigana hapa. Jikinge, acha kipite, na uangalie kilichobaki kimesimama baadaye. Mvua ya mawe inasafisha ardhi.',
  'rune.hagalaz.today':
    'Usianze chochote dhaifu leo. Funga milango, subiri hali ya hewa ipite, na uamini ardhi inasafishwa.',

  'rune.nauthiz.meaning': 'Uhitaji — msuguano, kizuizi, na moto unaozalisha',
  'rune.nauthiz.keywords': 'Kizuizi · Uhitaji · Somo gumu',
  'rune.nauthiz.up':
    'Nauthiz ni moto wa uhitaji, unaowashwa kwa kusugua vijiti viwili chini ya shinikizo. Unaashiria kizuizi — uhaba, ucheleweshaji, hali usiyoweza kutoka bado — na ubunifu ambao kizuizi hicho kinakulazimisha kutoa. Somo ni subira chini ya msuguano. Kabili ukosefu kwa uaminifu, fanya jambo dogo lenye nidhamu lililo katika uwezo wako, na uache upinzani ukufundishe unachohitaji kweli.',
  'rune.nauthiz.merk':
    'Ikipinduliwa, Nauthiz ni uhitaji uliokataliwa — kujifanya kizuizi hakipo, au kuacha ugumu uchachuke kuwa uchungu na maamuzi ya haraka. Acha kupambana na ukweli wa mpaka. Njia ya kupita ni kukubali kwanza, kisha tendo la subira, la makusudi.',
  'rune.nauthiz.today':
    'Kubali kizuizi kimoja leo badala ya kubishana nacho, na fanya jambo dogo lenye nidhamu ambalo kinakuachia wazi.',

  'rune.isa.meaning': 'Barafu — utulivu, kusimama, wakati uliogandishwa',
  'rune.isa.keywords': 'Utulivu · Kusimama · Uwazi',
  'rune.isa.up':
    'Isa ni mto uliogandishwa hadi chini: msogeo wote umesimama, kila kitu kimeshikwa mahali pake. Unaashiria kusimama — mpango uliositishwa, uhusiano uliokwama, kipindi ambacho hakuna unachosukuma kinachoonekana kusonga. Hii si kushindwa; ni majira ya baridi. Acha kulazimisha kuyeyuka. Tumia utulivu kuona wazi kilicho chini ya barafu, na uhifadhi nguvu zako kwa majira ya kuchipua.',
  'rune.isa.today':
    'Acha kusukuma kitu kilichokwama leo. Kaa nacho, kiangalie wazi, na uache utulivu ufanye kazi yake.',

  'rune.jera.meaning': 'Mwaka — mavuno, mizunguko, na juhudi inayozaa matunda',
  'rune.jera.keywords': 'Mavuno · Mizunguko · Wakati sahihi',
  'rune.jera.up':
    'Jera ni mwaka unaozunguka: mbegu, ukuaji, mavuno, mapumziko, na mbegu tena. Unaashiria nukta ambapo juhudi ya awali hatimaye inazaa — si kwa bahati bali kwa sababu muda wa kutosha umepita na kazi ya kutosha imefanyika. Pia inashauri subira kwa kile ambacho bado hakijaiva. Huwezi kuharakisha msimu. Tunza ulichopanda, na uvune kilichotayari.',
  'rune.jera.today':
    'Kusanya kitu ulichopanda muda uliopita — kimalize, kiweke akiba, au uone tu kwamba kilifanya kazi.',

  'rune.eihwaz.meaning': 'Mti wa yew — mhimili kati ya uhai na kifo, uvumilivu',
  'rune.eihwaz.keywords': 'Uvumilivu · Mabadiliko · Mhimili',
  'rune.eihwaz.up':
    'Eihwaz ni mti wa yew, wa kijani daima na wenye sumu, mizizi yake katika ulimwengu wa chini na kilele chake katika mwanga — nguzo inayopita katika ulimwengu. Unaashiria uvumilivu kupitia kifungu kigumu, na mabadiliko yanayoenda hadi chini kabisa. Kitu lazima kiishe ili kitu kifuatacho kiishi. Simama kama yew: wenye mizizi, usiotikisika, ulioungana na kinachokufa na kinachozaliwa.',
  'rune.eihwaz.today':
    'Kabili leo mwisho ambao umekuwa ukiuepuka — si kuulazimisha, ni kuacha tu kujifanya haufanyiki.',

  'rune.perthro.meaning': 'Kikombe cha kura — siri, bahati, na kile hatima inaficha',
  'rune.perthro.keywords': 'Siri · Bahati · Kisichoonekana',
  'rune.perthro.up':
    'Perthro ni kikombe ambacho kura zinatikiswa kutoka — wakati kabla dadu hazijaanguka, wakati matokeo yapo lakini hayawezi kuonekana. Inatawala siri, athari zilizofichwa, bahati, na sehemu za mkakati ambazo si zako kujua bado. Kitu kinaamuliwa nje ya macho. Cheza wajibu wako vizuri na uache utupaji uanguke; si kila kitu kimekusudiwa kufahamika mapema.',
  'rune.perthro.merk':
    'Ikipinduliwa, Perthro ni siri inayopaswa kubaki imezikwa ikichimbuliwa, au msongo usio na afya wa kutaka kujua matokeo. Acha kulazimisha ufunuo. Baadhi ya vitu vinaoza katika mwanga kabla ya wakati wake.',
  'rune.perthro.today':
    'Acha kitu kimoja kibaki hakijulikani leo. Fanya sehemu yako, na uache kuonyesha upya ukurasa.',

  'rune.algiz.meaning': 'Kulungu wa elk — ulinzi, na kufikia kuelekea kilicho juu',
  'rune.algiz.keywords': 'Ulinzi · Muunganiko · Msaada wa juu',
  'rune.algiz.up':
    'Algiz ni elk mwenye pembe zilizoinuliwa, na nyasi ya sedge inayokata mkono unaoishika — rune ya ulinzi, na ya kiungo kati yako na kitu kikubwa zaidi. Inaashiria ngao inayokuzunguka hivi sasa, na msaada unaopatikana juu ya kiwango chako mwenyewe ukifikia kwacho. Omba msaada. Simama wima. Kinachokulinda kiko upande wako.',
  'rune.algiz.merk':
    'Ikipinduliwa, Algiz ni ulinzi ulioshushwa au msaada uliokataliwa — kujiacha wazi mahali unapopaswa kulindwa, au kujikata kutoka msaada uliopo. Kagua ulinzi wako, na umruhusu mtu aingie.',
  'rune.algiz.today':
    'Omba msaada kwa jambo moja leo, kutoka kwa mtu au kwa nguvu iliyo juu ya cheo chako.',

  'rune.sowilo.meaning': 'Jua — ukamilifu, mafanikio, na nia inayoongoza',
  'rune.sowilo.keywords': 'Mafanikio · Ukamilifu · Nia iliyo wazi',
  'rune.sowilo.up':
    'Sowilo ni gurudumu la jua: mwanga unaorudi daima, ushindi unaotokana na nia iliyoelekezwa kwa uthabiti kwa jambo moja. Inaashiria mafanikio, afya, na nguvu ya kufafanua inayochoma ukungu. Hakuna Sowilo iliyopinduliwa — jua haliendi nyuma. Elekeza nishati yako kwa kile chenye umuhimu, iweke hapo, na tarajia matokeo yaende upande wako.',
  'rune.sowilo.today':
    'Elekeza kila kitu kwa lengo moja leo. Bila kujihakikishia, bila shabaha ya pili — ni lile moja tu, hadi giza.',

  /* --------------------------------------------------- Ætt ya Týr (17–24) */
  'rune.tiwaz.meaning': 'Týr — haki, ujasiri, na dhabihu ya hiari',
  'rune.tiwaz.keywords': 'Haki · Ujasiri · Dhabihu',
  'rune.tiwaz.up':
    'Tiwaz ni mkuki na mkono ambao Týr alimpa mbwa-mwitu ili kushika neno lake — rune ya haki, heshima, na kufanya jambo sahihi kwa gharama halisi. Inapendelea mambo ya kisheria, mapambano ya haki, na kusimama na ahadi wakati inapoacha kuwa rahisi. Jielekeze kwa kilicho kweli na ushikilie mstari. Ushindi hapa ni wa aina ambayo unaweza kuishi nayo baadaye.',
  'rune.tiwaz.merk':
    'Ikipinduliwa, Tiwaz ni ujasiri unaoshindwa, ahadi iliyoachwa, au haki iliyopotoshwa. Huenda unaepuka msimamo unaojua unapaswa kuuchukua, au unatumia nishati yako kwa pambano lisilo la uaminifu. Jielekeze upya kwa kilicho sahihi kweli, hata kama kunakugharimu ushindi.',
  'rune.tiwaz.today':
    'Shika leo ahadi iliyokuwa isiyofaa, na uchukue msimamo uliokuwa ukiukwepa.',

  'rune.berkano.meaning': 'Mti wa birch — ukuaji, ulezi, na mianzo mipya ya kimya',
  'rune.berkano.keywords': 'Ukuaji · Ulezi · Mianzo mipya',
  'rune.berkano.up':
    'Berkano ni mti wa birch, mti wa kwanza kuchipua majani baada ya barafu — rune ya ukuaji laini, uliohifadhiwa: ujauzito, mradi mpya katika awamu yake laini, uponyaji, ulezi unaoacha kitu kidogo kiwe imara. Inakuomba ulee badala ya kusukuma. Linda chipukizi jipya, lilishe, weka baridi mbali nalo, na uliache likue kwa kasi ambayo ukuaji unahitaji kweli.',
  'rune.berkano.merk':
    'Ikipinduliwa, Berkano ni ukuaji uliodumaa au ulezi ulioondolewa — kitu kipya kilichopuuzwa, fundo la kifamilia, au kujipuuza kuliovaa nguo ya ugumu. Kitu kinahitaji utunzaji ambao umekuwa ukikiacha kijitunze chenyewe. Rudi na ukilee ipasavyo.',
  'rune.berkano.today':
    'Tunza kitu kimoja kinachokua leo — mtu, mpango, au wewe mwenyewe — kwa utunzaji halisi, si nia tu.',

  'rune.ehwaz.meaning': 'Farasi — ushirika, uaminifu, na msogeo thabiti',
  'rune.ehwaz.keywords': 'Ushirika · Uaminifu · Kasi',
  'rune.ehwaz.up':
    'Ehwaz ni farasi na mpanda-farasi wakisonga kama mmoja — rune ya ushirika wa kuaminika, kazi ya timu, na maendeleo yaliyofanywa pamoja ambayo hakuna angeyafanya peke yake. Inaashiria uhusiano unaofanya kazi, au ushirikiano unaostahili kujitolea kwake. Kifungo kimejengwa juu ya uaminifu na juu ya pande zote mbili kuvuta mwelekeo mmoja. Mahali unako nacho, jitegemeze juu yake; mahali unakotaka, kuwa kwanza nusu ya kuaminika.',
  'rune.ehwaz.merk':
    'Ikipinduliwa, Ehwaz ni ushirika uliokosa mwendo — kutoaminiana, upande mmoja ukibeba mwingine, au msogeo uliokwama kwa sababu hamtaki kitu kilekile tena. Taja pale uaminifu ulipovunjika na uamue kwa uaminifu kama bado mnapanda pamoja.',
  'rune.ehwaz.today':
    'Fanya jambo moja na mtu leo badala ya peke yako, na uwe nusu inayoweza kutegemewa.',

  'rune.mannaz.meaning': 'Binadamu — nafsi, na nafsi miongoni mwa wengine',
  'rune.mannaz.keywords': 'Nafsi · Jamii · Mtazamo',
  'rune.mannaz.up':
    'Mannaz ni rune ya ubinadamu — wewe kama mtu binafsi, na wewe kama nukta moja katika wavu wa wengine. Inakuomba ujione wazi: vipawa vyako, mipaka yako, na tafakari yako katika watu waliokuzunguka. Mara nyingi inaashiria wakati wa kuhitaji wengine, au kuhitajika, au kujiona kwa uaminifu kupitia macho ya mtu mwingine. Hukuumbwa kufanya hili peke yako, na wewe pia si kitovu chake.',
  'rune.mannaz.merk':
    'Ikipinduliwa, Mannaz ni upweke, au taswira ya nafsi iliyojitenga na ukweli — iliyovimba au yenye ukali usio wa haki. Huenda umekatwa kutoka watu wako, au wewe ni mkosoaji wako mbaya zaidi. Pata mtazamo wa nje kutoka kwa mtu atakayekuwa mwaminifu na mwema.',
  'rune.mannaz.today':
    'Jione leo kupitia macho ya mtu anayekujua vizuri, na urekebishe picha pale ilipo kosa.',

  'rune.laguz.meaning': 'Maji — mtiririko, hisi-ndani, na fahamu-ndani ya kina',
  'rune.laguz.keywords': 'Mtiririko · Hisi-ndani · Kina',
  'rune.laguz.up':
    'Laguz ni ziwa na bahari: mtiririko, hisia, ndoto, na maji ya kina ya fahamu-ndani ambako vitu vinasonga ambavyo akili ya mchana haiwezi kuona. Inapendelea kuamini hisia ya tumbo kuliko lahajedwali, kwenda na mkondo badala ya kupinga, na kuzingatia kile ndoto na hali zako za moyo zinakuambia. Wimbi linajua linakoenda. Kwa sasa, liache likubebe.',
  'rune.laguz.merk':
    'Ikipinduliwa, Laguz ni mafuriko, au kuvutwa chini ya maji — kulemewa na hisia, kuepuka jambo kwa kuelea, au hisi-ndani iliyochachuka kuwa hofu au njozi. Weka miguu yako ardhini. Si kila mkondo unastahili kufuatwa, na si kila wimbi ni onyo.',
  'rune.laguz.today':
    'Amini leo usomaji wa tumbo kuliko hoja ya werevu, na uzingatie unachoota usiku huu.',

  'rune.ingwaz.meaning': 'Ing — kutungwa, uwezo uliohifadhiwa, mzunguko uliokamilika',
  'rune.ingwaz.keywords': 'Kutungwa · Uwezo · Ukamilifu',
  'rune.ingwaz.up':
    'Ingwaz ni mbegu iliyofungwa ardhini katika majira ya baridi — uwezo uliozuiliwa katika chombo kilichofungwa, ukifanya kazi yake nje ya macho hadi uwe tayari kuachiliwa kwa mara moja. Inaashiria mwisho wa kutungwa: mradi, uamuzi, au mchakato wa ndani uliokuwa ukipika kimya karibu utakamilika. Usifungue sanduku mapema. Ukikamilika, utakamilika kwa usafi, na utahisi faraja yake.',
  'rune.ingwaz.today':
    'Acha leo kile kilicho karibu tayari kikamilike kwa wakati wake mwenyewe. Acha kukichokoa.',

  'rune.dagaz.meaning': 'Siku — mafanikio makubwa, kuamka, mgeuko kutoka giza hadi mwanga',
  'rune.dagaz.keywords': 'Mafanikio makubwa · Kuamka · Nukta ya mgeuko',
  'rune.dagaz.up':
    'Dagaz ni mapambazuko: bawaba kati ya usiku na mchana, wakati mwanga unaporudi na kila kitu kinaonekana tofauti. Inaashiria mafanikio makubwa — utambuzi, badiliko la moyo, hali inayogeuka kutoka kukwama hadi kusonga kwa mara moja. Hakuna Dagaz iliyopinduliwa; mapambazuko hayatokutokea. Kitu ulichokuwa gizani kuhusu karibu kitakuwa dhahiri. Kuwa tayari kukitendea.',
  'rune.dagaz.today':
    'Tendea utambuzi leo, wakati bado ung’aa. Ufahamu unafifia ukilala juu yake kwa muda mrefu mno.',

  'rune.othala.meaning': 'Shamba la ukoo — urithi, asili, na kile ambacho ni chako kweli',
  'rune.othala.keywords': 'Asili · Nyumbani · Kinachodumu',
  'rune.othala.up':
    'Othala ni ardhi ya mababu: kile unachorithi, kile unachokuwa cha kwake, na vitu visivyoweza kuchukuliwa kwa sababu vimefumwa katika wewe ni nani. Inaashiria maswali ya nyumbani, familia, mapokeo na urithi — kile cha kuweka kutoka unakotoka, na kile cha kuacha nyuma. Dai kile ambacho ni chako kweli. Kitunze. Na uwe mwaminifu kuhusu urithi upi ni zawadi na upi ni uzito wa zamani tu.',
  'rune.othala.merk':
    'Ikipinduliwa, Othala ni urithi mbaya unaoshikiliwa kwa nguvu, au kutokuwa na mizizi kusikotulia — mikakati ya zamani ya familia kwenye kiendeshi-chenyewe, au kukataa kuwa wa mahali popote. Panga vitu vya urithi. Weka kinachohudumia baadaye; kilichobaki, kipe mazishi ya heshima.',
  'rune.othala.today':
    'Weka leo kitu kimoja kutoka unakotoka, na kwa makusudi uweke chini kitu kimoja unachobeba kwa mazoea.',
} as const
