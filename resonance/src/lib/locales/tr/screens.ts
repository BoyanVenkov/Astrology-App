import type { ScreenKey } from '../en/screens'

/** Türkçe — alt ekranların metinleri. */
export const screens: Record<ScreenKey, string> = {
  /* ---- yerel gökyüzü / topraklanma ---- */
  'geo.ground.scarce':
    'Gün ışığı kıt — öğlene doğru dışarı çık, sıcak bir şey ye ve kendine erken uyuma izni ver.',
  'geo.ground.long':
    'Uzun ışık günü uzatıyor — öğlen gölge ve serin su al, yatak odanı geç güneşten koru.',
  'geo.ground.spring':
    'Işık geri dönüyor — pratiğini sabaha kaydır ve enerjinin birikmesine izin ver.',
  'geo.ground.summer':
    'Işığın zirvesi — tempoyu nazik tut, su iç ve çıplak ayakla toprakta ya da çimende topraklan.',
  'geo.ground.autumn':
    'Işık içeri çekiliyor — daha yavaş, ısıtan pratikleri ve daha erken bir yavaşlamayı tercih et.',
  'geo.ground.winter':
    'Karanlık yarı — dinlenmek şimdi verimli; pratikleri kısa, onarıcı ve mum ışığında tut.',
  'geo.season.spring': 'İlkbahar',
  'geo.season.summer': 'Yaz',
  'geo.season.autumn': 'Sonbahar',
  'geo.season.winter': 'Kış',

  /* ---- hızlı burç yorumu ---- */
  'scr.quick.eyebrow': 'Bugünün burç yorumu',
  'scr.quick.you': 'Sen',
  'scr.quick.moon': 'Ay',
  'scr.quick.readFull': 'Tamamını oku →',
  'scr.quick.fullPro': 'Tam okuma · Pro →',

  /* ---- tam burç yorumu ---- */
  'scr.horo.eyebrow': 'Günlük Burç Yorumu',
  'scr.horo.addBirth': 'Doğum bilgilerini ekle →',
  'scr.horo.moonHead': 'Ay',
  'scr.horo.skyHead': 'Üzerindeki gökyüzü',
  'scr.horo.risingNow': '{sign} şu an üzerinde yükseliyor.',
  'scr.horo.transitingHouse': '{planet} {ord} evinden transit yapıyor.',
  'scr.horo.addPlace': 'Bir doğum yeri ekle ya da Ayarlar’dan konumunu paylaş →',
  'scr.horo.practiceHead': 'Bugünün pratiği',
  'scr.horo.geoLine': '{season} · güneş {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} saat ışık',
  'scr.horo.birthPlace': ' · doğum yerin kullanılıyor',

  /* ---- transitler ---- */
  'scr.transits.eyebrow': 'Gökyüzü',
  'scr.transits.titleNatal': 'Haritana transitler',
  'scr.transits.titleSky': 'Bugün gökyüzü',
  'scr.transits.addChart': 'Harita ekle',
  'scr.transits.nowHead': 'Şu an, üzerinde',
  'scr.transits.rising': '{sign} yükseliyor',
  'scr.transits.movingHouse': '{planet} {ord} evinden geçiyor — {arena}.',
  'scr.transits.sunMoon': 'Güneş {sunrise}–{sunset} · Ay {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'doğum yeri',
  'scr.transits.allInOrb': 'Yörüngedeki her transit',
  'scr.transits.moonAspects': 'Ay’ın bugünkü açıları',
  'scr.transits.natalPrefix': 'natal ',
  'scr.transits.nothingOrb': 'Bugün yörüngede bir şey yok.',
  'scr.transits.applying': 'yaklaşan',
  'scr.transits.separating': 'ayrılan',
  'scr.transits.orbNote':
    '↑ hâlâ tama doğru sıkılaşıyor · ↓ ayrılıyor. Daha dar yörüngeler daha güçlü hissedilir.',

  /* ---- günlük ---- */
  'scr.journal.dayStreak': 'günlük seri',
  'scr.journal.practices': 'pratik',
  'scr.journal.minutes': 'dakika',
  'scr.journal.last4w': 'Son 4 hafta',
  'scr.journal.lastNDays': 'Son {n} gün',
  'scr.journal.reasonHistory': 'Sınırsız günlük geçmişi',
  'scr.journal.fullHistory': 'tam geçmiş →',
  'scr.journal.gridNote': 'Dolgu = pratik yapılan dakika · halka = kaydedilen ruh hali',
  'scr.journal.recent': 'Son pratik',
  'scr.journal.noSessions': 'Henüz oturum yok — ana panelden bir tane başlat.',
  'scr.journal.endedEarly': ' · erken bitti',
  'scr.journal.min': '{n} dk',

  /* ---- ritüel (pratik oynatıcı) ---- */
  'scr.ritual.attuning': 'Gökyüzüne uyumlanıyor…',
  'scr.ritual.back': 'Geri',
  'scr.ritual.todaysPractice': 'Bugünün Pratiği',
  'scr.ritual.fromLibrary': 'Kütüphaneden',
  'scr.ritual.focusAlignment': '{chakra} hizalaması',
  'scr.ritual.chakraBlurb': '{planet} ve haritan tarafından şekillenen rehberli bir oturuş.',
  'scr.ritual.freqBlurb':
    '{intention}. Otur, yumuşa ve tonun oturumu taşımasına izin ver.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Ton',
  'scr.ritual.journeyNote':
    '{n} tur, kendi hızında — yaklaşık 12 dakika. Ekran her evreyi yönlendirir.',
  'scr.ritual.length': 'Süre',
  'scr.ritual.sound': 'Ses',
  'scr.ritual.sound.tone': 'Ton',
  'scr.ritual.sound.music': 'Müzik',
  'scr.ritual.sound.silent': 'Yalnızca kâseler',
  'scr.ritual.soundTone': '{hz} Hz frekans tonu kâselerin altında çalar.',
  'scr.ritual.soundMusic': 'Kâselerin altında yumuşak, yavaş hareket eden bir ortam akoru.',
  'scr.ritual.soundSilent': 'Her adımı işaretleyen yalnızca şarkı söyleyen kâseler.',
  'scr.ritual.spokenGuidance': 'Sesli rehberlik',
  'scr.ritual.notAvailable': 'burada yok — sözcükler ekranda görünür',
  'scr.ritual.beginPractice': 'Pratiğe başla',
  'scr.ritual.notNow': 'Şimdi değil',
  'scr.ritual.endSession': '‹ Oturumu bitir',
  'scr.ritual.complete': 'Pratik tamamlandı',
  'scr.ritual.doneMeta': '{minutes} dk · {chakra} · {label}',
  'scr.ritual.streak': '{n} günlük seri',
  'scr.ritual.firstLogged': 'İlk pratik kaydedildi',
  'scr.ritual.howNow': 'Şimdi nasıl hissediyorsun?',
  'scr.ritual.done': 'Bitti',

  /* ---- ruh hali kaydı ---- */
  'scr.moodci.default': 'Nasıl hissediyorsun?',
  'scr.moodci.logged': 'Kaydedildi ✦',
  'scr.moodci.logThis': 'Bunu kaydet',
  'scr.moodci.eyebrow': 'Akşam kaydı',
  'scr.moodci.blurb': 'Tek dokunuş. Yarının aurasını ve ruh hali eğilimini şekillendirir.',
  'scr.moodci.noteLabel': 'Not (isteğe bağlı)',
  'scr.moodci.notePlaceholder': 'Aklında ne varsa…',
  'scr.moodci.update': 'Kaydı güncelle',
  'scr.moodci.save': 'Kaydı kaydet',

  /* ---- doğum haritası ---- */
  'scr.natal.eyebrow': 'Doğum Haritası',
  'scr.natal.title': 'Doğum gökyüzün',
  'scr.natal.blurb':
    'Doğum tarihini, saatini ve yerini ekle; Resonance doğum haritanı çizsin — doğduğun anda Güneş’in, Ay’ın ve gezegenlerin tam konumu.',
  'scr.natal.addDetails': 'Doğum bilgilerini ekle',
  'scr.natal.edit': 'düzenle',
  'scr.natal.timeUnknown': 'saat bilinmiyor (öğlen)',
  'scr.natal.angleLine': '{asc} yükselen · MC {mc} · {system}',
  'scr.natal.placidus': 'Placidus evleri',
  'scr.natal.wholeSign': 'tam burç evleri',
  'scr.natal.addPlace': 'Yükselen ve evler için doğum yerini ekle →',
  'scr.natal.wheelAria': 'Doğum haritası çarkı',
  'scr.natal.placements': 'Yerleşimler',
  'scr.natal.aspects': 'Natal açılar',
  'scr.natal.noAspects': 'Yörüngede büyük açı yok.',
  'scr.natal.house': 'E{n}',

  /* ---- şifahane ---- */
  'scr.apoth.eyebrow': 'Şifahane',
  'scr.apoth.title': 'Kristal Yoldaşlar',
  'scr.apoth.subChart': 'Bugünün {chakra} işi için taşlar · dolapta {n}',
  'scr.apoth.subPlain': 'Dolapta {n} taş',
  'scr.apoth.all': 'Hepsi',
  'scr.apoth.today': 'Bugün',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': '{filter} altında dosyalanmış taş yok.',
  'scr.apoth.noneThat': 'bu',
  'scr.apoth.pair': 'bir taşı bugünün pratiğiyle eşleştir →',

  /* ---- ay ekranı ---- */
  'scr.moon.eyebrow': 'Gökyüzü',
  'scr.moon.title': 'Ay',
  'scr.moon.sub': '{phase} · %{pct} aydınlık',
  'scr.moon.whereShe': 'Nerede',
  'scr.moon.inSign': 'Ay {sign} burcunda — {note}.',
  'scr.moon.vocUntil':
    '{sign} burcuna girene kadar boşlukta{time} — yeni bir şeye başlamak için kötü bir pencere. Bunun yerine topraklan ve gevşek uçları bağla.',
  'scr.moon.vocAt': ' saat {time}',
  'scr.moon.vocSoon': '{hours} saat içinde boşluğa giriyor.',
  'scr.moon.notVoc': 'Boşlukta değil — Ay temiz açılar yapıyor.',
  'scr.moon.comingUp': 'Yaklaşan',

  /* ---- yerel bildirimler ---- */
  'notif.daily.title': 'Okuman hazır',
  'notif.daily.body': 'Bugünün transiti, çakra odağı ve pratiği bekliyor.',
  'notif.evening.title': 'Yavaşla',
  'notif.evening.body': 'Uykudan önce birkaç nefes ve bir ruh hali kaydı.',
  'notif.newMoon.title': 'Bu gece Yeni Ay',
  'notif.newMoon.body': 'Sessiz bir sıfırlama — bir niyet belirle ve kendine sakla.',
  'notif.fullMoon.title': 'Bu gece Dolunay',
  'notif.fullMoon.body': 'Duygular parlak yanıyor. Yüzeye çıkanı fark et.',
  'notif.moonSign.title': 'Ay {sign} burcuna giriyor',
  'notif.moonSign.body':
    'Duygusal hava değişiyor — enerjini topraklamak için iyi bir an.',
  'notif.voc.title': 'Ay boşluğa giriyor',
  'notif.voc.body':
    'Boşluk 15 dakika içinde başlıyor. Enerjini topraklan — dinlen, başlama.',

  /* ---- boşlukta Ay bandı ---- */
  'scr.voc.active': 'Ay boşlukta — topraklan, başlama. {time} biter.',
  'scr.voc.activeSoon': 'Ay boşlukta — topraklan, başlama. Yakında biter.',
  'scr.voc.upcoming': 'Ay {hours} saat içinde boşluğa giriyor.',
  'scr.voc.twoMin': '2 dk',

  /* ---- gökyüzü merkezi: çakra alanı özeti ---- */
  'scr.field.summary.join': ' ve ',
  'scr.field.summary.pressure': '{names} baskı altında',
  'scr.field.summary.open': '{names} ardına kadar açık',
  'scr.field.summary.carries': 'Günü {name} taşıyor',
  'scr.field.summary.settled': 'Oturmuş bir alan',

  /* ---- oruç kartı + rehber ---- */
  'scr.fast.eyebrow': 'Oruç',
  'scr.fast.phase.waxing': 'büyüyen ay',
  'scr.fast.phase.waning': 'küçülen ay',
  'scr.fast.cardMeta': '{special} · ay günü {day} · {sign} burcunda Ay',
  'scr.fast.bestToday': 'Bugün en iyi tür:',
  'scr.fast.betterDays': 'İleride daha iyi günler',
  'scr.fast.waningWindow': 'Küçülen pencere',
  'scr.fast.cardDisclaimer':
    'Geleneksel ay rehberliği, tıbbi tavsiye değil. Bir sağlık durumun ya da yemekle bir geçmişin varsa orucu atla ve sadece daha hafif ye.',
  'scr.fast.fiveKinds': 'Beş tür ve ileriki günler →',
  'scr.fast.less': 'Daha az',
  'scr.fast.howHold': 'Nasıl sürdürülür',
  'scr.fast.guideSubSpecial': '{special} · {sign} burcunda Ay',
  'scr.fast.guideSubPhase': '{phase} · ay günü {day}',
  'scr.fast.today': 'Bugün',
  'scr.fast.skyBacks': 'Gökyüzü destekliyor → {method}',
  'scr.fast.whichKind': 'Hangi tür',
  'scr.fast.whichKindBlurb':
    'Bir orucu sürdürmenin beş yolu, en naziği önce — her biri bugünkü Ay için değerlendirildi. Açmak için birine dokun.',
  'scr.fast.holdingWell': 'İyi sürdürmek',
  'scr.fast.hold1':
    'Boyunca iç — su, bitki çayı, sade kahve. Uzun olanlarda bir tutam tuz yardımcı olur.',
  'scr.fast.hold2':
    'Nazikçe aç: önce ılık su, sonra küçük ve pişmiş bir şey. Büyük öğünü hemen atla.',
  'scr.fast.hold3':
    'Yavaş hareket et, daha çok uyu ve bedenin dur dediği anda dur.',
  'scr.fast.guideDisclaimer':
    'Geleneksel ay rehberliği, tıbbi tavsiye değil. Kuru oruç — susuz gitmek — gerçek bir risk taşır ve gökyüzünün asla «önerdiği» bir şey değildir; bu rehber su içtiğini varsayar. Hamileysen, ilaç kullanıyorsan, diyabetliysen, düşük kiloluysan ya da yemekle bir geçmişin varsa orucu atla ve sadece daha hafif ye.',
}
