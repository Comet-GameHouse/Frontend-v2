import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { createContext } from 'react'
import type { NotificationItem, NotificationIntent, NotificationType } from '@app-types'

type NotifyOptions = {
  title: string
  message: string
  type?: NotificationType
  intent?: NotificationIntent
  actionUrl?: string
  payload?: Record<string, unknown>
  durationMs?: number
  icon?: IconProp
}

type NotificationContextValue = {
  notifications: NotificationItem[]
  notify: (options: NotifyOptions) => void
  dismiss: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)

export type { NotifyOptions, NotificationContextValue }
export default NotificationContext

