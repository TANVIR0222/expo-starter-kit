import { appStorage } from "@/lib/storage/app-storage"

export type StarterPreferences = {
  dailyDigest: boolean
  compactUi: boolean
}

const preferencesKey = "starter-preferences"

export const defaultPreferences: StarterPreferences = {
  dailyDigest: true,
  compactUi: false,
}

export function getStoredPreferences() {
  return appStorage.get(preferencesKey, defaultPreferences)
}

export function setStoredPreferences(preferences: StarterPreferences) {
  appStorage.set(preferencesKey, preferences)
}
