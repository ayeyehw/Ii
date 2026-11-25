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
  tag: "01 · Branding · Brasil 🇧🇷",
  description:
    "Identidad visual y contenido para Mimi Café, una cafetería en Brasil. Una marca cálida, cercana y con mucho cariño en cada detalle.",
  link: "https://www.instagram.com/mimicafe.br/",
  linkLabel: "Ver @mimicafe.br",
  pieces: [
    "/work/mimi-logo.svg",
    "/work/mimi-cup.svg",
    "/work/mimi-feed.svg",
    "/work/mimi-menu.svg",
  ],
};

export const WORK: WorkPiece[] = [
  { title: "Logo & sistema", client: "Mimi Café", image: "/work/mimi-logo.svg", category: "branding" },
  { title: "Vaso para llevar", client: "Mimi Café", image: "/work/mimi-cup.svg", category: "branding", tall: true },
  { title: "Feed de Instagram", client: "Mimi Café", image: "/work/mimi-feed.svg", category: "redes", tall: true },
  { title: "Menú", client: "Mimi Café", image: "/work/mimi-menu.svg", category: "grafico" },
  { title: "Póster de evento", client: "Proyecto ejemplo", image: "/work/poster-1.svg", category: "grafico", tall: true },
  { title: "Identidad", client: "Proyecto ejemplo", image: "/work/brand-1.svg", category: "branding" },
  { title: "Campaña", client: "Proyecto ejemplo", image: "/work/post-1.svg", category: "redes" },
  { title: "Póster tipográfico", client: "Proyecto ejemplo", image: "/work/poster-2.svg", category: "grafico", tall: true },
  { title: "Packaging", client: "Proyecto ejemplo", image: "/work/brand-2.svg", category: "branding" },
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
    description: "Identidad visual, piezas gráficas y contenido para redes de la cafetería.",
    image: "/work/mimi-cup.svg",
  },
  {
    period: "2024 — presente",
    title: "Diseñador freelance",
    description: "Identidades, piezas gráficas y redes para marcas y emprendimientos.",
    image: "/work/brand-1.svg",
  },
  {
    period: "20XX — 20XX",
    title: "Tu formación",
    description: "Universidad, carrera o cursos que te formaron como diseñador.",
    image: "/work/poster-2.svg",
  },
];
