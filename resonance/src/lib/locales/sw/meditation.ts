import type { MeditationKey } from '../en/meditation'

/** Kiswahili — tafakari elekezi: muhtasari unaosomwa mara moja, kisha kila hatua kwa mlio wa bakuli. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'msingi wa uti wa mgongo, ambapo unakutana na ardhi',
  'med.seat.sacral': 'tumbo la chini, upana wa kiganja chini ya kitovu',
  'med.seat.solar-plexus': 'sehemu laini chini ya mbavu',
  'med.seat.heart': 'katikati ya kifua',
  'med.seat.throat': 'shimo la koo',
  'med.seat.third-eye': 'nafasi kati ya nyusi',
  'med.seat.crown': 'utosi wa kichwa, na kidogo juu yake',
  'med.chakraLower': 'kituo cha {chakra}',

  'med.house.1': 'jinsi unavyojionyesha na jinsi unavyokutana na ulimwengu',
  'med.house.2': 'kile unachothamini na kile kinachokuweka thabiti',
  'med.house.3': 'akili yako ya kila siku na maneno unayotumia',
  'med.house.4': 'nyumbani, mizizi, na mahali unapohisi umebebwa',
  'med.house.5': 'mchezo, ubunifu, na kile kinachokupa furaha',
  'med.house.6': 'kazi ya kila siku ya kujitunza',
  'med.house.7': 'watu walio karibu nawe zaidi',
  'med.house.8': 'kinachomalizika, na kile unachoshiriki kwa kina',
  'med.house.9': 'maana, na mtazamo mpana',
  'med.house.10': 'kazi yako duniani na jinsi unavyoonekana',
  'med.house.11': 'watu wako, na kile unachonyoosha mkono kuelekea',
  'med.house.12': 'mapumziko, upweke, na utulivu ulio chini ya kila kitu',

  'med.invite.Sun': 'Acha joto thabiti likusanyike hapa — nuru yako mwenyewe, bila mizunguko.',
  'med.invite.Moon': 'Acha kile unachohisi kiwe hapa tu, bila hitaji la kukirekebisha.',
  'med.invite.Mercury': 'Acha fikira zipunguze kasi. Huhitaji kutatua kitu sasa.',
  'med.invite.Venus': 'Jilaini kuelekea kwako kama ungefanya kwa mtu unayempenda.',
  'med.invite.Mars': 'Tambua joto au haraka yoyote, na acha kutoa pumzi kubebe sehemu yake.',
  'med.invite.Jupiter': 'Acha nafasi hii ihisi pana kidogo kuliko dakika moja iliyopita.',
  'med.invite.Saturn': 'Kutana na uzito hapa kwa unyoofu. Unaweza kubeba zaidi ya unavyofikiri.',
  'med.invite.Uranus': 'Acha kitu kilege. — mshiko mmoja, umbo la zamani usiohitaji tena.',
  'med.invite.Neptune': 'Acha mistari ififie. Unaruhusiwa kutojua kwa muda.',
  'med.invite.Pluto': 'Acha kilichoisha kiishe. Pumua ndani ya nafasi kinachoacha.',
  'med.invite.default': 'Acha nishati hii isogee kupitia kwako, si ndani yako.',

  'med.ease.hard': 'Leo kuna msuguano katika {dominant}. Hauko hapa kupenya kwa nguvu — ni kukihisi kwa uwazi tu na kubaki laini pembeni.',
  'med.ease.soft': '{dominant} inatiririka leo. Tambua urahisi huo, na jiruhusu kuupokea.',
  'med.ease.neutral': '{dominant} ni nzito leo. Acha ikupitie badala ya kukaa mwilini.',

  'med.dominant.aspect': '{verb} ya {planet} na {other} yako ya asili',
  'med.dominant.sign': '{planet} inayopita katika {sign}',
  'med.dominant.chartWord': 'chati',
  'med.domverb.conjunction': 'Muungano',
  'med.domverb.opposition': 'Mkabala',
  'med.domverb.square': 'Mraba',
  'med.domverb.trine': 'Trigoni',
  'med.domverb.sextile': 'Sekstaili',

  'med.houseLine.known': 'Hii inagusa sehemu ya maisha yako inayohusu {theme}. Ishikilie kwa wepesi. Hakuna cha kuamua hapa — ni kutambua tu.',
  'med.houseLine.unknown': 'Chochote inachokichochea maishani mwako, acha kitulie kwa muda wa zoezi hili. Kitakuwa bado kipo utakapomaliza, na utakutana nacho kwa nafasi zaidi.',

  'med.mantraLong.root': 'Niko salama. Niko hapa. Nina kile ninachohitaji.',
  'med.mantraLong.sacral': 'Naacha maisha yasogee ndani yangu.',
  'med.mantraLong.solar-plexus': 'Naamini moto wangu.',
  'med.mantraLong.heart': 'Natoa na kupokea upendo kwa uhuru.',
  'med.mantraLong.throat': 'Nasema kweli yangu kwa urahisi.',
  'med.mantraLong.third-eye': 'Naamini kile ninachokiona ndani.',
  'med.mantraLong.crown': 'Ni sehemu ya kitu kikubwa, na kinanibeba.',

  'med.title.fallback': 'tafakari ya kituo cha {chakra}',

  /* ---- muhtasari, unaosomwa mara moja kabla ya kuanza ---- */
  'med.brief.lead': 'Soma hii mara moja, kisha funga macho. Kila hatua inafunguliwa kwa mlio wa bakuli — baki nayo hadi mlio unaofuata.',
  'med.brief.close': 'Milio mitatu laini ya bakuli inamaliza zoezi. Rudi kwa mwendo wako mwenyewe.',

  /* ---- hatua za jumla ---- */
  'med.step.settle': 'Macho yamefungwa. Acha mwili utulie na pumzi ipunguze kasi yenyewe.',
  'med.step.breath': 'Weka uangalifu kwenye pumzi — ifuate ikiingia, ifuate ikitoka. Akili inapotanga-tanga, kutambua huko ndiko zoezi. Rudi, kwa upole.',
  'med.step.centre': 'Leta uangalifu wako kwa {seat}. Pumua kana kwamba pumzi yenyewe inafika {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Kimya, kwa mdundo wa pumzi: {affirmation}',
  'med.step.close': 'Acha zoezi liende. Tambua unavyohisi sasa, kabla ya kufungua macho.',

  /* ---- utambuzi wa pumzi ---- */
  'med.step.ba.count': 'Sasa hesabu kila kutoa pumzi — moja hadi kumi, kisha anza upya. Ukipoteza hesabu, anza tu kutoka moja. Hakuna anayeweka alama.',

  /* ---- ukaguzi wa mwili ---- */
  'med.step.scan.0': 'Fagia uangalifu polepole kutoka nyayo za miguu kwenda juu — vifundo, miguu, nyonga, tumbo, mgongo, kifua, mikono, viganja. Pumzika pumzi chache pale unapokutana na msongo, na uache ulege.',
  'med.step.scan.1': 'Sasa mabega, koo, taya, nafasi kuzunguka macho, ngozi ya kichwa. Kisha hisi mwili mzima kwa mara moja — mzito, wa joto, ukipumua wenyewe.',

  /* ---- wema wa upendo ---- */
  'med.step.metta.0': 'Jilete akilini, kama ulivyo leo hasa. Kimya toa: na niwe salama, na niwe mzima, na niwe na amani. Rudia polepole na jiruhusu kumaanisha kweli.',
  'med.step.metta.1': 'Lete akilini mtu unayempenda kwa urahisi. Fikiria uso wake na toa vilevile: na uwe salama, na uwe mzima, na uwe na amani.',
  'med.step.metta.2': 'Sasa ipanue — mtu usiyemjua vizuri, mtu unayemwona mgumu, kisha wote, kila mahali: viumbe vyote na viwe salama, viumbe vyote na viwe na amani.',

  /* ---- bafu ya sauti ---- */
  'med.step.bath.0': 'Acha sauti ije mbele ya uangalifu. Husikilizi kwa juhudi — unaacha sauti ifike, kama nuru inavyofika.',
  'med.step.bath.1': 'Tambua sauti inaonekana kutua wapi mwilini — kifuani, fuvuni, mikononi. Acha nafasi kati yako na sauti iyeyuke.',

  /* ---- shukrani ---- */
  'med.step.grat.0': 'Lete akilini kitu kimoja kutoka siku iliyopita kilichokwenda vizuri, hata kidogo kiasi gani. Usikitaje tu — hisi pale shukrani inapokaa mwilini.',
  'med.step.grat.1': 'Sasa kitu ambacho kwa kawaida unachukulia kuwa cha kawaida — mwili unaofanya kazi, paa, mtu aliyebaki. Baki nacho pumzi chache.',
  'med.step.grat.2': 'Kimoja zaidi — kuhusu wewe mwenyewe. Namna ulivyosimama, jambo ulilolishughulikia, juhudi ambayo hakuna aliyeiona. Shikilia vyote vitatu pamoja.',

  /* ---- mahali salama ---- */
  'med.step.safe.0': 'Fikiria mahali unapohisi salama kabisa — halisi au pa kufikirika. Angalia polepole: nuru, saa ya siku, unachosikia, unachohisi kwenye ngozi.',
  'med.step.safe.1': 'Pata mahali hapa ambapo ungependa zaidi kupumzika, na uende huko. Hakuna kinachotakiwa kwako. Hakuna kinachokufikia usichokiruhusu.',

  /* ---- mlima ---- */
  'med.step.mtn.0': 'Fikiria mlima — msingi wake mpana, kando zake imara, kilele chake kilichotulia. Acha mwili wako na mlima viwe umbo moja: kiti ni msingi, uti wa mgongo ni mteremko, kichwa ni kilele.',
  'med.step.mtn.1': 'Hali ya hewa inakuja na kuondoka kuzunguka mlima — nuru, wingu, upepo, dhoruba. Mawazo na hali zako za moyo ni hali ya hewa. Mlima haubishani nayo, wala haupungui kwa sababu yake.',

  /* ---- utambuzi wa wazi ---- */
  'med.step.open.0': 'Achilia nanga ya pumzi. Acha uangalifu uwe wazi pana, si juu ya kitu chochote hasa. Sauti, hisia, mawazo huinuka na kupita — huyafuatilii wala kuyasukuma mbali.',
  'med.step.open.1': 'Tambua kwamba utambuzi wenyewe hausogei. Mambo yanatokea ndani yake, kama mawingu yanavyotokea ndani ya anga. Pumzika kama anga hilo — hakuna cha kuongeza, hakuna cha kuondoa.',

  /* ---- nia ya asubuhi ---- */
  'med.step.morn.0': 'Pumzi tatu zilizojaa zaidi, za kina kidogo kuliko kawaida — ziache ziuamshe mwili kutoka ndani. Zungusha mabega nyuma mara moja na uhisi mbele ya mwili ikifunguka.',
  'med.step.morn.1': 'Lete siku ijayo akilini kwa wepesi, kisha chagua nia moja — si kazi, bali namna ya kuwa. Mwenye subira. Mwaminifu. Jasiri. Mwema. Iseme mara moja: leo, nitakuwa ___.',

  /* ---- kuachilia jioni ---- */
  'med.step.eve.0': 'Acha siku ipite kwa wepesi, kama mandhari kutoka dirisha la treni — asubuhi, adhuhuri, jioni. Usisimame pahali popote. Kama kipande fulani kinakuvuta, kiandike na useme: si sasa.',
  'med.step.eve.1': 'Pata kipande kimoja unachofurahi kwamba kilitokea, na jambo moja ulilofanya vizuri kadri ulivyoweza, kwa jinsi siku ilivyokwenda kweli. Acha hilo litoshe. Sasa acha siku nzima iende — imekamilika kwa sababu tu imeisha.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Lala bila kusonga kabisa — kimya zaidi ya kinachohisi asili, ni pumzi tu inayosogea. Weka nia fupi, sentensi moja tulivu ya wakati uliopo. Iseme moyoni mara tatu.',
  'med.step.nidra.1': 'Leta uangalifu kwa kila pahali kadri linavyotajwa, bila kusonga — mkono wa kulia: kidole gumba, vidole, kiganja, kifundo cha mkono, kigasha, kiwiko, bega. Kisha vivyo hivyo kushoto.',
  'med.step.nidra.2': 'Nyonga zote mbili. Mguu wa kulia — paja, goti, muundi, kifundo cha mguu, wayo, vidole. Mguu wa kushoto vilevile. Mgongo mzima juu ya sakafu, tumbo likipanda na kushuka, kifua, koo.',
  'med.step.nidra.3': 'Uso — taya, midomo, pua, mashavu, macho, nafasi kati ya nyusi, ngozi nzima ya kichwa. Sasa mwili mzima kwa mara moja, ukimeta hafifu, ukishikiliwa na sakafu. Rudi kwenye nia yako.',
}
