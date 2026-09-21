/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Basket, SalesCaption, WhatsAppScenario } from '../types';

export const INITIAL_BASKETS: Basket[] = [
  {
    id: '1',
    name: 'Cesta Amanhecer Premium',
    originalPrice: 197.00,
    description: 'A cesta de café da manhã mais desejada do catálogo. Traz uma experiência completa com pão artesanal fresquinho, frutas selecionadas, mel puro, cappuccino e uma caneca elegante de cerâmica.',
    image: '/src/assets/images/cesta_cafedamanha_1779744825057.png',
    category: 'breakfast',
    details: [
      'Pão rústico italiano feito no dia',
      'Geléia gourmet de morango (pote de vidro)',
      'Porção de morangos e uvas frescas seladas',
      'Garrafa térmica compacta de alta qualidade',
      '2 Canecas exclusivas de cerâmica esmaltada',
      'Arranjo de flores secas decorativas'
    ]
  },
  {
    id: '2',
    name: 'Cesta Paixão & Romance',
    originalPrice: 247.00,
    description: 'Perfeita para comemorar aniversários de namoro, casamento ou datas especiais. Acompanha rosas vermelhas premium, chocolates artesanais finos e laço de cetim digno de presente de luxo.',
    image: '/src/assets/images/cesta_romantica_1779744841362.png',
    category: 'romantic',
    details: [
      '6 Rosas vermelhas frescas com botões abertos',
      'Caixa de trufas recheadas feitas à mão',
      'Suco de uva integral premium frisante',
      'Taças de vidro jateado para celebração',
      'Cartão especial dobrável para dedicatória',
      'Laço duplo em fita de cetim rubi'
    ]
  },
  {
    id: '3',
    name: 'Cesta Delícia Suprema de Chocolate',
    originalPrice: 159.00,
    description: 'Um paraíso para os chocólatras de plantão. Coberta com trufas douradas, barras artesanais premium de alta porcentagem de cacau e cookies crocantes com gotas gigantes de chocolate, finalizados por um laço reluzente.',
    image: '/src/assets/images/cesta_chocolate_1779744857443.png',
    category: 'chocolate',
    details: [
      'Caixa de trufas douradas com recheio cremoso',
      'Barra de chocolate amargo artesanal 70%',
      'Pacote grande de cookies com gotas generosas',
      'Quiches pequenas de chocolate branco e nozes',
      'Embalagem cartonada preta rígida de grife',
      'Fita de luxo dourada cintilante'
    ]
  }
];

export const SALES_CAPTIONS: SalesCaption[] = [
  {
    id: 'cap1',
    title: '☕ Bom dia Especial',
    category: 'Café da Manhã',
    text: 'Que tal começar o dia surpreendendo quem você mais ama? ☀️💖\n\nA nossa Cesta Amanhecer Premium foi pensada nos mínimos detalhes para transformar uma manhã comum em um momento mágico, com pães artesanais fresquinhos, frutas selecionadas e aquela caneca de cerâmica linda para guardar de recordação.\n\n✨ Perfeita para aniversários, agradecimentos ou só para dizer "eu te amo"! 💌\n\n💬 Garanta a sua agora mesmo pelo link da bio ou enviando uma mensagem no nosso Direct!'
  },
  {
    id: 'cap2',
    title: '❤️ Aniversário ou Comemoração',
    category: 'Românticas',
    text: 'Corações batendo mais forte... 😍🌹\n\nCelebrar o amor é lembrar das pequenas e grandes coisas que conectam vocês. E nada fala mais alto do que a nossa Cesta Paixão & Romance. Com rosas frescas, bombons recheados finos e um brinde especial para brindar esse vínculo incrível!\n\n🎁 Uma experiência inesquecível para o seu amor.\n\n👇 Toque no botão abaixo e faça sua reserva com frete grátis para nossa região!'
  },
  {
    id: 'cap3',
    title: '🍫 Presente Irresistível',
    category: 'Chocolates',
    text: 'Procurando o presente à prova de falhas? 🤩🍫\n\nA Cesta Delícia Suprema de Chocolate é aquele carinho em formato de trufas douradas, cookies e chocolates selecionados que aquecem qualquer coração. Ideal para presentear amigas, mães, ou para se deliciar na sexta-feira à noite!\n\n🛍️ Faça sua encomenda hoje e garanta a entrega agendada direto na porta de quem você quer ver sorrir!'
  },
  {
    id: 'cap4',
    title: '🌟 Chamada Rápida nos Stories',
    category: 'Stories',
    text: '⚠️ APENAS 3 VAGAS PARA ENTREGA NESTE SÁBADO!\n\nQuem quer acordar alguém especial com uma surpresa de arrancar suspiros? 🥹🧺\n\nNossas cestas de café da manhã estão com as últimas vagas abertas para produção artesanal essa semana. Não deixe para a última hora!\n\n👉 Envie "EU QUERO" no direct e garanta a sua!'
  }
];

