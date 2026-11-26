import React from "react";
import { COPY, EMAIL, NAME, SOCIAL, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { scrollToId } from "../lib/motion";

const Footer = () => {
  const t = useT();
  const { lang } = useLang();
  return (
    <footer id="contacto" data-tint="blue" className="pt-28 lg:pt-40">
      <div className="wrap text-center">
        <p data-reveal className="kicker justify-center">{t(COPY.contact.kicker)}</p>
        <h2 data-reveal className="display mx-auto max-w-5xl text-[clamp(2.8rem,8vw,7.4rem)]">{t(COPY.contact.title)}</h2>
        <p data-reveal className="mx-auto mt-7 max-w-xl text-[19px] leading-relaxed text-fg/70">{t(COPY.contact.sub)}</p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="pill pill-light !px-8 !py-4 text-[17px]">{t(COPY.whatsapp)}</a>
          <a href={`mailto:${EMAIL}`} className="pill glass !px-8 !py-4 text-[17px]">{EMAIL}</a>
        </div>
      </div>
      <div className="wrap mt-28 flex flex-col items-center justify-between gap-6 border-t border-line py-8 text-[15px] text-fg/60 md:flex-row">
        <p>© {new Date().getFullYear()} {NAME}. {t(COPY.footer.rights)}</p>
        <ul className="flex flex-wrap justify-center gap-6">
          {SOCIAL.map((s) => (
            <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">{s.label}</a></li>
          ))}
        </ul>
        <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToId("#inicio"); }} className="transition-colors hover:text-fg">{t(COPY.footer.top)} ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
