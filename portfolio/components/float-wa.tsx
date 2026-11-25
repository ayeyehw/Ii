import React, { useEffect, useState } from "react";
import { COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { WaIcon } from "./icons";

/** Floating WhatsApp button that appears once the visitor scrolls past the hero. */
const FloatWa = () => {
  const t = useT();
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const contact = document.getElementById("contacto");
      const nearEnd = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
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
      className={`fixed z-40 flex items-center gap-2 rounded-full bg-wa px-4 py-3 font-medium text-bg shadow-[0_10px_30px_-10px_rgba(37,211,102,.6)] transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ right: "max(16px, env(safe-area-inset-right,0px))", bottom: "calc(16px + env(safe-area-inset-bottom,0px))" }}
    >
      <WaIcon className="h-6 w-6" />
      <span className="hidden text-[15px] sm:inline">WhatsApp</span>
    </a>
  );
};

export default FloatWa;
