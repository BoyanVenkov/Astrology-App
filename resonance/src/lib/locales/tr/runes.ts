import type { RunesKey } from '../en/runes'

/**
 * Türkçe — Eski Futhark: 24 runun anlamları, düz ve ters (merkstave) okuma ve
 * her run için günlük bir yönerge, ayrıca Run ekranının metinleri. Runların
 * adları Eski İskandinavca'dır ve her dilde aynı kalır. «Sen» hitabı.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ metinler */
  'rune.eyebrow': 'Runlar',
  'rune.dailyTitle': 'Bugünkü runun',
  'rune.dailyBlurbChart':
    'Haritan ve bu tarih için atılmış tek bir run. Gece yarısı yenilenir.',
  'rune.dailyBlurbPlain': 'Gün için tek bir run. Gece yarısı yenilenir.',
  'rune.tapReveal': 'Çevirmek için taşa dokun.',
  'rune.turnStone': 'Taşı çevir',
  'rune.merkstave': 'Merkstave (ters)',
  'rune.merkstaveNote':
    'Ters düştü — gölge yanı, tıkanmayı ya da hâlâ öğrenilmemiş dersi oku.',
  'rune.sound': 'Ses',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'Freyr’in Ætt’i',
  'rune.aett.2': 'Heimdall’ın Ætt’i',
  'rune.aett.3': 'Týr’in Ætt’i',

  'rune.element.fire': 'Ateş',
  'rune.element.ice': 'Buz',
  'rune.element.earth': 'Toprak',
  'rune.element.air': 'Hava',
  'rune.element.water': 'Su',
  'rune.element.spirit': 'Ruh',

  'rune.resonance.match':
    'Runlar ve gökyüzü bugün hemfikir — ikisi de {chakra} çakrana işaret ediyor.',
  'rune.resonance.bridge':
    'Bugünün gökyüzü {sky} alanını işliyor; run {rune} alanından yanıt veriyor.',

  'rune.cast': 'Runları at',
  'rune.castSub': 'Üç Norn ya da beş runlu haç',
  'rune.chooseTitle': 'Bir atış seç',
  'rune.chooseBlurb': 'Sorunu tut, sonra runların nasıl düşmesi gerektiğini seç.',
  'rune.runeCount.one': '1 run',
  'rune.runeCount.many': '{n} run',
  'rune.castEyebrow': 'Runlar · {layout}',
  'rune.drawAgain': 'Yeniden at',
  'rune.doCast': 'At',

  'rune.layout.norns': 'Üç Norn',
  'rune.layout.nornsSub': 'Olmuş olan, olmakta olan, borçlu olunan',
  'rune.layout.cross': 'Beş Runlu Haç',
  'rune.layout.crossSub': 'Bir duruma daha dolu bir bakış',

  'rune.pos.now': 'Şimdi',
  'rune.pos.now.prompt': 'nerede durduğun',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'olmuş olan — bunun kökü',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'olmakta olan — şimdiki dönüş',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'olacak olan — neyin borçlu olunduğu ve nereye götürdüğü',
  'rune.pos.heart': 'Öz',
  'rune.pos.heart.prompt': 'meselenin özü',
  'rune.pos.crossing': 'Onu çaprazlayan',
  'rune.pos.crossing.prompt': 'engel ya da yardım',
  'rune.pos.root': 'Kök',
  'rune.pos.root.prompt': 'neyden büyüdüğü',
  'rune.pos.counsel': 'Öğüt',
  'rune.pos.counsel.prompt': 'runların ne öğütlediği',
  'rune.pos.outcome': 'Nereye götürür',
  'rune.pos.outcome.prompt': 'eğilim gösterdiği yön',

  'rune.ask': 'Runlara sor',
  'rune.askSub': 'Bir run, sorununa bir yanıt',
  'rune.askEyebrow': 'Runlar · Soru',
  'rune.askBlurb':
    'Sorunu açıkça ortaya koy ve run çekilirken onu tut.',
  'rune.askPlaceholder': 'Yapmalı mıyım…  ·  Zamanı mı…  ·  Şu konuda ne bilmem gerek…',
  'rune.consult': 'Bir run çek',
  'rune.askAgain': 'Yeniden sor',
  'rune.youAsked': 'Sordun',
  'rune.answerReading': 'Runun söylediği',
  'rune.castReading': 'Okuma',

  'rune.verdict.yes': 'Evet',
  'rune.verdict.no': 'Hayır',
  'rune.verdict.wait': 'Henüz değil',
  'rune.verdict.hidden': 'Gizli',
  'rune.verdict.yes.gloss': 'Run evete yatıyor. Kımılda, ve içtenlikle.',
  'rune.verdict.no.gloss': 'Run uzağa yatıyor. Bunu şimdi zorlamak, geri verdiğinden fazlasına mal olur.',
  'rune.verdict.wait.gloss':
    'Run zamanın olgunlaşmadığını söylüyor. Hazırlan ve anın sana gelmesine izin ver.',
  'rune.verdict.hidden.gloss':
    'Run öğüdünü kendine saklıyor. Bu henüz senin bilmen için değil — yanıt hâlâ biçimleniyor.',

  'rune.library': 'Eski Futhark',
  'rune.librarySub': 'Yirmi dördün hepsi, birlikte oturmak için',

  'dash.dailyRune': 'Günün runu',
  'dash.runeSeen': 'Bugünkü run çevrildi',
  'dash.runeNew': 'Bugünkü rununu at',

  /* ---------------------------------------------- Freyr’in Ætt’i (1–8) */
  'rune.fehu.meaning': 'Sığır — hareketli servet ve neyi satın alabileceği ya da neye mal olabileceği',
  'rune.fehu.keywords': 'Servet · Başlangıçlar · Akış',
  'rune.fehu.up':
    'Fehu sürüdür: hareket eden, çoğalan ve biriktirilirse kayıp giden servet. Yeni kaynakların gelişini işaretler — para, enerji, fırsat, konum — ve büyüyebilecek bir şeyin başlangıcını. Tuzak doğasındadır: bu ancak dolaşımda kalırsa canlı kalır. Bir kısmını harca, bir kısmını paylaş, iş başına koy. Kavradığın şeyi kaybedersin.',
  'rune.fehu.merk':
    'Ters, Fehu kayıptır ya da senin ona değil, onun sana sahip olduğu servet. Bir şey akıp gidiyor ya da bir kaynağı öyle sıkı tutuyorsun ki sana artık hiçbir yararı kalmadı. Enerjinin ve paranın gerçekte nereye gittiğine bak ve neyin tutmaya değer olduğu konusunda dürüst ol.',
  'rune.fehu.today':
    'Bugün bir şeyi dolaşıma sok — para, çaba ya da sakladığın nazik bir söz.',

  'rune.uruz.meaning': 'Yaban öküzü — vahşi, ehlileştirilmemiş yaşam gücü',
  'rune.uruz.keywords': 'Canlılık · Dayanıklılık · Ham biçim',
  'rune.uruz.up':
    'Uruz yaban öküzüdür: sabana kırılmamış güç. Bir bedensel canlılık dalgası, inatçı bir dayanıklılık ve ham koşulu kendine ait bir şeye biçimlendirme gücü getirir. Kas isteyen başlangıçlar için iyi bir rundur — antrenmana başlamak, toprağı kırmak, bir sınırı tutmak. Güç gerçektir; iş onu yönlendirmeyi öğrenmektir.',
  'rune.uruz.merk':
    'Ters, Uruz yanlış kullanılan ya da eksik güçtür — kendine çevrilmiş kuvvet ya da sağlam durman gereken yerde bir zayıflık. Durman gerekirken itiyor ya da hayatındaki vahşi bir şeyi yönetmeden bırakıyor olabilirsin. Gücü, seni sürüklemesine izin vermeden geri al.',
  'rune.uruz.today':
    'Bugün bedenini kullan — uzun yürü, ağır bir şey kaldır ya da ertelediğin bir şeyi aşarak geç.',

  'rune.thurisaz.meaning': 'Diken — keskin, tepkisel, savunmacı bir güç',
  'rune.thurisaz.keywords': 'Savunma · Tepki · Sert bir kapı',
  'rune.thurisaz.up':
    'Thurisaz çitteki diken ve devin çekicidir: incıterek koruyan, kırarak temizleyen bir güç. Çoğu zaman bir yüzleşmeyi, sert bir sınırı ya da cazibeye boyun eğmeyen bir durumu işaretler. Cepheden karşılanınca yaralar; sabırla karşılanınca bir kapı olur. Bu kavgayı arama ama dikenin orada olmadığını da varsayma.',
  'rune.thurisaz.merk':
    'Ters, Thurisaz duvara dönüşmüş bir savunma ya da zarar veren tepkisel bir öfkedir. Etrafa vuruyor ya da saldırıya öyle gerilmişsin ki iyi bir şey de sana ulaşamıyor olabilir. Hak etmemiş birine indirmeden önce çekici yere bırak.',
  'rune.thurisaz.today':
    'Bugün bir sınırı özür dilemeden tut — ve onu üç kez açıklama dürtüsüne diren.',

  'rune.ansuz.meaning': 'Tanrı — nefes, söz, Odin’den gelen mesaj',
  'rune.ansuz.keywords': 'Ses · Mesaj · İçgörü',
  'rune.ansuz.up':
    'Ansuz Ata-Tanrı’nın nefesidir: söz, sinyal ve kendi çabanın dışından gelen ani berraklık. Bir mesaj geliyor ya da bir konuşma göründüğünden önemli. Kendi sesini de yönetir — bu, doğru şeyi açıkça söyleme, öğretme, gördüğünü adlandırma günüdür. Yakından dinle; yanıt bir başkasının ağzında olabilir.',
  'rune.ansuz.merk':
    'Ters, Ansuz yanlış anlaşılmadır, yanlış duyulmuş bir mesaj ya da kimden geldiği yüzünden duymayı reddettiğin bir bilgeliktir. Sözcükler berraklaştırmak yerine karıştırmak için kullanılıyor — seninkiler ya da bir başkasının. Konuşmayı yavaşlat ve aslında ne kastedildiğini kontrol et.',
  'rune.ansuz.today':
    'Bugün net şeyi yüksek sesle söyle ve konuştuğunun iki katı dinle.',

  'rune.raidho.meaning': 'Biniş — yolculuk, tekerlek, doğru ritim',
  'rune.raidho.keywords': 'Yolculuk · Ritim · Doğru düzen',
  'rune.raidho.up':
    'Raidho yoldaki arabadır: bir yönü olan hareket ve kendi ritmi olan bir patika boyunca taşınıyor olma duygusu. Yolculuğu, seni harekete geçiren kararları ve şeyleri gereken düzenine geri koymayı destekler. Ders şu: yolculuğun kendi hızı vardır — yolu aceleye getiremezsin ama onunla dövüşmeyi bırakabilirsin.',
  'rune.raidho.merk':
    'Ters, Raidho durmuş bir yolculuk, sırası bozulmuş bir plan ya da yanlış yönde harekettir. Bir şey ritim dışı — yapmaman gereken bir yolculuk ya da sana pahalıya patlayacak bir acele. Yeniden yola çıkmadan önce şeylerin düzenini düzelt.',
  'rune.raidho.today':
    'Bugün bir sonraki doğru adımı sırayla at; ilginç kısma atlama dürtüsüne diren.',

  'rune.kenaz.meaning': 'Meşale — denetimli ateş, zanaat ve bilgi',
  'rune.kenaz.keywords': 'İçgörü · Zanaat · Yaratıcı ateş',
  'rune.kenaz.up':
    'Kenaz salondaki alevdir: yaban yangın değil, işlenmiş ateş — demirci ocağı, lamba, anlamanın kıvılcımı. Karanlık bir köşeye berraklık, bir işe beceri ve yalnızca hayal etmek yerine yapmak için yaratıcı ısı getirir. Karanlıkta olduğun bir şey görünür olur. Şimdi gördüğünü al ve onu gerçek bir şeye biçimlendir.',
  'rune.kenaz.merk':
    'Ters, Kenaz sönen bir ışıktır — kaybolmuş ilham, soğuyan bir proje ya da inşa etmek yerine yakmak için kullanılan bilgi. Yaratıcı olarak tıkanmış ya da artık hiç ışık vermeyen bir yapma biçimine tutunuyor olabilirsin. Yeni bir alevin tutuşabilmesi için ölü şeyin kararmasına izin ver.',
  'rune.kenaz.today':
    'Bugün bir şey yap, ne kadar küçük ve kaba olursa olsun — mesele bir fikri biçime getirmek.',

  'rune.gebo.meaning': 'Armağan — değiş tokuş ve yarattığı bağ',
  'rune.gebo.keywords': 'Armağan · Değiş tokuş · Ortaklık',
  'rune.gebo.up':
    'Gebo verilen armağan ve borçlu olunan armağandır — insanları birbirine bağlayan yükümlülük ve cömertlik ipliği. Gerçek bir değiş tokuşu işaretler: bir ortaklık, bir sözleşme, geri dönecek bir verme edimi. Ters Gebo yoktur, çünkü bir armağan, verildikten sonra geri verilemez. Özgürce ver ve zarafetle al, ve dengenin zamanla eşitlenmesini izle.',
  'rune.gebo.today':
    'Bugün aklında bir hesap defteri olmadan bir şey ver — ve karşılığında sunulanı kabul etmene izin ver.',

  'rune.wunjo.meaning': 'Sevinç — uyum, aidiyet ve yerine oturan şeyler',
  'rune.wunjo.keywords': 'Sevinç · Uyum · Aidiyet',
  'rune.wunjo.up':
    'Wunjo iyi yönetilen salonun sevincidir: coşku değil, hoşnutluk, şeylerin birbirine oturduğu ve kendi insanlarının arasında olmanın duygusu. Bir çözümü, hak edilmiş bir ödülü ya da parçaların hizalandığı bir anı işaretler. Onu fark etmene izin ver. Bu run, daha iyi bir sürüm için dayanmak yerine gerçekten burada olan iyiyi kabul etmeni ister.',
  'rune.wunjo.merk':
    'Ters, Wunjo ertelenmiş sevinç ya da zor şeyi söylememekle bir arada tutulan sahte bir uyumdur. Yüzeyin altında bir şey akortsuz. Üstünü örtme — gerçek rahatlık dürüst konuşmadan sonra gelir, onun yerine değil.',
  'rune.wunjo.today':
    'Gerçekten iyi giden bir şeyi adlandır ve bugün için bunun yeterli olmasına izin ver.',

  /* -------------------------------------------- Heimdall’ın Ætt’i (9–16) */
  'rune.hagalaz.meaning': 'Dolu — denetiminin dışından ani bozulma',
  'rune.hagalaz.keywords': 'Bozulma · Kriz · Temizlenme',
  'rune.hagalaz.up':
    'Hagalaz dolu fırtınasıdır: gökten düşen, ekini mahveden, sonra bir sonrakini besleyen suya eriyen yıkım. Seçmediğin ve tartışamayacağın bir kesintiyi işaretler — kalıbı kıran bir olay. Burada dövüşecek bir şey yok. Sığın, geçmesine izin ver ve sonrasında hâlâ neyin ayakta olduğuna bak. Dolu zemini temizler.',
  'rune.hagalaz.today':
    'Bugün kırılgan bir şey başlatma. Ambar kapaklarını kapat, havayı bekle ve zeminin temizlendiğine güven.',

  'rune.nauthiz.meaning': 'İhtiyaç — sürtünme, kısıt ve yaptığı ateş',
  'rune.nauthiz.keywords': 'Kısıt · İhtiyaç · Zor ders',
  'rune.nauthiz.up':
    'Nauthiz ihtiyaç ateşidir, baskı altında iki çubuğu sürterek yakılır. Bir kısıtı işaretler — bir kıtlık, bir gecikme, henüz çıkamadığın bir durum — ve o kısıtın senden zorla çıkardığı beceriklilik. Ders sürtünme altında sabırdır. Eksikliği dürüstçe karşıla, gücünün yettiği küçük disiplinli şeyi yap ve direncin sana gerçekte neye ihtiyacın olduğunu öğretmesine izin ver.',
  'rune.nauthiz.merk':
    'Ters, Nauthiz yadsınan ihtiyaçtır — kısıtın orada olmadığını varsaymak ya da zorluğun kırgınlığa ve aceleci kararlara ekşimesine izin vermek. Sınırın gerçeğiyle dövüşmeyi bırak. Aşan yol önce kabul, sonra sabırlı, bilinçli eylemdir.',
  'rune.nauthiz.today':
    'Bugün bir sınırla tartışmak yerine onu kabul et ve onun sana açık bıraktığı o tek küçük disiplinli şeyi yap.',

  'rune.isa.meaning': 'Buz — durgunluk, bir tıkanma, donmuş an',
  'rune.isa.keywords': 'Durgunluk · Tıkanma · Berraklık',
  'rune.isa.up':
    'Isa dibine kadar donmuş nehirdir: tüm hareket durmuş, her şey yerinde tutuluyor. Bir tıkanmayı işaretler — beklemede bir plan, durağanlıkta bir ilişki, ittiğin hiçbir şeyin kımıldamadığı bir dönem. Bu bir başarısızlık değil; kış. Erimeyi zorlamayı bırak. Buzun altında ne olduğunu net görmek için durgunluğu kullan ve gücünü bahar için sakla.',
  'rune.isa.today':
    'Bugün tıkanmış şeyi itmeyi bırak. Onunla otur, ona net bak ve durgunluğun işini yapmasına izin ver.',

  'rune.jera.meaning': 'Yıl — hasat, döngüler ve meyve veren emek',
  'rune.jera.keywords': 'Hasat · Döngüler · Doğru zamanlama',
  'rune.jera.up':
    'Jera dönen yıldır: tohum, büyüme, hasat, dinlenme ve yeniden tohum. Önceki emeğin sonunda ürün verdiği noktayı işaretler — bir şans darbesiyle değil, yeterince zaman geçtiği ve yeterince iş yapıldığı için. Henüz olgunlaşmamış olana da sabır öğütler. Bir mevsimi aceleye getiremezsin. Ektiğine bak ve hazır olanı topla.',
  'rune.jera.today':
    'Bir süre önce ektiğin bir şeyi tahsil et — bitir, kenara koy ya da yalnızca işe yaradığını fark et.',

  'rune.eihwaz.meaning': 'Porsukağacı — yaşamla ölüm arasındaki eksen, dayanıklılık',
  'rune.eihwaz.keywords': 'Dayanıklılık · Dönüşüm · Eksen',
  'rune.eihwaz.up':
    'Eihwaz porsukağacıdır, her dem yeşil ve zehirli, kökleri yeraltında, tacı ışıkta — dünyaların içinden geçen direk. Zorlu bir geçiş boyunca dayanıklılığı ve dibe kadar giden bir değişimi işaretler. Bir sonraki şeyin yaşaması için bir şeyin bitmesi gerekir. Porsukağacı gibi dur: kök salmış, kımıldamayan, hem ölmekte olana hem doğmakta olana bağlı.',
  'rune.eihwaz.today':
    'Bugün kaçındığın bitişle yüzleş — onu zorlamak için değil, olmadığını varsaymayı bırakmak için.',

  'rune.perthro.meaning': 'Kura kabı — gizem, şans ve kaderin gizli tuttuğu',
  'rune.perthro.keywords': 'Gizem · Şans · Görülmeyen',
  'rune.perthro.up':
    'Perthro kuraların sallanarak çıkarıldığı kaptır — zarlar düşmeden önceki an, sonucun var olduğu ama görülemediği. Sırları, gizli etkileri, şansı ve kalıbın henüz senin bilmen için olmayan parçalarını yönetir. Bir şey görüş dışında karara bağlanıyor. Rolünü iyi oyna ve atışın düşmesine izin ver; her şey önceden çözülmek için tasarlanmadı.',
  'rune.perthro.merk':
    'Ters, Perthro gömülü kalması gereken bir sırrın kazılıp çıkarılması ya da sonucu bilmeye yönelik sağlıksız bir saplantıdır. İfşayı zorlamayı bırak. Bazı şeyler zamanından önce ışıkta çürür.',
  'rune.perthro.today':
    'Bugün bir şeyin bilinmez kalmasına izin ver. Payına düşeni yap ve sayfayı yenilemeyi bırak.',

  'rune.algiz.meaning': 'Elk geyiği — koruma ve daha yükseğe uzanış',
  'rune.algiz.keywords': 'Koruma · Bağlantı · Yukarıdan yardım',
  'rune.algiz.up':
    'Algiz boynuzları dik elk geyiği ve onu kavrayan eli kesen saz otudur — bir koruma runu ve seninle daha büyük bir şey arasındaki bağın runu. Şu anda çevrende bir kalkanı ve uzanırsan kendi düzeyinin üstünden ulaşılabilir bir desteği işaretler. Yardım iste. Dik dur. Seni gözeten şey senin tarafında.',
  'rune.algiz.merk':
    'Ters, Algiz indirilmiş koruma ya da reddedilmiş yardımdır — korunman gereken yerde kendini açık bırakmak ya da orada olan destekten kendini kesmek. Savunmalarını kontrol et ve birinin içeri girmesine izin ver.',
  'rune.algiz.today':
    'Bugün bir şey için yardım iste, bir kişiden ya da kendi rütbenin üstündeki bir güçten.',

  'rune.sowilo.meaning': 'Güneş — bütünlük, başarı ve yol gösteren irade',
  'rune.sowilo.keywords': 'Başarı · Bütünlük · Berrak irade',
  'rune.sowilo.up':
    'Sowilo güneş çarkıdır: her zaman geri dönen ışık, tek bir şeye sabitçe yöneltilmiş bir iradeden gelen zafer. Başarıyı, sağlığı ve sisi yakıp geçen berraklaştırıcı bir gücü işaretler. Ters Sowilo yoktur — güneş geriye gitmez. Enerjini önemli olana yönelt, orada tut ve sonucun senin lehine olmasını bekle.',
  'rune.sowilo.today':
    'Bugün her şeyi tek bir hedefe yönelt. Yedek yok, ikinci bir nişan yok — yalnızca o, karanlığa dek.',

  /* --------------------------------------------------- Týr’in Ætt’i (17–24) */
  'rune.tiwaz.meaning': 'Týr — adalet, cesaret ve gönüllü fedakârlık',
  'rune.tiwaz.keywords': 'Adalet · Cesaret · Fedakârlık',
  'rune.tiwaz.up':
    'Tiwaz mızrak ve Týr’in sözünü tutmak için kurda uzattığı eldir — adaletin, onurun ve gerçek bir bedelle doğru olanı yapmanın runu. Hukuki meseleleri, adil dövüşleri ve rahat olmaktan çıktığında bir taahhüdün yanında durmayı destekler. Kendini doğru olana yönelt ve hattı tut. Buradaki zafer, sonrasında birlikte yaşayabileceğin türdendir.',
  'rune.tiwaz.merk':
    'Ters, Tiwaz sarsılan cesaret, terk edilmiş bir taahhüt ya da eğrilmiş adalettir. Alman gerektiğini bildiğin bir tavırdan kaçınıyor ya da enerjini dürüst olmayan bir dövüşe harcıyor olabilirsin. Zaferi kaybetmene mal olsa bile gerçekten doğru olana yeniden bağlan.',
  'rune.tiwaz.today':
    'Bugün rahatsız hâle gelmiş bir sözü tut ve savuşturduğun tavrı al.',

  'rune.berkano.meaning': 'Huş ağacı — büyüme, besleme ve sessiz yeni başlangıçlar',
  'rune.berkano.keywords': 'Büyüme · Besleme · Yeni başlangıçlar',
  'rune.berkano.up':
    'Berkano huş ağacıdır, buzdan sonra yeşeren ilk ağaç — nazik, korunaklı büyümenin runu: gebelik, taze evresindeki yeni bir proje, iyileşme, küçük bir şeyin güçlü olmasına izin veren özen. İtmek yerine beslemeni ister. Yeni sürgünü koru, besle, ondan ayazı uzak tut ve büyümenin gerçekten aldığı hızda büyümesine izin ver.',
  'rune.berkano.merk':
    'Ters, Berkano bodurlaşmış büyüme ya da geri çekilmiş özendir — ihmal edilmiş yeni bir şey, bir aile düğümü ya da sertliğe bürünmüş öz ihmal. Kendi başına idare etmeye bıraktığın bir şey özen istiyor. Geri dön ve onu gerektiği gibi besle.',
  'rune.berkano.today':
    'Bugün büyüyen bir şeye özen göster — bir kişiye, bir plana ya da kendine — yalnızca niyetle değil, gerçek özenle.',

  'rune.ehwaz.meaning': 'At — ortaklık, güven ve istikrarlı hareket',
  'rune.ehwaz.keywords': 'Ortaklık · Güven · İvme',
  'rune.ehwaz.up':
    'Ehwaz tek olarak hareket eden at ve binicidir — güvenilir ortaklığın, takım çalışmasının ve hiçbirinin tek başına yapamayacağı birlikte edilmiş ilerlemenin runu. İşleyen bir ilişkiyi ya da bağlanmaya değer bir işbirliğini işaretler. Bağ güven üzerine ve iki tarafın da aynı yöne çekmesi üzerine kuruludur. Ona sahip olduğun yerde ona yaslan; onu istediğin yerde önce güvenilir yarı ol.',
  'rune.ehwaz.merk':
    'Ters, Ehwaz adımı bozuk bir ortaklıktır — güvensizlik, bir tarafın diğerini taşıması ya da artık aynı şeyi istemediğiniz için durmuş bir hareket. Güvenin nerede kırıldığını adlandır ve hâlâ birlikte binip binmediğinize dürüstçe karar ver.',
  'rune.ehwaz.today':
    'Bugün tek başına değil biriyle bir şey yap ve güvenilebilecek yarı ol.',

  'rune.mannaz.meaning': 'İnsan — benlik ve başkaları arasında benlik',
  'rune.mannaz.keywords': 'Benlik · Topluluk · Bakış açısı',
  'rune.mannaz.up':
    'Mannaz insanlığın runudur — birey olarak sen ve başkalarının ağında bir düğüm olarak sen. Kendini net görmeni ister: armağanlarını, sınırlarını ve çevrendeki insanlardaki yansımanı. Çoğu zaman başkalarına ihtiyaç duyma, ihtiyaç duyulma ya da bir başkasının gözünden kendini dürüstçe görme anını işaretler. Bunu tek başına yapmak için yapılmadın ve merkezi de değilsin.',
  'rune.mannaz.merk':
    'Ters, Mannaz yalıtımdır ya da gerçekten kaymış bir öz imgedir — şişirilmiş ya da haksızca sert. İnsanlarından kopmuş ya da kendi en kötü eleştirmenin olabilirsin. Hem dürüst hem nazik olacak birinden dıştan bir bakış al.',
  'rune.mannaz.today':
    'Bugün kendini seni iyi tanıyan birinin gözünden gör ve resmin yanlış olduğu yerde onu düzelt.',

  'rune.laguz.meaning': 'Su — akış, sezgi ve derin bilinçdışı',
  'rune.laguz.keywords': 'Akış · Sezgi · Derinlik',
  'rune.laguz.up':
    'Laguz göl ve denizdir: akış, his, rüya ve gündüz zihninin göremediği şeylerin hareket ettiği bilinçdışının derin suyu. Bir hesap tablosu yerine bir içe doğuşa güvenmeyi, akıntıya karşı değil onunla gitmeyi ve rüyalarının ve ruh hâllerinin sana ne söylediğine dikkat etmeyi destekler. Gelgit nereye gittiğini bilir. Şimdilik, seni taşımasına izin ver.',
  'rune.laguz.merk':
    'Ters, Laguz bir seldir ya da suyun altına çekilmedir — hisle bunalmış, sürüklenerek bir şeyden kaçınıyor ya da korkuya veya fanteziye ekşimiş bir sezgi. Ayaklarını yere bas. Her akıntı izlenmeye değmez ve her dalga bir uyarı değildir.',
  'rune.laguz.today':
    'Bugün zekice savdan çok içe doğuşa güven ve bu gece ne rüya gördüğüne dikkat et.',

  'rune.ingwaz.meaning': 'Ing — kuluçka, depolanmış olanak, tamamlanmış bir döngü',
  'rune.ingwaz.keywords': 'Kuluçka · Olanak · Tamamlanma',
  'rune.ingwaz.up':
    'Ingwaz kış boyunca toprağa mühürlenmiş tohumdur — kapalı bir kapta tutulan olanak, salıvermeye hazır olana dek görüş dışında işini yapan. Bir kuluçkanın sonunu işaretler: sessizce pişen bir proje, bir karar ya da bir iç süreç bitmek üzere. Kutuyu erken açma. Bittiğinde temizce biter ve onun rahatlamasını hissedersin.',
  'rune.ingwaz.today':
    'Bugün neredeyse hazır olan şeyin kendi zamanında bitmesine izin ver. Onu dürtmeyi bırak.',

  'rune.dagaz.meaning': 'Gün — atılım, uyanış, karanlıktan aydınlığa dönüş',
  'rune.dagaz.keywords': 'Atılım · Uyanış · Dönüm noktası',
  'rune.dagaz.up':
    'Dagaz şafaktır: gece ile gündüz arasındaki menteşe, ışığın geri döndüğü ve her şeyin farklı göründüğü an. Bir atılımı işaretler — bir kavrayış, bir fikir değişimi, tıkanmışlıktan harekete bir kerede geçen bir durum. Ters Dagaz yoktur; şafak geri sarılmaz. Karanlıkta olduğun bir şey birazdan apaçık olacak. Onun üzerine harekete geçmeye hazır ol.',
  'rune.dagaz.today':
    'Bugün kavrayışın üzerine, o hâlâ parlakken harekete geç. Üzerinde çok uzun uyursan içgörü solar.',

  'rune.othala.meaning': 'Ata yurdu — miras, soy ve gerçekten senin olan',
  'rune.othala.keywords': 'Soy · Yuva · Kalıcı olan',
  'rune.othala.up':
    'Othala ata toprağıdır: miras aldığın, ait olduğun ve kim olduğuna dokunduğu için elinden alınamayacak şeyler. Yuva, aile, gelenek ve miras sorularını işaretler — geldiğin yerden neyi tutacağın ve neyi geride bırakacağın. Gerçekten senin olana sahip çık. Ona bak. Ve hangi mirasların armağan, hangilerinin yalnızca eski ağırlık olduğu konusunda dürüst ol.',
  'rune.othala.merk':
    'Ters, Othala tutunulan kötü bir miras ya da yerine oturmayan bir köksüzlüktür — otomatik pilotta eski aile kalıpları ya da hiçbir yere ait olmayı reddetme. Aile yadigârlarını ayıkla. Geleceğe hizmet edeni tut; gerisine saygılı bir cenaze ver.',
  'rune.othala.today':
    'Bugün geldiğin yerden bir şey tut ve alışkanlıktan taşıdığın bir şeyi bilerek yere bırak.',
} as const
