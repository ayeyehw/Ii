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
    lines: {
      es: ["Diseño marcas", "que se quedan", "en la cabeza."],
      pt: ["Desenho marcas", "que ficam", "na cabeça."],
    } as Record<Lang, string[]>,
    sub: {
      es: "Soy Alejandro. Creo identidades visuales y contenido para negocios con personalidad, en Brasil y Latinoamérica.",
      pt: "Sou o Alejandro. Crio identidades visuais e conteúdo para negócios com personalidade, no Brasil e na América Latina.",
    } as T,
    secondary: { es: "Ver proyectos", pt: "Ver projetos" } as T,
    scroll: { es: "Desliza para explorar", pt: "Role para explorar" } as T,
  },

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

  away: { es: "¡Vuelve! ☕", pt: "Volta! ☕" } as T,

  work: {
    kicker: { es: "Proyectos", pt: "Projetos" } as T,
    title: { es: "Marcas que he diseñado", pt: "Marcas que desenhei" } as T,
    hint: { es: "Usa el mouse o las flechas ← → para elegir", pt: "Use o mouse ou as setas ← → para escolher" } as T,
    example: { es: "Ejemplo", pt: "Exemplo" } as T,
    view: { es: "Ver proyecto", pt: "Ver projeto" } as T,
    close: { es: "Cerrar", pt: "Fechar" } as T,
    visit: { es: "Visitar la marca", pt: "Visitar a marca" } as T,
    scope: { es: "Alcance", pt: "Escopo" } as T,
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

// ====== TUS 3 MARCAS ======
// Reemplaza estas marcas de ejemplo por las tuyas. Pon las imágenes en /public/work/<marca>/
// y cambia "example" a false para quitar la etiqueta "Ejemplo".
export interface Brand {
  name: string;
  example: boolean;
  year: string;
  category: T;
  summary: T;
  scope: Record<Lang, string[]>;
  cover: string;
  gallery: string[];
  link?: string;
  accent: "blue" | "green" | "steel";
}

export const BRANDS: Brand[] = [
  {
    name: "Norte Café",
    example: true,
    year: "2025",
    category: { es: "Cafetería de especialidad", pt: "Cafeteria especial" },
    summary: {
      es: "Identidad para una cafetería de barrio: un símbolo de brújula que guía hacia el buen café, paleta sobria y piezas para el local y las redes.",
      pt: "Identidade para uma cafeteria de bairro: um símbolo de bússola que guia até o bom café, paleta sóbria e peças para a loja e as redes.",
    },
    scope: { es: ["Logotipo", "Paleta", "Packaging", "Redes"], pt: ["Logotipo", "Paleta", "Embalagem", "Redes"] },
    cover: "/work/norte/cover.svg",
    gallery: ["/work/norte/card.svg", "/work/norte/post.svg", "/work/norte/cup.svg"],
    accent: "green",
  },
  {
    name: "Lumen Studio",
    example: true,
    year: "2025",
    category: { es: "Estudio de fotografía", pt: "Estúdio de fotografia" },
    summary: {
      es: "Marca para un estudio de fotografía: un símbolo de luz que se abre como un diafragma y un sistema limpio para portafolio y redes.",
      pt: "Marca para um estúdio de fotografia: um símbolo de luz que abre como um diafragma e um sistema limpo para portfólio e redes.",
    },
    scope: { es: ["Logotipo", "Tipografía", "Plantillas", "Web"], pt: ["Logotipo", "Tipografia", "Templates", "Web"] },
    cover: "/work/lumen/cover.svg",
    gallery: ["/work/lumen/card.svg", "/work/lumen/post.svg", "/work/lumen/web.svg"],
    accent: "blue",
  },
  {
    name: "Raíz",
    example: true,
    year: "2024",
    category: { es: "Tienda de plantas", pt: "Loja de plantas" },
    summary: {
      es: "Identidad para una tienda de plantas: una hoja que nace de una raíz, etiquetas para macetas y un feed que se siente vivo.",
      pt: "Identidade para uma loja de plantas: uma folha que nasce de uma raiz, etiquetas para vasos e um feed que parece vivo.",
    },
    scope: { es: ["Logotipo", "Etiquetas", "Señalética", "Redes"], pt: ["Logotipo", "Etiquetas", "Sinalização", "Redes"] },
    cover: "/work/raiz/cover.svg",
    gallery: ["/work/raiz/tag.svg", "/work/raiz/post.svg", "/work/raiz/bag.svg"],
    accent: "steel",
  },
];
