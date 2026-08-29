"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "ml";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, ml: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (en: string) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ml" : "en"));
  }, []);

  const t = useCallback(
    (en: string, ml: string) => {
      return lang === "en" ? en : ml;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
