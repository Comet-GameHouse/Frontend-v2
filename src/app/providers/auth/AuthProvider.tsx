import { useCallback, useMemo, useState, useEffect, type ReactNode } from 'react'
import AuthContext from './AuthContext'
import type {
  AuthContextValue,
  User,
  SignInCredentials,
  SignUpCredentials,
  AuthResult,
} from '@app-types/auth'
import { authService, type User as ApiUser } from '@services/api/authService'
import { apiClient } from '@utils/api'

type AuthProviderProps = {
  children: ReactNode
}

// Convert API user to app user type
const mapApiUserToAppUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser.id,
    displayName: apiUser.displayName,
    avatarUrl: apiUser.avatarUrl,
    role: apiUser.role,
    isVerified: apiUser.isVerified,
    email: apiUser.email,
    createdAt: apiUser.createdAt,
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Internal function to update user state
  const updateUser = useCallback((newUser: User | null) => {
    setUser(newUser)
  }, [])

  // Refresh user data from API
  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser()
      if (response.success && response.data) {
        updateUser(mapApiUserToAppUser(response.data.user))
      } else {
        updateUser(null)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      updateUser(null)
    }
  }, [updateUser])

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          setIsLoading(false)
          return
        }

        await refreshUser()
      } catch (error) {
        console.error('Auth check failed:', error)
        // Use apiClient to clear all tokens (including legacy items)
        apiClient.clearTokens()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [refreshUser])

  // Sign in with email/password
  const signInWithEmail = useCallback(
    async (credentials: SignInCredentials): Promise<AuthResult> => {
      try {
        const response = await authService.signIn(credentials)

        if (response.success && response.data) {
          const newUser = mapApiUserToAppUser(response.data.user)
          updateUser(newUser)
          return { success: true, user: newUser }
        } else {
          // Extract detailed error message
          let errorMessage = response.message || 'Failed to sign in. Please check your credentials.'
          
          // If there are validation errors, use the first one
          if (response.errors && response.errors.length > 0) {
            const firstError = response.errors[0] as { message?: string; msg?: string; field?: string; param?: string }
            errorMessage = firstError.message || firstError.msg || errorMessage
          }

          return {
            success: false,
            error: errorMessage,
            errors: response.errors as Array<{ field?: string; message?: string; msg?: string; param?: string }>, // Pass through all errors for detailed display
          }
        }
      } catch (error) {
        console.error('Sign in error:', error)
        return {
          success: false,
          error: 'An unexpected error occurred. Please try again.',
        }
      }
    },
    [updateUser],
  )

  // Sign up with email/password
  const signUpWithEmail = useCallback(
    async (credentials: SignUpCredentials): Promise<AuthResult> => {
      try {
        const response = await authService.signUp({
          email: credentials.email,
          username: credentials.username,
          password: credentials.password,
          displayName: credentials.displayName || credentials.username,
        })

        if (response.success && response.data) {
          const newUser = mapApiUserToAppUser(response.data.user)
          updateUser(newUser)
          return { success: true, user: newUser }
        } else {
          // Extract detailed error message
          let errorMessage = response.message || 'Failed to create account. Please try again.'
          
          // If there are validation errors, use the first one
          if (response.errors && response.errors.length > 0) {
            const firstError = response.errors[0] as { message?: string; msg?: string; field?: string; param?: string }
            errorMessage = firstError.message || firstError.msg || errorMessage
          }

          return {
            success: false,
            error: errorMessage,
            errors: response.errors as Array<{ field?: string; message?: string; msg?: string; param?: string }>, // Pass through all errors for detailed display
          }
        }
      } catch (error) {
        console.error('Sign up error:', error)
        return {
          success: false,
          error: 'An unexpected error occurred. Please try again.',
        }
      }
    },
    [updateUser],
  )

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await authService.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      updateUser(null)
      // authService.signOut() already clears tokens via apiClient.clearTokens()
      // But ensure we also clean up any legacy items
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [updateUser])

  // Verify email with token
  const verifyEmail = useCallback(
    async (token: string): Promise<AuthResult> => {
      try {
        const response = await authService.verifyEmail(token)

        if (response.success) {
          // Refresh user data to get updated verification status
          await refreshUser()
          return { success: true }
        } else {
          return {
            success: false,
            error: response.message || 'Failed to verify email',
          }
        }
      } catch (error) {
        console.error('Verify email error:', error)
        return {
          success: false,
          error: 'An unexpected error occurred. Please try again.',
        }
      }
    },
    [refreshUser],
  )

  // Resend verification email
  const resendVerificationEmail = useCallback(
    async (email: string): Promise<AuthResult> => {
      try {
        const response = await authService.resendVerificationEmail(email)

        if (response.success) {
          return { success: true }
        } else {
          return {
            success: false,
            error: response.message || 'Failed to resend verification email',
          }
        }
      } catch (error) {
        console.error('Resend verification error:', error)
        return {
          success: false,
          error: 'An unexpected error occurred. Please try again.',
        }
      }
    },
    [],
  )

  // Initiate OAuth flow
  const initiateOAuth = useCallback((provider: 'google' | 'discord') => {
    const url =
      provider === 'google' ? authService.getGoogleAuthUrl() : authService.getDiscordAuthUrl()
    window.location.href = url
  }, [])

  // Handle OAuth callback
  const handleOAuthCallback = useCallback(
    async (token: string, refreshToken: string): Promise<AuthResult> => {
      try {
        // Store tokens using apiClient methods
        apiClient.setToken(token)
        apiClient.setRefreshToken(refreshToken)

        // Get user info
        const response = await authService.getCurrentUser()

        if (response.success && response.data) {
          const newUser = mapApiUserToAppUser(response.data.user)
          updateUser(newUser)
          return { success: true, user: newUser }
        } else {
          // Clear all tokens (including legacy items)
          apiClient.clearTokens()
          return {
            success: false,
            error: 'Failed to get user information',
          }
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        // Clear all tokens (including legacy items)
        apiClient.clearTokens()
        return {
          success: false,
          error: 'An unexpected error occurred during OAuth callback.',
        }
      }
    },
    [updateUser],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      verifyEmail,
      resendVerificationEmail,
      initiateOAuth,
      handleOAuthCallback,
      refreshUser,
    }),
    [
      user,
      isLoading,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      verifyEmail,
      resendVerificationEmail,
      initiateOAuth,
      handleOAuthCallback,
      refreshUser,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

