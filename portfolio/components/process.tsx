import React, { useEffect, useRef } from "react";
import { COPY } from "../constants";
import { useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";

const P = COPY.process;

const Process = () => {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>(".pr-node");
      gsap.fromTo(".pr-fill", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: {
          trigger: ".pr-steps", start: "top 75%", end: "bottom 60%", scrub: 0.6,
          onUpdate: (self) => nodes.forEach((n, i) => n.classList.toggle("pr-on", self.progress >= i / Math.max(1, nodes.length - 1) - 0.001)),
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={root} data-tint="blue" className="py-28 lg:py-40">
      <style>{`.pr-node{transition:background .5s,box-shadow .5s,border-color .5s}.pr-on{background:#EDEFEA;border-color:#EDEFEA;box-shadow:0 0 24px rgba(141,174,255,.7)}`}</style>
      <div className="wrap">
        <p data-reveal className="kicker">{t(P.kicker)}</p>
        <h2 data-reveal className="display max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)]">{t(P.title)}</h2>
        <div className="pr-steps relative mt-16">
          <div className="absolute left-2 right-2 top-2 hidden h-px bg-line lg:block" />
          <div className="pr-fill absolute left-2 right-2 top-2 hidden h-px origin-left bg-gradient-to-r from-blue to-green-lt lg:block" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {P.steps.map((s, i) => (
              <li key={s.name.es} data-reveal>
                <span className="pr-node relative z-10 mb-8 hidden h-4 w-4 rounded-full border border-fg/40 bg-bg lg:block" />
                <div tabIndex={0} className="focusable glass rounded-[24px] p-7">
                  <span className="text-[14px] tabular-nums text-fg/50">0{i + 1}</span>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-tight">{t(s.name)}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-fg/70">{t(s.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
