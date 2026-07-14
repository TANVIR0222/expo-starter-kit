import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { useAppTheme } from "@/theme/theme-provider"

type BadgeProps = {
  label: string
  tone?: "neutral" | "success" | "info" | "warning" | "danger"
}

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  const { colors, radius, spacing } = useAppTheme()
  const toneStyles = {
    neutral: { backgroundColor: colors.primarySoft, color: colors.primary },
    success: { backgroundColor: colors.successSoft, color: colors.success },
    info: { backgroundColor: colors.infoSoft, color: colors.info },
    warning: { backgroundColor: colors.warningSoft, color: colors.warning },
    danger: { backgroundColor: colors.dangerSoft, color: colors.danger },
  } as const
  const current = toneStyles[tone]

  return (
    <View
      style={{
        alignSelf: "flex-start",
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        backgroundColor: current.backgroundColor,
      }}
    >
      <AppText
        variant="caption"
        style={{ color: current.color, fontWeight: "900" }}
      >
        {label}
      </AppText>
    </View>
  )
}
