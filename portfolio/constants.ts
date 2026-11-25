// ====== EDITA AQUÍ TODO EL CONTENIDO ======

export const NAME = "Alejandro Sanchez";
export const FIRST = "Alejandro";
export const LAST = "Sanchez";
export const EMAIL = "tu-correo@ejemplo.com";
export const AVAILABILITY = "Agenda abierta para 2027";

export const METADATA = {
  title: "Alejandro Sanchez — Diseño de marca",
  description:
    "Alejandro Sanchez diseña identidades visuales para negocios con carácter: logotipo, personaje, sistema gráfico y piezas para redes.",
};

export const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Caso", href: "#caso" },
  { label: "Perfil", href: "#perfil" },
  { label: "Contacto", href: "#contacto" },
];

export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/tu-usuario/" },
  { label: "Behance", href: "https://www.behance.net/tu-usuario" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tu-usuario/" },
];

export const INTRO =
  "Diseño identidades visuales para negocios con carácter. Del primer boceto al último post, cada pieza sale del mismo sistema.";

export const SPECS = [
  ["Disciplina", "Identidad visual, dirección de arte, piezas para redes"],
  ["Idiomas", "Español, portugués"],
  ["Modalidad", "Remoto, clientes en Latinoamérica y Brasil"],
];

export const SERVICES = [
  {
    plate: "A",
    name: "Identidad",
    detail: "Logotipo, personaje de marca, paleta, tipografías y manual de uso.",
  },
  {
    plate: "B",
    name: "Sistema",
    detail: "Plantillas y reglas para que la marca se vea igual en el local, el menú y el feed.",
  },
  {
    plate: "C",
    name: "Campañas",
    detail: "Piezas de lanzamiento, promociones y productos nuevos listas para publicar.",
  },
  {
    plate: "D",
    name: "Dirección",
    detail: "Fotografía de producto, composición y criterio visual para todo lo que publica la marca.",
  },
];

export interface Piece {
  src: string;
  title: string;
  note: string;
  w: number;
  h: number;
}

export const CASE = {
  client: "Mimi Café",
  place: "Itajubá, Brasil",
  year: "2025",
  scope: "Personaje, logotipo, sistema de color y piezas para redes",
  link: "https://www.instagram.com/mimicafe.br/",
  linkLabel: "@mimicafe.br",
  summary:
    "Una cafetería de barrio que quería sentirse como “seu cantinho de café e carinho”. La identidad gira en torno a Mimi, un personaje que saluda desde el vaso, el menú y cada promoción, con una paleta de café tostado y frutos rojos.",
  pieces: [
    { src: "/work/mimi/logo.webp", title: "Logotipo y personaje", note: "Sello circular, lettering script y la ilustración de Mimi.", w: 1000, h: 1000 },
    { src: "/work/mimi/cappuccino.webp", title: "Cappuccino Canela", note: "Pieza de producto con precio, horario y dirección.", w: 998, h: 1400 },
    { src: "/work/mimi/cheesecake-1.webp", title: "Nova sobremesa", note: "Lanzamiento del cheesecake de frutos rojos.", w: 1000, h: 1392 },
    { src: "/work/mimi/bubble-waffle.webp", title: "Bubble Waffle", note: "Fotografía de producto con el lettering de la marca.", w: 828, h: 1031 },
    { src: "/work/mimi/cheesecake-2.webp", title: "Variante de campaña", note: "La misma sobremesa en clave más gráfica para el feed.", w: 1000, h: 1333 },
  ] as Piece[],
};

export const ABOUT = {
  photo: "/me/foto.svg",
  text: [
    "Soy Alejandro. Me gusta que una marca tenga una idea clara y que esa idea se note en todo, desde el logotipo hasta el post del viernes.",
    "Trabajo con dueños de negocios que quieren verse profesionales sin perder la calidez con la que empezaron.",
  ],
  timeline: [
    ["2025 — hoy", "Identidad y redes para Mimi Café, Itajubá"],
    ["2024 — hoy", "Diseñador independiente de marca"],
  ],
};
