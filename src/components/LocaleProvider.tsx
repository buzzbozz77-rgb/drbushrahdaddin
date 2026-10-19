"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  t: (typeof dictionary)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "locale";

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export const noFlashLocaleScript = `
(function () {
  try {
    var locale = localStorage.getItem('${STORAGE_KEY}') || 'en';
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  } catch (e) {}
})();
`;

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Locale | null) ?? "en";
    setLocale(stored);
    applyDocumentLocale(stored);
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next: Locale = prev === "en" ? "ar" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      applyDocumentLocale(next);
      return next;
    });
  };

  const value = useMemo(
    () => ({ locale, toggleLocale, t: dictionary[locale] }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
