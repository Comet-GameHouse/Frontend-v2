import Button from '@components/ui/Button'
import useSiteHeaderContext from './useSiteHeaderContext'

type SiteHeaderProfileMenuProps = {
  formattedCoins: string
}

function SiteHeaderProfileMenu({ formattedCoins }: SiteHeaderProfileMenuProps) {
  const { displayName, userEmail, userRole, userInitial, profileMenu, actions } = useSiteHeaderContext()

  if (!profileMenu.isOpen) return null

  return (
    <div
      ref={profileMenu.menuRef}
      className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-3xl border border-slate-800/80 bg-slate-950/95 p-5 shadow-[0_24px_60px_-40px_rgba(56,189,248,0.65)] backdrop-blur-xl"
      data-aos="fade-down"
      data-aos-duration="300"
      data-aos-delay="250"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-semibold text-cyan-100">
          {userInitial}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-100">{displayName}</span>
          {userEmail && <span className="text-xs text-slate-400">{userEmail}</span>}
          <span className="text-xs text-cyan-200">Role · {userRole}</span>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm">
        <div className="flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-cyan-100">
          <span>Comet Coins</span>
          <span className="font-semibold">{formattedCoins}</span>
        </div>
        <Button variant="outline" size="sm" onClick={actions.viewProfile}>
          View Profile
        </Button>
        <Button variant="ghost" size="sm" onClick={actions.openDashboard}>
          Open Dashboard
        </Button>
        <Button variant="danger" size="sm" onClick={actions.signOut} leftIcon="arrow-right-to-bracket">
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default SiteHeaderProfileMenu
