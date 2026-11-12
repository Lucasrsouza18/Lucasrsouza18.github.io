/* =========================================================
   CONFIGURE AQUI: seus links de contato
   ========================================================= */
const CONFIG = {
  name: "Lucas Ribeiro de Souza",
  email: "lucasr.souza18@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucas-ribeiro-862273413",
  github: "https://github.com/Lucasrsouza18",
  resume: "",                                      // opcional: "assets/curriculo.pdf"
  location: "São Paulo, Brasil",
};

/* =========================================================
   TEXTOS (PT / EN)
   ========================================================= */
const I18N = {
  pt: {
    "nav.projects": "Projetos", "nav.journey": "Trajetória", "nav.contact": "Contato",
    "hero.status": "Disponível para oportunidades em tecnologia",
    "hero.hi": "Olá, eu sou", "hero.i_build": "Eu construo",
    "hero.sub": "Da logística do Exército Brasileiro para a inteligência artificial. Uso IA aplicada e machine learning para criar produtos, automações e interfaces interativas, do protótipo ao deploy.",
    "hero.cta1": "Ver projetos", "hero.cta2": "Explorar pelo terminal", "hero.scroll": "role",
    "stats.projects": "projetos construídos", "stats.ai": "produtos com IA generativa", "stats.years": "anos em operações e liderança",
    "projects.title": "Projetos que eu construí",
    "projects.lead": "Clique em um card para ver o problema, a solução, a stack e os detalhes técnicos.",
    "journey.title": "Uma carreira construída em operação",
    "journey.lead": "Disciplina, processos e liderança vieram antes do código. Hoje, eles definem como eu desenvolvo.",
    "skills.title": "Ferramentas na prática",
    "skills.lead": "Clique em uma tecnologia para ver em quais projetos ela foi usada.",
    "skills.pick": "// selecione uma tecnologia",
    "contact.title": "Vamos construir algo juntos?",
    "contact.lead": "Busco minha primeira posição em tecnologia, com foco em IA aplicada, machine learning ou análise de sistemas. Aberto a conversas, projetos e indicações.",
    "footer.tip": "dica: aperte", "footer.tip2": "para abrir o terminal",
    typed: ["SaaS com IA.", "interfaces interativas.", "automações inteligentes.", "produtos do zero ao deploy."],
    filters: { all: "Todos", ai: "IA", fullstack: "Full-stack", interactive: "Interativo", automation: "Automação" },
    ui: {
      details: "ver detalhes", live: "no ar", proto: "protótipo", problem: "O problema", solution: "A solução",
      highlights: "Destaques técnicos", stack: "Stack", role: "Papel", visit: "Abrir site", prev: "← anterior", next: "próximo →",
      usedIn: "Usado em", projects: "projeto(s)", noProjects: "Base de estudos e trabalho, ainda sem projeto público.",
      expand: "+ detalhes", collapse: "− fechar", strong: "usado em projetos", learning: "estudando",
      copy: "copiar", copied: "copiado!",
    },
  },
  en: {
    "nav.projects": "Projects", "nav.journey": "Journey", "nav.contact": "Contact",
    "hero.status": "Open to opportunities in tech",
    "hero.hi": "Hi, I'm", "hero.i_build": "I build",
    "hero.sub": "From Brazilian Army logistics to software development. I build web products with applied AI, automations and interactive interfaces, from prototype to deploy.",
    "hero.cta1": "See projects", "hero.cta2": "Explore via terminal", "hero.scroll": "scroll",
    "stats.projects": "projects built", "stats.ai": "generative AI products", "stats.years": "years in operations & leadership",
    "projects.title": "Things I've built",
    "projects.lead": "Click a card to see the problem, the solution, the stack and the technical details.",
    "journey.title": "A career built in operations",
    "journey.lead": "Discipline, processes and leadership came before code. Today they shape how I build software.",
    "skills.title": "Tools in practice",
    "skills.lead": "Click a technology to see which projects used it.",
    "skills.pick": "// pick a technology",
    "contact.title": "Let's build something together?",
    "contact.lead": "I'm looking for my first role in tech, development, AI or systems analysis. Open to conversations, projects and referrals.",
    "footer.tip": "tip: press", "footer.tip2": "to open the terminal",
    typed: ["AI-powered SaaS.", "interactive interfaces.", "smart automations.", "products from zero to deploy."],
    filters: { all: "All", ai: "AI", fullstack: "Full-stack", interactive: "Interactive", automation: "Automation" },
    ui: {
      details: "see details", live: "live", proto: "prototype", problem: "The problem", solution: "The solution",
      highlights: "Technical highlights", stack: "Stack", role: "Role", visit: "Open site", prev: "← previous", next: "next →",
      usedIn: "Used in", projects: "project(s)", noProjects: "Study and work foundation, no public project yet.",
      expand: "+ details", collapse: "− close", strong: "used in projects", learning: "learning",
      copy: "copy", copied: "copied!",
    },
  },
};

