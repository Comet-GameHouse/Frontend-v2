import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useAuth } from '@hooks'
import cn from '@lib/cn'

type SidebarItem = {
  label: string
  href: string
  icon: IconProp
}

const BASE_ITEMS: SidebarItem[] = [
  { label: 'Home', href: '/', icon: 'house' },
  { label: 'Games', href: '/games', icon: 'gamepad' },
  { label: 'Arena', href: '/arena', icon: 'meteor' },
  { label: 'Community', href: '/community', icon: 'users' },
  { label: 'Support', href: '/support', icon: 'life-ring' },
  { label: 'Friends', href: '/friends', icon: 'user-group' },
]

const AUTH_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'gauge-high' },
  { label: 'Progress', href: '/progress/achievements', icon: 'chart-line' },
  { label: 'Leaderboard', href: '/progress/leaderboard', icon: 'trophy' },
  { label: 'Shop', href: '/progress/shop', icon: 'coins' },
]

function resolveActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function SiteSidebar() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const items = useMemo(() => {
    if (!isAuthenticated) return BASE_ITEMS
    return [...BASE_ITEMS, ...AUTH_ITEMS]
  }, [isAuthenticated])

  return (
    <aside 
      className="fixed left-0 top-1/2 hidden -translate-y-1/2 md:block z-50"
      aria-label="Primary navigation"
    >
      <div 
        className={cn(
          'relative flex items-center',
          !isOpen && 'w-8'
        )}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span
          className={cn(
            'flex h-20 w-8 cursor-pointer items-center justify-center rounded-r-full border border-cyan-400/40 border-l-transparent bg-slate-950/80 text-cyan-200 shadow-[0_12px_48px_-24px_rgba(34,211,238,0.6)] backdrop-blur transition',
            isOpen ? 'opacity-0 pointer-events-none' : 'hover:text-cyan-100',
          )}
          onMouseEnter={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon="bars" className="h-4 w-4" />
        </span>
        <nav
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 -ml-7 flex w-56 flex-col gap-3 rounded-3xl border border-cyan-400/20 bg-slate-950/90 px-4 py-5 text-sm shadow-[0_24px_80px_-40px_rgba(34,211,238,0.6)] backdrop-blur-xl transition-all duration-200',
            isOpen ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-[-12px] opacity-0',
          )}
          onMouseEnter={() => setIsOpen(true)}
        >
          {items.map((item) => {
            const isActive = resolveActive(location.pathname, item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border px-3 py-2 transition',
                  isActive
                    ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100 shadow-[0_12px_40px_-26px_rgba(34,211,238,0.7)]'
                    : 'border-transparent text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-100',
                )}
              >
                <FontAwesomeIcon icon={item.icon} className="h-4 w-4 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default SiteSidebar

