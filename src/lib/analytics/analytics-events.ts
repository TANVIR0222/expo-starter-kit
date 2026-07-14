export type AnalyticsEventName =
  "app_opened" | "component_gallery_viewed" | "settings_updated"

export type AnalyticsEventProperties = Record<
  string,
  string | number | boolean | null
>
