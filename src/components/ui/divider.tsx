import { View } from "react-native"

import { useAppTheme } from "@/theme/theme-provider"

export function Divider() {
  const { colors } = useAppTheme()

  return <View style={{ height: 1, backgroundColor: colors.border }} />
}
