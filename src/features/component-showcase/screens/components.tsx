import { useState } from "react"
import { View } from "react-native"

import { Alert } from "@/components/ui/alert"
import { AppText } from "@/components/ui/app-text"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckboxRow } from "@/components/ui/checkbox-row"
import { Divider } from "@/components/ui/divider"
import { EmptyState } from "@/components/ui/empty-state"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { ListRow } from "@/components/ui/list-row"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Screen } from "@/components/ui/screen"
import { SectionHeader } from "@/components/ui/section-header"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { StatCard } from "@/components/ui/stat-card"
import { ToggleRow } from "@/components/ui/toggle-row"
import { useComponentCatalog } from "@/features/component-showcase/hooks/use-component-catalog"
import { useStarterPreferences } from "@/hooks/use-starter-preferences"
import { appToast } from "@/lib/toast/app-toast"

export default function ComponentsScreen() {
  const { count } = useComponentCatalog()
  const { preferences, updatePreference } = useStarterPreferences()
  const [checked, setChecked] = useState(true)

  // console.log(process.env.EXPO_PUBLIC_EAS_PROJECT_ID)

  return (
    <Screen>
      <HeroPanel
        eyebrow="Components"
        title="Reusable UI building blocks."
        body="Use this page as a quick visual reference before building your own features."
        meta={`${count} starter groups`}
      />

      <SectionHeader title="Buttons" action="Variants" />
      <Card>
        <Button label="Primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Outline" variant="outline" />
        <Button label="Ghost" variant="ghost" />
        <Button label="Danger" variant="danger" />
        <Button
          label="With icon"
          variant="secondary"
          icon="arrowRight"
          iconPosition="right"
        />
        <Button label="Loading" loading />
        <Button
          label="Small inline"
          size="sm"
          fullWidth={false}
          variant="outline"
        />
      </Card>

      <SectionHeader title="Icon buttons" action="Actions" />
      <Card style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <IconButton name="search" />
        <IconButton name="filter" variant="outline" />
        <IconButton name="refresh" variant="ghost" />
        <IconButton name="trash" variant="danger" />
        <IconButton name="add" variant="primary" />
      </Card>

      <SectionHeader title="Inputs" action="States" />
      <Card>
        <Input label="Default" placeholder="Type something useful" />
        <Input
          label="Filled"
          variant="filled"
          placeholder="Filled input"
          leftIcon="search"
        />
        <Input
          label="Quiet"
          variant="quiet"
          placeholder="Quiet input"
          rightIcon="close"
        />
        <Input
          label="Large"
          size="lg"
          placeholder="Large input"
          leftIcon="folder"
        />
        <Input
          label="With error"
          value="invalid-email"
          error="Use a valid email address."
        />
      </Card>

      <SectionHeader title="Status" action="Badges and alerts" />
      <Card>
        <Badge label="Neutral" />
        <Badge label="Success" tone="success" />
        <Badge label="Info" tone="info" />
        <Badge label="Warning" tone="warning" />
        <Badge label="Danger" tone="danger" />
        <Alert
          title="Information"
          body="This alert uses theme tokens, so it adapts to light and dark mode."
        />
        <Alert
          title="Saved"
          body="Use success feedback after important actions."
          tone="success"
        />
        <Alert
          title="Check settings"
          body="Warnings use a separate theme token so they do not look like errors."
          tone="warning"
        />
        <Alert
          title="Action failed"
          body="Danger feedback is useful for validation and destructive actions."
          tone="danger"
        />
      </Card>

      <SectionHeader title="Toasts" action="Sonner Native" />
      <Card>
        <AppText tone="muted">
          Use the app toast wrapper from anywhere without coupling screens to
          the toast library.
        </AppText>
        <Button
          label="Show success toast"
          variant="secondary"
          onPress={() =>
            appToast.success("Starter kit ready", {
              description: "Your reusable UI system is wired up.",
            })
          }
        />
        <Button
          label="Show warning toast"
          variant="outline"
          onPress={() =>
            appToast.warning("Check your config", {
              description: "Use this pattern for non-blocking feedback.",
            })
          }
        />
        <Button
          label="Show error toast"
          variant="danger"
          onPress={() =>
            appToast.error("Something went wrong", {
              description: "Error toasts use the danger theme tokens.",
            })
          }
        />
      </Card>

      <SectionHeader title="Settings controls" />
      <Card>
        <SegmentedControl
          value={preferences.compactUi ? "compact" : "comfortable"}
          onValueChange={(value) =>
            updatePreference("compactUi", value === "compact")
          }
          options={[
            { label: "Comfort", value: "comfortable" },
            { label: "Compact", value: "compact" },
          ]}
        />
        <ToggleRow
          label="Daily digest"
          body="A reusable row for boolean preferences."
          value={preferences.dailyDigest}
          onValueChange={(value) => updatePreference("dailyDigest", value)}
        />
        <CheckboxRow
          label="Enable starter checklist"
          body="A dependency-free checkbox row built with Pressable."
          checked={checked}
          onCheckedChange={setChecked}
        />
      </Card>

      <SectionHeader title="Data display" />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        <StatCard label="Components" value={15} icon="components" />
        <StatCard label="Ready" value="100%" icon="checkCircle" />
      </View>
      <Card>
        <ProgressBar label="Setup progress" value={72} tone="success" />
        <ProgressBar label="Documentation" value={46} tone="info" />
      </Card>

      <SectionHeader title="Surfaces" />
      <Card>
        <View>
          <Icon name="sparkles" />
          <AppText variant="subtitle">Icon wrapper</AppText>
          <AppText tone="muted">
            Use semantic names and let the app map symbols per platform.
          </AppText>
        </View>
        <ListRow
          title="Starter User"
          body="List rows handle icon, copy, and trailing content."
          icon="person"
          trailing={<Avatar name="Starter User" />}
        />
        <Divider />
        <AppText variant="subtitle">Card content</AppText>
        <AppText tone="muted">
          Cards, rows, and dividers share the same border, radius, and spacing
          system.
        </AppText>
      </Card>

      <SectionHeader title="Loading" />
      <Card>
        <LoadingIndicator label="Loading starter data..." />
      </Card>

      <EmptyState
        title="Empty state"
        body="Use this when a screen has no data yet, then add an action button nearby."
      />
    </Screen>
  )
}
