/**
 * Authentication API Service
 * All authentication-related API calls
 */

import { apiClient, type ApiResponse } from '@utils/api'

// User type matching backend response
type User = {
  id: string
  email?: string
  username?: string
  displayName: string
  avatarUrl?: string
  role: 'player' | 'moderator' | 'admin'
  isVerified: boolean
  createdAt?: string
}

type SignUpData = {
  email: string
  username: string
  password: string
  displayName?: string
}

type SignInData = {
  identifier: string
  password: string
}

type AuthResponse = {
  user: User
  token: string
  refreshToken: string
}

/**
 * Authentication Service
 * Uses the base ApiClient for HTTP requests
 */
class AuthService {
  /**
   * Register a new user
   */
  async signUp(data: SignUpData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    })

    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
      apiClient.setRefreshToken(response.data.refreshToken)
    }

    return response
  }

  /**
   * Sign in with email/username and password
   */
  async signIn(data: SignInData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.request<AuthResponse>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    })

    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
      apiClient.setRefreshToken(response.data.refreshToken)
    }

    return response
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<ApiResponse> {
    const response = await apiClient.request('/auth/signout', {
      method: 'POST',
    })

    apiClient.clearTokens()
    return response
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.request<{ user: User }>('/auth/me')
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<ApiResponse> {
    return apiClient.request('/auth/verify-email', {
      method: 'GET',
      skipAuth: true,
    }, { token })
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<ApiResponse> {
    return apiClient.request('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
      skipAuth: true,
    })
  }

  /**
   * Get Google OAuth URL
   */
  getGoogleAuthUrl(): string {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/google`
  }

  /**
   * Get Discord OAuth URL
   */
  getDiscordAuthUrl(): string {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/discord`
  }
}

export const authService = new AuthService()
export type { User, SignUpData, SignInData, AuthResponse }

