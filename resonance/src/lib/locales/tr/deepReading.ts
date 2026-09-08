import type { DeepReadingKey } from '../en/deepReading'

/**
 * Türkçe — derin, uzun okuma: ücretli «Tam Yıldız Falı» ve ayrıntılı «Uyum»
 * incelemesi. Gerçek bir astrologun bir-iki sayfası gibi okunacak biçimde
 * yazıldı. «Sen» hitabı.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- günlük (ücretsiz) yıldız falı: her nota biraz daha derinlik ---- */
  'horo.deep.q.house': 'Bu, {theme} alanına iniyor.',
  'horo.deep.q.hard': 'Bununla dikkatli ilerle.',
  'horo.deep.q.soft': 'Küçük, bilinçli bir adıma değer.',
  'horo.deep.q.neutral': 'Harekete geçmeden önce oturmasına izin ver.',
  'horo.deep.q.thread':
    'Bugünün ipliği durmadan {focus} alanına dönüyor — dikkatini orada tut.',
  'scr.horo.weekHead': 'Daha büyük yay',

  /* ============================ TAM YILDIZ FALI ============================ */

  /* -- her gezegen GEÇİŞ (hareket eden) gücü olduğunda ne anlama gelir -- */
  'dh.tr.Sun':
    'Güneş günü yürütür: nereye giderse orada yaklaşık bir ay boyunca bir ışıldak yakar, haritanın o bölümünü ısıtır ve orada kendin olarak görünmeni ister.',
  'dh.tr.Moon':
    'Ay gökyüzündeki en hızlı gök cismidir; geçişleri kısadır ama günün duygusal tonunu belirler ve dokundukları şeyi yüzeye çıkarır.',
  'dh.tr.Mercury':
    'Merkür düşünmeyi, konuşmayı ve birikip toplam yapan küçük kararları yönetir. Geçişleri bir konunun çevresindeki bilgi trafiğini hızlandırır — konuşmalar, mesajlar, evrak işi, ikinci düşünceler.',
  'dh.tr.Venus':
    'Venüs çekimi, rahatlığı, parayı ve zevki yönetir. Bir noktadan geçtiğinde oradaki toprağı tatlandırır ve bağ kurmayı, harcamayı ve keyfi daha kolay getirir.',
  'dh.tr.Mars':
    'Mars ham itki ve ısıdır. Geçişleri dokundukları şeyin altında bir ateş yakar — aynı pakette daha çok cesaret ve daha çok sürtünme alırsın, bir de tam düşünmeden harekete geçme dürtüsü.',
  'dh.tr.Jupiter':
    'Jüpiter büyüme ve «daha fazla» gezegenidir. Temas ettiği şeyi genişletir — fırsat, güven, iştah ve zaman zaman aşırılık — ve o yaşam alanının kapısını yaklaşık bir yıl daha geniş açma eğilimindedir.',
  'dh.tr.Saturn':
    'Satürn zaman, yapı ve sonuçtur. Nereye giderse işleri yavaşlatır ve orada inşa ettiğinin ağırlık taşıyıp taşıyamayacağını sorar; taşıyabileni güçlendirir, taşıyamayanı sessizce söker ki onu düzgünce yeniden kurabilesin.',
  'dh.tr.Uranus':
    'Uranüs bozucudur. Geçişleri bayatlamış bir kalıbı kırar — çoğu zaman bir sürprizle, ani bir huzursuzlukla ya da planlamadığın bir değişimle — ve vazgeçmeye imza attığın bir özgürlüğü sana geri verir.',
  'dh.tr.Neptune':
    'Neptün kenarları çözer. Geçtiği yerde hatlar yumuşar: daha çok hayal gücü ve şefkat, ama daha çok kafa karışıklığı da, ve bir şeyle doğrudan yüzleşmek yerine kaçma çekimi.',
  'dh.tr.Pluto':
    'Plüton yer altında çalışır ve acele etmez. Geçişleri dokundukları şeye yavaş, köklü bir dönüşüm getirir — güç çekişmeleri, sonlar ve gerçekten temel olana kadar soyunma.',

  /* -- DOĞUM noktan kendi haritanda neyi yönetir -- */
  'dh.na.Sun':
    'çekirdek kimliğin, canlılığın ve en çok kendin olduğunda kim olduğun duygusu',
  'dh.na.Moon':
    'içgüdülerin, ruh hâllerin ve güvende ve tutulmuş hissetmek için neye ihtiyacın olduğu',
  'dh.na.Mercury':
    'nasıl düşündüğün, öğrendiğin, konuştuğun ve günlük kararlar aldığın',
  'dh.na.Venus':
    'nasıl sevdiğin ve sevildiğin, neyi güzel bulduğun ve parayla ve hazla ilişkin',
  'dh.na.Mars':
    'itkin, öfken, arzun ve istediğin şeyin peşinden nasıl gittiğin',
  'dh.na.Jupiter':
    'anlamı ve büyümeyi nerede aradığın ve doğal inanç ve olasılık duygun',
  'dh.na.Saturn':
    'disiplinle, otoriteyle ve sınırlarla ilişkin — zor yoldan büyümek zorunda kaldığın yer',
  'dh.na.Uranus':
    'özgür olma ve işleri kendi yönteminle yapma ihtiyacın',
  'dh.na.Neptune':
    'hayal gücün, maneviyatın ve idealize etmeye ya da kendini kaybetmeye eğilimli olduğun yerler',
  'dh.na.Pluto':
    'güçle ve denetimle ilişkin ve sende dönüştürülmek için yapılmış olan şey',

  /* -- her açının doğası (iki çeşit, bölümlere göre dönüşümlü) -- */
  'dh.asp.nat.conjunction.0':
    'Kavuşum bir birleşmedir. İki güç aynı dereceyi işgal eder ve tek gibi davranır, yaşamının bu alanında taze bir döngü başlatır — ekilen bir tohum, biçilen bir hasat değil.',
  'dh.asp.nat.conjunction.1':
    'Kavuşum iki enerjiyi öyle bütünüyle kaynaştırır ki onları ayırt etmek zorlaşır. Bir başlangıcı işaretler; şimdi biçimlenen şey, izleyen yıllar boyunca açılacak.',
  'dh.asp.nat.opposition.0':
    'Karşıtlık başkalarının ve dış koşulların aynası üzerinden çalışır. Gerilim gerçektir, ama sana farkındalık getirmek için oradadır — meseleyi net görürsün çünkü bir şey onun karşısında duruyor.',
  'dh.asp.nat.opposition.1':
    'Karşıtlık seni iki kutup arasında çeker ve birine çökmek yerine ikisini birden tutmanı ister. Buradaki denge bir uzlaşma değil; baskı altında inşa ettiğin bir beceridir.',
  'dh.asp.nat.square.0':
    'Kare bir sürtünme açısıdır. İki enerji farklı şeyler ister ve durmadan birbirine takılır, ve rahatsızlık da asıl noktadır — kozmetik değil, gerçek bir değişimi zorlayan kumdur.',
  'dh.asp.nat.square.1':
    'Kare, tam da bir engelle uğraşmak istemeyeceğin yerde yola bir engel koyar. Dümdüz zorlamak nadiren işe yarar; yolun geçişi genellikle yaklaşımını değiştirmektir, daha çok çabalamak değil.',
  'dh.asp.nat.trine.0':
    'Üçgen açık bir kanaldır. İki enerji istenmeden işbirliği yapar ve destek burada sana doğru akar — ama sana ancak gerçekten ona doğru hareket edersen ulaşır.',
  'dh.asp.nat.trine.1':
    'Üçgen yaşamın bu alanını bir süre kolay ve doğal hissettirir. Risk gevşekliktir; kullanmadığın kolaylık sessizce sızıp gitme eğilimindedir.',
  'dh.asp.nat.sextile.0':
    'Altmışlık, bilerek kabul etmen gereken bir fırsattır. Kapı kilitli değil ama açık da değil — şimdi küçük, bilinçli bir eylem bir olasılığı gerçek bir şeye çevirir.',
  'dh.asp.nat.sextile.1':
    'Altmışlık yaşamının bu bölümünde yardımcı bir açıklık sunar. Girişimi ödüllendirir ve beklemek için hiçbir şey yapmaz.',

  /* -- bölüm açılışı için kısa fiil öbeği -- */
  'dh.asp.verb.conjunction': 'ile buluşuyor ve kaynaşıyor',
  'dh.asp.verb.opposition': 'karşısına çekiyor',
  'dh.asp.verb.square': 'sürtünüyor',
  'dh.asp.verb.trine': 'yönünde akıyor',
  'dh.asp.verb.sextile': 'yönünde bir kapı açıyor',

  /* -- doğum noktasının bulunduğu burçta enerji nasıl ifade olur -- */
  'dh.sign.Aries':
    'hızlı, dolaysız ve biraz kavgacı, beklemekten çok harekete meyilli',
  'dh.sign.Taurus':
    'yavaş, tensel ve inatçı, acele ettirilmeye direnen ve bırakmakta ağır',
  'dh.sign.Gemini':
    'meraklı ve sözel, fikirleri bağlamada hızlı ve huzursuzlanmada hızlı',
  'dh.sign.Cancer':
    'şefkatli ve koruyucu, mantıktan önce hisle yol alan',
  'dh.sign.Leo':
    'sıcak, dışavurumcu ve gururlu, gerçek hissetmek için görülmeye ihtiyaç duyan',
  'dh.sign.Virgo':
    'kesin ve pratik, gerçekten işe yarayabildiğinde en mutlu',
  'dh.sign.Libra':
    'dengeye, adalete ve iyi arkadaşlığa yönelmiş, ve sahneden kaçınan',
  'dh.sign.Scorpio':
    'yoğun ve mahrem, ya hep ya hiç, ve gizli olana çekilen',
  'dh.sign.Sagittarius':
    'alan, anlam ve daha geniş bir görüş için huzursuz, ve ince yazıya sabırsız',
  'dh.sign.Capricorn':
    'ciddi ve öz disiplinli, vaatlerden çok sonuçlardan etkilenen',
  'dh.sign.Aquarius':
    'bağımsız ve geleceğe dönük, hisler yerine sistemlerle düşünen',
  'dh.sign.Pisces':
    'hayalperest, geçirgen ve şefkatli, ve kolayca bunalan',

  /* -- her evden geçen bir geçiş genelde neyi kabartır -- */
  'dh.house.1':
    'Birinci evde iş senin üzerinde görünür — bedenin, imajın, bıraktığın ilk izlenim. Artık uymayan bir taslağı korumak yerine nasıl göründüğünü yeniden çizmek için iyi bir dönem.',
  'dh.house.2':
    'İkinci evde paraya, kaynaklara ve öz değere dokunur. Dıştaki soru ne kazandığın ve neye sahip olduğun; içteki soru neyi hak ettiğine inandığın.',
  'dh.house.3':
    'Üçüncü evde gündelik zihni kabartır — konuşmalar, kısa yolculuklar, kardeşler ve komşular, o bitmeyen küçük bilgi alışverişi. Kendine durmadan ne söylediğine dikkat et.',
  'dh.house.4':
    'Dördüncü evde köklere ulaşır — ev, aile, geçmişin ve döndüğün özel üs. Temelindeki bir şey inceleniyor.',
  'dh.house.5':
    'Beşinci evde oyuna, aşka, yaratıcılığa ve yalnızca keyfi için yaptığın şeylere dokunur. Kıvılcımının nereye gittiğini ve nasıl geri alacağını sorar.',
  'dh.house.6':
    'Altıncı evde rutin, sağlık ve kendini ve işini çalışır tutmanın günlük emeği üzerinden çalışır. Küçük alışkanlıklar şimdi her zamankinden daha ağır basıyor.',
  'dh.house.7':
    'Yedinci evde ayna başka insanlardır — eşler, yakınlar, masanın karşısındaki kişi. Onlarda karşılaştığın şey çoğu zaman doğrudan bakmadığın kendi bir yanındır.',
  'dh.house.8':
    'Sekizinci evde derin suya gider — paylaşılan para, yakınlık, güç ve sona eren şey. Burası havadan sudan konuşma bölgesi değil; bir şey kökten dönüşüyor.',
  'dh.house.9':
    'Dokuzuncu evde daha geniş görüşü açar — inanç, öğrenim, seyahat ve anlam arayışı. Tüm bunların ne için olduğuna dair duygun geriliyor.',
  'dh.house.10':
    'Onuncu evde kamusaldır — kariyer, itibar, konumun ve dünyada oynadığın rol. Neyle tanındığın gözden geçirilmeye açık.',
  'dh.house.11':
    'On birinci evde dostluğa, topluluğa ve elini uzattığın geleceğe dokunur. Tuttuğun arkadaşlık ve taşıdığın hedefler ayıklanıyor.',
  'dh.house.12':
    'On ikinci evde arka planda çalışır — dinlenme, yalnızlık, bilinçdışı ve adını koymadan taşıdığın şey. Bu sessiz, içe dönük bir iştir.',

  /* -- «günlük yaşamda bu şuna benzeyebilir…» (açıya göre dönüşümlü) -- */
  'dh.life.conjunction.0':
    'Günlük yaşamda bu, tam olarak seçmediğin bir yeniden başlangıç gibi hissettirebilir — yeni koşullar, bu alanda açılan yeni bir bölüm, hazır hisset ya da hissetme.',
  'dh.life.conjunction.1':
    'Gün be gün, güçlü yeni bir ilgi, çerçeveyi değiştiren bir kişi ya da yalnızca bunun eski sürümünün bittiği duygusu olarak gelebilir.',
  'dh.life.conjunction.2':
    'Pratikte çoğu zaman bir eşik olarak belirir — yaşamının bu bölümünde saati sıfırlayan bir karar, bir taşınma, bir bağlılık.',
  'dh.life.opposition.0':
    'Günlük yaşamda bu çoğu zaman başka biri üzerinden oynar — bir anlaşmazlık, bir talep ya da tam da boğuştuğun şeyi somutlaştıran bir kişi.',
  'dh.life.opposition.1':
    'Gün be gün, iki geçerli ihtiyaç arasında sıkışmış gibi hissettirebilir — seninki ve bir başkasınınki ya da kendi yaşamının ikisi birden sığmayan iki yanı.',
  'dh.life.opposition.2':
    'Pratikte işleri bir doruğa taşıma eğilimindedir: artık erteleyemeyeceğin bir konuşma, yapmanı bekleyen bir seçim.',
  'dh.life.square.0':
    'Günlük yaşamda bu, durmadan takılan bir plan, hep aynı düğmeye basan bir kişi ya da olması gerekenden çok daha ağır hissettiren bir görev gibi görünebilir.',
  'dh.life.square.1':
    'Gün be gün çoğu zaman hayal kırıklığı olarak gelir — hiçbir şeye dönüşmeyen çaba, kapı beklediğin yerde bir duvar.',
  'dh.life.square.2':
    'Pratikte, seni serbest bırakmayan bir baskı olarak belirir: kaçındığın şey artık yolun ortasında.',
  'dh.life.trine.0':
    'Günlük yaşamda bu, bir dizi küçük yeşil ışık gibi hissettirebilir — gelen yardım, işleyen zamanlama, hayıra hazırlandığın yerde bir evet.',
  'dh.life.trine.1':
    'Gün be gün çoğu zaman bu alanda kolaylık ve akış olarak belirir, ve hep bu kadar basit olacağını varsayma ayartısı.',
  'dh.life.trine.2':
    'Pratikte elverişli bir penceredir — tanıştırmalar tutar, ricalar sıcak karşılanır, yol kısa bir süre açıktır.',
  'dh.life.sextile.0':
    'Günlük yaşamda bu, az kalsın kaçıracağın bir açıklık gibi görünebilir — bir teklif, bir rastlantı buluşması, yalnızca şimdi geçersen açık kalan küçük bir kapı.',
  'dh.life.sextile.1':
    'Gün be gün ilk adımı atanı ödüllendirme eğilimindedir: mesajı gönder, soruyu sor, adını öne koy.',
  'dh.life.sextile.2':
    'Pratikte düşük maliyetli bir fırsattır — çarpıcı değil, ama buradayken üzerine gitmeye değer.',

  /* -- açının daha derin daveti (dönüşümlü) -- */
  'dh.invite.conjunction.0':
    'Davet, bilerek ekmektir. Şimdi başlattığın şey, ne kadar küçük olursa olsun, yıllar sonra hâlâ birlikte yaşayacağın bir şeyin tohumudur — o yüzden onu bilerek seç.',
  'dh.invite.conjunction.1':
    'Daha derin iş, bunun eski biçimini temizce bırakmaktır, onu yeni bölüme yarı canlı sürüklemeden.',
  'dh.invite.conjunction.2':
    'Bunun gerçekten istediği şey net bir evet ya da net bir hayırdır. Kararsızlık, pencereyi boşa harcayan tek yanıttır.',
  'dh.invite.opposition.0':
    'Davet kazanmak değildir. İki tarafı da, her birinde doğru olanı onurlandıran üçüncü seçeneği bulacak kadar uzun tutmaktır.',
  'dh.invite.opposition.1':
    'Daha derin iş, bunun başkasına devrettiğin kısmını geri almaktır — o gücü, o ihtiyacı ya da o suçlamayı.',
  'dh.invite.opposition.2':
    'Bunun istediği şey dürüst farkındalıktır. Kalıbı gerçekten görebildiğinde artık onun içinde değilsindir.',
  'dh.invite.square.0':
    'Davet daha sert itmek değildir. Burada neyi aştığını fark etmek ve sürtünmenin onu sökmesine izin vermektir ki daha sağlam bir şey inşa edilebilsin.',
  'dh.invite.square.1':
    'Daha derin iş bir yöntem değişimidir. Hedef iyi olabilir; direnci üreten şey ona giriştiğin biçimdir.',
  'dh.invite.square.2':
    'Bunun gerçekten istediği şey belirli bir yerde olgunluktur — atlayabileceğini umduğun o gösterişsiz, yapısal işi yapmak.',
  'dh.invite.trine.0':
    'Davet kolaylığı kullanmaktır, yalnızca ondan keyif almak değil. Harcanmayan destek sessizce yok olma eğilimindedir.',
  'dh.invite.trine.1':
    'Daha derin iş, sakinlik sırasında hava yeniden döndüğünde dayanacak bir şey inşa etmektir.',
  'dh.invite.trine.2':
    'Bunun istediği şey yardıma evet demendir — tanıştırmayı kabul et, kestirmeyi al, bir kez kolay olmasına izin ver.',
  'dh.invite.sextile.0':
    'Davet girişimdir. Bu kilitsiz bırakılmış bir kapıdır; yalnızca itersen açılır.',
  'dh.invite.sextile.1':
    'Daha derin iş, alışkanlıkla kendini caydırdığın küçük fırsatları fark etmek ve birini almaktır.',
  'dh.invite.sextile.2':
    'Bunun istediği şey mütevazı, somut bir cesaret eylemidir — çarpıcı bir şey değil, yalnızca ertelemeyi yeğleyeceğin bir adım.',

  /* -- somut yönlendirme (dönüşümlü) -- */
  'dh.do.conjunction.0':
    'Ona temiz bir başlangıç ver: neyin başladığını adlandır, bir şekilde işaretle ve ilk haftaları eski sürümün artıklarıyla doldurma.',
  'dh.do.conjunction.1':
    'Hızlı değil, bilinçli hareket et. Kavuşum uzun bir döngüyü harekete geçirir; şimdi belirlediğin ton kalma eğilimindedir.',
  'dh.do.conjunction.2':
    'Karar ver. Evet ya da hayırı en az bir başka kişinin önünde yüksek sesle söyle ki gerçek olsun.',
  'dh.do.opposition.0':
    'Çevresinde döndüğün konuşmayı yap ve dinlemeye giderek gir. Karşı taraf ihtiyacın olan bilgiyi taşıyor.',
  'dh.do.opposition.1':
    'İki duruşu da, her birini adilce savunmak zorundaymışsın gibi yaz. Denge noktası genellikle kâğıt üzerinde kendini gösterir.',
  'dh.do.opposition.2':
    'Bugün bir çözümü zorlama. Üçüncü seçenek kendiliğinden yüzeye çıkana kadar gerilimin oturmasına izin ver.',
  'dh.do.square.0':
    'Baskı altında bağlanma ve imzalama. Direnen şeyin sana yapının nerede ince olduğunu göstermesine izin ver ve önce orayı destekle.',
  'dh.do.square.1':
    'Yaklaşımınla ilgili bir şeyi değiştir ve yeniden dene. Aynı çaba, farklı açı.',
  'dh.do.square.2':
    'Durmadan ertelediğin o sıkıcı, yapısal görevi yap. Bütün ödev bu.',
  'dh.do.trine.0':
    'Kapı açıkken gerçek bir adım at — bir mesaj, bir rezervasyon, bir ilk taslak. Yalnızca hayranlıkla bakarsan kolaylık solar.',
  'dh.do.trine.1':
    'O şeyi iste. Bir evetin en olası olduğu pencere budur.',
  'dh.do.trine.2':
    'Şimdi inşa et. Sakinliği, sonradan memnun olacağın bir temel atmak için kullan.',
  'dh.do.sextile.0':
    'İlk adımı bugün at, gelecek hafta değil. Gönder, sor, adını yaz.',
  'dh.do.sextile.1':
    'Önemsiz görünse bile küçük teklife evet de. Bunlar birikir.',
  'dh.do.sextile.2':
    'Normalde erteleyeceğin o tek fırsatı seç ve gün bitmeden üzerine git.',

  /* -- zamanlama dili (duruma göre dönüşümlü) -- */
  'dh.time.peak.0':
    'Kesine yakın ve hâlâ sıkışıyor, bu yüzden bu bir iki gün içinde doruğa çıkar, sonra gevşemeye başlar.',
  'dh.time.peak.1':
    'Temas şu anda neredeyse kesin — bu, ulaştığı en yüksek nokta ve yoğunluk hemen ardından düşer.',
  'dh.time.peak.2':
    'Bu, kesin derecesinde ya da ona yakın, bu yüzden dikkatinin bu kadarını bir kerede istiyor.',
  'dh.time.build.0':
    'Hâlâ yükseliyor. Tema, dönmeden önce önümüzdeki günlerde daha yüksek olur.',
  'dh.time.build.1':
    'Bu henüz tam gücüne ulaşmadı; zirveye çıkmadan önce bir süre daha yükselmeye devam etmesini bekle.',
  'dh.time.build.2':
    'Bunun erken yamacındasın. Şimdi zayıf bir sinyal gibi okunan şey bir hafta kadar içinde açıkça belli olur.',
  'dh.time.fade.0':
    'Kesini yeni geçti — en keskin kenar çoktan geçti ve baskı bırakıyor.',
  'dh.time.fade.1':
    'Bunun doruğu artık arkanda. Kalan şey bütünleşme, kriz değil.',
  'dh.time.fade.2':
    'Bu temas çıkışta. Onun en kötüsünü yaşamak yerine ardından toparlıyorsun.',

  'dh.retro':
    ' Geri hareket ettiği için bu ilk geçiş değil bir gözden geçirmedir — daha önce kat ettiğin bir zemin üzerinden, bu kez doğru yapmak için yeniden geçiyorsun.',

  /* -- bölüm birleştirme şablonları -- */
  'dh.sec.open':
    '{tr} Şu anda {target} {verb} — sende {na} yöneten kısım.',
  'dh.sec.sign':
    'Doğum {target} burcun {sign} — {signFlavour} — ve bu, tüm bunun sana nasıl indiğini biçimlendirir.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- genel bakış: üç kısa paragraf -- */
  'dh.ov.lead':
    'Bu okuma, gezegenlerin bugün gerçekte nerede olduğundan çıkarıldı, doğum haritanın karşısına konularak — yani genel gökyüzü değil, senin gökyüzün hakkında.',
  'dh.ov.head':
    'Şu andaki ağırlık merkezi {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'Genel hava elverişli: kolay temaslar zor olanlardan açıkça daha ağır basıyor. Bu, bir şeye karşı kendini germek yerine ona uzanma dönemidir — onu boşa harcamanın başlıca yolu kıpırdamadan oturmaktır.',
  'dh.ov.weather.friction':
    'Genel hava zorlayıcı. Karışımda akıştan çok sürtünme var ve birkaç şey uzaklaşmasını dilemek yerine cepheden karşılanmak istiyor. Bunların hiçbiri felaket değil; bir inşa evresi ve inşa evreleri çaba gibi hissettirir.',
  'dh.ov.weather.intense':
    'Genel hava ağır ve yoğun. Yavaş hareket eden gezegenler tam haritanın üzerinde oturuyor ve dokundukları her şeyde ses açık. Kendini paylaştır — bu bir maraton bölümü, sprint değil.',
  'dh.ov.weather.mixed':
    'Genel hava karışık — aynı pencerede gerçek destek ve gerçek sürtünme. Bu dönemin işi kendini nerede harcayacağını ve nerede tutacağını seçmektir.',
  'dh.ov.weather.quiet':
    'Genel hava sessiz. Hiçbir gezegen haritana sert bastırmıyor, bu da onu gökyüzü karşı çıkmadan kendi gündemini ve temponu belirlemek için nadir bir dönem yapıyor.',
  'dh.ov.tempo.fast':
    'Tempo hızlı — temaslar sıkı ve hareketli, bu yüzden temalar günler içinde gelir ve geçer. Her şeyi önceden planlamaya çalışmak yerine tepki verir kal.',
  'dh.ov.tempo.building':
    'Tempo yavaş yavaş yükseliyor. Ana temalar hâlâ güç topluyor, bu yüzden şimdi bir ima gibi hissettiren şey bir iki hafta içinde açıkça belli olacak.',
  'dh.ov.tempo.slow':
    'Tempo yavaş ve yapısal. Buradaki büyük temaslar günlerle değil aylarla açılır; mevsimlerle düşün ve bir gecede bir karar bekleme.',
  'dh.ov.tempo.settling':
    'Tempo oturuyor — en keskin temaslar doruğunu yeni geçti, bu yüzden bu, gelecek olana karşı kendini germekten çok, çoktan olan biteni bütünleştirmekle ilgili.',

  /* -- Ay paragrafı, genişletilmiş -- */
  'dh.moon.lead': 'Duygusal havan',
  'dh.moon.body':
    'Ay {sign} burcundan geçiyor — {mood} — ve %{pct} ışıkla {phase}. {phaseNote} Ruh hâlin bir karar değil bilgi olsun: sana bu gökyüzü diliminin içeriden nasıl hissettirdiğini söylüyor.',

  /* -- iplikler: durmadan tekrarlayan şey -- */
  'scr.horo.threadsHead': 'Bağlayan iplikler',
  'dh.th.house':
    '{ord} evin durmadan gündeme geliyor. Başka ne olursa olsun, {houseThemeLower} bu dönem içinde zaman geçirmen istenen odadır.',
  'dh.th.planet':
    'Doğum {planet} gezegenin aynı anda birden fazla açıdan işleniyor. {na} tuttuğu için, bunun tek seferlik değil, tekrar eden bir nota olmasını bekle.',
  'dh.th.bal.friction':
    'Ve terazi sürtünmeye yatıyor. Bu şanssızlık değil — bir büyüme evresinin içeriden hissi budur. Çaba, ödevin ta kendisidir.',
  'dh.th.bal.supportive':
    'Ve terazi akışa yatıyor. Destekleyici temaslar zor olanlardan sayıca fazla, yani kapılar gerçekten açık — bunu boşa harcamanın tek yolu hiçbirinden geçmemektir.',
  'dh.th.bal.mixed':
    'Ve terazi gerçekten bölünmüş. Bunun bir kısmı seni destekler, bir kısmı sana direnir, çoğu zaman aynı gün, bu yüzden şu anda muhakeme enerjiden daha önemli.',
  'dh.th.solo':
    'Temaslar tek bir noktaya yığılmak yerine haritan boyunca dağılmış, bu yüzden bu, tek bir baskın hikâyeden çok çeşitli bir dönem olarak okunuyor.',

  /* -- zamanlama haritası -- */
  'scr.horo.timingHead': 'Bu nasıl açılır',
  'dh.tm.tight':
    'Kesine doğru sıkışıyor: {list}. Bunlar şu anda gökyüzündeki en yüksek sesler ve günler içinde doruğa çıkacak.',
  'dh.tm.fade':
    'Doruğunu geçmiş ve soluyor: {list}. Bunlardaki ders büyük ölçüde yerine oturdu — şimdi bütünleştiriyorsun, kendini germiyorsun.',
  'dh.tm.none':
    'Şu anda hiçbir şey tam kesinin üzerinde oturmuyor, ve bu, dönemin sivri olmaktan çok açık hissettirmesinin nedenlerinden biri.',

  /* -- kapanış yayı -- */
  'dh.cl.protect':
    'Daha büyük yay, bu bölüm boyunca {focus} alanını korumanı ister. Daha az taahhüt, daha erken geceler ve her zamankinden daha az ulaşılabilir olma izni — enerjini harcamaktansa korumakla daha çoğunu geri alırsın. Bu, hasadı zorlamak için değil, toprağı beslemek için bir mevsimdir.',
  'dh.cl.use':
    'Daha büyük yay, {focus} alanının çevresinde açık bir penceredir ve bunun gibi pencereler uzun süre açık kalmaz. Onu senin için gerçekten önemli olan tek bir şeye yönelt ve gökyüzü direnmek yerine yardım ederken şimdi arkasına gerçek ağırlık koy.',
  'dh.cl.steady':
    'Daha büyük yay istikrar ister. Rutinlerini koru, kendine verdiğin sözü tut ve gürültünün her parçasının peşine düşmeden geçip gitmesine izin ver. Her geçiş bir yanıt gerektirmez; kimileri yalnızca dayanmayı bekler.',

  /* ======================= UYUM — DERİN ======================= */

  'syn.deep.patternLead': 'Bu bağ neyle yürür',
  'syn.deep.pattern.emotional':
    'Özünde bu duygusal bir bağlantı. Aylar ve Venüs aranızdaki ağırlığın çoğunu taşıyor, bu da bağı sıcak, içgüdüsel ve hızlı uyum sağlayan bir şey yapıyor — ve sıcaklığı tartışmaların değil ruh hâllerinin belirlediği anlamına geliyor. İkiniz de sağlamken yumuşak ve kolaydır ve ev çabucak ev gibi hissettirir. İçinizden biri iyi değilken diğeri bir söz söylensin söylenmesin dakikalar içinde anlar. Pratik sonuç şu: kendi iç durumunu gözetmek ilişkiyi gözetmekten ayrı değildir; aynı iştir. Bir duyguyu erken, hava durumuna dönüşmeden önce adlandırmayı öğren, ve bu bağlantı neredeyse her şeye dayanır.',
  'syn.deep.pattern.mental':
    'Özünde bu bir zihinler buluşması. Önce sözcükler, fikirler, merak ve çabuk anlaşılmanın hazzı üzerinden bağlanırsınız ve kıvılcım tam olarak konuşma sürdüğü kadar yanık kalır. Bu gerçek bir güçtür — birbirinizi asla sıkmazsınız ve bir çift olarak sorunları iyi çözersiniz. Risk daha inceliklidir: iyi bir konuşmayı yakınlıkla karıştırmak ve biraz boynun üstünde yaşamak, düşünceler alışverirken his katmanı bakımsız kalırken mümkündür. Yakınlığın sözel olmayan parçalarına yer açın — paylaşılan bir sessizlik, bir yemek, yan yana yapılan bir iş — ve zihinsel bağlantı bir yedek değil bir temel olur.',
  'syn.deep.pattern.physical':
    'Özünde bu bir itki ve beden bağlantısı. Mars ve Güneş ağır işi yapıyor, bu yüzden burada gerçek kimya ve gerçek ivme var — birbirinize enerji verirsiniz, birlikteyken işleri yaptırırsınız ve yapılacak bir iş olduğunda bir takım olarak iyi çalışırsınız. Aynı kablolama, birbirinizi de o kadar çabuk sinirlendirebileceğiniz anlamına gelir; rekabetçilik ve tahriş çekimin gölge yüzüdür. Çözüm ısıyı bastırmak değil, ona nişan almaktır. Ona ortak bir yön verin — bir proje, bir plan, bir meydan okuma, hatta kurallı temiz bir kavga — ve yoğunluk içe dönmek yerine sizin için çalışır.',
  'syn.deep.pattern.karmic':
    'Özünde bunun bir ağırlığı var. Satürn ve Plüton karışımda, bu da bağa bir sonuç duygusu getiriyor — sanki burada vakti hoşça geçirmek için değil, birlikte bir şeyi çözmek için bulunuyormuşsunuz gibi. Bunun gibi bağlantılar erken önemli hissettirme ve her iki kişiden de daha hafif bir eşleşmenin isteyeceğinden fazlasını isteme eğilimindedir. İyi ele alındığında derinden sadık ve dayanıklı olur, şeylere dayanan türden bir bağ. Dikkatsizce ele alındığında ağırlaşır — yakınlık kılığına girmiş yükümlülük ya da kimsenin adını koymadığı yavaş bir güç çekişmesi. Fark neredeyse tamamen, ayrılmak başarısızlık gibi hissettirdiği için kalmak yerine, ikinizin de onu sesli olarak, bilerek seçmeye devam edip etmediğinizdedir.',

  'syn.deep.chemHead': 'Aranızdaki kimya',
  'syn.deep.chem.strong':
    'Buradaki çekim iyi desteklenmiş. Haritalarınız arasında arzuyu ve sevgiyi yöneten temaslar büyük ölçüde uyumlu, bu da genellikle gergin olmaktan çok doğal hissettiren bir kimyaya çevrilir — sürdürmesi fazla bedel istemeyen bir biçimde birbirinize çekilirsiniz. Bunun keyfini çıkar ve bunu ilişkinin geri kalanının kendi kendine yürüyeceğinin kanıtı sayma; bir bölümdeki kolaylık, ötekilerdeki çabanın yerini tutmaz.',
  'syn.deep.chem.mixed':
    'Buradaki çekimin hem akımı hem de kumu var. Haritalarınız arasındaki temasların bir kısmı sizi sıcak biçimde bir araya çeker; başkaları aynı çekime sürtünme ekler, bu da keskin kenarlı bir kimya gibi okunabilir — manyetik, arada bir çıldırtıcı, nadiren yavan. Bu tür kıvılcım, sürtünmesiz olandan daha uzun sürme eğilimindedir, tam da durmadan yeniden ürediği için. İş, o kenarı oyunbaz tutmak, onu birbirinizi sinirlendirme kalıbına ekşimeye bırakmamaktır.',
  'syn.deep.chem.cool':
    'Arzu, haritalarınız arasındaki en yüksek sesli iplik değil. Çekimi yöneten temaslar sessiz ya da hafifçe zorlayıcı, bu da kıvılcım yok demek değil — yalnızca bu bağlantının başka şeyler üzerine inşa edilme olasılığının daha yüksek olduğu: paylaşılan anlayış, saygı, güvenilirlik, değerlerin buluşması. Bunların üzerine kurulan ilişkiler daha yavaş tutuşma ve kırmanın önemli ölçüde daha zor olması eğilimindedir.',

  'syn.deep.commHead': 'Nasıl iletişim kurarsınız',
  'syn.deep.comm.easy':
    'İletişim burada bir güç. Merkür temaslarınız akıyor, bu da genellikle birbirinizin düşüncesini izlediğiniz, şakaları tutturduğunuz ve fazla çeviri kaybı olmadan bir sorun üzerinde birlikte çalıştığınız anlamına gelir. Zor bir şey ortaya çıktığında bunu bilerek kullan — çoğu çiftten daha iyi konuşup çözersiniz, o yüzden zor konuşmaları kaçındıklarınız yapmayın.',
  'syn.deep.comm.work':
    'İletişim burada biraz iş ister. Merkür temaslarınız sürtünme taşıyor, bu yüzden birbirinize çapraz konuşabilirsiniz — farklı tempolar, farklı mantık, aslında neyin kararlaştırıldığına dair farklı varsayımlar. Bu yönetilebilir ama bir alışkanlık gerektirir: yavaşla, duyduğunu geri söyle ve ilerlemeden önce aynı sözcükle aynı şeyi kastettiğinizi kontrol et.',
  'syn.deep.comm.quiet':
    'Haritalarınız arasında hiçbir yönde güçlü bir Merkür teması yok, bu da genellikle iletişimin ne bariz bir armağan ne de bariz bir sorun olduğu anlamına gelir — yalnızca içine düşeceğiniz değil, bilerek inşa edeceğiniz bir şey. Düzenli, zorlanmamış yoklamalar, birbirini otomatik okuyan bir çift için olduğundan sizin için daha önemlidir.',

  'syn.deep.growthLead': 'Bu seni nerede büyütür',
  'syn.deep.growth.good':
    'Aranızdaki kolaylık gerçek ve aynı zamanda gözetilecek şey. Bir bağlantı çoğunlukla kendi kendine yürüdüğünde, umursamaz olmak kolaydır — mecbur kalmadığın için tüm dürüstlüğünü ve çabanı getirmeyi bırakmak. Bir çift olarak keskin yanınız, bunu talep etmeyen bir şey için düzgünce ortaya çıkmaya devam etmektir: doğru şeyi söylemeye devam etmek, çabayı göstermeye devam etmek, birbirinizi fark etmeye devam etmek. «Kolay»ın sessizce «bakımsız»a dönüşmesine izin vermeyin.',
  'syn.deep.growth.mid':
    'Aranızdaki sürtünme noktaları eşleşmenin kusurları değil; müfredattır. Her biri ikinizin de gerilmesi gereken bir yeri işaretler — zor şeyi daha erken söylemek, kendi zeminini daha nazik tutmak, okunmayı beklemeyi bırakıp açık olmaya başlamak. Bu gerilimleri erken adlandıran ve onları paylaşılan iş olarak ele alan çiftler zamanla iyi gitme eğilimindedir. Onların kendiliğinden çözüleceğini uman çiftler yıllarca aynı tartışmayla karşılaşma eğilimindedir.',
  'syn.deep.growth.hard':
    'Bu bağlantı ikinizden de çok şey ister. Haritalarınız arasındaki zorlu temaslar kendiliğinden çözülmez, bu yüzden ilişki yalnızca ikiniz de zorluğu diğerinin suçu değil ortak iş olarak ele alırsanız yürür. Bu gerçekten mümkün — birçok kalıcı bağ zor açılar üzerine kuruludur — ama bu, defalarca ve sesli olarak, özellikle hesap tutmanın daha kolay olacağı bölümlerde vermeye devam etmen gereken bir seçimdir.',

  'syn.deep.nameItLead': 'Bu kısmı sesli söyle',
  'syn.deep.nameIt':
    'Oturmasını ummak yerine erken adlandırmaya değer tek bir şey varsa, o da {a}–{b} temasıdır: {sentence} Söylenmeden, bir kalıba kireçlenme eğilimindedir; açıkça ve erken söylendiğinde, genellikle hissettiğinden daha küçük çıkar.',
  'syn.deep.nameIt.none':
    'Burada erkenden önlenmesi gereken tek bir sürtünme noktası yok — ki bu başlı başına bilmeye değer. Bu bağlantıdaki iş, tek bir meseleyi etkisizleştirmekten çok, bütünü boyunca dikkatli kalmakla ilgilidir.',

  'syn.deep.longViewLead': 'Uzun vadeli bakış',
  'syn.deep.longView.good':
    'bu iyi yaşlanan türden bir bağlantı. Birbirinizin kenarlarını öğrendikçe daha zor değil daha kolay olma eğilimindedir ve erken kolaylık genellikle zamanla daha sağlam, daha güvenilir bir şeye derinleşir. Ona başlıca tehdit çatışma değil ihmaldir.',
  'syn.deep.longView.mid':
    'bu ondan yaptığınız şey olur. Ham madde işlenebilir — ne çabasız ne de mahkûm — ve sonuç neredeyse tamamen, kalıplar oturmadan önce ilk bölümde ikinizin koyduğu çabaya bağlıdır. Alışkanlıkları erken doğru yap ve bu dayanabilir.',
  'syn.deep.longView.hard':
    'bu şimdi yoğun ve muhtemelen yoğun kalacak. Derinlik ve anlam ikinizin de bir ilişkiden gerçekten istediği şeyse buna değer. Bir yanın sakinleşip kolay bir şeye dönüşmesini bekliyorsa yıpratıcıdır — muhtemelen buradaki ödev bu değil.',
} as const
