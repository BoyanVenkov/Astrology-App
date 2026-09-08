import type { RunesKey } from '../en/runes'

/**
 * Português (BR) — o Futhark Antigo: significados, leitura direita e invertida
 * (merkstave) e uma diretriz diária para cada uma das 24 runas, mais os textos
 * da tela de Runas. Os nomes das runas são em nórdico antigo e permanecem
 * iguais em todos os idiomas.
 */
export const runes: Record<RunesKey, string> = {
  /* ------------------------------------------------------------ textos */
  'rune.eyebrow': 'As Runas',
  'rune.dailyTitle': 'Sua runa de hoje',
  'rune.dailyBlurbChart':
    'Uma runa, tirada para o seu mapa e esta data. Renova-se à meia-noite.',
  'rune.dailyBlurbPlain': 'Uma runa para o dia. Renova-se à meia-noite.',
  'rune.tapReveal': 'Toque na pedra para virá-la.',
  'rune.turnStone': 'Virar a pedra',
  'rune.merkstave': 'Merkstave',
  'rune.merkstaveNote':
    'Caiu invertida — leia para o lado de sombra, o bloqueio ou a lição ainda não aprendida.',
  'rune.sound': 'Som',
  'rune.aettLabel': '{aett} · {element}',

  'rune.aett.1': 'A Ætt de Freyr',
  'rune.aett.2': 'A Ætt de Heimdall',
  'rune.aett.3': 'A Ætt de Týr',

  'rune.element.fire': 'Fogo',
  'rune.element.ice': 'Gelo',
  'rune.element.earth': 'Terra',
  'rune.element.air': 'Ar',
  'rune.element.water': 'Água',
  'rune.element.spirit': 'Espírito',

  'rune.resonance.match':
    'As runas e o céu concordam hoje — os dois apontam para o seu {chakra}.',
  'rune.resonance.bridge':
    'O céu de hoje trabalha o seu {sky}; a runa responde a partir do seu {rune}.',

  'rune.cast': 'Lançar as runas',
  'rune.castSub': 'As Três Nornas, ou a cruz de cinco runas',
  'rune.chooseTitle': 'Escolha uma tirada',
  'rune.chooseBlurb': 'Segure sua pergunta e então escolha como as runas devem cair.',
  'rune.runeCount.one': '1 runa',
  'rune.runeCount.many': '{n} runas',
  'rune.castEyebrow': 'As Runas · {layout}',
  'rune.drawAgain': 'Lançar de novo',
  'rune.doCast': 'Lançar',

  'rune.layout.norns': 'As Três Nornas',
  'rune.layout.nornsSub': 'O que veio a ser, o que está vindo a ser, o que se deve',
  'rune.layout.cross': 'A Cruz de Cinco Runas',
  'rune.layout.crossSub': 'Um olhar mais completo sobre uma situação',

  'rune.pos.now': 'Agora',
  'rune.pos.now.prompt': 'onde você está',
  'rune.pos.urdr': 'Urðr',
  'rune.pos.urdr.prompt': 'aquilo que veio a ser — a raiz disso',
  'rune.pos.verdandi': 'Verðandi',
  'rune.pos.verdandi.prompt': 'aquilo que está vindo a ser — a virada presente',
  'rune.pos.skuld': 'Skuld',
  'rune.pos.skuld.prompt': 'aquilo que será — o que se deve, e para onde leva',
  'rune.pos.heart': 'O coração',
  'rune.pos.heart.prompt': 'o núcleo da questão',
  'rune.pos.crossing': 'O que a cruza',
  'rune.pos.crossing.prompt': 'o obstáculo ou a ajuda',
  'rune.pos.root': 'A raiz',
  'rune.pos.root.prompt': 'de que isso cresce',
  'rune.pos.counsel': 'O conselho',
  'rune.pos.counsel.prompt': 'o que as runas aconselham',
  'rune.pos.outcome': 'Para onde leva',
  'rune.pos.outcome.prompt': 'a direção para a qual tende',

  'rune.ask': 'Perguntar às runas',
  'rune.askSub': 'Uma runa, uma resposta à sua pergunta',
  'rune.askEyebrow': 'As Runas · A Pergunta',
  'rune.askBlurb':
    'Faça sua pergunta com clareza e segure-a enquanto a runa é tirada.',
  'rune.askPlaceholder': 'Devo…  ·  É hora de…  ·  O que preciso saber sobre…',
  'rune.consult': 'Tirar uma runa',
  'rune.askAgain': 'Perguntar de novo',
  'rune.youAsked': 'Você perguntou',
  'rune.answerReading': 'O que a runa diz',
  'rune.castReading': 'A leitura',

  'rune.verdict.yes': 'Sim',
  'rune.verdict.no': 'Não',
  'rune.verdict.wait': 'Ainda não',
  'rune.verdict.hidden': 'Oculto',
  'rune.verdict.yes.gloss': 'A runa pende para o sim. Mova-se, e com intenção.',
  'rune.verdict.no.gloss': 'A runa se afasta. Forçar isso agora custa mais do que devolve.',
  'rune.verdict.wait.gloss':
    'A runa diz que o momento não está maduro. Prepare-se e deixe o instante vir até você.',
  'rune.verdict.hidden.gloss':
    'A runa guarda o seu conselho. Este ainda não é seu para saber — a resposta ainda está se formando.',

  'rune.library': 'O Futhark Antigo',
  'rune.librarySub': 'As vinte e quatro, para sentar com elas',

  'dash.dailyRune': 'Runa do dia',
  'dash.runeSeen': 'A runa de hoje está virada',
  'dash.runeNew': 'Lance a sua runa de hoje',

  /* ---------------------------------------------- A Ætt de Freyr (1–8) */
  'rune.fehu.meaning': 'Gado — riqueza móvel, e o que ela pode comprar ou custar',
  'rune.fehu.keywords': 'Riqueza · Começos · Fluxo',
  'rune.fehu.up':
    'Fehu é o rebanho: riqueza que se move, se multiplica e escapa se for entesourada. Marca a chegada de recursos novos — dinheiro, energia, oportunidade, posição — e o arranque de algo que pode crescer. A armadilha está na sua natureza: isto só fica vivo se continuar circulando. Gaste um pouco, compartilhe um pouco, ponha para trabalhar. O que você aperta, você perde.',
  'rune.fehu.merk':
    'Invertida, Fehu é perda, ou riqueza que possui você em vez do contrário. Algo está escoando, ou você guarda um recurso tão apertado que ele parou de te servir para nada. Olhe para onde a sua energia e o seu dinheiro de fato vão, e seja honesto sobre o que vale manter.',
  'rune.fehu.today':
    'Ponha algo em circulação hoje — dinheiro, esforço ou uma palavra gentil que você vinha guardando.',

  'rune.uruz.meaning': 'O auroque — força vital selvagem, indomada',
  'rune.uruz.keywords': 'Vitalidade · Resistência · Forma bruta',
  'rune.uruz.up':
    'Uruz é o boi selvagem: poder que não foi dobrado ao arado. Traz uma onda de vitalidade física, resistência teimosa e a força de moldar a circunstância bruta em algo seu. É uma boa runa para começos que precisam de músculo — começar o treino, abrir o terreno, segurar um limite. A força é real; o trabalho é aprender a conduzi-la.',
  'rune.uruz.merk':
    'Invertida, Uruz é força mal usada ou ausente — potência voltada contra você mesmo, ou uma fraqueza onde você precisa se firmar. Talvez você esteja empurrando quando deveria parar, ou deixando algo selvagem na sua vida sem gestão. Retome o poder sem deixar que ele te conduza.',
  'rune.uruz.today':
    'Use o corpo hoje — caminhe longe, levante algo pesado ou atravesse uma coisa que você vem adiando.',

  'rune.thurisaz.meaning': 'O espinho — uma força afiada, reativa e defensiva',
  'rune.thurisaz.keywords': 'Defesa · Reação · Um portão duro',
  'rune.thurisaz.up':
    'Thurisaz é o espinho da cerca viva e o martelo do gigante: uma força que protege ferindo e limpa quebrando. Muitas vezes marca um confronto, um limite duro ou uma situação que não cede ao charme. Encarada de frente, fere; encarada com paciência, vira um portão. Não busque essa briga, mas também não finja que o espinho não está ali.',
  'rune.thurisaz.merk':
    'Invertida, Thurisaz é uma defesa que virou um muro, ou um temperamento reativo que causa dano. Talvez você esteja atacando, ou tão fechado contra o ataque que nada de bom te alcança também. Ponha o martelo no chão antes de baixá-lo sobre alguém que não mereceu.',
  'rune.thurisaz.today':
    'Segure um limite hoje sem se desculpar por ele — e resista à vontade de explicá-lo três vezes.',

  'rune.ansuz.meaning': 'O deus — o sopro, a palavra, a mensagem de Odin',
  'rune.ansuz.keywords': 'Voz · Mensagem · Discernimento',
  'rune.ansuz.up':
    'Ansuz é o sopro do Pai de Tudo: fala, sinal e a clareza súbita que chega de fora do seu próprio esforço. Uma mensagem está vindo, ou uma conversa importa mais do que parece. Também rege a sua própria voz — este é o dia de dizer a coisa verdadeira com clareza, de ensinar, de nomear o que você vê. Escute de perto; a resposta pode estar na boca de outro.',
  'rune.ansuz.merk':
    'Invertida, Ansuz é falha de comunicação, uma mensagem mal ouvida, ou sabedoria que você se recusa a escutar por causa de quem a traz. Palavras estão sendo usadas para confundir em vez de esclarecer — suas ou de outro. Desacelere a conversa e confira o que de fato foi dito.',
  'rune.ansuz.today':
    'Diga a coisa clara em voz alta hoje, e escute o dobro do que fala.',

  'rune.raidho.meaning': 'A cavalgada — a jornada, a roda, o ritmo certo',
  'rune.raidho.keywords': 'Jornada · Ritmo · Ordem certa',
  'rune.raidho.up':
    'Raidho é a carroça na estrada: movimento com uma direção, e a sensação de ser levado por um caminho que tem o seu próprio ritmo. Favorece a viagem, as decisões que te põem em movimento e o recolocar as coisas na sua ordem certa. A lição é que a jornada tem um ritmo próprio — você não pode apressar a estrada, mas pode parar de brigar com ela.',
  'rune.raidho.merk':
    'Invertida, Raidho é uma jornada travada, um plano fora de sequência, ou movimento na direção errada. Algo está fora do compasso — uma viagem que você não deveria fazer, ou uma pressa que vai te custar. Acerte a ordem das coisas antes de partir de novo.',
  'rune.raidho.today':
    'Dê o próximo passo certo em ordem hoje; resista à vontade de pular para a parte interessante.',

  'rune.kenaz.meaning': 'A tocha — fogo controlado, ofício e conhecimento',
  'rune.kenaz.keywords': 'Discernimento · Ofício · Fogo criativo',
  'rune.kenaz.up':
    'Kenaz é a chama no salão: não o incêndio, mas o fogo trabalhado — a forja, a lâmpada, a faísca do entender. Traz clareza a um canto escuro, habilidade a uma tarefa e o calor criativo para fazer, não só imaginar. Algo sobre o que você estava no escuro fica visível. Pegue o que você vê agora e dê forma a algo real.',
  'rune.kenaz.merk':
    'Invertida, Kenaz é uma luz que se apaga — inspiração perdida, um projeto esfriando, ou conhecimento usado para queimar em vez de construir. Talvez você esteja bloqueado criativamente, ou agarrado a um jeito de fazer as coisas que já não lança luz nenhuma. Deixe a coisa morta escurecer para que uma chama nova possa pegar.',
  'rune.kenaz.today':
    'Faça algo hoje, por menor e mais tosco que seja — o ponto é trazer uma ideia para a forma.',

  'rune.gebo.meaning': 'O presente — a troca, e o laço que ela cria',
  'rune.gebo.keywords': 'Presente · Troca · Parceria',
  'rune.gebo.up':
    'Gebo é o presente dado e o presente devido — o fio de obrigação e generosidade que liga as pessoas. Marca uma troca genuína: uma parceria, um contrato, um ato de dar que vai voltar. Não há Gebo invertida, porque um presente, uma vez dado, não pode ser des-dado. Dê livremente e receba com graça, e veja a balança se equilibrar com o tempo.',
  'rune.gebo.today':
    'Dê algo hoje sem um livro de contas na cabeça — e permita-se aceitar o que te for oferecido em troca.',

  'rune.wunjo.meaning': 'Alegria — harmonia, pertencimento e coisas que se encaixam no lugar',
  'rune.wunjo.keywords': 'Alegria · Harmonia · Pertencimento',
  'rune.wunjo.up':
    'Wunjo é a alegria do salão bem conduzido: não êxtase, mas contentamento, a sensação de que as coisas se encaixam e de estar entre os seus. Marca uma resolução, uma recompensa merecida, ou um momento em que as peças se alinham. Permita-se notar. Esta runa te pede para aceitar o bem que de fato está aqui em vez de segurar firme por uma versão melhor.',
  'rune.wunjo.merk':
    'Invertida, Wunjo é alegria adiada ou uma harmonia falsa mantida por não dizer a coisa difícil. Algo está desafinado sob a superfície. Não encubra — a folga real vem depois da conversa honesta, não no lugar dela.',
  'rune.wunjo.today':
    'Nomeie uma coisa que de fato vai bem, e deixe isso bastar por hoje.',

  /* -------------------------------------------- A Ætt de Heimdall (9–16) */
  'rune.hagalaz.meaning': 'Granizo — perturbação súbita fora do seu controle',
  'rune.hagalaz.keywords': 'Perturbação · Crise · Limpeza',
  'rune.hagalaz.up':
    'Hagalaz é a chuva de granizo: destruição que cai do céu, arruína a colheita e então derrete na água que alimenta a próxima. Marca uma interrupção que você não escolheu e com a qual não pode discutir — um evento que quebra o padrão. Aqui não há nada a combater. Abrigue-se, deixe passar e veja o que ainda está de pé depois. O granizo limpa o terreno.',
  'rune.hagalaz.today':
    'Não comece nada frágil hoje. Feche as escotilhas, espere o tempo passar e confie que o terreno se limpa.',

  'rune.nauthiz.meaning': 'Necessidade — atrito, restrição e o fogo que ela faz',
  'rune.nauthiz.keywords': 'Restrição · Necessidade · Lição dura',
  'rune.nauthiz.up':
    'Nauthiz é o fogo da necessidade, aceso esfregando dois gravetos sob pressão. Marca uma restrição — uma escassez, um atraso, uma situação da qual você ainda não pode sair — e a desenvoltura que essa restrição te obriga a tirar. A lição é paciência sob atrito. Encare a falta com honestidade, faça a pequena coisa disciplinada no seu poder, e deixe a resistência te ensinar do que você de fato precisa.',
  'rune.nauthiz.merk':
    'Invertida, Nauthiz é necessidade negada — fingir que a restrição não está ali, ou deixar a dificuldade azedar em ressentimento e decisões precipitadas. Pare de brigar com o fato do limite. O caminho através é aceitação primeiro, depois ação paciente e deliberada.',
  'rune.nauthiz.today':
    'Aceite um limite hoje em vez de discutir com ele, e faça a única pequena coisa disciplinada que ele te deixa aberta.',

  'rune.isa.meaning': 'Gelo — quietude, uma paralisação, o instante congelado',
  'rune.isa.keywords': 'Quietude · Paralisação · Clareza',
  'rune.isa.up':
    'Isa é o rio congelado até o fundo: todo movimento parado, tudo mantido no lugar. Marca uma paralisação — um plano em espera, uma relação em estase, um período em que nada do que você empurra parece se mover. Isto não é fracasso; é inverno. Pare de forçar o degelo. Use a quietude para ver com clareza o que há sob o gelo, e conserve a sua força para a primavera.',
  'rune.isa.today':
    'Pare de empurrar a coisa emperrada hoje. Sente com ela, olhe-a com clareza e deixe a quietude fazer o seu trabalho.',

  'rune.jera.meaning': 'O ano — colheita, ciclos e esforço que dá fruto',
  'rune.jera.keywords': 'Colheita · Ciclos · Momento certo',
  'rune.jera.up':
    'Jera é o ano que gira: semente, crescimento, colheita, descanso e semente de novo. Marca o ponto em que o esforço anterior enfim rende — não por um golpe de sorte, mas porque passou tempo suficiente e foi feito trabalho suficiente. Também aconselha paciência com o que ainda não está maduro. Você não pode apressar uma estação. Cuide do que plantou e recolha o que está pronto.',
  'rune.jera.today':
    'Receba algo que você plantou há um tempo — termine-o, guarde-o, ou simplesmente note que funcionou.',

  'rune.eihwaz.meaning': 'O teixo — o eixo entre a vida e a morte, resistência',
  'rune.eihwaz.keywords': 'Resistência · Transformação · O eixo',
  'rune.eihwaz.up':
    'Eihwaz é o teixo, perene e venenoso, com as raízes no submundo e a copa na luz — o poste que atravessa os mundos. Marca resistência através de uma passagem dura, e uma mudança que vai até o fundo. Algo precisa terminar para que a coisa seguinte viva. Fique como o teixo: enraizado, imóvel, conectado tanto ao que morre quanto ao que nasce.',
  'rune.eihwaz.today':
    'Encare hoje o fim que você vem evitando — não para forçá-lo, só para parar de fingir que não está acontecendo.',

  'rune.perthro.meaning': 'O copo de sortes — mistério, acaso e o que o destino mantém oculto',
  'rune.perthro.keywords': 'Mistério · Acaso · O não visto',
  'rune.perthro.up':
    'Perthro é o copo de onde as sortes são chacoalhadas — o momento antes de os dados caírem, quando o resultado existe mas não pode ser visto. Rege os segredos, as influências ocultas, a sorte e as partes do padrão que simplesmente ainda não são suas de saber. Algo está sendo decidido fora de vista. Faça bem o seu papel e deixe o lance cair; nem tudo é para ser desvendado de antemão.',
  'rune.perthro.merk':
    'Invertida, Perthro é um segredo que precisa ficar enterrado sendo desenterrado, ou uma fixação doentia em saber o resultado. Pare de forçar a revelação. Algumas coisas apodrecem na luz antes do tempo.',
  'rune.perthro.today':
    'Deixe uma coisa ficar desconhecida hoje. Faça a sua parte e pare de atualizar a página.',

  'rune.algiz.meaning': 'O alce — proteção, e o alcance rumo ao mais alto',
  'rune.algiz.keywords': 'Proteção · Conexão · Ajuda do alto',
  'rune.algiz.up':
    'Algiz é o alce com a galhada erguida, e a junça que corta a mão que a agarra — uma runa de proteção, e do elo entre você e algo maior. Marca um escudo ao seu redor agora mesmo, e apoio disponível acima do seu próprio nível se você estender a mão. Peça ajuda. Fique de pé, ereto. O que vela por você está do seu lado.',
  'rune.algiz.merk':
    'Invertida, Algiz é proteção baixada ou ajuda recusada — deixar-se aberto onde você deveria estar guardado, ou se cortar do apoio que está ali. Cheque as suas defesas, e deixe alguém entrar.',
  'rune.algiz.today':
    'Peça ajuda com uma coisa hoje, a uma pessoa ou a um poder acima do seu posto.',

  'rune.sowilo.meaning': 'O sol — inteireza, sucesso e a vontade que guia',
  'rune.sowilo.keywords': 'Sucesso · Inteireza · Vontade clara',
  'rune.sowilo.up':
    'Sowilo é a roda solar: a luz que sempre volta, a vitória que vem de uma vontade apontada com firmeza para uma só coisa. Marca sucesso, saúde e uma força esclarecedora que queima a névoa. Não há Sowilo invertida — o sol não anda para trás. Aponte a sua energia para o que importa, mantenha-a ali e espere que o resultado vá a seu favor.',
  'rune.sowilo.today':
    'Aponte tudo para uma meta hoje. Sem se resguardar, sem segundo alvo — só ela, até escurecer.',

  /* --------------------------------------------------- A Ætt de Týr (17–24) */
  'rune.tiwaz.meaning': 'Týr — justiça, coragem e o sacrifício consentido',
  'rune.tiwaz.keywords': 'Justiça · Coragem · Sacrifício',
  'rune.tiwaz.up':
    'Tiwaz é a lança e a mão que Týr deu ao lobo para manter a sua palavra — uma runa de justiça, honra e de fazer o certo a um custo real. Favorece as questões legais, as lutas limpas e o ficar de pé por um compromisso quando ele deixa de ser conveniente. Aponte-se para o que é verdade e segure a linha. A vitória aqui é do tipo com que você consegue viver depois.',
  'rune.tiwaz.merk':
    'Invertida, Tiwaz é coragem que falha, um compromisso abandonado, ou justiça torta. Talvez você esteja evitando uma posição que sabe que deveria tomar, ou gastando a sua energia numa luta que não é honesta. Recomprometa-se com o que de fato é certo, mesmo que te custe a vitória.',
  'rune.tiwaz.today':
    'Cumpra hoje uma promessa que ficou inconveniente, e tome a posição que você vem escapando.',

  'rune.berkano.meaning': 'A bétula — crescimento, cuidado e começos novos e silenciosos',
  'rune.berkano.keywords': 'Crescimento · Cuidado · Começos novos',
  'rune.berkano.up':
    'Berkano é a bétula, primeira árvore a reverdecer depois do gelo — uma runa de crescimento suave e abrigado: gravidez, um projeto novo na sua fase tenra, cura, o cuidado que deixa uma coisa pequena ficar forte. Ela te pede para nutrir em vez de empurrar. Proteja o broto novo, alimente-o, mantenha a geada longe e deixe-o crescer no ritmo que o crescimento de fato leva.',
  'rune.berkano.merk':
    'Invertida, Berkano é crescimento atrofiado ou cuidado retirado — uma coisa nova negligenciada, um nó familiar, ou autonegligência disfarçada de dureza. Algo precisa de cuidado que você vem deixando se virar sozinho. Volte e nutra-o direito.',
  'rune.berkano.today':
    'Cuide hoje de uma coisa que cresce — uma pessoa, um plano ou você mesmo — com cuidado de verdade, não só com intenção.',

  'rune.ehwaz.meaning': 'O cavalo — parceria, confiança e movimento firme',
  'rune.ehwaz.keywords': 'Parceria · Confiança · Impulso',
  'rune.ehwaz.up':
    'Ehwaz é o cavalo e o cavaleiro movendo-se como um só — uma runa de parceria de confiança, trabalho de equipe e progresso feito junto que nenhum dos dois faria sozinho. Marca uma relação que funciona, ou uma colaboração pela qual vale a pena se comprometer. O laço é construído sobre confiança e sobre as duas partes puxarem na mesma direção. Onde você tem isso, apoie-se; onde você quer, seja primeiro a metade confiável.',
  'rune.ehwaz.merk':
    'Invertida, Ehwaz é uma parceria fora de passo — desconfiança, uma parte carregando a outra, ou movimento que travou porque vocês já não querem a mesma coisa. Nomeie onde a confiança quebrou e decida com honestidade se vocês ainda cavalgam juntos.',
  'rune.ehwaz.today':
    'Faça uma coisa com alguém hoje em vez de sozinho, e seja a metade com quem se pode contar.',

  'rune.mannaz.meaning': 'O humano — o eu, e o eu entre os outros',
  'rune.mannaz.keywords': 'Eu · Comunidade · Perspectiva',
  'rune.mannaz.up':
    'Mannaz é a runa da humanidade — você como indivíduo, e você como um nó numa teia de outros. Ela te pede para se ver com clareza: seus dons, seus limites e o seu reflexo nas pessoas ao seu redor. Muitas vezes marca um momento de precisar dos outros, ou de ser necessário, ou de se ver com honestidade pelos olhos de outro. Você não é feito para fazer isso sozinho, e também não é o centro disso.',
  'rune.mannaz.merk':
    'Invertida, Mannaz é isolamento, ou uma autoimagem que se afastou da verdade — inflada ou injustamente dura. Talvez você esteja cortado dos seus, ou o seu pior crítico. Consiga um olhar de fora de alguém que vai ser honesto e gentil.',
  'rune.mannaz.today':
    'Veja-se hoje pelos olhos de alguém que te conhece bem, e ajuste o retrato onde estiver errado.',

  'rune.laguz.meaning': 'Água — fluxo, intuição e o inconsciente profundo',
  'rune.laguz.keywords': 'Fluxo · Intuição · O profundo',
  'rune.laguz.up':
    'Laguz é o lago e o mar: fluxo, sentir, sonho e a água funda do inconsciente onde se movem coisas que a mente diurna não pode ver. Favorece confiar num pressentimento acima de uma planilha, ir com a correnteza em vez de contra, e prestar atenção no que os seus sonhos e humores estão te dizendo. A maré sabe para onde vai. Por ora, deixe que ela te leve.',
  'rune.laguz.merk':
    'Invertida, Laguz é uma enchente, ou ser puxado para baixo da água — sobrecarregado pelo sentir, evitando algo à deriva, ou uma intuição que azedou em medo ou fantasia. Ponha os pés no chão. Nem toda correnteza vale a pena seguir, e nem toda onda é um aviso.',
  'rune.laguz.today':
    'Confie hoje no pressentimento acima do argumento esperto, e preste atenção no que você sonhar esta noite.',

  'rune.ingwaz.meaning': 'Ing — gestação, potencial guardado, um ciclo completado',
  'rune.ingwaz.keywords': 'Gestação · Potencial · Conclusão',
  'rune.ingwaz.up':
    'Ingwaz é a semente selada na terra ao longo do inverno — potencial contido num recipiente fechado, fazendo o seu trabalho fora de vista até estar pronto para se soltar de uma vez. Marca o fim de uma gestação: um projeto, uma decisão ou um processo interno que vinha cozinhando em silêncio está prestes a ficar pronto. Não abra a caixa cedo demais. Quando terminar, vai terminar com limpeza, e você vai sentir o alívio disso.',
  'rune.ingwaz.today':
    'Deixe hoje o que está quase pronto terminar no seu próprio tempo. Pare de cutucar.',

  'rune.dagaz.meaning': 'Dia — ruptura, despertar, a virada do escuro para o claro',
  'rune.dagaz.keywords': 'Ruptura · Despertar · Ponto de virada',
  'rune.dagaz.up':
    'Dagaz é o amanhecer: a dobradiça entre a noite e o dia, o momento em que a luz volta e tudo parece diferente. Marca uma ruptura — uma compreensão, uma mudança de coração, uma situação que passa de travada a em movimento de uma vez. Não há Dagaz invertida; o amanhecer não se des-acontece. Algo sobre o que você estava no escuro está prestes a ficar óbvio. Esteja pronto para agir sobre isso.',
  'rune.dagaz.today':
    'Aja hoje sobre a compreensão, enquanto ela ainda está viva. O discernimento desbota se você dorme sobre ele por tempo demais.',

  'rune.othala.meaning': 'A herdade — herança, linhagem e o que é de fato seu',
  'rune.othala.keywords': 'Linhagem · Lar · O que perdura',
  'rune.othala.up':
    'Othala é a terra ancestral: o que você herda, aquilo a que você pertence, e as coisas que não podem ser tiradas porque estão tecidas em quem você é. Marca questões de lar, família, tradição e legado — o que manter de onde você vem, e o que deixar para trás. Reivindique o que é de fato seu. Cuide disso. E seja honesto sobre quais heranças são presentes e quais são só peso velho.',
  'rune.othala.merk':
    'Invertida, Othala é uma herança ruim à qual se agarrar, ou um desenraizamento que não se assenta — velhos padrões de família no piloto automático, ou uma recusa a pertencer a qualquer lugar. Separe as relíquias. Fique com o que serve ao futuro; ao resto, dê um enterro respeitoso.',
  'rune.othala.today':
    'Fique hoje com uma coisa de onde você vem, e deponha de forma consciente uma coisa que você carrega por hábito.',
} as const
