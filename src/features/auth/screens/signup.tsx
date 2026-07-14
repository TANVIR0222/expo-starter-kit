import { router } from "expo-router"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Input } from "@/components/ui/input"
import { Screen } from "@/components/ui/screen"
import { useSession } from "@/features/auth/auth-session"
import { useAuthForm } from "@/features/auth/hooks/use-auth-form"

export default function SignupScreen() {
  const { signIn } = useSession()
  const { email, password, setEmail, setPassword, isValid } = useAuthForm("")

  function handleSubmit() {
    if (!isValid) return
    signIn(email)
    router.replace("/")
  }

  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <HeroPanel
        eyebrow="Signup"
        title="Create your workspace."
        body="Replace this mock flow with your real authentication provider."
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
        <Button label="Create account" onPress={handleSubmit} />
      </Card>
    </Screen>
  )
}
