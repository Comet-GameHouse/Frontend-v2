import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import AOS from 'aos'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@components'

const features: Array<{ title: string; description: string; icon: IconProp }> = [
  {
    title: 'Global arenas',
    description: 'Join synchronized showdowns with players across every time zone.',
    icon: 'globe',
  },
  {
    title: 'Room matchmaking',
    description: 'Spin up private rooms instantly and invite your crew with a single link.',
    icon: 'users',
  },
  {
    title: 'Progress tracking',
    description: 'Track achievements, unlock cosmetics, and compare streaks on the galaxy board.',
    icon: 'trophy',
  },
]

function AuthLayout() {
  useEffect(() => {
    AOS.refresh()
  }, [])

  const location = useLocation()
  const navigate = useNavigate()
  const authPath = location.pathname
  const isSignIn = authPath.endsWith('/signin')
  const isSignUp = authPath.endsWith('/signup')
  const isForgotPassword = authPath.endsWith('/forgot-password')
  const isVerifyCode = authPath.endsWith('/verify-code')

  const secondaryPath = isSignIn ? '/auth/signup' : '/auth/signin'
  const secondaryLabel = isSignIn ? 'Create account' : 'Sign in instead'

  return (
    <main className="relative flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.25),transparent_55%),linear-gradient(145deg,rgba(15,23,42,0.95),rgba(2,6,23,0.92))] text-slate-200 lg:flex-row">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
        >
          <FontAwesomeIcon icon="meteor" className="h-4 w-4" />
          Comet GameHouse
        </Link>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            leftIcon="arrow-left"
            className="bg-white/5 text-white hover:bg-white/10"
          >
            Back to home
          </Button>
          {isVerifyCode ? null : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(secondaryPath)}
              leftIcon={isSignIn ? 'user-plus' : 'arrow-right-to-bracket'}
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </header>

      <section className="hidden w-full max-w-xl flex-col justify-between gap-12 border-r border-white/5 px-12 pb-14 pt-32 lg:flex">
        <div className="space-y-8" data-aos="fade-up" data-aos-duration="300">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
            <span className="size-2 rounded-full bg-cyan-300" />
            Comet GameHouse
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white">Welcome to Comet GameHouse</h1>
            <p className="text-base text-slate-300">
              Battle through cosmic arenas, assemble your squad, and rise across leaderboards with a platform tuned for competitive multiplayer.
            </p>
          </div>
        </div>

        <ul className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(200 + index * 100)}
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
                <FontAwesomeIcon icon={feature.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{feature.title}</p>
                <p className="text-sm text-slate-200/80">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-sm text-slate-300" data-aos="fade-up" data-aos-duration="300" data-aos-delay="550">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-200">
            <FontAwesomeIcon icon="meteor" className="h-4 w-4" />
          </span>
          <p className="max-w-xs">
            Earn exclusive launch rewards and bonus{' '}
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
              <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">coins</span>
            </span>{' '}
            when you complete your first five arena matches.
          </p>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 pb-24 pt-32 sm:px-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-48px_rgba(14,116,144,0.6)] backdrop-blur-2xl">
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default AuthLayout

