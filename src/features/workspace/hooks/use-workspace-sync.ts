import { useMemo } from "react"

import { syncWorkspace } from "@/lib/api/workspace-api"
import { useWorkspaceStore } from "@/features/workspace/workspace-store"

export function useWorkspaceSync() {
  const { modules } = useWorkspaceStore()

  return useMemo(
    () => ({
      pendingChanges: modules.filter((module) => module.status === "planned")
        .length,
      sync: () => syncWorkspace({ modules }),
    }),
    [modules]
  )
}
