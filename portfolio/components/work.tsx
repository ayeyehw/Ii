import React, { useEffect, useRef } from "react";
import { COPY, WORK_IMAGES } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { makeThrowable } from "../lib/physics";

const W = COPY.work;
const I = WORK_IMAGES;
const CARDS: { k: keyof typeof I; rot: number; bg: string }[] = [
  { k: "logo", rot: -7, bg: "bg-butter" },
  { k: "cappuccino", rot: 4, bg: "bg-sky" },
  { k: "cheesecake1", rot: -3, bg: "bg-mint" },
  { k: "waffle", rot: 6, bg: "bg-caramel" },
  { k: "cheesecake2", rot: -5, bg: "bg-berry" },
];

/** Work as a fan of cards that lean with the cursor and can be grabbed and thrown. */
const Work = () => {
  const t = useT();
  const { lang } = useLang();
  const deck = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(deck.current!.querySelectorAll<HTMLElement>(".wk-card"));
    const offs = cards.map((c) => makeThrowable(c));
    if (prefersReducedMotion()) return () => offs.forEach((o) => o());
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 260,
        rotate: (i) => (i % 2 ? 30 : -30),
        opacity: 0,
        duration: 1.3,
        stagger: 0.09,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: deck.current, start: "top 80%" },
      });
    }, deck);
    // Lean toward the cursor
    const inners = cards.map((c) => c.querySelector<HTMLElement>(".wk-inner")!);
    const onMove = (e: PointerEvent) => {
      inners.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        gsap.to(el, { rotateY: dx * 18, rotateX: -dy * 18, x: dx * 24, y: dy * 18, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      ctx.revert();
      offs.forEach((o) => o());
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section id="trabajo" className="overflow-hidden py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal className="mb-3 text-[15px] font-semibold uppercase tracking-wide text-cocoa">{t(W.kicker)}</p>
            <h2 data-reveal className="display text-[clamp(3rem,10vw,9rem)]">
              Mimi <span className="text-caramel">Café</span>
            </h2>
          </div>
          <div data-reveal className="md:text-right">
            <p className="hand -rotate-3 text-[30px] text-berry">{t(W.note)}</p>
            <p className="text-[16px] font-semibold">{t(W.place)}</p>
            <a href={W.link} target="_blank" rel="noreferrer" data-cursor="view" className="mt-1 inline-block text-[15px] underline decoration-2 underline-offset-4">
              {t(W.linkLabel)}
            </a>
          </div>
        </div>
      </div>

      <div ref={deck} className="wrap relative mt-14 flex flex-wrap items-start justify-center gap-y-6 md:flex-nowrap md:justify-center" style={{ perspective: 1200 }}>
        {CARDS.map((c, i) => {
          const img = I[c.k];
          return (
            <div key={c.k} data-cursor="drag" className={`wk-card relative w-[44%] select-none sm:w-[30%] md:-mx-[1.2%] md:w-[21%] ${i % 2 ? "md:mt-16" : ""}`} style={{ rotate: `${c.rot}deg`, zIndex: 10 - Math.abs(2 - i) }}>
              <div className={`wk-inner rounded-[22px] border-[3px] border-ink p-2.5 shadow-[6px_8px_0_#1B1411] ${c.bg}`} style={{ transformStyle: "preserve-3d" }}>
                <div className="overflow-hidden rounded-[14px] border-[2.5px] border-ink" style={{ aspectRatio: `${img.w}/${img.h}` }}>
                  <img src={img.src} alt={`Mimi Café: ${t(W.captions[c.k])}`} draggable={false} className="pointer-events-none h-full w-full object-cover" />
                </div>
                <p className="px-1 pb-0.5 pt-2 text-[13px] font-bold leading-tight">{t(W.captions[c.k])}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="wrap mt-20 grid gap-6 md:grid-cols-3">
        {W.blocks.map((b, i) => (
          <div key={b.title.es} data-reveal className={`rounded-[28px] border-[3px] border-ink p-7 ${i ? "bg-sky" : "bg-butter"}`}>
            <h3 className="display mb-3 text-[24px] lowercase">{t(b.title)}</h3>
            <p className="text-[17px] leading-relaxed">{t(b.text)}</p>
          </div>
        ))}
        <div data-reveal className="rounded-[28px] border-[3px] border-ink bg-foam p-7">
          <h3 className="display mb-4 text-[24px] lowercase">{t(W.deliverablesTitle)}</h3>
          <ul className="flex flex-wrap gap-2">
            {W.deliverables[lang].map((d, i) => (
              <li key={d} className={`rounded-full border-2 border-ink px-3.5 py-1 text-[15px] font-semibold ${["bg-caramel", "bg-mint text-foam", "bg-berry text-foam", "bg-butter", "bg-sky"][i % 5]}`}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Work;
