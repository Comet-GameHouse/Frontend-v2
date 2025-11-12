import { useEffect } from 'react'
import AOS from 'aos'
import { CosmicBackground } from '@components'
import { AuthProvider, NotificationProvider } from '@providers'
import { AppRouter } from '@router'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out',
      once: true,
      offset: -9999,
    })
  }, [])

  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
          <CosmicBackground className="z-0" />
          <div className="relative z-10">
            <AppRouter />
          </div>
        </div>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App

