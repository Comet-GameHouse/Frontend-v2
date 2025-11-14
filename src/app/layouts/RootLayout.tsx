import { Outlet } from 'react-router-dom'
import { SiteHeader, SiteFooter, SiteSidebar } from '@components/layout'

function RootLayout() {
  return (
    <div className="relative flex min-h-screen">
      <SiteSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1 pt-24">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

export default RootLayout
