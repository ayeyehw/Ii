import React, { useEffect, useRef } from "react";
import { ABOUT, EMAIL } from "../constants";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";
import Title from "./title";

const About = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      // Las palabras se van "encendiendo" con el scroll.
      gsap.fromTo(
        ".ab-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".ab-text", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.fromTo(
        ".ab-photo",
        { rotate: -8, y: 60 },
        { rotate: 3, y: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre-mi" ref={root} className="pink-wash overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Title kicker="Quién hace el trabajo" big="Conoce a tu" script="diseñador" align="center" />
        <div className="mt-16 grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-64 md:w-80">
            <div className="ab-photo relative rounded-2xl border-[3px] border-ink bg-cream p-3 pb-14 shadow-[8px_8px_0_#16121a]">
              <img src={ABOUT.photo} alt="Foto de Alejandro" className="block w-full rounded-lg" />
              <span className="script absolute bottom-3 left-0 right-0 text-center text-3xl">hola, soy yo ✦</span>
              <span className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-[-4deg] bg-lime/80 border border-ink/20" />
            </div>
            <img src="/stickers/flower.svg" alt="" className="spin-slow absolute -right-8 -top-8 w-20" />
          </div>
          <div>
            <div className="ab-text space-y-5 text-2xl font-medium leading-snug md:text-3xl">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i}>
                  {p.split(" ").map((w, j) => (
                    <span key={j} className="ab-word">
                      {w}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`mailto:${EMAIL}`} className="btn btn-dark">Escríbeme ✉</a>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToId("#contacto"); }} className="btn btn-lime">
                Cuéntame tu proyecto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