export const WHATSAPP_SCENARIOS: WhatsAppScenario[] = [
  {
    id: 'sce1',
    title: 'Quando o cliente pergunta o preço',
    description: 'Como responder gerando conexão e percepção de valor alto em vez de só mandar o preço e assustador.',
    sellerTip: 'Dica de Ouro: Nunca dê o preço de cara sem antes destacar o carinho e o que vem incluído. Mostre fotos antes para criar desejo visual primeiro!',
    messages: [
      {
        id: 'm1_1',
        sender: 'customer',
        text: 'Olá! Quanto custa a cesta de café da manhã com caneca?',
        timestamp: '14:20'
      },
      {
        id: 'm1_2',
        sender: 'seller',
        text: 'Olá! Tudo bem? Fico muito feliz pelo seu interesse! 🥰 Ela é disparada a favorita por aqui para despertar sorrisos logo cedo.',
        timestamp: '14:21'
      },
      {
        id: 'm1_3',
        sender: 'seller',
        text: 'Ela é montada com muito carinho e inclui pão rústico artesanal fresquinho, frutas selecionadas do dia, suco gourmet, mel puro artesanal e uma caneca de cerâmica esmaltada linda para guardar de lembrança. Vai em uma cesta decorada com laço de cetim pronto para presente.',
        timestamp: '14:21'
      },
      {
        id: 'm1_4',
        sender: 'seller',
        text: `Nós temos ela em duas versões personalizadas. Essa versão Premium completa com a caneca sai por apenas [PREÇO_ATUAL]. Para quando seria essa surpresa especial?`,
        timestamp: '14:22'
      }
    ]
  },
  {
    id: 'sce2',
    title: 'Quando a cliente some (Recuperação)',
    description: 'Como trazer de volta aquela cliente que perguntou tudo, demonstrou interesse, mas parou de responder.',
    sellerTip: 'Dica de Ouro: Muitas vezes elas apenas esqueceram ou se distraíram com a rotina e as crianças. Uma mensagem carinhosa relembrando e gerando escassez resolve na hora.',
    messages: [
      {
        id: 'm2_1',
        sender: 'seller',
        text: 'Olá, Maria! Tudo bem por aí? Passando para te dar um oi carinhoso!🌸',
        timestamp: '10:00'
      },
      {
        id: 'm2_2',
        sender: 'seller',
        text: 'Como hoje é nosso último dia de fechamento de pedidos de pão fresco para o final de semana, lembrei de você e da surpresa que queria fazer.',
        timestamp: '10:01'
      },
      {
        id: 'm2_3',
        sender: 'seller',
        text: 'Consegui reservar uma caneca da cor que você gostou por aqui. Se você quiser confirmar, me avisa até às 13h para eu já deixar agendado na nossa rota de entregas e garantir que chegue bem quentinho? Te ajudo a fechar?',
        timestamp: '10:02'
      },
      {
        id: 'm2_4',
        sender: 'customer',
        text: 'Oi, querida! Ai, que bom que ligou o alerta! Quero sim, por favor. Quase esqueci com a correria aqui das crianças! Como faço o Pix?',
        timestamp: '10:15'
      }
    ]
  }
];

