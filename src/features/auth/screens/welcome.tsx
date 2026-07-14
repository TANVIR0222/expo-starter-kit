import { Link } from "expo-router"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppText } from "@/components/ui/app-text"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Screen } from "@/components/ui/screen"
import { useI18n } from "@/i18n"

export default function WelcomeScreen() {
  const { t } = useI18n()

  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <HeroPanel
        eyebrow={t("welcome.eyebrow")}
        title={t("welcome.title")}
        body={t("welcome.body")}
        meta={t("welcome.meta")}
      />

      <Card>
        <AppText variant="subtitle">What is included?</AppText>
        <AppText tone="muted">
          Auth routes, tabs, dynamic routes, modals, feature folders, i18n,
          config, lib, theme, and tests.
        </AppText>
      </Card>

      <Link href="/login" asChild>
        <Button label={t("common.login")} icon="arrowRight" />
      </Link>
      <Link href="/signup" asChild>
        <Button
          label={t("common.createAccount")}
          variant="secondary"
          icon="userPlus"
        />
      </Link>
    </Screen>
  )
}
