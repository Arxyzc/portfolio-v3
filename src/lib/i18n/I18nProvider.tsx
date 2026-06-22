"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultLocale, locales, type Locale } from "./config";
import { dictionaries, type Messages } from "./dictionaries";

type TranslateFn = (key: string) => string;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "locale";

function resolveKey(dict: Messages, key: string): string {
  const value = key
    .split(".")
    .reduce<string | Messages | undefined>((acc, part) => {
      if (acc && typeof acc === "object") {
        return acc[part];
      }
      return undefined;
    }, dict);

  return typeof value === "string" ? value : key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback<TranslateFn>(
    (key) => resolveKey(dictionaries[locale], key),
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
