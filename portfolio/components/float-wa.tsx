import React, { useEffect, useState } from "react";
import { COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";

const FloatWa = () => {
  const t = useT();
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const c = document.getElementById("contacto");
      const near = c ? c.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !near);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href={whatsappHref(lang)}
      target="_blank"
      rel="noreferrer"
      aria-label={t(COPY.whatsapp)}
      data-cursor="talk"
      className={`pill fixed z-40 bg-wa !px-5 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}
      style={{ right: "max(16px, env(safe-area-inset-right,0px))", bottom: "calc(16px + env(safe-area-inset-bottom,0px))" }}
    >
      WhatsApp ↗
    </a>
  );
};

export default FloatWa;
