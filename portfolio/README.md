# Portafolio — Alejandro Sanchez

Portafolio de diseño y branding con estilo editorial (rosa, crema y collage) y animaciones suaves.

**Stack:** Next.js · Tailwind CSS · GSAP + ScrollTrigger · Lenis (scroll suave)

## Empezar

```bash
cd portfolio
yarn install
yarn dev        # http://localhost:3000
```

> Con Node 17 o superior, compila con: `NODE_OPTIONS=--openssl-legacy-provider yarn build`

## Editar el contenido

Todo el texto está en **`constants.ts`**: nombre, correo, redes, rubros, proyectos, contenido, "sobre mí" y experiencia.

| Qué | Dónde |
|---|---|
| Imágenes de proyectos | `public/work/` (reemplaza los `.svg` de ejemplo por tus `.jpg`/`.png` y actualiza la ruta en `constants.ts`) |
| Tu foto | `public/me/` → `ABOUT.photo` |
| Stickers del collage | `public/stickers/` |
| Colores y fuentes | `tailwind.config.js` y `styles/globals.css` |

## Secciones

Barra de anuncio · menú con botón "Contáctame" · cinta de rubros · hero con collage y stickers ·
rubros (lista interactiva) · "PROYECTOS" gigante con scroll · proyecto destacado (Mimi Café) ·
galería con filtros y vista ampliada · mi propio contenido · cintas "Trabajemos juntos" ·
conoce a tu diseñador · experiencia & formación · formulario de contacto · footer con nombre gigante.

## Publicar

En [Vercel](https://vercel.com): importa el repo y elige `portfolio` como *Root Directory*.

---
Proyecto iniciado a partir de [folio](https://github.com/ayush013/folio) (MIT, ver `LICENSE`) y rediseñado por completo.
