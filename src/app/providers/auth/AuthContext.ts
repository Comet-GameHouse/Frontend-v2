import { createContext } from 'react'
import type { AuthContextValue } from '@types/auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export default AuthContext

