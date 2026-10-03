import React, { createContext, useContext, useEffect, useState } from "react";
import { T } from "@/lib/translations";
import { store } from "@/lib/storage";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(store.getLang());
  const setLang = (l) => {
    store.setLang(l);
    setLangState(l);
  };
  const t = (k, ...args) => {
    const v = T[lang][k] ?? T.en[k] ?? k;
    return typeof v === "function" ? v(...args) : v;
  };
  const tx = (obj, field) => obj?.[`${field}_${lang}`] ?? obj?.[`${field}_en`];

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-HK" : "en";
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t, tx }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);