/* =========================================================
   PROJETOS
   ========================================================= */
const PROJECTS = [
  {
    id: "leaf-chat", feature: true, cats: ["ai", "fullstack"], year: "2026",
    img: null, mock: "chat",
    stack: ["TypeScript", "Node.js", "Express", "React", "Vite", "PostgreSQL", "Prisma", "OpenAI API", "Zod", "Vitest", "Docker", "Railway"],
    pt: {
      title: "Leaf Chat", type: "SaaS · IA conversacional",
      short: "Plataforma SaaS multi-tenant de atendimento via WhatsApp com respostas geradas por IA.",
      problem: "Pequenas empresas perdem clientes porque não conseguem responder o WhatsApp rápido o bastante, e soluções prontas são caras ou genéricas.",
      solution: "Uma plataforma onde cada empresa se cadastra, conecta seu número da WhatsApp Cloud API e passa a ter um atendente com IA que conhece o seu negócio, com landing page, cadastro, login e painel próprio.",
      highlights: [
        "Arquitetura multi-tenant: a empresa é identificada pelo phone_number_id do webhook, com clientes e conversas isolados por tenant.",
        "Respostas geradas com a OpenAI Responses API, usando o histórico da conversa como contexto.",
        "Segurança: senhas com bcrypt, Helmet, rate limiting, validação de entrada com Zod e logs estruturados com Pino.",
        "Camadas separadas (rotas, serviços, repositórios) e testes de integração com Vitest + Supertest.",
        "Ambiente reproduzível com Docker Compose e deploy configurado para Railway.",
      ],
    },
    en: {
      title: "Leaf Chat", type: "SaaS · Conversational AI",
      short: "Multi-tenant SaaS for WhatsApp customer service with AI-generated replies.",
      problem: "Small businesses lose customers because they can't answer WhatsApp fast enough, and off-the-shelf tools are expensive or generic.",
      solution: "A platform where each company signs up, connects its WhatsApp Cloud API number and gets an AI agent that knows its business, with landing page, sign-up, login and its own dashboard.",
      highlights: [
        "Multi-tenant architecture: the company is resolved from the webhook's phone_number_id, with customers and conversations isolated per tenant.",
        "Replies generated with the OpenAI Responses API, using conversation history as context.",
        "Security: bcrypt password hashing, Helmet, rate limiting, Zod input validation and structured logging with Pino.",
        "Layered design (routes, services, repositories) and integration tests with Vitest + Supertest.",
        "Reproducible environment with Docker Compose and deploy configured for Railway.",
      ],
    },
  },
  {
    id: "mend", cats: ["ai", "fullstack"], year: "2026",
    img: "assets/mend.jpg",
    stack: ["Next.js", "React", "TypeScript", "OpenAI API", "Cloudflare Workers", "Cloudflare D1", "Drizzle ORM", "Tailwind CSS"],
    pt: {
      title: "MEND Creative Studio", type: "Web app · IA generativa",
      short: "Estúdio criativo que transforma um briefing em conceitos e roteiros de vídeo com IA.",
      problem: "Creators e marcas sabem o que querem gravar, mas travam na hora de transformar a ideia em roteiro com minutagem, checklist e plano B.",
      solution: "Um briefing guiado (público, tema, objetivo, equipamento, duração) que gera três conceitos com IA e desenvolve o escolhido em roteiro de 15, 30 ou 60 segundos, pronto para gravar.",
      highlights: [
        "Integração server-side com a OpenAI Responses API: a chave nunca chega ao navegador.",
        "Limite de 12 gerações por hora por pessoa, com reserva atômica de cota no Cloudflare D1 e devolução automática em caso de falha.",
        "Minutagem determinada pelo servidor; edição, cópia e exportação TXT; até 30 projetos salvos localmente.",
        "Modo de exemplo offline, explicitamente identificado, que funciona sem API.",
        "Mural de vídeos com animação contínua que respeita prefers-reduced-motion.",
      ],
    },
    en: {
      title: "MEND Creative Studio", type: "Web app · Generative AI",
      short: "Creative studio that turns a brief into AI-generated video concepts and scripts.",
      problem: "Creators and brands know what they want to shoot, but get stuck turning the idea into a timed script with checklist and plan B.",
      solution: "A guided brief (audience, theme, goal, gear, length) that generates three AI concepts and develops the chosen one into a 15, 30 or 60-second script, ready to shoot.",
      highlights: [
        "Server-side integration with the OpenAI Responses API, the key never reaches the browser.",
        "12 generations per hour per user, with atomic quota reservation on Cloudflare D1 and automatic refund on failure.",
        "Server-computed timing; editing, copy and TXT export; up to 30 projects saved locally.",
        "Clearly labelled offline example mode that works without the API.",
        "Continuously animated video wall that respects prefers-reduced-motion.",
      ],
    },
  },
  {
    id: "proud", cats: ["fullstack"], year: "2026", live: "https://proud-two.vercel.app",
    img: null, mock: "cal",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Zod", "Vercel"],
    pt: {
      title: "Proud", type: "Web app · Produtividade",
      short: "Organizador profissional para DJs: agenda, shows, viagens, contatos, músicas e perfil público com booking.",
      problem: "DJs gerenciam shows, viagens, hotéis, contatos e músicas espalhados em planilhas, notas e conversas de WhatsApp.",
      solution: "Um workspace único com Agenda, Shows, Contatos, Music e Profile, além de um perfil público onde contratantes enviam um pedido de booking organizado direto para o WhatsApp.",
      highlights: [
        "Autenticação completa (cadastro, confirmação de email, recuperação de senha) com Supabase Auth.",
        "Privacidade por padrão: Row Level Security garante que cada usuário só acessa os próprios dados.",
        "Perfil público expõe somente o que foi publicado, nunca cachê, horários, notas ou contatos privados.",
        "Upload de avatar, capa e arquivos de até 20 MB com Supabase Storage.",
        "Validado em produção com contas de teste: isolamento entre contas, persistência e exclusão.",
      ],
    },
    en: {
      title: "Proud", type: "Web app · Productivity",
      short: "Professional organizer for DJs: calendar, gigs, travel, contacts, music and a public profile with booking.",
      problem: "DJs manage gigs, travel, hotels, contacts and music across spreadsheets, notes and WhatsApp chats.",
      solution: "A single workspace with Calendar, Shows, Contacts, Music and Profile, plus a public profile where promoters send a structured booking request straight to WhatsApp.",
      highlights: [
        "Full authentication (sign-up, email confirmation, password recovery) with Supabase Auth.",
        "Private by default: Row Level Security ensures each user only reaches their own data.",
        "The public profile only exposes what was published, never fees, times, notes or private contacts.",
        "Avatar, cover and file uploads up to 20 MB with Supabase Storage.",
        "Validated in production with test accounts: cross-account isolation, persistence and deletion.",
      ],
    },
  },
  {
    id: "kerofeltro", cats: ["interactive"], year: "2026", live: "https://kerofeltro-atelie.vercel.app/",
    img: "assets/kerofeltro.jpg",
    stack: ["JavaScript", "HTML", "CSS", "Python", "IA de imagem", "Vercel"],
    pt: {
      title: "Kero Feltro", type: "Catálogo interativo · Cliente real",
      short: "Ateliê virtual em 3D para uma artesã: arraste pelas prateleiras, gire as peças e encomende pelo WhatsApp.",
      problem: "Uma artesã de peças em feltro vendia apenas por fotos soltas no WhatsApp, sem catálogo nem identidade visual.",
      solution: "Um ateliê interativo onde o visitante passeia pelas prateleiras, gira cada peça em 360°, monta uma seleção e envia a encomenda pronta pelo WhatsApp.",
      highlights: [
        "Cena navegável por arraste, setas e teclado, com filtros por categoria (Natal, Infantil, Religiosos…).",
        "Catálogo com 20 modelos e 23 variações e uma \"sacola\" que gera a mensagem de encomenda.",
        "Pipeline em Python + IA de imagem para padronizar 23 fotos: 1254×1254 px, WebP com transparência e fundo uniforme.",
        "Publicado em produção na Vercel e em uso pela cliente.",
      ],
    },
    en: {
      title: "Kero Feltro", type: "Interactive catalog · Real client",
      short: "3D virtual atelier for an artisan: drag through the shelves, spin the pieces and order via WhatsApp.",
      problem: "A felt artisan sold only through loose photos on WhatsApp, with no catalog or visual identity.",
      solution: "An interactive atelier where visitors walk along the shelves, spin each piece 360°, build a selection and send a ready-made order via WhatsApp.",
      highlights: [
        "Scene navigable by drag, arrows and keyboard, with category filters (Christmas, Kids, Religious…).",
        "Catalog with 20 models and 23 variants, plus a \"bag\" that composes the order message.",
        "Python + image-AI pipeline to standardize 23 photos: 1254×1254 px, transparent WebP and uniform background.",
        "Deployed to production on Vercel and used by the client.",
      ],
    },
  },
  {
    id: "beachready", cats: ["interactive"], year: "2026", live: "https://beachready-app.vercel.app",
    img: "assets/beachready.jpg",
    stack: ["React", "Vite", "JavaScript", "CSS", "localStorage", "Pix", "Vercel"],
    pt: {
      title: "BeachReady", type: "App de reservas · Marketplace",
      short: "App para reservar cadeira e guarda-sol na praia, com área do cliente e painel do barraqueiro.",
      problem: "Na praia, quem chega cedo pega o lugar e o barraqueiro não sabe quantos clientes terá no dia; tudo é combinado no improviso.",
      solution: "Um app com dois lados: o cliente escolhe a praia e a barraca, define data, horário, cadeiras e guarda-sóis e paga via Pix; o barraqueiro acompanha reservas, avaliações e faturamento num painel próprio.",
      highlights: [
        "Fluxo completo de reserva: busca por praia, barraca ou cidade, escolha do set e cálculo automático do valor.",
        "Pagamento simulado com Pix (QR Code e copia e cola), crédito e débito, com validação dos campos do cartão.",
        "Painel do barraqueiro com reservas do dia, faturamento por dia, semana e mês, ticket médio e avaliações.",
        "Configuração da barraca: preços, número de sets e horário de funcionamento.",
        "Reservas salvas no localStorage, avaliações após a reserva, FAQ e central de suporte.",
      ],
    },
    en: {
      title: "BeachReady", type: "Booking app · Marketplace",
      short: "App to book beach chairs and umbrellas, with a customer area and a vendor dashboard.",
      problem: "At the beach, whoever arrives first gets the spot and vendors don't know how many customers they'll have that day.",
      solution: "A two-sided app: customers pick the beach and vendor, set date, time, chairs and umbrellas and pay via Pix; vendors track bookings, reviews and revenue in their own dashboard.",
      highlights: [
        "Full booking flow: search by beach, vendor or city, choose the set and automatic price calculation.",
        "Simulated payment with Pix (QR code and copy-paste), credit and debit, with card field validation.",
        "Vendor dashboard with today's bookings, daily, weekly and monthly revenue, average ticket and reviews.",
        "Vendor setup: prices, number of sets and opening hours.",
        "Bookings stored in localStorage, post-booking reviews, FAQ and support center.",
      ],
    },
  },
  {
    id: "trust-issues", cats: ["interactive"], year: "2026",
    img: "assets/trust-issues.jpg",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS"],
    pt: {
      title: "Trust Issues", type: "Portfólio de moda · Motion design",
      short: "Arara de roupas interativa com física de inércia para apresentar uma coleção de streetwear.",
      problem: "Portfólios de moda costumam ser grades estáticas de fotos que não transmitem a sensação de ver as peças pessoalmente.",
      solution: "Uma arara virtual: role, arraste ou deslize e as peças se movem com inércia; passe o mouse e elas giram; clique para abrir a vitrine com frente e costas.",
      highlights: [
        "Movimento com inércia por roda, trackpad, arraste e toque, construído com GSAP e Framer Motion.",
        "Peças giram entre fotos de frente, três-quartos e perfil para simular profundidade real.",
        "Navegação completa por teclado (setas, Esc) e diálogos acessíveis.",
        "Respeita prefers-reduced-motion; exportação estática, sem backend.",
      ],
    },
    en: {
      title: "Trust Issues", type: "Fashion portfolio · Motion design",
      short: "Interactive clothing rack with inertia physics to showcase a streetwear collection.",
      problem: "Fashion portfolios are usually static photo grids that don't convey the feel of seeing the garments in person.",
      solution: "A virtual rack: scroll, drag or swipe and garments move with inertia; hover and they turn; click to open the showcase with front and back.",
      highlights: [
        "Inertia movement via wheel, trackpad, drag and touch, built with GSAP and Framer Motion.",
        "Garments swap between front, three-quarter and profile shots to simulate real depth.",
        "Full keyboard navigation (arrows, Esc) and accessible dialogs.",
        "Respects prefers-reduced-motion; static export, no backend.",
      ],
    },
  },
  {
    id: "agente-comercial", cats: ["ai", "automation"], year: "2026",
    img: null, mock: "sheet",
    stack: ["Agentes de IA", "Python", "Automação agendada", "JSON", "Markdown"],
    pt: {
      title: "Agente Comercial", type: "Agente de IA · Prospecção",
      short: "Agente que pesquisa, pontua e entrega diariamente uma planilha de potenciais clientes para uma produtora audiovisual.",
      problem: "Prospectar clientes manualmente consumia horas por dia e gerava contatos repetidos ou pouco qualificados.",
      solution: "Uma automação diária que pesquisa empresas por região e segmento, aplica uma pontuação de aderência e entrega planilha + relatório com evidências.",
      highlights: [
        "Critérios editáveis em arquivos de configuração (região, serviços, segmentos, quantidade).",
        "Base acumulada em JSON para evitar repetir clientes entre execuções.",
        "Histórico de execuções com erros e contagens para auditoria.",
        "Scripts Python para gerar PDFs das planilhas e materiais comerciais.",
      ],
    },
    en: {
      title: "Sales Agent", type: "AI agent · Prospecting",
      short: "Agent that researches, scores and delivers a daily spreadsheet of leads for a video production company.",
      problem: "Manual prospecting took hours a day and produced duplicated or poorly qualified leads.",
      solution: "A daily automation that researches companies by region and segment, applies a fit score and delivers a spreadsheet + evidence report.",
      highlights: [
        "Editable criteria in configuration files (region, services, segments, volume).",
        "Cumulative JSON store to avoid repeating leads across runs.",
        "Run history with errors and counts for auditing.",
        "Python scripts to export spreadsheets and sales material to PDF.",
      ],
    },
  },
  {
    id: "semente", cats: ["interactive"], year: "2026", proto: true,
    img: null, mock: "bible",
    stack: ["JavaScript", "HTML", "CSS", "localStorage", "UX/UI"],
    pt: {
      title: "Semente", type: "Protótipo de produto · EdTech",
      short: "Plataforma de estudo bíblico com leitor, biblioteca, estudos pessoais e acervo pastoral.",
      problem: "Um pastor queria oferecer à comunidade um espaço digital de estudo. Hoje o conteúdo fica espalhado entre PDFs, livros e anotações.",
      solution: "Um protótipo navegável com visão geral, leitor da Bíblia com seleção de versículos, biblioteca de comentários e área de estudos pessoais, como base para validar a ideia antes de construir o backend.",
      highlights: [
        "SPA em JavaScript puro, sem frameworks, num único arquivo.",
        "Estudos salvos com localStorage, com tratamento para quando o armazenamento está indisponível.",
        "Escape de HTML em todo conteúdo dinâmico para evitar XSS.",
        "Modelo freemium já desenhado (gratuito / Plus) e atenção a direitos autorais das obras.",
      ],
    },
    en: {
      title: "Semente", type: "Product prototype · EdTech",
      short: "Bible study platform with reader, library, personal studies and a pastoral archive.",
      problem: "A pastor wanted to give his community a digital study space, content was scattered across PDFs, books and notes.",
      solution: "A clickable prototype with overview, Bible reader with verse selection, commentary library and personal studies, a base to validate the idea before building the backend.",
      highlights: [
        "Vanilla JavaScript SPA, no frameworks, in a single file.",
        "Studies saved in localStorage, with handling for when storage is unavailable.",
        "HTML escaping on all dynamic content to prevent XSS.",
        "Freemium model already designed (free / Plus) and attention to copyright of works.",
      ],
    },
  },
];

