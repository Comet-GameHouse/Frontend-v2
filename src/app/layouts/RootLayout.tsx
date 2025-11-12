import { Outlet } from 'react-router-dom'
import { SiteHeader, SiteFooter } from '@components/layout'

function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default RootLayout
