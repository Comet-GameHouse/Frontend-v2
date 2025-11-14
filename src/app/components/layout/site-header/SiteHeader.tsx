import { useMemo, useState, useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { useAuth } from '@hooks'
import SiteHeaderDesktop from './SiteHeaderDesktop'
import SiteHeaderMobile from './SiteHeaderMobile'
import { authenticatedNavigation, publicNavigation } from './data'
import useProfileMenu from './useProfileMenu'
import SiteHeaderProvider from './SiteHeaderProvider'
import AOS from 'aos'

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, signOut: signOutUser } = useAuth()
  const profileMenu = useProfileMenu()

  const displayName = user?.displayName ?? 'Guest'
  const userInitial = displayName.charAt(0).toUpperCase()
  const userRole = user?.role ?? 'player'
  const coinBalance = 12850
  const formattedCoins = new Intl.NumberFormat().format(coinBalance)
  const userEmail = user?.email

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false)
    profileMenu.close()
  }, [profileMenu])

  const contextValue = useMemo(
    () => {
      const navItems = isAuthenticated
        ? [...publicNavigation, ...authenticatedNavigation]
        : publicNavigation

      return {
        navItems,
        currentPath: location.pathname,
        isAuthenticated,
        coinBalance,
        formattedCoins,
        displayName,
        userEmail,
        userRole,
        userInitial,
        profileMenu,
        mobileMenu: {
          isOpen: isMenuOpen,
          toggle: () => {
            setIsMenuOpen((prev) => {
              const next = !prev
              if (next) profileMenu.close()
              return next
            })
          },
          close: closeAllMenus,
        },
        actions: {
          navigate: (href: string) => {
            closeAllMenus()
            navigate(href)
          },
          goToNotifications: () => {
            closeAllMenus()
            navigate('/notifications')
          },
          signIn: () => {
            closeAllMenus()
            navigate('/auth/signin')
          },
          signUp: () => {
            closeAllMenus()
            navigate('/auth/signup')
          },
          signOut: () => {
            closeAllMenus()
            signOutUser()
          },
          viewProfile: () => {
            closeAllMenus()
            navigate('/profile')
          },
          openDashboard: () => {
            closeAllMenus()
            navigate('/dashboard')
          },
        },
      }
    },
    [
      isAuthenticated,
      location.pathname,
      formattedCoins,
      coinBalance,
      displayName,
      userEmail,
      userRole,
      userInitial,
      profileMenu,
      isMenuOpen,
      navigate,
      signOutUser,
      closeAllMenus,
    ],
  )

  useEffect(() => {
    AOS.refresh()
  }, [contextValue])

  return (
    <SiteHeaderProvider value={contextValue}>
      <header className="fixed inset-x-0 top-0 z-40 w-full border-b border-slate-800/70 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-4 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-slate-100"
            onClick={() => contextValue.mobileMenu.close()}
            data-aos="fade-down"
            data-aos-duration="300"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-200">
              <FontAwesomeIcon icon="meteor" className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight whitespace-nowrap">Comet GameHouse</span>
          </Link>

          <SiteHeaderDesktop />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={contextValue.mobileMenu.toggle}
            leftIcon={contextValue.mobileMenu.isOpen ? 'xmark' : 'bars'}
            aria-expanded={contextValue.mobileMenu.isOpen}
            aria-label="Toggle navigation menu"
            data-aos="fade-down"
            data-aos-duration="300"
            data-aos-delay="200"
          >
            Menu
          </Button>
        </div>

        <SiteHeaderMobile />
      </header>
    </SiteHeaderProvider>
  )
}

export default SiteHeader
