import type { ScreenKey } from '../en/screens'

/** Български — надписи по подекраните. */
export const screens: Record<ScreenKey, string> = {
  /* ---- местно небе / заземяване ---- */
  'geo.ground.scarce':
    'Дневната светлина е оскъдна — излез навън около обед, хапни нещо топло и си позволи да заспиш рано.',
  'geo.ground.long':
    'Дългата светлина разтяга деня — потърси сянка и хладна вода на обед и предпази спалнята си от късното слънце.',
  'geo.ground.spring':
    'Светлината се връща — премести практиката си към сутринта и остави енергията да расте.',
  'geo.ground.summer':
    'Връх на светлината — дръж темпото меко, пий вода и се заземи с боси крака на земя или трева.',
  'geo.ground.autumn':
    'Светлината се прибира — избирай по-бавни, стоплящи практики и по-ранно успокоение.',
  'geo.ground.winter':
    'Тъмната половина — почивката е продуктивна сега; дръж практиките кратки, възстановяващи и на свещ.',
  'geo.season.spring': 'Пролет',
  'geo.season.summer': 'Лято',
  'geo.season.autumn': 'Есен',
  'geo.season.winter': 'Зима',

  /* ---- бърз хороскоп ---- */
  'scr.quick.eyebrow': 'Днешният хороскоп',
  'scr.quick.you': 'Ти',
  'scr.quick.moon': 'Луна',
  'scr.quick.readFull': 'Прочети го изцяло →',
  'scr.quick.fullPro': 'Пълният прочит · Pro →',

  /* ---- пълен хороскоп ---- */
  'scr.horo.eyebrow': 'Дневен хороскоп',
  'scr.horo.addBirth': 'Добави детайли за раждане →',
  'scr.horo.moonHead': 'Луната',
  'scr.horo.skyHead': 'Небето над теб',
  'scr.horo.risingNow': 'Точно сега над теб изгрява {sign}.',
  'scr.horo.transitingHouse': '{planet} преминава през твоя {ord} дом.',
  'scr.horo.addPlace': 'Добави място на раждане или сподели локацията си в Настройки →',
  'scr.horo.practiceHead': 'Днешна практика',
  'scr.horo.geoLine': '{season} · слънце {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} ч светлина',
  'scr.horo.birthPlace': ' · по мястото ти на раждане',

  /* ---- транзити ---- */
  'scr.transits.eyebrow': 'Небето',
  'scr.transits.titleNatal': 'Транзити към твоята карта',
  'scr.transits.titleSky': 'Небето днес',
  'scr.transits.addChart': 'Добави карта',
  'scr.transits.nowHead': 'Точно сега, над теб',
  'scr.transits.rising': 'Изгрява {sign}',
  'scr.transits.movingHouse': '{planet} преминава през твоя {ord} дом — {arena}.',
  'scr.transits.sunMoon': 'Слънце {sunrise}–{sunset} · Луна {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'място на раждане',
  'scr.transits.allInOrb': 'Всеки транзит в орбис',
  'scr.transits.moonAspects': 'Аспектите на Луната днес',
  'scr.transits.natalPrefix': 'натален ',
  'scr.transits.nothingOrb': 'Нищо в орбис днес.',
  'scr.transits.applying': 'приближаващ',
  'scr.transits.separating': 'отдалечаващ се',
  'scr.transits.orbNote':
    '↑ още се затяга към точен · ↓ отдалечава се. По-тесните орбиси се усещат по-силно.',

  /* ---- дневник ---- */
  'scr.journal.dayStreak': 'дни серия',
  'scr.journal.practices': 'практики',
  'scr.journal.minutes': 'минути',
  'scr.journal.last4w': 'Последните 4 седмици',
  'scr.journal.lastNDays': 'Последните {n} дни',
  'scr.journal.reasonHistory': 'Неограничена история на дневника',
  'scr.journal.fullHistory': 'пълна история →',
  'scr.journal.gridNote': 'Запълване = практикувани минути · пръстен = записано настроение',
  'scr.journal.recent': 'Скорошна практика',
  'scr.journal.noSessions': 'Още няма сесии — започни от таблото.',
  'scr.journal.endedEarly': ' · прекратена рано',
  'scr.journal.min': '{n} мин',

  /* ---- ритуал (изпълнение на практика) ---- */
  'scr.ritual.attuning': 'Настройване по небето…',
  'scr.ritual.back': 'Назад',
  'scr.ritual.todaysPractice': 'Днешна практика',
  'scr.ritual.fromLibrary': 'От библиотеката',
  'scr.ritual.focusAlignment': 'Подравняване на {chakra} чакра',
  'scr.ritual.chakraBlurb': 'Водена сесия, оформена от {planet} и твоята карта.',
  'scr.ritual.freqBlurb':
    '{intention}. Седни, отпусни се и остави тона да носи сесията.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Тон',
  'scr.ritual.journeyNote':
    '{n} кръга, по твое темпо — около 12 минути. Екранът води всяка фаза.',
  'scr.ritual.length': 'Продължителност',
  'scr.ritual.sound': 'Звук',
  'scr.ritual.sound.tone': 'Тон',
  'scr.ritual.sound.music': 'Музика',
  'scr.ritual.sound.silent': 'Само купи',
  'scr.ritual.soundTone': 'Тонът от {hz} Hz звучи под купите.',
  'scr.ritual.soundMusic': 'Мек, бавно движещ се ембиънт акорд под купите.',
  'scr.ritual.soundSilent': 'Само пеещите купи, които маркират всяка стъпка.',
  'scr.ritual.spokenGuidance': 'Гласово напътствие',
  'scr.ritual.notAvailable': 'не е достъпно тук — думите се показват на екрана',
  'scr.ritual.beginPractice': 'Започни практиката',
  'scr.ritual.notNow': 'Не сега',
  'scr.ritual.endSession': '‹ Край на сесията',
  'scr.ritual.complete': 'Практиката завърши',
  'scr.ritual.doneMeta': '{minutes} мин · {chakra} · {label}',
  'scr.ritual.streak': 'Серия от {n} дни',
  'scr.ritual.firstLogged': 'Първа записана практика',
  'scr.ritual.howNow': 'Как се чувстваш сега?',
  'scr.ritual.done': 'Готово',

  /* ---- проверка на настроението ---- */
  'scr.moodci.default': 'Как се чувстваш?',
  'scr.moodci.logged': 'Записано ✦',
  'scr.moodci.logThis': 'Запиши това',
  'scr.moodci.eyebrow': 'Вечерна проверка',
  'scr.moodci.blurb': 'Едно докосване. Оформя утрешната аура и тенденцията на настроението ти.',
  'scr.moodci.noteLabel': 'Бележка (по избор)',
  'scr.moodci.notePlaceholder': 'Каквото ти е на ум…',
  'scr.moodci.update': 'Обнови проверката',
  'scr.moodci.save': 'Запази проверката',

  /* ---- натална карта ---- */
  'scr.natal.eyebrow': 'Натална карта',
  'scr.natal.title': 'Небето при раждането ти',
  'scr.natal.blurb':
    'Добави датата, часа и мястото на раждане и Resonance ще начертае наталната ти карта — точното положение на Слънцето, Луната и планетите в мига, в който си роден.',
  'scr.natal.addDetails': 'Добави детайли за раждане',
  'scr.natal.edit': 'редакция',
  'scr.natal.timeUnknown': 'непознат час (обед)',
  'scr.natal.angleLine': '{asc} на асцендента · MC {mc} · {system}',
  'scr.natal.placidus': 'домове по Пласидус',
  'scr.natal.wholeSign': 'домове по цял знак',
  'scr.natal.addPlace': 'Добави мястото си на раждане за асцендента и домовете →',
  'scr.natal.wheelAria': 'Колело на наталната карта',
  'scr.natal.placements': 'Позиции',
  'scr.natal.aspects': 'Натални аспекти',
  'scr.natal.noAspects': 'Няма големи аспекти в орбис.',
  'scr.natal.house': 'Д{n}',

  /* ---- аптека ---- */
  'scr.apoth.eyebrow': 'Аптека',
  'scr.apoth.title': 'Кристални спътници',
  'scr.apoth.subChart': 'Камъни за работа с {chakra} чакра днес · {n} в шкафа',
  'scr.apoth.subPlain': '{n} камъка в шкафа',
  'scr.apoth.all': 'Всички',
  'scr.apoth.today': 'Днес',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Няма камъни в категория {filter}.',
  'scr.apoth.noneThat': 'тази',
  'scr.apoth.pair': 'съчетай камък с днешната практика →',

  /* ---- екран „Луната“ ---- */
  'scr.moon.eyebrow': 'Небето',
  'scr.moon.title': 'Луната',
  'scr.moon.sub': '{phase} · {pct}% осветена',
  'scr.moon.whereShe': 'Къде е тя',
  'scr.moon.inSign': 'Луната е в {sign} — {note}.',
  'scr.moon.vocUntil':
    'Без курс, докато влезе в {sign}{time} — лош прозорец да започваш нещо ново. Вместо това се заземи и довърши недовършеното.',
  'scr.moon.vocAt': ' в {time}',
  'scr.moon.vocSoon': 'Става без курс след {hours} ч.',
  'scr.moon.notVoc': 'Не е без курс — Луната прави чисти аспекти.',
  'scr.moon.comingUp': 'Предстои',

  /* ---- локални известия ---- */
  'notif.daily.title': 'Прочитът ти е готов',
  'notif.daily.body': 'Днешният транзит, фокусът на чакрата и практиката те чакат.',
  'notif.evening.title': 'Успокой се',
  'notif.evening.body': 'Няколко дишания и проверка на настроението преди сън.',
  'notif.newMoon.title': 'Новолуние тази вечер',
  'notif.newMoon.body': 'Тихо нулиране — заложи намерение и го запази за себе си.',
  'notif.fullMoon.title': 'Пълнолуние тази вечер',
  'notif.fullMoon.body': 'Чувствата греят ярко. Забележи какво излиза на повърхността.',
  'notif.moonSign.title': 'Луната влиза в {sign}',
  'notif.moonSign.body':
    'Емоционалното време се променя — добър момент да заземиш енергията си.',
  'notif.voc.title': 'Луната става без курс',
  'notif.voc.body':
    'Безкурсието започва след 15 минути. Заземи енергията си — почивай, не започвай.',

  /* ---- банер за безкурсна Луна ---- */
  'scr.voc.active': 'Луна без курс — заземи се, не започвай. Свършва в {time}.',
  'scr.voc.activeSoon': 'Луна без курс — заземи се, не започвай. Свършва скоро.',
  'scr.voc.upcoming': 'Луната става без курс след {hours} ч.',
  'scr.voc.twoMin': '2 мин',

  /* ---- небе-хъб: обобщение на чакра полето ---- */
  'scr.field.summary.join': ' и ',
  'scr.field.summary.pressure': '{names} под напрежение',
  'scr.field.summary.open': '{names} широко отворени',
  'scr.field.summary.carries': '{name} носи деня',
  'scr.field.summary.settled': 'Уталожено поле',

  /* ---- карта и наръчник за пост ---- */
  'scr.fast.eyebrow': 'Пост',
  'scr.fast.phase.waxing': 'нарастваща луна',
  'scr.fast.phase.waning': 'намаляваща луна',
  'scr.fast.cardMeta': '{special} · лунен ден {day} · Луна в {sign}',
  'scr.fast.bestToday': 'Най-добрият вид днес:',
  'scr.fast.betterDays': 'По-добри дни напред',
  'scr.fast.waningWindow': 'Намаляващ прозорец',
  'scr.fast.cardDisclaimer':
    'Традиционно лунно напътствие, не медицински съвет. Ако имаш здравословно състояние или история с храната, пропусни поста и просто яж по-леко.',
  'scr.fast.fiveKinds': 'Петте вида и дните напред →',
  'scr.fast.less': 'По-малко',
  'scr.fast.howHold': 'Как да го издържиш',
  'scr.fast.guideSubSpecial': '{special} · Луна в {sign}',
  'scr.fast.guideSubPhase': '{phase} · лунен ден {day}',
  'scr.fast.today': 'Днес',
  'scr.fast.skyBacks': 'Небето подкрепя → {method}',
  'scr.fast.whichKind': 'Кой вид',
  'scr.fast.whichKindBlurb':
    'Пет начина да издържиш пост, най-мекият първо — всеки оценен за Луната днес. Докосни един, за да го отвориш.',
  'scr.fast.holdingWell': 'Как да го носиш добре',
  'scr.fast.hold1':
    'Пий през него — вода, билков чай, черно кафе. Щипка сол помага при по-дългите.',
  'scr.fast.hold2':
    'Прекъсвай внимателно: първо топла вода, после нещо малко и сготвено. Не се хвърляй веднага на голямото хранене.',
  'scr.fast.hold3':
    'Движи се бавно, спи повече и спри в мига, в който тялото ти каже да спреш.',
  'scr.fast.guideDisclaimer':
    'Традиционно лунно напътствие, не медицински съвет. Сухото гладуване — без вода — носи реален риск и никога не е нещо, което небето „препоръчва“; този наръчник допуска, че пиеш. Ако си бременна, на лекарства, диабетик, с поднормено тегло или с история с храната, пропусни поста и просто яж по-леко.',
}
