import { ScrollView, View, type StyleProp, type ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAppTheme } from "@/theme/theme-provider"

type ScreenProps = {
  children: React.ReactNode
  contentStyle?: StyleProp<ViewStyle>
  scroll?: boolean
}

export function Screen({ children, contentStyle, scroll = true }: ScreenProps) {
  const { colors, spacing } = useAppTheme()
  const insets = useSafeAreaInsets()
  const baseContentStyle = [
    {
      flexGrow: 1,
      gap: spacing.lg,
      padding: spacing.xl,
      paddingTop: Math.max(insets.top + spacing.md, spacing.xl),
      paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.xxl),
    },
    contentStyle,
  ]

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={baseContentStyle}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, ...baseContentStyle]}>{children}</View>
      )}
    </View>
  )
}
