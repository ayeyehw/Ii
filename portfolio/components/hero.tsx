import React, { useEffect, useRef } from "react";
import { COPY, WORK_IMAGES, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";
import Sticker from "./sticker";

const renderLine = (line: string) =>
  line.split(/(\{[a-z]+:[a-z0-9]+\})/).map((part, i) => {
    const m = part.match(/^\{(img|sticker):([a-z0-9]+)\}$/);
    if (!m) {
      return part.split(" ").filter(Boolean).map((w, j) => (
        <span key={`${i}-${j}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <span className="hx-word inline-block">{w}&nbsp;</span>
        </span>
      ));
    }
    if (m[1] === "img") {
      const img = (WORK_IMAGES as any)[m[2]];
      return (
        <span key={i} className="hx-pop mr-[0.25em] inline-block h-[0.82em] w-[1.7em] -translate-y-[0.04em] overflow-hidden rounded-full border-[3px] border-ink align-middle">
          <img src={img.src} alt="" className="h-full w-full object-cover" />
        </span>
      );
    }
    return (
      <span key={i} className="hx-pop mr-[0.2em] inline-block h-[0.95em] w-[0.95em] align-middle">
        <Sticker name={m[2]} className="h-full w-full" />
      </span>
    );
  });

const Hero = () => {
  const t = useT();
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
      tl.from(".hx-word", { yPercent: 115, rotate: 6, duration: 1.1, stagger: 0.06 })
        .from(".hx-pop", { scale: 0, rotate: -30, duration: 0.9, stagger: 0.1, ease: "elastic.out(1,0.5)" }, "-=0.8")
        .fromTo(".hx-line path", { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, "-=0.5")
        .from(".hx-fade", { opacity: 0, y: 20, duration: 0.8, stagger: 0.08 }, "-=0.7")
        .from(".hx-float", { scale: 0, rotate: () => gsap.utils.random(-90, 90), duration: 1.1, stagger: 0.08, ease: "elastic.out(1,0.45)" }, "-=0.9");
      gsap.utils.toArray<HTMLElement>(".hx-float").forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 10 : -10, rotate: i % 2 ? 4 : -4, duration: 2.4 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);

  const lines = COPY.hero.lines[lang];

  return (
    <section id="inicio" ref={root} className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div className="wrap relative">
        <p className="hx-fade mb-8 inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-ink bg-foam px-4 py-1.5 text-[14px] font-semibold">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-wa" />
          {t(COPY.hero.status)}
        </p>
        <h1 className="display relative text-[clamp(2.6rem,8.4vw,8.4rem)]">
          {lines.map((l, i) => (
            <span key={i} className="relative block">
              {renderLine(l)}
              {i === 1 && (
                <svg className="hx-line pointer-events-none absolute -bottom-[0.12em] left-0 h-[0.3em] w-[min(100%,9.5em)]" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden>
                  <path d="M6 28 C 120 8, 260 34, 380 18 S 560 10, 594 22" fill="none" stroke="#C8763A" strokeWidth="9" strokeLinecap="round" style={{ strokeDasharray: 900 }} />
                </svg>
              )}
            </span>
          ))}
        </h1>

        <div className="mt-12 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <p className="hx-fade max-w-xl text-[20px] leading-snug">{t(COPY.hero.sub)}</p>
          <div className="hx-fade flex flex-wrap gap-3">
            <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" data-cursor="talk" className="pill bg-wa">
              WhatsApp ↗
            </a>
            <a href="#trabajo" data-cursor="view" onClick={(e) => { e.preventDefault(); scrollToId("#trabajo"); }} className="pill pill-butter">
              {t(COPY.hero.secondary)} ↓
            </a>
          </div>
        </div>

        <p className="hx-fade hand absolute right-[6%] top-6 hidden rotate-[-6deg] text-[26px] text-cocoa md:block">
          {t(COPY.hero.note)}
          <svg viewBox="0 0 80 60" className="ml-auto mt-1 h-10 w-14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M8 6c30 4 52 18 58 44M54 40l12 10 6-14" />
          </svg>
        </p>
      </div>

      <div className="hx-float absolute right-[5%] top-[34%] hidden h-28 w-28 md:block"><Sticker name="star" className="h-full w-full" /></div>
      <div className="hx-float absolute right-[26%] top-[38%] hidden h-20 w-20 lg:block"><Sticker name="heart" className="h-full w-full" /></div>
      <div className="hx-float absolute bottom-[14%] right-[40%] hidden h-24 w-24 lg:block"><Sticker name="hand" className="h-full w-full" /></div>
      <div className="hx-float absolute right-[3%] top-[58%] hidden h-20 w-20 md:block"><Sticker name="bean" className="h-full w-full" /></div>
    </section>
  );
};

export default Hero;
