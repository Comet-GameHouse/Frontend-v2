import { Link, Outlet, useLocation } from 'react-router-dom'
import cn from '@lib/cn'

const NAV_LINKS = [
  { label: 'Achievements', href: '/progress/achievements' },
  { label: 'Leaderboard', href: '/progress/leaderboard' },
  { label: 'Shop', href: '/progress/shop' },
]

const META: Record<string, { title: string; description: string }> = {
  '/progress/achievements': {
    title: 'Achievements',
    description: 'Review badges earned and discover challenges still locked.',
  },
  '/progress/leaderboard': {
    title: 'Leaderboard',
    description: 'Track your global standings and rival squads in real time.',
  },
  '/progress/shop': {
    title: 'Cosmetic Shop',
    description: 'Redeem shards for cosmetics, emotes, and match introductions.',
  },
}

function ProgressionLayout() {
  const { pathname } = useLocation()
  const meta = META[pathname] ?? META['/progress/achievements']

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 sm:px-10">
      <header className="space-y-3" data-aos="fade-up" data-aos-duration="300">
        <Link to="/dashboard" className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">
          ← Back to dashboard
        </Link>
        <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
        <p className="text-base text-slate-300">{meta.description}</p>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'rounded-full border px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
              pathname === link.href
                ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-100'
                : 'border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-100',
            )}
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(100 + index * 50)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 grid gap-6" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <Outlet />
      </div>
    </section>
  )
}

export default ProgressionLayout

