import { ActivityIndicator, Pressable, type PressableProps } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Icon, type IconName } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"
import type { colors as colorTokens } from "@/theme/colors"
import type { spacing as spacingTokens } from "@/theme/spacing"

type ButtonProps = PressableProps & {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  iconPosition?: "left" | "right"
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors, motion, radius, spacing } = useAppTheme()
  const current = getButtonVariantStyles(colors)[variant]
  const dimensions = getButtonSizeStyles(spacing)[size]
  const isDisabled = disabled || loading
  const buttonIcon = loading ? null : icon

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          minHeight: dimensions.minHeight,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          flexDirection: "row",
          gap: spacing.sm,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: current.borderColor,
          borderRadius: radius.pill,
          paddingHorizontal: dimensions.paddingHorizontal,
          backgroundColor: current.backgroundColor,
          opacity: isDisabled ? 0.56 : pressed ? motion.opacity.pressed : 1,
        },
        style as object,
      ]}
      {...props}
    >
      {loading ? <ActivityIndicator color={current.foreground} /> : null}
      {buttonIcon && iconPosition === "left" ? (
        <Icon name={buttonIcon} color={current.foreground} size={18} />
      ) : null}
      <AppText style={{ color: current.foreground, fontWeight: "900" }}>
        {label}
      </AppText>
      {buttonIcon && iconPosition === "right" ? (
        <Icon name={buttonIcon} color={current.foreground} size={18} />
      ) : null}
    </Pressable>
  )
}

type ThemeColors = (typeof colorTokens)[keyof typeof colorTokens]
type ThemeSpacing = typeof spacingTokens
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

function getButtonVariantStyles(colors: ThemeColors) {
  return {
    primary: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
      foreground: colors.accentForeground,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      foreground: colors.secondaryForeground,
    },
    outline: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      foreground: colors.text,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      foreground: colors.mutedForeground,
    },
    danger: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
      foreground: colors.primaryForeground,
    },
  } as const
}

function getButtonSizeStyles(spacing: ThemeSpacing) {
  return {
    sm: { minHeight: 40, paddingHorizontal: spacing.md },
    md: { minHeight: 50, paddingHorizontal: spacing.lg },
    lg: { minHeight: 58, paddingHorizontal: spacing.xl },
  } as const
}
