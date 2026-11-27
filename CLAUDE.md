# Memoria del proyecto — Portafolio de Alejandro Sanchez

> Claude: lee esto antes de empezar. Responde SIEMPRE en español (Alejandro escribe desde el celular, en español).
> Actualiza este archivo cuando se tome una decisión importante.

## Quién es y qué vende
- **Alejandro Sanchez**, diseñador de marca + marketing. Clientes en **Brasil, Latinoamérica y EE. UU.**; habla **español, portugués e inglés**.
- Nicho: **marcas de comida** (cafeterías, pastelerías, hamburgueserías), con personajes de marca. Usa IA para producir.
- Objetivo: conseguir clientes que paguen, sobre todo **marketing mensual** (ingreso recurrente).
- Contacto (ya es público en el sitio): ver `EMAIL` y `WHATSAPP` en `portfolio/constants.ts`.

## Proyectos reales (en el portafolio)
- **Mimi Café** (Itajubá, Brasil): **es el negocio de su mamá** → contarlo como "mi primer proyecto fue la cafetería de mi familia". No presentarlo como cliente externo. Resultado: **7.000 visitas al perfil/mes**; él lleva su marketing (no cobra). Tiene video de fondo (rolinho de canela).
  - NO usar la pieza "cheesecake 2" (personaje feo + error "CABA MORDIDA").
- **Akiba Cookies**: marca de cookies con gato pastelero. Solo hay 1 imagen (logo). Falta año y más piezas.
- Pendiente: **Macarons Café** (no se pudo descargar su imagen; pedir que la adjunte en el chat).

## Decisiones de diseño (no cambiar sin preguntar)
- Estilo **"menú de PS5"**: fondo negro vivo (luces azul/verde + partículas), efectos suaves y naturales.
- Paleta: **negro, azul (#2F6BFF), verde oscuro (#0F4D3A / #3FA37C)**. Nada rosa. Sin stickers ni letra a mano.
- Tipografía **Figtree**, un solo color para los textos (nada de letras multicolor).
- **Sin foto** por ahora. Redes sociales ocultas hasta tener los usuarios reales.
- Precios "desde": Identidad esencial **US$ 250**, Marca completa **US$ 600**, Redes mensual **US$ 250/mes** (a EE. UU. cotizar el doble).
- Estado: "Aceptando nuevos clientes".

## "Tu marca conmigo" (restaurante 3D conceptual)
- Marca ficticia **BRASA · Smash Burgers**, piezas provisionales dibujadas con canvas (`portfolio/lib/concept-art.ts`), escena Three.js (`portfolio/lib/restaurant.ts`), UI en `portfolio/components/concept.tsx`.
- Es solo un **esquema**: más adelante Alejandro hará el modelo en **Blender** → exportar `.glb` con objetos nombrados (letrero, pantalla_menu, individual, caja, bolsa…) y reemplazar la escena manteniendo puntos, tour y panel.
- Sus diseños reales se ponen en `CONCEPT.images` (`portfolio/constants.ts`).

## Estructura del repo (`ayeyehw/Ii`)
- Rama de trabajo: **`claude/beautiful-keller-5784yg`** (la rama principal solo tiene 2 videos de Vice City).
- `portfolio/` → sitio Next.js 12 + Tailwind + GSAP + Lenis. Todo el contenido (3 idiomas) está en **`portfolio/constants.ts`**.
  - Componentes: `components/` (header, hero, library [marcas], services, process, about [+FAQ], footer, background, boot, concept, float-wa).
  - Imágenes: `portfolio/public/work/<marca>/`.
- `reel/` → video promocional con **Remotion** (vertical 1080×1920, ES/PT/EN). Trata de **lo que hace Alejandro** (Mimi, Akiba, servicios, precios, WhatsApp), **no** del restaurante 3D.
  - Render: `cd reel && REMOTION_BROWSER=<ruta a chrome-headless-shell> node render.mjs es,pt,en` → `reel/out/`.
  - En la nube: `ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell`.

## Cómo publicar
- **Vista previa (Artifact):** https://claude.ai/artifact/SgqF9kkqPZ8JqpKhCtBFrE — compartido "cualquiera con el enlace".
  - Exportar: `bash portfolio/scripts/export-artifact.sh /tmp/portfolio-export` y publicar `site/page.html` con sus archivos (la carpeta `_next` se renombra a `nx` porque el servicio no acepta rutas que empiezan con `_`).
- **Sitio real:** pendiente publicarlo en **Vercel** (Root Directory = `portfolio`, rama de arriba) y comprar dominio propio. Se ofreció crear un PR a la rama principal.

## Pendientes de Alejandro
- Imagen de Macarons Café, más piezas de Akiba (y su año), usuarios de redes, testimonio de Mimi, publicar en Vercel + dominio.
- Estrategia de ventas acordada: 10 mensajes diarios por Instagram a negocios de comida (mensajes ya escritos en 3 idiomas), oferta de lanzamiento, enfocarse en planes mensuales.

## Notas técnicas
- Este entorno bloquea Instagram, Vercel y enlaces de CloudFront: pedir imágenes como adjuntos en el chat.
- Probar con Playwright (Chromium ya instalado). Para 3D en headless: `--use-gl=swiftshader --enable-webgl --ignore-gpu-blocklist`.
