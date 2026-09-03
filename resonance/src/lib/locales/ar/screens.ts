import type { ScreenKey } from '../en/screens'

/** العربية — نصوص الشاشات الفرعية. */
export const screens: Record<ScreenKey, string> = {
  /* ---- السماء المحلية / التأريض ---- */
  'geo.ground.scarce':
    'ضوء النهار شحيح — اخرُج قرب الظهر، وكُل شيئاً دافئاً، وامنح نفسك النوم مبكراً.',
  'geo.ground.long':
    'الضوء الطويل يمدّ النهار — خُذ الظلّ والماء البارد ظهراً، واحمِ غرفة نومك من شمس المساء.',
  'geo.ground.spring':
    'الضوء يعود — انقل ممارستك نحو الصباح ودع الطاقة تتراكم.',
  'geo.ground.summer':
    'ذروة الضوء — أبقِ الإيقاع لطيفاً، اشرب الماء، وأرّض بقدمين حافيتين على التراب أو العشب.',
  'geo.ground.autumn':
    'الضوء ينسحب — فضّل ممارسات أبطأ مُدفئة وتهدئة أبكر.',
  'geo.ground.winter':
    'النصف المظلم — الراحة منتجة الآن؛ أبقِ الممارسات قصيرة مُستعيدة على ضوء شمعة.',
  'geo.season.spring': 'الربيع',
  'geo.season.summer': 'الصيف',
  'geo.season.autumn': 'الخريف',
  'geo.season.winter': 'الشتاء',

  /* ---- الأبراج السريعة ---- */
  'scr.quick.eyebrow': 'أبراج اليوم',
  'scr.quick.you': 'أنت',
  'scr.quick.moon': 'القمر',
  'scr.quick.readFull': 'اقرأها كاملة ←',
  'scr.quick.fullPro': 'القراءة الكاملة · Pro ←',

  /* ---- الأبراج الكاملة ---- */
  'scr.horo.eyebrow': 'الأبراج اليومية',
  'scr.horo.addBirth': 'أضف بيانات الميلاد ←',
  'scr.horo.moonHead': 'القمر',
  'scr.horo.skyHead': 'السماء فوقك',
  'scr.horo.risingNow': '{sign} يصعد فوقك الآن.',
  'scr.horo.transitingHouse': '{planet} يعبر بيتك {ord}.',
  'scr.horo.addPlace': 'أضف مكان ميلاد، أو شارِك موقعك في الإعدادات ←',
  'scr.horo.practiceHead': 'ممارسة اليوم',
  'scr.horo.geoLine': '{season} · الشمس {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} ساعة ضوء',
  'scr.horo.birthPlace': ' · نستخدم مكان ميلادك',

  /* ---- العبورات ---- */
  'scr.transits.eyebrow': 'السماء',
  'scr.transits.titleNatal': 'عبورات إلى خريطتك',
  'scr.transits.titleSky': 'السماء اليوم',
  'scr.transits.addChart': 'أضف خريطة',
  'scr.transits.nowHead': 'الآن، فوقك',
  'scr.transits.rising': '{sign} يصعد',
  'scr.transits.movingHouse': '{planet} يتحرّك خلال بيتك {ord} — {arena}.',
  'scr.transits.sunMoon': 'الشمس {sunrise}–{sunset} · القمر {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'مكان الميلاد',
  'scr.transits.allInOrb': 'كل عبور في المدار',
  'scr.transits.moonAspects': 'اتصالات القمر اليوم',
  'scr.transits.natalPrefix': 'الميلادي ',
  'scr.transits.nothingOrb': 'لا شيء في المدار اليوم.',
  'scr.transits.applying': 'مُقبِل',
  'scr.transits.separating': 'مُنفصِل',
  'scr.transits.orbNote':
    '↑ ما زال يشتدّ نحو التمام · ↓ ينفصل. المدارات الأضيق تُحَسّ أقوى.',

  /* ---- المذكّرة ---- */
  'scr.journal.dayStreak': 'يوماً متتالياً',
  'scr.journal.practices': 'ممارسات',
  'scr.journal.minutes': 'دقائق',
  'scr.journal.last4w': 'آخر ٤ أسابيع',
  'scr.journal.lastNDays': 'آخر {n} يوماً',
  'scr.journal.reasonHistory': 'سجلّ مذكّرة غير محدود',
  'scr.journal.fullHistory': 'السجلّ الكامل ←',
  'scr.journal.gridNote': 'التعبئة = دقائق مُمارَسة · الحلقة = مزاج مُسجَّل',
  'scr.journal.recent': 'الممارسة الأخيرة',
  'scr.journal.noSessions': 'لا جلسات بعد — ابدأ واحدة من اللوحة الرئيسية.',
  'scr.journal.endedEarly': ' · انتهت مبكراً',
  'scr.journal.min': '{n} دقيقة',

  /* ---- الطقس (مُشغّل الممارسة) ---- */
  'scr.ritual.attuning': 'يتناغم مع السماء…',
  'scr.ritual.back': 'رجوع',
  'scr.ritual.todaysPractice': 'ممارسة اليوم',
  'scr.ritual.fromLibrary': 'من المكتبة',
  'scr.ritual.focusAlignment': 'محاذاة {chakra}',
  'scr.ritual.chakraBlurb': 'جلسة مُوجَّهة يُشكّلها {planet} وخريطتك.',
  'scr.ritual.freqBlurb':
    '{intention}. اجلس، ليّن، ودع النغمة تحمل الجلسة.',
  'scr.ritual.metaLine': '{hz} هرتز · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'نغمة',
  'scr.ritual.journeyNote':
    '{n} جولات، بإيقاعك — نحو ١٢ دقيقة. الشاشة تُوجّه كل طور.',
  'scr.ritual.length': 'المدّة',
  'scr.ritual.sound': 'الصوت',
  'scr.ritual.sound.tone': 'نغمة',
  'scr.ritual.sound.music': 'موسيقى',
  'scr.ritual.sound.silent': 'أوعية فقط',
  'scr.ritual.soundTone': 'نغمة التردّد {hz} هرتز تعزف تحت الأوعية.',
  'scr.ritual.soundMusic': 'وتر محيط ناعم بطيء الحركة تحت الأوعية.',
  'scr.ritual.soundSilent': 'الأوعية الرنّانة التي تُعلِّم كل خطوة فقط.',
  'scr.ritual.spokenGuidance': 'إرشاد منطوق',
  'scr.ritual.notAvailable': 'غير متاح هنا — تظهر الكلمات على الشاشة',
  'scr.ritual.beginPractice': 'ابدأ الممارسة',
  'scr.ritual.notNow': 'ليس الآن',
  'scr.ritual.endSession': '› إنهاء الجلسة',
  'scr.ritual.complete': 'اكتملت الممارسة',
  'scr.ritual.doneMeta': '{minutes} دقيقة · {chakra} · {label}',
  'scr.ritual.streak': 'سلسلة {n} يوماً',
  'scr.ritual.firstLogged': 'سُجِّلت الممارسة الأولى',
  'scr.ritual.howNow': 'كيف تشعر الآن؟',
  'scr.ritual.done': 'تمّ',

  /* ---- تسجيل المزاج ---- */
  'scr.moodci.default': 'كيف تشعر؟',
  'scr.moodci.logged': 'سُجِّل ✦',
  'scr.moodci.logThis': 'سجّل هذا',
  'scr.moodci.eyebrow': 'تسجيل المساء',
  'scr.moodci.blurb': 'نقرة واحدة. تُشكّل هالة الغد واتجاه مزاجك.',
  'scr.moodci.noteLabel': 'ملاحظة (اختياري)',
  'scr.moodci.notePlaceholder': 'أي شيء في بالك…',
  'scr.moodci.update': 'حدّث التسجيل',
  'scr.moodci.save': 'احفظ التسجيل',

  /* ---- خريطة الميلاد ---- */
  'scr.natal.eyebrow': 'خريطة الميلاد',
  'scr.natal.title': 'سماء ميلادك',
  'scr.natal.blurb':
    'أضف تاريخ ميلادك ووقته ومكانه وسيرسم Resonance خريطة ميلادك — الموضع الدقيق للشمس والقمر والكواكب لحظة ولادتك.',
  'scr.natal.addDetails': 'أضف بيانات الميلاد',
  'scr.natal.edit': 'تعديل',
  'scr.natal.timeUnknown': 'الوقت غير معروف (الظهر)',
  'scr.natal.angleLine': '{asc} صاعد · MC {mc} · {system}',
  'scr.natal.placidus': 'بيوت بلاسيدوس',
  'scr.natal.wholeSign': 'بيوت البرج الكامل',
  'scr.natal.addPlace': 'أضف مكان ميلادك للطالع والبيوت ←',
  'scr.natal.wheelAria': 'عجلة خريطة الميلاد',
  'scr.natal.placements': 'المواضع',
  'scr.natal.aspects': 'اتصالات الميلاد',
  'scr.natal.noAspects': 'لا اتصالات كبرى في المدار.',
  'scr.natal.house': 'ب{n}',

  /* ---- الصيدلية ---- */
  'scr.apoth.eyebrow': 'الصيدلية',
  'scr.apoth.title': 'رفاق البلّور',
  'scr.apoth.subChart': 'أحجار لعمل {chakra} اليوم · {n} في الخزانة',
  'scr.apoth.subPlain': '{n} أحجار في الخزانة',
  'scr.apoth.all': 'الكل',
  'scr.apoth.today': 'اليوم',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'لا أحجار مصنّفة تحت {filter}.',
  'scr.apoth.noneThat': 'ذلك',
  'scr.apoth.pair': 'قرِن حجراً بممارسة اليوم ←',

  /* ---- شاشة القمر ---- */
  'scr.moon.eyebrow': 'السماء',
  'scr.moon.title': 'القمر',
  'scr.moon.sub': '{phase} · {pct}٪ مُضاء',
  'scr.moon.whereShe': 'أين هو',
  'scr.moon.inSign': 'القمر في {sign} — {note}.',
  'scr.moon.vocUntil':
    'خالي المسار حتى يدخل {sign}{time} — نافذة سيّئة لبدء شيء جديد. أرّض واربط الأطراف الرخوة بدلاً من ذلك.',
  'scr.moon.vocAt': ' عند {time}',
  'scr.moon.vocSoon': 'يصير خالي المسار خلال {hours} ساعة.',
  'scr.moon.notVoc': 'ليس خالي المسار — القمر يصنع اتصالات نظيفة.',
  'scr.moon.comingUp': 'قادم',

  /* ---- الإشعارات المحلية ---- */
  'notif.daily.title': 'قراءتك جاهزة',
  'notif.daily.body': 'عبور اليوم وتركيز الشاكرا والممارسة بانتظارك.',
  'notif.evening.title': 'هدّئ',
  'notif.evening.body': 'أنفاس قليلة وتسجيل مزاج قبل النوم.',
  'notif.newMoon.title': 'محاق الليلة',
  'notif.newMoon.body': 'إعادة ضبط هادئة — حدّد نيّة واحتفِظ بها لنفسك.',
  'notif.fullMoon.title': 'بدر الليلة',
  'notif.fullMoon.body': 'المشاعر تتوهّج. لاحِظ ما يطفو إلى السطح.',
  'notif.moonSign.title': 'القمر يدخل {sign}',
  'notif.moonSign.body':
    'الطقس العاطفي يتحوّل — لحظة جيّدة لتأريض طاقتك.',
  'notif.voc.title': 'القمر يصير خالي المسار',
  'notif.voc.body':
    'يبدأ خلوّ المسار خلال ١٥ دقيقة. أرّض طاقتك — استرِح، لا تبدأ.',

  /* ---- شريط القمر خالي المسار ---- */
  'scr.voc.active': 'قمر خالي المسار — أرّض، لا تبدأ. ينتهي {time}.',
  'scr.voc.activeSoon': 'قمر خالي المسار — أرّض، لا تبدأ. ينتهي قريباً.',
  'scr.voc.upcoming': 'القمر يصير خالي المسار خلال {hours} ساعة.',
  'scr.voc.twoMin': 'دقيقتان',

  /* ---- مركز السماء: ملخّص حقل الشاكرات ---- */
  'scr.field.summary.join': ' و',
  'scr.field.summary.pressure': '{names} تحت الضغط',
  'scr.field.summary.open': '{names} مفتوح على مصراعيه',
  'scr.field.summary.carries': '{name} يحمل اليوم',
  'scr.field.summary.settled': 'حقل مستقرّ',

  /* ---- بطاقة الصيام + الدليل ---- */
  'scr.fast.eyebrow': 'الصيام',
  'scr.fast.phase.waxing': 'قمر متزايد',
  'scr.fast.phase.waning': 'قمر متناقص',
  'scr.fast.cardMeta': '{special} · يوم قمري {day} · القمر في {sign}',
  'scr.fast.bestToday': 'أفضل نوع اليوم:',
  'scr.fast.betterDays': 'أيام أفضل قادمة',
  'scr.fast.waningWindow': 'نافذة التناقص',
  'scr.fast.cardDisclaimer':
    'إرشاد قمري تقليدي، لا نصيحة طبية. إن كانت لديك حالة صحّية أو تاريخ مع الطعام، تخطَّ الصيام وكُل أخفّ فقط.',
  'scr.fast.fiveKinds': 'الأنواع الخمسة والأيام القادمة ←',
  'scr.fast.less': 'أقلّ',
  'scr.fast.howHold': 'كيف تُحافظ عليه',
  'scr.fast.guideSubSpecial': '{special} · القمر في {sign}',
  'scr.fast.guideSubPhase': '{phase} · يوم قمري {day}',
  'scr.fast.today': 'اليوم',
  'scr.fast.skyBacks': 'السماء تدعم ← {method}',
  'scr.fast.whichKind': 'أي نوع',
  'scr.fast.whichKindBlurb':
    'خمس طرق للحفاظ على صيام، الألطف أولاً — كلٌّ مُقيَّم للقمر اليوم. انقر واحدة لفتحها.',
  'scr.fast.holdingWell': 'الحفاظ عليه جيداً',
  'scr.fast.hold1':
    'اشرب خلاله — ماء وشاي أعشاب وقهوة سوداء. رشّة ملح تساعد في الأطول.',
  'scr.fast.hold2':
    'افطر بلطف: ماء دافئ أولاً، ثم شيء صغير ومطبوخ. تخطَّ الوجبة الكبيرة فوراً.',
  'scr.fast.hold3':
    'تحرّك ببطء، نَم أكثر، وتوقّف لحظة يقول جسدك توقّف.',
  'scr.fast.guideDisclaimer':
    'إرشاد قمري تقليدي، لا نصيحة طبية. الصيام الجافّ — بلا ماء — يحمل خطراً حقيقياً وليس أبداً ما «توصي» به السماء؛ يفترض هذا الدليل أنك تشرب. إن كنت حاملاً أو على دواء أو مصاباً بالسكّري أو ناقص الوزن أو لديك تاريخ مع الطعام، تخطَّ الصيام وكُل أخفّ فقط.',
}