/* =========================================================
   TRAJETÓRIA
   ========================================================= */
const JOURNEY = [
  {
    when: "2026 →",
    pt: { title: "IA aplicada & Machine Learning", org: "Projetos próprios e para clientes", items: [
      "8 projetos construídos: SaaS, web apps, agentes de IA e experiências interativas.",
      "Três sites em produção na Vercel e um em uso por cliente real.",
      "Todos os projetos construídos com IA (Claude Code, Codex), com código revisado e testado.",
    ]},
    en: { title: "Development & applied AI", org: "Own and client projects", items: [
      "8 projects built: SaaS, web apps, AI agents and interactive experiences.",
      "Two sites in production on Vercel, one used by a real client.",
      "AI-assisted development (Claude Code, Codex) focused on reviewed, tested code.",
    ]},
  },
  {
    when: "2025 →",
    pt: { title: "Formação em tecnologia", org: "Stanford · DeepLearning.AI · AWS · ADS", items: [
      "Machine Learning, Universidade Stanford (concluído).",
      "Deep Learning, DeepLearning.AI (cursando).",
      "AWS Cloud Foundations, Amazon Web Services (cursando).",
      "Análise e Desenvolvimento de Sistemas (cursando).",
    ]},
    en: { title: "Tech education", org: "Stanford · DeepLearning.AI · AWS · Systems Analysis", items: [
      "Machine Learning, Stanford University (completed).",
      "Deep Learning, DeepLearning.AI (in progress).",
      "AWS Cloud Foundations, Amazon Web Services (in progress).",
      "Systems Analysis and Development degree (in progress).",
    ]},
  },
  {
    when: "2025 a 2026",
    pt: { title: "Gerente Geral / Assistente de Marketing", org: "Bar La Fefa", items: [
      "Gestão completa das operações diárias e liderança da equipe.",
      "Estoque, compras e recebimento com foco em reduzir desperdício.",
      "Acompanhamento financeiro e de KPIs operacionais.",
      "Melhorias de processo para aumentar eficiência e rentabilidade.",
    ]},
    en: { title: "General Manager / Marketing Assistant", org: "Bar La Fefa", items: [
      "End-to-end daily operations management and team leadership.",
      "Inventory, purchasing and receiving focused on reducing waste.",
      "Financial tracking and operational KPIs.",
      "Process improvements to raise efficiency and profitability.",
    ]},
  },
  {
    when: "2016 a 2024",
    pt: { title: "Sargento de Logística", org: "Exército Brasileiro", items: [
      "Operação dos sistemas SISCOFIS, SIAFI e SISBOL para controle patrimonial e financeiro.",
      "Gestão de estoques e registros de materiais de alto valor.",
      "Planejamento de operações logísticas e de suprimentos.",
      "Liderança e instrução de equipes multidisciplinares.",
    ]},
    en: { title: "Logistics Sergeant", org: "Brazilian Army", items: [
      "Operated SISCOFIS, SIAFI and SISBOL government systems for asset and financial control.",
      "Inventory management and records for high-value materiel.",
      "Planning of logistics and supply operations.",
      "Led and trained multidisciplinary teams.",
    ]},
  },
];

