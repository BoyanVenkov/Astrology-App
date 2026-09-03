import type { ScreenKey } from '../en/screens'

/** हिन्दी — उप-स्क्रीनों के पाठ। */
export const screens: Record<ScreenKey, string> = {
  /* ---- स्थानीय आकाश / ज़मीन से जुड़ाव ---- */
  'geo.ground.scarce':
    'दिन का उजाला कम है — दोपहर के आसपास थोड़ी देर बाहर जाएँ, कुछ गर्म खाएँ, और जल्दी सोने की अनुमति दें।',
  'geo.ground.long':
    'लंबा उजाला दिन को खींच देता है — दोपहर में छाया और ठंडा पानी लें, और शयनकक्ष को देर की धूप से बचाएँ।',
  'geo.ground.spring':
    'उजाला लौट रहा है — अपने अभ्यास को सुबह की ओर ले जाएँ और ऊर्जा को बनने दें।',
  'geo.ground.summer':
    'उजाले का शिखर — गति कोमल रखें, पानी पिएँ, और मिट्टी या घास पर नंगे पाँव ज़मीन से जुड़ें।',
  'geo.ground.autumn':
    'उजाला सिमट रहा है — धीमे, गर्माने वाले अभ्यासों और दिन के जल्दी समापन को प्राथमिकता दें।',
  'geo.ground.winter':
    'अँधेरा आधा — अभी विश्राम उपयोगी है; अभ्यास छोटे, पुनर्स्थापक और मोमबत्ती की रोशनी में रखें।',
  'geo.season.spring': 'वसंत',
  'geo.season.summer': 'ग्रीष्म',
  'geo.season.autumn': 'शरद',
  'geo.season.winter': 'शीत',

  /* ---- त्वरित राशिफल ---- */
  'scr.quick.eyebrow': 'आज का राशिफल',
  'scr.quick.you': 'आप',
  'scr.quick.moon': 'चंद्रमा',
  'scr.quick.readFull': 'पूरा पढ़ें →',
  'scr.quick.fullPro': 'पूरा पठन · Pro →',

  /* ---- पूरा राशिफल ---- */
  'scr.horo.eyebrow': 'दैनिक राशिफल',
  'scr.horo.addBirth': 'जन्म-विवरण जोड़ें →',
  'scr.horo.moonHead': 'चंद्रमा',
  'scr.horo.skyHead': 'आपके सिर के ऊपर का आकाश',
  'scr.horo.risingNow': 'इसी क्षण, {sign} आप पर उदय हो रहा है।',
  'scr.horo.transitingHouse': '{planet} आपके {ord} भाव से गोचर कर रहा है।',
  'scr.horo.addPlace': 'एक जन्म-स्थान जोड़ें, या «सेटिंग्स» में अपना स्थान साझा करें →',
  'scr.horo.practiceHead': 'आज का अभ्यास',
  'scr.horo.geoLine': '{season} · सूरज {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} घंटे उजाला',
  'scr.horo.birthPlace': ' · आपके जन्म-स्थान का उपयोग',

  /* ---- गोचर ---- */
  'scr.transits.eyebrow': 'आकाश',
  'scr.transits.titleNatal': 'आपकी कुंडली को गोचर',
  'scr.transits.titleSky': 'आज का आकाश',
  'scr.transits.addChart': 'कुंडली जोड़ें',
  'scr.transits.nowHead': 'इसी क्षण, आपके सिर के ऊपर',
  'scr.transits.rising': '{sign} उदय हो रहा है',
  'scr.transits.movingHouse': '{planet} आपके {ord} भाव से गुज़र रहा है — {arena}।',
  'scr.transits.sunMoon': 'सूरज {sunrise}–{sunset} · चंद्रमा {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'जन्म-स्थान',
  'scr.transits.allInOrb': 'कक्षा में हर गोचर',
  'scr.transits.moonAspects': 'आज चंद्रमा की दृष्टियाँ',
  'scr.transits.natalPrefix': 'नैटल ',
  'scr.transits.nothingOrb': 'आज कक्षा में कुछ नहीं।',
  'scr.transits.applying': 'निकट आता',
  'scr.transits.separating': 'दूर होता',
  'scr.transits.orbNote':
    '↑ अभी भी सटीक की ओर क़रीब आ रहा · ↓ अलग हो रहा। संकरी कक्षाएँ अधिक तेज़ महसूस होती हैं।',

  /* ---- डायरी ---- */
  'scr.journal.dayStreak': 'दिन लगातार',
  'scr.journal.practices': 'अभ्यास',
  'scr.journal.minutes': 'मिनट',
  'scr.journal.last4w': 'पिछले 4 सप्ताह',
  'scr.journal.lastNDays': 'पिछले {n} दिन',
  'scr.journal.reasonHistory': 'असीमित डायरी इतिहास',
  'scr.journal.fullHistory': 'पूरा इतिहास →',
  'scr.journal.gridNote': 'भराव = अभ्यास किए मिनट · वलय = दर्ज मनोदशा',
  'scr.journal.recent': 'हाल का अभ्यास',
  'scr.journal.noSessions': 'अभी कोई सत्र नहीं — मुख्य पैनल से एक शुरू करें।',
  'scr.journal.endedEarly': ' · जल्दी समाप्त',
  'scr.journal.min': '{n} मिनट',

  /* ---- अनुष्ठान (अभ्यास का संचालन) ---- */
  'scr.ritual.attuning': 'आकाश के साथ सुर मिला रहे हैं…',
  'scr.ritual.back': 'वापस',
  'scr.ritual.todaysPractice': 'आज का अभ्यास',
  'scr.ritual.fromLibrary': 'लाइब्रेरी से',
  'scr.ritual.focusAlignment': '{chakra} का संरेखण',
  'scr.ritual.chakraBlurb': '{planet} और आपकी कुंडली से गढ़ा गया एक निर्देशित सत्र।',
  'scr.ritual.freqBlurb':
    '{intention}। बैठें, नरम हों, और स्वर को सत्र ले जाने दें।',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'स्वर',
  'scr.ritual.journeyNote':
    '{n} चक्र, अपनी गति से — लगभग 12 मिनट। स्क्रीन हर चरण का मार्गदर्शन करती है।',
  'scr.ritual.length': 'अवधि',
  'scr.ritual.sound': 'ध्वनि',
  'scr.ritual.sound.tone': 'स्वर',
  'scr.ritual.sound.music': 'संगीत',
  'scr.ritual.sound.silent': 'मौन',
  'scr.ritual.soundTone': '{hz} Hz का आवृत्ति-स्वर नीचे बजता है।',
  'scr.ritual.soundMusic': 'एक कोमल, धीरे बहती परिवेशी तान।',
  'scr.ritual.soundSilent': 'कोई ध्वनि नहीं — केवल बोला गया या स्क्रीन पर मार्गदर्शन।',
  'scr.ritual.spokenGuidance': 'बोला गया मार्गदर्शन',
  'scr.ritual.notAvailable': 'यहाँ उपलब्ध नहीं — शब्द स्क्रीन पर दिखते हैं',
  'scr.ritual.beginPractice': 'अभ्यास शुरू करें',
  'scr.ritual.notNow': 'अभी नहीं',
  'scr.ritual.endSession': '‹ सत्र समाप्त करें',
  'scr.ritual.complete': 'अभ्यास पूर्ण',
  'scr.ritual.doneMeta': '{minutes} मिनट · {chakra} · {label}',
  'scr.ritual.streak': '{n} दिन की लड़ी',
  'scr.ritual.firstLogged': 'पहला अभ्यास दर्ज',
  'scr.ritual.howNow': 'अब आप कैसा महसूस करते हैं?',
  'scr.ritual.done': 'हो गया',

  /* ---- मनोदशा रिकॉर्ड ---- */
  'scr.moodci.default': 'आप कैसा महसूस करते हैं?',
  'scr.moodci.logged': 'दर्ज ✦',
  'scr.moodci.logThis': 'यह दर्ज करें',
  'scr.moodci.eyebrow': 'शाम का रिकॉर्ड',
  'scr.moodci.blurb': 'एक स्पर्श। यह कल की आभा और आपकी मनोदशा की प्रवृत्ति को गढ़ता है।',
  'scr.moodci.noteLabel': 'टिप्पणी (वैकल्पिक)',
  'scr.moodci.notePlaceholder': 'आपके मन में जो कुछ भी हो…',
  'scr.moodci.update': 'रिकॉर्ड अपडेट करें',
  'scr.moodci.save': 'रिकॉर्ड सहेजें',

  /* ---- जन्म-कुंडली ---- */
  'scr.natal.eyebrow': 'जन्म-कुंडली',
  'scr.natal.title': 'आपके जन्म का आकाश',
  'scr.natal.blurb':
    'अपनी जन्म-तिथि, जन्म-समय और जन्म-स्थान जोड़ें और Resonance आपकी जन्म-कुंडली बनाएगा — आपके जन्म के क्षण सूर्य, चंद्रमा और ग्रहों की सटीक स्थिति।',
  'scr.natal.addDetails': 'जन्म-विवरण जोड़ें',
  'scr.natal.edit': 'संपादित करें',
  'scr.natal.timeUnknown': 'समय अज्ञात (दोपहर)',
  'scr.natal.angleLine': '{asc} लग्न · MC {mc} · {system}',
  'scr.natal.placidus': 'प्लेसिडस भाव',
  'scr.natal.wholeSign': 'पूर्ण-राशि भाव',
  'scr.natal.addPlace': 'लग्न और भावों के लिए अपना जन्म-स्थान जोड़ें →',
  'scr.natal.wheelAria': 'जन्म-कुंडली का चक्र',
  'scr.natal.placements': 'स्थितियाँ',
  'scr.natal.aspects': 'नैटल दृष्टियाँ',
  'scr.natal.noAspects': 'कक्षा में कोई प्रमुख दृष्टि नहीं।',
  'scr.natal.house': 'भाव {n}',

  /* ---- औषधालय ---- */
  'scr.apoth.eyebrow': 'औषधालय',
  'scr.apoth.title': 'क्रिस्टल साथी',
  'scr.apoth.subChart': 'आज के {chakra} काम के लिए रत्न · अलमारी में {n}',
  'scr.apoth.subPlain': 'अलमारी में {n} रत्न',
  'scr.apoth.all': 'सभी',
  'scr.apoth.today': 'आज',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': '«{filter}» में कोई रत्न नहीं।',
  'scr.apoth.noneThat': 'उस',
  'scr.apoth.pair': 'आज के अभ्यास के साथ एक रत्न जोड़ें →',

  /* ---- चंद्रमा स्क्रीन ---- */
  'scr.moon.eyebrow': 'आकाश',
  'scr.moon.title': 'चंद्रमा',
  'scr.moon.sub': '{phase} · {pct}% प्रकाशित',
  'scr.moon.whereShe': 'वह कहाँ है',
  'scr.moon.inSign': 'चंद्रमा {sign} में है — {note}।',
  'scr.moon.vocUntil':
    '{sign} में प्रवेश तक दिशाहीन{time} — कुछ नया शुरू करने के लिए एक बुरी खिड़की। इसके बजाय ज़मीन से जुड़ें और खुले सिरे बाँधें।',
  'scr.moon.vocAt': ', समय {time}',
  'scr.moon.vocSoon': '{hours} घंटे में दिशाहीन हो जाता है।',
  'scr.moon.notVoc': 'दिशाहीन नहीं — चंद्रमा साफ़ दृष्टियाँ बना रहा है।',
  'scr.moon.comingUp': 'आगे आ रहा है',

  /* ---- स्थानीय सूचनाएँ ---- */
  'notif.daily.title': 'आपका पठन तैयार है',
  'notif.daily.body': 'आज का गोचर, चक्र-केंद्र और अभ्यास आपकी प्रतीक्षा में हैं।',
  'notif.evening.title': 'धीमा करें',
  'notif.evening.body': 'सोने से पहले कुछ साँसें और एक मनोदशा रिकॉर्ड।',
  'notif.newMoon.title': 'आज रात अमावस्या',
  'notif.newMoon.body': 'एक शांत रीसेट — एक संकल्प रखें और उसे अपने पास रखें।',
  'notif.fullMoon.title': 'आज रात पूर्णिमा',
  'notif.fullMoon.body': 'भावनाएँ तेज़ जलती हैं। जो सतह पर आता है उस पर ध्यान दें।',
  'notif.moonSign.title': 'चंद्रमा {sign} में प्रवेश करता है',
  'notif.moonSign.body':
    'भावनात्मक मौसम बदलता है — अपनी ऊर्जा को ज़मीन से जोड़ने का एक अच्छा क्षण।',
  'notif.voc.title': 'चंद्रमा दिशाहीन होने वाला है',
  'notif.voc.body':
    'दिशाहीनता 15 मिनट में शुरू होती है। अपनी ऊर्जा को ज़मीन से जोड़ें — विश्राम करें, शुरू न करें।',

  /* ---- दिशाहीन चंद्रमा बैनर ---- */
  'scr.voc.active': 'दिशाहीन चंद्रमा — ज़मीन से जुड़ें, शुरू न करें। {time} पर समाप्त।',
  'scr.voc.activeSoon': 'दिशाहीन चंद्रमा — ज़मीन से जुड़ें, शुरू न करें। जल्द समाप्त।',
  'scr.voc.upcoming': 'चंद्रमा {hours} घंटे में दिशाहीन हो जाता है।',
  'scr.voc.twoMin': '2 मिनट',

  /* ---- आकाश केंद्र: चक्र-क्षेत्र सारांश ---- */
  'scr.field.summary.join': ' और ',
  'scr.field.summary.pressure': '{names} दबाव में',
  'scr.field.summary.open': '{names} पूरी तरह खुले',
  'scr.field.summary.carries': '{name} दिन को उठाता है',
  'scr.field.summary.settled': 'एक स्थिर क्षेत्र',

  /* ---- उपवास कार्ड और गाइड ---- */
  'scr.fast.eyebrow': 'उपवास',
  'scr.fast.phase.waxing': 'बढ़ता चंद्रमा',
  'scr.fast.phase.waning': 'घटता चंद्रमा',
  'scr.fast.cardMeta': '{special} · चंद्र दिन {day} · चंद्रमा {sign} में',
  'scr.fast.bestToday': 'आज का सबसे अच्छा तरीक़ा:',
  'scr.fast.betterDays': 'आगे बेहतर दिन',
  'scr.fast.waningWindow': 'घटती खिड़की',
  'scr.fast.cardDisclaimer':
    'पारंपरिक चंद्र मार्गदर्शन, चिकित्सकीय सलाह नहीं। अगर आपको कोई स्वास्थ्य समस्या हो या भोजन के साथ इतिहास हो, तो उपवास छोड़ें और बस हल्का खाएँ।',
  'scr.fast.fiveKinds': 'पाँच तरीक़े और आगे के दिन →',
  'scr.fast.less': 'कम',
  'scr.fast.howHold': 'इसे कैसे निभाएँ',
  'scr.fast.guideSubSpecial': '{special} · चंद्रमा {sign} में',
  'scr.fast.guideSubPhase': '{phase} · चंद्र दिन {day}',
  'scr.fast.today': 'आज',
  'scr.fast.skyBacks': 'आकाश समर्थन देता है → {method}',
  'scr.fast.whichKind': 'कौन सा तरीक़ा',
  'scr.fast.whichKindBlurb':
    'उपवास निभाने के पाँच तरीक़े, सबसे कोमल पहले — हर एक आज के चंद्रमा के लिए आँका गया। खोलने के लिए किसी एक पर टैप करें।',
  'scr.fast.holdingWell': 'इसे अच्छे से निभाना',
  'scr.fast.hold1':
    'इसके दौरान पिएँ — पानी, हर्बल चाय, ब्लैक कॉफ़ी। लंबे उपवासों में एक चुटकी नमक मदद करती है।',
  'scr.fast.hold2':
    'कोमलता से तोड़ें: पहले गुनगुना पानी, फिर कुछ छोटा और पका हुआ। भारी भोजन तुरंत न लें।',
  'scr.fast.hold3':
    'धीरे चलें, ज़्यादा सोएँ, और जिस क्षण शरीर रुकने को कहे उसी क्षण रुक जाएँ।',
  'scr.fast.guideDisclaimer':
    'पारंपरिक चंद्र मार्गदर्शन, चिकित्सकीय सलाह नहीं। सूखा उपवास — बिना पानी — एक असली जोखिम रखता है और यह कभी वह नहीं जिसकी आकाश «सिफ़ारिश» करता है; यह गाइड मानता है कि आप पीते हैं। अगर आप गर्भवती हैं, दवा पर हैं, मधुमेह है, कम वज़न है, या भोजन के साथ इतिहास है, तो उपवास छोड़ें और बस हल्का खाएँ।',
}
