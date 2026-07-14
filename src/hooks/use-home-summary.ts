import { useMemo } from "react"

export function useHomeSummary(modules: { status: "ready" | "planned" }[]) {
  return useMemo(
    () => ({
      readyModules: modules.filter((module) => module.status === "ready")
        .length,
      plannedModules: modules.filter((module) => module.status === "planned")
        .length,
    }),
    [modules]
  )
}
