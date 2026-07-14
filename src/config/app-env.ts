/**
 * app-env.ts
 *
 * Single source of truth for all per-environment runtime defaults.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * `app.config.ts` is committed to git and visible to anyone who clones the
 * repo. We deliberately keep it free of hardcoded URLs, feature flag logic,
 * and anything that differs per environment.
 *
 * This file owns all of that. It reads `appEnvironment` from
 * `Constants.expoConfig.extra` (injected by app.config.ts at build time)
 * and derives the correct defaults for each environment.
 *
 * HOW VALUES FLOW
 * ---------------
 *  .env (gitignored)
 *    └─► app.config.ts  (build-time, public)
 *          └─► extra.appEnvironment
 *                └─► Constants.expoConfig.extra   (runtime)
 *                      └─► app-env.ts  ◄── YOU ARE HERE
 *                            └─► env.ts
 *                                  └─► feature-flags.ts
 *                                        └─► your components
 *
 * RULES
 * -----
 *  • No secrets (API keys, tokens, passwords). Those belong on the server.
 *  • No `process.env` — this runs in the JS bundle, not at build time.
 *  • Keep all values typed and exhaustive across environments.
 */

import Constants from "expo-constants"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AppEnv = "development" | "staging" | "production"

// ---------------------------------------------------------------------------
// Detect current environment (injected by app.config.ts → extra)
// ---------------------------------------------------------------------------

const extra = Constants.expoConfig?.extra as
  { appEnvironment?: AppEnv } | undefined

export const APP_ENV: AppEnv = extra?.appEnvironment ?? "development"

export const IS_DEV = APP_ENV === "development"
export const IS_STAGING = APP_ENV === "staging"
export const IS_PROD = APP_ENV === "production"

// ---------------------------------------------------------------------------
// API endpoints
// All base URLs here are public-facing; no credentials are embedded.
// ---------------------------------------------------------------------------

const API_BASE_URLS: Record<AppEnv, string> = {
  development: "https://dev-api.example.com",
  staging: "https://staging-api.example.com",
  production: "https://api.example.com",
}

export const API_BASE_URL = API_BASE_URLS[APP_ENV]

// ---------------------------------------------------------------------------
// Feature flags
// Defaults are set per environment; individual flags can be overridden via
// the `extra` block in app.config.ts if you need build-time overrides.
// ---------------------------------------------------------------------------

export const FEATURE_DEFAULTS = {
  analyticsEnabled: IS_PROD,
  notificationsEnabled: IS_PROD || IS_STAGING,
  enableComponentGallery: IS_DEV || IS_STAGING,
} as const
