import { Stack } from "expo-router/stack"

import { useAppTheme } from "@/theme/theme-provider"

export default function AuthLayout() {
  const { colors } = useAppTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  )
}
