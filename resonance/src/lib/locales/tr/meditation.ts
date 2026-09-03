import type { MeditationKey } from '../en/meditation'

/** Türkçe — rehberli meditasyonlar: bir kez okunan özet, sonra her adımı bir çanın işaretlediği. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'omurganın tabanı, yerle buluştuğun yer',
  'med.seat.sacral': 'alt karnın, göbeğin bir el genişliği altı',
  'med.seat.solar-plexus': 'kaburgaların altındaki yumuşak yer',
  'med.seat.heart': 'göğsünün merkezi',
  'med.seat.throat': 'boğazının çukuru',
  'med.seat.third-eye': 'kaşlarının arasındaki boşluk',
  'med.seat.crown': 'başının tepesi ve biraz üstü',
  'med.chakraLower': '{chakra} merkezi',

  'med.house.1': 'kendini nasıl gösterdiğin ve dünyayla nasıl karşılaştığın',
  'med.house.2': 'neye değer verdiğin ve seni ne dengelediği',
  'med.house.3': 'günlük zihnin ve kullandığın sözcükler',
  'med.house.4': 'ev, kökler ve tutulduğunu hissettiğin yer',
  'med.house.5': 'oyun, yaratıcılık ve sana keyif veren şey',
  'med.house.6': 'kendine bakmanın günlük işi',
  'med.house.7': 'sana en yakın kişiler',
  'med.house.8': 'sona eren şey ve derinden paylaştığın şey',
  'med.house.9': 'anlam ve daha geniş görüş',
  'med.house.10': 'dünyadaki işin ve nasıl görüldüğün',
  'med.house.11': 'insanların ve uzandığın şey',
  'med.house.12': 'dinlenme, yalnızlık ve her şeyin altındaki sessizlik',

  'med.invite.Sun': 'Burada istikrarlı bir sıcaklığın toplanmasına izin ver — kendi ışığın, dolambaçsız.',
  'med.invite.Moon': 'Ne hissediyorsan, düzeltilmeye ihtiyaç duymadan, sadece burada olmasına izin ver.',
  'med.invite.Mercury': 'Düşünmenin yavaşlamasına izin ver. Şu an hiçbir şeyi çözmen gerekmiyor.',
  'med.invite.Venus': 'Sevdiğin birine olduğun gibi kendine karşı yumuşa.',
  'med.invite.Mars': 'Herhangi bir ısıyı ya da aceleyi fark et ve verişin bir kısmını götürmesine izin ver.',
  'med.invite.Jupiter': 'Bu alanın bir an öncesinden biraz daha ferah hissedilmesine izin ver.',
  'med.invite.Saturn': 'Buradaki ağırlıkla dürüstçe karşılaş. Sandığından fazlasını taşıyabilirsin.',
  'med.invite.Uranus': 'Bir şeyin gevşemesine izin ver — bir kavrayış, artık ihtiyacın olmayan eski bir biçim.',
  'med.invite.Neptune': 'Sınırların bulanıklaşmasına izin ver. Bir süre bilmemene izin var.',
  'med.invite.Pluto': 'Biten şeyin bitmesine izin ver. Bıraktığı boşluğa nefes al.',
  'med.invite.default': 'Bu enerjinin içine değil, içinden geçmesine izin ver.',

  'med.ease.hard': 'Bugün {dominant} içinde sürtünme var. Buraya onu zorla aşmak için gelmedin — yalnızca onu net hissetmek ve çevresinde yumuşak kalmak için.',
  'med.ease.soft': '{dominant} bugün akıyor. Kolaylığı fark et ve almana izin ver.',
  'med.ease.neutral': '{dominant} bugün yoğun. Bedene yerleşmek yerine içinden geçmesine izin ver.',

  'med.dominant.aspect': '{planet}, natal {other} ile {verb}',
  'med.dominant.sign': '{sign} burcunda ilerleyen {planet}',
  'med.dominant.chartWord': 'harita',
  'med.domverb.conjunction': 'kavuşumda',
  'med.domverb.opposition': 'karşıtında',
  'med.domverb.square': 'karede',
  'med.domverb.trine': 'üçgende',
  'med.domverb.sextile': 'altmışlıkta',

  'med.houseLine.known': 'Bu, hayatının {theme} ile ilgili kısmına dokunuyor. Onu hafifçe tut. Burada karar verilecek bir şey yok — yalnızca fark etmek var.',
  'med.houseLine.unknown': 'Bu hayatında neyi kıpırdatırsa kıpırdatsın, bu pratik boyunca yerine oturmasına izin ver. Bitirdiğinde hâlâ orada olacak, ve ona daha çok alanla karşılaşacaksın.',

  'med.mantraLong.root': 'Güvendeyim. Buradayım. İhtiyacım olana sahibim.',
  'med.mantraLong.sacral': 'Hayatın içimden geçmesine izin veriyorum.',
  'med.mantraLong.solar-plexus': 'Kendi ateşime güveniyorum.',
  'med.mantraLong.heart': 'Sevgiyi özgürce verip alıyorum.',
  'med.mantraLong.throat': 'Hakikatimi kolaylıkla söylüyorum.',
  'med.mantraLong.third-eye': 'İçimde gördüğüme güveniyorum.',
  'med.mantraLong.crown': 'Uçsuz bucaksız bir şeyin parçasıyım ve o beni tutuyor.',

  'med.title.fallback': '{chakra} merkezi meditasyonu',

  /* ---- başlamadan önce bir kez okunan özet ---- */
  'med.brief.lead': 'Bunu bir kez oku, sonra gözlerini kapat. Her adım bir çanla açılır — bir sonrakine kadar onunla kal.',
  'med.brief.close': 'Üç yumuşak çan pratiği bitirir. Kendi ritminde geri dön.',

  /* ---- genel adımlar ---- */
  'med.step.settle': 'Gözler kapalı. Bedenin yerine oturmasına ve nefesin kendiliğinden yavaşlamasına izin ver.',
  'med.step.breath': 'Dikkatini nefese ver — içeri girişini izle, dışarı çıkışını izle. Zihin dağıldığında, o fark ediş pratiktir. Nazikçe geri dön.',
  'med.step.centre': 'Dikkatini {seat} bölgesine getir. Nefes, {chakraLower} merkezine ulaşıyormuş gibi nefes al. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Sessizce, nefesin ritmiyle: {affirmation}',
  'med.step.close': 'Pratiği bırak. Gözlerini açmadan önce şu an nasıl hissettiğini fark et.',

  /* ---- nefes farkındalığı ---- */
  'med.step.ba.count': 'Şimdi her verişi say — birden ona, sonra baştan başla. Sayıyı kaybedersen sadece birden başla. Kimse puan tutmuyor.',

  /* ---- beden taraması ---- */
  'med.step.scan.0': 'Dikkatini ayak tabanlarından yukarı doğru yavaşça süpür — bilekler, bacaklar, kalçalar, karın, sırt, göğüs, kollar, eller. Gerginlikle karşılaştığın yerde birkaç nefes dinlen ve yumuşamasına izin ver.',
  'med.step.scan.1': 'Şimdi omuzlar, boğaz, çene, gözlerin çevresindeki boşluk, saç derisi. Sonra tüm bedeni bir kerede hisset — ağır, sıcak, kendiliğinden nefes alan.',

  /* ---- sevgi dolu şefkat ---- */
  'med.step.metta.0': 'Kendini aklına getir, tam da bugünkü halinle. Sessizce sun: güvende olayım, iyi olayım, huzurlu olayım. Yavaşça tekrarla ve gerçekten kastetmene izin ver.',
  'med.step.metta.1': 'Kolayca sevdiğin birini aklına getir. Yüzünü canlandır ve aynısını sun: güvende ol, iyi ol, huzurlu ol.',
  'med.step.metta.2': 'Şimdi genişlet — zar zor tanıdığın biri, zor bulduğun biri, sonra herkes, her yerde: tüm varlıklar güvende olsun, tüm varlıklar huzurlu olsun.',

  /* ---- ses banyosu ---- */
  'med.step.bath.0': 'Tonun ön plana gelmesine izin ver. Zorlanarak dinlemiyorsun — sesin, ışığın geldiği gibi gelmesine izin veriyorsun.',
  'med.step.bath.1': 'Sesin bedende nereye indiğini fark et — göğüs, kafatası, eller. Seninle ses arasındaki boşluğun erimesine izin ver.',

  /* ---- şükran ---- */
  'med.step.grat.0': 'Son bir günden iyi giden bir şeyi aklına getir, ne kadar küçük olursa olsun. Yalnızca adlandırma — minnetin bedende nereye yerleştiğini hisset.',
  'med.step.grat.1': 'Şimdi genellikle olağan saydığın bir şey — çalışan bir beden, bir çatı, kalan biri. Birkaç nefes onunla kal.',
  'med.step.grat.2': 'Bir tane daha — kendinle ilgili bir şey. Nasıl dik durduğun, hallettiğin bir şey, kimsenin görmediği bir çaba. Üçünü birlikte tut.',

  /* ---- güvenli yer ---- */
  'med.step.safe.0': 'Kendini tamamen güvende hissettiğin bir yer canlandır — gerçek ya da hayali. Yavaşça bak: ışık, günün saati, ne duyduğun, teninde ne hissettiğin.',
  'med.step.safe.1': 'Burada en çok dinlenmek isteyeceğin noktayı bul ve oraya git. Senden hiçbir şey istenmiyor. İzin vermediğin hiçbir şey sana ulaşmıyor.',

  /* ---- dağ ---- */
  'med.step.mtn.0': 'Bir dağ canlandır — geniş tabanı, sağlam yamaçları, hareketsiz zirvesi. Bedeninin ve dağın aynı biçim olmasına izin ver: oturuş taban, omurga yamaç, baş zirve.',
  'med.step.mtn.1': 'Dağın çevresinde hava gelir gider — ışık, bulut, rüzgâr, fırtına. Düşüncelerin ve ruh halin havadır. Dağ onunla tartışmaz ve onunla küçülmez.',

  /* ---- açık farkındalık ---- */
  'med.step.open.0': 'Nefesin çıpasını bırak. Dikkatin belirli bir şeyde değil, geniş açık olsun. Sesler, duyumlar, düşünceler doğar ve geçer — ne peşlerinden gidersin ne de onları itersin.',
  'med.step.open.1': 'Farkındalığın kendisinin hareket etmediğini fark et. Şeyler onun içinde olur, bulutların gökyüzünün içinde olması gibi. O gökyüzü olarak dinlen — eklenecek bir şey yok, çıkarılacak bir şey yok.',

  /* ---- sabah niyeti ---- */
  'med.step.morn.0': 'Normalden biraz daha derin, üç dolu nefes — bedeni içeriden uyandırmalarına izin ver. Omuzları bir kez geriye çevir ve bedenin ön yüzünün açıldığını hisset.',
  'med.step.morn.1': 'Önündeki günü gevşekçe aklına getir, sonra bir niyet seç — bir görev değil, bir varoluş biçimi. Sabırlı. Dürüst. Cesur. Nazik. Bir kez söyle: bugün ___ olacağım.',

  /* ---- akşam bırakması ---- */
  'med.step.eve.0': 'Günün hafifçe geçmesine izin ver, tren penceresinden manzara gibi — sabah, öğle, akşam. Hiçbir şeyde durma. Bir an seni çekerse, not et ve söyle: şimdi değil.',
  'med.step.eve.1': 'Olduğuna sevindiğin bir anı ve günün gerçekten nasıl geçtiğine göre elinden geldiğince iyi yaptığın bir şeyi bul. Bunun yeterli olmasına izin ver. Şimdi tüm günü bırak — sadece bittiği için tamamlanmıştır.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Tamamen hareketsiz uzan — doğal hissettirdiğinden daha hareketsiz, yalnızca nefes hareket ediyor. Kısa bir niyet belirle, şimdiki zamanda tek bir sakin cümle. İçinden üç kez söyle.',
  'med.step.nidra.1': 'Her yer adlandırıldıkça dikkatini oraya götür, hareket etmeden — sağ el: başparmak, parmaklar, avuç, bilek, önkol, dirsek, omuz. Sonra solda aynısı.',
  'med.step.nidra.2': 'İki kalça. Sağ bacak — uyluk, diz, kaval, ayak bileği, ayak, parmaklar. Sol bacak aynı. Tüm sırt yere yaslanmış, karın inip kalkarak, göğüs, boğaz.',
  'med.step.nidra.3': 'Yüz — çene, dudaklar, burun, yanaklar, gözler, kaşların arası, saç derisi. Şimdi tüm beden bir kerede, hafifçe parıldayarak, zeminin taşıdığı. Niyetine geri dön.',
}
