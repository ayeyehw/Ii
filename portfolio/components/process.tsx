import React from "react";
import { COPY } from "../constants";
import { useT } from "../lib/lang";

const P = COPY.process;
const BG = ["bg-butter", "bg-sky", "bg-caramel", "bg-mint text-foam"];
const ROT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

const Process = () => {
  const t = useT();
  return (
    <section id="proceso" className="py-24 lg:py-32">
      <div className="wrap">
        <p data-reveal className="mb-3 text-[15px] font-semibold uppercase tracking-wide text-cocoa">{t(P.kicker)}</p>
        <h2 data-reveal className="display max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)]">{t(P.title)}</h2>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {P.steps.map((s, i) => (
            <li key={s.name.es} data-reveal className={`rounded-[28px] border-[3px] border-ink p-7 shadow-[6px_8px_0_#1B1411] transition-transform duration-500 hover:rotate-0 hover:-translate-y-2 ${BG[i]} ${ROT[i]}`}>
              <span className="display flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-foam text-[24px] text-ink">{i + 1}</span>
              <h3 className="display mt-6 text-[24px] lowercase">{t(s.name)}</h3>
              <p className="mt-3 text-[16px] leading-relaxed">{t(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
