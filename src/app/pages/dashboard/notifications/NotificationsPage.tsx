import { useEffect, useState, useCallback } from 'react'
import { Card, Button } from '@components'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { notificationService, type Notification } from '@services/api/notificationService'
import { useNotificationsSocket, useNotifications, useAOS } from '@hooks'

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { unreadCount, refreshUnreadCount, decrementUnreadCount, clearUnreadCount } = useNotificationsSocket()
  const { notify } = useNotifications()
  const getAOSProps = useAOS()

  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await notificationService.getNotifications({ limit: 50 })
      
      if (response.success && response.data) {
        setNotifications(response.data.notifications)
      } else {
        setError('Failed to load notifications')
      }
    } catch (err) {
      console.error('Error loading notifications:', err)
      setError('Failed to load notifications')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleMarkAsRead = useCallback(async (notificationId: string) => {
    try {
      // Check if notification is already read
      const notification = notifications.find((n) => n._id === notificationId)
      const wasUnread = !notification?.readAt

      const response = await notificationService.markAsRead(notificationId)
      if (response.success) {
        // Update local state immediately
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, readAt: new Date().toISOString() } : n))
        )
        
        // Optimistically decrement count if it was unread
        if (wasUnread) {
          decrementUnreadCount()
        }
        
        // Refresh from server to ensure accuracy
        setTimeout(async () => {
          await refreshUnreadCount()
        }, 200)
      } else {
        notify({
          title: 'Error',
          message: response.message || 'Failed to mark notification as read',
          intent: 'error',
        })
      }
    } catch (err) {
      console.error('Error marking notification as read:', err)
      notify({
        title: 'Error',
        message: 'Failed to mark notification as read',
        intent: 'error',
      })
    }
  }, [refreshUnreadCount, decrementUnreadCount, notify, notifications])

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      const response = await notificationService.markAllAsRead()
      if (response.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, readAt: new Date().toISOString() })))
        // Optimistically clear unread count
        clearUnreadCount()
        // Refresh from server to ensure accuracy
        setTimeout(async () => {
          await refreshUnreadCount()
        }, 200)
        notify({
          title: 'Success',
          message: 'All notifications marked as read',
          intent: 'success',
        })
      } else {
        notify({
          title: 'Error',
          message: response.message || 'Failed to mark all notifications as read',
          intent: 'error',
        })
      }
    } catch (err) {
      console.error('Error marking all as read:', err)
      notify({
        title: 'Error',
        message: 'Failed to mark all notifications as read',
        intent: 'error',
      })
    }
  }, [refreshUnreadCount, clearUnreadCount, notify])

  const handleDelete = useCallback(async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId)
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId))
      refreshUnreadCount()
    } catch (err) {
      console.error('Error deleting notification:', err)
      notify({
        title: 'Error',
        message: 'Failed to delete notification',
        intent: 'error',
      })
    }
  }, [refreshUnreadCount, notify])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  if (isLoading) {
    return (
      <Card variant="void" className="space-y-4">
        <p className="text-slate-400">Loading notifications...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card variant="void" className="space-y-4">
        <p className="text-rose-400">{error}</p>
        <Button onClick={loadNotifications}>Retry</Button>
      </Card>
    )
  }

  return (
    <Card variant="void" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">All Notifications</h2>
          <p className="text-sm text-slate-300">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-slate-400">No notifications yet</p>
        </div>
      ) : (
        <ul className="space-y-3 text-sm text-slate-300">
          {notifications.map((notification, index) => (
            <li
              key={notification._id}
              className={`flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                notification.readAt
                  ? 'border-white/5 bg-white/5'
                  : 'border-cyan-500/30 bg-cyan-500/10'
              }`}
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(200 + index * 50) })}
            >
              <span
                className={`flex size-9 items-center justify-center rounded-xl border text-cyan-200 ${
                  notification.intent === 'error'
                    ? 'border-rose-400/40 bg-rose-400/10'
                    : notification.intent === 'success'
                    ? 'border-emerald-400/40 bg-emerald-400/10'
                    : notification.intent === 'warning'
                    ? 'border-amber-400/40 bg-amber-400/10'
                    : 'border-cyan-400/40 bg-cyan-400/10'
                }`}
              >
                <FontAwesomeIcon icon={notification.icon as IconName} className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{notification.title}</p>
                  <span className="text-xs text-slate-500">{formatTimeAgo(notification.createdAt)}</span>
                </div>
                <p className="text-xs text-slate-400">{notification.message}</p>
              </div>
              <div className="flex gap-2">
                {!notification.readAt && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(notification._id)}
                    className="px-2"
                    aria-label="Mark as read"
                  >
                    <FontAwesomeIcon icon="check" className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(notification._id)}
                  className="px-2 text-rose-400 hover:text-rose-300"
                  aria-label="Delete"
                >
                  <FontAwesomeIcon icon="trash" className="h-3 w-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default NotificationsPage
