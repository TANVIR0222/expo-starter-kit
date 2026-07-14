import { runtimeConfig } from "@/config/runtime-config"

export async function syncWorkspace(payload: {
  modules: { id: string; name: string; status: string }[]
}) {
  console.info("[api]", runtimeConfig.env.apiBaseUrl, payload)

  return {
    ok: true,
    syncedAt: new Date().toISOString(),
  }
}
