import { runtimeConfig } from "@/config/runtime-config"
import type {
  AnalyticsEventName,
  AnalyticsEventProperties,
} from "@/lib/analytics/analytics-events"

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsEventProperties = {}
) {
  if (!runtimeConfig.featureFlags.enableAnalytics) return

  console.info("[analytics]", eventName, properties)
}
