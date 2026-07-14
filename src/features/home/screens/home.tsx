import { Link } from "expo-router"

import { AppText } from "@/components/ui/app-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroPanel } from "@/components/ui/hero-panel"
import { ListRow } from "@/components/ui/list-row"
import { Screen } from "@/components/ui/screen"
import { SectionHeader } from "@/components/ui/section-header"
import { useSession } from "@/features/auth/auth-session"
import { useWorkspaceStore } from "@/features/workspace/workspace-store"
import { useHomeSummary } from "@/hooks/use-home-summary"
import { useI18n } from "@/i18n"
import { useAppTheme } from "@/theme/theme-provider"

export default function HomeScreen() {
  const { user } = useSession()
  const { modules } = useWorkspaceStore()
  const { readyModules, plannedModules } = useHomeSummary(modules)
  const { locale, t } = useI18n()
  const { resolvedTheme } = useAppTheme()

  // console.log(user)

  return (
    <Screen>
      <HeroPanel
        eyebrow="Home"
        title={t("home.title")}
        body={t("home.body")}
        meta={user?.email ?? "Signed in"}
      />

      <Card style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Metric label="Modules" value={modules.length} />
        <Metric label="Ready" value={readyModules} />
        <Metric label="Planned" value={plannedModules} />
      </Card>

      <Link href="/components" asChild>
        <Button label="Open components" icon="components" />
      </Link>

      <SectionHeader
        title="Included systems"
        action={`${resolvedTheme} / ${locale.toUpperCase()}`}
      />
      <Card>
        {modules.map((module) => (
          <ListRow
            key={module.id}
            title={module.name}
            body={
              module.status === "ready"
                ? "Configured and ready to extend."
                : "Included as a placeholder for real setup."
            }
            icon={module.status === "ready" ? "checkCircle" : "clock"}
            trailing={
              <Badge
                label={module.status}
                tone={module.status === "ready" ? "success" : "neutral"}
              />
            }
          />
        ))}
      </Card>
    </Screen>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Card style={{ flexGrow: 1, minWidth: 96, boxShadow: "none" }}>
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
      <AppText variant="title" style={{ fontVariant: ["tabular-nums"] }}>
        {value}
      </AppText>
    </Card>
  )
}
