/**
 * General API Client - Base HTTP client for all API requests
 * This file should only contain general, reusable HTTP functionality
 */

type ApiResponse<T = unknown> = {
  success: boolean
  message?: string
  data?: T
  errors?: Array<{ msg: string; param?: string }>
  error?: string
}

type RequestConfig = RequestInit & {
  skipAuth?: boolean
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Base API Client class
 * Provides general HTTP request functionality with authentication handling
 */
class ApiClient {
  protected baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refresh_token')
  }

  setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('auth_token', token)
  }

  setRefreshToken(refreshToken: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('refresh_token', refreshToken)
  }

  clearTokens(): void {
    if (typeof window === 'undefined') return
    // Remove current tokens
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    // Clean up any old/legacy tokens that might exist
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const result: ApiResponse<{ token: string; refreshToken: string }> = await response.json()
        if (result.success && result.data) {
          this.setToken(result.data.token)
          this.setRefreshToken(result.data.refreshToken)
          return result.data.token
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
    }

    return null
  }

  /**
   * General HTTP request method
   * Handles authentication, token refresh, and error handling
   * Made public so service classes can use it
   */
  async request<T = unknown>(
    endpoint: string,
    config: RequestConfig = {},
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const { skipAuth = false, ...fetchConfig } = config

    let url = `${this.baseURL}${endpoint}`

    // Add query parameters if provided
    if (queryParams) {
      const params = new URLSearchParams(queryParams)
      url += `?${params.toString()}`
    }

    const token = this.getToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchConfig.headers,
    }

    if (!skipAuth && token) {
      ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    try {
      let response = await fetch(url, {
        ...fetchConfig,
        headers,
      })

      // If 401 and we have a token, try to refresh
      if (response.status === 401 && token && !skipAuth) {
        const newToken = await this.refreshAccessToken()
        if (newToken) {
          // Retry the request with new token
          ;(headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`
          response = await fetch(url, {
            ...fetchConfig,
            headers,
          })
        } else {
          // Refresh failed, clear tokens and redirect to login
          this.clearTokens()
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/signin'
          }
          throw new Error('Authentication failed')
        }
      }

      const data: ApiResponse<T> = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Request failed')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        }
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      }
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export type { ApiResponse, RequestConfig }
