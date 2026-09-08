import type { DeepReadingKey } from '../en/deepReading'

/**
 * Português (BR) — a leitura profunda e longa: o Horóscopo Completo pago e a
 * revisão detalhada de Compatibilidade. Escrito para se ler como uma página ou
 * duas de um astrólogo de verdade.
 */
export const deepReading: Record<DeepReadingKey, string> = {
  /* ---- horóscopo do dia (grátis): um pouco mais de fundo em cada nota ---- */
  'horo.deep.q.house': 'Está caindo na área de {theme}.',
  'horo.deep.q.hard': 'Ande com cuidado nisso.',
  'horo.deep.q.soft': 'Vale um passo pequeno e deliberado.',
  'horo.deep.q.neutral': 'Deixe assentar antes de agir.',
  'horo.deep.q.thread':
    'O fio de hoje volta sem parar ao seu {focus} — é ali que manter a atenção.',
  'scr.horo.weekHead': 'O arco mais amplo',

  /* ============================ HORÓSCOPO COMPLETO ============================ */

  /* -- o que significa quando cada planeta é a força EM TRÂNSITO (em movimento) -- */
  'dh.tr.Sun':
    'O Sol move o dia: aonde vai, acende um holofote ali por cerca de um mês, aquece aquela parte do mapa e pede que você apareça nela sendo você mesmo.',
  'dh.tr.Moon':
    'A Lua é o corpo mais rápido do céu; seus trânsitos são breves, mas fixam o tom emocional do dia e trazem à superfície o que tocam.',
  'dh.tr.Mercury':
    'Mercúrio governa o pensar, o falar e as pequenas decisões que se somam. Seus trânsitos aceleram o tráfego de informação em torno de um assunto — conversas, mensagens, papelada, segundos pensamentos.',
  'dh.tr.Venus':
    'Vênus rege a atração, o conforto, o dinheiro e o gosto. Quando transita um ponto, adoça o terreno ali e faz a conexão, o gasto e o prazer virem com mais facilidade.',
  'dh.tr.Mars':
    'Marte é impulso e calor em estado bruto. Seus trânsitos acendem um fogo sob o que tocam — você ganha mais coragem e mais atrito no mesmo pacote, e a vontade de agir antes de ter pensado tudo até o fim.',
  'dh.tr.Jupiter':
    'Júpiter é o planeta do crescimento e do «mais». Amplia o que contata — oportunidade, confiança, apetite e, às vezes, excesso — e tende a fazer a porta daquela área da vida abrir mais por cerca de um ano.',
  'dh.tr.Saturn':
    'Saturno é tempo, estrutura e consequência. Por onde passa, desacelera as coisas e pergunta se o que você construiu ali aguenta peso; o que aguenta, ele fortalece, e o que não aguenta, ele desmonta em silêncio para você reconstruir direito.',
  'dh.tr.Uranus':
    'Urano é o perturbador. Seus trânsitos quebram um padrão que ficou rançoso — muitas vezes por uma surpresa, uma inquietação súbita ou uma mudança que você não planejou — e devolvem alguma liberdade que você tinha assinado para ceder.',
  'dh.tr.Neptune':
    'Netuno dissolve as bordas. Onde transita, os contornos ficam moles: mais imaginação e compaixão, mas também mais confusão, e uma puxada para escapar em vez de encarar a coisa diretamente.',
  'dh.tr.Pluto':
    'Plutão trabalha debaixo da terra e não tem pressa. Seus trânsitos trazem uma transformação lenta e completa ao que tocam — lutas de poder, finais e um despir até o que de fato é essencial.',

  /* -- o que o seu ponto NATAL governa no seu próprio mapa -- */
  'dh.na.Sun':
    'sua identidade central, sua vitalidade e o senso de quem você é quando está mais você mesmo',
  'dh.na.Moon':
    'seus instintos, seus humores e o que você precisa para se sentir seguro e amparado',
  'dh.na.Mercury':
    'como você pensa, aprende, fala e toma as decisões do dia a dia',
  'dh.na.Venus':
    'como você ama e é amado, o que acha belo e sua relação com o dinheiro e o prazer',
  'dh.na.Mars':
    'seu impulso, sua raiva, seu desejo e como você vai atrás do que quer',
  'dh.na.Jupiter':
    'onde você busca sentido e crescimento, e seu senso natural de fé e possibilidade',
  'dh.na.Saturn':
    'sua relação com a disciplina, a autoridade e os limites — o lugar onde você teve de amadurecer no sofrimento',
  'dh.na.Uranus':
    'sua necessidade de ser livre e de fazer as coisas do seu jeito',
  'dh.na.Neptune':
    'sua imaginação, sua espiritualidade e os lugares onde você tende a idealizar ou a se perder',
  'dh.na.Pluto':
    'sua relação com o poder e o controle, e o que em você é feito para ser transformado',

  /* -- a natureza de cada aspecto (duas variantes, alternadas por seção) -- */
  'dh.asp.nat.conjunction.0':
    'Uma conjunção é uma fusão. As duas forças ocupam o mesmo grau e agem como uma só, iniciando um ciclo novo nesta área da sua vida — uma semente sendo plantada, não uma colheita sendo recolhida.',
  'dh.asp.nat.conjunction.1':
    'Uma conjunção funde as duas energias tão por completo que é difícil distingui-las. Marca um começo; o que tomar forma agora vai se desdobrar nos anos que seguem.',
  'dh.asp.nat.opposition.0':
    'Uma oposição trabalha pelo espelho de outras pessoas e de circunstâncias externas. A tensão é real, mas está aí para trazer consciência — você vê a questão com clareza porque algo se coloca de frente para ela.',
  'dh.asp.nat.opposition.1':
    'Uma oposição te puxa entre dois polos e pede que segure os dois em vez de desabar em um. O equilíbrio aqui não é um meio-termo; é uma habilidade que você constrói sob pressão.',
  'dh.asp.nat.square.0':
    'Uma quadratura é um aspecto de atrito. As duas energias querem coisas diferentes e vivem se enganchando uma na outra, e o desconforto é o ponto — é a aspereza que força uma mudança real em vez de uma cosmética.',
  'dh.asp.nat.square.1':
    'Uma quadratura põe um obstáculo na estrada justo onde você preferiria não ter de lidar com um. Empurrar reto raramente funciona; a saída costuma ser mudar de abordagem, não se esforçar mais.',
  'dh.asp.nat.trine.0':
    'Um trígono é um canal aberto. As duas energias cooperam sem que se peça, e o apoio flui na sua direção aqui — mas só te alcança se você de fato se mover em direção a ele.',
  'dh.asp.nat.trine.1':
    'Um trígono faz esta área da vida parecer fácil e natural por um tempo. O risco é a acomodação; a facilidade que você não usa tende a escoar em silêncio.',
  'dh.asp.nat.sextile.0':
    'Um sextil é uma oportunidade que você tem de aceitar de propósito. A porta está destrancada, mas não aberta — uma pequena ação deliberada agora transforma uma possibilidade em algo real.',
  'dh.asp.nat.sextile.1':
    'Um sextil oferece uma abertura útil nesta parte da sua vida. Recompensa a iniciativa e não faz nada pela espera.',

  /* -- frase verbal curta para a abertura da seção -- */
  'dh.asp.verb.conjunction': 'encontra e se funde com',
  'dh.asp.verb.opposition': 'puxa contra',
  'dh.asp.verb.square': 'atrita com',
  'dh.asp.verb.trine': 'flui em direção a',
  'dh.asp.verb.sextile': 'abre uma porta para',

  /* -- como a energia se expressa no signo em que o ponto natal está -- */
  'dh.sign.Aries':
    'rápida, direta e um pouco combativa, mais inclinada a agir do que a esperar',
  'dh.sign.Taurus':
    'lenta, sensual e teimosa, resistente à pressa e lenta para largar',
  'dh.sign.Gemini':
    'curiosa e verbal, rápida para conectar ideias e rápida para ficar inquieta',
  'dh.sign.Cancer':
    'terna e protetora, guiando-se pelo sentir antes da lógica',
  'dh.sign.Leo':
    'calorosa, expressiva e orgulhosa, precisando ser vista para se sentir real',
  'dh.sign.Virgo':
    'precisa e prática, mais feliz quando pode ser de fato útil',
  'dh.sign.Libra':
    'voltada para o equilíbrio, a justiça e a boa companhia, e avessa a fazer cena',
  'dh.sign.Scorpio':
    'intensa e reservada, tudo ou nada, e atraída pelo que está oculto',
  'dh.sign.Sagittarius':
    'inquieta por espaço, sentido e uma visão mais ampla, e impaciente com as letras miúdas',
  'dh.sign.Capricorn':
    'séria e autodisciplinada, mais impressionada por resultados do que por promessas',
  'dh.sign.Aquarius':
    'independente e voltada para o futuro, pensando em sistemas mais do que em sentimentos',
  'dh.sign.Pisces':
    'sonhadora, permeável e compassiva, e facilmente sobrecarregada',

  /* -- o que um trânsito por cada casa tende a mexer -- */
  'dh.house.1':
    'Na casa 1, o trabalho aparece em você — seu corpo, sua imagem, a primeira impressão que causa. É um bom trecho para redesenhar como você se apresenta em vez de manter um contorno que já não serve.',
  'dh.house.2':
    'Na casa 2, toca dinheiro, recursos e autoestima. A pergunta externa é o que você ganha e possui; a interna é o que você acredita merecer.',
  'dh.house.3':
    'Na casa 3, mexe a mente do dia a dia — conversas, trajetos curtos, irmãos e vizinhos, a interminável pequena troca de informação. Preste atenção no que você fica repetindo para si mesmo.',
  'dh.house.4':
    'Na casa 4, alcança as raízes — lar, família, seu passado e a base privada à qual você retorna. Algo no seu alicerce está sendo examinado.',
  'dh.house.5':
    'Na casa 5, toca a brincadeira, o romance, a criatividade e as coisas que você faz pela alegria de fazer. Pergunta para onde foi a sua faísca e como recuperá-la.',
  'dh.house.6':
    'Na casa 6, trabalha pela rotina, pela saúde e pelo labor diário de manter você e o seu trabalho funcionando. Os pequenos hábitos pesam mais que o normal agora.',
  'dh.house.7':
    'Na casa 7, o espelho são as outras pessoas — parceiros, pessoas próximas, quem está do outro lado da mesa. O que você encontra nelas costuma ser algo seu que você não olhou de frente.',
  'dh.house.8':
    'Na casa 8, vai para a água funda — dinheiro compartilhado, intimidade, poder e o que está terminando. Não é território de conversa fiada; algo está sendo transformado na raiz.',
  'dh.house.9':
    'Na casa 9, abre a visão mais ampla — crença, estudo, viagem e a busca de sentido. Seu senso de para que tudo isso serve está sendo esticado.',
  'dh.house.10':
    'Na casa 10, é público — carreira, reputação, sua posição e o papel que você desempenha no mundo. Aquilo pelo que você é conhecido está em revisão.',
  'dh.house.11':
    'Na casa 11, toca a amizade, a comunidade e o futuro para o qual você estende a mão. A companhia que você mantém e as metas que carrega estão sendo peneiradas.',
  'dh.house.12':
    'Na casa 12, trabalha nos bastidores — descanso, solidão, o inconsciente e o que você vem carregando sem nomear. Este é um trabalho quieto, voltado para dentro.',

  /* -- «na vida diária isso pode parecer…» (alternado por aspecto) -- */
  'dh.life.conjunction.0':
    'Na vida diária, isso pode parecer um recomeço que você não escolheu de todo — novos termos, um capítulo novo se abrindo nesta área, esteja você se sentindo pronto ou não.',
  'dh.life.conjunction.1':
    'No dia a dia, pode chegar como um interesse novo e forte, uma pessoa que muda o enquadramento, ou simplesmente a sensação de que a versão antiga disso acabou.',
  'dh.life.conjunction.2':
    'Na prática, costuma aparecer como um limiar — uma decisão, uma mudança de casa, um compromisso que zera o relógio nesta parte da sua vida.',
  'dh.life.opposition.0':
    'Na vida diária, isso costuma se dar por meio de outra pessoa — um desacordo, uma exigência, ou alguém que encarna justo aquilo com que você está lidando.',
  'dh.life.opposition.1':
    'No dia a dia, pode parecer estar preso entre duas necessidades válidas — a sua e a de outro, ou duas partes da sua própria vida que não cabem as duas.',
  'dh.life.opposition.2':
    'Na prática, tende a levar as coisas ao ponto: uma conversa que você já não pode adiar, uma escolha que espera você fazer.',
  'dh.life.square.0':
    'Na vida diária, isso pode parecer um plano que vive travando, uma pessoa que aperta sempre o mesmo botão, ou uma tarefa que parece bem mais pesada do que deveria.',
  'dh.life.square.1':
    'No dia a dia, costuma chegar como frustração — esforço que não se converte em nada, um muro onde você esperava uma porta.',
  'dh.life.square.2':
    'Na prática, aparece como uma pressão que não te deixa ir no embalo: a coisa que você vem evitando está agora na estrada.',
  'dh.life.trine.0':
    'Na vida diária, isso pode parecer uma sequência de pequenos sinais verdes — ajuda que chega, timing que funciona, um sim onde você se preparou para um não.',
  'dh.life.trine.1':
    'No dia a dia, costuma aparecer como facilidade e fluxo nesta área, e a tentação de supor que sempre será assim tão simples.',
  'dh.life.trine.2':
    'Na prática, é uma janela favorável — as apresentações pegam, os pedidos recebem boa acolhida, o caminho fica livre por um momento.',
  'dh.life.sextile.0':
    'Na vida diária, isso pode parecer uma abertura que você quase perde — uma oferta, um encontro casual, uma portinha que só fica aberta se você atravessar agora.',
  'dh.life.sextile.1':
    'No dia a dia, tende a recompensar quem dá o primeiro passo: mande a mensagem, faça a pergunta, ponha seu nome.',
  'dh.life.sextile.2':
    'Na prática, é uma oportunidade de baixo custo — nada dramático, mas vale agir enquanto está aqui.',

  /* -- o convite mais profundo do aspecto (alternado) -- */
  'dh.invite.conjunction.0':
    'O convite é plantar de propósito. O que você começa agora, por menor que seja, é a semente de algo com que você ainda vai conviver daqui a anos — então escolha de propósito.',
  'dh.invite.conjunction.1':
    'O trabalho mais profundo é soltar a forma antiga disso com limpeza, sem arrastá-la meio viva para o capítulo novo.',
  'dh.invite.conjunction.2':
    'O que isso pede de verdade é um sim claro ou um não claro. A ambivalência é a única resposta que desperdiça a janela.',
  'dh.invite.opposition.0':
    'O convite não é vencer. É segurar os dois lados o suficiente para achar a terceira opção que honra o que é verdade em cada um.',
  'dh.invite.opposition.1':
    'O trabalho mais profundo é retomar a parte disso que você vem terceirizando para outra pessoa — a força, a necessidade ou a culpa.',
  'dh.invite.opposition.2':
    'O que isso pede é consciência honesta. Depois que você enxerga o padrão de verdade, já não está dentro dele.',
  'dh.invite.square.0':
    'O convite não é empurrar mais forte. É notar o que você já superou aqui e deixar o atrito desmontá-lo, para que algo mais firme possa ser construído.',
  'dh.invite.square.1':
    'O trabalho mais profundo é uma mudança de método. A meta pode estar boa; o jeito como você vem abordando é o que gera a resistência.',
  'dh.invite.square.2':
    'O que isso pede de verdade é maturidade num ponto específico — fazer a coisa sem glamour e estrutural que você esperava poder pular.',
  'dh.invite.trine.0':
    'O convite é usar a facilidade, não só aproveitá-la. O apoio que não se gasta tende a desaparecer em silêncio.',
  'dh.invite.trine.1':
    'O trabalho mais profundo é construir algo durante a calmaria que vá aguentar quando o tempo virar de novo.',
  'dh.invite.trine.2':
    'O que isso pede é que você diga sim à ajuda — aceite a apresentação, pegue o atalho, deixe ser fácil por uma vez.',
  'dh.invite.sextile.0':
    'O convite é iniciativa. Isso é uma porta deixada destrancada; só abre se você empurrar.',
  'dh.invite.sextile.1':
    'O trabalho mais profundo é notar as pequenas oportunidades das quais você habitualmente se demove, e pegar uma.',
  'dh.invite.sextile.2':
    'O que isso pede é um ato de coragem modesto e concreto — nada dramático, só um passo que você preferiria adiar.',

  /* -- orientação concreta (alternada) -- */
  'dh.do.conjunction.0':
    'Dê a isso um começo limpo: nomeie o que começa, marque de algum jeito e não entulhe as primeiras semanas com restos da versão antiga.',
  'dh.do.conjunction.1':
    'Ande de modo deliberado mais do que rápido. Uma conjunção põe um ciclo longo em movimento; o tom que você fixa agora tende a ficar.',
  'dh.do.conjunction.2':
    'Decida. Diga o sim ou o não em voz alta diante de ao menos uma outra pessoa para que se torne real.',
  'dh.do.opposition.0':
    'Tenha a conversa em torno da qual você fica rodeando, e entre nela para escutar. O outro lado carrega informação de que você precisa.',
  'dh.do.opposition.1':
    'Escreva as duas posições como se tivesse de defender cada uma com justiça. O ponto de equilíbrio costuma se mostrar no papel.',
  'dh.do.opposition.2':
    'Não force uma resolução hoje. Deixe a tensão ficar até a terceira opção emergir sozinha.',
  'dh.do.square.0':
    'Não se comprometa nem assine sob pressão. Deixe o que resiste te mostrar onde a estrutura está fina, e reforce isso primeiro.',
  'dh.do.square.1':
    'Mude uma coisa na sua abordagem e tente de novo. O mesmo esforço, outro ângulo.',
  'dh.do.square.2':
    'Faça a tarefa chata e estrutural que você vive adiando. É a tarefa inteira.',
  'dh.do.trine.0':
    'Dê um passo real enquanto a porta está aberta — uma mensagem, uma reserva, um primeiro rascunho. A facilidade some se você só a admira.',
  'dh.do.trine.1':
    'Peça a coisa. Esta é a janela em que um sim é mais provável.',
  'dh.do.trine.2':
    'Construa agora. Use a calmaria para assentar uma base de que você vai se alegrar depois.',
  'dh.do.sextile.0':
    'Dê o primeiro passo hoje, não na semana que vem. Mande, pergunte, ponha seu nome.',
  'dh.do.sextile.1':
    'Diga sim à oferta pequena mesmo que pareça menor. Essas se acumulam.',
  'dh.do.sextile.2':
    'Escolha a única oportunidade que você normalmente adiaria, e aja sobre ela antes de o dia acabar.',

  /* -- linguagem do timing (alternada por estado) -- */
  'dh.time.peak.0':
    'Está perto do exato e ainda apertando, então isso atinge o pico em um dia ou dois e depois começa a afrouxar.',
  'dh.time.peak.1':
    'O contato está quase preciso agora mesmo — é o mais alto que fica, e a intensidade cai logo depois.',
  'dh.time.peak.2':
    'Isso está no grau exato ou perto dele, e é por isso que pede tanta da sua atenção de uma vez.',
  'dh.time.build.0':
    'Ainda está subindo. O tema fica mais alto ao longo dos próximos dias antes de virar.',
  'dh.time.build.1':
    'Este ainda não chegou à força total; espere que continue subindo por um tempo antes de coroar.',
  'dh.time.build.2':
    'Você está na encosta inicial disso. O que agora se lê como um sinal fraco vira inconfundível dentro de uma semana mais ou menos.',
  'dh.time.fade.0':
    'Acabou de passar do exato — o fio mais afiado já passou e a pressão está se soltando.',
  'dh.time.fade.1':
    'O pico deste já ficou para trás. O que sobra é integração, não crise.',
  'dh.time.fade.2':
    'Este contato está de saída. Você está arrumando depois dele, não vivendo o pior dele.',

  'dh.retro':
    ' Por estar retrógrado, isso é uma revisão mais do que uma primeira passada — você volta sobre um terreno que já percorreu, desta vez para fazer certo.',

  /* -- modelos de montagem da seção -- */
  'dh.sec.open':
    '{tr} Agora mesmo, ela {verb} {target} — a parte de você que governa {na}.',
  'dh.sec.sign':
    'Seu {target} de nascimento está em {sign} — {signFlavour} — o que molda como tudo isso aterrissa para você.',
  'dh.sec.aspect': '{aspectNature} {timing}{retro}',
  'dh.sec.close': '{life} {invite} {do}',

  /* -- a visão geral: três parágrafos curtos -- */
  'dh.ov.lead':
    'Esta leitura é tirada de onde os planetas de fato estão hoje, posta diante do seu mapa de nascimento — então fala do seu céu, não do céu em geral.',
  'dh.ov.head':
    'O centro de gravidade agora mesmo é {a} {aspectWord} {b}. {trMeaning}',
  'dh.ov.weather.supportive':
    'O clima geral é favorável: os contatos fáceis pesam claramente mais que os difíceis. É um trecho para ir atrás de algo em vez de se blindar contra — o principal jeito de desperdiçar é ficar parado.',
  'dh.ov.weather.friction':
    'O clima geral é exigente. Há mais atrito que fluxo na mistura, e várias coisas querem ser encaradas de frente em vez de desejadas para longe. Nada disso é um desastre; é uma fase de construção, e fases de construção se sentem como esforço.',
  'dh.ov.weather.intense':
    'O clima geral é pesado e concentrado. Planetas lentos estão sentados bem em cima do seu mapa, e o volume está alto em tudo o que tocam. Dose-se — é um trecho de maratona, não uma corrida curta.',
  'dh.ov.weather.mixed':
    'O clima geral é misto — apoio real e atrito real dentro da mesma janela. O trabalho deste período é escolher onde se gastar e onde se conter.',
  'dh.ov.weather.quiet':
    'O clima geral está quieto. Nenhum planeta aperta forte no seu mapa, o que faz deste um trecho raro para fixar a sua própria agenda e o seu ritmo sem o céu discordar.',
  'dh.ov.tempo.fast':
    'O tempo é rápido — os contatos estão apertados e em movimento, então os temas chegam e passam em questão de dias. Fique reativo em vez de tentar planejar tudo de antemão.',
  'dh.ov.tempo.building':
    'O tempo é de construção lenta. Os temas principais ainda estão juntando força, então o que agora parece uma indireta vai ser inconfundível em uma semana ou duas.',
  'dh.ov.tempo.slow':
    'O tempo é lento e estrutural. Os grandes contatos aqui se desdobram ao longo de meses, não de dias; pense em estações e não espere um veredito da noite para o dia.',
  'dh.ov.tempo.settling':
    'O tempo está se assentando — os contatos mais afiados acabaram de passar do pico, então isso é mais sobre integrar o que já aconteceu do que se blindar para o que vem.',

  /* -- o parágrafo da Lua, ampliado -- */
  'dh.moon.lead': 'Seu clima emocional',
  'dh.moon.body':
    'A Lua está atravessando {sign} — {mood} — e é {phase} a {pct}% de luz. {phaseNote} Deixe o seu humor ser informação mais do que um veredito: ele está te dizendo como se sente por dentro este trecho de céu.',

  /* -- os fios: o que fica se repetindo -- */
  'scr.horo.threadsHead': 'Os fios que conectam',
  'dh.th.house':
    'Sua casa {ord} não para de aparecer. Aconteça o que acontecer, {houseThemeLower} é o cômodo em que estão te pedindo para passar tempo neste período.',
  'dh.th.planet':
    'Seu {planet} de nascimento está sendo trabalhado de mais de um ângulo ao mesmo tempo. Como ele segura {na}, conte que seja uma nota recorrente e não algo pontual.',
  'dh.th.bal.friction':
    'E a balança pende para o atrito. Isso não é azar — é como uma fase de crescimento se sente por dentro. O esforço é a tarefa.',
  'dh.th.bal.supportive':
    'E a balança pende para o fluxo. Os contatos de apoio superam em número os difíceis, então as portas estão de fato abertas — o único jeito de desperdiçar isso é não atravessar nenhuma.',
  'dh.th.bal.mixed':
    'E a balança está de fato dividida. Parte disso te apoia e parte te resiste, muitas vezes no mesmo dia, então o discernimento importa mais que a energia agora.',
  'dh.th.solo':
    'Os contatos estão espalhados pelo seu mapa em vez de se amontoarem sobre um ponto, então isso se lê como um período variado mais do que como uma única história dominante.',

  /* -- o mapa do timing -- */
  'scr.horo.timingHead': 'Como isso se desdobra',
  'dh.tm.tight':
    'Apertando rumo ao exato: {list}. São as vozes mais altas no seu céu agora mesmo e vão atingir o pico em questão de dias.',
  'dh.tm.fade':
    'Passado o pico e desaparecendo: {list}. A lição destes já foi em grande parte assimilada — você integra agora, não se blinda.',
  'dh.tm.none':
    'Nada está sentado bem no exato no momento, o que é parte do motivo de o período parecer mais aberto do que pontiagudo.',

  /* -- o arco de fechamento -- */
  'dh.cl.protect':
    'O arco mais amplo pede que você proteja o seu {focus} ao longo deste trecho. Menos compromissos, noites mais cedo e permissão para estar menos disponível do que o normal — você vai receber mais de volta guardando a sua energia do que gastando-a. É uma estação para cuidar do terreno, não para forçar a colheita.',
  'dh.cl.use':
    'O arco mais amplo é uma janela aberta em torno do seu {focus}, e janelas assim não ficam abertas por muito tempo. Aponte-a para uma coisa que de fato importa para você e ponha peso real por trás agora, enquanto o céu ajuda em vez de resistir.',
  'dh.cl.steady':
    'O arco mais amplo pede firmeza. Mantenha as suas rotinas, mantenha a palavra dada a si mesmo e deixe o barulho passar sem correr atrás de cada pedaço. Nem todo trânsito precisa de resposta; alguns só precisam ser sobrevividos.',

  /* ======================= COMPATIBILIDADE — PROFUNDA ======================= */

  'syn.deep.patternLead': 'Do que este vínculo vive',
  'syn.deep.pattern.emotional':
    'No seu núcleo, isto é uma conexão emocional. As Luas e Vênus carregam a maior parte do peso entre vocês, o que torna o vínculo caloroso, instintivo e rápido para se sintonizar — e significa que são os humores, não as discussões, que fixam a temperatura. Quando os dois estão firmes, é macio e fácil e o lar se sente como lar rápido. Quando um de vocês não está bem, o outro sabe em minutos, dita ou não uma palavra. A consequência prática é que cuidar do seu próprio estado interno não é separado de cuidar da relação; é o mesmo trabalho. Aprenda a nomear um sentimento cedo, antes de virar clima, e esta conexão vai aguentar quase qualquer coisa.',
  'syn.deep.pattern.mental':
    'No seu núcleo, isto é um encontro de mentes. Vocês se conectam primeiro por palavras, ideias, curiosidade e o prazer de ser entendido depressa, e a faísca fica acesa exatamente enquanto durar a conversa. Isso é uma força de verdade — vocês nunca vão entediar um ao outro e resolvem bem os problemas em dupla. O risco é mais sutil: é possível confundir uma boa conversa com intimidade e viver um pouco acima do pescoço, trocando pensamentos enquanto a camada do sentir fica sem cuidado. Abram espaço para as partes da proximidade que não são verbais — um silêncio compartilhado, uma refeição, uma tarefa feita lado a lado — e a conexão mental vira um alicerce em vez de um substituto.',
  'syn.deep.pattern.physical':
    'No seu núcleo, isto é uma conexão de impulso e corpo. Marte e o Sol fazem o trabalho pesado, então há química de verdade e impulso de verdade aqui — vocês se energizam mutuamente, fazem as coisas acontecerem quando estão juntos e funcionam bem como time quando há uma tarefa a fazer. A mesma fiação significa que vocês podem irritar um ao outro igual de rápido; a competitividade e a irritação são o lado de sombra da atração. A solução não é reprimir o calor, mas mirá-lo. Deem a ele uma direção compartilhada — um projeto, um plano, um desafio, até uma briga limpa com regras — e a intensidade trabalha a favor de vocês em vez de se voltar para dentro.',
  'syn.deep.pattern.karmic':
    'No seu núcleo, esta pesa. Saturno e Plutão estão na mistura, o que traz um senso de consequência ao vínculo — como se vocês estivessem aqui para resolver algo juntos e não só para passar o tempo de forma agradável. Conexões assim tendem a se sentir significativas cedo e a pedir mais das duas pessoas do que um par mais leve pediria. Bem conduzida, vira profundamente leal e duradoura, do tipo de vínculo que sobrevive às coisas. Conduzida com descuido, fica pesada — obrigação disfarçada de proximidade, ou uma lenta luta de poder que ninguém nomeia. A diferença está quase toda em se os dois seguem escolhendo isso em voz alta, de propósito, em vez de ficar porque sair parece um fracasso.',

  'syn.deep.chemHead': 'A química entre vocês',
  'syn.deep.chem.strong':
    'A atração aqui está bem amparada. Os contatos entre os mapas de vocês que governam o desejo e o afeto são em grande parte harmônicos, o que costuma se traduzir numa química que se sente natural mais do que tensa — vocês se atraem de um jeito que não custa muito para sustentar. Aproveite, e não tome isso como prova de que o resto da relação vai se conduzir sozinho; a facilidade num departamento não substitui o esforço nos outros.',
  'syn.deep.chem.mixed':
    'A atração aqui tem corrente e também aspereza. Alguns dos contatos entre os mapas de vocês os juntam com calor; outros somam atrito a essa mesma puxada, o que pode se ler como uma química com fio — magnética, às vezes enlouquecedora, raramente sem graça. Esse tipo de faísca tende a durar mais que a sem atrito, justamente porque fica se regenerando. A tarefa é manter o fio brincalhão em vez de deixá-lo azedar num padrão de irritar um ao outro.',
  'syn.deep.chem.cool':
    'O desejo não é o fio mais alto entre os mapas de vocês. Os contatos que governam a atração estão quietos ou levemente desafiadores, o que não quer dizer que não haja faísca — só que esta conexão é mais provável de ser construída sobre outras coisas: entendimento compartilhado, respeito, confiabilidade, um encontro de valores. Relações fundadas nisso costumam demorar mais para acender e ser bem mais difíceis de romper.',

  'syn.deep.commHead': 'Como vocês se comunicam',
  'syn.deep.comm.easy':
    'A comunicação é uma força aqui. Os contatos de Mercúrio de vocês fluem, o que quer dizer que vocês tendem a acompanhar o pensamento um do outro, acertar as piadas e trabalhar um problema juntos sem muita perda na tradução. Use isso de propósito quando surgir algo difícil — vocês são melhores em falar as coisas do que a maioria dos casais, então não deixem as conversas difíceis serem as que vocês evitam.',
  'syn.deep.comm.work':
    'A comunicação aqui pede algum trabalho. Os contatos de Mercúrio de vocês carregam atrito, então vocês podem falar em paralelo — ritmos diferentes, lógica diferente, suposições diferentes sobre o que de fato foi combinado. Isso é administrável, mas precisa de um hábito: desacelere, repita o que ouviu e confira se vocês querem dizer a mesma coisa com a mesma palavra antes de seguir.',
  'syn.deep.comm.quiet':
    'Não há um contato de Mercúrio forte entre os mapas de vocês em nenhum sentido, o que costuma significar que a comunicação não é nem um dom óbvio nem um problema óbvio — é só algo que vocês vão construir de propósito em vez de cair dentro. Os pontos de checagem regulares e sem forçar importam mais para vocês do que para um casal que se lê automaticamente.',

  'syn.deep.growthLead': 'Onde isso te faz crescer',
  'syn.deep.growth.good':
    'A facilidade entre vocês é real, e é também o que vigiar. Quando uma conexão roda quase sozinha, é fácil ficar relaxado — parar de trazer a sua honestidade e o seu esforço plenos porque não precisou. O trunfo de vocês como casal é seguir aparecendo direito para algo que não exige: seguir dizendo a coisa verdadeira, seguir fazendo o esforço, seguir notando um ao outro. Não deixem «fácil» virar em silêncio «desatendido».',
  'syn.deep.growth.mid':
    'Os pontos de atrito entre vocês não são defeitos do par; são o currículo. Cada um marca um lugar onde os dois vão ter de se esticar — dizer a coisa difícil mais cedo, segurar o seu terreno com mais gentileza, parar de esperar ser lido e começar a ser claro. Casais que nomeiam essas tensões cedo e as tratam como trabalho compartilhado costumam se sair bem com o tempo. Casais que esperam que elas simplesmente se dissolvam costumam encontrar a mesma discussão por anos.',
  'syn.deep.growth.hard':
    'Esta conexão pede muito dos dois. Os contatos desafiadores entre os mapas de vocês não vão se dissolver sozinhos, então a relação só funciona se os dois tratarem a dificuldade como trabalho conjunto e não como culpa do outro. Isso é de fato possível — muitos vínculos duradouros são construídos sobre aspectos difíceis — mas é uma escolha que vocês vão ter de seguir fazendo, de novo e de novo e em voz alta, sobretudo nos trechos em que seria mais fácil ficar contando pontos.',

  'syn.deep.nameItLead': 'Diga esta parte em voz alta',
  'syn.deep.nameIt':
    'Se há uma coisa que vale nomear cedo em vez de esperar que se assente, é o contato {a}–{b}: {sentence} Não dito, tende a calcificar num padrão; dito com clareza e cedo, costuma se revelar menor do que parecia.',
  'syn.deep.nameIt.none':
    'Não há aqui um único ponto de atrito a cortar cedo — o que já vale saber. O trabalho nesta conexão é menos sobre desarmar uma questão e mais sobre ficar atento ao longo de tudo.',

  'syn.deep.longViewLead': 'A visão de longo prazo',
  'syn.deep.longView.good':
    'esta é o tipo de conexão que envelhece bem. Tende a ficar mais fácil em vez de mais difícil conforme vocês aprendem as bordas um do outro, e a facilidade do início costuma se aprofundar em algo mais firme e mais confiável com o tempo. A principal ameaça a ela é o descuido, não o conflito.',
  'syn.deep.longView.mid':
    'esta vira o que vocês fizerem dela. A matéria-prima é trabalhável — nem sem esforço nem condenada — e o resultado depende quase todo do esforço que os dois puserem durante o primeiro trecho, antes de os padrões se fixarem. Acertem os hábitos cedo e isto pode durar.',
  'syn.deep.longView.hard':
    'esta é intensa agora, e é provável que siga intensa. Vale a pena se profundidade e significado forem o que os dois de fato querem de uma relação. É desgastante se uma parte de você espera que acalme e vire algo fácil — essa provavelmente não é a tarefa aqui.',
} as const
