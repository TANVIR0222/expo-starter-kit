import { Pressable, type PressableProps } from "react-native"

import { Icon, type IconName } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"

type IconButtonProps = PressableProps & {
  name: IconName
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

export function IconButton({
  name,
  variant = "secondary",
  size = "md",
  disabled,
  style,
  ...props
}: IconButtonProps) {
  const { colors, radius, spacing, motion } = useAppTheme()
  const variants = {
    primary: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
      color: colors.accentForeground,
    },
    secondary: {
      backgroundColor: colors.secondarySoft,
      borderColor: colors.secondarySoft,
      color: colors.secondary,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: colors.border,
      color: colors.text,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: colors.mutedForeground,
    },
    danger: {
      backgroundColor: colors.dangerSoft,
      borderColor: colors.dangerSoft,
      color: colors.danger,
    },
  } as const
  const sizes = {
    sm: 38,
    md: 46,
    lg: 54,
  } as const
  const current = variants[variant]
  const dimension = sizes[size]

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          width: dimension,
          height: dimension,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: current.borderColor,
          borderRadius: radius.pill,
          backgroundColor: current.backgroundColor,
          opacity: disabled ? 0.5 : pressed ? motion.opacity.pressed : 1,
          padding: spacing.sm,
        },
        style as object,
      ]}
      {...props}
    >
      <Icon
        name={name}
        size={size === "sm" ? 17 : size === "lg" ? 24 : 20}
        color={current.color}
      />
    </Pressable>
  )
}
