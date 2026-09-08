import type { RunesKey } from '../en/runes'

/**
 * Español — el Futhark Antiguo: significados, lectura derecha e invertida
 * (merkstave) y una directriz diaria para cada una de las 24 runas, más los
 * textos de la pantalla de Runas. Los nombres de las runas son nórdicos
 * antiguos y se mantienen iguales en todos los idiomas.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ textos */
  'rune.eyebrow': 'Las Runas',
  'rune.dailyTitle': 'Tu runa de hoy',
  'rune.dailyBlurbChart':
    'Una runa, echada para tu carta y esta fecha. Se renueva a medianoche.',
  'rune.dailyBlurbPlain': 'Una runa para el día. Se renueva a medianoche.',
  'rune.tapReveal': 'Toca la piedra para girarla.',
  'rune.turnStone': 'Girar la piedra',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'Cayó invertida — léela para el lado en sombra, el bloqueo o la lección aún no aprendida.',
  'rune.sound': 'Sonido',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'La Ætt de Freyr',
  'rune.aett.2': 'La Ætt de Heimdall',
  'rune.aett.3': 'La Ætt de Týr',

  'rune.element.fire': 'Fuego',
  'rune.element.ice': 'Hielo',
  'rune.element.earth': 'Tierra',
  'rune.element.air': 'Aire',
  'rune.element.water': 'Agua',
  'rune.element.spirit': 'Espíritu',

  'rune.resonance.match':
    'Las runas y el cielo coinciden hoy — ambos apuntan a tu {chakra}.',
  'rune.resonance.bridge':
    'El cielo de hoy trabaja tu {sky}; la runa responde desde tu {rune}.',

  'rune.cast': 'Echar las runas',
  'rune.castSub': 'Las Tres Nornas, o la cruz de cinco runas',
  'rune.chooseTitle': 'Elige una tirada',
  'rune.chooseBlurb': 'Sostén tu pregunta y luego elige cómo deben caer las runas.',
  'rune.runeCount.one': '1 runa',
  'rune.runeCount.many': '{n} runas',
  'rune.castEyebrow': 'Las Runas · {layout}',
  'rune.drawAgain': 'Echar de nuevo',
  'rune.doCast': 'Echar',

  'rune.layout.norns': 'Las Tres Nornas',
  'rune.layout.nornsSub': 'Lo que ha llegado a ser, lo que está siendo, lo que se debe',
  'rune.layout.cross': 'La Cruz de Cinco Runas',
  'rune.layout.crossSub': 'Una mirada más completa a una situación',

  'rune.pos.now': 'Ahora',
  'rune.pos.now.prompt': 'dónde estás',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'aquello que ha llegado a ser — la raíz de esto',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'aquello que está siendo — el giro presente',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'aquello que será — lo que se debe, y adónde lleva',
  'rune.pos.heart': 'El corazón',
  'rune.pos.heart.prompt': 'el núcleo del asunto',
  'rune.pos.crossing': 'Lo que lo cruza',
  'rune.pos.crossing.prompt': 'el obstáculo o la ayuda',
  'rune.pos.root': 'La raíz',
  'rune.pos.root.prompt': 'de qué crece',
  'rune.pos.counsel': 'El consejo',
  'rune.pos.counsel.prompt': 'lo que aconsejan las runas',
  'rune.pos.outcome': 'Adónde lleva',
  'rune.pos.outcome.prompt': 'hacia dónde tiende',

  'rune.ask': 'Preguntar a las runas',
  'rune.askSub': 'Una runa, una respuesta a tu pregunta',
  'rune.askEyebrow': 'Las Runas · La Pregunta',
  'rune.askBlurb':
    'Plantea tu pregunta con claridad y sostenla mientras se saca la runa.',
  'rune.askPlaceholder': '¿Debería…  ·  ¿Es momento de…  ·  ¿Qué necesito saber sobre…',
  'rune.consult': 'Sacar una runa',
  'rune.askAgain': 'Preguntar de nuevo',
  'rune.youAsked': 'Preguntaste',
  'rune.answerReading': 'Lo que dice la runa',
  'rune.castReading': 'La lectura',

  'rune.verdict.yes': 'Sí',
  'rune.verdict.no': 'No',
  'rune.verdict.wait': 'Aún no',
  'rune.verdict.hidden': 'Oculto',
  'rune.verdict.yes.gloss': 'La runa se inclina hacia el sí. Muévete, y con intención.',
  'rune.verdict.no.gloss': 'La runa se aparta. Forzar esto ahora cuesta más de lo que devuelve.',
  'rune.verdict.wait.gloss':
    'La runa dice que el momento no está maduro. Prepárate y deja que el instante venga a ti.',
  'rune.verdict.hidden.gloss':
    'La runa se guarda su consejo. Este no es tuyo para saberlo aún — la respuesta todavía se está formando.',

  'rune.library': 'El Futhark Antiguo',
  'rune.librarySub': 'Las veinticuatro, para sentarte con ellas',

  'dash.dailyRune': 'Runa del día',
  'dash.runeSeen': 'La runa de hoy está girada',
  'dash.runeNew': 'Echa tu runa de hoy',

  /* ---------------------------------------------- La Ætt de Freyr (1–8) */
  'rune.fehu.meaning': 'Ganado — riqueza móvil, y lo que puede comprar o costar',
  'rune.fehu.keywords': 'Riqueza · Comienzos · Flujo',
  'rune.fehu.up':
    'Fehu es el rebaño: riqueza que se mueve, se multiplica y se escapa si se atesora. Marca la llegada de recursos nuevos — dinero, energía, oportunidad, posición — y el arranque de algo que puede crecer. La trampa está en su naturaleza: esto solo sigue vivo si mantiene la circulación. Gasta algo, comparte algo, ponlo a trabajar. Lo que aprietas, lo pierdes.',
  'rune.fehu.merk':
    'Invertida, Fehu es pérdida, o riqueza que te posee a ti en vez de al revés. Algo se está escurriendo, o guardas un recurso tan apretado que ha dejado de servirte de nada. Mira adónde va de verdad tu energía y tu dinero, y sé honesto sobre qué vale la pena conservar.',
  'rune.fehu.today':
    'Pon algo en circulación hoy — dinero, esfuerzo o una palabra amable que hayas estado guardando.',

  'rune.uruz.meaning': 'El uro — fuerza vital salvaje, sin domar',
  'rune.uruz.keywords': 'Vitalidad · Resistencia · Forma en bruto',
  'rune.uruz.up':
    'Uruz es el buey salvaje: poder que no ha sido doblegado al arado. Trae un subidón de vitalidad física, resistencia tozuda y la fuerza de moldear la circunstancia en bruto en algo propio. Es una buena runa para comienzos que necesitan músculo — empezar el entrenamiento, romper el terreno, sostener un límite. La fuerza es real; el trabajo es aprender a dirigirla.',
  'rune.uruz.merk':
    'Invertida, Uruz es fuerza mal usada o ausente — potencia vuelta contra ti mismo, o una debilidad donde necesitas mantenerte firme. Puede que estés empujando cuando deberías parar, o dejando algo salvaje de tu vida sin gestionar. Reclama el poder sin dejar que te maneje.',
  'rune.uruz.today':
    'Usa tu cuerpo hoy — camina lejos, levanta algo pesado o atraviesa una cosa que vienes posponiendo.',

  'rune.thurisaz.meaning': 'La espina — una fuerza afilada, reactiva y defensiva',
  'rune.thurisaz.keywords': 'Defensa · Reacción · Una puerta dura',
  'rune.thurisaz.up':
    'Thurisaz es la espina del seto y el martillo del gigante: una fuerza que protege hiriendo y despeja rompiendo. A menudo marca una confrontación, un límite duro o una situación que no cede al encanto. Encarada de frente, hiere; encarada con paciencia, se vuelve una puerta. No busques esta pelea, pero tampoco finjas que la espina no está ahí.',
  'rune.thurisaz.merk':
    'Invertida, Thurisaz es una defensa que se ha vuelto un muro, o un temperamento reactivo que hace daño. Puede que estés arremetiendo, o tan blindado contra el ataque que nada bueno te llega tampoco. Deja el martillo antes de blandirlo contra alguien que no se lo ha ganado.',
  'rune.thurisaz.today':
    'Sostén un límite hoy sin disculparte por él — y resiste las ganas de explicarlo tres veces.',

  'rune.ansuz.meaning': 'El dios — el aliento, la palabra, el mensaje de Odín',
  'rune.ansuz.keywords': 'Voz · Mensaje · Discernimiento',
  'rune.ansuz.up':
    'Ansuz es el aliento del Padre de Todos: habla, señal y la claridad repentina que llega desde fuera de tu propio esfuerzo. Viene un mensaje, o una conversación importa más de lo que parece. También rige tu propia voz — este es el día de decir lo verdadero con claridad, de enseñar, de nombrar lo que ves. Escucha de cerca; la respuesta puede estar en boca de otro.',
  'rune.ansuz.merk':
    'Invertida, Ansuz es mala comunicación, un mensaje malentendido, o sabiduría que te niegas a oír por quién la trae. Se están usando palabras para confundir en vez de aclarar — tuyas o de otro. Baja el ritmo de la conversación y comprueba qué se quiso decir en realidad.',
  'rune.ansuz.today':
    'Di la cosa clara en voz alta hoy, y escucha el doble de lo que hablas.',

  'rune.raidho.meaning': 'La cabalgada — el viaje, la rueda, el ritmo justo',
  'rune.raidho.keywords': 'Viaje · Ritmo · Orden justo',
  'rune.raidho.up':
    'Raidho es el carro en el camino: movimiento con una dirección, y la sensación de ser llevado por una senda que tiene su propio ritmo. Favorece el viaje, las decisiones que te ponen en marcha y volver a poner las cosas en su orden debido. La lección es que el viaje tiene un ritmo propio — no puedes meter prisa al camino, pero puedes dejar de pelearte con él.',
  'rune.raidho.merk':
    'Invertida, Raidho es un viaje estancado, un plan fuera de secuencia, o movimiento en la dirección equivocada. Algo va a destiempo — un trayecto que no deberías hacer, o una prisa que te costará. Pon en orden las cosas antes de partir de nuevo.',
  'rune.raidho.today':
    'Haz el siguiente paso justo en orden hoy; resiste las ganas de saltar a la parte interesante.',

  'rune.kenaz.meaning': 'La antorcha — fuego controlado, oficio y conocimiento',
  'rune.kenaz.keywords': 'Discernimiento · Oficio · Fuego creativo',
  'rune.kenaz.up':
    'Kenaz es la llama en la sala: no el incendio sino el fuego trabajado — la fragua, la lámpara, la chispa del entender. Trae claridad a un rincón oscuro, destreza a una tarea y el calor creativo para hacer y no solo imaginar. Algo sobre lo que has estado a oscuras se vuelve visible. Toma lo que ahora ves y dale forma en algo real.',
  'rune.kenaz.merk':
    'Invertida, Kenaz es una luz que se apaga — inspiración perdida, un proyecto enfriándose, o conocimiento usado para quemar en vez de construir. Puede que estés bloqueado creativamente, o aferrado a una forma de hacer las cosas que ya no arroja luz. Deja que lo muerto se apague para que una llama nueva prenda.',
  'rune.kenaz.today':
    'Haz algo hoy, por pequeño y tosco que sea — la cuestión es llevar una idea a la forma.',

  'rune.gebo.meaning': 'El don — el intercambio, y el vínculo que crea',
  'rune.gebo.keywords': 'Don · Intercambio · Sociedad',
  'rune.gebo.up':
    'Gebo es el don dado y el don debido — el hilo de obligación y generosidad que ata a las personas. Marca un intercambio genuino: una sociedad, un contrato, un acto de dar que volverá. No hay Gebo invertida, porque un don, una vez dado, no puede des-darse. Da con libertad y recibe con gracia, y observa cómo la balanza se equilibra con el tiempo.',
  'rune.gebo.today':
    'Da algo hoy sin un libro de cuentas en mente — y permítete aceptar lo que se te ofrezca a cambio.',

  'rune.wunjo.meaning': 'Alegría — armonía, pertenencia y cosas que encajan en su sitio',
  'rune.wunjo.keywords': 'Alegría · Armonía · Pertenencia',
  'rune.wunjo.up':
    'Wunjo es la alegría de la sala bien llevada: no éxtasis sino contento, la sensación de que las cosas encajan y de estar entre los tuyos. Marca una resolución, una recompensa ganada, o un momento en que las piezas se alinean. Permítete notarlo. Esta runa te pide aceptar el bien que de verdad está aquí en vez de aguantar por una versión mejor.',
  'rune.wunjo.merk':
    'Invertida, Wunjo es alegría demorada o una armonía falsa sostenida por no decir lo difícil. Algo está desafinado bajo la superficie. No lo tapes — la soltura real llega después de la conversación honesta, no en su lugar.',
  'rune.wunjo.today':
    'Nombra una cosa que va de verdad bien, y deja que eso baste por hoy.',

  /* -------------------------------------------- La Ætt de Heimdall (9–16) */
  'rune.hagalaz.meaning': 'Granizo — perturbación repentina fuera de tu control',
  'rune.hagalaz.keywords': 'Perturbación · Crisis · Despeje',
  'rune.hagalaz.up':
    'Hagalaz es la granizada: destrucción que cae del cielo, arruina la cosecha y luego se derrite en el agua que alimenta la siguiente. Marca una interrupción que no elegiste y con la que no puedes discutir — un suceso que rompe el patrón. Aquí no hay nada que pelear. Ponte a resguardo, deja que pase y mira qué sigue en pie después. El granizo despeja el terreno.',
  'rune.hagalaz.today':
    'No empieces nada frágil hoy. Atranca las escotillas, aguanta el temporal y confía en que el terreno se despeja.',

  'rune.nauthiz.meaning': 'Necesidad — fricción, restricción y el fuego que hace',
  'rune.nauthiz.keywords': 'Restricción · Necesidad · Lección dura',
  'rune.nauthiz.up':
    'Nauthiz es el fuego de la necesidad, encendido frotando dos palos bajo presión. Marca una restricción — una escasez, una demora, una situación de la que aún no puedes salir — y el ingenio que esa restricción te obliga a sacar. La lección es paciencia bajo fricción. Encara la carencia con honestidad, haz la pequeña cosa disciplinada que está en tu mano, y deja que la resistencia te enseñe qué necesitas de verdad.',
  'rune.nauthiz.merk':
    'Invertida, Nauthiz es necesidad negada — fingir que la restricción no está ahí, o dejar que la penuria se agríe en resentimiento y decisiones precipitadas. Deja de pelearte con el hecho del límite. La salida es aceptación primero, luego acción paciente y deliberada.',
  'rune.nauthiz.today':
    'Acepta un límite hoy en vez de discutir con él, y haz la única pequeña cosa disciplinada que te deja abierta.',

  'rune.isa.meaning': 'Hielo — quietud, un punto muerto, el instante congelado',
  'rune.isa.keywords': 'Quietud · Punto muerto · Claridad',
  'rune.isa.up':
    'Isa es el río congelado del todo: todo movimiento detenido, todo sujeto en su sitio. Marca un punto muerto — un plan en pausa, una relación en estasis, un periodo en que nada de lo que empujas parece moverse. Esto no es un fracaso; es invierno. Deja de forzar el deshielo. Usa la quietud para ver con claridad qué hay bajo el hielo, y conserva tu fuerza para la primavera.',
  'rune.isa.today':
    'Deja de empujar la cosa atascada hoy. Siéntate con ella, mírala con claridad y deja que la quietud haga su trabajo.',

  'rune.jera.meaning': 'El año — cosecha, ciclos y esfuerzo que da fruto',
  'rune.jera.keywords': 'Cosecha · Ciclos · Timing justo',
  'rune.jera.up':
    'Jera es el año que gira: semilla, crecimiento, cosecha, descanso y semilla de nuevo. Marca el punto en que el esfuerzo anterior por fin rinde — no por un golpe de suerte sino porque ha pasado tiempo suficiente y se ha hecho trabajo suficiente. También aconseja paciencia con lo que aún no está maduro. No puedes meter prisa a una estación. Cuida lo que plantaste y recoge lo que está listo.',
  'rune.jera.today':
    'Cobra algo que plantaste hace tiempo — termínalo, ingrésalo, o simplemente nota que funcionó.',

  'rune.eihwaz.meaning': 'El tejo — el eje entre la vida y la muerte, resistencia',
  'rune.eihwaz.keywords': 'Resistencia · Transformación · El eje',
  'rune.eihwaz.up':
    'Eihwaz es el tejo, perenne y venenoso, con las raíces en el inframundo y la copa en la luz — el poste que atraviesa los mundos. Marca resistencia a través de un paso duro, y un cambio que llega hasta abajo del todo. Algo tiene que terminar para que lo siguiente viva. Mantente como el tejo: enraizado, inmóvil, conectado tanto con lo que muere como con lo que nace.',
  'rune.eihwaz.today':
    'Encara hoy el final que vienes evitando — no para forzarlo, solo para dejar de fingir que no está pasando.',

  'rune.perthro.meaning': 'El cubilete — misterio, azar y lo que el destino guarda oculto',
  'rune.perthro.keywords': 'Misterio · Azar · Lo invisible',
  'rune.perthro.up':
    'Perthro es el cubilete del que se agitan las suertes — el momento antes de que los dados caigan, cuando el resultado existe pero no puede verse. Rige los secretos, las influencias ocultas, la suerte y las partes del patrón que sencillamente no son tuyas para conocer aún. Algo se está decidiendo fuera de la vista. Juega bien tu parte y deja que la tirada caiga; no todo está pensado para descifrarse por adelantado.',
  'rune.perthro.merk':
    'Invertida, Perthro es un secreto que necesita seguir enterrado siendo desenterrado, o una fijación malsana por conocer el resultado. Deja de forzar la revelación. Algunas cosas se pudren a la luz antes de tiempo.',
  'rune.perthro.today':
    'Deja que una cosa siga siendo desconocida hoy. Haz tu parte y deja de refrescar la página.',

  'rune.algiz.meaning': 'El alce — protección, y el alcance hacia lo más alto',
  'rune.algiz.keywords': 'Protección · Conexión · Ayuda de arriba',
  'rune.algiz.up':
    'Algiz es el alce con la cornamenta en alto, y la juncia que corta la mano que la agarra — una runa de protección y del vínculo entre tú y algo más grande. Marca un escudo a tu alrededor ahora mismo, y apoyo disponible por encima de tu propio nivel si lo alcanzas. Pide ayuda. Ponte erguido. Lo que vela por ti está de tu lado.',
  'rune.algiz.merk':
    'Invertida, Algiz es protección bajada o ayuda rechazada — dejarte al descubierto donde deberías estar guardado, o cortarte del apoyo que está ahí. Revisa tus defensas y deja entrar a alguien.',
  'rune.algiz.today':
    'Pide ayuda con una cosa hoy, a una persona o a un poder por encima de tu rango.',

  'rune.sowilo.meaning': 'El sol — plenitud, éxito y la voluntad que guía',
  'rune.sowilo.keywords': 'Éxito · Plenitud · Voluntad clara',
  'rune.sowilo.up':
    'Sowilo es la rueda solar: la luz que siempre vuelve, la victoria que viene de una voluntad apuntada con firmeza a una sola cosa. Marca éxito, salud y una fuerza clarificadora que quema la niebla. No hay Sowilo invertida — el sol no va hacia atrás. Apunta tu energía a lo que importa, mantenla ahí y espera que el resultado vaya a tu favor.',
  'rune.sowilo.today':
    'Apunta todo a una meta hoy. Sin cubrirte las espaldas, sin segundo objetivo — solo esa, hasta que oscurezca.',

  /* --------------------------------------------------- La Ætt de Týr (17–24) */
  'rune.tiwaz.meaning': 'Týr — justicia, coraje y el sacrificio voluntario',
  'rune.tiwaz.keywords': 'Justicia · Coraje · Sacrificio',
  'rune.tiwaz.up':
    'Tiwaz es la lanza y la mano que Týr entregó al lobo para mantener su palabra — una runa de justicia, honor y hacer lo correcto a un coste real. Favorece los asuntos legales, las peleas justas y sostener un compromiso cuando deja de ser conveniente. Apúntate a lo que es verdad y mantén la línea. La victoria aquí es de la clase con la que puedes vivir después.',
  'rune.tiwaz.merk':
    'Invertida, Tiwaz es coraje que falla, un compromiso abandonado, o justicia torcida. Puede que estés evitando una postura que sabes que deberías tomar, o gastando tu energía en una pelea que no es honesta. Vuelve a comprometerte con lo que de verdad es correcto, aunque te cueste la victoria.',
  'rune.tiwaz.today':
    'Cumple hoy una promesa que se ha vuelto incómoda, y toma la postura que vienes esquivando.',

  'rune.berkano.meaning': 'El abedul — crecimiento, cuidado y comienzos nuevos y callados',
  'rune.berkano.keywords': 'Crecimiento · Cuidado · Comienzos nuevos',
  'rune.berkano.up':
    'Berkano es el abedul, el primer árbol que reverdece tras el hielo — una runa de crecimiento suave y al abrigo: embarazo, un proyecto nuevo en su fase tierna, sanación, el cuidado que deja que una cosa pequeña se vuelva fuerte. Te pide criar en vez de empujar. Protege el brote nuevo, aliméntalo, mantén la helada lejos y déjalo crecer al ritmo que el crecimiento de verdad lleva.',
  'rune.berkano.merk':
    'Invertida, Berkano es crecimiento atrofiado o cuidado retirado — una cosa nueva descuidada, un nudo familiar, o el auto-descuido disfrazado de dureza. Algo necesita atención que has estado dejando que se apañe solo. Vuelve y críalo como es debido.',
  'rune.berkano.today':
    'Cuida hoy una cosa que crece — una persona, un plan o a ti mismo — con cuidado de verdad, no solo con intención.',

  'rune.ehwaz.meaning': 'El caballo — sociedad, confianza y movimiento firme',
  'rune.ehwaz.keywords': 'Sociedad · Confianza · Impulso',
  'rune.ehwaz.up':
    'Ehwaz es el caballo y el jinete moviéndose como uno — una runa de sociedad de confianza, trabajo en equipo y progreso hecho juntos que ninguno haría solo. Marca una relación que funciona, o una colaboración por la que vale la pena comprometerse. El vínculo se construye sobre confianza y sobre que ambas partes tiren en la misma dirección. Donde lo tengas, apóyate en él; donde lo quieras, sé primero la mitad fiable.',
  'rune.ehwaz.merk':
    'Invertida, Ehwaz es una sociedad a destiempo — desconfianza, una parte cargando a la otra, o movimiento estancado porque ya no queréis lo mismo. Nombra dónde se rompió la confianza y decide con honestidad si aún cabalgáis juntos.',
  'rune.ehwaz.today':
    'Haz una cosa con alguien hoy en vez de solo, y sé la mitad en la que se puede confiar.',

  'rune.mannaz.meaning': 'El humano — el yo, y el yo entre los demás',
  'rune.mannaz.keywords': 'Yo · Comunidad · Perspectiva',
  'rune.mannaz.up':
    'Mannaz es la runa de la humanidad — tú como individuo, y tú como un nodo en una red de otros. Te pide verte con claridad: tus dones, tus límites y tu reflejo en la gente que te rodea. A menudo marca un momento de necesitar a otros, o de ser necesitado, o de verte con honestidad a través de los ojos de otro. No estás hecho para hacer esto solo, y tampoco eres el centro de ello.',
  'rune.mannaz.merk':
    'Invertida, Mannaz es aislamiento, o una imagen de ti mismo que se ha alejado de la verdad — inflada o injustamente dura. Puede que estés cortado de tu gente, o que seas tu peor crítico. Consigue una mirada externa de alguien que sea honesto y amable.',
  'rune.mannaz.today':
    'Mírate hoy a través de los ojos de alguien que te conoce bien, y ajusta el retrato donde esté mal.',

  'rune.laguz.meaning': 'Agua — flujo, intuición y el inconsciente profundo',
  'rune.laguz.keywords': 'Flujo · Intuición · Lo profundo',
  'rune.laguz.up':
    'Laguz es el lago y el mar: flujo, sentir, sueño y el agua honda del inconsciente donde se mueven cosas que la mente diurna no puede ver. Favorece fiarse de una corazonada por encima de una hoja de cálculo, ir con la corriente en vez de en contra, y prestar atención a lo que tus sueños y tus ánimos te dicen. La marea sabe adónde va. Por ahora, deja que te lleve.',
  'rune.laguz.merk':
    'Invertida, Laguz es una inundación, o que te arrastren bajo el agua — desbordado por el sentir, evitando algo a la deriva, o una intuición que se ha agriado en miedo o fantasía. Pon los pies en la tierra. No toda corriente vale la pena seguirla, y no toda ola es un aviso.',
  'rune.laguz.today':
    'Fíate hoy de la corazonada por encima del argumento ingenioso, y presta atención a lo que sueñes esta noche.',

  'rune.ingwaz.meaning': 'Ing — gestación, potencial guardado, un ciclo completado',
  'rune.ingwaz.keywords': 'Gestación · Potencial · Culminación',
  'rune.ingwaz.up':
    'Ingwaz es la semilla sellada en la tierra durante el invierno — potencial contenido en un recipiente cerrado, haciendo su trabajo fuera de la vista hasta que está listo para soltarse de golpe. Marca el final de una gestación: un proyecto, una decisión o un proceso interno que ha estado cociéndose en silencio está a punto de estar listo. No abras la caja antes de tiempo. Cuando termine, terminará con limpieza, y sentirás el alivio de ello.',
  'rune.ingwaz.today':
    'Deja hoy que aquello que está casi listo termine a su propio ritmo. Deja de hurgarlo.',

  'rune.dagaz.meaning': 'Día — avance, despertar, el giro de la oscuridad a la luz',
  'rune.dagaz.keywords': 'Avance · Despertar · Punto de inflexión',
  'rune.dagaz.up':
    'Dagaz es el amanecer: la bisagra entre la noche y el día, el momento en que la luz vuelve y todo se ve distinto. Marca un avance — una comprensión, un cambio de parecer, una situación que pasa de atascada a en marcha de golpe. No hay Dagaz invertida; el amanecer no se des-hace. Algo sobre lo que has estado a oscuras está a punto de volverse obvio. Prepárate para actuar sobre ello.',
  'rune.dagaz.today':
    'Actúa hoy sobre la comprensión, mientras aún está brillante. El discernimiento se apaga si lo consultas demasiado con la almohada.',

  'rune.othala.meaning': 'La heredad — herencia, linaje y lo que es de verdad tuyo',
  'rune.othala.keywords': 'Linaje · Hogar · Lo que perdura',
  'rune.othala.up':
    'Othala es la tierra ancestral: lo que heredas, aquello a lo que perteneces y las cosas que no pueden quitarte porque están tejidas en quien eres. Marca cuestiones de hogar, familia, tradición y legado — qué conservar de donde vienes y qué dejar atrás. Reclama lo que de verdad es tuyo. Cuídalo. Y sé honesto sobre qué herencias son dones y cuáles son solo peso viejo.',
  'rune.othala.merk':
    'Invertida, Othala es una mala herencia a la que aferrarse, o un desarraigo que no acaba de asentarse — viejos patrones familiares en piloto automático, o un rechazo a pertenecer a ningún sitio. Ordena los objetos heredados. Conserva lo que sirve al futuro; al resto, dale un entierro respetuoso.',
  'rune.othala.today':
    'Conserva hoy una cosa de donde vienes, y suelta a conciencia una cosa que vienes cargando por costumbre.',
} as const
