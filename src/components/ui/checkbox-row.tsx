import { Pressable } from "react-native"

import { Icon } from "@/components/ui/icon"
import { ListRow } from "@/components/ui/list-row"
import { useAppTheme } from "@/theme/theme-provider"

type CheckboxRowProps = {
  label: string
  body?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function CheckboxRow({
  label,
  body,
  checked,
  onCheckedChange,
}: CheckboxRowProps) {
  const { colors, radius, motion } = useAppTheme()

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      style={({ pressed }) => ({
        opacity: pressed ? motion.opacity.pressed : 1,
      })}
    >
      <ListRow
        title={label}
        body={body}
        trailing={
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            onPress={() => onCheckedChange(!checked)}
            style={{
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: checked ? colors.primary : colors.border,
              borderRadius: radius.sm,
              backgroundColor: checked ? colors.primary : colors.surface,
            }}
          >
            {checked ? (
              <Icon name="check" color={colors.primaryForeground} size={16} />
            ) : null}
          </Pressable>
        }
      />
    </Pressable>
  )
}
