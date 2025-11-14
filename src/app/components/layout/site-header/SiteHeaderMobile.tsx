import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'
import cn from '@lib/cn'
import useSiteHeaderContext from './useSiteHeaderContext'

function SiteHeaderMobile() {
  const {
    navItems,
    isAuthenticated,
    currentPath,
    displayName,
    formattedCoins,
    userInitial,
    mobileMenu,
    actions,
  } = useSiteHeaderContext()

  return (
    <div
      className={cn(
        'border-t border-slate-800/70 bg-slate-950/90 transition-[max-height,opacity] duration-200 ease-out lg:hidden',
        mobileMenu.isOpen 
          ? 'max-h-96 opacity-100 pointer-events-auto' 
          : 'max-h-0 opacity-0 pointer-events-none',
      )}
    >
      <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 text-sm text-slate-200">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'rounded-xl border border-transparent px-4 py-3 transition-colors',
                isActive ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-100' : 'hover:border-cyan-500/20 hover:bg-cyan-500/5',
              )}
              onClick={(event) => {
                event.preventDefault()
                actions.navigate(item.href)
              }}
            >
              {item.label}
            </Link>
          )
        })}
        <div className="flex flex-col gap-4 border-t border-slate-800/70 pt-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                <div>
                  <p className="font-semibold">{displayName}</p>
                  <p className="text-xs text-slate-400">Coins: {formattedCoins}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-base font-semibold text-cyan-100">
                  {userInitial}
                </span>
              </div>
              <Button variant="ghost" block onClick={actions.openDashboard}>
                Go to Dashboard
              </Button>
              <Button variant="outline" block onClick={actions.viewProfile}>
                View Profile
              </Button>
              <Button variant="danger" block onClick={actions.signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" block onClick={actions.signIn}>
                Sign in
              </Button>
              <Button variant="primary" block rightIcon="arrow-right" onClick={actions.signUp}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default SiteHeaderMobile
