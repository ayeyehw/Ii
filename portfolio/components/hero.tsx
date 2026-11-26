import React, { useEffect, useRef } from "react";
import { COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";

const Hero = () => {
  const t = useT();
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 2.1 })
        .from(".hx-line", { opacity: 0, y: 40, filter: "blur(14px)", duration: 1.3, stagger: 0.12, ease: "power3.out" })
        .from(".hx-fade", { opacity: 0, y: 16, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=0.9");
      gsap.to(".hx-content", {
        opacity: 0, y: -60, filter: "blur(8px)", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="inicio" ref={root} data-tint="blue" className="flex min-h-[100svh] items-end pb-16 pt-32 md:items-center md:pb-0">
      <div className="hx-content wrap">
        <p className="hx-fade mb-8 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-[14px] text-fg/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-lt opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-lt" />
          </span>
          {t(COPY.hero.status)}
        </p>
        <h1 className="display text-[clamp(3rem,9vw,8.6rem)]">
          {COPY.hero.lines[lang].map((l, i) => (
            <span key={l} className={`hx-line block ${i === 1 ? "font-semibold" : ""}`}>{l}</span>
          ))}
        </h1>
        <div className="mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <p className="hx-fade max-w-xl text-[19px] leading-relaxed text-fg/70">{t(COPY.hero.sub)}</p>
          <div className="hx-fade flex flex-wrap gap-3">
            <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="pill pill-light">{t(COPY.whatsapp)}</a>
            <a href="#trabajo" onClick={(e) => { e.preventDefault(); scrollToId("#trabajo"); }} className="pill glass">
              {t(COPY.hero.secondary)}
            </a>
          </div>
        </div>
        <div className="hx-fade mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-[15px] text-fg/70">
          {COPY.hero.markets[lang].map((m) => (
            <span key={m} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              {m}
            </span>
          ))}
          <span className="text-fg/40 md:ml-auto">{t(COPY.hero.languages)}</span>
        </div>
        <p className="hx-fade mt-10 hidden items-center gap-3 text-[13px] uppercase tracking-[0.18em] text-mute md:flex">
          <span className="relative h-9 w-5 rounded-full border border-line">
            <span className="absolute left-1/2 top-1.5 h-2 w-0.5 -translate-x-1/2 animate-bounce rounded-full bg-fg/70" />
          </span>
          {t(COPY.hero.scroll)}
        </p>
      </div>
    </section>
  );
};

export default Hero;
