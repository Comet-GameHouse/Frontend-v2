import { Outlet, useLocation } from 'react-router-dom'
import { PageShell } from '@components'
import type { LayoutMeta } from '@app-types'

const DEFAULT_META: LayoutMeta = {
  title: 'Discover Comet GameHouse',
  description: 'Explore the stories, creators, and contact points powering the Comet GameHouse universe.',
}

const MARKETING_META: Record<string, LayoutMeta> = {
  '/about': {
    title: 'About Comet GameHouse',
    description: 'Meet the crew building the galaxy’s most dynamic multiplayer playground.',
  },
  '/community': {
    title: 'Community Highlights',
    description: 'Discover featured creators, spotlight squads, and our brand-new Discord hub.',
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Reach the Comet GameHouse crew for support, partnerships, or press requests.',
  },
}

function resolveMeta(pathname: string): LayoutMeta {
  return MARKETING_META[pathname] ?? DEFAULT_META
}

function MarketingLayout() {
  const { pathname } = useLocation()
  const meta = resolveMeta(pathname)

  return (
    <main className="min-h-screen">
      <PageShell title={meta?.title ?? ''} description={meta?.description}>
        <Outlet />
      </PageShell>
    </main>
  )
}

export default MarketingLayout

