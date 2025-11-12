import { createPortal } from 'react-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import NotificationCard from './NotificationCard'
import type { NotificationItem } from '@app-types'

type NotificationContainerProps = {
  notifications: NotificationItem[]
  onDismiss: (id: string) => void
}

const DEFAULT_DURATION_MS = 6000
const EXIT_DURATION_MS = 260

function NotificationContainer({ notifications, onDismiss }: NotificationContainerProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)
  const [leavingIds, setLeavingIds] = useState<string[]>([])
  const lifeTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const exitTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const markLeaving = useCallback((id: string) => {
    setLeavingIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unmarkLeaving = useCallback((id: string) => {
    setLeavingIds((prev) => prev.filter((existing) => existing !== id))
  }, [])

  const initiateDismiss = useCallback(
    (id: string) => {
      if (exitTimersRef.current.has(id)) {
        return
      }

      const lifeTimer = lifeTimersRef.current.get(id)
      if (lifeTimer) {
        clearTimeout(lifeTimer)
        lifeTimersRef.current.delete(id)
      }

      markLeaving(id)
      const exitTimer = setTimeout(() => {
        exitTimersRef.current.delete(id)
        onDismiss(id)
        unmarkLeaving(id)
      }, EXIT_DURATION_MS)

      exitTimersRef.current.set(id, exitTimer)
    },
    [markLeaving, onDismiss, unmarkLeaving],
  )

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!lifeTimersRef.current.has(notification.id)) {
        const duration = notification.durationMs ?? DEFAULT_DURATION_MS
        if (duration > 0) {
          const lifeTimer = setTimeout(() => initiateDismiss(notification.id), duration)
          lifeTimersRef.current.set(notification.id, lifeTimer)
        }
      }
    })

    lifeTimersRef.current.forEach((timer, id) => {
      const stillVisible = notifications.some((notification) => notification.id === id)
      if (!stillVisible) {
        clearTimeout(timer)
        lifeTimersRef.current.delete(id)
      }
    })
  }, [notifications, initiateDismiss])

  useEffect(() => {
    const target = document.getElementById('comet-toast-root')

    if (target) {
      setPortalElement(target)
      return
    }

    const created = document.createElement('div')
    created.id = 'comet-toast-root'
    document.body.appendChild(created)
    setPortalElement(created)

    return () => {
      document.body.removeChild(created)
    }
  }, [])

  useEffect(() => {
    const lifeTimers = lifeTimersRef.current
    const exitTimers = exitTimersRef.current

    return () => {
      lifeTimers.forEach((timer) => clearTimeout(timer))
      exitTimers.forEach((timer) => clearTimeout(timer))
      lifeTimers.clear()
      exitTimers.clear()
    }
  }, [])

  const leavingSet = useMemo(() => new Set(leavingIds), [leavingIds])

  const content = useMemo(
    () => (
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[1000] flex flex-col items-end gap-3 px-4 sm:top-6 sm:px-6">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className="pointer-events-auto w-full max-w-xs sm:max-w-sm"
            style={{ zIndex: notifications.length - index }}
          >
            <NotificationCard
              notification={notification}
              exiting={leavingSet.has(notification.id)}
              onDismiss={() => initiateDismiss(notification.id)}
            />
          </div>
        ))}
      </div>
    ),
    [initiateDismiss, leavingSet, notifications],
  )

  if (!portalElement) {
    return content
  }

  return createPortal(content, portalElement)
}

export default NotificationContainer

