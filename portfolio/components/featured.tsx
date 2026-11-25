import React, { useEffect, useRef } from "react";
import { FEATURED } from "../constants";
import { gsap, prefersReducedMotion } from "../lib/motion";

const Featured = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ft-piece").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 120 + i * 40, rotate: i % 2 ? 8 : -8 },
          {
            y: -40 * (i % 2 ? 1 : -1),
            rotate: i % 2 ? -3 : 3,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proyectos" ref={root} className="pink-band relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p data-reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
            {FEATURED.tag}
          </p>
          <h2 data-reveal className="font-display text-7xl uppercase leading-[0.85] md:text-9xl">
            {FEATURED.name}
            <span className="script block text-cocoa normal-case text-8xl md:text-[10rem] ml-10 -mt-2">{FEATURED.script}</span>
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg text-ink/75">
            {FEATURED.description}
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            {FEATURED.tags.map((t) => (
              <span key={t} className="rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-sm font-semibold">
                {t}
              </span>
            ))}
          </div>
          <a data-reveal href={FEATURED.link} target="_blank" rel="noreferrer" className="btn btn-dark mt-8">
            {FEATURED.linkLabel} ↗
          </a>
        </div>
        <div className="grid grid-cols-2 items-start gap-4 md:gap-6">
          {FEATURED.pieces.map((src, i) => (
            <div
              key={src}
              className={`ft-piece overflow-hidden rounded-3xl border-[3px] border-ink bg-cream shadow-[6px_6px_0_#16121a] ${
                i % 2 ? "mt-10 md:mt-16" : ""
              }`}
            >
              <img src={src} alt={`Mimi Café — pieza ${i + 1}`} className="block w-full" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
