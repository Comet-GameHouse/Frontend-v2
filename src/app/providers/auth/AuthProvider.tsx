import { useCallback, useMemo, useState, type ReactNode } from 'react'
import AuthContext from './AuthContext'
import type { AuthContextValue, User } from '@app-types/auth'

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>({})

  const signIn = useCallback((nextUser: User) => {
    setUser(nextUser)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [signIn, signOut, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

