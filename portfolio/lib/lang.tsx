import React, { createContext, useContext, useEffect, useState } from "react";
import { LANGS, Lang } from "../constants";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "es", setLang: () => {} });

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    const nav = navigator.language?.toLowerCase() || "";
    if (LANGS.includes(saved as Lang)) setLangState(saved as Lang);
    else if (nav.startsWith("pt")) setLangState("pt");
    else if (nav.startsWith("en")) setLangState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en" : "es";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
};

export const useLang = () => useContext(Ctx);
export const useT = () => {
  const { lang } = useLang();
  return <V,>(v: Record<string, V>) => v[lang];
};
