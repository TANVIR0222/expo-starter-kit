/**
 * __tests__/welcome-screen.test.tsx
 *
 * Tests for the (auth)/index bridge → WelcomeScreen.
 * The bridge re-exports the feature component, so testing the route
 * import is the same as testing the screen component.
 */

import WelcomeScreen from "@/app/(auth)"
import { render } from "@testing-library/react-native"
import React from "react"

// ─── Mock providers that the screen depends on ────────────────────────────────

// useI18n — returns the key itself so assertions don't need real translations
jest.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

// useAppTheme — inside jest.mock factory, imports must use require() not ESM imports
jest.mock("@/theme/theme-provider", async () => {
  // require() inside the factory is allowed (lazy, not out-of-scope)
  const { colors } = await import("@/theme/colors")
  const { spacing } = await import("@/theme/spacing")
  const { radius } = await import("@/theme/radius")
  const { typography } = await import("@/theme/typography")
  const { motion } = await import("@/theme/motion")

  return {
    useAppTheme: () => ({
      colors: colors.light,
      mode: "light",
      resolvedTheme: "light",
      setMode: jest.fn(),
      motion,
      radius,
      spacing,
      typography,
    }),
    AppThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  }
})

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("<WelcomeScreen /> — (auth)/index bridge", () => {
  it("renders without crashing", async () => {
    const { toJSON } = await render(<WelcomeScreen />)
    expect(toJSON()).toBeTruthy()
  })

  it("renders the eyebrow translation key", async () => {
    const { getByText } = await render(<WelcomeScreen />)
    expect(getByText("welcome.eyebrow")).toBeTruthy()
  })

  it("renders the title translation key", async () => {
    const { getByText } = await render(<WelcomeScreen />)
    expect(getByText("welcome.title")).toBeTruthy()
  })

  it("renders the login button label key", async () => {
    const { getByText } = await render(<WelcomeScreen />)
    expect(getByText("common.login")).toBeTruthy()
  })

  it("renders the create account button label key", async () => {
    const { getByText } = await render(<WelcomeScreen />)
    expect(getByText("common.createAccount")).toBeTruthy()
  })
})
