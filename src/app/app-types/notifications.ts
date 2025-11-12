type NotificationType =
  | 'system'
  | 'friend-request'
  | 'match-invite'
  | 'room-update'
  | 'reward'

type NotificationIntent = 'info' | 'success' | 'warning' | 'error'

type NotificationPayload = Record<string, unknown>

import type { IconProp } from '@fortawesome/fontawesome-svg-core'

type NotificationItem = {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  readAt?: string
  payload?: NotificationPayload
  actionUrl?: string
  intent?: NotificationIntent
  durationMs?: number
  icon?: IconProp
}

export type {
  NotificationIntent,
  NotificationItem,
  NotificationPayload,
  NotificationType,
}

