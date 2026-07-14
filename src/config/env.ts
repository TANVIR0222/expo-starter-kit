/**
 * env.ts
 *
 * The single object your app imports when it needs runtime config values.
 * All logic lives in app-env.ts — this file just assembles the final shape.
 *
 * Usage:
 *   import { env } from "@/config/env"
 *   env.apiBaseUrl        // → "https://api.example.com" (in production)
 *   env.appEnvironment    // → "development" | "staging" | "production"
 */

import { API_BASE_URL, APP_ENV, FEATURE_DEFAULTS } from "@/config/app-env"

export type { AppEnv } from "@/config/app-env"

export const env = {
  // Core
  appEnvironment: APP_ENV,

  // API
  apiBaseUrl: API_BASE_URL,

  // Feature flags (from environment defaults)
  analyticsEnabled: FEATURE_DEFAULTS.analyticsEnabled,
  notificationsEnabled: FEATURE_DEFAULTS.notificationsEnabled,
} as const