/* =========================================================
   SKILLS  (level: "strong" = usado em projeto, "learning" = estudando)
   ========================================================= */
const SKILLS = [
  { group: { pt: "Front-end", en: "Front-end" }, items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "shadcn/ui", "GSAP", "Framer Motion", "Vite"] },
  { group: { pt: "Back-end & dados", en: "Back-end & data" }, items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase", "Cloudflare D1", "Drizzle ORM", "Zod", "Python"] },
  { group: { pt: "IA & automação", en: "AI & automation" }, items: ["OpenAI API", "Agentes de IA", "IA de imagem", "Automação agendada", { n: "Machine Learning", l: "learning" }, { n: "Deep Learning", l: "learning" }] },
  { group: { pt: "Infra & qualidade", en: "Infra & quality" }, items: ["Vercel", "Cloudflare Workers", "Railway", "Docker", "Vitest", { n: "AWS", l: "learning" }, "Git"] },
];


/* textos da versão com scroll animado */
Object.assign(I18N.pt, {
  "hero.eyebrow": "Lucas Ribeiro · IA aplicada e Machine Learning",
  "hero.t1": "Da logística", "hero.t2": "ao código.",
  "hero.badge": "São Paulo, BR · aberto a remoto",
  "man.text": "Por oito anos eu planejei operações, controlei estoques e liderei equipes no Exército Brasileiro. Aprendi que uma boa entrega é previsível, rastreável e sem desculpas. Hoje levo essa mesma disciplina para a IA aplicada e o machine learning: produtos, automações e interfaces que vão do briefing ao deploy.",
  "man.h1": "Eu movia carga.", "man.h2": "Hoje entrego IA aplicada.",
  "man.caption": "De muitas operações, um método",
  "stats.live": "sites em produção",
  "story.big": "Projetos", "story.tag": "carga de hoje · 8 projetos",
  "journey.title": "A rota até aqui", "journey.lead": "Role a página para dirigir pela trajetória.",
  "contact.big": "Vamos conversar",
});
Object.assign(I18N.en, {
  "hero.eyebrow": "Lucas Ribeiro, Developer & applied AI",
  "hero.t1": "From logistics", "hero.t2": "to code.",
  "hero.badge": "São Paulo, BR · open to remote",
  "man.text": "For eight years I planned operations, controlled inventory and led teams in the Brazilian Army. I learned that a good delivery is predictable, traceable and has no excuses. Today I bring that same discipline to software: AI products, automations and interfaces that go from brief to deploy.",
  "man.h1": "I used to move cargo.", "man.h2": "Now I ship software.",
  "man.caption": "From many operations, one method",
  "stats.live": "sites in production",
  "story.big": "Projects", "story.tag": "today's cargo · 8 projects",
  "journey.title": "The route so far", "journey.lead": "Scroll to drive through the journey.",
  "contact.big": "Let's talk",
});
