import { useCallback, useMemo, useState, type ReactNode } from 'react'
import NotificationContext, {
  type NotificationContextValue,
  type NotifyOptions,
} from './NotificationContext'
import NotificationContainer from '@components/notifications/NotificationContainer'
import type { NotificationItem } from '@types'

type NotificationProviderProps = {
  children: ReactNode
}

const DEFAULT_DURATION_MS = 6000

function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const notify = useCallback(
    ({
      title,
      message,
      type = 'system',
      intent = 'info',
      actionUrl,
      payload,
      durationMs,
      icon,
    }: NotifyOptions) => {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`

      const createdAt = new Date().toISOString()
      const defaultIconByIntent = {
        info: 'satellite',
        success: 'circle-check',
        warning: 'triangle-exclamation',
        error: 'explosion',
      } as const

      const notification: NotificationItem = {
        id,
        title,
        message,
        type,
        intent,
        actionUrl,
        payload,
        createdAt,
        durationMs: durationMs ?? DEFAULT_DURATION_MS,
        icon: icon ?? defaultIconByIntent[intent] ?? 'bell',
      }

      setNotifications((prev) => [...prev, notification])
    },
    [],
  )

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      notify,
      dismiss,
      clearAll,
    }),
    [clearAll, dismiss, notifications, notify],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onDismiss={dismiss} />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider

