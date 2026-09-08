import type { DeepReadingKey } from '../en/deepReading'

/**
 * Kiswahili — usomaji wa kina, mrefu: Horoskopu Kamili ya kulipia na mapitio ya
 * kina ya Ulinganifu. Imeandikwa isomeke kama ukurasa mmoja au miwili kutoka
 * kwa mnajimu halisi. Inahitaji ukaguzi wa mzungumzaji asilia.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- horoskopu ya kila siku (bure): kina kidogo zaidi kwa kila dokezo ---- */
  'horo.deep.q.house': 'Inaangukia katika eneo la {theme}.',
  'horo.deep.q.hard': 'Sogea kwa uangalifu na hili.',
  'horo.deep.q.soft': 'Inastahili hatua ndogo, ya makusudi.',
  'horo.deep.q.neutral': 'Iache itulie kabla ya kutenda.',
  'horo.deep.q.thread':
    'Uzi wa leo unarudi tena na tena kwa {focus} yako — hapo ndipo pa kuweka usikivu.',
  'scr.horo.weekHead': 'Upinde mkubwa zaidi',

  /* ============================ HOROSKOPU KAMILI ============================ */

  /* -- maana ya kila sayari inapokuwa nguvu YENYE KUPITA (inayosonga) -- */
  'dh.tr.Sun':
    'Jua linasukuma siku: popote linapokwenda linaangaza mwanga hapo kwa takriban mwezi mmoja, likipasha joto sehemu hiyo ya chati na kukuomba ujitokeze humo kama wewe mwenyewe.',
  'dh.tr.Moon':
    'Mwezi ni mwili wa haraka zaidi angani; kupita kwake ni kufupi lakini kunaweka mdundo wa hisia wa siku na kuchochea kile unachogusa kuja juu.',
  'dh.tr.Mercury':
    'Zebaki inatawala kufikiri, kuzungumza, na maamuzi madogo yanayojumlika. Kupita kwake kunaharakisha msongamano wa taarifa kuhusu jambo — mazungumzo, ujumbe, karatasi, kufikiri upya.',
  'dh.tr.Venus':
    'Zuhura inatawala mvuto, starehe, pesa na ladha. Inapopita nukta hutamu ardhi hapo na kufanya muunganiko, matumizi na furaha vije kwa urahisi zaidi.',
  'dh.tr.Mars':
    'Mirihi ni msukumo na joto ghafi. Kupita kwake huwasha moto chini ya kile inachogusa — unapata ujasiri zaidi na msuguano zaidi katika kifurushi kimoja, na hamu ya kutenda kabla hujafikiria kikamilifu.',
  'dh.tr.Jupiter':
    'Mshtarii ni sayari ya ukuaji na «zaidi». Inapanua kile inachogusa — fursa, kujiamini, hamu, na mara kwa mara pita kiasi — na huelekea kufanya mlango wa eneo hilo la maisha ufunguke zaidi kwa takriban mwaka mmoja.',
  'dh.tr.Saturn':
    'Zohali ni wakati, muundo na matokeo. Inapokwenda hupunguza kasi ya mambo na kuuliza kama ulichojenga hapo kinaweza kubeba uzito; kinachoweza, inakiimarisha, na kisichoweza, inakivunja kimya ili ukijenge upya vizuri.',
  'dh.tr.Uranus':
    'Uranus ni mvurugaji. Kupita kwake kunavunja mkakati uliokuwa mchakavu — mara nyingi kupitia mshangao, kutotulia kwa ghafla, au mabadiliko usiyoyapanga — na kunakurudishia uhuru fulani uliokuwa umesaini kuutoa.',
  'dh.tr.Neptune':
    'Neptune huyeyusha kingo. Inapopita, mistari inakuwa laini: mawazo na huruma zaidi, lakini pia mkanganyiko zaidi, na mvuto wa kukimbia badala ya kukabiliana na jambo moja kwa moja.',
  'dh.tr.Pluto':
    'Pluto hufanya kazi chini ya ardhi na haina haraka. Kupita kwake huleta mabadiliko ya polepole, ya kina kwa kile inachogusa — mivutano ya madaraka, miisho, na kupua hadi kile ambacho kwa kweli ni cha lazima.',

  /* -- kile nukta yako YA KUZALIWA inatawala katika chati yako mwenyewe -- */
  'dh.na.Sun':
    'utambulisho wako wa msingi, uhai wako, na hisia ya wewe ni nani unapokuwa wewe mwenyewe zaidi',
  'dh.na.Moon':
    'silika zako, hali zako za moyo, na kile unachohitaji ili kujisikia salama na kushikiliwa',
  'dh.na.Mercury':
    'jinsi unavyofikiri, kujifunza, kuzungumza na kufanya maamuzi ya kila siku',
  'dh.na.Venus':
    'jinsi unavyopenda na kupendwa, kile unachokiona kizuri, na uhusiano wako na pesa na raha',
  'dh.na.Mars':
    'msukumo wako, hasira yako, tamaa yako, na jinsi unavyofuatilia unachokitaka',
  'dh.na.Jupiter':
    'wapi unatafuta maana na ukuaji, na hisia yako ya asili ya imani na uwezekano',
  'dh.na.Saturn':
    'uhusiano wako na nidhamu, mamlaka na mipaka — mahali ambapo umelazimika kukua kwa njia ngumu',
  'dh.na.Uranus':
    'hitaji lako la kuwa huru na kufanya mambo kwa njia yako mwenyewe',
  'dh.na.Neptune':
    'mawazo yako, kiroho chako, na maeneo ambapo unaelekea kupamba au kujipoteza',
  'dh.na.Pluto':
    'uhusiano wako na madaraka na udhibiti, na kile ndani yako kilichoumbwa kubadilishwa',

  /* -- asili ya kila mtazamo (aina mbili, zinazobadilishana kwa sehemu) -- */
  'dh.asp.nat.conjunction.0':
    'Muungano ni kuungana. Nguvu mbili zinachukua nyuzi ileile na kutenda kama moja, zikianza mzunguko mpya katika eneo hili la maisha yako — mbegu inayopandwa, si mavuno yanayovunwa.',
  'dh.asp.nat.conjunction.1':
    'Muungano huunganisha nishati mbili kabisa kiasi kwamba ni vigumu kuzitofautisha. Unaashiria mwanzo; kinachochukua umbo sasa kitajitokeza kwa miaka inayofuata.',
  'dh.asp.nat.opposition.0':
    'Upinzani hufanya kazi kupitia kioo cha watu wengine na mazingira ya nje. Mvutano ni halisi, lakini upo ili kukuletea ufahamu — unaona jambo wazi kwa sababu kitu kinasimama mbele yake.',
  'dh.asp.nat.opposition.1':
    'Upinzani unakuvuta kati ya nguzo mbili na kukuomba ushikilie zote badala ya kuporomoka katika moja. Uwiano hapa si maelewano; ni ustadi unaoujenga chini ya shinikizo.',
  'dh.asp.nat.square.0':
    'Mraba ni mtazamo wa msuguano. Nishati mbili zinataka vitu tofauti na zinaendelea kunaswana, na usumbufu ndio hoja — ni mchanga unaolazimisha mabadiliko halisi badala ya ya kupamba tu.',
  'dh.asp.nat.square.1':
    'Mraba unaweka kizuizi barabarani hasa mahali usingependa kukabiliana nacho. Kusukuma moja kwa moja mara chache hufanya kazi; njia ya kupita kwa kawaida ni kubadili mkabala, si kujitahidi zaidi.',
  'dh.asp.nat.trine.0':
    'Pembe-tatu ni njia iliyo wazi. Nishati mbili zinashirikiana bila kuombwa, na msaada unatiririka kwako hapa — lakini unakufikia tu ukisonga kweli kuelekea kwake.',
  'dh.asp.nat.trine.1':
    'Pembe-tatu hufanya eneo hili la maisha lijisikie rahisi na la asili kwa muda. Hatari ni kuridhika; urahisi usioutumia huelekea kutoweka kimya.',
  'dh.asp.nat.sextile.0':
    'Sekstaili ni fursa ambayo lazima uikubali kwa makusudi. Mlango haujafungwa lakini haujafunguka — kitendo kidogo, cha makusudi sasa hubadili uwezekano kuwa kitu halisi.',
  'dh.asp.nat.sextile.1':
    'Sekstaili inatoa mwanya wa msaada katika sehemu hii ya maisha yako. Inatuza uanzilishi na haifanyi lolote kwa kusubiri.',

  /* -- kishazi kifupi cha kitenzi kwa ufunguzi wa sehemu -- */
  'dh.asp.verb.conjunction': 'inakutana na kuungana na',
  'dh.asp.verb.opposition': 'inavuta dhidi ya',
  'dh.asp.verb.square': 'inasugua dhidi ya',
  'dh.asp.verb.trine': 'inatiririka kuelekea',
  'dh.asp.verb.sextile': 'inafungua mlango kuelekea',

  /* -- jinsi nishati inavyojidhihirisha katika ishara ambayo nukta ya kuzaliwa iko -- */
  'dh.sign.Aries':
    'ya haraka, ya moja kwa moja na yenye ugomvi kidogo, yenye kuelekea kutenda kuliko kusubiri',
  'dh.sign.Taurus':
    'ya polepole, ya hisia na yenye ukaidi, inayopinga kuharakishwa na ya polepole kuachilia',
  'dh.sign.Gemini':
    'yenye udadisi na maneno, ya haraka kuunganisha mawazo na ya haraka kutotulia',
  'dh.sign.Cancer':
    'nyororo na yenye kulinda, ikiongoza kwa hisia kabla ya mantiki',
  'dh.sign.Leo':
    'yenye joto, yenye kujieleza na yenye kiburi, inayohitaji kuonwa ili kujisikia halisi',
  'dh.sign.Virgo':
    'sahihi na ya vitendo, yenye furaha zaidi inapoweza kuwa na manufaa kweli',
  'dh.sign.Libra':
    'yenye kuelekea uwiano, haki na uandamano mzuri, na yenye kuchukia sinema',
  'dh.sign.Scorpio':
    'kali na ya siri, yote au hakuna, na yenye kuvutwa na kilichofichwa',
  'dh.sign.Sagittarius':
    'isiyotulia kwa nafasi, maana na mtazamo mpana, na isiyo na subira na maandishi madogo',
  'dh.sign.Capricorn':
    'nzito na yenye kujidhibiti, yenye kuvutiwa na matokeo kuliko na ahadi',
  'dh.sign.Aquarius':
    'huru na inayoelekea baadaye, ikifikiri katika mifumo kuliko katika hisia',
  'dh.sign.Pisces':
    'yenye ndoto, yenye kupenyeza na yenye huruma, na inayolemewa kwa urahisi',

  /* -- kile kupita kupitia kila nyumba huelekea kuchochea -- */
  'dh.house.1':
    'Katika nyumba ya kwanza, kazi inaonekana juu yako — mwili wako, taswira yako, hisia ya kwanza unayotoa. Ni kipindi kizuri cha kuchora upya jinsi unavyojitokeza badala ya kushikilia muhtasari usiokufaa tena.',
  'dh.house.2':
    'Katika nyumba ya pili, inagusa pesa, rasilimali na thamani binafsi. Swali la nje ni unachopata na kumiliki; la ndani ni unachoamini unastahili.',
  'dh.house.3':
    'Katika nyumba ya tatu, inachochea akili ya kila siku — mazungumzo, safari fupi, ndugu na majirani, ubadilishanaji mdogo usio na mwisho wa taarifa. Zingatia unachoendelea kujiambia.',
  'dh.house.4':
    'Katika nyumba ya nne, inafikia mizizi — nyumbani, familia, siku zako za nyuma, na msingi binafsi unaorudia. Kitu katika msingi wako kinachunguzwa.',
  'dh.house.5':
    'Katika nyumba ya tano, inagusa mchezo, mapenzi, ubunifu na vitu unavyotengeneza kwa furaha yake. Inauliza cheche yako ilikwenda wapi na jinsi ya kuirudisha.',
  'dh.house.6':
    'Katika nyumba ya sita, inafanya kazi kupitia utaratibu, afya, na kazi ya kila siku ya kukuweka wewe na kazi yako mkiendelea. Tabia ndogo zina uzito zaidi ya kawaida sasa.',
  'dh.house.7':
    'Katika nyumba ya saba, kioo ni watu wengine — wapenzi, wa karibu, mtu aliye upande mwingine wa meza. Unachokutana nacho ndani yao mara nyingi ni chako mwenyewe usichokitazama moja kwa moja.',
  'dh.house.8':
    'Katika nyumba ya nane, inakwenda kwa maji ya kina — pesa za pamoja, urafiki wa karibu, madaraka, na kile kinachoisha. Hapa si eneo la mazungumzo mepesi; kitu kinabadilishwa kwenye mzizi.',
  'dh.house.9':
    'Katika nyumba ya tisa, inafungua mtazamo mpana zaidi — imani, masomo, safari, na utafutaji wa maana. Hisia yako ya kwa ajili ya nini yote haya inanyooshwa.',
  'dh.house.10':
    'Katika nyumba ya kumi, ni ya hadhara — kazi, sifa, msimamo wako, na nafasi unayocheza duniani. Kile unachojulikana kwacho kiko kwa marekebisho.',
  'dh.house.11':
    'Katika nyumba ya kumi na moja, inagusa urafiki, jamii, na baadaye unayoifikia. Uandamano unaouweka na malengo unayoyashikilia yanapangwa.',
  'dh.house.12':
    'Katika nyumba ya kumi na mbili, inafanya kazi nyuma ya pazia — mapumziko, upweke, fahamu-ndani, na kile ulichokibeba bila kukiita jina. Hii ni kazi ya kimya, inayoelekea ndani.',

  /* -- «katika maisha ya kila siku hili linaweza kuonekana kama…» (kubadilishana kwa mtazamo) -- */
  'dh.life.conjunction.0':
    'Katika maisha ya kila siku, hili linaweza kuhisi kama mwanzo mpya usiouchagua kabisa — masharti mapya, sura mpya ikifunguka katika eneo hili, ukijisikia tayari au la.',
  'dh.life.conjunction.1':
    'Siku hadi siku, linaweza kufika kama shauku mpya kali, mtu anayebadili fremu, au tu hisia kwamba toleo la zamani la hili limeisha.',
  'dh.life.conjunction.2':
    'Kwa vitendo, mara nyingi linajitokeza kama kizingiti — uamuzi, kuhama, ahadi inayoweka saa upya katika sehemu hii ya maisha yako.',
  'dh.life.opposition.0':
    'Katika maisha ya kila siku, hili mara nyingi hujitokeza kupitia mtu mwingine — kutokubaliana, dai, au mtu anayebeba hasa kile unachopambana nacho.',
  'dh.life.opposition.1':
    'Siku hadi siku, linaweza kuhisi kama kunaswa kati ya mahitaji mawili halali — lako na la mtu mwingine, au sehemu mbili za maisha yako yenyewe zisizoweza kutoshea zote.',
  'dh.life.opposition.2':
    'Kwa vitendo, linaelekea kuleta mambo kileleni: mazungumzo usioweza kuyaahirisha tena, chaguo ambalo limekuwa likikusubiri ulifanye.',
  'dh.life.square.0':
    'Katika maisha ya kila siku, hili linaweza kuonekana kama mpango unaoendelea kukwama, mtu anayeendelea kubonyeza kitufe kilekile, au kazi inayohisi nzito kuliko inavyostahili.',
  'dh.life.square.1':
    'Siku hadi siku, mara nyingi linafika kama kero — juhudi isiyogeuka kuwa kitu, ukuta mahali ulipotarajia mlango.',
  'dh.life.square.2':
    'Kwa vitendo, linajitokeza kama shinikizo lisilokuacha uteleze: kile ulichokuwa ukikiepuka sasa kiko barabarani.',
  'dh.life.trine.0':
    'Katika maisha ya kila siku, hili linaweza kuhisi kama mfululizo wa taa ndogo za kijani — msaada unaofika, wakati unaofanya kazi, ndiyo mahali ulipojiandaa kwa hapana.',
  'dh.life.trine.1':
    'Siku hadi siku, mara nyingi linajitokeza kama urahisi na mtiririko katika eneo hili, na kishawishi cha kudhani daima litakuwa rahisi hivi.',
  'dh.life.trine.2':
    'Kwa vitendo, ni dirisha zuri — utambulisho unashika, maombi yanapata mapokezi ya joto, njia iko wazi kwa muda mfupi.',
  'dh.life.sextile.0':
    'Katika maisha ya kila siku, hili linaweza kuonekana kama mwanya unaokaribia kuukosa — toleo, mkutano wa bahati, mlango mdogo unaobaki wazi tu ukiupitia sasa.',
  'dh.life.sextile.1':
    'Siku hadi siku, linaelekea kumtuza yule anayefanya hatua ya kwanza: tuma ujumbe, uliza swali, weka jina lako mbele.',
  'dh.life.sextile.2':
    'Kwa vitendo, ni fursa ya gharama ndogo — si ya kutisha, lakini inastahili kutendewa wakati bado iko hapa.',

  /* -- mwaliko wa kina zaidi wa mtazamo (kubadilishana) -- */
  'dh.invite.conjunction.0':
    'Mwaliko ni kupanda kwa makusudi. Unachoanza sasa, hata kikiwa kidogo, ni mbegu ya kitu ambacho bado utakuwa ukiishi nacho miaka kutoka sasa — hivyo kichague kwa makusudi.',
  'dh.invite.conjunction.1':
    'Kazi ya kina zaidi ni kuachilia umbo la zamani la hili kwa usafi, bila kulikokota nusu-hai hadi sura mpya.',
  'dh.invite.conjunction.2':
    'Kile hili kinachoomba kweli ni ndiyo wazi au hapana wazi. Kusitasita ndio jibu pekee linaloharibu dirisha.',
  'dh.invite.opposition.0':
    'Mwaliko si kushinda. Ni kushikilia pande zote mbili muda wa kutosha kupata chaguo la tatu linaloheshimu kilicho kweli katika kila moja.',
  'dh.invite.opposition.1':
    'Kazi ya kina zaidi ni kurudisha sehemu ya hili uliyokuwa ukiiweka kwa mtu mwingine — nguvu, hitaji, au lawama.',
  'dh.invite.opposition.2':
    'Kile hili kinachoomba ni ufahamu wa uaminifu. Ukishauona mkakati kweli, hauko tena ndani yake.',
  'dh.invite.square.0':
    'Mwaliko si kusukuma kwa nguvu zaidi. Ni kutambua kile ulichokikua kupita hapa na kuacha msuguano ukivunje, ili kitu kilicho imara zaidi kiweze kujengwa.',
  'dh.invite.square.1':
    'Kazi ya kina zaidi ni mabadiliko ya mbinu. Lengo linaweza kuwa sawa; jinsi ulivyokuwa ukilifuatilia ndilo linalozalisha upinzani.',
  'dh.invite.square.2':
    'Kile hili kinachoomba kweli ni ukomavu mahali maalum — kufanya jambo lisilo la kuvutia, la kimuundo ulilotumaini ungeliruka.',
  'dh.invite.trine.0':
    'Mwaliko ni kutumia urahisi, si kufurahia tu. Msaada usiotumika huelekea kutoweka kimya.',
  'dh.invite.trine.1':
    'Kazi ya kina zaidi ni kujenga kitu wakati wa utulivu ambacho kitashikilia hali ya hewa itakapogeuka tena.',
  'dh.invite.trine.2':
    'Kile hili kinachoomba ni kwamba useme ndiyo kwa msaada — kubali utambulisho, chukua njia ya mkato, iache iwe rahisi kwa mara moja.',
  'dh.invite.sextile.0':
    'Mwaliko ni uanzilishi. Huu ni mlango ulioachwa haujafungwa; unafunguka tu ukisukuma.',
  'dh.invite.sextile.1':
    'Kazi ya kina zaidi ni kutambua fursa ndogo unazojizuia kwa mazoea, na kuchukua moja.',
  'dh.invite.sextile.2':
    'Kile hili kinachoomba ni kitendo cha kiasi, halisi cha ujasiri — si cha kutisha, ni hatua tu ambayo ungependa kuiahirisha.',

  /* -- mwongozo halisi (kubadilishana) -- */
  'dh.do.conjunction.0':
    'Ipe mwanzo safi: taja kinachoanza, kiweke alama kwa namna fulani, na usijaze wiki za kwanza na masalia ya toleo la zamani.',
  'dh.do.conjunction.1':
    'Sogea kwa makusudi kuliko kwa haraka. Muungano huweka mzunguko mrefu katika mwendo; mdundo unaouweka sasa huelekea kukaa.',
  'dh.do.conjunction.2':
    'Amua. Sema ndiyo au hapana kwa sauti mbele ya angalau mtu mwingine mmoja ili iwe halisi.',
  'dh.do.opposition.0':
    'Fanya mazungumzo unayoyazunguka, na uingie kusikiliza. Upande mwingine unabeba taarifa unayoihitaji.',
  'dh.do.opposition.1':
    'Andika misimamo yote miwili kana kwamba ilibidi utetee kila moja kwa haki. Nukta ya uwiano kwa kawaida hujionesha kwenye karatasi.',
  'dh.do.opposition.2':
    'Usilazimishe suluhisho leo. Acha mvutano ukae hadi chaguo la tatu litakapojitokeza lenyewe.',
  'dh.do.square.0':
    'Usijitoe wala kusaini chini ya shinikizo. Acha kinachopinga kikuoneshe pale muundo ulipo mwembamba, na ukiimarishe hapo kwanza.',
  'dh.do.square.1':
    'Badili jambo moja kuhusu mkabala wako na ujaribu tena. Juhudi ileile, pembe tofauti.',
  'dh.do.square.2':
    'Fanya kazi ya kuchosha, ya kimuundo unayoendelea kuiahirisha. Hiyo ndiyo kazi nzima.',
  'dh.do.trine.0':
    'Chukua hatua halisi wakati mlango uko wazi — ujumbe, buking, rasimu ya kwanza. Urahisi hufifia ukiuvutia tu.',
  'dh.do.trine.1':
    'Omba kile kitu. Hili ndilo dirisha ambapo ndiyo ina uwezekano mkubwa zaidi.',
  'dh.do.trine.2':
    'Jenga sasa. Tumia utulivu kuweka msingi utakaofurahia baadaye.',
  'dh.do.sextile.0':
    'Fanya hatua ya kwanza leo, si wiki ijayo. Ituma, iulize, weka jina lako.',
  'dh.do.sextile.1':
    'Sema ndiyo kwa toleo dogo hata likionekana dogo. Haya yanajumlika.',
  'dh.do.sextile.2':
    'Chagua fursa ile moja ambayo kwa kawaida ungeiahirisha, na uitendee kabla ya siku kuisha.',

  /* -- lugha ya wakati (kubadilishana kwa hali) -- */
  'dh.time.peak.0':
    'Iko karibu na sahihi na bado inakaza, hivyo hili linafikia kilele ndani ya siku moja au mbili kisha kuanza kupungua.',
  'dh.time.peak.1':
    'Mgusano ni karibu sahihi hivi sasa — hii ndiyo sauti kubwa zaidi inayofikia, na ukali unashuka mara tu baadaye.',
  'dh.time.peak.2':
    'Hili liko kwenye au karibu na nyuzi yake sahihi, na ndiyo maana linaomba usikivu wako mwingi kwa mara moja.',
  'dh.time.build.0':
    'Bado linajijenga. Mada inakuwa kubwa zaidi katika siku zijazo kabla ya kugeuka.',
  'dh.time.build.1':
    'Hili halijafikia nguvu kamili bado; tarajia liendelee kupanda kwa muda kabla ya kufikia kilele.',
  'dh.time.build.2':
    'Uko kwenye mteremko wa mapema wa hili. Kinachosomeka sasa kama ishara hafifu huwa kisichokosea ndani ya wiki moja hivi.',
  'dh.time.fade.0':
    'Limepita sahihi punde tu — ukingo mkali zaidi tayari umepita na shinikizo linaachilia.',
  'dh.time.fade.1':
    'Kilele cha hili sasa kiko nyuma yako. Kilichobaki ni kuunganisha, si mgogoro.',
  'dh.time.fade.2':
    'Mgusano huu unatoka. Unafanya usafi baada yake badala ya kupitia mbaya zaidi wake.',

  'dh.retro':
    ' Kwa kuwa iko nyuma, hii ni mapitio kuliko safari ya kwanza — unapita tena juu ya ardhi uliyoipitia awali, safari hii ili kuifanya sawa.',

  /* -- violezo vya kuunganisha sehemu -- */
  'dh.sec.open':
    '{tr} Hivi sasa {verb} {target} — sehemu yako inayotawala {na}.',
  'dh.sec.sign':
    '{target} yako ya kuzaliwa iko katika {sign} — {signFlavour} — jambo linalounda jinsi jambo zima linavyokutua.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- muhtasari: aya tatu fupi -- */
  'dh.ov.lead':
    'Usomaji huu umetolewa kutoka mahali sayari zilipo kweli leo, ukiwekwa mbele ya chati yako ya kuzaliwa — hivyo unahusu anga lako, si anga kwa jumla.',
  'dh.ov.head':
    'Kitovu cha uzito hivi sasa ni {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Hali ya hewa kwa jumla ni nzuri: miguso rahisi inauzito wazi kuliko ile migumu. Hiki ni kipindi cha kufikia kitu badala ya kujizuia dhidi yake — njia kuu ya kukipoteza ni kukaa tuli.',
  'dh.ov.weather.friction':
    'Hali ya hewa kwa jumla ni yenye kudai. Kuna msuguano zaidi ya mtiririko katika mchanganyiko, na mambo kadhaa yanataka kukabiliwa uso kwa uso badala ya kutamaniwa yaondoke. Hakuna lolote la maafa; ni awamu ya kujenga, na awamu za kujenga zinahisi kama juhudi.',
  'dh.ov.weather.intense':
    'Hali ya hewa kwa jumla ni nzito na iliyokolea. Sayari zinazosonga polepole zimekaa moja kwa moja juu ya chati yako, na sauti imepandishwa kwa kila kitu wanachogusa. Jipangie kasi — hiki ni kipindi cha marathoni, si mbio fupi.',
  'dh.ov.weather.mixed':
    'Hali ya hewa kwa jumla imechanganyika — msaada halisi na msuguano halisi ndani ya dirisha lilelile. Kazi ya kipindi hiki ni kuchagua wapi kujitumia na wapi kujizuia.',
  'dh.ov.weather.quiet':
    'Hali ya hewa kwa jumla iko kimya. Hakuna sayari inayoshinikiza kwa nguvu chati yako, jambo linalofanya kiwe kipindi adimu cha kuweka ratiba na kasi yako mwenyewe bila anga kubishana.',
  'dh.ov.tempo.fast':
    'Mwendo ni wa haraka — miguso imekaza na inasonga, hivyo mada zinafika na kupita ndani ya siku. Baki mwenye kuitikia badala ya kujaribu kupanga jambo zima mapema.',
  'dh.ov.tempo.building':
    'Mwendo unajijenga polepole. Mada kuu bado zinakusanya nguvu, hivyo kinachohisi kama dokezo sasa kitakuwa kisichokosea ndani ya wiki moja au mbili.',
  'dh.ov.tempo.slow':
    'Mwendo ni wa polepole na wa kimuundo. Miguso mikubwa hapa hujitokeza kwa miezi, si siku; fikiria kwa misimu na usitarajie hukumu ya mara moja usiku.',
  'dh.ov.tempo.settling':
    'Mwendo unatulia — miguso mikali zaidi imepita kilele chake punde, hivyo hili linahusu zaidi kuunganisha kilichotokea tayari kuliko kujizatiti kwa kinachokuja.',

  /* -- aya ya Mwezi, iliyopanuliwa -- */
  'dh.moon.lead': 'Hali yako ya hewa ya hisia',
  'dh.moon.body':
    'Mwezi unapita katika {sign} — {mood} — na ni {phase} kwa mwanga wa {pct}%. {phaseNote} Acha hali yako ya moyo iwe taarifa kuliko hukumu: inakuambia jinsi kipande hiki cha anga kinavyohisi kutoka ndani.',

  /* -- nyuzi: kinachoendelea kujirudia -- */
  'scr.horo.threadsHead': 'Nyuzi zinazounganisha',
  'dh.th.house':
    'Nyumba yako ya {ord} inaendelea kujitokeza. Chochote kingine kinachoendelea, {houseThemeLower} ndicho chumba unachoombwa kutumia muda ndani yake kipindi hiki.',
  'dh.th.planet':
    '{planet} yako ya kuzaliwa inafanyiwa kazi kutoka pembe zaidi ya moja kwa wakati mmoja. Kwa kuwa inashikilia {na}, tarajia kuwa noti inayojirudia badala ya ya mara moja.',
  'dh.th.bal.friction':
    'Na mizani inaegemea msuguano. Si bahati mbaya — ndivyo awamu ya ukuaji inavyohisi kutoka ndani. Juhudi ndiyo kazi.',
  'dh.th.bal.supportive':
    'Na mizani inaegemea mtiririko. Miguso ya msaada inazidi ile migumu kwa idadi, hivyo milango iko wazi kweli — njia pekee ya kupoteza hilo ni kutopita hata mmoja.',
  'dh.th.bal.mixed':
    'Na mizani imegawanyika kweli. Baadhi ya hili linakusaidia na baadhi linakupinga, mara nyingi siku ileile, hivyo utambuzi una umuhimu zaidi ya nishati hivi sasa.',
  'dh.th.solo':
    'Miguso imetawanyika katika chati yako badala ya kurundikana juu ya nukta moja, hivyo hili linasomeka kama kipindi cha aina mbalimbali kuliko hadithi moja inayotawala.',

  /* -- ramani ya wakati -- */
  'scr.horo.timingHead': 'Jinsi hili linavyojitokeza',
  'dh.tm.tight':
    'Zinakaza kuelekea sahihi: {list}. Hizi ndizo sauti kubwa zaidi katika anga lako hivi sasa na zitafikia kilele ndani ya siku.',
  'dh.tm.fade':
    'Zimepita kilele chake na zinafifia: {list}. Somo katika hizi kwa kiasi kikubwa limetua — unaunganisha sasa, hujizatiti.',
  'dh.tm.none':
    'Hakuna kitu kilichokaa moja kwa moja kwenye sahihi kwa sasa, jambo ambalo ni sehemu ya kwa nini kipindi kinahisi wazi zaidi kuliko chenye ncha.',

  /* -- upinde wa kufunga -- */
  'dh.cl.protect':
    'Upinde mkubwa zaidi unakuomba ulinde {focus} yako kupitia kipindi hiki. Ahadi chache, usiku wa mapema, na ruhusa ya kuwa upatikane kidogo kuliko kawaida — utapata zaidi kwa kulinda nishati yako kuliko kwa kuitumia. Huu ni msimu wa kutunza ardhi, si wa kulazimisha mavuno.',
  'dh.cl.use':
    'Upinde mkubwa zaidi ni dirisha lililo wazi kuzunguka {focus} yako, na madirisha kama haya hayabaki wazi muda mrefu. Lielekeze kwa jambo moja linalokujali kweli na uweke uzito halisi nyuma yake sasa, wakati anga linasaidia badala ya kupinga.',
  'dh.cl.steady':
    'Upinde mkubwa zaidi unaomba uthabiti. Shikilia taratibu zako, shikilia neno lako kwako mwenyewe, na acha kelele ipite bila kufukuza kila kipande. Si kila kupita kunahitaji jibu; baadhi yanahitaji tu kuvumiliwa hadi mwisho.',

  /* ======================= ULINGANIFU — WA KINA ======================= */

  'syn.deep.patternLead': 'Kile kifungo hiki kinachotumia',
  'syn.deep.pattern.emotional':
    'Katika kiini chake, huu ni muunganiko wa hisia. Miezi na Zuhura vinabeba sehemu kubwa ya uzito kati yenu, jambo linalofanya kifungo kuwa cha joto, cha silika na cha haraka kuoanisha — na maana yake ni kwamba ni hali za moyo, si mabishano, zinazoweka joto. Mkiwa nyote wawili imara, ni laini na rahisi na nyumbani inahisi kama nyumbani haraka. Mmoja wenu asipokuwa sawa, mwingine anajua ndani ya dakika, likisemwa neno au la. Matokeo ya vitendo ni kwamba kuutunza hali yako ya ndani si tofauti na kuutunza uhusiano; ni kazi ileile. Jifunze kutaja hisia mapema, kabla haijawa hali ya hewa, na muunganiko huu utashikilia karibu chochote.',
  'syn.deep.pattern.mental':
    'Katika kiini chake, huu ni mkutano wa akili. Mnaunganika kwanza kupitia maneno, mawazo, udadisi na furaha ya kueleweka haraka, na cheche inabaki imewaka kwa muda hasa ule mazungumzo yanapodumu. Hiyo ni nguvu halisi — hamtachoshana kamwe, na mnatatua matatizo vizuri kama wawili. Hatari ni ya hila zaidi: inawezekana kuchanganya mazungumzo mazuri na urafiki wa karibu na kuishi kidogo juu ya shingo, mkibadilishana mawazo huku safu ya hisia ikibaki bila kutunzwa. Tengeneza nafasi kwa sehemu za ukaribu zisizo za maneno — kimya cha pamoja, chakula, kazi iliyofanywa bega kwa bega — na muunganiko wa akili unakuwa msingi badala ya mbadala.',
  'syn.deep.pattern.physical':
    'Katika kiini chake, huu ni muunganiko wa msukumo na mwili. Mirihi na Jua vinafanya kazi nzito, hivyo kuna kemia halisi na kasi halisi hapa — mnapeana nishati, mnasababisha mambo yatokee mkiwa pamoja, na mnafanya kazi vizuri kama timu wakati kuna kazi ya kufanya. Waya uleule unamaanisha mnaweza kukwaza kila mmoja kwa haraka vilevile; ushindani na hasira ni upande wa kivuli wa mvuto. Suluhisho si kukandamiza joto bali kuliona shabaha. Lipe mwelekeo wa pamoja — mradi, mpango, changamoto, hata ugomvi safi wenye kanuni — na ukali unafanya kazi kwa faida yenu badala ya kugeukia ndani.',
  'syn.deep.pattern.karmic':
    'Katika kiini chake, huu una uzito. Zohali na Pluto viko katika mchanganyiko, jambo linaloleta hisia ya matokeo katika kifungo — kana kwamba mko hapa kutatua kitu pamoja badala ya kupitisha wakati kwa raha tu. Miunganiko kama hii huelekea kuhisi ya maana mapema na kuomba zaidi kutoka kwa watu wote wawili kuliko uunganiko mwepesi zaidi ungeomba. Ukisimamiwa vizuri, unakuwa mwaminifu sana na wa kudumu, aina ya kifungo kinachoendelea kuwepo baada ya mambo. Ukisimamiwa kwa uzembe, unakuwa mzito — wajibu uliovaa nguo ya ukaribu, au mvutano wa polepole wa madaraka ambao hakuna anayeutaja. Tofauti iko karibu yote katika kama nyote wawili mnaendelea kukichagua kwa sauti, kwa makusudi, badala ya kubaki kwa sababu kuondoka kunahisi kama kushindwa.',

  'syn.deep.chemHead': 'Kemia kati yenu',
  'syn.deep.chem.strong':
    'Mvuto hapa umeungwa mkono vizuri. Miguso kati ya chati zenu inayotawala tamaa na mapenzi kwa kiasi kikubwa ni ya kupatana, jambo ambalo kwa kawaida hutafsiriwa kuwa kemia inayohisi ya asili kuliko yenye mvutano — mnavutana kwa namna isiyogharimu sana kudumisha. Ifurahie, na usiichukulie kama ushahidi kwamba sehemu iliyobaki ya uhusiano itajiendesha yenyewe; urahisi katika idara moja hauwezi kuchukua nafasi ya juhudi katika nyingine.',
  'syn.deep.chem.mixed':
    'Mvuto hapa una mkondo na pia mchanga. Baadhi ya miguso kati ya chati zenu inawaleta pamoja kwa joto; nyingine inaongeza msuguano kwa mvuto uleule, jambo linaloweza kusomeka kama kemia yenye ukingo — yenye sumaku, mara kwa mara ya kuchanganya akili, mara chache ya kuchosha. Aina hii ya cheche huelekea kudumu zaidi ya ile isiyo na msuguano, hasa kwa sababu inajitengeneza upya bila kikomo. Kazi ni kuuweka ukingo wa kucheza badala ya kuuacha uchachuke kuwa mkakati wa kukwazana.',
  'syn.deep.chem.cool':
    'Tamaa si uzi mkubwa zaidi kati ya chati zenu. Miguso inayotawala mvuto iko kimya au yenye changamoto kidogo, jambo lisilomaanisha hakuna cheche — ni tu kwamba muunganiko huu una uwezekano mkubwa wa kujengwa juu ya vitu vingine: uelewa wa pamoja, heshima, kutegemewa, mkutano wa maadili. Mahusiano yaliyojengwa juu ya hayo huelekea kuwa ya polepole kuwaka na magumu zaidi sana kuvunja.',

  'syn.deep.commHead': 'Jinsi mnavyowasiliana',
  'syn.deep.comm.easy':
    'Mawasiliano ni nguvu hapa. Miguso yenu ya Zebaki inatiririka, jambo linalomaanisha huelekea kufuata mawazo ya kila mmoja, kufikisha vichekesho, na kufanyia kazi tatizo pamoja bila hasara nyingi katika tafsiri. Itumie kwa makusudi jambo gumu linapojitokeza — nyinyi ni bora katika kuzungumzia mambo hadi mwisho kuliko wanandoa wengi, hivyo msiache mazungumzo magumu yawe ndiyo mnayoyakwepa.',
  'syn.deep.comm.work':
    'Mawasiliano yanahitaji kazi kidogo hapa. Miguso yenu ya Zebaki inabeba msuguano, hivyo mnaweza kuzungumza mkipishana — mwendo tofauti, mantiki tofauti, dhana tofauti kuhusu kilichokubaliwa kweli. Hili linaweza kushughulikiwa, lakini linahitaji tabia: punguza kasi, rudia uliyoyasikia, na hakiki kuwa mnamaanisha kitu kilekile kwa neno lilelile kabla ya kusonga mbele.',
  'syn.deep.comm.quiet':
    'Hakuna mguso wenye nguvu wa Zebaki kati ya chati zenu kwa upande wowote, jambo linalomaanisha kwa kawaida mawasiliano si kipaji cha wazi wala tatizo la wazi — ni tu kitu mtakachokijenga kwa makusudi badala ya kukiangukia. Kukagua hali kwa kawaida, bila kulazimisha kuna umuhimu zaidi kwenu kuliko kwa wanandoa wanaosomana kiotomatiki.',

  'syn.deep.growthLead': 'Wapi hili linakukuza',
  'syn.deep.growth.good':
    'Urahisi kati yenu ni halisi, na pia ndio wa kuutazama. Muunganiko unapojiendesha wenyewe zaidi, ni rahisi kuwa mzembe — kuacha kuleta uaminifu wako na juhudi zako kamili kwa sababu hukuhitajika. Ukingo wenu kama wanandoa ni kuendelea kujitokeza ipasavyo kwa kitu kisichokuhitaji: kuendelea kusema jambo la kweli, kuendelea kufanya juhudi, kuendelea kutambuana. Msiache «rahisi» kimya kimya kuwa «bila kutunzwa».',
  'syn.deep.growth.mid':
    'Nukta za msuguano kati yenu si dosari za ulinganifu; ni mtaala. Kila moja inaonyesha mahali ambapo nyote wawili mtalazimika kujinyoosha — kusema jambo gumu mapema, kushikilia msimamo wako kwa upole zaidi, kuacha kusubiri kusomwa na kuanza kuwa wazi. Wanandoa wanaotaja mvutano huu mapema na kuutendea kama kazi ya pamoja huelekea kufanya vizuri baada ya muda. Wanandoa wanaotumaini utayeyuka tu huelekea kukutana na ubishi uleule kwa miaka.',
  'syn.deep.growth.hard':
    'Muunganiko huu unaomba mengi kutoka kwa nyote wawili. Miguso yenye changamoto kati ya chati zenu haitayeyuka yenyewe, hivyo uhusiano unafanya kazi tu ikiwa nyote wawili mnautendea ugumu kama kazi ya pamoja na si kosa la mwingine. Hilo linawezekana kweli — vifungo vingi vya kudumu vimejengwa juu ya mitazamo migumu — lakini ni chaguo mtakalolazimika kuendelea kufanya, tena na tena na kwa sauti, hasa katika vipindi ambavyo kuweka hesabu kungekuwa rahisi zaidi.',

  'syn.deep.nameItLead': 'Sema sehemu hii kwa sauti',
  'syn.deep.nameIt':
    'Ikiwa kuna jambo moja linalostahili kutajwa mapema badala ya kutumaini litatulia, ni mguso wa {a}–{b}: {sentence} Lisiposemwa, huelekea kuganda kuwa mkakati; likisemwa wazi na mapema, kwa kawaida linageuka kuwa dogo kuliko lilivyohisi.',
  'syn.deep.nameIt.none':
    'Hakuna nukta moja ya msuguano inayohitaji kuzuiwa mapema hapa — jambo ambalo lenyewe linastahili kujulikana. Kazi katika muunganiko huu inahusu kidogo kufifisha suala moja na zaidi kubaki mwenye usikivu katika jumla yake.',

  'syn.deep.longViewLead': 'Mtazamo wa mbali',
  'syn.deep.longView.good':
    'huu ni aina ya muunganiko unaozeeka vizuri. Huelekea kuwa rahisi zaidi kuliko mgumu zaidi mnapojifunza kingo za kila mmoja, na urahisi wa mapema kwa kawaida hujikita kuwa kitu imara zaidi na cha kutegemewa zaidi baada ya muda. Tishio kuu kwake ni kupuuza, si mgogoro.',
  'syn.deep.longView.mid':
    'huu unakuwa kile mnachoufanya. Malighafi inaweza kufanyiwa kazi — si isiyo na juhudi wala iliyohukumiwa — na matokeo yanategemea karibu yote juhudi mnayoiweka nyote wawili katika kipindi cha kwanza, kabla mikakati kutulia. Fanyeni tabia sawa mapema na huu unaweza kudumu.',
  'syn.deep.longView.hard':
    'huu ni mkali sasa, na huelekea kubaki mkali. Unastahili ikiwa kina na maana ndivyo nyote wawili mnavyotaka kweli kutoka kwa uhusiano. Unachosha ikiwa sehemu yako inasubiri utulie kuwa kitu rahisi — huenda hiyo si kazi hapa.',
} as const
