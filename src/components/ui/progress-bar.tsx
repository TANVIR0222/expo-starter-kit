import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { useAppTheme } from "@/theme/theme-provider"

type ProgressBarProps = {
  label?: string
  value: number
  tone?: "primary" | "success" | "info" | "warning" | "danger"
}

export function ProgressBar({
  label,
  value,
  tone = "primary",
}: ProgressBarProps) {
  const { colors, radius, spacing } = useAppTheme()
  const normalizedValue = Math.max(0, Math.min(100, value))
  const toneColor =
    tone === "success"
      ? colors.success
      : tone === "info"
        ? colors.info
        : tone === "warning"
          ? colors.warning
          : tone === "danger"
            ? colors.danger
            : colors.primary

  return (
    <View style={{ gap: spacing.sm }}>
      {label ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: spacing.md,
          }}
        >
          <AppText variant="caption">{label}</AppText>
          <AppText variant="caption" tone="muted">
            {normalizedValue}%
          </AppText>
        </View>
      ) : null}
      <View
        style={{
          height: 10,
          overflow: "hidden",
          borderRadius: radius.pill,
          backgroundColor: colors.surfaceStrong,
        }}
      >
        <View
          style={{
            width: `${normalizedValue}%`,
            height: "100%",
            borderRadius: radius.pill,
            backgroundColor: toneColor,
          }}
        />
      </View>
    </View>
  )
}
