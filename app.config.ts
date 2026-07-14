import type { ConfigContext, ExpoConfig } from "expo/config"

// ---------------------------------------------------------------------------
// Environment detection (build-time only — reads from .env which is gitignored)
// ---------------------------------------------------------------------------

type AppEnv = "development" | "staging" | "production"

const APP_ENV = (process.env.APP_ENV ?? "development") as AppEnv

const IS_DEV = APP_ENV === "development"
const IS_PROD = APP_ENV === "production"

// ---------------------------------------------------------------------------
// Per-environment native identifiers
// ---------------------------------------------------------------------------

const APP_NAMES: Record<AppEnv, string> = {
  development: "Expo Starter (Dev)",
  staging: "Expo Starter (Staging)",
  production: "Expo Router Starter Kit",
}

const BUNDLE_IDS: Record<AppEnv, string> = {
  development: "com.tanvir.exporouterstarterkit.dev",
  staging: "com.tanvir.exporouterstarterkit.staging",
  production: "com.tanvir.exporouterstarterkit",
}

// ---------------------------------------------------------------------------
// Main config export
// Anything sensitive lives in .env (gitignored) and is read via process.env.
// The `extra` block only contains non-secret, runtime-safe values.
// ---------------------------------------------------------------------------

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  // ── Identity ──────────────────────────────────────────────────────────────
  name: APP_NAMES[APP_ENV],
  slug: "expo-router-starter-kit",
  version: "1.0.0",
  owner: "yaxovex780",

  // ── Appearance ────────────────────────────────────────────────────────────
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "exporouterstarterkit",
  userInterfaceStyle: "automatic",

  // ── iOS ───────────────────────────────────────────────────────────────────
  ios: {
    ...config.ios,
    bundleIdentifier: BUNDLE_IDS[APP_ENV],
    icon: "./assets/expo.icon",
    supportsTablet: false,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },

  // ── Android ───────────────────────────────────────────────────────────────
  android: {
    ...config.android,
    package: BUNDLE_IDS[APP_ENV],
    adaptiveIcon: {
      backgroundColor: "#F3F4F6",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },

  // ── OTA Updates ───────────────────────────────────────────────────────────
  updates: {
    enabled: !IS_DEV,
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/4bb7ba82-3770-48b4-a4a3-f469258cae90",
    checkAutomatically: IS_PROD ? "ON_LOAD" : "ON_ERROR_RECOVERY",
    requestHeaders: {
      "expo-channel-name": APP_ENV,
    },
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#111827",
        image: "./assets/images/splash-icon.png",
        imageWidth: 76,
      },
    ],
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: ["en", "es"],
          android: ["en", "es"],
        },
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "16.4",
        },
        android: {
          compileSdkVersion: 36,
          targetSdkVersion: 36,
          buildToolsVersion: "36.0.0",
        },
      },
    ],
  ],

  // ── Experiments ───────────────────────────────────────────────────────────
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  // ── Extra (runtime values → Constants.expoConfig.extra → src/config/env.ts)
  // ⚠️  Rule: NO secrets here. Everything in `extra` is visible in the JS bundle.
  //    API keys, tokens, passwords → server-side only.
  extra: {
    appEnvironment: APP_ENV,
    // All other runtime defaults live in src/config/app-env.ts
    // and are read by src/config/env.ts via Constants.expoConfig.extra
    eas: {
      projectId: "4bb7ba82-3770-48b4-a4a3-f469258cae90",
    },
  },
})
