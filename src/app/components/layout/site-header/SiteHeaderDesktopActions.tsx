import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import SiteHeaderProfileMenu from './SiteHeaderProfileMenu'
import useSiteHeaderContext from './useSiteHeaderContext'
import CountUp from 'react-countup'
import { useNotificationsSocket, useAOS } from '@hooks'

function SiteHeaderDesktopActions() {
  const { isAuthenticated, coinBalance, formattedCoins, displayName, userRole, userInitial, profileMenu, actions } =
    useSiteHeaderContext()
  const { unreadCount } = useNotificationsSocket()
  const getAOSProps = useAOS()

  if (!isAuthenticated) {
    return (
      <div
        className="hidden items-center gap-3 lg:flex"
        {...getAOSProps({ 'data-aos': 'fade-down', 'data-aos-duration': '300', 'data-aos-delay': '100' })}
      >
        <Button variant="ghost" onClick={actions.signIn}>
          Sign in
        </Button>
        <Button variant="primary" rightIcon="arrow-right" onClick={actions.signUp}>
          Sign up
        </Button>
      </div>
    )
  }

  return (
    <div
      className="hidden items-center gap-3 lg:flex"
      {...getAOSProps({ 'data-aos': 'fade-down', 'data-aos-duration': '300', 'data-aos-delay': '100' })}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-100">
        <FontAwesomeIcon icon="coins" className="h-4 w-4" />
        <span className="font-semibold tabular-nums" aria-live="polite">
          <CountUp end={coinBalance} duration={1} separator="," preserveValue />
        </span>
      </div>
      <div className="relative" {...getAOSProps({ 'data-aos': 'fade-down', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        <Button
          variant="ghost"
          size="sm"
          onClick={actions.goToNotifications}
          className="px-2"
          aria-label="Notifications"
        >
          <FontAwesomeIcon icon="bell" className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      <div className="relative" {...getAOSProps({ 'data-aos': 'fade-down', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
        <button
          type="button"
          ref={profileMenu.buttonRef}
          onClick={profileMenu.toggle}
          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-left text-sm text-slate-100"
          aria-haspopup="menu"
          aria-expanded={profileMenu.isOpen}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-base font-semibold text-cyan-100">
            {userInitial}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold">{displayName}</span>
            <span className="text-xs text-slate-400">{userRole}</span>
          </span>
          <FontAwesomeIcon icon="chevron-down" className="h-3.5 w-3.5 text-slate-500" />
        </button>
        <SiteHeaderProfileMenu formattedCoins={formattedCoins} />
      </div>
    </div>
  )
}

export default SiteHeaderDesktopActions
