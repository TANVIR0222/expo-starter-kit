import { appConfig } from "@/constants/app-config"
import { env } from "@/config/env"
import { featureFlags } from "@/config/feature-flags"

export const runtimeConfig = {
  app: appConfig,
  env,
  featureFlags,
} as const
