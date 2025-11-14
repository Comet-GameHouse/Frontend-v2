import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import NotificationContext, {
  type NotificationContextValue,
  type NotifyOptions,
} from './NotificationContext'
import { NotificationContainer } from '@components/notifications'
import type { NotificationItem } from '@app-types'
import { useAuthContext } from '@providers'
import { apiClient } from '@utils/api'
import type { Notification } from '@services/api/notificationService'

type NotificationProviderProps = {
  children: ReactNode
}

const DEFAULT_DURATION_MS = 6000

type NotificationSocketMessage = {
  type: 'connected' | 'notification' | 'pong'
  data?: Notification
  message?: string
  authenticated?: boolean
}

function NotificationProvider({ children }: NotificationProviderProps) {
  const { isAuthenticated, user, isLoading } = useAuthContext()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isConnectingRef = useRef(false)
  const [isConnected, setIsConnected] = useState(false)

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const decrementUnreadCount = useCallback(() => {
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const clearUnreadCount = useCallback(() => {
    setUnreadCount(0)
  }, [])

  const updateUnreadCount = useCallback((count: number | ((prev: number) => number)) => {
    if (typeof count === 'function') {
      setUnreadCount(count)
    } else {
      setUnreadCount(count)
    }
  }, [])

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { notificationService } = await import('@services/api/notificationService')
      const response = await notificationService.getUnreadCount()
      if (response.success && response.data !== undefined) {
        const count = response.data.unreadCount || 0
        setUnreadCount(count)
        console.log('Unread count updated:', count)
      } else {
        setUnreadCount(0)
        console.log('Unread count set to 0 (API failed)')
      }
    } catch (error) {
      console.error('Error fetching unread count:', error)
      setUnreadCount(0)
      console.log('Unread count set to 0 (error)')
    }
  }, [])

  const connect = useCallback(() => {
    // Don't connect if already connecting or connected
    if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connecting or connected, skipping...')
      return
    }

    // Wait for auth to finish loading
    if (isLoading) {
      console.log('Auth still loading, waiting...')
      return
    }

    if (!isAuthenticated || !user) {
      console.log('Not authenticated, cannot connect WebSocket')
      return
    }

    const token = apiClient.getToken()
    if (!token) {
      console.log('No token available, cannot connect WebSocket')
      return
    }

    // Mark as connecting
    isConnectingRef.current = true

    try {
      console.log('Attempting to connect WebSocket...')
      const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3000'}/ws?token=${encodeURIComponent(token)}`
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log('WebSocket connected successfully')
        isConnectingRef.current = false
        setIsConnected(true)
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current)
          reconnectTimeoutRef.current = null
        }
      }

      ws.onmessage = (event) => {
        try {
          const message: NotificationSocketMessage = JSON.parse(event.data)

          if (message.type === 'notification' && message.data) {
            // Update unread count
            setUnreadCount((prev) => prev + 1)

            // Show browser notification if permission granted
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(message.data.title, {
                body: message.data.message,
                icon: '/favicon.ico',
                tag: message.data._id,
                requireInteraction: false,
              })
            }
          } else if (message.type === 'connected') {
            // Fetch initial unread count
            fetchUnreadCount()
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnectingRef.current = false
        setIsConnected(false)
      }

      ws.onclose = (event) => {
        console.log('WebSocket disconnected', { 
          code: event.code, 
          reason: event.reason, 
          wasClean: event.wasClean 
        })
        isConnectingRef.current = false
        setIsConnected(false)
        wsRef.current = null

        // Don't reconnect if it was a clean close or authentication error
        if (event.code === 1008 || event.code === 1000) {
          console.log('WebSocket closed due to authentication or clean close, not reconnecting')
          return
        }

        // For 1006 (abnormal closure), try to reconnect
        if (event.code === 1006) {
          console.warn('Abnormal closure (1006) detected. Attempting to reconnect...')
        }

        // Attempt to reconnect after 3 seconds for network errors (including 1006)
        // But only if still authenticated and not already connecting
        if (isAuthenticated && !isConnectingRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (!isConnectingRef.current && !wsRef.current) {
              console.log('Reconnecting WebSocket...')
              connect()
            }
          }, 3000)
        }
      }

      wsRef.current = ws
    } catch (error) {
      console.error('Error connecting WebSocket:', error)
      isConnectingRef.current = false
    }
  }, [isAuthenticated, user, isLoading, fetchUnreadCount])

  const disconnect = useCallback(() => {
    isConnectingRef.current = false
    if (wsRef.current) {
      wsRef.current.close(1000, 'Client disconnecting')
      wsRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
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

  // Manage WebSocket connection lifecycle
  useEffect(() => {
    // Wait for auth to finish loading before attempting connection
    if (isLoading) {
      console.log('Auth loading, waiting before connecting WebSocket...')
      return
    }

    if (isAuthenticated && user) {
      // Small delay to ensure token is ready
      const connectTimer = setTimeout(() => {
        connect()
        fetchUnreadCount()
      }, 100)

      // Cleanup: Only clear the timer, don't disconnect the socket
      // The socket should persist across page navigation
      return () => {
        clearTimeout(connectTimer)
      }
    } else {
      // Only disconnect when user logs out or is not authenticated
      disconnect()
      setUnreadCount(0)
    }
  }, [isAuthenticated, isLoading, user, connect, disconnect, fetchUnreadCount])

  // Keepalive ping every 30 seconds
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping' }))
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isConnected])

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      notify,
      dismiss,
      clearAll,
      unreadCount,
      setUnreadCount: updateUnreadCount,
      decrementUnreadCount,
      clearUnreadCount,
      isConnected,
      refreshUnreadCount: fetchUnreadCount,
    }),
    [clearAll, dismiss, notifications, notify, unreadCount, decrementUnreadCount, clearUnreadCount, updateUnreadCount, isConnected, fetchUnreadCount],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onDismiss={dismiss} />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider

