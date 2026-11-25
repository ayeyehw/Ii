import React, { useEffect, useRef } from "react";
import { COPY } from "../constants";
import { useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";
import SectionTitle from "./section-title";

const P = COPY.process;

const Process = () => {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray<HTMLElement>(".pr-dot");
      gsap.fromTo(".pr-fill", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".pr-steps",
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
          onUpdate: (self) =>
            dots.forEach((d, i) => d.classList.toggle("!bg-fg", self.progress >= i / Math.max(1, dots.length - 1) - 0.001)),
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={root} className="py-24 lg:py-36">
      <div className="wrap">
        <SectionTitle kicker={t(P.kicker)} title={t(P.title)} />
        <div className="pr-steps relative mt-16">
          <div className="absolute left-[7px] top-2 hidden h-px w-[calc(100%-14px)] bg-line lg:block" />
          <div className="pr-fill absolute left-[7px] top-2 hidden h-px w-[calc(100%-14px)] origin-left bg-fg lg:block" />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {P.steps.map((s, i) => (
              <li key={s.name.es} data-reveal className="relative">
                <span className="pr-dot relative z-10 mb-8 hidden h-4 w-4 rounded-full border border-fg bg-bg lg:block" />
                <span className="font-serif text-[64px] leading-none text-mute/50">{i + 1}</span>
                <h3 className="mt-4 text-[24px] font-semibold tracking-tight">{t(s.name)}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-mute">{t(s.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
