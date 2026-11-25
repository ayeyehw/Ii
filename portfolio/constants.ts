// Basado en "folio" de Ayush Singh (https://github.com/ayush013/folio), licencia MIT.
// Ver LICENSE. Contenido adaptado: reemplaza los datos de ejemplo por los tuyos.

// ====== EDITA AQUÍ TUS DATOS ======

export const NAME = "Tu Nombre";

export const METADATA = {
  title: "Portafolio | Tu Nombre",
  description:
    "Desarrollador frontend que une diseño y código para crear experiencias web rápidas, cuidadas y con animaciones fluidas.",
  siteUrl: "https://tu-dominio.com/",
};

export const MENULINKS = [
  { name: "Inicio", ref: "home" },
  { name: "Proyectos", ref: "works" },
  { name: "Habilidades", ref: "skills" },
  { name: "Trayectoria", ref: "timeline" },
  { name: "Contacto", ref: "contact" },
];

export const TYPED_STRINGS = [
  "Diseño y desarrollo experiencias web",
  "Construyo apps frontend modernas",
  "Creo interfaces con animaciones fluidas",
];

export const EMAIL = "tu-correo@ejemplo.com";

// Deja vacío ("") para ocultar el botón de CV. Coloca tu PDF en /public.
export const RESUME_URL = "";

export const SOCIAL_LINKS = {
  github: "https://github.com/ayeyehw",
  linkedin: "https://www.linkedin.com/in/tu-usuario/",
  instagram: "https://www.instagram.com/tu-usuario/",
};

export interface IProject {
  name: string;
  image: string;
  blurImage?: string;
  description: string;
  gradient: [string, string];
  url: string;
  tech: string[];
}

export const PROJECTS: IProject[] = [
  {
    name: "Proyecto Uno",
    image: "/projects/proyecto-1.svg",
    description: "Landing page con animaciones al hacer scroll ✨",
    gradient: ["#1F6582", "#1ABCFE"],
    url: "https://github.com/ayeyehw",
    tech: ["react", "next", "gsap", "tailwind"],
  },
  {
    name: "Proyecto Dos",
    image: "/projects/proyecto-2.svg",
    description: "Dashboard web construido de cero a producción 🚀",
    gradient: ["#153BB9", "#0E2C8B"],
    url: "https://github.com/ayeyehw",
    tech: ["typescript", "react", "sass"],
  },
  {
    name: "Proyecto Tres",
    image: "/projects/proyecto-3.svg",
    description: "Diseño UI en Figma y desarrollo frontend",
    gradient: ["#245B57", "#004741"],
    url: "https://github.com/ayeyehw",
    tech: ["figma", "javascript", "css"],
  },
  {
    name: "Proyecto Cuatro",
    image: "/projects/proyecto-4.svg",
    description: "Paquete open source publicado en npm 📦",
    gradient: ["#3A0000", "#771E1E"],
    url: "https://github.com/ayeyehw",
    tech: ["npm", "typescript"],
  },
];

export const SKILLS = {
  frontend: [
    "javascript",
    "react",
    "next",
    "gsap",
    "tailwind",
    "sass",
    "html",
    "css",
  ],
  userInterface: ["figma", "photoshop", "illustrator"],
  other: ["git", "webpack"],
};

export enum Branch {
  LEFT = "leftSide",
  RIGHT = "rightSide",
}

export enum NodeTypes {
  CONVERGE = "converge",
  DIVERGE = "diverge",
  CHECKPOINT = "checkpoint",
}

export enum ItemSize {
  SMALL = "small",
  LARGE = "large",
}

export const TIMELINE: Array<TimelineNodeV2> = [
  {
    type: NodeTypes.CHECKPOINT,
    title: "2026",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Desarrollador Frontend (Actual)",
    size: ItemSize.SMALL,
    subtitle: "Empresa / proyecto actual. Describe en una línea lo que haces.",
    slideImage: "/timeline/slide-1.svg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "2025",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.DIVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Freelance",
    size: ItemSize.SMALL,
    subtitle: "Sitios web y landing pages para clientes 🎯",
    slideImage: "/timeline/slide-2.svg",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Proyecto personal",
    size: ItemSize.SMALL,
    subtitle: "Algo de lo que estés orgulloso 🚀",
    slideImage: "/timeline/slide-3.svg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CONVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "2024",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Estudios 🎓",
    size: ItemSize.SMALL,
    subtitle: "Universidad, bootcamp o cursos que te formaron.",
    slideImage: "/timeline/slide-4.svg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
];

export type TimelineNodeV2 = CheckpointNode | BranchNode;

export interface CheckpointNode {
  type: NodeTypes.CHECKPOINT;
  title: string;
  subtitle?: string;
  size: ItemSize;
  image?: string;
  slideImage?: string;
  shouldDrawLine: boolean;
  alignment: Branch;
}

export interface BranchNode {
  type: NodeTypes.CONVERGE | NodeTypes.DIVERGE;
}
