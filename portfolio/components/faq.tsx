import React, { useState } from "react";
import { COPY } from "../constants";
import { useT } from "../lib/lang";

const F = COPY.faq;

const Faq = () => {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p data-reveal className="kicker mb-4">FAQ</p>
          <h2 data-reveal className="h-section">{t(F.kicker)}</h2>
        </div>
        <div className="border-t border-line">
          {F.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q.es} data-reveal className="border-b border-line">
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-medium tracking-tight"
                >
                  {t(it.q)}
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-lg transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className="acc" data-open={isOpen}>
                  <div>
                    <p className="max-w-xl pb-6 text-[17px] leading-relaxed text-mute">{t(it.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
