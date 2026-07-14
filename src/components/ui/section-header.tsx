import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"

export function SectionHeader({
  title,
  action,
}: {
  title: string
  action?: string
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppText variant="subtitle">{title}</AppText>
      {action ? (
        <AppText variant="caption" tone="muted">
          {action}
        </AppText>
      ) : null}
    </View>
  )
}
