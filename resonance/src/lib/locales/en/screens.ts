/** Sub-screen chrome — headings, labels and buttons on the pushed screens. */
export const screens = {
  /* ---- local sky / grounding (geo.ts) ---- */
  'geo.ground.scarce':
    'Daylight is scarce — step outside near midday, eat something warm, and let yourself sleep early.',
  'geo.ground.long':
    'Long light stretches the day — take shade and cool water at midday, and shield your bedroom from the late sun.',
  'geo.ground.spring':
    'The light is returning — move your practice toward the morning and let energy build.',
  'geo.ground.summer':
    'Peak light — keep the pace gentle, hydrate, and ground with bare feet on earth or grass.',
  'geo.ground.autumn':
    'The light is drawing in — favour slower, warming practices and an earlier wind-down.',
  'geo.ground.winter':
    'The dark half — rest is productive now; keep practices short, restorative and candle-lit.',
  'geo.season.spring': 'Spring',
  'geo.season.summer': 'Summer',
  'geo.season.autumn': 'Autumn',
  'geo.season.winter': 'Winter',

  /* ---- quick horoscope ---- */
  'scr.quick.eyebrow': "Today's horoscope",
  'scr.quick.you': 'You',
  'scr.quick.moon': 'Moon',
  'scr.quick.readFull': 'Read it in full →',
  'scr.quick.fullPro': 'The full reading · Pro →',

  /* ---- full horoscope ---- */
  'scr.horo.eyebrow': 'Daily Horoscope',
  'scr.horo.addBirth': 'Add birth details →',
  'scr.horo.moonHead': 'The Moon',
  'scr.horo.skyHead': 'The sky above you',
  'scr.horo.risingNow': '{sign} is rising over you right now.',
  'scr.horo.transitingHouse': '{planet} is transiting your {ord} house.',
  'scr.horo.addPlace': 'Add a birth place, or share your location in Settings →',
  'scr.horo.practiceHead': "Today's practice",
  'scr.horo.geoLine': '{season} · sun {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h of light',
  'scr.horo.birthPlace': ' · using your birth place',

  /* ---- transits ---- */
  'scr.transits.eyebrow': 'The Sky',
  'scr.transits.titleNatal': 'Transits to your chart',
  'scr.transits.titleSky': 'The sky today',
  'scr.transits.addChart': 'Add chart',
  'scr.transits.nowHead': 'Right now, above you',
  'scr.transits.rising': '{sign} is rising',
  'scr.transits.movingHouse': '{planet} is moving through your {ord} house — {arena}.',
  'scr.transits.sunMoon': 'Sun {sunrise}–{sunset} · Moon {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'birth place',
  'scr.transits.allInOrb': 'Every transit in orb',
  'scr.transits.moonAspects': "The Moon's aspects today",
  'scr.transits.natalPrefix': 'natal ',
  'scr.transits.nothingOrb': 'Nothing within orb today.',
  'scr.transits.applying': 'applying',
  'scr.transits.separating': 'separating',
  'scr.transits.orbNote':
    '↑ still tightening toward exact · ↓ separating. Tighter orbs are felt more strongly.',

  /* ---- journal ---- */
  'scr.journal.dayStreak': 'day streak',
  'scr.journal.practices': 'practices',
  'scr.journal.minutes': 'minutes',
  'scr.journal.last4w': 'Last 4 weeks',
  'scr.journal.lastNDays': 'Last {n} days',
  'scr.journal.reasonHistory': 'Unlimited journal history',
  'scr.journal.fullHistory': 'full history →',
  'scr.journal.gridNote': 'Fill = minutes practised · ring = mood logged',
  'scr.journal.recent': 'Recent practice',
  'scr.journal.noSessions': 'No sessions yet — start one from the dashboard.',
  'scr.journal.endedEarly': ' · ended early',
  'scr.journal.min': '{n} min',

  /* ---- ritual (practice runner) ---- */
  'scr.ritual.attuning': 'Attuning to the sky…',
  'scr.ritual.back': 'Back',
  'scr.ritual.todaysPractice': "Today's Practice",
  'scr.ritual.fromLibrary': 'From the library',
  'scr.ritual.focusAlignment': '{chakra} alignment',
  'scr.ritual.chakraBlurb': 'A guided sit shaped by {planet} and your chart.',
  'scr.ritual.freqBlurb':
    '{intention}. Sit, soften, and let the tone carry the session.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Tone',
  'scr.ritual.journeyNote':
    '{n} rounds, self-paced — about 12 minutes. The screen guides every phase.',
  'scr.ritual.length': 'Length',
  'scr.ritual.sound': 'Sound',
  'scr.ritual.sound.tone': 'Tone',
  'scr.ritual.sound.music': 'Music',
  'scr.ritual.sound.silent': 'Silent',
  'scr.ritual.soundTone': 'The {hz} Hz frequency tone plays underneath.',
  'scr.ritual.soundMusic': 'A soft, slow-moving ambient chord.',
  'scr.ritual.soundSilent': 'No sound — spoken or on-screen guidance only.',
  'scr.ritual.spokenGuidance': 'Spoken guidance',
  'scr.ritual.notAvailable': 'not available here — words show on screen',
  'scr.ritual.beginPractice': 'Begin practice',
  'scr.ritual.notNow': 'Not now',
  'scr.ritual.endSession': '‹ End session',
  'scr.ritual.complete': 'Practice complete',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': '{n}-day streak',
  'scr.ritual.firstLogged': 'First practice logged',
  'scr.ritual.howNow': 'How do you feel now?',
  'scr.ritual.done': 'Done',

  /* ---- mood check-in ---- */
  'scr.moodci.default': 'How are you feeling?',
  'scr.moodci.logged': 'Logged ✦',
  'scr.moodci.logThis': 'Log this',
  'scr.moodci.eyebrow': 'Evening check-in',
  'scr.moodci.blurb': "One tap. It shapes tomorrow's aura and your mood trend.",
  'scr.moodci.noteLabel': 'Note (optional)',
  'scr.moodci.notePlaceholder': 'Anything on your mind…',
  'scr.moodci.update': 'Update check-in',
  'scr.moodci.save': 'Save check-in',

  /* ---- natal chart ---- */
  'scr.natal.eyebrow': 'Natal Chart',
  'scr.natal.title': 'Your birth sky',
  'scr.natal.blurb':
    'Add your birth date, time and place and Resonance will draw your natal chart — the exact position of the Sun, Moon and planets at the moment you were born.',
  'scr.natal.addDetails': 'Add birth details',
  'scr.natal.edit': 'edit',
  'scr.natal.timeUnknown': 'time unknown (noon)',
  'scr.natal.angleLine':
    '{asc} rising · MC {mc} · {system}',
  'scr.natal.placidus': 'Placidus houses',
  'scr.natal.wholeSign': 'whole-sign houses',
  'scr.natal.addPlace': 'Add your birth place for the Ascendant & houses →',
  'scr.natal.wheelAria': 'Natal chart wheel',
  'scr.natal.placements': 'Placements',
  'scr.natal.aspects': 'Natal aspects',
  'scr.natal.noAspects': 'No major aspects within orb.',
  'scr.natal.house': 'H{n}',

  /* ---- apothecary ---- */
  'scr.apoth.eyebrow': 'Apothecary',
  'scr.apoth.title': 'Crystal Companions',
  'scr.apoth.subChart': 'Stones for {chakra} work today · {n} in the cabinet',
  'scr.apoth.subPlain': '{n} stones in the cabinet',
  'scr.apoth.all': 'All',
  'scr.apoth.today': 'Today',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'No stones filed under {filter}.',
  'scr.apoth.noneThat': 'that',
  'scr.apoth.pair': "pair a stone with today's practice →",

  /* ---- moon screen ---- */
  'scr.moon.eyebrow': 'The Sky',
  'scr.moon.title': 'The Moon',
  'scr.moon.sub': '{phase} · {pct}% lit',
  'scr.moon.whereShe': 'Where she is',
  'scr.moon.inSign': 'The Moon is in {sign} — {note}.',
  'scr.moon.vocUntil':
    'Void of course until it enters {sign}{time} — a poor window to start something new. Ground and tie off loose ends instead.',
  'scr.moon.vocAt': ' at {time}',
  'scr.moon.vocSoon': 'Goes void of course in {hours} h.',
  'scr.moon.notVoc': 'Not void of course — the Moon is making clean aspects.',
  'scr.moon.comingUp': 'Coming up',

  /* ---- local notifications ---- */
  'notif.daily.title': 'Your reading is ready',
  'notif.daily.body': "Today's transit, chakra focus and practice are waiting.",
  'notif.evening.title': 'Wind down',
  'notif.evening.body': 'A few breaths and a mood check-in before sleep.',
  'notif.newMoon.title': 'New Moon tonight',
  'notif.newMoon.body': 'A quiet reset — set an intention and keep it to yourself.',
  'notif.fullMoon.title': 'Full Moon tonight',
  'notif.fullMoon.body': 'Feelings run bright. Notice what comes to the surface.',
  'notif.moonSign.title': 'Moon enters {sign}',
  'notif.moonSign.body':
    'The emotional weather shifts — a good moment to ground your energy.',
  'notif.voc.title': 'Moon going void of course',
  'notif.voc.body':
    "The void begins in 15 minutes. Ground your energy — rest, don't begin.",

  /* ---- void-of-course Moon banner ---- */
  'scr.voc.active': "Moon void of course — ground, don't begin. Ends {time}.",
  'scr.voc.activeSoon': "Moon void of course — ground, don't begin. Ends soon.",
  'scr.voc.upcoming': 'Moon goes void of course in {hours} h.',
  'scr.voc.twoMin': '2-min',

  /* ---- sky hub: chakra-field summary ---- */
  'scr.field.summary.join': ' & ',
  'scr.field.summary.pressure': '{names} under pressure',
  'scr.field.summary.open': '{names} wide open',
  'scr.field.summary.carries': '{name} carries the day',
  'scr.field.summary.settled': 'A settled field',

  /* ---- fasting card + guide ---- */
  'scr.fast.eyebrow': 'Fasting',
  'scr.fast.phase.waxing': 'waxing moon',
  'scr.fast.phase.waning': 'waning moon',
  'scr.fast.cardMeta': '{special} · lunar day {day} · Moon in {sign}',
  'scr.fast.bestToday': 'Best kind today:',
  'scr.fast.betterDays': 'Better days ahead',
  'scr.fast.waningWindow': 'Waning window',
  'scr.fast.cardDisclaimer':
    'Traditional lunar guidance, not medical advice. If you have a health condition or a history with food, skip fasting and just eat lighter.',
  'scr.fast.fiveKinds': 'The five kinds & the days ahead →',
  'scr.fast.less': 'Less',
  'scr.fast.howHold': 'How to hold it',
  'scr.fast.guideSubSpecial': '{special} · Moon in {sign}',
  'scr.fast.guideSubPhase': '{phase} · lunar day {day}',
  'scr.fast.today': 'Today',
  'scr.fast.skyBacks': 'Sky backs → {method}',
  'scr.fast.whichKind': 'Which kind',
  'scr.fast.whichKindBlurb':
    'Five ways to hold a fast, gentlest first — each rated for the Moon today. Tap one to open it.',
  'scr.fast.holdingWell': 'Holding it well',
  'scr.fast.hold1':
    'Drink through it — water, herbal tea, black coffee. A pinch of salt helps on the longer ones.',
  'scr.fast.hold2':
    'Break gently: warm water first, then something small and cooked. Skip the big meal straight away.',
  'scr.fast.hold3':
    'Move slowly, sleep more, and stop the moment your body says stop.',
  'scr.fast.guideDisclaimer':
    'Traditional lunar guidance, not medical advice. Dry fasting — going without water — carries real risk and is never something the sky “recommends”; this guide assumes you drink. If you are pregnant, on medication, diabetic, underweight, or have a history with food, skip fasting and just eat lighter.',
} as const

export type ScreenKey = keyof typeof screens
