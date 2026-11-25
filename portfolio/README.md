# Portafolio

Portafolio personal con animaciones suaves: Next.js, GSAP (ScrollTrigger), Tailwind CSS y efecto tilt en las tarjetas.

Basado en [folio](https://github.com/ayush013/folio) de Ayush Singh (licencia MIT, ver `LICENSE`).

## Empezar

```bash
cd portfolio
yarn install
yarn dev        # http://localhost:3000
```

> Con Node 17 o superior, si `yarn build` falla con un error de OpenSSL, usa:
> `NODE_OPTIONS=--openssl-legacy-provider yarn build`

## Personalizar

Casi todo se edita en **`constants.ts`**:

| Qué | Dónde |
|---|---|
| Nombre, título, descripción, dominio | `NAME`, `METADATA` |
| Frases que se escriben solas en el inicio | `TYPED_STRINGS` |
| Correo (botón "Hablemos") | `EMAIL` |
| CV en PDF | pon el archivo en `public/` y ajusta `RESUME_URL` (ej. `"/cv.pdf"`) |
| Redes sociales | `SOCIAL_LINKS` (cada clave usa el icono `public/social/<clave>.svg`) |
| Proyectos | `PROJECTS` (imagen en `public/projects/`, iconos en `public/projects/tech/`) |
| Habilidades | `SKILLS` (iconos en `public/skills/`) |
| Trayectoria | `TIMELINE` (imágenes en `public/timeline/`) |

Las imágenes de `public/projects/proyecto-*.svg` y `public/timeline/slide-*.svg` son de ejemplo: reemplázalas por capturas de tus proyectos (vertical, aprox. 540×1200) y fotos (aprox. 644×360).

Los textos de las secciones "Sobre mí", la frase destacada y "¿Te interesa colaborar?" están en `components/home/about.tsx`, `quote.tsx` y `collaboration.tsx`.

## Publicar

La forma más fácil es [Vercel](https://vercel.com): importa el repo y elige `portfolio` como *Root Directory*.
