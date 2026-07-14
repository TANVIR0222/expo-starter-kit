import { createContext, useContext, useMemo, useState } from "react"

type StarterModule = {
  id: string
  name: string
  status: "ready" | "planned"
}

type WorkspaceContextValue = {
  modules: StarterModule[]
  markModuleReady: (moduleId: string) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)
const starterModules: StarterModule[] = [
  { id: "auth", name: "Authentication", status: "ready" },
  { id: "theme", name: "Theme system", status: "ready" },
  { id: "i18n", name: "Internationalization", status: "ready" },
  { id: "notifications", name: "Notifications", status: "planned" },
]

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState(starterModules)

  const value = useMemo(
    () => ({
      modules,
      markModuleReady(moduleId: string) {
        setModules((current) =>
          current.map((module) =>
            module.id === moduleId ? { ...module, status: "ready" } : module
          )
        )
      },
    }),
    [modules]
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspaceStore() {
  const value = useContext(WorkspaceContext)

  if (!value) {
    throw new Error("useWorkspaceStore must be used inside WorkspaceProvider")
  }

  return value
}
