import { FEATURE_DEFAULTS } from "@/config/app-env"

export const featureFlags = {
  enableAnalytics: FEATURE_DEFAULTS.analyticsEnabled,
  enableNotifications: FEATURE_DEFAULTS.notificationsEnabled,
  enableComponentGallery: FEATURE_DEFAULTS.enableComponentGallery,
} as const
