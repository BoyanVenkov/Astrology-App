import type { ScreenKey } from '../en/screens'

/** Português — textos das telas secundárias. */
export const screens: Record<ScreenKey, string> = {
  /* ---- céu local / aterramento ---- */
  'geo.ground.scarce':
    'A luz do dia está escassa — saia um momento por volta do meio-dia, coma algo quente, e permita-se dormir cedo.',
  'geo.ground.long':
    'A luz longa estica o dia — procure sombra e água fresca ao meio-dia, e proteja o quarto do sol tardio.',
  'geo.ground.spring':
    'A luz está voltando — leve sua prática para a manhã e deixe a energia crescer.',
  'geo.ground.summer':
    'Pico de luz — mantenha o ritmo suave, hidrate-se, e aterre-se descalço na terra ou na grama.',
  'geo.ground.autumn':
    'A luz está recuando — prefira práticas mais lentas e aquecedoras e um encerramento do dia mais cedo.',
  'geo.ground.winter':
    'A metade escura — descansar é produtivo agora; mantenha as práticas curtas, restauradoras e à luz de vela.',
  'geo.season.spring': 'Primavera',
  'geo.season.summer': 'Verão',
  'geo.season.autumn': 'Outono',
  'geo.season.winter': 'Inverno',

  /* ---- horóscopo rápido ---- */
  'scr.quick.eyebrow': 'Horóscopo de hoje',
  'scr.quick.you': 'Você',
  'scr.quick.moon': 'Lua',
  'scr.quick.readFull': 'Ler na íntegra →',
  'scr.quick.fullPro': 'A leitura completa · Pro →',

  /* ---- horóscopo completo ---- */
  'scr.horo.eyebrow': 'Horóscopo Diário',
  'scr.horo.addBirth': 'Adicionar dados de nascimento →',
  'scr.horo.moonHead': 'A Lua',
  'scr.horo.skyHead': 'O céu acima de você',
  'scr.horo.risingNow': '{sign} está subindo sobre você neste momento.',
  'scr.horo.transitingHouse': '{planet} está transitando a sua {ord} casa.',
  'scr.horo.addPlace': 'Adicione um local de nascimento, ou compartilhe sua localização nos Ajustes →',
  'scr.horo.practiceHead': 'Prática de hoje',
  'scr.horo.geoLine': '{season} · sol {sunrise}–{sunset}{light}{place}',
  'scr.horo.dayLight': ' · {hours} h de luz',
  'scr.horo.birthPlace': ' · uso o seu local de nascimento',

  /* ---- trânsitos ---- */
  'scr.transits.eyebrow': 'O Céu',
  'scr.transits.titleNatal': 'Trânsitos ao seu mapa',
  'scr.transits.titleSky': 'O céu de hoje',
  'scr.transits.addChart': 'Adicionar mapa',
  'scr.transits.nowHead': 'Neste momento, acima de você',
  'scr.transits.rising': '{sign} está subindo',
  'scr.transits.movingHouse': '{planet} está atravessando a sua {ord} casa — {arena}.',
  'scr.transits.sunMoon': 'Sol {sunrise}–{sunset} · Lua {moonrise}–{moonset}',
  'scr.transits.birthPlace': 'local de nascimento',
  'scr.transits.allInOrb': 'Todo trânsito em órbita',
  'scr.transits.moonAspects': 'Os aspectos da Lua hoje',
  'scr.transits.natalPrefix': 'natal ',
  'scr.transits.nothingOrb': 'Nada em órbita hoje.',
  'scr.transits.applying': 'aplicativo',
  'scr.transits.separating': 'separativo',
  'scr.transits.orbNote':
    '↑ ainda apertando rumo ao exato · ↓ se separando. Órbitas mais apertadas se sentem mais forte.',

  /* ---- diário ---- */
  'scr.journal.dayStreak': 'dias seguidos',
  'scr.journal.practices': 'práticas',
  'scr.journal.minutes': 'minutos',
  'scr.journal.last4w': 'Últimas 4 semanas',
  'scr.journal.lastNDays': 'Últimos {n} dias',
  'scr.journal.reasonHistory': 'Histórico de diário ilimitado',
  'scr.journal.fullHistory': 'histórico completo →',
  'scr.journal.gridNote': 'Preenchimento = minutos praticados · anel = humor registrado',
  'scr.journal.recent': 'Prática recente',
  'scr.journal.noSessions': 'Nenhuma sessão ainda — comece uma pelo painel.',
  'scr.journal.endedEarly': ' · encerrada antes',
  'scr.journal.min': '{n} min',

  /* ---- ritual (execução da prática) ---- */
  'scr.ritual.attuning': 'Sintonizando com o céu…',
  'scr.ritual.back': 'Voltar',
  'scr.ritual.todaysPractice': 'Prática de hoje',
  'scr.ritual.fromLibrary': 'Da biblioteca',
  'scr.ritual.focusAlignment': 'Alinhamento de {chakra}',
  'scr.ritual.chakraBlurb': 'Uma sessão guiada modelada por {planet} e pelo seu mapa.',
  'scr.ritual.freqBlurb':
    '{intention}. Sente-se, amoleça, e deixe o tom conduzir a sessão.',
  'scr.ritual.metaLine': '{hz} Hz · {chakra}{stones}',
  'scr.ritual.stonesSuffix': ' · {stones}',
  'scr.ritual.tone': 'Tom',
  'scr.ritual.journeyNote':
    '{n} rodadas, no seu ritmo — cerca de 12 minutos. A tela guia cada fase.',
  'scr.ritual.length': 'Duração',
  'scr.ritual.sound': 'Som',
  'scr.ritual.sound.tone': 'Tom',
  'scr.ritual.sound.music': 'Música',
  'scr.ritual.sound.silent': 'Silêncio',
  'scr.ritual.soundTone': 'O tom de frequência de {hz} Hz toca por baixo.',
  'scr.ritual.soundMusic': 'Um acorde ambiente macio e lento.',
  'scr.ritual.soundSilent': 'Sem som — só orientação falada ou na tela.',
  'scr.ritual.spokenGuidance': 'Orientação falada',
  'scr.ritual.notAvailable': 'indisponível aqui — as palavras aparecem na tela',
  'scr.ritual.beginPractice': 'Começar a prática',
  'scr.ritual.notNow': 'Agora não',
  'scr.ritual.endSession': '‹ Encerrar sessão',
  'scr.ritual.complete': 'Prática concluída',
  'scr.ritual.doneMeta': '{minutes} min · {chakra} · {label}',
  'scr.ritual.streak': 'Sequência de {n} dias',
  'scr.ritual.firstLogged': 'Primeira prática registrada',
  'scr.ritual.howNow': 'Como você se sente agora?',
  'scr.ritual.done': 'Pronto',

  /* ---- registro de humor ---- */
  'scr.moodci.default': 'Como você se sente?',
  'scr.moodci.logged': 'Registrado ✦',
  'scr.moodci.logThis': 'Registrar isto',
  'scr.moodci.eyebrow': 'Registro da noite',
  'scr.moodci.blurb': 'Um toque. Modela a aura de amanhã e a tendência do seu humor.',
  'scr.moodci.noteLabel': 'Nota (opcional)',
  'scr.moodci.notePlaceholder': 'Qualquer coisa na sua cabeça…',
  'scr.moodci.update': 'Atualizar registro',
  'scr.moodci.save': 'Salvar registro',

  /* ---- mapa natal ---- */
  'scr.natal.eyebrow': 'Mapa Natal',
  'scr.natal.title': 'O céu do seu nascimento',
  'scr.natal.blurb':
    'Adicione sua data, hora e local de nascimento e o Resonance desenhará seu mapa natal — a posição exata do Sol, da Lua e dos planetas no momento em que você nasceu.',
  'scr.natal.addDetails': 'Adicionar dados de nascimento',
  'scr.natal.edit': 'editar',
  'scr.natal.timeUnknown': 'hora desconhecida (meio-dia)',
  'scr.natal.angleLine': '{asc} asc · MC {mc} · {system}',
  'scr.natal.placidus': 'casas de Placidus',
  'scr.natal.wholeSign': 'casas de signo inteiro',
  'scr.natal.addPlace': 'Adicione seu local de nascimento para o Ascendente e as casas →',
  'scr.natal.wheelAria': 'Roda do mapa natal',
  'scr.natal.placements': 'Posições',
  'scr.natal.aspects': 'Aspectos natais',
  'scr.natal.noAspects': 'Nenhum aspecto maior em órbita.',
  'scr.natal.house': 'C{n}',

  /* ---- botica ---- */
  'scr.apoth.eyebrow': 'Botica',
  'scr.apoth.title': 'Companheiros de cristal',
  'scr.apoth.subChart': 'Pedras para o trabalho de {chakra} hoje · {n} no armário',
  'scr.apoth.subPlain': '{n} pedras no armário',
  'scr.apoth.all': 'Todas',
  'scr.apoth.today': 'Hoje',
  'scr.apoth.meta': '{chakra} · {keywords}',
  'scr.apoth.none': 'Nenhuma pedra classificada em {filter}.',
  'scr.apoth.noneThat': 'essa categoria',
  'scr.apoth.pair': 'combine uma pedra com a prática de hoje →',

  /* ---- tela da Lua ---- */
  'scr.moon.eyebrow': 'O Céu',
  'scr.moon.title': 'A Lua',
  'scr.moon.sub': '{phase} · {pct}% iluminada',
  'scr.moon.whereShe': 'Onde ela está',
  'scr.moon.inSign': 'A Lua está em {sign} — {note}.',
  'scr.moon.vocUntil':
    'Fora de curso até entrar em {sign}{time} — uma janela ruim para começar algo novo. Aterre-se e amarre as pontas soltas em vez disso.',
  'scr.moon.vocAt': ' às {time}',
  'scr.moon.vocSoon': 'Fica fora de curso em {hours} h.',
  'scr.moon.notVoc': 'Não está fora de curso — a Lua está fazendo aspectos limpos.',
  'scr.moon.comingUp': 'A caminho',

  /* ---- notificações locais ---- */
  'notif.daily.title': 'Sua leitura está pronta',
  'notif.daily.body': 'O trânsito, o foco de chakra e a prática de hoje esperam por você.',
  'notif.evening.title': 'Desacelere',
  'notif.evening.body': 'Algumas respirações e um registro de humor antes de dormir.',
  'notif.newMoon.title': 'Lua Nova esta noite',
  'notif.newMoon.body': 'Um reset quieto — defina uma intenção e guarde-a para si.',
  'notif.fullMoon.title': 'Lua Cheia esta noite',
  'notif.fullMoon.body': 'Os sentimentos brilham forte. Note o que vem à superfície.',
  'notif.moonSign.title': 'A Lua entra em {sign}',
  'notif.moonSign.body':
    'O clima emocional muda — um bom momento para aterrar sua energia.',
  'notif.voc.title': 'A Lua vai ficar fora de curso',
  'notif.voc.body':
    'O fora de curso começa em 15 minutos. Aterre sua energia — descanse, não comece.',

  /* ---- banner Lua fora de curso ---- */
  'scr.voc.active': 'Lua fora de curso — aterre-se, não comece. Termina às {time}.',
  'scr.voc.activeSoon': 'Lua fora de curso — aterre-se, não comece. Termina em breve.',
  'scr.voc.upcoming': 'A Lua fica fora de curso em {hours} h.',
  'scr.voc.twoMin': '2 min',

  /* ---- hub do céu: resumo do campo dos chakras ---- */
  'scr.field.summary.join': ' e ',
  'scr.field.summary.pressure': '{names} sob pressão',
  'scr.field.summary.open': '{names} escancarados',
  'scr.field.summary.carries': '{name} carrega o dia',
  'scr.field.summary.settled': 'Um campo assentado',

  /* ---- ficha e guia do jejum ---- */
  'scr.fast.eyebrow': 'Jejum',
  'scr.fast.phase.waxing': 'lua crescente',
  'scr.fast.phase.waning': 'lua minguante',
  'scr.fast.cardMeta': '{special} · dia lunar {day} · Lua em {sign}',
  'scr.fast.bestToday': 'Melhor tipo hoje:',
  'scr.fast.betterDays': 'Dias melhores à frente',
  'scr.fast.waningWindow': 'Janela minguante',
  'scr.fast.cardDisclaimer':
    'Orientação lunar tradicional, não conselho médico. Se você tem uma condição de saúde ou um histórico com comida, pule o jejum e apenas coma mais leve.',
  'scr.fast.fiveKinds': 'Os cinco tipos e os dias à frente →',
  'scr.fast.less': 'Menos',
  'scr.fast.howHold': 'Como sustentá-lo',
  'scr.fast.guideSubSpecial': '{special} · Lua em {sign}',
  'scr.fast.guideSubPhase': '{phase} · dia lunar {day}',
  'scr.fast.today': 'Hoje',
  'scr.fast.skyBacks': 'O céu apoia → {method}',
  'scr.fast.whichKind': 'Qual tipo',
  'scr.fast.whichKindBlurb':
    'Cinco formas de sustentar um jejum, a mais suave primeiro — cada uma avaliada para a Lua de hoje. Toque numa para abri-la.',
  'scr.fast.holdingWell': 'Sustentando bem',
  'scr.fast.hold1':
    'Beba durante o jejum — água, chá de ervas, café preto. Uma pitada de sal ajuda nos mais longos.',
  'scr.fast.hold2':
    'Quebre com delicadeza: água morna primeiro, depois algo pequeno e cozido. Deixe a refeição grande para depois.',
  'scr.fast.hold3':
    'Mova-se devagar, durma mais, e pare no instante em que seu corpo mandar parar.',
  'scr.fast.guideDisclaimer':
    'Orientação lunar tradicional, não conselho médico. O jejum seco — sem água — traz risco real e nunca é algo que o céu «recomenda»; este guia presume que você bebe. Se você está grávida, em medicação, diabética, abaixo do peso, ou tem um histórico com comida, pule o jejum e apenas coma mais leve.',
}
