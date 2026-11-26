# Portafolio — Alejandro Sanchez

Portafolio de diseño de marca con estilo de consola: negro, azul y verde oscuro, con animaciones suaves.

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

Intro tipo consola · fondo vivo (luces azul y verde + partículas) · hero · biblioteca de marcas
(mosaicos que se iluminan, el fondo cambia a la marca elegida, flechas ← →, ventana de detalle) ·
paquetes · proceso · sobre mí · preguntas frecuentes · contacto con WhatsApp. Español y portugués.

## Tus 3 marcas

Edita `BRANDS` en `constants.ts`: nombre, rubro, año, resumen, alcance, portada y 3 imágenes.
Pon las imágenes en `public/work/<marca>/` y cambia `example` a `false` para quitar la etiqueta "Ejemplo".

## Publicar

En [Vercel](https://vercel.com): importa el repo y elige `portfolio` como *Root Directory*.

---
Proyecto iniciado a partir de [folio](https://github.com/ayush013/folio) (MIT, ver `LICENSE`) y rediseñado por completo.
