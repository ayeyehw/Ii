import React from "react";
import { COPY, NAME, PHOTO } from "../constants";
import { useLang, useT } from "../lib/lang";

const A = COPY.about;

const About = () => {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="sobre-mi" className="border-t border-line bg-panel py-24 lg:py-36">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-clip className="overflow-hidden rounded-3xl bg-raise" style={{ aspectRatio: "4/5" }}>
          <img data-parallax src={PHOTO} alt={NAME} className="h-full w-full scale-[1.06] object-cover" />
        </div>
        <div>
          <p data-reveal className="kicker mb-4">{t(A.kicker)}</p>
          <h2 data-reveal className="h-section">{t(A.title)}</h2>
          {A.text[lang].map((p, i) => (
            <p key={i} data-reveal className={`mt-6 max-w-xl leading-relaxed ${i === 0 ? "text-[21px]" : "text-[17px] text-mute"}`}>
              {p}
            </p>
          ))}
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {A.facts.map((f) => (
              <div key={f.k.es} data-reveal className="bg-panel p-5">
                <dt className="text-[13px] text-mute">{t(f.k)}</dt>
                <dd className="mt-1 text-[16px] font-medium leading-snug">{t(f.v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
