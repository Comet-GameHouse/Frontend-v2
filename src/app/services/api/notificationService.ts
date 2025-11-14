/**
 * Notification API Service
 * All notification-related API calls
 */

import { apiClient, type ApiResponse } from '@utils/api'

type Notification = {
  _id: string
  userId: string
  type: 'system' | 'friend-request' | 'match-invite' | 'room-update' | 'reward'
  title: string
  message: string
  intent: 'info' | 'success' | 'warning' | 'error'
  icon: string
  actionUrl?: string
  payload?: Record<string, unknown>
  readAt?: string
  createdAt: string
}

type NotificationsResponse = {
  notifications: Notification[]
  unreadCount: number
  total: number
}

class NotificationService {
  /**
   * Get all notifications for the current user
   */
  async getNotifications(options?: {
    limit?: number
    offset?: number
    unreadOnly?: boolean
  }): Promise<ApiResponse<NotificationsResponse>> {
    const queryParams: Record<string, string> = {}
    if (options?.limit) queryParams.limit = String(options.limit)
    if (options?.offset) queryParams.offset = String(options.offset)
    if (options?.unreadOnly) queryParams.unreadOnly = 'true'

    return apiClient.request<NotificationsResponse>('/notifications', {
      method: 'GET',
    }, queryParams)
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<ApiResponse<{ unreadCount: number }>> {
    return apiClient.request<{ unreadCount: number }>('/notifications/unread-count', {
      method: 'GET',
    })
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: string): Promise<ApiResponse<{ notification: Notification }>> {
    return apiClient.request<{ notification: Notification }>(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    })
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<ApiResponse<{ updatedCount: number }>> {
    return apiClient.request<{ updatedCount: number }>('/notifications/read-all', {
      method: 'PATCH',
    })
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<ApiResponse> {
    return apiClient.request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    })
  }
}

export const notificationService = new NotificationService()
export type { Notification, NotificationsResponse }

