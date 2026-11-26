import React from "react";
import { COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";

const S = COPY.services;

const Services = () => {
  const t = useT();
  const { lang } = useLang();
  const ask = (name: string) => whatsappHref(lang, `${t(COPY.packageMsg)} "${name}".`);

  return (
    <section id="servicios" data-tint="green" className="py-28 lg:py-40">
      <div className="wrap">
        <p data-reveal className="kicker">{t(S.kicker)}</p>
        <h2 data-reveal className="display max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)]">{t(S.title)}</h2>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {S.packages.map((p) => {
            const featured = (p as any).featured;
            const name = t(p.name);
            return (
              <article key={p.name.es} data-reveal tabIndex={0} className={`focusable glass relative flex flex-col rounded-[28px] p-8 ${featured ? "!bg-blue/[0.14] !border-blue/40" : ""}`}>
                {featured && <span className="absolute right-6 top-6 rounded-full bg-blue px-3 py-1 text-[12px] font-semibold">{t(S.popular)}</span>}
                <h3 className="pr-24 text-[26px] font-semibold tracking-tight">{name}</h3>
                <p className="mt-1 text-[15px] text-fg/60">{t(p.for)}</p>
                <div className="my-7 border-y border-line py-5">
                  {p.price ? (
                    <p>
                      <span className="block text-[13px] text-fg/50">{t(S.from)}</span>
                      <span className="text-[38px] font-light tracking-tight">{p.price}</span>
                    </p>
                  ) : (
                    <p className="text-[24px] font-light tracking-tight">{t(S.custom)}</p>
                  )}
                  <p className="mt-1 text-[14px] text-fg/50">{t(p.time)}</p>
                </div>
                <ul className="grid flex-1 content-start gap-3">
                  {p.items[lang].map((it) => (
                    <li key={it} className="flex gap-3 text-[16px] text-fg/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-lt" />
                      {it}
                    </li>
                  ))}
                </ul>
                <a href={ask(name)} target="_blank" rel="noreferrer" className={`pill mt-9 w-full ${featured ? "pill-blue" : "pill-line"}`}>
                  {t(S.choose)}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
