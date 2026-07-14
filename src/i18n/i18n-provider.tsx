import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { en } from "@/i18n/translations/en"
import { es } from "@/i18n/translations/es"
import { appStorage } from "@/lib/storage/app-storage"

const dictionaries = { en, es } as const

export type Locale = keyof typeof dictionaries
export type TranslationKey =
  | "common.login"
  | "common.createAccount"
  | "common.logout"
  | "welcome.eyebrow"
  | "welcome.title"
  | "welcome.body"
  | "welcome.meta"
  | "home.title"
  | "home.body"
  | "settings.title"
  | "settings.body"

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)
const localePreferenceKey = "locale"

function getTranslation(locale: Locale, key: TranslationKey) {
  const [section, value] = key.split(".") as [keyof typeof en, string]
  const dictionarySection = dictionaries[locale][section] as Record<
    string,
    string
  >

  return dictionarySection[value] ?? key
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setStoredLocale] = useState<Locale>("en")

  useEffect(() => {
    appStorage.get<Locale>(localePreferenceKey, "en").then(setStoredLocale)
  }, [])

  function setLocale(nextLocale: Locale) {
    setStoredLocale(nextLocale)
    void appStorage.set(localePreferenceKey, nextLocale)
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: TranslationKey) => getTranslation(locale, key),
    }),
    [locale]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)

  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider")
  }

  return value
}
