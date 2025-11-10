type Role = 'player' | 'moderator' | 'admin'

type AuthToken = {
  accessToken: string
  refreshToken?: string
  expiresAt: number
}

type User = {
  id: string
  displayName: string
  avatarUrl?: string
  role: Role
  isVerified: boolean
  email?: string
  createdAt?: string
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export type { Role, AuthToken, User, AuthContextValue }

