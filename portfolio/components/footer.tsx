import React, { useEffect, useRef } from "react";
import { FIRST, LAST, NAME } from "../constants";
import { prefersReducedMotion } from "../lib/motion";

/** The name as live type: each letter widens and thickens as the cursor gets close. */
const Footer = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const letters = Array.from(el.querySelectorAll<HTMLElement>(".ft-l"));
    if (prefersReducedMotion()) return;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    const state = letters.map(() => ({ w: 60, g: 300 }));

    const loop = () => {
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 420);
        const tw = 60 + 90 * k;
        const tg = 300 + 600 * k;
        state[i].w += (tw - state[i].w) * 0.12;
        state[i].g += (tg - state[i].g) * 0.12;
        l.style.fontStretch = `${state[i].w.toFixed(1)}%`;
        l.style.fontWeight = `${Math.round(state[i].g)}`;
      });
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const word = (w: string) =>
    w.split("").map((c, i) => (
      <span key={i} className="ft-l inline-block" style={{ fontStretch: "60%", fontWeight: 300 }}>
        {c}
      </span>
    ));

  return (
    <footer className="gutter overflow-hidden bg-paper pb-8 pt-16">
      <div ref={root} className="select-none font-display uppercase leading-[0.82] text-[clamp(4.5rem,22vw,24rem)] tracking-[-0.02em]" aria-label={NAME}>
        <div aria-hidden className="whitespace-nowrap">{word(FIRST)}</div>
        <div aria-hidden className="whitespace-nowrap text-plate">{word(LAST)}</div>
      </div>
      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-4">
        <p className="slug">© {new Date().getFullYear()} {NAME}</p>
        <p className="slug">Compuesto en Anybody, Schibsted Grotesk y Martian Mono</p>
        <p className="slug">Prueba Nº 01 · Aprobada para imprenta</p>
      </div>
    </footer>
  );
};

export default Footer;
