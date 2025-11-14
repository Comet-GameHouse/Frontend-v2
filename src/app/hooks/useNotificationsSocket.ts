import useNotificationContext from '../providers/notifications/useNotificationContext'

/**
 * Hook to access notification WebSocket functionality.
 * The WebSocket connection is managed at the provider level,
 * so it persists across page navigation and doesn't close when leaving pages.
 */
export function useNotificationsSocket() {
  const { 
    unreadCount, 
    decrementUnreadCount, 
    clearUnreadCount,
    isConnected,
    refreshUnreadCount,
  } = useNotificationContext()

  return { 
    unreadCount, 
    isConnected, 
    refreshUnreadCount,
    decrementUnreadCount,
    clearUnreadCount,
  }
}
