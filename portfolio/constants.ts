// ====== EDITA AQUÍ TODO EL CONTENIDO (español, portugués e inglés) ======

export type Lang = "es" | "pt" | "en";
export const LANGS: Lang[] = ["es", "pt", "en"];
type T = Record<Lang, string>;
type L = Record<Lang, string[]>;

export const NAME = "Alejandro Sanchez";
export const EMAIL = "alejandrosanchezcanoh@gmail.com";
// Número de WhatsApp con código de país, solo dígitos (ej. "5535999998888").
// Si lo dejas vacío, los botones de WhatsApp abren el correo.
export const WHATSAPP = "56973662392";
// Ruta de tu foto (ej. "/me/foto.jpg"). Vacío = la sección "Sobre mí" se muestra sin foto.
export const PHOTO = "";

// Agrega aquí tus redes cuando las tengas, ej. { label: "Instagram", href: "https://www.instagram.com/tu-usuario/" }
export const SOCIAL: { label: string; href: string }[] = [];

export const COPY = {
  meta: {
    title: {
      es: "Alejandro Sanchez · Diseño de marca",
      pt: "Alejandro Sanchez · Design de marca",
      en: "Alejandro Sanchez · Brand design",
    } as T,
    description: {
      es: "Identidad visual y contenido para negocios en Brasil, Latinoamérica y Estados Unidos.",
      pt: "Identidade visual e conteúdo para negócios no Brasil, na América Latina e nos Estados Unidos.",
      en: "Brand identity and content for businesses in Brazil, Latin America and the United States.",
    } as T,
  },
  nav: [
    { href: "#trabajo", label: { es: "Trabajo", pt: "Trabalho", en: "Work" } as T },
    { href: "#servicios", label: { es: "Servicios", pt: "Serviços", en: "Services" } as T },
    { href: "#proceso", label: { es: "Proceso", pt: "Processo", en: "Process" } as T },
    { href: "#sobre-mi", label: { es: "Sobre mí", pt: "Sobre mim", en: "About" } as T },
  ],
  cta: { es: "Hablemos", pt: "Vamos conversar", en: "Let's talk" } as T,
  whatsapp: { es: "Escríbeme por WhatsApp", pt: "Me chama no WhatsApp", en: "Message me on WhatsApp" } as T,
  whatsappMsg: {
    es: "Hola Alejandro, vi tu portafolio y quiero hablar sobre mi marca.",
    pt: "Oi Alejandro, vi seu portfólio e quero conversar sobre a minha marca.",
    en: "Hi Alejandro, I saw your portfolio and I'd like to talk about my brand.",
  } as T,
  packageMsg: {
    es: "¡Hola Alejandro! Me interesa el paquete",
    pt: "Oi Alejandro! Tenho interesse no pacote",
    en: "Hi Alejandro! I'm interested in the package",
  } as T,

  hero: {
    status: { es: "Aceptando nuevos clientes", pt: "Aceitando novos clientes", en: "Taking on new clients" } as T,
    lines: {
      es: ["Diseño marcas", "que se quedan", "en la cabeza."],
      pt: ["Desenho marcas", "que ficam", "na cabeça."],
      en: ["I design brands", "people", "remember."],
    } as L,
    sub: {
      es: "Soy Alejandro. Creo identidades visuales y contenido para negocios con personalidad en Brasil, Latinoamérica y Estados Unidos.",
      pt: "Sou o Alejandro. Crio identidades visuais e conteúdo para negócios com personalidade no Brasil, na América Latina e nos Estados Unidos.",
      en: "I'm Alejandro. I create brand identities and content for businesses with personality across Brazil, Latin America and the United States.",
    } as T,
    secondary: { es: "Ver proyectos", pt: "Ver projetos", en: "See work" } as T,
    scroll: { es: "Desliza para explorar", pt: "Role para explorar", en: "Scroll to explore" } as T,
    markets: {
      es: ["Brasil", "Latinoamérica", "Estados Unidos"],
      pt: ["Brasil", "América Latina", "Estados Unidos"],
      en: ["Brazil", "Latin America", "United States"],
    } as L,
    languages: { es: "Español · Português · English", pt: "Español · Português · English", en: "Español · Português · English" } as T,
  },

  away: { es: "¡Vuelve! ☕", pt: "Volta! ☕", en: "Come back! ☕" } as T,

  work: {
    kicker: { es: "Proyectos", pt: "Projetos", en: "Work" } as T,
    title: { es: "Marcas que he diseñado", pt: "Marcas que desenhei", en: "Brands I've designed" } as T,
    hint: {
      es: "Usa el mouse o las flechas ← → para elegir",
      pt: "Use o mouse ou as setas ← → para escolher",
      en: "Use your mouse or the ← → keys to browse",
    } as T,
    example: { es: "Ejemplo", pt: "Exemplo", en: "Sample" } as T,
    view: { es: "Ver proyecto", pt: "Ver projeto", en: "View project" } as T,
    close: { es: "Cerrar", pt: "Fechar", en: "Close" } as T,
    visit: { es: "Visitar la marca", pt: "Visitar a marca", en: "Visit the brand" } as T,
    scope: { es: "Alcance", pt: "Escopo", en: "Scope" } as T,
    yours: { es: "Tu marca aquí", pt: "A sua marca aqui", en: "Your brand here" } as T,
    results: { es: "Resultados", pt: "Resultados", en: "Results" } as T,
    real: { es: "Cliente real", pt: "Cliente real", en: "Real client" } as T,
  },

  services: {
    kicker: { es: "Servicios", pt: "Serviços", en: "Services" } as T,
    title: { es: "Elige cómo empezamos", pt: "Escolha como começamos", en: "Choose how we start" } as T,
    from: { es: "Desde", pt: "A partir de", en: "From" } as T,
    custom: { es: "Cotización a medida", pt: "Orçamento sob medida", en: "Custom quote" } as T,
    choose: { es: "Quiero este", pt: "Quero este", en: "I want this one" } as T,
    popular: { es: "Más elegido", pt: "Mais escolhido", en: "Most popular" } as T,
    // price: deja "" para mostrar "Cotización a medida". Ej. "US$ 450".
    packages: [
      {
        name: { es: "Identidad esencial", pt: "Identidade essencial", en: "Essential identity" } as T,
        for: { es: "Para negocios que están empezando", pt: "Para negócios que estão começando", en: "For businesses just getting started" } as T,
        time: { es: "2 a 3 semanas", pt: "2 a 3 semanas", en: "2 to 3 weeks" } as T,
        price: "",
        items: {
          es: ["Logotipo y variantes", "Paleta de color y tipografías", "Mini guía de uso", "Perfil y portadas para redes"],
          pt: ["Logotipo e variações", "Paleta de cores e tipografias", "Mini guia de uso", "Perfil e capas para redes"],
          en: ["Logo and variations", "Color palette and typography", "Mini brand guide", "Social profile and covers"],
        } as L,
      },
      {
        name: { es: "Marca completa", pt: "Marca completa", en: "Full brand" } as T,
        for: { es: "Para lanzar o renovar con todo", pt: "Para lançar ou renovar com tudo", en: "To launch or rebrand all the way" } as T,
        time: { es: "4 a 6 semanas", pt: "4 a 6 semanas", en: "4 to 6 weeks" } as T,
        price: "",
        featured: true,
        items: {
          es: ["Todo lo de Identidad esencial", "Personaje o ilustración de marca", "Manual de marca", "Menú, packaging o señalética", "10 plantillas para redes"],
          pt: ["Tudo da Identidade essencial", "Personagem ou ilustração da marca", "Manual da marca", "Cardápio, embalagem ou sinalização", "10 templates para redes"],
          en: ["Everything in Essential identity", "Brand character or illustration", "Brand guidelines", "Menu, packaging or signage", "10 social media templates"],
        } as L,
      },
      {
        name: { es: "Redes mensual", pt: "Redes mensal", en: "Monthly social" } as T,
        for: { es: "Para marcas que ya tienen identidad", pt: "Para marcas que já têm identidade", en: "For brands that already have an identity" } as T,
        time: { es: "Mes a mes", pt: "Mês a mês", en: "Month to month" } as T,
        price: "",
        items: {
          es: ["12 piezas al mes", "Promociones y lanzamientos", "Calendario de publicaciones", "Ajustes ilimitados en la semana"],
          pt: ["12 peças por mês", "Promoções e lançamentos", "Calendário de publicações", "Ajustes ilimitados na semana"],
          en: ["12 pieces a month", "Promotions and launches", "Posting calendar", "Unlimited tweaks during the week"],
        } as L,
      },
    ],
  },

  process: {
    kicker: { es: "Proceso", pt: "Processo", en: "Process" } as T,
    title: { es: "Cómo trabajamos juntos", pt: "Como trabalhamos juntos", en: "How we work together" } as T,
    steps: [
      {
        name: { es: "Llamada", pt: "Conversa", en: "Call" } as T,
        text: {
          es: "30 minutos para entender tu negocio, tu cliente y lo que necesitas.",
          pt: "30 minutos para entender o seu negócio, o seu cliente e o que você precisa.",
          en: "30 minutes to understand your business, your customer and what you need.",
        } as T,
      },
      {
        name: { es: "Propuesta", pt: "Proposta", en: "Proposal" } as T,
        text: {
          es: "Te envío alcance, tiempos y precio cerrado. Sin sorpresas.",
          pt: "Envio escopo, prazos e preço fechado. Sem surpresas.",
          en: "You get scope, timeline and a fixed price. No surprises.",
        } as T,
      },
      {
        name: { es: "Diseño", pt: "Design", en: "Design" } as T,
        text: {
          es: "Te muestro caminos creativos, elegimos uno y lo afinamos juntos.",
          pt: "Apresento caminhos criativos, escolhemos um e refinamos juntos.",
          en: "I show you creative routes, we pick one and refine it together.",
        } as T,
      },
      {
        name: { es: "Entrega", pt: "Entrega", en: "Delivery" } as T,
        text: {
          es: "Recibes todos los archivos listos para imprimir y publicar.",
          pt: "Você recebe todos os arquivos prontos para imprimir e publicar.",
          en: "You receive every file ready to print and publish.",
        } as T,
      },
    ],
  },

  // Cuando tengas una cita real de un cliente, complétala aquí y aparecerá en la página.
  testimonial: {
    quote: { es: "", pt: "", en: "" } as T,
    author: "",
    role: { es: "", pt: "", en: "" } as T,
  },

  about: {
    kicker: { es: "Sobre mí", pt: "Sobre mim", en: "About" } as T,
    title: { es: "Hola, soy Alejandro", pt: "Oi, sou o Alejandro", en: "Hi, I'm Alejandro" } as T,
    text: {
      es: [
        "Diseño marcas para negocios reales: cafeterías, tiendas y emprendimientos que quieren verse profesionales sin perder su calidez.",
        "Trabajo en español, portugués e inglés con clientes de Brasil, Latinoamérica y Estados Unidos, así que entiendo cómo habla tu cliente.",
      ],
      pt: [
        "Desenho marcas para negócios reais: cafeterias, lojas e empreendimentos que querem parecer profissionais sem perder o seu jeito.",
        "Trabalho em português, espanhol e inglês com clientes do Brasil, da América Latina e dos Estados Unidos, então entendo como o seu cliente fala.",
      ],
      en: [
        "I design brands for real businesses: cafés, shops and startups that want to look professional without losing their warmth.",
        "I work in English, Spanish and Portuguese with clients in Brazil, Latin America and the United States, so I get how your customers talk.",
      ],
    } as L,
    facts: [
      {
        k: { es: "Especialidad", pt: "Especialidade", en: "Focus" } as T,
        v: { es: "Identidad visual y redes", pt: "Identidade visual e redes", en: "Brand identity and social" } as T,
      },
      {
        k: { es: "Idiomas", pt: "Idiomas", en: "Languages" } as T,
        v: { es: "Español, portugués e inglés", pt: "Português, espanhol e inglês", en: "English, Spanish, Portuguese" } as T,
      },
      {
        k: { es: "Mercados", pt: "Mercados", en: "Markets" } as T,
        v: { es: "Brasil, Latam y EE. UU.", pt: "Brasil, América Latina e EUA", en: "Brazil, LatAm and the US" } as T,
      },
    ],
  },

  faq: {
    kicker: { es: "Preguntas frecuentes", pt: "Perguntas frequentes", en: "FAQ" } as T,
    items: [
      {
        q: { es: "¿Cuánto tarda un proyecto?", pt: "Quanto tempo leva um projeto?", en: "How long does a project take?" } as T,
        a: {
          es: "Una identidad esencial toma de 2 a 3 semanas y una marca completa de 4 a 6. Te doy fechas exactas en la propuesta.",
          pt: "Uma identidade essencial leva de 2 a 3 semanas e uma marca completa de 4 a 6. Passo as datas exatas na proposta.",
          en: "An essential identity takes 2 to 3 weeks and a full brand 4 to 6. You get exact dates in the proposal.",
        } as T,
      },
      {
        q: { es: "¿Cuántas revisiones incluye?", pt: "Quantas revisões estão incluídas?", en: "How many revisions are included?" } as T,
        a: {
          es: "Dos rondas de cambios en cada etapa. Si necesitas más, lo conversamos.",
          pt: "Duas rodadas de ajustes em cada etapa. Se precisar de mais, a gente conversa.",
          en: "Two rounds of changes at each stage. If you need more, we'll talk it through.",
        } as T,
      },
      {
        q: { es: "¿Cómo se paga?", pt: "Como funciona o pagamento?", en: "How does payment work?" } as T,
        a: {
          es: "50 % para empezar y 50 % al entregar. Acepto transferencia, Pix y PayPal, en dólares o en moneda local.",
          pt: "50 % para começar e 50 % na entrega. Aceito transferência, Pix e PayPal, em dólar ou em reais.",
          en: "50% to start and 50% on delivery. I accept bank transfer, PayPal and Pix, in USD or local currency.",
        } as T,
      },
      {
        q: { es: "¿Con qué países trabajas?", pt: "Com quais países você trabalha?", en: "Where are your clients?" } as T,
        a: {
          es: "Trabajo en remoto con clientes de Brasil, Latinoamérica y Estados Unidos, en español, portugués o inglés.",
          pt: "Trabalho remoto com clientes do Brasil, da América Latina e dos Estados Unidos, em português, espanhol ou inglês.",
          en: "I work remotely with clients in Brazil, Latin America and the United States, in English, Spanish or Portuguese.",
        } as T,
      },
      {
        q: { es: "¿Qué archivos recibo?", pt: "Quais arquivos eu recebo?", en: "What files do I get?" } as T,
        a: {
          es: "Todos los archivos editables y finales (AI, PDF, PNG, SVG) y una guía para usar tu marca.",
          pt: "Todos os arquivos editáveis e finais (AI, PDF, PNG, SVG) e um guia para usar a sua marca.",
          en: "All editable and final files (AI, PDF, PNG, SVG) plus a guide to using your brand.",
        } as T,
      },
    ],
  },

  contact: {
    kicker: { es: "Empecemos", pt: "Vamos começar", en: "Let's begin" } as T,
    title: { es: "¿Tu marca es la próxima?", pt: "A sua marca é a próxima?", en: "Is your brand next?" } as T,
    sub: {
      es: "Cuéntame de tu negocio y te respondo en menos de 24 horas con los siguientes pasos.",
      pt: "Me conta sobre o seu negócio e respondo em menos de 24 horas com os próximos passos.",
      en: "Tell me about your business and I'll get back to you within 24 hours with next steps.",
    } as T,
  },

  footer: {
    rights: { es: "Todos los derechos reservados.", pt: "Todos os direitos reservados.", en: "All rights reserved." } as T,
    top: { es: "Volver arriba", pt: "Voltar ao topo", en: "Back to top" } as T,
  },
};

