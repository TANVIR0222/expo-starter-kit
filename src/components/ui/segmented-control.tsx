import { Pressable, View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { useAppTheme } from "@/theme/theme-provider"

type SegmentedOption<T extends string> = {
  label: string
  value: T
}

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[]
  value: T
  onValueChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
}: SegmentedControlProps<T>) {
  const { colors, radius, spacing, motion } = useAppTheme()

  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.xs,
        borderRadius: radius.pill,
        padding: spacing.xs,
        backgroundColor: colors.surfaceStrong,
      }}
    >
      {options.map((option) => {
        const selected = option.value === value

        return (
          <Pressable
            key={option.value}
            onPress={() => onValueChange(option.value)}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 38,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.pill,
              backgroundColor: selected ? colors.surface : "transparent",
              opacity: pressed ? motion.opacity.pressed : 1,
            })}
          >
            <AppText
              variant="caption"
              style={{
                color: selected ? colors.text : colors.textMuted,
                fontWeight: "900",
              }}
            >
              {option.label}
            </AppText>
          </Pressable>
        )
      })}
    </View>
  )
}
