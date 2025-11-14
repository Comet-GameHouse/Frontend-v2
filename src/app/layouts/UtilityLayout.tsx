import { Outlet, useLocation } from 'react-router-dom'
import { PageShell } from '@components'
import type { LayoutMeta } from '@app-types'

const DEFAULT_META: LayoutMeta = {
  title: 'Lost in Space',
  description: 'The page you’re looking for drifted into a black hole. Navigate back home to continue exploring.',
}

const UTILITY_META: Record<string, LayoutMeta> = {
  '/dev/notifications': {
    title: 'Notification Showcase',
    description: 'Trigger Comet-styled toasts to preview intents and content patterns.',
  },
  '/dev/uikit': {
    title: 'UI Kit Showcase',
    description: 'Explore Comet GameHouse interface primitives, variants, and motion states.',
  },
}

function resolveMeta(pathname: string): LayoutMeta {
  return UTILITY_META[pathname] ?? DEFAULT_META
}

function UtilityLayout() {
  const { pathname } = useLocation()
  const meta = resolveMeta(pathname)

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-2xl">
        <PageShell title={meta?.title ?? ''} description={meta?.description}>
          <Outlet />
        </PageShell>
      </div>
    </main>
  )
}

export default UtilityLayout

