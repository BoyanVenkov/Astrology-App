import type { ScreenKey } from '../en/screens'

/** Español — textos de las pantallas secundarias. */
export const screens: Record<ScreenKey, string> = {
  /* ---- cielo local / enraizamiento ---- */
  'geo.ground.scarce':
    'La luz del día escasea — sal un rato cerca del mediodía, come algo caliente y permítete dormir temprano.',
  'geo.ground.long':
    'La luz larga estira el día — busca sombra y agua fresca al mediodía, y protege tu dormitorio del sol tardío.',
  'geo.ground.spring':
    'La luz vuelve — lleva tu práctica hacia la mañana y deja que la energía crezca.',
  'geo.ground.summer':
    'Máxima luz — mantén el ritmo suave, hidrátate y enraíza con los pies descalzos sobre tierra o hierba.',
  'geo.ground.autumn':
    'La luz se recoge — favorece prácticas más lentas y templadas y un cierre del día más temprano.',
  'geo.ground.winter':
    'La mitad oscura — descansar es productivo ahora; mantén las prácticas cortas, reparadoras y a la luz de una vela.',
  'geo.season.spring': 'Primavera',
  'geo.season.summer': 'Verano',
  'geo.season.autumn': 'Otoño',
  'geo.season.winter': 'Invierno',

  /* ---- horóscopo rápido ---- */
  'scr.quick.eyebrow': 'Horóscopo de hoy',
  'scr.quick.you': 'Tú',
  'scr.quick.moon': 'Luna',
  'scr.quick.readFull': 'Léelo completo →',
  'scr.quick.fullPro': 'La lectura completa · Pro →',

  /* ---- horóscopo completo ---- */
  'scr.horo.eyebrow': 'Horóscopo Diario',
  'scr.horo.addBirth': 'Añadir datos de nacimiento →',
  'scr.horo.moonHead': 'La Luna',
  'scr.horo.skyHead': 'El cielo sobre ti',
  'scr.horo.risingNow': '{sign} está ascendiendo sobre ti ahora mismo.',
  'scr.horo.transitingHouse': '{planet} está transitando tu {ord} casa.',
  'scr.horo.addPlace': 'Añade un lugar de nacimiento, o comparte tu ubicación en Ajustes →',
  'scr.horo.practiceHead': 'Práctica de hoy',
  'scr.horo.geoLine': '{season} · sol {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h de luz',
  'scr.horo.birthPlace': ' · usando tu lugar de nacimiento',

  /* ---- tránsitos ---- */
  'scr.transits.eyebrow': 'El Cielo',
  'scr.transits.titleNatal': 'Tránsitos a tu carta',
  'scr.transits.titleSky': 'El cielo de hoy',
  'scr.transits.addChart': 'Añadir carta',
  'scr.transits.nowHead': 'Ahora mismo, sobre ti',
  'scr.transits.rising': '{sign} está ascendiendo',
  'scr.transits.movingHouse': '{planet} está atravesando tu {ord} casa — {arena}.',
  'scr.transits.sunMoon': 'Sol {sunrise}–{sunset} · Luna {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'lugar de nacimiento',
  'scr.transits.allInOrb': 'Cada tránsito en orbe',
  'scr.transits.moonAspects': 'Los aspectos de la Luna hoy',
  'scr.transits.natalPrefix': 'natal ',
  'scr.transits.nothingOrb': 'Nada dentro de orbe hoy.',
  'scr.transits.applying': 'aplicativo',
  'scr.transits.separating': 'separativo',
  'scr.transits.orbNote':
    '↑ aún estrechándose hacia el exacto · ↓ separándose. Los orbes más cerrados se sienten con más fuerza.',

  /* ---- diario ---- */
  'scr.journal.dayStreak': 'días seguidos',
  'scr.journal.practices': 'prácticas',
  'scr.journal.minutes': 'minutos',
  'scr.journal.last4w': 'Últimas 4 semanas',
  'scr.journal.lastNDays': 'Últimos {n} días',
  'scr.journal.reasonHistory': 'Historial de diario ilimitado',
  'scr.journal.fullHistory': 'historial completo →',
  'scr.journal.gridNote': 'Relleno = minutos practicados · anillo = ánimo registrado',
  'scr.journal.recent': 'Práctica reciente',
  'scr.journal.noSessions': 'Aún no hay sesiones — empieza una desde el panel.',
  'scr.journal.endedEarly': ' · terminada antes',
  'scr.journal.min': '{n} min',

  /* ---- ritual (ejecución de la práctica) ---- */
  'scr.ritual.attuning': 'Sintonizando con el cielo…',
  'scr.ritual.back': 'Atrás',
  'scr.ritual.todaysPractice': 'Práctica de hoy',
  'scr.ritual.fromLibrary': 'De la biblioteca',
  'scr.ritual.focusAlignment': 'Alineación de {chakra}',
  'scr.ritual.chakraBlurb': 'Una sesión guiada moldeada por {planet} y tu carta.',
  'scr.ritual.freqBlurb':
    '{intention}. Siéntate, ablándate y deja que el tono lleve la sesión.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Tono',
  'scr.ritual.journeyNote':
    '{n} rondas, a tu ritmo — unos 12 minutos. La pantalla guía cada fase.',
  'scr.ritual.length': 'Duración',
  'scr.ritual.sound': 'Sonido',
  'scr.ritual.sound.tone': 'Tono',
  'scr.ritual.sound.music': 'Música',
  'scr.ritual.sound.silent': 'Silencio',
  'scr.ritual.soundTone': 'El tono de frecuencia de {hz} Hz suena por debajo.',
  'scr.ritual.soundMusic': 'Un acorde ambiental suave y de movimiento lento.',
  'scr.ritual.soundSilent': 'Sin sonido — solo guía hablada o en pantalla.',
  'scr.ritual.spokenGuidance': 'Guía hablada',
  'scr.ritual.notAvailable': 'no disponible aquí — las palabras se muestran en pantalla',
  'scr.ritual.beginPractice': 'Empezar práctica',
  'scr.ritual.notNow': 'Ahora no',
  'scr.ritual.endSession': '‹ Terminar sesión',
  'scr.ritual.complete': 'Práctica completa',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': 'Racha de {n} días',
  'scr.ritual.firstLogged': 'Primera práctica registrada',
  'scr.ritual.howNow': '¿Cómo te sientes ahora?',
  'scr.ritual.done': 'Hecho',

  /* ---- registro de ánimo ---- */
  'scr.moodci.default': '¿Cómo te sientes?',
  'scr.moodci.logged': 'Registrado ✦',
  'scr.moodci.logThis': 'Registrar esto',
  'scr.moodci.eyebrow': 'Registro de la noche',
  'scr.moodci.blurb': 'Un toque. Da forma al aura de mañana y a tu tendencia de ánimo.',
  'scr.moodci.noteLabel': 'Nota (opcional)',
  'scr.moodci.notePlaceholder': 'Lo que tengas en la cabeza…',
  'scr.moodci.update': 'Actualizar registro',
  'scr.moodci.save': 'Guardar registro',

  /* ---- carta natal ---- */
  'scr.natal.eyebrow': 'Carta Natal',
  'scr.natal.title': 'El cielo de tu nacimiento',
  'scr.natal.blurb':
    'Añade tu fecha, hora y lugar de nacimiento y Resonance dibujará tu carta natal — la posición exacta del Sol, la Luna y los planetas en el momento en que naciste.',
  'scr.natal.addDetails': 'Añadir datos de nacimiento',
  'scr.natal.edit': 'editar',
  'scr.natal.timeUnknown': 'hora desconocida (mediodía)',
  'scr.natal.angleLine': '{asc} asc · MC {mc} · {system}',
  'scr.natal.placidus': 'casas de Placidus',
  'scr.natal.wholeSign': 'casas de signo entero',
  'scr.natal.addPlace': 'Añade tu lugar de nacimiento para el Ascendente y las casas →',
  'scr.natal.wheelAria': 'Rueda de la carta natal',
  'scr.natal.placements': 'Posiciones',
  'scr.natal.aspects': 'Aspectos natales',
  'scr.natal.noAspects': 'Sin aspectos mayores dentro de orbe.',
  'scr.natal.house': 'C{n}',

  /* ---- botica ---- */
  'scr.apoth.eyebrow': 'Botica',
  'scr.apoth.title': 'Compañeros de cristal',
  'scr.apoth.subChart': 'Piedras para el trabajo de {chakra} hoy · {n} en el armario',
  'scr.apoth.subPlain': '{n} piedras en el armario',
  'scr.apoth.all': 'Todas',
  'scr.apoth.today': 'Hoy',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'No hay piedras en la categoría {filter}.',
  'scr.apoth.noneThat': 'esa',
  'scr.apoth.pair': 'combina una piedra con la práctica de hoy →',

  /* ---- pantalla de la Luna ---- */
  'scr.moon.eyebrow': 'El Cielo',
  'scr.moon.title': 'La Luna',
  'scr.moon.sub': '{phase} · {pct}% iluminada',
  'scr.moon.whereShe': 'Dónde está',
  'scr.moon.inSign': 'La Luna está en {sign} — {note}.',
  'scr.moon.vocUntil':
    'Fuera de curso hasta que entre en {sign}{time} — mala ventana para empezar algo nuevo. En su lugar, enraíza y cierra cabos sueltos.',
  'scr.moon.vocAt': ' a las {time}',
  'scr.moon.vocSoon': 'Queda fuera de curso en {hours} h.',
  'scr.moon.notVoc': 'No está fuera de curso — la Luna hace aspectos limpios.',
  'scr.moon.comingUp': 'Próximamente',

  /* ---- notificaciones locales ---- */
  'notif.daily.title': 'Tu lectura está lista',
  'notif.daily.body': 'El tránsito, el foco de chakra y la práctica de hoy te esperan.',
  'notif.evening.title': 'Baja el ritmo',
  'notif.evening.body': 'Unas respiraciones y un registro de ánimo antes de dormir.',
  'notif.newMoon.title': 'Luna Nueva esta noche',
  'notif.newMoon.body': 'Un reinicio tranquilo — fija una intención y guárdala para ti.',
  'notif.fullMoon.title': 'Luna Llena esta noche',
  'notif.fullMoon.body': 'Los sentimientos brillan fuerte. Fíjate en lo que sale a la superficie.',
  'notif.moonSign.title': 'La Luna entra en {sign}',
  'notif.moonSign.body':
    'El clima emocional cambia — un buen momento para enraizar tu energía.',
  'notif.voc.title': 'La Luna queda fuera de curso',
  'notif.voc.body':
    'El fuera de curso empieza en 15 minutos. Enraíza tu energía — descansa, no empieces.',

  /* ---- banner de Luna fuera de curso ---- */
  'scr.voc.active': 'Luna fuera de curso — enraíza, no empieces. Termina a las {time}.',
  'scr.voc.activeSoon': 'Luna fuera de curso — enraíza, no empieces. Termina pronto.',
  'scr.voc.upcoming': 'La Luna queda fuera de curso en {hours} h.',
  'scr.voc.twoMin': '2 min',

  /* ---- centro del cielo: resumen del campo de chakras ---- */
  'scr.field.summary.join': ' y ',
  'scr.field.summary.pressure': '{names} bajo presión',
  'scr.field.summary.open': '{names} abiertos de par en par',
  'scr.field.summary.carries': '{name} lleva el día',
  'scr.field.summary.settled': 'Un campo asentado',

  /* ---- tarjeta y guía de ayuno ---- */
  'scr.fast.eyebrow': 'Ayuno',
  'scr.fast.phase.waxing': 'luna creciente',
  'scr.fast.phase.waning': 'luna menguante',
  'scr.fast.cardMeta': '{special} · día lunar {day} · Luna en {sign}',
  'scr.fast.bestToday': 'Mejor tipo hoy:',
  'scr.fast.betterDays': 'Mejores días por venir',
  'scr.fast.waningWindow': 'Ventana menguante',
  'scr.fast.cardDisclaimer':
    'Orientación lunar tradicional, no consejo médico. Si tienes una condición de salud o una historia con la comida, sáltate el ayuno y simplemente come más ligero.',
  'scr.fast.fiveKinds': 'Los cinco tipos y los días por venir →',
  'scr.fast.less': 'Menos',
  'scr.fast.howHold': 'Cómo sostenerlo',
  'scr.fast.guideSubSpecial': '{special} · Luna en {sign}',
  'scr.fast.guideSubPhase': '{phase} · día lunar {day}',
  'scr.fast.today': 'Hoy',
  'scr.fast.skyBacks': 'El cielo respalda → {method}',
  'scr.fast.whichKind': 'Qué tipo',
  'scr.fast.whichKindBlurb':
    'Cinco formas de sostener un ayuno, la más suave primero — cada una valorada para la Luna de hoy. Toca una para abrirla.',
  'scr.fast.holdingWell': 'Sostenerlo bien',
  'scr.fast.hold1':
    'Bebe durante el ayuno — agua, infusión, café solo. Una pizca de sal ayuda en los más largos.',
  'scr.fast.hold2':
    'Rómpelo con suavidad: primero agua tibia, luego algo pequeño y cocinado. No te lances de golpe a la comida grande.',
  'scr.fast.hold3':
    'Muévete despacio, duerme más y para en el momento en que tu cuerpo te diga que pares.',
  'scr.fast.guideDisclaimer':
    'Orientación lunar tradicional, no consejo médico. El ayuno seco — sin agua — conlleva un riesgo real y nunca es algo que el cielo «recomiende»; esta guía asume que bebes. Si estás embarazada, tomas medicación, eres diabético, tienes bajo peso o una historia con la comida, sáltate el ayuno y simplemente come más ligero.',
}
