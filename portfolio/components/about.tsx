import React, { useState } from "react";
import { COPY, NAME, PHOTO } from "../constants";
import { useLang, useT } from "../lib/lang";

const A = COPY.about;
const F = COPY.faq;

const About = () => {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section id="sobre-mi" data-tint="steel" className="py-28 lg:py-40">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div data-reveal className="relative mx-auto w-[min(100%,420px)]">
            <div className="focusable overflow-hidden rounded-[28px]" tabIndex={0}>
              <img src={PHOTO} alt={NAME} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div>
            <p data-reveal className="kicker">{t(A.kicker)}</p>
            <h2 data-reveal className="display text-[clamp(2.2rem,5vw,4.4rem)]">{t(A.title)}</h2>
            {A.text[lang].map((p, i) => (
              <p key={i} data-reveal className={`mt-6 max-w-xl leading-relaxed ${i === 0 ? "text-[21px]" : "text-[17px] text-fg/65"}`}>{p}</p>
            ))}
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {A.facts.map((f) => (
                <div key={f.k.es} data-reveal className="glass rounded-[20px] p-5">
                  <dt className="text-[13px] text-fg/50">{t(f.k)}</dt>
                  <dd className="mt-1 text-[16px] font-medium leading-snug">{t(f.v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section data-tint="steel" className="pb-28 lg:pb-40">
        <div className="wrap grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p data-reveal className="kicker">FAQ</p>
            <h2 data-reveal className="display text-[clamp(2.2rem,5vw,4.4rem)]">{t(F.kicker)}</h2>
          </div>
          <div className="grid gap-3">
            {F.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q.es} data-reveal className={`glass rounded-[22px] transition-colors duration-500 ${isOpen ? "!border-fg/30" : ""}`}>
                  <button id={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[18px] font-medium">
                    {t(it.q)}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-lg font-light transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className="acc" data-open={isOpen}>
                    <div>
                      <p className="px-6 pb-6 text-[17px] leading-relaxed text-fg/70">{t(it.a)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
