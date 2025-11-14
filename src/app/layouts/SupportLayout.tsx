import { Link, Outlet, useLocation } from 'react-router-dom'
import cn from '@lib/cn'
import { useAOS } from '@hooks'

const NAV_LINKS = [
  { label: 'Overview', href: '/support' },
  { label: 'Help Center', href: '/support/help' },
  { label: 'Status', href: '/support/status' },
  { label: 'Feedback', href: '/support/feedback' },
  { label: 'Report a Bug', href: '/support/report-bug' },
]

const META: Record<string, { title: string; description: string }> = {
  '/support': {
    title: 'Support Center',
    description: 'Need an assist? Submit a ticket or browse support resources for Comet GameHouse.',
  },
  '/support/help': {
    title: 'Help Center',
    description: 'Find quick answers, troubleshooting steps, and best practices for Comet GameHouse.',
  },
  '/support/status': {
    title: 'System Status',
    description: 'Live visibility into uptime, maintenance, and ongoing incident work across Comet GameHouse.',
  },
  '/support/feedback': {
    title: 'Share Feedback',
    description: 'Send ideas straight to the crew shaping new releases, balance passes, and community events.',
  },
  '/support/report-bug': {
    title: 'Report a Bug',
    description: 'Provide reproduction details so our engineers can neutralize the issue fast.',
  },
}

function SupportLayout() {
  const location = useLocation()
  const meta = META[location.pathname] ?? META['/support']
  const getAOSProps = useAOS()

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-14 sm:px-10">
      <div className="max-w-3xl space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
        <Link to="/" className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
        <p className="text-base text-slate-300">{meta.description}</p>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2 text-sm">
        {NAV_LINKS.map((link, index) => {
          const active = location.pathname === link.href
          return (
            <Link
              key={link.href}
              to={link.href}
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(100 + index * 50) })}
              className={cn(
                'rounded-full border px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
                active
                  ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-100'
                  : 'border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-100',
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 grid gap-8">
        <Outlet />
      </div>
    </section>
  )
}

export default SupportLayout

