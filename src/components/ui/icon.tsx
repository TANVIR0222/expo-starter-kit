import { SymbolView, type SymbolViewProps } from "expo-symbols"

import { useAppTheme } from "@/theme/theme-provider"

const iconMap = {
  add: { ios: "plus", android: "add", web: "add" },
  alert: {
    ios: "exclamationmark.triangle",
    android: "warning",
    web: "warning",
  },
  arrowRight: {
    ios: "arrow.right",
    android: "arrow_forward",
    web: "arrow_forward",
  },
  bell: { ios: "bell", android: "notifications", web: "notifications" },
  check: { ios: "checkmark", android: "check", web: "check" },
  checkCircle: {
    ios: "checkmark.circle.fill",
    android: "check_circle",
    web: "check_circle",
  },
  chevronRight: {
    ios: "chevron.right",
    android: "chevron_right",
    web: "chevron_right",
  },
  close: { ios: "xmark", android: "close", web: "close" },
  components: {
    ios: "square.grid.2x2",
    android: "dashboard",
    web: "dashboard",
  },
  copy: { ios: "doc.on.doc", android: "content_copy", web: "content_copy" },
  clock: { ios: "clock", android: "schedule", web: "schedule" },
  edit: { ios: "pencil", android: "edit", web: "edit" },
  error: { ios: "xmark.circle.fill", android: "error", web: "error" },
  filter: {
    ios: "slider.horizontal.3",
    android: "filter_list",
    web: "filter_list",
  },
  folder: { ios: "folder", android: "folder", web: "folder" },
  help: { ios: "questionmark.circle", android: "help", web: "help" },
  home: { ios: "house", android: "home", web: "home" },
  info: { ios: "info.circle", android: "info", web: "info" },
  person: {
    ios: "person.crop.circle",
    android: "account_circle",
    web: "account_circle",
  },
  signOut: {
    ios: "rectangle.portrait.and.arrow.right",
    android: "logout",
    web: "logout",
  },
  userPlus: {
    ios: "person.badge.plus",
    android: "person_add",
    web: "person_add",
  },
  refresh: { ios: "arrow.clockwise", android: "refresh", web: "refresh" },
  search: { ios: "magnifyingglass", android: "search", web: "search" },
  settings: { ios: "gearshape", android: "settings", web: "settings" },
  sparkles: { ios: "sparkles", android: "auto_awesome", web: "auto_awesome" },
  trash: { ios: "trash", android: "delete", web: "delete" },
} as const satisfies Record<string, SymbolViewProps["name"]>

export type IconName = keyof typeof iconMap

type IconProps = Omit<SymbolViewProps, "name" | "tintColor"> & {
  name: IconName
  color?: string
  size?: number
}

export function Icon({
  name,
  color,
  size = 20,
  resizeMode = "scaleAspectFit",
  ...props
}: IconProps) {
  const { colors } = useAppTheme()

  return (
    <SymbolView
      name={iconMap[name]}
      tintColor={color ?? colors.text}
      resizeMode={resizeMode}
      size={size}
      {...props}
    />
  )
}
