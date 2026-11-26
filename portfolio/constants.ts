// ====== EDITA AQUÍ TODO EL CONTENIDO (español y portugués) ======

export type Lang = "es" | "pt";
type T = Record<Lang, string>;

export const NAME = "Alejandro Sanchez";
export const EMAIL = "tu-correo@ejemplo.com";
// Número de WhatsApp con código de país, solo dígitos (ej. "5535999998888").
// Si lo dejas vacío, los botones de WhatsApp abren el correo.
export const WHATSAPP = "";
export const PHOTO = "/me/foto.svg";

export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/tu-usuario/" },
  { label: "Behance", href: "https://www.behance.net/tu-usuario" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tu-usuario/" },
];

export const WORK_IMAGES = {
  logo: { src: "/work/mimi/logo.webp", w: 1000, h: 1000 },
  cappuccino: { src: "/work/mimi/cappuccino.webp", w: 998, h: 1400 },
  cheesecake1: { src: "/work/mimi/cheesecake-1.webp", w: 1000, h: 1392 },
  cheesecake2: { src: "/work/mimi/cheesecake-2.webp", w: 1000, h: 1333 },
  waffle: { src: "/work/mimi/bubble-waffle.webp", w: 828, h: 1031 },
};

export const COPY = {
  meta: {
    title: { es: "Alejandro Sanchez · Diseño de marca", pt: "Alejandro Sanchez · Design de marca" } as T,
    description: {
      es: "Identidad visual y contenido para negocios en Latinoamérica y Brasil.",
      pt: "Identidade visual e conteúdo para negócios no Brasil e na América Latina.",
    } as T,
  },
  nav: [
    { href: "#trabajo", label: { es: "Trabajo", pt: "Trabalho" } as T },
    { href: "#servicios", label: { es: "Servicios", pt: "Serviços" } as T },
    { href: "#proceso", label: { es: "Proceso", pt: "Processo" } as T },
    { href: "#sobre-mi", label: { es: "Sobre mí", pt: "Sobre mim" } as T },
  ],
  cta: { es: "Hablemos", pt: "Vamos conversar" } as T,
  whatsapp: { es: "Escríbeme por WhatsApp", pt: "Me chama no WhatsApp" } as T,
  whatsappMsg: {
    es: "Hola Alejandro, vi tu portafolio y quiero hablar sobre mi marca.",
    pt: "Oi Alejandro, vi seu portfólio e quero conversar sobre a minha marca.",
  } as T,

  hero: {
    status: { es: "Disponible para proyectos en 2027", pt: "Disponível para projetos em 2027" } as T,
    // Cada línea del titular; "{img:...}" inserta una pieza y "{sticker:...}" un sticker.
    lines: {
      es: ["Diseño {img:logo} marcas", "que se quedan", "en la {sticker:cup} cabeza."],
      pt: ["Desenho {img:logo} marcas", "que ficam na", "{sticker:cup} cabeça."],
    } as Record<Lang, string[]>,
    sub: {
      es: "Soy Alejandro. Creo identidades visuales y contenido para negocios con personalidad, en Brasil y Latinoamérica.",
      pt: "Sou o Alejandro. Crio identidades visuais e conteúdo para negócios com personalidade, no Brasil e na América Latina.",
    } as T,
    secondary: { es: "Ver proyectos", pt: "Ver projetos" } as T,
    note: { es: "¡psst! puedes lanzar los stickers", pt: "psiu! dá pra jogar os adesivos" } as T,
  },

  big: { es: "Diseño con cariño", pt: "Design com carinho" } as T,

  marquee: {
    top: {
      es: ["Logotipos", "Personajes", "Menús", "Packaging", "Feed de Instagram", "Promociones", "Señalética"],
      pt: ["Logotipos", "Personagens", "Cardápios", "Embalagens", "Feed do Instagram", "Promoções", "Sinalização"],
    } as Record<Lang, string[]>,
    bottom: {
      es: ["Cafeterías", "Pastelerías", "Tiendas", "Restaurantes", "Emprendimientos", "Marcas personales"],
      pt: ["Cafeterias", "Confeitarias", "Lojas", "Restaurantes", "Empreendimentos", "Marcas pessoais"],
    } as Record<Lang, string[]>,
  },

  cursor: {
    view: { es: "ver", pt: "ver" } as T,
    drag: { es: "¡lánzame!", pt: "me joga!" } as T,
    talk: { es: "hablemos", pt: "bora" } as T,
  },
  away: { es: "¡Vuelve! ☕", pt: "Volta! ☕" } as T,

  work: {
    kicker: { es: "Proyecto destacado", pt: "Projeto em destaque" } as T,
    note: { es: "mi cliente favorito ♥", pt: "meu cliente favorito ♥" } as T,
    client: "Mimi Café",
    place: { es: "Cafetería · Itajubá, Brasil · 2025", pt: "Cafeteria · Itajubá, Brasil · 2025" } as T,
    link: "https://www.instagram.com/mimicafe.br/",
    linkLabel: { es: "Ver @mimicafe.br en Instagram", pt: "Ver @mimicafe.br no Instagram" } as T,
    blocks: [
      {
        title: { es: "El reto", pt: "O desafio" } as T,
        text: {
          es: "Una cafetería de barrio que quería transmitir lo que la hace especial: un lugar cercano, con cariño en cada detalle, que se reconozca a primera vista en la calle y en Instagram.",
          pt: "Uma cafeteria de bairro que queria transmitir o que a torna especial: um lugar próximo, com carinho em cada detalhe, reconhecível de cara na rua e no Instagram.",
        } as T,
      },
      {
        title: { es: "La solución", pt: "A solução" } as T,
        text: {
          es: "Creé a Mimi, un personaje que es la cara de la marca, un sello circular con lettering propio y una paleta de café y frutos rojos. Con ese sistema diseñé las piezas de productos y promociones.",
          pt: "Criei a Mimi, uma personagem que é o rosto da marca, um selo circular com lettering próprio e uma paleta de café e frutas vermelhas. Com esse sistema desenhei as peças de produtos e promoções.",
        } as T,
      },
    ],
    deliverablesTitle: { es: "Entregables", pt: "Entregas" } as T,
    deliverables: {
      es: ["Personaje de marca", "Logotipo y sello", "Paleta y tipografías", "Piezas de producto", "Promociones para redes"],
      pt: ["Personagem da marca", "Logotipo e selo", "Paleta e tipografias", "Peças de produto", "Promoções para redes"],
    } as Record<Lang, string[]>,
    captions: {
      logo: { es: "Logotipo y personaje", pt: "Logotipo e personagem" } as T,
      cappuccino: { es: "Pieza de producto: Cappuccino Canela", pt: "Peça de produto: Cappuccino Canela" } as T,
      cheesecake1: { es: "Lanzamiento: nueva sobremesa", pt: "Lançamento: nova sobremesa" } as T,
      waffle: { es: "Fotografía de producto con lettering", pt: "Fotografia de produto com lettering" } as T,
      cheesecake2: { es: "Variante para el feed", pt: "Variação para o feed" } as T,
    },
  },

  services: {
    kicker: { es: "Servicios", pt: "Serviços" } as T,
    title: { es: "Elige cómo empezamos", pt: "Escolha como começamos" } as T,
    from: { es: "Desde", pt: "A partir de" } as T,
    custom: { es: "Cotización a medida", pt: "Orçamento sob medida" } as T,
    choose: { es: "Quiero este", pt: "Quero este" } as T,
    popular: { es: "Más elegido", pt: "Mais escolhido" } as T,
    // price: deja "" para mostrar "Cotización a medida". Ej. "US$ 450" o "R$ 1.800".
    packages: [
      {
        name: { es: "Identidad esencial", pt: "Identidade essencial" } as T,
        for: { es: "Para negocios que están empezando", pt: "Para negócios que estão começando" } as T,
        time: { es: "2 a 3 semanas", pt: "2 a 3 semanas" } as T,
        price: "",
        items: {
          es: ["Logotipo y variantes", "Paleta de color y tipografías", "Mini guía de uso", "Perfil y portadas para redes"],
          pt: ["Logotipo e variações", "Paleta de cores e tipografias", "Mini guia de uso", "Perfil e capas para redes"],
        } as Record<Lang, string[]>,
      },
      {
        name: { es: "Marca completa", pt: "Marca completa" } as T,
        for: { es: "Para lanzar o renovar con todo", pt: "Para lançar ou renovar com tudo" } as T,
        time: { es: "4 a 6 semanas", pt: "4 a 6 semanas" } as T,
        price: "",
        featured: true,
        items: {
          es: ["Todo lo de Identidad esencial", "Personaje o ilustración de marca", "Manual de marca", "Menú, packaging o señalética", "10 plantillas para redes"],
          pt: ["Tudo da Identidade essencial", "Personagem ou ilustração da marca", "Manual da marca", "Cardápio, embalagem ou sinalização", "10 templates para redes"],
        } as Record<Lang, string[]>,
      },
      {
        name: { es: "Redes mensual", pt: "Redes mensal" } as T,
        for: { es: "Para marcas que ya tienen identidad", pt: "Para marcas que já têm identidade" } as T,
        time: { es: "Mes a mes", pt: "Mês a mês" } as T,
        price: "",
        items: {
          es: ["12 piezas al mes", "Promociones y lanzamientos", "Calendario de publicaciones", "Ajustes ilimitados en la semana"],
          pt: ["12 peças por mês", "Promoções e lançamentos", "Calendário de publicações", "Ajustes ilimitados na semana"],
        } as Record<Lang, string[]>,
      },
    ],
  },

  process: {
    kicker: { es: "Proceso", pt: "Processo" } as T,
    title: { es: "Cómo trabajamos juntos", pt: "Como trabalhamos juntos" } as T,
    steps: [
      {
        name: { es: "Llamada", pt: "Conversa" } as T,
        text: { es: "30 minutos para entender tu negocio, tu cliente y lo que necesitas.", pt: "30 minutos para entender o seu negócio, o seu cliente e o que você precisa." } as T,
      },
      {
        name: { es: "Propuesta", pt: "Proposta" } as T,
        text: { es: "Te envío alcance, tiempos y precio cerrado. Sin sorpresas.", pt: "Envio escopo, prazos e preço fechado. Sem surpresas." } as T,
      },
      {
        name: { es: "Diseño", pt: "Design" } as T,
        text: { es: "Te muestro caminos creativos, elegimos uno y lo afinamos juntos.", pt: "Apresento caminhos criativos, escolhemos um e refinamos juntos." } as T,
      },
      {
        name: { es: "Entrega", pt: "Entrega" } as T,
        text: { es: "Recibes todos los archivos listos para imprimir y publicar.", pt: "Você recebe todos os arquivos prontos para imprimir e publicar." } as T,
      },
    ],
  },

  // Cuando tengas una cita real de un cliente, complétala aquí y aparecerá en la página.
  testimonial: {
    quote: { es: "", pt: "" } as T,
    author: "",
    role: { es: "", pt: "" } as T,
  },

  about: {
    kicker: { es: "Sobre mí", pt: "Sobre mim" } as T,
    title: { es: "Hola, soy Alejandro", pt: "Oi, sou o Alejandro" } as T,
    text: {
      es: [
        "Diseño marcas para negocios reales: cafeterías, tiendas y emprendimientos que quieren verse profesionales sin perder su calidez.",
        "Me gusta que cada marca tenga una idea clara y que esa idea se note en todo, desde el logotipo hasta el post del viernes.",
      ],
      pt: [
        "Desenho marcas para negócios reais: cafeterias, lojas e empreendimentos que querem parecer profissionais sem perder o seu jeito.",
        "Gosto que cada marca tenha uma ideia clara e que essa ideia apareça em tudo, do logotipo ao post de sexta-feira.",
      ],
    } as Record<Lang, string[]>,
    facts: [
      { k: { es: "Especialidad", pt: "Especialidade" } as T, v: { es: "Identidad visual y redes", pt: "Identidade visual e redes" } as T },
      { k: { es: "Idiomas", pt: "Idiomas" } as T, v: { es: "Español y portugués", pt: "Português e espanhol" } as T },
      { k: { es: "Clientes", pt: "Clientes" } as T, v: { es: "Brasil y Latinoamérica, en remoto", pt: "Brasil e América Latina, remoto" } as T },
    ],
  },

  faq: {
    kicker: { es: "Preguntas frecuentes", pt: "Perguntas frequentes" } as T,
    items: [
      {
        q: { es: "¿Cuánto tarda un proyecto?", pt: "Quanto tempo leva um projeto?" } as T,
        a: { es: "Una identidad esencial toma de 2 a 3 semanas y una marca completa de 4 a 6. Te doy fechas exactas en la propuesta.", pt: "Uma identidade essencial leva de 2 a 3 semanas e uma marca completa de 4 a 6. Passo as datas exatas na proposta." } as T,
      },
      {
        q: { es: "¿Cuántas revisiones incluye?", pt: "Quantas revisões estão incluídas?" } as T,
        a: { es: "Dos rondas de cambios en cada etapa. Si necesitas más, lo conversamos.", pt: "Duas rodadas de ajustes em cada etapa. Se precisar de mais, a gente conversa." } as T,
      },
      {
        q: { es: "¿Cómo se paga?", pt: "Como funciona o pagamento?" } as T,
        a: { es: "50 % para empezar y 50 % al entregar. Acepto transferencia, Pix y PayPal.", pt: "50 % para começar e 50 % na entrega. Aceito transferência, Pix e PayPal." } as T,
      },
      {
        q: { es: "¿Trabajas con negocios fuera de Brasil?", pt: "Você trabalha com negócios fora do Brasil?" } as T,
        a: { es: "Sí. Trabajo en remoto con clientes de Brasil y de toda Latinoamérica, en español o portugués.", pt: "Sim. Trabalho remoto com clientes do Brasil e de toda a América Latina, em português ou espanhol." } as T,
      },
      {
        q: { es: "¿Qué archivos recibo?", pt: "Quais arquivos eu recebo?" } as T,
        a: { es: "Todos los archivos editables y finales (AI, PDF, PNG, SVG) y una guía para usar tu marca.", pt: "Todos os arquivos editáveis e finais (AI, PDF, PNG, SVG) e um guia para usar a sua marca." } as T,
      },
    ],
  },

  contact: {
    title: { es: "¿Tu marca es la próxima?", pt: "A sua marca é a próxima?" } as T,
    sub: {
      es: "Cuéntame de tu negocio y te respondo en menos de 24 horas con los siguientes pasos.",
      pt: "Me conta sobre o seu negócio e respondo em menos de 24 horas com os próximos passos.",
    } as T,
    email: { es: "O escríbeme a", pt: "Ou escreva para" } as T,
  },

  footer: {
    rights: { es: "Todos los derechos reservados.", pt: "Todos os direitos reservados." } as T,
    top: { es: "Volver arriba", pt: "Voltar ao topo" } as T,
  },
};

export const whatsappHref = (lang: Lang) =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(COPY.whatsappMsg[lang])}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent(COPY.meta.title[lang])}&body=${encodeURIComponent(COPY.whatsappMsg[lang])}`;

// Paleta: colores de café con personalidad
export const PALETTE = {
  bg: "#EFE8DE",
  ink: "#1B1411",
  caramel: "#C8763A",
  berry: "#B3263E",
  mint: "#2F7A5F",
  sky: "#7FB2E5",
  butter: "#F3D36B",
  cocoa: "#5B3A29",
  foam: "#FFF6EA",
};
export const CARD_COLORS = ["caramel", "mint", "berry", "sky", "butter", "cocoa"] as const;
export const STICKERS = ["cup", "star", "hand", "heart", "smile", "bean", "pencil"] as const;
