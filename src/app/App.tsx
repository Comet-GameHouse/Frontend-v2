import { useEffect } from 'react'
import AOS from 'aos'
import { CosmicBackground } from '@components'
import { AuthProvider, NotificationProvider, AbilityCardProvider } from '@providers'
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

  // Request browser notification permission on app load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Show a prompt after a short delay to not interrupt initial load
      const timer = setTimeout(() => {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Browser notifications enabled')
          } else {
            console.log('Browser notifications denied')
          }
        })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AuthProvider>
      <NotificationProvider>
        <AbilityCardProvider>
          <div className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <CosmicBackground className="z-0" />
            <div className="relative z-10">
              <AppRouter />
            </div>
          </div>
        </AbilityCardProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App

