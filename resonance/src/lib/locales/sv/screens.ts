import type { ScreenKey } from '../en/screens'

/** Svenska — texter för underskärmarna. */
export const screens: Record<ScreenKey, string> = {
  /* ---- lokal himmel / jordning ---- */
  'geo.ground.scarce':
    'Dagsljuset är knappt — gå ut en stund vid middagstid, ät något varmt, och tillåt dig att sova tidigt.',
  'geo.ground.long':
    'Långt ljus töjer ut dagen — ta skugga och svalt vatten mitt på dagen, och skärma sovrummet mot den sena solen.',
  'geo.ground.spring':
    'Ljuset återvänder — flytta din praktik mot morgonen och låt energin byggas upp.',
  'geo.ground.summer':
    'Ljusets topp — håll tempot mjukt, drick vatten, och jorda dig barfota på jord eller gräs.',
  'geo.ground.autumn':
    'Ljuset drar sig in — föredra långsammare, värmande praktiker och en tidigare nedvarvning.',
  'geo.ground.winter':
    'Den mörka halvan — att vila är produktivt nu; håll praktikerna korta, återställande och vid levande ljus.',
  'geo.season.spring': 'Vår',
  'geo.season.summer': 'Sommar',
  'geo.season.autumn': 'Höst',
  'geo.season.winter': 'Vinter',

  /* ---- snabbhoroskop ---- */
  'scr.quick.eyebrow': 'Horoskop för idag',
  'scr.quick.you': 'Du',
  'scr.quick.moon': 'Måne',
  'scr.quick.readFull': 'Läs i sin helhet →',
  'scr.quick.fullPro': 'Den fullständiga läsningen · Pro →',

  /* ---- fullständigt horoskop ---- */
  'scr.horo.eyebrow': 'Dagshoroskop',
  'scr.horo.addBirth': 'Lägg till födelseuppgifter →',
  'scr.horo.moonHead': 'Månen',
  'scr.horo.skyHead': 'Himlen ovanför dig',
  'scr.horo.risingNow': '{sign} stiger över dig just nu.',
  'scr.horo.transitingHouse': '{planet} transiterar ditt {ord} hus.',
  'scr.horo.addPlace': 'Lägg till en födelseort, eller dela din plats i Inställningar →',
  'scr.horo.practiceHead': 'Dagens praktik',
  'scr.horo.geoLine': '{season} · sol {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h ljus',
  'scr.horo.birthPlace': ' · jag använder din födelseort',

  /* ---- transiter ---- */
  'scr.transits.eyebrow': 'Himlen',
  'scr.transits.titleNatal': 'Transiter till din karta',
  'scr.transits.titleSky': 'Himlen idag',
  'scr.transits.addChart': 'Lägg till karta',
  'scr.transits.nowHead': 'Just nu, ovanför dig',
  'scr.transits.rising': '{sign} stiger',
  'scr.transits.movingHouse': '{planet} rör sig genom ditt {ord} hus — {arena}.',
  'scr.transits.sunMoon': 'Sol {sunrise}–{sunset} · Måne {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'födelseort',
  'scr.transits.allInOrb': 'Varje transit i orbis',
  'scr.transits.moonAspects': 'Månens aspekter idag',
  'scr.transits.natalPrefix': 'radix-',
  'scr.transits.nothingOrb': 'Inget i orbis idag.',
  'scr.transits.applying': 'tilltagande',
  'scr.transits.separating': 'avtagande',
  'scr.transits.orbNote':
    '↑ drar fortfarande ihop sig mot exakt · ↓ separerar. Tätare orbis känns starkare.',

  /* ---- dagbok ---- */
  'scr.journal.dayStreak': 'dagar i rad',
  'scr.journal.practices': 'praktiker',
  'scr.journal.minutes': 'minuter',
  'scr.journal.last4w': 'Senaste 4 veckorna',
  'scr.journal.lastNDays': 'Senaste {n} dagarna',
  'scr.journal.reasonHistory': 'Obegränsad dagbokshistorik',
  'scr.journal.fullHistory': 'fullständig historik →',
  'scr.journal.gridNote': 'Fyllning = övade minuter · ring = loggat humör',
  'scr.journal.recent': 'Senaste praktik',
  'scr.journal.noSessions': 'Inga sessioner än — starta en från panelen.',
  'scr.journal.endedEarly': ' · avslutad tidigt',
  'scr.journal.min': '{n} min',

  /* ---- ritual (praktikkörning) ---- */
  'scr.ritual.attuning': 'Stämmer av mot himlen…',
  'scr.ritual.back': 'Tillbaka',
  'scr.ritual.todaysPractice': 'Dagens praktik',
  'scr.ritual.fromLibrary': 'Från biblioteket',
  'scr.ritual.focusAlignment': 'Inriktning av {chakra}',
  'scr.ritual.chakraBlurb': 'En guidad session formad av {planet} och din karta.',
  'scr.ritual.freqBlurb':
    '{intention}. Sitt, mjukna, och låt tonen bära sessionen.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Ton',
  'scr.ritual.journeyNote':
    '{n} rundor, i din egen takt — ungefär 12 minuter. Skärmen guidar varje fas.',
  'scr.ritual.length': 'Längd',
  'scr.ritual.sound': 'Ljud',
  'scr.ritual.sound.tone': 'Ton',
  'scr.ritual.sound.music': 'Musik',
  'scr.ritual.sound.silent': 'Bara skålar',
  'scr.ritual.soundTone': 'Frekvenstonen på {hz} Hz spelar under skålarna.',
  'scr.ritual.soundMusic': 'En mjuk, långsamt rörlig ambient-ackord under skålarna.',
  'scr.ritual.soundSilent': 'Bara klangskålarna som markerar varje steg.',
  'scr.ritual.spokenGuidance': 'Talad vägledning',
  'scr.ritual.notAvailable': 'inte tillgänglig här — orden visas på skärmen',
  'scr.ritual.beginPractice': 'Börja praktiken',
  'scr.ritual.notNow': 'Inte nu',
  'scr.ritual.endSession': '‹ Avsluta session',
  'scr.ritual.complete': 'Praktik klar',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': 'Svit på {n} dagar',
  'scr.ritual.firstLogged': 'Första praktiken loggad',
  'scr.ritual.howNow': 'Hur känns det nu?',
  'scr.ritual.done': 'Klar',

  /* ---- humörincheckning ---- */
  'scr.moodci.default': 'Hur känns det?',
  'scr.moodci.logged': 'Loggat ✦',
  'scr.moodci.logThis': 'Logga det här',
  'scr.moodci.eyebrow': 'Kvällsincheckning',
  'scr.moodci.blurb': 'Ett tryck. Det formar morgondagens aura och din humörtrend.',
  'scr.moodci.noteLabel': 'Anteckning (valfri)',
  'scr.moodci.notePlaceholder': 'Vad du än har i tankarna…',
  'scr.moodci.update': 'Uppdatera incheckningen',
  'scr.moodci.save': 'Spara incheckningen',

  /* ---- födelsehoroskop ---- */
  'scr.natal.eyebrow': 'Födelsehoroskop',
  'scr.natal.title': 'Din födelsehimmel',
  'scr.natal.blurb':
    'Lägg till din födelsedatum, födelsetid och födelseort så ritar Resonance ditt födelsehoroskop — den exakta positionen för Solen, Månen och planeterna i det ögonblick du föddes.',
  'scr.natal.addDetails': 'Lägg till födelseuppgifter',
  'scr.natal.edit': 'redigera',
  'scr.natal.timeUnknown': 'tid okänd (middagstid)',
  'scr.natal.angleLine': '{asc} asc · MC {mc} · {system}',
  'scr.natal.placidus': 'Placidushus',
  'scr.natal.wholeSign': 'helteckenhus',
  'scr.natal.addPlace': 'Lägg till din födelseort för Ascendenten och husen →',
  'scr.natal.wheelAria': 'Födelsehoroskopets hjul',
  'scr.natal.placements': 'Positioner',
  'scr.natal.aspects': 'Radix-aspekter',
  'scr.natal.noAspects': 'Inga stora aspekter i orbis.',
  'scr.natal.house': 'H{n}',

  /* ---- apotek ---- */
  'scr.apoth.eyebrow': 'Apotek',
  'scr.apoth.title': 'Kristallföljeslagare',
  'scr.apoth.subChart': 'Stenar för dagens {chakra}-arbete · {n} i skåpet',
  'scr.apoth.subPlain': '{n} stenar i skåpet',
  'scr.apoth.all': 'Alla',
  'scr.apoth.today': 'Idag',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Inga stenar sorterade under {filter}.',
  'scr.apoth.noneThat': 'den kategorin',
  'scr.apoth.pair': 'para en sten med dagens praktik →',

  /* ---- månskärm ---- */
  'scr.moon.eyebrow': 'Himlen',
  'scr.moon.title': 'Månen',
  'scr.moon.sub': '{phase} · {pct}% upplyst',
  'scr.moon.whereShe': 'Var den är',
  'scr.moon.inSign': 'Månen är i {sign} — {note}.',
  'scr.moon.vocUntil':
    'Utan riktning tills den går in i {sign}{time} — ett dåligt fönster att börja något nytt. Jorda dig och knyt ihop lösa trådar i stället.',
  'scr.moon.vocAt': ' kl. {time}',
  'scr.moon.vocSoon': 'Blir utan riktning om {hours} h.',
  'scr.moon.notVoc': 'Inte utan riktning — Månen gör rena aspekter.',
  'scr.moon.comingUp': 'På gång',

  /* ---- lokala aviseringar ---- */
  'notif.daily.title': 'Din läsning är redo',
  'notif.daily.body': 'Dagens transit, chakra-fokus och praktik väntar.',
  'notif.evening.title': 'Varva ner',
  'notif.evening.body': 'Några andetag och en humörincheckning före sömnen.',
  'notif.newMoon.title': 'Nymåne ikväll',
  'notif.newMoon.body': 'En stilla reset — sätt en avsikt och behåll den för dig själv.',
  'notif.fullMoon.title': 'Fullmåne ikväll',
  'notif.fullMoon.body': 'Känslorna brinner starkt. Lägg märke till vad som kommer upp till ytan.',
  'notif.moonSign.title': 'Månen går in i {sign}',
  'notif.moonSign.body':
    'Det känslomässiga vädret skiftar — ett bra ögonblick att jorda din energi.',
  'notif.voc.title': 'Månen blir snart utan riktning',
  'notif.voc.body':
    'Riktningslösheten börjar om 15 minuter. Jorda din energi — vila, börja inte.',

  /* ---- banner: måne utan riktning ---- */
  'scr.voc.active': 'Måne utan riktning — jorda dig, börja inte. Slutar kl. {time}.',
  'scr.voc.activeSoon': 'Måne utan riktning — jorda dig, börja inte. Slutar snart.',
  'scr.voc.upcoming': 'Månen blir utan riktning om {hours} h.',
  'scr.voc.twoMin': '2 min',

  /* ---- himmel-hubb: chakrafältets sammanfattning ---- */
  'scr.field.summary.join': ' och ',
  'scr.field.summary.pressure': '{names} under press',
  'scr.field.summary.open': '{names} vidöppna',
  'scr.field.summary.carries': '{name} bär dagen',
  'scr.field.summary.settled': 'Ett samlat fält',

  /* ---- fastekort + guide ---- */
  'scr.fast.eyebrow': 'Fasta',
  'scr.fast.phase.waxing': 'tilltagande måne',
  'scr.fast.phase.waning': 'avtagande måne',
  'scr.fast.cardMeta': '{special} · månddag {day} · Måne i {sign}',
  'scr.fast.bestToday': 'Bäst typ idag:',
  'scr.fast.betterDays': 'Bättre dagar framöver',
  'scr.fast.waningWindow': 'Avtagande fönster',
  'scr.fast.cardDisclaimer':
    'Traditionell månvägledning, inte medicinsk rådgivning. Om du har ett hälsotillstånd eller en historia med mat, hoppa över fastan och ät bara lättare.',
  'scr.fast.fiveKinds': 'De fem typerna och dagarna framöver →',
  'scr.fast.less': 'Mindre',
  'scr.fast.howHold': 'Hur du håller den',
  'scr.fast.guideSubSpecial': '{special} · Måne i {sign}',
  'scr.fast.guideSubPhase': '{phase} · månddag {day}',
  'scr.fast.today': 'Idag',
  'scr.fast.skyBacks': 'Himlen backar upp → {method}',
  'scr.fast.whichKind': 'Vilken typ',
  'scr.fast.whichKindBlurb':
    'Fem sätt att hålla en fasta, det mildaste först — vart och ett bedömt för Månen idag. Tryck på en för att öppna den.',
  'scr.fast.holdingWell': 'Hålla den väl',
  'scr.fast.hold1':
    'Drick under tiden — vatten, örtte, svart kaffe. En nypa salt hjälper på de längre.',
  'scr.fast.hold2':
    'Bryt varsamt: ljummet vatten först, sedan något litet och tillagat. Hoppa över den stora måltiden direkt.',
  'scr.fast.hold3':
    'Rör dig långsamt, sov mer, och sluta i det ögonblick din kropp säger stopp.',
  'scr.fast.guideDisclaimer':
    'Traditionell månvägledning, inte medicinsk rådgivning. Torrfasta — utan vatten — bär en verklig risk och är aldrig något himlen «rekommenderar»; den här guiden utgår från att du dricker. Om du är gravid, medicinerad, diabetiker, underviktig, eller har en historia med mat, hoppa över fastan och ät bara lättare.',
}
