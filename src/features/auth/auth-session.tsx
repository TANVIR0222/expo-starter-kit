import { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { User } from "@/features/auth/types"
import { appStorage } from "@/lib/storage/app-storage"

type SessionContextValue = {
  user: User | null
  isSignedIn: boolean
  hasHydrated: boolean
  signIn: (email: string) => void
  signOut: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)
const sessionKey = "auth-session"

const demoUser: User = {
  id: "starter-user",
  name: "Starter User",
  email: "hello@example.com",
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    appStorage.get<User | null>(sessionKey, null).then((storedUser) => {
      setUser(storedUser)
      setHasHydrated(true)
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isSignedIn: Boolean(user),
      hasHydrated,
      signIn(email: string) {
        const nextUser = { ...demoUser, email }

        setUser(nextUser)
        void appStorage.set(sessionKey, nextUser)
      },
      signOut() {
        setUser(null)
        void appStorage.remove(sessionKey)
      },
    }),
    [hasHydrated, user]
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession() {
  const value = useContext(SessionContext)

  if (!value) {
    throw new Error("useSession must be used inside SessionProvider")
  }

  return value
}