export const whatsappHref = (lang: Lang, text = COPY.whatsappMsg[lang]) =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent(COPY.meta.title[lang])}&body=${encodeURIComponent(text)}`;

// ====== TUS 3 MARCAS ======
// Reemplaza estas marcas de ejemplo por las tuyas. Pon las imágenes en /public/work/<marca>/
// y cambia "example" a false para quitar la etiqueta "Ejemplo".
export interface Brand {
  name: string;
  example: boolean;
  year?: string;
  category: T;
  summary: T;
  scope: L;
  cover: string;
  gallery: string[];
  link?: string;
  linkLabel?: string;
  accent: "blue" | "green" | "steel";
  // Resultados reales (opcional): se muestran grandes junto a la marca.
  results?: { value: T; label: T }[];
}

export const BRANDS: Brand[] = [
  {
    name: "Mimi Café",
    example: false,
    year: "2025",
    category: { es: "Cafetería · Itajubá, Brasil", pt: "Cafeteria · Itajubá, Brasil", en: "Café · Itajubá, Brazil" },
    summary: {
      es: "Me contactaron para darle personalidad a su negocio. Creé a Mimi, el personaje que es la cara de la marca, y todo su sistema visual. Hoy tienen una clientela consolidada y sigo a cargo de su marketing y estrategia de negocio.",
      pt: "Me procuraram para dar personalidade ao negócio. Criei a Mimi, a personagem que é o rosto da marca, e todo o sistema visual. Hoje eles têm uma clientela consolidada e eu sigo cuidando do marketing e da estratégia de negócio.",
      en: "They reached out to give their business a personality. I created Mimi, the character who is the face of the brand, and its whole visual system. Today they have a loyal customer base and I still run their marketing and business strategy.",
    },
    scope: {
      es: ["Personaje", "Logotipo", "Piezas para redes", "Marketing", "Estrategia de negocio"],
      pt: ["Personagem", "Logotipo", "Peças para redes", "Marketing", "Estratégia de negócio"],
      en: ["Character", "Logo", "Social content", "Marketing", "Business strategy"],
    },
    results: [
      {
        value: { es: "7.000", pt: "7.000", en: "7,000" },
        label: { es: "visitas al perfil cada mes", pt: "visitas ao perfil por mês", en: "profile visits every month" },
      },
      {
        value: { es: "Fidelizados", pt: "Fidelizados", en: "Loyal" },
        label: { es: "clientes que vuelven", pt: "clientes que voltam", en: "returning customers" },
      },
      {
        value: { es: "Continuo", pt: "Contínuo", en: "Ongoing" },
        label: { es: "marketing y negocio a mi cargo", pt: "marketing e negócio comigo", en: "marketing and strategy partner" },
      },
    ],
    cover: "/work/mimi/cover.webp",
    gallery: ["/work/mimi/cappuccino.webp", "/work/mimi/cheesecake-1.webp", "/work/mimi/bubble-waffle.webp", "/work/mimi/logo.webp"],
    link: "https://www.instagram.com/mimicafe.br/",
    linkLabel: "@mimicafe.br",
    accent: "steel",
  },
  {
    name: "Akiba Cookies",
    example: false,
    category: { es: "Marca de cookies", pt: "Marca de cookies", en: "Cookie brand" },
    summary: {
      es: "Identidad para una marca de cookies: un gato pastelero abrazando su galleta como personaje, lettering redondeado y un rojo intenso que se reconoce de lejos.",
      pt: "Identidade para uma marca de cookies: um gato confeiteiro abraçando seu cookie como personagem, lettering arredondado e um vermelho intenso que se reconhece de longe.",
      en: "Identity for a cookie brand: a baker cat hugging its cookie as the character, rounded lettering and a bold red you can spot from afar.",
    },
    scope: {
      es: ["Personaje", "Logotipo", "Paleta"],
      pt: ["Personagem", "Logotipo", "Paleta"],
      en: ["Character", "Logo", "Palette"],
    },
    cover: "/work/akiba/cover.webp",
    gallery: ["/work/akiba/logo.webp"],
    accent: "blue",
  },
];
