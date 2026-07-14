import { router } from "expo-router"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppText } from "@/components/ui/app-text"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Screen } from "@/components/ui/screen"
import { SectionHeader } from "@/components/ui/section-header"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { ToggleRow } from "@/components/ui/toggle-row"
import { runtimeConfig } from "@/config/runtime-config"
import { useSession } from "@/features/auth/auth-session"
import { useWorkspaceSync } from "@/features/workspace/hooks/use-workspace-sync"
import { useStarterPreferences } from "@/hooks/use-starter-preferences"
import { useI18n } from "@/i18n"
import { scheduleNotification } from "@/lib/notifications/notification-client"
import { useAppTheme } from "@/theme/theme-provider"

export default function SettingsScreen() {
  const { user, signOut } = useSession()
  const { locale, setLocale, t } = useI18n()
  const { preferences, updatePreference } = useStarterPreferences()
  const { pendingChanges } = useWorkspaceSync()
  const { mode, resolvedTheme, setMode } = useAppTheme()

  function handleSignOut() {
    signOut()
    router.replace("/welcome")
  }

  return (
    <Screen>
      <HeroPanel
        eyebrow="Settings"
        title={t("settings.title")}
        body={t("settings.body")}
      />

      <Card>
        <AppText variant="subtitle">{user?.name}</AppText>
        <AppText tone="muted">{user?.email}</AppText>
        <AppText variant="caption" tone="muted">
          {runtimeConfig.app.defaultWorkspaceName}
        </AppText>
      </Card>

      <SectionHeader title="Preferences" />
      <Card>
        <ToggleRow
          label="Daily digest"
          body="Example persisted preference."
          value={preferences.dailyDigest}
          onValueChange={(value) => updatePreference("dailyDigest", value)}
        />
        <ToggleRow
          label="Compact UI"
          body="Use this pattern for density settings."
          value={preferences.compactUi}
          onValueChange={(value) => updatePreference("compactUi", value)}
        />
      </Card>

      <Card>
        <AppText variant="subtitle">Theme</AppText>
        <AppText tone="muted">Resolved theme: {resolvedTheme}</AppText>
        <SegmentedControl
          value={mode}
          onValueChange={setMode}
          options={[
            { label: "System", value: "system" },
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ]}
        />
      </Card>

      <Card>
        <AppText variant="subtitle">Language</AppText>
        <AppText tone="muted">Active locale: {locale.toUpperCase()}</AppText>
        <SegmentedControl
          value={locale}
          onValueChange={setLocale}
          options={[
            { label: "EN", value: "en" },
            { label: "ES", value: "es" },
          ]}
        />
      </Card>

      <Card>
        <AppText variant="subtitle">Workspace sync</AppText>
        <AppText tone="muted">
          {pendingChanges} local items ready to sync.
        </AppText>
      </Card>

      <Button
        label="Schedule notification"
        variant="secondary"
        onPress={() =>
          scheduleNotification("dailyDigest", new Date(Date.now() + 86400000))
        }
      />
      <Button
        label="Sign out"
        variant="outline"
        icon="signOut"
        onPress={handleSignOut}
      />
    </Screen>
  )
}
