import React, { useEffect, useRef } from "react";
import { AVAILABILITY, EMAIL, NAME, NAV, SOCIAL } from "../constants";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";

const Footer = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".ft-letter", {
        yPercent: 100,
        stagger: 0.03,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ft-name", start: "top 95%" },
      });
      gsap.from(".ft-sticker", {
        scale: 0,
        rotate: -120,
        stagger: 0.15,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".ft-name", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const [first, ...rest] = NAME.split(" ");
  const letters = (word: string) =>
    word.split("").map((ch, i) => (
      <span key={i} className="ft-letter inline-block">
        {ch}
      </span>
    ));

  return (
    <footer ref={root} className="overflow-hidden bg-ink px-5 pt-20 text-cream md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-cream/15 pb-14 sm:grid-cols-3">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cream/50">Navegación</p>
          <ul className="space-y-2">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => { e.preventDefault(); scrollToId(l.href); }} className="hover:text-lime transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cream/50">Conectemos</p>
          <ul className="space-y-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-lime transition-colors">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-lime transition-colors">{EMAIL}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cream/50">Disponibilidad</p>
          <p className="text-cream/80">
            Diseño de marca, gráfico y contenido. <span className="text-lime">{AVAILABILITY}.</span>
          </p>
        </div>
      </div>

      <div className="ft-name relative mx-auto max-w-7xl py-10 md:py-14">
        <h2 className="text-center font-display uppercase leading-[0.85] text-[16vw] md:text-[12vw]">
          <span className="block overflow-hidden">{letters(first)}</span>
          <span className="block overflow-hidden text-orchid">{letters(rest.join(" "))}</span>
        </h2>
        <img src="/stickers/star.svg" alt="" className="ft-sticker absolute left-[6%] top-[12%] w-12 md:w-20" />
        <img src="/stickers/flower.svg" alt="" className="ft-sticker absolute right-[8%] top-[40%] w-12 md:w-20" />
        <img src="/stickers/burst.svg" alt="" className="ft-sticker absolute bottom-[8%] left-[18%] w-16 md:w-28" />
      </div>
      <p className="pb-8 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {NAME}. Hecho con <span className="script text-base text-orchid">cariño</span>.
      </p>
    </footer>
  );
};

export default Footer;
