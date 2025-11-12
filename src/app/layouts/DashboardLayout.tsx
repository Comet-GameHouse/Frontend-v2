import { Link, Outlet, useLocation } from 'react-router-dom'
import cn from '@lib/cn'

const NAV_LINKS = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Profile', href: '/profile' },
  { label: 'Notifications', href: '/notifications' },
  { label: 'Settings', href: '/settings' },
]

const META: Record<string, { title: string; description: string }> = {
  '/dashboard': {
    title: 'Commander Dashboard',
    description: 'Monitor sessions, invitations, and progress across Comet GameHouse.',
  },
  '/profile': {
    title: 'Player Profile',
    description: 'Review social presence, badge history, and multiplayer stats.',
  },
  '/notifications': {
    title: 'Notifications Hub',
    description: 'Control match alerts, maintenance bulletins, and social pings.',
  },
  '/settings': {
    title: 'Account Settings',
    description: 'Adjust privacy, security, communication, and linked services.',
  },
}

function DashboardLayout() {
  const { pathname } = useLocation()
  const meta = META[pathname] ?? META['/dashboard']

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-12 sm:px-10 lg:flex-row">
      <nav className="flex flex-wrap gap-2 text-sm text-slate-300 lg:w-56 lg:flex-col lg:gap-3" data-aos="fade-up" data-aos-duration="300">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex-1 rounded-xl border px-4 py-2 transition lg:flex-none',
              pathname === link.href
                ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-100'
                : 'border-white/10 hover:border-cyan-400/40 hover:text-cyan-100',
            )}
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(100 + index * 50)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1 space-y-6" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
          <p className="text-base text-slate-300">{meta.description}</p>
        </header>

        <div className="grid gap-8">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout

