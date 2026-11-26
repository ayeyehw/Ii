import React, { useState } from "react";
import { COPY, NAME, PHOTO } from "../constants";
import { useLang, useT } from "../lib/lang";
import Sticker from "./sticker";

const A = COPY.about;
const F = COPY.faq;

const About = () => {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section id="sobre-mi" className="py-24 lg:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal className="relative mx-auto w-[min(100%,380px)]">
            <div className="rotate-[-4deg] rounded-[10px] border-[3px] border-ink bg-foam p-3 pb-16 shadow-[8px_10px_0_#1B1411]">
              <img src={PHOTO} alt={NAME} className="aspect-[4/5] w-full rounded-[4px] object-cover" />
              <p className="hand absolute bottom-3 left-0 right-0 text-center text-[30px]">{lang === "pt" ? "oi! sou eu" : "¡hola! soy yo"} ✌</p>
            </div>
            <span className="absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2 rotate-[3deg] bg-butter/90 border-2 border-ink/20" />
            <div className="absolute -bottom-6 -right-6 h-24 w-24"><Sticker name="pencil" className="h-full w-full" /></div>
          </div>
          <div>
            <p data-reveal className="mb-3 text-[15px] font-semibold uppercase tracking-wide text-cocoa">{t(A.kicker)}</p>
            <h2 data-reveal className="display text-[clamp(2.4rem,6vw,5.2rem)]">{t(A.title)}</h2>
            {A.text[lang].map((p, i) => (
              <p key={i} data-reveal className={`mt-6 max-w-xl leading-relaxed ${i === 0 ? "text-[22px] font-medium" : "text-[18px]"}`}>
                {p}
              </p>
            ))}
            <div className="mt-10 flex flex-wrap gap-3">
              {A.facts.map((f, i) => (
                <div key={f.k.es} data-reveal className={`rounded-[22px] border-[3px] border-ink px-5 py-3 ${["bg-butter", "bg-sky", "bg-foam"][i]}`}>
                  <p className="text-[13px] font-semibold opacity-70">{t(f.k)}</p>
                  <p className="text-[16px] font-bold">{t(f.v)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 data-reveal className="display text-[clamp(2.2rem,5vw,4.4rem)]">{t(F.kicker)}</h2>
          <div className="grid gap-3">
            {F.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q.es} data-reveal className={`rounded-[24px] border-[3px] border-ink transition-colors duration-300 ${isOpen ? "bg-butter" : "bg-foam"}`}>
                  <button id={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[18px] font-bold">
                    {t(it.q)}
                    <span className={`display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-foam text-lg transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className="acc" data-open={isOpen}>
                    <div>
                      <p className="px-6 pb-6 text-[17px] leading-relaxed">{t(it.a)}</p>
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
