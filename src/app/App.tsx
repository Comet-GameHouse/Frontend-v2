import { useEffect } from 'react'
import AOS from 'aos'
import { AuthProvider, NotificationProvider } from '@providers'
import { AppRouter } from '@router'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out',
      once: false,
    })
  }, [])

  return (
    <NotificationProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App

