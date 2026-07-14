import { Stack } from "expo-router/stack"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { AppToaster } from "@/components/ui/app-toaster"
import { useSession } from "@/features/auth/auth-session"
import { AppProviders } from "@/providers/app-providers"
import { useAppTheme } from "@/theme/theme-provider"

function RootNavigator() {
  const { hasHydrated, isSignedIn } = useSession()
  const { resolvedTheme } = useAppTheme()

  if (!hasHydrated) {
    return <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
  }

  return (
    <>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(main)" />
        </Stack.Protected>
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <RootNavigator />
        <AppToaster />
      </AppProviders>
    </GestureHandlerRootView>
  )
}
