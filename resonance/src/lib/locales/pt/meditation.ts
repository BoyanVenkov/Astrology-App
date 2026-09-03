import type { MeditationKey } from '../en/meditation'

/** Português — meditações guiadas: um resumo lido uma vez, depois passos marcados por uma tigela. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'a base da coluna, onde você encontra o chão',
  'med.seat.sacral': 'o baixo-ventre, uma palma abaixo do umbigo',
  'med.seat.solar-plexus': 'o ponto macio sob as costelas',
  'med.seat.heart': 'o centro do peito',
  'med.seat.throat': 'a cova da garganta',
  'med.seat.third-eye': 'o espaço entre as sobrancelhas',
  'med.seat.crown': 'o topo da cabeça, e um pouco acima',
  'med.chakraLower': 'o centro {chakra}',

  'med.house.1': 'como você se apresenta e como encontra o mundo',
  'med.house.2': 'o que você valoriza e o que te estabiliza',
  'med.house.3': 'sua mente cotidiana e as palavras que você usa',
  'med.house.4': 'lar, raízes, e onde você se sente sustentado',
  'med.house.5': 'brincadeira, criatividade, e o que te dá alegria',
  'med.house.6': 'o trabalho cotidiano de cuidar de si',
  'med.house.7': 'as pessoas mais próximas de você',
  'med.house.8': 'o que termina, e o que você partilha em profundidade',
  'med.house.9': 'o sentido, e a visão mais ampla',
  'med.house.10': 'seu trabalho no mundo e como você é visto',
  'med.house.11': 'sua gente, e para o que você se estende',
  'med.house.12': 'descanso, solidão, e a quietude sob tudo',

  'med.invite.Sun': 'Deixe um calor estável se juntar aqui — sua própria luz, sem rodeios.',
  'med.invite.Moon': 'Deixe o que você sente simplesmente estar aqui, sem precisar consertar.',
  'med.invite.Mercury': 'Deixe o pensamento desacelerar. Você não precisa resolver nada agora.',
  'med.invite.Venus': 'Amoleça em direção a si como faria com alguém que ama.',
  'med.invite.Mars': 'Note qualquer calor ou urgência, e deixe a expiração levar parte dele.',
  'med.invite.Jupiter': 'Deixe este espaço se sentir um pouco mais amplo do que há um momento.',
  'med.invite.Saturn': 'Encontre o peso aqui com honestidade. Você aguenta mais do que pensa.',
  'med.invite.Uranus': 'Deixe algo se soltar — um aperto, uma forma velha que não te serve mais.',
  'med.invite.Neptune': 'Deixe os contornos se dissiparem. Você tem permissão para não saber por um tempo.',
  'med.invite.Pluto': 'Deixe o que terminou terminar. Respire no espaço que isso deixa.',
  'med.invite.default': 'Deixe esta energia se mover através de você, não para dentro de você.',

  'med.ease.hard': 'Hoje há atrito em {dominant}. Você não está aqui para forçar a passagem — só para senti-lo com clareza e ficar macio ao redor.',
  'med.ease.soft': '{dominant} flui hoje. Note a facilidade, e permita-se recebê-la.',
  'med.ease.neutral': '{dominant} está intenso hoje. Deixe-o te atravessar em vez de se alojar no corpo.',

  'med.dominant.aspect': '{planet} {verb} o seu {other} natal',
  'med.dominant.sign': '{planet} em trânsito por {sign}',
  'med.dominant.chartWord': 'mapa',
  'med.domverb.conjunction': 'encontrando',
  'med.domverb.opposition': 'em oposição a',
  'med.domverb.square': 'em quadratura com',
  'med.domverb.trine': 'em trígono com',
  'med.domverb.sextile': 'em sextil com',

  'med.houseLine.known': 'Isso toca a parte da sua vida que trata de {theme}. Segure com leveza. Não há nada a decidir aqui — só a notar.',
  'med.houseLine.unknown': 'Seja o que for que isso mexa na sua vida, deixe pousar pela duração desta prática. Ainda estará lá quando você terminar, e você o encontrará com mais espaço.',

  'med.mantraLong.root': 'Estou seguro. Estou aqui. Tenho o que preciso.',
  'med.mantraLong.sacral': 'Deixo a vida se mover através de mim.',
  'med.mantraLong.solar-plexus': 'Confio no meu fogo.',
  'med.mantraLong.heart': 'Dou e recebo amor livremente.',
  'med.mantraLong.throat': 'Digo minha verdade com facilidade.',
  'med.mantraLong.third-eye': 'Confio no que vejo por dentro.',
  'med.mantraLong.crown': 'Sou parte de algo vasto, e isso me sustenta.',

  'med.title.fallback': 'meditação do centro {chakra}',

  /* ---- o resumo, lido uma vez antes de começar ---- */
  'med.brief.lead': 'Leia isto uma vez, depois feche os olhos. Cada passo abre com uma tigela — fique com ele até a próxima.',
  'med.brief.close': 'Três tigelas suaves encerram a prática. Volte no seu próprio ritmo.',

  /* ---- passos genéricos ---- */
  'med.step.settle': 'Olhos fechados. Deixe o corpo assentar e a respiração desacelerar por conta própria.',
  'med.step.breath': 'Apoie a atenção na respiração — siga-a ao entrar, siga-a ao sair. Quando a mente vagar, esse perceber é a prática. Volte, com suavidade.',
  'med.step.centre': 'Leve sua atenção a {seat}. Respire como se a própria respiração alcançasse o {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Em silêncio, no ritmo da respiração: {affirmation}',
  'med.step.close': 'Solte a prática. Note como você se sente agora, antes de abrir os olhos.',

  /* ---- consciência da respiração ---- */
  'med.step.ba.count': 'Agora conte cada expiração — de um a dez, depois recomece. Se perder a conta, simplesmente comece do um. Ninguém está marcando pontos.',

  /* ---- varredura corporal ---- */
  'med.step.scan.0': 'Percorra a atenção lentamente das plantas dos pés para cima — tornozelos, pernas, quadris, ventre, costas, peito, braços, mãos. Descanse algumas respirações onde encontrar tensão, e deixe amolecer.',
  'med.step.scan.1': 'Agora os ombros, a garganta, a mandíbula, o espaço ao redor dos olhos, o couro cabeludo. Depois sinta o corpo inteiro de uma vez — pesado, quente, respirando sozinho.',

  /* ---- bondade amorosa ---- */
  'med.step.metta.0': 'Traga você mesmo à mente, exatamente como está hoje. Em silêncio ofereça: que eu esteja seguro, que eu esteja bem, que eu esteja em paz. Repita devagar e permita-se dizer de verdade.',
  'med.step.metta.1': 'Traga à mente alguém que você ama com facilidade. Imagine o rosto e ofereça o mesmo: que você esteja seguro, que você esteja bem, que você esteja em paz.',
  'med.step.metta.2': 'Agora amplie — alguém que você mal conhece, alguém que você acha difícil, depois todos, em todo lugar: que todos os seres estejam seguros, que todos os seres estejam em paz.',

  /* ---- banho de som ---- */
  'med.step.bath.0': 'Deixe o tom vir para o primeiro plano. Você não escuta com esforço — deixa o som chegar, do jeito que a luz chega.',
  'med.step.bath.1': 'Note em que parte do corpo o som parece pousar — o peito, o crânio, as mãos. Deixe o espaço entre você e o som se dissolver.',

  /* ---- gratidão ---- */
  'med.step.grat.0': 'Traga à mente uma coisa do último dia que foi bem, por menor que seja. Não apenas nomeie — sinta onde a gratidão se assenta no corpo.',
  'med.step.grat.1': 'Agora algo que você costuma considerar garantido — um corpo que funciona, um teto, alguém que ficou. Fique com isso algumas respirações.',
  'med.step.grat.2': 'Mais uma — algo sobre você. Um jeito como você se mostrou presente, algo que você lidou, um esforço que ninguém viu. Segure as três juntas.',

  /* ---- lugar seguro ---- */
  'med.step.safe.0': 'Imagine um lugar onde você se sente completamente seguro — real ou imaginado. Olhe devagar: a luz, a hora do dia, o que você ouve, o que sente contra a pele.',
  'med.step.safe.1': 'Encontre o ponto aqui onde você mais gostaria de descansar, e vá até lá. Nada é exigido de você. Nada alcança você que você não permita.',

  /* ---- montanha ---- */
  'med.step.mtn.0': 'Imagine uma montanha — sua base larga, suas encostas firmes, seu cume imóvel. Deixe seu corpo e a montanha se tornarem a mesma forma: o assento como base, a coluna como encosta, a cabeça como cume.',
  'med.step.mtn.1': 'O tempo vai e vem ao redor da montanha — luz, nuvem, vento, tempestade. Seus pensamentos e humores são o tempo. A montanha não discute com ele, e não fica menor por causa dele.',

  /* ---- consciência aberta ---- */
  'med.step.open.0': 'Solte a âncora da respiração. Deixe a atenção bem aberta, não em nada em particular. Sons, sensações, pensamentos surgem e passam — você não os persegue nem os afasta.',
  'med.step.open.1': 'Note que a consciência em si não se move. As coisas acontecem dentro dela, como as nuvens acontecem dentro do céu. Descanse como esse céu — nada a acrescentar, nada a remover.',

  /* ---- intenção da manhã ---- */
  'med.step.morn.0': 'Três respirações mais cheias, um pouco mais fundas que o normal — deixe-as acordar o corpo por dentro. Gire os ombros para trás uma vez e sinta a frente do corpo se abrir.',
  'med.step.morn.1': 'Traga o dia que vem à mente, sem apertar, depois escolha uma intenção — não uma tarefa, um jeito de ser. Paciente. Honesto. Corajoso. Gentil. Diga uma vez: hoje, serei ___.',

  /* ---- liberação da noite ---- */
  'med.step.eve.0': 'Deixe o dia passar leve, como a paisagem pela janela de um trem — manhã, meio-dia, noite. Não pare em nada. Se um momento puxar, anote e diga: agora não.',
  'med.step.eve.1': 'Encontre um momento pelo qual você está contente que aconteceu, e uma coisa que você fez tão bem quanto pôde. Que isso baste. Agora solte o dia inteiro — está completo simplesmente porque acabou.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Deite-se completamente imóvel — mais imóvel do que parece natural, só a respiração se move. Defina uma intenção breve, uma única frase calma no presente. Diga-a por dentro três vezes.',
  'med.step.nidra.1': 'Leve a atenção a cada ponto conforme é nomeado, sem se mexer — mão direita: polegar, dedos, palma, punho, antebraço, cotovelo, ombro. Depois o mesmo à esquerda.',
  'med.step.nidra.2': 'Ambos os quadris. Perna direita — coxa, joelho, canela, tornozelo, pé, dedos. Perna esquerda igual. Todas as costas contra o chão, o ventre subindo e descendo, o peito, a garganta.',
  'med.step.nidra.3': 'O rosto — mandíbula, lábios, nariz, bochechas, olhos, o espaço entre as sobrancelhas, o couro cabeludo. Agora o corpo inteiro de uma vez, brilhando de leve, sustentado pelo chão. Volte à sua intenção.',
}
