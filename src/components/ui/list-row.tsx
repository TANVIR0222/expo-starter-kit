import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Icon, type IconName } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"

type ListRowProps = {
  title: string
  body?: string
  icon?: IconName
  trailing?: React.ReactNode
}

export function ListRow({ title, body, icon, trailing }: ListRowProps) {
  const { colors, radius, spacing } = useAppTheme()

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}
    >
      {icon ? (
        <View
          style={{
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.md,
            backgroundColor: colors.surfaceStrong,
          }}
        >
          <Icon name={icon} size={18} color={colors.primary} />
        </View>
      ) : null}
      <View style={{ flex: 1, gap: spacing.xs }}>
        <AppText variant="subtitle">{title}</AppText>
        {body ? <AppText tone="muted">{body}</AppText> : null}
      </View>
      {trailing}
    </View>
  )
}
