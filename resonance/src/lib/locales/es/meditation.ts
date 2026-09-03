import type { MeditationKey } from '../en/meditation'

/** Español — meditaciones guiadas: un resumen que se lee una vez, luego pasos marcados por un cuenco. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'la base de tu columna, donde te encuentras con el suelo',
  'med.seat.sacral': 'tu bajo vientre, a un palmo por debajo del ombligo',
  'med.seat.solar-plexus': 'el lugar blando bajo tus costillas',
  'med.seat.heart': 'el centro de tu pecho',
  'med.seat.throat': 'el hueco de tu garganta',
  'med.seat.third-eye': 'el espacio entre tus cejas',
  'med.seat.crown': 'la coronilla de tu cabeza, y un poco por encima',
  'med.chakraLower': 'el centro de {chakra}',

  'med.house.1': 'cómo te presentas y cómo te encuentras con el mundo',
  'med.house.2': 'lo que valoras y lo que te estabiliza',
  'med.house.3': 'tu mente cotidiana y las palabras que usas',
  'med.house.4': 'el hogar, las raíces y dónde te sientes sostenido',
  'med.house.5': 'el juego, la creatividad y lo que te deleita',
  'med.house.6': 'el trabajo diario de cuidarte a ti mismo',
  'med.house.7': 'las personas más cercanas a ti',
  'med.house.8': 'lo que termina, y lo que compartes en profundidad',
  'med.house.9': 'el sentido y la visión más amplia',
  'med.house.10': 'tu trabajo en el mundo y cómo te ven',
  'med.house.11': 'tu gente, y aquello hacia lo que te tiendes',
  'med.house.12': 'el descanso, la soledad y la quietud bajo todo',

  'med.invite.Sun': 'Deja que aquí se reúna un calor estable — tu propia luz, sin complicaciones.',
  'med.invite.Moon': 'Deja que lo que sientas simplemente esté aquí, sin necesidad de arreglarlo.',
  'med.invite.Mercury': 'Deja que el pensamiento se frene. No tienes que resolver nada ahora.',
  'med.invite.Venus': 'Ablándate hacia ti como lo harías hacia alguien a quien amas.',
  'med.invite.Mars': 'Nota cualquier calor o urgencia, y deja que la exhalación se lleve una parte.',
  'med.invite.Jupiter': 'Deja que este espacio se sienta un poco más amplio que hace un momento.',
  'med.invite.Saturn': 'Encuéntrate con el peso aquí con honestidad. Puedes sostener más de lo que crees.',
  'med.invite.Uranus': 'Deja que algo se afloje — un agarre, una vieja forma que ya no necesitas.',
  'med.invite.Neptune': 'Deja que los bordes se difuminen. Tienes permiso para no saber por un rato.',
  'med.invite.Pluto': 'Deja que lo que ha terminado termine. Respira hacia el espacio que deja.',
  'med.invite.default': 'Deja que esta energía se mueva a través de ti, no dentro de ti.',

  'med.ease.hard': 'Hoy hay fricción en {dominant}. No estás aquí para empujar a través de ella — solo para sentirla con claridad y mantenerte suave a su alrededor.',
  'med.ease.soft': '{dominant} fluye hoy. Nota la facilidad, y permítete recibirla.',
  'med.ease.neutral': '{dominant} está intenso hoy. Deja que te atraviese en vez de alojarse en tu cuerpo.',

  'med.dominant.aspect': '{planet} {verb} tu {other} natal',
  'med.dominant.sign': '{planet} atravesando {sign}',
  'med.dominant.chartWord': 'carta',
  'med.domverb.conjunction': 'encontrándose con',
  'med.domverb.opposition': 'en oposición a',
  'med.domverb.square': 'en cuadratura con',
  'med.domverb.trine': 'en trígono con',
  'med.domverb.sextile': 'en sextil con',

  'med.houseLine.known': 'Esto toca la parte de tu vida que trata de {theme}. Sostenlo con ligereza. Aquí no hay que decidir nada — solo notar.',
  'med.houseLine.unknown': 'Sea lo que sea que esto remueva en tu vida, deja que se asiente durante esta práctica. Seguirá ahí cuando termines, y lo encontrarás con más espacio.',

  'med.mantraLong.root': 'Estoy a salvo. Estoy aquí. Tengo lo que necesito.',
  'med.mantraLong.sacral': 'Dejo que la vida se mueva a través de mí.',
  'med.mantraLong.solar-plexus': 'Confío en mi propio fuego.',
  'med.mantraLong.heart': 'Doy y recibo amor libremente.',
  'med.mantraLong.throat': 'Digo mi verdad con soltura.',
  'med.mantraLong.third-eye': 'Confío en lo que veo por dentro.',
  'med.mantraLong.crown': 'Soy parte de algo vasto, y me sostiene.',

  'med.title.fallback': 'meditación del centro {chakra}',

  /* ---- el resumen, se lee una vez antes de empezar ---- */
  'med.brief.lead': 'Lee esto una vez, luego cierra los ojos. Cada paso se abre con un cuenco — quédate con él hasta el siguiente.',
  'med.brief.close': 'Tres cuencos suaves cierran la práctica. Vuelve a tu propio ritmo.',

  /* ---- pasos genéricos ---- */
  'med.step.settle': 'Ojos cerrados. Deja que el cuerpo se asiente y la respiración se frene por sí sola.',
  'med.step.breath': 'Apoya la atención en la respiración — síguela al entrar, síguela al salir. Cuando la mente divague, ese darte cuenta es la práctica. Vuelve, con suavidad.',
  'med.step.centre': 'Lleva tu atención a {seat}. Respira como si la propia respiración llegara al {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'En silencio, al ritmo de la respiración: {affirmation}',
  'med.step.close': 'Suelta la práctica. Nota cómo te sientes ahora, antes de abrir los ojos.',

  /* ---- conciencia de la respiración ---- */
  'med.step.ba.count': 'Ahora cuenta cada exhalación — del uno al diez, luego empieza de nuevo. Si pierdes la cuenta, simplemente empieza en uno. Nadie lleva un marcador.',

  /* ---- escaneo corporal ---- */
  'med.step.scan.0': 'Recorre la atención lentamente desde las plantas de los pies hacia arriba — tobillos, piernas, caderas, vientre, espalda, pecho, brazos, manos. Descansa unas respiraciones donde encuentres tensión, y deja que se ablande.',
  'med.step.scan.1': 'Ahora los hombros, la garganta, la mandíbula, el espacio alrededor de los ojos, el cuero cabelludo. Luego siente todo el cuerpo a la vez — pesado, cálido, respirando por sí solo.',

  /* ---- bondad amorosa ---- */
  'med.step.metta.0': 'Tráete a la mente, tal como estás hoy. En silencio ofrece: que esté a salvo, que esté bien, que esté en paz. Repítelo despacio y permítete decirlo en serio.',
  'med.step.metta.1': 'Trae a la mente a alguien a quien quieres con facilidad. Imagina su cara y ofrécele lo mismo: que estés a salvo, que estés bien, que estés en paz.',
  'med.step.metta.2': 'Ahora amplíalo — alguien que apenas conoces, alguien que te resulta difícil, luego todos, en todas partes: que todos los seres estén a salvo, que todos los seres estén en paz.',

  /* ---- baño de sonido ---- */
  'med.step.bath.0': 'Deja que el tono pase a primer plano. No escuchas con esfuerzo — dejas que el sonido llegue, como llega la luz.',
  'med.step.bath.1': 'Nota en qué parte del cuerpo parece posarse el sonido — el pecho, el cráneo, las manos. Deja que el espacio entre tú y el sonido se disuelva.',

  /* ---- gratitud ---- */
  'med.step.grat.0': 'Trae a la mente una cosa del último día que fue bien, por pequeña que sea. No solo la nombres — siente dónde se asienta el agradecimiento en el cuerpo.',
  'med.step.grat.1': 'Ahora algo que sueles dar por sentado — un cuerpo que funciona, un techo, alguien que se quedó. Quédate con ello unas respiraciones.',
  'med.step.grat.2': 'Una más — algo sobre ti. Una manera en que estuviste presente, algo que manejaste, un esfuerzo que nadie vio. Sostén las tres juntas.',

  /* ---- lugar seguro ---- */
  'med.step.safe.0': 'Imagina un lugar donde te sientes completamente a salvo — real o imaginado. Míralo despacio: la luz, la hora del día, lo que oyes, lo que sientes contra la piel.',
  'med.step.safe.1': 'Encuentra el sitio aquí donde más querrías descansar, y ve allí. Nada se te exige. Nada te alcanza que tú no permitas.',

  /* ---- montaña ---- */
  'med.step.mtn.0': 'Imagina una montaña — su base ancha, sus laderas firmes, su cima quieta. Deja que tu cuerpo y la montaña sean la misma forma: el asiento como base, la columna como ladera, la cabeza como cumbre.',
  'med.step.mtn.1': 'El clima viene y va alrededor de la montaña — luz, nube, viento, tormenta. Tus pensamientos y estados de ánimo son el clima. La montaña no discute con él, y no queda disminuida por él.',

  /* ---- conciencia abierta ---- */
  'med.step.open.0': 'Suelta el ancla de la respiración. Deja que la atención esté bien abierta, no en nada en particular. Sonidos, sensaciones, pensamientos surgen y pasan — ni los persigues ni los apartas.',
  'med.step.open.1': 'Nota que la conciencia misma no se mueve. Las cosas ocurren dentro de ella, como las nubes ocurren dentro del cielo. Descansa como ese cielo — nada que añadir, nada que quitar.',

  /* ---- intención de la mañana ---- */
  'med.step.morn.0': 'Tres respiraciones más plenas, un poco más profundas de lo normal — deja que despierten el cuerpo desde dentro. Gira los hombros hacia atrás una vez y siente cómo se abre el frente del cuerpo.',
  'med.step.morn.1': 'Trae a la mente el día que viene, sin apretar, luego elige una intención — no una tarea, una manera de ser. Paciente. Honesto. Valiente. Amable. Dilo una vez: hoy seré ___.',

  /* ---- liberación de la noche ---- */
  'med.step.eve.0': 'Deja que el día se repase con ligereza, como el paisaje desde la ventana de un tren — mañana, mediodía, noche. No te detengas en nada. Si un momento tira, anótalo y di: ahora no.',
  'med.step.eve.1': 'Encuentra un momento del que te alegras de que ocurriera, y una cosa que hiciste tan bien como pudiste. Que eso baste. Ahora suelta el día entero — está completo simplemente porque ha terminado.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Túmbate completamente quieto — más quieto de lo que parece natural, solo la respiración se mueve. Fija una intención breve, una única frase serena en presente. Dila por dentro tres veces.',
  'med.step.nidra.1': 'Lleva la atención a cada lugar según se nombra, sin moverte — mano derecha: pulgar, dedos, palma, muñeca, antebrazo, codo, hombro. Luego lo mismo a la izquierda.',
  'med.step.nidra.2': 'Ambas caderas. Pierna derecha — muslo, rodilla, espinilla, tobillo, pie, dedos. Pierna izquierda igual. Toda la espalda contra el suelo, el vientre subiendo y bajando, el pecho, la garganta.',
  'med.step.nidra.3': 'La cara — mandíbula, labios, nariz, mejillas, ojos, el espacio entre las cejas, el cuero cabelludo. Ahora todo el cuerpo a la vez, brillando tenue, sostenido por el suelo. Vuelve a tu intención.',
}
