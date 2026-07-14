import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Icon, type IconName } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"

type AlertProps = {
  title: string
  body: string
  tone?: "info" | "success" | "warning" | "danger"
  icon?: IconName
}

export function Alert({ title, body, tone = "info", icon }: AlertProps) {
  const { colors, radius, spacing } = useAppTheme()
  const toneStyles = {
    info: {
      backgroundColor: colors.infoSoft,
      borderColor: colors.info,
      icon: "info",
    },
    success: {
      backgroundColor: colors.successSoft,
      borderColor: colors.success,
      icon: "checkCircle",
    },
    warning: {
      backgroundColor: colors.warningSoft,
      borderColor: colors.warning,
      icon: "alert",
    },
    danger: {
      backgroundColor: colors.dangerSoft,
      borderColor: colors.danger,
      icon: "error",
    },
  } as const
  const current = toneStyles[tone]
  const iconName = icon ?? current.icon

  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.md,
        borderWidth: 1,
        borderColor: current.borderColor,
        borderRadius: radius.lg,
        padding: spacing.lg,
        backgroundColor: current.backgroundColor,
      }}
    >
      <Icon name={iconName} size={22} color={current.borderColor} />
      <View style={{ flex: 1, gap: spacing.xs }}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText tone="muted">{body}</AppText>
      </View>
    </View>
  )
}
