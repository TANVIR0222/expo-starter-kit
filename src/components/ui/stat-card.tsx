import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import { Icon, type IconName } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"

type StatCardProps = {
  label: string
  value: string | number
  icon?: IconName
}

export function StatCard({ label, value, icon }: StatCardProps) {
  const { colors, radius, spacing } = useAppTheme()

  return (
    <Card style={{ flexGrow: 1, minWidth: 120 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
        }}
      >
        <AppText variant="caption" tone="muted">
          {label}
        </AppText>
        {icon ? (
          <View
            style={{
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.pill,
              backgroundColor: colors.surfaceStrong,
            }}
          >
            <Icon name={icon} size={17} color={colors.primary} />
          </View>
        ) : null}
      </View>
      <AppText variant="title" style={{ fontVariant: ["tabular-nums"] }}>
        {value}
      </AppText>
    </Card>
  )
}
