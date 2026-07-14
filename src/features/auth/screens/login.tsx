import { router } from "expo-router"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Screen } from "@/components/ui/screen"
import { useSession } from "@/features/auth/auth-session"
import { useAuthForm } from "@/features/auth/hooks/use-auth-form"

export default function LoginScreen() {
  const { signIn } = useSession()
  const { email, password, setEmail, setPassword, isValid } = useAuthForm()

  function handleSubmit() {
    if (!isValid) return
    signIn(email)
    router.replace("/")
  }

  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <HeroPanel
        eyebrow="Login"
        title="Welcome back."
        body="Use the mock form to enter the starter app."
      />
      <Card>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button label="Continue" onPress={handleSubmit} />
      </Card>
    </Screen>
  )
}
