import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks'
import type { HeroCta } from './components/HeroSection'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FeaturesSection from './components/FeaturesSection'
import FeaturedGamesSection from './components/FeaturedGamesSection'
import CtaSection from './components/CtaSection'

function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const ctas: HeroCta[] = isAuthenticated
    ? [
        { label: 'Enter Arena', icon: 'arrow-right', to: '/arena', variant: 'primary' },
        { label: 'Browse Games', icon: 'gamepad', to: '/games', variant: 'outline' },
      ]
    : [
        { label: 'Start Playing Free', icon: 'arrow-right', to: '/auth/signup', variant: 'primary' },
        { label: 'Explore Games', icon: 'circle-play', to: '/games', variant: 'outline' },
      ]

  return (
    <main className="space-y-16 pb-20 text-slate-200">
      <HeroSection ctas={ctas} onNavigate={navigate} />
      <StatsSection />
      <FeaturesSection />
      <FeaturedGamesSection onNavigate={navigate} />
      <CtaSection isAuthenticated={isAuthenticated} onNavigate={navigate} />
    </main>
  )
}

export default HomePage

