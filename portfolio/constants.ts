// ====== EDITA AQUÍ TODO EL CONTENIDO DEL PORTAFOLIO ======
// Las imágenes van en /public/work (proyectos), /public/me (tu foto).

export const NAME = "Alejandro Sanchez";
export const FIRST_NAME = "Alejandro";
export const ROLE = "Diseño & Branding";
export const EMAIL = "tu-correo@ejemplo.com";
export const AVAILABILITY = "Aceptando proyectos para 2027";

export const METADATA = {
  title: "Alejandro Sanchez — Diseño & Branding",
  description:
    "Portafolio de Alejandro Sanchez: identidad de marca, diseño gráfico y contenido para marcas con personalidad.",
  siteUrl: "https://tu-dominio.com/",
};

export const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Rubros", href: "#rubros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre mí", href: "#sobre-mi" },
];

export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/tu-usuario/" },
  { label: "TikTok", href: "https://www.tiktok.com/@tu-usuario" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tu-usuario/" },
  { label: "Behance", href: "https://www.behance.net/tu-usuario" },
];

export interface Service {
  title: string;
  script: string;
  description: string;
  category: Category;
}

export type Category = "branding" | "grafico" | "redes";

export const CATEGORY_LABELS: Record<Category, string> = {
  branding: "Branding",
  grafico: "Diseño gráfico",
  redes: "Redes sociales",
};

export const SERVICES: Service[] = [
  {
    title: "Identidad",
    script: "de marca",
    description:
      "Logo, paleta, tipografías y todo el sistema visual para que tu marca se reconozca a primera vista.",
    category: "branding",
  },
  {
    title: "Diseño",
    script: "gráfico",
    description:
      "Menús, packaging, señalética, flyers y piezas impresas con una dirección de arte coherente.",
    category: "grafico",
  },
  {
    title: "Redes",
    script: "sociales",
    description:
      "Feed, plantillas y contenido pensado para que tu marca se vea profesional en Instagram y TikTok.",
    category: "redes",
  },
  {
    title: "Contenido",
    script: "visual",
    description:
      "Fotos de producto, reels y piezas en movimiento que cuentan la historia de tu marca.",
    category: "redes",
  },
];

export const TICKER = [
  "Identidad de marca",
  "Branding",
  "Diseño gráfico",
  "Redes sociales",
  "Packaging",
  "Creación de contenido",
  "Dirección de arte",
];

export interface WorkPiece {
  title: string;
  client: string;
  image: string;
  category: Category;
  tall?: boolean;
}

// Proyecto destacado
export const FEATURED = {
  name: "Mimi",
  script: "Café",
  tag: "01 · Branding · Itajubá, Brasil 🇧🇷",
  description:
    "Identidad visual para Mimi Café, “seu cantinho de café e carinho”: un personaje que es la cara de la marca, logotipo y piezas para redes y promociones con una paleta rosa y café.",
  tags: ["Logo", "Personaje", "Redes sociales", "Promociones"],
  link: "https://www.instagram.com/mimicafe.br/",
  linkLabel: "Ver @mimicafe.br",
  pieces: [
    "/work/mimi/logo.webp",
    "/work/mimi/cheesecake-1.webp",
    "/work/mimi/cappuccino.webp",
    "/work/mimi/bubble-waffle.webp",
  ],
};

export const WORK: WorkPiece[] = [
  { title: "Logo & personaje", client: "Mimi Café", image: "/work/mimi/logo.webp", category: "branding" },
  { title: "Cheesecake de frutos vermelhos", client: "Mimi Café", image: "/work/mimi/cheesecake-1.webp", category: "redes", tall: true },
  { title: "Cappuccino Canela", client: "Mimi Café", image: "/work/mimi/cappuccino.webp", category: "grafico", tall: true },
  { title: "Bubble Waffle", client: "Mimi Café", image: "/work/mimi/bubble-waffle.webp", category: "redes" },
  { title: "Cheesecake — versión 2", client: "Mimi Café", image: "/work/mimi/cheesecake-2.webp", category: "redes", tall: true },
];

export const CONTENT_VIDEOS = [
  { title: "Proceso de un logo", caption: "Del boceto a la marca", image: "/work/reel-1.svg" },
  { title: "Detrás de cámara", caption: "Sesión de producto", image: "/work/reel-2.svg" },
  { title: "Tips de diseño", caption: "Para emprendedores", image: "/work/reel-3.svg" },
  { title: "Antes y después", caption: "Rediseño de marca", image: "/work/reel-4.svg" },
];
export const CONTENT_LINK = { label: "Ver más en mi Instagram", href: SOCIAL[0].href };

export const ABOUT = {
  photo: "/me/foto.svg",
  paragraphs: [
    "Soy Alejandro, diseñador enfocado en branding y contenido para marcas con personalidad.",
    "Me encanta acompañar a emprendedores desde la idea hasta una marca que se ve, se siente y se recuerda. Trabajo con clientes en Latinoamérica y Brasil.",
  ],
};

export const EXPERIENCE = [
  {
    period: "2025 — presente",
    title: "Branding para Mimi Café (Brasil)",
    description: "Personaje, logotipo y piezas para redes y promociones de la cafetería en Itajubá.",
    image: "/work/mimi/cheesecake-1.webp",
  },
  {
    period: "2024 — presente",
    title: "Diseñador freelance",
    description: "Identidades, piezas gráficas y redes para marcas y emprendimientos.",
    image: "/work/mimi/bubble-waffle.webp",
  },
  {
    period: "20XX — 20XX",
    title: "Tu formación",
    description: "Universidad, carrera o cursos que te formaron como diseñador.",
    image: "/me/foto.svg",
  },
];
