import { Toaster } from "sonner-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/ui/icon"
import { useAppTheme } from "@/theme/theme-provider"

export function AppToaster() {
  const { colors, radius, resolvedTheme, spacing } = useAppTheme()
  const insets = useSafeAreaInsets()
  const topOffset = Math.max(insets.top + spacing.xl, 72)

  return (
    <Toaster
      position="top-center"
      theme={resolvedTheme}
      richColors={false}
      offset={topOffset}
      toastOptions={{
        style: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.lg,
          backgroundColor: colors.surface,
        },
        titleStyle: {
          color: colors.text,
          fontSize: 15,
          fontWeight: "800",
        },
        descriptionStyle: {
          color: colors.textMuted,
          fontSize: 13,
        },
        success: {
          borderColor: colors.success,
          backgroundColor: colors.successSoft,
        },
        error: {
          borderColor: colors.danger,
          backgroundColor: colors.dangerSoft,
        },
        warning: {
          borderColor: colors.warning,
          backgroundColor: colors.warningSoft,
        },
        info: { borderColor: colors.info, backgroundColor: colors.infoSoft },
      }}
      icons={{
        success: <Icon name="checkCircle" color={colors.success} size={26} />,
        error: <Icon name="error" color={colors.danger} size={26} />,
        warning: <Icon name="alert" color={colors.warning} size={26} />,
        info: <Icon name="info" color={colors.info} size={26} />,
        loading: <Icon name="refresh" color={colors.info} size={26} />,
      }}
    />
  )
}
