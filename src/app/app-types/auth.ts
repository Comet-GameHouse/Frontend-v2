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

type SignInCredentials = {
  identifier: string
  password: string
}

type SignUpCredentials = {
  email: string
  username: string
  password: string
  displayName?: string
}

type AuthResult = {
  success: boolean
  error?: string
  user?: User
  errors?: Array<{ field?: string; message?: string; msg?: string; param?: string }>
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading?: boolean
  // Actions
  signInWithEmail: (credentials: SignInCredentials) => Promise<AuthResult>
  signUpWithEmail: (credentials: SignUpCredentials) => Promise<AuthResult>
  signOut: () => Promise<void>
  verifyEmail: (token: string) => Promise<AuthResult>
  resendVerificationEmail: (email: string) => Promise<AuthResult>
  initiateOAuth: (provider: 'google' | 'discord') => void
  handleOAuthCallback: (token: string, refreshToken: string) => Promise<AuthResult>
  refreshUser: () => Promise<void>
}

export type {
  Role,
  AuthToken,
  User,
  AuthContextValue,
  SignInCredentials,
  SignUpCredentials,
  AuthResult,
}

