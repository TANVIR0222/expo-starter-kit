import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { useAppTheme } from "@/theme/theme-provider"

type AvatarProps = {
  name: string
  size?: number
}

export function Avatar({ name, size = 44 }: AvatarProps) {
  const { colors, radius } = useAppTheme()
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.pill,
        backgroundColor: colors.primary,
      }}
    >
      <AppText
        variant="caption"
        style={{ color: colors.ink, fontWeight: "900" }}
      >
        {initials}
      </AppText>
    </View>
  )
}
