import { useEffect, useState } from "react"

import {
  getStoredPreferences,
  setStoredPreferences,
  type StarterPreferences,
} from "@/lib/storage/preferences-storage"
import { defaultPreferences } from "@/lib/storage/preferences-storage"

export function useStarterPreferences() {
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    getStoredPreferences().then((storedPreferences) => {
      setPreferences(storedPreferences)
      setHasHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    void setStoredPreferences(preferences)
  }, [hasHydrated, preferences])

  function updatePreference<Key extends keyof StarterPreferences>(
    key: Key,
    value: StarterPreferences[Key]
  ) {
    setPreferences((current) => ({ ...current, [key]: value }))
  }

  return {
    preferences,
    updatePreference,
  }
}
