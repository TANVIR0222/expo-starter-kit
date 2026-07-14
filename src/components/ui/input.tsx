import { TextInput, View, type TextInputProps } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Icon, type IconName } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"

type InputProps = TextInputProps & {
  label?: string
  variant?: "default" | "filled" | "quiet"
  size?: "sm" | "md" | "lg"
  leftIcon?: IconName
  rightIcon?: IconName
  error?: string
}

export function Input({
  label,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  error,
  style,
  ...props
}: InputProps) {
  const { colors, radius, spacing } = useAppTheme()
  const isQuiet = variant === "quiet"
  const inputHeight = size === "sm" ? 44 : size === "lg" ? 60 : 52

  return (
    <View style={{ gap: spacing.sm }}>
      {label ? <AppText variant="caption">{label}</AppText> : null}
      <View
        style={[
          {
            minHeight: inputHeight,
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.sm,
            borderWidth: 1,
            borderColor: error
              ? colors.danger
              : isQuiet
                ? "transparent"
                : colors.border,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.lg,
            backgroundColor:
              variant === "filled" ? colors.surfaceStrong : colors.surface,
          },
        ]}
      >
        {leftIcon ? (
          <Icon name={leftIcon} size={18} color={colors.textMuted} />
        ) : null}
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[
            {
              flex: 1,
              minHeight: inputHeight - 2,
              color: colors.text,
              fontSize: size === "sm" ? 14 : 15,
            },
            style,
          ]}
          {...props}
        />
        {rightIcon ? (
          <Icon name={rightIcon} size={18} color={colors.textMuted} />
        ) : null}
      </View>
      {error ? (
        <AppText variant="caption" tone="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  )
}
