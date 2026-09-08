import type { DeepReadingKey } from '../en/deepReading'

/**
 * Español — la lectura profunda y extensa: el Horóscopo Completo de pago y la
 * revisión detallada de Compatibilidad. Escrito para leerse como una o dos
 * páginas de un astrólogo de verdad.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- horóscopo diario (gratis): un poco más de fondo en cada nota ---- */
  'horo.deep.q.house': 'Está cayendo en el terreno de {theme}.',
  'horo.deep.q.hard': 'Muévete con cuidado en esto.',
  'horo.deep.q.soft': 'Merece un paso pequeño y deliberado.',
  'horo.deep.q.neutral': 'Deja que se asiente antes de actuar.',
  'horo.deep.q.thread':
    'El hilo de hoy vuelve una y otra vez a tu {focus} — ahí es donde mantener la atención.',
  'scr.horo.weekHead': 'El arco más amplio',

  /* ============================ HORÓSCOPO COMPLETO ============================ */

  /* -- qué significa cuando cada planeta es la fuerza EN TRÁNSITO (en movimiento) -- */
  'dh.tr.Sun':
    'El Sol mueve el día: allá donde va enfoca un foco durante un mes aproximado, calienta esa parte de la carta y te pide que te presentes ahí siendo tú.',
  'dh.tr.Moon':
    'La Luna es el cuerpo más rápido del cielo; sus tránsitos son breves pero marcan el tono emocional del día y sacan a la superficie lo que tocan.',
  'dh.tr.Mercury':
    'Mercurio gobierna el pensar, el hablar y las pequeñas decisiones que se suman. Sus tránsitos aceleran el tráfico de información en torno a un tema — conversaciones, mensajes, papeleo, segundas lecturas.',
  'dh.tr.Venus':
    'Venus rige la atracción, la comodidad, el dinero y el gusto. Cuando transita un punto endulza el terreno ahí y hace que la conexión, el gasto y el disfrute lleguen con más facilidad.',
  'dh.tr.Mars':
    'Marte es impulso y calor en crudo. Sus tránsitos encienden un fuego bajo lo que tocan — obtienes más coraje y más fricción en el mismo paquete, y las ganas de actuar antes de haberlo pensado del todo.',
  'dh.tr.Jupiter':
    'Júpiter es el planeta del crecimiento y del «más». Expande lo que contacta — oportunidad, confianza, apetito y, a veces, exceso — y tiende a hacer que la puerta de ese terreno de la vida se abra más durante un año aproximado.',
  'dh.tr.Saturn':
    'Saturno es tiempo, estructura y consecuencia. Por donde pasa frena las cosas y pregunta si lo que has construido ahí puede cargar peso; lo que puede, lo refuerza, y lo que no, lo desmonta en silencio para que lo reconstruyas bien.',
  'dh.tr.Uranus':
    'Urano es el disruptor. Sus tránsitos rompen un patrón que se ha vuelto rancio — a menudo mediante una sorpresa, una inquietud repentina o un cambio que no planeaste — y te devuelven algo de libertad que habías firmado ceder.',
  'dh.tr.Neptune':
    'Neptuno disuelve los bordes. Por donde transita, los contornos se ablandan: más imaginación y compasión, pero también más confusión, y un tirón hacia escapar en vez de encarar la cosa directamente.',
  'dh.tr.Pluto':
    'Plutón trabaja bajo tierra y no tiene prisa. Sus tránsitos traen una transformación lenta y a fondo a lo que tocan — luchas de poder, finales y un despojarse hasta lo que de verdad es esencial.',

  /* -- qué gobierna tu punto NATAL en tu propia carta -- */
  'dh.na.Sun':
    'tu identidad esencial, tu vitalidad y el sentido de quién eres cuando eres más tú',
  'dh.na.Moon':
    'tus instintos, tus estados de ánimo y lo que necesitas para sentirte a salvo y sostenido',
  'dh.na.Mercury':
    'cómo piensas, aprendes, hablas y tomas las decisiones cotidianas',
  'dh.na.Venus':
    'cómo amas y eres amado, qué te parece bello y tu relación con el dinero y el placer',
  'dh.na.Mars':
    'tu impulso, tu enfado, tu deseo y cómo vas a por lo que quieres',
  'dh.na.Jupiter':
    'dónde buscas sentido y crecimiento, y tu sentido natural de fe y posibilidad',
  'dh.na.Saturn':
    'tu relación con la disciplina, la autoridad y los límites — el lugar donde has tenido que madurar por las malas',
  'dh.na.Uranus':
    'tu necesidad de ser libre y de hacer las cosas a tu manera',
  'dh.na.Neptune':
    'tu imaginación, tu espiritualidad y los lugares donde tiendes a idealizar o a perderte',
  'dh.na.Pluto':
    'tu relación con el poder y el control, y lo que en ti está hecho para transformarse',

  /* -- la naturaleza de cada aspecto (dos variantes, rotadas por sección) -- */
  'dh.asp.nat.conjunction.0':
    'Una conjunción es una fusión. Las dos fuerzas ocupan el mismo grado y actúan como una, iniciando un ciclo nuevo en este terreno de tu vida — una semilla que se planta, no una cosecha que se recoge.',
  'dh.asp.nat.conjunction.1':
    'Una conjunción funde las dos energías tan por completo que cuesta distinguirlas. Marca un comienzo; lo que tome forma ahora se desplegará en los años que sigan.',
  'dh.asp.nat.opposition.0':
    'Una oposición trabaja a través del espejo de otras personas y de circunstancias externas. La tensión es real, pero está para traerte conciencia — ves el asunto con claridad porque algo se le pone enfrente.',
  'dh.asp.nat.opposition.1':
    'Una oposición te tira entre dos polos y te pide sostener ambos en vez de colapsar en uno. El equilibrio aquí no es un compromiso; es una destreza que construyes bajo presión.',
  'dh.asp.nat.square.0':
    'Una cuadratura es un aspecto de fricción. Las dos energías quieren cosas distintas y no dejan de engancharse la una con la otra, y la incomodidad es el punto — es la aspereza que fuerza un cambio real en vez de uno cosmético.',
  'dh.asp.nat.square.1':
    'Una cuadratura pone un obstáculo en el camino justo donde preferirías no tener que lidiar con uno. Empujar de frente rara vez funciona; la salida suele ser cambiar de enfoque, no esforzarse más.',
  'dh.asp.nat.trine.0':
    'Un trígono es un canal abierto. Las dos energías cooperan sin que se lo pidan, y el apoyo fluye hacia ti aquí — pero solo te llega si de verdad te mueves hacia él.',
  'dh.asp.nat.trine.1':
    'Un trígono hace que este terreno de la vida se sienta fácil y natural durante un tiempo. El riesgo es la complacencia; la soltura que no usas tiende a evaporarse en silencio.',
  'dh.asp.nat.sextile.0':
    'Un sextil es una oportunidad que tienes que aceptar a propósito. La puerta está sin llave pero no abierta — una acción pequeña y deliberada ahora convierte una posibilidad en algo real.',
  'dh.asp.nat.sextile.1':
    'Un sextil ofrece una apertura útil en esta parte de tu vida. Premia la iniciativa y no hace nada en absoluto por la espera.',

  /* -- frase verbal corta para el abridor de la sección -- */
  'dh.asp.verb.conjunction': 'se encuentra y se funde con',
  'dh.asp.verb.opposition': 'tira en contra de',
  'dh.asp.verb.square': 'roza contra',
  'dh.asp.verb.trine': 'fluye hacia',
  'dh.asp.verb.sextile': 'abre una puerta hacia',

  /* -- cómo se expresa la energía en el signo donde está el punto natal -- */
  'dh.sign.Aries':
    'rápida, directa y un poco combativa, más inclinada a actuar que a esperar',
  'dh.sign.Taurus':
    'lenta, sensual y tozuda, resistente a que la metan prisa y lenta para soltar',
  'dh.sign.Gemini':
    'curiosa y verbal, rápida para conectar ideas y rápida para inquietarse',
  'dh.sign.Cancer':
    'tierna y protectora, guiándose por el sentir antes que por la lógica',
  'dh.sign.Leo':
    'cálida, expresiva y orgullosa, con necesidad de ser vista para sentirse real',
  'dh.sign.Virgo':
    'precisa y práctica, más feliz cuando puede ser de verdad útil',
  'dh.sign.Libra':
    'orientada al equilibrio, la justicia y la buena compañía, y reacia a montar una escena',
  'dh.sign.Scorpio':
    'intensa y reservada, todo o nada, y atraída por lo oculto',
  'dh.sign.Sagittarius':
    'inquieta por espacio, sentido y una visión más amplia, e impaciente con la letra pequeña',
  'dh.sign.Capricorn':
    'seria y autodisciplinada, más impresionada por resultados que por promesas',
  'dh.sign.Aquarius':
    'independiente y mirando al futuro, pensando en sistemas más que en sentimientos',
  'dh.sign.Pisces':
    'soñadora, permeable y compasiva, y fácilmente desbordada',

  /* -- qué suele remover un tránsito por cada casa -- */
  'dh.house.1':
    'En la casa uno el trabajo se ve sobre ti — tu cuerpo, tu imagen, la primera impresión que causas. Es un buen tramo para redibujar cómo te presentas en vez de conservar un contorno que ya no encaja.',
  'dh.house.2':
    'En la casa dos toca el dinero, los recursos y la autoestima. La pregunta externa es qué ganas y posees; la interna es qué crees merecer.',
  'dh.house.3':
    'En la casa tres remueve la mente cotidiana — conversaciones, trayectos cortos, hermanos y vecinos, el interminable pequeño intercambio de información. Presta atención a lo que sigues repitiéndote.',
  'dh.house.4':
    'En la casa cuatro alcanza las raíces — hogar, familia, tu pasado y la base privada a la que vuelves. Algo en tus cimientos se está examinando.',
  'dh.house.5':
    'En la casa cinco toca el juego, el romance, la creatividad y las cosas que haces por el gozo de hacerlas. Pregunta adónde se fue tu chispa y cómo recuperarla.',
  'dh.house.6':
    'En la casa seis trabaja a través de la rutina, la salud y la labor diaria de mantenerte a ti y a tu trabajo en marcha. Los pequeños hábitos pesan más de lo habitual ahora.',
  'dh.house.7':
    'En la casa siete el espejo son otras personas — parejas, allegados, la persona al otro lado de la mesa. Lo que encuentras en ellas suele ser algo tuyo que no has mirado directamente.',
  'dh.house.8':
    'En la casa ocho va al agua honda — dinero compartido, intimidad, poder y lo que está terminando. Esto no es terreno de charla ligera; algo se está transformando de raíz.',
  'dh.house.9':
    'En la casa nueve abre la visión más amplia — creencia, estudio, viaje y la búsqueda de sentido. Tu idea de para qué es todo esto se está estirando.',
  'dh.house.10':
    'En la casa diez es público — carrera, reputación, tu posición y el papel que juegas en el mundo. Aquello por lo que se te conoce está en revisión.',
  'dh.house.11':
    'En la casa once toca la amistad, la comunidad y el futuro hacia el que tiendes. La compañía que mantienes y las metas que sostienes se están ordenando.',
  'dh.house.12':
    'En la casa doce trabaja en segundo plano — descanso, soledad, el inconsciente y lo que vienes cargando sin nombrarlo. Este es un trabajo callado y hacia dentro.',

  /* -- «en la vida diaria esto puede verse como…» (rotado por aspecto) -- */
  'dh.life.conjunction.0':
    'En la vida diaria esto puede sentirse como un empezar de cero que no elegiste del todo — nuevas condiciones, un capítulo nuevo abriéndose en este terreno, te sientas listo o no.',
  'dh.life.conjunction.1':
    'Día a día puede llegar como un interés nuevo y fuerte, una persona que cambia el marco, o simplemente la sensación de que la versión vieja de esto se acabó.',
  'dh.life.conjunction.2':
    'En la práctica suele aparecer como un umbral — una decisión, una mudanza, un compromiso que reinicia el reloj en esta parte de tu vida.',
  'dh.life.opposition.0':
    'En la vida diaria esto suele jugarse a través de otra persona — un desacuerdo, una exigencia, o alguien que encarna justo aquello con lo que estás lidiando.',
  'dh.life.opposition.1':
    'Día a día puede sentirse como estar atrapado entre dos necesidades válidas — la tuya y la de otro, o dos partes de tu propia vida que no caben ambas.',
  'dh.life.opposition.2':
    'En la práctica tiende a llevar las cosas a un punto de quiebre: una conversación que ya no puedes posponer, una elección que lleva esperando a que la hagas.',
  'dh.life.square.0':
    'En la vida diaria esto puede verse como un plan que no deja de encallar, una persona que sigue pulsando el mismo botón, o una tarea que se siente mucho más pesada de lo que debería.',
  'dh.life.square.1':
    'Día a día suele llegar como frustración — esfuerzo que no se convierte en nada, un muro donde esperabas una puerta.',
  'dh.life.square.2':
    'En la práctica aparece como una presión que no te deja ir a rueda: aquello que vienes evitando ya está en el camino.',
  'dh.life.trine.0':
    'En la vida diaria esto puede sentirse como una racha de pequeñas luces verdes — ayuda que llega, timing que funciona, un sí donde te preparabas para un no.',
  'dh.life.trine.1':
    'Día a día suele aparecer como soltura y flujo en este terreno, y la tentación de suponer que siempre será así de simple.',
  'dh.life.trine.2':
    'En la práctica es una ventana favorable — las presentaciones cuajan, las peticiones reciben buena acogida, el camino queda despejado un momento.',
  'dh.life.sextile.0':
    'En la vida diaria esto puede verse como una apertura que casi se te escapa — una oferta, un encuentro fortuito, una puertecita que solo sigue abierta si la cruzas ahora.',
  'dh.life.sextile.1':
    'Día a día tiende a premiar a quien da el primer paso: manda el mensaje, haz la pregunta, propón tu nombre.',
  'dh.life.sextile.2':
    'En la práctica es una oportunidad de bajo coste — nada dramático, pero vale la pena actuar mientras está aquí.',

  /* -- la invitación más honda del aspecto (rotada) -- */
  'dh.invite.conjunction.0':
    'La invitación es plantar a propósito. Lo que empieces ahora, por pequeño que sea, es la semilla de algo con lo que seguirás conviviendo dentro de años — así que elígelo adrede.',
  'dh.invite.conjunction.1':
    'El trabajo más hondo es soltar la forma vieja de esto con limpieza, sin arrastrarla medio viva al capítulo nuevo.',
  'dh.invite.conjunction.2':
    'Lo que esto pide de verdad es un sí claro o un no claro. La ambivalencia es la única respuesta que desperdicia la ventana.',
  'dh.invite.opposition.0':
    'La invitación no es ganar. Es sostener ambos lados el tiempo suficiente para encontrar la tercera opción que honra lo que es verdad en cada uno.',
  'dh.invite.opposition.1':
    'El trabajo más hondo es recuperar la parte de esto que has estado subcontratando a otra persona — la fuerza, la necesidad o la culpa.',
  'dh.invite.opposition.2':
    'Lo que esto pide es conciencia honesta. Una vez que ves el patrón de verdad, ya no estás dentro de él.',
  'dh.invite.square.0':
    'La invitación no es empujar más fuerte. Es notar qué has superado aquí y dejar que la fricción lo desmonte, para que se pueda construir algo más firme.',
  'dh.invite.square.1':
    'El trabajo más hondo es un cambio de método. La meta puede estar bien; la forma en que la vienes abordando es lo que genera la resistencia.',
  'dh.invite.square.2':
    'Lo que esto pide de verdad es madurez en un punto concreto — hacer lo poco glamuroso y estructural que esperabas poder saltarte.',
  'dh.invite.trine.0':
    'La invitación es usar la soltura, no solo disfrutarla. El apoyo que no se gasta tiende a desaparecer en silencio.',
  'dh.invite.trine.1':
    'El trabajo más hondo es construir algo durante la calma que aguante cuando el tiempo vuelva a cambiar.',
  'dh.invite.trine.2':
    'Lo que esto pide es que digas sí a la ayuda — acepta la presentación, toma el atajo, deja que sea fácil por una vez.',
  'dh.invite.sextile.0':
    'La invitación es iniciativa. Esto es una puerta sin echar la llave; solo se abre si empujas.',
  'dh.invite.sextile.1':
    'El trabajo más hondo es notar las pequeñas oportunidades de las que sueles disuadirte, y tomar una.',
  'dh.invite.sextile.2':
    'Lo que esto pide es un acto de valentía modesto y concreto — nada dramático, solo un paso que preferirías aplazar.',

  /* -- guía concreta (rotada) -- */
  'dh.do.conjunction.0':
    'Dale un comienzo limpio: nombra lo que empieza, márcalo de algún modo y no atasques las primeras semanas con restos de la versión vieja.',
  'dh.do.conjunction.1':
    'Muévete de forma deliberada más que rápida. Una conjunción pone en marcha un ciclo largo; el tono que fijes ahora tiende a quedarse.',
  'dh.do.conjunction.2':
    'Decide. Di el sí o el no en voz alta ante al menos otra persona para que se vuelva real.',
  'dh.do.opposition.0':
    'Ten la conversación que llevas rodeando, y entra a escuchar. El otro lado lleva información que necesitas.',
  'dh.do.opposition.1':
    'Escribe ambas posturas como si tuvieras que defender cada una con justicia. El punto de equilibrio suele mostrarse en el papel.',
  'dh.do.opposition.2':
    'No fuerces una resolución hoy. Deja que la tensión se quede hasta que la tercera opción salga sola a la superficie.',
  'dh.do.square.0':
    'No te comprometas ni firmes bajo presión. Deja que lo que se resiste te muestre dónde la estructura es fina, y refuérzala primero.',
  'dh.do.square.1':
    'Cambia una cosa de tu enfoque y prueba de nuevo. El mismo esfuerzo, otro ángulo.',
  'dh.do.square.2':
    'Haz la tarea aburrida y estructural que sigues posponiendo. Esa es toda la consigna.',
  'dh.do.trine.0':
    'Da un paso real mientras la puerta está abierta — un mensaje, una reserva, un primer borrador. La soltura se desvanece si solo la admiras.',
  'dh.do.trine.1':
    'Pide la cosa. Esta es la ventana en la que un sí es más probable.',
  'dh.do.trine.2':
    'Construye ahora. Usa la calma para dejar sentada una base que agradecerás después.',
  'dh.do.sextile.0':
    'Da el primer paso hoy, no la semana que viene. Mándalo, pregúntalo, pon tu nombre.',
  'dh.do.sextile.1':
    'Di sí a la oferta pequeña aunque parezca menor. Estas se acumulan.',
  'dh.do.sextile.2':
    'Elige la única oportunidad que normalmente aplazarías, y actúa sobre ella antes de que acabe el día.',

  /* -- lenguaje del timing (rotado por estado) -- */
  'dh.time.peak.0':
    'Está cerca de exacto y aún apretando, así que esto llega a su pico en un día o dos y luego empieza a aflojar.',
  'dh.time.peak.1':
    'El contacto es casi preciso ahora mismo — esto es lo más alto que llega, y la intensidad cae poco después.',
  'dh.time.peak.2':
    'Esto está en su grado exacto o cerca de él, y por eso pide tanta de tu atención de golpe.',
  'dh.time.build.0':
    'Todavía está creciendo. El tema se hace más fuerte en los próximos días antes de girar.',
  'dh.time.build.1':
    'Este aún no ha alcanzado toda su fuerza; espera que siga subiendo un tiempo antes de coronar.',
  'dh.time.build.2':
    'Estás en la ladera temprana de esto. Lo que ahora se lee como una señal débil se vuelve inconfundible en una semana más o menos.',
  'dh.time.fade.0':
    'Acaba de pasar exacto — el filo más agudo ya pasó y la presión se está soltando.',
  'dh.time.fade.1':
    'El pico de este ya quedó atrás. Lo que queda es integración, no crisis.',
  'dh.time.fade.2':
    'Este contacto va de salida. Estás recogiendo tras él, no viviendo lo peor de él.',

  'dh.retro':
    ' Al estar retrógrado, esto es una revisión más que una primera pasada — vuelves sobre terreno que ya has recorrido, esta vez para hacerlo bien.',

  /* -- plantillas de ensamblaje de la sección -- */
  'dh.sec.open':
    '{tr} Ahora mismo {verb} {target} — la parte de ti que gobierna {na}.',
  'dh.sec.sign':
    'Tu {target} natal está en {sign} — {signFlavour} — lo que da forma a cómo aterriza todo esto para ti.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- la visión general: tres párrafos cortos -- */
  'dh.ov.lead':
    'Esta lectura sale de dónde están de verdad los planetas hoy, puesto frente a tu carta natal — así que va de tu cielo, no del cielo en general.',
  'dh.ov.head':
    'El centro de gravedad ahora mismo es {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'El clima general es favorable: los contactos fáciles pesan claramente más que los duros. Es un tramo para ir a por algo en vez de blindarte contra ello — la forma principal de desperdiciarlo es quedarte quieto.',
  'dh.ov.weather.friction':
    'El clima general es exigente. Hay más fricción que flujo en la mezcla, y varias cosas quieren encararse de frente en vez de desearse que desaparezcan. Nada de esto es un desastre; es una fase de construcción, y las fases de construcción se sienten como esfuerzo.',
  'dh.ov.weather.intense':
    'El clima general es pesado y concentrado. Planetas de movimiento lento están sentados justo sobre tu carta, y el volumen está subido en todo lo que tocan. Dosifícate — este es un tramo de maratón, no un esprint.',
  'dh.ov.weather.mixed':
    'El clima general es mixto — apoyo real y fricción real dentro de la misma ventana. El trabajo de este periodo es elegir dónde gastarte y dónde contenerte.',
  'dh.ov.weather.quiet':
    'El clima general está tranquilo. Ningún planeta aprieta fuerte sobre tu carta, lo que hace de este un tramo raro para fijar tu propia agenda y ritmo sin que el cielo te lleve la contraria.',
  'dh.ov.tempo.fast':
    'El tempo es rápido — los contactos están apretados y en movimiento, así que los temas llegan y pasan en cuestión de días. Mantente receptivo en vez de intentar planearlo todo de antemano.',
  'dh.ov.tempo.building':
    'El tempo es de lenta acumulación. Los temas principales aún están juntando fuerza, así que lo que ahora parece un indicio será inconfundible en una semana o dos.',
  'dh.ov.tempo.slow':
    'El tempo es lento y estructural. Los grandes contactos aquí se despliegan a lo largo de meses, no de días; piensa en estaciones y no esperes un veredicto de la noche a la mañana.',
  'dh.ov.tempo.settling':
    'El tempo se está asentando — los contactos más agudos acaban de pasar su pico, así que esto va más de integrar lo que ya ha pasado que de blindarse para lo que viene.',

  /* -- el párrafo de la Luna, ampliado -- */
  'dh.moon.lead': 'Tu clima emocional',
  'dh.moon.body':
    'La Luna está atravesando {sign} — {mood} — y es {phase} al {pct}% de luz. {phaseNote} Deja que tu ánimo sea información más que un veredicto: te está diciendo cómo se siente por dentro este tramo de cielo.',

  /* -- los hilos: qué se repite -- */
  'scr.horo.threadsHead': 'Los hilos que conectan',
  'dh.th.house':
    'Tu casa {ord} no deja de salir. Pase lo que pase, {houseThemeLower} es la habitación en la que te piden pasar tiempo este periodo.',
  'dh.th.planet':
    'Tu {planet} natal está siendo trabajado desde más de un ángulo a la vez. Como sostiene {na}, cuenta con que sea una nota recurrente y no algo puntual.',
  'dh.th.bal.friction':
    'Y la balanza se inclina hacia la fricción. Eso no es mala suerte — es cómo se siente por dentro una fase de crecimiento. El esfuerzo es la consigna.',
  'dh.th.bal.supportive':
    'Y la balanza se inclina hacia el flujo. Los contactos de apoyo superan en número a los duros, así que las puertas están de verdad abiertas — la única forma de desperdiciarlo es no cruzar ninguna.',
  'dh.th.bal.mixed':
    'Y la balanza está de verdad partida. Parte de esto te apoya y parte se te resiste, a menudo el mismo día, así que el discernimiento importa más que la energía ahora mismo.',
  'dh.th.solo':
    'Los contactos están repartidos por tu carta en vez de amontonarse sobre un punto, así que esto se lee como un periodo variado más que como una sola historia dominante.',

  /* -- el mapa del timing -- */
  'scr.horo.timingHead': 'Cómo se despliega esto',
  'dh.tm.tight':
    'Apretando hacia exacto: {list}. Estas son las voces más sonoras en tu cielo ahora mismo y llegarán a su pico en cuestión de días.',
  'dh.tm.fade':
    'Pasado su pico y desvaneciéndose: {list}. La lección de estos ya está en gran parte asimilada — ahora integras, no te blindas.',
  'dh.tm.none':
    'Nada está sentado justo en exacto por el momento, lo que es parte de por qué el periodo se siente más abierto que puntiagudo.',

  /* -- el arco de cierre -- */
  'dh.cl.protect':
    'El arco más amplio te pide proteger tu {focus} a lo largo de este tramo. Menos compromisos, noches más tempranas y permiso para estar menos disponible de lo habitual — recuperarás más protegiendo tu energía que gastándola. Es una estación para cuidar el terreno, no para forzar la cosecha.',
  'dh.cl.use':
    'El arco más amplio es una ventana abierta en torno a tu {focus}, y ventanas así no se quedan abiertas mucho tiempo. Apúntalo a una cosa que de verdad te importe y pon peso real detrás ahora, mientras el cielo ayuda en vez de resistirse.',
  'dh.cl.steady':
    'El arco más amplio pide firmeza. Mantén tus rutinas, mantén la palabra que te has dado y deja que el ruido pase sin perseguir cada pedazo. No todo tránsito necesita respuesta; a algunos solo hay que sobrevivirlos.',

  /* ======================= COMPATIBILIDAD — PROFUNDA ======================= */

  'syn.deep.patternLead': 'De qué vive este vínculo',
  'syn.deep.pattern.emotional':
    'En su núcleo esto es una conexión emocional. Las Lunas y Venus cargan con la mayor parte del peso entre vosotros, lo que hace que el vínculo sea cálido, instintivo y rápido para sintonizarse — y significa que son los ánimos, no las discusiones, los que marcan la temperatura. Cuando ambos estáis firmes es suave y fácil y el hogar se siente como hogar rápido. Cuando uno de los dos no está bien, el otro lo sabe en minutos, se diga o no una palabra. La consecuencia práctica es que cuidar de tu propio estado interno no está separado de cuidar la relación; es el mismo trabajo. Aprende a nombrar un sentimiento pronto, antes de que se vuelva clima, y esta conexión aguantará casi cualquier cosa.',
  'syn.deep.pattern.mental':
    'En su núcleo esto es un encuentro de mentes. Conectáis primero a través de palabras, ideas, curiosidad y el placer de que te entiendan rápido, y la chispa sigue encendida exactamente mientras dure la conversación. Eso es una fortaleza real — nunca os aburriréis y resolvéis bien los problemas en pareja. El riesgo es más sutil: es posible confundir una buena conversación con la intimidad y vivir un poco por encima del cuello, intercambiando pensamientos mientras la capa del sentir queda sin atender. Haced sitio para las partes de la cercanía que no son verbales — un silencio compartido, una comida, una tarea hecha codo con codo — y la conexión mental se vuelve un cimiento en vez de un sustituto.',
  'syn.deep.pattern.physical':
    'En su núcleo esto es una conexión de impulso y cuerpo. Marte y el Sol hacen el trabajo pesado, así que aquí hay química de verdad e impulso de verdad — os energizáis mutuamente, hacéis que las cosas pasen cuando estáis juntos y funcionáis bien como equipo cuando hay una tarea que hacer. El mismo cableado significa que podéis enredaros mutuamente igual de rápido; la competitividad y la irritación son la cara sombría de la atracción. El arreglo no es reprimir el calor, sino apuntarlo. Dadle una dirección compartida — un proyecto, un plan, un reto, incluso una pelea limpia con reglas — y la intensidad trabaja para vosotros en vez de volverse hacia dentro.',
  'syn.deep.pattern.karmic':
    'En su núcleo este pesa. Saturno y Plutón están en la mezcla, lo que trae una sensación de consecuencia al vínculo — como si estuvierais aquí para resolver algo juntos y no simplemente para pasar el rato a gusto. Las conexiones así tienden a sentirse significativas pronto y a pedir más de ambas personas de lo que pediría una pareja más ligera. Bien llevada, se vuelve hondamente leal y duradera, de esos vínculos que sobreviven a las cosas. Llevada con descuido, se vuelve pesada — obligación disfrazada de cercanía, o una lenta lucha de poder que nadie nombra. La diferencia es casi por completo si ambos seguís eligiéndola en voz alta, a propósito, en vez de quedaros porque irse se siente como un fracaso.',

  'syn.deep.chemHead': 'La química entre vosotros',
  'syn.deep.chem.strong':
    'La atracción aquí está bien respaldada. Los contactos entre vuestras cartas que gobiernan el deseo y el afecto son en gran parte armónicos, lo que suele traducirse en una química que se siente natural más que tensa — os atraéis de una forma que no cuesta mucho sostener. Disfrútalo, y no lo tomes como prueba de que el resto de la relación se llevará sola; la soltura en un departamento no sustituye al esfuerzo en los demás.',
  'syn.deep.chem.mixed':
    'La atracción aquí tiene corriente y también aspereza. Algunos de los contactos entre vuestras cartas os juntan con calidez; otros añaden fricción a ese mismo tirón, lo que puede leerse como una química con filo — magnética, a veces exasperante, rara vez sosa. Este tipo de chispa suele durar más que la que no tiene fricción, precisamente porque se regenera sin parar. La tarea es mantener el filo juguetón en vez de dejar que se agríe en un patrón de enredaros mutuamente.',
  'syn.deep.chem.cool':
    'El deseo no es el hilo más sonoro entre vuestras cartas. Los contactos que gobiernan la atracción son callados o levemente desafiantes, lo que no significa que no haya chispa — solo que esta conexión es más probable que se construya sobre otras cosas: entendimiento compartido, respeto, fiabilidad, un encuentro de valores. Las relaciones fundadas en eso suelen prender más despacio y ser bastante más difíciles de romper.',

  'syn.deep.commHead': 'Cómo os comunicáis',
  'syn.deep.comm.easy':
    'La comunicación es una fortaleza aquí. Vuestros contactos de Mercurio fluyen, lo que significa que soléis seguir el pensamiento del otro, clavar los chistes y trabajar un problema juntos sin mucha pérdida en la traducción. Úsalo a propósito cuando surja algo difícil — se os da mejor hablar las cosas que a la mayoría de las parejas, así que no dejéis que las conversaciones difíciles sean las que evitáis.',
  'syn.deep.comm.work':
    'La comunicación aquí requiere algo de trabajo. Vuestros contactos de Mercurio llevan fricción, así que podéis hablar en paralelo — tempos distintos, lógica distinta, supuestos distintos sobre qué se acordó en realidad. Esto es manejable, pero necesita un hábito: baja el ritmo, repite lo que oíste y comprueba que decís lo mismo con la misma palabra antes de seguir.',
  'syn.deep.comm.quiet':
    'No hay un contacto de Mercurio fuerte entre vuestras cartas en ningún sentido, lo que suele significar que la comunicación no es ni un don obvio ni un problema obvio — es simplemente algo que construiréis a propósito en vez de que os salga solo. Los repasos regulares y sin forzar importan más para vosotros que para una pareja que se lee automáticamente.',

  'syn.deep.growthLead': 'En qué te hace crecer esto',
  'syn.deep.growth.good':
    'La soltura entre vosotros es real, y es también lo que hay que vigilar. Cuando una conexión funciona sola en gran parte, es fácil relajarse — dejar de traer tu honestidad y tu esfuerzo plenos porque no has tenido que hacerlo. Vuestro filo como pareja es seguir presentándoos como es debido para algo que no lo exige: seguir diciendo lo verdadero, seguir haciendo el esfuerzo, seguir notándoos. No dejéis que «fácil» se vuelva en silencio «desatendido».',
  'syn.deep.growth.mid':
    'Los puntos de fricción entre vosotros no son defectos de la combinación; son el temario. Cada uno marca un lugar donde ambos tendréis que estiraros — decir lo difícil antes, mantener vuestro terreno con más amabilidad, dejar de esperar a que os lean y empezar a ser claros. Las parejas que nombran estas tensiones pronto y las tratan como trabajo compartido suelen irles bien con el tiempo. Las que esperan que se disuelvan sin más suelen encontrarse con la misma discusión durante años.',
  'syn.deep.growth.hard':
    'Esta conexión pide mucho de ambos. Los contactos desafiantes entre vuestras cartas no se disolverán solos, así que la relación solo funciona si ambos tratáis la dificultad como trabajo conjunto y no como culpa del otro. Eso es de verdad posible — muchos vínculos duraderos se construyen sobre aspectos duros — pero es una elección que tendréis que seguir tomando, una y otra vez y en voz alta, sobre todo en los tramos en que sería más fácil llevar la cuenta.',

  'syn.deep.nameItLead': 'Di esta parte en voz alta',
  'syn.deep.nameIt':
    'Si hay una cosa que vale la pena nombrar pronto en vez de esperar que se asiente, es el contacto {a}–{b}: {sentence} Sin decir, tiende a calcificarse en un patrón; dicho con claridad y pronto, suele resultar más pequeño de lo que parecía.',
  'syn.deep.nameIt.none':
    'No hay un único punto de fricción que haya que atajar pronto aquí — lo cual ya vale la pena saberlo. El trabajo en esta conexión va menos de desactivar un asunto y más de estar atentos a lo largo de todo.',

  'syn.deep.longViewLead': 'La visión a largo plazo',
  'syn.deep.longView.good':
    'este es el tipo de conexión que envejece bien. Tiende a volverse más fácil en vez de más difícil a medida que aprendéis los bordes del otro, y la soltura temprana suele profundizarse en algo más firme y más fiable con el tiempo. La amenaza principal para ella es el descuido, no el conflicto.',
  'syn.deep.longView.mid':
    'este se vuelve lo que hagáis de él. El material en bruto es manejable — ni sin esfuerzo ni condenado — y el resultado depende casi por completo del esfuerzo que ambos pongáis durante el primer tramo, antes de que los patrones se fijen. Acertad pronto con los hábitos y esto puede durar.',
  'syn.deep.longView.hard':
    'este es intenso ahora, y es probable que siga siendo intenso. Merece la pena si la profundidad y el significado son lo que ambos queréis de verdad de una relación. Es agotador si una parte de ti espera que se calme y se vuelva algo fácil — probablemente esa no sea la consigna aquí.',
} as const