export const VSL_SCRIPT_SUBTITLES = [
  { time: 0, text: "Oi, parabéns pela sua decisão!" },
  { time: 3, text: "Mas não fecha essa página ainda…" },
  { time: 6, text: "Porque tem uma coisa que pode te impedir de vender..." },
  { time: 9, text: "...logo na primeira divulgação." },
  { time: 12, text: "Quando a cliente perguntar: \"Você tem foto?\"…" },
  { time: 16, text: "...o que você vai mandar?" },
  { time: 19, text: "Porque a verdade é uma só:" },
  { time: 21, text: "Foto amadora afasta cliente." },
  { time: 24, text: "E muitas vezes ela some sem responder…" },
  { time: 27, text: "...sem comprar, sem nem perguntar o preço." },
  { time: 31, text: "Por isso eu preparei o Catálogo Pronto para Vender." },
  { time: 35, text: "Com fotos profissionais das cestas." },
  { time: 38, text: "Descrições prontas." },
  { time: 40, text: "Tudo organizado pra você postar no Instagram..." },
  { time: 43, text: "...ou mandar no WhatsApp." },
  { time: 46, text: "Você não precisa fotografar nada." },
  { time: 49, text: "Não precisa escrever nada." },
  { time: 51, text: "Só colocar o seu preço e enviar." },
  { time: 54, text: "Mulheres que usaram esse catálogo..." },
  { time: 57, text: "...venderam já nas primeiras horas de divulgação!" },
  { time: 61, text: "Hoje, só nessa página..." },
  { time: 63, text: "...você pode garantir acesso por apenas R$ 37." },
  { time: 67, text: "E se não gostar — me manda mensagem em 7 dias..." },
  { time: 71, text: "...e eu devolvo cada centavo." },
  { time: 73, text: "Sem perguntas. Sem burocracia. O risco é todo meu." },
  { time: 77, text: "Clica no botão abaixo agora." },
  { time: 80, text: "Você já decidiu começar." },
  { time: 83, text: "Não deixa uma foto feia ser o motivo..." },
  { time: 86, text: "...de perder sua primeira venda." },
  { time: 89, text: "O catálogo tá pronto te esperando." }
];

export const STUDENT_TESTIMONIALS = [
  {
    name: 'Aline Souza',
    role: 'Mãe de 2 filhos, Campinas - SP',
    text: 'Eu ficava morrendo de vergonha de divulgar porque minhas fotos ficavam escuras e a cesta parecia murcha. Comprei o catálogo, troquei as fotos no meu WhatsApp e, juro, em 3 horas fechei duas encomendas pra entrega no sábado! Foi a melhor decisão do ano.',
    avatar: '👩‍👧‍👦'
  },
  {
    name: 'Carla Beatriz',
    role: 'Dona de Casa, Salvador - BA',
    text: 'A Fábrica de Cestas me deu o manual do que comprar e como fazer, mas o Catálogo Pronto me deu as vendas! O script de atendimento salvou minhas clientes que sumiam sem pagar. Já recuperei o valor na primeira tarde!',
    avatar: '🌸'
  },
  {
    name: 'Renata Moreira',
    role: 'Ex-Desempregada, Curitiba - PR',
    text: 'Só de não precisar gastar dinheiro comprando as primeiras cestas para tirar foto eu já economizei mais de 100 reais de cara. Mostrei as fotos do catálogo para as minhas vizinhas no grupo e uma delas já me encomendou pro aniversário do marido. Super recomendo!',
    avatar: '✨'
  }
];
