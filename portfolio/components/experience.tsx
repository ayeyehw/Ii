import React, { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "../constants";
import { gsap, ScrollTrigger } from "../lib/motion";
import Title from "./title";

const Experience = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ex-item").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      gsap.fromTo(
        ".ex-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ex-list", start: "top 60%", end: "bottom 60%", scrub: true } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-cream px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Title kicker="Mi camino" big="Experiencia &" script="formación" />
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="ex-list relative pl-8">
            <span className="absolute left-0 top-0 h-full w-0.5 bg-ink/15" />
            <span className="ex-line absolute left-0 top-0 h-full w-0.5 origin-top bg-berry" />
            {EXPERIENCE.map((e, i) => (
              <div key={e.title} className="ex-item relative pb-16 last:pb-0">
                <span
                  className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-[3px] border-ink transition-colors duration-300 ${
                    active === i ? "bg-lime" : "bg-cream"
                  }`}
                />
                <p className="script text-3xl text-berry">{e.period}</p>
                <h3
                  className={`mt-1 font-display text-2xl uppercase transition-opacity duration-300 md:text-3xl ${
                    active === i ? "opacity-100" : "md:opacity-40"
                  }`}
                >
                  {e.title}
                </h3>
                <p className="mt-2 max-w-md text-ink/70">{e.description}</p>
                <img src={e.image} alt="" className="mt-5 w-full max-w-sm rounded-2xl border-[3px] border-ink md:hidden" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="relative hidden md:block">
            <div className="sticky top-32 aspect-[4/5] w-full overflow-hidden rounded-3xl border-[3px] border-ink bg-blush shadow-[8px_8px_0_#16121a]">
              {EXPERIENCE.map((e, i) => (
                <img
                  key={e.title}
                  src={e.image}
                  alt={e.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1) rotate(0deg)" : "scale(1.1) rotate(2deg)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
