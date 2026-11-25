import React from "react";
import { COPY, EMAIL, WHATSAPP } from "../constants";
import { useLang, useT } from "../lib/lang";
import SectionTitle from "./section-title";

const S = COPY.services;

const Services = () => {
  const t = useT();
  const { lang } = useLang();

  const ask = (name: string) => {
    const msg = lang === "pt" ? `Oi Alejandro! Tenho interesse no pacote "${name}".` : `¡Hola Alejandro! Me interesa el paquete "${name}".`;
    return WHATSAPP
      ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
      : `mailto:${EMAIL}?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="servicios" className="border-t border-line bg-panel py-24 lg:py-36">
      <div className="wrap">
        <SectionTitle kicker={t(S.kicker)} title={t(S.title)} />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {S.packages.map((p) => {
            const featured = (p as any).featured;
            const name = t(p.name);
            return (
              <article
                key={p.name.es}
                data-reveal
                className={`relative flex flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5 ${
                  featured ? "bg-fg text-bg" : "border border-line bg-raise"
                }`}
              >
                {featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-bg px-3 py-1 text-[13px] font-medium text-fg">{t(S.popular)}</span>
                )}
                <h3 className="pr-24 text-[26px] font-semibold tracking-tight">{name}</h3>
                <p className={`mt-2 text-[15px] ${featured ? "text-bg/60" : "text-mute"}`}>{t(p.for)}</p>
                <div className={`my-7 border-y py-5 ${featured ? "border-bg/15" : "border-line"}`}>
                  {p.price ? (
                    <p>
                      <span className={`block text-[13px] ${featured ? "text-bg/60" : "text-mute"}`}>{t(S.from)}</span>
                      <span className="font-serif text-[40px] leading-none">{p.price}</span>
                    </p>
                  ) : (
                    <p className="font-serif text-[28px] leading-tight">{t(S.custom)}</p>
                  )}
                  <p className={`mt-2 text-[14px] ${featured ? "text-bg/60" : "text-mute"}`}>{t(p.time)}</p>
                </div>
                <ul className="grid flex-1 content-start gap-3">
                  {p.items[lang].map((it) => (
                    <li key={it} className="flex gap-3 text-[16px]">
                      <span className={featured ? "text-bg/50" : "text-mute"}>✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={ask(name)}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn mt-9 w-full ${featured ? "bg-bg text-fg hover:-translate-y-0.5" : "btn-ghost"}`}
                >
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
