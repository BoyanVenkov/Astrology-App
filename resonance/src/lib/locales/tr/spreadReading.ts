import type { SpreadReadingKey } from '../en/spreadReading'

/** Türkçe — tüm tarot açılımının bütünsel okuması. */
export const spreadReading: Record<SpreadReadingKey, string> = {
  'sp.reading.heading': 'Tüm açılımı okumak',
  'sp.throughline': 'Bu okuma {dominant} yönüne eğiliyor. {tone}',
  'sp.dominant.major': 'büyük, kaderle örülü dönüm noktaları',
  'sp.dominant.wands': 'eylem ve ivme',
  'sp.dominant.cups': 'duygu ve bağlantı',
  'sp.dominant.swords': 'düşünce, gerçek ve çatışma',
  'sp.dominant.pentacles': 'pratik ve maddi olan',
  'sp.tone.rising':
    'Kartlar burada senin lehine eğiliyor — direnmekten çok açılıyor.',
  'sp.tone.testing':
    'Bu açılım senden bir şey istiyor. Şu anda akıştan çok sürtünme var, ama karşılaşmaya değer bir sürtünme.',
  'sp.tone.mixed':
    'Gerçekten karma bir el — gerçek destek, gerçek direncin hemen yanında duruyor. Burada hiçbir şey basit değil, ve bu dürüstçe böyle.',
  'sp.tone.steady':
    'Sakin, dengeli bir el. Hiçbir yönde güçlü bir itiş yok — burada mesele istikrar, drama değil.',
  'sp.three.arc':
    '{past} ile başladı, şimdi seninle {present} noktasında buluşuyor ve {future} yönüne ilerliyor.',
  'sp.cross.aligned':
    'Burada seni zorlayan şey, aslında meselenin özüyle karşıt değil, birlikte çalışıyor.',
  'sp.cross.opposed':
    'Burada seni zorlayan şey, meselenin özüne karşı çekiyor — bu çözülmeden önce gerçek bir gerginlik bekle.',
  'sp.cross.neutral':
    'Zorluk ve meselenin özü yan yana duruyor, ne birbirine yardım ediyor ne de zarar veriyor.',
}
