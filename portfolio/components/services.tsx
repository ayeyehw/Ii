import React, { useEffect, useRef } from "react";
import { COPY, EMAIL, WHATSAPP } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";

const S = COPY.services;
const LOOK = [
  { bg: "bg-mint", fg: "text-foam", sticker: "pencil", rot: -6 },
  { bg: "bg-caramel", fg: "text-ink", sticker: "cup", rot: 0 },
  { bg: "bg-sky", fg: "text-ink", sticker: "smile", rot: 6 },
];

/** Packages as a hand of cards: on hover the hand spreads open with an elastic bounce. */
const Services = () => {
  const t = useT();
  const { lang } = useLang();
  const hand = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hand.current!;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".sv-card"));
    const mq = window.matchMedia("(min-width: 1024px)");
    const spread = (open: boolean) => {
      if (!mq.matches || prefersReducedMotion()) return;
      cards.forEach((c, i) =>
        gsap.to(c, { x: open ? (i - 1) * 70 : 0, rotate: open ? (i - 1) * 2.5 : LOOK[i].rot, duration: 1, ease: "elastic.out(1, 0.55)" })
      );
    };
    const enter = () => spread(true);
    const leave = () => {
      spread(false);
      cards.forEach((c) => gsap.to(c, { scale: 1, y: 0, duration: 0.6, ease: "power3.out" }));
    };
    const offs = cards.map((c) => {
      const on = () => {
        if (!mq.matches) return;
        cards.forEach((o) => gsap.to(o, { scale: o === c ? 1.05 : 0.97, y: o === c ? -16 : 0, zIndex: o === c ? 5 : 1, duration: 0.6, ease: "back.out(2)" }));
      };
      c.addEventListener("mouseenter", on);
      return () => c.removeEventListener("mouseenter", on);
    });
    if (mq.matches) cards.forEach((c, i) => gsap.set(c, { rotate: LOOK[i].rot }));
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      offs.forEach((o) => o());
    };
  }, []);

  const ask = (name: string) => {
    const msg = lang === "pt" ? `Oi Alejandro! Tenho interesse no pacote "${name}".` : `¡Hola Alejandro! Me interesa el paquete "${name}".`;
    return WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` : `mailto:${EMAIL}?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="servicios" className="overflow-hidden py-24 lg:py-32">
      <div className="wrap text-center">
        <p data-reveal className="mb-3 text-[15px] font-semibold uppercase tracking-wide text-cocoa">{t(S.kicker)}</p>
        <h2 data-reveal className="display mx-auto max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)]">{t(S.title)}</h2>
        <p data-reveal className="hand mt-3 -rotate-2 text-[28px] text-berry">
          {lang === "pt" ? "passa o mouse nas cartas ↓" : "pasa el mouse por las cartas ↓"}
        </p>
      </div>
      <div ref={hand} className="wrap mt-14 flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center lg:gap-0 lg:py-6">
        {S.packages.map((p, i) => {
          const look = LOOK[i];
          const name = t(p.name);
          return (
            <article
              key={p.name.es}
              className={`sv-card relative flex w-full max-w-[400px] flex-col rounded-[30px] border-[3px] border-ink p-7 shadow-[8px_10px_0_#1B1411] lg:-mx-6 lg:w-[34%] ${look.bg} ${look.fg}`}
            >
              <img src={`/stickers/${look.sticker}.svg`} alt="" className="absolute -right-5 -top-7 h-20 w-20 rotate-12" />
              {(p as any).featured && (
                <span className="hand mb-1 inline-block -rotate-3 text-[24px]">{t(S.popular)} ★</span>
              )}
              <h3 className="display pr-10 text-[28px] lowercase leading-[1]">{name}</h3>
              <p className="mt-2 text-[16px] opacity-80">{t(p.for)}</p>
              <div className="my-6 rounded-2xl border-[2.5px] border-ink bg-foam p-4 text-ink">
                {p.price ? (
                  <p>
                    <span className="block text-[13px] font-semibold opacity-60">{t(S.from)}</span>
                    <span className="display text-[34px]">{p.price}</span>
                  </p>
                ) : (
                  <p className="display text-[20px] lowercase">{t(S.custom)}</p>
                )}
                <p className="mt-1 text-[14px] font-semibold opacity-60">⏱ {t(p.time)}</p>
              </div>
              <ul className="grid flex-1 content-start gap-2.5">
                {p.items[lang].map((it) => (
                  <li key={it} className="flex gap-2.5 text-[16px] font-medium">
                    <span>✳</span>
                    {it}
                  </li>
                ))}
              </ul>
              <a href={ask(name)} target="_blank" rel="noreferrer" data-cursor="talk" className="pill pill-ink mt-8 w-full">
                {t(S.choose)} →
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
