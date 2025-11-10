import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NotificationIntent, NotificationItem } from '@types'

type NotificationCardProps = {
  notification: NotificationItem
  exiting: boolean
  onDismiss: () => void
}

const cosmicStyles: Record<
  NotificationIntent,
  {
    border: string
    accent: string
    glow: string
    rayColor: string
  }
> = {
  info: {
    border: 'border-cyan-400/40',
    accent: 'from-cyan-400/20 via-blue-500/10 to-violet-500/10',
    glow: 'shadow-[0_8px_32px_-18px_rgba(6,182,212,0.55)]',
    rayColor: 'bg-cyan-400/25',
  },
  success: {
    border: 'border-emerald-400/35',
    accent: 'from-emerald-400/20 via-teal-500/10 to-cyan-500/10',
    glow: 'shadow-[0_10px_32px_-18px_rgba(16,185,129,0.55)]',
    rayColor: 'bg-emerald-400/25',
  },
  warning: {
    border: 'border-amber-400/40',
    accent: 'from-amber-400/25 via-orange-500/10 to-red-500/10',
    glow: 'shadow-[0_10px_32px_-18px_rgba(245,158,11,0.6)]',
    rayColor: 'bg-amber-400/25',
  },
  error: {
    border: 'border-rose-400/40',
    accent: 'from-rose-500/25 via-fuchsia-500/15 to-purple-500/10',
    glow: 'shadow-[0_10px_32px_-18px_rgba(244,63,94,0.6)]',
    rayColor: 'bg-rose-500/25',
  },
}

function NotificationCard({ notification, exiting, onDismiss }: NotificationCardProps) {
  const { intent = 'info' } = notification
  const styles = cosmicStyles[intent]
  const iconName = notification.icon ?? 'bell'
  const typeDisplay = notification.type.replace('-', ' ')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setIsVisible(true), 10)
    return () => window.clearTimeout(enterTimer)
  }, [])

  useEffect(() => {
    if (exiting) {
      setIsVisible(false)
    }
  }, [exiting])

  return (
    <article
      role="status"
      aria-live="polite"
      className={[
        'relative overflow-hidden rounded-2xl border bg-slate-950/75 px-4 py-4 transition-all duration-250 ease-out',
        'backdrop-blur-lg',
        styles.border,
        styles.glow,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      ].join(' ')}
    >
      <div
        className={[
          'pointer-events-none absolute -left-36 top-0 h-full w-1/2 blur-3xl',
          styles.accent && `bg-gradient-to-r ${styles.accent}`,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="relative flex items-start gap-3">
        <span
          className={[
            'relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/80 text-indigo-200',
            'border border-slate-700/60 shadow-[inset_0_0_16px_rgba(148,163,184,0.18)]',
          ].join(' ')}
        >
          <span
            className={[
              'absolute inset-0 animate-pulse rounded-2xl blur-2xl',
              styles.rayColor,
            ].join(' ')}
          />
          <FontAwesomeIcon icon={iconName} className="relative h-4 w-4 text-indigo-200" />
        </span>
        <div className="flex-1">
          <header className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-slate-400">{typeDisplay}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-100">{notification.title}</h3>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-transparent text-slate-400 transition hover:border-slate-600 hover:text-slate-100"
              aria-label="Dismiss notification"
            >
              <FontAwesomeIcon icon="xmark" className="h-4 w-4" />
            </button>
          </header>
          <p className="mt-2 text-sm text-slate-300">{notification.message}</p>
          {notification.actionUrl ? (
            <a
              href={notification.actionUrl}
              className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-indigo-300 transition hover:text-indigo-100"
            >
              View Details
              <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default NotificationCard

