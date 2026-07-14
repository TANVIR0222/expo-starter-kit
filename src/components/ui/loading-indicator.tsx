import { ActivityIndicator, View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { useAppTheme } from "@/theme/theme-provider"

type LoadingIndicatorProps = {
  label?: string
}

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  const { colors, spacing } = useAppTheme()

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        padding: spacing.lg,
      }}
    >
      <ActivityIndicator color={colors.primary} />
      {label ? (
        <AppText variant="caption" tone="muted">
          {label}
        </AppText>
      ) : null}
    </View>
  )
}
