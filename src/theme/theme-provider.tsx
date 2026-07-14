import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useColorScheme } from "react-native"

import { appStorage } from "@/lib/storage/app-storage"
import { colors } from "@/theme/colors"
import { motion } from "@/theme/motion"
import { radius } from "@/theme/radius"
import { spacing } from "@/theme/spacing"
import { typography } from "@/theme/typography"

export type ThemeMode = "system" | "light" | "dark"
export type ResolvedTheme = "light" | "dark"

const themePreferenceKey = "theme-mode"

type AppThemeContextValue = {
  colors: (typeof colors)[ResolvedTheme]
  mode: ThemeMode
  resolvedTheme: ResolvedTheme
  setMode: (mode: ThemeMode) => void
  motion: typeof motion
  radius: typeof radius
  spacing: typeof spacing
  typography: typeof typography
}

const AppThemeContext = createContext<AppThemeContextValue | null>(null)

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [mode, setStoredMode] = useState<ThemeMode>("system")
  const resolvedTheme: ResolvedTheme =
    mode === "system" ? (systemColorScheme === "dark" ? "dark" : "light") : mode

  useEffect(() => {
    appStorage.get<ThemeMode>(themePreferenceKey, "system").then(setStoredMode)
  }, [])

  function setMode(nextMode: ThemeMode) {
    setStoredMode(nextMode)
    void appStorage.set(themePreferenceKey, nextMode)
  }

  const value = useMemo(
    () => ({
      colors: colors[resolvedTheme],
      mode,
      resolvedTheme,
      setMode,
      motion,
      radius,
      spacing,
      typography,
    }),
    [mode, resolvedTheme]
  )

  const navigationTheme = {
    ...(resolvedTheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(resolvedTheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: value.colors.background,
      border: value.colors.border,
      card: value.colors.background,
      notification: value.colors.primary,
      primary: value.colors.primary,
      text: value.colors.text,
    },
  }

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  )
}

export function useAppTheme() {
  const value = useContext(AppThemeContext)

  if (!value) {
    throw new Error("useAppTheme must be used inside AppThemeProvider")
  }

  return value
}
