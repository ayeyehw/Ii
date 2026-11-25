import React, { useEffect, useRef } from "react";
import { FIRST_NAME, ROLE } from "../constants";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";

const CARDS = [
  { src: "/work/mimi-logo.svg", cls: "left-[4%] top-[14%] w-[46%] -rotate-6", depth: 20 },
  { src: "/work/poster-1.svg", cls: "right-[2%] top-[2%] w-[40%] rotate-6", depth: 35 },
  { src: "/work/mimi-cup.svg", cls: "left-[34%] top-[40%] w-[38%] rotate-3", depth: 50 },
];

const STICKERS = [
  { src: "/stickers/burst.svg", cls: "left-[-2%] top-[62%] w-24 md:w-32", depth: 70 },
  { src: "/stickers/star.svg", cls: "right-[8%] top-[60%] w-14 md:w-20", depth: 90 },
  { src: "/stickers/flower.svg", cls: "left-[40%] top-[-2%] w-14 md:w-16", depth: 60 },
];

const CircleBadge = () => (
  <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
    <defs>
      <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
    </defs>
    <circle cx="100" cy="100" r="98" fill="#16121A" />
    <text fill="#F2E86D" fontSize="19" fontWeight="700" letterSpacing="3.5">
      <textPath href="#circ">DISPONIBLE · PARA · PROYECTOS · ✦ ·</textPath>
    </text>
    <text x="100" y="114" textAnchor="middle" fontSize="40" fill="#F6D9EC">☕</text>
  </svg>
);

const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const collage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = prefersReducedMotion();
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line > span", { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .from(".hero-fade", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(
          ".hero-card",
          { opacity: 0, scale: 0.6, rotate: (i) => (i % 2 ? 20 : -20), y: 80, duration: 1.2, stagger: 0.12, ease: "back.out(1.6)" },
          "-=1"
        )
        .from(".hero-sticker", { scale: 0, rotate: -90, duration: 0.8, stagger: 0.1, ease: "back.out(2.5)" }, "-=0.7");

      if (!reduce) {
        gsap.utils.toArray<HTMLElement>(".hero-float").forEach((el, i) => {
          gsap.to(el, { y: i % 2 ? 12 : -12, rotation: i % 2 ? 2 : -2, duration: 2.5 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });
        // Parallax al hacer scroll
        gsap.to(".hero-collage", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    // Parallax con el mouse
    const onMove = (e: MouseEvent) => {
      if (prefersReducedMotion() || !collage.current) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      collage.current.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = Number(el.dataset.depth);
        gsap.to(el, { x: x * d, y: y * d, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="inicio" ref={root} className="pink-wash relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-10 md:grid-cols-2 md:px-10 md:pb-28 md:pt-16">
        <div>
          <p className="hero-fade mb-6 text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
            ✦ {FIRST_NAME} — {ROLE}
          </p>
          <h1 className="font-display uppercase leading-[0.88] text-[10.5vw] sm:text-7xl md:text-[4.4vw] 2xl:text-[4.4rem]">
            <span className="hero-line block overflow-hidden"><span className="block">Bienvenidos</span></span>
            <span className="hero-line block overflow-hidden"><span className="block">a mi mundo</span></span>
            <span className="hero-line block overflow-hidden pb-3">
              <span className="script block text-berry text-[17vw] sm:text-8xl md:text-[7vw] 2xl:text-[8.5rem] normal-case">creativo</span>
            </span>
          </h1>
          <p className="hero-fade mt-6 max-w-md text-lg text-ink/75">
            Diseño marcas con personalidad: identidad visual, piezas gráficas y contenido que hace que la gente se
            quede mirando.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-4">
            <a href="#proyectos" onClick={(e) => { e.preventDefault(); scrollToId("#proyectos"); }} className="btn btn-dark">
              Ver proyectos ↓
            </a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToId("#contacto"); }} className="btn btn-lime">
              Hablemos ✦
            </a>
          </div>
        </div>

        <div ref={collage} className="hero-collage relative mx-auto aspect-square w-full max-w-[560px]">
          {CARDS.map((c) => (
            <div key={c.src} data-depth={c.depth} className={`absolute ${c.cls}`}>
              <div className="hero-card hero-float overflow-hidden rounded-2xl border-[3px] border-ink bg-cream shadow-[8px_8px_0_#16121a]">
                <img src={c.src} alt="" className="block w-full" />
              </div>
            </div>
          ))}
          {STICKERS.map((s) => (
            <div key={s.src} data-depth={s.depth} className={`absolute ${s.cls}`}>
              <img src={s.src} alt="" className="hero-sticker hero-float w-full drop-shadow-lg" />
            </div>
          ))}
          <div data-depth={40} className="absolute bottom-[2%] right-[4%] h-24 w-24 md:h-32 md:w-32">
            <div className="hero-sticker h-full w-full"><CircleBadge /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
