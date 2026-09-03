import type { ScreenKey } from '../en/screens'

/** Kiswahili — maandishi ya skrini za ndani. */
export const screens: Record<ScreenKey, string> = {
  /* ---- anga la eneo / kutulia chini ---- */
  'geo.ground.scarce':
    'Mchana ni mfupi — toka nje karibu na adhuhuri, kula kitu cha joto, na jiruhusu kulala mapema.',
  'geo.ground.long':
    'Nuru ndefu inanyoosha siku — chukua kivuli na maji baridi adhuhuri, na kinga chumba chako cha kulala dhidi ya jua la jioni.',
  'geo.ground.spring':
    'Nuru inarudi — sogeza zoezi lako kuelekea asubuhi na uache nishati ijengeke.',
  'geo.ground.summer':
    'Kilele cha nuru — weka mwendo mpole, kunywa maji, na tulia chini kwa miguu wazi juu ya ardhi au nyasi.',
  'geo.ground.autumn':
    'Nuru inajikusanya ndani — egemea mazoezi ya polepole, ya joto na kupunguza kasi mapema.',
  'geo.ground.winter':
    'Nusu ya giza — kupumzika kuna tija sasa; weka mazoezi mafupi, ya kurejesha na ya mwanga wa mshumaa.',
  'geo.season.spring': 'Masika',
  'geo.season.summer': 'Kiangazi',
  'geo.season.autumn': 'Mpukutiko',
  'geo.season.winter': 'Baridi',

  /* ---- falaki ya haraka ---- */
  'scr.quick.eyebrow': 'Falaki ya leo',
  'scr.quick.you': 'Wewe',
  'scr.quick.moon': 'Mwezi',
  'scr.quick.readFull': 'Soma kwa ukamilifu →',
  'scr.quick.fullPro': 'Usomaji kamili · Pro →',

  /* ---- falaki kamili ---- */
  'scr.horo.eyebrow': 'Falaki ya Kila Siku',
  'scr.horo.addBirth': 'Ongeza taarifa za kuzaliwa →',
  'scr.horo.moonHead': 'Mwezi',
  'scr.horo.skyHead': 'Anga juu yako',
  'scr.horo.risingNow': '{sign} inainuka juu yako sasa hivi.',
  'scr.horo.transitingHouse': '{planet} inapita katika nyumba yako {ord}.',
  'scr.horo.addPlace': 'Ongeza mahali pa kuzaliwa, au shiriki eneo lako katika Mipangilio →',
  'scr.horo.practiceHead': 'Zoezi la leo',
  'scr.horo.geoLine': '{season} · jua {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · saa {hours} za nuru',
  'scr.horo.birthPlace': ' · tunatumia mahali pako pa kuzaliwa',

  /* ---- mipito ---- */
  'scr.transits.eyebrow': 'Anga',
  'scr.transits.titleNatal': 'Mipito kwa chati yako',
  'scr.transits.titleSky': 'Anga leo',
  'scr.transits.addChart': 'Ongeza chati',
  'scr.transits.nowHead': 'Sasa hivi, juu yako',
  'scr.transits.rising': '{sign} inainuka',
  'scr.transits.movingHouse': '{planet} inapita katika nyumba yako {ord} — {arena}.',
  'scr.transits.sunMoon': 'Jua {sunrise}–{sunset} · Mwezi {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'mahali pa kuzaliwa',
  'scr.transits.allInOrb': 'Kila mpito katika obiti',
  'scr.transits.moonAspects': 'Pembe za Mwezi leo',
  'scr.transits.natalPrefix': 'ya asili ',
  'scr.transits.nothingOrb': 'Hakuna kilicho katika obiti leo.',
  'scr.transits.applying': 'inayokaribia',
  'scr.transits.separating': 'inayojitenga',
  'scr.transits.orbNote':
    '↑ bado inakaza kuelekea sawasawa · ↓ inajitenga. Obiti kali zinahisiwa kwa nguvu zaidi.',

  /* ---- jarida ---- */
  'scr.journal.dayStreak': 'siku mfululizo',
  'scr.journal.practices': 'mazoezi',
  'scr.journal.minutes': 'dakika',
  'scr.journal.last4w': 'Wiki 4 zilizopita',
  'scr.journal.lastNDays': 'Siku {n} zilizopita',
  'scr.journal.reasonHistory': 'Historia ya jarida isiyo na kikomo',
  'scr.journal.fullHistory': 'historia kamili →',
  'scr.journal.gridNote': 'Kujaa = dakika zilizofanywa · pete = hisia zilizorekodiwa',
  'scr.journal.recent': 'Zoezi la hivi karibuni',
  'scr.journal.noSessions': 'Hakuna vikao bado — anza kimoja kutoka paneli kuu.',
  'scr.journal.endedEarly': ' · kimeisha mapema',
  'scr.journal.min': 'dakika {n}',

  /* ---- ibada (kicheza zoezi) ---- */
  'scr.ritual.attuning': 'Inapatanisha na anga…',
  'scr.ritual.back': 'Nyuma',
  'scr.ritual.todaysPractice': 'Zoezi la Leo',
  'scr.ritual.fromLibrary': 'Kutoka maktaba',
  'scr.ritual.focusAlignment': 'Upatanishi wa {chakra}',
  'scr.ritual.chakraBlurb': 'Kikao elekezi kilichoundwa na {planet} na chati yako.',
  'scr.ritual.freqBlurb':
    '{intention}. Kaa, legea, na acha sauti ibebe kikao.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Sauti',
  'scr.ritual.journeyNote':
    'Raundi {n}, kwa mwendo wako — takribani dakika 12. Skrini inaongoza kila awamu.',
  'scr.ritual.length': 'Urefu',
  'scr.ritual.sound': 'Sauti',
  'scr.ritual.sound.tone': 'Sauti',
  'scr.ritual.sound.music': 'Muziki',
  'scr.ritual.sound.silent': 'Kimya',
  'scr.ritual.soundTone': 'Sauti ya masafa ya {hz} Hz inacheza chini.',
  'scr.ritual.soundMusic': 'Kodi ya mazingira laini, inayosogea polepole.',
  'scr.ritual.soundSilent': 'Hakuna sauti — mwongozo wa maneno au wa skrini tu.',
  'scr.ritual.spokenGuidance': 'Mwongozo wa maneno',
  'scr.ritual.notAvailable': 'haipatikani hapa — maneno yanaonekana kwenye skrini',
  'scr.ritual.beginPractice': 'Anza zoezi',
  'scr.ritual.notNow': 'Si sasa',
  'scr.ritual.endSession': '‹ Maliza kikao',
  'scr.ritual.complete': 'Zoezi limekamilika',
  'scr.ritual.doneMeta': 'dakika {minutes} · {chakra} · {label}',
  'scr.ritual.streak': 'mfululizo wa siku {n}',
  'scr.ritual.firstLogged': 'Zoezi la kwanza limerekodiwa',
  'scr.ritual.howNow': 'Unahisije sasa?',
  'scr.ritual.done': 'Imekamilika',

  /* ---- rekodi ya hisia ---- */
  'scr.moodci.default': 'Unahisije?',
  'scr.moodci.logged': 'Imerekodiwa ✦',
  'scr.moodci.logThis': 'Rekodi hii',
  'scr.moodci.eyebrow': 'Rekodi ya jioni',
  'scr.moodci.blurb': 'Mguso mmoja. Unaunda aura ya kesho na mwelekeo wa hisia zako.',
  'scr.moodci.noteLabel': 'Dokezo (hiari)',
  'scr.moodci.notePlaceholder': 'Chochote kilicho akilini mwako…',
  'scr.moodci.update': 'Sasisha rekodi',
  'scr.moodci.save': 'Hifadhi rekodi',

  /* ---- chati ya kuzaliwa ---- */
  'scr.natal.eyebrow': 'Chati ya Kuzaliwa',
  'scr.natal.title': 'Anga lako la kuzaliwa',
  'scr.natal.blurb':
    'Ongeza tarehe, saa na mahali pako pa kuzaliwa na Resonance itachora chati yako ya kuzaliwa — mahali sahihi pa Jua, Mwezi na sayari wakati ulipozaliwa.',
  'scr.natal.addDetails': 'Ongeza taarifa za kuzaliwa',
  'scr.natal.edit': 'hariri',
  'scr.natal.timeUnknown': 'saa haijulikani (adhuhuri)',
  'scr.natal.angleLine': '{asc} inainuka · MC {mc} · {system}',
  'scr.natal.placidus': 'nyumba za Placidus',
  'scr.natal.wholeSign': 'nyumba za ishara kamili',
  'scr.natal.addPlace': 'Ongeza mahali pako pa kuzaliwa kwa Lagi na nyumba →',
  'scr.natal.wheelAria': 'Gurudumu la chati ya kuzaliwa',
  'scr.natal.placements': 'Nafasi',
  'scr.natal.aspects': 'Pembe za asili',
  'scr.natal.noAspects': 'Hakuna pembe kuu katika obiti.',
  'scr.natal.house': 'N{n}',

  /* ---- duka la dawa ---- */
  'scr.apoth.eyebrow': 'Duka la Dawa',
  'scr.apoth.title': 'Wenzako wa Fuwele',
  'scr.apoth.subChart': 'Mawe kwa kazi ya {chakra} leo · {n} katika kabati',
  'scr.apoth.subPlain': 'Mawe {n} katika kabati',
  'scr.apoth.all': 'Zote',
  'scr.apoth.today': 'Leo',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Hakuna mawe yaliyowekwa chini ya {filter}.',
  'scr.apoth.noneThat': 'hiyo',
  'scr.apoth.pair': 'unganisha jiwe na zoezi la leo →',

  /* ---- skrini ya mwezi ---- */
  'scr.moon.eyebrow': 'Anga',
  'scr.moon.title': 'Mwezi',
  'scr.moon.sub': '{phase} · umewaka {pct}%',
  'scr.moon.whereShe': 'Ulipo',
  'scr.moon.inSign': 'Mwezi uko katika {sign} — {note}.',
  'scr.moon.vocUntil':
    'Hauna mwelekeo hadi uingie {sign}{time} — dirisha baya la kuanza kitu kipya. Tulia chini na funga vipuri vilegevu badala yake.',
  'scr.moon.vocAt': ' saa {time}',
  'scr.moon.vocSoon': 'Unakuwa bila mwelekeo baada ya saa {hours}.',
  'scr.moon.notVoc': 'Hauna ukosefu wa mwelekeo — Mwezi unapiga pembe safi.',
  'scr.moon.comingUp': 'Kinachokuja',

  /* ---- arifa za kifaani ---- */
  'notif.daily.title': 'Usomaji wako uko tayari',
  'notif.daily.body': 'Mpito wa leo, lengo la shakra na zoezi vinasubiri.',
  'notif.evening.title': 'Punguza kasi',
  'notif.evening.body': 'Pumzi chache na rekodi ya hisia kabla ya kulala.',
  'notif.newMoon.title': 'Mwezi Mwandamo usiku wa leo',
  'notif.newMoon.body': 'Kuanza upya kwa utulivu — weka nia na uiweke kwako mwenyewe.',
  'notif.fullMoon.title': 'Mwezi Kamili usiku wa leo',
  'notif.fullMoon.body': 'Hisia zinang’aa. Tambua kile kinachojitokeza juu.',
  'notif.moonSign.title': 'Mwezi unaingia {sign}',
  'notif.moonSign.body':
    'Hali ya kihisia inahamia — wakati mzuri wa kutulia nguvu yako chini.',
  'notif.voc.title': 'Mwezi unakaribia kukosa mwelekeo',
  'notif.voc.body':
    'Ukosefu wa mwelekeo unaanza baada ya dakika 15. Tulia nguvu yako chini — pumzika, usianze.',

  /* ---- bango la Mwezi usio na mwelekeo ---- */
  'scr.voc.active': 'Mwezi hauna mwelekeo — tulia chini, usianze. Unaisha {time}.',
  'scr.voc.activeSoon': 'Mwezi hauna mwelekeo — tulia chini, usianze. Unaisha hivi karibuni.',
  'scr.voc.upcoming': 'Mwezi unakosa mwelekeo baada ya saa {hours}.',
  'scr.voc.twoMin': 'dakika 2',

  /* ---- kitovu cha anga: muhtasari wa uwanja wa shakra ---- */
  'scr.field.summary.join': ' na ',
  'scr.field.summary.pressure': '{names} chini ya shinikizo',
  'scr.field.summary.open': '{names} wazi kabisa',
  'scr.field.summary.carries': '{name} inabeba siku',
  'scr.field.summary.settled': 'Uwanja uliotulia',

  /* ---- kadi ya kufunga + mwongozo ---- */
  'scr.fast.eyebrow': 'Kufunga',
  'scr.fast.phase.waxing': 'mwezi unaoongezeka',
  'scr.fast.phase.waning': 'mwezi unaopungua',
  'scr.fast.cardMeta': '{special} · siku ya mwezi {day} · Mwezi katika {sign}',
  'scr.fast.bestToday': 'Aina bora leo:',
  'scr.fast.betterDays': 'Siku bora zijazo',
  'scr.fast.waningWindow': 'Dirisha la kupungua',
  'scr.fast.cardDisclaimer':
    'Mwongozo wa kimila wa mwezi, si ushauri wa kitabibu. Ikiwa una hali ya kiafya au historia na chakula, ruka kufunga na ule chepesi tu.',
  'scr.fast.fiveKinds': 'Aina tano na siku zijazo →',
  'scr.fast.less': 'Kidogo',
  'scr.fast.howHold': 'Jinsi ya kuishikilia',
  'scr.fast.guideSubSpecial': '{special} · Mwezi katika {sign}',
  'scr.fast.guideSubPhase': '{phase} · siku ya mwezi {day}',
  'scr.fast.today': 'Leo',
  'scr.fast.skyBacks': 'Anga linaunga mkono → {method}',
  'scr.fast.whichKind': 'Aina gani',
  'scr.fast.whichKindBlurb':
    'Njia tano za kushikilia mfungo, mpole zaidi kwanza — kila moja imekadiriwa kwa Mwezi leo. Gusa moja kuifungua.',
  'scr.fast.holdingWell': 'Kuishikilia vizuri',
  'scr.fast.hold1':
    'Kunywa wakati wote — maji, chai ya mimea, kahawa nyeusi. Chembe ya chumvi husaidia kwenye ndefu zaidi.',
  'scr.fast.hold2':
    'Vunja kwa upole: maji vuguvugu kwanza, kisha kitu kidogo na kilichopikwa. Ruka mlo mkubwa mara moja.',
  'scr.fast.hold3':
    'Sogea polepole, lala zaidi, na simama wakati mwili wako unasema simama.',
  'scr.fast.guideDisclaimer':
    'Mwongozo wa kimila wa mwezi, si ushauri wa kitabibu. Kufunga bila maji — kwenda bila maji — kunabeba hatari halisi na kamwe si kitu anga «kinachopendekeza»; mwongozo huu unadhania unakunywa. Ikiwa una mimba, unatumia dawa, una kisukari, una uzito mdogo, au una historia na chakula, ruka kufunga na ule chepesi tu.',
}
