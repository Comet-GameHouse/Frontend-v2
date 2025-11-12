import { Link, Outlet, useLocation } from 'react-router-dom'
import cn from '@lib/cn'

const NAV_LINKS = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Use', href: '/legal/terms' },
]

const META: Record<string, { title: string; description: string }> = {
  '/legal': {
    title: 'Privacy Policy',
    description: 'Understand how Comet GameHouse handles player data, security, and compliance.',
  },
  '/legal/privacy': {
    title: 'Privacy Policy',
    description: 'Understand how Comet GameHouse handles player data, security, and compliance.',
  },
  '/legal/terms': {
    title: 'Terms of Use',
    description: 'Review the rules that govern play, payments, and community activity inside Comet GameHouse.',
  },
}

function LegalLayout() {
  const { pathname } = useLocation()
  const meta = META[pathname] ?? META['/legal']

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-16 pt-14 sm:px-8">
      <Link to="/" className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100" data-aos="fade-up" data-aos-duration="300">
        ← Back to home
      </Link>
      <header className="mt-6 space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
        <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
        <p className="text-base text-slate-300">{meta.description}</p>
      </header>

      <nav className="mt-8 flex gap-2 text-sm">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            to={link.href}
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(120 + index * 50)}
            className={cn(
              'rounded-full border px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
              active
                ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-100'
                : 'border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-100',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 grid gap-6">
        <Outlet />
      </div>
    </section>
  )
}

export default LegalLayout

