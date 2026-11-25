import React from "react";
import { COPY, EMAIL, NAME, SOCIAL, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { scrollToId } from "../lib/motion";
import { WaIcon } from "./icons";

const C = COPY.contact;

const Contact = () => {
  const t = useT();
  const { lang } = useLang();
  return (
    <>
      <section id="contacto" className="border-t border-line py-28 lg:py-44">
        <div className="wrap text-center">
          <h2 data-reveal className="h-display mx-auto max-w-5xl text-[clamp(2.8rem,8vw,7.5rem)]">{t(C.title)}</h2>
          <p data-reveal className="mx-auto mt-7 max-w-xl text-[19px] leading-relaxed text-mute">{t(C.sub)}</p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="btn btn-light !px-8 !py-4 text-[17px]">
              <WaIcon /> {t(COPY.whatsapp)}
            </a>
          </div>
          <p data-reveal className="mt-8 text-[16px] text-mute">
            {t(C.email)}{" "}
            <a href={`mailto:${EMAIL}`} className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-fg">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>
      <footer className="border-t border-line py-10">
        <div className="wrap flex flex-col gap-6 text-[15px] text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {NAME}. {t(COPY.footer.rights)}
          </p>
          <ul className="flex flex-wrap gap-6">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">{s.label}</a>
              </li>
            ))}
          </ul>
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToId("#inicio"); }} className="transition-colors hover:text-fg">
            {t(COPY.footer.top)} ↑
          </a>
        </div>
      </footer>
    </>
  );
};

export default Contact;
