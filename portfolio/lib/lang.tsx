import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "../constants";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "es", setLang: () => {} });

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    if (saved === "es" || saved === "pt") setLangState(saved);
    else if (navigator.language?.toLowerCase().startsWith("pt")) setLangState("pt");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "es";
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
