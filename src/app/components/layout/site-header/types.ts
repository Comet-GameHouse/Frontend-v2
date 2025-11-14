import type { RefObject } from 'react'

type NavigationItem = {
  label: string
  href: string
}

type MobileMenuControls = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

type SiteHeaderActions = {
  navigate: (href: string) => void
  goToNotifications: () => void
  signIn: () => void
  signUp: () => void
  signOut: () => void
  viewProfile: () => void
  openDashboard: () => void
}

type ProfileMenuControls = {
  isOpen: boolean
  toggle: () => void
  close: () => void
  buttonRef: RefObject<HTMLButtonElement>
  menuRef: RefObject<HTMLDivElement>
}

type SiteHeaderContextValue = {
  navItems: NavigationItem[]
  currentPath: string
  isAuthenticated: boolean
  coinBalance: number
  formattedCoins: string
  displayName: string
  userEmail?: string
  userRole: string
  userInitial: string
  profileMenu: ProfileMenuControls
  mobileMenu: MobileMenuControls
  actions: SiteHeaderActions
}

export type {
  NavigationItem,
  MobileMenuControls,
  SiteHeaderActions,
  SiteHeaderContextValue,
  ProfileMenuControls,
}
