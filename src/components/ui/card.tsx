import { View, type ViewProps } from "react-native"

import { useAppTheme } from "@/theme/theme-provider"

export function Card({ style, ...props }: ViewProps) {
  const { colors, radius, spacing } = useAppTheme()

  return (
    <View
      style={[
        {
          gap: spacing.md,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.xl,
          padding: spacing.lg,
          backgroundColor: colors.surface,
          boxShadow: "0 1px 2px rgba(14, 15, 12, 0.06)",
        },
        style,
      ]}
      {...props}
    />
  )
}
