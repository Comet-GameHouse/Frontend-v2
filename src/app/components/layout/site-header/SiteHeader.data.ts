import type { NavigationItem } from './SiteHeader.types'

const publicNavigation: NavigationItem[] = [
  { label: 'Games', href: '/games' },
  { label: 'Arena', href: '/arena' },
  { label: 'Community', href: '/community' },
  { label: 'Support', href: '/support' },
]

const authenticatedNavigation: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Progress', href: '/progress/achievements' },
]

export { publicNavigation, authenticatedNavigation }
