import React, { useEffect, useRef } from "react";
import { FIRST, INTRO, LAST, SPECS } from "../constants";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";
import RegisterText from "./register-text";

const RegMark = () => (
  <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="60" cy="60" r="34" />
    <circle cx="60" cy="60" r="20" />
    <path d="M60 4v112M4 60h112" />
    <path d="M60 40a20 20 0 0 1 0 40z" fill="currentColor" />
  </svg>
);

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hr-fade", { opacity: 0, y: 16, duration: 0.9, stagger: 0.08, delay: 1.1, ease: "power3.out" });
      gsap.from(".hr-bar > span", { scaleY: 0, transformOrigin: "bottom", duration: 0.7, stagger: 0.04, delay: 1.3, ease: "expo.out" });
      gsap.to(".hr-reg", { rotate: 90, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={root} className="gutter relative pb-10 pt-8 md:pb-14 md:pt-10">
      <div className="hr-fade flex items-center justify-between gap-4">
        <p className="slug">Prueba Nº 01 · Portafolio · {new Date().getFullYear()}</p>
        <p className="slug hidden sm:block">Tintas: K · Azul 2728 · Naranja 021</p>
      </div>

      <RegisterText lines={[FIRST, LAST]} className="mt-6 md:mt-8" />

      <div className="mt-8 grid gap-8 border-t border-ink pt-6 md:grid-cols-12 md:gap-6">
        <p className="hr-fade max-w-xl text-2xl font-medium leading-tight md:col-span-5 md:text-[1.75rem]">{INTRO}</p>
        <dl className="hr-fade grid gap-3 md:col-span-4">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-rule pb-2">
              <dt className="slug pt-0.5">{k}</dt>
              <dd className="text-[15px] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="hr-fade flex items-end justify-between gap-6 md:col-span-3 md:flex-col md:items-end">
          <div className="hr-reg h-20 w-20 text-ink md:h-28 md:w-28">
            <RegMark />
          </div>
          <a
            href="#caso"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#caso");
            }}
            className="group inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 font-medium text-sheet transition-colors hover:bg-plate hover:border-plate"
          >
            Ver el caso Mimi Café
            <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </a>
        </div>
      </div>

      <div className="hr-bar mt-10 flex h-5" aria-hidden>
        {[100, 80, 60, 40, 20, 10].map((t) => (
          <span key={t} className="flex-1" style={{ background: `color-mix(in srgb, #0F0F0E ${t}%, #EFEEEA)` }} />
        ))}
        <span className="flex-[2] bg-plate" />
        <span className="flex-1" style={{ background: "color-mix(in srgb, #1430E6 50%, #EFEEEA)" }} />
        <span className="flex-[2] bg-flame" />
        <span className="flex-1" style={{ background: "color-mix(in srgb, #FF4A1C 50%, #EFEEEA)" }} />
        <span className="flex-1" style={{ background: "#3B2E8F", mixBlendMode: "multiply" }} />
      </div>
    </section>
  );
};

export default Hero;
